import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { RedisStore } from "@hono-rate-limiter/redis";
import * as dataSets from "@memtatio/datasets";
import { Redis } from "@upstash/redis/cloudflare";
import { smoothStream, streamText } from "ai";
import { Hono, type Next } from "hono";
import { rateLimiter } from "hono-rate-limiter";
import { cors } from "hono/cors";
import { logger } from "hono/logger";
import { stream } from "hono/streaming";

const app = new Hono<{ Bindings: CloudflareBindings }>();
app.use("*", async (c, next) => {
  const corsMiddlewareHandler = cors({
    origin: "*",
    allowMethods: ["POST", "GET", "OPTIONS"],
    exposeHeaders: [
      "X-Vercel-AI-Data-Stream",
      "Content-Type",
      "Content-Encoding",
      "x-memtatio-ai",
      "ratelimit-remaining",
    ],
    maxAge: 600,
    credentials: true,
  });
  return corsMiddlewareHandler(c, next);
});
app.use(logger());
app.use((c, next: Next) =>
  rateLimiter<{ Bindings: CloudflareBindings }>({
    windowMs: 60 * 1000 * 60 * 24, // 200 messages per 24 hours,
    limit: 200,
    standardHeaders: "draft-6",
    keyGenerator: (c) => c.req.header("cf-connecting-ip") ?? "",
    store: new RedisStore({
      client: new Redis({
        url: c.env.UPSTASH_ENDPOINT,
        token: c.env.UPSTASH_TOKEN,
      }),
    }),
  })(c, next)
);

app.get("/datasets", (c) => {
  const dataset = dataSets.hitesh;
  const examplesString = dataset.data
    .map(
      (i) =>
        `#example\n${
          i.title.startsWith("where he is talking about")
            ? "this is title of the video"
            : "this is title of the video where he is talking about"
        } "${i.title}" :\n${i.text}\n`
    )
    .join("\n");

  return c.text(examplesString);
});

app.post("/chat", async (c) => {
  const { memtatio, messages } = await c.req.json();
  console.info("GOT: ", memtatio);

  const toMimic = dataSets.datasets.find((ai) => ai.username === memtatio);
  const dataset = toMimic?.username ? toMimic : dataSets.hitesh;
  toMimic?.username
    ? null
    : console.error(
        "Did not received username\n defaulting to ",
        dataSets.hitesh.username
      );

  console.log("[AI]: ", dataset.username);

  const google = createGoogleGenerativeAI({
    apiKey: c.env.GOOGLE_GENAI_API,
  });

  //prepare string for dataset
  const examplesString = dataset.data
    .map(
      (i) =>
        `#example\n${
          i.title.startsWith("where he is talking about")
            ? "this is title of the video"
            : "this is title of the video where he is talking about"
        } "${i.title}" :\n${i.text}\n`
    )
    .join("\n");

  const result = streamText({
    model: google("gemini-2.5-flash"),
    messages,
    system: `
    you are a persona of a ${dataset.bio.name}
    you have to act and response like him.
    if got any hindi transcript make sure to convert it into hinglish.
    you will reply in only hinglish transcript if user unless your persona does not talk in hindi/hinglish.
    this is the some basic professional information related to your persona.

    today's date is ${new Date().toDateString()}.
    if user ask who are you you have reply that you are a persona of ${
      dataset.bio.name
    } created by @atytbdot.


    your persona goes by the name of ${dataset.username} on youtube.
    ${dataset.bio.detailed}.
    In short ${dataset.bio.short}.

    here are some examples on how he talks:
    ${examplesString}

    Don't's:
    1. do not reply in hindi text-scripts
    2. do not add markdown syntax meaning do not add ** to make word bold or \`\`\` for coding.
    3. Do not answer coding questions, politics, and religion.
    4. do not use emojis

    Do's:
    1. reply only in english transcript.
    2. maintain a professional tone
    3. reply every thing in your persona's tone.

    `,
    experimental_transform: smoothStream(),
    onError: (error) => {
      console.log("[ERROR]\n", error);
    },
  });
  c.header("X-Vercel-AI-Data-Stream", "v1");
  c.header("Content-Type", "text/plain; charset=utf-8");
  c.header("Content-Encoding", "none");
  c.header("x-memtatio-ai", memtatio ?? dataset.username);
  return stream(c, (s) => s.pipe(result.toDataStream()));
});

export default app;
