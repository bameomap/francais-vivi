import { useState, useCallback } from "react";
import { C } from "../constants.js";
import { EDITO_VOCAB_UNITS } from "../data/editoVocab.js";
import { callAI, callAIBatched, buildPrompt } from "../utils/api.js";
import { addWordToSRS, getSRSStats } from "../utils/srs.js";
import { MCSection, FillSection, MatchSection, FlashcardSection, AnagrammeSection } from "./QuizSections.jsx";
import SpeakBtn from "./ui/SpeakBtn.jsx";
import Spinner from "./ui/Spinner.jsx";
import WordDetailSheet from "./ui/WordDetailSheet.jsx";

// ── Study mode selector ────────────────────────────────────
const MODES = [
  { id:"flashcard",      label:"🃏 Flashcard",    desc:"Lật thẻ nhớ từ" },
  { id:"multiple_choice",label:"☑ Trắc nghiệm",  desc:"Chọn đáp án đúng" },
  { id:"matching",       label:"🔗 Nối từ",       desc:"Ghép từ với nghĩa" },
  { id:"fill_blank",     label:"✏️ Điền từ",      desc:"Gõ từ đúng vào chỗ trống" },
  { id:"anagramme",      label:"🔀 Xếp chữ",     desc:"Sắp xếp lại các chữ cái" },
];

const CLIENT_TYPES = ["flashcard", "anagramme"];

// ── Word list view for a group ─────────────────────────────
function WordList({ words, color = C.blue, bg = C.blueL }) {
  const [selected, setSelected] = useState(null);
  return (
    <>
      <div style={{ display:"flex", flexDirection:"column", gap:"0.35rem" }}>
        {words.map((w, i) => (
          <div key={i}
            onClick={() => setSelected(w)}
            style={{
              display:"flex", alignItems:"stretch", gap:0,
              background:C.white,
              border:`1.5px solid ${C.border}`,
              borderLeft:`4px solid ${color}`,
              borderRadius:12, overflow:"hidden",
              cursor:"pointer", transition:"background 0.12s, border-color 0.12s",
            }}
            onPointerDown={e => { e.currentTarget.style.background = bg; e.currentTarget.style.borderColor = color; }}
            onPointerUp={e =>   { e.currentTarget.style.background = C.white; e.currentTarget.style.borderColor = C.border; e.currentTarget.style.borderLeftColor = color; }}
            onPointerLeave={e =>{ e.currentTarget.style.background = C.white; e.currentTarget.style.borderColor = C.border; e.currentTarget.style.borderLeftColor = color; }}
          >
            {/* Number badge */}
            <div style={{
              width:36, flexShrink:0,
              display:"flex", alignItems:"center", justifyContent:"center",
              background:`${color}18`,
              borderRight:`1px solid ${color}22`,
            }}>
              <span style={{ fontFamily:"'Courier New',monospace", fontSize:"0.62rem", color:color, fontWeight:700, opacity:0.9 }}>
                {String(i + 1).padStart(2, "0")}
              </span>
            </div>

            {/* Word content */}
            <div style={{ flex:1, padding:"0.5rem 0.65rem", minWidth:0 }}>
              <div style={{ display:"flex", alignItems:"center", gap:"0.4rem" }}>
                <span style={{ fontFamily:"'Playfair Display',Georgia,serif", fontSize:"0.95rem", color:C.ink, fontWeight:700, flex:1, lineHeight:1.3 }}>
                  {w.fr}
                </span>
                <SpeakBtn text={w.fr} />
                <span style={{ fontSize:"0.75rem", color:color, opacity:0.7, flexShrink:0 }}>›</span>
              </div>
              <div style={{ fontSize:"0.75rem", color:C.gray, marginTop:"0.15rem", lineHeight:1.3 }}>
                {w.vi}
              </div>
            </div>
          </div>
        ))}
      </div>
      {selected && <WordDetailSheet word={selected} onClose={() => setSelected(null)} />}
    </>
  );
}

