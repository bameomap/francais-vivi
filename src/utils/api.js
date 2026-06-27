export const MODEL = "claude-sonnet-4-6";

// AI calls can hang (slow model, dropped connection). Without a timeout the
// loading spinner would spin forever, so we abort after this many ms.
const AI_TIMEOUT_MS = 35_000;

// fetch() wrapper that aborts on timeout and surfaces a friendly message.
async function fetchProxy(body) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), AI_TIMEOUT_MS);
  try {
    return await fetch("/api/proxy", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
      signal: controller.signal,
    });
  } catch (e) {
    if (e.name === "AbortError") throw new Error("AI phản hồi quá lâu. Vui lòng thử lại.");
    throw new Error("Lỗi kết nối mạng. Vui lòng kiểm tra mạng và thử lại.");
  } finally {
    clearTimeout(timer);
  }
}

export async function callAI(prompt) {
  const res = await fetchProxy({
    model: MODEL,
    max_tokens: 8000,
    system: "You are a JSON API. Output valid JSON only. No markdown, no backticks. Start with { end with }.",
    messages: [{ role: "user", content: prompt }],
  });
  const data = await res.json();
  if (data.error) throw new Error(data.error.message);
  const raw = data.content.map((c) => c.text || "").join("").trim();
  const s = raw.indexOf("{"), e = raw.lastIndexOf("}");
  if (s === -1 || e === -1) throw new Error("Phản hồi không hợp lệ");
  return JSON.parse(raw.slice(s, e + 1));
}

export async function callAIText(messages, systemPrompt) {
  const res = await fetchProxy({ model: MODEL, max_tokens: 1024, system: systemPrompt, messages });
  let data;
  try { data = await res.json(); }
  catch { throw new Error(`Lỗi kết nối máy chủ (${res.status}). Vui lòng thử lại.`); }
  if (data.error) throw new Error(data.error.message);
  if (!data.content) throw new Error("Phản hồi không hợp lệ từ AI. Vui lòng thử lại.");
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
  if (type === "translate")
    return `French teacher for Vietnamese A1 learners. Create exactly ${n} SHORT translation exercises (4-9 words each, natural A1 sentences) that reuse the vocabulary below.${reuse}\nMix BOTH directions: about half "vi2fr" (Vietnamese → French) and half "fr2vi" (French → Vietnamese).\nVocabulary:\n${list}\nReturn ONLY JSON: {"type":"translate","exercises":[{"direction":"vi2fr","source":"Vietnamese sentence","reference":"correct natural French translation","note":"short Vietnamese hint about a key word or structure"},{"direction":"fr2vi","source":"French sentence","reference":"correct natural Vietnamese translation","note":"short Vietnamese hint"}]}`;
  if (type === "matching")
    return `French teacher. Create matching pairs.\nVocabulary:\n${list}\nReturn ONLY JSON: {"type":"matching","pairs":[{"fr":"French word","vi":"Vietnamese meaning"}]}`;
  if (type === "mixed")
    return `French teacher. Create ${Math.ceil(n / 2)} multiple choice + ${Math.floor(n / 2)} fill-in-blank + matching pairs.${reuse}\nVocabulary:\n${list}\nReturn ONLY JSON: {"type":"mixed","sections":[{"sectionType":"multiple_choice","questions":[{"question":"...","options":["A","B","C","D"],"answer":"exact option","explanation":"tip","wrongExplanations":{"wrong option":"meaning"}}]},{"sectionType":"fill_blank","questions":[{"sentence":"sentence with ___","answer":"word","hint":"Vietnamese"}]},{"sectionType":"matching","pairs":[{"fr":"word","vi":"meaning"}]}]}`;
  return "";
}

// Grade a free-form translation by an A1 learner. Lenient: judges by meaning,
// accepts synonyms / word-order / missing accents. Returns
// { verdict: "correct"|"close"|"wrong", correction, feedback }.
export async function gradeTranslation({ direction, source, reference, userAnswer }) {
  const tgt = direction === "vi2fr" ? "French" : "Vietnamese";
  const prompt = `You grade a translation written by a Vietnamese A1 learner of French.
Task: translate the source into ${tgt}.
Source: "${source}"
Model answer (${tgt}): "${reference}"
Learner answer (${tgt}): "${userAnswer}"
Grade by MEANING, not exact wording. Accept synonyms, any valid word order, and missing accents or capitalization. Be encouraging and lenient.
- "correct": conveys the same meaning with no serious grammar error (small accent/typo is still correct).
- "close": understandable but has one real mistake (wrong gender/agreement/verb form/word).
- "wrong": meaning is off, empty, or in the wrong language.
Return ONLY JSON: {"verdict":"correct"|"close"|"wrong","correction":"the best natural ${tgt} version","feedback":"ONE short Vietnamese sentence — praise if correct, or clearly say what to fix"}`;
  return callAI(prompt);
}
