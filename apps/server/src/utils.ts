import { WorkersKVStore } from "@hono-rate-limiter/cloudflare";
import type { Context, Next } from "hono";
import { rateLimiter } from "hono-rate-limiter";
import { cors } from "hono/cors";
export type AppContext = Context<{ Bindings: CloudflareBindings }>;

export const corsMiddleware = async (c: AppContext, next: Next) => {
	const corsMiddlewareHandler = cors({
		origin: c.env.CORS_ORIGIN,
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
};
export const rateLimitMiddleware = (c: AppContext, next: Next) =>
	rateLimiter<{ Bindings: CloudflareBindings }>({
		windowMs: 60 * 1000 * 60 * 24, // 200 messages per 24 hours,
		limit: 20,
		standardHeaders: "draft-6",
		keyGenerator: (c) => c.req.header("cf-connecting-ip") ?? "",
		store: new WorkersKVStore({ namespace: c.env.rate_limit_kv }),
	})(c, next);
