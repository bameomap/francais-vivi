import { useState, useRef, useEffect } from "react";
import { C } from "../constants.js";
import { callAIText } from "../utils/api.js";
import { speak } from "../utils/helpers.js";
import { logMistake } from "../utils/storage.js";
import { EDITO_GRAMMAR } from "../data/editoGrammar.js";
import { EDITO_AUDIO, shuffleArray } from "../data/editoAudio.js";
import { EDITO_A1_UNITS } from "../data/editoA1Units.js";
import Spinner from "./ui/Spinner.jsx";
import { Confetti } from "./ui/Minou.jsx";

const NUM_SENTENCES     = 5;
const NUM_AUDIO_SENTS   = 5;
const MAX_PLAYS         = 3;

const ACCENT_KEYS = ["à","â","ä","ç","é","è","ê","ë","î","ï","ô","ù","û","ü","œ","æ"];

// ── Slow speak ───────────────────────────────────────────────────
function speakSlow(text, onEnd) {
  if (!window.speechSynthesis) { onEnd?.(); return; }
  window.speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(text);
  u.lang  = "fr-FR";
  u.rate  = 0.5;
  u.pitch = 1.0;
  const voices = window.speechSynthesis.getVoices();
  const PREF = ["Thomas","Amélie","Google français","fr-FR","fr-"];
  let voice = null;
  for (const p of PREF) {
    voice = voices.find(v => v.name.includes(p) || v.lang.startsWith(p));
    if (voice) break;
  }
  if (voice) u.voice = voice;
  if (onEnd) u.onend = onEnd;
  window.speechSynthesis.speak(u);
}

// ── Script parser ────────────────────────────────────────────────
function parseScript(text) {
  return text
    .split(/(?<=[.!?»])\s+|(?<=[.!?»])$|\n+/)
    .map(s => s.replace(/^[«"'\-–—\s]+|[«»"'\s]+$/g, "").trim())
    .filter(s => s.length > 3 && /[a-zA-ZÀ-ÿ]/.test(s));
}

// ── Text comparison ──────────────────────────────────────────────
function normalize(s = "") {
  return s.toLowerCase()
    .normalize("NFD").replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z\s]/g, "").trim();
}

function gradeWords(typed, correct) {
  const correctWords = correct.trim().split(/\s+/);
  const typedWords   = typed.trim().split(/\s+/).filter(Boolean);
  return correctWords.map((cw, i) => {
    const tw = typedWords[i] || "";
    const nTw = normalize(tw), nCw = normalize(cw);
    if (nTw === nCw && tw !== cw) return { word: cw, typed: tw, status: "accent" };
    if (nTw === nCw)               return { word: cw, typed: tw, status: "ok" };
    return { word: cw, typed: tw, status: "wrong" };
  });
}

// ── Word diff display ────────────────────────────────────────────
function WordDiff({ result }) {
  return (
    <div style={{ lineHeight:2.1, fontSize:"0.88rem", fontFamily:"Georgia,serif" }}>
      {result.map((r, i) => {
        const color = r.status==="ok" ? "#059669" : r.status==="accent" ? "#D97706" : "#DC2626";
        const bg    = r.status==="ok" ? "#ECFDF5"  : r.status==="accent" ? "#FFFBEB"  : "#FEF2F2";
        return (
          <span key={i} style={{ marginRight:"0.35rem", display:"inline-block" }}>
            <span style={{ background:bg, color, borderRadius:4, padding:"0 3px", fontWeight:600 }}>{r.word}</span>
            {r.status !== "ok" && r.typed && (
              <span style={{ fontSize:"0.65rem", color:C.gray, marginLeft:2 }}>({r.typed})</span>
            )}
            {r.status === "accent" && (
              <span style={{ fontSize:"0.6rem", color:"#D97706", marginLeft:1 }}>~accent</span>
            )}
          </span>
        );
      })}
    </div>
  );
}

// ── Waveform bars ────────────────────────────────────────────────
const WAVE_BARS = [
  { h:18, d:"0.4s",  delay:"0s"    },
  { h:30, d:"0.5s",  delay:"0.1s"  },
  { h:42, d:"0.35s", delay:"0.05s" },
  { h:28, d:"0.55s", delay:"0.15s" },
  { h:36, d:"0.45s", delay:"0.08s" },
  { h:22, d:"0.5s",  delay:"0.2s"  },
  { h:38, d:"0.4s",  delay:"0.12s" },
];
function WaveForm({ playing }) {
  return (
    <div className={`listening-wave${playing ? " playing" : ""}`}
      style={{ display:"flex", alignItems:"flex-end", gap:4, height:48, marginBottom:"0.75rem", justifyContent:"center" }}>
      {WAVE_BARS.map((b, i) => (
        <div key={i} style={{
          width:4, borderRadius:99,
          background:"rgba(255,255,255,0.7)",
          height: playing ? b.h : 4,
          "--d": b.d, "--delay": b.delay,
          transition: playing ? "none" : "height 0.4s ease",
        }} />
      ))}
    </div>
  );
}

// ── AI sentence generator ────────────────────────────────────────
async function generateSentences(words, grammarPoints) {
  const sample = words.slice(0, 15).map(w => w.fr).join(", ");
  const grammarHint = grammarPoints?.length > 0
    ? `\nÁp dụng các điểm ngữ pháp sau: ${grammarPoints.slice(0, 4).map(p => p.topic).join(" | ")}.`
    : "";
  const text = await callAIText(
    [{ role:"user", content:`Tạo đúng ${NUM_SENTENCES} câu tiếng Pháp A1 ngắn (5-9 từ/câu) sử dụng các từ: ${sample}.${grammarHint}\nMỗi câu trên một dòng, không đánh số, không giải thích, không dịch.` }],
    "Bạn là giáo viên tiếng Pháp. Chỉ trả lời đúng các câu được yêu cầu, mỗi câu một dòng."
  );
  return text.split("\n")
    .map(l => l.replace(/^\d+[\.\)]\s*/, "").trim())
    .filter(l => l.length > 3)
    .slice(0, NUM_SENTENCES);
}

