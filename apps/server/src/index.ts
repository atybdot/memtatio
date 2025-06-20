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
export default app;
