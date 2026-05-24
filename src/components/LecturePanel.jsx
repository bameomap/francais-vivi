import { useState } from "react";
import { C } from "../constants.js";
import { callAI, callAIText } from "../utils/api.js";
import { addWordToSRS } from "../utils/srs.js";
import { EDITO_VOCAB_UNITS } from "../data/editoVocab.js";
import { EDITO_GRAMMAR } from "../data/editoGrammar.js";
import SpeakBtn from "./ui/SpeakBtn.jsx";
import Spinner from "./ui/Spinner.jsx";
import Minou, { Confetti } from "./ui/Minou.jsx";
import LectureEditoPanel from "./LectureEditoPanel.jsx";

// Map vocab unit id (u0, u1…) → grammar unit points
function getGrammarPoints(vocabUnitId) {
  if (!vocabUnitId) return [];
  const grammarId = "g" + vocabUnitId.replace("u", "");
  const unit = EDITO_GRAMMAR.find(u => u.id === grammarId);
  return unit ? unit.points : [];
}

const LEVEL_CONFIG = {
  easy:   { label:"Dễ (A1)",   words: 50,  q: 3 },
  medium: { label:"Vừa (A1+)", words: 80,  q: 4 },
  hard:   { label:"Khó (A2)",  words: 110, q: 5 },
};

const EDITO_UNITS = EDITO_VOCAB_UNITS.map(u => ({ id: u.id, num: u.num, fr: u.title }));

// ── Cache helpers ─────────────────────────────────────────────
const cacheKey   = (uid, lvl) => `lecture_cache_${uid}_${lvl}`;
const getCached  = (uid, lvl) => { try { return JSON.parse(localStorage.getItem(cacheKey(uid, lvl))); } catch { return null; } };
const setCached  = (uid, lvl, d) => { try { localStorage.setItem(cacheKey(uid, lvl), JSON.stringify(d)); } catch {} };

// ── Prompt ───────────────────────────────────────────────────
function buildPrompt(wordList, level, unitTitle, grammarPoints) {
  const cfg = LEVEL_CONFIG[level];
  const sample = wordList.slice(0, 20).map(w => w.fr).join(", ");
  const ctx = unitTitle ? `chủ đề "${unitTitle}"` : "tiếng Pháp A1";

  const grammarSection = grammarPoints?.length > 0
    ? `\nĐiểm ngữ pháp của bài này — hãy áp dụng vào đoạn văn:\n${grammarPoints.map(p => `• ${p.topic}`).join("\n")}\n`
    : "";

  return `Tạo một bài đọc hiểu tiếng Pháp trình độ ${cfg.label} (khoảng ${cfg.words} từ) về ${ctx}, sử dụng ít nhất 6 trong các từ sau: ${sample}.${grammarSection}

Trả lời JSON hợp lệ KHÔNG có markdown, đúng schema:
{
  "title": "tiêu đề ngắn bằng tiếng Pháp",
  "passage": "đoạn văn tiếng Pháp",
  "vocab_used": ["danh sách từ từ input được dùng trong đoạn"],
  "questions": [
    { "q": "câu hỏi bằng tiếng Pháp", "options": ["A. ...", "B. ...", "C. ...", "D. ..."], "answer": "A", "explain": "giải thích ngắn bằng tiếng Việt" }
  ]
}
Tạo đúng ${cfg.q} câu hỏi. Câu hỏi và đáp án phải bằng tiếng Pháp. Giải thích (explain) bằng tiếng Việt. Câu hỏi kiểm tra hiểu nội dung, không hỏi từ vựng.`;
}

