// Simple mock server for local UI testing (port 3000)
// Run: node mock-server.js
import http from "http";
import fs from "fs";

// Every book's listening tracks live in a private Blob store, so they are only
// reachable through the real /api/audio function. Vite proxies /api here, which
// means without this nothing plays locally. Rather than mock it, run the actual
// handler — it needs BLOB_READ_WRITE_TOKEN from .env.local, which
// `vercel blob create-store` already wrote.
let audio = null;
try {
  for (const line of fs.readFileSync(".env.local", "utf8").split("\n")) {
    const m = line.match(/^([A-Z0-9_]+)=(.*)$/);
    if (m) process.env[m[1]] = m[2].replace(/^"|"$/g, "");
  }
  // The SDK refuses OIDC credentials unless BLOB_STORE_ID is set too; the
  // static token is the simpler path off-platform.
  delete process.env.VERCEL_OIDC_TOKEN;
  ({ default: audio } = await import("./api/audio.js"));
} catch (e) {
  console.warn("audio disabled locally:", e.message);
}

const MOCK = {
  être: {
    verb: "être", tense: "Présent", group: "irrégulier",
    meaning: "thì, là",
    conjugations: ["suis", "es", "est", "sommes", "êtes", "sont"],
    tip: "Học thuộc lòng — être không theo quy tắc nào cả!",
    example: "Je suis étudiant, et toi ? — Tôi là học sinh, còn bạn?",
  },
  avoir: {
    verb: "avoir", tense: "Présent", group: "irrégulier",
    meaning: "có, đã",
    conjugations: ["ai", "as", "a", "avons", "avez", "ont"],
    tip: "avoir = 'có'. Dùng làm trợ động từ trong passé composé.",
    example: "J'ai faim, tu as soif ? — Tôi đói, bạn có khát không?",
  },
  aller: {
    verb: "aller", tense: "Présent", group: "irrégulier",
    meaning: "đi",
    conjugations: ["vais", "vas", "va", "allons", "allez", "vont"],
    tip: "Nhớ: je vais, tu vas, il va — phần nous/vous bình thường hơn.",
    example: "Tu vas où ce soir ? — Tối nay bạn đi đâu?",
  },
};

const server = http.createServer((req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") { res.writeHead(204); res.end(); return; }

  if (req.url.startsWith("/api/audio")) {
    if (!audio) { res.writeHead(503); res.end(); return; }
    // Give the Vercel handler the request shape it expects.
    req.query = Object.fromEntries(new URL(req.url, "http://localhost").searchParams);
    res.status = c => { res.statusCode = c; return res; };
    res.json = o => { res.setHeader("Content-Type", "application/json"); res.end(JSON.stringify(o)); };
    audio(req, res);
    return;
  }

  if (req.method !== "POST" || !req.url.startsWith("/api/proxy")) {
    res.writeHead(404); res.end(); return;
  }

  let body = "";
  req.on("data", d => body += d);
  req.on("end", () => {
    try {
      const { messages } = JSON.parse(body);
      const prompt = messages?.[0]?.content || "";

      let text;

      // ── Grade request (EditoAudioPanel) ──────────────────────────
      if (prompt.includes("Câu hỏi:") && prompt.includes("Câu trả lời của học sinh:")) {
        const correctGuess = prompt.includes("Vrai") || prompt.includes("vrai") || prompt.length < 300;
        text = JSON.stringify({
          correct: correctGuess,
          feedback: "(Mock) Câu trả lời có vẻ đúng — chạy production để chấm AI thật.",
          hint: correctGuess ? "" : "Xem lại script để tìm đáp án.",
        });

      // ── Conjugation request (legacy) ─────────────────────────────
      } else {
        const match = prompt.match(/động từ "([^"]+)"/);
        const verb = match?.[1]?.toLowerCase() || "être";
        const data = MOCK[verb] || { ...MOCK.être, verb };
        text = JSON.stringify(data);
      }

      const response = { content: [{ type: "text", text }], model: "mock", usage: {} };
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(response));
    } catch (e) {
      res.writeHead(500); res.end(JSON.stringify({ error: { message: e.message } }));
    }
  });
});

server.listen(3000, () => console.log("Mock server running on http://localhost:3000"));
