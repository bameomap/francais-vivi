#!/usr/bin/env node
/**
 * Transcode a book's listening tracks and put them in the PRIVATE Blob store.
 *
 * All of this audio is the publishers' and none of it belongs in this repo,
 * which is public. The DELF tracks have been in a private store from the start;
 * this script is what moved the Édito sets there too, and what any future book
 * should go through.
 *
 * Transcoding is not optional. The originals are 320 kbps stereo — 890 MB
 * across the four Édito sets — for speech recorded in a studio. At 32 kbps
 * mono the same set is about 65 MB, which is the difference between a store
 * that fits and one that doesn't, and between a track that starts instantly on
 * a phone and one that stalls.
 *
 *     node scripts/upload-audio.mjs                 # every set
 *     node scripts/upload-audio.mjs edito-a2-livre  # just one
 *     node scripts/upload-audio.mjs --dry           # list what would happen
 *
 * Needs BLOB_READ_WRITE_TOKEN in .env.local and ffmpeg on PATH. Re-running is
 * safe: a track already in the store at the right size is skipped, so an
 * interrupted run resumes.
 */

import { list, put } from "@vercel/blob";
import { execFile } from "node:child_process";
import { promisify } from "node:util";
import fs from "node:fs";
import path from "node:path";
import os from "node:os";

const run = promisify(execFile);
const ROOT = path.resolve(import.meta.dirname, "..");

// Where each set's originals live, and how its files are named. Three sets sit
// under materials/; the Édito A1 Livre set predates that convention and has
// always been at the repo root, gitignored.
const SETS = [
  {
    id: "edito-a1-livre",
    dir: path.join(ROOT, "Nouvel_Edito_A1_audios_manuel"),
    match: /^(\d+)_Edito_A1_Livre\.mp3$/,
  },
  {
    id: "edito-a1-cahier",
    dir: path.join(ROOT, "materials/A1/Nouvel_Edito_A1_audios_cahier"),
    match: /^(?:piste_)?(\d+)\.mp3$/i,
  },
  {
    id: "edito-a2-livre",
    dir: path.join(ROOT, "materials/A2/EDITO A2/Edito_A2_Audios_Livre"),
    match: /^(\d+)_Edito_A2_Livre\.mp3$/,
  },
  {
    id: "edito-a2-cahier",
    dir: path.join(ROOT, "materials/A2/EDITO A2/Edito_A2_Audios_Cahier"),
    match: /^(\d+)_Edito_A2_Cahier\.mp3$/,
  },
];

const token = fs.readFileSync(path.join(ROOT, ".env.local"), "utf8")
  .match(/BLOB_READ_WRITE_TOKEN="?([^"\s]+)/)?.[1];
if (!token) throw new Error("BLOB_READ_WRITE_TOKEN missing from .env.local");

const args = process.argv.slice(2);
const dry = args.includes("--dry");
const only = args.filter(a => !a.startsWith("--"));

// What's already up, so a re-run doesn't re-encode and re-send everything.
const have = new Map();
for (let cursor; ;) {
  const r = await list({ token, cursor, limit: 1000 });
  for (const b of r.blobs) have.set(b.pathname, b.size);
  if (!(cursor = r.cursor)) break;
}
console.log(`store holds ${have.size} tracks`);

const tmp = fs.mkdtempSync(path.join(os.tmpdir(), "audio-"));
let put_ = 0, skipped = 0, bytes = 0;

for (const set of SETS) {
  if (only.length && !only.includes(set.id)) continue;
  if (!fs.existsSync(set.dir)) {
    console.log(`\n${set.id}: SKIPPED — ${set.dir} not found`);
    continue;
  }

  const files = fs.readdirSync(set.dir)
    .map(name => ({ name, m: set.match.exec(name) }))
    .filter(f => f.m)
    .map(f => ({ name: f.name, n: Number(f.m[1]) }))
    // piste_000 of the A1 cahier is a copyright announcement, not a track.
    .filter(f => f.n > 0)
    .sort((a, b) => a.n - b.n);

  console.log(`\n${set.id}: ${files.length} files${set.note ? ` (${set.note})` : ""}`);

  for (const f of files) {
    const key = `${set.id}/${String(f.n).padStart(3, "0")}.m4a`;
    if (have.has(key)) { skipped++; continue; }
    if (dry) { console.log(`  would put ${key}`); put_++; continue; }

    const out = path.join(tmp, "t.m4a");
    await run("ffmpeg", ["-v", "error", "-y", "-i", path.join(set.dir, f.name),
                         "-ac", "1", "-c:a", "aac", "-b:a", "32k",
                         "-movflags", "+faststart", out]);
    const body = fs.readFileSync(out);
    await put(key, body, {
      token, access: "private", contentType: "audio/mp4",
      addRandomSuffix: false, allowOverwrite: true,
    });
    put_++; bytes += body.length;
    if (put_ % 20 === 0) process.stdout.write(`  …${put_} uploaded\n`);
  }
}

fs.rmSync(tmp, { recursive: true, force: true });
console.log(`\n${dry ? "would upload" : "uploaded"} ${put_}, skipped ${skipped} already there`
          + (bytes ? `, ${(bytes / 1048576).toFixed(1)} MB sent` : ""));
