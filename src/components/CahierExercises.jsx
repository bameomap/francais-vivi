import { useState } from "react";
import { C } from "../constants.js";
import SpeakBtn from "./ui/SpeakBtn.jsx";
import { isAnswerCorrect } from "../utils/cahierAnswer.js";

// Renders the Cahier d'activités exercises for one step. Every answer comes
// from the cahier's own Corrigés, so grading is exact rather than AI-judged —
// which is the point: a self-learner needs an answer they can trust.
//
// Items flagged `example` are the book's worked example: shown solved, greyed,
// and left out of the score.

function Chip({ children, onClick, tone = "idle", disabled }) {
  const bg = tone === "used" ? C.cream : tone === "ok" ? C.greenL : tone === "bad" ? C.redL : C.white;
  const fg = tone === "used" ? C.gray2 : tone === "ok" ? C.green : tone === "bad" ? C.red : C.ink;
  const bd = tone === "used" ? C.border : tone === "ok" ? C.green : tone === "bad" ? C.red : C.blue;
  return (
    <button onClick={onClick} disabled={disabled}
      style={{
        background: bg, color: fg, border: `1.5px solid ${bd}66`,
        borderRadius: 8, padding: "0.22rem 0.5rem", fontSize: "0.75rem",
        fontFamily: "Georgia,serif", cursor: disabled ? "default" : "pointer",
        opacity: disabled && tone === "used" ? 0.5 : 1,
      }}>
      {children}
    </button>
  );
}

function Verdict({ ok, expected }) {
  if (ok) return <span style={{ color: C.green, fontSize: "0.72rem", fontWeight: 700 }}>✓</span>;
  return (
    <span style={{ fontSize: "0.7rem", color: C.red, fontWeight: 600 }}>
      ✗ <span style={{ fontFamily: "Georgia,serif", color: C.ink }}>{expected}</span>
    </span>
  );
}

