import { useState } from "react";
import { C } from "../constants.js";

// One activité or exercice from « Le DELF A1 100 % réussite », whatever the
// paper: a reading document, a listening track, or a whole mock-exam task.
// Shared by the Đọc / Nghe / Thi thử tabs so grading, scoring and the answer
// reveal behave identically everywhere.
//
// Vietnamese is opt-in. The exam is in French and reading the translation first
// defeats the exercise, so every gloss hides behind a « ? » the learner presses
// when actually stuck. `alwaysVi` flips that for people who want it on.

const LETTERS = ["A", "B", "C"];

// ── A gloss you have to ask for ──────────────────────────────────
// The « ? » sits inline at the end of the French, so an unopened gloss costs a
// few pixels on a line that already exists instead of a row of its own.
export function Gloss({ vi, always, size = "0.68rem" }) {
  const [open, setOpen] = useState(false);
  if (!vi) return null;
  if (always || open) {
    return (
      <span style={{ display: "block", fontSize: size, color: C.gray, lineHeight: 1.5, marginTop: 1 }}>
        {vi}
      </span>
    );
  }
  return (
    <button onClick={() => setOpen(true)} title="Xem nghĩa tiếng Việt"
      style={{ background: "none", border: `1px solid ${C.border}`, borderRadius: 20,
               color: C.gray2, cursor: "pointer", fontFamily: "inherit",
               fontSize: "0.58rem", fontWeight: 700, lineHeight: 1,
               padding: "0.08rem 0.3rem", marginLeft: 5,
               display: "inline-block", verticalAlign: "middle" }}>
      ?
    </button>
  );
}

