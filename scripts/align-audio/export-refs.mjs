// Hands the transcripts to align.py. Run through `npm run align:refs -- b1 b2`.
// With no unit ids, exports every A2 unit that has tracks.
import { writeFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { EDITO_AUDIO_A2 } from "../../src/data/editoAudioA2.js";

const here = dirname(fileURLToPath(import.meta.url));
const want = process.argv.slice(2);
const units = want.length ? want : Object.keys(EDITO_AUDIO_A2);

const refs = [];
for (const u of units) {
  const tracks = EDITO_AUDIO_A2[u];
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
