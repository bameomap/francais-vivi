// "La journaliste :" is printed in the book but nobody says it out loud, so
// it must not be part of what the learner is asked to write down — least of
// all now that dictée plays the real recording rather than reading the line
// back with text-to-speech.
//
// Anchored to a capitalised name of at most ~30 characters so a colon used
// inside a sentence ("j'ai une question : où habitez-vous ?") survives.
const SPEAKER_RE = /^\s*[A-ZÀ-ÝÉÈ][^:]{0,30}\s*:\s*/;

export const stripSpeaker = (s = "") => s.replace(SPEAKER_RE, "").trim();