// ── Quiz runner ────────────────────────────────────────────
function QuizRunner({ words, mode, onBack }) {
  const [quiz, setQuiz]       = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState(null);
  const [started, setStarted] = useState(false);

  const start = useCallback(async () => {
    setStarted(true);
    if (CLIENT_TYPES.includes(mode)) {
      setQuiz({ type: mode, words });
      return;
    }
    setLoading(true); setError(null);
    try {
      const q = await callAIBatched(mode, words, Math.min(words.length, 10));
      setQuiz(q);
    } catch(e) { setError(e.message); setStarted(false); }
    setLoading(false);
  }, [words, mode]);

  if (!started) {
    start();
    return (
      <div style={{ display:"flex", justifyContent:"center", padding:"2rem" }}>
        <Spinner />
      </div>
    );
  }

  const recordAnswer = (word, isOk) => {
    const w = words.find(x => x.fr === word);
    if (w) addWordToSRS(w.fr, w.vi);
  };

  return (
    <div style={{ padding:"1rem", animation:"fadeUp 0.3s ease" }}>
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:"0.9rem" }}>
        <button onClick={onBack}
          style={{ background:C.blueL, border:`1.5px solid ${C.blue}33`, color:C.blue, padding:"0.3rem 0.75rem", borderRadius:10, fontSize:"0.78rem", cursor:"pointer", fontWeight:600 }}>
          ← Quay lại
        </button>
        <button onClick={() => { setQuiz(null); setStarted(false); }}
          style={{ background:"transparent", border:`1.5px solid ${C.border}`, color:C.gray, padding:"0.3rem 0.65rem", borderRadius:10, fontSize:"0.75rem", cursor:"pointer" }}>
          🔄 Làm lại
        </button>
      </div>

      {loading && (
        <div style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:"0.8rem", padding:"2rem", color:C.gray }}>
          <Spinner /><span style={{ fontSize:"0.88rem" }}>AI đang tạo bài tập...</span>
        </div>
      )}
      {error && (
        <div style={{ color:C.red, padding:"0.75rem", background:C.redL, borderRadius:10, fontSize:"0.82rem" }}>
          ⚠ {error}
          <button onClick={() => { setStarted(false); }} style={{ marginLeft:"0.7rem", color:C.blue, background:"none", border:"none", cursor:"pointer", fontSize:"0.78rem", textDecoration:"underline" }}>Thử lại</button>
        </div>
      )}
      {quiz && !loading && (() => {
        if (quiz.type === "multiple_choice") return <MCSection questions={quiz.questions} words={words} onRecord={recordAnswer} />;
        if (quiz.type === "fill_blank")      return <FillSection questions={quiz.questions} words={words} onRecord={recordAnswer} />;
        if (quiz.type === "matching")        return <MatchSection pairs={quiz.pairs} />;
        if (quiz.type === "flashcard")       return <FlashcardSection words={quiz.words} onRecord={recordAnswer} />;
        if (quiz.type === "anagramme")       return <AnagrammeSection words={quiz.words} onRecord={recordAnswer} />;
        return null;
      })()}
    </div>
  );
}

