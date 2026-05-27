import { useState, useRef } from "react";
import { C } from "../constants.js";
import { callAI } from "../utils/api.js";
import { EDITO_A1_VERB_UNITS } from "../data/editoVerbs.js";
import SpeakBtn from "./ui/SpeakBtn.jsx";
import Spinner from "./ui/Spinner.jsx";

const SUBJECTS = ["je", "tu", "il/elle", "nous", "vous", "ils/elles"];

const EXERCISE_TYPES = [
  { id:"table",     icon:"📋", label:"Bảng chia",   desc:"Điền đủ 6 ngôi chia động từ",          color:"#4A90D9" },
  { id:"fill",      icon:"✏️", label:"Điền câu",    desc:"Điền dạng đúng vào chỗ trống",          color:"#10B981" },
  { id:"choice",    icon:"☑️", label:"Trắc nghiệm", desc:"Chọn đáp án đúng trong 4 lựa chọn",    color:"#7B6CF6" },
  { id:"transform", icon:"🔄", label:"Chuyển thì",  desc:"Chuyển câu từ thì này sang thì khác",   color:"#F59E0B" },
  { id:"match",     icon:"🔗", label:"Ghép nghĩa",  desc:"Ghép động từ với nghĩa tiếng Việt",     color:"#EC4899" },
];

// ── Prompts ──────────────────────────────────────────────────
function promptTable(verb, tenseLabel) {
  return `Chia động từ "${verb}" ở thì ${tenseLabel} cho 6 ngôi.
JSON hợp lệ KHÔNG có markdown:
{"verb":"${verb}","tense":"${tenseLabel}","group":"nhóm (1/2/3/irrégulier)","meaning":"nghĩa tiếng Việt ngắn gọn, tối đa 4 từ","conjugations":["forme_je","forme_tu","forme_il","forme_nous","forme_vous","forme_ils"],"tip":"mẹo nhớ ngắn tiếng Việt tối đa 15 từ","example":"câu ví dụ tiếng Pháp ngắn — bản dịch tiếng Việt"}`;
}

function promptFill(verbs, tenseLabel) {
  return `Dùng các động từ sau ở thì ${tenseLabel}, tạo ${verbs.length} câu điền từ (mỗi động từ 1 lần):
Động từ: ${verbs.join(", ")}
Dùng nhiều ngôi khác nhau (je, tu, il, elle, nous, vous, ils). Câu ngắn, thực tế, trình độ A1.
JSON hợp lệ KHÔNG có markdown:
{"questions":[{"fr":"Je ___ au marché.","answer":"vais","verb":"aller","subject":"je","vi":"Tôi đi chợ."}]}`;
}

function promptChoice(verbs, tenseLabel) {
  return `Tạo ${verbs.length} câu trắc nghiệm chia động từ ở thì ${tenseLabel}.
Dùng các động từ (mỗi động từ 1 lần): ${verbs.join(", ")}
Mỗi câu: 4 lựa chọn (1 đúng, 3 sai là các dạng chia sai của cùng động từ đó, dùng nhiều ngôi khác nhau).
JSON hợp lệ KHÔNG có markdown:
{"questions":[{"fr":"Elle ___ une robe.","options":["met","mets","mettons","mettez"],"correct":0,"verb":"mettre","vi":"Cô ấy mặc một chiếc váy."}]}`;
}

function promptTransform(verbs, fromLabel, toLabel) {
  return `Tạo 5 câu yêu cầu học viên A1 chuyển từ thì ${fromLabel} sang thì ${toLabel}.
Dùng các động từ: ${verbs.join(", ")} (có thể dùng lại). Câu ngắn, đơn giản.
JSON hợp lệ KHÔNG có markdown:
{"from":"${fromLabel}","to":"${toLabel}","questions":[{"original":"Je mange une pomme.","original_vi":"Tôi ăn một quả táo.","answer":"J'ai mangé une pomme.","answer_vi":"Tôi đã ăn một quả táo.","verb":"manger"}]}`;
}

// ── Shared result footer ──────────────────────────────────────
function ResultFooter({ score, total, color, onNext }) {
  const pct = score / total;
  return (
    <div style={{ textAlign:"center", marginTop:"0.4rem" }}>
      <div style={{
        fontFamily:"'Playfair Display',Georgia,serif",
        fontSize:"1.6rem", fontWeight:700,
        color: pct >= 0.8 ? "#059669" : pct >= 0.5 ? C.gold : C.red,
      }}>
        {score}/{total}
      </div>
      <button onClick={onNext} style={{
        marginTop:"0.4rem", padding:"0.5rem 1.5rem",
        background:color, color:"#fff", border:"none",
        borderRadius:20, fontSize:"0.82rem", cursor:"pointer", fontWeight:700,
      }}>
        Tiếp theo →
      </button>
    </div>
  );
}

