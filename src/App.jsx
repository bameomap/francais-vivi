import { useState, useCallback, useEffect } from "react";
import { Home, BookOpen, Award, PenTool, Layers, Target, TrendingUp, Brain } from "lucide-react";
import { callAI, callAIBatched, buildPrompt } from "./utils/api.js";
import { loadSets, saveSets, getStreak, getProgress, markModuleUsed } from "./utils/storage.js";
import { parseWords } from "./utils/helpers.js";
import { C, applyTheme } from "./constants.js";

import SpeakBtn from "./components/ui/SpeakBtn.jsx";
import Spinner from "./components/ui/Spinner.jsx";
import Minou from "./components/ui/Minou.jsx";
import { SecLabel, QCard, SaveModal, ImportModal } from "./components/ui/SharedUI.jsx";
import { MCSection, FillSection, MatchSection, DicteeSection, FlashcardSection, AnagrammeSection } from "./components/QuizSections.jsx";
import ConversationPanel from "./components/ConversationPanel.jsx";
import WritingPanel from "./components/WritingPanel.jsx";
import GrammarPanel from "./components/GrammarPanel.jsx";
import VocabGenerator, { ExampleCard, EditoPresets, exportFillPDF } from "./components/VocabGenerator.jsx";
import DefiPanel from "./components/DefiPanel.jsx";
import SRSPanel from "./components/SRSPanel.jsx";
import ReferenceHub from "./components/ReferenceHub.jsx";
import ParcoursPanel from "./components/ParcoursPanel.jsx";
import MotDuJour from "./components/MotDuJour.jsx";
import LecturePanel from "./components/LecturePanel.jsx";
import StatsPanel from "./components/StatsPanel.jsx";
import RevisionPanel from "./components/RevisionPanel.jsx";
import BuiltinSetsPanel from "./components/BuiltinSetsPanel.jsx";
import EditoVocabPanel from "./components/EditoVocabPanel.jsx";
import EcouterPanel from "./components/EcouterPanel.jsx";
import SentenceBuilder from "./components/SentenceBuilder.jsx";
import ProfilPanel from "./components/ProfilPanel.jsx";
import { addWordToSRS, getSRSStats, getMasteredSet, getAllCards } from "./utils/srs.js";
import { getXPData, getLevel, getNextLevel, checkBadges, BADGE_DEFS } from "./utils/xp.js";
import { computeUnitStatuses, computeOverallProgress } from "./utils/parcours.js";
import { PARCOURS_UNITS } from "./data/parcoursData.js";

// ── Module definitions ──────────────────────────────────────
const MODULES = [
  // Học
  { id:"vocab",         group:"hoc",    label:"Từ vựng",    fr:"Le Vocabulaire",   icon:"📖", color:"#4A90D9", bg:"#EBF4FF", view:"edito"         },
  { id:"parcours",      group:"hoc",    label:"Lộ trình",   fr:"Le Parcours",      icon:"🛤️", color:"#E8574A", bg:"#FFF0EF", view:"parcours"      },
  { id:"grammar",       group:"hoc",    label:"Ngữ pháp",   fr:"La Grammaire",     icon:"⚜️", color:"#7B6CF6", bg:"#F0EEFF", view:"grammar"       },
  { id:"reference_hub", group:"hoc",    label:"Tra cứu",    fr:"La Référence",     icon:"🗺️", color:"#6D28D9", bg:"#F5F0FF", view:"reference_hub" },
  { id:"sentence",      group:"hoc",    label:"Câu ghép từ",fr:"Les Phrases",      icon:"🧩", color:"#7B6CF6", bg:"#F0EEFF", view:"sentence"      },
  // Luyện
  { id:"conversation",  group:"luyen",  label:"Giao tiếp",  fr:"La Conversation",  icon:"🥐", color:"#2980B9", bg:"#E8F4FD", view:"conversation"  },
  { id:"writing",       group:"luyen",  label:"Luyện viết", fr:"L'Écriture",       icon:"🖋️", color:"#E67E22", bg:"#FEF3E2", view:"writing"       },
  { id:"defi",          group:"luyen",  label:"Thử thách",  fr:"Le Défi du Jour",  icon:"🏆", color:"#8E44AD", bg:"#F5EEFF", view:"defi"          },
  { id:"lecture",       group:"luyen",  label:"Đọc hiểu",   fr:"La Lecture",       icon:"📜", color:"#059669", bg:"#ECFDF5", view:"lecture"       },
  { id:"dictee",        group:"luyen",  label:"Nghe chép",  fr:"La Dictée",        icon:"🎵", color:"#0891B2", bg:"#F0F9FF", view:"ecouter"       },
  { id:"srs",           group:"luyen",  label:"Thẻ ôn tập", fr:"La Répétition",    icon:"🃏", color:"#0D9488", bg:"#F0FDFA", view:"srs"           },
  { id:"listening",     group:"luyen",  label:"Nghe chọn",  fr:"L'Écoute",         icon:"🎧", color:"#0891B2", bg:"#F0F9FF", view:"ecouter"       },
  { id:"revision",      group:"luyen",  label:"Ôn sai",     fr:"La Révision",      icon:"🔍", color:"#DC2626", bg:"#FEF2F2", view:"revision"      },
  // Công cụ
  { id:"stats",         group:"congcu", label:"Thống kê",   fr:"Les Statistiques", icon:"📈", color:"#0891B2", bg:"#F0F9FF", view:"stats"         },
];

const GROUP_DEFS = [
  { id:"vocab",    icon:"📖", LucideIcon:BookOpen,    label:"Từ vựng",   color:"#4A90D9", bg:"#EBF4FF", desc:"Học & ôn từ mới",         moduleIds:["vocab","parcours","srs"] },
  { id:"grammar",  icon:"⚜️", LucideIcon:Award,       label:"Ngữ pháp",  color:"#7B6CF6", bg:"#F0EEFF", desc:"Ngữ pháp & tra cứu",     moduleIds:["grammar","reference_hub","sentence"] },
  { id:"practice", icon:"🥐", LucideIcon:Target,      label:"Luyện tập", color:"#E67E22", bg:"#FEF3E2", desc:"Nghe · Nói · Viết · Đọc", moduleIds:["conversation","writing","defi","lecture","dictee","listening"] },
  { id:"progress", icon:"📈", LucideIcon:TrendingUp,  label:"Theo dõi",  color:"#0D9488", bg:"#F0FDFA", desc:"Thống kê & ôn sai",       moduleIds:["stats","revision"] },
];

