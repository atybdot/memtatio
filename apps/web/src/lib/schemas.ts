import { options } from "@/data/AIOptions.data";
import { hitesh } from "@memtatio/datasets";
import { z } from "zod/v4";

export const searchSchema = z.object({
  ai: z
    .enum(options.flatMap((ai) => ai.id))
    .default(hitesh.username)
    .catch(hitesh.username),
});