// ── TableQuiz ─────────────────────────────────────────────────
function TableQuiz({ data, unit, onNext }) {
  const [inputs,  setInputs]  = useState(Array(6).fill(""));
  const [checked, setChecked] = useState(false);
  const refs = useRef([]);

  const norm = s => s.toLowerCase().trim().replace(/['''`]/g, "'");
  const results = data.conjugations.map((ans, i) => {
    const t = norm(inputs[i]), a = norm(ans);
    return (t === a || (a.includes(" ") && a.endsWith(t))) ? "ok" : "wrong";
  });
  const score = results.filter(r => r === "ok").length;

  return (
    <div style={{ display:"flex", flexDirection:"column", gap:"0.5rem" }}>
      <div style={{ background:C.blueL, borderRadius:12, padding:"0.65rem 0.9rem", borderLeft:`4px solid ${C.blue}` }}>
        <div style={{ display:"flex", alignItems:"center", gap:"0.5rem" }}>
          <span style={{ fontFamily:"'Playfair Display',Georgia,serif", fontSize:"1.3rem", fontWeight:700, color:C.blue, fontStyle:"italic" }}>{data.verb}</span>
          <SpeakBtn text={data.verb} />
          <span style={{ fontSize:"0.7rem", color:C.gray, marginLeft:"auto" }}>{data.meaning}</span>
        </div>
        <div style={{ fontSize:"0.63rem", color:C.gray, marginTop:"0.2rem" }}>{data.tense} · {data.group}</div>
      </div>

      <div style={{ fontSize:"0.67rem", color:C.gray, textAlign:"center" }}>Điền dạng chia · Enter để chuyển ô</div>

      {SUBJECTS.map((sub, i) => {
        const st = checked ? results[i] : "idle";
        return (
          <div key={i} style={{ display:"grid", gridTemplateColumns:"0.7fr 1fr", gap:"0.4rem", alignItems:"center" }}>
            <div style={{ fontSize:"0.8rem", color:C.gray, fontStyle:"italic", textAlign:"right", paddingRight:"0.35rem" }}>{sub}</div>
            <div>
              <input
                ref={el => refs.current[i] = el}
                value={inputs[i]} disabled={checked}
                onChange={e => setInputs(v => v.map((x, j) => j === i ? e.target.value : x))}
                onKeyDown={e => { if (e.key === "Enter") { if (i < 5) refs.current[i+1]?.focus(); else setChecked(true); } }}
                placeholder="…"
                style={{ width:"100%", padding:"0.45rem 0.6rem", border:`1.5px solid ${checked?(st==="ok"?"#059669":C.red):C.border}`, borderRadius:10, background:checked?(st==="ok"?"#ECFDF5":"#FEF2F2"):C.white, fontSize:"0.88rem", fontFamily:"Georgia,serif", color:C.ink, outline:"none", boxSizing:"border-box" }}
              />
              {checked && st === "wrong" && <div style={{ fontSize:"0.68rem", color:"#059669", fontWeight:700, marginTop:"0.1rem" }}>→ {data.conjugations[i]}</div>}
            </div>
          </div>
        );
      })}

      {!checked ? (
        <button onClick={() => setChecked(true)} style={{ padding:"0.55rem", background:"#1E293B", color:C.white, border:"none", borderRadius:12, fontSize:"0.85rem", cursor:"pointer", fontWeight:700, marginTop:"0.2rem" }}>
          Chấm ✓
        </button>
      ) : (
        <div>
          {data.tip && <div style={{ background:"#FFFBEB", borderRadius:10, padding:"0.45rem 0.75rem", fontSize:"0.72rem", color:"#92400E", margin:"0.4rem 0" }}>💡 {data.tip}</div>}
          {data.example && (() => {
            const s = data.example.indexOf(" — ");
            const fr = s >= 0 ? data.example.slice(0, s) : data.example;
            const vi = s >= 0 ? data.example.slice(s + 3) : null;
            return (
              <div style={{ background:C.white, border:`1px solid ${C.border}`, borderLeft:`3px solid ${C.blue}`, borderRadius:10, padding:"0.55rem 0.8rem", marginBottom:"0.4rem" }}>
                <div style={{ fontFamily:"Georgia,serif", fontSize:"0.85rem", color:"#1E293B", fontStyle:"italic" }}>« {fr} »</div>
                {vi && <div style={{ fontSize:"0.72rem", color:C.gray, marginTop:"0.2rem" }}>{vi}</div>}
              </div>
            );
          })()}
          <ResultFooter score={score} total={6} color={C.blue} onNext={onNext} />
        </div>
      )}
    </div>
  );
}

// ── FillQuiz ──────────────────────────────────────────────────
function FillQuiz({ data, unit, onNext }) {
  const qs = data.questions || [];
  const [inputs,  setInputs]  = useState(Array(qs.length).fill(""));
  const [checked, setChecked] = useState(false);

  const norm = s => s.toLowerCase().trim().replace(/['''`]/g, "'");
  const results = qs.map((q, i) => norm(inputs[i]) === norm(q.answer) ? "ok" : "wrong");
  const score   = results.filter(r => r === "ok").length;

  return (
    <div style={{ display:"flex", flexDirection:"column", gap:"0.65rem" }}>
      <div style={{ fontSize:"0.67rem", color:C.gray, textAlign:"center" }}>Điền dạng chia đúng vào chỗ trống</div>

      {qs.map((q, i) => {
        const st = checked ? results[i] : "idle";
        const parts = q.fr.split("___");
        return (
          <div key={i} style={{ background:C.white, border:`1.5px solid ${checked?(st==="ok"?"#059669":C.red):C.border}`, borderRadius:12, padding:"0.75rem 0.9rem" }}>
            <div style={{ display:"flex", alignItems:"center", flexWrap:"wrap", gap:"0.25rem", marginBottom:"0.3rem" }}>
              {parts[0] && <span style={{ fontFamily:"Georgia,serif", fontSize:"0.88rem", color:"#1E293B", fontStyle:"italic" }}>{parts[0].trim()}</span>}
              <input
                value={inputs[i]} disabled={checked}
                onChange={e => setInputs(v => v.map((x, j) => j === i ? e.target.value : x))}
                placeholder="…"
                style={{ padding:"0.2rem 0.5rem", border:`1.5px solid ${checked?(st==="ok"?"#059669":C.red):C.border}`, borderRadius:8, fontSize:"0.85rem", fontFamily:"Georgia,serif", color:C.ink, background:checked?(st==="ok"?"#ECFDF5":"#FEF2F2"):C.white, width:96, outline:"none" }}
              />
              {parts[1] && <span style={{ fontFamily:"Georgia,serif", fontSize:"0.88rem", color:"#1E293B", fontStyle:"italic" }}>{parts[1].trim()}</span>}
            </div>
            <div style={{ fontSize:"0.7rem", color:C.gray }}>{q.vi}</div>
            {checked && st === "wrong" && <div style={{ fontSize:"0.72rem", color:"#059669", fontWeight:700, marginTop:"0.2rem" }}>→ {q.answer}</div>}
          </div>
        );
      })}

      {!checked ? (
        <button onClick={() => setChecked(true)} style={{ padding:"0.55rem", background:"#1E293B", color:C.white, border:"none", borderRadius:12, fontSize:"0.85rem", cursor:"pointer", fontWeight:700 }}>Chấm ✓</button>
      ) : (
        <ResultFooter score={score} total={qs.length} color={C.blue} onNext={onNext} />
      )}
    </div>
  );
}

// ── ChoiceQuiz ────────────────────────────────────────────────
function ChoiceQuiz({ data, unit, onNext }) {
  const qs = data.questions || [];
  const [answers, setAnswers] = useState(Array(qs.length).fill(null));
  const [checked, setChecked] = useState(false);

  const results = qs.map((q, i) => answers[i] === q.correct ? "ok" : answers[i] !== null ? "wrong" : "idle");
  const score   = results.filter(r => r === "ok").length;

  return (
    <div style={{ display:"flex", flexDirection:"column", gap:"0.65rem" }}>
      <div style={{ fontSize:"0.67rem", color:C.gray, textAlign:"center" }}>Chọn dạng chia đúng</div>

      {qs.map((q, i) => {
        const parts = q.fr.split("___");
        return (
          <div key={i} style={{ background:C.white, border:`1.5px solid ${C.border}`, borderRadius:12, padding:"0.75rem 0.9rem" }}>
            <div style={{ fontFamily:"Georgia,serif", fontSize:"0.88rem", color:"#1E293B", fontStyle:"italic", marginBottom:"0.25rem" }}>
              {parts[0] && parts[0].trim()}
              <span style={{ background:C.blueL, padding:"0 5px", borderRadius:4, color:C.blue, fontWeight:700, margin:"0 2px" }}>___</span>
              {parts[1] && parts[1].trim()}
            </div>
            <div style={{ fontSize:"0.7rem", color:C.gray, marginBottom:"0.45rem" }}>{q.vi}</div>
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"0.28rem" }}>
              {(q.options || []).map((opt, oi) => {
                const isChosen  = answers[i] === oi;
                const isCorrect = oi === q.correct;
                let bg = C.white, border = C.border, color = C.ink;
                if (checked) {
                  if (isCorrect)          { bg = "#ECFDF5"; border = "#059669"; color = "#059669"; }
                  else if (isChosen)      { bg = "#FEF2F2"; border = C.red;     color = C.red;     }
                } else if (isChosen)      { bg = C.blueL;   border = C.blue;     color = C.blue;    }
                return (
                  <button key={oi} onClick={() => { if (!checked) setAnswers(v => v.map((x, j) => j === i ? oi : x)); }}
                    style={{ padding:"0.45rem 0.6rem", background:bg, border:`1.5px solid ${border}`, borderRadius:10, color, fontFamily:"Georgia,serif", fontSize:"0.85rem", cursor:checked?"default":"pointer", fontWeight:isChosen||isCorrect?700:400, transition:"all 0.12s" }}>
                    {opt}
                  </button>
                );
              })}
            </div>
          </div>
        );
      })}

      {!checked ? (
        <button onClick={() => setChecked(true)} disabled={answers.some(a => a === null)}
          style={{ padding:"0.55rem", background:"#1E293B", color:C.white, border:"none", borderRadius:12, fontSize:"0.85rem", cursor:"pointer", fontWeight:700, opacity:answers.some(a=>a===null)?0.45:1 }}>
          Chấm ✓
        </button>
      ) : (
        <ResultFooter score={score} total={qs.length} color={C.blue} onNext={onNext} />
      )}
    </div>
  );
}

// ── TransformQuiz ─────────────────────────────────────────────
function TransformQuiz({ data, unit, onNext }) {
  const qs = data.questions || [];
  const [inputs,  setInputs]  = useState(Array(qs.length).fill(""));
  const [checked, setChecked] = useState(false);

  const norm = s => s.toLowerCase().trim()
    .replace(/['''`]/g, "'")
    .replace(/[.,!?;:]/g, "")
    .replace(/\s+/g, " ").trim();

  const results = qs.map((q, i) => norm(inputs[i]) === norm(q.answer) ? "ok" : "wrong");
  const score   = results.filter(r => r === "ok").length;

  return (
    <div style={{ display:"flex", flexDirection:"column", gap:"0.65rem" }}>
      <div style={{ background:C.blueL, borderRadius:10, padding:"0.45rem 0.85rem", fontSize:"0.75rem", textAlign:"center", color:C.blue, fontWeight:700 }}>
        {data.from} → {data.to}
      </div>

      {qs.map((q, i) => {
        const st = checked ? results[i] : "idle";
        return (
          <div key={i} style={{ background:C.white, border:`1.5px solid ${checked?(st==="ok"?"#059669":C.red):C.border}`, borderRadius:12, padding:"0.75rem 0.9rem" }}>
            <div style={{ fontSize:"0.6rem", color:C.gray, textTransform:"uppercase", letterSpacing:"0.1em", marginBottom:"0.2rem" }}>Câu gốc ({data.from})</div>
            <div style={{ fontFamily:"Georgia,serif", fontSize:"0.88rem", color:"#1E293B", fontStyle:"italic", marginBottom:"0.15rem" }}>« {q.original} »</div>
            <div style={{ fontSize:"0.7rem", color:C.gray, marginBottom:"0.45rem" }}>{q.original_vi}</div>
            <div style={{ fontSize:"0.6rem", color:C.gray, textTransform:"uppercase", letterSpacing:"0.1em", marginBottom:"0.2rem" }}>Chuyển sang {data.to}:</div>
            <input
              value={inputs[i]} disabled={checked}
              onChange={e => setInputs(v => v.map((x, j) => j === i ? e.target.value : x))}
              placeholder="…"
              style={{ width:"100%", padding:"0.45rem 0.6rem", border:`1.5px solid ${checked?(st==="ok"?"#059669":C.red):C.border}`, borderRadius:10, background:checked?(st==="ok"?"#ECFDF5":"#FEF2F2"):C.white, fontSize:"0.85rem", fontFamily:"Georgia,serif", color:C.ink, outline:"none", boxSizing:"border-box" }}
            />
            {checked && st === "wrong" && (
              <div style={{ marginTop:"0.3rem" }}>
                <div style={{ fontSize:"0.72rem", color:"#059669", fontWeight:700 }}>→ {q.answer}</div>
                {q.answer_vi && <div style={{ fontSize:"0.68rem", color:C.gray }}>{q.answer_vi}</div>}
              </div>
            )}
          </div>
        );
      })}

      {!checked ? (
        <button onClick={() => setChecked(true)} style={{ padding:"0.55rem", background:"#1E293B", color:C.white, border:"none", borderRadius:12, fontSize:"0.85rem", cursor:"pointer", fontWeight:700 }}>Chấm ✓</button>
      ) : (
        <ResultFooter score={score} total={qs.length} color={C.blue} onNext={onNext} />
      )}
    </div>
  );
}