// ── HighlightedPassage ────────────────────────────────────────
function HighlightedPassage({ passage, vocab, selectedWord, onWordClick }) {
  const vocabSet = vocab.map(w => w.toLowerCase());
  const tokens = passage.split(/(\s+|[,\.!?;:«»"'()\-—\n])/);
  return (
    <span>
      {tokens.map((tok, i) => {
        const clean = tok.replace(/[^a-zA-ZÀ-ÿ'-]/g, "").toLowerCase();
        if (!clean) return <span key={i}>{tok}</span>;
        const isVocab    = vocabSet.some(w => w === clean || w === clean + "s" || clean === w + "s");
        const isSelected = selectedWord === clean;
        return (
          <span key={i} onClick={() => onWordClick(clean)} style={{
            cursor: "pointer",
            background: isSelected ? "#DBEAFE" : isVocab ? "#FEF9C3" : "transparent",
            borderRadius: 3, padding: "0 2px",
            fontWeight: isVocab ? 600 : 400,
            color: isSelected ? C.blue : isVocab ? "#92400E" : C.ink,
            borderBottom: `1px ${isVocab ? "solid" : "dotted"} ${isSelected ? C.blue : isVocab ? "#D97706" : C.border}`,
            transition: "background 0.15s",
          }}>{tok}</span>
        );
      })}
    </span>
  );
}

// ── OptionBtn ─────────────────────────────────────────────────
function OptionBtn({ label, state, onClick }) {
  const colors = {
    idle:    { bg: C.white,   border: C.border, color: C.ink   },
    correct: { bg: "#ECFDF5", border: C.green,  color: C.green },
    wrong:   { bg: "#FEF2F2", border: C.red,    color: C.red   },
    missed:  { bg: "#ECFDF5", border: C.green,  color: C.green },
  };
  const s = colors[state] || colors.idle;
  return (
    <button onClick={onClick} disabled={state !== "idle"}
      style={{ width:"100%", textAlign:"left", padding:"0.62rem 0.85rem", background:s.bg, border:`1.5px solid ${s.border}`, borderRadius:12, color:s.color, fontSize:"0.82rem", cursor:state==="idle"?"pointer":"default", fontFamily:"inherit", transition:"all 0.15s", marginBottom:"0.35rem", fontWeight:state!=="idle"?600:400 }}>
      {state==="correct"?"✅ ":state==="wrong"?"❌ ":state==="missed"?"✓ ":""}{label}
    </button>
  );
}

// ── Main component ────────────────────────────────────────────
const DEFAULT_WORDS = [
  {fr:"famille"},{fr:"maison"},{fr:"école"},{fr:"ami"},{fr:"livre"},
  {fr:"chat"},{fr:"manger"},{fr:"aller"},{fr:"beau"},{fr:"petit"},
  {fr:"jour"},{fr:"soir"},{fr:"ville"},{fr:"enfant"},{fr:"travail"},
];

export default function LecturePanel({ words: propWords = [] }) {
  const [mode,         setMode]         = useState("ai"); // "ai" | "edito"
  const [selectedUnit, setSelectedUnit] = useState(null);
  const [level,        setLevel]        = useState("easy");
  const [loading,      setLoading]      = useState(false);
  const [lecture,      setLecture]      = useState(null);
  const [err,          setErr]          = useState("");
  const [answers,      setAnswers]      = useState({});
  const [revealed,     setRevealed]     = useState({});
  const [confetti,     setConfetti]     = useState(false);
  const [showText,     setShowText]     = useState(true);
  const [wordPopup,    setWordPopup]    = useState(null);
  const [toast,        setToast]        = useState("");

  const showToast = (msg) => { setToast(msg); setTimeout(() => setToast(""), 2500); };

  // Active words: unit vocab > user words > fallback
  const unitData    = selectedUnit ? EDITO_VOCAB_UNITS.find(u => u.id === selectedUnit) : null;
  const unitWords   = unitData ? unitData.groups.flatMap(g => g.words) : null;
  const activeWords = unitWords || (propWords.length >= 4 ? propWords : DEFAULT_WORDS);

  const selectUnit = (uid) => {
    const next = selectedUnit === uid ? null : uid;
    setSelectedUnit(next);
    setLecture(null); setAnswers({}); setRevealed({}); setErr(""); setConfetti(false); setWordPopup(null);
    if (next) {
      const cached = getCached(next, level);
      if (cached) setLecture(cached);
    }
  };

  const changeLevel = (lvl) => {
    setLevel(lvl);
    // If unit selected, check cache for this level too
    if (selectedUnit) {
      setLecture(null); setAnswers({}); setRevealed({}); setConfetti(false);
      const cached = getCached(selectedUnit, lvl);
      if (cached) setLecture(cached);
    }
  };

  const generate = async () => {
    setLoading(true); setErr(""); setLecture(null); setAnswers({}); setRevealed({}); setConfetti(false); setWordPopup(null);
    try {
      const grammarPoints = getGrammarPoints(selectedUnit);
      const data = await callAI(buildPrompt(activeWords, level, unitData?.title, grammarPoints));
      setLecture(data);
      if (selectedUnit) setCached(selectedUnit, level, data);
    } catch(e) { setErr(e.message); }
    setLoading(false);
  };

  const answer = (qi, letter) => {
    if (revealed[qi]) return;
    setAnswers(a => ({ ...a, [qi]: letter }));
    setRevealed(r => ({ ...r, [qi]: true }));
  };

  const handleWordClick = async (word) => {
    if (wordPopup?.word === word) { setWordPopup(null); return; }
    const userWord = activeWords.find(w => w.fr.toLowerCase() === word || w.fr.toLowerCase() === word + "s" || word === w.fr.toLowerCase() + "s");
    if (userWord?.vi) { setWordPopup({ word, vi: userWord.vi, loading: false, added: false }); return; }
    setWordPopup({ word, vi: null, loading: true, added: false });
    try {
      const vi = await callAIText(
        [{ role:"user", content:`"${word}" nghĩa tiếng Việt là gì?` }],
        "Từ điển Pháp-Việt. Chỉ trả lời nghĩa ngắn nhất, tối đa 6 từ, không giải thích."
      );
      setWordPopup({ word, vi: vi.trim(), loading: false, added: false });
    } catch { setWordPopup({ word, vi: "—", loading: false, added: false }); }
  };

  const addPopupToSRS = () => {
    if (!wordPopup?.vi || wordPopup.added) return;
    addWordToSRS(wordPopup.word, wordPopup.vi);
    setWordPopup(p => ({ ...p, added: true }));
    showToast(`✓ Đã thêm "${wordPopup.word}" vào SRS!`);
  };

  const score = lecture ? lecture.questions.reduce((acc, q, i) => acc + (answers[i] === q.answer ? 1 : 0), 0) : 0;
  const total = lecture?.questions?.length || 0;
  const allAnswered = total > 0 && Object.keys(revealed).length === total;
  const pct = total > 0 ? Math.round(score / total * 100) : 0;
  if (allAnswered && pct >= 80 && !confetti && lecture) {
    setTimeout(() => setConfetti(true), 300);
  }

  return (
    <div style={{ animation: "fadeUp 0.3s ease" }}>
      {toast && (
        <div style={{ position:"fixed", top:20, left:"50%", transform:"translateX(-50%)", background:C.ink, color:C.white, padding:"0.5rem 1.1rem", borderRadius:24, fontSize:"0.78rem", zIndex:400, whiteSpace:"nowrap", boxShadow:"0 4px 20px rgba(0,0,0,0.2)", animation:"pop 0.3s ease" }}>
          {toast}
        </div>
      )}
      <Confetti active={confetti} onDone={() => setConfetti(false)} />

      {/* ── Mode toggle ── */}
      <div style={{ padding:"0.55rem 1rem 0" }}>
        <div style={{ display:"flex", gap:3, background:C.cream, padding:4, borderRadius:12 }}>
          {[
            { id:"ai",    label:"AI ✦",     desc:"Tạo bài đọc AI" },
            { id:"edito", label:"📚 Édito A1", desc:"Bài đọc từ sách" },
          ].map(m => (
            <button key={m.id} onClick={() => setMode(m.id)}
              style={{ flex:1, padding:"0.42rem 0.5rem", background:mode===m.id?C.white:"transparent", border:"none", borderRadius:9, cursor:"pointer", fontWeight:mode===m.id?700:500, color:mode===m.id?C.ink:C.gray, fontFamily:"inherit", fontSize:"0.78rem", boxShadow:mode===m.id?"0 1px 4px rgba(0,0,0,0.07)":"none", transition:"all 0.15s", whiteSpace:"nowrap" }}>
              {m.label}
            </button>
          ))}
        </div>
      </div>

      {/* ── Édito mode ── */}
      {mode === "edito" && <LectureEditoPanel />}

      {/* ── AI mode ── */}
      {mode === "ai" && <>

      {/* ── Unit picker (always visible) ── */}
      <div style={{ padding: "0.6rem 1rem 0.2rem" }}>
        <div style={{ display:"flex", alignItems:"center", gap:6, marginBottom:5 }}>
          <span style={{ fontSize:"0.62rem", fontWeight:700, color:C.gray, letterSpacing:"0.1em", textTransform:"uppercase", flexShrink:0 }}>Unit Édito</span>
          {selectedUnit && (
            <button onClick={() => selectUnit(null)} style={{ padding:"0.1rem 0.5rem", background:"transparent", border:`1px solid ${C.border}`, color:C.gray, borderRadius:20, fontSize:"0.62rem", cursor:"pointer" }}>
              ✕ Bỏ chọn
            </button>
          )}
        </div>
        <div style={{ display:"flex", gap:"0.3rem", overflowX:"auto", scrollbarWidth:"none", paddingBottom:2 }}>
          {EDITO_UNITS.map(u => {
            const isActive   = selectedUnit === u.id;
            const hasCached  = !!getCached(u.id, level);
            return (
              <button key={u.id} onClick={() => selectUnit(u.id)} style={{
                flexShrink: 0, padding: "0.28rem 0.65rem",
                background: isActive ? C.blue : hasCached ? "#ECFDF5" : C.cream,
                border: `1.5px solid ${isActive ? C.blue : hasCached ? "#059669" : C.border}`,
                color: isActive ? "#fff" : hasCached ? "#059669" : C.ink,
                borderRadius: 20, fontSize: "0.68rem", cursor: "pointer",
                fontFamily: "inherit", fontWeight: isActive ? 700 : 400,
                whiteSpace: "nowrap", transition: "all 0.15s",
              }}>
                {hasCached && !isActive ? "✓ " : ""}U{u.num}
              </button>
            );
          })}
        </div>
        {selectedUnit && unitData && (
          <div style={{ marginTop:4, fontSize:"0.7rem", color:C.blue, fontWeight:600 }}>
            {unitData.title} · {activeWords.length} từ
          </div>
        )}
      </div>

      {/* ── Content area ── */}

      {/* IDLE */}
      {!lecture && !loading && (
        <div style={{ padding:"1rem" }}>
          <div style={{ background:C.white, borderRadius:20, padding:"1.5rem 1.2rem", border:`1.5px solid ${C.border}`, textAlign:"center" }}>
            <div style={{ fontSize:"2.5rem", marginBottom:"0.5rem" }}>📰</div>
            <div style={{ fontFamily:"'Playfair Display',Georgia,serif", fontSize:"1.2rem", color:C.ink, fontWeight:700, marginBottom:"0.3rem" }}>Đọc hiểu</div>
            <div style={{ fontSize:"0.8rem", color:C.gray, marginBottom:"1.2rem", lineHeight:1.6 }}>
              {selectedUnit
                ? <>AI tạo bài đọc theo chủ đề <b style={{ color:C.blue }}>{unitData?.title}</b></>
                : "AI tạo đoạn văn từ bộ từ của bạn\nrồi hỏi câu hỏi hiểu nội dung"
              }
            </div>

            {/* Level picker */}
            <div style={{ display:"flex", gap:"0.5rem", marginBottom:"1.2rem", justifyContent:"center" }}>
              {Object.entries(LEVEL_CONFIG).map(([k, v]) => (
                <button key={k} onClick={() => changeLevel(k)}
                  style={{ padding:"0.35rem 0.8rem", borderRadius:20, border:`1.5px solid ${level===k?"#059669":C.border}`, background:level===k?"#ECFDF5":C.white, color:level===k?"#059669":C.gray, fontSize:"0.72rem", cursor:"pointer", fontWeight:600, transition:"all 0.15s" }}>
                  {v.label}
                </button>
              ))}
            </div>

            {err && (
              <div style={{ marginBottom:"0.8rem", display:"flex", flexDirection:"column", alignItems:"center", gap:"0.4rem" }}>
                <div style={{ color:C.red, fontSize:"0.78rem" }}>⚠ {err}</div>
                <button onClick={generate} style={{ padding:"0.25rem 0.75rem", background:C.red, color:C.white, border:"none", borderRadius:20, fontSize:"0.72rem", cursor:"pointer", fontWeight:600 }}>↺ Thử lại</button>
              </div>
            )}
            <button onClick={generate}
              style={{ padding:"0.75rem 1.8rem", background:"linear-gradient(135deg,#059669,#0D9488)", color:C.white, border:"none", borderRadius:14, fontFamily:"'Playfair Display',Georgia,serif", fontSize:"0.95rem", cursor:"pointer", fontWeight:700, boxShadow:"0 6px 20px #05966944" }}>
              Tạo bài đọc ✦
            </button>
          </div>
        </div>
      )}

      {/* LOADING */}
      {loading && (
        <div style={{ display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", height:220, gap:"1rem" }}>
          <Spinner />
          <div style={{ fontSize:"0.85rem", color:C.gray }}>AI đang viết đoạn văn…</div>
        </div>
      )}

      {/* READING + QUIZ */}
      {lecture && !loading && (
        <div style={{ padding:"1rem", display:"flex", flexDirection:"column", gap:"0.75rem" }}>

          {/* Toolbar */}
          <div style={{ display:"flex", gap:"0.4rem", flexWrap:"wrap", alignItems:"center" }}>
            <button onClick={generate}
              style={{ padding:"0.3rem 0.75rem", background:"transparent", border:`1.5px solid ${C.border}`, borderRadius:20, color:C.gray, fontSize:"0.7rem", cursor:"pointer" }}>
              🔄 Bài mới
            </button>
            <div style={{ display:"flex", gap:"0.3rem" }}>
              {Object.entries(LEVEL_CONFIG).map(([k, v]) => (
                <button key={k} onClick={() => changeLevel(k)}
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

          {/* Passage */}
          {showText && (
            <div style={{ background:C.white, borderRadius:16, padding:"1.1rem 1.2rem", border:`1.5px solid ${C.border}`, boxShadow:"0 2px 12px #00000008" }}>
              <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:"0.65rem" }}>
                <div style={{ fontFamily:"'Playfair Display',Georgia,serif", fontSize:"1rem", color:C.ink, fontWeight:700 }}>{lecture.title}</div>
                <SpeakBtn text={lecture.passage} />
              </div>
              <div style={{ fontSize:"0.88rem", color:C.ink, lineHeight:1.95, fontFamily:"Georgia,serif" }}>
                <HighlightedPassage
                  passage={lecture.passage}
                  vocab={lecture.vocab_used || []}
                  selectedWord={wordPopup?.word}
                  onWordClick={handleWordClick}
                />
              </div>
              {wordPopup && (
                <div style={{ marginTop:"0.75rem", background:"#EFF6FF", border:`1.5px solid ${C.blue}55`, borderRadius:14, padding:"0.75rem 1rem", animation:"fadeUp 0.2s ease", display:"flex", alignItems:"center", gap:"0.75rem" }}>
                  <div style={{ flex:1, minWidth:0 }}>
                    <div style={{ display:"flex", alignItems:"center", gap:"0.4rem", marginBottom:"0.2rem" }}>
                      <span style={{ fontFamily:"'Playfair Display',Georgia,serif", fontSize:"1.05rem", color:C.blue, fontWeight:700 }}>{wordPopup.word}</span>
                      <SpeakBtn text={wordPopup.word} />
                    </div>
                    <div style={{ fontSize:"0.82rem", color:C.ink }}>
                      {wordPopup.loading ? <span style={{ color:C.gray, fontStyle:"italic" }}>Đang tra…</span> : wordPopup.vi}
                    </div>
                  </div>
                  <div style={{ display:"flex", flexDirection:"column", gap:"0.3rem", flexShrink:0 }}>
                    <button onClick={addPopupToSRS} disabled={wordPopup.loading || wordPopup.added}
                      style={{ padding:"0.3rem 0.7rem", background:wordPopup.added?C.greenL:C.blue, color:wordPopup.added?C.green:C.white, border:`1.5px solid ${wordPopup.added?C.green:C.blue}`, borderRadius:20, fontSize:"0.68rem", cursor:wordPopup.added?"default":"pointer", fontWeight:700, whiteSpace:"nowrap", transition:"all 0.2s" }}>
                      {wordPopup.added ? "✓ Đã thêm" : "+ SRS"}
                    </button>
                    <button onClick={() => setWordPopup(null)}
                      style={{ padding:"0.25rem 0.7rem", background:"transparent", border:`1px solid ${C.border}`, borderRadius:20, fontSize:"0.65rem", color:C.gray, cursor:"pointer" }}>
                      Đóng
                    </button>
                  </div>
                </div>
              )}
              {lecture.vocab_used?.length > 0 && (
                <div style={{ marginTop:"0.8rem", paddingTop:"0.6rem", borderTop:`1px solid ${C.border}` }}>
                  <div style={{ fontSize:"0.63rem", color:C.gray, marginBottom:"0.3rem", textTransform:"uppercase", letterSpacing:1 }}>Từ unit trong bài</div>
                  <div style={{ display:"flex", flexWrap:"wrap", gap:"0.25rem" }}>
                    {lecture.vocab_used.map((w, i) => (
                      <span key={i} onClick={() => handleWordClick(w.toLowerCase())} style={{ background:"#FEF9C3", border:"1px solid #D97706", borderRadius:20, padding:"0.1rem 0.5rem", fontSize:"0.7rem", color:"#92400E", fontWeight:600, cursor:"pointer" }}>{w}</span>
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
                <div key={qi} style={{ marginBottom:qi<lecture.questions.length-1?"1.1rem":0 }}>
                  <div style={{ fontSize:"0.84rem", color:C.ink, fontWeight:600, marginBottom:"0.5rem", lineHeight:1.45 }}>
                    {qi+1}. {q.q}
                  </div>
                  {q.options.map((opt, oi) => {
                    const letter = opt[0];
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
              <div style={{ fontFamily:"'Playfair Display',Georgia,serif", fontSize:"1.8rem", color:pct>=80?"#059669":pct>=60?C.gold:C.red, fontWeight:700, marginTop:"0.8rem" }}>
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
      )}

      </>}
    </div>
  );
}
