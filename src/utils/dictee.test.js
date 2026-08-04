import { describe, expect, it } from "vitest";
import { stripSpeaker } from "./dictee.js";
import { EDITO_AUDIO_A2 } from "../data/editoAudioA2.js";
import { EDITO_TIMINGS_A2 } from "../data/editoTimingsA2.js";
import { EDITO_AUDIO } from "../data/editoAudio.js";
import { EDITO_TIMINGS_A1 } from "../data/editoTimingsA1.js";

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
function describeTimings(name, audio, timings) {
  describe(name, () => {
    const tracks = Object.values(audio).flat();

    it("has one span per sentence of every track it covers", () => {
      for (const t of tracks) {
        const spans = timings[t.id];
        if (!spans) continue;
        expect(spans, t.id).toHaveLength(t.sentences.length);
      }
    });

    it("only names tracks that exist", () => {
      const ids = new Set(tracks.map(t => t.id));
      for (const id of Object.keys(timings)) expect(ids, id).toContain(id);
    });

    it("moves forward and stays inside a plausible duration", () => {
      for (const [id, spans] of Object.entries(timings)) {
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
}

describeTimings("EDITO_TIMINGS_A2", EDITO_AUDIO_A2, EDITO_TIMINGS_A2);
describeTimings("EDITO_TIMINGS_A1", EDITO_AUDIO, EDITO_TIMINGS_A1);