// ── MatchQuiz ─────────────────────────────────────────────────
function MatchQuiz({ unit, onNext }) {
  const [verbs] = useState(() => [...unit.verbs].sort(() => Math.random() - 0.5).slice(0, 6));
  const [rightOrder] = useState(() => verbs.map((_, i) => i).sort(() => Math.random() - 0.5));

  const [leftSel,  setLeftSel]  = useState(null);
  const [rightSel, setRightSel] = useState(null);
  const [matched,  setMatched]  = useState({});
  const [flash,    setFlash]    = useState(null); // "ok" | "wrong"

  const done = Object.keys(matched).length === verbs.length;

  const tryMatch = (lIdx, rIdx) => {
    const verbIdx = lIdx;
    const meaningVerbIdx = rightOrder[rIdx];
    if (verbIdx === meaningVerbIdx) {
      setMatched(m => ({ ...m, [verbIdx]: rIdx }));
      setLeftSel(null); setRightSel(null);
    } else {
      setFlash("wrong");
      setTimeout(() => { setLeftSel(null); setRightSel(null); setFlash(null); }, 550);
    }
  };

  const pickLeft = (i) => {
    if (matched[i] !== undefined || flash) return;
    const next = leftSel === i ? null : i;
    setLeftSel(next);
    if (next !== null && rightSel !== null) tryMatch(next, rightSel);
  };

  const pickRight = (mi) => {
    if (Object.values(matched).includes(mi) || flash) return;
    const next = rightSel === mi ? null : mi;
    setRightSel(next);
    if (leftSel !== null && next !== null) tryMatch(leftSel, next);
  };

  const matchedCount = Object.keys(matched).length;

  return (
    <div style={{ display:"flex", flexDirection:"column", gap:"0.5rem" }}>
      <div style={{ fontSize:"0.67rem", color:C.gray, textAlign:"center" }}>
        Chọn động từ → chọn nghĩa tương ứng &nbsp;·&nbsp; {matchedCount}/{verbs.length} cặp đúng
      </div>

      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"0.35rem" }}>
        {/* Left: verbs */}
        <div style={{ display:"flex", flexDirection:"column", gap:"0.28rem" }}>
          {verbs.map((v, i) => {
            const isMatched  = matched[i] !== undefined;
            const isSelected = leftSel === i;
            const isWrong    = flash === "wrong" && leftSel === i;
            return (
              <button key={i} onClick={() => pickLeft(i)} disabled={isMatched}
                style={{ padding:"0.5rem 0.6rem", borderRadius:10, border:`1.5px solid ${isMatched?"#059669":isWrong?C.red:isSelected?C.blue:C.border}`, background:isMatched?"#ECFDF5":isWrong?"#FEF2F2":isSelected?C.blueL:C.white, color:isMatched?"#059669":isWrong?C.red:isSelected?C.blue:C.ink, fontFamily:"Georgia,serif", fontStyle:"italic", fontSize:"0.82rem", cursor:isMatched?"default":"pointer", fontWeight:isSelected?700:400, transition:"all 0.15s", textAlign:"left" }}>
                {isMatched ? "✓ " : ""}{v.infinitive}
              </button>
            );
          })}
        </div>

        {/* Right: meanings (shuffled) */}
        <div style={{ display:"flex", flexDirection:"column", gap:"0.28rem" }}>
          {rightOrder.map((verbIdx, mi) => {
            const isMatched  = Object.values(matched).includes(mi);
            const isSelected = rightSel === mi;
            const isWrong    = flash === "wrong" && rightSel === mi;
            return (
              <button key={mi} onClick={() => pickRight(mi)} disabled={isMatched}
                style={{ padding:"0.5rem 0.6rem", borderRadius:10, border:`1.5px solid ${isMatched?"#059669":isWrong?C.red:isSelected?C.blue:C.border}`, background:isMatched?"#ECFDF5":isWrong?"#FEF2F2":isSelected?C.blueL:C.white, color:isMatched?"#059669":isWrong?C.red:isSelected?C.blue:C.ink, fontSize:"0.78rem", cursor:isMatched?"default":"pointer", fontWeight:isSelected?700:400, transition:"all 0.15s", textAlign:"left" }}>
                {isMatched ? "✓ " : ""}{verbs[verbIdx].meaning}
              </button>
            );
          })}
        </div>
      </div>

      {done && (
        <div style={{ textAlign:"center", marginTop:"0.3rem" }}>
          <div style={{ fontFamily:"'Playfair Display',Georgia,serif", fontSize:"1.3rem", fontWeight:700, color:"#059669" }}>🎉 Hoàn thành!</div>
          <button onClick={onNext} style={{ marginTop:"0.4rem", padding:"0.5rem 1.5rem", background:C.accent, color:"#fff", border:"none", borderRadius:20, fontSize:"0.82rem", cursor:"pointer", fontWeight:700 }}>Tiếp theo →</button>
        </div>
      )}
    </div>
  );
}

