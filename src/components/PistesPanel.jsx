import { useState, useRef, useEffect, useMemo } from "react";
import { C, LEVEL_KEY } from "../constants.js";
import { AUDIO_BOOKS } from "../data/audioBooks.js";

// Every book's listening tracks, one book at a time, for working from the paper
// book or the PDF rather than from inside the app. The point is to go from "the
// page says PISTE 43" to hearing it in one tap, so the screen is built around
// finding a number fast: type it, or scroll a compact list where the number
// leads.
//
// One <audio> for the whole screen, not one per row: with hundreds of rows a
// player each is both heavy and wrong — starting a track should stop the one
// before it. The same element makes ⏮/⏭ work, which matters because these are
// meant to be heard twice and in order.

const CARD = { background: C.white, border: `1px solid ${C.border}`, borderRadius: 10 };
const KEY = "audio_book";

export default function PistesPanel({ onBack }) {
  const audioRef = useRef(null);
  const [bookId, setBookId] = useState(() => {
    try { return localStorage.getItem(KEY) || AUDIO_BOOKS[0].id; } catch { return AUDIO_BOOKS[0].id; }
  });
  const [current, setCurrent] = useState(null);   // src of the playing track
  const [playing, setPlaying] = useState(false);
  const [q, setQ]             = useState("");

  // Books are shown for one level at a time, starting from the level the app
  // is set to: at A1 the A2 books are noise, and the list is long enough
  // already. Still switchable, because the other level is one tap away and
  // locking it would be worse than showing it.
  const LEVELS = [...new Set(AUDIO_BOOKS.map(b => b.level))];
  const [level, setLevel] = useState(() => {
    // The app stores its level lowercase ("a1"); the shelf labels them "A1".
    let saved;
    try { saved = (localStorage.getItem(LEVEL_KEY) || "").toUpperCase(); } catch {}
    return LEVELS.includes(saved) ? saved : LEVELS[0];
  });
  const shelf = AUDIO_BOOKS.filter(b => b.level === level);

  const book = shelf.find(b => b.id === bookId) ?? shelf[0] ?? AUDIO_BOOKS[0];

  useEffect(() => { try { localStorage.setItem(KEY, book.id); } catch {} }, [book.id]);

  // The app's own chrome bar is sticky at the top of the same scroll container,
  // so this one has to start below it. Measured rather than hardcoded: a stale
  // constant fails silently by hiding content behind the chrome.
  const [chromeH, setChromeH] = useState(49);
  useEffect(() => {
    const el = document.querySelector("[data-app-chrome]");
    if (!el) return;
    const measure = () => setChromeH(Math.round(el.getBoundingClientRect().height));
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // A query is usually a number, and a number is either a track or a page — so
  // match both and let the list show whichever hit. "43" finds piste 43 and the
  // tracks printed on p.43, which is the ambiguity a learner has in hand.
  const hits = useMemo(() => {
    const s = q.trim();
    if (!s) return book.tracks;
    if (/^\d+$/.test(s)) {
      const n = Number(s);
      return book.tracks.filter(t => t.piste === n || t.page === n ||
                                     String(t.piste).startsWith(s) ||
                                     (t.page != null && String(t.page).startsWith(s)));
    }
    const low = s.toLowerCase();
    return book.tracks.filter(t => `${t.label} ${t.sub} ${t.group.part} ${t.group.skill}`
                                     .toLowerCase().includes(low));
  }, [q, book]);

  // A book is 100+ rows across a dozen units. Every section starts shut so the
  // screen opens as a table of contents; you unfold the unit you're on.
  const [open, setOpen] = useState(() => new Set());
  const toggle = key => setOpen(o => {
    const next = new Set(o);
    next.has(key) ? next.delete(key) : next.add(key);
    return next;
  });

  // `part` alone repeats — the two épreuves blanches share "Compréhension de
  // l'oral" — so a section is identified by both halves of its heading.
  const keyOf = g => `${g.part}|${g.skill}`;

  // The rows regrouped, since they're rendered a section at a time now.
  const sections = useMemo(() => {
    const out = [];
    for (const t of hits) {
      if (!out.length || out.at(-1).group !== t.group) out.push({ group: t.group, tracks: [] });
      out.at(-1).tracks.push(t);
    }
    return out;
  }, [hits]);

  // Searching has to open what it found, or a hit inside a shut section looks
  // like no hit at all. Same for the track that's playing after a jump.
  const searching = q.trim() !== "";
  const currentKey = current && book.tracks.find(t => t.src === current)?.group;

  const track = book.tracks.find(t => t.src === current);

  const play = src => {
    const el = audioRef.current;
    if (!el) return;
    if (src === current) {                       // tapping the playing row pauses it
      if (el.paused) el.play(); else el.pause();
      return;
    }
    setCurrent(src);
    el.src = src;
    el.play().catch(() => {});
  };

  const step = d => {
    const i = book.tracks.findIndex(t => t.src === current);
    const next = book.tracks[i + d];
    if (next) play(next.src);
  };

  useEffect(() => {
    const el = audioRef.current;
    if (!el) return;
    const on = () => setPlaying(true), off = () => setPlaying(false);
    el.addEventListener("play", on);
    el.addEventListener("pause", off);
    el.addEventListener("ended", off);
    return () => { el.removeEventListener("play", on); el.removeEventListener("pause", off);
                   el.removeEventListener("ended", off); };
  }, []);

  // Switching level or book stops whatever was playing — the old track isn't in
  // the new list, so leaving it in the player would strand it there.
  const pickLevel = l => {
    if (l === level) return;
    const first = AUDIO_BOOKS.find(b => b.level === l);
    audioRef.current?.pause();
    setCurrent(null);
    setQ("");
    setLevel(l);
    setOpen(new Set());
    if (first) setBookId(first.id);
    window.scrollTo(0, 0);
  };

  const pickBook = id => {
    if (id === book.id) return;
    audioRef.current?.pause();
    setCurrent(null);
    setQ("");
    setOpen(new Set());
    setBookId(id);
    window.scrollTo(0, 0);
  };

  const first = book.tracks[0], last = book.tracks.at(-1);

  return (
    <div style={{ paddingBottom: "5rem" }}>
      <header style={{ background: C.ink, color: "#fff", padding: "0.7rem 1rem" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <button onClick={onBack}
            style={{ flexShrink: 0, background: "rgba(255,255,255,0.14)", color: "#fff", border: "none",
                     borderRadius: 20, width: 30, height: 30, cursor: "pointer", fontSize: "0.85rem" }}>
            ←
          </button>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontFamily: "'Playfair Display',Georgia,serif", fontSize: "1rem", fontWeight: 700 }}>
              Fichiers audio
            </div>
            <div style={{ fontSize: "0.63rem", opacity: 0.72 }}>
              File nghe của các sách — để nghe khi học bằng sách giấy / PDF
            </div>
          </div>
        </div>
      </header>

      {/* Book first: which book you're in changes what every number below
          means, so it can't be buried under the player. */}
      <div style={{ padding: "0.6rem 1rem 0", display: "flex", flexWrap: "wrap", gap: "0.3rem" }}>
        <div style={{ display: "flex", gap: 3, marginRight: 4 }}>
          {LEVELS.map(l => {
            const on = l === level;
            return (
              <button key={l} onClick={() => pickLevel(l)}
                style={{ background: on ? C.blue : C.white, color: on ? "#fff" : C.gray,
                         border: `1px solid ${on ? C.blue : C.border}`, borderRadius: 20,
                         padding: "0.22rem 0.6rem", fontSize: "0.66rem", fontWeight: 800,
                         fontFamily: "'JetBrains Mono',monospace", cursor: "pointer" }}>
                {l}
              </button>
            );
          })}
        </div>
        {shelf.map(b => {
          const on = b.id === book.id;
          return (
            <button key={b.id} onClick={() => pickBook(b.id)}
              style={{ display: "flex", alignItems: "center", gap: 5,
                       background: on ? C.ink : C.white, color: on ? "#fff" : C.ink,
                       border: `1px solid ${on ? C.ink : C.border}`, borderRadius: 20,
                       padding: "0.22rem 0.6rem", fontSize: "0.68rem", fontWeight: on ? 700 : 400,
                       cursor: "pointer", fontFamily: "inherit" }}>
              <span>{b.icon}</span>
              <span>{b.title}</span>
              <span style={{ fontSize: "0.6rem", opacity: 0.6,
                             fontFamily: "'JetBrains Mono',monospace" }}>{b.tracks.length}</span>
            </button>
          );
        })}
      </div>

      {/* The player stays put while the list scrolls — the whole point is to
          keep the current track reachable while hunting for the next one. */}
      <div style={{ position: "sticky", top: chromeH, zIndex: 5, background: C.paper,
                    borderBottom: `1px solid ${C.border}`, padding: "0.6rem 1rem 0.7rem" }}>
        <div style={{ ...CARD, padding: "0.5rem 0.6rem", marginBottom: "0.5rem" }}>
          {track ? (
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: "0.4rem" }}>
              <span style={{ flexShrink: 0, background: C.blue, color: "#fff", borderRadius: 7,
                             padding: "0.1rem 0.4rem", fontSize: "0.62rem", fontWeight: 800,
                             fontFamily: "'JetBrains Mono',monospace" }}>
                PISTE {track.piste}
              </span>
              <span style={{ flex: 1, minWidth: 0, fontSize: "0.72rem", color: C.ink,
                             overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                {track.label}{track.page ? ` · p.${track.page}` : ""}
              </span>
              <button onClick={() => step(-1)} disabled={track.src === first.src}
                style={btn(track.src === first.src)}>⏮</button>
              <button onClick={() => step(1)} disabled={track.src === last.src}
                style={btn(track.src === last.src)}>⏭</button>
            </div>
          ) : (
            <div style={{ fontSize: "0.7rem", color: C.gray, padding: "0.15rem 0 0.4rem" }}>
              Chọn một piste bên dưới để nghe.
            </div>
          )}
          <audio ref={audioRef} controls style={{ width: "100%", height: 34 }} />
        </div>

        <input value={q} onChange={e => setQ(e.target.value)}
          placeholder="Gõ số piste, số trang, hoặc tên bài…"
          style={{ width: "100%", boxSizing: "border-box", background: C.white,
                   border: `1px solid ${C.border}`, borderRadius: 20, padding: "0.35rem 0.75rem",
                   fontSize: "0.73rem", color: C.ink, fontFamily: "inherit" }} />
      </div>

      <div style={{ padding: "0.6rem 1rem 0" }}>
        <div style={{ fontSize: "0.63rem", color: C.gray2, lineHeight: 1.6, marginBottom: "0.3rem" }}>
          {book.publisher}
          {book.note && <> · {book.note}</>}
        </div>
        {book.partial && (
          <div style={{ background: C.goldL, borderRadius: 8, padding: "0.35rem 0.55rem",
                        fontSize: "0.66rem", color: C.ink2, lineHeight: 1.5, marginBottom: "0.3rem" }}>
            ⚠ {book.partial}
          </div>
        )}

        {hits.length === 0 && (
          <div style={{ fontSize: "0.72rem", color: C.gray, padding: "1rem 0" }}>
            Không có piste nào khớp « {q} ».
          </div>
        )}

        {sections.map(sec => {
          const key = keyOf(sec.group);
          const isOpen = open.has(key) || searching || sec.group === currentKey;
          const playingHere = sec.tracks.some(t => t.src === current);
          return (
            <section key={key}>
              <button onClick={() => toggle(key)}
                style={{ width: "100%", display: "flex", alignItems: "baseline", gap: 8,
                         margin: "0.55rem 0 0.35rem", background: "none", border: "none",
                         padding: "0.1rem 0", cursor: "pointer", fontFamily: "inherit",
                         textAlign: "left" }}>
                <span style={{ flexShrink: 0, fontFamily: "'JetBrains Mono',monospace",
                               fontSize: "0.58rem", fontWeight: 800, letterSpacing: "0.05em",
                               color: "#fff", background: playingHere ? C.blue : C.gray2,
                               borderRadius: 7, padding: "0.1rem 0.4rem" }}>
                  {sec.group.part}
                </span>
                <span style={{ flex: 1, minWidth: 0, fontSize: "0.68rem", fontWeight: 700,
                               color: C.ink, overflow: "hidden", textOverflow: "ellipsis",
                               whiteSpace: "nowrap" }}>
                  {sec.group.skill}
                </span>
                {sec.group.pages && (
                  <span style={{ flexShrink: 0, fontSize: "0.6rem", color: C.gray2 }}>
                    {sec.group.pages}
                  </span>
                )}
                <span style={{ flexShrink: 0, fontSize: "0.6rem", color: C.gray2,
                               fontFamily: "'JetBrains Mono',monospace" }}>
                  {sec.tracks.length}
                </span>
                <span style={{ flexShrink: 0, fontSize: "0.65rem", color: C.blue }}>
                  {isOpen ? "▲" : "▼"}
                </span>
              </button>

              {isOpen && sec.tracks.map(t => {
                const on = t.src === current;
                return (
                  <button key={t.src} onClick={() => play(t.src)}
                    style={{ width: "100%", display: "flex", alignItems: "center", gap: 9,
                             padding: "0.4rem 0.55rem", marginBottom: "0.3rem", cursor: "pointer",
                             fontFamily: "inherit", textAlign: "left", borderRadius: 10,
                             /* one `border`, never shorthand plus borderColor — React
                                warns, and the two disagree on re-render */
                             border: `1px solid ${on ? C.blue : C.border}`,
                             background: on ? C.blueL : C.white }}>
                    <span style={{ flexShrink: 0, width: 26, height: 26, borderRadius: 26,
                                   background: on ? C.blue : C.cream, color: on ? "#fff" : C.ink2,
                                   display: "flex", alignItems: "center", justifyContent: "center",
                                   fontSize: "0.7rem" }}>
                      {on && playing ? "❚❚" : "▶"}
                    </span>
                    <span style={{ flexShrink: 0, fontFamily: "'JetBrains Mono',monospace",
                                   fontSize: "0.68rem", fontWeight: 800,
                                   color: on ? C.blue : C.gray2, minWidth: 24 }}>
                      {t.piste}
                    </span>
                    <span style={{ flex: 1, minWidth: 0 }}>
                      <span style={{ display: "block", fontSize: "0.74rem", color: C.ink,
                                     fontFamily: "Georgia,serif", overflow: "hidden",
                                     textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                        {t.label}
                      </span>
                      {t.sub && (
                        <span style={{ display: "block", fontSize: "0.6rem", color: C.gray2 }}>
                          {t.sub}
                        </span>
                      )}
                    </span>
                    {t.page && (
                      <span style={{ flexShrink: 0, fontSize: "0.63rem", color: C.gray2 }}>
                        p.{t.page}
                      </span>
                    )}
                  </button>
                );
              })}
            </section>
          );
        })}

      </div>
    </div>
  );
}

const btn = disabled => ({
  flexShrink: 0, background: C.cream, border: `1px solid ${C.border}`, borderRadius: 20,
  padding: "0.15rem 0.5rem", fontSize: "0.7rem", cursor: disabled ? "default" : "pointer",
  opacity: disabled ? 0.35 : 1, fontFamily: "inherit", color: C.ink,
});
