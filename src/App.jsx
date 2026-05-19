import { useState, useCallback, useEffect } from "react";
import { callAI, callAIBatched, buildPrompt } from "./utils/api.js";
import { loadSets, saveSets, getStreak, markStudiedToday, getProgress, markModuleUsed } from "./utils/storage.js";
import { parseWords } from "./utils/helpers.js";
import { C, DEFAULTS } from "./constants.js";

// Components
import SpeakBtn from "./components/ui/SpeakBtn.jsx";
import Spinner from "./components/ui/Spinner.jsx";
import { SecLabel, QCard, SaveModal, ImportModal } from "./components/ui/SharedUI.jsx";
import { MCSection, FillSection, MatchSection, DicteeSection, FlashcardSection, AnagrammeSection, ExerciseMC, ExerciseFill } from "./components/QuizSections.jsx";
import ConversationPanel from "./components/ConversationPanel.jsx";
import WritingPanel from "./components/WritingPanel.jsx";
import WeakSpotsPanel, { logError } from "./components/WeakSpotsPanel.jsx";
import ConjugaisonPanel from "./components/ConjugaisonPanel.jsx";
import AnalysePanel from "./components/AnalysePanel.jsx";
import GrammarPanel from "./components/GrammarPanel.jsx";
import VocabGenerator, { ExampleCard, EditoPresets, exportFillPDF } from "./components/VocabGenerator.jsx";
import DefiPanel from "./components/DefiPanel.jsx";

// ── Main App ───────────────────────────────────────────────
export default function App() {
  return <AppInner />;
}