// ── Unit exercise view ────────────────────────────────────────
function UnitExerciseView({ unit, onBack }) {
  const [exType,   setExType]   = useState("table");
  const [verbIdx,  setVerbIdx]  = useState(0);
  const [tenseIdx, setTenseIdx] = useState(0);
  const [loading,  setLoading]  = useState(false);
  const [quizData, setQuizData] = useState(null);
  const [err,      setErr]      = useState("");
  const [quizKey,  setQuizKey]  = useState(0);

  const hasMultiTense = unit.tenses.length >= 2;

  const pickVerbs = (n) => [...unit.verbs].sort(() => Math.random() - 0.5).slice(0, n).map(v => v.infinitive);

  const doGenerate = async (type, vIdx, tIdx) => {
    if (type === "match") {
      setQuizData({ type:"match" });
      setQuizKey(k => k + 1);
      return;
    }
    setLoading(true); setErr(""); setQuizData(null);
    try {
      let prompt;
      const tense = unit.tenses[tIdx] || unit.tenses[0];
      if (type === "table")     prompt = promptTable(unit.verbs[vIdx].infinitive, tense.label);
      else if (type === "fill") prompt = promptFill(pickVerbs(6), tense.label);
      else if (type === "choice") prompt = promptChoice(pickVerbs(6), tense.label);
      else if (type === "transform") prompt = promptTransform(pickVerbs(5), unit.tenses[0].label, unit.tenses[1].label);
      const data = await callAI(prompt);
      setQuizData({ type, ...data });
      setQuizKey(k => k + 1);
    } catch(e) { setErr(e.message); }
    setLoading(false);
  };

  const generate = () => doGenerate(exType, verbIdx, tenseIdx);

  const handleNext = () => {
    const nv = Math.floor(Math.random() * unit.verbs.length);
    const nt = Math.floor(Math.random() * unit.tenses.length);
    setVerbIdx(nv); setTenseIdx(nt);
    doGenerate(exType, nv, nt);
  };

  const visibleTypes = EXERCISE_TYPES.filter(t => t.id !== "transform" || hasMultiTense);
  const activeType   = EXERCISE_TYPES.find(t => t.id === exType);

  return (
    <div style={{ animation:"fadeUp 0.3s ease", paddingBottom:"2rem" }}>

      {/* ── Gradient header ────────────────────────────────── */}
      <div style={{
        background: "linear-gradient(135deg, #1B3A6B 0%, #2d4f8a 100%)",
        padding: "0.85rem 1rem 1rem",
        position: "sticky", top: 0, zIndex: 10,
      }}>
        <button onClick={onBack} style={{
          background:"rgba(255,255,255,0.2)", border:"none",
          color:"#fff", fontSize:"0.72rem", fontWeight:600,
          cursor:"pointer", padding:"0.2rem 0.65rem",
          borderRadius:20, marginBottom:"0.6rem",
          fontFamily:"inherit", display:"inline-flex", alignItems:"center", gap:4,
        }}>← Quay lại</button>

        <div style={{ display:"flex", alignItems:"center", gap:"0.75rem" }}>
          <div style={{
            background:"rgba(255,255,255,0.22)",
            border:"2px solid rgba(255,255,255,0.4)",
            color:"#fff", borderRadius:12,
            minWidth:42, height:42,
            display:"flex", alignItems:"center", justifyContent:"center",
            fontSize:"1.1rem", fontWeight:800,
            fontFamily:"'Playfair Display',Georgia,serif", flexShrink:0,
          }}>{unit.unitNum}</div>

          <div style={{ flex:1 }}>
            <div style={{ fontWeight:800, color:"#fff", fontSize:"1rem", fontFamily:"'Playfair Display',Georgia,serif", lineHeight:1.1 }}>
              {unit.title}
            </div>
            <div style={{ fontSize:"0.68rem", color:"rgba(255,255,255,0.78)", marginTop:3 }}>
              {unit.verbs.length} động từ · {unit.tenses.map(t => t.label).join(" · ")}
            </div>
          </div>

          {/* shuffle button */}
          <button
            onClick={() => { setVerbIdx(Math.floor(Math.random()*unit.verbs.length)); setTenseIdx(Math.floor(Math.random()*unit.tenses.length)); setQuizData(null); }}
            title="Ngẫu nhiên"
            style={{
              background:"rgba(255,255,255,0.2)", border:"none",
              borderRadius:10, padding:"0.45rem 0.55rem",
              fontSize:"1rem", cursor:"pointer", flexShrink:0,
            }}>🔀</button>
        </div>
      </div>

      <div style={{ padding:"0.9rem 1rem" }}>

        {/* ── Exercise type tabs ──────────────────────────── */}
        <div style={{ marginBottom:"1rem" }}>
          <div style={{ fontSize:"0.6rem", color:C.gray, textTransform:"uppercase", letterSpacing:"0.12em", fontWeight:700, marginBottom:"0.55rem" }}>
            Chọn dạng bài
          </div>
          <div style={{ display:"flex", gap:"0.4rem", overflowX:"auto", paddingBottom:"0.1rem" }}>
            {visibleTypes.map(t => {
              const active = exType === t.id;
              return (
                <button key={t.id}
                  onClick={() => { setExType(t.id); setQuizData(null); }}
                  style={{
                    display:"flex", flexDirection:"column", alignItems:"center",
                    gap:"0.2rem", padding:"0.6rem 0.75rem",
                    minWidth:72, flexShrink:0,
                    background: active ? C.blue : C.white,
                    border: `2px solid ${active ? C.blue : C.border}`,
                    borderRadius:14, cursor:"pointer",
                    transition:"all 0.15s", fontFamily:"inherit",
                    boxShadow: active ? `0 4px 12px ${C.blue}30` : "none",
                    transform: active ? "translateY(-1px)" : "none",
                  }}>
                  <span style={{ fontSize:"1.3rem", lineHeight:1 }}>{t.icon}</span>
                  <span style={{ fontSize:"0.62rem", fontWeight:700, color:active?"#fff":C.gray, lineHeight:1.2, textAlign:"center", whiteSpace:"nowrap" }}>
                    {t.label}
                  </span>
                </button>
              );
            })}
          </div>
          {/* desc pill */}
          <div style={{
            display:"inline-flex", alignItems:"center", gap:6,
            marginTop:"0.5rem",
            background:C.blueL,
            border:`1px solid ${C.blue}40`,
            borderRadius:20, padding:"0.2rem 0.65rem",
          }}>
            <span style={{ fontSize:"0.85rem" }}>{activeType.icon}</span>
            <span style={{ fontSize:"0.68rem", color:C.blue, fontWeight:600 }}>{activeType.desc}</span>
          </div>
        </div>

        {/* ── Verb picker (table mode) — card grid ────────── */}
        {exType === "table" && (
          <div style={{ marginBottom:"0.9rem" }}>
            <div style={{ fontSize:"0.6rem", color:C.gray, textTransform:"uppercase", letterSpacing:"0.12em", fontWeight:700, marginBottom:"0.5rem" }}>
              Chọn động từ
            </div>
            <div style={{ display:"grid", gridTemplateColumns:"repeat(3, 1fr)", gap:"0.35rem" }}>
              {unit.verbs.map((v, i) => {
                const sel = verbIdx === i;
                return (
                  <button key={i} onClick={() => setVerbIdx(i)}
                    style={{
                      padding:"0.45rem 0.4rem",
                      background: sel ? C.blue : C.white,
                      border: `1.5px solid ${sel ? C.blue : C.border}`,
                      borderRadius:10, cursor:"pointer",
                      textAlign:"left", fontFamily:"inherit",
                      transition:"all 0.12s",
                      boxShadow: sel ? `0 3px 8px ${C.blue}30` : "none",
                    }}>
                    <div style={{ fontFamily:"Georgia,serif", fontStyle:"italic", fontWeight:700, fontSize:"0.8rem", color:sel?"#fff":C.ink, lineHeight:1 }}>
                      {v.infinitive}
                    </div>
                    <div style={{ fontSize:"0.6rem", color:sel?"rgba(255,255,255,0.8)":C.gray, marginTop:2 }}>
                      {v.meaning}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* ── Verb pool preview (fill / choice) ───────────── */}
        {(exType === "fill" || exType === "choice") && (
          <div style={{ marginBottom:"0.9rem" }}>
            <div style={{ fontSize:"0.6rem", color:C.gray, textTransform:"uppercase", letterSpacing:"0.12em", fontWeight:700, marginBottom:"0.45rem" }}>
              Ngân hàng động từ <span style={{ textTransform:"none", fontWeight:400 }}>(AI chọn ngẫu nhiên 6)</span>
            </div>
            <div style={{ display:"flex", flexWrap:"wrap", gap:"0.3rem" }}>
              {unit.verbs.map((v, i) => (
                <span key={i} style={{
                  padding:"0.2rem 0.6rem",
                  background:C.blueL, border:`1.5px solid ${C.blue}33`,
                  borderRadius:20, fontSize:"0.71rem",
                  color:C.blue,
                  fontFamily:"Georgia,serif", fontStyle:"italic",
                  fontWeight:600,
                }}>
                  {v.infinitive}
                  <span style={{ fontFamily:"inherit", fontStyle:"normal", fontSize:"0.58rem", color:`${C.blue}88`, marginLeft:4 }}>
                    {v.meaning}
                  </span>
                </span>
              ))}
            </div>
          </div>
        )}

        {/* ── Tense picker ────────────────────────────────── */}
        {exType !== "match" && exType !== "transform" && (
          <div style={{ marginBottom:"0.9rem" }}>
            <div style={{ fontSize:"0.6rem", color:C.gray, textTransform:"uppercase", letterSpacing:"0.12em", fontWeight:700, marginBottom:"0.45rem" }}>
              Chọn thì
            </div>
            <div style={{ display:"flex", flexWrap:"wrap", gap:"0.35rem" }}>
              {unit.tenses.map((t, i) => {
                const sel = tenseIdx === i;
                return (
                  <button key={i} onClick={() => setTenseIdx(i)}
                    style={{
                      padding:"0.4rem 0.85rem",
                      background: sel ? C.blue : C.white,
                      border: `2px solid ${sel ? C.blue : C.border}`,
                      borderRadius:20, cursor:"pointer",
                      fontFamily:"inherit", fontWeight: sel ? 700 : 500,
                      fontSize:"0.78rem",
                      color: sel ? "#fff" : C.ink,
                      boxShadow: sel ? `0 3px 10px ${C.blue}30` : "none",
                      transition:"all 0.15s",
                    }}>
                    {t.label}
                    {t.note && (
                      <span style={{ fontSize:"0.6rem", opacity:0.75, marginLeft:5 }}>
                        {t.note.length > 24 ? t.note.slice(0,24)+"…" : t.note}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* ── Transform banner ────────────────────────────── */}
        {exType === "transform" && (
          <div style={{
            background: C.blueL,
            border:`1.5px solid ${C.blue}30`,
            borderRadius:14, padding:"0.85rem 1rem",
            marginBottom:"0.9rem",
            display:"flex", alignItems:"center", justifyContent:"center", gap:"0.75rem",
          }}>
            <div style={{ textAlign:"center" }}>
              <div style={{ fontSize:"0.6rem", color:C.gray, textTransform:"uppercase", letterSpacing:"0.1em", marginBottom:3 }}>Từ</div>
              <div style={{ fontSize:"0.95rem", fontWeight:800, color:C.blue }}>{unit.tenses[0].label}</div>
            </div>
            <div style={{ fontSize:"1.5rem", color:`${C.blue}60` }}>→</div>
            <div style={{ textAlign:"center" }}>
              <div style={{ fontSize:"0.6rem", color:C.gray, textTransform:"uppercase", letterSpacing:"0.1em", marginBottom:3 }}>Sang</div>
              <div style={{ fontSize:"0.95rem", fontWeight:800, color:C.blue }}>{unit.tenses[1].label}</div>
            </div>
            <div style={{ borderLeft:`1px solid ${C.blue}30`, paddingLeft:"0.75rem", fontSize:"0.68rem", color:C.gray, lineHeight:1.5 }}>
              AI tạo 5 câu<br/>chuyển thì
            </div>
          </div>
        )}

        {/* ── Match banner ─────────────────────────────────── */}
        {exType === "match" && (
          <div style={{
            background: C.blueL,
            border:`1.5px solid ${C.blue}30`,
            borderRadius:14, padding:"0.85rem 1rem",
            marginBottom:"0.9rem",
            display:"flex", alignItems:"center", gap:"0.75rem",
          }}>
            <span style={{ fontSize:"1.6rem" }}>🔗</span>
            <div>
              <div style={{ fontWeight:700, fontSize:"0.82rem", color:C.blue }}>Ghép nghĩa nhanh</div>
              <div style={{ fontSize:"0.68rem", color:C.gray, marginTop:2 }}>
                Ghép 6 động từ với nghĩa tiếng Việt · Không cần internet
              </div>
            </div>
          </div>
        )}

        {/* ── CTA button ──────────────────────────────────── */}
        {!quizData && !loading && (
          <button onClick={generate} disabled={loading}
            style={{
              width:"100%", padding:"0.85rem",
              background:`linear-gradient(135deg, ${C.accent} 0%, #c0392b 100%)`,
              color:"#fff", border:"none", borderRadius:16,
              fontWeight:800, fontSize:"1rem", cursor:"pointer",
              boxShadow:`0 6px 20px ${C.accent}40`,
              transition:"all 0.15s",
              fontFamily:"inherit",
              display:"flex", alignItems:"center", justifyContent:"center", gap:"0.5rem",
              letterSpacing:"0.01em",
            }}>
            <span style={{ fontSize:"1.1rem" }}>{activeType.icon}</span>
            Tạo bài tập
            <span style={{ fontSize:"0.75rem", opacity:0.85, fontWeight:500 }}>→</span>
          </button>
        )}

        {/* ── Loading ─────────────────────────────────────── */}
        {loading && (
          <div style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:"0.75rem", padding:"2.5rem 0" }}>
            <Spinner />
            <div style={{ fontSize:"0.82rem", color:C.gray }}>AI đang tạo bài tập…</div>
            <div style={{ fontSize:"0.68rem", color:C.gray }}>Chờ tí nhé 🤓</div>
          </div>
        )}

        {/* ── Error ───────────────────────────────────────── */}
        {err && (
          <div style={{ color:"#DC2626", fontSize:"0.78rem", padding:"0.75rem", background:"#FEF2F2", borderRadius:10, marginTop:"0.5rem" }}>
            ⚠ {err}
          </div>
        )}

        {/* ── Quiz area ───────────────────────────────────── */}
        {quizData && !loading && (() => {
          if (quizData.type === "table")     return <TableQuiz     key={quizKey} data={quizData} unit={unit} onNext={handleNext} />;
          if (quizData.type === "fill")      return <FillQuiz      key={quizKey} data={quizData} unit={unit} onNext={handleNext} />;
          if (quizData.type === "choice")    return <ChoiceQuiz    key={quizKey} data={quizData} unit={unit} onNext={handleNext} />;
          if (quizData.type === "transform") return <TransformQuiz key={quizKey} data={quizData} unit={unit} onNext={handleNext} />;
          if (quizData.type === "match")     return <MatchQuiz     key={quizKey}                 unit={unit} onNext={handleNext} />;
          return null;
        })()}

      </div>
    </div>
  );
}

// ── Unit list (main view) ─────────────────────────────────────
export default function EditoVerbsPanel() {
  const [activeUnit, setActiveUnit] = useState(() => {
    const idx = localStorage.getItem("parcours_unit_idx");
    if (idx !== null) {
      localStorage.removeItem("parcours_unit_idx");
      return EDITO_A1_VERB_UNITS[Number(idx)]?.unitId ?? null;
    }
    return null;
  });

  if (activeUnit) {
    const unit = EDITO_A1_VERB_UNITS.find(u => u.unitId === activeUnit);
    return <UnitExerciseView unit={unit} onBack={() => setActiveUnit(null)} />;
  }

  return (
    <div style={{ animation:"fadeUp 0.3s ease" }}>
      {/* hero banner */}
      <div style={{
        background:"linear-gradient(135deg, #1B3A6B 0%, #2d4f8a 100%)",
        padding:"1rem 1rem 0.85rem",
      }}>
        <div style={{ fontFamily:"'Playfair Display',Georgia,serif", fontSize:"1.15rem", color:"#fff", fontWeight:800, lineHeight:1.1 }}>
          🖊️ Động từ Édito A1
        </div>
        <div style={{ fontSize:"0.7rem", color:"rgba(255,255,255,0.65)", marginTop:4, lineHeight:1.5 }}>
          11 bài · 15 động từ mỗi bài · 5 dạng bài tập có AI
        </div>
        {/* exercise type icons row */}
        <div style={{ display:"flex", gap:"0.4rem", marginTop:"0.7rem", flexWrap:"wrap" }}>
          {EXERCISE_TYPES.map(t => (
            <span key={t.id} style={{
              background:"rgba(255,255,255,0.12)",
              border:"1px solid rgba(255,255,255,0.2)",
              borderRadius:20, padding:"0.15rem 0.5rem",
              fontSize:"0.63rem", color:"rgba(255,255,255,0.85)",
              display:"flex", alignItems:"center", gap:4,
            }}>
              {t.icon} {t.label}
            </span>
          ))}
        </div>
      </div>

      <div style={{ padding:"0.85rem 1rem" }}>
        <div style={{ display:"flex", flexDirection:"column", gap:"0.55rem" }}>
          {EDITO_A1_VERB_UNITS.map((unit, i) => (
            <button
              key={unit.unitId}
              onClick={() => setActiveUnit(unit.unitId)}
              style={{
                background:C.white,
                border:`1.5px solid ${unit.color}33`,
                borderLeft:`4px solid ${unit.color}`,
                borderRadius:14, overflow:"hidden",
                animation:`fadeUp 0.2s ease ${i*0.03}s both`,
                boxShadow:`0 2px 10px ${unit.color}12`,
                cursor:"pointer", textAlign:"left", fontFamily:"inherit",
                padding:0, transition:"box-shadow 0.15s, transform 0.1s",
              }}
              onPointerDown={e => e.currentTarget.style.transform="scale(0.99)"}
              onPointerUp={e => e.currentTarget.style.transform="scale(1)"}
              onPointerLeave={e => e.currentTarget.style.transform="scale(1)"}
            >
              <div style={{ display:"flex", alignItems:"center", gap:"0.7rem", padding:"0.65rem 0.85rem 0.5rem" }}>
                {/* unit badge */}
                <div style={{
                  background:`linear-gradient(135deg, ${unit.color}, ${unit.color}CC)`,
                  color:"#fff", borderRadius:10,
                  minWidth:38, height:38,
                  display:"flex", alignItems:"center", justifyContent:"center",
                  fontSize:"0.85rem", fontWeight:800, flexShrink:0,
                  fontFamily:"'Playfair Display',Georgia,serif",
                  boxShadow:`0 3px 8px ${unit.color}35`,
                }}>
                  {unit.unitNum}
                </div>
                <div style={{ flex:1, minWidth:0 }}>
                  <div style={{ fontWeight:700, color:C.ink, fontSize:"0.88rem", lineHeight:1.2 }}>
                    {unit.title}
                  </div>
                  <div style={{ display:"flex", gap:"0.3rem", marginTop:"0.25rem", flexWrap:"wrap" }}>
                    {unit.tenses.map(t => (
                      <span key={t.id} style={{
                        padding:"0.08rem 0.45rem",
                        background:`${unit.color}18`,
                        border:`1px solid ${unit.color}35`,
                        borderRadius:20, fontSize:"0.6rem",
                        color:unit.color, fontWeight:600,
                      }}>{t.label}</span>
                    ))}
                    <span style={{ fontSize:"0.6rem", color:C.gray, alignSelf:"center" }}>
                      · {unit.verbs.length} động từ
                    </span>
                  </div>
                </div>
                <span style={{ color:unit.color, fontSize:"1rem", flexShrink:0 }}>›</span>
              </div>

              {/* verb chips */}
              <div style={{ display:"flex", flexWrap:"wrap", gap:"0.22rem", padding:"0 0.85rem 0.6rem" }}>
                {unit.verbs.slice(0, 10).map((v, j) => (
                  <span key={j} style={{
                    padding:"0.08rem 0.45rem",
                    background:C.cream, border:`1px solid ${C.border}`,
                    borderRadius:20, fontSize:"0.66rem",
                    color:C.gray,
                    fontFamily:"Georgia,serif", fontStyle:"italic",
                  }}>
                    {v.infinitive}
                  </span>
                ))}
                {unit.verbs.length > 10 && (
                  <span style={{ fontSize:"0.62rem", color:C.gray, alignSelf:"center" }}>
                    +{unit.verbs.length - 10}
                  </span>
                )}
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
