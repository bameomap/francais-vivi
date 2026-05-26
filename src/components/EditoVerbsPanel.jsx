import { useState, useRef } from "react";
import { C } from "../constants.js";
import { callAI } from "../utils/api.js";
import { EDITO_A1_VERB_UNITS } from "../data/editoVerbs.js";
import SpeakBtn from "./ui/SpeakBtn.jsx";
import Spinner from "./ui/Spinner.jsx";

const SUBJECTS = ["je", "tu", "il/elle", "nous", "vous", "ils/elles"];

function buildConjugPrompt(verb, tenseLabel) {
  return `Chia động từ "${verb}" ở thì ${tenseLabel} cho 6 ngôi.
JSON hợp lệ KHÔNG có markdown:
{"verb":"${verb}","tense":"${tenseLabel}","group":"nhóm (1/2/3/irrégulier)","meaning":"nghĩa tiếng Việt ngắn gọn, tối đa 4 từ","conjugations":["forme_je","forme_tu","forme_il","forme_nous","forme_vous","forme_ils"],"tip":"mẹo nhớ ngắn tiếng Việt tối đa 15 từ","example":"câu ví dụ tiếng Pháp ngắn dùng động từ này — bản dịch tiếng Việt"}`;
}

// ── Fill-in quiz ────────────────────────────────────────────
function ConjugQuiz({ conjugation, onNext, unit }) {
  const [inputs,  setInputs]  = useState(Array(6).fill(""));
  const [checked, setChecked] = useState(false);
  const refs = useRef([]);

  const norm = s => s.toLowerCase().trim().replace(/['''`]/g, "'");
  const results = conjugation.conjugations.map((ans, i) => {
    const t = norm(inputs[i]), a = norm(ans);
    if (t === a) return "ok";
    // accept just the verb part if answer includes a helper (ne...pas, etc.)
    if (a.includes(" ") && a.endsWith(t)) return "ok";
    return "wrong";
  });
  const score = results.filter(r => r === "ok").length;
  const pct   = Math.round(score / 6 * 100);

  return (
    <div style={{ display:"flex", flexDirection:"column", gap:"0.5rem" }}>
      {/* Verb hero */}
      <div style={{
        background: unit.bg, borderRadius:12,
        padding:"0.65rem 0.9rem",
        borderLeft:`4px solid ${unit.color}`,
        marginBottom:"0.1rem",
      }}>
        <div style={{ display:"flex", alignItems:"center", gap:"0.5rem" }}>
          <span style={{
            fontFamily:"'Playfair Display',Georgia,serif",
            fontSize:"1.3rem", fontWeight:700, color:unit.color, fontStyle:"italic",
          }}>
            {conjugation.verb}
          </span>
          <SpeakBtn text={conjugation.verb} />
          <span style={{ fontSize:"0.7rem", color:C.gray, marginLeft:"auto" }}>
            {conjugation.meaning}
          </span>
        </div>
        <div style={{ fontSize:"0.63rem", color:C.gray, marginTop:"0.2rem" }}>
          {conjugation.tense} · {conjugation.group}
        </div>
      </div>

      {/* Hint */}
      <div style={{ fontSize:"0.67rem", color:C.gray, textAlign:"center" }}>
        Điền dạng chia đúng · Enter để chuyển ô
      </div>

      {/* Input rows */}
      {SUBJECTS.map((sub, i) => {
        const st = checked ? results[i] : "idle";
        return (
          <div key={i} style={{
            display:"grid", gridTemplateColumns:"0.7fr 1fr",
            gap:"0.4rem", alignItems:"center",
          }}>
            <div style={{
              fontSize:"0.8rem", color:C.gray,
              fontStyle:"italic", textAlign:"right", paddingRight:"0.35rem",
            }}>
              {sub}
            </div>
            <div>
              <input
                ref={el => refs.current[i] = el}
                value={inputs[i]}
                disabled={checked}
                onChange={e => setInputs(v => v.map((x, j) => j === i ? e.target.value : x))}
                onKeyDown={e => {
                  if (e.key === "Enter") {
                    if (i < 5) refs.current[i + 1]?.focus();
                    else setChecked(true);
                  }
                }}
                placeholder="…"
                style={{
                  width:"100%", padding:"0.45rem 0.6rem",
                  border:`1.5px solid ${checked ? (st==="ok" ? "#059669" : C.red) : C.border}`,
                  borderRadius:10,
                  background: checked ? (st==="ok" ? "#ECFDF5" : "#FEF2F2") : C.white,
                  fontSize:"0.88rem", fontFamily:"Georgia,serif", color:C.ink,
                  outline:"none", boxSizing:"border-box",
                  transition:"border-color 0.15s, background 0.15s",
                }}
              />
              {checked && st === "wrong" && (
                <div style={{ fontSize:"0.68rem", color:"#059669", fontWeight:700, marginTop:"0.1rem" }}>
                  → {conjugation.conjugations[i]}
                </div>
              )}
            </div>
          </div>
        );
      })}

      {/* Actions */}
      {!checked ? (
        <button
          onClick={() => setChecked(true)}
          style={{
            padding:"0.55rem", background:"#1E293B", color:C.white,
            border:"none", borderRadius:12, fontSize:"0.85rem",
            cursor:"pointer", fontWeight:700, marginTop:"0.2rem",
          }}
        >
          Chấm ✓
        </button>
      ) : (
        <div style={{ textAlign:"center", marginTop:"0.2rem" }}>
          <div style={{
            fontFamily:"'Playfair Display',Georgia,serif",
            fontSize:"1.6rem", fontWeight:700,
            color: pct >= 84 ? "#059669" : pct >= 50 ? C.gold : C.red,
          }}>
            {score}/6
          </div>

          {conjugation.tip && (
            <div style={{
              background:"#FFFBEB", borderRadius:10,
              padding:"0.45rem 0.75rem",
              fontSize:"0.72rem", color:"#92400E",
              margin:"0.4rem 0", textAlign:"left",
            }}>
              💡 {conjugation.tip}
            </div>
          )}

          {conjugation.example && (() => {
            const sep = conjugation.example.indexOf(" — ");
            const fr  = sep >= 0 ? conjugation.example.slice(0, sep) : conjugation.example;
            const vi  = sep >= 0 ? conjugation.example.slice(sep + 3) : null;
            return (
              <div style={{
                background:C.white, border:`1px solid ${C.border}`,
                borderLeft:`3px solid ${unit.color}`,
                borderRadius:10, padding:"0.55rem 0.8rem",
                textAlign:"left", marginBottom:"0.4rem",
              }}>
                <div style={{ fontFamily:"Georgia,serif", fontSize:"0.85rem", color:"#1E293B", fontStyle:"italic" }}>
                  « {fr} »
                </div>
                {vi && <div style={{ fontSize:"0.72rem", color:C.gray, marginTop:"0.2rem" }}>{vi}</div>}
              </div>
            );
          })()}

          <button
            onClick={onNext}
            style={{
              padding:"0.5rem 1.4rem", background:unit.color,
              color:"#fff", border:"none", borderRadius:20,
              fontSize:"0.82rem", cursor:"pointer", fontWeight:700,
            }}
          >
            Động từ tiếp →
          </button>
        </div>
      )}
    </div>
  );
}

// ── Exercise mode for one unit ──────────────────────────────
function UnitExerciseView({ unit, onBack }) {
  const [verbIdx,   setVerbIdx]   = useState(0);
  const [tenseIdx,  setTenseIdx]  = useState(0);
  const [loading,   setLoading]   = useState(false);
  const [conjugation, setConjugation] = useState(null);
  const [err,       setErr]       = useState("");
  const [quizKey,   setQuizKey]   = useState(0);
  const [mode,      setMode]      = useState("pick"); // "pick" | "quiz" | "table"

  const generate = async (vIdx, tIdx) => {
    const verb  = unit.verbs[vIdx  !== undefined ? vIdx  : verbIdx].infinitive;
    const tense = unit.tenses[tIdx !== undefined ? tIdx : tenseIdx];
    setLoading(true); setErr(""); setConjugation(null); setMode("quiz");
    try {
      const data = await callAI(buildConjugPrompt(verb, tense.label));
      setConjugation(data);
      setQuizKey(k => k + 1);
    } catch(e) { setErr(e.message); setMode("pick"); }
    setLoading(false);
  };

  const nextRandom = () => {
    const nv = Math.floor(Math.random() * unit.verbs.length);
    const nt = Math.floor(Math.random() * unit.tenses.length);
    setVerbIdx(nv); setTenseIdx(nt);
    generate(nv, nt);
  };

  return (
    <div style={{ padding:"1rem", animation:"fadeUp 0.3s ease" }}>
      {/* Header */}
      <div style={{ display:"flex", alignItems:"center", gap:"0.6rem", marginBottom:"0.85rem" }}>
        <button
          onClick={onBack}
          style={{
            background:"transparent", border:`1.5px solid ${C.border}`,
            color:C.gray, padding:"0.2rem 0.65rem",
            borderRadius:20, fontSize:"0.7rem", cursor:"pointer", fontWeight:600,
          }}
        >
          ← Quay lại
        </button>
        <div style={{
          background:unit.color, color:"#fff", borderRadius:999,
          minWidth:28, height:28, display:"flex", alignItems:"center",
          justifyContent:"center", fontSize:"0.75rem", fontWeight:700, flexShrink:0,
        }}>
          {unit.unitNum}
        </div>
        <div>
          <div style={{ fontWeight:700, color:C.ink, fontSize:"0.9rem" }}>{unit.title}</div>
          <div style={{ fontSize:"0.63rem", color:C.gray }}>
            {unit.verbs.length} động từ · {unit.tenses.map(t => t.label).join(", ")}
          </div>
        </div>
      </div>

      {/* Verb picker */}
      <div style={{ marginBottom:"0.75rem" }}>
        <div style={{
          fontSize:"0.6rem", color:C.gray, textTransform:"uppercase",
          letterSpacing:"0.12em", fontWeight:700, marginBottom:"0.4rem",
        }}>
          Chọn động từ
        </div>
        <div style={{ display:"flex", flexWrap:"wrap", gap:"0.28rem" }}>
          {unit.verbs.map((v, i) => (
            <button
              key={i}
              onClick={() => setVerbIdx(i)}
              style={{
                padding:"0.2rem 0.6rem", borderRadius:20,
                border:`1.5px solid ${verbIdx === i ? unit.color : C.border}`,
                background: verbIdx === i ? unit.color : C.white,
                color: verbIdx === i ? "#fff" : C.gray,
                fontSize:"0.72rem", cursor:"pointer",
                fontFamily:"Georgia,serif", fontStyle:"italic",
                transition:"all 0.12s",
              }}
            >
              {v.infinitive}
            </button>
          ))}
        </div>
      </div>

      {/* Tense picker */}
      <div style={{ marginBottom:"0.85rem" }}>
        <div style={{
          fontSize:"0.6rem", color:C.gray, textTransform:"uppercase",
          letterSpacing:"0.12em", fontWeight:700, marginBottom:"0.4rem",
        }}>
          Chọn thì
        </div>
        <div style={{ display:"flex", flexWrap:"wrap", gap:"0.28rem" }}>
          {unit.tenses.map((t, i) => (
            <button
              key={i}
              onClick={() => setTenseIdx(i)}
              style={{
                padding:"0.28rem 0.7rem", borderRadius:20,
                border:`1.5px solid ${tenseIdx === i ? unit.color : C.border}`,
                background: tenseIdx === i ? unit.color : C.white,
                color: tenseIdx === i ? "#fff" : C.ink,
                fontSize:"0.72rem", cursor:"pointer",
                transition:"all 0.12s", fontFamily:"inherit",
              }}
            >
              <span style={{ fontWeight:700 }}>{t.label}</span>
              {t.note && (
                <span style={{ fontSize:"0.6rem", opacity:0.75, marginLeft:5 }}>
                  {t.note.length > 28 ? t.note.slice(0, 28) + "…" : t.note}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Action buttons */}
      <div style={{ display:"flex", gap:"0.4rem", marginBottom:"0.9rem" }}>
        <button
          onClick={() => generate()}
          style={{
            flex:1, padding:"0.65rem", background:unit.color, color:"#fff",
            border:"none", borderRadius:14, fontWeight:700,
            fontSize:"0.88rem", cursor:"pointer", transition:"opacity 0.15s",
          }}
        >
          🎯 Tạo bài tập chia động từ
        </button>
        <button
          onClick={nextRandom}
          title="Chọn ngẫu nhiên"
          style={{
            padding:"0.65rem 0.85rem", background:C.white,
            border:`1.5px solid ${C.border}`, borderRadius:14,
            fontSize:"1.1rem", cursor:"pointer", flexShrink:0,
          }}
        >
          🔀
        </button>
      </div>

      {/* Loading */}
      {loading && (
        <div style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:"0.7rem", padding:"2rem 0", color:C.gray }}>
          <Spinner />
          <span style={{ fontSize:"0.82rem" }}>AI đang tạo bài tập…</span>
        </div>
      )}

      {/* Error */}
      {err && (
        <div style={{
          color:C.red, fontSize:"0.78rem", padding:"0.75rem",
          background:"#FEF2F2", borderRadius:10,
        }}>
          ⚠ {err}
        </div>
      )}

      {/* Quiz */}
      {conjugation && !loading && (
        <ConjugQuiz
          key={quizKey}
          conjugation={conjugation}
          onNext={nextRandom}
          unit={unit}
        />
      )}
    </div>
  );
}

// ── Unit list (main view) ───────────────────────────────────
export default function EditoVerbsPanel() {
  const [activeUnit, setActiveUnit] = useState(null);

  if (activeUnit) {
    const unit = EDITO_A1_VERB_UNITS.find(u => u.unitId === activeUnit);
    return <UnitExerciseView unit={unit} onBack={() => setActiveUnit(null)} />;
  }

  return (
    <div style={{ padding:"1rem", animation:"fadeUp 0.3s ease" }}>
      {/* Header */}
      <div style={{ marginBottom:"1rem" }}>
        <div style={{
          fontFamily:"'Playfair Display',Georgia,serif",
          fontSize:"1.05rem", color:C.ink, fontWeight:700, marginBottom:"0.2rem",
        }}>
          🖊️ Động từ Édito A1
        </div>
        <div style={{ fontSize:"0.72rem", color:C.gray, lineHeight:1.65 }}>
          Động từ trọng tâm từng Unit · Bấm <b>Luyện tập</b> để tạo bài chia động từ theo thì
        </div>
      </div>

      {/* Unit cards */}
      <div style={{ display:"flex", flexDirection:"column", gap:"0.55rem" }}>
        {EDITO_A1_VERB_UNITS.map((unit, i) => (
          <div
            key={unit.unitId}
            style={{
              background:C.white,
              border:`1.5px solid ${unit.color}33`,
              borderRadius:16, overflow:"hidden",
              animation:`fadeUp 0.2s ease ${i * 0.04}s both`,
              boxShadow:`0 2px 8px ${unit.color}10`,
            }}
          >
            {/* Header row */}
            <div style={{
              display:"flex", alignItems:"center", gap:"0.75rem",
              padding:"0.75rem 1rem",
              borderBottom:`1px solid ${unit.color}22`,
            }}>
              <div style={{
                background:unit.color, color:"#fff", borderRadius:999,
                minWidth:32, height:32, display:"flex", alignItems:"center",
                justifyContent:"center", fontSize:"0.8rem", fontWeight:700, flexShrink:0,
              }}>
                {unit.unitNum}
              </div>
              <div style={{ flex:1, minWidth:0 }}>
                <div style={{ fontWeight:700, color:C.ink, fontSize:"0.85rem" }}>
                  {unit.title}
                </div>
                <div style={{ fontSize:"0.62rem", color:C.gray, marginTop:"0.1rem" }}>
                  {unit.tenses.map(t => t.label).join(" · ")} &nbsp;·&nbsp; {unit.verbs.length} động từ
                </div>
              </div>
              <button
                onClick={() => setActiveUnit(unit.unitId)}
                style={{
                  padding:"0.28rem 0.75rem", background:unit.color, color:"#fff",
                  border:"none", borderRadius:20, fontSize:"0.7rem",
                  fontWeight:700, cursor:"pointer", whiteSpace:"nowrap",
                  transition:"opacity 0.15s", flexShrink:0,
                }}
                onMouseEnter={e => e.currentTarget.style.opacity = "0.82"}
                onMouseLeave={e => e.currentTarget.style.opacity = "1"}
              >
                Luyện tập →
              </button>
            </div>

            {/* Verb chips */}
            <div style={{
              display:"flex", flexWrap:"wrap", gap:"0.25rem",
              padding:"0.55rem 0.85rem 0.6rem",
            }}>
              {unit.verbs.map((v, j) => (
                <span
                  key={j}
                  style={{
                    padding:"0.1rem 0.5rem",
                    background: unit.bg,
                    border:`1px solid ${unit.color}33`,
                    borderRadius:20, fontSize:"0.68rem",
                    color:unit.color,
                    fontFamily:"Georgia,serif", fontStyle:"italic",
                  }}
                >
                  {v.infinitive}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
