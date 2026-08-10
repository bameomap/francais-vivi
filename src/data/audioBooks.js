// Every book's listening tracks, in one shape, so one screen can list them all.
//
// Three books have audio today and a fourth (« 100 % réussite A2 ») is coming,
// so this is a registry rather than a page per book: adding a book means adding
// an entry here, and the screen doesn't change.
//
// Nothing is duplicated. Each book's tracks are derived from the data the app
// already holds — the DELF index, the Édito listening sets, the cahier
// exercises — so a track can't drift out of step with the exercise built on it.
//
// The books do not share a hosting story, and the registry is where that stays:
//
//   « 100 % réussite » — copyrighted, in a PRIVATE Vercel Blob store, streamed
//     through /api/delf-audio. The repo is public; the audio is not in it.
//   Édito — on the `audio` branch, served by GitHub Pages.
//
// Only the Édito tracks the app has built exercises on are uploaded (42 of the
// A1 Livre set, 40 of A2's 121), so those two books list what is actually
// playable rather than what the book prints. `partial` says so on the card.

import { PISTES } from "./delfA1Pistes.js";
import { EDITO_AUDIO } from "./editoAudio.js";
import { EDITO_AUDIO_A2 } from "./editoAudioA2.js";
import { CAHIER_A1 } from "./editoCahierA1.js";
import { CAHIER_A2 } from "./editoCahierA2.js";
import { EDITO_A1_UNITS } from "./editoA1Units.js";
import { EDITO_A2_UNITS } from "./editoA2Units.js";

// A track is { piste, label, sub, page, src, group } — group is what the list
// prints as a heading, and is shared by reference so rows can be compared with
// !== to know when to start a new one.
const trackNumOf = src => Number(String(src).match(/(\d+)_Edito/)?.[1] ?? 0);

// ── Édito · Livre ────────────────────────────────────────────────
// Keyed by unit; the entries already carry the section, the page and a title.
function fromLivre(set, units, unitLabel) {
  const groups = new Map();
  const out = [];
  for (const [key, entries] of Object.entries(set)) {
    const n = Number(key.slice(1));
    const unit = units.find(u => u.unit === n);
    if (!groups.has(key)) {
      groups.set(key, { part: `${unitLabel} ${n}`, skill: unit?.title ?? "", pages: "" });
    }
    for (const e of entries) {
      out.push({
        piste: e.trackNum,
        label: e.title,
        sub: e.section ? `Section ${e.section}` : "",
        page: e.page,
        src: e.audioSrc,
        group: groups.get(key),
      });
    }
  }
  // Each unit's pages are whatever its own tracks turned out to span.
  for (const [key, g] of groups) {
    const pp = out.filter(t => t.group === g).map(t => t.page).filter(Boolean);
    if (pp.length) g.pages = `p.${Math.min(...pp)}–${Math.max(...pp)}`;
  }
  return out.sort((a, b) => a.piste - b.piste);
}

// ── Édito · Cahier ───────────────────────────────────────────────
// The cahier's audio hangs off individual exercises, nested several levels
// down and often reused across exercises on the same page, so the tracks are
// collected by walking the unit and de-duplicated by piste.
function fromCahier(set, units, unitLabel) {
  const out = [];
  for (const [key, unitData] of Object.entries(set)) {
    const n = Number(key.slice(1));
    const unit = units.find(u => u.unit === n);
    const group = { part: `${unitLabel} ${n}`, skill: unit?.title ?? "", pages: "" };
    const seen = new Map();

    const walk = node => {
      if (!node || typeof node !== "object") return;
      if (Array.isArray(node)) { node.forEach(walk); return; }
      if (node.audioSrc) {
        const piste = trackNumOf(node.audioSrc);
        const prev = seen.get(piste);
        if (prev) {
          // Same track, another exercise on it — keep the page, add the number.
          if (node.num && !prev.nums.includes(node.num)) prev.nums.push(node.num);
        } else {
          seen.set(piste, { piste, page: node.page, src: node.audioSrc, nums: [node.num].filter(Boolean) });
        }
      }
      Object.values(node).forEach(walk);
    };
    walk(unitData);

    const tracks = [...seen.values()].sort((a, b) => a.piste - b.piste);
    for (const t of tracks) {
      out.push({
        piste: t.piste,
        label: t.nums.length ? `Exercice ${t.nums.sort((a, b) => a - b).join(", ")}` : "Exercice",
        sub: "",
        page: t.page,
        src: t.src,
        group,
      });
    }
    const pp = tracks.map(t => t.page).filter(Boolean);
    if (pp.length) group.pages = `p.${Math.min(...pp)}–${Math.max(...pp)}`;
  }
  return out;
}

// ── « 100 % réussite » ───────────────────────────────────────────
// Already an index; only the group shape needs adapting.
const fromDelf = () => PISTES.map(p => ({
  piste: p.piste,
  label: p.label,
  sub: "",
  page: p.page,
  src: p.src,
  group: p.section,
}));

export const AUDIO_BOOKS = [
  {
    id: "delf-a1",
    level: "A1",
    title: "Le DELF A1 100 % réussite",
    publisher: "Didier FLE · 2e édition 2022",
    note: "Đánh số piste theo mục Transcriptions của sách (tr.132–143).",
    icon: "📕",
    tracks: fromDelf(),
  },
  {
    id: "edito-a1-livre",
    level: "A1",
    title: "Édito A1 · Livre",
    publisher: "Didier · 2e édition",
    partial: "Mới có 42 file — đúng những bài app đã soạn sẵn câu hỏi. Các bài nghe còn lại của sách chưa tải lên.",
    icon: "📘",
    tracks: fromLivre(EDITO_AUDIO, EDITO_A1_UNITS, "Unité"),
  },
  {
    id: "edito-a1-cahier",
    level: "A1",
    title: "Édito A1 · Cahier",
    publisher: "Cahier d'activités",
    note: "Cahier A1 không in số piste; số ở đây suy ra từ chính lời đọc trong file.",
    icon: "📗",
    tracks: fromCahier(CAHIER_A1, EDITO_A1_UNITS, "Unité"),
  },
  {
    id: "edito-a2-livre",
    level: "A2",
    title: "Édito A2 · Livre",
    publisher: "Didier · 2e édition 2022",
    partial: "Mới có 40 / 121 file của sách — đúng những bài app đã soạn sẵn câu hỏi. Số còn lại chưa tải lên.",
    icon: "📘",
    tracks: fromLivre(EDITO_AUDIO_A2, EDITO_A2_UNITS, "Unité"),
  },
  {
    id: "edito-a2-cahier",
    level: "A2",
    title: "Édito A2 · Cahier",
    publisher: "Cahier d'activités",
    icon: "📗",
    tracks: fromCahier(CAHIER_A2, EDITO_A2_UNITS, "Unité"),
  },
];

export const bookById = id => AUDIO_BOOKS.find(b => b.id === id);
