import { useState, useEffect } from "react";
import { C } from "../constants.js";
import { callAI } from "../utils/api.js";
import SpeakBtn from "./ui/SpeakBtn.jsx";
import Spinner from "./ui/Spinner.jsx";
import { logError } from "./WeakSpotsPanel.jsx";
import AnalysePanel from "./AnalysePanel.jsx";
import { EDITO_A1_UNITS } from "../data/editoA1Units.js";

const PURPLE   = "#7C3AED";
const PURPLE_L = "#F5F0FF";

const UNIT_COLORS = [
  { color:"#2980B9", bg:"#E8F4FD" }, { color:"#8E44AD", bg:"#F5EEFF" },
  { color:"#16A085", bg:"#E6FAF5" }, { color:"#E67E22", bg:"#FEF3E2" },
  { color:"#C0392B", bg:"#FDEDEC" }, { color:"#D35400", bg:"#FDEBD0" },
  { color:"#27AE60", bg:"#EAFAF1" }, { color:"#2471A3", bg:"#EAF4FB" },
  { color:"#6C3483", bg:"#F5EEF8" }, { color:"#0E6655", bg:"#E8F8F5" },
  { color:"#784212", bg:"#FEF9E7" },
];

// ── Grade helpers ───────────────────────────────────────────────
function scoreToGrade(s) {
  if (s >= 95) return { letter:"A+", color:"#059669" };
  if (s >= 87) return { letter:"A",  color:"#059669" };
  if (s >= 78) return { letter:"B+", color:PURPLE     };
  if (s >= 68) return { letter:"B",  color:"#2563EB" };
  if (s >= 55) return { letter:"C",  color:"#D97706" };
  return              { letter:"D",  color:"#DC2626" };
}

const ERROR_TYPE_STYLE = {
  "Ngữ pháp":  { color:"#DC2626", bg:"#FEF2F2", border:"#FCA5A5" },
  "Từ vựng":   { color:"#D97706", bg:"#FFFBEB", border:"#FCD34D" },
  "Chính tả":  { color:"#2563EB", bg:"#EFF6FF", border:"#93C5FD" },
  "Giới từ":   { color:PURPLE,    bg:PURPLE_L,  border:`${PURPLE}55` },
  "Mạo từ":    { color:"#059669", bg:"#F0FDF4", border:"#6EE7B7" },
};
const DEFAULT_ERR_STYLE = { color:"#DC2626", bg:"#FEF2F2", border:"#FCA5A5" };

