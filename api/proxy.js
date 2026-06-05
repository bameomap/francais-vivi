import { Redis } from "@upstash/redis";

const ALLOWED_ORIGINS = [
  "https://francais-vivi.vercel.app",
  "http://localhost:5174",
  "http://localhost:5173",
  "http://localhost:3000",
];

const SAFE_MODEL = "claude-sonnet-4-6";
const MAX_TOKENS_CAP = 8000;

// Rate limit: 20 req/min per IP.
// Backed by Redis so the count is shared across all serverless instances
// (an in-memory Map resets per cold start and effectively disables the limit).
const RATE_LIMIT = 20;
const RATE_WINDOW_SEC = 60;

// Reuse one client across warm invocations. Null if Redis isn't configured.
const redis =
  process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN
    ? Redis.fromEnv()
    : null;

async function isRateLimited(ip) {
  if (!redis) return false; // No Redis configured (e.g. local dev) → don't block.
  try {
    const key = `rl:proxy:${ip}`;
    const count = await redis.incr(key);
    if (count === 1) await redis.expire(key, RATE_WINDOW_SEC);
    return count > RATE_LIMIT;
  } catch {
    return false; // Fail open: a Redis hiccup shouldn't take the app down.
  }
}

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  const origin = req.headers.origin || req.headers.referer || "";
  if (!ALLOWED_ORIGINS.some(o => origin.startsWith(o))) {
    return res.status(403).json({ error: { message: "Unauthorized" } });
  }

  const ip = (req.headers["x-forwarded-for"] || "").split(",")[0].trim() || req.socket?.remoteAddress || "unknown";
  if (await isRateLimited(ip)) {
    return res.status(429).json({ error: { message: "Quá nhiều yêu cầu, vui lòng thử lại sau." } });
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) return res.status(500).json({ error: { message: "Server chưa cấu hình API key" } });

  // Force safe model and cap max_tokens regardless of what client sends
  const body = {
    ...req.body,
    model: SAFE_MODEL,
    max_tokens: Math.min(req.body.max_tokens || 1024, MAX_TOKENS_CAP),
  };

  try {
    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify(body),
    });
    const data = await response.json();
    res.status(response.status).json(data);
  } catch (e) {
    res.status(500).json({ error: { message: e.message } });
  }
}
