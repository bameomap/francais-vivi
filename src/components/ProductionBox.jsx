import { useState, useEffect, useRef } from "react";
import { C } from "../constants.js";
import { callAI } from "../utils/api.js";
import SpeakBtn from "./ui/SpeakBtn.jsx";
import Spinner from "./ui/Spinner.jsx";

// Answer box for anything the learner produces — a DELF exam task or a unit
// speaking topic. Production has no answer key, so AI marks it; that's the one
// place generated feedback beats the book, since the book can't read what you
// wrote.
//
// `mode="oral"` swaps typing for dictation (fr-FR), so what gets marked is what
// was actually said. Drafts persist under `storageKey`: losing a paragraph by
// navigating away would be worse than any grading bug.

function buildPrompt({ task, text, mode, cefr, examMode, targetPhrases }) {
  const oral = mode === "oral";
  const role = examMode
    ? `Tu es examinateur DELF ${cefr}. Évalue selon les critères officiels de l'épreuve.`
    : `Tu es professeur de français pour un apprenant vietnamien de niveau ${cefr}. Il s'entraîne à s'exprimer sur ce sujet, ce n'est pas un examen : sois encourageant mais précis.`;
  const target = targetPhrases?.length
    ? `\nStructures visées par la leçon (vérifie s'il en a utilisé, sans l'exiger) : ${targetPhrases.join(" / ")}`
    : "";

  return `${role}

Consigne :
"${task}"${target}

Production du candidat (${oral ? "transcription de ce qu'il a dit à l'oral" : "texte écrit"}) :
"""${text}"""

Réponds UNIQUEMENT en JSON valide sans markdown :
{
  "wordCount": nombre de mots,
  "verdict": "${examMode ? "Đạt tốt|Đạt|Suýt đạt|Chưa đạt" : "Rất tốt|Tốt|Khá|Cần luyện thêm"}",
  "summary": "une phrase en vietnamien résumant le niveau de la production",
  "criteria": [
    {"name":"Respect de la consigne","ok":true,"comment":"nhận xét ngắn bằng tiếng Việt"},
    {"name":"Lexique approprié","ok":true,"comment":"..."},
    {"name":"Morphosyntaxe (temps, accords)","ok":false,"comment":"..."},
    {"name":"${oral ? "Aisance et cohérence" : "Cohérence (connecteurs)"}","ok":true,"comment":"..."}
  ],
  "errors": [{"original":"đoạn sai","correction":"sửa lại","explanation":"giải thích ngắn bằng tiếng Việt"}],
  "corrected": "toute la production corrigée, en français",
  "tip": "un conseil court en vietnamien"
}

Règles : niveau ${cefr}, ne corrige pas au-delà. Toutes les explications en vietnamien ; le français seulement dans "corrected", "original" et "correction". Si la production est vide ou hors sujet, dis-le dans "summary". ${oral ? "La transcription automatique peut manquer la ponctuation : ne compte pas ça comme une faute." : ""}`;
}

const verdictColor = (v) =>
  /^(Đạt tốt|Rất tốt)/.test(v) ? C.green :
  /^(Đạt|Tốt)/.test(v)        ? C.green :
  /^(Suýt|Khá)/.test(v)       ? C.gold  : C.red;

