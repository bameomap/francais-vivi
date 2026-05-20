const ALLOWED_ORIGINS = [
  "https://francais-vivi.vercel.app",
  "http://localhost:5173",
  "http://localhost:3000",
];

const SAFE_MODEL = "claude-sonnet-4-20250514";
const MAX_TOKENS_CAP = 8000;

// Simple in-memory rate limiter: 20 req/min per IP
const rateMap = new Map();
const RATE_LIMIT = 20;
const RATE_WINDOW = 60_000;

function isRateLimited(ip) {
  const now = Date.now();
  const e = rateMap.get(ip) || { count: 0, resetAt: now + RATE_WINDOW };
  if (now > e.resetAt) { e.count = 0; e.resetAt = now + RATE_WINDOW; }
  e.count++;
  rateMap.set(ip, e);
  return e.count > RATE_LIMIT;
}

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  const origin = req.headers.origin || req.headers.referer || "";
  if (!ALLOWED_ORIGINS.some(o => origin.startsWith(o))) {
    return res.status(403).json({ error: { message: "Unauthorized" } });
  }

  const ip = (req.headers["x-forwarded-for"] || "").split(",")[0].trim() || req.socket?.remoteAddress || "unknown";
  if (isRateLimited(ip)) {
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
