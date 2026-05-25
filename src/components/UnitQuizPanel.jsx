import { useState, useEffect } from "react";
import { C } from "../constants.js";
import { callAI } from "../utils/api.js";
import { PARCOURS_UNITS } from "../data/parcoursData.js";
import { EDITO_VOCAB_UNITS } from "../data/editoVocab.js";
import { EDITO_GRAMMAR } from "../data/editoGrammar.js";
import { markStepDone } from "../utils/parcours.js";
import { Confetti } from "./ui/Minou.jsx";
import Spinner from "./ui/Spinner.jsx";

// ── Skill config ──────────────────────────────────────────────
const SKILLS = {
  vocab:          { label:"Vocabulaire", color:"#4A90D9", bg:"#EBF4FF", icon:"V" },
  grammaire:      { label:"Grammaire",   color:"#7B6CF6", bg:"#F0EEFF", icon:"G" },
  comprehension:  { label:"Compréhension", color:"#059669", bg:"#ECFDF5", icon:"C" },
  ecriture:       { label:"Écriture",    color:"#E67E22", bg:"#FEF3E2", icon:"É" },
};

const CACHE_KEY = (uid) => `unit_quiz_${uid}`;

// ── Prompt builder ─────────────────────────────────────────────
function buildPrompt(unit, vocabWords, grammarPoints) {
  const vocabList  = vocabWords.slice(0, 30).map(w => `${w.fr} — ${w.vi}`).join(", ");
  const gramList   = grammarPoints.slice(0, 4).map(p => p.topic).join("; ");

  return `Tu es un professeur de français créant un test complet pour des apprenants A1 vietnamiens.

Unité: "${unit.fr}" (${unit.vi})
Vocabulaire clé: ${vocabList}
Points de grammaire: ${gramList || "grammaire A1 générale"}

Crée exactement 15 questions couvrant les 4 compétences. Réponds UNIQUEMENT en JSON valide sans markdown:
{
  "title": "Quiz · Unité ${unit.num} · ${unit.fr}",
  "passage": "Un court paragraphe de 45-55 mots en français A1 sur le thème de l'unité, utilisant le vocabulaire clé. Ce passage servira aux questions de compréhension.",
  "questions": [
    {
      "skill": "vocab|grammaire|comprehension|ecriture",
      "type": "mc|fill|translate",
      "q": "texte de la question",
      "options": ["A. ...", "B. ...", "C. ...", "D. ..."],
      "answer": "réponse correcte",
      "explain": "explication courte en vietnamien"
    }
  ]
}

Distribution OBLIGATOIRE des 15 questions:
- 5 vocab: mix questions FR→VI et VI→FR en QCM (type "mc", 4 options), 1 question à trou (type "fill", ___ dans la phrase)
- 4 grammaire: phrases à trous (type "fill") testant les points de grammaire de l'unité
- 3 comprehension: questions sur le passage (type "mc", 4 options), numérotées "C1, C2, C3" dans le champ "q"
- 3 ecriture: traduire des phrases vietnamiennes en français (type "translate", pas d'options)

Règles:
- Pour "mc": "options" = tableau de 4 chaînes, "answer" = une des options exactement
- Pour "fill": pas d'"options", "q" contient ___ , "answer" = le mot manquant
- Pour "translate": pas d'"options", "q" = phrase vietnamienne, "answer" = traduction française
- "explain" toujours en vietnamien, court (max 12 mots)
- Niveau A1 strict, vocabulaire simple`;
}

