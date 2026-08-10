import { useState, useCallback, useEffect, lazy, Suspense } from "react";
import { callAI, callAIBatched, buildPrompt } from "./utils/api.js";
import { loadSets, saveSets, getStreak, getProgress, markModuleUsed, getStorageHealth, exportBackup, getMistakes } from "./utils/storage.js";
import { parseWords } from "./utils/helpers.js";
import { C, applyTheme, THEME_KEY, LEVEL_KEY } from "./constants.js";

import SpeakBtn from "./components/ui/SpeakBtn.jsx";
import Spinner from "./components/ui/Spinner.jsx";
import { SecLabel, QCard, SaveModal, ImportModal } from "./components/ui/SharedUI.jsx";
import { MCSection, FillSection, MatchSection, DicteeSection, FlashcardSection, AnagrammeSection } from "./components/QuizSections.jsx";
import VocabGenerator, { ExampleCard, EditoPresets, exportFillPDF } from "./components/VocabGenerator.jsx";
import MotDuJour from "./components/MotDuJour.jsx";

// Heavy panels are code-split: loaded on demand to shrink the initial bundle.
const WritingPanel      = lazy(() => import("./components/WritingPanel.jsx"));
const GrammarPanel      = lazy(() => import("./components/GrammarPanel.jsx"));
const DefiPanel         = lazy(() => import("./components/DefiPanel.jsx"));
const SRSPanel          = lazy(() => import("./components/SRSPanel.jsx"));
const ReferenceHub      = lazy(() => import("./components/ReferenceHub.jsx"));
const ParcoursPanel     = lazy(() => import("./components/ParcoursPanel.jsx"));
const LecturePanel      = lazy(() => import("./components/LecturePanel.jsx"));
const StatsPanel        = lazy(() => import("./components/StatsPanel.jsx"));
const RevisionPanel     = lazy(() => import("./components/RevisionPanel.jsx"));
const FichePanel        = lazy(() => import("./components/FichePanel.jsx"));
const DelfPanel         = lazy(() => import("./components/DelfPanel.jsx"));
const EditoVocabPanel   = lazy(() => import("./components/EditoVocabPanel.jsx"));
const EcouterPanel      = lazy(() => import("./components/EcouterPanel.jsx"));
const UnitQuizPanel     = lazy(() => import("./components/UnitQuizPanel.jsx"));
const SentenceBuilder   = lazy(() => import("./components/SentenceBuilder.jsx"));
const ProfilPanel          = lazy(() => import("./components/ProfilPanel.jsx"));
const PrononciationPanel   = lazy(() => import("./components/PrononciationPanel.jsx"));
const GlobalSearch         = lazy(() => import("./components/GlobalSearch.jsx"));
const LevelSelectPanel     = lazy(() => import("./components/LevelSelectPanel.jsx"));
const ProductionOralePanel = lazy(() => import("./components/ProductionOralePanel.jsx"));
const DelfA2Panel          = lazy(() => import("./components/DelfA2Panel.jsx"));
const DelfBookPanel        = lazy(() => import("./components/DelfBookPanel.jsx"));
const PistesPanel          = lazy(() => import("./components/PistesPanel.jsx"));
const EditoGrammarPanel    = lazy(() => import("./components/EditoGrammarPanel.jsx"));
import { addWordToSRS, getSRSStats, getMasteredSet, getAllCards, resetSRS } from "./utils/srs.js";
import { getXPData, getLevel, getNextLevel, checkBadges, BADGE_DEFS } from "./utils/xp.js";
import { computeUnitStatuses, computeOverallProgress, getUnitStepProgress } from "./utils/parcours.js";
import { PARCOURS_UNITS, STEP_DEFS } from "./data/parcoursData.js";
import { schedulePush, initAutoSync } from "./utils/cloudSync.js";
import { prefetchPanels } from "./utils/prefetchPanels.js";
import { PARCOURS_UNITS_A2, STEP_GROUPS_A2, STEP_DEFS_A2 } from "./data/parcoursDataA2.js";
import { EDITO_A2_UNITS } from "./data/editoA2Units.js";
import { EDITO_A2_PHONO } from "./data/editoPhonoA2.js";
import { EDITO_POUR_NOTES_A2 } from "./data/editoPourNotesA2.js";
import { EDITO_A1_UNITS } from "./data/editoA1Units.js";
import { EDITO_POUR_NOTES } from "./data/editoAudioNotes.js";
import editoA2ReadingComprehension from "./data/editoA2Reading.js";
import { EDITO_AUDIO_A2 } from "./data/editoAudioA2.js";
import { EDITO_TIMINGS_A2 } from "./data/editoTimingsA2.js";
import { EDITO_TIMINGS_A1 } from "./data/editoTimingsA1.js";
// The two cahiers are ~816 KB of exercise data between them, and a learner
// only ever needs the one for their current level. Loaded on demand below
// instead of imported here, which kept both in the eager bundle.
const loadCahier = (lvl) =>
  lvl === "a2"
    ? import("./data/editoCahierA2.js").then(m => m.CAHIER_A2)
    : import("./data/editoCahierA1.js").then(m => m.CAHIER_A1);

// Référence tabs available at A2 — the cheatsheet, per-unit verb tables and
// phrasebook are A1-only content, so they're left out until A2 versions exist.
const REFERENCE_TABS_A2 = [
  { id: "dict",    label: "Tra từ",     icon: "🔍" },
  { id: "pronunc", label: "Phát âm",    icon: "🔊" },
  { id: "phono",   label: "Phono",      icon: "🎵" },
  { id: "verbes",  label: "Động từ",    icon: "🖊️" },
  { id: "conjug",  label: "Chia tự do", icon: "✏️" },
];
import { getLevel as getLevelInfo, DEFAULT_LEVEL } from "./data/levels.js";
import { EDITO_VOCAB_A2_UNITS } from "./data/editoVocabA2.js";
import { EDITO_A2_VERB_UNITS } from "./data/editoVerbsA2.js";
import { EDITO_GRAMMAR_A2, GRAMMAR_A2_EMOJIS } from "./data/editoGrammarA2.js";

const TABS = [
  { id:"home",     glyph:"⌂",  label:"Accueil",   section:"home",          view:"home",          color:null       },
  { id:"parcours", glyph:"⇢",  label:"Parcours",  section:"parcours",      view:"parcours",      color:"#E8574A"  },
  { id:"vocab",    glyph:"Aa", label:"Vocab",     section:"vocab",         view:"input",         color:"#4A90D9"  },
  { id:"ref",      glyph:"ƒ",  label:"Référence", section:"reference_hub", view:"reference_hub", color:"#F5A623"  },
  { id:"profil",   glyph:"◉",  label:"Profil",    section:"profil",        view:"profil",        color:"#3A4664"  },
];

