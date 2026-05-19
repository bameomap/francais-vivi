import { useState } from "react";
import { C } from "../constants.js";
import { callAI } from "../utils/api.js";
import { parseWords } from "../utils/helpers.js";
import SpeakBtn from "./ui/SpeakBtn.jsx";
import Spinner from "./ui/Spinner.jsx";
import Minou, { Confetti } from "./ui/Minou.jsx";

const LEVEL_CONFIG = {
  easy:   { label:"Dễ (A1)",   words: 50,  q: 3 },
  medium: { label:"Vừa (A1+)", words: 80,  q: 4 },
  hard:   { label:"Khó (A2)",  words: 110, q: 5 },
};

function buildPrompt(wordList, level) {
  const cfg = LEVEL_CONFIG[level];
  const sample = wordList.slice(0, 20).map(w => w.fr).join(", ");
  return {
    role: "user",
    content: `Tạo một bài đọc hiểu tiếng Pháp trình độ ${cfg.label} (khoảng ${cfg.words} từ) sử dụng ít nhất 6 trong các từ sau: ${sample}.

Trả lời JSON hợp lệ KHÔNG có markdown, đúng schema:
{
  "title": "tiêu đề ngắn bằng tiếng Pháp",
  "passage": "đoạn văn tiếng Pháp",
  "vocab_used": ["danh sách từ từ input được dùng trong đoạn"],
  "questions": [
    { "q": "câu hỏi tiếng Việt", "options": ["A. ...", "B. ...", "C. ...", "D. ..."], "answer": "A", "explain": "giải thích ngắn" }
  ]
}
Tạo đúng ${cfg.q} câu hỏi. Câu hỏi kiểm tra hiểu nội dung, không hỏi từ vựng.`,
  };
}

