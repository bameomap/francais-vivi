import { shuffleArray } from "../data/editoAudio.js";

// Choosing which transcript lines make a dictée.
//
// A transcript line is not automatically a good exercise. "Oui." teaches
// nothing, and the interviews in Édito run to 29-word sentences — past what an
// A2 ear holds in one pass. Lines outside the window are only used when there
// aren't enough inside it, so short tracks still work.
export const MIN_WORDS = 5;
export const MAX_WORDS = 22;

// "La journaliste :" is printed in the book but nobody says it out loud, so it
// must not be part of what the learner is asked to write down — least of all
// now that the real recording is what plays.
const SPEAKER_RE = /^\s*[A-ZÀ-ÝÉÈ][^:]{0,30}\s*:\s*/;

export const stripSpeaker = (s = "") => s.replace(SPEAKER_RE, "").trim();

export const wordCount = (s = "") =>
  stripSpeaker(s).split(/\s+/).filter(Boolean).length;

// Returns indices into `sentences`, in reading order, so the caller can look
// up both the text and its clip.
export function pickDicteeIndices(sentences = [], n = 5) {
  const all = sentences.map((_, i) => i);
  const good = all.filter(i => {
    const w = wordCount(sentences[i]);
    return w >= MIN_WORDS && w <= MAX_WORDS;
  });
  const pool = good.length >= n ? good : all;
  return shuffleArray(pool).slice(0, n).sort((a, b) => a - b);
}
