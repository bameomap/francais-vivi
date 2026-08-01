import { describe, expect, it } from "vitest";
import { stripSpeaker } from "./dictee.js";
import { EDITO_AUDIO_A2 } from "../data/editoAudioA2.js";
import { EDITO_TIMINGS_A2 } from "../data/editoTimingsA2.js";

describe("stripSpeaker", () => {
  it("drops a speaker label nobody says out loud", () => {
    expect(stripSpeaker("La journaliste : Bonjour Gaël Faye !")).toBe("Bonjour Gaël Faye !");
    expect(stripSpeaker("Gaël Faye : Oui.")).toBe("Oui.");
  });

  it("leaves ordinary sentences alone", () => {
    const s = "Vous avez grandi là-bas puis vous êtes venu en France en 1995.";
    expect(stripSpeaker(s)).toBe(s);
  });

  it("does not eat a colon used inside a sentence", () => {
    const s = "j'ai une question : où habitez-vous ?";
    expect(stripSpeaker(s)).toBe(s);
  });
});

// The timings file is generated; a stale one would silently play the wrong
// seconds, which is worse than playing nothing.
describe("EDITO_TIMINGS_A2", () => {
  const tracks = Object.values(EDITO_AUDIO_A2).flat();

  it("has one span per sentence of every track it covers", () => {
    for (const t of tracks) {
      const spans = EDITO_TIMINGS_A2[t.id];
      if (!spans) continue;
      expect(spans, t.id).toHaveLength(t.sentences.length);
    }
  });

  it("only names tracks that exist", () => {
    const ids = new Set(tracks.map(t => t.id));
    for (const id of Object.keys(EDITO_TIMINGS_A2)) expect(ids, id).toContain(id);
  });

  it("moves forward and stays inside a plausible duration", () => {
    for (const [id, spans] of Object.entries(EDITO_TIMINGS_A2)) {
      let prevStart = -1;
      for (const [start, end] of spans) {
        expect(start, id).toBeGreaterThanOrEqual(0);
        expect(end, id).toBeGreaterThan(start);
        expect(start, id).toBeGreaterThan(prevStart);
        prevStart = start;
      }
      expect(spans.at(-1)[1], id).toBeLessThan(15 * 60);
    }
  });
});