const SECTION_TITLE = {
  vocab:"Le Vocabulaire", parcours:"Le Parcours", grammar:"La Grammaire", conversation:"La Production orale",
  writing:"L'Écriture", defi:"Le Défi du Jour", reference_hub:"La Référence",
  lecture:"La Lecture", dictee:"La Dictée", ecouter:"L'Écoute",
  revision:"La Révision", stats:"Les Statistiques", fiche:"Fiche de Révision",
  listening:"L'Écoute Active", sentence:"Les Phrases",
  "quiz-unit":"Le Quiz de l'Unité",
  prononciation:"La Prononciation",
  delf:"DELF A1",
  "delf-a2":"DELF A2 blanc",
  "delf-ce":"100 % réussite A1",
  "pistes":"Fichiers audio",
  profil:"Mon Profil",
  level:"Trình độ",
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
// ── Saved word list tab ───────────────────────────────────────
const WORDLIST_KEY = "reading_wordlist_v1";
function SavedWordListView({ onReview }) {
  const [wlist, setWlist] = useState(() => {
    try { return JSON.parse(localStorage.getItem(WORDLIST_KEY) || "[]"); } catch { return []; }
  });
  const remove = (fr) => {
    const u = wlist.filter(w => w.fr !== fr);
    setWlist(u);
    try { localStorage.setItem(WORDLIST_KEY, JSON.stringify(u)); } catch {}
  };
  return (
    <div style={{ padding:"1rem", animation:"fadeUp 0.3s ease" }}>
      <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:"0.85rem" }}>
        <div>
          <div style={{ fontFamily:"'Playfair Display',Georgia,serif", fontSize:"1rem", fontWeight:700, color:C.ink }}>📝 Từ đã lưu</div>
          <div style={{ fontSize:"0.7rem", color:C.gray }}>{wlist.length} từ · từ bài đọc &amp; tra từ điển</div>
        </div>
        {wlist.length > 0 && (
          <button onClick={onReview}
            style={{ padding:"0.35rem 0.85rem", background:C.green, color:"#fff", border:"none", borderRadius:20, fontSize:"0.76rem", fontWeight:700, cursor:"pointer" }}>
            Ôn lại →
          </button>
        )}
      </div>
      {wlist.length === 0 ? (
        <div style={{ textAlign:"center", padding:"3rem 1rem", color:C.gray }}>
          <div style={{ fontSize:"2rem", marginBottom:"0.5rem" }}>📭</div>
          <div style={{ fontSize:"0.85rem" }}>Chưa có từ nào được lưu.</div>
          <div style={{ fontSize:"0.75rem", marginTop:"0.4rem" }}>Bấm vào từ trong bài đọc hoặc tra từ điển để lưu!</div>
        </div>
      ) : (
        <div style={{ background:C.white, borderRadius:12, border:`1px solid ${C.border}`, overflow:"hidden" }}>
          {wlist.map((w, i) => (
            <div key={w.fr + i} style={{ display:"flex", alignItems:"center", gap:10, padding:"10px 12px", borderBottom:i < wlist.length-1 ? `1px solid ${C.borderSoft||C.border}` : "none" }}>
              <div style={{ flex:1, minWidth:0 }}>
                <div style={{ display:"flex", alignItems:"center", gap:6, flexWrap:"wrap" }}>
                  <span style={{ fontFamily:"'Playfair Display',Georgia,serif", fontWeight:700, fontSize:14.5, color:C.ink }}>{w.fr}</span>
                  {w.type && <span style={{ fontSize:"0.6rem", background:"#EBF4FF", color:"#1B3A6B", borderRadius:20, padding:"0.05rem 0.4rem", fontWeight:700 }}>{w.type}</span>}
                </div>
                <div style={{ fontSize:11, color:C.gray, marginTop:1 }}>→ {w.vi}</div>
                {w.note && <div style={{ fontSize:10.5, color:C.gold, marginTop:1 }}>💡 {w.note}</div>}
                <div style={{ fontSize:10, color:C.gray2, marginTop:1 }}>📌 {w.source || "Tra từ điển"}</div>
              </div>
              <SpeakBtn text={w.fr} size="sm" />
              <button onClick={() => remove(w.fr)} aria-label={`Xóa từ ${w.fr}`} style={{ background:"none", border:"none", color:C.gray2, cursor:"pointer", fontSize:"1rem", padding:"0.1rem" }}>✕</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

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
  const [level, setLevel]               = useState(() => localStorage.getItem(LEVEL_KEY) || DEFAULT_LEVEL);
  const levelInfo = getLevelInfo(level);
  // Cahier exercises for the active level. Null until the chunk resolves; every
  // consuming panel already treats a missing cahier as "no exercises to show",
  // so the brief gap degrades to the pre-cahier UI rather than an error.
  const [cahier, setCahier] = useState(null);
  useEffect(() => {
    let alive = true;
    setCahier(null);                       // drop the old level's exercises immediately
    loadCahier(level).then(c => { if (alive) setCahier(c); });
    return () => { alive = false; };
  }, [level]);

  // Pull the remaining panel chunks in the background so the service worker
  // has them cached before the learner is offline. Runs once, after idle.
  useEffect(() => { prefetchPanels(); }, []);
  // Switching level resets the in-panel navigation so we never land on a view
  // that belongs to the level we just left (e.g. A1's Fiche while on A2).
  const changeLevel = (id) => {
    localStorage.setItem(LEVEL_KEY, id);
    setLevel(id);
    setNavStack([]);
    setSection("home");
    setView("home");
    showToast(`✓ Đang học ${getLevelInfo(id).code} · ${getLevelInfo(id).vi}`);
  };
  const [themeId, setThemeId] = useState(() => localStorage.getItem(THEME_KEY) || "classic");
  const [dark, setDark] = useState(() => {
    const saved = localStorage.getItem("dark_mode") === "1";
    applyTheme(saved);
    return saved;
  });
  const toggleDark = () => {
    const next = !dark;
    applyTheme(next, themeId);
    localStorage.setItem("dark_mode", next ? "1" : "0");
    setDark(next);
  };
  const changeTheme = (id) => {
    localStorage.setItem(THEME_KEY, id);
    applyTheme(dark, id);
    setThemeId(id);
  };
  const [editOpen, setEditOpen]             = useState(false);
  const [navStack, setNavStack]             = useState([]); // breadcrumb of {section,view} for "← Về"
  const [storageWarn, setStorageWarn]       = useState(false);
  const [swUpdated,   setSwUpdated]         = useState(false);
  const [xpData, setXpData]                 = useState(getXPData);
  const [badgeToast, setBadgeToast]         = useState("");
  const [searchOpen, setSearchOpen]         = useState(false);

  const setTextPersist = (val) => { setText(val); localStorage.setItem("vocab_text", val); };
  const words = parseWords(text);
  const CLIENT_TYPES = ["dictee","flashcard","anagramme"];
  const TYPE_NAMES = { multiple_choice:"Trắc nghiệm", fill_blank:"Điền từ", matching:"Nối từ", dictee:"Dictée", flashcard:"Flashcard", anagramme:"Anagramme", mixed:"Hỗn hợp" };
  const hasFill = quiz && (quiz.type==="fill_blank"||(quiz.type==="mixed"&&quiz.sections?.some(s=>s.sectionType==="fill_blank")));

  const panelFallback = (
    <div style={{ display:"flex", alignItems:"center", justifyContent:"center", minHeight:240, color:C.gray }}>
      <Spinner/>
    </div>
  );

  useEffect(() => { setSets(loadSets()); }, []);

  // Listen for service worker update notification
  useEffect(() => {
    if (!("serviceWorker" in navigator)) return;
    const onMessage = (e) => {
      if (e.data?.type === "SW_UPDATED") setSwUpdated(true);
    };
    navigator.serviceWorker.addEventListener("message", onMessage);
    return () => navigator.serviceWorker.removeEventListener("message", onMessage);
  }, []);

  // Warn before localStorage fills up and learning data is silently lost.
  useEffect(() => {
    if (getStorageHealth().near && !sessionStorage.getItem("storage_warn_dismissed")) {
      setStorageWarn(true);
    }
    // Also catch the moment a write actually fails (storage full) — this is
    // when data is really being lost, so force the warning regardless of dismissal.
    const onQuota = () => {
      sessionStorage.removeItem("storage_warn_dismissed");
      setStorageWarn(true);
    };
    window.addEventListener("storage-quota-exceeded", onQuota);
    return () => window.removeEventListener("storage-quota-exceeded", onQuota);
  }, []);

  // ── Cloud sync: auto-pull on focus, auto-push on close ────────────
  const [syncPullMsg, setSyncPullMsg] = useState("");
  useEffect(() => {
    const cleanup = initAutoSync((applied, ts) => {
      // Show a subtle toast when data was pulled from cloud
      const timeStr = new Date(ts).toLocaleTimeString("vi-VN", { hour:"2-digit", minute:"2-digit" });
      setSyncPullMsg(`☁️ Đã đồng bộ từ cloud (${timeStr})`);
      setTimeout(() => setSyncPullMsg(""), 3500);
      // Refresh SRS stats in case cards were updated
      setSrsStats(getSRSStats());
    });
    return cleanup;
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const showToast = msg => { setToast(msg); setTimeout(() => setToast(""), 2400); };

  const goSection = (s, v) => {
    const nextView = v || s;
    // Remember where we are now so the header "← Về" can return there.
    setNavStack(prev => {
      const here = { section, view };
      if (here.section === s && here.view === nextView) return prev;          // no-op nav
      const top = prev[prev.length - 1];
      if (top && top.section === here.section && top.view === here.view) return prev; // dedup
      return [...prev, here];
    });
    setSection(s); setView(nextView);
    setEditOpen(false);
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

  // Return to wherever the user came from (falls back to home).
  const goBack = () => {
    if (!navStack.length) { setSection("home"); setView("home"); setEditOpen(false); return; }
    const target = navStack[navStack.length - 1];
    setSection(target.section);
    setView(target.view);
    setEditOpen(false);
    setNavStack(prev => prev.slice(0, -1));
  };

  // "Về Parcours" buttons inside panels: pop back to the unit the user came
  // from (restores the unit detail) when that's the origin, else go fresh.
  const backToParcours = () => {
    const top = navStack[navStack.length - 1];
    if (top && top.section === "parcours") goBack();
    else goSection("parcours", "parcours");
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
      schedulePush();
    }
  }, [words]);

  const recordWrong = useCallback((q) => {
    setWrongAnswers(prev => prev.find(x => x.question===q.question) ? prev : [...prev, q]);
  }, []);

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

        @keyframes confettiFall {
          to { transform:translateY(110vh) rotate(540deg); opacity:0; }
        }
        @keyframes pulse {
          0%,100% { opacity:0.35; transform:scale(0.85); }
          50%     { opacity:1;    transform:scale(1);    }
        }
        @keyframes micPulse {
          0%,100% { box-shadow:0 0 0 0 ${C.accent}66; }
          50%     { box-shadow:0 0 0 6px ${C.accent}00; }
        }
      `}</style>

      {/* ── Toast ── */}
      {(toast || badgeToast) && (
        <div style={{ position:"fixed", top:20, left:"50%", transform:"translateX(-50%)", background:badgeToast?"#7C3AED":C.ink, color:C.white, padding:"0.55rem 1.2rem", borderRadius:24, fontSize:"0.8rem", zIndex:400, whiteSpace:"nowrap", boxShadow:"0 4px 20px rgba(0,0,0,0.2)", animation:"pop 0.3s ease" }}>
          {badgeToast || toast}
        </div>
      )}

      {/* ── Cloud sync pull notification ── */}
      {syncPullMsg && (
        <div style={{ position:"fixed", bottom:72, left:"50%", transform:"translateX(-50%)", background:"#1e3a5f", color:"#fff", padding:"0.45rem 1rem", borderRadius:20, fontSize:"0.75rem", zIndex:399, whiteSpace:"nowrap", boxShadow:"0 2px 12px rgba(0,0,0,0.2)", animation:"pop 0.3s ease" }}>
          {syncPullMsg}
        </div>
      )}

      {/* ── New version available banner ── */}
      {swUpdated && (
        <div style={{ position:"fixed", top:0, left:0, right:0, zIndex:430, background:"#1B3A6B", color:"#fff", padding:"0.55rem 0.9rem", display:"flex", alignItems:"center", gap:8, fontSize:"0.76rem", boxShadow:"0 2px 12px rgba(0,0,0,0.2)" }}>
          <span style={{ flex:1, lineHeight:1.4 }}>✨ Có phiên bản mới — tải lại để cập nhật!</span>
          <button onClick={() => window.location.reload()}
            style={{ background:"#fff", color:"#1B3A6B", border:"none", borderRadius:8, padding:"0.3rem 0.8rem", fontSize:"0.72rem", fontWeight:700, cursor:"pointer", whiteSpace:"nowrap" }}>
            Tải lại
          </button>
          <button onClick={() => setSwUpdated(false)}
            style={{ background:"transparent", border:"none", color:"rgba(255,255,255,0.7)", fontSize:"1rem", cursor:"pointer", lineHeight:1, padding:"0 0.2rem" }}>
            ×
          </button>
        </div>
      )}

      {/* ── Storage near-full warning ── */}
      {storageWarn && (
        <div style={{ position:"fixed", top:0, left:0, right:0, zIndex:420, background:C.gold, color:"#3a2c00", padding:"0.55rem 0.9rem", display:"flex", alignItems:"center", gap:8, fontSize:"0.76rem", boxShadow:"0 2px 12px rgba(0,0,0,0.15)" }}>
          <span style={{ flex:1, lineHeight:1.4 }}>⚠️ Bộ nhớ trình duyệt gần đầy. Hãy sao lưu để tránh mất tiến độ học.</span>
          <button onClick={()=>{ if (exportBackup()) showToast("✓ Đã tải file sao lưu!"); }}
            style={{ background:"#3a2c00", color:C.gold, border:"none", borderRadius:8, padding:"0.3rem 0.7rem", fontSize:"0.72rem", fontWeight:700, cursor:"pointer", whiteSpace:"nowrap" }}>
            ⬇ Sao lưu
          </button>
          <button onClick={()=>{ sessionStorage.setItem("storage_warn_dismissed","1"); setStorageWarn(false); }}
            style={{ background:"transparent", border:"none", color:"#3a2c00", fontSize:"1rem", cursor:"pointer", lineHeight:1, padding:"0 0.2rem" }}>
            ×
          </button>
        </div>
      )}

      {/* ── Modals ── */}
      {showSave   && <SaveModal   text={text} onSave={handleSave}                                    onClose={()=>setShowSave(false)}   />}
      {showImport && <ImportModal onImport={t=>{setTextPersist(t);showToast("✓ Import thành công!");}} onClose={()=>setShowImport(false)} />}
      {searchOpen && (
        <Suspense fallback={null}>
          <GlobalSearch onClose={()=>setSearchOpen(false)} onNavigate={(s,v)=>goSection(s, v||s)} />
        </Suspense>
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
              App học tiếng Pháp theo <b>lộ trình A1</b>. Bắt đầu với:
              <div style={{ display:"flex", flexDirection:"column", gap:"0.4rem", marginTop:"0.6rem" }}>
                {[
                  {icon:"🛤️",text:"Lộ trình — học từng Unité theo trình tự Édito A1"},
                  {icon:"🃏",text:"Ôn tập — thẻ ghi nhớ & câu sai tự động lặp lại"},
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
              {/* Level badge — opens the full level picker */}
              <button onClick={()=>goSection("level","level")}
                aria-label={`Trình độ hiện tại ${levelInfo.code} — đổi trình độ`}
                style={{ display:"inline-flex", alignItems:"center", gap:4, background:`${levelInfo.color}1A`,
                  border:`1px solid ${levelInfo.color}55`, color:levelInfo.color, borderRadius:20,
                  padding:"3px 9px", fontSize:11.5, fontWeight:800, cursor:"pointer",
                  fontFamily:"inherit", lineHeight:1.4, whiteSpace:"nowrap" }}>
                {levelInfo.emoji} {levelInfo.code}
                <span style={{ fontSize:8, opacity:0.75 }}>▾</span>
              </button>
              {/* Combined streak + XP chip */}
              <span style={{ background:C.cream, padding:"4px 10px", borderRadius:999, fontWeight:700, display:"inline-flex", alignItems:"center", gap:5, color:C.ink, fontSize:11.5, border:`1px solid ${C.border}` }}>
                <span style={{ color:C.accent }}>🔥</span>{streakData.streak}
                <span style={{ color:C.gray2, fontWeight:400 }}>·</span>
                <span style={{ color:C.gold }}>★</span>{xpData.total||0}
              </span>
              <button onClick={()=>setSearchOpen(true)} aria-label="Tìm kiếm từ vựng và ngữ pháp"
                style={{ background:"transparent", border:`1px solid ${C.border}`, color:C.gray, borderRadius:20, padding:"3px 8px", fontSize:"0.82rem", cursor:"pointer", lineHeight:1 }}>
                ⌕
              </button>
              <button onClick={toggleDark} aria-label={dark ? "Chuyển sang giao diện sáng" : "Chuyển sang giao diện tối"}
                style={{ background:"transparent", border:`1px solid ${C.border}`, color:C.gray, borderRadius:20, padding:"3px 8px", fontSize:"0.82rem", cursor:"pointer", lineHeight:1 }}>
                {dark ? "☀️" : "🌙"}
              </button>
            </div>
          </div>

          {/* ── Greeting ── */}
          <div style={{ padding:"0 16px 4px", animation:"fadeUp 0.4s ease" }}>
            <div style={{ fontSize:12, color:C.gray, marginBottom:2 }}>Bonjour,</div>
            <div style={{ fontFamily:"'Playfair Display',Georgia,serif", fontSize:28, lineHeight:1.1, fontWeight:700, letterSpacing:"-0.02em", color:C.ink, marginBottom:8 }}>
              {userName || "Bạn"} 🇫🇷
            </div>
          </div>

          {/* ── Focus card (Parcours-driven) ── */}
          {level==="a1" && (() => {
            const statuses = computeUnitStatuses();
            const lastUnitId = localStorage.getItem("parcours_last_unit");
            const focusUnit = (lastUnitId && PARCOURS_UNITS.find(u => u.id === lastUnitId))
              || PARCOURS_UNITS.find(u => statuses[u.id]?.status === "current")
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
              <div style={{ margin:"0.75rem 1.25rem 0", animation:"fadeUp 0.4s ease 0.05s both", position:"relative" }}>
                <div style={{ background:`linear-gradient(135deg, ${C.heroFrom} 0%, ${C.heroTo} 100%)`, borderRadius:18, padding:"1.15rem 1.35rem", color:"#fff", position:"relative", overflow:"hidden" }}>
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
                      {(() => {
                        const up = getUnitStepProgress(focusUnit.id);
                        const unitDone = STEP_DEFS.filter(s => up[s.id]).length;
                        return `${unitDone}/${STEP_DEFS.length} hoạt động · Lộ trình ${overall.pct}%`;
                      })()}
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
              { val:srsStats.mastered,    lbl:"Từ thuộc",     color:C.green,  go:()=>goSection("stats","stats")      },
              { val:srsStats.due,         lbl:"Cần ôn →",     color:C.gold,   go:()=>goSection("srs","srs")          },
              { val:getMistakes().length, lbl:"Sai gần đây →",color:C.accent, go:()=>goSection("revision","revision") },
            ].map(({ val, lbl, color, go }) => (
              <button key={lbl} onClick={go} className="card-hover"
                style={{ background:C.white, border:`1px solid ${C.border}`, borderRadius:12, padding:"10px 8px", textAlign:"center", cursor:"pointer", fontFamily:"inherit" }}>
                <div style={{ fontFamily:"'Playfair Display',Georgia,serif", fontSize:22, fontWeight:700, color, lineHeight:1 }}>{val}</div>
                <div style={{ fontSize:10.5, color:C.gray, marginTop:4 }}>{lbl}</div>
              </button>
            ))}
          </div>

          {/* ── Mot du Jour ── */}
          {level==="a1" && <MotDuJour words={words} />}

          {/* ── 4 skill cards ── */}
          {level==="a1" && (
          <div style={{ padding:"0 16px", marginTop:14 }}>
            <div style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:10.5, fontWeight:600, color:C.gray, letterSpacing:"0.12em", textTransform:"uppercase", marginBottom:8 }}>
              Luyện theo kỹ năng
            </div>
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:8 }}>
              {[
                { fr:"Lire",    vi:"Đọc",  glyph:"Aa", sub:"Đọc hiểu",   color:"#4A90D9", fn:()=>goSection("lecture","lecture")          },
                { fr:"Écouter", vi:"Nghe", glyph:"))", sub:"Nghe theo sách", color:"#7B6CF6", fn:()=>goSection("ecouter","ecouter")       },
                { fr:"Parler",  vi:"Nói",  glyph:"••", sub:"Chủ điểm nói", color:"#E67E22", fn:()=>goSection("conversation","conversation") },
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

            {/* ── Prononciation + Défi — side by side ── */}
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:8, marginTop:8 }}>
              <button className="card-hover" onClick={()=>goSection("prononciation","prononciation")}
                style={{ display:"flex", flexDirection:"column", alignItems:"flex-start", gap:4, background:`linear-gradient(135deg, #F59E0B, #D97706)`, border:"none", borderRadius:16, padding:"12px 14px", cursor:"pointer", fontFamily:"inherit", textAlign:"left", boxShadow:"0 4px 14px rgba(245,158,11,0.25)", animation:"fadeUp 0.3s ease 0.28s both" }}>
                <span style={{ fontSize:22, lineHeight:1 }}>🎤</span>
                <div style={{ fontFamily:"'Playfair Display',Georgia,serif", fontWeight:700, fontSize:13, color:"#fff", lineHeight:1.2 }}>Phát âm</div>
                <div style={{ fontSize:10, color:"rgba(255,255,255,0.82)" }}>Chấm điểm tức thì</div>
              </button>
              <button className="card-hover" onClick={()=>goSection("defi","defi")}
                style={{ display:"flex", flexDirection:"column", alignItems:"flex-start", gap:4, background:`linear-gradient(135deg, #8E44AD, #6D28D9)`, border:"none", borderRadius:16, padding:"12px 14px", cursor:"pointer", fontFamily:"inherit", textAlign:"left", boxShadow:"0 4px 16px rgba(109,40,217,0.3)", animation:"fadeUp 0.3s ease 0.32s both" }}>
                <span style={{ fontSize:22, lineHeight:1 }}>🎲</span>
                <div style={{ fontFamily:"'Playfair Display',Georgia,serif", fontWeight:700, fontSize:13, color:"#fff", lineHeight:1.2 }}>Défi du jour</div>
                <div style={{ fontSize:10, color:"rgba(255,255,255,0.82)" }}>Tích streak 🔥</div>
              </button>
            </div>

            {/* ── Fiche de révision U1–U10 ── */}
            <button className="card-hover" onClick={()=>goSection("fiche","fiche")}
              style={{ display:"flex", alignItems:"center", gap:12, width:"100%", marginTop:8, background:`linear-gradient(135deg, ${C.blueDark}, ${C.blue})`, border:"none", borderRadius:16, padding:"14px 16px", cursor:"pointer", fontFamily:"inherit", textAlign:"left", boxShadow:"0 4px 16px rgba(74,144,217,0.28)", animation:"fadeUp 0.3s ease 0.36s both" }}>
              <span style={{ fontSize:26, lineHeight:1 }}>📋</span>
              <div style={{ flex:1 }}>
                <div style={{ fontFamily:"'Playfair Display',Georgia,serif", fontWeight:700, fontSize:15, color:"#fff", lineHeight:1.2 }}>Ôn tập theo Unité</div>
                <div style={{ fontSize:11, color:"rgba(255,255,255,0.85)", marginTop:1 }}>Từ vựng · Ngữ pháp · Giao tiếp (U1–U10)</div>
              </div>
              <span style={{ fontSize:18, color:"rgba(255,255,255,0.7)" }}>→</span>
            </button>

            {/* ── DELF A1 — Viết & Nói ── */}
            <button className="card-hover" onClick={()=>goSection("delf","delf")}
              style={{ display:"flex", alignItems:"center", gap:12, width:"100%", marginTop:8, background:`linear-gradient(135deg, ${C.ink}, ${C.ink2})`, border:"none", borderRadius:16, padding:"14px 16px", cursor:"pointer", fontFamily:"inherit", textAlign:"left", boxShadow:"0 4px 16px rgba(26,39,68,0.28)", animation:"fadeUp 0.3s ease 0.4s both" }}>
              <span style={{ fontSize:26, lineHeight:1 }}>🎓</span>
              <div style={{ flex:1 }}>
                <div style={{ fontFamily:"'Playfair Display',Georgia,serif", fontWeight:700, fontSize:15, color:"#fff", lineHeight:1.2 }}>DELF A1 · Viết & Nói</div>
                <div style={{ fontSize:11, color:"rgba(255,255,255,0.85)", marginTop:1 }}>Phân tích đề + đề luyện tập tương tự</div>
              </div>
              <span style={{ fontSize:18, color:"rgba(255,255,255,0.7)" }}>→</span>
            </button>

            {/* ── DELF A1 — Đọc hiểu, theo bộ « 100 % réussite » ── */}
            <button className="card-hover" onClick={()=>goSection("delf","delf-ce")}
              style={{ display:"flex", alignItems:"center", gap:12, width:"100%", marginTop:8, background:`linear-gradient(135deg, ${C.ink}, ${C.blue})`, border:"none", borderRadius:16, padding:"14px 16px", cursor:"pointer", fontFamily:"inherit", textAlign:"left", boxShadow:"0 4px 16px rgba(26,39,68,0.28)", animation:"fadeUp 0.3s ease 0.44s both" }}>
              <span style={{ fontSize:26, lineHeight:1 }}>📕</span>
              <div style={{ flex:1 }}>
                <div style={{ fontFamily:"'Playfair Display',Georgia,serif", fontWeight:700, fontSize:15, color:"#fff", lineHeight:1.2 }}>Le DELF A1 100 % réussite</div>
                <div style={{ fontSize:11, color:"rgba(255,255,255,0.85)", marginTop:1 }}>Giới thiệu · Đọc · Nghe · Viết · Nói · Thi thử</div>
              </div>
              <span style={{ fontSize:18, color:"rgba(255,255,255,0.7)" }}>→</span>
            </button>

            {/* ── Every book's listening files, for studying from the paper book ── */}
            <button className="card-hover" onClick={()=>goSection("delf","pistes")}
              style={{ display:"flex", alignItems:"center", gap:12, width:"100%", marginTop:8, background:C.white, border:`1px solid ${C.border}`, borderRadius:16, padding:"11px 16px", cursor:"pointer", fontFamily:"inherit", textAlign:"left", animation:"fadeUp 0.3s ease 0.48s both" }}>
              <span style={{ fontSize:22, lineHeight:1 }}>🎧</span>
              <div style={{ flex:1 }}>
                <div style={{ fontWeight:700, fontSize:13, color:C.ink, lineHeight:1.2 }}>Fichiers audio</div>
                <div style={{ fontSize:11, color:C.gray, marginTop:1 }}>File nghe của 100 % réussite &amp; Édito — dùng khi học bằng PDF</div>
              </div>
              <span style={{ fontSize:16, color:C.gray2 }}>→</span>
            </button>
          </div>
          )}

          {/* ── A2 home body ── */}
          {level==="a2" && (
            <div style={{ padding:"0 16px", marginTop:14, animation:"fadeUp 0.4s ease 0.1s both" }}>
              <div style={{ background:`linear-gradient(135deg, ${C.heroFrom} 0%, ${C.heroTo} 100%)`, borderRadius:18, padding:"1.15rem 1.35rem", color:"#fff", position:"relative", overflow:"hidden" }}>
                {PARCOURS_UNITS_A2.length > 0 ? (() => {
                  const u = PARCOURS_UNITS_A2[0];
                  return (<>
                    <div style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:"0.58rem", letterSpacing:"0.18em", opacity:0.6, marginBottom:5, textTransform:"uppercase" }}>UNIT {u.num} · ÉDITO A2</div>
                    <div style={{ fontFamily:"'Playfair Display',Georgia,serif", fontSize:"1.25rem", fontWeight:700, lineHeight:1.1, marginBottom:4 }}>{u.emoji} {u.fr}</div>
                    <div style={{ fontSize:"0.78rem", opacity:0.75, marginBottom:12 }}>{u.vi} · {u.grammar}</div>
                    <button onClick={()=>goSection("parcours","parcours")}
                      style={{ background:"rgba(255,255,255,0.18)", color:"#fff", border:"1px solid rgba(255,255,255,0.4)", borderRadius:999, padding:"0.3rem 0.85rem", fontSize:"0.72rem", cursor:"pointer", fontWeight:700 }}>
                      Bắt đầu →
                    </button>
                  </>);
                })() : (<>
                  <div style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:"0.58rem", letterSpacing:"0.18em", opacity:0.6, marginBottom:5, textTransform:"uppercase" }}>ÉDITO A2 · MỚI BẮT ĐẦU</div>
                  <div style={{ fontFamily:"'Playfair Display',Georgia,serif", fontSize:"1.25rem", fontWeight:700, lineHeight:1.1, marginBottom:4 }}>🚧 Đang xây dựng Parcours A2</div>
                  <div style={{ fontSize:"0.78rem", opacity:0.75, marginBottom:12 }}>Nội dung sẽ được thêm dần, theo cùng format với A1.</div>
                  <button onClick={()=>goSection("parcours","parcours")}
                    style={{ background:"rgba(255,255,255,0.18)", color:"#fff", border:"1px solid rgba(255,255,255,0.4)", borderRadius:999, padding:"0.3rem 0.85rem", fontSize:"0.72rem", cursor:"pointer", fontWeight:700 }}>
                    Xem Parcours A2 →
                  </button>
                </>)}
              </div>

              <button className="card-hover" onClick={()=>goSection("vocab","input")}
                style={{ display:"flex", alignItems:"center", gap:12, width:"100%", marginTop:10, background:C.white, border:`1px solid ${C.border}`, borderRadius:16, padding:"14px 16px", cursor:"pointer", fontFamily:"inherit", textAlign:"left" }}>
                <span style={{ fontSize:26, lineHeight:1 }}>✏️</span>
                <div style={{ flex:1 }}>
                  <div style={{ fontFamily:"'Playfair Display',Georgia,serif", fontWeight:700, fontSize:15, color:C.ink, lineHeight:1.2 }}>Luyện từ vựng tự do</div>
                  <div style={{ fontSize:11, color:C.gray, marginTop:1 }}>Nhập từ vựng A2 và tạo bài luyện tập ngay</div>
                </div>
                <span style={{ fontSize:18, color:C.gray2 }}>→</span>
              </button>

              <button className="card-hover" onClick={()=>goSection("reference_hub","reference_hub")}
                style={{ display:"flex", alignItems:"center", gap:12, width:"100%", marginTop:8, background:C.white, border:`1px solid ${C.border}`, borderRadius:16, padding:"14px 16px", cursor:"pointer", fontFamily:"inherit", textAlign:"left" }}>
                <span style={{ fontSize:26, lineHeight:1 }}>📚</span>
                <div style={{ flex:1 }}>
                  <div style={{ fontFamily:"'Playfair Display',Georgia,serif", fontWeight:700, fontSize:15, color:C.ink, lineHeight:1.2 }}>Référence A2</div>
                  <div style={{ fontSize:11, color:C.gray, marginTop:1 }}>Tra từ · Phát âm · Phono [y]/[u] · Chia động từ</div>
                </div>
                <span style={{ fontSize:18, color:C.gray2 }}>→</span>
              </button>
            </div>
          )}

          <div style={{ height:"1.5rem" }} />
        </div>
      )}

      {/* ══════════════════════════════════════
          APP SHELL (non-home sections)
      ══════════════════════════════════════ */}
      {section!=="home" && section!=="profil" && (
        <>
          {/* ── Header ── */}
          {/* Sticky at the top of the scroll container, so anything else that
              sticks has to start below it — hence the marker, which panels
              measure rather than guessing a height. */}
          <div data-app-chrome style={{ background:C.white, padding:"0.6rem 1rem", display:"flex", flexDirection:"column", gap:"0.4rem", borderBottom:`1.5px solid ${C.border}`, position:"sticky", top:0, zIndex:100, boxShadow:"0 1px 12px rgba(74,144,217,0.08)" }}>
            {/* Row 1: back + title + dark toggle */}
            <div style={{ display:"flex", alignItems:"center", gap:"0.6rem" }}>
              <button onClick={goBack}
                style={{ background:C.blueL, border:`1.5px solid ${C.blue}33`, color:C.blue, cursor:"pointer", fontSize:"0.82rem", padding:"0.3rem 0.65rem", borderRadius:10, fontWeight:600, transition:"all 0.15s", flexShrink:0 }}>
                ← Về
              </button>
              <span style={{ fontFamily:"'Playfair Display',Georgia,serif", fontSize:"1rem", color:C.ink, fontWeight:600, flex:1 }}>
                {SECTION_TITLE[section] || section}
              </span>
              <button onClick={toggleDark} aria-label={dark ? "Chuyển sang giao diện sáng" : "Chuyển sang giao diện tối"}
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
                    { label:"Đã lưu",     view:"history" },
                    { label: level==="a1" ? "Edito" : "Edito A2", view:"edito" },
                  ].map(t => {
                    const isActive = t.view === view || (t.view==="input" && !["topics","history","edito","vocab-table","examples","quiz","wordlist"].includes(view));
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
           <Suspense fallback={panelFallback}>

            {/* EDITO VOCAB */}
            {view==="edito" && (level==="a1"
              ? <EditoVocabPanel onBackToParcours={backToParcours} cahier={cahier} />
              : <EditoVocabPanel onBackToParcours={backToParcours} units={EDITO_VOCAB_A2_UNITS} levelLabel="Edito A2" cahier={cahier} />)}


            {/* INPUT */}
            {view==="input" && (
              <div style={{ padding:"1rem", display:"flex", flexDirection:"column", gap:"0.85rem", animation:"fadeUp 0.3s ease" }}>

                {/* ── SRS Summary card ── */}
                <div style={{ background:C.white, border:`1px solid ${C.border}`, borderRadius:14, padding:"12px 14px", display:"flex", alignItems:"center", gap:12 }}>
                  <div style={{ flex:1 }}>
                    <div style={{ fontFamily:"'Playfair Display',Georgia,serif", fontSize:22, fontWeight:700, lineHeight:1 }}>
                      <span style={{ color:C.blue }}>{srsStats.total}</span>
                      <span style={{ color:C.gray, fontWeight:400, fontSize:13 }}> từ · </span>
                      <span style={{ color:C.green, fontSize:18 }}>{srsStats.mastered} đã thuộc</span>
                    </div>
                    <div style={{ fontSize:11, color:C.gray, marginTop:3 }}>{srsStats.due} từ cần ôn hôm nay</div>
                  </div>
                  <div style={{ display:"flex", gap:6, flexShrink:0 }}>
                    {srsStats.due > 0 && (
                      <button onClick={()=>goSection("srs","srs")}
                        style={{ background:C.accent, color:"#fff", border:"none", padding:"8px 14px", borderRadius:999, fontWeight:700, fontSize:12, cursor:"pointer", whiteSpace:"nowrap" }}>
                        Ôn {srsStats.due} →
                      </button>
                    )}
                    <button onClick={()=>{ if(window.confirm("Xóa toàn bộ dữ liệu SRS? Hành động này không thể hoàn tác.")) { resetSRS(); setSrsStats(getSRSStats()); }}}
                      style={{ background:"transparent", border:`1.5px solid ${C.border}`, color:C.gray, borderRadius:999, padding:"6px 10px", fontSize:11, cursor:"pointer" }}
                      title="Xóa toàn bộ dữ liệu SRS">
                      🗑
                    </button>
                  </div>
                </div>

                {/* ── Search ── */}
                {srsStats.total > 0 && (
                  <div style={{ background:C.white, border:`1px solid ${C.border}`, borderRadius:10, padding:"8px 12px", display:"flex", alignItems:"center", gap:8 }}>
                    <span style={{ color:C.gray2, fontSize:16 }}>⌕</span>
                    <input value={vocabSearch} onChange={e=>setVocabSearch(e.target.value)}
                      placeholder="Tìm từ tiếng Pháp hoặc nghĩa Việt…"
                      style={{ border:"none", outline:"none", flex:1, fontSize:12.5, fontFamily:"inherit", color:C.ink, background:"transparent" }}/>
                    {vocabSearch && (
                      <button onClick={()=>setVocabSearch("")}
                        aria-label="Xóa tìm kiếm" style={{ background:"none", border:"none", cursor:"pointer", color:C.gray, fontSize:14, padding:"0 2px", lineHeight:1 }}>✕</button>
                    )}
                  </div>
                )}

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
                    allCards.length === 0 ? (
                      <div style={{ textAlign:"center", padding:"24px 16px", color:C.gray }}>
                        <div style={{ fontSize:"1.8rem", marginBottom:8 }}>🌱</div>
                        <div style={{ fontSize:13, lineHeight:1.6, marginBottom:12 }}>
                          Chưa có từ nào trong bộ ôn tập.<br/>Học từ vựng theo bài để bắt đầu nhé!
                        </div>
                        <button onClick={()=>goSection("parcours","parcours")}
                          style={{ padding:"0.55rem 1.2rem", background:C.blue, color:"#fff", border:"none", borderRadius:999, fontSize:13, fontWeight:700, cursor:"pointer", fontFamily:"inherit", boxShadow:`0 4px 14px ${C.blue}44` }}>
                          🛤️ Học Unité ngay →
                        </button>
                      </div>
                    ) : (
                      <div style={{ textAlign:"center", padding:"20px 0", color:C.gray, fontSize:12.5 }}>
                        Không có từ nào phù hợp.
                      </div>
                    )
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

                {/* ── Luyện tập tự do — collapsible ── */}
                <div style={{ background:C.white, borderRadius:16, border:`1.5px solid ${C.border}`, overflow:"hidden" }}>
                  <button onClick={()=>setEditOpen(o=>!o)}
                    style={{ width:"100%", display:"flex", alignItems:"center", justifyContent:"space-between", padding:"0.8rem 1rem", background:"transparent", border:"none", cursor:"pointer", fontFamily:"inherit" }}>
                    <span style={{ fontSize:"0.82rem", fontWeight:700, color:C.blue }}>✏️ Luyện tập tự do</span>
                    <span style={{ fontSize:"0.75rem", color:C.gray }}>{editOpen ? "▲ Thu gọn" : "▼ Mở rộng"}</span>
                  </button>

                  {editOpen && (
                    <div style={{ padding:"0 1rem 1rem", display:"flex", flexDirection:"column", gap:"0.7rem", animation:"fadeUp 0.2s ease" }}>
                      <VocabGenerator onGenerate={generated=>{
                        const lines = generated.map(w=>`${w.fr} — ${w.vi}`).join("\n");
                        setTextPersist(lines); setView("vocab-table"); setGeneratedVocab(generated); setEditOpen(false);
                      }}/>

                      {/* Textarea */}
                      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
                        <div style={{ fontSize:"0.72rem", fontWeight:600, color:C.gray }}>📝 Nhập từ vựng</div>
                        <div style={{ display:"flex", gap:"0.4rem" }}>
                          <button onClick={()=>setShowImport(true)} style={{ padding:"0.22rem 0.58rem", background:"transparent", border:`1.5px solid ${C.border}`, color:C.gray, borderRadius:20, fontSize:"0.67rem", cursor:"pointer" }}>📁 Import</button>
                          {words.length>=1 && <button onClick={()=>{ const content=words.map(w=>w.vi?`${w.fr} — ${w.vi}`:w.fr).join("\n"); const a=document.createElement("a"); a.href=URL.createObjectURL(new Blob([content],{type:"text/plain"})); a.download=`tu-vung-${new Date().toISOString().slice(0,10)}.txt`; a.click(); }} style={{ padding:"0.22rem 0.58rem", background:"transparent", border:`1.5px solid ${C.border}`, color:C.gray, borderRadius:20, fontSize:"0.67rem", cursor:"pointer" }}>⬇ Export</button>}
                          {words.length>=3 && <button onClick={()=>setShowSave(true)} style={{ padding:"0.22rem 0.58rem", background:"transparent", border:`1.5px solid ${C.blue}`, color:C.blue, borderRadius:20, fontSize:"0.67rem", cursor:"pointer" }}>💾 Lưu</button>}
                        </div>
                      </div>
                      <textarea value={text} onChange={e=>setTextPersist(e.target.value)}
                        placeholder={"la boulangerie — tiệm bánh mì\nle marché — chợ\n..."}
                        style={{ width:"100%", height:130, border:`1.5px solid ${C.border}`, borderRadius:12, padding:"0.65rem 0.75rem", fontFamily:"inherit", fontSize:"0.85rem", background:C.white, resize:"vertical", color:C.ink, lineHeight:1.7, boxSizing:"border-box" }}/>
                      <div style={{ fontSize:"0.7rem", color:C.gray }}>
                        Mỗi dòng: <code style={{ background:C.blueL, color:C.blue, padding:"1px 6px", borderRadius:4, fontSize:"0.68rem" }}>từ pháp — nghĩa</code>
                        {words.length>0 && <span style={{ color:C.blue, marginLeft:8, fontWeight:600 }}>{words.length} từ</span>}
                      </div>

                      {/* Exercise types — only show when words entered */}
                      {words.length >= 2 && (<>
                        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"0.35rem" }}>
                          {[{id:"multiple_choice",label:"☑ Trắc nghiệm"},{id:"matching",label:"🔗 Nối từ"},{id:"flashcard",label:"🃏 Flashcard"},{id:"mixed",label:"🎲 Hỗn hợp"},{id:"fill_blank",label:"✏️ Điền từ"},{id:"dictee",label:"🎧 Dictée"},{id:"anagramme",label:"🔀 Xếp chữ"}].map(t=>(
                            <button key={t.id} onClick={()=>setType(t.id)}
                              style={{ padding:"0.5rem 0.3rem", border:`1.5px solid ${type===t.id?C.blue:C.border}`, borderRadius:10, background:type===t.id?C.blue:C.white, color:type===t.id?C.white:C.ink, fontSize:"0.78rem", cursor:"pointer", fontFamily:"inherit", transition:"all 0.15s", fontWeight:type===t.id?600:400 }}>
                              {t.label}
                            </button>
                          ))}
                        </div>
                        {!["matching","dictee","flashcard","anagramme"].includes(type) && (
                          <div>
                            <div style={{ fontSize:"0.72rem", color:C.gray, marginBottom:"0.3rem" }}>🔢 Số câu: <b>{numQ}</b></div>
                            <input type="range" min={3} max={30} value={numQ} onChange={e=>setNumQ(Number(e.target.value))} style={{ width:"100%", accentColor:C.blue }}/>
                          </div>
                        )}
                        {error && <div style={{ color:C.red, fontSize:"0.8rem", padding:"0.5rem 0.75rem", background:C.redL, borderRadius:10 }}>⚠ {error}</div>}
                        <button onClick={generate} disabled={loading}
                          style={{ width:"100%", padding:"0.85rem", background:`linear-gradient(135deg,${C.blue},${C.blueDark})`, color:C.white, border:"none", borderRadius:14, fontFamily:"'Playfair Display',Georgia,serif", fontSize:"0.95rem", cursor:"pointer", fontWeight:700, boxShadow:`0 6px 20px ${C.blue}44` }}>
                          {loading ? "Đang tạo..." : "Bắt đầu luyện tập ✦"}
                        </button>
                      </>)}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* HISTORY */}
            {view==="history" && (
              <div style={{ padding:"1rem", animation:"fadeUp 0.3s ease" }}>

                {/* ── Từ đã lưu (reading + dict) ── */}
                <SavedWordListView onReview={() => goSection("srs","srs-saved")} />

                {/* ── Divider ── */}
                <div style={{ display:"flex", alignItems:"center", gap:8, margin:"0.5rem 0 1rem" }}>
                  <div style={{ flex:1, height:1, background:C.border }}/>
                  <span style={{ fontSize:10, fontWeight:700, color:C.gray, letterSpacing:"0.1em", textTransform:"uppercase" }}>Bộ từ tự nhập</span>
                  <div style={{ flex:1, height:1, background:C.border }}/>
                </div>

                {/* ── Saved sets ── */}
                {sets.length===0
                  ? <div style={{ textAlign:"center", padding:"1rem" }}>
                      <div style={{ fontSize:"0.8rem", color:C.gray, lineHeight:1.6, marginBottom:"0.75rem" }}>Nhập từ vựng ở tab <b>Bộ của tôi</b> và nhấn 💾 Lưu để giữ lại.</div>
                      <button onClick={()=>setView("input")} style={{ padding:"0.45rem 1rem", background:C.blue, color:C.white, border:"none", borderRadius:12, fontSize:"0.78rem", cursor:"pointer", fontWeight:600 }}>
                        Đến Bộ của tôi →
                      </button>
                    </div>
                  : sets.map(s=>(
                    <div key={s.id} style={{ background:C.white, border:`1.5px solid ${C.border}`, borderRadius:14, padding:"0.85rem 1rem", marginBottom:"0.55rem" }}>
                      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start" }}>
                        <div>
                          <div style={{ fontFamily:"'Playfair Display',Georgia,serif", fontSize:"0.95rem", color:C.ink, marginBottom:"0.2rem" }}>{s.name}</div>
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
            {view==="parcours"      && (level==="a1"
              ? <ParcoursPanel onNavigate={(s, v) => goSection(s, v || s)} />
              : <ParcoursPanel
                  onNavigate={(s, v) => goSection(s, v || s)}
                  units={PARCOURS_UNITS_A2}
                  stepGroups={STEP_GROUPS_A2}
                  stepDefs={STEP_DEFS_A2}
                  levelLabel="A2 ÉDITO"
                  levelTitle="A2 · Élémentaire"
                  book="Édito A2 · Didier FLE"
                  levelGoals={getLevelInfo("a2").goals}
                  lastUnitKey="parcours_last_unit_a2"
                />)}
            {view==="grammar"       && (level==="a1"
              ? <GrammarPanel onBackToParcours={backToParcours} cahier={cahier} />
              : <EditoGrammarPanel data={EDITO_GRAMMAR_A2} emojis={GRAMMAR_A2_EMOJIS} levelLabel="Édito A2" cahier={cahier} />)}
            {view==="defi"          && <DefiPanel/>}
            {view==="writing"       && (level==="a1"
              ? <WritingPanel onBackToParcours={backToParcours} />
              : <WritingPanel onBackToParcours={backToParcours} units={EDITO_A2_UNITS} unitPrefix="b" cefr="A2" />)}
            {view==="conversation"   && (level==="a1"
              ? <ProductionOralePanel
                  onBackToParcours={backToParcours}
                  units={EDITO_A1_UNITS}
                  pourNotes={EDITO_POUR_NOTES}
                  unitPrefix="u"
                  levelLabel="Édito A1"
                  cefr="A1"
                />
              : <ProductionOralePanel
                  onBackToParcours={backToParcours}
                  units={EDITO_A2_UNITS}
                  pourNotes={EDITO_POUR_NOTES_A2}
                  unitPrefix="b"
                  levelLabel="Édito A2"
                />)}
            {view==="prononciation"  && <PrononciationPanel words={words} />}
            {view==="srs"           && <SRSPanel currentWords={words} />}
            {view==="srs-saved"     && <SRSPanel currentWords={words} autoStartSaved />}
            {view==="reference_hub" && (level==="a1"
              ? <ReferenceHub onBackToParcours={backToParcours} cahier={cahier} />
              : <ReferenceHub
                  onBackToParcours={backToParcours}
                  tabs={REFERENCE_TABS_A2}
                  phonoData={EDITO_A2_PHONO}
                  verbUnits={EDITO_A2_VERB_UNITS}
                  levelLabel="Édito A2"
                  cahier={cahier}
                />)}
            {/* No onClose: the shell header already provides "← Về" */}
            {view==="level"         && <LevelSelectPanel currentLevel={level} onSelect={changeLevel} />}
            {view==="lecture"       && (level==="a1"
              ? <LecturePanel words={words} onBackToParcours={backToParcours} />
              : <LecturePanel
                  words={words}
                  onBackToParcours={backToParcours}
                  vocabUnits={EDITO_VOCAB_A2_UNITS}
                  grammarUnits={EDITO_GRAMMAR_A2}
                  parcoursUnits={PARCOURS_UNITS_A2}
                  readings={editoA2ReadingComprehension}
                  unitPrefix="b"
                  levelLabel="Édito A2"
                  cefr="A2"
                />)}
            {(view==="ecouter" || view==="dictee" || view==="listening") && (level==="a1"
              ? <EcouterPanel key={section} section={section} onBackToParcours={backToParcours} timings={EDITO_TIMINGS_A1} />
              : <EcouterPanel
                  key={section}
                  section={section}
                  onBackToParcours={backToParcours}
                  vocabUnits={EDITO_VOCAB_A2_UNITS}
                  audio={EDITO_AUDIO_A2}
                  timings={EDITO_TIMINGS_A2}
                  pourNotes={EDITO_POUR_NOTES_A2}
                  levelLabel="Édito A2"
                  cefr="A2"
                />)}
            {view==="quiz-unit"     && (level==="a1"
              ? <UnitQuizPanel onBackToParcours={backToParcours} cahier={cahier} />
              : <UnitQuizPanel
                  onBackToParcours={backToParcours}
                  units={PARCOURS_UNITS_A2}
                  vocabUnits={EDITO_VOCAB_A2_UNITS}
                  grammarUnits={EDITO_GRAMMAR_A2}
                  cefr="A2"
                  cahier={cahier}
                />)}
            {view==="revision"      && <RevisionPanel />}
            {view==="fiche"         && <FichePanel onNavigate={(s, v) => goSection(s, v || s)} />}
            {view==="delf"          && <DelfPanel />}
            {view==="delf-a2"       && <DelfA2Panel onBackToParcours={backToParcours} />}
            {view==="delf-ce"       && <DelfBookPanel onBack={()=>goSection("home","home")} />}
            {view==="pistes"        && <PistesPanel onBack={()=>goSection("home","home")} />}
            {view==="stats"         && <StatsPanel />}
            {view==="sentence"      && <SentenceBuilder />}
           </Suspense>
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
            <button onClick={toggleDark} aria-label={dark ? "Chuyển sang giao diện sáng" : "Chuyển sang giao diện tối"}
              style={{ background:"transparent", border:`1px solid ${C.border}`, color:C.gray, borderRadius:20, padding:"3px 8px", fontSize:"0.82rem", cursor:"pointer", lineHeight:1 }}>
              {dark ? "☀️" : "🌙"}
            </button>
          </div>
          <div style={{ flex:1, overflowY:"auto" }}>
            <Suspense fallback={panelFallback}>
              <ProfilPanel
                userName={userName}
                onChangeName={(name) => {
                  const trimmed = (name || "").trim();
                  if (!trimmed) return;
                  localStorage.setItem("user_name", trimmed);
                  setUserName(trimmed);
                  showToast("✓ Đã đổi tên!");
                }}
                dark={dark}
                toggleDark={toggleDark}
                themeId={themeId}
                onChangeTheme={changeTheme}
                levelInfo={levelInfo}
                onNavigate={(s, v) => goSection(s, v || s)}
              />
            </Suspense>
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
                  if (tab.id==="home") { setSection("home"); setNavStack([]); return; }
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
