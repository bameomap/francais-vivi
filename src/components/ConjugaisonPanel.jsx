import { useState, useRef } from "react";
import { C } from "../constants.js";
import { callAI } from "../utils/api.js";
import { awardXP, increment, checkBadges, BADGE_DEFS } from "../utils/xp.js";
import { getSRSStats } from "../utils/srs.js";
import { getStreak } from "../utils/storage.js";
import SpeakBtn from "./ui/SpeakBtn.jsx";
import Spinner from "./ui/Spinner.jsx";
import { Confetti } from "./ui/Minou.jsx";

const SUBJECTS = ["je","tu","il/elle","nous","vous","ils/elles"];
const TENSES = [
  { id:"present",   label:"Présent",       color:"#3B82F6" },
  { id:"passe",     label:"Passé composé", color:"#8E44AD" },
  { id:"futur",     label:"Futur simple",  color:"#059669" },
  { id:"imparfait", label:"Imparfait",     color:"#D97706" },
];

const COMMON_VERBS = [
  "être","avoir","aller","faire","pouvoir","vouloir","savoir",
  "venir","voir","prendre","parler","manger","finir","aimer","dormir",
];

function buildPrompt(verb, tense) {
  const tenseLabel = TENSES.find(t=>t.id===tense)?.label || tense;
  return `Chia động từ "${verb}" ở thì ${tenseLabel} cho 6 ngôi.
JSON hợp lệ KHÔNG có markdown:
{"verb":"${verb}","tense":"${tenseLabel}","group":"nhóm (1/2/3/irrégulier)","conjugations":["forme_je","forme_tu","forme_il","forme_nous","forme_vous","forme_ils"],"tip":"mẹo nhớ ngắn tiếng Việt tối đa 15 từ"}`;
}

