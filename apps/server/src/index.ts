import { createGoogleGenerativeAI } from "@ai-sdk/google";
import * as dataSets from "@memtatio/datasets";
import { smoothStream, streamText } from "ai";
import { Hono, type Next } from "hono";
import { logger } from "hono/logger";
import { stream } from "hono/streaming";
const app = new Hono<{ Bindings: CloudflareBindings }>()
app.use(logger(),);
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
  });
  c.header("X-Vercel-AI-Data-Stream", "v1");
  c.header("Content-Type", "text/plain; charset=utf-8");
  c.header("Content-Encoding", "none");
  c.header("x-memtatio-ai", memtatio ?? dataset.username);
  return stream(c, (s) => s.pipe(result.toDataStream()));
});
export default app;