const TABS = [
  { id:"home",     glyph:"⌂",  label:"Home",      section:"home",          view:"home",          color:null       },
  { id:"parcours", glyph:"⇢",  label:"Parcours",  section:"parcours",      view:"parcours",      color:"#E8574A"  },
  { id:"vocab",    glyph:"Aa", label:"Vocab",     section:"vocab",         view:"input",         color:"#4A90D9"  },
  { id:"ref",      glyph:"ƒ",  label:"Référence", section:"reference_hub", view:"reference_hub", color:"#F5A623"  },
  { id:"profil",   glyph:"◉",  label:"Profil",    section:"profil",        view:"profil",        color:"#3A4664"  },
];

const SECTION_TITLE = {
  vocab:"Le Vocabulaire", parcours:"Le Parcours", grammar:"La Grammaire", conversation:"La Conversation",
  writing:"L'Écriture", defi:"Le Défi du Jour", reference_hub:"La Référence",
  lecture:"La Lecture", dictee:"La Dictée", ecouter:"L'Écoute",
  revision:"La Révision", stats:"Les Statistiques",
  listening:"L'Écoute Active", sentence:"Les Phrases",
  profil:"Mon Profil",
};

// ── Examples view with bulk select ──────────────────────────
function ExamplesView({ words }) {
  const [selected, setSelected] = useState(() => new Set());
  const [triggers, setTriggers] = useState({});
  const allSelected = words.length > 0 && selected.size === words.length;

  const toggleAll = () => setSelected(allSelected ? new Set() : new Set(words.map(w => w.fr)));
  const toggle = fr => setSelected(prev => { const s = new Set(prev); s.has(fr) ? s.delete(fr) : s.add(fr); return s; });
  const batchGen = () => setTriggers(prev => {
    const next = { ...prev };
    for (const fr of selected) next[fr] = (next[fr] || 0) + 1;
    return next;
  });

  return (
    <div style={{ padding:"1rem", animation:"fadeUp 0.3s ease" }}>
      {/* Header bar */}
      <div style={{ display:"flex", alignItems:"center", gap:"0.5rem", marginBottom:"0.75rem", flexWrap:"wrap" }}>
        <div style={{ fontSize:"0.78rem", fontWeight:700, color:C.blue, flex:1 }}>💬 Câu ví dụ & phân tích</div>
        <button onClick={toggleAll}
          style={{ padding:"0.22rem 0.62rem", background:"transparent", border:`1.5px solid ${C.border}`, color:C.gray, borderRadius:20, fontSize:"0.67rem", cursor:"pointer" }}>
          {allSelected ? "Bỏ chọn tất cả" : "Chọn tất cả"}
        </button>
        {selected.size > 0 && (
          <button onClick={batchGen}
            style={{ padding:"0.28rem 0.75rem", background:C.purple, color:C.white, border:"none", borderRadius:20, fontSize:"0.72rem", cursor:"pointer", fontWeight:600 }}>
            Tạo {selected.size} từ ✦
          </button>
        )}
      </div>

      {words.map((w, i) => (
        <div key={i} style={{ display:"flex", alignItems:"flex-start", gap:"0.4rem" }}>
          <input type="checkbox" checked={selected.has(w.fr)} onChange={() => toggle(w.fr)}
            style={{ marginTop:"0.78rem", flexShrink:0, cursor:"pointer", accentColor:C.purple, width:15, height:15 }}/>
          <div style={{ flex:1 }}>
            <ExampleCard word={w} triggerKey={triggers[w.fr] || 0}/>
          </div>
        </div>
      ))}
    </div>
  );
}

// ── Main App ────────────────────────────────────────────────
export default function App() { return <AppInner />; }

