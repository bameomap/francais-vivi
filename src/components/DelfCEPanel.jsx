import { useState, useEffect, useMemo } from "react";
import { C } from "../constants.js";
import { DELF_A1_CE } from "../data/delfA1Reussite.js";

// « Le DELF A1 100 % réussite » — Compréhension des écrits (p.41–70).
//
// The book's shape is kept on purpose: four objectifs, each drilled first on
// short activités (SE PRÉPARER) and only then on full exam-format exercices
// with points (S'ENTRAÎNER). Flattening that into one pile of questions would
// throw away the progression that makes the book work.
//
// Answers are the book's own Corrigés, so grading is exact. Exercices 1, 4, 7
// and 10 are the book's worked examples — printed pre-ticked with a method note
// under each question — so they are shown solved instead of being scored.

const DONE_KEY = "delf_ce_done";

const loadDone = () => {
  try { return JSON.parse(localStorage.getItem(DONE_KEY) || "{}"); }
  catch { return {}; }
};

const LETTERS = ["A", "B", "C"];

// ── The document being read ──────────────────────────────────────
function DocBlock({ doc }) {
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
                                       borderBottom: `1px solid ${C.borderSoft}`, borderLeft: i ? `1px solid ${C.borderSoft}` : "none",
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

  // text — an affiche, a letter, an article, or a wall of small ads
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
      {doc.paras?.map((p, i) => (
        <p key={i} style={{ margin: "0 0 0.45rem" }}>{p}</p>
      ))}

      {doc.cards && (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(150px,1fr))", gap: "0.45rem", marginTop: "0.5rem" }}>
          {doc.cards.map((c, i) => (
            <div key={i} style={{ background: C.white, border: `1px solid ${C.border}`, borderRadius: 8, padding: "0.45rem 0.55rem" }}>
              <div style={{ fontWeight: 700, fontSize: "0.72rem", marginBottom: "0.2rem" }}>{c.title}</div>
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
function Question({ q, n, value, onPick, checked, reveal, color }) {
  const isImage = q.kind === "image";
  const correct = isImage ? q.answer : q.answer;
  const ok = value != null && value === correct;

  const choices = isImage ? LETTERS : q.options;

  return (
    <div style={{ marginBottom: "0.85rem" }}>
      <div style={{ display: "flex", alignItems: "baseline", gap: 6 }}>
        <span style={{ flexShrink: 0, fontFamily: "'JetBrains Mono',monospace", fontSize: "0.62rem",
                       fontWeight: 700, color }}>{n}</span>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: "0.76rem", color: C.ink, fontFamily: "Georgia,serif", lineHeight: 1.5 }}>{q.q}</div>
          <div style={{ fontSize: "0.68rem", color: C.gray, lineHeight: 1.5, marginTop: 1 }}>{q.vi}</div>
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
          {/* Exercice 4's map choices straddle a page break in the book */}
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
          const isRight = choice === correct;
          const show = checked || reveal;
          const bg = show ? (isRight ? C.greenL : sel ? C.redL : C.white)
                          : sel ? C.blueL : C.white;
          const bd = show ? (isRight ? C.green : sel ? C.red : C.border)
                          : sel ? C.blue : C.border;
          const fg = show ? (isRight ? C.green : sel ? C.red : C.ink) : C.ink;
          return (
            <button key={i} disabled={show} onClick={() => onPick(choice)}
              style={{
                background: bg, color: fg, border: `1.5px solid ${bd}`, borderRadius: 8,
                padding: isImage ? "0.2rem 0.7rem" : "0.22rem 0.55rem",
                fontSize: isImage ? "0.75rem" : "0.73rem", fontWeight: isImage ? 700 : 400,
                fontFamily: "Georgia,serif", cursor: show ? "default" : "pointer", textAlign: "left",
              }}>
              {choice}
            </button>
          );
        })}
        {checked && (ok
          ? <span style={{ color: C.green, fontWeight: 700, fontSize: "0.75rem", alignSelf: "center" }}>✓</span>
          : <span style={{ color: C.red, fontWeight: 700, fontSize: "0.75rem", alignSelf: "center" }}>✗</span>)}
      </div>

      {(checked || reveal) && q.note && (
        <div style={{ marginTop: "0.35rem", marginLeft: isImage ? 0 : "1.05rem",
                      background: C.goldL, borderRadius: 8, padding: "0.35rem 0.5rem",
                      fontSize: "0.68rem", color: C.ink2, lineHeight: 1.55 }}>
          💡 {q.note}
        </div>
      )}
    </div>
  );
}

