import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { smoothStream, streamText } from "ai";
import { Hono, type Next } from "hono";
import { logger } from "hono/logger";
import { stream } from "hono/streaming";
const app = new Hono<{ Bindings: CloudflareBindings }>()
app.post("/chat", async (c) => {
  const google = createGoogleGenerativeAI({
    apiKey: c.env.GOOGLE_GENAI_API,
  });
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
