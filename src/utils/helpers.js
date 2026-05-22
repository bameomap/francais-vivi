export function shuffleArray(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export function parseWords(text) {
  return text
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean)
    .map((line) => {
      const parts = line.split("—").map((p) => p.trim());
      return { fr: parts[0] || "", vi: parts[1] || "" };
    })
    .filter((w) => w.fr.length > 0);
}

function speakFallback(text, cb) {
  if (!window.speechSynthesis) return cb?.();
  window.speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(text);
  u.lang = "fr-FR";
  u.rate = 0.88;
  u.pitch = 1.0;
  const voices = window.speechSynthesis.getVoices();
  const PREF = ["Thomas", "Amélie", "Google français", "fr-FR", "fr-"];
  let voice = null;
  for (const p of PREF) {
    voice = voices.find(v => v.name.includes(p) || v.lang.startsWith(p));
    if (voice) break;
  }
  if (voice) u.voice = voice;
  if (cb) u.onend = cb;
  window.speechSynthesis.speak(u);
}

function splitSentences(text) {
  // Split on sentence-ending punctuation, keep each chunk ≤ 180 chars for Google TTS
  const raw = text.match(/[^.!?…]+[.!?…]*/g) || [text];
  const chunks = [];
  let cur = "";
  for (const s of raw) {
    if ((cur + s).length > 180 && cur) { chunks.push(cur.trim()); cur = s; }
    else cur += s;
  }
  if (cur.trim()) chunks.push(cur.trim());
  return chunks.filter(Boolean);
}

async function speakChunk(chunk, cb) {
  try {
    const audio = new Audio(`/api/tts?text=${encodeURIComponent(chunk)}`);
    await new Promise((resolve, reject) => {
      audio.onended = resolve;
      audio.onerror = reject;
      audio.play().catch(reject);
    });
    cb?.();
  } catch {
    speakFallback(chunk, cb);
  }
}

export async function speak(text, onEnd) {
  const chunks = splitSentences(text);
  for (let i = 0; i < chunks.length; i++) {
    const isLast = i === chunks.length - 1;
    await speakChunk(chunks[i], isLast ? (onEnd || undefined) : undefined);
  }
}
