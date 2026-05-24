import { useState } from "react";
import { C } from "../constants.js";
import editoA1ReadingComprehension from "../data/editoA1ReadingComprehension.js";
import SpeakBtn from "./ui/SpeakBtn.jsx";
import { Confetti } from "./ui/Minou.jsx";

const UNITS_LIST = (() => {
  const seen = new Set();
  const units = [];
  for (const a of editoA1ReadingComprehension) {
    if (!seen.has(a.unit)) {
      seen.add(a.unit);
      units.push({ num: a.unit, title: a.unitTitle });
    }
  }
  return units.sort((a, b) => a.num - b.num);
})();

const SOURCE_LABEL = { livre: "Livre", cahier: "Cahier" };

const SECTION_BADGE = {
  "compréhension écrite":              { label: "Comp. écrite",  color: "#4A90D9" },
  "production écrite avec support":    { label: "Prod. écrite",  color: "#7B6CF6" },
  "DELF compréhension écrite":         { label: "DELF",          color: "#E8574A" },
};

// ── True/False ───────────────────────────────────────────────
function TrueFalseQ({ q, ans, onAnswer }) {
  const done = ans !== undefined;
  return (
    <div style={{ marginBottom: "1rem" }}>
      <div style={{ fontSize: "0.84rem", color: C.ink, fontWeight: 600, marginBottom: "0.5rem", lineHeight: 1.45 }}>
        {q.prompt}
      </div>
      <div style={{ display: "flex", gap: "0.5rem" }}>
        {[true, false].map(val => {
          let state = "idle";
          if (done) {
            if (val === ans) state = ans === q.answer ? "correct" : "wrong";
            else if (val === q.answer) state = "missed";
          }
          const S = {
            idle:    { bg: C.white,    border: C.border, color: C.ink   },
            correct: { bg: "#ECFDF5",  border: C.green,  color: C.green },
            wrong:   { bg: "#FEF2F2",  border: C.red,    color: C.red   },
            missed:  { bg: "#ECFDF5",  border: C.green,  color: C.green },
          }[state];
          return (
            <button key={String(val)} onClick={() => !done && onAnswer(q.id, val)}
              style={{ padding: "0.45rem 1.1rem", background: S.bg, border: `1.5px solid ${S.border}`, color: S.color, borderRadius: 10, cursor: done ? "default" : "pointer", fontSize: "0.82rem", fontWeight: state !== "idle" ? 700 : 400, fontFamily: "inherit", transition: "all 0.15s" }}>
              {state === "correct" ? "✅ " : state === "wrong" ? "❌ " : state === "missed" ? "✓ " : ""}
              {val ? "Vrai" : "Faux"}
            </button>
          );
        })}
      </div>
    </div>
  );
}

// ── Multiple choice ──────────────────────────────────────────
function MultipleChoiceQ({ q, ans, onAnswer }) {
  const done = ans !== undefined;
  return (
    <div style={{ marginBottom: "1rem" }}>
      <div style={{ fontSize: "0.84rem", color: C.ink, fontWeight: 600, marginBottom: "0.5rem", lineHeight: 1.45 }}>
        {q.prompt}
      </div>
      {q.options.map((opt, i) => {
        let state = "idle";
        if (done) {
          if (opt === ans) state = ans === q.answer ? "correct" : "wrong";
          else if (opt === q.answer) state = "missed";
        }
        const S = {
          idle:    { bg: C.white,   border: C.border, color: C.ink   },
          correct: { bg: "#ECFDF5", border: C.green,  color: C.green },
          wrong:   { bg: "#FEF2F2", border: C.red,    color: C.red   },
          missed:  { bg: "#ECFDF5", border: C.green,  color: C.green },
        }[state];
        return (
          <button key={i} onClick={() => !done && onAnswer(q.id, opt)}
            style={{ width: "100%", textAlign: "left", padding: "0.55rem 0.85rem", background: S.bg, border: `1.5px solid ${S.border}`, borderRadius: 10, color: S.color, fontSize: "0.82rem", cursor: done ? "default" : "pointer", fontFamily: "inherit", marginBottom: "0.3rem", fontWeight: state !== "idle" ? 600 : 400, transition: "all 0.15s" }}>
            {state === "correct" ? "✅ " : state === "wrong" ? "❌ " : state === "missed" ? "✓ " : ""}{opt}
          </button>
        );
      })}
    </div>
  );
}

