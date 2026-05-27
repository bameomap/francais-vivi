import { useState, useRef } from "react";
import { C } from "../constants.js";
import { callAI } from "../utils/api.js";
import { awardXP, increment, checkBadges, BADGE_DEFS } from "../utils/xp.js";
import { getSRSStats } from "../utils/srs.js";
import { getStreak } from "../utils/storage.js";
import SpeakBtn from "./ui/SpeakBtn.jsx";
import Spinner from "./ui/Spinner.jsx";
import { Confetti } from "./ui/Minou.jsx";

const SUBJECTS = ["je", "tu", "il/elle", "nous", "vous", "ils/elles"];

const TENSES = [
  { id:"present",      label:"Présent",           level:"A1" },
  { id:"futur_pro",    label:"Futur proche",       level:"A1" },
  { id:"passe",        label:"Passé composé",      level:"A1" },
  { id:"futur",        label:"Futur simple",       level:"A1" },
  { id:"imparfait",    label:"Imparfait",          level:"A2" },
  { id:"conditionnel", label:"Conditionnel",       level:"A2" },
  { id:"plusque",      label:"Plus-que-parfait",   level:"A2" },
  { id:"subjonctif",   label:"Subjonctif présent", level:"A2" },
];

const COMMON_VERBS = [
  "être","avoir","aller","faire","pouvoir","vouloir","savoir",
  "venir","voir","prendre","parler","manger","finir","aimer","dormir",
];

function buildPrompt(verb, tense) {
  const tenseLabel = TENSES.find(t => t.id === tense)?.label || tense;
  return `Chia động từ "${verb}" ở thì ${tenseLabel} cho 6 ngôi.
JSON hợp lệ KHÔNG có markdown:
{"verb":"${verb}","tense":"${tenseLabel}","group":"nhóm (1/2/3/irrégulier)","meaning":"nghĩa tiếng Việt ngắn gọn, tối đa 4 từ","conjugations":["forme_je","forme_tu","forme_il","forme_nous","forme_vous","forme_ils"],"tip":"mẹo nhớ ngắn tiếng Việt tối đa 15 từ","example":"câu ví dụ tiếng Pháp ngắn dùng động từ này — bản dịch tiếng Việt"}`;
}