export default function ProductionBox({
  task,
  mode = "ecrit",          // "ecrit" | "oral"
  cefr = "A2",
  color = C.blue,
  minWords = 0,
  targetPhrases = null,
  examMode = false,
  storageKey = null,
  rows,
}) {
  const oral = mode === "oral";
  const [text,    setText]    = useState(() => {
    try { return storageKey ? localStorage.getItem(storageKey) || "" : ""; } catch { return ""; }
  });
  const [result,  setResult]  = useState(null);
  const [loading, setLoading] = useState(false);
  const [err,     setErr]     = useState("");

  useEffect(() => {
    if (!storageKey) return;
    try {
      if (text.trim()) localStorage.setItem(storageKey, text);
      else localStorage.removeItem(storageKey);
    } catch {}
  }, [text, storageKey]);

  // ── Dictation ───────────────────────────────────────────────
  const recRef = useRef(null);
  const [listening, setListening] = useState(false);
  const micOK = typeof window !== "undefined" &&
    !!(window.SpeechRecognition || window.webkitSpeechRecognition);

  const toggleMic = () => {
    if (!micOK) return;
    if (listening) { recRef.current?.stop(); return; }
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    const rec = new SR();
    rec.lang = "fr-FR";
    rec.interimResults = true;
    rec.continuous = true;
    const base = text ? text + " " : "";
    rec.onresult = (e) => {
      let out = "";
      for (const r of e.results) out += r[0].transcript;
      setText(base + out);
    };
    rec.onend   = () => setListening(false);
    rec.onerror = () => setListening(false);
    recRef.current = rec;
    rec.start();
    setListening(true);
  };
  useEffect(() => () => { try { recRef.current?.abort(); } catch {} }, []);

  const words = text.trim() ? text.trim().split(/\s+/).length : 0;

  const grade = async () => {
    if (!text.trim() || loading) return;
    setLoading(true); setErr(""); setResult(null);
    try {
      setResult(await callAI(buildPrompt({ task, text: text.trim(), mode, cefr, examMode, targetPhrases })));
    } catch (e) { setErr(e.message); }
    setLoading(false);
  };

  return (
    <div>
      <textarea
        value={text}
        onChange={e => setText(e.target.value)}
        rows={rows || (oral ? 5 : 7)}
        placeholder={oral
          ? "Bấm 🎤 rồi nói tiếng Pháp — máy sẽ ghi lại. Hoặc gõ tay cũng được."
          : "Viết bài của bạn bằng tiếng Pháp ở đây…"}
        style={{
          width: "100%", boxSizing: "border-box", padding: "0.55rem 0.65rem",
          borderRadius: 10, border: `1.5px solid ${listening ? C.red : C.border}`,
          background: C.white, color: C.ink, fontFamily: "Georgia,serif",
          fontSize: "0.8rem", lineHeight: 1.65, resize: "vertical", outline: "none",
        }}
      />

      <div style={{ display: "flex", alignItems: "center", gap: "0.4rem", marginTop: "0.4rem", flexWrap: "wrap" }}>
        {oral && micOK && (
          <button onClick={toggleMic}
            style={{
              background: listening ? C.red : C.white, color: listening ? "#fff" : C.red,
              border: `1.5px solid ${C.red}66`, borderRadius: 20,
              padding: "0.25rem 0.7rem", fontSize: "0.7rem", fontWeight: 700,
              cursor: "pointer", fontFamily: "inherit",
            }}>
            {listening ? "⏹ Dừng ghi" : "🎤 Nói"}
          </button>
        )}
        <button onClick={grade} disabled={!text.trim() || loading}
          style={{
            background: text.trim() && !loading ? color : C.cream,
            color: text.trim() && !loading ? "#fff" : C.gray2,
            border: "none", borderRadius: 20, padding: "0.28rem 0.85rem",
            fontSize: "0.72rem", fontWeight: 700,
            cursor: text.trim() && !loading ? "pointer" : "default", fontFamily: "inherit",
          }}>
          ✨ Nhờ AI chấm
        </button>
        {text.trim() && !loading && (
          <button onClick={() => { setText(""); setResult(null); setErr(""); }}
            style={{ background: "transparent", border: `1px solid ${C.border}`, color: C.gray, borderRadius: 20, padding: "0.2rem 0.6rem", fontSize: "0.66rem", cursor: "pointer", fontFamily: "inherit" }}>
            ✕ Xoá
          </button>
        )}
        <span style={{ fontSize: "0.65rem", color: minWords && words < minWords ? C.gold : C.gray2 }}>
          {words} từ{minWords ? ` · tối thiểu ${minWords}` : ""}
        </span>
      </div>

      {oral && !micOK && (
        <div style={{ fontSize: "0.63rem", color: C.gray2, marginTop: "0.3rem" }}>
          Trình duyệt này không hỗ trợ ghi âm — bạn gõ lại câu mình vừa nói cũng được.
        </div>
      )}

      {loading && (
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", padding: "0.6rem 0", color: C.gray, fontSize: "0.75rem" }}>
          <Spinner size={14} /> AI đang chấm…
        </div>
      )}
      {err && <div style={{ color: C.red, fontSize: "0.72rem", marginTop: "0.4rem" }}>⚠ {err}</div>}

      {result && (
        <div style={{ marginTop: "0.6rem", border: `1px solid ${verdictColor(result.verdict)}55`, borderRadius: 10, overflow: "hidden" }}>
          <div style={{ background: verdictColor(result.verdict), color: "#fff", padding: "0.35rem 0.7rem", fontSize: "0.73rem", fontWeight: 700, display: "flex", justifyContent: "space-between", gap: 8 }}>
            <span>{result.verdict}</span>
            {result.wordCount != null && <span style={{ opacity: 0.85 }}>{result.wordCount} từ</span>}
          </div>
          <div style={{ padding: "0.6rem 0.7rem" }}>
            {result.summary && <div style={{ fontSize: "0.75rem", color: C.ink, lineHeight: 1.6, marginBottom: "0.5rem" }}>{result.summary}</div>}

            {result.criteria?.map((c, i) => (
              <div key={i} style={{ display: "flex", gap: 6, marginBottom: "0.3rem", fontSize: "0.71rem", lineHeight: 1.5 }}>
                <span style={{ flexShrink: 0, color: c.ok ? C.green : C.red, fontWeight: 700 }}>{c.ok ? "✓" : "✗"}</span>
                <span><b style={{ color: C.ink }}>{c.name}</b> — <span style={{ color: C.gray }}>{c.comment}</span></span>
              </div>
            ))}

            {result.errors?.length > 0 && (
              <div style={{ marginTop: "0.5rem" }}>
                <div style={{ fontSize: "0.6rem", fontWeight: 700, color: C.gray, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "0.3rem" }}>Lỗi cần sửa</div>
                {result.errors.map((e, i) => (
                  <div key={i} style={{ background: C.redL, borderRadius: 8, padding: "0.35rem 0.55rem", marginBottom: "0.28rem", fontSize: "0.71rem", lineHeight: 1.55 }}>
                    <span style={{ textDecoration: "line-through", color: C.red, fontFamily: "Georgia,serif" }}>{e.original}</span>
                    <span style={{ color: C.gray }}> → </span>
                    <span style={{ color: C.green, fontWeight: 600, fontFamily: "Georgia,serif" }}>{e.correction}</span>
                    {e.explanation && <div style={{ color: C.gray, marginTop: 2 }}>{e.explanation}</div>}
                  </div>
                ))}
              </div>
            )}

            {result.corrected && (
              <div style={{ marginTop: "0.5rem" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 5, marginBottom: "0.25rem" }}>
                  <span style={{ fontSize: "0.6rem", fontWeight: 700, color: C.green, textTransform: "uppercase", letterSpacing: "0.08em" }}>
                    {oral ? "Nói lại cho đúng" : "Bài đã sửa"}
                  </span>
                  <SpeakBtn text={result.corrected} size="0.64rem" />
                </div>
                <div style={{ background: C.greenL, borderRadius: 8, padding: "0.45rem 0.6rem", fontSize: "0.75rem", color: C.ink, lineHeight: 1.7, fontFamily: "Georgia,serif" }}>
                  {result.corrected}
                </div>
              </div>
            )}

            {result.tip && (
              <div style={{ marginTop: "0.5rem", fontSize: "0.71rem", color: C.gold, lineHeight: 1.55 }}>💡 {result.tip}</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