// ── Multi-select ─────────────────────────────────────────────
function MultiSelectQ({ q, ans, onAnswer }) {
  const [checked, setChecked] = useState([]);
  const done = ans !== undefined;
  const correctSet = new Set(Array.isArray(q.answer) ? q.answer : []);

  const toggle = (opt) => {
    if (done) return;
    setChecked(prev => prev.includes(opt) ? prev.filter(x => x !== opt) : [...prev, opt]);
  };

  return (
    <div style={{ marginBottom: "1rem" }}>
      <div style={{ fontSize: "0.84rem", color: C.ink, fontWeight: 600, marginBottom: "0.5rem", lineHeight: 1.45 }}>
        {q.prompt}
      </div>
      {q.options.map((opt, i) => {
        let state = "idle";
        if (done) {
          const inCorrect = correctSet.has(opt);
          const inUser    = ans.includes(opt);
          if (inCorrect && inUser)   state = "correct";
          else if (!inCorrect && inUser) state = "wrong";
          else if (inCorrect && !inUser) state = "missed";
        }
        const isChecked = done ? (state === "correct" || state === "wrong") : checked.includes(opt);
        const borderColor = done
          ? (state === "correct" || state === "missed" ? C.green : state === "wrong" ? C.red : C.border)
          : (isChecked ? C.blue : C.border);
        const bgColor = done
          ? (state === "correct" || state === "missed" ? "#ECFDF5" : state === "wrong" ? "#FEF2F2" : C.white)
          : (isChecked ? C.blueL : C.white);
        const textColor = done
          ? (state === "correct" || state === "missed" ? C.green : state === "wrong" ? C.red : C.ink)
          : (isChecked ? C.blue : C.ink);

        return (
          <div key={i} onClick={() => toggle(opt)}
            style={{ display: "flex", alignItems: "center", gap: "0.6rem", padding: "0.45rem 0.85rem", background: bgColor, border: `1.5px solid ${borderColor}`, borderRadius: 10, marginBottom: "0.3rem", cursor: done ? "default" : "pointer", transition: "all 0.15s" }}>
            <div style={{ width: 16, height: 16, border: `2px solid ${borderColor}`, borderRadius: 4, background: isChecked ? borderColor : "transparent", flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
              {isChecked && <span style={{ color: "#fff", fontSize: "0.6rem", fontWeight: 700, lineHeight: 1 }}>✓</span>}
            </div>
            <span style={{ fontSize: "0.82rem", color: textColor, fontWeight: isChecked && !done ? 600 : 400 }}>
              {done && (state === "correct" ? "✅ " : state === "wrong" ? "❌ " : state === "missed" ? "○ " : "")}{opt}
            </span>
          </div>
        );
      })}
      {!done && (
        <button onClick={() => checked.length > 0 && onAnswer(q.id, checked)}
          disabled={checked.length === 0}
          style={{ marginTop: "0.3rem", padding: "0.42rem 1rem", background: checked.length > 0 ? C.blue : C.border, color: C.white, border: "none", borderRadius: 10, fontSize: "0.8rem", cursor: checked.length > 0 ? "pointer" : "default", fontWeight: 600, fontFamily: "inherit", transition: "all 0.15s" }}>
          Kiểm tra
        </button>
      )}
    </div>
  );
}

// ── Short answer (text input + reveal) ───────────────────────
function ShortAnswerQ({ q, revealed, onReveal }) {
  const [input, setInput] = useState("");
  return (
    <div style={{ marginBottom: "1rem" }}>
      <div style={{ fontSize: "0.84rem", color: C.ink, fontWeight: 600, marginBottom: "0.5rem", lineHeight: 1.45 }}>
        {q.prompt}
      </div>
      <textarea
        value={input}
        onChange={e => setInput(e.target.value)}
        placeholder="Viết câu trả lời của bạn…"
        rows={2}
        style={{ width: "100%", padding: "0.5rem 0.75rem", border: `1.5px solid ${C.border}`, borderRadius: 10, fontSize: "0.82rem", color: C.ink, fontFamily: "inherit", resize: "vertical", outline: "none", background: C.white, boxSizing: "border-box", lineHeight: 1.55 }}
      />
      {!revealed
        ? <button onClick={onReveal}
            style={{ marginTop: "0.3rem", padding: "0.38rem 0.9rem", background: C.cream, border: `1px solid ${C.border}`, borderRadius: 10, fontSize: "0.78rem", color: C.gray, cursor: "pointer", fontFamily: "inherit" }}>
            Xem đáp án 👁
          </button>
        : <div style={{ marginTop: "0.3rem", background: "#EFF6FF", border: `1.5px solid ${C.blue}44`, borderRadius: 10, padding: "0.6rem 0.85rem", fontSize: "0.82rem", color: C.ink, lineHeight: 1.55, animation: "fadeUp 0.2s ease" }}>
            💡 {q.answer}
          </div>
      }
    </div>
  );
}

// ── Open / matching (reveal only) ────────────────────────────
function RevealQ({ q, revealed, onReveal }) {
  return (
    <div style={{ marginBottom: "1rem" }}>
      <div style={{ fontSize: "0.84rem", color: C.ink, fontWeight: 600, marginBottom: "0.5rem", lineHeight: 1.45 }}>
        {q.prompt}
      </div>
      {!revealed
        ? <button onClick={onReveal}
            style={{ padding: "0.38rem 0.9rem", background: C.cream, border: `1px solid ${C.border}`, borderRadius: 10, fontSize: "0.78rem", color: C.gray, cursor: "pointer", fontFamily: "inherit" }}>
            Xem đáp án 👁
          </button>
        : <div style={{ background: "#EFF6FF", border: `1.5px solid ${C.blue}44`, borderRadius: 10, padding: "0.6rem 0.85rem", fontSize: "0.82rem", color: C.ink, lineHeight: 1.55, animation: "fadeUp 0.2s ease" }}>
            💡 {Array.isArray(q.answer)
              ? q.answer.join(" · ")
              : typeof q.answer === "boolean"
                ? (q.answer ? "Vrai" : "Faux")
                : q.answer}
          </div>
      }
    </div>
  );
}

// ── Activity view ─────────────────────────────────────────────
function ActivityView({ activity, onBack }) {
  const [answers,      setAnswers]      = useState({});
  const [revealed,     setRevealed]     = useState({});
  const [confetti,     setConfetti]     = useState(false);
  const [showText,     setShowText]     = useState(true);

  const SCOREABLE = ["true_false", "multiple_choice", "multi_select"];
  const scoreable = activity.questions.filter(q => SCOREABLE.includes(q.type));

  const calcScore = (ans) =>
    scoreable.reduce((acc, q) => {
      const a = ans[q.id];
      if (a === undefined) return acc;
      if (q.type === "true_false" || q.type === "multiple_choice") return acc + (a === q.answer ? 1 : 0);
      if (q.type === "multi_select") {
        const correct = new Set(q.answer);
        const user    = new Set(a);
        const exact   = [...correct].every(x => user.has(x)) && [...user].every(x => correct.has(x));
        return acc + (exact ? 1 : 0);
      }
      return acc;
    }, 0);

  const handleAnswer = (qId, value) => {
    if (answers[qId] !== undefined) return;
    const next = { ...answers, [qId]: value };
    setAnswers(next);
    const allDone = scoreable.every(q => next[q.id] !== undefined);
    if (allDone && scoreable.length > 0) {
      const s = calcScore(next);
      if (s / scoreable.length >= 0.8) setTimeout(() => setConfetti(true), 200);
    }
  };

  const score = calcScore(answers);
  const allAnswered = scoreable.length > 0 && scoreable.every(q => answers[q.id] !== undefined);
  const pct = scoreable.length > 0 ? Math.round(score / scoreable.length * 100) : null;

  const badge = SECTION_BADGE[activity.section];

  return (
    <div style={{ padding: "1rem", animation: "fadeUp 0.3s ease" }}>
      <Confetti active={confetti} onDone={() => setConfetti(false)} />

      {/* Nav */}
      <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.75rem" }}>
        <button onClick={onBack}
          style={{ padding: "0.3rem 0.75rem", background: "transparent", border: `1.5px solid ${C.border}`, borderRadius: 20, color: C.gray, fontSize: "0.7rem", cursor: "pointer", fontFamily: "inherit" }}>
          ← Danh sách
        </button>
        <button onClick={() => setShowText(v => !v)}
          style={{ marginLeft: "auto", padding: "0.28rem 0.65rem", background: showText ? C.blueL : "transparent", border: `1.5px solid ${C.blue}44`, borderRadius: 20, color: C.blue, fontSize: "0.68rem", cursor: "pointer", fontWeight: 600, fontFamily: "inherit" }}>
          {showText ? "Ẩn bài đọc" : "Xem bài đọc"}
        </button>
      </div>

      {/* Passage card */}
      {showText && (
        <div style={{ background: C.white, borderRadius: 16, padding: "1rem 1.2rem", border: `1.5px solid ${C.border}`, marginBottom: "0.75rem" }}>
          <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "0.5rem", marginBottom: "0.4rem" }}>
            <div style={{ fontFamily: "'Playfair Display',Georgia,serif", fontSize: "1rem", color: C.ink, fontWeight: 700, lineHeight: 1.3 }}>
              {activity.title}
            </div>
            <SpeakBtn text={activity.text} />
          </div>
          <div style={{ display: "flex", gap: "0.35rem", flexWrap: "wrap", marginBottom: "0.6rem" }}>
            <span style={{ background: C.cream, border: `1px solid ${C.border}`, borderRadius: 20, padding: "0.1rem 0.5rem", fontSize: "0.63rem", color: C.gray }}>
              {SOURCE_LABEL[activity.source]} p.{activity.page}
            </span>
            {badge && (
              <span style={{ background: `${badge.color}18`, border: `1px solid ${badge.color}44`, borderRadius: 20, padding: "0.1rem 0.5rem", fontSize: "0.63rem", color: badge.color, fontWeight: 600 }}>
                {badge.label}
              </span>
            )}
          </div>
          <div style={{ fontSize: "0.76rem", color: C.gray, fontStyle: "italic", marginBottom: "0.7rem", lineHeight: 1.5 }}>
            {activity.instruction}
          </div>
          <div style={{ fontSize: "0.88rem", color: C.ink, lineHeight: 2, fontFamily: "Georgia,serif", whiteSpace: "pre-line", background: C.cream, borderRadius: 12, padding: "0.85rem 1rem", border: `1px solid ${C.border}` }}>
            {activity.text}
          </div>
        </div>
      )}

      {/* Questions card */}
      <div style={{ background: C.white, borderRadius: 16, padding: "1rem 1.1rem", border: `1.5px solid ${C.border}`, marginBottom: "0.75rem" }}>
        <div style={{ fontSize: "0.68rem", textTransform: "uppercase", letterSpacing: 1, color: C.gray, fontWeight: 600, marginBottom: "0.85rem" }}>
          Questions · {activity.questions.length} câu
        </div>
        {activity.questions.map((q, i) => {
          const ans = answers[q.id];
          const rev = revealed[q.id];
          const isLast = i === activity.questions.length - 1;
          return (
            <div key={q.id}>
              <div style={{ fontSize: "0.63rem", color: C.gray2, marginBottom: "0.2rem", letterSpacing: 0.3 }}>Câu {i + 1}</div>
              {q.type === "true_false"      && <TrueFalseQ      q={q} ans={ans} onAnswer={handleAnswer} />}
              {q.type === "multiple_choice" && <MultipleChoiceQ q={q} ans={ans} onAnswer={handleAnswer} />}
              {q.type === "multi_select"    && <MultiSelectQ    q={q} ans={ans} onAnswer={handleAnswer} />}
              {q.type === "short_answer"    && <ShortAnswerQ    q={q} revealed={rev} onReveal={() => setRevealed(r => ({ ...r, [q.id]: true }))} />}
              {(q.type === "open" || q.type === "matching") && <RevealQ q={q} revealed={rev} onReveal={() => setRevealed(r => ({ ...r, [q.id]: true }))} />}
              {!isLast && <div style={{ height: 1, background: C.border, margin: "0.2rem 0 0.8rem" }} />}
            </div>
          );
        })}
      </div>

      {/* Score */}
      {allAnswered && pct !== null && (
        <div style={{ background: C.white, borderRadius: 16, padding: "1.1rem", border: `1.5px solid ${pct >= 80 ? "#059669" : pct >= 60 ? C.gold : C.red}44`, textAlign: "center", animation: "fadeUp 0.3s ease" }}>
          <div style={{ fontFamily: "'Playfair Display',Georgia,serif", fontSize: "2rem", color: pct >= 80 ? "#059669" : pct >= 60 ? C.gold : C.red, fontWeight: 700 }}>
            {score}/{scoreable.length}
          </div>
          <div style={{ fontSize: "0.75rem", color: C.gray, marginTop: "0.2rem" }}>
            {pct}% đúng
            {activity.questions.length > scoreable.length && " · câu điền tự chấm"}
          </div>
          <button onClick={onBack}
            style={{ marginTop: "0.85rem", padding: "0.5rem 1.2rem", background: C.blue, color: C.white, border: "none", borderRadius: 12, fontSize: "0.82rem", cursor: "pointer", fontFamily: "'Playfair Display',Georgia,serif", fontWeight: 700 }}>
            ← Bài khác
          </button>
        </div>
      )}
    </div>
  );
}

