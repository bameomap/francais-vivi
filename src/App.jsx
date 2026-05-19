import { useState, useCallback, useEffect } from "react";
import { callAI, callAIBatched, buildPrompt } from "./utils/api.js";
import { loadSets, saveSets, getStreak, getProgress, markModuleUsed } from "./utils/storage.js";
import { parseWords } from "./utils/helpers.js";
import { C, DEFAULTS } from "./constants.js";

import SpeakBtn from "./components/ui/SpeakBtn.jsx";
import Spinner from "./components/ui/Spinner.jsx";
import { SecLabel, QCard, SaveModal, ImportModal } from "./components/ui/SharedUI.jsx";
import { MCSection, FillSection, MatchSection, DicteeSection, FlashcardSection, AnagrammeSection } from "./components/QuizSections.jsx";
import ConversationPanel from "./components/ConversationPanel.jsx";
import WritingPanel from "./components/WritingPanel.jsx";
import WeakSpotsPanel from "./components/WeakSpotsPanel.jsx";
import ConjugaisonPanel from "./components/ConjugaisonPanel.jsx";
import AnalysePanel from "./components/AnalysePanel.jsx";
import GrammarPanel from "./components/GrammarPanel.jsx";
import VocabGenerator, { ExampleCard, EditoPresets, exportFillPDF } from "./components/VocabGenerator.jsx";
import DefiPanel from "./components/DefiPanel.jsx";

// ── Module definitions ──────────────────────────────────────
const MODULES = [
  { id:"vocab",        label:"Từ vựng",       fr:"Le Vocabulaire",   icon:"📚", color:"#4A90D9", bg:"#EBF4FF", view:"input"       },
  { id:"grammar",      label:"Ngữ pháp",       fr:"La Grammaire",     icon:"🧩", color:"#7B6CF6", bg:"#F0EEFF", view:"grammar"     },
  { id:"conjugaison",  label:"Chia động từ",   fr:"La Conjugaison",   icon:"📖", color:"#16A085", bg:"#E6FAF5", view:"conjugaison" },
  { id:"conversation", label:"Giao tiếp",      fr:"La Conversation",  icon:"💬", color:"#2980B9", bg:"#E8F4FD", view:"conversation"},
  { id:"writing",      label:"Luyện viết",     fr:"L'Écriture",       icon:"✍️", color:"#E67E22", bg:"#FEF3E2", view:"writing"     },
  { id:"weakspots",    label:"Điểm yếu",       fr:"Les Points Faibles",icon:"🎯", color:"#E8574A", bg:"#FFF0EF", view:"weakspots"  },
  { id:"analyse",      label:"Phân tích",      fr:"L'Analyse",        icon:"🔍", color:"#10B981", bg:"#ECFDF5", view:"analyse"     },
  { id:"defi",         label:"Thử thách",      fr:"Le Défi du Jour",  icon:"🎲", color:"#8E44AD", bg:"#F5EEFF", view:"defi"        },
];

const TABS = [
  { id:"home",       icon:"🏠", label:"Trang chủ" },
  { id:"vocab",      icon:"📚", label:"Từ vựng"   },
  { id:"defi",       icon:"🎲", label:"Thử thách" },
  { id:"conjugaison",icon:"📖", label:"Động từ"   },
  { id:"more",       icon:"⋯",  label:"Thêm"      },
];

const SECTION_TITLE = {
  vocab:"Le Vocabulaire", grammar:"La Grammaire", conversation:"La Conversation",
  writing:"L'Écriture", weakspots:"Les Points Faibles", conjugaison:"La Conjugaison",
  analyse:"L'Analyse", defi:"Le Défi du Jour"
};

// ── Main App ────────────────────────────────────────────────
export default function App() { return <AppInner />; }

