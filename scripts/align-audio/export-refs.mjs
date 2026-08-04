// Hands the transcripts to align.py. Run through `npm run align:refs -- b1 b2`
// (A2 unit ids) or `npm run align:refs -- --book=a1 u1 u2` (A1 unit ids).
// With no unit ids, exports every unit of the chosen book that has tracks.
import { writeFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { EDITO_AUDIO_A2 } from "../../src/data/editoAudioA2.js";
import { EDITO_AUDIO as EDITO_AUDIO_A1 } from "../../src/data/editoAudio.js";

const here = dirname(fileURLToPath(import.meta.url));
const args = process.argv.slice(2);
const bookArg = args.find(a => a.startsWith("--book="));
const book = bookArg ? bookArg.slice("--book=".length) : "a2";
const want = args.filter(a => !a.startsWith("--book="));

const AUDIO = book === "a1" ? EDITO_AUDIO_A1 : EDITO_AUDIO_A2;
const units = want.length ? want : Object.keys(AUDIO);

const refs = [];
for (const u of units) {
  const tracks = AUDIO[u];
  if (!tracks) { console.error(`⚠ Không có unité "${u}"`); continue; }
  for (const t of tracks) {
    if (!t.sentences?.length) continue;
    refs.push({ id: t.id, unit: u, trackNum: t.trackNum,
                audioSrc: t.audioSrc, sentences: t.sentences });
  }
}

mkdirSync(join(here, "work"), { recursive: true });
writeFileSync(join(here, "work", "refs.json"), JSON.stringify(refs, null, 1));
console.log(`→ work/refs.json · ${refs.length} track, ` +
            `${refs.reduce((a, r) => a + r.sentences.length, 0)} câu`);