// ── Quiz sub-component ──────────────────────────────────────────
function ConjugQuiz({ conjugation, onDone }) {
  const [inputs,  setInputs]  = useState(Array(6).fill(""));
  const [checked, setChecked] = useState(false);
  const refs = useRef([]);

  const norm = s => s.toLowerCase().trim().replace(/['''`]/g, "'");
  const results = conjugation.conjugations.map((ans, i) => {
    const t = norm(inputs[i]), a = norm(ans);
    if (t === a) return "ok";
    if (a.includes(" ") && a.endsWith(t)) return "ok";
    return "wrong";
  });
  const score = results.filter(r => r === "ok").length;
  const pct   = Math.round(score / 6 * 100);

  return (
    <div style={{ display:"flex", flexDirection:"column", gap:"0.55rem" }}>
      <div style={{ fontSize:"0.68rem", color:C.gray, textAlign:"center", marginBottom:"0.1rem" }}>
        Điền dạng chia đúng · Enter để chuyển ô
      </div>
      {SUBJECTS.map((sub, i) => {
        const st = checked ? results[i] : "idle";
        return (
          <div key={i} style={{ display:"grid", gridTemplateColumns:"0.7fr 1fr", gap:"0.4rem", alignItems:"center" }}>
            <div style={{ fontSize:"0.8rem", color:C.gray, fontStyle:"italic", textAlign:"right", paddingRight:"0.3rem" }}>{sub}</div>
            <div style={{ position:"relative" }}>
              <input
                ref={el => refs.current[i] = el}
                value={inputs[i]} disabled={checked}
                onChange={e => setInputs(v => v.map((x, j) => j === i ? e.target.value : x))}
                onKeyDown={e => { if (e.key === "Enter") { if (i < 5) refs.current[i+1]?.focus(); else setChecked(true); }}}
                placeholder="…"
                style={{
                  width:"100%", padding:"0.48rem 0.65rem",
                  border:`1.5px solid ${checked ? (st==="ok" ? C.green : C.red) : C.border}`,
                  borderRadius:10,
                  background:checked ? (st==="ok" ? C.greenL : "#FEF2F2") : C.white,
                  fontSize:"0.88rem", fontFamily:"Georgia,serif", color:C.ink,
                  outline:"none", boxSizing:"border-box",
                }}
              />
              {checked && st === "wrong" && (
                <div style={{ fontSize:"0.68rem", color:C.green, fontWeight:700, marginTop:"0.15rem" }}>
                  → {conjugation.conjugations[i]}
                </div>
              )}
            </div>
          </div>
        );
      })}
      {!checked ? (
        <button onClick={() => setChecked(true)}
          style={{ padding:"0.55rem", background:C.blue, color:C.white, border:"none", borderRadius:12, fontSize:"0.85rem", cursor:"pointer", fontWeight:700, marginTop:"0.25rem" }}>
          Chấm ✓
        </button>
      ) : (
        <div style={{ textAlign:"center", marginTop:"0.25rem" }}>
          <div style={{ fontFamily:"'Playfair Display',Georgia,serif", fontSize:"1.5rem", color:pct>=80?C.green:pct>=60?C.gold:C.red, fontWeight:700 }}>
            {score}/6
          </div>
          <button onClick={onDone}
            style={{ marginTop:"0.45rem", padding:"0.4rem 1rem", background:C.white, border:`1.5px solid ${C.border}`, borderRadius:12, fontSize:"0.78rem", cursor:"pointer", color:C.ink, fontFamily:"inherit" }}>
            🔄 Thử lại
          </button>
        </div>
      )}
    </div>
  );
}

// ── Main component ──────────────────────────────────────────────
export default function ConjugaisonPanel() {
  const [verb,     setVerb]     = useState("");
  const [tense,    setTense]    = useState("present");
  const [loading,  setLoading]  = useState(false);
  const [result,   setResult]   = useState(null);
  const [err,      setErr]      = useState("");
  const [mode,     setMode]     = useState("table");
  const [quizKey,  setQuizKey]  = useState(0);
  const [confetti, setConfetti] = useState(false);
  const [toast,    setToast]    = useState("");
  const inputRef = useRef(null);

  const showToast = msg => { setToast(msg); setTimeout(() => setToast(""), 2800); };

  const generate = async (v, t) => {
    const target = (v || verb).trim();
    if (!target) return;
    setLoading(true); setErr(""); setResult(null); setMode("table");
    try {
      const data = await callAI(buildPrompt(target, t || tense));
      setResult(data);
      awardXP(5);
      const conjCount = increment("conjugaison_count");
      const srs = getSRSStats();
      const streak = getStreak();
      const earned = checkBadges({ srsTotal:srs.total, mastered:srs.mastered, streak:streak.streak, conjugaisonCount:conjCount });
      if (earned.length) {
        const badge = BADGE_DEFS.find(b => b.id === earned[0]);
        if (badge) showToast(`🏅 Badge mới: ${badge.icon} ${badge.label}!`);
      }
    } catch(e) { setErr(e.message); }
    setLoading(false);
  };

  return (
    <div style={{ animation:"fadeUp 0.3s ease", display:"flex", flexDirection:"column" }}>
      <Confetti active={confetti} onDone={() => setConfetti(false)} />

      {toast && (
        <div style={{
          position:"fixed", top:20, left:"50%", transform:"translateX(-50%)",
          background:C.ink, color:C.white, padding:"0.55rem 1.2rem",
          borderRadius:24, fontSize:"0.8rem", zIndex:400, whiteSpace:"nowrap",
          boxShadow:"0 4px 20px rgba(0,0,0,0.2)", animation:"pop 0.3s ease",
        }}>
          {toast}
        </div>
      )}

      {/* ── Hero header ──────────────────────────────────────── */}
      <div style={{
        background:"linear-gradient(135deg, #1B3A6B 0%, #2d4f8a 100%)",
        padding:"0.9rem 1rem 0.85rem",
      }}>
        <div style={{ fontFamily:"'Playfair Display',Georgia,serif", fontSize:"1.15rem", color:"#fff", fontWeight:800 }}>
          ✏️ Chia động từ tự do
        </div>
        <div style={{ fontSize:"0.7rem", color:"rgba(255,255,255,0.65)", marginTop:3 }}>
          Nhập bất kỳ động từ · 8 thì A1–A2 · Bảng chia + Quiz điền
        </div>

        {/* ── Search input ── */}
        <div style={{ display:"flex", gap:"0.4rem", marginTop:"0.75rem" }}>
          <input
            ref={inputRef}
            value={verb}
            onChange={e => setVerb(e.target.value)}
            onKeyDown={e => e.key === "Enter" && generate()}
            placeholder="être, aller, manger…"
            style={{
              flex:1, padding:"0.6rem 0.9rem",
              border:"1.5px solid rgba(255,255,255,0.25)",
              borderRadius:12, fontSize:"0.9rem",
              fontFamily:"Georgia,serif",
              color:C.ink, outline:"none", background:"#fff",
            }}
          />
          <button
            onClick={() => generate()}
            style={{
              padding:"0.6rem 1.1rem",
              background:`linear-gradient(135deg, ${C.accent}, #c0392b)`,
              color:"#fff", border:"none", borderRadius:12,
              fontSize:"0.88rem", cursor:"pointer",
              fontWeight:700, whiteSpace:"nowrap",
              fontFamily:"inherit",
              boxShadow:`0 3px 10px ${C.accent}40`,
            }}
          >
            Chia →
          </button>
        </div>

        {/* Quick-pick verbs */}
        <div style={{ display:"flex", flexWrap:"wrap", gap:"0.22rem", marginTop:"0.55rem" }}>
          {COMMON_VERBS.map(v => (
            <button key={v} onClick={() => { setVerb(v); generate(v); }}
              style={{
                padding:"0.15rem 0.52rem",
                background: verb === v ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.15)",
                border:`1px solid ${verb === v ? "transparent" : "rgba(255,255,255,0.25)"}`,
                borderRadius:20, fontSize:"0.68rem",
                color: verb === v ? C.blue : "rgba(255,255,255,0.85)",
                cursor:"pointer", fontFamily:"Georgia,serif",
                transition:"all 0.15s", fontWeight: verb === v ? 700 : 400,
              }}>
              {v}
            </button>
          ))}
        </div>
      </div>

      {/* ── Tense tabs ───────────────────────────────────────── */}
      <div style={{
        display:"flex", gap:"0.3rem", overflowX:"auto", scrollbarWidth:"none",
        padding:"0.6rem 1rem 0.55rem",
        borderBottom:`1px solid ${C.border}`,
        background:C.white,
      }}>
        {TENSES.map(t => {
          const active = tense === t.id;
          return (
            <button key={t.id}
              onClick={() => { setTense(t.id); if (result) generate(verb, t.id); }}
              style={{
                flexShrink:0, padding:"0.3rem 0.75rem",
                borderRadius:20,
                border:`1.5px solid ${active ? C.blue : C.border}`,
                background: active ? C.blue : C.white,
                color: active ? "#fff" : C.gray,
                fontSize:"0.7rem", cursor:"pointer",
                fontWeight: active ? 600 : 400,
                transition:"all 0.15s", fontFamily:"inherit",
                boxShadow: active ? `0 2px 8px ${C.blue}30` : "none",
              }}>
              {t.label}
              {t.level === "A2" && (
                <span style={{ marginLeft:4, fontSize:"0.55rem", opacity:0.6 }}>A2</span>
              )}
            </button>
          );
        })}
      </div>

      {/* ── Loading / error ───────────────────────────────────── */}
      {loading && (
        <div style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:"0.5rem", padding:"2.5rem 0" }}>
          <Spinner />
          <div style={{ fontSize:"0.78rem", color:C.gray }}>Đang tra bảng chia…</div>
        </div>
      )}
      {err && (
        <div style={{ color:C.red, fontSize:"0.78rem", textAlign:"center", padding:"1rem" }}>
          ⚠ {err}
        </div>
      )}

      {/* ── Result ───────────────────────────────────────────── */}
      {result && !loading && (
        <div style={{ display:"flex", flexDirection:"column" }}>

          {/* Verb hero card */}
          <div style={{
            margin:"0.85rem 1rem 0",
            background:"#1B3A6B", borderRadius:16,
            padding:"1rem 1.2rem 0.9rem",
            position:"relative", overflow:"hidden",
          }}>
            <div style={{
              position:"absolute", right:-8, bottom:-18,
              fontSize:88, opacity:0.07, color:"#fff",
              fontFamily:"'Playfair Display',Georgia,serif",
              fontWeight:700, pointerEvents:"none", userSelect:"none", lineHeight:1,
            }}>
              {result.verb}
            </div>
            <div style={{ fontSize:"0.58rem", letterSpacing:"0.13em", color:"rgba(255,255,255,0.5)", textTransform:"uppercase", fontWeight:600, marginBottom:6 }}>
              {result.group} &nbsp;·&nbsp; {TENSES.find(t => t.id === tense)?.label}
            </div>
            <div style={{ display:"flex", alignItems:"center", gap:10 }}>
              <span style={{ fontFamily:"'Playfair Display',Georgia,serif", fontSize:"2rem", color:"#fff", fontWeight:700, lineHeight:1 }}>
                {result.verb}
              </span>
              <SpeakBtn text={result.verb} />
            </div>
            {result.meaning && (
              <div style={{ fontSize:"0.72rem", color:"rgba(255,255,255,0.55)", marginTop:4 }}>
                {result.meaning}
              </div>
            )}
          </div>

          {/* Mode toggle */}
          <div style={{ display:"flex", gap:"0.3rem", padding:"0.7rem 1rem 0" }}>
            {[["table","📋 Bảng"], ["quiz","✏️ Quiz"]].map(([m, l]) => (
              <button key={m}
                onClick={() => { setMode(m); if (m === "quiz") setQuizKey(k => k+1); }}
                style={{
                  padding:"0.28rem 0.7rem", borderRadius:20,
                  border:`1.5px solid ${mode===m ? C.blue : C.border}`,
                  background: mode===m ? C.blue : C.white,
                  color: mode===m ? "#fff" : C.gray,
                  fontSize:"0.68rem", cursor:"pointer",
                  fontWeight:600, transition:"all 0.15s", fontFamily:"inherit",
                  boxShadow: mode===m ? `0 2px 8px ${C.blue}30` : "none",
                }}>
                {l}
              </button>
            ))}
          </div>

          {/* Conjugation table */}
          {mode === "table" ? (
            <div style={{ padding:"0.5rem 1rem 0" }}>
              <div style={{ background:C.white, borderRadius:14, border:`1px solid ${C.border}`, overflow:"hidden" }}>
                {SUBJECTS.map((sub, i) => (
                  <div key={i} style={{
                    display:"grid", gridTemplateColumns:"1fr 1.4fr auto",
                    alignItems:"center", padding:"0.55rem 1rem",
                    borderBottom: i < 5 ? `1px solid ${C.border}` : "none",
                    background: i % 2 === 0 ? C.white : C.cream,
                  }}>
                    <div style={{ fontSize:"0.78rem", color:C.gray, fontStyle:"italic" }}>{sub}</div>
                    <div style={{ fontFamily:"Georgia,serif", fontSize:"1rem", color:C.ink, fontWeight:700 }}>
                      {result.conjugations[i]}
                    </div>
                    <SpeakBtn text={`${sub.split("/")[0]} ${result.conjugations[i]}`} size="sm" />
                  </div>
                ))}
              </div>

              {result.tip && (
                <div style={{ marginTop:"0.7rem", background:C.goldL, borderRadius:10, padding:"0.5rem 0.75rem", fontSize:"0.75rem", color:"#92400E", border:`1px solid ${C.gold}40` }}>
                  💡 {result.tip}
                </div>
              )}

              {result.example && (() => {
                const di = result.example.indexOf(" — ");
                const fr = di >= 0 ? result.example.slice(0, di) : result.example;
                const vi = di >= 0 ? result.example.slice(di + 3) : null;
                return (
                  <div style={{ marginTop:"0.6rem", marginBottom:"1rem" }}>
                    <div style={{ fontSize:"0.58rem", fontWeight:700, color:C.gray, textTransform:"uppercase", letterSpacing:"0.12em", marginBottom:6 }}>
                      Câu ví dụ
                    </div>
                    <div style={{ background:C.white, borderRadius:12, border:`1px solid ${C.border}`, borderLeft:`3px solid ${C.blue}`, padding:"0.65rem 0.9rem" }}>
                      <div style={{ fontFamily:"Georgia,serif", fontSize:"0.88rem", color:C.ink, fontStyle:"italic" }}>
                        &laquo; {fr} &raquo;
                      </div>
                      {vi && <div style={{ fontSize:"0.75rem", color:C.gray, marginTop:4 }}>{vi}</div>}
                    </div>
                  </div>
                );
              })()}
            </div>
          ) : (
            <div style={{ padding:"0.5rem 1rem 1rem" }}>
              <ConjugQuiz key={quizKey} conjugation={result} onDone={() => setQuizKey(k => k+1)} />
            </div>
          )}

          <div style={{ height:"3rem" }} />
        </div>
      )}

      {/* Empty state */}
      {!result && !loading && !err && (
        <div style={{ textAlign:"center", padding:"3rem 1rem 2rem", color:C.gray }}>
          <div style={{ fontSize:"2.5rem", marginBottom:"0.6rem" }}>✏️</div>
          <div style={{ fontSize:"0.82rem", fontWeight:600, color:C.ink2, marginBottom:"0.3rem" }}>Nhập động từ để bắt đầu</div>
          <div style={{ fontSize:"0.72rem" }}>Hoặc chọn nhanh từ gợi ý ở trên</div>
        </div>
      )}
    </div>
  );
}
