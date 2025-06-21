import { createEnv } from "@t3-oss/env-core";
import { z } from "zod";

export const env = createEnv({
  server: {
    SERVER_URL: z.string().url().optional(),
  },
  clientPrefix: "VITE_",
  client: {
    VITE_API_URL: z.string().min(1),
    VITE_POSTHOG_KEY: z.string().min(1),
    VITE_POSTHOG_HOST: z.string().min(1),
  },
  runtimeEnv: import.meta.env,
  emptyStringAsUndefined: true,
});
