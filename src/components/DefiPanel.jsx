import { useState } from "react";
import { C } from "../constants.js";
import { callAI } from "../utils/api.js";
import { markStudiedToday, loadSets } from "../utils/storage.js";
import { getAllCards } from "../utils/srs.js";
import Spinner from "./ui/Spinner.jsx";
import { Confetti } from "./ui/Minou.jsx";
import { logMistake } from "../utils/storage.js";

const DEFI_KEY = "defi_history";

// ── Data helpers ────────────────────────────────────────────
function getWeakWords() {
  return getAllCards()
    .filter(c => c.easeFactor < 2.2 || c.repetitions < 2)
    .sort((a, b) => a.easeFactor - b.easeFactor)
    .slice(0, 40);
}

function getSavedWords() {
  const sets = loadSets();
  if (!sets.length) return [];
  const seen = new Set();
  const words = [];
  for (const set of sets) {
    for (const line of (set.text || "").split("\n")) {
      const sep = line.indexOf(" — ");
      if (sep === -1) continue;
      const fr = line.slice(0, sep).trim();
      const vi = line.slice(sep + 3).trim();
      if (fr && !seen.has(fr)) { seen.add(fr); words.push({ fr, vi }); }
    }
  }
  return words;
}

function buildPrompt(mode, numQ, words) {
  const schema = `
CRITICAL: every question MUST have both "q" and "answer".
Return ONLY JSON:
{
  "title": "short challenge title in French",
  "questions": [
    {
      "q": "question text or Vietnamese sentence",
      "options": ["A","B","C","D"],
      "answer": "correct answer — ALWAYS REQUIRED",
      "explanation": "short tip in Vietnamese"
    }
  ]
}
Rules:
- Multiple choice: "options" array of 4, "answer" = one of those options exactly
- Fill blank: no "options", "q" has ___ , "answer" = missing word
- Translate: no "options", "q" = Vietnamese sentence, "answer" = French translation`;

  if (mode === "weak" && words.length) {
    const list = words.map(w => `${w.fr} — ${w.vi}`).join(", ");
    return `French teacher for A1 Vietnamese learners. Create a challenge with exactly ${numQ} questions targeting words the learner struggles with: ${list}
Mix: 50% multiple choice (FR→VI or VI→FR), 30% fill-in-blank, 20% short translation.${schema}`;
  }

  if (mode === "vocab" && words.length) {
    const sample = words.sort(() => Math.random() - 0.5).slice(0, 40);
    const list = sample.map(w => `${w.fr} — ${w.vi}`).join(", ");
    return `French teacher for A1 Vietnamese learners. Create a challenge with exactly ${numQ} questions using ONLY these vocabulary words: ${list}
Mix: 50% multiple choice (FR→VI), 30% fill-in-blank, 20% translation (VI→FR).${schema}`;
  }

  const TOPICS = [
    "vocabulary from Édito A1 (daily life, food, family, transport)",
    "grammar A1 (articles le/la/les/un/une, verb être/avoir/aller/faire, negation, adjectives)",
    "culture française et Francophonie (geography, traditions, famous places)",
    "numbers, dates, time expressions in French A1",
    "mixed A1: vocabulary + grammar + short translation",
  ];
  const topic = TOPICS[Math.floor(Math.random() * TOPICS.length)];
  return `French teacher for A1 Vietnamese learners. Create a surprise challenge with exactly ${numQ} questions about: ${topic}
Mix multiple choice, fill-in-blank, and 2-3 short translations.${schema}`;
}