// ── One exercise ──────────────────────────────────────────────
function Exercise({ ex, color }) {
  const [val, setVal]         = useState({});   // itemIdx -> string | string[]
  const [checked, setChecked] = useState(false);

  // `match` keeps its data in `pairs`, everything else in `items` — score off
  // whichever this exercise actually uses, or the total comes out as 0.
  const scored = ex.type === "match"
    ? (ex.pairs || []).map((p, i) => ({ it: p, i }))
    : (ex.items || []).map((it, i) => ({ it, i })).filter(x => !x.it.example);

  const itemOk = (it, i) => {
    if (it.example) return true;
    if (ex.type === "match") return isAnswerCorrect(val[i], it.r);
    if (ex.type === "order") {
      const given = val[i] || [];
      const want  = Array.isArray(it.answer) ? it.answer : it.answer.split(/\s+/);
      return given.length === want.length && given.every((t, k) => isAnswerCorrect(t, want[k]));
    }
    return isAnswerCorrect(val[i], it.answer);
  };

  const score = checked ? scored.filter(x => itemOk(x.it, x.i)).length : 0;

  const reset = () => { setVal({}); setChecked(false); };

  return (
    <div style={{
      background: C.white, border: `1px solid ${C.border}`,
      borderLeft: `3px solid ${color}`, borderRadius: 10,
      padding: "0.7rem 0.8rem", marginBottom: "0.55rem",
    }}>
      {/* header */}
      <div style={{ display: "flex", alignItems: "baseline", gap: 6, marginBottom: 3 }}>
        <span style={{
          flexShrink: 0, fontFamily: "'JetBrains Mono',monospace", fontSize: "0.6rem",
          fontWeight: 700, color, border: `1px solid ${color}55`, borderRadius: 20, padding: "0.03rem 0.38rem",
        }}>
          {ex.num}
        </span>
        <span style={{ fontSize: "0.75rem", fontWeight: 700, color: C.ink, lineHeight: 1.35 }}>
          {ex.audioSrc ? "🎧 " : ""}{ex.instruction}
        </span>
      </div>
      {ex.vi && (
        <div style={{ fontSize: "0.68rem", color: C.gray, lineHeight: 1.5, marginBottom: "0.5rem" }}>
          {ex.vi}
        </div>
      )}

      {/* Audio exercises: the recording IS the question, so the player sits
          above the items. preload="none" keeps a page of exercises from
          fetching every track at once. */}
      {ex.audioSrc && (
        <div style={{ marginBottom: "0.55rem" }}>
          <audio controls preload="none" src={ex.audioSrc} style={{ width: "100%", height: 32 }} />
          {ex.transcript && (
            <details style={{ marginTop: "0.3rem" }}>
              <summary style={{ fontSize: "0.64rem", color, fontWeight: 700, cursor: "pointer" }}>
                📄 Lời thoại (mở sau khi đã nghe)
              </summary>
              <div style={{ marginTop: "0.3rem", background: C.cream, borderRadius: 8, padding: "0.45rem 0.6rem", fontSize: "0.72rem", color: C.ink, lineHeight: 1.7, fontFamily: "Georgia,serif" }}>
                {ex.transcript}
              </div>
            </details>
          )}
        </div>
      )}

      {/* word bank */}
      {ex.bank && (
        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.25rem", marginBottom: "0.55rem" }}>
          {ex.bank.map((w, i) => (
            <span key={i} style={{
              background: C.cream, border: `1px dashed ${color}66`, borderRadius: 20,
              padding: "0.1rem 0.5rem", fontSize: "0.68rem", color: C.ink, fontFamily: "Georgia,serif",
            }}>{w}</span>
          ))}
        </div>
      )}

      {/* ── MATCH ── */}
      {ex.type === "match" && (
        <div style={{ display: "flex", flexDirection: "column", gap: "0.35rem" }}>
          {ex.pairs.map((p, i) => {
            const ok = checked && isAnswerCorrect(val[i], p.r);
            return (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 6, flexWrap: "wrap" }}>
                <span style={{ fontSize: "0.75rem", fontFamily: "Georgia,serif", color: C.ink, minWidth: 110 }}>{p.l}</span>
                <select
                  value={val[i] || ""}
                  onChange={e => setVal(v => ({ ...v, [i]: e.target.value }))}
                  disabled={checked}
                  style={{
                    flex: 1, minWidth: 150, padding: "0.22rem 0.35rem", borderRadius: 8,
                    border: `1.5px solid ${checked ? (ok ? C.green : C.red) : C.border}`,
                    background: checked ? (ok ? C.greenL : C.redL) : C.white,
                    color: C.ink, fontFamily: "inherit", fontSize: "0.72rem",
                  }}>
                  <option value="">— chọn —</option>
                  {/* `extraOptions` are candidates the book includes with no
                      matching document — dropping them would give the answer away. */}
                  {[...ex.pairs.map(o => o.r), ...(ex.extraOptions || [])].sort()
                    .map((r, k) => <option key={k} value={r}>{r}</option>)}
                </select>
                {checked && !ok && <Verdict ok={false} expected={p.r} />}
              </div>
            );
          })}
        </div>
      )}

      {/* ── ORDER ──
           Token add/remove use the functional setState form: several clicks
           landing in one React batch would otherwise all read the same stale
           `built` and only the last would survive. */}
      {ex.type === "order" && ex.items.map((it, i) => {
        const built = val[i] || [];
        const pool  = it.tokens.filter(t => built.filter(b => b === t).length < it.tokens.filter(x => x === t).length);
        const used  = (t) => built.includes(t);
        const ok    = checked && itemOk(it, i);
        return (
          <div key={i} style={{ marginBottom: "0.7rem" }}>
            {/* built sentence */}
            <div style={{
              minHeight: 34, background: checked ? (ok ? C.greenL : C.redL) : C.cream,
              border: `1px solid ${checked ? (ok ? C.green : C.red) : C.border}`,
              borderRadius: 8, padding: "0.3rem 0.4rem", marginBottom: "0.3rem",
              display: "flex", flexWrap: "wrap", gap: "0.25rem", alignItems: "center",
            }}>
              {built.length === 0 && <span style={{ fontSize: "0.68rem", color: C.gray2 }}>Bấm các mảnh bên dưới để ghép câu…</span>}
              {built.map((t, k) => (
                <Chip key={k} onClick={() => !checked && setVal(v => ({ ...v, [i]: (v[i] || []).filter((_, j) => j !== k) }))} disabled={checked}>
                  {t}
                </Chip>
              ))}
            </div>
            {/* token pool */}
            {!checked && (
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.25rem" }}>
                {it.tokens.map((t, k) => (
                  <Chip key={k} tone={used(t) && !pool.includes(t) ? "used" : "idle"}
                    disabled={!pool.includes(t)}
                    onClick={() => setVal(v => ({ ...v, [i]: [...(v[i] || []), t] }))}>
                    {t}
                  </Chip>
                ))}
              </div>
            )}
            {checked && !ok && (
              <div style={{ fontSize: "0.72rem", color: C.red, marginTop: 2 }}>
                ✗ <span style={{ fontFamily: "Georgia,serif", color: C.ink }}>
                  {Array.isArray(it.answer) ? it.answer.join(" → ") : it.answer}
                </span>
              </div>
            )}
          </div>
        );
      })}

      {/* ── FILL / CHOICE / TRANSFORM / TRUEFALSE ── */}
      {["fill", "choice", "transform", "truefalse"].includes(ex.type) && (
        <div style={{ display: "flex", flexDirection: "column", gap: "0.45rem" }}>
          {ex.items.map((it, i) => {
            const ok = checked && itemOk(it, i);
            const letter = String.fromCharCode(97 + i);
            return (
              <div key={i} style={{ opacity: it.example ? 0.6 : 1 }}>
                <div style={{ display: "flex", alignItems: "baseline", gap: 5, flexWrap: "wrap" }}>
                  <span style={{ fontSize: "0.65rem", fontWeight: 700, color: C.gray2, flexShrink: 0 }}>{letter}.</span>
                  <span style={{ fontSize: "0.75rem", color: C.ink, fontFamily: "Georgia,serif", lineHeight: 1.5, flex: 1, minWidth: 0 }}>
                    {it.q}
                  </span>
                  {it.example && <span style={{ fontSize: "0.6rem", color: C.gray2, fontStyle: "italic" }}>ví dụ mẫu</span>}
                </div>

                <div style={{ display: "flex", alignItems: "center", gap: 5, flexWrap: "wrap", marginTop: 3, marginLeft: "0.9rem" }}>
                  {it.example ? (
                    <span style={{ fontFamily: "Georgia,serif", fontSize: "0.75rem", color: C.green, fontWeight: 600 }}>
                      {it.answer}
                    </span>
                  ) : ex.type === "choice" ? (
                    it.options.map((o, k) => {
                      const sel = val[i] === o;
                      const tone = checked ? (o === it.answer ? "ok" : sel ? "bad" : "idle") : sel ? "ok" : "idle";
                      return (
                        <Chip key={k} tone={tone} disabled={checked}
                          onClick={() => setVal(v => ({ ...v, [i]: o }))}>
                          {o}
                        </Chip>
                      );
                    })
                  ) : ex.type === "truefalse" ? (
                    ["Vrai", "Faux"].map((o, k) => {
                      const want = it.answer ? "Vrai" : "Faux";
                      const sel = val[i] === o;
                      const tone = checked ? (o === want ? "ok" : sel ? "bad" : "idle") : sel ? "ok" : "idle";
                      return <Chip key={k} tone={tone} disabled={checked} onClick={() => setVal(v => ({ ...v, [i]: o }))}>{o}</Chip>;
                    })
                  ) : (
                    <input
                      value={val[i] || ""}
                      onChange={e => setVal(v => ({ ...v, [i]: e.target.value }))}
                      disabled={checked}
                      placeholder={ex.type === "transform" ? "Viết lại cả câu…" : "…"}
                      style={{
                        flex: 1, minWidth: 140, padding: "0.25rem 0.45rem", borderRadius: 8,
                        border: `1.5px solid ${checked ? (ok ? C.green : C.red) : C.border}`,
                        background: checked ? (ok ? C.greenL : C.redL) : C.white,
                        color: C.ink, fontFamily: "Georgia,serif", fontSize: "0.75rem",
                      }}
                    />
                  )}
                  {checked && !it.example && (ok ? <Verdict ok /> : <Verdict ok={false} expected={it.answer} />)}
                  {checked && !it.example && <SpeakBtn text={it.answer} size="0.62rem" />}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* actions */}
      <div style={{ display: "flex", alignItems: "center", gap: "0.4rem", marginTop: "0.65rem", flexWrap: "wrap" }}>
        {!checked ? (
          <button onClick={() => setChecked(true)}
            style={{ background: color, color: "#fff", border: "none", borderRadius: 20, padding: "0.25rem 0.85rem", fontSize: "0.7rem", fontWeight: 700, cursor: "pointer", fontFamily: "inherit" }}>
            Kiểm tra
          </button>
        ) : (
          <>
            <span style={{
              background: score === scored.length ? C.green : C.gold, color: "#fff",
              borderRadius: 20, padding: "0.15rem 0.6rem", fontSize: "0.68rem", fontWeight: 700,
            }}>
              {score}/{scored.length} đúng
            </span>
            <button onClick={reset}
              style={{ background: C.white, color, border: `1px solid ${color}66`, borderRadius: 20, padding: "0.15rem 0.6rem", fontSize: "0.66rem", fontWeight: 700, cursor: "pointer", fontFamily: "inherit" }}>
              ↻ Làm lại
            </button>
          </>
        )}
        <span style={{ marginLeft: "auto", fontSize: "0.6rem", color: C.gray2 }}>Cahier p.{ex.page}</span>
      </div>
    </div>
  );
}

// ── Collapsible wrapper for a step's exercise set ─────────────
export default function CahierExercises({ exercises, color = C.blue, defaultOpen = false }) {
  const [open, setOpen] = useState(defaultOpen);
  if (!exercises?.length) return null;

  const totalItems = exercises.reduce(
    (a, ex) => a + ((ex.items || ex.pairs || []).filter(i => !i.example).length), 0);

  return (
    <div style={{ marginTop: "0.6rem" }}>
      <button
        onClick={() => setOpen(o => !o)}
        style={{
          width: "100%", background: open ? `${color}18` : C.cream,
          border: `1px solid ${color}55`, borderRadius: 10,
          padding: "0.45rem 0.7rem", cursor: "pointer", fontFamily: "inherit",
          display: "flex", justifyContent: "space-between", alignItems: "center",
          fontSize: "0.73rem", fontWeight: 700, color: C.ink,
        }}>
        <span>✏️ Bài tập Cahier</span>
        <span style={{ color }}>{open ? "Ẩn ▲" : `${exercises.length} bài · ${totalItems} câu ▼`}</span>
      </button>

      {open && (
        <div style={{ marginTop: "0.5rem" }}>
          <div style={{ fontSize: "0.66rem", color: C.gray, lineHeight: 1.55, marginBottom: "0.5rem" }}>
            💡 Đáp án lấy từ phần <i>Corrigés</i> của chính cuốn Cahier — chấm đúng tuyệt đối, không phải AI đoán.
          </div>
          {exercises.map((ex, i) => <Exercise key={i} ex={ex} color={color} />)}
        </div>
      )}
    </div>
  );
}
