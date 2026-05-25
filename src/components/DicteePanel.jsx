import { useState, useRef, useEffect } from "react";
import { C } from "../constants.js";
import { callAIText } from "../utils/api.js";
import { speak } from "../utils/helpers.js";
import { logMistake } from "../utils/storage.js";
import { EDITO_GRAMMAR } from "../data/editoGrammar.js";
import Spinner from "./ui/Spinner.jsx";
import { Confetti } from "./ui/Minou.jsx";

const PURPLE   = "#7C3AED";
const PURPLE_L = "#F5F0FF";
const NUM_SENTENCES = 5;
const MAX_PLAYS     = 3;

const ACCENT_KEYS = ["à","â","ä","ç","é","è","ê","ë","î","ï","ô","ù","û","ü","œ","æ"];

// ── Slow speak via Web Speech API ───────────────────────────────
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

// ── Script parser ───────────────────────────────────────────────
function parseScript(text) {
  return text
    .split(/(?<=[.!?»])\s+|(?<=[.!?»])$|\n+/)
    .map(s => s.replace(/^[«"'\-–—\s]+|[«»"'\s]+$/g, "").trim())
    .filter(s => s.length > 3 && /[a-zA-ZÀ-ÿ]/.test(s));
}

// ── Text comparison ─────────────────────────────────────────────
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

// ── Word diff display ───────────────────────────────────────────
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

// ── Waveform bars ───────────────────────────────────────────────
const WAVE_BARS = [
  { h: 18, d: "0.4s", delay: "0s"    },
  { h: 30, d: "0.5s", delay: "0.1s"  },
  { h: 42, d: "0.35s",delay: "0.05s" },
  { h: 28, d: "0.55s",delay: "0.15s" },
  { h: 36, d: "0.45s",delay: "0.08s" },
  { h: 22, d: "0.5s", delay: "0.2s"  },
  { h: 38, d: "0.4s", delay: "0.12s" },
];

function WaveForm({ playing }) {
  return (
    <div className={`listening-wave${playing ? " playing" : ""}`}
      style={{ display:"flex", alignItems:"flex-end", gap:4, height:48, marginBottom:"0.75rem", justifyContent:"center" }}>
      {WAVE_BARS.map((b, i) => (
        <div key={i}
          style={{
            width: 4, borderRadius: 99,
            background: "rgba(255,255,255,0.7)",
            height: playing ? b.h : 4,
            "--d": b.d, "--delay": b.delay,
            transition: playing ? "none" : "height 0.4s ease",
          }}
        />
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

// ══════════════════════════════════════════════════════════════════
export default function DicteePanel({ words: propWords = [], unitId = null }) {
  const words = propWords.length >= 4 ? propWords : [
    {fr:"famille"},{fr:"maison"},{fr:"école"},{fr:"ami"},{fr:"livre"},
    {fr:"manger"},{fr:"aller"},{fr:"beau"},{fr:"jour"},{fr:"ville"},
  ];

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
    setPhase("loading"); setErr("");
    try {
      const grammarId   = unitId ? "g" + unitId.replace("u", "") : null;
      const grammarUnit = grammarId ? EDITO_GRAMMAR.find(u => u.id === grammarId) : null;
      const grammarPoints = grammarUnit?.points || [];
      const s = await generateSentences(words, grammarPoints);
      if (s.length < 2) throw new Error("Không đủ câu, thử lại nhé.");
      startQuiz(s, grammarPoints.slice(0, 3));
    } catch(e) { setErr(e.message); setPhase("idle"); }
  };

  const restart = () => {
    if (mode === "script") startQuiz(parseScript(scriptText), []);
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

  // ── Score calc ─────────────────────────────────────────────────
  const totalWords  = results.reduce((a, r) => a + r.grade.length, 0);
  const okWords     = results.reduce((a, r) => a + r.grade.filter(g => g.status==="ok").length, 0);
  const accentWords = results.reduce((a, r) => a + r.grade.filter(g => g.status==="accent").length, 0);
  const pct = totalWords > 0 ? Math.round(okWords / totalWords * 100) : 0;

  // ════════════════════════════════════════════════════════════════
  // IDLE
  // ════════════════════════════════════════════════════════════════
  if (phase === "idle") return (
    <div style={{ padding:"1rem", animation:"fadeUp 0.3s ease", display:"flex", flexDirection:"column", gap:"0.7rem" }}>

      {/* Hero */}
      <div style={{ background:`linear-gradient(135deg, ${PURPLE}, #9F67FF)`, borderRadius:20, padding:"1.4rem 1.2rem", textAlign:"center", color:"#fff", boxShadow:`0 8px 28px ${PURPLE}44` }}>
        <div style={{ fontSize:"2rem", marginBottom:"0.3rem" }}>🎧</div>
        <div style={{ fontFamily:"'Playfair Display',Georgia,serif", fontSize:"1.15rem", fontWeight:700, marginBottom:"0.25rem" }}>Nghe &amp; Chép</div>
        <div style={{ fontSize:"0.72rem", opacity:0.85 }}>Écoute · Écris · Vérifie</div>
        <div style={{ display:"flex", justifyContent:"center", gap:"0.75rem", marginTop:"0.75rem", fontSize:"0.7rem" }}>
          <span style={{ background:"rgba(255,255,255,0.2)", borderRadius:20, padding:"0.15rem 0.55rem" }}>✅ đúng</span>
          <span style={{ background:"rgba(255,255,255,0.2)", borderRadius:20, padding:"0.15rem 0.55rem" }}>~accent</span>
          <span style={{ background:"rgba(255,255,255,0.2)", borderRadius:20, padding:"0.15rem 0.55rem" }}>❌ sai</span>
        </div>
      </div>

      {/* Mode tabs */}
      <div style={{ display:"flex", background:C.white, borderRadius:14, border:`1.5px solid ${C.border}`, overflow:"hidden" }}>
        {[["auto","🤖 AI tạo câu"],["script","📝 Script của tôi"]].map(([m, label]) => (
          <button key={m} onClick={() => { setMode(m); setErr(""); }}
            style={{ flex:1, padding:"0.65rem", border:"none", background: mode===m ? `linear-gradient(135deg,${PURPLE},#9F67FF)` : "transparent", color: mode===m ? "#fff" : C.gray, fontSize:"0.8rem", cursor:"pointer", fontWeight:600, transition:"all 0.2s" }}>
            {label}
          </button>
        ))}
      </div>

      {/* Mode content */}
      {mode === "auto" ? (
        <div style={{ background:PURPLE_L, borderRadius:14, padding:"0.9rem 1rem", border:`1.5px solid ${PURPLE}22`, fontSize:"0.8rem", color:C.ink, lineHeight:1.7 }}>
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
            <div style={{ marginTop:"0.3rem", fontSize:"0.68rem", color:PURPLE, fontWeight:600 }}>
              → {parseScript(scriptText).length} câu được nhận diện
            </div>
          )}
        </div>
      )}

      {err && (
        <div style={{ color:"#DC2626", fontSize:"0.78rem", textAlign:"center" }}>⚠ {err}</div>
      )}

      <button onClick={start}
        style={{ padding:"0.8rem", background:`linear-gradient(135deg,${PURPLE},#9F67FF)`, color:"#fff", border:"none", borderRadius:14, fontFamily:"'Playfair Display',Georgia,serif", fontSize:"0.95rem", cursor:"pointer", fontWeight:700, boxShadow:`0 6px 20px ${PURPLE}44` }}>
        Bắt đầu →
      </button>
    </div>
  );

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

      <div style={{ textAlign:"center", marginBottom:"1.25rem" }}>
        <div style={{ width:72, height:72, borderRadius:"50%", background:PURPLE_L, display:"flex", alignItems:"center", justifyContent:"center", fontSize:"2.5rem", margin:"0 auto 0.75rem" }}>
          {pct>=80?"🎉":pct>=50?"👍":"💪"}
        </div>
        <div style={{ fontFamily:"'Playfair Display',Georgia,serif", fontSize:"1.6rem", color:C.ink, fontWeight:700 }}>{okWords}/{totalWords}</div>
        <div style={{ fontSize:"0.82rem", color:PURPLE, fontWeight:600, marginTop:2 }}>
          {pct}% · {accentWords > 0 ? `${accentWords} lỗi accent · ` : ""}{pct>=80?"Parfait!":pct>=50?"Bien!":"Continue!"}
        </div>
      </div>

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
        <button onClick={restart}
          style={{ flex:1, padding:"0.8rem", background:PURPLE, color:"#fff", border:"none", borderRadius:14, fontFamily:"'Playfair Display',Georgia,serif", fontSize:"0.92rem", cursor:"pointer", fontWeight:700 }}>
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

      {/* ── Progress ─────────────────────────────────────────── */}
      <div style={{ padding:"0.75rem 1rem 0" }}>
        <div style={{ display:"flex", gap:3, marginBottom:4 }}>
          {sentences.map((_, i) => (
            <div key={i} style={{ flex:1, height:3, borderRadius:99, background: i<current ? PURPLE : i===current ? `${PURPLE}88` : C.border, transition:"background 0.3s" }}/>
          ))}
        </div>
        <div style={{ display:"flex", justifyContent:"space-between" }}>
          <span style={{ fontSize:"0.62rem", color:C.gray }}>Câu {current+1}/{sentences.length}</span>
          <span style={{ fontSize:"0.62rem", color:"#059669", fontWeight:700 }}>✓ {results.filter(r=>r.grade.every(g=>g.status==="ok")).length} hoàn hảo</span>
        </div>
      </div>

      {/* ── Play card ─────────────────────────────────────────── */}
      <div style={{ padding:"0.75rem 1rem 0" }}>
        <div style={{ background:`linear-gradient(135deg, ${PURPLE}, #9F67FF)`, borderRadius:20, padding:"1.4rem 1rem 1.2rem", textAlign:"center", boxShadow:`0 8px 28px ${PURPLE}44` }}>

          {/* Label */}
          <div style={{ fontSize:"0.58rem", fontWeight:700, color:"rgba(255,255,255,0.8)", letterSpacing:"0.15em", textTransform:"uppercase", marginBottom:"0.6rem" }}>
            ÉCOUTE &amp; ÉCRIS
          </div>

          {/* Waveform */}
          <WaveForm playing={playing} />

          {/* Play circle */}
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

          {/* Status text */}
          <div style={{ marginTop:"0.65rem", fontSize:"0.72rem", color:"rgba(255,255,255,0.85)" }}>
            {playing ? "Đang phát…"
              : plays === 0 ? "Tap để nghe"
              : remaining > 0 ? `Còn ${remaining} lần nghe`
              : "Đã hết lượt nghe"}
          </div>

          {/* Controls row */}
          {plays > 0 && (
            <div style={{ display:"flex", justifyContent:"center", gap:"0.5rem", marginTop:"0.75rem" }}>
              <button onClick={playAgain} disabled={!canPlayMore}
                style={{ padding:"0.25rem 0.75rem", background:"rgba(255,255,255,0.2)", border:"1px solid rgba(255,255,255,0.35)", borderRadius:20, color:"#fff", fontSize:"0.68rem", cursor: canPlayMore ? "pointer" : "not-allowed", opacity: canPlayMore ? 1 : 0.45, fontWeight:600 }}>
                ↻ Lặp lại
              </button>
              <button onClick={() => { setSlowMode(s => !s); }}
                style={{ padding:"0.25rem 0.75rem", background: slowMode ? "rgba(255,255,255,0.85)" : "rgba(255,255,255,0.2)", border:"1px solid rgba(255,255,255,0.35)", borderRadius:20, color: slowMode ? PURPLE : "#fff", fontSize:"0.68rem", cursor:"pointer", fontWeight:600, transition:"all 0.2s" }}>
                ½× Chậm {slowMode ? "✓" : ""}
              </button>
            </div>
          )}
        </div>
      </div>

      {/* ── Input section ──────────────────────────────────────── */}
      <div style={{ padding:"0.75rem 1rem 0" }}>
        <div style={{ fontSize:"0.58rem", fontWeight:700, color:C.gray, letterSpacing:"0.12em", textTransform:"uppercase", marginBottom:6 }}>Nghe và gõ lại</div>
        <div style={{ background:C.white, borderRadius:16, border:`1.5px solid ${checked ? C.border : PURPLE}44`, boxShadow: checked ? "none" : `0 0 0 3px ${PURPLE}11`, overflow:"hidden" }}>
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

          {/* Accent keyboard */}
          {!checked && (
            <div style={{ padding:"0 0.75rem 0.75rem", display:"flex", flexWrap:"wrap", gap:"0.3rem" }}>
              {ACCENT_KEYS.map(ch => (
                <button key={ch} onMouseDown={e => { e.preventDefault(); insertAccent(ch); }}
                  style={{ padding:"0.2rem 0.45rem", background:PURPLE_L, border:`1px solid ${PURPLE}33`, borderRadius:8, fontSize:"0.82rem", color:PURPLE, cursor:"pointer", fontFamily:"Georgia,serif", fontWeight:600, lineHeight:1 }}>
                  {ch}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* ── Grammar hint ──────────────────────────────────────── */}
      {grammarHints.length > 0 && !checked && (
        <div style={{ padding:"0.5rem 1rem 0" }}>
          <div style={{ background:PURPLE_L, borderRadius:12, padding:"0.6rem 0.85rem", border:`1px solid ${PURPLE}22` }}>
            <div style={{ fontSize:"0.55rem", fontWeight:700, color:PURPLE, letterSpacing:"0.12em", textTransform:"uppercase", marginBottom:4 }}>Hint ngữ pháp</div>
            {grammarHints.map((g, i) => (
              <div key={i} style={{ fontSize:"0.7rem", color:C.ink, lineHeight:1.6 }}>• {g.topic}</div>
            ))}
          </div>
        </div>
      )}

      {/* ── Result ────────────────────────────────────────────── */}
      {checked && (
        <div style={{ padding:"0.6rem 1rem 0", animation:"fadeUp 0.25s ease" }}>
          <div style={{ background:C.white, borderRadius:16, padding:"0.85rem 1rem", border:`1.5px solid ${C.border}` }}>
            <div style={{ fontSize:"0.58rem", textTransform:"uppercase", letterSpacing:"0.12em", color:C.gray, fontWeight:700, marginBottom:6 }}>Kết quả</div>
            <WordDiff result={gradeWords(input, sentence)} />
            <div style={{ marginTop:"0.5rem", padding:"0.5rem 0.7rem", background:"#F8F9FF", borderRadius:10, borderLeft:`3px solid ${PURPLE}` }}>
              <div style={{ fontSize:"0.6rem", color:PURPLE, fontWeight:700, marginBottom:2 }}>Câu đúng</div>
              <div style={{ fontFamily:"Georgia,serif", fontSize:"0.85rem", color:C.ink, fontStyle:"italic" }}>{sentence}</div>
            </div>
          </div>
        </div>
      )}

      {/* ── Action button ─────────────────────────────────────── */}
      <div style={{ padding:"0.75rem 1rem 0" }}>
        {!checked ? (
          <button onClick={check} disabled={!input.trim()}
            style={{ width:"100%", padding:"0.85rem", background: input.trim() ? PURPLE : C.border, color:"#fff", border:"none", borderRadius:14, fontSize:"0.95rem", fontFamily:"'Playfair Display',Georgia,serif", cursor: input.trim() ? "pointer" : "default", fontWeight:700, transition:"background 0.15s" }}>
            Kiểm tra ✓
          </button>
        ) : (
          <button onClick={next}
            style={{ width:"100%", padding:"0.85rem", background:PURPLE, color:"#fff", border:"none", borderRadius:14, fontSize:"0.95rem", fontFamily:"'Playfair Display',Georgia,serif", cursor:"pointer", fontWeight:700 }}>
            {current+1 >= sentences.length ? "Xem kết quả →" : "Câu tiếp →"}
          </button>
        )}
      </div>
    </div>
  );
}