function ConjugQuiz({ conjugation, onDone }) {
  const [inputs,  setInputs]  = useState(Array(6).fill(""));
  const [checked, setChecked] = useState(false);
  const refs = useRef([]);

  const norm = s => s.toLowerCase().trim().replace(/['''`]/g,"'");
  const results = conjugation.conjugations.map((ans,i) => {
    const t = norm(inputs[i]), a = norm(ans);
    if (t === a) return "ok";
    if (a.includes(" ") && a.endsWith(t)) return "ok"; // allow missing aux
    return "wrong";
  });
  const score = results.filter(r=>r==="ok").length;
  const pct   = Math.round(score/6*100);

  return (
    <div style={{ display:"flex", flexDirection:"column", gap:"0.55rem" }}>
      <div style={{ fontSize:"0.68rem", color:C.gray, textAlign:"center", marginBottom:"0.1rem" }}>Điền dạng chia đúng · Enter để chuyển ô</div>
      {SUBJECTS.map((sub,i) => {
        const st = checked ? results[i] : "idle";
        return (
          <div key={i} style={{ display:"grid", gridTemplateColumns:"0.7fr 1fr", gap:"0.4rem", alignItems:"center" }}>
            <div style={{ fontSize:"0.8rem", color:C.gray, fontStyle:"italic", textAlign:"right", paddingRight:"0.3rem" }}>{sub}</div>
            <div style={{ position:"relative" }}>
              <input
                ref={el=>refs.current[i]=el}
                value={inputs[i]} disabled={checked}
                onChange={e=>setInputs(v=>v.map((x,j)=>j===i?e.target.value:x))}
                onKeyDown={e=>{ if(e.key==="Enter"){ if(i<5) refs.current[i+1]?.focus(); else setChecked(true); }}}
                placeholder="…"
                style={{ width:"100%", padding:"0.48rem 0.65rem", border:`1.5px solid ${checked?(st==="ok"?C.green:C.red):C.border}`, borderRadius:10, background:checked?(st==="ok"?"#ECFDF5":"#FEF2F2"):C.white, fontSize:"0.88rem", fontFamily:"Georgia,serif", color:C.ink, outline:"none", boxSizing:"border-box" }}
              />
              {checked && st==="wrong" && (
                <div style={{ fontSize:"0.68rem", color:C.green, fontWeight:700, marginTop:"0.15rem" }}>→ {conjugation.conjugations[i]}</div>
              )}
            </div>
          </div>
        );
      })}
      {!checked ? (
        <button onClick={()=>setChecked(true)}
          style={{ padding:"0.55rem", background:C.blue, color:C.white, border:"none", borderRadius:12, fontSize:"0.85rem", cursor:"pointer", fontWeight:700, marginTop:"0.25rem" }}>
          Chấm ✓
        </button>
      ) : (
        <div style={{ textAlign:"center", marginTop:"0.25rem" }}>
          <div style={{ fontFamily:"'Playfair Display',Georgia,serif", fontSize:"1.5rem", color:pct>=80?"#059669":pct>=60?C.gold:C.red, fontWeight:700 }}>{score}/6</div>
          <button onClick={onDone}
            style={{ marginTop:"0.45rem", padding:"0.4rem 1rem", background:C.white, border:`1.5px solid ${C.border}`, borderRadius:12, fontSize:"0.78rem", cursor:"pointer", color:C.ink }}>
            🔄 Thử lại
          </button>
        </div>
      )}
    </div>
  );
}

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

  const showToast = msg => { setToast(msg); setTimeout(()=>setToast(""),2800); };

  const generate = async (v, t) => {
    const target = (v||verb).trim();
    if (!target) return;
    setLoading(true); setErr(""); setResult(null); setMode("table");
    try {
      const data = await callAI(buildPrompt(target, t||tense));
      setResult(data);
      awardXP(5);
      const conjCount = increment("conjugaison_count");
      const srs = getSRSStats();
      const streak = getStreak();
      const earned = checkBadges({ srsTotal:srs.total, mastered:srs.mastered, streak:streak.streak, conjugaisonCount:conjCount });
      if (earned.length) {
        const badge = BADGE_DEFS.find(b=>b.id===earned[0]);
        if (badge) showToast(`🏅 Badge mới: ${badge.icon} ${badge.label}!`);
      }
    } catch(e) { setErr(e.message); }
    setLoading(false);
  };

  const tenseColor = TENSES.find(t=>t.id===tense)?.color || C.blue;

  return (
    <div style={{ padding:"1rem", animation:"fadeUp 0.3s ease", display:"flex", flexDirection:"column", gap:"0.75rem" }}>
      <Confetti active={confetti} onDone={()=>setConfetti(false)} />

      {toast && (
        <div style={{ position:"fixed", top:20, left:"50%", transform:"translateX(-50%)", background:C.ink, color:C.white, padding:"0.55rem 1.2rem", borderRadius:24, fontSize:"0.8rem", zIndex:400, whiteSpace:"nowrap", boxShadow:"0 4px 20px rgba(0,0,0,0.2)", animation:"pop 0.3s ease" }}>
          {toast}
        </div>
      )}

      {/* Verb input */}
      <div style={{ background:C.white, borderRadius:16, padding:"1rem", border:`1.5px solid ${C.border}` }}>
        <div style={{ fontSize:"0.65rem", color:C.gray, textTransform:"uppercase", letterSpacing:1, marginBottom:"0.5rem", fontWeight:600 }}>Nhập động từ</div>
        <div style={{ display:"flex", gap:"0.4rem" }}>
          <input
            value={verb} onChange={e=>setVerb(e.target.value)}
            onKeyDown={e=>e.key==="Enter"&&generate()}
            placeholder="aller, être, parler…"
            style={{ flex:1, padding:"0.6rem 0.8rem", border:`1.5px solid ${C.border}`, borderRadius:10, fontSize:"0.95rem", fontFamily:"Georgia,serif", color:C.ink, outline:"none" }}
          />
          <button onClick={()=>generate()}
            style={{ padding:"0.6rem 1rem", background:tenseColor, color:C.white, border:"none", borderRadius:10, fontSize:"0.85rem", cursor:"pointer", fontWeight:700, whiteSpace:"nowrap" }}>
            Chia →
          </button>
        </div>
        <div style={{ display:"flex", flexWrap:"wrap", gap:"0.22rem", marginTop:"0.55rem" }}>
          {COMMON_VERBS.map(v => (
            <button key={v} onClick={()=>{ setVerb(v); generate(v); }}
              style={{ padding:"0.15rem 0.52rem", background:C.blueL, border:`1px solid ${C.blue}33`, borderRadius:20, fontSize:"0.68rem", color:C.blue, cursor:"pointer", fontFamily:"Georgia,serif" }}>
              {v}
            </button>
          ))}
        </div>
      </div>

      {/* Tense picker */}
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"0.4rem" }}>
        {TENSES.map(t => (
          <button key={t.id} onClick={()=>{ setTense(t.id); if(result) generate(verb,t.id); }}
            style={{ padding:"0.5rem", borderRadius:10, border:`1.5px solid ${tense===t.id?t.color:C.border}`, background:tense===t.id?t.color+"18":C.white, color:tense===t.id?t.color:C.gray, fontSize:"0.75rem", cursor:"pointer", fontWeight:tense===t.id?700:400, transition:"all 0.15s" }}>
            {t.label}
          </button>
        ))}
      </div>

      {loading && <div style={{ display:"flex", justifyContent:"center", padding:"1.5rem 0" }}><Spinner /></div>}
      {err && <div style={{ color:C.red, fontSize:"0.78rem", textAlign:"center" }}>⚠ {err}</div>}

      {result && !loading && (
        <div style={{ background:C.white, borderRadius:16, padding:"1rem 1.1rem", border:`1.5px solid ${tenseColor}44` }}>
          <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:"0.75rem" }}>
            <div>
              <div style={{ display:"flex", alignItems:"center", gap:"0.5rem" }}>
                <span style={{ fontFamily:"'Playfair Display',Georgia,serif", fontSize:"1.4rem", color:C.ink, fontWeight:700 }}>{result.verb}</span>
                <SpeakBtn text={result.verb} />
                <span style={{ background:tenseColor+"20", color:tenseColor, borderRadius:20, padding:"0.1rem 0.5rem", fontSize:"0.62rem", fontWeight:700 }}>{result.tense}</span>
              </div>
              <div style={{ fontSize:"0.68rem", color:C.gray, marginTop:"0.1rem" }}>Nhóm {result.group}</div>
            </div>
            <div style={{ display:"flex", gap:"0.3rem" }}>
              {[["table","Bảng"],["quiz","Quiz"]].map(([m,l])=>(
                <button key={m} onClick={()=>{ setMode(m); if(m==="quiz") setQuizKey(k=>k+1); }}
                  style={{ padding:"0.28rem 0.65rem", borderRadius:20, border:`1.5px solid ${mode===m?tenseColor:C.border}`, background:mode===m?tenseColor:C.white, color:mode===m?C.white:C.gray, fontSize:"0.68rem", cursor:"pointer", fontWeight:600, transition:"all 0.15s" }}>
                  {l}
                </button>
              ))}
            </div>
          </div>

          {mode==="table" ? (
            <>
              <div style={{ display:"flex", flexDirection:"column", gap:"0.25rem" }}>
                {SUBJECTS.map((sub,i) => (
                  <div key={i} style={{ display:"grid", gridTemplateColumns:"0.7fr 1fr", gap:"0.5rem", alignItems:"center", background:i%2===0?"transparent":C.cream, borderRadius:8, padding:"0.32rem 0.5rem" }}>
                    <div style={{ fontSize:"0.78rem", color:C.gray, fontStyle:"italic", textAlign:"right" }}>{sub}</div>
                    <div style={{ display:"flex", alignItems:"center", gap:"0.3rem" }}>
                      <span style={{ fontFamily:"Georgia,serif", fontSize:"0.95rem", color:tenseColor, fontWeight:700 }}>{result.conjugations[i]}</span>
                      <SpeakBtn text={`${sub.split("/")[0]} ${result.conjugations[i]}`} size="sm" />
                    </div>
                  </div>
                ))}
              </div>
              {result.tip && (
                <div style={{ marginTop:"0.7rem", background:"#FFFBEB", borderRadius:10, padding:"0.5rem 0.75rem", fontSize:"0.75rem", color:"#92400E" }}>
                  💡 {result.tip}
                </div>
              )}
            </>
          ) : (
            <ConjugQuiz key={quizKey} conjugation={result} onDone={()=>setQuizKey(k=>k+1)} />
          )}
        </div>
      )}
    </div>
  );
}
