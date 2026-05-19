import { useState, useEffect } from "react";
import { C } from "../constants.js";
import { callAI } from "../utils/api.js";
import { markStudiedToday } from "../utils/storage.js";
import Spinner from "./ui/Spinner.jsx";

// ── Défi du Jour Panel ─────────────────────────────────────
const DEFI_KEY = "defi_history";

export default function DefiPanel() {
  const [defi, setDefi] = useState(null);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");
  const [done, setDone] = useState(false);
  const [score, setScore] = useState({ ok:0, total:0 });
  const [history, setHistory] = useState(() => {
    try { return JSON.parse(localStorage.getItem(DEFI_KEY) || "[]"); } catch { return []; }
  });

  const DEFI_TYPES = [
    "5 câu trắc nghiệm từ vựng Édito A1 ngẫu nhiên (chọn 1 trong 4 đáp án)",
    "5 câu điền từ vào chỗ trống về ngữ pháp A1 (mạo từ, giới từ, chia động từ être/avoir/aller)",
    "3 câu dịch câu ngắn từ tiếng Việt sang tiếng Pháp (A1 level)",
    "5 câu hỏi về văn hóa Pháp và Francophonie (trắc nghiệm)",
    "5 câu về từ vựng gia đình, nhà cửa, thức ăn (trắc nghiệm hoặc điền từ)",
  ];

  const today = new Date().toLocaleDateString("vi-VN");
  const todayDefi = history.find(h => h.date === today);

  const generate = async () => {
    setLoading(true); setErr(""); setDefi(null); setDone(false); setScore({ok:0,total:0});
    const type = DEFI_TYPES[Math.floor(Math.random() * DEFI_TYPES.length)];
    try {
      const r = await callAI(`French teacher for A1 Vietnamese learners. Create a daily challenge: ${type}.
CRITICAL: Every question MUST have both "q" and "answer" fields.
Return ONLY JSON:
{
  "title": "challenge title in French",
  "questions": [
    {
      "q": "question or Vietnamese sentence to translate",
      "options": ["A","B","C","D"],
      "answer": "correct answer or French translation (ALWAYS REQUIRED)",
      "explanation": "short tip in Vietnamese"
    }
  ]
}
Rules:
- Multiple choice: include "options" array with 4 items, "answer" = one of the options
- Fill blank: no "options", "q" has ___ for blank, "answer" = missing word
- Translate: no "options", "q" = Vietnamese sentence, "answer" = French translation`);
      setDefi(r);
    } catch(e) { setErr(e.message); }
    setLoading(false);
  };

  const finish = (ok, total) => {
    setDone(true);
    setScore({ok, total});
    markStudiedToday();
    const entry = { date: today, title: defi?.title, score: ok, total, pct: Math.round(ok/total*100) };
    const newH = [entry, ...history].slice(0, 30);
    setHistory(newH);
    localStorage.setItem(DEFI_KEY, JSON.stringify(newH));
  };

  const scoreColor = p => p >= 80 ? C.green : p >= 60 ? C.gold : C.red;
  const medal = p => p >= 80 ? "🥇" : p >= 60 ? "🥈" : "🥉";

  return (
    <div style={{ padding:"1rem", display:"flex", flexDirection:"column", gap:"0.85rem" }}>
      <div style={{ fontSize:"0.72rem", fontWeight:600, color:"#8e44ad" }}>🎲 Défi du Jour</div>
      <div style={{ fontSize:"0.73rem", color:C.gray, lineHeight:1.6 }}>Mỗi ngày một thử thách ngẫu nhiên — từ vựng, ngữ pháp, văn hóa. Làm xong tích streak!</div>

      {/* Today status */}
      {todayDefi && !defi && (
        <div style={{ background:"rgba(255,255,255,0.8)", border:`1.5px solid ${scoreColor(todayDefi.pct)}44`, borderRadius:12, padding:"0.9rem 1rem", display:"flex", alignItems:"center", gap:"0.8rem", boxShadow:"0 2px 8px rgba(0,0,0,0.05)" }}>
          <div style={{ fontSize:"2rem" }}>{medal(todayDefi.pct)}</div>
          <div>
            <div style={{ fontSize:"0.75rem", fontWeight:600, color:C.ink }}>Hôm nay đã làm!</div>
            <div style={{ fontSize:"0.7rem", color:C.gray, marginTop:"0.1rem" }}>{todayDefi.title} · {todayDefi.ok}/{todayDefi.total} đúng ({todayDefi.pct}%)</div>
          </div>
          <button onClick={generate} style={{ marginLeft:"auto", padding:"0.3rem 0.65rem", background:"transparent", border:`1px solid ${C.border}`, borderRadius:20, fontSize:"0.68rem", color:C.gray, cursor:"pointer" }}>Thêm 1 thử thách</button>
        </div>
      )}

      {/* Generate button */}
      {!defi && !loading && (
        <button onClick={generate}
          style={{ padding:"1rem", background:"linear-gradient(135deg, #8e44ad, #6b4fbb)", color:C.white, border:"none", borderRadius:14, fontFamily:"Georgia,serif", fontSize:"1rem", cursor:"pointer", boxShadow:"0 4px 16px rgba(142,68,173,0.3)" }}>
          🎲 {todayDefi ? "Thử thách mới" : "Bắt đầu thử thách hôm nay"}
        </button>
      )}

      {loading && <div style={{ display:"flex", flexDirection:"column", alignItems:"center", padding:"2rem", gap:"0.8rem" }}>
        <Spinner />
        <div style={{ fontSize:"0.8rem", color:C.gray }}>AI đang tạo thử thách...</div>
      </div>}

      {err && <div style={{ color:C.red, fontSize:"0.75rem", padding:"0.5rem", background:"#fde8e6", borderRadius:8 }}>⚠ {err}</div>}

      {/* Quiz */}
      {defi && !done && <DefiQuiz defi={defi} onFinish={finish} />}

      {/* Result */}
      {done && (
        <div style={{ background:"rgba(255,255,255,0.9)", border:`1.5px solid ${scoreColor(Math.round(score.ok/score.total*100))}44`, borderRadius:14, padding:"1.2rem", textAlign:"center", animation:"fadeUp 0.3s ease", boxShadow:"0 4px 16px rgba(0,0,0,0.06)" }}>
          <div style={{ fontSize:"2.5rem", marginBottom:"0.5rem" }}>{medal(Math.round(score.ok/score.total*100))}</div>
          <div style={{ fontFamily:"Georgia,serif", fontSize:"1.3rem", color: scoreColor(Math.round(score.ok/score.total*100)), marginBottom:"0.3rem" }}>
            {score.ok}/{score.total} đúng
          </div>
          <div style={{ fontSize:"0.78rem", color:C.gray, marginBottom:"1rem" }}>
            {score.ok === score.total ? "Hoàn hảo! Bạn thật xuất sắc 🌟" : score.ok >= score.total*0.8 ? "Rất tốt! Tiếp tục phát huy!" : score.ok >= score.total*0.6 ? "Khá tốt! Ôn lại nhé!" : "Cần ôn thêm — bạn làm được!"}
          </div>
          <button onClick={generate} style={{ padding:"0.6rem 1.2rem", background:"linear-gradient(135deg, #8e44ad, #6b4fbb)", color:C.white, border:"none", borderRadius:20, fontFamily:"Georgia,serif", fontSize:"0.85rem", cursor:"pointer" }}>
            🎲 Thử thách mới
          </button>
        </div>
      )}

      {/* History */}
      {history.length > 0 && !defi && (
        <div>
          <div style={{ fontSize:"0.65rem", textTransform:"uppercase", letterSpacing:1, color:C.gray, marginBottom:"0.5rem", fontWeight:600 }}>📅 Lịch sử thử thách</div>
          {history.slice(0,7).map((h,i) => (
            <div key={i} style={{ background:"rgba(255,255,255,0.75)", border:`1px solid ${C.border}`, borderRadius:8, padding:"0.5rem 0.75rem", marginBottom:"0.3rem", display:"flex", justifyContent:"space-between", alignItems:"center", boxShadow:"0 1px 4px rgba(0,0,0,0.04)" }}>
              <div>
                <div style={{ fontSize:"0.78rem", color:C.ink }}>{h.title || "Thử thách"}</div>
                <div style={{ fontSize:"0.65rem", color:C.gray, marginTop:"0.08rem" }}>{h.date}</div>
              </div>
              <div style={{ display:"flex", alignItems:"center", gap:"0.3rem" }}>
                <span style={{ fontSize:"0.9rem" }}>{medal(h.pct)}</span>
                <span style={{ fontSize:"0.72rem", fontWeight:600, color: scoreColor(h.pct) }}>{h.pct}%</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export function DefiQuiz({ defi, onFinish }) {
  const [answers, setAnswers] = useState({});
  const [revealed, setRevealed] = useState({});
  const [inputVals, setInputVals] = useState({});
  const [grading, setGrading] = useState({});

  const questions = defi.questions || [];
  const allAnswered = questions.length > 0 && questions.every((_,i) => revealed[i]);

  useEffect(() => {
    if (!allAnswered) return;
    const ok = questions.filter((_,i) => {
      // For graded translate questions, use grading result
      if (grading[i] !== undefined) return grading[i];
      const ans = answers[i] || inputVals[i] || "";
      return ans.trim().toLowerCase() === (questions[i].answer||"").toLowerCase();
    }).length;
    const t = setTimeout(() => onFinish(ok, questions.length), 1000);
    return () => clearTimeout(t);
  }, [allAnswered]);

  const submitInput = async (i, q) => {
    const val = inputVals[i] || "";
    if (!val.trim()) return;
    // For translate questions, use simple AI-free check (flexible matching)
    if (!q.options) {
      const userLower = val.trim().toLowerCase().replace(/[''`.,!?]/g, "");
      const ansLower = (q.answer||"").toLowerCase().replace(/[''`.,!?]/g, "");
      // Check if key words match (at least 60% of answer words present)
      const ansWords = ansLower.split(" ").filter(w=>w.length>2);
      const matchCount = ansWords.filter(w => userLower.includes(w)).length;
      const isOk = ansWords.length === 0 ? userLower === ansLower : matchCount / ansWords.length >= 0.6;
      setGrading(g => ({...g, [i]: isOk}));
    }
    setRevealed(r => ({...r, [i]: true}));
  };

  return (
    <div style={{ display:"flex", flexDirection:"column", gap:"0.65rem", animation:"fadeUp 0.3s ease" }}>
      <div style={{ background:C.white, border:`1px solid ${C.border}`, borderRadius:12, padding:"0.7rem 0.9rem", boxShadow:"0 2px 8px rgba(0,0,0,0.05)" }}>
        <div style={{ fontFamily:"Georgia,serif", fontSize:"0.95rem", color:"#8e44ad" }}>🎲 {defi.title}</div>
        <div style={{ fontSize:"0.68rem", color:C.gray, marginTop:"0.15rem" }}>{questions.length} câu hỏi</div>
      </div>

      {questions.map((q, i) => {
        const isRevealed = revealed[i];
        const userAns = answers[i] || inputVals[i] || "";
        const correct = grading[i] !== undefined ? grading[i] :
          userAns.trim().toLowerCase() === (q.answer||"").toLowerCase();

        return (
          <div key={i} style={{ background:C.white, border:`1.5px solid ${isRevealed?(correct?C.green:C.red):C.border}`, borderRadius:12, padding:"0.85rem", boxShadow:"0 2px 8px rgba(0,0,0,0.04)" }}>
            <div style={{ fontSize:"0.63rem", color:C.gray, textTransform:"uppercase", letterSpacing:1, marginBottom:"0.35rem" }}>Câu {i+1}</div>
            <div style={{ fontFamily:"Georgia,serif", fontSize:"0.9rem", color:C.ink, marginBottom:"0.6rem", lineHeight:1.5 }}>{q.q}</div>

            {q.options && q.options.length > 0 ? (
              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"0.28rem" }}>
                {q.options.map((opt,j) => {
                  let bg=C.white, bc=C.border, col=C.ink;
                  if(isRevealed){
                    if(opt.toLowerCase()===(q.answer||"").toLowerCase()){bg="rgba(16,185,129,0.1)";bc=C.green;col=C.green;}
                    else if(opt===answers[i]){bg="rgba(239,68,68,0.1)";bc=C.red;col=C.red;}
                  } else if(answers[i]===opt){bg=C.purpleL;bc=C.purple;col=C.purple;}
                  return (
                    <button key={j} disabled={isRevealed}
                      onClick={()=>{ setAnswers(a=>({...a,[i]:opt})); setRevealed(r=>({...r,[i]:true})); }}
                      style={{padding:"0.45rem 0.6rem",border:`1.5px solid ${bc}`,borderRadius:10,background:bg,color:col,fontSize:"0.8rem",cursor:isRevealed?"default":"pointer",textAlign:"left",fontFamily:"inherit",transition:"all 0.15s"}}>
                      {opt}
                    </button>
                  );
                })}
              </div>
            ) : (
              <div style={{ display:"flex", flexDirection:"column", gap:"0.4rem" }}>
                <div style={{ fontSize:"0.68rem", color:C.purple, marginBottom:"0.1rem" }}>
                  ✏️ Nhập câu tiếng Pháp
                </div>
                <div style={{ display:"flex", gap:"0.38rem" }}>
                  <input value={inputVals[i]||""} disabled={isRevealed}
                    onChange={e=>setInputVals(v=>({...v,[i]:e.target.value}))}
                    onKeyDown={e=>{ if(e.key==="Enter"&&!isRevealed) submitInput(i,q); }}
                    placeholder="Je suis…"
                    style={{flex:1,border:`1.5px solid ${isRevealed?(correct?C.green:C.red):C.border}`,borderRadius:10,padding:"0.5rem 0.7rem",fontSize:"0.88rem",fontFamily:"Georgia,serif",background:isRevealed?(correct?"rgba(16,185,129,0.08)":"rgba(239,68,68,0.08)"):C.white,color:isRevealed?(correct?C.green:C.red):C.ink,outline:"none"}}/>
                  {!isRevealed && (
                    <button onClick={()=>submitInput(i,q)}
                      style={{padding:"0.5rem 0.8rem",background:C.purple,color:C.white,border:"none",borderRadius:10,fontSize:"0.8rem",cursor:"pointer",whiteSpace:"nowrap",fontWeight:500}}>
                      OK
                    </button>
                  )}
                </div>
              </div>
            )}

            {isRevealed && (
              <div style={{ marginTop:"0.5rem", fontSize:"0.73rem", lineHeight:1.6, padding:"0.4rem 0.6rem", background:correct?"rgba(16,185,129,0.06)":"rgba(239,68,68,0.06)", borderRadius:8 }}>
                {correct
                  ? <div style={{ color:C.green, fontWeight:600 }}>✓ Chính xác!</div>
                  : <div style={{ color:C.red }}>✗ Đáp án gợi ý: <span style={{ fontFamily:"Georgia,serif", fontWeight:600 }}>{q.answer}</span></div>
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
