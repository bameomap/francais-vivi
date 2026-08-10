import { useState, useRef, useEffect, useMemo } from "react";
import { C } from "../constants.js";
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

  const book = AUDIO_BOOKS.find(b => b.id === bookId) ?? AUDIO_BOOKS[0];

  useEffect(() => { try { localStorage.setItem(KEY, bookId); } catch {} }, [bookId]);

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
                                     String(t.piste).startsWith(s) || String(t.page).startsWith(s));
    }
    const low = s.toLowerCase();
    return book.tracks.filter(t => `${t.label} ${t.sub} ${t.group.part} ${t.group.skill}`
                                     .toLowerCase().includes(low));
  }, [q, book]);

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

  // Switching book stops whatever was playing — the old track isn't in the new
  // list, so leaving it in the player would strand it there.
  const pickBook = id => {
    if (id === bookId) return;
    audioRef.current?.pause();
    setCurrent(null);
    setQ("");
    setBookId(id);
    window.scrollTo(0, 0);
  };

  const first = book.tracks[0], last = book.tracks.at(-1);
  let lastGroup = null;

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
        {AUDIO_BOOKS.map(b => {
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
                {track.label} · p.{track.page}
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

        {hits.map(t => {
          const head = t.group !== lastGroup ? t.group : null;
          lastGroup = t.group;
          const on = t.src === current;
          return (
            <div key={t.src}>
              {head && (
                <div style={{ display: "flex", alignItems: "baseline", gap: 8,
                              margin: "0.9rem 0 0.4rem" }}>
                  <span style={{ flexShrink: 0, fontFamily: "'JetBrains Mono',monospace",
                                 fontSize: "0.58rem", fontWeight: 800, letterSpacing: "0.05em",
                                 color: "#fff", background: C.gray2, borderRadius: 7,
                                 padding: "0.1rem 0.4rem" }}>
                    {head.part}
                  </span>
                  <span style={{ flex: 1, minWidth: 0, fontSize: "0.68rem", fontWeight: 700, color: C.ink }}>
                    {head.skill}
                  </span>
                  <span style={{ flexShrink: 0, fontSize: "0.6rem", color: C.gray2 }}>{head.pages}</span>
                </div>
              )}

              <button onClick={() => play(t.src)}
                style={{ ...CARD, width: "100%", display: "flex", alignItems: "center", gap: 9,
                         padding: "0.4rem 0.55rem", marginBottom: "0.3rem", cursor: "pointer",
                         fontFamily: "inherit", textAlign: "left",
                         borderColor: on ? C.blue : C.border,
                         background: on ? C.blueL : C.white }}>
                <span style={{ flexShrink: 0, width: 26, height: 26, borderRadius: 26,
                               background: on ? C.blue : C.cream, color: on ? "#fff" : C.ink2,
                               display: "flex", alignItems: "center", justifyContent: "center",
                               fontSize: "0.7rem" }}>
                  {on && playing ? "❚❚" : "▶"}
                </span>
                <span style={{ flexShrink: 0, fontFamily: "'JetBrains Mono',monospace",
                               fontSize: "0.68rem", fontWeight: 800, color: on ? C.blue : C.gray2,
                               minWidth: 24 }}>
                  {t.piste}
                </span>
                <span style={{ flex: 1, minWidth: 0 }}>
                  <span style={{ display: "block", fontSize: "0.74rem", color: C.ink,
                                 fontFamily: "Georgia,serif", overflow: "hidden",
                                 textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                    {t.label}
                  </span>
                  {t.sub && (
                    <span style={{ display: "block", fontSize: "0.6rem", color: C.gray2 }}>{t.sub}</span>
                  )}
                </span>
                <span style={{ flexShrink: 0, fontSize: "0.63rem", color: C.gray2 }}>p.{t.page}</span>
              </button>
            </div>
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