function AppInner() {
  const [text, setText]                 = useState(DEFAULTS);
  const [type, setType]                 = useState("multiple_choice");
  const [numQ, setNumQ]                 = useState(8);
  const [quiz, setQuiz]                 = useState(null);
  const [loading, setLoading]           = useState(false);
  const [error, setError]               = useState(null);
  const [view, setView]                 = useState("input");
  const [sets, setSets]                 = useState([]);
  const [stats, setStats]               = useState({});
  const [showSave, setShowSave]         = useState(false);
  const [showImport, setShowImport]     = useState(false);
  const [toast, setToast]               = useState("");
  const [generatedVocab, setGeneratedVocab] = useState([]);
  const [wrongAnswers, setWrongAnswers] = useState([]);
  const [section, setSection]           = useState("home");
  const [showMore, setShowMore]         = useState(false);
  const [onboarded, setOnboarded]       = useState(() => !!localStorage.getItem("onboarded"));
  const [userName, setUserName]         = useState(() => localStorage.getItem("user_name") || "");
  const [nameInput, setNameInput]       = useState("");
  const [streakData, setStreakData]     = useState(getStreak);
  const [progress, setProgress]         = useState(getProgress);

  const words = parseWords(text);
  const CLIENT_TYPES = ["dictee","flashcard","anagramme"];
  const TYPE_NAMES = { multiple_choice:"Trắc nghiệm", fill_blank:"Điền từ", matching:"Nối từ", dictee:"Dictée", flashcard:"Flashcard", anagramme:"Anagramme", mixed:"Hỗn hợp" };
  const hasFill = quiz && (quiz.type==="fill_blank"||(quiz.type==="mixed"&&quiz.sections?.some(s=>s.sectionType==="fill_blank")));

  useEffect(() => { setSets(loadSets()); }, []);

  const showToast = msg => { setToast(msg); setTimeout(() => setToast(""), 2400); };

  const goSection = (s, v) => {
    setSection(s); setView(v || s);
    markModuleUsed(s);
    setStreakData(getStreak());
    setProgress(getProgress());
    setShowMore(false);
  };

  const recordAnswer = useCallback((word, isOk) => {
    setStats(prev => {
      const e = prev[word] || { ok:0, wrong:0 };
      return { ...prev, [word]: { ok: e.ok+(isOk?1:0), wrong: e.wrong+(isOk?0:1) } };
    });
  }, []);

  const recordWrong = useCallback((q) => {
    setWrongAnswers(prev => prev.find(x => x.question===q.question) ? prev : [...prev, q]);
  }, []);

  // Last used module (for "next lesson" card)
  const lastModule = (() => {
    let best = null, bestTime = 0;
    for (const m of MODULES) {
      const p = progress[m.id];
      if (p?.last && p.last > bestTime) { best = m; bestTime = p.last; }
    }
    return best;
  })();

  const addMoreQuestions = async () => {
    if (!quiz || CLIENT_TYPES.includes(type)) return;
    setLoading(true);
    try {
      const more = await callAI(buildPrompt(quiz.type, words, 5));
      if (quiz.type==="multiple_choice") setQuiz(q=>({...q, questions:[...q.questions,...(more.questions||[])]}));
      else if (quiz.type==="fill_blank") setQuiz(q=>({...q, questions:[...q.questions,...(more.questions||[])]}));
      else if (quiz.type==="mixed") setQuiz(q=>({...q, sections: q.sections.map(sec=>{
        const ns = more.sections?.find(s=>s.sectionType===sec.sectionType);
        if (!ns || sec.sectionType==="matching") return sec;
        return {...sec, questions:[...sec.questions,...(ns.questions||[])]};
      })}));
      showToast("✓ Đã thêm câu hỏi!");
    } catch(e) { showToast("⚠ "+e.message); }
    setLoading(false);
  };

  const retryWrong = async () => {
    if (!wrongAnswers.length) { showToast("Chưa có câu sai!"); return; }
    setLoading(true);
    try {
      const wrongWords = wrongAnswers.map(q => {
        const found = words.find(w => q.question?.includes(w.fr)||q.question?.includes(w.vi)||q.answer?.includes(w.fr));
        return found || { fr: q.answer||"", vi:"" };
      }).filter(w=>w.fr);
      const target = wrongWords.length>=2 ? wrongWords : words;
      const newQuiz = await callAI(buildPrompt(quiz.type==="matching"?"multiple_choice":quiz.type, target, Math.max(wrongAnswers.length, 3)));
      setQuiz(newQuiz); setWrongAnswers([]);
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
    const newSet = { id:Date.now(), name, text, count:words.length, date:new Date().toLocaleDateString("vi-VN") };
    const updated = [newSet, ...sets];
    setSets(updated); saveSets(updated);
    setShowSave(false); showToast("✓ Đã lưu bộ từ!");
  };

  function renderQuiz() {
    if (!quiz) return null;
    if (quiz.type==="multiple_choice") return <MCSection questions={quiz.questions} onRecord={recordAnswer} onWrong={recordWrong}/>;
    if (quiz.type==="fill_blank")      return <FillSection questions={quiz.questions} onRecord={recordAnswer} onWrong={recordWrong}/>;
    if (quiz.type==="matching")        return <MatchSection pairs={quiz.pairs}/>;
    if (quiz.type==="dictee")          return <DicteeSection words={quiz.words} onRecord={recordAnswer}/>;
    if (quiz.type==="flashcard")       return <FlashcardSection words={quiz.words} onRecord={recordAnswer}/>;
    if (quiz.type==="anagramme")       return <AnagrammeSection words={quiz.words} onRecord={recordAnswer}/>;
    if (quiz.type==="mixed") return quiz.sections.map((sec,i)=>(
      <div key={i}>
        {sec.sectionType==="multiple_choice"&&<MCSection questions={sec.questions} sl onRecord={recordAnswer} onWrong={recordWrong}/>}
        {sec.sectionType==="fill_blank"&&<FillSection questions={sec.questions} sl onRecord={recordAnswer} onWrong={recordWrong}/>}
        {sec.sectionType==="matching"&&<MatchSection pairs={sec.pairs} sl/>}
      </div>
    ));
    return null;
  }

  const navBtn = (label, target, show=true) => show && (
    <button onClick={()=>setView(target)}
      style={{ padding:"0.22rem 0.58rem", background:view===target?C.blue:"transparent", border:`1.5px solid ${view===target?C.blue:C.border}`, color:view===target?C.white:C.gray, borderRadius:20, fontSize:"0.63rem", cursor:"pointer", fontWeight:view===target?600:400, whiteSpace:"nowrap", transition:"all 0.15s" }}>
      {label}
    </button>
  );

  // ── Progress % for next lesson card ──
  const moduleProgress = lastModule ? Math.min((progress[lastModule.id]?.count||0) * 8, 100) : 0;

  return (
    <div className="app-shell" style={{ fontFamily:"'Inter',sans-serif", background:C.paper, minHeight:"100vh", color:C.ink, position:"relative" }}>

      {/* ── Global Animations ── */}
      <style>{`
        .card-hover { transition: transform 0.2s, box-shadow 0.2s, border-color 0.2s; }
        .card-hover:hover { transform: translateY(-3px); }
        .card-hover:active { transform: scale(0.97); }
        .tab-btn:active { transform: scale(0.9); }
        input:focus, textarea:focus { outline: none; border-color: ${C.blue} !important; box-shadow: 0 0 0 3px ${C.blueL}; }
      `}</style>

      {/* ── Toast ── */}
      {toast && (
        <div style={{ position:"fixed", top:20, left:"50%", transform:"translateX(-50%)", background:C.ink, color:C.white, padding:"0.55rem 1.2rem", borderRadius:24, fontSize:"0.8rem", zIndex:400, whiteSpace:"nowrap", boxShadow:"0 4px 20px rgba(0,0,0,0.2)", animation:"pop 0.3s ease" }}>
          {toast}
        </div>
      )}

      {/* ── Modals ── */}
      {showSave   && <SaveModal   text={text} onSave={handleSave}                                    onClose={()=>setShowSave(false)}   />}
      {showImport && <ImportModal onImport={t=>{setText(t);showToast("✓ Import thành công!");}} onClose={()=>setShowImport(false)} />}

      {/* ── More Drawer ── */}
      {showMore && (
        <div style={{ position:"fixed", inset:0, zIndex:200, background:"rgba(26,39,68,0.4)" }} onClick={()=>setShowMore(false)}>
          <div style={{ position:"absolute", bottom:70, left:0, right:0, maxWidth:680, margin:"0 auto", background:C.white, borderRadius:"24px 24px 0 0", padding:"1rem 1rem 1.5rem", boxShadow:"0 -8px 40px rgba(0,0,0,0.15)", animation:"slideUp 0.25s ease" }}
            onClick={e=>e.stopPropagation()}>
            <div style={{ width:40, height:4, background:C.border, borderRadius:2, margin:"0 auto 1rem" }}/>
            <div style={{ fontSize:"0.72rem", fontWeight:600, color:C.gray, textTransform:"uppercase", letterSpacing:1, marginBottom:"0.75rem", paddingLeft:"0.25rem" }}>Thêm tính năng</div>
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"0.6rem" }}>
              {[
                { id:"conversation", icon:"💬", label:"Giao tiếp",  color:"#2980B9", bg:"#E8F4FD" },
                { id:"writing",      icon:"✍️", label:"Luyện viết", color:"#E67E22", bg:"#FEF3E2" },
                { id:"weakspots",    icon:"🎯", label:"Điểm yếu",   color:"#E8574A", bg:"#FFF0EF" },
                { id:"analyse",      icon:"🔍", label:"Phân tích",  color:"#10B981", bg:"#ECFDF5" },
                { id:"grammar",      icon:"🧩", label:"Ngữ pháp",   color:"#7B6CF6", bg:"#F0EEFF" },
              ].map(m => {
                const p = progress[m.id];
                return (
                  <button key={m.id} className="card-hover" onClick={()=>goSection(m.id)}
                    style={{ background:m.bg, border:`1.5px solid ${m.color}22`, borderRadius:16, padding:"0.9rem 1rem", textAlign:"left", cursor:"pointer", fontFamily:"inherit" }}>
                    <div style={{ fontSize:"1.5rem", marginBottom:"0.35rem" }}>{m.icon}</div>
                    <div style={{ fontSize:"0.85rem", color:C.ink, fontWeight:600 }}>{m.label}</div>
                    {p && <div style={{ fontSize:"0.65rem", color:m.color, marginTop:"0.2rem", fontWeight:500 }}>{p.count} lần dùng</div>}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* ── ONBOARDING ── */}
      {!onboarded && section==="home" && (
        <div style={{ position:"fixed", inset:0, background:"rgba(26,39,68,0.6)", zIndex:300, display:"flex", alignItems:"flex-end", justifyContent:"center" }}>
          <div style={{ background:C.white, borderRadius:"24px 24px 0 0", padding:"1.75rem 1.5rem 2.5rem", width:"100%", maxWidth:480, animation:"slideUp 0.35s ease" }}>
            {/* Tricolor accent */}
            <div style={{ display:"flex", gap:4, marginBottom:"1.2rem", justifyContent:"center" }}>
              {["#002395","#FFFFFF","#ED2939"].map((col,i)=>(
                <div key={i} style={{ width:28, height:6, background:col, borderRadius:3, border: col==="#FFFFFF"?`1px solid ${C.border}`:"none" }}/>
              ))}
            </div>
            <div style={{ fontFamily:"'Playfair Display',Georgia,serif", fontSize:"1.5rem", color:C.ink, marginBottom:"0.3rem", textAlign:"center" }}>Bonjour! 👋</div>
            <div style={{ fontSize:"0.82rem", color:C.gray, lineHeight:1.7, marginBottom:"1.2rem", textAlign:"center" }}>Cho mình biết tên bạn để cá nhân hoá trải nghiệm nhé!</div>
            <input
              value={nameInput} onChange={e=>setNameInput(e.target.value)}
              placeholder="Tên của bạn (vd: Vivi)"
              style={{ width:"100%", padding:"0.75rem 1rem", border:`1.5px solid ${C.border}`, borderRadius:12, fontSize:"0.95rem", fontFamily:"inherit", color:C.ink, marginBottom:"0.8rem" }}
            />
            <div style={{ fontSize:"0.78rem", color:C.gray, lineHeight:1.7, marginBottom:"1rem" }}>
              App có <b>8 module</b> học tiếng Pháp. Gợi ý bắt đầu với:
              <div style={{ display:"flex", flexDirection:"column", gap:"0.4rem", marginTop:"0.6rem" }}>
                {[
                  {icon:"📚",text:"Từ vựng — nhập từ, luyện flashcard & bài tập"},
                  {icon:"📖",text:"Chia động từ — tra bảng chia ngay khi cần"},
                  {icon:"💬",text:"Giao tiếp — roleplay tình huống thực tế với AI"},
                ].map((s,i)=>(
                  <div key={i} style={{ display:"flex", gap:"0.6rem", alignItems:"center", background:C.blueL, borderRadius:10, padding:"0.5rem 0.75rem" }}>
                    <span style={{ fontSize:"1rem" }}>{s.icon}</span>
                    <span style={{ fontSize:"0.78rem", color:C.ink }}>{s.text}</span>
                  </div>
                ))}
              </div>
            </div>
            <button
              onClick={()=>{
                const name = nameInput.trim() || "Bạn";
                localStorage.setItem("user_name", name);
                localStorage.setItem("onboarded","1");
                setUserName(name); setOnboarded(true);
              }}
              style={{ width:"100%", padding:"0.9rem", background:`linear-gradient(135deg, ${C.blue}, ${C.red})`, color:C.white, border:"none", borderRadius:14, fontFamily:"'Playfair Display',Georgia,serif", fontSize:"1rem", cursor:"pointer", fontWeight:600, boxShadow:`0 6px 20px ${C.blue}44` }}>
              Bắt đầu học ✦
            </button>
          </div>
        </div>
      )}

      {/* ══════════════════════════════════════
          HOME PAGE
      ══════════════════════════════════════ */}
      {section==="home" && (
        <div style={{ minHeight:"100vh", display:"flex", flexDirection:"column", paddingBottom:80 }}>

          {/* ── Top bar ── */}
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", padding:"1.1rem 1.25rem 0" }}>
            {/* Logo */}
            <div style={{ display:"flex", alignItems:"center", gap:"0.5rem" }}>
              <div style={{ display:"flex", gap:3 }}>
                {["#002395","#FFFFFF","#ED2939"].map((col,i)=>(
                  <div key={i} style={{ width:4, height:20, background:col, borderRadius:2, border:col==="#FFFFFF"?`1px solid ${C.border}`:"none" }}/>
                ))}
              </div>
              <span style={{ fontFamily:"'Playfair Display',Georgia,serif", fontSize:"1rem", color:C.ink, fontWeight:700, letterSpacing:"0.03em" }}>Français</span>
            </div>
            {/* Streak badge */}
            <div style={{ display:"flex", alignItems:"center", gap:"0.35rem", background:streakData.streak>0?C.goldL:C.cream, border:`1.5px solid ${streakData.streak>0?C.gold:C.border}`, borderRadius:24, padding:"0.3rem 0.75rem" }}>
              <span style={{ fontSize:"0.85rem" }}>{streakData.streak>0?"🔥":"📅"}</span>
              <span style={{ fontSize:"0.75rem", color:streakData.streak>0?C.gold:C.gray, fontWeight:600 }}>
                {streakData.streak>0 ? `${streakData.streak} ngày` : "Hôm nay"}
              </span>
              {streakData.studiedToday && <span style={{ fontSize:"0.6rem", background:C.green, color:C.white, borderRadius:20, padding:"0.08rem 0.35rem", fontWeight:600 }}>✓</span>}
            </div>
          </div>

          {/* ── Greeting ── */}
          <div style={{ padding:"1.2rem 1.25rem 0.5rem", animation:"fadeUp 0.4s ease" }}>
            <div style={{ fontSize:"0.78rem", color:C.gray, marginBottom:"0.15rem" }}>Bonjour 🇫🇷</div>
            <div style={{ fontFamily:"'Playfair Display',Georgia,serif", fontSize:"2rem", color:C.ink, fontWeight:700, lineHeight:1.2 }}>
              {userName || "Bạn ơi"}!
            </div>
            <div style={{ fontSize:"0.85rem", color:C.gray, marginTop:"0.25rem" }}>Sẵn sàng học bài hôm nay chưa?</div>
          </div>

          {/* ── Next Lesson card ── */}
          {lastModule ? (
            <div style={{ margin:"0.85rem 1.25rem", background:`linear-gradient(135deg, ${lastModule.color}ee, ${C.blue}cc)`, borderRadius:22, padding:"1.3rem 1.4rem", color:C.white, boxShadow:`0 8px 30px ${lastModule.color}44`, animation:"fadeUp 0.4s ease 0.05s both" }}>
              <div style={{ fontSize:"0.62rem", textTransform:"uppercase", letterSpacing:2, opacity:0.85, marginBottom:"0.35rem" }}>BÀI HỌC TIẾP THEO</div>
              <div style={{ fontFamily:"'Playfair Display',Georgia,serif", fontSize:"1.4rem", fontWeight:700, marginBottom:"0.9rem" }}>
                {lastModule.icon} {lastModule.label}
              </div>
              {/* Progress bar */}
              <div style={{ background:"rgba(255,255,255,0.25)", borderRadius:999, height:7, marginBottom:"0.5rem" }}>
                <div style={{ height:"100%", width:`${moduleProgress}%`, background:C.white, borderRadius:999, transition:"width 0.8s ease" }}/>
              </div>
              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
                <span style={{ fontSize:"0.75rem", opacity:0.9 }}>{moduleProgress}% hoàn thành</span>
                <button className="card-hover"
                  onClick={()=>goSection(lastModule.id, lastModule.view)}
                  style={{ background:C.white, color:lastModule.color, border:"none", borderRadius:999, padding:"0.42rem 1.1rem", fontSize:"0.8rem", cursor:"pointer", fontWeight:700 }}>
                  Tiếp tục →
                </button>
              </div>
            </div>
          ) : (
            <div style={{ margin:"0.85rem 1.25rem", background:`linear-gradient(135deg, ${C.blue}, ${C.red})`, borderRadius:22, padding:"1.3rem 1.4rem", color:C.white, boxShadow:`0 8px 30px ${C.blue}44`, animation:"fadeUp 0.4s ease 0.05s both" }}>
              <div style={{ fontSize:"0.62rem", textTransform:"uppercase", letterSpacing:2, opacity:0.85, marginBottom:"0.35rem" }}>BẮT ĐẦU TỪ ĐÂY</div>
              <div style={{ fontFamily:"'Playfair Display',Georgia,serif", fontSize:"1.3rem", fontWeight:700, marginBottom:"0.5rem" }}>📚 Học từ vựng đầu tiên</div>
              <div style={{ fontSize:"0.82rem", opacity:0.9, marginBottom:"0.9rem" }}>Nhập từ vựng và luyện tập với AI</div>
              <button className="card-hover" onClick={()=>goSection("vocab","input")}
                style={{ background:C.white, color:C.blue, border:"none", borderRadius:999, padding:"0.42rem 1.1rem", fontSize:"0.8rem", cursor:"pointer", fontWeight:700 }}>
                Bắt đầu →
              </button>
            </div>
          )}

          {/* ── Module Grid ── */}
          <div style={{ padding:"0.25rem 1.25rem 0", fontSize:"0.9rem", fontWeight:700, color:C.ink }}>Khám phá</div>
          <div className="module-grid" style={{ padding:"0.6rem 1rem 1rem", display:"grid", gridTemplateColumns:"1fr 1fr", gap:"0.7rem", flex:1 }}>
            {MODULES.map((m, i) => {
              const p = progress[m.id];
              const used = p?.count > 0;
              const pct = Math.min((p?.count||0)*8, 100);
              return (
                <button key={m.id} className="card-hover"
                  onClick={()=>goSection(m.id, m.view)}
                  style={{ background:m.bg, border:`1.5px solid ${m.color}33`, borderRadius:20, padding:"1.1rem 1rem", textAlign:"left", cursor:"pointer", fontFamily:"inherit", animation:`fadeUp 0.35s ease ${i*0.04}s both`, position:"relative", boxShadow:`0 2px 12px ${m.color}18` }}>
                  <div style={{ fontSize:"1.8rem", marginBottom:"0.5rem" }}>{m.icon}</div>
                  <div style={{ fontSize:"0.95rem", color:C.ink, fontWeight:700, marginBottom:"0.15rem" }}>{m.label}</div>
                  <div style={{ fontSize:"0.68rem", color:m.color, fontStyle:"italic", marginBottom: used?"0.5rem":"0" }}>{m.fr}</div>
                  {used && (
                    <>
                      <div style={{ height:3, background:`${m.color}22`, borderRadius:999, marginBottom:"0.25rem" }}>
                        <div style={{ height:"100%", width:`${pct}%`, background:m.color, borderRadius:999 }}/>
                      </div>
                      <div style={{ fontSize:"0.62rem", color:m.color, fontWeight:600 }}>{p.count} lần · {pct}%</div>
                    </>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* ══════════════════════════════════════
          APP SHELL (non-home sections)
      ══════════════════════════════════════ */}
      {section!=="home" && (
        <>
          {/* ── Header ── */}
          <div style={{ background:C.white, padding:"0.8rem 1rem", display:"flex", alignItems:"center", gap:"0.6rem", borderBottom:`1.5px solid ${C.border}`, position:"sticky", top:0, zIndex:100, boxShadow:"0 1px 12px rgba(74,144,217,0.08)" }}>
            <button onClick={()=>setSection("home")}
              style={{ background:C.blueL, border:`1.5px solid ${C.blue}33`, color:C.blue, cursor:"pointer", fontSize:"0.82rem", padding:"0.3rem 0.65rem", borderRadius:10, fontWeight:600, transition:"all 0.15s" }}>
              ← Về
            </button>
            <span style={{ fontFamily:"'Playfair Display',Georgia,serif", fontSize:"1rem", color:C.ink, marginRight:"auto", fontWeight:600 }}>
              {SECTION_TITLE[section] || section}
            </span>
            {/* Sub-nav buttons */}
            <div style={{ display:"flex", gap:"0.3rem", flexWrap:"wrap" }}>
              {section==="vocab" && <>
                {navBtn("✏️","input")}
                {navBtn("📂","history")}
                {navBtn("📊","stats")}
                {generatedVocab.length>0 && navBtn("📋","vocab-table")}
                {words.length>0 && navBtn("💬","examples")}
                {(quiz||loading) && navBtn("🎯","quiz")}
              </>}
            </div>
          </div>

          {/* ── Content ── */}
          <div style={{ minHeight:"calc(100vh - 130px)", paddingBottom:80 }}>

            {/* INPUT */}
            {view==="input" && (
              <div style={{ padding:"1rem", display:"flex", flexDirection:"column", gap:"0.85rem", animation:"fadeUp 0.3s ease" }}>
                <EditoPresets onLoad={u=>{setText(u.words);showToast(`✓ Đã load ${u.title}!`);}}/>
                <VocabGenerator onGenerate={generated=>{
                  const lines = generated.map(w=>`${w.fr} — ${w.vi}`).join("\n");
                  setText(lines); setView("vocab-table"); setGeneratedVocab(generated);
                }}/>
                <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
                  <div style={{ fontSize:"0.75rem", fontWeight:700, color:C.blue }}>📝 Nhập từ vựng</div>
                  <div style={{ display:"flex", gap:"0.4rem" }}>
                    <button onClick={()=>setShowImport(true)} style={{ padding:"0.25rem 0.65rem", background:"transparent", border:`1.5px solid ${C.border}`, color:C.gray, borderRadius:20, fontSize:"0.68rem", cursor:"pointer" }}>📁 Import</button>
                    {words.length>=3 && <button onClick={()=>setShowSave(true)} style={{ padding:"0.25rem 0.65rem", background:"transparent", border:`1.5px solid ${C.blue}`, color:C.blue, borderRadius:20, fontSize:"0.68rem", cursor:"pointer" }}>💾 Lưu</button>}
                  </div>
                </div>
                <textarea value={text} onChange={e=>setText(e.target.value)}
                  placeholder={"la boulangerie — tiệm bánh mì\nle marché — chợ\n..."}
                  style={{ width:"100%", height:145, border:`1.5px solid ${C.border}`, borderRadius:12, padding:"0.65rem 0.75rem", fontFamily:"inherit", fontSize:"0.85rem", background:C.white, resize:"vertical", color:C.ink, lineHeight:1.7, boxSizing:"border-box" }}/>
                <div style={{ fontSize:"0.72rem", color:C.gray }}>
                  Mỗi dòng: <code style={{ background:C.blueL, color:C.blue, padding:"1px 6px", borderRadius:4, fontSize:"0.7rem" }}>từ pháp — nghĩa</code>
                  {words.length>0 && <span style={{ color:C.blue, marginLeft:8, fontWeight:600 }}>{words.length} từ</span>}
                </div>
                {words.length>0 && (
                  <div style={{ display:"flex", flexWrap:"wrap", gap:"0.3rem" }}>
                    {words.slice(0,8).map((w,i)=>(
                      <span key={i} style={{ background:C.blueL, border:`1px solid ${C.blue}33`, borderRadius:20, padding:"0.12rem 0.5rem", fontSize:"0.72rem", color:C.blue, fontWeight:500 }}>{w.fr}</span>
                    ))}
                    {words.length>8 && <span style={{ background:C.cream, border:`1px solid ${C.border}`, borderRadius:20, padding:"0.12rem 0.5rem", fontSize:"0.72rem", color:C.gray }}>+{words.length-8}</span>}
                  </div>
                )}

                {/* Exercise type selector */}
                <div style={{ background:C.white, borderRadius:16, padding:"0.9rem", border:`1.5px solid ${C.border}` }}>
                  <div style={{ fontSize:"0.75rem", fontWeight:700, color:C.blue, marginBottom:"0.6rem" }}>🎯 Dạng bài tập</div>
                  <div style={{ fontSize:"0.65rem", color:C.gray, textTransform:"uppercase", letterSpacing:1, marginBottom:"0.35rem", fontWeight:600 }}>Chọn đáp án</div>
                  <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"0.35rem", marginBottom:"0.65rem" }}>
                    {[{id:"multiple_choice",label:"☑ Trắc nghiệm"},{id:"matching",label:"🔗 Nối từ"},{id:"flashcard",label:"🃏 Flashcard"},{id:"mixed",label:"🎲 Hỗn hợp"}].map(t=>(
                      <button key={t.id} onClick={()=>setType(t.id)}
                        style={{ padding:"0.5rem 0.3rem", border:`1.5px solid ${type===t.id?C.blue:C.border}`, borderRadius:10, background:type===t.id?C.blue:C.white, color:type===t.id?C.white:C.ink, fontSize:"0.78rem", cursor:"pointer", fontFamily:"inherit", transition:"all 0.15s", fontWeight:type===t.id?600:400 }}>
                        {t.label}
                      </button>
                    ))}
                  </div>
                  <div style={{ fontSize:"0.65rem", color:C.gray, textTransform:"uppercase", letterSpacing:1, marginBottom:"0.35rem", fontWeight:600 }}>Điền / Viết từ</div>
                  <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:"0.35rem" }}>
                    {[{id:"fill_blank",label:"✏️ Điền từ"},{id:"dictee",label:"🎧 Dictée"},{id:"anagramme",label:"🔀 Xếp chữ"}].map(t=>(
                      <button key={t.id} onClick={()=>setType(t.id)}
                        style={{ padding:"0.5rem 0.25rem", border:`1.5px solid ${type===t.id?C.blue:C.border}`, borderRadius:10, background:type===t.id?C.blue:C.white, color:type===t.id?C.white:C.ink, fontSize:"0.75rem", cursor:"pointer", fontFamily:"inherit", transition:"all 0.15s", fontWeight:type===t.id?600:400 }}>
                        {t.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Number of questions */}
                {!["matching","dictee","flashcard","anagramme"].includes(type) && (
                  <div style={{ background:C.white, borderRadius:16, padding:"0.9rem", border:`1.5px solid ${C.border}` }}>
                    <div style={{ fontSize:"0.75rem", fontWeight:700, color:C.blue, marginBottom:"0.55rem" }}>🔢 Số câu: <span style={{ fontFamily:"'Playfair Display',serif", fontSize:"1.1rem", color:C.blue }}>{numQ}</span></div>
                    <input type="range" min={3} max={30} value={numQ} onChange={e=>setNumQ(Number(e.target.value))}
                      style={{ width:"100%", accentColor:C.blue }}/>
                    {numQ>words.length && words.length>0 && <div style={{ fontSize:"0.7rem", color:C.gold, marginTop:"0.35rem" }}>💡 AI sẽ dùng lại từ theo nhiều cách</div>}
                  </div>
                )}

                {error && <div style={{ color:C.red, fontSize:"0.8rem", padding:"0.5rem 0.75rem", background:C.redL, borderRadius:10, border:`1px solid ${C.red}33` }}>⚠ {error}</div>}
                <button onClick={generate} disabled={loading||words.length<2}
                  style={{ width:"100%", padding:"0.9rem", background:words.length<2?C.border:`linear-gradient(135deg,${C.blue},${C.blueDark})`, color:C.white, border:"none", borderRadius:14, fontFamily:"'Playfair Display',Georgia,serif", fontSize:"0.95rem", cursor:words.length<2?"not-allowed":"pointer", fontWeight:700, boxShadow:words.length>=2?`0 6px 20px ${C.blue}44`:"none", transition:"all 0.2s" }}>
                  {loading ? "Đang tạo..." : "Tạo bài tập ✦"}
                </button>
              </div>
            )}

            {/* HISTORY */}
            {view==="history" && (
              <div style={{ padding:"1rem", animation:"fadeUp 0.3s ease" }}>
                <div style={{ fontSize:"0.78rem", fontWeight:700, color:C.blue, marginBottom:"0.8rem" }}>📂 Bộ từ đã lưu</div>
                {sets.length===0
                  ? <div style={{ textAlign:"center", color:C.gray, fontSize:"0.88rem", padding:"3rem 1rem", lineHeight:1.9 }}>Chưa có bộ từ nào.<br/>Nhập từ vựng và nhấn 💾 Lưu!</div>
                  : sets.map(s=>(
                    <div key={s.id} style={{ background:C.white, border:`1.5px solid ${C.border}`, borderRadius:14, padding:"0.85rem 1rem", marginBottom:"0.55rem", boxShadow:"0 1px 8px rgba(74,144,217,0.06)" }}>
                      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start" }}>
                        <div>
                          <div style={{ fontFamily:"'Playfair Display',Georgia,serif", fontSize:"0.98rem", color:C.ink, marginBottom:"0.2rem" }}>{s.name}</div>
                          <div style={{ fontSize:"0.72rem", color:C.gray }}>{s.count} từ · {s.date}</div>
                        </div>
                        <div style={{ display:"flex", gap:"0.35rem" }}>
                          <button onClick={()=>{setText(s.text);setView("input");showToast("✓ Đã load!");}}
                            style={{ padding:"0.3rem 0.7rem", background:C.blue, color:C.white, border:"none", borderRadius:8, fontSize:"0.72rem", cursor:"pointer", fontWeight:600 }}>Ôn lại</button>
                          <button onClick={()=>{const u=sets.filter(x=>x.id!==s.id);setSets(u);saveSets(u);}}
                            style={{ padding:"0.3rem 0.55rem", background:"transparent", color:C.gray, border:`1.5px solid ${C.border}`, borderRadius:8, fontSize:"0.72rem", cursor:"pointer" }}>🗑</button>
                        </div>
                      </div>
                    </div>
                  ))
                }
              </div>
            )}

            {/* STATS */}
            {view==="stats" && (() => {
              const entries = Object.entries(stats)
                .map(([word,s])=>({word,...s,total:s.ok+s.wrong,rate:s.ok+s.wrong>0?Math.round(s.ok/(s.ok+s.wrong)*100):0}))
                .sort((a,b)=>a.rate-b.rate);
              const weak = entries.filter(e=>e.rate<80);
              const mastered = entries.filter(e=>e.rate>=80);
              const weakWords = weak.map(e=>{const w=words.find(x=>x.fr===e.word);return w?`${w.fr}${w.vi?" — "+w.vi:""}`:e.word;});
              const WordPill = ({e,isWeak}) => {
                const vi=words.find(w=>w.fr===e.word)?.vi||"";
                return (
                  <div style={{background:C.white,border:`1px solid ${isWeak?C.red+"44":C.border}`,borderRadius:10,padding:"0.45rem 0.6rem",marginBottom:"0.35rem"}}>
                    <div style={{fontFamily:"'Playfair Display',Georgia,serif",fontSize:"0.85rem"}}>{e.word}</div>
                    {vi&&<div style={{fontSize:"0.67rem",color:C.gray}}>{vi}</div>}
                    <div style={{display:"flex",gap:"0.4rem",alignItems:"center",marginTop:"0.28rem"}}>
                      <div style={{flex:1,height:4,background:C.border,borderRadius:999}}>
                        <div style={{height:"100%",width:`${e.rate}%`,background:isWeak?(e.rate>=50?C.gold:C.red):C.green,borderRadius:999}}/>
                      </div>
                      <span style={{fontSize:"0.65rem",color:isWeak?C.red:C.green,fontWeight:700,minWidth:28}}>{e.rate}%</span>
                    </div>
                  </div>
                );
              };
              return (
                <div style={{padding:"1rem",animation:"fadeUp 0.3s ease"}}>
                  <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"0.85rem"}}>
                    <div style={{fontSize:"0.78rem",fontWeight:700,color:C.blue}}>📊 Thống kê</div>
                    <div style={{display:"flex",gap:"0.4rem"}}>
                      {weakWords.length>0&&<button onClick={()=>{setText(weakWords.join("\n"));setQuiz(null);setView("input");showToast("✓ Đã load từ yếu!");}} style={{padding:"0.25rem 0.65rem",background:C.blue,color:C.white,border:"none",borderRadius:20,fontSize:"0.65rem",cursor:"pointer",fontWeight:600}}>🎯 Ôn từ yếu ({weak.length})</button>}
                      {entries.length>0&&<button onClick={()=>{setStats({});showToast("✓ Đã xóa");}} style={{padding:"0.25rem 0.55rem",background:"transparent",color:C.gray,border:`1.5px solid ${C.border}`,borderRadius:20,fontSize:"0.65rem",cursor:"pointer"}}>🗑</button>}
                    </div>
                  </div>
                  {entries.length===0
                    ?<div style={{textAlign:"center",color:C.gray,fontSize:"0.88rem",padding:"3rem 1rem",lineHeight:1.9}}>Chưa có dữ liệu.<br/>Làm bài tập để bắt đầu theo dõi!</div>
                    :<>
                      <div style={{display:"flex",gap:"0.5rem",marginBottom:"0.85rem"}}>
                        {[{label:"Tổng từ",val:entries.length,color:C.blue},{label:"Từ yếu",val:weak.length,color:C.red},{label:"Thành thạo",val:mastered.length,color:C.green}].map((item,i)=>(
                          <div key={i} style={{flex:1,background:C.white,border:`1.5px solid ${C.border}`,borderRadius:12,padding:"0.6rem 0.3rem",textAlign:"center",boxShadow:"0 1px 8px rgba(74,144,217,0.06)"}}>
                            <div style={{fontFamily:"'Playfair Display',Georgia,serif",fontSize:"1.3rem",color:item.color,fontWeight:700}}>{item.val}</div>
                            <div style={{fontSize:"0.65rem",color:C.gray,marginTop:"0.1rem"}}>{item.label}</div>
                          </div>
                        ))}
                      </div>
                      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"0.75rem"}}>
                        <div>
                          <div style={{fontSize:"0.65rem",textTransform:"uppercase",letterSpacing:1,color:C.red,marginBottom:"0.4rem",fontWeight:700}}>✗ Từ yếu ({weak.length})</div>
                          {weak.length===0?<div style={{fontSize:"0.78rem",color:C.gray,fontStyle:"italic"}}>Không có 🎉</div>:weak.map((e,i)=><WordPill key={i} e={e} isWeak={true}/>)}
                        </div>
                        <div>
                          <div style={{fontSize:"0.65rem",textTransform:"uppercase",letterSpacing:1,color:C.green,marginBottom:"0.4rem",fontWeight:700}}>✓ Thành thạo ({mastered.length})</div>
                          {mastered.length===0?<div style={{fontSize:"0.78rem",color:C.gray,fontStyle:"italic"}}>Chưa có</div>:mastered.map((e,i)=><WordPill key={i} e={e} isWeak={false}/>)}
                        </div>
                      </div>
                    </>
                  }
                </div>
              );
            })()}

            {/* QUIZ */}
            {view==="quiz" && (
              <div style={{padding:"1rem",animation:"fadeUp 0.3s ease"}}>
                {loading
                  ?<div style={{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",height:220,gap:"0.8rem",color:C.gray}}>
                    <Spinner/><span style={{fontSize:"0.88rem"}}>AI đang tạo bài tập...</span>
                   </div>
                  : quiz ? <>
                    <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"0.9rem",flexWrap:"wrap",gap:"0.4rem"}}>
                      <span style={{background:C.blue,color:C.white,fontSize:"0.63rem",padding:"0.2rem 0.6rem",borderRadius:20,textTransform:"uppercase",letterSpacing:0.5,fontWeight:600}}>{TYPE_NAMES[quiz.type]||quiz.type}</span>
                      <div style={{display:"flex",gap:"0.4rem",flexWrap:"wrap"}}>
                        {hasFill&&<button onClick={()=>exportFillPDF(quiz)} style={{padding:"0.25rem 0.6rem",border:`1.5px solid ${C.blue}`,borderRadius:20,background:C.white,color:C.blue,fontSize:"0.68rem",cursor:"pointer",fontWeight:500}}>📄 PDF</button>}
                        {!CLIENT_TYPES.includes(quiz.type)&&<button onClick={addMoreQuestions} disabled={loading} style={{padding:"0.25rem 0.6rem",border:`1.5px solid ${C.green}`,borderRadius:20,background:C.white,color:C.green,fontSize:"0.68rem",cursor:"pointer",fontWeight:500}}>➕ Thêm</button>}
                        {wrongAnswers.length>0&&!CLIENT_TYPES.includes(quiz.type)&&<button onClick={retryWrong} disabled={loading} style={{padding:"0.25rem 0.6rem",border:`1.5px solid ${C.red}`,borderRadius:20,background:C.white,color:C.red,fontSize:"0.68rem",cursor:"pointer",fontWeight:500}}>🔁 Ôn sai ({wrongAnswers.length})</button>}
                        <button onClick={()=>{setWrongAnswers([]);generate();}} style={{padding:"0.25rem 0.6rem",border:`1.5px solid ${C.border}`,borderRadius:20,background:C.white,color:C.ink,fontSize:"0.68rem",cursor:"pointer"}}>🔄</button>
                      </div>
                    </div>
                    {renderQuiz()}
                  </> : null
                }
              </div>
            )}

            {/* VOCAB TABLE */}
            {view==="vocab-table" && generatedVocab.length>0 && (
              <div style={{padding:"1rem",animation:"fadeUp 0.3s ease"}}>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"0.9rem"}}>
                  <div style={{fontFamily:"'Playfair Display',Georgia,serif",fontSize:"1rem",color:C.ink,fontWeight:700}}>✨ {generatedVocab.length} từ vựng</div>
                  <button onClick={()=>setView("input")} style={{padding:"0.25rem 0.7rem",background:C.blue,color:C.white,border:"none",borderRadius:20,fontSize:"0.68rem",cursor:"pointer",fontWeight:600}}>📝 Luyện tập →</button>
                </div>
                <div style={{display:"grid",gridTemplateColumns:"1.2fr 1fr 0.8fr 1.6fr",gap:"0.3rem",marginBottom:"0.3rem",padding:"0.4rem 0.6rem"}}>
                  {["Giống đực","Giống cái","Nghĩa","Ví dụ"].map((h,i)=>(
                    <div key={i} style={{fontSize:"0.62rem",textTransform:"uppercase",letterSpacing:1,color:C.gray,fontWeight:700}}>{h}</div>
                  ))}
                </div>
                {generatedVocab.map((w,i)=>(
                  <div key={i} style={{display:"grid",gridTemplateColumns:"1.2fr 1fr 0.8fr 1.6fr",gap:"0.3rem",background:i%2===0?C.white:C.blueL,borderRadius:10,padding:"0.55rem 0.6rem",marginBottom:"0.25rem",alignItems:"start"}}>
                    <div><div style={{fontFamily:"'Playfair Display',Georgia,serif",fontSize:"0.88rem",color:C.ink,fontWeight:700,display:"flex",alignItems:"center",gap:"0.2rem"}}>{w.fr}<SpeakBtn text={w.fr}/></div>{w.gender&&<div style={{fontSize:"0.65rem",color:C.blue,fontStyle:"italic"}}>{w.gender}</div>}</div>
                    <div>{w.fr_f?<><div style={{fontFamily:"'Playfair Display',Georgia,serif",fontSize:"0.88rem",color:C.blue}}>{w.fr_f}</div><div style={{fontSize:"0.65rem",color:C.blue,fontStyle:"italic"}}>f.</div></>:<div style={{fontSize:"0.72rem",color:C.border,fontStyle:"italic"}}>—</div>}</div>
                    <div style={{fontSize:"0.8rem",color:C.ink}}>{w.vi}</div>
                    <div><div style={{fontSize:"0.75rem",color:C.ink,fontStyle:"italic",lineHeight:1.5}}>{w.example_fr}</div><div style={{fontSize:"0.68rem",color:C.gray,marginTop:"0.15rem"}}>→ {w.example_vi}</div></div>
                  </div>
                ))}
              </div>
            )}

            {/* EXAMPLES */}
            {view==="examples" && (
              <div style={{padding:"1rem",animation:"fadeUp 0.3s ease"}}>
                <div style={{fontSize:"0.78rem",fontWeight:700,color:C.blue,marginBottom:"0.8rem"}}>💬 Câu ví dụ & phân tích</div>
                {words.map((w,i)=><ExampleCard key={i} word={w}/>)}
              </div>
            )}

            {/* Panels */}
            {view==="grammar"      && <GrammarPanel/>}
            {view==="analyse"      && <AnalysePanel/>}
            {view==="defi"         && <DefiPanel/>}
            {view==="conjugaison"  && <ConjugaisonPanel/>}
            {view==="writing"      && <WritingPanel/>}
            {view==="weakspots"    && <WeakSpotsPanel/>}
            {view==="conversation" && <ConversationPanel/>}
          </div>
        </>
      )}

      {/* ══════════════════════════════════════
          BOTTOM TAB BAR (always visible)
      ══════════════════════════════════════ */}
      <div style={{ position:"fixed", bottom:0, left:0, right:0, zIndex:150 }}>
        <div style={{ maxWidth:680, margin:"0 auto", background:C.white, borderTop:`1.5px solid ${C.border}`, display:"flex", boxShadow:"0 -4px 24px rgba(74,144,217,0.10)", paddingBottom:"env(safe-area-inset-bottom)" }}>
          {TABS.map(tab => {
            const isActive = tab.id==="home" ? section==="home" : tab.id==="more" ? showMore : section===tab.id;
            return (
              <button key={tab.id} className="tab-btn"
                onClick={()=>{
                  if (tab.id==="more") { setShowMore(s=>!s); return; }
                  setShowMore(false);
                  if (tab.id==="home") { setSection("home"); return; }
                  const m = MODULES.find(m=>m.id===tab.id);
                  if (m) goSection(m.id, m.view);
                }}
                style={{ flex:1, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", padding:"0.55rem 0.25rem 0.65rem", background:"transparent", border:"none", cursor:"pointer", gap:"0.18rem", transition:"all 0.15s", position:"relative" }}>
                {/* Active indicator pill */}
                {isActive && (
                  <div style={{ position:"absolute", top:6, width:28, height:3, background:C.blue, borderRadius:999, animation:"pop 0.25s ease" }}/>
                )}
                <span style={{ fontSize:"1.25rem", lineHeight:1, marginTop:isActive?6:0, transition:"margin 0.15s" }}>{tab.icon}</span>
                <span style={{ fontSize:"0.6rem", color:isActive?C.blue:C.gray, fontWeight:isActive?700:400, letterSpacing:0.2, transition:"color 0.15s" }}>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