// ── One activité or exercice ─────────────────────────────────────
function ItemCard({ item, color, done, onDone }) {
  const [open, setOpen]       = useState(false);
  const [val, setVal]         = useState({});
  const [checked, setChecked] = useState(false);

  const total = item.questions.length;
  const score = item.questions.filter((q, i) => val[i] === q.answer).length;
  const maxPts = item.questions.reduce((a, q) => a + (q.pts || 0), 0);
  const gotPts = item.questions.reduce((a, q, i) => a + (val[i] === q.answer ? (q.pts || 0) : 0), 0);

  const check = () => {
    setChecked(true);
    if (!done) onDone();
  };
  const reset = () => { setVal({}); setChecked(false); };

  return (
    <div style={{
      background: C.white, border: `1px solid ${C.border}`, borderLeft: `3px solid ${color}`,
      borderRadius: 10, marginBottom: "0.55rem", overflow: "hidden",
    }}>
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
          {item.setupVi}
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
          <div style={{ fontSize: "0.72rem", color: C.ink, fontFamily: "Georgia,serif",
                        fontStyle: "italic", marginBottom: "0.5rem" }}>
            {item.setup}
          </div>

          {item.tip && (
            <div style={{ background: C.blueL, borderRadius: 8, padding: "0.4rem 0.55rem",
                          marginBottom: "0.6rem", fontSize: "0.69rem", color: C.ink2, lineHeight: 1.55 }}>
              ▸ {item.tipVi}
            </div>
          )}

          <DocBlock doc={item.doc} />

          {item.questions.map((q, i) => (
            <Question key={i} q={q} n={i + 1} color={color}
              value={val[i]} onPick={v => setVal(s => ({ ...s, [i]: v }))}
              checked={checked} reveal={item.worked} />
          ))}

          {item.worked ? (
            <div style={{ fontSize: "0.66rem", color: C.gray, lineHeight: 1.55 }}>
              📖 Đây là bài mẫu của sách: đáp án và lời giải đã in sẵn trên trang {item.page}.
              Hãy tự trả lời trong đầu trước khi đọc.
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
                </>
              )}
              <span style={{ marginLeft: "auto", fontSize: "0.6rem", color: C.gray2 }}>
                Livre p.{item.page}
              </span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// ── Panel ────────────────────────────────────────────────────────
export default function DelfCEPanel({ onBack, data = DELF_A1_CE }) {
  const [secId, setSecId] = useState(data.sections[0].id);
  const [done, setDone]   = useState(loadDone);

  useEffect(() => {
    localStorage.setItem(DONE_KEY, JSON.stringify(done));
  }, [done]);

  const section = data.sections.find(s => s.id === secId) || data.sections[0];

  // Worked examples are excluded from the tally — they can't be "done", they
  // arrive already solved.
  const { total, finished } = useMemo(() => {
    const all = data.sections.flatMap(s => [...s.prepare, ...s.train]).filter(i => !i.worked);
    return { total: all.length, finished: all.filter(i => done[i.id]).length };
  }, [data, done]);

  const markDone = id => setDone(d => (d[id] ? d : { ...d, [id]: true }));

  return (
    <div style={{ animation: "fadeUp 0.3s ease" }}>

      {/* Hero */}
      <div style={{ background: `linear-gradient(135deg, ${C.heroFrom} 0%, ${C.heroTo} 100%)`, padding: "0.9rem 1rem 0.95rem" }}>
        {onBack && (
          <button onClick={onBack}
            style={{ background: "rgba(255,255,255,0.15)", border: "none", color: "#fff", fontSize: "0.72rem",
                     fontWeight: 600, cursor: "pointer", padding: "0.2rem 0.65rem", borderRadius: 20,
                     marginBottom: "0.6rem", fontFamily: "inherit" }}>
            ← Trang chủ
          </button>
        )}
        <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: "0.56rem", letterSpacing: "0.18em",
                      color: "rgba(255,255,255,0.6)", textTransform: "uppercase", marginBottom: 4 }}>
          100 % réussite · {data.pages}
        </div>
        <div style={{ fontFamily: "'Playfair Display',Georgia,serif", fontSize: "1.15rem", color: "#fff",
                      fontWeight: 800, lineHeight: 1.15 }}>
          📖 Compréhension des écrits
        </div>
        <div style={{ fontSize: "0.7rem", color: "rgba(255,255,255,0.7)", marginTop: 4 }}>
          {data.duree} · {data.points} điểm · 4 exercices — {finished}/{total} bài đã làm
        </div>
        <div style={{ height: 4, background: "rgba(255,255,255,0.2)", borderRadius: 4, marginTop: 8, overflow: "hidden" }}>
          <div style={{ height: "100%", width: `${total ? (finished / total) * 100 : 0}%`, background: C.green, borderRadius: 4 }} />
        </div>
      </div>

      <div style={{ padding: "0.85rem 1rem 4rem" }}>

        {/* Method — the book's own strategy page, in Vietnamese */}
        <details style={{ marginBottom: "0.9rem" }}>
          <summary style={{ cursor: "pointer", fontSize: "0.73rem", fontWeight: 700, color: C.ink }}>
            🧭 Chiến lược làm bài (bấm để mở)
          </summary>
          <div style={{ marginTop: "0.5rem", background: C.cream, borderRadius: 10, padding: "0.6rem 0.75rem" }}>
            <div style={{ fontSize: "0.7rem", color: C.ink2, lineHeight: 1.6, marginBottom: "0.45rem" }}>
              {data.introVi}
            </div>
            {data.method.map((m, i) => (
              <div key={i} style={{ fontSize: "0.71rem", color: C.ink, lineHeight: 1.6, marginBottom: "0.2rem" }}>
                {i + 1}. {m}
              </div>
            ))}
          </div>
        </details>

        {/* Objectif picker */}
        <div style={{ display: "flex", gap: "0.35rem", overflowX: "auto", paddingBottom: "0.45rem", marginBottom: "0.7rem" }}>
          {data.sections.map(s => {
            const on = s.id === secId;
            return (
              <button key={s.id} onClick={() => setSecId(s.id)}
                style={{ flexShrink: 0, background: on ? C.ink : C.white, color: on ? "#fff" : C.ink2,
                         border: `1px solid ${on ? C.ink : C.border}`, borderRadius: 20,
                         padding: "0.28rem 0.7rem", fontSize: "0.69rem", fontWeight: 700,
                         cursor: "pointer", fontFamily: "inherit" }}>
                {s.num}. {s.vi}
              </button>
            );
          })}
        </div>

        <div style={{ marginBottom: "0.8rem" }}>
          <div style={{ fontFamily: "'Playfair Display',Georgia,serif", fontSize: "1rem", fontWeight: 700, color: C.ink }}>
            Exercice {section.num} — {section.fr}
          </div>
          <div style={{ fontSize: "0.66rem", color: C.gray, lineHeight: 1.55, marginTop: 2 }}>
            {section.domaine} · 5 câu · 5 điểm — Tài liệu thường gặp: {section.supports}
          </div>
        </div>

        <SkillGroup title="SE PRÉPARER" sub="Luyện từng kỹ năng nhỏ" color={C.blue}
          items={section.prepare} done={done} onDone={markDone} />

        <SkillGroup title="S'ENTRAÎNER" sub="Bài thi thật, có tính điểm" color={C.green}
          items={section.train} done={done} onDone={markDone} />

        <div style={{ marginTop: "1.2rem", fontSize: "0.62rem", color: C.gray2, lineHeight: 1.6 }}>
          Nguồn: {data.book}. Đáp án lấy từ phần <i>Corrigés</i> của chính cuốn sách.
        </div>
      </div>
    </div>
  );
}

function SkillGroup({ title, sub, color, items, done, onDone }) {
  return (
    <section style={{ marginBottom: "1.1rem" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: "0.5rem" }}>
        <span style={{ background: color, color: "#fff", borderRadius: 8, padding: "0.15rem 0.5rem",
                       fontSize: "0.6rem", fontWeight: 800, fontFamily: "'JetBrains Mono',monospace",
                       letterSpacing: "0.05em" }}>
          {title}
        </span>
        <span style={{ fontSize: "0.67rem", color: C.gray }}>{sub}</span>
      </div>
      {items.map(item => (
        <ItemCard key={item.id} item={item} color={color}
          done={!!done[item.id]} onDone={() => onDone(item.id)} />
      ))}
    </section>
  );
}