// ── Group study view ───────────────────────────────────────
function GroupStudyView({ group, unit, onBack }) {
  const [subView, setSubView] = useState("list"); // "list" | "pick" | mode-id

  if (subView !== "list" && subView !== "pick") {
    return <QuizRunner words={group.words} mode={subView} onBack={() => setSubView("pick")} />;
  }

  return (
    <div style={{ padding:"1rem", animation:"fadeUp 0.3s ease" }}>
      {/* Header */}
      <div style={{ display:"flex", alignItems:"center", gap:"0.6rem", marginBottom:"1rem" }}>
        <button onClick={onBack}
          style={{ background:"transparent", border:`1.5px solid ${C.border}`, color:C.gray, padding:"0.2rem 0.65rem", borderRadius:20, fontSize:"0.7rem", cursor:"pointer", fontWeight:600 }}>
          ← Quay lại
        </button>
        <span style={{ fontSize:"1.1rem" }}>{group.icon}</span>
        <div>
          <div style={{ fontWeight:700, color:C.ink, fontSize:"0.9rem" }}>{group.label}</div>
          <div style={{ fontSize:"0.68rem", color:C.gray }}>Unité {unit.num} · {group.words.length} từ</div>
        </div>
      </div>

      {/* Tab: list vs luyện */}
      <div style={{ display:"flex", gap:"0.3rem", marginBottom:"1rem" }}>
        {[{id:"list",label:"📋 Danh sách"},{id:"pick",label:"🎯 Luyện tập"}].map(t => (
          <button key={t.id} onClick={() => setSubView(t.id)}
            style={{ padding:"0.38rem 0.85rem", border:`1.5px solid ${subView===t.id ? unit.color : C.border}`, borderRadius:20, background:subView===t.id ? unit.color : "transparent", color:subView===t.id ? "#fff" : C.gray, fontSize:"0.75rem", cursor:"pointer", fontWeight:subView===t.id ? 700 : 400 }}>
            {t.label}
          </button>
        ))}
      </div>

      {/* Word list */}
      {subView === "list" && <WordList words={group.words} color={unit.color} bg={unit.bg} />}

      {/* Mode picker */}
      {subView === "pick" && (
        <div style={{ display:"flex", flexDirection:"column", gap:"0.5rem" }}>
          <div style={{ fontSize:"0.72rem", color:C.gray, marginBottom:"0.2rem" }}>Chọn chế độ học:</div>
          {MODES.map(m => (
            <button key={m.id} onClick={() => setSubView(m.id)}
              style={{ display:"flex", alignItems:"center", gap:"0.85rem", background:C.white, border:`1.5px solid ${C.border}`, borderRadius:14, padding:"0.75rem 1rem", cursor:"pointer", textAlign:"left", fontFamily:"inherit", transition:"all 0.15s" }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = unit.color; e.currentTarget.style.background = unit.bg; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = C.border; e.currentTarget.style.background = C.white; }}>
              <span style={{ fontSize:"1.4rem", lineHeight:1 }}>{m.label.split(" ")[0]}</span>
              <div>
                <div style={{ fontWeight:600, color:C.ink, fontSize:"0.85rem" }}>{m.label.split(" ").slice(1).join(" ")}</div>
                <div style={{ fontSize:"0.7rem", color:C.gray, marginTop:"0.1rem" }}>{m.desc}</div>
              </div>
              <span style={{ marginLeft:"auto", color:C.gray, fontSize:"0.9rem" }}>→</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

// ── Unit detail view — shows groups ───────────────────────
function UnitDetailView({ unit, onBack }) {
  const [activeGroup, setActiveGroup] = useState(null);

  if (activeGroup) {
    const group = unit.groups.find(g => g.id === activeGroup);
    return <GroupStudyView group={group} unit={unit} onBack={() => setActiveGroup(null)} />;
  }

  return (
    <div style={{ padding:"1rem", animation:"fadeUp 0.3s ease" }}>
      {/* Header */}
      <div style={{ display:"flex", alignItems:"center", gap:"0.6rem", marginBottom:"1rem" }}>
        <button onClick={onBack}
          style={{ background:"transparent", border:`1.5px solid ${C.border}`, color:C.gray, padding:"0.2rem 0.65rem", borderRadius:20, fontSize:"0.7rem", cursor:"pointer", fontWeight:600 }}>
          ← Quay lại
        </button>
        <div style={{ background:unit.color, color:"#fff", borderRadius:999, minWidth:28, height:28, display:"flex", alignItems:"center", justifyContent:"center", fontSize:"0.78rem", fontWeight:700, flexShrink:0 }}>
          {unit.num}
        </div>
        <div>
          <div style={{ fontWeight:700, color:C.ink, fontSize:"0.95rem" }}>Unité {unit.num}</div>
          <div style={{ fontSize:"0.72rem", color:unit.color, fontStyle:"italic" }}>{unit.title}</div>
        </div>
      </div>

      {/* Group cards */}
      <div style={{ display:"flex", flexDirection:"column", gap:"0.55rem" }}>
        {unit.groups.map((g, i) => (
          <button key={g.id} onClick={() => setActiveGroup(g.id)}
            style={{ display:"flex", alignItems:"center", gap:"0.85rem", background:C.white, border:`1.5px solid ${unit.color}33`, borderRadius:16, padding:"0.9rem 1rem", cursor:"pointer", textAlign:"left", fontFamily:"inherit", animation:`fadeUp 0.2s ease ${i*0.05}s both`, transition:"all 0.15s", boxShadow:`0 2px 8px ${unit.color}10` }}
            onMouseEnter={e => { e.currentTarget.style.background = unit.bg; e.currentTarget.style.borderColor = unit.color; }}
            onMouseLeave={e => { e.currentTarget.style.background = C.white; e.currentTarget.style.borderColor = `${unit.color}33`; }}>
            <span style={{ fontSize:"1.6rem", lineHeight:1 }}>{g.icon}</span>
            <div style={{ flex:1 }}>
              <div style={{ fontWeight:700, color:C.ink, fontSize:"0.88rem" }}>{g.label}</div>
              <div style={{ fontSize:"0.68rem", color:C.gray, marginTop:"0.1rem" }}>{g.words.length} từ</div>
            </div>
            <span style={{ color:C.gray }}>→</span>
          </button>
        ))}
      </div>
    </div>
  );
}

// ── Extra vocab section ────────────────────────────────────
function ExtraVocabView({ onBack }) {
  return (
    <div style={{ padding:"1rem", animation:"fadeUp 0.3s ease" }}>
      <div style={{ display:"flex", alignItems:"center", gap:"0.6rem", marginBottom:"1rem" }}>
        <button onClick={onBack}
          style={{ background:"transparent", border:`1.5px solid ${C.border}`, color:C.gray, padding:"0.2rem 0.65rem", borderRadius:20, fontSize:"0.7rem", cursor:"pointer", fontWeight:600 }}>
          ← Quay lại
        </button>
        <span style={{ fontWeight:700, color:C.ink }}>📝 Từ vựng ngoài Edito</span>
      </div>
      <div style={{ background:C.white, border:`2px dashed ${C.border}`, borderRadius:16, padding:"2rem 1rem", textAlign:"center" }}>
        <div style={{ fontSize:"2rem", marginBottom:"0.5rem" }}>📝</div>
        <div style={{ fontFamily:"'Playfair Display',Georgia,serif", fontSize:"0.95rem", color:C.ink, marginBottom:"0.3rem" }}>Từ vựng ngoài chương trình</div>
        <div style={{ fontSize:"0.75rem", color:C.gray, lineHeight:1.7, marginBottom:"1rem" }}>
          Từ vựng bạn tự thêm sẽ nằm ở module <b>Từ vựng</b> trên trang chủ.<br/>
          Dùng nút <b>✏️ Sửa bộ từ</b> để thêm từ thủ công hoặc dùng AI sinh từ.
        </div>
        <div style={{ display:"flex", flexDirection:"column", gap:"0.5rem", maxWidth:280, margin:"0 auto" }}>
          <div style={{ background:C.blueL, borderRadius:10, padding:"0.6rem 0.85rem", fontSize:"0.78rem", color:C.ink, textAlign:"left" }}>
            💡 Tab <b>Từ vựng</b> → nhập từ → chọn chế độ luyện tập
          </div>
          <div style={{ background:C.blueL, borderRadius:10, padding:"0.6rem 0.85rem", fontSize:"0.78rem", color:C.ink, textAlign:"left" }}>
            🃏 Từ đã học sẽ tự động vào <b>SRS</b> để ôn lại đúng lúc
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Main panel ─────────────────────────────────────────────
export default function EditoVocabPanel() {
  const [activeUnit, setActiveUnit]   = useState(null);
  const [showExtra, setShowExtra]     = useState(false);

  if (showExtra) return <ExtraVocabView onBack={() => setShowExtra(false)} />;

  if (activeUnit) {
    const unit = EDITO_VOCAB_UNITS.find(u => u.id === activeUnit);
    return <UnitDetailView unit={unit} onBack={() => setActiveUnit(null)} />;
  }

  // Unit list
  return (
    <div style={{ padding:"1rem", animation:"fadeUp 0.3s ease" }}>

      {/* Header */}
      <div style={{ marginBottom:"1rem" }}>
        <div style={{ fontFamily:"'Playfair Display',Georgia,serif", fontSize:"1.1rem", color:C.ink, fontWeight:700, marginBottom:"0.2rem" }}>
          📖 Từ vựng Edito A1
        </div>
        <div style={{ fontSize:"0.75rem", color:C.gray }}>
          Chọn Unite để học theo chương trình sách giáo khoa
        </div>
      </div>

      {/* Unit cards */}
      <div style={{ display:"flex", flexDirection:"column", gap:"0.5rem", marginBottom:"0.75rem" }}>
        {EDITO_VOCAB_UNITS.map((unit, i) => {
          const totalWords = unit.groups.reduce((s, g) => s + g.words.length, 0);
          return (
            <button key={unit.id} onClick={() => setActiveUnit(unit.id)}
              style={{ display:"flex", alignItems:"center", gap:"0.85rem", background:C.white, border:`1.5px solid ${unit.color}33`, borderRadius:16, padding:"0.85rem 1rem", cursor:"pointer", textAlign:"left", fontFamily:"inherit", animation:`fadeUp 0.2s ease ${i*0.03}s both`, transition:"all 0.15s", boxShadow:`0 2px 8px ${unit.color}10` }}
              onMouseEnter={e => { e.currentTarget.style.background = unit.bg; e.currentTarget.style.borderColor = unit.color; }}
              onMouseLeave={e => { e.currentTarget.style.background = C.white; e.currentTarget.style.borderColor = `${unit.color}33`; }}>
              <div style={{ background:unit.color, color:"#fff", borderRadius:999, minWidth:32, height:32, display:"flex", alignItems:"center", justifyContent:"center", fontSize:"0.8rem", fontWeight:700, flexShrink:0 }}>
                {unit.num}
              </div>
              <div style={{ flex:1 }}>
                <div style={{ fontWeight:700, color:C.ink, fontSize:"0.88rem" }}>Unité {unit.num}: {unit.title}</div>
                <div style={{ fontSize:"0.67rem", color:C.gray, marginTop:"0.1rem" }}>{unit.groups.length} nhóm · {totalWords} từ</div>
              </div>
              <span style={{ color:C.gray }}>→</span>
            </button>
          );
        })}
      </div>

      {/* Extra vocab button */}
      <button onClick={() => setShowExtra(true)}
        style={{ width:"100%", display:"flex", alignItems:"center", gap:"0.75rem", background:"transparent", border:`2px dashed ${C.border}`, borderRadius:16, padding:"0.75rem 1rem", cursor:"pointer", textAlign:"left", fontFamily:"inherit", transition:"all 0.15s" }}
        onMouseEnter={e => { e.currentTarget.style.borderColor = C.blue; e.currentTarget.style.background = C.blueL; }}
        onMouseLeave={e => { e.currentTarget.style.borderColor = C.border; e.currentTarget.style.background = "transparent"; }}>
        <span style={{ fontSize:"1.3rem" }}>📝</span>
        <div>
          <div style={{ fontWeight:600, color:C.ink, fontSize:"0.85rem" }}>Từ vựng ngoài Edito</div>
          <div style={{ fontSize:"0.68rem", color:C.gray, marginTop:"0.08rem" }}>Từ tự thêm & học tự do</div>
        </div>
        <span style={{ marginLeft:"auto", color:C.gray }}>→</span>
      </button>
    </div>
  );
}