function AppInner() {
  const [text, setText] = useState(DEFAULTS);
  const [type, setType] = useState("multiple_choice");
  const [numQ, setNumQ] = useState(8);
  const [quiz, setQuiz] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [view, setView] = useState("input");
  const [sets, setSets] = useState([]);
  const [stats, setStats] = useState({});
  const [showSave, setShowSave] = useState(false);
  const [showImport, setShowImport] = useState(false);
  const [toast, setToast] = useState("");
  const [generatedVocab, setGeneratedVocab] = useState([]);

  const words = parseWords(text);

  useEffect(() => { setSets(loadSets()); }, []);

  const showToast = msg => { setToast(msg); setTimeout(()=>setToast(""),2200); };

  const [wrongAnswers, setWrongAnswers] = useState([]); // [{question, answer, ...}]

  const recordAnswer = useCallback((word, isOk) => {
    setStats(prev => {
      const e = prev[word]||{ok:0,wrong:0};
      return { ...prev, [word]:{ ok:e.ok+(isOk?1:0), wrong:e.wrong+(isOk?0:1) } };
    });
  }, []);

  // Track wrong MC/Fill answers for "retry wrong" feature
  const recordWrong = useCallback((q) => {
    setWrongAnswers(prev => {
      const exists = prev.find(x => x.question===q.question);
      return exists ? prev : [...prev, q];
    });
  }, []);

  const CLIENT_TYPES = ["dictee","flashcard","anagramme"];

  const addMoreQuestions = async () => {
    if (!quiz || CLIENT_TYPES.includes(type)) return;
    setLoading(true);
    try {
      const more = await callAI(buildPrompt(quiz.type, words, 5));
      if (quiz.type==="multiple_choice") setQuiz(q=>({...q, questions:[...q.questions,...(more.questions||[])]}));
      else if (quiz.type==="fill_blank") setQuiz(q=>({...q, questions:[...q.questions,...(more.questions||[])]}));
      else if (quiz.type==="mixed") setQuiz(q=>({...q, sections: q.sections.map(sec=>{
        const newSec = more.sections?.find(s=>s.sectionType===sec.sectionType);
        if (!newSec || sec.sectionType==="matching") return sec;
        return {...sec, questions:[...sec.questions,...(newSec.questions||[])]};
      })}));
      showToast("✓ Đã thêm câu hỏi!");
    } catch(e) { showToast("⚠ "+e.message); }
    setLoading(false);
  };

  const retryWrong = async () => {
    if (wrongAnswers.length===0) { showToast("Chưa có câu sai!"); return; }
    setLoading(true);
    try {
      // Extract wrong words and build new quiz targeting them
      const wrongWords = wrongAnswers.map(q => {
        // Try to find the word from the question text or answer
        const found = words.find(w => q.question?.includes(w.fr) || q.question?.includes(w.vi) || q.answer?.includes(w.fr));
        return found || { fr: q.answer||"", vi:"" };
      }).filter(w=>w.fr);
      const targetWords = wrongWords.length>=2 ? wrongWords : words;
      const newQuiz = await callAI(buildPrompt(quiz.type==="matching"?"multiple_choice":quiz.type, targetWords, Math.max(wrongAnswers.length, 3)));
      setQuiz(newQuiz);
      setWrongAnswers([]);
      showToast(`✓ Ôn lại ${wrongAnswers.length} câu sai!`);
    } catch(e) { showToast("⚠ "+e.message); }
    setLoading(false);
  };

  const generate = useCallback(async () => {
    if (words.length < 2) { setError("Cần ít nhất 2 từ!"); return; }
    if (CLIENT_TYPES.includes(type)) { setQuiz({ type, words }); setView("quiz"); return; }
    if (words.length < 3) { setError("Cần ít nhất 3 từ!"); return; }
    setLoading(true); setError(null); setQuiz(null); setView("quiz");
    try { setQuiz(await callAIBatched(type, words, numQ)); }
    catch(e) { setError(e.message); setView("input"); }
    setLoading(false);
  }, [words, type, numQ]);

  const handleSave = async name => {
    const newSet = { id: Date.now(), name, text, count: words.length, date: new Date().toLocaleDateString("vi-VN") };
    const updated = [newSet, ...sets];
    setSets(updated); await saveSets(updated);
    setShowSave(false); showToast("✓ Đã lưu bộ từ!");
  };

  function renderQuiz() {
    if (!quiz) return null;
    if (quiz.type==="multiple_choice") return <MCSection questions={quiz.questions} onRecord={recordAnswer} onWrong={recordWrong} />;
    if (quiz.type==="fill_blank") return <FillSection questions={quiz.questions} onRecord={recordAnswer} onWrong={recordWrong} />;
    if (quiz.type==="matching") return <MatchSection pairs={quiz.pairs} />;
    if (quiz.type==="dictee") return <DicteeSection words={quiz.words} onRecord={recordAnswer} />;
    if (quiz.type==="flashcard") return <FlashcardSection words={quiz.words} onRecord={recordAnswer} />;
    if (quiz.type==="anagramme") return <AnagrammeSection words={quiz.words} onRecord={recordAnswer} />;
    if (quiz.type==="mixed") return quiz.sections.map((sec,i)=>(
      <div key={i}>
        {sec.sectionType==="multiple_choice"&&<MCSection questions={sec.questions} sl onRecord={recordAnswer} onWrong={recordWrong}/>}
        {sec.sectionType==="fill_blank"&&<FillSection questions={sec.questions} sl onRecord={recordAnswer} onWrong={recordWrong}/>}
        {sec.sectionType==="matching"&&<MatchSection pairs={sec.pairs} sl/>}
      </div>
    ));
    return null;
  }

  const TYPE_NAMES = { multiple_choice:"Trắc nghiệm", fill_blank:"Điền từ", matching:"Nối từ", dictee:"Dictée", flashcard:"Flashcard", anagramme:"Anagramme", mixed:"Hỗn hợp" };
  const hasFill = quiz && (quiz.type==="fill_blank"||(quiz.type==="mixed"&&quiz.sections?.some(s=>s.sectionType==="fill_blank")));
  const [section, setSection] = useState("home");
  const [onboarded, setOnboarded] = useState(() => !!localStorage.getItem("onboarded"));
  const [streakData, setStreakData] = useState(getStreak);
  const [progress, setProgress] = useState(getProgress);

  const goSection = (s, v) => {
    setSection(s); setView(v||s);
    markModuleUsed(s);
    setStreakData(getStreak());
    setProgress(getProgress());
  };

  const navBtn = (label, target, show=true) => show && (
    <button onClick={()=>setView(target)}
      style={{ padding:"0.22rem 0.58rem", background:view===target?C.purple:"transparent", border:`1px solid ${C.purple}`, color:view===target?C.white:C.purple, borderRadius:20, fontSize:"0.63rem", cursor:"pointer", fontWeight:view===target?600:400, whiteSpace:"nowrap" }}>
      {label}
    </button>
  );

  // ── Module definitions ──
  const MODULES = [
    { id:"vocab",       label:"Le Vocabulaire",     short:"Từ vựng",      icon:"📚", num:"01", color:C.gold,      view:"input",        tags:["Trắc nghiệm","Flashcard","Dictée"] },
    { id:"grammar",     label:"La Grammaire",       short:"Ngữ pháp",     icon:"🧩", num:"02", color:C.purple,    view:"grammar",      tags:["A1","A2","B1","B2"] },
    { id:"conjugaison", label:"La Conjugaison",     short:"Chia động từ", icon:"📖", num:"03", color:"#16a085",   view:"conjugaison",  tags:["être","avoir","aller","faire"] },
    { id:"conversation",label:"La Conversation",    short:"Hội thoại",    icon:"💬", num:"04", color:"#2980b9",   view:"conversation", tags:["Chào hỏi","Mua sắm","Quán cà phê"] },
    { id:"writing",     label:"L'Écriture",         short:"Viết câu",     icon:"✍️", num:"05", color:"#e67e22",   view:"writing",      tags:["Chấm điểm","Sửa lỗi"] },
    { id:"weakspots",   label:"Les Points Faibles", short:"Điểm yếu",     icon:"🎯", num:"06", color:C.red,       view:"weakspots",    tags:["Mạo từ","Giới từ","Chia động từ"] },
    { id:"analyse",     label:"L'Analyse",          short:"Phân tích",    icon:"🔍", num:"07", color:C.green,     view:"analyse",      tags:["Từ vựng","Ngữ pháp","Bản dịch"] },
    { id:"defi",        label:"Le Défi du Jour",    short:"Thử thách",    icon:"🎲", num:"08", color:"#8e44ad",   view:"defi",         tags:["Mỗi ngày","Mini-quiz","Bất ngờ"] },
  ];

  // Bottom tab items
  const TABS = [
    { id:"home",        icon:"🏠", label:"Trang chủ" },
    { id:"vocab",       icon:"📚", label:"Từ vựng" },
    { id:"defi",        icon:"🎲", label:"Thử thách" },
    { id:"conjugaison", icon:"📖", label:"Chia động từ" },
    { id:"more",        icon:"⋯",  label:"Thêm" },
  ];
  const [showMore, setShowMore] = useState(false);

  const SECTION_TITLE = { vocab:"Le Vocabulaire", grammar:"La Grammaire", conversation:"La Conversation", writing:"L'Écriture", weakspots:"Les Points Faibles", conjugaison:"La Conjugaison", analyse:"L'Analyse", defi:"Le Défi du Jour" };

  return (
    <div style={{ fontFamily:"-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif", background:C.paper, minHeight:"100vh", color:C.ink, paddingBottom: section!=="home" ? 60 : 0 }}>
      <style>{`
        @keyframes spin{to{transform:rotate(360deg)}}
        @keyframes fadeUp{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:translateY(0)}}
        @keyframes slideUp{from{opacity:0;transform:translateY(100%)}to{opacity:1;transform:translateY(0)}}
        * { -webkit-tap-highlight-color: transparent; }
      `}</style>

      {/* Toast */}
      {toast && <div style={{ position:"fixed", top:16, left:"50%", transform:"translateX(-50%)", background:C.ink, color:C.paper, padding:"0.5rem 1rem", borderRadius:20, fontSize:"0.8rem", zIndex:300, whiteSpace:"nowrap" }}>{toast}</div>}

      {/* Modals */}
      {showSave && <SaveModal text={text} onSave={handleSave} onClose={()=>setShowSave(false)} />}
      {showImport && <ImportModal onImport={t=>{setText(t);showToast("✓ Import thành công!");}} onClose={()=>setShowImport(false)} />}

      {/* More drawer */}
      {showMore && (
        <div style={{ position:"fixed", inset:0, zIndex:200 }} onClick={()=>setShowMore(false)}>
          <div style={{ position:"absolute", bottom:60, left:0, right:0, background:C.white, borderRadius:"20px 20px 0 0", padding:"1.2rem 1rem", boxShadow:"0 -8px 32px rgba(0,0,0,0.12)", animation:"slideUp 0.25s ease" }}
            onClick={e=>e.stopPropagation()}>
            <div style={{ width:36, height:4, background:C.border, borderRadius:2, margin:"0 auto 1rem" }} />
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"0.6rem" }}>
              {[
                { id:"conversation", icon:"💬", label:"Hội thoại",  color:"#2980b9" },
                { id:"writing",      icon:"✍️", label:"Viết câu",   color:"#e67e22" },
                { id:"weakspots",    icon:"🎯", label:"Điểm yếu",   color:C.red },
                { id:"analyse",      icon:"🔍", label:"Phân tích",  color:C.green },
                { id:"grammar",      icon:"🧩", label:"Ngữ pháp",   color:C.purple },
              ].map(m => {
                const p = progress[m.id];
                return (
                  <button key={m.id} onClick={()=>{ setShowMore(false); goSection(m.id); }}
                    style={{ background:C.white, border:`1.5px solid ${C.border}`, borderRadius:14, padding:"0.85rem", textAlign:"left", cursor:"pointer", fontFamily:"inherit", boxShadow:"0 1px 4px rgba(0,0,0,0.05)" }}>
                    <div style={{ fontSize:"1.4rem", marginBottom:"0.3rem" }}>{m.icon}</div>
                    <div style={{ fontSize:"0.82rem", color:C.ink, fontWeight:600 }}>{m.label}</div>
                    {p && <div style={{ fontSize:"0.65rem", color:C.gray, marginTop:"0.15rem" }}>{p.count} lần dùng</div>}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* ── ONBOARDING ── */}
      {!onboarded && section==="home" && (
        <div style={{ position:"fixed", inset:0, background:"rgba(0,0,0,0.7)", zIndex:250, display:"flex", alignItems:"flex-end", justifyContent:"center" }}>
          <div style={{ background:C.white, borderRadius:"20px 20px 0 0", padding:"1.5rem 1.25rem 2rem", width:"100%", maxWidth:480, animation:"slideUp 0.3s ease" }}>
            <div style={{ fontFamily:"Georgia,serif", fontSize:"1.3rem", color:C.ink, marginBottom:"0.4rem" }}>Bắt đầu từ đây 👋</div>
            <div style={{ fontSize:"0.8rem", color:C.gray, lineHeight:1.7, marginBottom:"1.2rem" }}>
              App có 7 module học tiếng Pháp. Nếu bạn đang học <b>Edito A1</b>, mình gợi ý thứ tự này:
            </div>
            {[
              { icon:"📚", step:"1", text:"Le Vocabulaire — nhập từ bài học, luyện flashcard" },
              { icon:"📖", step:"2", text:"La Conjugaison — tra bảng chia động từ ngay khi cần" },
              { icon:"✍️", step:"3", text:"L'Écriture — viết câu, AI sửa lỗi cho bạn" },
              { icon:"💬", step:"4", text:"La Conversation — roleplay tình huống thực tế" },
            ].map((s,i) => (
              <div key={i} style={{ display:"flex", gap:"0.75rem", alignItems:"flex-start", marginBottom:"0.65rem" }}>
                <div style={{ width:26, height:26, background:C.purple, borderRadius:"50%", display:"flex", alignItems:"center", justifyContent:"center", fontSize:"0.65rem", color:C.white, fontWeight:700, flexShrink:0 }}>{s.step}</div>
                <div style={{ fontSize:"0.8rem", color:C.ink, lineHeight:1.5 }}><span style={{ marginRight:"0.3rem" }}>{s.icon}</span>{s.text}</div>
              </div>
            ))}
            <button onClick={()=>{ localStorage.setItem("onboarded","1"); setOnboarded(true); }}
              style={{ marginTop:"0.8rem", width:"100%", padding:"0.85rem", background:C.purple, color:C.white, border:"none", borderRadius:12, fontFamily:"Georgia,serif", fontSize:"1rem", cursor:"pointer" }}>
              Bắt đầu học ✦
            </button>
          </div>
        </div>
      )}

      {/* ── HOMEPAGE ── */}
      {section==="home" && (
        <div style={{ minHeight:"100vh", background:C.paper, display:"flex", flexDirection:"column" }}>
          {/* Hero */}
          <div style={{ padding:"3rem 1.25rem 1.5rem", textAlign:"center" }}>
            <div style={{ fontSize:"0.68rem", color:C.purple, letterSpacing:"0.18em", textTransform:"uppercase", marginBottom:"0.5rem", fontWeight:600 }}>BIENVENUE</div>
            <div style={{ fontFamily:"Georgia,serif", fontSize:"2.2rem", color:C.ink, lineHeight:1.1, fontWeight:700 }}>Français</div>
            <div style={{ width:40, height:3, background:C.purple, borderRadius:2, margin:"0.7rem auto" }} />

            {/* Streak banner */}
            <div style={{ display:"inline-flex", alignItems:"center", gap:"0.5rem", background:C.white, border:`1.5px solid ${C.border}`, borderRadius:24, padding:"0.4rem 1rem", marginTop:"0.5rem", boxShadow:"0 2px 12px rgba(0,0,0,0.08)" }}>
              <span style={{ fontSize:"1rem" }}>{streakData.streak > 0 ? "🔥" : "📅"}</span>
              <span style={{ fontSize:"0.78rem", color: streakData.streak > 0 ? C.gold : C.gray }}>
                {streakData.streak > 0 ? `${streakData.streak} ngày liên tiếp` : "Chưa học hôm nay"}
              </span>
              {streakData.studiedToday && <span style={{ fontSize:"0.65rem", background:C.green, color:C.white, borderRadius:20, padding:"0.1rem 0.4rem" }}>✓ Hôm nay</span>}
            </div>
          </div>

          {/* Module grid */}
          <div style={{ padding:"0.5rem 1rem 1.5rem", display:"grid", gridTemplateColumns:"1fr 1fr", gap:"0.75rem", flex:1 }}>
            {MODULES.map(m => {
              const p = progress[m.id];
              const used = p?.count > 0;
              return (
                <button key={m.id} onClick={()=>goSection(m.id, m.view)}
                  style={{ background:C.white, border:`1.5px solid ${C.border}`, borderRadius:18, padding:"1.1rem 1rem", textAlign:"left", cursor:"pointer", fontFamily:"inherit", transition:"all 0.2s", position:"relative", boxShadow:"0 1px 4px rgba(0,0,0,0.06), 0 4px 12px rgba(0,0,0,0.04)" }}
                  onMouseEnter={e=>{ e.currentTarget.style.boxShadow=`0 4px 20px rgba(0,0,0,0.1)`; e.currentTarget.style.transform="translateY(-2px)"; e.currentTarget.style.borderColor=m.color; }}
                  onMouseLeave={e=>{ e.currentTarget.style.boxShadow="0 1px 4px rgba(0,0,0,0.06), 0 4px 12px rgba(0,0,0,0.04)"; e.currentTarget.style.transform="translateY(0)"; e.currentTarget.style.borderColor=C.border; }}>
                  {/* Used badge */}
                  {used && <div style={{ position:"absolute", top:8, right:8, width:8, height:8, borderRadius:"50%", background:m.color, opacity:0.8 }} />}
                  <div style={{ fontSize:"1.6rem", marginBottom:"0.5rem" }}>{m.icon}</div>
                  <div style={{ display:"inline-block", fontSize:"0.58rem", color:m.color, background:m.color+"18", letterSpacing:"0.1em", textTransform:"uppercase", marginBottom:"0.35rem", fontWeight:700, padding:"0.12rem 0.45rem", borderRadius:20 }}>Module {m.num}</div>
                  <div style={{ fontFamily:"Georgia,serif", fontSize:"1rem", color:C.ink, lineHeight:1.2, marginBottom:"0.3rem", fontWeight:600 }}>{m.label}</div>
                  <div style={{ display:"flex", gap:"0.25rem", flexWrap:"wrap" }}>{m.tags.slice(0,2).map((t,i)=><span key={i} style={{ fontSize:"0.62rem", color:C.gray, background:C.cream, padding:"0.1rem 0.4rem", borderRadius:20, border:`1px solid ${C.border}` }}>{t}</span>)}</div>
                  {used && <div style={{ fontSize:"0.62rem", color:m.color, marginTop:"0.3rem", opacity:0.7 }}>{p.count} lần dùng</div>}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* ── APP SHELL ── */}
      {section!=="home" && (
        <>
          {/* Header */}
          <div style={{ background:C.white, color:C.ink, padding:"0.75rem 1rem", display:"flex", alignItems:"center", gap:"0.5rem", borderBottom:`1px solid ${C.border}`, position:"sticky", top:0, zIndex:100, boxShadow:"0 1px 0 ${C.border}" }}>
            <button onClick={()=>setSection("home")} style={{ background:C.cream, border:`1px solid ${C.border}`, color:C.ink, cursor:"pointer", fontSize:"0.85rem", padding:"0.25rem 0.55rem", lineHeight:1, borderRadius:8, fontWeight:500 }}>← Về</button>
            <span style={{ fontFamily:"Georgia,serif", fontSize:"1rem", marginRight:"auto" }}>
              {SECTION_TITLE[section] || section}
            </span>

            {section==="vocab" && <div style={{ display:"flex", gap:"0.3rem", flexWrap:"wrap" }}>
              {navBtn("✏️","input")}
              {navBtn("📂","history")}
              {navBtn("📊","stats")}
              {generatedVocab.length>0 && navBtn("📋","vocab-table")}
              {words.length>0 && navBtn("💬","examples")}
              {(quiz||loading) && navBtn("🎯","quiz")}
            </div>}
            {section==="grammar" && navBtn("🧩 Bài tập","grammar")}
            {section==="conjugaison" && navBtn("📖 Conjugaison","conjugaison")}
            {section==="conversation" && navBtn("💬 Hội thoại","conversation")}
            {section==="writing" && navBtn("✍️ Viết câu","writing")}
            {section==="weakspots" && navBtn("🎯 Điểm yếu","weakspots")}
            {section==="analyse" && navBtn("🔍 Phân tích","analyse")}
            {section==="defi" && navBtn("🎲 Thử thách","defi")}
          </div>

          {/* Content */}
          <div style={{ minHeight:"calc(100vh - 116px)", background:C.paper }}>
            {/* ── INPUT ── */}
            {view==="input" && (
              <div style={{ background:C.paper, padding:"1rem", display:"flex", flexDirection:"column", gap:"0.75rem" }}>
                <EditoPresets onLoad={u => { setText(u.words); showToast(`✓ Đã load ${u.title}!`); }} />
                <VocabGenerator onGenerate={generated => {
                  const lines = generated.map(w => `${w.fr} — ${w.vi}`).join("\n");
                  setText(lines); setView("vocab-table"); setGeneratedVocab(generated);
                }} />
                <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
                  <div style={{ fontSize:"0.72rem", fontWeight:600, color:C.purple }}>📝 Nhập từ vựng</div>
                  <div style={{ display:"flex", gap:"0.4rem" }}>
                    <button onClick={()=>setShowImport(true)} style={{ padding:"0.22rem 0.6rem", background:"transparent", border:`1px solid ${C.border}`, color:C.gray, borderRadius:20, fontSize:"0.65rem", cursor:"pointer" }}>📁 Import</button>
                    {words.length>=3 && <button onClick={()=>setShowSave(true)} style={{ padding:"0.22rem 0.6rem", background:"transparent", border:`1px solid ${C.purple}`, color:C.purple, borderRadius:20, fontSize:"0.65rem", cursor:"pointer" }}>💾 Lưu</button>}
                  </div>
                </div>
                <textarea value={text} onChange={e=>setText(e.target.value)}
                  placeholder={"la boulangerie — tiệm bánh mì\nle marché — chợ\n..."}
                  style={{ width:"100%", height:145, border:`1.5px solid ${C.border}`, borderRadius:8, padding:"0.58rem", fontFamily:"inherit", fontSize:"0.85rem", background:C.white, resize:"vertical", color:C.ink, lineHeight:1.6, outline:"none", boxSizing:"border-box" }} />
                <div style={{ fontSize:"0.7rem", color:C.gray }}>
                  Mỗi dòng: <code style={{ background:C.border, padding:"1px 4px", borderRadius:3 }}>từ pháp — nghĩa</code>
                  {words.length>0 && <span style={{ color:C.purple, marginLeft:6 }}>{words.length} từ</span>}
                </div>
                {words.length>0 && <div style={{ display:"flex", flexWrap:"wrap", gap:"0.25rem" }}>
                  {words.slice(0,8).map((w,i)=><span key={i} style={{ background:C.white, border:`1px solid ${C.border}`, borderRadius:20, padding:"0.09rem 0.44rem", fontSize:"0.7rem", color:C.purple }}>{w.fr}</span>)}
                  {words.length>8 && <span style={{ background:C.white, border:`1px solid ${C.border}`, borderRadius:20, padding:"0.09rem 0.44rem", fontSize:"0.7rem", color:C.gray }}>+{words.length-8}</span>}
                </div>}
                <div>
                  <div style={{ fontSize:"0.72rem", fontWeight:600, color:C.purple, marginBottom:"0.35rem" }}>🎯 Dạng bài tập</div>
                  <div style={{ fontSize:"0.68rem", color:C.gray, textTransform:"uppercase", letterSpacing:1, marginBottom:"0.28rem" }}>Chọn đáp án</div>
                  <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"0.28rem", marginBottom:"0.5rem" }}>
                    {[{id:"multiple_choice",label:"☑ Trắc nghiệm"},{id:"matching",label:"🔗 Nối từ"},{id:"flashcard",label:"🃏 Flashcard"},{id:"mixed",label:"🎲 Hỗn hợp"}].map(t=>(
                      <button key={t.id} onClick={()=>setType(t.id)} style={{ padding:"0.42rem 0.3rem", border:`1.5px solid ${type===t.id?C.purple:C.border}`, borderRadius:8, background:type===t.id?C.purple:C.white, color:type===t.id?C.white:C.ink, fontSize:"0.78rem", cursor:"pointer", fontFamily:"inherit", transition:"all 0.15s" }}>{t.label}</button>
                    ))}
                  </div>
                  <div style={{ fontSize:"0.68rem", color:C.gray, textTransform:"uppercase", letterSpacing:1, marginBottom:"0.28rem" }}>Điền / Viết từ</div>
                  <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:"0.28rem" }}>
                    {[{id:"fill_blank",label:"✏️ Điền từ"},{id:"dictee",label:"🎧 Dictée"},{id:"anagramme",label:"🔀 Anagramme"}].map(t=>(
                      <button key={t.id} onClick={()=>setType(t.id)} style={{ padding:"0.42rem 0.3rem", border:`1.5px solid ${type===t.id?C.purple:C.border}`, borderRadius:8, background:type===t.id?C.purple:C.white, color:type===t.id?C.white:C.ink, fontSize:"0.78rem", cursor:"pointer", fontFamily:"inherit", transition:"all 0.15s" }}>{t.label}</button>
                    ))}
                  </div>
                </div>
                {!["matching","dictee","flashcard","anagramme"].includes(type) && (
                  <div>
                    <div style={{ fontSize:"0.72rem", fontWeight:600, color:C.purple, marginBottom:"0.35rem" }}>🔢 Số câu hỏi</div>
                    <div style={{ display:"flex", alignItems:"center", gap:"0.5rem" }}>
                      <input type="range" min={3} max={30} value={numQ} onChange={e=>setNumQ(Number(e.target.value))} style={{ flex:1, accentColor:C.purple }} />
                      <div style={{ minWidth:32, textAlign:"center", fontFamily:"Georgia,serif", fontSize:"1rem", color:C.purple, fontWeight:600 }}>{numQ}</div>
                    </div>
                    {numQ>words.length && words.length>0 && <div style={{ fontSize:"0.7rem", color:C.gold, marginTop:"0.2rem" }}>💡 AI sẽ dùng lại từ theo nhiều cách</div>}
                  </div>
                )}
                {error && <div style={{ color:C.red, fontSize:"0.78rem", padding:"0.38rem 0.58rem", background:"#fde8e6", borderRadius:6 }}>⚠ {error}</div>}
                <button onClick={generate} disabled={loading||words.length<2}
                  style={{ width:"100%", padding:"0.8rem", background:words.length<2?C.border:C.purple, color:C.white, border:"none", borderRadius:12, fontFamily:"Georgia,serif", fontSize:"0.93rem", cursor:words.length<2?"not-allowed":"pointer", fontWeight:600, boxShadow:words.length>=2?"0 4px 12px rgba(91,79,207,0.3)":"none" }}>
                  {loading?"Đang tạo...":"Tạo bài tập ✦"}
                </button>
              </div>
            )}

            {/* ── HISTORY ── */}
            {view==="history" && (
              <div style={{ padding:"1rem", background:C.paper, minHeight:"100%" }}>
                <div style={{ fontSize:"0.75rem", fontWeight:600, color:C.purple, marginBottom:"0.7rem" }}>📂 Bộ từ đã lưu</div>
                {sets.length===0
                  ? <div style={{ textAlign:"center", color:C.gray, fontSize:"0.88rem", padding:"2rem", lineHeight:1.8 }}>Chưa có bộ từ nào.<br/>Nhập từ vựng và nhấn 💾 Lưu!</div>
                  : sets.map(s=>(
                    <div key={s.id} style={{ background:C.white, border:`1.5px solid ${C.border}`, borderRadius:12, padding:"0.8rem 1rem", marginBottom:"0.55rem" }}>
                      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start" }}>
                        <div>
                          <div style={{ fontFamily:"Georgia,serif", fontSize:"0.95rem", color:C.ink, marginBottom:"0.2rem" }}>{s.name}</div>
                          <div style={{ fontSize:"0.72rem", color:C.gray }}>{s.count} từ · {s.date}</div>
                        </div>
                        <div style={{ display:"flex", gap:"0.35rem" }}>
                          <button onClick={()=>{setText(s.text);setView("input");showToast("✓ Đã load!");}}
                            style={{ padding:"0.28rem 0.65rem", background:C.purple, color:C.white, border:"none", borderRadius:6, fontSize:"0.72rem", cursor:"pointer" }}>Ôn lại</button>
                          <button onClick={async()=>{const u=sets.filter(x=>x.id!==s.id);setSets(u);await saveSets(u);}}
                            style={{ padding:"0.28rem 0.5rem", background:"transparent", color:C.gray, border:`1px solid ${C.border}`, borderRadius:6, fontSize:"0.72rem", cursor:"pointer" }}>🗑</button>
                        </div>
                      </div>
                    </div>
                  ))
                }
              </div>
            )}

            {/* ── STATS ── */}
            {view==="stats" && (() => {
              const entries = Object.entries(stats)
                .map(([word,s])=>({ word, ...s, total:s.ok+s.wrong, rate:s.ok+s.wrong>0?Math.round(s.ok/(s.ok+s.wrong)*100):0 }))
                .sort((a,b)=>a.rate-b.rate);
              const weak = entries.filter(e=>e.rate<80);
              const mastered = entries.filter(e=>e.rate>=80);
              const weakWords = weak.map(e=>{ const w=words.find(x=>x.fr===e.word); return w?`${w.fr}${w.vi?" — "+w.vi:""}`:e.word; });
              const WordPill = ({ e, isWeak }) => {
                const vi = words.find(w=>w.fr===e.word)?.vi||"";
                return (
                  <div style={{ background:C.white, border:`1px solid ${isWeak?C.red+"44":C.border}`, borderRadius:8, padding:"0.45rem 0.6rem", marginBottom:"0.35rem" }}>
                    <div style={{ fontFamily:"Georgia,serif", fontSize:"0.85rem" }}>{e.word}</div>
                    {vi && <div style={{ fontSize:"0.67rem", color:C.gray }}>{vi}</div>}
                    <div style={{ display:"flex", gap:"0.4rem", alignItems:"center", marginTop:"0.28rem" }}>
                      <div style={{ flex:1, height:3, background:C.border, borderRadius:2 }}>
                        <div style={{ height:"100%", width:`${e.rate}%`, background:isWeak?(e.rate>=50?C.gold:C.red):C.green, borderRadius:2 }} />
                      </div>
                      <span style={{ fontSize:"0.65rem", color:isWeak?C.red:C.green, fontWeight:600, minWidth:28 }}>{e.rate}%</span>
                    </div>
                  </div>
                );
              };
              return (
                <div style={{ padding:"1rem" }}>
                  <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:"0.75rem" }}>
                    <div style={{ fontSize:"0.75rem", fontWeight:600, color:C.purple }}>📊 Thống kê</div>
                    <div style={{ display:"flex", gap:"0.4rem" }}>
                      {weakWords.length>0 && <button onClick={()=>{setText(weakWords.join("\n"));setQuiz(null);setView("input");showToast("✓ Đã load từ yếu!");}} style={{ padding:"0.22rem 0.65rem", background:C.purple, color:C.white, border:"none", borderRadius:20, fontSize:"0.65rem", cursor:"pointer" }}>🎯 Ôn từ yếu ({weak.length})</button>}
                      {entries.length>0 && <button onClick={()=>{setStats({});showToast("✓ Đã xóa");}} style={{ padding:"0.22rem 0.55rem", background:"transparent", color:C.gray, border:`1px solid ${C.border}`, borderRadius:20, fontSize:"0.65rem", cursor:"pointer" }}>🗑</button>}
                    </div>
                  </div>
                  {entries.length===0
                    ? <div style={{ textAlign:"center", color:C.gray, fontSize:"0.88rem", padding:"3rem 1rem", lineHeight:1.8 }}>Chưa có dữ liệu.<br/>Làm bài tập để bắt đầu theo dõi!</div>
                    : <>
                        <div style={{ display:"flex", gap:"0.5rem", marginBottom:"0.85rem" }}>
                          {[{label:"Tổng từ",val:entries.length,color:C.purple},{label:"Từ yếu",val:weak.length,color:C.red},{label:"Thành thạo",val:mastered.length,color:C.green}].map((item,i)=>(
                            <div key={i} style={{ flex:1, background:C.white, border:`1.5px solid ${C.border}`, borderRadius:10, padding:"0.5rem 0.3rem", textAlign:"center" }}>
                              <div style={{ fontFamily:"Georgia,serif", fontSize:"1.2rem", color:item.color, fontWeight:600 }}>{item.val}</div>
                              <div style={{ fontSize:"0.65rem", color:C.gray }}>{item.label}</div>
                            </div>
                          ))}
                        </div>
                        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"0.75rem" }}>
                          <div>
                            <div style={{ fontSize:"0.65rem", textTransform:"uppercase", letterSpacing:1, color:C.red, marginBottom:"0.4rem", fontWeight:600 }}>✗ Từ yếu ({weak.length})</div>
                            {weak.length===0?<div style={{ fontSize:"0.78rem", color:C.gray, fontStyle:"italic" }}>Không có 🎉</div>:weak.map((e,i)=><WordPill key={i} e={e} isWeak={true}/>)}
                          </div>
                          <div>
                            <div style={{ fontSize:"0.65rem", textTransform:"uppercase", letterSpacing:1, color:C.green, marginBottom:"0.4rem", fontWeight:600 }}>✓ Thành thạo ({mastered.length})</div>
                            {mastered.length===0?<div style={{ fontSize:"0.78rem", color:C.gray, fontStyle:"italic" }}>Chưa có</div>:mastered.map((e,i)=><WordPill key={i} e={e} isWeak={false}/>)}
                          </div>
                        </div>
                      </>
                  }
                </div>
              );
            })()}

            {/* ── GRAMMAR ── */}
            {view==="grammar" && <GrammarPanel />}
            {/* ── ANALYSE ── */}
            {view==="analyse" && <AnalysePanel />}
            {/* ── VOCAB TABLE ── */}
            {view==="vocab-table" && generatedVocab.length>0 && (
              <div style={{ padding:"1rem" }}>
                <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:"0.8rem" }}>
                  <div style={{ fontFamily:"Georgia,serif", fontSize:"1rem", color:C.purple }}>✨ {generatedVocab.length} từ vựng</div>
                  <button onClick={()=>setView("input")} style={{ padding:"0.22rem 0.65rem", background:C.purple, color:C.white, border:"none", borderRadius:20, fontSize:"0.65rem", cursor:"pointer" }}>📝 Luyện tập →</button>
                </div>
                <div style={{ display:"grid", gridTemplateColumns:"1.2fr 1fr 0.8fr 1.6fr", gap:"0.3rem", marginBottom:"0.3rem", padding:"0.4rem 0.6rem" }}>
                  {["Giống đực","Giống cái","Nghĩa","Ví dụ"].map((h,i)=>(
                    <div key={i} style={{ fontSize:"0.62rem", textTransform:"uppercase", letterSpacing:1, color:C.gray, fontWeight:600 }}>{h}</div>
                  ))}
                </div>
                {generatedVocab.map((w, i) => (
                  <div key={i} style={{ display:"grid", gridTemplateColumns:"1.2fr 1fr 0.8fr 1.6fr", gap:"0.3rem", background:i%2===0?C.white:C.cream, borderRadius:8, padding:"0.55rem 0.6rem", marginBottom:"0.25rem", alignItems:"start" }}>
                    <div>
                      <div style={{ fontFamily:"Georgia,serif", fontSize:"0.88rem", color:C.ink, fontWeight:600, display:"flex", alignItems:"center", gap:"0.2rem" }}>{w.fr} <SpeakBtn text={w.fr} /></div>
                      {w.gender && <div style={{ fontSize:"0.65rem", color:C.purple, fontStyle:"italic" }}>{w.gender}</div>}
                    </div>
                    <div>
                      {w.fr_f ? <><div style={{ fontFamily:"Georgia,serif", fontSize:"0.88rem", color:C.purple }}>{w.fr_f}</div><div style={{ fontSize:"0.65rem", color:C.purple, fontStyle:"italic" }}>f.</div></> : <div style={{ fontSize:"0.72rem", color:C.border, fontStyle:"italic" }}>—</div>}
                    </div>
                    <div style={{ fontSize:"0.8rem", color:C.ink }}>{w.vi}</div>
                    <div>
                      <div style={{ fontSize:"0.75rem", color:C.ink, fontStyle:"italic", lineHeight:1.4 }}>{w.example_fr}</div>
                      <div style={{ fontSize:"0.68rem", color:C.gray, marginTop:"0.15rem" }}>→ {w.example_vi}</div>
                    </div>
                  </div>
                ))}
              </div>
            )}
            {/* ── EXAMPLES ── */}
            {view==="examples" && (
              <div style={{ padding:"1rem" }}>
                <div style={{ fontSize:"0.75rem", fontWeight:600, color:C.purple, marginBottom:"0.7rem" }}>💬 Tạo câu ví dụ & phân tích</div>
                {words.map((w,i)=><ExampleCard key={i} word={w}/>)}
              </div>
            )}
            {/* ── QUIZ ── */}
            {view==="quiz" && (
              <div style={{ padding:"1rem" }}>
                {loading
                  ? <div style={{ display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", height:200, gap:"0.7rem", color:C.gray }}><Spinner/><span style={{ fontSize:"0.85rem" }}>AI đang tạo bài tập...</span></div>
                  : quiz ? <>
                      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:"0.8rem", flexWrap:"wrap", gap:"0.4rem" }}>
                        <span style={{ background:C.purple, color:C.white, fontSize:"0.62rem", padding:"0.16rem 0.52rem", borderRadius:20, textTransform:"uppercase", letterSpacing:0.5 }}>{TYPE_NAMES[quiz.type]||quiz.type}</span>
                        <div style={{ display:"flex", gap:"0.4rem", flexWrap:"wrap" }}>
                          {hasFill && <button onClick={()=>exportFillPDF(quiz)} style={{ padding:"0.23rem 0.6rem", border:`1.5px solid ${C.purple}`, borderRadius:20, background:C.white, color:C.purple, fontSize:"0.68rem", cursor:"pointer" }}>📄 PDF</button>}
                          {!CLIENT_TYPES.includes(quiz.type) && <button onClick={addMoreQuestions} disabled={loading} style={{ padding:"0.23rem 0.6rem", border:`1.5px solid ${C.green}`, borderRadius:20, background:C.white, color:C.green, fontSize:"0.68rem", cursor:"pointer" }}>➕ Thêm</button>}
                          {wrongAnswers.length>0 && !CLIENT_TYPES.includes(quiz.type) && <button onClick={retryWrong} disabled={loading} style={{ padding:"0.23rem 0.6rem", border:`1.5px solid ${C.red}`, borderRadius:20, background:C.white, color:C.red, fontSize:"0.68rem", cursor:"pointer" }}>🔁 Ôn sai ({wrongAnswers.length})</button>}
                          <button onClick={()=>{setWrongAnswers([]);generate();}} style={{ padding:"0.23rem 0.6rem", border:`1.5px solid ${C.border}`, borderRadius:20, background:C.white, color:C.ink, fontSize:"0.68rem", cursor:"pointer" }}>🔄</button>
                        </div>
                      </div>
                      {renderQuiz()}
                    </> : null
                }
              </div>
            )}
            {/* ── OTHER PANELS ── */}
            {view==="defi" && <DefiPanel />}
            {view==="conjugaison" && <ConjugaisonPanel />}
            {view==="writing" && <WritingPanel />}
            {view==="weakspots" && <WeakSpotsPanel />}
            {view==="conversation" && <ConversationPanel />}
          </div>

          {/* ── BOTTOM TAB BAR ── */}
          <div style={{ position:"fixed", bottom:0, left:0, right:0, background:C.white, borderTop:`1.5px solid ${C.border}`, display:"flex", zIndex:150, boxShadow:"0 -4px 16px rgba(0,0,0,0.06)" }}>
            {TABS.map(tab => {
              const isActive = tab.id==="home" ? section==="home" : tab.id==="more" ? showMore : section===tab.id;
              return (
                <button key={tab.id} onClick={()=>{
                  if (tab.id==="more") { setShowMore(s=>!s); return; }
                  setShowMore(false);
                  if (tab.id==="home") { setSection("home"); return; }
                  const m = MODULES.find(m=>m.id===tab.id);
                  if (m) goSection(m.id, m.view);
                }}
                  style={{ flex:1, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", padding:"0.5rem 0.25rem 0.6rem", background:"transparent", border:"none", cursor:"pointer", gap:"0.15rem" }}>
                  <span style={{ fontSize:"1.2rem", lineHeight:1 }}>{tab.icon}</span>
                  <span style={{ fontSize:"0.58rem", color: isActive ? C.purple : C.gray, fontWeight: isActive ? 700 : 400, letterSpacing:0.2 }}>{tab.label}</span>
                  {isActive && <div style={{ width:18, height:2, background:C.purple, borderRadius:1, marginTop:1 }} />}
                </button>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}
