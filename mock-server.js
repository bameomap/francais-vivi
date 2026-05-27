// Simple mock server for local UI testing (port 3000)
// Run: node mock-server.js
import http from "http";

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
  if (req.method !== "POST" || !req.url.startsWith("/api/proxy")) {
    res.writeHead(404); res.end(); return;
  }

  let body = "";
  req.on("data", d => body += d);
  req.on("end", () => {
    try {
      const { messages } = JSON.parse(body);
      const prompt = messages?.[0]?.content || "";
      // Extract verb from prompt
      const match = prompt.match(/động từ "([^"]+)"/);
      const verb = match?.[1]?.toLowerCase() || "être";
      const data = MOCK[verb] || { ...MOCK.être, verb };
      // Return in Anthropic API format
      const response = {
        content: [{ type: "text", text: JSON.stringify(data) }],
        model: "mock", usage: {},
      };
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(response));
    } catch (e) {
      res.writeHead(500); res.end(JSON.stringify({ error: { message: e.message } }));
    }
  });
});

server.listen(3000, () => console.log("Mock server running on http://localhost:3000"));
