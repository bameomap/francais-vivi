export const MODEL = "claude-sonnet-4-20250514";

export async function callAI(prompt) {
  const res = await fetch("/api/proxy", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      model: MODEL,
      max_tokens: 8000,
      system: "You are a JSON API. Output valid JSON only. No markdown, no backticks. Start with { end with }.",
      messages: [{ role: "user", content: prompt }],
    }),
  });
  const data = await res.json();
  if (data.error) throw new Error(data.error.message);
  const raw = data.content.map((c) => c.text || "").join("").trim();
  const s = raw.indexOf("{"), e = raw.lastIndexOf("}");
  if (s === -1 || e === -1) throw new Error("Phản hồi không hợp lệ");
  return JSON.parse(raw.slice(s, e + 1));
}

export async function callAIText(messages, systemPrompt) {
  const res = await fetch("/api/proxy", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ model: MODEL, max_tokens: 800, system: systemPrompt, messages }),
  });
  const data = await res.json();
  if (data.error) throw new Error(data.error.message);
  return data.content.map((c) => c.text || "").join("").trim();
}

export async function callAIBatched(type, words, n) {
  if (type === "matching" || n <= 15) return callAI(buildPrompt(type, words, n));
  const h1 = Math.ceil(n / 2), h2 = n - h1;
  const shuffled = shuffleArray(words);
  const mid = Math.ceil(shuffled.length / 2);
  const words1 = shuffled.length >= 4 ? shuffled.slice(0, mid) : shuffled;
  const words2 = shuffled.length >= 4 ? shuffled.slice(mid) : shuffled;
  const [r1, r2] = await Promise.all([
    callAI(buildPrompt(type, words1, h1)),
    callAI(buildPrompt(type, words2, h2)),
  ]);
  if (type === "multiple_choice") return { type, questions: [...(r1.questions || []), ...(r2.questions || [])] };
  if (type === "fill_blank") return { type, questions: [...(r1.questions || []), ...(r2.questions || [])] };
  if (type === "mixed") {
    const merge = (sType) => {
      const a = r1.sections?.find((s) => s.sectionType === sType);
      const b = r2.sections?.find((s) => s.sectionType === sType);
      if (sType === "matching") return a || b;
      return { sectionType: sType, questions: [...(a?.questions || []), ...(b?.questions || [])] };
    };
    return { type, sections: ["multiple_choice", "fill_blank", "matching"].map(merge).filter(Boolean) };
  }
  return r1;
}

function shuffleArray(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export function buildPrompt(type, words, n = 8) {
  n = Math.min(n, 30);
  const shuffled = shuffleArray(words);
  const sampled =
    n <= shuffled.length
      ? shuffled.slice(0, Math.min(n + Math.ceil(n * 0.3), shuffled.length))
      : shuffled;
  const list = sampled.map((w) => (w.vi ? `${w.fr} — ${w.vi}` : w.fr)).join("\n");
  const reuse = n > words.length ? " Reuse words in different styles to reach the count." : "";
  if (type === "multiple_choice")
    return `French teacher. Create exactly ${n} multiple choice questions mixing FR→VI and VI→FR.${reuse}\nVocabulary:\n${list}\nReturn ONLY JSON: {"type":"multiple_choice","questions":[{"question":"...","options":["A","B","C","D"],"answer":"exact option text","explanation":"Vietnamese note about correct answer","wrongExplanations":{"wrong option text":"what it means in Vietnamese"}}]}`;
  if (type === "fill_blank")
    return `French teacher. Create exactly ${n} fill-in-the-blank sentences using ___ for blank.${reuse}\nVocabulary:\n${list}\nReturn ONLY JSON: {"type":"fill_blank","questions":[{"sentence":"French sentence with ___","answer":"missing word","hint":"Vietnamese meaning"}]}`;
  if (type === "matching")
    return `French teacher. Create matching pairs.\nVocabulary:\n${list}\nReturn ONLY JSON: {"type":"matching","pairs":[{"fr":"French word","vi":"Vietnamese meaning"}]}`;
  if (type === "mixed")
    return `French teacher. Create ${Math.ceil(n / 2)} multiple choice + ${Math.floor(n / 2)} fill-in-blank + matching pairs.${reuse}\nVocabulary:\n${list}\nReturn ONLY JSON: {"type":"mixed","sections":[{"sectionType":"multiple_choice","questions":[{"question":"...","options":["A","B","C","D"],"answer":"exact option","explanation":"tip","wrongExplanations":{"wrong option":"meaning"}}]},{"sectionType":"fill_blank","questions":[{"sentence":"sentence with ___","answer":"word","hint":"Vietnamese"}]},{"sectionType":"matching","pairs":[{"fr":"word","vi":"meaning"}]}]}`;
  return "";
}