// Highlight vocab words in passage
function HighlightedPassage({ passage, vocab }) {
  const words = vocab.map(w => w.toLowerCase());
  // split preserving whitespace and punctuation
  const tokens = passage.split(/(\s+|[,\.!?;:«»"'()\-—])/);
  return (
    <span>
      {tokens.map((tok, i) => {
        const clean = tok.replace(/[^a-zA-ZÀ-ÿ]/g, "").toLowerCase();
        const hit   = words.some(w => w === clean || w === clean + "s" || clean === w + "s");
        return hit
          ? <mark key={i} style={{ background:"#FEF9C3", borderRadius:3, padding:"0 2px", fontWeight:600, color:"#92400E" }}>{tok}</mark>
          : <span key={i}>{tok}</span>;
      })}
    </span>
  );
}

// Answer option button
function OptionBtn({ label, state, onClick }) {
  const colors = {
    idle:    { bg: C.white,         border: C.border,      color: C.ink  },
    correct: { bg: "#ECFDF5",       border: C.green,       color: C.green },
    wrong:   { bg: "#FEF2F2",       border: C.red,         color: C.red  },
    missed:  { bg: "#ECFDF5",       border: C.green,       color: C.green },
  };
  const s = colors[state] || colors.idle;
  return (
    <button onClick={onClick} disabled={state !== "idle"}
      style={{ width:"100%", textAlign:"left", padding:"0.62rem 0.85rem", background:s.bg, border:`1.5px solid ${s.border}`, borderRadius:12, color:s.color, fontSize:"0.82rem", cursor: state==="idle"?"pointer":"default", fontFamily:"inherit", transition:"all 0.15s", marginBottom:"0.35rem", fontWeight: state!=="idle"?600:400 }}>
      {state==="correct"?"✅ ":state==="wrong"?"❌ ":state==="missed"?"✓ ":""}{label}
    </button>
  );
}

export default function LecturePanel({ words: propWords = [] }) {
  const words = propWords.length >= 4 ? propWords : [
    {fr:"famille"},{fr:"maison"},{fr:"école"},{fr:"ami"},{fr:"livre"},{fr:"chat"},{fr:"manger"},{fr:"aller"},{fr:"beau"},{fr:"petit"},
    {fr:"jour"},{fr:"soir"},{fr:"ville"},{fr:"enfant"},{fr:"travail"}
  ];

  const [level,     setLevel]     = useState("easy");
  const [loading,   setLoading]   = useState(false);
  const [lecture,   setLecture]   = useState(null);
  const [err,       setErr]       = useState("");
  const [answers,   setAnswers]   = useState({});   // { qIdx: chosen letter }
  const [revealed,  setRevealed]  = useState({});   // { qIdx: true }
  const [confetti,  setConfetti]  = useState(false);
  const [showText,  setShowText]  = useState(true);

  const generate = async () => {
    setLoading(true); setErr(""); setLecture(null); setAnswers({}); setRevealed({}); setConfetti(false);
    try {
      const data = await callAI(buildPrompt(words, level));
      setLecture(data);
    } catch(e) { setErr(e.message); }
    setLoading(false);
  };

  const answer = (qi, letter) => {
    if (revealed[qi]) return;
    setAnswers(a => ({ ...a, [qi]: letter }));
    setRevealed(r => ({ ...r, [qi]: true }));
  };

  const score = lecture ? lecture.questions.reduce((acc, q, i) => acc + (answers[i] === q.answer ? 1 : 0), 0) : 0;
  const total = lecture?.questions?.length || 0;
  const allAnswered = total > 0 && Object.keys(revealed).length === total;
  const pct   = total > 0 ? Math.round(score / total * 100) : 0;

  // Trigger confetti when all answered with good score
  if (allAnswered && pct >= 80 && !confetti && lecture) {
    setTimeout(() => setConfetti(true), 300);
  }

  // ── Idle ──
  if (!lecture && !loading) return (
    <div style={{ padding:"1rem", animation:"fadeUp 0.3s ease" }}>
      <div style={{ background:C.white, borderRadius:20, padding:"1.5rem 1.2rem", border:`1.5px solid ${C.border}`, textAlign:"center" }}>
        <div style={{ fontSize:"2.5rem", marginBottom:"0.5rem" }}>📰</div>
        <div style={{ fontFamily:"'Playfair Display',Georgia,serif", fontSize:"1.2rem", color:C.ink, fontWeight:700, marginBottom:"0.3rem" }}>Đọc hiểu</div>
        <div style={{ fontSize:"0.8rem", color:C.gray, marginBottom:"1.2rem", lineHeight:1.6 }}>AI tạo đoạn văn từ bộ từ của bạn<br/>rồi hỏi câu hỏi hiểu nội dung</div>

        {/* Level picker */}
        <div style={{ display:"flex", gap:"0.5rem", marginBottom:"1.2rem", justifyContent:"center" }}>
          {Object.entries(LEVEL_CONFIG).map(([k, v]) => (
            <button key={k} onClick={() => setLevel(k)}
              style={{ padding:"0.35rem 0.8rem", borderRadius:20, border:`1.5px solid ${level===k?"#059669":C.border}`, background: level===k?"#ECFDF5":C.white, color: level===k?"#059669":C.gray, fontSize:"0.72rem", cursor:"pointer", fontWeight:600, transition:"all 0.15s" }}>
              {v.label}
            </button>
          ))}
        </div>

        {err && <div style={{ color:C.red, fontSize:"0.78rem", marginBottom:"0.8rem" }}>⚠ {err}</div>}
        <button onClick={generate}
          style={{ padding:"0.75rem 1.8rem", background:"linear-gradient(135deg,#059669,#0D9488)", color:C.white, border:"none", borderRadius:14, fontFamily:"'Playfair Display',Georgia,serif", fontSize:"0.95rem", cursor:"pointer", fontWeight:700, boxShadow:"0 6px 20px #05966944" }}>
          Tạo bài đọc ✦
        </button>
      </div>
    </div>
  );

  // ── Loading ──
  if (loading) return (
    <div style={{ display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", height:260, gap:"1rem" }}>
      <Spinner />
      <div style={{ fontSize:"0.85rem", color:C.gray }}>AI đang viết đoạn văn…</div>
    </div>
  );

  // ── Reading + Quiz ──
  return (
    <div style={{ padding:"1rem", animation:"fadeUp 0.3s ease", display:"flex", flexDirection:"column", gap:"0.75rem" }}>
      <Confetti active={confetti} onDone={() => setConfetti(false)} />

      {/* Toolbar */}
      <div style={{ display:"flex", gap:"0.4rem", flexWrap:"wrap", alignItems:"center" }}>
        <button onClick={generate}
          style={{ padding:"0.3rem 0.75rem", background:"transparent", border:`1.5px solid ${C.border}`, borderRadius:20, color:C.gray, fontSize:"0.7rem", cursor:"pointer" }}>
          🔄 Bài mới
        </button>
        <div style={{ display:"flex", gap:"0.3rem" }}>
          {Object.entries(LEVEL_CONFIG).map(([k, v]) => (
            <button key={k} onClick={() => { setLevel(k); }}
              style={{ padding:"0.25rem 0.6rem", borderRadius:20, border:`1.5px solid ${level===k?"#059669":C.border}`, background:level===k?"#ECFDF5":C.white, color:level===k?"#059669":C.gray, fontSize:"0.65rem", cursor:"pointer", fontWeight:600 }}>
              {v.label}
            </button>
          ))}
        </div>
        <button onClick={() => setShowText(v=>!v)}
          style={{ marginLeft:"auto", padding:"0.28rem 0.65rem", background:showText?C.blueL:"transparent", border:`1.5px solid ${C.blue}44`, borderRadius:20, color:C.blue, fontSize:"0.68rem", cursor:"pointer", fontWeight:600 }}>
          {showText ? "Ẩn bài đọc" : "Xem bài đọc"}
        </button>
      </div>

      {/* Passage card */}
      {showText && (
        <div style={{ background:C.white, borderRadius:16, padding:"1.1rem 1.2rem", border:`1.5px solid ${C.border}`, boxShadow:"0 2px 12px #00000008" }}>
          <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:"0.65rem" }}>
            <div style={{ fontFamily:"'Playfair Display',Georgia,serif", fontSize:"1rem", color:C.ink, fontWeight:700 }}>{lecture.title}</div>
            <SpeakBtn text={lecture.passage} />
          </div>
          <div style={{ fontSize:"0.88rem", color:C.ink, lineHeight:1.85, fontFamily:"Georgia,serif" }}>
            <HighlightedPassage passage={lecture.passage} vocab={lecture.vocab_used || []} />
          </div>
          {lecture.vocab_used?.length > 0 && (
            <div style={{ marginTop:"0.8rem", paddingTop:"0.6rem", borderTop:`1px solid ${C.border}` }}>
              <div style={{ fontSize:"0.63rem", color:C.gray, marginBottom:"0.3rem", textTransform:"uppercase", letterSpacing:1 }}>Từ bạn đang học trong bài</div>
              <div style={{ display:"flex", flexWrap:"wrap", gap:"0.25rem" }}>
                {lecture.vocab_used.map((w, i) => (
                  <span key={i} style={{ background:"#FEF9C3", border:"1px solid #D97706", borderRadius:20, padding:"0.1rem 0.5rem", fontSize:"0.7rem", color:"#92400E", fontWeight:600 }}>{w}</span>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Questions */}
      <div style={{ background:C.white, borderRadius:16, padding:"1rem 1.1rem", border:`1.5px solid ${C.border}` }}>
        <div style={{ fontSize:"0.7rem", textTransform:"uppercase", letterSpacing:1, color:C.gray, fontWeight:600, marginBottom:"0.75rem" }}>Câu hỏi</div>
        {lecture.questions.map((q, qi) => {
          const chosen = answers[qi];
          const done   = !!revealed[qi];
          return (
            <div key={qi} style={{ marginBottom: qi < lecture.questions.length-1 ? "1.1rem" : 0 }}>
              <div style={{ fontSize:"0.84rem", color:C.ink, fontWeight:600, marginBottom:"0.5rem", lineHeight:1.45 }}>
                {qi+1}. {q.q}
              </div>
              {q.options.map((opt, oi) => {
                const letter = opt[0]; // "A", "B", "C", "D"
                let state = "idle";
                if (done) {
                  if (letter === q.answer) state = chosen === letter ? "correct" : "missed";
                  else if (letter === chosen) state = "wrong";
                }
                return <OptionBtn key={oi} label={opt} state={state} onClick={() => answer(qi, letter)} />;
              })}
              {done && q.explain && (
                <div style={{ fontSize:"0.74rem", color:"#2563EB", background:"#EFF6FF", borderRadius:10, padding:"0.45rem 0.7rem", marginTop:"-0.1rem" }}>
                  💡 {q.explain}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Result */}
      {allAnswered && (
        <div style={{ background:C.white, borderRadius:16, padding:"1.2rem", border:`1.5px solid ${pct>=80?"#059669":pct>=60?C.gold:C.red}44`, textAlign:"center", animation:"fadeUp 0.3s ease" }}>
          <Minou
            mood={pct>=80?"excited":pct>=60?"happy":"sad"}
            message={pct>=80?"Parfait! Bạn đọc rất tốt! 🎉":pct>=60?"Bien! Đọc thêm để quen nhé 💪":"Đọc lại bài và thử lần nữa nhé~ 🐱"}
            size="md"
          />
          <div style={{ fontFamily:"'Playfair Display',Georgia,serif", fontSize:"1.8rem", color: pct>=80?"#059669":pct>=60?C.gold:C.red, fontWeight:700, marginTop:"0.8rem" }}>
            {score}/{total}
          </div>
          <div style={{ fontSize:"0.78rem", color:C.gray, marginTop:"0.25rem", marginBottom:"1rem" }}>{pct}% đúng</div>
          <button onClick={generate}
            style={{ padding:"0.6rem 1.4rem", background:"linear-gradient(135deg,#059669,#0D9488)", color:C.white, border:"none", borderRadius:12, fontSize:"0.85rem", cursor:"pointer", fontFamily:"'Playfair Display',Georgia,serif", fontWeight:700 }}>
            🔄 Bài mới
          </button>
        </div>
      )}
    </div>
  );
}
