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
  // prefer natural-sounding French voices in order
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

export async function speak(text, onEnd) {
  const cb = onEnd || (() => {});
  try {
    const audio = new Audio(`/api/tts?text=${encodeURIComponent(text)}`);
    audio.onended = cb;
    audio.onerror = () => speakFallback(text, cb);
    await audio.play();
  } catch {
    speakFallback(text, cb);
  }
}