// ── The document being read ──────────────────────────────────────
export function DocBlock({ doc }) {
  if (!doc) return null;

  if (doc.kind === "image") {
    return (
      <figure style={{ margin: 0, marginBottom: "0.7rem" }}>
        <img src={doc.src} alt={doc.alt || ""} loading="lazy"
          style={{ width: "100%", maxWidth: 460, display: "block", margin: "0 auto",
                   borderRadius: 10, border: `1px solid ${C.border}`, background: "#fff" }} />
      </figure>
    );
  }

  if (doc.kind === "table") {
    return (
      <div style={{ overflowX: "auto", marginBottom: "0.7rem", border: `1px solid ${C.border}`, borderRadius: 10 }}>
        <table style={{ borderCollapse: "collapse", fontSize: "0.68rem", minWidth: 640 }}>
          <thead>
            <tr>
              {doc.cols.map((c, i) => (
                <th key={i} style={{ background: C.cream, color: C.ink, fontWeight: 700,
                                     padding: "0.4rem 0.5rem", textAlign: "left", borderBottom: `1px solid ${C.border}` }}>
                  {c}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {doc.rows.map((row, r) => (
              <tr key={r}>
                {row.map((cell, i) => (
                  <td key={i} style={{ padding: "0.4rem 0.5rem", verticalAlign: "top", color: C.ink,
                                       borderBottom: `1px solid ${C.borderSoft}`,
                                       borderLeft: i ? `1px solid ${C.borderSoft}` : "none",
                                       whiteSpace: "pre-line", lineHeight: 1.5 }}>
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  return (
    <div style={{
      background: C.cream, border: `1px solid ${C.border}`, borderRadius: 10,
      padding: "0.7rem 0.8rem", marginBottom: "0.7rem",
      fontFamily: "Georgia,serif", color: C.ink, lineHeight: 1.65, fontSize: "0.76rem",
    }}>
      {doc.title && (
        <div style={{ fontWeight: 700, fontSize: "0.85rem", marginBottom: "0.4rem",
                      textAlign: doc.style === "affiche" || doc.style === "invitation" ? "center" : "left" }}>
          {doc.title}
        </div>
      )}
      {doc.paras?.map((p, i) => <p key={i} style={{ margin: "0 0 0.45rem" }}>{p}</p>)}

      {doc.cards && (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(150px,1fr))", gap: "0.45rem", marginTop: "0.5rem" }}>
          {doc.cards.map((c, i) => (
            <div key={i} style={{ background: C.white, border: `1px solid ${C.border}`, borderRadius: 8, padding: "0.45rem 0.55rem" }}>
              {c.title && <div style={{ fontWeight: 700, fontSize: "0.72rem", marginBottom: "0.2rem" }}>{c.title}</div>}
              {c.lines.map((l, k) => (
                <div key={k} style={{ fontSize: "0.7rem", color: C.ink2, lineHeight: 1.5 }}>{l}</div>
              ))}
            </div>
          ))}
        </div>
      )}

      {doc.aside && (
        <div style={{ marginTop: "0.55rem", paddingTop: "0.45rem", borderTop: `1px dashed ${C.border}`,
                      fontSize: "0.7rem", color: C.gray, textAlign: "right" }}>
          {doc.aside.map((l, i) => <div key={i}>{l}</div>)}
        </div>
      )}

      {doc.footer && (
        <div style={{ marginTop: "0.5rem", fontSize: "0.7rem", color: C.gray, textAlign: "center" }}>{doc.footer}</div>
      )}
    </div>
  );
}

// ── One question ─────────────────────────────────────────────────
function Question({ q, n, value, onPick, checked, reveal, color, alwaysVi }) {
  const isImage = q.kind === "image";
  const ok = value != null && value === q.answer;
  const choices = isImage ? LETTERS : q.options;
  const show = checked || reveal;

  return (
    <div style={{ marginBottom: "0.85rem" }}>
      <div style={{ display: "flex", alignItems: "baseline", gap: 6 }}>
        <span style={{ flexShrink: 0, fontFamily: "'JetBrains Mono',monospace", fontSize: "0.62rem",
                       fontWeight: 700, color }}>{n}</span>
        <div style={{ flex: 1, minWidth: 0 }}>
          {q.lead && (
            <div style={{ fontSize: "0.68rem", color: C.gray2, fontWeight: 700, marginBottom: 1 }}>{q.lead}</div>
          )}
          <div style={{ fontSize: "0.76rem", color: C.ink, fontFamily: "Georgia,serif", lineHeight: 1.5 }}>
            {q.q}<Gloss vi={q.vi} always={alwaysVi} />
          </div>
        </div>
        {q.pts && (
          <span style={{ flexShrink: 0, fontSize: "0.58rem", color: C.gray2, fontWeight: 700 }}>
            {q.pts} pt{q.pts > 1 ? "s" : ""}
          </span>
        )}
      </div>

      {isImage && (
        <div style={{ margin: "0.4rem 0 0.35rem" }}>
          <img src={q.src} alt="" loading="lazy"
            style={{ width: "100%", display: "block", borderRadius: 8, background: "#fff" }} />
          {/* Some picture choices straddle a page break in the book */}
          {q.src2 && (
            <img src={q.src2} alt="" loading="lazy"
              style={{ width: "100%", display: "block", borderRadius: 8, background: "#fff", marginTop: 4 }} />
          )}
        </div>
      )}

      <div style={{ display: "flex", flexWrap: "wrap", gap: "0.3rem", marginTop: "0.35rem",
                    marginLeft: isImage ? 0 : "1.05rem" }}>
        {choices.map((choice, i) => {
          const sel = value === choice;
          const isRight = choice === q.answer;
          const bg = show ? (isRight ? C.greenL : sel ? C.redL : C.white) : sel ? C.blueL : C.white;
          const bd = show ? (isRight ? C.green : sel ? C.red : C.border) : sel ? C.blue : C.border;
          const fg = show ? (isRight ? C.green : sel ? C.red : C.ink) : C.ink;
          return (
            <button key={i} disabled={show} onClick={() => onPick(choice)}
              style={{ background: bg, color: fg, border: `1.5px solid ${bd}`, borderRadius: 8,
                       padding: isImage ? "0.2rem 0.7rem" : "0.22rem 0.55rem",
                       fontSize: isImage ? "0.75rem" : "0.73rem", fontWeight: isImage ? 700 : 400,
                       fontFamily: "Georgia,serif", cursor: show ? "default" : "pointer", textAlign: "left" }}>
              {choice}
            </button>
          );
        })}
        {checked && (ok
          ? <span style={{ color: C.green, fontWeight: 700, fontSize: "0.75rem", alignSelf: "center" }}>✓</span>
          : <span style={{ color: C.red, fontWeight: 700, fontSize: "0.75rem", alignSelf: "center" }}>✗</span>)}
      </div>

      {show && q.note && (
        <div style={{ marginTop: "0.35rem", marginLeft: isImage ? 0 : "1.05rem",
                      background: C.goldL, borderRadius: 8, padding: "0.35rem 0.5rem",
                      fontSize: "0.68rem", color: C.ink2, lineHeight: 1.55 }}>
          💡 {q.note}
        </div>
      )}
    </div>
  );
}

// ── The card ─────────────────────────────────────────────────────
export default function DelfItemCard({ item, color, done, onDone, alwaysVi, defaultOpen = false }) {
  const [open, setOpen]       = useState(defaultOpen);
  const [val, setVal]         = useState({});
  const [checked, setChecked] = useState(false);
  const [script, setScript]   = useState(false);

  const total  = item.questions.length;
  const score  = item.questions.filter((q, i) => val[i] === q.answer).length;
  const maxPts = item.questions.reduce((a, q) => a + (q.pts || 0), 0);
  const gotPts = item.questions.reduce((a, q, i) => a + (val[i] === q.answer ? (q.pts || 0) : 0), 0);

  const check = () => { setChecked(true); if (!done) onDone(); };
  const reset = () => { setVal({}); setChecked(false); setScript(false); };

  return (
    <div style={{ background: C.white, border: `1px solid ${C.border}`, borderLeft: `3px solid ${color}`,
                  borderRadius: 10, marginBottom: "0.55rem", overflow: "hidden" }}>
      <button onClick={() => setOpen(o => !o)}
        style={{ width: "100%", background: "none", border: "none", padding: "0.6rem 0.75rem",
                 cursor: "pointer", fontFamily: "inherit", textAlign: "left",
                 display: "flex", alignItems: "center", gap: 8 }}>
        <span style={{ flexShrink: 0, fontFamily: "'JetBrains Mono',monospace", fontSize: "0.6rem",
                       fontWeight: 700, color, border: `1px solid ${color}55`, borderRadius: 20,
                       padding: "0.05rem 0.4rem" }}>
          {item.label}
        </span>
        <span style={{ flex: 1, minWidth: 0, fontSize: "0.72rem", color: C.ink2, lineHeight: 1.4 }}>
          {item.audio ? "🎧 " : ""}{item.title || item.setup}
        </span>
        {item.worked && (
          <span style={{ flexShrink: 0, background: C.goldL, color: C.gold, borderRadius: 20,
                         padding: "0.05rem 0.4rem", fontSize: "0.56rem", fontWeight: 700 }}>
            bài mẫu
          </span>
        )}
        {done && !item.worked && <span style={{ flexShrink: 0, color: C.green, fontSize: "0.75rem" }}>✓</span>}
        <span style={{ flexShrink: 0, color, fontSize: "0.7rem" }}>{open ? "▲" : "▼"}</span>
      </button>

      {open && (
        <div style={{ padding: "0 0.75rem 0.75rem" }}>
          {/* The collapsed header already shows the consigne when the item has
              no separate title, so don't print it twice — but the gloss still
              needs somewhere to hang. */}
          <div style={{ fontSize: "0.72rem", color: C.ink, fontFamily: "Georgia,serif",
                        fontStyle: "italic", marginBottom: "0.5rem" }}>
            {item.title ? item.setup : null}
            <Gloss vi={item.setupVi} always={alwaysVi} />
          </div>

          {item.tip && (
            <div style={{ background: C.blueL, borderRadius: 8, padding: "0.4rem 0.55rem",
                          marginBottom: "0.6rem", fontSize: "0.69rem", color: C.ink2, lineHeight: 1.55 }}>
              ▸ {item.tip}
              <Gloss vi={item.tipVi} always={alwaysVi} />
            </div>
          )}

          {/* Listening: the recording is the document. preload="none" keeps a
              page of exercises from fetching every track at once. */}
          {item.audio && (
            <div style={{ marginBottom: "0.6rem" }}>
              <audio controls preload="none" src={item.audio} style={{ width: "100%", height: 34 }} />
              <div style={{ fontSize: "0.6rem", color: C.gray2, marginTop: 2 }}>
                Nghe 2 lần, như trong phòng thi · piste {item.piste}
              </div>
            </div>
          )}

          <DocBlock doc={item.doc} />

          {item.questions.map((q, i) => (
            <Question key={i} q={q} n={i + 1} color={color} alwaysVi={alwaysVi}
              value={val[i]} onPick={v => setVal(s => ({ ...s, [i]: v }))}
              checked={checked} reveal={item.worked} />
          ))}

          {item.worked ? (
            <div style={{ fontSize: "0.66rem", color: C.gray, lineHeight: 1.55 }}>
              📖 Bài mẫu của sách: đáp án và lời giải in sẵn ở trang {item.page}. Hãy tự trả lời trong đầu trước khi đọc.
            </div>
          ) : (
            <div style={{ display: "flex", alignItems: "center", gap: "0.4rem", flexWrap: "wrap" }}>
              {!checked ? (
                <button onClick={check}
                  style={{ background: color, color: "#fff", border: "none", borderRadius: 20,
                           padding: "0.25rem 0.85rem", fontSize: "0.7rem", fontWeight: 700,
                           cursor: "pointer", fontFamily: "inherit" }}>
                  Kiểm tra
                </button>
              ) : (
                <>
                  <span style={{ background: score === total ? C.green : C.gold, color: "#fff",
                                 borderRadius: 20, padding: "0.15rem 0.6rem", fontSize: "0.68rem", fontWeight: 700 }}>
                    {score}/{total} đúng{maxPts ? ` · ${gotPts}/${maxPts} điểm` : ""}
                  </span>
                  <button onClick={reset}
                    style={{ background: C.white, color, border: `1px solid ${color}66`, borderRadius: 20,
                             padding: "0.15rem 0.6rem", fontSize: "0.66rem", fontWeight: 700,
                             cursor: "pointer", fontFamily: "inherit" }}>
                    ↻ Làm lại
                  </button>
                  {/* The transcript stays shut until the answers are in — opening
                      it early turns a listening exercise into a reading one. It
                      shares this row rather than claiming one of its own. */}
                  {item.transcript && (
                    <button onClick={() => setScript(v => !v)}
                      style={{ background: script ? `${color}18` : C.cream, border: `1px solid ${color}55`,
                               borderRadius: 20, padding: "0.15rem 0.6rem", fontSize: "0.66rem",
                               fontWeight: 700, color: C.ink, cursor: "pointer", fontFamily: "inherit" }}>
                      {script ? "Ẩn lời thoại" : "📄 Lời thoại"}
                    </button>
                  )}
                </>
              )}
              <span style={{ marginLeft: "auto", fontSize: "0.6rem", color: C.gray2 }}>Livre p.{item.page}</span>
            </div>
          )}

          {script && item.transcript && (
            <div style={{ marginTop: "0.5rem", background: C.cream, borderRadius: 9,
                          padding: "0.55rem 0.65rem", fontSize: "0.74rem", color: C.ink,
                          lineHeight: 1.7, fontFamily: "Georgia,serif", whiteSpace: "pre-line" }}>
              {item.transcript}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