// ── Main export ───────────────────────────────────────────────
export default function LectureEditoPanel() {
  const [selectedUnit,     setSelectedUnit]     = useState(null);
  const [selectedActivity, setSelectedActivity] = useState(null);

  if (selectedActivity) {
    return <ActivityView activity={selectedActivity} onBack={() => setSelectedActivity(null)} />;
  }

  const activities = selectedUnit !== null
    ? editoA1ReadingComprehension.filter(a => a.unit === selectedUnit)
    : [];

  return (
    <div style={{ padding: "1rem", animation: "fadeUp 0.3s ease" }}>

      {/* Unit selector */}
      <div style={{ marginBottom: "1rem" }}>
        <div style={{ fontSize: "0.62rem", fontWeight: 700, color: C.gray, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 6 }}>
          Chọn Unit
        </div>
        <div style={{ display: "flex", gap: "0.3rem", flexWrap: "wrap" }}>
          {UNITS_LIST.map(u => {
            const active = selectedUnit === u.num;
            const count  = editoA1ReadingComprehension.filter(a => a.unit === u.num).length;
            return (
              <button key={u.num} onClick={() => setSelectedUnit(active ? null : u.num)}
                style={{ padding: "0.28rem 0.75rem", borderRadius: 20, fontSize: "0.72rem", cursor: "pointer", fontFamily: "inherit", background: active ? C.blue : C.white, border: `1.5px solid ${active ? C.blue : C.border}`, color: active ? "#fff" : C.ink, fontWeight: active ? 700 : 400, transition: "all 0.15s", whiteSpace: "nowrap" }}>
                U{u.num}
                <span style={{ marginLeft: 4, opacity: 0.65, fontSize: "0.6rem" }}>({count})</span>
              </button>
            );
          })}
        </div>
        {selectedUnit !== null && (
          <div style={{ marginTop: 5, fontSize: "0.72rem", color: C.blue, fontWeight: 600 }}>
            {UNITS_LIST.find(u => u.num === selectedUnit)?.title}
          </div>
        )}
      </div>

      {/* Empty state */}
      {selectedUnit === null && (
        <div style={{ textAlign: "center", padding: "2.5rem 1rem", color: C.gray }}>
          <div style={{ fontSize: "2.2rem", marginBottom: "0.5rem" }}>📚</div>
          <div style={{ fontSize: "0.85rem" }}>Chọn một unit để xem bài đọc từ sách Édito</div>
          <div style={{ fontSize: "0.72rem", marginTop: "0.4rem", color: C.gray2 }}>
            {editoA1ReadingComprehension.length} bài · U0 → U10
          </div>
        </div>
      )}

      {/* Activity list */}
      {activities.map(activity => {
        const badge = SECTION_BADGE[activity.section];
        const autoQ = activity.questions.filter(q => ["true_false","multiple_choice","multi_select"].includes(q.type)).length;
        return (
          <div key={activity.id} onClick={() => setSelectedActivity(activity)} className="card-hover"
            style={{ background: C.white, border: `1.5px solid ${C.border}`, borderRadius: 14, padding: "0.9rem 1rem", marginBottom: "0.55rem", cursor: "pointer" }}>
            <div style={{ display: "flex", alignItems: "flex-start", gap: "0.5rem" }}>
              <div style={{ flex: 1 }}>
                <div style={{ fontFamily: "'Playfair Display',Georgia,serif", fontSize: "0.95rem", color: C.ink, fontWeight: 700, marginBottom: "0.25rem", lineHeight: 1.3 }}>
                  {activity.title}
                </div>
                <div style={{ fontSize: "0.7rem", color: C.gray, marginBottom: "0.35rem" }}>
                  p.{activity.page} · {SOURCE_LABEL[activity.source]} · {activity.questions.length} câu
                  {autoQ > 0 && <span style={{ color: C.green }}> ({autoQ} tự chấm)</span>}
                </div>
                {badge && (
                  <span style={{ background: `${badge.color}18`, border: `1px solid ${badge.color}44`, borderRadius: 20, padding: "0.1rem 0.5rem", fontSize: "0.63rem", color: badge.color, fontWeight: 600 }}>
                    {badge.label}
                  </span>
                )}
              </div>
              <span style={{ fontSize: "1.3rem", color: C.blue, opacity: 0.4, marginTop: 2 }}>›</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
