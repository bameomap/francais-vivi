import { useState, useRef, useEffect, useMemo } from "react";
import { C } from "../constants.js";
import { PISTES } from "../data/delfA1Pistes.js";

// The book's 97 tracks as a list, for working from the paper book (or the PDF)
// rather than from this app. The point is to go from "the page says PISTE 43"
// to hearing it in one tap, so the whole screen is built around finding a
// number fast: type it, or scroll a compact list where the number leads.
//
// One <audio> for the lot, not one per row: with 97 rows a player each is both
// heavy and wrong — starting a track should stop the one before it. The same
// element also makes ▶︎ next work, which matters because the drills are meant
// to be listened to twice and in order.

const CARD = { background: C.white, border: `1px solid ${C.border}`, borderRadius: 10 };

export default function DelfPistesPanel({ onBack }) {
  const audioRef = useRef(null);
  const [current, setCurrent] = useState(null);   // piste number
  const [playing, setPlaying] = useState(false);
  const [q, setQ]             = useState("");

  // The app's own chrome bar is sticky at the top of the same scroll container,
  // so this one has to start below it. Measured rather than hardcoded: a stale
  // constant hides the top of the player behind the chrome instead of failing
  // loudly.
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

  // A query is a number, and a number is either a track or a page — so match
  // both and let the list show whichever hit. "43" finds piste 43 and p.43.
  const hits = useMemo(() => {
    const s = q.trim();
    if (!s) return PISTES;
    const n = Number(s);
    if (Number.isFinite(n) && s !== "") {
      return PISTES.filter(p => p.piste === n || p.page === n ||
                                String(p.piste).startsWith(s) || String(p.page).startsWith(s));
    }
    const low = s.toLowerCase();
    return PISTES.filter(p => p.label.toLowerCase().includes(low) ||
                              p.section.skill.toLowerCase().includes(low) ||
                              p.section.part.toLowerCase().includes(low));
  }, [q]);

  const track = PISTES.find(p => p.piste === current);

  const play = piste => {
    const el = audioRef.current;
    if (!el) return;
    if (piste === current) {                       // tapping the playing row pauses it
      if (el.paused) el.play(); else el.pause();
      return;
    }
    setCurrent(piste);
    el.src = `/api/delf-audio?p=${piste}`;
    el.play().catch(() => {});
  };

  const step = d => {
    const i = PISTES.findIndex(p => p.piste === current);
    const next = PISTES[i + d];
    if (next) play(next.piste);
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

  // Rows carry their section heading with them, so a filtered list still says
  // which part of the book each hit comes from.
  let lastSection = null;

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
              Les 97 pistes
            </div>
            <div style={{ fontSize: "0.63rem", opacity: 0.72 }}>
              Le DELF A1 100 % réussite · để nghe khi học bằng sách giấy / PDF
            </div>
          </div>
        </div>
      </header>

      {/* The player stays put while the list scrolls — the whole point is to
          keep the current track reachable while hunting for the next one. */}
      <div style={{ position: "sticky", top: chromeH, zIndex: 5, background: C.paper,
                    borderBottom: `1px solid ${C.border}`, padding: "0.6rem 1rem 0.7rem" }}>
        <div style={{ ...CARD, padding: "0.5rem 0.6rem", marginBottom: "0.5rem" }}>
          {track ? (
            <>
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
                <button onClick={() => step(-1)} disabled={track.piste === PISTES[0].piste}
                  style={btn(track.piste === PISTES[0].piste)}>⏮</button>
                <button onClick={() => step(1)} disabled={track.piste === PISTES.at(-1).piste}
                  style={btn(track.piste === PISTES.at(-1).piste)}>⏭</button>
              </div>
              <audio ref={audioRef} controls style={{ width: "100%", height: 34 }} />
            </>
          ) : (
            <>
              <div style={{ fontSize: "0.7rem", color: C.gray, padding: "0.15rem 0 0.4rem" }}>
                Chọn một piste bên dưới để nghe.
              </div>
              <audio ref={audioRef} controls style={{ width: "100%", height: 34 }} />
            </>
          )}
        </div>

        <input value={q} onChange={e => setQ(e.target.value)} inputMode="numeric"
          placeholder="Gõ số piste hoặc số trang… (vd: 43)"
          style={{ width: "100%", boxSizing: "border-box", background: C.white,
                   border: `1px solid ${C.border}`, borderRadius: 20, padding: "0.35rem 0.75rem",
                   fontSize: "0.73rem", color: C.ink, fontFamily: "inherit" }} />
      </div>

      <div style={{ padding: "0.6rem 1rem 0" }}>
        {hits.length === 0 && (
          <div style={{ fontSize: "0.72rem", color: C.gray, padding: "1rem 0" }}>
            Không có piste nào khớp « {q} ».
          </div>
        )}

        {hits.map(p => {
          const head = p.section !== lastSection ? p.section : null;
          lastSection = p.section;
          const on = p.piste === current;
          return (
            <div key={p.piste}>
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

              <button onClick={() => play(p.piste)}
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
                  {p.piste}
                </span>
                <span style={{ flex: 1, minWidth: 0, fontSize: "0.74rem", color: C.ink,
                               fontFamily: "Georgia,serif", overflow: "hidden",
                               textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                  {p.label}
                </span>
                <span style={{ flexShrink: 0, fontSize: "0.63rem", color: C.gray2 }}>p.{p.page}</span>
              </button>
            </div>
          );
        })}

        <div style={{ marginTop: "1.2rem", fontSize: "0.62rem", color: C.gray2, lineHeight: 1.6 }}>
          Nguồn: Le DELF A1 100 % réussite — Didier FLE, 2e édition 2022. 97 piste, đánh số theo
          mục <i>Transcriptions</i> của sách (tr.132–143).
        </div>
      </div>
    </div>
  );
}

const btn = disabled => ({
  flexShrink: 0, background: C.cream, border: `1px solid ${C.border}`, borderRadius: 20,
  padding: "0.15rem 0.5rem", fontSize: "0.7rem", cursor: disabled ? "default" : "pointer",
  opacity: disabled ? 0.35 : 1, fontFamily: "inherit", color: C.ink,
});