// ── Main Panel ──────────────────────────────────────────────
export default function DefiPanel() {
  const [mode, setMode]     = useState(null);
  const [numQ, setNumQ]     = useState(12);
  const [defi, setDefi]     = useState(null);
  const [loading, setLoading] = useState(false);
  const [err, setErr]       = useState("");
  const [done, setDone]     = useState(false);
  const [score, setScore]   = useState({ ok:0, total:0 });
  const [confetti, setConfetti] = useState(false);
  const [history, setHistory] = useState(() => {
    try { return JSON.parse(localStorage.getItem(DEFI_KEY) || "[]"); } catch { return []; }
  });

  const weakWords  = getWeakWords();
  const savedWords = getSavedWords();
  const today      = new Date().toLocaleDateString("vi-VN");
  const todayDefi  = history.find(h => h.date === today);

  const TYPES = [
    { id:"weak",   icon:"🎯", label:"Ôn từ yếu",        color:C.red,      bg:"#FFF0EF",
      desc: weakWords.length >= 5  ? `${weakWords.length} từ cần ôn`  : "Chưa có — làm bài tập thêm nhé",
      disabled: weakWords.length < 5 },
    { id:"vocab",  icon:"📚", label:"Từ vựng đang học",  color:C.blue,     bg:C.blueL,
      desc: savedWords.length >= 5 ? `${savedWords.length} từ đã lưu` : "Chưa có — lưu bộ từ trước nhé",
      disabled: savedWords.length < 5 },
    { id:"random", icon:"🎲", label:"Bất ngờ",           color:"#8E44AD",  bg:"#F5EEFF",
      desc:"Từ vựng & ngữ pháp A1 ngẫu nhiên", disabled: false },
  ];

  const generate = async (m) => {
    setMode(m); setLoading(true); setErr(""); setDefi(null); setDone(false); setScore({ok:0,total:0});
    const words = m === "weak" ? weakWords : m === "vocab" ? savedWords : [];
    try {
      const r = await callAI(buildPrompt(m, numQ, words));
      setDefi(r);
    } catch(e) { setErr(e.message); }
    setLoading(false);
  };

  const finish = (ok, total) => {
    setDone(true); setScore({ ok, total });
    if (Math.round(ok / total * 100) >= 80) setConfetti(true);
    markStudiedToday();
    const pct   = Math.round(ok / total * 100);
    const label = TYPES.find(t => t.id === mode)?.label || "Thử thách";
    const entry = { date: today, title: defi?.title || label, score: ok, total, pct, mode };
    const newH  = [entry, ...history].slice(0, 30);
    setHistory(newH);
    localStorage.setItem(DEFI_KEY, JSON.stringify(newH));
  };

  const pctColor = p => p >= 80 ? C.green : p >= 60 ? C.gold : C.red;
  const medal    = p => p >= 80 ? "🥇" : p >= 60 ? "🥈" : "🥉";

  // ── Selection screen ──
  if (!mode && !loading) return (
    <div style={{ animation:"fadeUp 0.3s ease" }}>
      {/* ── Dark hero banner ── */}
      <div style={{ background:"linear-gradient(135deg, #1B3A6B 0%, #2d4f8a 100%)", padding:"0.9rem 1rem 0.85rem", marginBottom:"0.85rem" }}>
        <div style={{ fontFamily:"'Playfair Display',Georgia,serif", fontSize:"1.15rem", color:"#fff", fontWeight:800, lineHeight:1.1 }}>🎲 Le Défi</div>
        <div style={{ fontSize:"0.7rem", color:"rgba(255,255,255,0.65)", marginTop:4 }}>Mỗi ngày một thử thách — làm xong tích streak 🔥</div>
      </div>
    <div style={{ padding:"0 1rem 1rem", display:"flex", flexDirection:"column", gap:"0.85rem" }}>

      {todayDefi && (
        <div style={{ background:C.white, border:`1.5px solid ${pctColor(todayDefi.pct)}33`, borderRadius:12, padding:"0.75rem 1rem", display:"flex", alignItems:"center", gap:"0.7rem" }}>
          <span style={{ fontSize:"1.6rem" }}>{medal(todayDefi.pct)}</span>
          <div style={{ flex:1, minWidth:0 }}>
            <div style={{ fontSize:"0.78rem", fontWeight:600, color:C.ink, whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis" }}>Hôm nay: {todayDefi.title}</div>
            <div style={{ fontSize:"0.67rem", color:C.gray }}>{todayDefi.score}/{todayDefi.total} đúng · {todayDefi.pct}%</div>
          </div>
          <span style={{ fontSize:"0.68rem", color:C.gray, flexShrink:0 }}>Làm thêm →</span>
        </div>
      )}

      {/* Question count */}
      <div style={{ background:C.white, border:`1.5px solid ${C.border}`, borderRadius:12, padding:"0.7rem 0.9rem" }}>
        <div style={{ fontSize:"0.68rem", color:C.gray, marginBottom:"0.45rem", fontWeight:500 }}>Số câu hỏi</div>
        <div style={{ display:"flex", gap:"0.35rem" }}>
          {[10, 15, 20].map(n => (
            <button key={n} onClick={() => setNumQ(n)}
              style={{ flex:1, padding:"0.42rem", border:`1.5px solid ${numQ===n?C.blue:C.border}`, borderRadius:8, background:numQ===n?C.blue:C.white, color:numQ===n?C.white:C.ink, fontSize:"0.85rem", fontWeight:numQ===n?700:400, cursor:"pointer", fontFamily:"inherit", transition:"all 0.15s" }}>
              {n}
            </button>
          ))}
        </div>
      </div>

      {/* Challenge type cards */}
      <div style={{ display:"flex", flexDirection:"column", gap:"0.5rem" }}>
        {TYPES.map(t => (
          <button key={t.id} onClick={() => !t.disabled && generate(t.id)} disabled={t.disabled}
            style={{ background:t.disabled?"#f5f5f7":t.bg, border:`1.5px solid ${t.disabled?C.border:t.color+"44"}`, borderRadius:14, padding:"0.9rem 1rem", textAlign:"left", cursor:t.disabled?"not-allowed":"pointer", fontFamily:"inherit", opacity:t.disabled?0.5:1, display:"flex", alignItems:"center", gap:"0.85rem", transition:"all 0.15s" }}
            onMouseEnter={e=>{ if(!t.disabled){ e.currentTarget.style.transform="translateX(3px)"; e.currentTarget.style.boxShadow=`0 4px 16px ${t.color}22`; }}}
            onMouseLeave={e=>{ e.currentTarget.style.transform=""; e.currentTarget.style.boxShadow=""; }}>
            <div style={{ width:46, height:46, background:t.disabled?"#e5e5e5":t.color+"1a", borderRadius:12, display:"flex", alignItems:"center", justifyContent:"center", fontSize:"1.5rem", flexShrink:0 }}>
              {t.icon}
            </div>
            <div style={{ flex:1, minWidth:0 }}>
              <div style={{ fontSize:"0.92rem", fontWeight:700, color:t.disabled?C.gray:C.ink }}>{t.label}</div>
              <div style={{ fontSize:"0.7rem", color:t.disabled?C.gray:t.color, fontWeight:500, marginTop:"0.1rem" }}>{t.desc}</div>
            </div>
            {!t.disabled && <span style={{ color:t.color, fontSize:"1.1rem", flexShrink:0 }}>→</span>}
          </button>
        ))}
      </div>

      {/* History */}
      {history.length > 0 && (
        <div>
          <div style={{ fontSize:"0.63rem", textTransform:"uppercase", letterSpacing:1, color:C.gray, marginBottom:"0.45rem", fontWeight:600 }}>📅 Gần đây</div>
          {history.slice(0, 5).map((h, i) => (
            <div key={i} style={{ background:C.white, border:`1px solid ${C.border}`, borderRadius:8, padding:"0.5rem 0.75rem", marginBottom:"0.3rem", display:"flex", justifyContent:"space-between", alignItems:"center" }}>
              <div style={{ minWidth:0, flex:1, marginRight:"0.5rem" }}>
                <div style={{ fontSize:"0.78rem", color:C.ink, whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis" }}>{h.title}</div>
                <div style={{ fontSize:"0.63rem", color:C.gray }}>{h.date} · {h.total} câu</div>
              </div>
              <div style={{ display:"flex", alignItems:"center", gap:"0.25rem", flexShrink:0 }}>
                <span>{medal(h.pct)}</span>
                <span style={{ fontSize:"0.72rem", fontWeight:700, color:pctColor(h.pct) }}>{h.pct}%</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
    </div>
  );

  // ── Loading ──
  if (loading) return (
    <div style={{ padding:"2rem 1rem", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", gap:"1rem", minHeight:300 }}>
      <Spinner />
      <div style={{ fontSize:"0.85rem", color:C.gray }}>AI đang tạo {numQ} câu hỏi...</div>
    </div>
  );

  // ── Error ──
  if (err) return (
    <div style={{ padding:"1rem", display:"flex", flexDirection:"column", gap:"0.75rem" }}>
      <div style={{ color:C.red, fontSize:"0.8rem", padding:"0.75rem", background:"#fde8e6", borderRadius:10 }}>⚠ {err}</div>
      <button onClick={() => { setMode(null); setErr(""); }} style={{ padding:"0.5rem 1rem", border:`1px solid ${C.border}`, borderRadius:20, background:"transparent", color:C.gray, fontSize:"0.78rem", cursor:"pointer" }}>← Chọn lại</button>
    </div>
  );

  // ── Quiz ──
  if (defi && !done) {
    const modeInfo = TYPES.find(t => t.id === mode);
    return (
      <div style={{ padding:"1rem", display:"flex", flexDirection:"column", gap:"0.65rem" }}>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
          <div>
            <div style={{ fontFamily:"Georgia,serif", fontSize:"0.95rem", color:C.blue, fontWeight:700 }}>{modeInfo?.icon} {defi.title}</div>
            <div style={{ fontSize:"0.67rem", color:C.gray, marginTop:"0.1rem" }}>{defi.questions?.length} câu · {modeInfo?.label}</div>
          </div>
          <button onClick={() => setMode(null)} style={{ padding:"0.25rem 0.65rem", border:`1px solid ${C.border}`, borderRadius:20, background:"transparent", color:C.gray, fontSize:"0.68rem", cursor:"pointer" }}>← Đổi</button>
        </div>
        <DefiQuiz defi={defi} onFinish={finish} />
      </div>
    );
  }

  // ── Result ──
  if (done) {
    const pct = Math.round(score.ok / score.total * 100);
    return (
      <div style={{ padding:"1rem" }}>
        <Confetti active={confetti} onDone={() => setConfetti(false)} />
        <div style={{ background:C.white, border:`1.5px solid ${pctColor(pct)}44`, borderRadius:16, padding:"1.75rem 1.2rem", textAlign:"center", animation:"fadeUp 0.3s ease" }}>

          <div style={{ fontFamily:"'Playfair Display',Georgia,serif", fontSize:"2rem", color:pctColor(pct), fontWeight:700, lineHeight:1 }}>{score.ok}/{score.total}</div>
          <div style={{ fontSize:"0.82rem", color:C.gray, marginTop:"0.4rem", marginBottom:"1.5rem" }}>
            {pct >= 80 ? "Xuất sắc! 🌟" : pct >= 60 ? "Rất tốt! Tiếp tục nhé!" : "Cần ôn thêm — bạn làm được!"}
          </div>
          <div style={{ display:"flex", gap:"0.5rem" }}>
            <button onClick={() => { setConfetti(false); generate(mode); }}
              style={{ flex:1, padding:"0.7rem", background:`linear-gradient(135deg,${C.accent},#c0392b)`, color:C.white, border:"none", borderRadius:10, fontFamily:"Georgia,serif", fontSize:"0.88rem", cursor:"pointer" }}>
              🔄 Làm lại
            </button>
            <button onClick={() => { setConfetti(false); setMode(null); setDefi(null); }}
              style={{ flex:1, padding:"0.7rem", background:"transparent", border:`1.5px solid ${C.border}`, color:C.ink, borderRadius:10, fontSize:"0.88rem", cursor:"pointer" }}>
              🎲 Đổi loại
            </button>
          </div>
        </div>
      </div>
    );
  }

  return null;
}

// ── Quiz component ──────────────────────────────────────────
export function DefiQuiz({ defi, onFinish }) {
  const [answers, setAnswers]     = useState({});
  const [revealed, setRevealed]   = useState({});
  const [inputVals, setInputVals] = useState({});
  const [grading, setGrading]     = useState({});

  const questions   = defi.questions || [];
  const allAnswered = questions.length > 0 && questions.every((_, i) => revealed[i]);

  // Auto-finish 1s after last answer
  useState(() => {
    if (!allAnswered) return;
    const ok = questions.filter((_, i) => {
      if (grading[i] !== undefined) return grading[i];
      const ans = answers[i] || inputVals[i] || "";
      return ans.trim().toLowerCase() === (questions[i].answer || "").toLowerCase();
    }).length;
    const t = setTimeout(() => onFinish(ok, questions.length), 1000);
    return () => clearTimeout(t);
  });

  const submitInput = (i, q) => {
    const val = (inputVals[i] || "").trim();
    if (!val) return;
    if (!q.options) {
      const u = val.toLowerCase().replace(/[''`.,!?]/g, "");
      const a = (q.answer || "").toLowerCase().replace(/[''`.,!?]/g, "");
      const aWords = a.split(" ").filter(w => w.length > 2);
      const matched = aWords.filter(w => u.includes(w)).length;
      const ok = aWords.length === 0 ? u === a : matched / aWords.length >= 0.6;
      setGrading(g => ({ ...g, [i]: ok }));
    }
    setRevealed(r => ({ ...r, [i]: true }));
  };

  return (
    <div style={{ display:"flex", flexDirection:"column", gap:"0.6rem", animation:"fadeUp 0.3s ease" }}>
      {questions.map((q, i) => {
        const isRevealed = revealed[i];
        const userAns    = answers[i] || inputVals[i] || "";
        const correct    = grading[i] !== undefined ? grading[i]
          : userAns.trim().toLowerCase() === (q.answer || "").toLowerCase();

        return (
          <div key={i} style={{ background:C.white, border:`1.5px solid ${isRevealed?(correct?C.green:C.red):C.border}`, borderRadius:12, padding:"0.85rem", boxShadow:"0 1px 6px rgba(0,0,0,0.04)" }}>
            <div style={{ fontSize:"0.6rem", color:C.gray, textTransform:"uppercase", letterSpacing:1, marginBottom:"0.35rem" }}>Câu {i+1}</div>
            <div style={{ fontFamily:"Georgia,serif", fontSize:"0.9rem", color:C.ink, marginBottom:"0.6rem", lineHeight:1.55 }}>{q.q}</div>

            {q.options?.length > 0 ? (
              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"0.28rem" }}>
                {q.options.map((opt, j) => {
                  let bg = C.white, bc = C.border, col = C.ink;
                  if (isRevealed) {
                    if (opt.toLowerCase() === (q.answer||"").toLowerCase()) { bg="#e8f7f1"; bc=C.green; col=C.green; }
                    else if (opt === answers[i]) { bg="#fde8e6"; bc=C.red; col=C.red; }
                  } else if (answers[i] === opt) { bg=C.blueL; bc=C.blue; col=C.blue; }
                  return (
                    <button key={j} disabled={isRevealed}
                      onClick={() => {
                        setAnswers(a=>({...a,[i]:opt})); setRevealed(r=>({...r,[i]:true}));
                        if (opt.toLowerCase() !== (q.answer||"").toLowerCase()) {
                          logMistake({ fr: q.answer||opt, vi:"", context: q.q, module:"defi" });
                        }
                      }}
                      style={{ padding:"0.45rem 0.55rem", border:`1.5px solid ${bc}`, borderRadius:9, background:bg, color:col, fontSize:"0.8rem", cursor:isRevealed?"default":"pointer", textAlign:"left", fontFamily:"inherit", transition:"all 0.12s" }}>
                      {opt}
                    </button>
                  );
                })}
              </div>
            ) : (
              <div style={{ display:"flex", gap:"0.38rem" }}>
                <input value={inputVals[i]||""} disabled={isRevealed}
                  onChange={e => setInputVals(v=>({...v,[i]:e.target.value}))}
                  onKeyDown={e => { if(e.key==="Enter"&&!isRevealed) submitInput(i,q); }}
                  placeholder="Nhập câu tiếng Pháp..."
                  style={{ flex:1, border:`1.5px solid ${isRevealed?(correct?C.green:C.red):C.border}`, borderRadius:9, padding:"0.45rem 0.7rem", fontSize:"0.85rem", fontFamily:"Georgia,serif", background:isRevealed?(correct?"#e8f7f1":"#fde8e6"):C.white, color:isRevealed?(correct?C.green:C.red):C.ink, outline:"none" }}/>
                {!isRevealed && (
                  <button onClick={() => submitInput(i,q)}
                    style={{ padding:"0.45rem 0.8rem", background:C.accent, color:C.white, border:"none", borderRadius:9, fontSize:"0.8rem", cursor:"pointer", whiteSpace:"nowrap" }}>
                    OK
                  </button>
                )}
              </div>
            )}

            {isRevealed && (
              <div style={{ marginTop:"0.5rem", fontSize:"0.72rem", lineHeight:1.6, padding:"0.4rem 0.6rem", background:correct?"#e8f7f1":"#fde8e6", borderRadius:7 }}>
                {correct
                  ? <span style={{ color:C.green, fontWeight:600 }}>✓ Chính xác!</span>
                  : <span style={{ color:C.red }}>✗ Đáp án: <b style={{ fontFamily:"Georgia,serif" }}>{q.answer}</b></span>
                }
                {q.explanation && <div style={{ color:C.gray, marginTop:"0.2rem" }}>💡 {q.explanation}</div>}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