// ── Shared result block ─────────────────────────────────────────
function ResultBlock({ result, onRedo, redoLabel = "✏️ Viết lại" }) {
  const grade = scoreToGrade(result.score);

  // Group errors by type
  const grammarErrors = result.errors?.filter(e => ["Ngữ pháp","Giới từ","Mạo từ"].includes(e.type)) || [];
  const vocabErrors   = result.errors?.filter(e => ["Từ vựng","Chính tả"].includes(e.type)) || [];
  const otherErrors   = result.errors?.filter(e => !["Ngữ pháp","Giới từ","Mạo từ","Từ vựng","Chính tả"].includes(e.type)) || [];

  return (
    <div style={{ display:"flex", flexDirection:"column", gap:"0.65rem", animation:"fadeUp 0.3s ease" }}>

      {/* ── Score hero ── */}
      <div style={{ background:`linear-gradient(135deg, ${grade.color}11, ${grade.color}06)`, border:`1.5px solid ${grade.color}33`, borderRadius:18, padding:"1rem 1.2rem", display:"flex", alignItems:"center", gap:"1rem" }}>
        {/* Grade circle */}
        <div style={{ width:68, height:68, borderRadius:"50%", background:`${grade.color}18`, border:`2.5px solid ${grade.color}55`, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
          <div style={{ fontFamily:"'Playfair Display',Georgia,serif", fontSize:"1.6rem", color:grade.color, fontWeight:800, lineHeight:1 }}>{grade.letter}</div>
          <div style={{ fontSize:"0.58rem", color:grade.color, opacity:0.7 }}>{result.score}/100</div>
        </div>
        <div style={{ flex:1 }}>
          <div style={{ fontFamily:"'Playfair Display',Georgia,serif", fontSize:"1rem", color:grade.color, fontWeight:700, marginBottom:"0.2rem" }}>{result.verdict}</div>
          {result.tip && <div style={{ fontSize:"0.74rem", color:C.gray, lineHeight:1.5 }}>{result.tip}</div>}
          {/* Mini score breakdown */}
          {(grammarErrors.length > 0 || vocabErrors.length > 0) && (
            <div style={{ display:"flex", gap:"0.5rem", marginTop:"0.4rem" }}>
              {grammarErrors.length > 0 && (
                <span style={{ fontSize:"0.62rem", background:"#FEF2F2", color:"#DC2626", border:"1px solid #FCA5A5", borderRadius:20, padding:"0.1rem 0.45rem", fontWeight:700 }}>
                  Ngữ pháp ×{grammarErrors.length}
                </span>
              )}
              {vocabErrors.length > 0 && (
                <span style={{ fontSize:"0.62rem", background:"#FFFBEB", color:"#D97706", border:"1px solid #FCD34D", borderRadius:20, padding:"0.1rem 0.45rem", fontWeight:700 }}>
                  Từ vựng ×{vocabErrors.length}
                </span>
              )}
            </div>
          )}
        </div>
      </div>

      {/* ── Corrected ── */}
      {result.is_perfect ? (
        <div style={{ background:"#F0FDF4", border:"1.5px solid #6EE7B7", borderRadius:14, padding:"0.85rem", textAlign:"center" }}>
          <div style={{ fontSize:"1.3rem", marginBottom:"0.25rem" }}>🎉</div>
          <div style={{ fontFamily:"Georgia,serif", color:"#059669", fontWeight:600 }}>Hoàn hảo! Không có lỗi nào.</div>
        </div>
      ) : result.corrected && (
        <div style={{ background:C.white, border:"1.5px solid #6EE7B7", borderRadius:14, padding:"0.85rem 1rem" }}>
          <div style={{ fontSize:"0.58rem", textTransform:"uppercase", letterSpacing:"0.12em", color:"#059669", fontWeight:700, marginBottom:6 }}>✓ Bản sửa</div>
          <div style={{ fontFamily:"Georgia,serif", fontSize:"0.92rem", color:C.ink, lineHeight:1.65, display:"flex", alignItems:"flex-start", gap:"0.5rem", flexWrap:"wrap" }}>
            {result.corrected}
            <SpeakBtn text={result.corrected} />
          </div>
          {result.translation && (
            <div style={{ fontSize:"0.72rem", color:C.gray, fontStyle:"italic", marginTop:5, paddingTop:5, borderTop:`1px solid ${C.border}` }}>→ {result.translation}</div>
          )}
        </div>
      )}

      {/* ── Errors ── */}
      {result.errors?.length > 0 && (
        <div style={{ background:C.white, border:`1.5px solid ${C.border}`, borderRadius:14, padding:"0.85rem 1rem" }}>
          <div style={{ fontSize:"0.58rem", textTransform:"uppercase", letterSpacing:"0.12em", color:"#DC2626", fontWeight:700, marginBottom:10 }}>
            Lỗi cần sửa ({result.errors.length})
          </div>
          {[...grammarErrors, ...vocabErrors, ...otherErrors].map((e, i) => {
            const st = ERROR_TYPE_STYLE[e.type] || DEFAULT_ERR_STYLE;
            return (
              <div key={i} style={{ borderLeft:`3px solid ${st.border}`, paddingLeft:"0.75rem", marginBottom:"0.75rem", paddingBottom: i < result.errors.length - 1 ? "0.75rem" : 0, borderBottom: i < result.errors.length - 1 ? `1px solid ${C.border}` : "none" }}>
                <div style={{ display:"flex", gap:"0.45rem", alignItems:"center", marginBottom:"0.3rem", flexWrap:"wrap" }}>
                  <span style={{ fontFamily:"Georgia,serif", fontSize:"0.88rem", color:"#DC2626", textDecoration:"line-through" }}>{e.original}</span>
                  <span style={{ color:C.gray, fontSize:"0.8rem" }}>→</span>
                  <span style={{ fontFamily:"Georgia,serif", fontSize:"0.88rem", color:"#059669", fontWeight:700 }}>{e.correction}</span>
                  <span style={{ background:st.bg, color:st.color, border:`1px solid ${st.border}`, fontSize:"0.58rem", padding:"0.1rem 0.45rem", borderRadius:20, fontWeight:700 }}>
                    {e.type}
                  </span>
                </div>
                <div style={{ fontSize:"0.74rem", color:C.gray, lineHeight:1.5 }}>💡 {e.explanation}</div>
              </div>
            );
          })}
        </div>
      )}

      <button onClick={onRedo}
        style={{ padding:"0.55rem", background:"transparent", border:`1.5px solid ${C.border}`, borderRadius:12, color:C.gray, fontSize:"0.78rem", cursor:"pointer" }}>
        {redoLabel}
      </button>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════
export default function WritingPanel({ onBackToParcours }) {
  const [tab,        setTab]        = useState("write");
  const [input,      setInput]      = useState("");
  const [result,     setResult]     = useState(null);
  const [loading,    setLoading]    = useState(false);
  const [err,        setErr]        = useState("");
  const [history,    setHistory]    = useState(() => {
    try { return JSON.parse(localStorage.getItem("writing_history") || "[]"); } catch { return []; }
  });
  const [editoUnit,  setEditoUnit]  = useState(0);
  const [editoTask,  setEditoTask]  = useState(null);

  const [fromParcours, setFromParcours] = useState(false);

  useEffect(() => {
    const back = localStorage.getItem("parcours_back");
    if (back) { localStorage.removeItem("parcours_back"); setFromParcours(true); }
    const idx = localStorage.getItem("parcours_writing_idx");
    if (idx !== null) {
      setTab("edito");
      setEditoUnit(Number(idx));
      localStorage.removeItem("parcours_writing_idx");
    }
  }, []);

  const check = async (contextTask) => {
    if (!input.trim()) return;
    setLoading(true); setErr(""); setResult(null);
    const taskContext = contextTask ? `The learner is responding to this writing task: "${contextTask}"\n` : "";
    try {
      const r = await callAI(`You are a French teacher for A1 students. ${taskContext}Evaluate this French text written by a Vietnamese learner.
Text: "${input.trim()}"

Return ONLY JSON:
{
  "score": 0-100,
  "verdict": "Xuất sắc|Tốt|Khá|Cần cải thiện",
  "corrected": "corrected version or same if perfect",
  "is_perfect": true/false,
  "errors": [{"original":"wrong part","correction":"correct part","type":"Ngữ pháp|Từ vựng|Chính tả|Giới từ|Mạo từ","explanation":"explanation in Vietnamese"}],
  "tip": "one encouraging tip in Vietnamese",
  "translation": "Vietnamese translation of the corrected text"
}`);
      const entry = { sentence: input.trim(), result: r, date: new Date().toLocaleDateString("vi-VN") };
      const newHistory = [entry, ...history].slice(0, 30);
      setHistory(newHistory);
      localStorage.setItem("writing_history", JSON.stringify(newHistory));
      setResult(r);
      r.errors?.forEach(e => { if (e.type) logError(e.type); });
    } catch(e) { setErr(e.message); }
    setLoading(false);
  };

  // ── Tab bar ─────────────────────────────────────────────────
  const TAB_BAR = (
    <div style={{ display:"flex", gap:"0.35rem", marginBottom:"0.05rem" }}>
      {[
        { id:"write",   label:"✍️ Tự do" },
        { id:"edito",   label:"📘 Edito"  },
        { id:"analyse", label:"🔍 Phân tích" },
      ].map(t => (
        <button key={t.id} onClick={() => { setTab(t.id); setResult(null); setInput(""); setEditoTask(null); }}
          style={{ flex:1, padding:"0.5rem 0.3rem", border:`1.5px solid ${tab===t.id ? PURPLE : C.border}`, borderRadius:10, background: tab===t.id ? PURPLE : C.white, color: tab===t.id ? "#fff" : C.ink, fontSize:"0.75rem", cursor:"pointer", fontWeight: tab===t.id ? 700 : 400, fontFamily:"inherit", transition:"all 0.15s" }}>
          {t.label}
        </button>
      ))}
    </div>
  );

  // ── Analyse tab ────────────────────────────────────────────
  if (tab === "analyse") return (
    <div>
      <div style={{ padding:"1rem 1rem 0" }}>{TAB_BAR}</div>
      <AnalysePanel />
    </div>
  );

  // ── Edito tab ──────────────────────────────────────────────
  if (tab === "edito") {
    const unit = EDITO_A1_UNITS[editoUnit];
    const uc   = UNIT_COLORS[editoUnit] || UNIT_COLORS[0];
    return (
      <div style={{ padding:"1rem", display:"flex", flexDirection:"column", gap:"0.8rem" }}>
        {fromParcours && onBackToParcours && (
          <button onClick={onBackToParcours} style={{ background:"transparent", border:"none", color:C.blue, fontSize:"0.82rem", fontWeight:600, cursor:"pointer", padding:0, display:"flex", alignItems:"center", gap:4, fontFamily:"inherit" }}>
            ← Parcours
          </button>
        )}
        {TAB_BAR}

        {!editoTask ? (
          <>
            {/* Unit chips */}
            <div style={{ overflowX:"auto", display:"flex", gap:6, paddingBottom:2, scrollbarWidth:"none" }}>
              {EDITO_A1_UNITS.map((u, i) => {
                const ucc = UNIT_COLORS[i] || UNIT_COLORS[0];
                const active = editoUnit === i;
                return (
                  <button key={u.id} onClick={() => setEditoUnit(i)}
                    style={{ flexShrink:0, padding:"5px 11px", borderRadius:999, fontSize:11, fontWeight: active ? 700 : 500, cursor:"pointer", fontFamily:"inherit", whiteSpace:"nowrap", transition:"all 0.15s", background: active ? ucc.color : C.white, color: active ? "#fff" : C.ink, border:`1.5px solid ${active ? ucc.color : C.border}` }}>
                    U{u.unit} · {u.title}
                  </button>
                );
              })}
            </div>

            <div style={{ fontSize:"0.65rem", fontWeight:700, color:uc.color, textTransform:"uppercase", letterSpacing:"0.1em" }}>
              Unité {unit.unit} — {unit.title}
            </div>

            {unit.writingPractice.map((p, i) => (
              <button key={i} onClick={() => { setEditoTask(p); setInput(""); setResult(null); }}
                style={{ background:uc.bg, border:`1.5px solid ${uc.color}44`, borderRadius:14, padding:"0.85rem 1rem", textAlign:"left", cursor:"pointer", fontFamily:"inherit" }}>
                <div style={{ fontFamily:"'Playfair Display',Georgia,serif", fontSize:"0.9rem", color:C.ink, fontWeight:700, marginBottom:"0.25rem" }}>{p.title}</div>
                <div style={{ fontSize:"0.73rem", color:C.gray, lineHeight:1.55 }}>{p.task}</div>
              </button>
            ))}
          </>
        ) : (
          <>
            {/* Task context */}
            <div style={{ background:uc.bg, border:`1.5px solid ${uc.color}44`, borderRadius:12, padding:"0.85rem 1rem" }}>
              <div style={{ fontSize:"0.6rem", fontWeight:700, color:uc.color, textTransform:"uppercase", letterSpacing:"0.1em", marginBottom:4 }}>Đề bài · {editoTask.title}</div>
              <div style={{ fontSize:"0.83rem", color:C.ink, lineHeight:1.6, fontFamily:"Georgia,serif" }}>{editoTask.task}</div>
            </div>

            {!result && (
              <div style={{ background:C.white, border:`1.5px solid ${C.border}`, borderRadius:12, padding:"0.85rem" }}>
                <textarea value={input} onChange={e => setInput(e.target.value)}
                  placeholder="Écrivez votre réponse en français…"
                  rows={4}
                  style={{ width:"100%", border:`1.5px solid ${C.border}`, borderRadius:8, padding:"0.55rem 0.7rem", fontFamily:"Georgia,serif", fontSize:"0.92rem", lineHeight:1.6, outline:"none", resize:"vertical", boxSizing:"border-box", color:C.ink }} />
                {err && (
                  <div style={{ display:"flex", alignItems:"center", gap:"0.5rem", marginTop:"0.4rem" }}>
                    <div style={{ fontSize:"0.72rem", color:"#DC2626" }}>⚠ {err}</div>
                    <button onClick={() => check(editoTask.task)} style={{ padding:"0.2rem 0.6rem", background:"#DC2626", color:"#fff", border:"none", borderRadius:20, fontSize:"0.65rem", cursor:"pointer", fontWeight:600 }}>↺ Thử lại</button>
                  </div>
                )}
                <div style={{ display:"flex", gap:"0.5rem", marginTop:"0.6rem" }}>
                  <button onClick={() => { setEditoTask(null); setResult(null); setInput(""); }}
                    style={{ padding:"0.6rem 0.8rem", background:"transparent", border:`1.5px solid ${C.border}`, color:C.gray, borderRadius:10, fontSize:"0.78rem", cursor:"pointer", fontFamily:"inherit" }}>
                    ← Đổi đề
                  </button>
                  <button onClick={() => check(editoTask.task)} disabled={loading || !input.trim()}
                    style={{ flex:1, padding:"0.65rem", background: input.trim() ? PURPLE : C.border, color:"#fff", border:"none", borderRadius:10, fontFamily:"Georgia,serif", fontSize:"0.88rem", cursor: input.trim() ? "pointer" : "default", fontWeight:700, transition:"background 0.15s" }}>
                    {loading ? "AI đang chấm…" : "Chấm bài ✦"}
                  </button>
                </div>
              </div>
            )}

            {loading && <div style={{ display:"flex", justifyContent:"center", padding:"1rem" }}><Spinner /></div>}

            {result && (
              <ResultBlock
                result={result}
                onRedo={() => { setInput(""); setResult(null); }}
                redoLabel="✏️ Viết lại"
              />
            )}
          </>
        )}
      </div>
    );
  }

  // ════════════════════════════════════════════════════════════════
  // FREE WRITING TAB
  // ════════════════════════════════════════════════════════════════
  return (
    <div style={{ padding:"1rem", display:"flex", flexDirection:"column", gap:"0.8rem" }}>
      {TAB_BAR}

      <div style={{ background:`linear-gradient(135deg, ${PURPLE}11, ${PURPLE}06)`, border:`1.5px solid ${PURPLE}22`, borderRadius:14, padding:"0.85rem 1rem" }}>
        <div style={{ fontSize:"0.65rem", fontWeight:700, color:PURPLE, textTransform:"uppercase", letterSpacing:"0.1em", marginBottom:3 }}>✍️ Viết câu tự do</div>
        <div style={{ fontSize:"0.74rem", color:C.gray, lineHeight:1.6 }}>
          Nhập câu tiếng Pháp — AI chấm điểm, phân loại lỗi và giải thích bằng tiếng Việt.
        </div>
      </div>

      {!result && (
        <div style={{ background:C.white, border:`1.5px solid ${C.border}`, borderRadius:14, padding:"0.85rem" }}>
          <textarea value={input} onChange={e => setInput(e.target.value)}
            placeholder="Nhập câu tiếng Pháp… vd: Je suis une étudiant."
            rows={3}
            style={{ width:"100%", border:`1.5px solid ${C.border}`, borderRadius:8, padding:"0.55rem 0.7rem", fontFamily:"Georgia,serif", fontSize:"0.92rem", lineHeight:1.6, outline:"none", resize:"vertical", boxSizing:"border-box", color:C.ink }} />
          {err && (
            <div style={{ display:"flex", alignItems:"center", gap:"0.5rem", marginTop:"0.4rem" }}>
              <div style={{ fontSize:"0.72rem", color:"#DC2626" }}>⚠ {err}</div>
              <button onClick={() => check()} style={{ padding:"0.2rem 0.6rem", background:"#DC2626", color:"#fff", border:"none", borderRadius:20, fontSize:"0.65rem", cursor:"pointer", fontWeight:600 }}>↺ Thử lại</button>
            </div>
          )}
          <button onClick={() => check()} disabled={loading || !input.trim()}
            style={{ marginTop:"0.6rem", width:"100%", padding:"0.7rem", background: input.trim() ? PURPLE : C.border, color:"#fff", border:"none", borderRadius:12, fontFamily:"'Playfair Display',Georgia,serif", fontSize:"0.92rem", cursor: input.trim() ? "pointer" : "default", fontWeight:700, transition:"background 0.15s" }}>
            {loading ? "AI đang chấm…" : "Chấm bài ✦"}
          </button>
        </div>
      )}

      {loading && <div style={{ display:"flex", justifyContent:"center", padding:"1rem" }}><Spinner /></div>}

      {result && (
        <ResultBlock
          result={result}
          onRedo={() => { setInput(""); setResult(null); }}
          redoLabel="✏️ Viết câu khác"
        />
      )}

      {/* History */}
      {history.length > 0 && !result && !loading && (
        <div>
          <div style={{ fontSize:"0.6rem", textTransform:"uppercase", letterSpacing:"0.12em", color:C.gray, marginBottom:"0.5rem", fontWeight:700 }}>📜 Câu đã viết</div>
          {history.slice(0, 5).map((h, i) => {
            const g = scoreToGrade(h.result.score);
            return (
              <div key={i} onClick={() => { setInput(h.sentence); setResult(h.result); }}
                style={{ background:C.white, border:`1px solid ${C.border}`, borderRadius:10, padding:"0.55rem 0.75rem", marginBottom:"0.35rem", cursor:"pointer", display:"flex", justifyContent:"space-between", alignItems:"center", gap:"0.5rem" }}
                onMouseEnter={e => e.currentTarget.style.background = C.cream}
                onMouseLeave={e => e.currentTarget.style.background = C.white}>
                <div style={{ flex:1, minWidth:0 }}>
                  <div style={{ fontFamily:"Georgia,serif", fontSize:"0.83rem", color:C.ink, whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis" }}>{h.sentence}</div>
                  <div style={{ fontSize:"0.62rem", color:C.gray, marginTop:"0.1rem" }}>{h.date}</div>
                </div>
                <div style={{ fontFamily:"'Playfair Display',Georgia,serif", fontSize:"1.1rem", color:g.color, fontWeight:800, flexShrink:0 }}>{g.letter}</div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