// ── Audio Player (real MP3) ──────────────────────────────────────
function AudioPlayer({ src, trackNum, title }) {
  const audioRef = useRef(null);
  const [playing,  setPlaying]  = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [error,    setError]    = useState(false);

  useEffect(() => {
    const el = audioRef.current;
    if (!el) return;
    const onTime  = () => setProgress(el.currentTime);
    const onLoad  = () => setDuration(el.duration);
    const onEnded = () => setPlaying(false);
    const onError = () => setError(true);
    el.addEventListener("timeupdate", onTime);
    el.addEventListener("loadedmetadata", onLoad);
    el.addEventListener("ended", onEnded);
    el.addEventListener("error", onError);
    return () => {
      el.removeEventListener("timeupdate", onTime);
      el.removeEventListener("loadedmetadata", onLoad);
      el.removeEventListener("ended", onEnded);
      el.removeEventListener("error", onError);
    };
  }, [src]);

  const togglePlay = () => {
    const el = audioRef.current;
    if (!el || error) return;
    if (playing) { el.pause(); setPlaying(false); }
    else         { el.play().catch(() => setError(true)); setPlaying(true); }
  };

  const seekTo = (e) => {
    const el = audioRef.current;
    if (!el || !duration) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const pct  = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    el.currentTime = pct * duration;
    setProgress(pct * duration);
  };

  const fmt = (s) => {
    if (!s || isNaN(s)) return "0:00";
    const m = Math.floor(s / 60), sec = Math.floor(s % 60);
    return `${m}:${sec.toString().padStart(2, "0")}`;
  };

  const pct = duration > 0 ? (progress / duration) * 100 : 0;

  return (
    <div style={{ background:"linear-gradient(135deg,#1B3A6B,#2d4f8a)", borderRadius:18, padding:"1rem 1.1rem", color:"#fff" }}>
      <audio ref={audioRef} src={src} preload="metadata" />

      {/* Track label */}
      <div style={{ display:"flex", alignItems:"center", gap:"0.5rem", marginBottom:"0.75rem" }}>
        <div style={{ background:"rgba(255,255,255,0.2)", borderRadius:8, padding:"0.2rem 0.55rem", fontSize:"0.62rem", fontWeight:700, letterSpacing:"0.1em" }}>
          PISTE {trackNum}
        </div>
        <div style={{ fontSize:"0.78rem", fontWeight:600, opacity:0.9 }}>{title}</div>
      </div>

      {/* Waveform visual */}
      <WaveForm playing={playing} />

      {/* Controls row */}
      <div style={{ display:"flex", alignItems:"center", gap:"0.75rem" }}>
        {/* Play/Pause button */}
        <button onClick={togglePlay}
          style={{ width:44, height:44, borderRadius:"50%", border:"2px solid rgba(255,255,255,0.6)", background:"rgba(255,255,255,0.2)", color:"#fff", fontSize:"1.1rem", cursor: error ? "not-allowed" : "pointer", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0, opacity: error ? 0.5 : 1 }}>
          {playing ? "⏸" : "▶"}
        </button>

        {/* Progress bar */}
        <div style={{ flex:1 }}>
          <div onClick={seekTo} style={{ height:5, background:"rgba(255,255,255,0.25)", borderRadius:99, cursor:"pointer", position:"relative" }}>
            <div style={{ height:"100%", width:`${pct}%`, background:"rgba(255,255,255,0.9)", borderRadius:99, transition:"width 0.1s linear" }} />
          </div>
          <div style={{ display:"flex", justifyContent:"space-between", marginTop:"0.25rem", fontSize:"0.62rem", opacity:0.75 }}>
            <span>{fmt(progress)}</span>
            <span>{fmt(duration)}</span>
          </div>
        </div>
      </div>

      {error && (
        <div style={{ marginTop:"0.6rem", background:"rgba(255,80,80,0.25)", borderRadius:10, padding:"0.5rem 0.7rem", fontSize:"0.68rem" }}>
          ⚠ Không tải được audio. File cần có: <b>{trackNum}_Edito_A1_Livre.mp3</b> trong <b>Nouvel_Edito_A1_audios_manuel/</b>
        </div>
      )}
    </div>
  );
}