function AppInner() {
  const [text, setText]                 = useState(() => localStorage.getItem("vocab_text") || "");
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
  const [onboarded, setOnboarded]       = useState(() => !!localStorage.getItem("onboarded"));
  const [userName, setUserName]         = useState(() => localStorage.getItem("user_name") || "");
  const [nameInput, setNameInput]       = useState("");
  const [streakData, setStreakData]     = useState(getStreak);
  const [progress, setProgress]         = useState(getProgress);
  const [srsStats, setSrsStats]         = useState(getSRSStats);
  const [filterMastered, setFilterMastered] = useState(true);
  const [vocabSearch, setVocabSearch]       = useState("");
  const [vocabFilter, setVocabFilter]       = useState("all");
  const [dark, setDark] = useState(() => {
    const saved = localStorage.getItem("dark_mode") === "1";
    if (saved) applyTheme(true);
    return saved;
  });
  const toggleDark = () => {
    const next = !dark;
    applyTheme(next);
    localStorage.setItem("dark_mode", next ? "1" : "0");
    setDark(next);
  };
  const [editOpen, setEditOpen]             = useState(false);
  const [activeGroup, setActiveGroup]       = useState(null);
  const [fromGroup,   setFromGroup]         = useState(null);
  const [xpData, setXpData]                 = useState(getXPData);
  const [badgeToast, setBadgeToast]         = useState("");

  const setTextPersist = (val) => { setText(val); localStorage.setItem("vocab_text", val); };
  const words = parseWords(text);
  const CLIENT_TYPES = ["dictee","flashcard","anagramme"];
  const TYPE_NAMES = { multiple_choice:"Trắc nghiệm", fill_blank:"Điền từ", matching:"Nối từ", dictee:"Dictée", flashcard:"Flashcard", anagramme:"Anagramme", mixed:"Hỗn hợp" };
  const hasFill = quiz && (quiz.type==="fill_blank"||(quiz.type==="mixed"&&quiz.sections?.some(s=>s.sectionType==="fill_blank")));

  useEffect(() => { setSets(loadSets()); }, []);

  const showToast = msg => { setToast(msg); setTimeout(() => setToast(""), 2400); };

  const goSection = (s, v) => {
    setSection(s); setView(v || s);
    setEditOpen(false);
    // Remember which group launched this module so "← Về" can return to it
    setFromGroup(activeGroup);
    setActiveGroup(null);
    markModuleUsed(s);
    setStreakData(getStreak());
    setProgress(getProgress());
    setXpData(getXPData());
    // Check first_lesson badge
    const srs = getSRSStats();
    const streak = getStreak();
    const earned = checkBadges({ srsTotal: srs.total, mastered: srs.mastered, streak: streak.streak });
    if (earned.length) {
      const badge = BADGE_DEFS.find(b => b.id === earned[0]);
      if (badge) { setBadgeToast(`🏅 ${badge.icon} ${badge.label}!`); setTimeout(()=>setBadgeToast(""), 3000); }
    }
  };

  const recordAnswer = useCallback((word, isOk) => {
    setStats(prev => {
      const e = prev[word] || { ok:0, wrong:0 };
      return { ...prev, [word]: { ok: e.ok+(isOk?1:0), wrong: e.wrong+(isOk?0:1) } };
    });
    // Auto-add word to SRS deck when encountered in quizzes
    const wordObj = words.find(w => w.fr === word);
    if (wordObj) {
      addWordToSRS(wordObj.fr, wordObj.vi);
      setSrsStats(getSRSStats());
    }
  }, [words]);

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

    // Filter out mastered words (SRS repetitions >= 2 & interval >= 3 days)
    // unless user disabled the filter OR too few words remain
    let quizWords = words;
    if (filterMastered && !CLIENT_TYPES.includes(type)) {
      const mastered = getMasteredSet();
      const fresh = words.filter(w => !mastered.has(w.fr));
      if (fresh.length >= 2) quizWords = fresh;
      // if < 2 fresh words, fall through and use all (let user know below)
    }

    if (CLIENT_TYPES.includes(type)) { setQuiz({ type, words: quizWords }); setView("quiz"); return; }
    if (quizWords.length < 3) { setError("Cần ít nhất 3 từ! (Thêm từ mới hoặc tắt bộ lọc.)"); return; }
    setLoading(true); setError(null); setQuiz(null); setView("quiz");
    try { setQuiz(await callAIBatched(type, quizWords, numQ)); }
    catch(e) { setError(e.message); setView("input"); }
    setLoading(false);
  }, [words, type, numQ, filterMastered]);

  const handleSave = async name => {
    const newSet = { id:Date.now(), name, text, count:words.length, date:new Date().toLocaleDateString("vi-VN") };
    const updated = [newSet, ...sets];
    setSets(updated); saveSets(updated);
    setShowSave(false); showToast("✓ Đã lưu bộ từ!");
  };

  function renderQuiz() {
    if (!quiz) return null;
    if (quiz.type==="multiple_choice") return <MCSection questions={quiz.questions} words={words} onRecord={recordAnswer} onWrong={recordWrong}/>;
    if (quiz.type==="fill_blank")      return <FillSection questions={quiz.questions} words={words} onRecord={recordAnswer} onWrong={recordWrong}/>;
    if (quiz.type==="matching")        return <MatchSection pairs={quiz.pairs}/>;
    if (quiz.type==="dictee")          return <DicteeSection words={quiz.words} onRecord={recordAnswer}/>;
    if (quiz.type==="flashcard")       return <FlashcardSection words={quiz.words} onRecord={recordAnswer}/>;
    if (quiz.type==="anagramme")       return <AnagrammeSection words={quiz.words} onRecord={recordAnswer}/>;
    if (quiz.type==="mixed") return quiz.sections.map((sec,i)=>(
      <div key={i}>
        {sec.sectionType==="multiple_choice"&&<MCSection questions={sec.questions} words={words} sl onRecord={recordAnswer} onWrong={recordWrong}/>}
        {sec.sectionType==="fill_blank"&&<FillSection questions={sec.questions} words={words} sl onRecord={recordAnswer} onWrong={recordWrong}/>}
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
        @keyframes fadeUp {
          from { opacity:0; transform:translateY(10px); }
          to   { opacity:1; transform:translateY(0);    }
        }
        @keyframes pop {
          0%   { opacity:0; transform:translateX(-50%) scale(0.85); }
          60%  { transform:translateX(-50%) scale(1.06); }
          100% { opacity:1; transform:translateX(-50%) scale(1);    }
        }
        @keyframes slideUp {
          from { opacity:0; transform:translateY(40px); }
          to   { opacity:1; transform:translateY(0);    }
        }
        @keyframes minouBounce {
          0%,100% { transform:translateY(0);   }
          50%     { transform:translateY(-4px); }
        }
        @keyframes confettiFall {
          to { transform:translateY(110vh) rotate(540deg); opacity:0; }
        }
      `}</style>

      {/* ── Toast ── */}
      {(toast || badgeToast) && (
        <div style={{ position:"fixed", top:20, left:"50%", transform:"translateX(-50%)", background:badgeToast?"#7C3AED":C.ink, color:C.white, padding:"0.55rem 1.2rem", borderRadius:24, fontSize:"0.8rem", zIndex:400, whiteSpace:"nowrap", boxShadow:"0 4px 20px rgba(0,0,0,0.2)", animation:"pop 0.3s ease" }}>
          {badgeToast || toast}
        </div>
      )}

      {/* ── Modals ── */}
      {showSave   && <SaveModal   text={text} onSave={handleSave}                                    onClose={()=>setShowSave(false)}   />}
      {showImport && <ImportModal onImport={t=>{setTextPersist(t);showToast("✓ Import thành công!");}} onClose={()=>setShowImport(false)} />}


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
                  {icon:"📖",text:"Từ vựng — nhập từ, luyện flashcard & bài tập"},
                  {icon:"🖊️",text:"Chia động từ — tra bảng chia ngay khi cần"},
                  {icon:"🥐",text:"Giao tiếp — roleplay tình huống thực tế với AI"},
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
          HOME PAGE — Today Screen
      ══════════════════════════════════════ */}
      {section==="home" && (
        <div style={{ minHeight:"100vh", display:"flex", flexDirection:"column", paddingBottom:80 }}>

          {/* ── Top bar ── */}
          <div style={{ padding:"6px 16px 12px", display:"flex", justifyContent:"space-between", alignItems:"center", gap:8 }}>
            <div style={{ display:"flex", gap:10, alignItems:"center", minWidth:0, flexShrink:1 }}>
              {/* French flag mini */}
              <div style={{ width:28, height:28, borderRadius:7, background:"linear-gradient(90deg, #002395 33%, #fff 33%, #fff 66%, #ED2939 66%)", boxShadow:"0 1px 3px rgba(0,0,0,0.1)", flexShrink:0 }}/>
              <span style={{ fontFamily:"'Playfair Display',Georgia,serif", fontWeight:700, fontSize:16, letterSpacing:"-0.01em", color:C.ink, whiteSpace:"nowrap" }}>Français</span>
            </div>
            <div style={{ display:"flex", gap:6, alignItems:"center", flexShrink:0 }}>
              {/* Combined streak + XP chip */}
              <span style={{ background:C.cream, padding:"4px 10px", borderRadius:999, fontWeight:700, display:"inline-flex", alignItems:"center", gap:5, color:C.ink, fontSize:11.5, border:`1px solid ${C.border}` }}>
                <span style={{ color:C.accent }}>🔥</span>{streakData.streak}
                <span style={{ color:C.gray2, fontWeight:400 }}>·</span>
                <span style={{ color:C.gold }}>★</span>{xpData.total||0}
              </span>
              <button onClick={toggleDark}
                style={{ background:"transparent", border:`1px solid ${C.border}`, color:C.gray, borderRadius:20, padding:"3px 8px", fontSize:"0.82rem", cursor:"pointer", lineHeight:1 }}>
                {dark ? "☀️" : "🌙"}
              </button>
            </div>
          </div>

          {/* ── Greeting + Minou ── */}
          <div style={{ padding:"0 16px 4px", animation:"fadeUp 0.4s ease" }}>
            <div style={{ fontSize:12, color:C.gray, marginBottom:2 }}>Bonjour,</div>
            <div style={{ fontFamily:"'Playfair Display',Georgia,serif", fontSize:28, lineHeight:1.1, fontWeight:700, letterSpacing:"-0.02em", color:C.ink, marginBottom:8 }}>
              {userName || "Bạn"} 🇫🇷
            </div>
            <Minou
              mood={streakData.streak >= 7 ? "excited" : srsStats.due === 0 && srsStats.total > 0 ? "proud" : "happy"}
              message={
                streakData.streak >= 7 ? "Fantastique! Chuỗi ngày học tuyệt vời! 🔥" :
                srsStats.due === 0 && srsStats.total > 0 ? "Ôn tập xong rồi, bravo! ✨" :
                srsStats.due > 0 ? `Còn ${srsStats.due} từ chờ ôn nhé~ 📚` :
                "Bonne chance hôm nay! On y va! 🌟"
              }
              align="left"
            />
          </div>

          {/* ── Focus card (Parcours-driven) ── */}
          {(() => {
            const statuses = computeUnitStatuses();
            const focusUnit = PARCOURS_UNITS.find(u => statuses[u.id]?.status === "current")
              || PARCOURS_UNITS.find(u => statuses[u.id]?.status === "next");
            const overall = computeOverallProgress();
            if (!focusUnit) return (
              <div style={{ margin:"0.75rem 1.25rem 0", background:`linear-gradient(135deg, ${C.green}, #059669)`, borderRadius:18, padding:"1.1rem 1.4rem", color:"#fff", animation:"fadeUp 0.4s ease 0.05s both" }}>
                <div style={{ fontFamily:"'Playfair Display',Georgia,serif", fontSize:"1.1rem", fontWeight:700 }}>🎉 Parcours hoàn thành!</div>
                <div style={{ fontSize:"0.78rem", opacity:0.9, marginTop:4 }}>Bạn đã hoàn thành tất cả units A1.</div>
              </div>
            );
            const { pct } = statuses[focusUnit.id] || { pct:0 };
            const isCurrent = statuses[focusUnit.id]?.status === "current";
            return (
              <div style={{ margin:"0.75rem 1.25rem 0", animation:"fadeUp 0.4s ease 0.05s both" }}>
                <div style={{ background:`linear-gradient(135deg, ${C.ink} 0%, #2d4f8a 100%)`, borderRadius:18, padding:"1.15rem 1.35rem", color:"#fff", position:"relative", overflow:"hidden" }}>
                  <div style={{ position:"absolute", right:-18, top:-18, width:90, height:90, borderRadius:"50%", background:"radial-gradient(circle, #E8574A18 0%, transparent 70%)" }}/>
                  <div style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:"0.58rem", letterSpacing:"0.18em", opacity:0.6, marginBottom:5, textTransform:"uppercase" }}>
                    {isCurrent ? `UNIT ${focusUnit.num} · ĐANG HỌC` : `UNIT ${focusUnit.num} · TIẾP THEO`}
                  </div>
                  <div style={{ fontFamily:"'Playfair Display',Georgia,serif", fontSize:"1.25rem", fontWeight:700, lineHeight:1.1, marginBottom:4 }}>
                    {focusUnit.emoji} {focusUnit.fr}
                  </div>
                  <div style={{ fontSize:"0.75rem", opacity:0.75, marginBottom:12 }}>{focusUnit.vi} · {focusUnit.grammar}</div>
                  <div style={{ background:"rgba(255,255,255,0.18)", borderRadius:999, height:4, marginBottom:8 }}>
                    <div style={{ height:"100%", width:`${pct}%`, background:"#fff", borderRadius:999, transition:"width 0.8s ease" }}/>
                  </div>
                  <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
                    <span style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:"0.65rem", opacity:0.8 }}>
                      {pct}% · {overall.done}/{overall.total} steps tổng
                    </span>
                    <button onClick={()=>goSection("parcours","parcours")}
                      style={{ background:"rgba(255,255,255,0.18)", color:"#fff", border:"1px solid rgba(255,255,255,0.4)", borderRadius:999, padding:"0.3rem 0.85rem", fontSize:"0.72rem", cursor:"pointer", fontWeight:700 }}>
                      {isCurrent ? "Tiếp tục →" : "Bắt đầu →"}
                    </button>
                  </div>
                </div>
              </div>
            );
          })()}

          {/* ── 3-stat row ── */}
          <div style={{ margin:"0.75rem 16px 0", display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:7, animation:"fadeUp 0.4s ease 0.1s both" }}>
            {[
              { val:srsStats.mastered,    lbl:"Từ thuộc",     color:C.green  },
              { val:srsStats.due,         lbl:"Cần ôn",       color:C.gold   },
              { val:wrongAnswers.length,  lbl:"Sai gần đây",  color:C.accent },
            ].map(({ val, lbl, color }) => (
              <div key={lbl} style={{ background:C.white, border:`1px solid ${C.border}`, borderRadius:12, padding:"10px 8px", textAlign:"center" }}>
                <div style={{ fontFamily:"'Playfair Display',Georgia,serif", fontSize:22, fontWeight:700, color, lineHeight:1 }}>{val}</div>
                <div style={{ fontSize:10.5, color:C.gray, marginTop:4 }}>{lbl}</div>
              </div>
            ))}
          </div>

          {/* ── Mot du Jour ── */}
          <MotDuJour words={words} />

          {/* ── 4 skill cards ── */}
          <div style={{ padding:"0 16px", marginTop:14 }}>
            <div style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:10.5, fontWeight:600, color:C.gray, letterSpacing:"0.12em", textTransform:"uppercase", marginBottom:8 }}>
              Luyện theo kỹ năng
            </div>
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:8 }}>
              {[
                { fr:"Lire",    vi:"Đọc",  glyph:"Aa", sub:"Đọc hiểu",   color:"#4A90D9", fn:()=>goSection("lecture","lecture")          },
                { fr:"Écouter", vi:"Nghe", glyph:"))", sub:"Nghe chép",  color:"#7B6CF6", fn:()=>goSection("ecouter","ecouter")          },
                { fr:"Parler",  vi:"Nói",  glyph:"••", sub:"Roleplay AI", color:"#E67E22", fn:()=>goSection("conversation","conversation") },
                { fr:"Écrire",  vi:"Viết", glyph:"/",  sub:"Luyện viết", color:"#10B981", fn:()=>goSection("writing","writing")          },
              ].map((s, i) => (
                <button key={s.fr} className="card-hover" onClick={s.fn}
                  style={{ background:C.white, border:`1px solid ${C.border}`, borderRadius:14, padding:"12px 14px", position:"relative", overflow:"hidden", textAlign:"left", cursor:"pointer", fontFamily:"inherit", animation:`fadeUp 0.3s ease ${0.12+i*0.05}s both` }}>
                  {/* glyph watermark */}
                  <div style={{ position:"absolute", right:-8, top:-8, fontFamily:"'Playfair Display',Georgia,serif", fontSize:48, fontWeight:700, color:s.color, opacity:0.12, letterSpacing:"-0.05em", lineHeight:1, pointerEvents:"none", userSelect:"none" }}>
                    {s.glyph}
                  </div>
                  <div style={{ fontFamily:"'Playfair Display',Georgia,serif", fontWeight:700, fontSize:16, color:s.color, lineHeight:1.1 }}>{s.fr}</div>
                  <div style={{ fontSize:10.5, color:C.gray, marginTop:1 }}>{s.vi}</div>
                  <div style={{ fontSize:10.5, color:C.ink2, marginTop:8, fontWeight:500 }}>{s.sub}</div>
                </button>
              ))}
            </div>
          </div>

          <div style={{ height:"1.5rem" }} />
        </div>
      )}

      {/* ══════════════════════════════════════
          APP SHELL (non-home sections)
      ══════════════════════════════════════ */}
      {section!=="home" && section!=="profil" && (
        <>
          {/* ── Header ── */}
          <div style={{ background:C.white, padding:"0.6rem 1rem", display:"flex", flexDirection:"column", gap:"0.4rem", borderBottom:`1.5px solid ${C.border}`, position:"sticky", top:0, zIndex:100, boxShadow:"0 1px 12px rgba(74,144,217,0.08)" }}>
            {/* Row 1: back + title + dark toggle */}
            <div style={{ display:"flex", alignItems:"center", gap:"0.6rem" }}>
              <button onClick={()=>{ setSection("home"); if (fromGroup) { setActiveGroup(fromGroup); setFromGroup(null); } }}
                style={{ background:C.blueL, border:`1.5px solid ${C.blue}33`, color:C.blue, cursor:"pointer", fontSize:"0.82rem", padding:"0.3rem 0.65rem", borderRadius:10, fontWeight:600, transition:"all 0.15s", flexShrink:0 }}>
                ← Về
              </button>
              <span style={{ fontFamily:"'Playfair Display',Georgia,serif", fontSize:"1rem", color:C.ink, fontWeight:600, flex:1 }}>
                {SECTION_TITLE[section] || section}
              </span>
              <button onClick={toggleDark}
                style={{ background:"transparent", border:`1.5px solid ${C.border}`, color:C.gray, borderRadius:20, padding:"0.2rem 0.5rem", fontSize:"0.8rem", cursor:"pointer", lineHeight:1, flexShrink:0 }}>
                {dark ? "☀️" : "🌙"}
              </button>
            </div>
            {/* Row 2: segmented vocab tabs */}
            {section==="vocab" && (
              <div style={{ padding:"0 0 10px" }}>
                <div style={{ display:"flex", gap:4, background:C.cream, padding:4, borderRadius:11 }}>
                  {[
                    { label:"Bộ của tôi", view:"input"   },
                    { label:"Themes A1",  view:"topics"  },
                    { label:"Phrasebook", view:"history" },
                    { label:"Edito",      view:"edito"   },
                  ].map(t => {
                    const isActive = t.view === view || (t.view==="input" && !["topics","history","edito","vocab-table","examples","quiz"].includes(view));
                    return (
                      <button key={t.label} onClick={()=>setView(t.view)}
                        style={{
                          flex:1, padding:"7px 4px",
                          background:isActive ? C.white : "transparent",
                          border:"none", borderRadius:8, cursor:"pointer",
                          fontWeight:isActive ? 700 : 500,
                          color:isActive ? C.ink : C.gray,
                          fontFamily:"inherit", fontSize:11,
                          boxShadow:isActive ? "0 1px 3px rgba(0,0,0,0.06)" : "none",
                          whiteSpace:"nowrap", transition:"all 0.15s",
                        }}>
                        {t.label}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* ── Content ── */}
          <div style={{ minHeight:"calc(100vh - 130px)", paddingBottom:80 }}>

            {/* EDITO VOCAB */}
            {view==="edito" && <EditoVocabPanel />}

            {/* INPUT */}
            {view==="input" && (
              <div style={{ padding:"1rem", display:"flex", flexDirection:"column", gap:"0.85rem", animation:"fadeUp 0.3s ease" }}>

                {/* ── SRS Summary card ── */}
                <div style={{ background:C.white, border:`1px solid ${C.border}`, borderRadius:14, padding:"12px 14px", display:"flex", alignItems:"center", gap:12 }}>
                  <div style={{ flex:1 }}>
                    <div style={{ fontFamily:"'Playfair Display',Georgia,serif", fontSize:22, fontWeight:700, lineHeight:1 }}>
                      <span style={{ color:C.blue }}>{srsStats.total}</span>
                      <span style={{ color:C.gray, fontWeight:400, fontSize:13 }}> · </span>
                      <span style={{ color:C.green, fontSize:18 }}>{srsStats.mastered} thuộc</span>
                    </div>
                    <div style={{ fontSize:11, color:C.gray, marginTop:3 }}>{srsStats.due} cần ôn hôm nay</div>
                  </div>
                  <div style={{ display:"flex", gap:6, flexShrink:0 }}>
                    {srsStats.due > 0 && (
                      <button onClick={()=>goSection("srs","srs")}
                        style={{ background:C.accent, color:"#fff", border:"none", padding:"8px 14px", borderRadius:999, fontWeight:700, fontSize:12, cursor:"pointer", whiteSpace:"nowrap" }}>
                        Ôn {srsStats.due} →
                      </button>
                    )}
                    <button onClick={()=>setEditOpen(o=>!o)}
                      style={{ background:editOpen?C.blueL:"transparent", border:`1.5px solid ${C.blue}44`, color:C.blue, borderRadius:999, padding:"6px 12px", fontSize:11.5, cursor:"pointer", fontWeight:600 }}>
                      ✏️
                    </button>
                  </div>
                </div>

                {/* ── Search ── */}
                <div style={{ background:C.white, border:`1px solid ${C.border}`, borderRadius:10, padding:"8px 12px", display:"flex", alignItems:"center", gap:8 }}>
                  <span style={{ color:C.gray2, fontSize:16 }}>⌕</span>
                  <input value={vocabSearch} onChange={e=>setVocabSearch(e.target.value)}
                    placeholder="Tìm từ tiếng Pháp hoặc nghĩa Việt…"
                    style={{ border:"none", outline:"none", flex:1, fontSize:12.5, fontFamily:"inherit", color:C.ink, background:"transparent" }}/>
                </div>

                {/* ── Filter chips ── */}
                <div style={{ display:"flex", gap:6, flexWrap:"nowrap", overflowX:"auto" }}>
                  {[
                    { label:`Tất cả · ${srsStats.total}`,      val:"all"      },
                    { label:`Cần ôn · ${srsStats.due}`,         val:"due"      },
                    { label:`Đã thuộc · ${srsStats.mastered}`,  val:"mastered" },
                    { label:`Mới · ${srsStats.new}`,            val:"new"      },
                  ].map(chip => (
                    <button key={chip.val} onClick={()=>setVocabFilter(chip.val)}
                      style={{
                        padding:"5px 10px", borderRadius:999, fontSize:11, whiteSpace:"nowrap",
                        background:vocabFilter===chip.val ? C.ink : C.white,
                        color:vocabFilter===chip.val ? "#fff" : C.ink2||C.ink,
                        border:`1px solid ${vocabFilter===chip.val ? C.ink : C.border}`,
                        fontWeight:vocabFilter===chip.val ? 600 : 500,
                        cursor:"pointer", fontFamily:"inherit", transition:"all 0.15s",
                      }}>{chip.label}</button>
                  ))}
                </div>

                {/* ── SRS Word list ── */}
                {(() => {
                  const now = Date.now();
                  const allCards = getAllCards();
                  const q = vocabSearch.toLowerCase();
                  const getMastery = card => {
                    if (card.interval >= 21) return 5;
                    if (card.interval >= 7)  return 4;
                    if (card.interval >= 3)  return 3;
                    if (card.interval >= 1)  return 2;
                    return 1;
                  };
                  let filtered = allCards;
                  if (q) filtered = filtered.filter(c => c.fr.toLowerCase().includes(q) || (c.vi||"").toLowerCase().includes(q));
                  if (vocabFilter==="due")      filtered = filtered.filter(c => c.dueDate <= now);
                  if (vocabFilter==="mastered") filtered = filtered.filter(c => c.interval >= 21);
                  if (vocabFilter==="new")      filtered = filtered.filter(c => c.repetitions === 0);
                  if (filtered.length === 0) return (
                    <div style={{ textAlign:"center", padding:"20px 0", color:C.gray, fontSize:12.5 }}>
                      {allCards.length === 0
                        ? <Minou mood="sleeping" message="Chưa có từ trong SRS. Học Edito để thêm từ!" size="sm"/>
                        : "Không có từ nào phù hợp."}
                    </div>
                  );
                  return (
                    <div style={{ background:C.white, borderRadius:12, border:`1px solid ${C.border}`, overflow:"hidden" }}>
                      {filtered.map((card, i) => {
                        const mastery = getMastery(card);
                        const barColor = mastery >= 5 ? C.green : mastery >= 3 ? C.gold : C.accent;
                        return (
                          <div key={card.fr} style={{
                            display:"flex", alignItems:"center", gap:12,
                            padding:"10px 12px",
                            borderBottom:i < filtered.length - 1 ? `1px solid ${C.borderSoft||"#EEF2FA"}` : "none",
                          }}>
                            <div style={{ display:"flex", flexDirection:"column", gap:1.5, flexShrink:0 }}>
                              {[5,4,3,2,1].map(n => (
                                <div key={n} style={{ width:14, height:2.5, borderRadius:999, background:n <= mastery ? barColor : C.borderSoft||"#EEF2FA" }}/>
                              ))}
                            </div>
                            <div style={{ flex:1, minWidth:0 }}>
                              <div style={{ fontFamily:"'Playfair Display',Georgia,serif", fontWeight:700, fontSize:14.5, color:C.ink, letterSpacing:"-0.01em" }}>
                                {card.fr}
                              </div>
                              <div style={{ fontSize:11, color:C.gray, marginTop:1 }}>{card.vi}</div>
                            </div>
                            <SpeakBtn text={card.fr} size="sm"/>
                          </div>
                        );
                      })}
                    </div>
                  );
                })()}

                {/* ── Divider before exercise builder ── */}
                <div style={{ display:"flex", alignItems:"center", gap:8, marginTop:4 }}>
                  <div style={{ flex:1, height:1, background:C.border }}/>
                  <span style={{ fontSize:10, fontWeight:700, color:C.gray, letterSpacing:"0.1em", textTransform:"uppercase" }}>Luyện tập tự do</span>
                  <div style={{ flex:1, height:1, background:C.border }}/>
                </div>

                {/* ── Collapsible Editor ── */}
                {editOpen && (
                  <div style={{ display:"flex", flexDirection:"column", gap:"0.7rem", animation:"fadeUp 0.2s ease" }}>
                    <VocabGenerator onGenerate={generated=>{
                      const lines = generated.map(w=>`${w.fr} — ${w.vi}`).join("\n");
                      setTextPersist(lines); setView("vocab-table"); setGeneratedVocab(generated); setEditOpen(false);
                    }}/>
                    <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
                      <div style={{ fontSize:"0.72rem", fontWeight:600, color:C.gray }}>📝 Nhập từ vựng thủ công</div>
                      <div style={{ display:"flex", gap:"0.4rem" }}>
                        <button onClick={()=>setShowImport(true)} style={{ padding:"0.22rem 0.58rem", background:"transparent", border:`1.5px solid ${C.border}`, color:C.gray, borderRadius:20, fontSize:"0.67rem", cursor:"pointer" }}>📁 Import</button>
                        {words.length>=1 && <button onClick={()=>{
                          const content = words.map(w=>w.vi?`${w.fr} — ${w.vi}`:w.fr).join("\n");
                          const a = document.createElement("a");
                          a.href = URL.createObjectURL(new Blob([content],{type:"text/plain"}));
                          a.download = `tu-vung-${new Date().toISOString().slice(0,10)}.txt`;
                          a.click();
                        }} style={{ padding:"0.22rem 0.58rem", background:"transparent", border:`1.5px solid ${C.border}`, color:C.gray, borderRadius:20, fontSize:"0.67rem", cursor:"pointer" }}>⬇ Export</button>}
                        {words.length>=3 && <button onClick={()=>setShowSave(true)} style={{ padding:"0.22rem 0.58rem", background:"transparent", border:`1.5px solid ${C.blue}`, color:C.blue, borderRadius:20, fontSize:"0.67rem", cursor:"pointer" }}>💾 Lưu</button>}
                      </div>
                    </div>
                    <textarea value={text} onChange={e=>setTextPersist(e.target.value)}
                      placeholder={"la boulangerie — tiệm bánh mì\nle marché — chợ\n..."}
                      style={{ width:"100%", height:145, border:`1.5px solid ${C.border}`, borderRadius:12, padding:"0.65rem 0.75rem", fontFamily:"inherit", fontSize:"0.85rem", background:C.white, resize:"vertical", color:C.ink, lineHeight:1.7, boxSizing:"border-box" }}/>
                    <div style={{ fontSize:"0.7rem", color:C.gray }}>
                      Mỗi dòng: <code style={{ background:C.blueL, color:C.blue, padding:"1px 6px", borderRadius:4, fontSize:"0.68rem" }}>từ pháp — nghĩa</code>
                      {words.length>0 && <span style={{ color:C.blue, marginLeft:8, fontWeight:600 }}>{words.length} từ</span>}
                    </div>
                  </div>
                )}

                {/* ── Exercise type selector ── */}
                <div style={{ background:C.white, borderRadius:16, padding:"0.9rem", border:`1.5px solid ${C.border}` }}>
                  <div style={{ fontSize:"0.75rem", fontWeight:700, color:C.blue, marginBottom:"0.6rem" }}>🎯 Chế độ học</div>
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

                {/* ── Number of questions ── */}
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
                  {loading ? "Đang tạo..." : "Bắt đầu luyện tập ✦"}
                </button>
              </div>
            )}

            {/* HISTORY */}
            {view==="history" && (
              <div style={{ padding:"1rem", animation:"fadeUp 0.3s ease" }}>
                <div style={{ fontSize:"0.78rem", fontWeight:700, color:C.blue, marginBottom:"0.8rem" }}>📂 Bộ từ đã lưu</div>
                {sets.length===0
                  ? <div style={{ textAlign:"center", padding:"1.5rem 1rem" }}>
                      <div style={{ display:"flex", justifyContent:"center", marginBottom:"0.75rem" }}>
                        <Minou mood="thinking" message="Chưa lưu bộ từ nào..." size="md"/>
                      </div>
                      <div style={{ fontFamily:"'Playfair Display',Georgia,serif", fontSize:"0.95rem", color:C.ink, marginBottom:"0.3rem" }}>Lưu bộ từ đầu tiên nhé!</div>
                      <div style={{ fontSize:"0.75rem", color:C.gray, lineHeight:1.6, marginBottom:"0.9rem" }}>Nhập từ vựng và nhấn <b>💾 Lưu</b> để giữ lại.</div>
                      <button onClick={()=>setView("input")} style={{ padding:"0.5rem 1.2rem", background:`linear-gradient(135deg,${C.blue},${C.blueDark})`, color:C.white, border:"none", borderRadius:12, fontSize:"0.82rem", cursor:"pointer", fontWeight:600 }}>
                        📚 Đến trang từ vựng
                      </button>
                    </div>
                  : sets.map(s=>(
                    <div key={s.id} style={{ background:C.white, border:`1.5px solid ${C.border}`, borderRadius:14, padding:"0.85rem 1rem", marginBottom:"0.55rem", boxShadow:"0 1px 8px rgba(74,144,217,0.06)" }}>
                      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start" }}>
                        <div>
                          <div style={{ fontFamily:"'Playfair Display',Georgia,serif", fontSize:"0.98rem", color:C.ink, marginBottom:"0.2rem" }}>{s.name}</div>
                          <div style={{ fontSize:"0.72rem", color:C.gray }}>{s.count} từ · {s.date}</div>
                        </div>
                        <div style={{ display:"flex", gap:"0.35rem" }}>
                          <button onClick={()=>{setTextPersist(s.text);setView("input");showToast("✓ Đã load!");}}
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
                      {weakWords.length>0&&<button onClick={()=>{setTextPersist(weakWords.join("\n"));setQuiz(null);setView("input");showToast("✓ Đã load từ yếu!");}} style={{padding:"0.25rem 0.65rem",background:C.blue,color:C.white,border:"none",borderRadius:20,fontSize:"0.65rem",cursor:"pointer",fontWeight:600}}>🎯 Ôn từ yếu ({weak.length})</button>}
                      {entries.length>0&&<button onClick={()=>{setStats({});showToast("✓ Đã xóa");}} style={{padding:"0.25rem 0.55rem",background:"transparent",color:C.gray,border:`1.5px solid ${C.border}`,borderRadius:20,fontSize:"0.65rem",cursor:"pointer"}}>🗑</button>}
                    </div>
                  </div>
                  {entries.length===0
                    ?<div style={{textAlign:"center",padding:"1.5rem 1rem"}}>
                      <div style={{ display:"flex", justifyContent:"center", marginBottom:"0.75rem" }}>
                        <Minou mood="thinking" message="Làm bài tập đi rồi mình cùng xem!" size="md"/>
                      </div>
                      <div style={{fontFamily:"'Playfair Display',Georgia,serif",fontSize:"0.95rem",color:C.ink,marginBottom:"0.3rem"}}>Chưa có dữ liệu</div>
                      <div style={{fontSize:"0.75rem",color:C.gray,lineHeight:1.6,marginBottom:"0.9rem"}}>Làm bài tập để bắt đầu theo dõi tiến độ.</div>
                      <button onClick={()=>setView("input")} style={{padding:"0.5rem 1.2rem",background:`linear-gradient(135deg,${C.blue},${C.blueDark})`,color:C.white,border:"none",borderRadius:12,fontSize:"0.82rem",cursor:"pointer",fontWeight:600}}>
                        🎯 Luyện tập ngay
                      </button>
                    </div>
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
            {view==="examples" && <ExamplesView words={words}/>}

            {/* Panels */}
            {view==="parcours"      && <ParcoursPanel onNavigate={(s, v) => goSection(s, v || s)} />}
            {view==="grammar"       && <GrammarPanel/>}
            {view==="defi"          && <DefiPanel/>}
            {view==="writing"       && <WritingPanel/>}
            {view==="conversation"  && <ConversationPanel/>}
            {view==="srs"           && <SRSPanel currentWords={words} />}
            {view==="reference_hub" && <ReferenceHub />}
            {view==="lecture"       && <LecturePanel words={words} />}
            {(view==="ecouter" || view==="dictee" || view==="listening") && <EcouterPanel key={section} words={words} section={section} />}
            {view==="revision"      && <RevisionPanel />}
            {view==="stats"         && <StatsPanel />}
            {view==="topics"        && <BuiltinSetsPanel onAdd={() => setSrsStats(getSRSStats())} />}
            {view==="sentence"      && <SentenceBuilder />}
          </div>
        </>
      )}

      {/* ══════════════════════════════════════
          PROFIL PAGE (full-page, no shell header)
      ══════════════════════════════════════ */}
      {section==="profil" && (
        <div style={{ minHeight:"100vh", display:"flex", flexDirection:"column", paddingBottom:80 }}>
          {/* Top bar */}
          <div style={{ padding:"6px 16px 12px", display:"flex", justifyContent:"space-between", alignItems:"center" }}>
            <span style={{ fontFamily:"'Playfair Display',Georgia,serif", fontWeight:700, fontSize:17, letterSpacing:"-0.01em", color:C.ink }}>Profil</span>
            <button onClick={toggleDark}
              style={{ background:"transparent", border:`1px solid ${C.border}`, color:C.gray, borderRadius:20, padding:"3px 8px", fontSize:"0.82rem", cursor:"pointer", lineHeight:1 }}>
              {dark ? "☀️" : "🌙"}
            </button>
          </div>
          <div style={{ flex:1, overflowY:"auto" }}>
            <ProfilPanel
              userName={userName}
              dark={dark}
              toggleDark={toggleDark}
              onNavigate={(s, v) => goSection(s, v || s)}
            />
          </div>
        </div>
      )}

      {/* ══════════════════════════════════════
          BOTTOM TAB BAR (always visible)
      ══════════════════════════════════════ */}
      <div style={{ position:"fixed", bottom:0, left:0, right:0, zIndex:150 }}>
        <div style={{ maxWidth:680, margin:"0 auto", background:C.white, borderTop:`1px solid ${C.border}`, display:"flex", padding:"8px 2px calc(14px + env(safe-area-inset-bottom))", boxShadow:"0 -2px 16px rgba(74,144,217,0.06)" }}>
          {TABS.map(tab => {
            const isActive = section === tab.section;
            const color = isActive ? (tab.color || C.ink) : C.gray2;
            return (
              <button key={tab.id} className="tab-btn"
                onClick={()=>{
                  if (tab.id==="home") { setSection("home"); setActiveGroup(null); setFromGroup(null); return; }
                  if (tab.id==="profil") { setSection("profil"); setView("profil"); return; }
                  goSection(tab.section, tab.view);
                }}
                style={{ flex:1, textAlign:"center", background:"transparent", border:"none", cursor:"pointer", padding:0 }}>
                <div style={{
                  fontFamily:"'Playfair Display',Georgia,serif",
                  fontSize:17, fontWeight:700, color,
                  height:24, display:"flex", alignItems:"center", justifyContent:"center",
                  letterSpacing:"-0.02em",
                }}>
                  {tab.glyph}
                </div>
                <div style={{ fontSize:10, color, fontWeight:isActive?700:500, marginTop:1, letterSpacing:"0.02em" }}>
                  {tab.label}
                </div>
                {isActive && (
                  <div style={{ width:22, height:2.5, background:color, borderRadius:999, margin:"4px auto 0" }}/>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