// ── Question renderer ─────────────────────────────────────────
function QuestionCard({ q, idx, passage, onAnswer, answered }) {
  const [selected, setSelected] = useState(null);
  const [input,    setInput]    = useState("");
  const [revealed, setReveal]   = useState(false);
  const sk = SKILLS[q.skill] || SKILLS.vocab;

  const submit = (val) => {
    if (revealed) return;
    const v = (val ?? input).trim();
    if (!v) return;
    setReveal(true);
    const correct = v.toLowerCase() === q.answer.toLowerCase();
    onAnswer(correct);
  };

  const correct = revealed && (
    q.type === "mc"
      ? selected === q.answer
      : input.trim().toLowerCase() === q.answer.toLowerCase()
  );

  return (
    <div style={{ background: C.white, border: `1.5px solid ${revealed ? (correct ? "#059669" : C.accent) : C.border}44`, borderRadius: 16, padding: "1rem", marginBottom: "0.75rem", transition: "border-color 0.2s" }}>

      {/* Skill badge */}
      <div style={{ display:"flex", alignItems:"center", gap:6, marginBottom:"0.5rem" }}>
        <span style={{ background: sk.bg, color: sk.color, fontFamily:"'JetBrains Mono',monospace", fontSize:"0.58rem", fontWeight:700, letterSpacing:"0.08em", borderRadius:6, padding:"2px 7px", border:`1px solid ${sk.color}33` }}>
          {sk.icon} {sk.label}
        </span>
        <span style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:"0.58rem", color:C.gray }}>{idx + 1}/15</span>
      </div>

      {/* Passage hint for comprehension */}
      {q.skill === "comprehension" && passage && (
        <div style={{ background:"#F0FDF4", border:"1px solid #6EE7B7", borderRadius:10, padding:"0.6rem 0.8rem", marginBottom:"0.6rem", fontSize:"0.78rem", color:C.ink, fontStyle:"italic", lineHeight:1.6 }}>
          {passage}
        </div>
      )}

      {/* Question text */}
      <div style={{ fontSize:"0.9rem", color:C.ink, fontWeight:600, lineHeight:1.5, marginBottom:"0.65rem" }}>
        {q.q.replace(/^C\d+[\.\:]\s*/, "")}
      </div>

      {/* MC options */}
      {q.type === "mc" && (
        <div style={{ display:"flex", flexDirection:"column", gap:"0.35rem" }}>
          {q.options.map((opt, i) => {
            const isSelected = selected === opt;
            const isCorrect  = revealed && opt === q.answer;
            const isWrong    = revealed && isSelected && opt !== q.answer;
            return (
              <button key={i} disabled={revealed} onClick={() => { setSelected(opt); submit(opt); }}
                style={{
                  textAlign:"left", padding:"0.5rem 0.8rem", borderRadius:10, cursor: revealed ? "default" : "pointer",
                  fontFamily:"inherit", fontSize:"0.82rem",
                  background: isCorrect ? "#ECFDF5" : isWrong ? "#FEF2F2" : isSelected ? C.cream : C.cream,
                  border: `1.5px solid ${isCorrect ? "#059669" : isWrong ? C.accent : isSelected ? C.blue : C.border}`,
                  color: isCorrect ? "#059669" : isWrong ? C.accent : C.ink,
                  fontWeight: isCorrect || isWrong ? 700 : 400,
                  transition: "all 0.15s",
                }}>
                {opt}
              </button>
            );
          })}
        </div>
      )}

      {/* Fill / translate input */}
      {(q.type === "fill" || q.type === "translate") && (
        <div style={{ display:"flex", gap:"0.5rem", alignItems:"center" }}>
          <input
            value={input} disabled={revealed}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === "Enter" && submit()}
            placeholder={q.type === "fill" ? "Điền vào chỗ trống..." : "Dịch sang tiếng Pháp..."}
            style={{ flex:1, padding:"0.5rem 0.75rem", borderRadius:10, border:`1.5px solid ${revealed ? (correct ? "#059669" : C.accent) : C.border}`, fontSize:"0.85rem", fontFamily:"inherit", outline:"none", background: revealed ? (correct ? "#ECFDF5" : "#FEF2F2") : C.white, color: revealed ? (correct ? "#059669" : C.accent) : C.ink }}
          />
          {!revealed && (
            <button onClick={() => submit()} style={{ padding:"0.5rem 0.9rem", background:C.ink, color:"#fff", border:"none", borderRadius:10, fontSize:"0.78rem", cursor:"pointer", fontWeight:700, fontFamily:"inherit" }}>
              OK
            </button>
          )}
        </div>
      )}

      {/* Feedback */}
      {revealed && (
        <div style={{ marginTop:"0.55rem", padding:"0.4rem 0.7rem", borderRadius:8, background: correct ? "#ECFDF5" : "#FEF2F2", border:`1px solid ${correct ? "#6EE7B7" : "#FCA5A5"}` }}>
          {!correct && (
            <div style={{ fontSize:"0.78rem", color: C.accent, fontWeight:700, marginBottom:2 }}>
              Đáp án: <span style={{ fontStyle:"italic" }}>{q.answer}</span>
            </div>
          )}
          {q.explain && (
            <div style={{ fontSize:"0.72rem", color: correct ? "#059669" : "#B45309" }}>
              {correct ? "✓ " : "💡 "}{q.explain}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// ── Result screen ─────────────────────────────────────────────
function ResultScreen({ score, total, unitId, onRetry, onBack }) {
  const pct = Math.round(score / total * 100);
  const passed = pct >= 70;
  const color = pct >= 80 ? "#059669" : pct >= 60 ? C.gold : C.accent;

  useEffect(() => {
    if (passed) markStepDone(unitId, "quiz");
  }, []);

  return (
    <div style={{ padding:"1.5rem 1rem", textAlign:"center", animation:"fadeUp 0.3s ease" }}>
      <div style={{ fontFamily:"'Playfair Display',Georgia,serif", fontSize:"3rem", fontWeight:700, color, lineHeight:1 }}>
        {score}/{total}
      </div>
      <div style={{ fontSize:"1.1rem", color, fontWeight:700, marginTop:"0.3rem" }}>{pct}%</div>
      <div style={{ fontSize:"0.85rem", color:C.gray, marginTop:"0.5rem", marginBottom:"1.5rem" }}>
        {pct >= 80 ? "Xuất sắc! Unit hoàn thành 🎉" : pct >= 60 ? "Bien joué! Ôn thêm nhé 💪" : "Cần ôn lại — thử lần nữa nhé 📚"}
      </div>

      {/* Section breakdown */}
      {Object.entries(SKILLS).map(([key, sk]) => (
        <div key={key} style={{ display:"flex", alignItems:"center", gap:8, marginBottom:"0.4rem", background:sk.bg, borderRadius:10, padding:"0.4rem 0.75rem", border:`1px solid ${sk.color}22` }}>
          <span style={{ fontSize:"0.68rem", fontWeight:700, color:sk.color, minWidth:18 }}>{sk.icon}</span>
          <span style={{ fontSize:"0.78rem", color:C.ink, flex:1, textAlign:"left" }}>{sk.label}</span>
        </div>
      ))}

      <div style={{ display:"flex", flexDirection:"column", gap:"0.5rem", marginTop:"1.25rem" }}>
        <button onClick={onRetry} style={{ padding:"0.75rem", background:C.ink, color:"#fff", border:"none", borderRadius:12, fontFamily:"inherit", fontSize:"0.88rem", fontWeight:700, cursor:"pointer" }}>
          Làm lại →
        </button>
        <button onClick={onBack} style={{ padding:"0.75rem", background:"transparent", color:C.blue, border:`1.5px solid ${C.blue}44`, borderRadius:12, fontFamily:"inherit", fontSize:"0.82rem", fontWeight:600, cursor:"pointer" }}>
          ← Về Parcours
        </button>
      </div>
    </div>
  );
}

// ── Main component ────────────────────────────────────────────
export default function UnitQuizPanel({ onBackToParcours }) {
  const [unitId] = useState(() => localStorage.getItem("parcours_quiz_unit") || null);
  const [quiz,    setQuiz]    = useState(() => {
    if (!unitId) return null;
    try { return JSON.parse(localStorage.getItem(CACHE_KEY(unitId))) || null; } catch { return null; }
  });
  const [loading,  setLoading]  = useState(false);
  const [err,      setErr]      = useState("");
  const [answers,  setAnswers]  = useState({});
  const [done,     setDone]     = useState(false);
  const [confetti, setConfetti] = useState(false);

  useEffect(() => {
    localStorage.removeItem("parcours_back");
  }, []);

  const unit       = PARCOURS_UNITS.find(u => u.id === unitId);
  const vocabUnit  = unitId ? EDITO_VOCAB_UNITS.find(u => u.id === unitId) : null;
  const grammarId  = unitId ? "g" + unitId.replace("u","") : null;
  const grammarUnit= grammarId ? EDITO_GRAMMAR.find(u => u.id === grammarId) : null;
  const vocabWords = vocabUnit ? vocabUnit.groups.flatMap(g => g.words) : [];
  const gramPoints = grammarUnit ? grammarUnit.points : [];

  const generate = async () => {
    if (!unit) return;
    setLoading(true); setErr(""); setQuiz(null); setAnswers({}); setDone(false); setConfetti(false);
    try {
      const data = await callAI(buildPrompt(unit, vocabWords, gramPoints));
      setQuiz(data);
      localStorage.setItem(CACHE_KEY(unitId), JSON.stringify(data));
    } catch(e) { setErr(e.message); }
    setLoading(false);
  };

  const handleAnswer = (idx, correct) => {
    setAnswers(prev => ({ ...prev, [idx]: correct }));
  };

  const answeredCount = Object.keys(answers).length;
  const total = quiz?.questions?.length || 15;
  const score = Object.values(answers).filter(Boolean).length;
  const allDone = answeredCount >= total;

  useEffect(() => {
    if (allDone && !done) {
      setDone(true);
      if (score / total >= 0.8) setConfetti(true);
    }
  }, [allDone]);

  const reset = () => { setAnswers({}); setDone(false); setConfetti(false); setQuiz(null); localStorage.removeItem(CACHE_KEY(unitId)); };

  if (!unit) return (
    <div style={{ padding:"2rem", textAlign:"center", color:C.gray }}>
      Không tìm thấy unit. Quay lại Parcours và thử lại.
    </div>
  );

  // ── Result ──
  if (done) return (
    <>
      <Confetti active={confetti} onDone={() => setConfetti(false)} />
      <ResultScreen score={score} total={total} unitId={unitId} onRetry={reset} onBack={onBackToParcours} />
    </>
  );

  // ── Start screen ──
  if (!quiz && !loading) return (
    <div style={{ padding:"1.25rem 1rem", animation:"fadeUp 0.3s ease" }}>
      <button onClick={onBackToParcours} style={{ background:"transparent", border:"none", color:C.blue, fontSize:"0.82rem", fontWeight:600, cursor:"pointer", padding:0, display:"flex", alignItems:"center", gap:4, fontFamily:"inherit", marginBottom:"1rem" }}>
        ← Parcours
      </button>

      {/* Unit hero */}
      <div style={{ background:`linear-gradient(135deg, ${C.ink}, #2d4f8a)`, borderRadius:18, padding:"1.25rem 1.35rem", color:"#fff", marginBottom:"1rem" }}>
        <div style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:"0.58rem", letterSpacing:"0.15em", opacity:0.6, marginBottom:4, textTransform:"uppercase" }}>
          Quiz tổng · Unit {unit.num}
        </div>
        <div style={{ fontFamily:"'Playfair Display',Georgia,serif", fontSize:"1.4rem", fontWeight:700, lineHeight:1.1, marginBottom:4 }}>
          {unit.emoji} {unit.fr}
        </div>
        <div style={{ fontSize:"0.78rem", opacity:0.75 }}>{unit.vi} · {unit.grammar}</div>
      </div>

      {/* Skill chips */}
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"0.5rem", marginBottom:"1.25rem" }}>
        {Object.entries(SKILLS).map(([key, sk]) => (
          <div key={key} style={{ background:sk.bg, borderRadius:12, padding:"0.6rem 0.75rem", border:`1px solid ${sk.color}33`, display:"flex", alignItems:"center", gap:8 }}>
            <span style={{ fontSize:"1rem", fontWeight:900, color:sk.color, fontFamily:"'JetBrains Mono',monospace" }}>{sk.icon}</span>
            <div>
              <div style={{ fontSize:"0.72rem", fontWeight:700, color:sk.color }}>{sk.label}</div>
              <div style={{ fontSize:"0.62rem", color:C.gray }}>
                {key==="vocab"?"5 câu":key==="grammaire"?"4 câu":key==="comprehension"?"3 câu":"3 câu"}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div style={{ fontSize:"0.78rem", color:C.gray, textAlign:"center", marginBottom:"1rem" }}>
        15 câu · Tổng hợp vocab + ngữ pháp + đọc hiểu + viết
      </div>

      {err && <div style={{ color:C.accent, fontSize:"0.78rem", marginBottom:"0.75rem", textAlign:"center" }}>{err}</div>}

      <button onClick={generate} style={{ width:"100%", padding:"0.9rem", background:C.accent, color:"#fff", border:"none", borderRadius:14, fontFamily:"inherit", fontSize:"0.95rem", fontWeight:700, cursor:"pointer" }}>
        Bắt đầu Quiz →
      </button>
    </div>
  );

  // ── Loading ──
  if (loading) return (
    <div style={{ padding:"3rem 1rem", display:"flex", flexDirection:"column", alignItems:"center", gap:"0.75rem" }}>
      <Spinner size={28} />
      <div style={{ fontSize:"0.85rem", color:C.gray }}>Đang tạo quiz cho unit {unit.num}…</div>
    </div>
  );

  // ── Quiz questions ──
  return (
    <div style={{ padding:"1rem", animation:"fadeUp 0.3s ease" }}>
      {/* Progress */}
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:"0.75rem" }}>
        <div style={{ fontFamily:"'Playfair Display',Georgia,serif", fontSize:"0.9rem", fontWeight:700, color:C.ink }}>
          {unit.emoji} {unit.fr}
        </div>
        <span style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:"0.7rem", color:C.gray }}>
          {answeredCount}/{total} đã trả lời
        </span>
      </div>
      <div style={{ height:4, background:C.cream, borderRadius:999, marginBottom:"1rem", overflow:"hidden" }}>
        <div style={{ height:"100%", width:`${(answeredCount/total)*100}%`, background:`linear-gradient(90deg,${C.blue},${C.accent})`, borderRadius:999, transition:"width 0.3s" }}/>
      </div>

      {quiz.questions.map((q, i) => (
        <QuestionCard
          key={i} idx={i} q={q}
          passage={quiz.passage}
          answered={answers[i] !== undefined}
          onAnswer={(correct) => handleAnswer(i, correct)}
        />
      ))}

      {allDone && (
        <button onClick={() => setDone(true)} style={{ width:"100%", padding:"0.85rem", background:C.ink, color:"#fff", border:"none", borderRadius:14, fontFamily:"inherit", fontSize:"0.9rem", fontWeight:700, cursor:"pointer", marginTop:"0.5rem" }}>
          Xem kết quả →
        </button>
      )}
    </div>
  );
}