// ── Track card (picker) ──────────────────────────────────────────
function TrackCard({ track, onSelect }) {
  return (
    <button onClick={() => onSelect(track)}
      style={{ width:"100%", background:"#fff", border:`2px solid ${track.colorLight}`, borderRadius:16, padding:"0.9rem 1rem", textAlign:"left", cursor:"pointer", display:"flex", alignItems:"center", gap:"0.85rem", transition:"all 0.18s" }}
      onMouseEnter={e => { e.currentTarget.style.borderColor = track.color; e.currentTarget.style.transform = "translateY(-1px)"; }}
      onMouseLeave={e => { e.currentTarget.style.borderColor = track.colorLight; e.currentTarget.style.transform = "none"; }}>

      {/* Icon + track badge */}
      <div style={{ width:46, height:46, borderRadius:14, background:track.colorLight, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
        <div style={{ fontSize:"1.3rem", lineHeight:1 }}>{track.theme}</div>
      </div>

      <div style={{ flex:1, minWidth:0 }}>
        <div style={{ display:"flex", alignItems:"center", gap:"0.4rem", marginBottom:2 }}>
          <span style={{ fontSize:"0.58rem", fontWeight:700, color:track.color, background:track.colorLight, borderRadius:6, padding:"0.1rem 0.4rem", letterSpacing:"0.08em", textTransform:"uppercase" }}>
            {track.section} · p.{track.page}
          </span>
          <span style={{ fontSize:"0.58rem", color:C.gray }}>Piste {track.trackNum}</span>
        </div>
        <div style={{ fontWeight:700, fontSize:"0.88rem", color:C.ink, marginBottom:2 }}>{track.title}</div>
        <div style={{ fontSize:"0.7rem", color:C.gray }}>{track.subtitle}</div>
      </div>

      <div style={{ color:C.gray, fontSize:"1rem", flexShrink:0 }}>›</div>
    </button>
  );
}

// ══════════════════════════════════════════════════════════════════
export default function DicteePanel({ words: propWords = [], unitId = null }) {
  const words = propWords.length >= 4 ? propWords : [
    {fr:"famille"},{fr:"maison"},{fr:"école"},{fr:"ami"},{fr:"livre"},
    {fr:"manger"},{fr:"aller"},{fr:"beau"},{fr:"jour"},{fr:"ville"},
  ];

  // Resolve audio tracks for current unit
  const unitKey     = unitId ?? "u5";
  const audioTracks = EDITO_AUDIO[unitKey] ?? [];
  // editoA1Units uses "unite-5" format; vocab uses "u5" — map across
  const unitNum     = unitKey.replace("u", "");
  const unitMeta    = EDITO_A1_UNITS.find(u => u.id === `unite-${unitNum}` || u.unit === Number(unitNum));
  const unitLabel   = unitMeta ? `Unité ${unitMeta.unit} — ${unitMeta.title}` : unitKey.toUpperCase();

  const [phase,        setPhase]        = useState("idle");
  const [mode,         setMode]         = useState("auto");
  const [scriptText,   setScriptText]   = useState("");
  const [sentences,    setSentences]    = useState([]);
  const [current,      setCurrent]      = useState(0);
  const [input,        setInput]        = useState("");
  const [results,      setResults]      = useState([]);
  const [checked,      setChecked]      = useState(false);
  const [plays,        setPlays]        = useState(0);
  const [playing,      setPlaying]      = useState(false);
  const [slowMode,     setSlowMode]     = useState(false);
  const [grammarHints, setGrammarHints] = useState([]);
  const [confetti,     setConfetti]     = useState(false);
  const [err,          setErr]          = useState("");

  // Audio mode state
  const [audioTrack,   setAudioTrack]   = useState(null); // selected track object

  const inputRef = useRef(null);

  // Auto-play on new sentence
  useEffect(() => {
    if (phase !== "quiz" || !sentences[current]) return;
    setPlays(0); setPlaying(false);
    const t = setTimeout(() => playNow(false), 400);
    return () => clearTimeout(t);
  }, [current, phase]);

  const playNow = (slow) => {
    if (playing) return;
    setPlaying(true);
    const fn = slow ? speakSlow : speak;
    fn(sentences[current], () => setPlaying(false));
    setPlays(p => p + 1);
  };

  const playAgain = () => {
    if (plays >= MAX_PLAYS || playing) return;
    playNow(slowMode);
  };

  const startQuiz = (s, hints = []) => {
    setSentences(s); setResults([]); setCurrent(0);
    setInput(""); setChecked(false); setConfetti(false);
    setGrammarHints(hints);
    setPhase("quiz");
  };

  const start = async () => {
    if (mode === "script") {
      const s = parseScript(scriptText);
      if (s.length < 1) { setErr("Paste đoạn văn tiếng Pháp vào ô bên dưới nhé!"); return; }
      startQuiz(s, []);
      return;
    }
    if (mode === "audio") {
      if (!audioTrack) { setErr("Chọn một bài nghe nhé!"); return; }
      const picked = shuffleArray(audioTrack.sentences).slice(0, NUM_AUDIO_SENTS);
      startQuiz(picked, []);
      return;
    }
    // Auto AI mode
    setPhase("loading"); setErr("");
    try {
      const grammarId    = unitId ? "g" + unitId.replace("u", "") : null;
      const grammarUnit  = grammarId ? EDITO_GRAMMAR.find(u => u.id === grammarId) : null;
      const grammarPoints = grammarUnit?.points || [];
      const s = await generateSentences(words, grammarPoints);
      if (s.length < 2) throw new Error("Không đủ câu, thử lại nhé.");
      startQuiz(s, grammarPoints.slice(0, 3));
    } catch(e) { setErr(e.message); setPhase("idle"); }
  };

  const restart = () => {
    if (mode === "script")       startQuiz(parseScript(scriptText), []);
    else if (mode === "audio" && audioTrack) {
      const picked = shuffleArray(audioTrack.sentences).slice(0, NUM_AUDIO_SENTS);
      startQuiz(picked, []);
    }
    else start();
  };

  const insertAccent = (ch) => {
    if (checked) return;
    const el = inputRef.current;
    if (!el) { setInput(v => v + ch); return; }
    const start = el.selectionStart, end = el.selectionEnd;
    const next = input.slice(0, start) + ch + input.slice(end);
    setInput(next);
    requestAnimationFrame(() => {
      el.focus();
      el.setSelectionRange(start + ch.length, start + ch.length);
    });
  };

  const check = () => {
    if (!input.trim() || checked) return;
    const grade = gradeWords(input, sentences[current]);
    setResults(r => [...r, { sentence: sentences[current], typed: input, grade }]);
    grade.filter(g => g.status === "wrong").forEach(g => {
      logMistake({ fr: g.word, vi:"", context: sentences[current], module:"dictee" });
    });
    setChecked(true);
    setTimeout(() => inputRef.current?.focus(), 100);
  };

  const next = () => {
    const nextIdx = current + 1;
    if (nextIdx >= sentences.length) {
      setPhase("done");
      const totalWords = results.reduce((a, r) => a + r.grade.length, 0);
      const okWords    = results.reduce((a, r) => a + r.grade.filter(g => g.status==="ok").length, 0);
      if (totalWords > 0 && Math.round(okWords / totalWords * 100) >= 80)
        setTimeout(() => setConfetti(true), 300);
    } else {
      setCurrent(nextIdx);
      setInput(""); setChecked(false);
    }
  };

  const totalWords  = results.reduce((a, r) => a + r.grade.length, 0);
  const okWords     = results.reduce((a, r) => a + r.grade.filter(g => g.status==="ok").length, 0);
  const accentWords = results.reduce((a, r) => a + r.grade.filter(g => g.status==="accent").length, 0);
  const pct = totalWords > 0 ? Math.round(okWords / totalWords * 100) : 0;

  // ════════════════════════════════════════════════════════════════
  // IDLE
  // ════════════════════════════════════════════════════════════════
  if (phase === "idle") {

    // ── Audio mode: track picker ─────────────────────────────────
    if (mode === "audio" && !audioTrack) {
      return (
        <div style={{ padding:"1rem", animation:"fadeUp 0.3s ease", display:"flex", flexDirection:"column", gap:"0.7rem" }}>

          {/* Hero */}
          <div style={{ background:"linear-gradient(135deg,#1B3A6B,#2d4f8a)", borderRadius:20, padding:"1.25rem 1.2rem", color:"#fff", textAlign:"center" }}>
            <div style={{ fontSize:"1.8rem", marginBottom:"0.25rem" }}>🎧</div>
            <div style={{ fontFamily:"'Playfair Display',Georgia,serif", fontSize:"1.1rem", fontWeight:700, marginBottom:"0.2rem" }}>Dictée · Audio réel</div>
            <div style={{ fontSize:"0.7rem", opacity:0.85 }}>Nghe bài thật từ sách → Gõ lại từng câu</div>
          </div>

          {/* Mode tabs */}
          <div style={{ display:"flex", background:C.white, borderRadius:14, border:`1.5px solid ${C.border}`, overflow:"hidden" }}>
            {[["auto","🤖 AI"],["script","📝 Script"],["audio","🎧 Sách"]].map(([m, label]) => (
              <button key={m} onClick={() => { setMode(m); setErr(""); setAudioTrack(null); }}
                style={{ flex:1, padding:"0.6rem 0.3rem", border:"none", background: mode===m ? C.blue : "transparent", color: mode===m ? "#fff" : C.gray, fontSize:"0.75rem", cursor:"pointer", fontWeight:600, transition:"all 0.2s" }}>
                {label}
              </button>
            ))}
          </div>

          {/* Track list */}
          <div style={{ fontSize:"0.62rem", fontWeight:700, color:C.gray, letterSpacing:"0.1em", textTransform:"uppercase", marginBottom:"-0.2rem" }}>
            Chọn bài nghe — {unitLabel}
          </div>
          {audioTracks.map(track => (
            <TrackCard key={track.id} track={track} onSelect={t => setAudioTrack(t)} />
          ))}

          {audioTracks.length === 0 && (
            <div style={{ textAlign:"center", color:C.gray, fontSize:"0.8rem", padding:"1rem" }}>
              Chưa có bài nghe cho unit này.
            </div>
          )}
        </div>
      );
    }

    // ── Audio mode: listen phase ─────────────────────────────────
    if (mode === "audio" && audioTrack) {
      return (
        <div style={{ padding:"1rem", animation:"fadeUp 0.3s ease", display:"flex", flexDirection:"column", gap:"0.7rem" }}>

          {/* Back */}
          <button onClick={() => setAudioTrack(null)}
            style={{ alignSelf:"flex-start", background:"none", border:"none", color:C.blue, fontSize:"0.78rem", cursor:"pointer", fontWeight:600, padding:0, display:"flex", alignItems:"center", gap:"0.3rem" }}>
            ← Chọn bài khác
          </button>

          {/* Track info badge */}
          <div style={{ background:audioTrack.colorLight, borderRadius:14, padding:"0.75rem 1rem", border:`1.5px solid ${audioTrack.color}33` }}>
            <div style={{ display:"flex", alignItems:"center", gap:"0.6rem" }}>
              <div style={{ fontSize:"1.8rem" }}>{audioTrack.theme}</div>
              <div>
                <div style={{ fontSize:"0.58rem", fontWeight:700, color:audioTrack.color, textTransform:"uppercase", letterSpacing:"0.1em", marginBottom:2 }}>
                  {audioTrack.section} · Page {audioTrack.page} · Piste {audioTrack.trackNum}
                </div>
                <div style={{ fontFamily:"'Playfair Display',Georgia,serif", fontWeight:700, fontSize:"1rem", color:C.ink }}>{audioTrack.title}</div>
                <div style={{ fontSize:"0.72rem", color:C.gray, marginTop:1 }}>{audioTrack.subtitle}</div>
              </div>
            </div>
          </div>

          {/* Real audio player */}
          <AudioPlayer
            src={audioTrack.audioSrc}
            trackNum={audioTrack.trackNum}
            title={audioTrack.title}
          />

          {/* Instructions */}
          <div style={{ background:C.blueL, borderRadius:14, padding:"0.75rem 1rem", border:`1.5px solid ${C.blue}22`, fontSize:"0.78rem", color:C.ink, lineHeight:1.75 }}>
            <div style={{ fontWeight:700, color:C.blue, marginBottom:"0.3rem", fontSize:"0.7rem" }}>📋 Cách thực hành</div>
            <div>① Nghe toàn bộ bài hội thoại bên trên.</div>
            <div>② Nhấn <b>Bắt đầu dictée</b> → nghe từng câu → gõ lại.</div>
            <div>③ Mỗi câu được chấm từng từ — sai accent cũng bị trừ điểm nhẹ.</div>
            <div style={{ marginTop:"0.35rem", color:C.gray, fontSize:"0.68rem" }}>
              {NUM_AUDIO_SENTS} câu ngẫu nhiên từ {audioTrack.sentences.length} câu trong bài
            </div>
          </div>

          {/* Start button */}
          <button onClick={start}
            style={{ padding:"0.85rem", background:`linear-gradient(135deg,${audioTrack.color},${audioTrack.color}cc)`, color:"#fff", border:"none", borderRadius:14, fontFamily:"'Playfair Display',Georgia,serif", fontSize:"0.95rem", cursor:"pointer", fontWeight:700 }}>
            Bắt đầu dictée →
          </button>
        </div>
      );
    }

    // ── Auto / Script mode (existing UI) ────────────────────────
    return (
      <div style={{ padding:"1rem", animation:"fadeUp 0.3s ease", display:"flex", flexDirection:"column", gap:"0.7rem" }}>

        {/* Hero */}
        <div style={{ background:"linear-gradient(135deg,#1B3A6B 0%,#2d4f8a 100%)", borderRadius:20, padding:"1.4rem 1.2rem", textAlign:"center", color:"#fff" }}>
          <div style={{ fontSize:"2rem", marginBottom:"0.3rem" }}>🎧</div>
          <div style={{ fontFamily:"'Playfair Display',Georgia,serif", fontSize:"1.15rem", fontWeight:700, marginBottom:"0.25rem" }}>Nghe &amp; Chép</div>
          <div style={{ fontSize:"0.72rem", opacity:0.85 }}>Écoute · Écris · Vérifie</div>
          <div style={{ display:"flex", justifyContent:"center", gap:"0.75rem", marginTop:"0.75rem", fontSize:"0.7rem" }}>
            <span style={{ background:"rgba(255,255,255,0.2)", borderRadius:20, padding:"0.15rem 0.55rem" }}>✅ đúng</span>
            <span style={{ background:"rgba(255,255,255,0.2)", borderRadius:20, padding:"0.15rem 0.55rem" }}>~accent</span>
            <span style={{ background:"rgba(255,255,255,0.2)", borderRadius:20, padding:"0.15rem 0.55rem" }}>❌ sai</span>
          </div>
        </div>

        {/* Mode tabs — 3 tabs now */}
        <div style={{ display:"flex", background:C.white, borderRadius:14, border:`1.5px solid ${C.border}`, overflow:"hidden" }}>
          {[["auto","🤖 AI"],["script","📝 Script"],["audio","🎧 Sách"]].map(([m, label]) => (
            <button key={m} onClick={() => { setMode(m); setErr(""); setAudioTrack(null); }}
              style={{ flex:1, padding:"0.65rem 0.3rem", border:"none", background: mode===m ? C.blue : "transparent", color: mode===m ? "#fff" : C.gray, fontSize:"0.77rem", cursor:"pointer", fontWeight:600, transition:"all 0.2s" }}>
              {label}
            </button>
          ))}
        </div>

        {/* Mode content */}
        {mode === "auto" ? (
          <div style={{ background:C.blueL, borderRadius:14, padding:"0.9rem 1rem", border:`1.5px solid ${C.blue}22`, fontSize:"0.8rem", color:C.ink, lineHeight:1.7 }}>
            AI tạo <b>{NUM_SENTENCES} câu A1</b> từ bộ từ vựng của bạn.<br/>
            Nghe tối đa <b>{MAX_PLAYS} lần</b> → gõ lại → chấm từng chữ.
          </div>
        ) : (
          <div style={{ background:C.white, borderRadius:14, padding:"0.9rem 1rem", border:`1.5px solid ${C.border}` }}>
            <div style={{ fontSize:"0.65rem", color:C.gray, marginBottom:"0.4rem", textTransform:"uppercase", letterSpacing:1, fontWeight:600 }}>Paste đoạn văn tiếng Pháp</div>
            <textarea
              value={scriptText}
              onChange={e => { setScriptText(e.target.value); setErr(""); }}
              placeholder={"Je m'appelle Marie. J'habite à Paris.\nJ'aime beaucoup la musique et les livres."}
              rows={4}
              style={{ width:"100%", border:`1.5px solid ${C.border}`, borderRadius:10, padding:"0.55rem 0.7rem", fontSize:"0.84rem", fontFamily:"Georgia,serif", color:C.ink, resize:"vertical", lineHeight:1.7, outline:"none" }}
            />
            {scriptText.trim() && (
              <div style={{ marginTop:"0.3rem", fontSize:"0.68rem", color:C.blue, fontWeight:600 }}>
                → {parseScript(scriptText).length} câu được nhận diện
              </div>
            )}
          </div>
        )}

        {err && <div style={{ color:"#DC2626", fontSize:"0.78rem", textAlign:"center" }}>⚠ {err}</div>}

        <button onClick={start}
          style={{ padding:"0.8rem", background:`linear-gradient(135deg,${C.accent},#c0392b)`, color:"#fff", border:"none", borderRadius:14, fontFamily:"'Playfair Display',Georgia,serif", fontSize:"0.95rem", cursor:"pointer", fontWeight:700 }}>
          Bắt đầu →
        </button>
      </div>
    );
  }

  // ════════════════════════════════════════════════════════════════
  // LOADING
  // ════════════════════════════════════════════════════════════════
  if (phase === "loading") return (
    <div style={{ display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", height:260, gap:"1rem" }}>
      <Spinner />
      <div style={{ fontSize:"0.85rem", color:C.gray }}>AI đang tạo câu…</div>
    </div>
  );

  // ════════════════════════════════════════════════════════════════
  // DONE
  // ════════════════════════════════════════════════════════════════
  if (phase === "done") return (
    <div style={{ padding:"1rem", animation:"fadeUp 0.3s ease" }}>
      <Confetti active={confetti} onDone={() => setConfetti(false)} />

      {/* Score circle */}
      <div style={{ textAlign:"center", marginBottom:"1.25rem" }}>
        <div style={{ width:72, height:72, borderRadius:"50%", background:C.blueL, display:"flex", alignItems:"center", justifyContent:"center", fontSize:"2.5rem", margin:"0 auto 0.75rem" }}>
          {pct>=80?"🎉":pct>=50?"👍":"💪"}
        </div>
        <div style={{ fontFamily:"'Playfair Display',Georgia,serif", fontSize:"1.6rem", color:C.ink, fontWeight:700 }}>{okWords}/{totalWords}</div>
        <div style={{ fontSize:"0.82rem", color:C.blue, fontWeight:600, marginTop:2 }}>
          {pct}% · {accentWords>0?`${accentWords} lỗi accent · `:""}{pct>=80?"Parfait!":pct>=50?"Bien!":"Continue!"}
        </div>

        {/* Source badge */}
        {mode === "audio" && audioTrack && (
          <div style={{ display:"inline-flex", alignItems:"center", gap:"0.3rem", background:audioTrack.colorLight, color:audioTrack.color, borderRadius:20, padding:"0.2rem 0.75rem", fontSize:"0.65rem", fontWeight:700, marginTop:"0.5rem" }}>
            {audioTrack.theme} {audioTrack.section} · {audioTrack.title}
          </div>
        )}
      </div>

      {/* Detail */}
      <div style={{ background:C.white, borderRadius:16, border:`1.5px solid ${C.border}`, padding:"0.85rem 1rem", marginBottom:"1rem" }}>
        <div style={{ fontSize:"0.58rem", textTransform:"uppercase", letterSpacing:"0.12em", color:C.gray, fontWeight:700, marginBottom:"0.6rem" }}>Kết quả chi tiết</div>
        {results.map((r, i) => (
          <div key={i} style={{ padding:"0.4rem 0", borderBottom: i<results.length-1?`1px solid ${C.border}`:"none" }}>
            <div style={{ fontSize:"0.65rem", color:C.gray, marginBottom:"0.2rem" }}>Câu {i+1}</div>
            <WordDiff result={r.grade} />
          </div>
        ))}
      </div>

      <div style={{ display:"flex", gap:"0.5rem" }}>
        {mode === "audio" && audioTrack && (
          <button onClick={() => { setPhase("idle"); }}
            style={{ flex:1, padding:"0.8rem", background:C.white, color:C.blue, border:`1.5px solid ${C.blue}`, borderRadius:14, fontSize:"0.85rem", cursor:"pointer", fontWeight:600 }}>
            ← Nghe lại
          </button>
        )}
        <button onClick={restart}
          style={{ flex:1, padding:"0.8rem", background:`linear-gradient(135deg,${C.accent},#c0392b)`, color:"#fff", border:"none", borderRadius:14, fontFamily:"'Playfair Display',Georgia,serif", fontSize:"0.92rem", cursor:"pointer", fontWeight:700 }}>
          🔄 Làm lại
        </button>
      </div>
    </div>
  );

  // ════════════════════════════════════════════════════════════════
  // QUIZ
  // ════════════════════════════════════════════════════════════════
  const sentence    = sentences[current];
  const remaining   = MAX_PLAYS - plays;
  const canPlayMore = remaining > 0 && !playing;

  return (
    <div style={{ padding:"0 0 1rem", animation:"fadeUp 0.3s ease" }}>

      {/* ── Source badge (audio mode) ──────────────────────── */}
      {mode === "audio" && audioTrack && (
        <div style={{ padding:"0.6rem 1rem 0", display:"flex", alignItems:"center", gap:"0.4rem" }}>
          <div style={{ background:audioTrack.colorLight, color:audioTrack.color, borderRadius:20, padding:"0.2rem 0.65rem", fontSize:"0.62rem", fontWeight:700 }}>
            {audioTrack.theme} {audioTrack.section} · Piste {audioTrack.trackNum}
          </div>
        </div>
      )}

      {/* ── Progress ────────────────────────────────────────── */}
      <div style={{ padding:"0.6rem 1rem 0" }}>
        <div style={{ display:"flex", gap:3, marginBottom:4 }}>
          {sentences.map((_, i) => (
            <div key={i} style={{ flex:1, height:3, borderRadius:99, background: i<current ? C.blue : i===current ? `${C.blue}88` : C.border, transition:"background 0.3s" }}/>
          ))}
        </div>
        <div style={{ display:"flex", justifyContent:"space-between" }}>
          <span style={{ fontSize:"0.62rem", color:C.gray }}>Câu {current+1}/{sentences.length}</span>
          <span style={{ fontSize:"0.62rem", color:"#059669", fontWeight:700 }}>✓ {results.filter(r=>r.grade.every(g=>g.status==="ok")).length} hoàn hảo</span>
        </div>
      </div>

      {/* ── Play card ───────────────────────────────────────── */}
      <div style={{ padding:"0.75rem 1rem 0" }}>
        <div style={{ background:"linear-gradient(135deg,#1B3A6B 0%,#2d4f8a 100%)", borderRadius:20, padding:"1.4rem 1rem 1.2rem", textAlign:"center" }}>

          <div style={{ fontSize:"0.58rem", fontWeight:700, color:"rgba(255,255,255,0.8)", letterSpacing:"0.15em", textTransform:"uppercase", marginBottom:"0.6rem" }}>
            ÉCOUTE &amp; ÉCRIS
          </div>

          <WaveForm playing={playing} />

          <button onClick={() => plays === 0 ? playNow(slowMode) : playAgain()} disabled={!canPlayMore && plays > 0}
            style={{
              width:72, height:72, borderRadius:"50%",
              background:"rgba(255,255,255,0.2)", backdropFilter:"blur(8px)",
              border:"2.5px solid rgba(255,255,255,0.5)",
              display:"flex", alignItems:"center", justifyContent:"center",
              cursor: (!canPlayMore && plays > 0) ? "not-allowed" : "pointer",
              margin:"0 auto",
              transform: playing ? "scale(0.93)" : "scale(1)",
              transition:"transform 0.15s, background 0.15s",
              opacity: (!canPlayMore && plays > 0) ? 0.5 : 1,
            }}>
            <span style={{ fontSize:"2rem" }}>{playing ? "🔊" : "♪"}</span>
          </button>

          <div style={{ marginTop:"0.65rem", fontSize:"0.72rem", color:"rgba(255,255,255,0.85)" }}>
            {playing ? "Đang phát…"
              : plays === 0 ? "Tap để nghe"
              : remaining > 0 ? `Còn ${remaining} lần nghe`
              : "Đã hết lượt nghe"}
          </div>

          {plays > 0 && (
            <div style={{ display:"flex", justifyContent:"center", gap:"0.5rem", marginTop:"0.75rem" }}>
              <button onClick={playAgain} disabled={!canPlayMore}
                style={{ padding:"0.25rem 0.75rem", background:"rgba(255,255,255,0.2)", border:"1px solid rgba(255,255,255,0.35)", borderRadius:20, color:"#fff", fontSize:"0.68rem", cursor: canPlayMore ? "pointer" : "not-allowed", opacity: canPlayMore ? 1 : 0.45, fontWeight:600 }}>
                ↻ Lặp lại
              </button>
              <button onClick={() => setSlowMode(s => !s)}
                style={{ padding:"0.25rem 0.75rem", background: slowMode ? "rgba(255,255,255,0.85)" : "rgba(255,255,255,0.2)", border:"1px solid rgba(255,255,255,0.35)", borderRadius:20, color: slowMode ? C.blue : "#fff", fontSize:"0.68rem", cursor:"pointer", fontWeight:600, transition:"all 0.2s" }}>
                ½× Chậm {slowMode ? "✓" : ""}
              </button>
            </div>
          )}
        </div>
      </div>

      {/* ── Input section ───────────────────────────────────── */}
      <div style={{ padding:"0.75rem 1rem 0" }}>
        <div style={{ fontSize:"0.58rem", fontWeight:700, color:C.gray, letterSpacing:"0.12em", textTransform:"uppercase", marginBottom:6 }}>Nghe và gõ lại</div>
        <div style={{ background:C.white, borderRadius:16, border:`1.5px solid ${checked ? C.border : C.blue}44`, boxShadow: checked ? "none" : `0 0 0 3px ${C.blue}11`, overflow:"hidden" }}>
          <textarea
            ref={inputRef}
            value={input}
            onChange={e => setInput(e.target.value)}
            disabled={checked}
            onKeyDown={e => { if (e.key==="Enter" && !e.shiftKey) { e.preventDefault(); checked ? next() : check(); } }}
            placeholder="Gõ câu tiếng Pháp bạn vừa nghe…"
            rows={2}
            style={{ width:"100%", border:"none", outline:"none", padding:"0.75rem 1rem 0.5rem", fontSize:"0.95rem", fontFamily:"Georgia,serif", color:C.ink, resize:"none", background:"transparent", lineHeight:1.7 }}
          />
          {!checked && (
            <div style={{ padding:"0 0.75rem 0.75rem", display:"flex", flexWrap:"wrap", gap:"0.3rem" }}>
              {ACCENT_KEYS.map(ch => (
                <button key={ch} onMouseDown={e => { e.preventDefault(); insertAccent(ch); }}
                  style={{ padding:"0.2rem 0.45rem", background:C.blueL, border:`1px solid ${C.blue}33`, borderRadius:8, fontSize:"0.82rem", color:C.blue, cursor:"pointer", fontFamily:"Georgia,serif", fontWeight:600, lineHeight:1 }}>
                  {ch}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* ── Grammar hint (auto mode only) ───────────────────── */}
      {grammarHints.length > 0 && !checked && (
        <div style={{ padding:"0.5rem 1rem 0" }}>
          <div style={{ background:C.blueL, borderRadius:12, padding:"0.6rem 0.85rem", border:`1px solid ${C.blue}22` }}>
            <div style={{ fontSize:"0.55rem", fontWeight:700, color:C.blue, letterSpacing:"0.12em", textTransform:"uppercase", marginBottom:4 }}>Hint ngữ pháp</div>
            {grammarHints.map((g, i) => (
              <div key={i} style={{ fontSize:"0.7rem", color:C.ink, lineHeight:1.6 }}>• {g.topic}</div>
            ))}
          </div>
        </div>
      )}

      {/* ── Result ──────────────────────────────────────────── */}
      {checked && (
        <div style={{ padding:"0.6rem 1rem 0", animation:"fadeUp 0.25s ease" }}>
          <div style={{ background:C.white, borderRadius:16, padding:"0.85rem 1rem", border:`1.5px solid ${C.border}` }}>
            <div style={{ fontSize:"0.58rem", textTransform:"uppercase", letterSpacing:"0.12em", color:C.gray, fontWeight:700, marginBottom:6 }}>Kết quả</div>
            <WordDiff result={gradeWords(input, sentence)} />
            <div style={{ marginTop:"0.5rem", padding:"0.5rem 0.7rem", background:C.blueL, borderRadius:10, borderLeft:`3px solid ${C.blue}` }}>
              <div style={{ fontSize:"0.6rem", color:C.blue, fontWeight:700, marginBottom:2 }}>Câu đúng</div>
              <div style={{ fontFamily:"Georgia,serif", fontSize:"0.85rem", color:C.ink, fontStyle:"italic" }}>{sentence}</div>
            </div>
          </div>
        </div>
      )}

      {/* ── Action button ───────────────────────────────────── */}
      <div style={{ padding:"0.75rem 1rem 0" }}>
        {!checked ? (
          <button onClick={check} disabled={!input.trim()}
            style={{ width:"100%", padding:"0.85rem", background: input.trim() ? C.accent : C.border, color:"#fff", border:"none", borderRadius:14, fontSize:"0.95rem", fontFamily:"'Playfair Display',Georgia,serif", cursor: input.trim() ? "pointer" : "default", fontWeight:700, transition:"background 0.15s" }}>
            Kiểm tra ✓
          </button>
        ) : (
          <button onClick={next}
            style={{ width:"100%", padding:"0.85rem", background:C.accent, color:"#fff", border:"none", borderRadius:14, fontSize:"0.95rem", fontFamily:"'Playfair Display',Georgia,serif", cursor:"pointer", fontWeight:700 }}>
            {current+1 >= sentences.length ? "Xem kết quả →" : "Câu tiếp →"}
          </button>
        )}
      </div>
    </div>
  );
}
