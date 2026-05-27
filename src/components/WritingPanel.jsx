import { useState, useEffect } from "react";
import { C } from "../constants.js";
import { callAI } from "../utils/api.js";
import SpeakBtn from "./ui/SpeakBtn.jsx";
import Spinner from "./ui/Spinner.jsx";
import { logError } from "./WeakSpotsPanel.jsx";
import AnalysePanel from "./AnalysePanel.jsx";
import { EDITO_A1_UNITS } from "../data/editoA1Units.js";

// ── Grade helpers ───────────────────────────────────────────────
function scoreToGrade(s) {
  if (s >= 95) return { letter:"A+", color:"#059669" };
  if (s >= 87) return { letter:"A",  color:"#059669" };
  if (s >= 78) return { letter:"B+", color:C.blue    };
  if (s >= 68) return { letter:"B",  color:"#2563EB" };
  if (s >= 55) return { letter:"C",  color:"#D97706" };
  return              { letter:"D",  color:"#DC2626" };
}

const ERROR_TYPE_STYLE = {
  "Ngữ pháp":  { color:"#DC2626", bg:"#FEF2F2", border:"#FCA5A5" },
  "Từ vựng":   { color:"#D97706", bg:"#FFFBEB", border:"#FCD34D" },
  "Chính tả":  { color:"#2563EB", bg:"#EFF6FF", border:"#93C5FD" },
  "Giới từ":   { color:C.blue,    bg:C.blueL,   border:`${C.blue}55` },
  "Mạo từ":    { color:"#059669", bg:"#F0FDF4",  border:"#6EE7B7" },
};
const DEFAULT_ERR_STYLE = { color:"#DC2626", bg:"#FEF2F2", border:"#FCA5A5" };

// ── Shared result block ─────────────────────────────────────────
function ResultBlock({ result, onRedo, redoLabel = "✏️ Viết lại" }) {
  const grade = scoreToGrade(result.score);

  const grammarErrors = result.errors?.filter(e => ["Ngữ pháp","Giới từ","Mạo từ"].includes(e.type)) || [];
  const vocabErrors   = result.errors?.filter(e => ["Từ vựng","Chính tả"].includes(e.type))           || [];
  const otherErrors   = result.errors?.filter(e => !["Ngữ pháp","Giới từ","Mạo từ","Từ vựng","Chính tả"].includes(e.type)) || [];

  return (
    <div style={{ display:"flex", flexDirection:"column", gap:"0.65rem", animation:"fadeUp 0.3s ease" }}>

      {/* ── Score hero ── */}
      <div style={{ background:`linear-gradient(135deg, ${grade.color}11, ${grade.color}06)`, border:`1.5px solid ${grade.color}33`, borderRadius:18, padding:"1rem 1.2rem", display:"flex", alignItems:"center", gap:"1rem" }}>
        <div style={{ width:68, height:68, borderRadius:"50%", background:`${grade.color}18`, border:`2.5px solid ${grade.color}55`, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
          <div style={{ fontFamily:"'Playfair Display',Georgia,serif", fontSize:"1.6rem", color:grade.color, fontWeight:800, lineHeight:1 }}>{grade.letter}</div>
          <div style={{ fontSize:"0.58rem", color:grade.color, opacity:0.7 }}>{result.score}/100</div>
        </div>
        <div style={{ flex:1 }}>
          <div style={{ fontFamily:"'Playfair Display',Georgia,serif", fontSize:"1rem", color:grade.color, fontWeight:700, marginBottom:"0.2rem" }}>{result.verdict}</div>
          {result.tip && <div style={{ fontSize:"0.74rem", color:C.gray, lineHeight:1.5 }}>{result.tip}</div>}
          {(grammarErrors.length > 0 || vocabErrors.length > 0) && (
            <div style={{ display:"flex", gap:"0.5rem", marginTop:"0.4rem", flexWrap:"wrap" }}>
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
        style={{ padding:"0.55rem", background:"transparent", border:`1.5px solid ${C.border}`, borderRadius:12, color:C.gray, fontSize:"0.78rem", cursor:"pointer", fontFamily:"inherit" }}>
        {redoLabel}
      </button>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════
export default function WritingPanel({ onBackToParcours }) {
  const [tab,       setTab]       = useState("write");
  const [input,     setInput]     = useState("");
  const [result,    setResult]    = useState(null);
  const [loading,   setLoading]   = useState(false);
  const [err,       setErr]       = useState("");
  const [history,   setHistory]   = useState(() => {
    try { return JSON.parse(localStorage.getItem("writing_history") || "[]"); } catch { return []; }
  });
  const [editoUnit, setEditoUnit] = useState(0);
  const [editoTask, setEditoTask] = useState(null);
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

  const switchTab = (id) => { setTab(id); setResult(null); setInput(""); setEditoTask(null); };

  // ── Shared: dark hero banner ────────────────────────────────
  const heroBanner = (
    <div style={{ background:"linear-gradient(135deg, #1B3A6B 0%, #2d4f8a 100%)", padding:"0.9rem 1rem 0.85rem" }}>
      {fromParcours && onBackToParcours && (
        <button onClick={onBackToParcours} style={{ background:"rgba(255,255,255,0.15)", border:"none", color:"#fff", fontSize:"0.72rem", fontWeight:600, cursor:"pointer", padding:"0.2rem 0.65rem", borderRadius:20, marginBottom:"0.6rem", fontFamily:"inherit" }}>
          ← Parcours
        </button>
      )}
      <div style={{ fontFamily:"'Playfair Display',Georgia,serif", fontSize:"1.15rem", color:"#fff", fontWeight:800, lineHeight:1.1 }}>
        🖋️ L'Écriture
      </div>
      <div style={{ fontSize:"0.7rem", color:"rgba(255,255,255,0.65)", marginTop:4 }}>
        Luyện viết · Chấm bài AI · Phân tích văn bản
      </div>
    </div>
  );

  // ── Shared: tab bar ─────────────────────────────────────────
  const tabBar = (
    <div style={{ display:"flex", gap:"0.35rem", padding:"0.65rem 1rem 0" }}>
      {[
        { id:"write",   label:"✍️ Tự do"      },
        { id:"edito",   label:"📘 Édito"       },
        { id:"analyse", label:"🔍 Phân tích"   },
      ].map(t => (
        <button key={t.id} onClick={() => switchTab(t.id)}
          style={{ flex:1, padding:"0.5rem 0.3rem", border:`1.5px solid ${tab===t.id ? C.blue : C.border}`, borderRadius:10, background: tab===t.id ? C.blue : C.white, color: tab===t.id ? "#fff" : C.ink, fontSize:"0.75rem", cursor:"pointer", fontWeight: tab===t.id ? 700 : 400, fontFamily:"inherit", transition:"all 0.15s" }}>
          {t.label}
        </button>
      ))}
    </div>
  );

  // ── Analyse tab ─────────────────────────────────────────────
  if (tab === "analyse") return (
    <div style={{ animation:"fadeUp 0.3s ease" }}>
      {heroBanner}
      {tabBar}
      <AnalysePanel />
    </div>
  );

  // ── Edito tab ───────────────────────────────────────────────
  if (tab === "edito") {
    const unit = EDITO_A1_UNITS[editoUnit];
    return (
      <div style={{ animation:"fadeUp 0.3s ease" }}>
        {heroBanner}
        {tabBar}
        <div style={{ padding:"0.75rem 1rem 4rem", display:"flex", flexDirection:"column", gap:"0.75rem" }}>

          {!editoTask ? (
            <>
              {/* Unit chips */}
              <div style={{ overflowX:"auto", display:"flex", gap:6, paddingBottom:4, scrollbarWidth:"none" }}>
                {EDITO_A1_UNITS.map((u, i) => {
                  const active = editoUnit === i;
                  return (
                    <button key={u.id} onClick={() => { setEditoUnit(i); setResult(null); }}
                      style={{ flexShrink:0, padding:"5px 11px", borderRadius:999, fontSize:11, fontWeight: active ? 700 : 500, cursor:"pointer", fontFamily:"inherit", whiteSpace:"nowrap", transition:"all 0.15s", background: active ? C.blue : C.white, color: active ? "#fff" : C.ink, border:`1.5px solid ${active ? C.blue : C.border}` }}>
                      U{u.unit} · {u.title}
                    </button>
                  );
                })}
              </div>

              {/* Unit label */}
              <div style={{ fontSize:"0.65rem", fontWeight:700, color:C.blue, textTransform:"uppercase", letterSpacing:"0.1em" }}>
                Unité {unit.unit} — {unit.title}
              </div>

              {/* Task cards */}
              {unit.writingPractice.map((p, i) => (
                <button key={i} onClick={() => { setEditoTask(p); setInput(""); setResult(null); }}
                  style={{ background:C.white, border:`1.5px solid ${C.border}`, borderLeft:`4px solid ${C.blue}`, borderRadius:14, padding:"0.85rem 1rem", textAlign:"left", cursor:"pointer", fontFamily:"inherit", transition:"box-shadow 0.15s, transform 0.1s", boxShadow:`0 2px 8px rgba(74,144,217,0.06)` }}
                  onPointerDown={e => e.currentTarget.style.transform="scale(0.99)"}
                  onPointerUp={e => e.currentTarget.style.transform="scale(1)"}
                  onPointerLeave={e => e.currentTarget.style.transform="scale(1)"}
                >
                  <div style={{ fontFamily:"'Playfair Display',Georgia,serif", fontSize:"0.92rem", color:C.ink, fontWeight:700, marginBottom:"0.3rem" }}>{p.title}</div>
                  <div style={{ fontSize:"0.74rem", color:C.gray, lineHeight:1.6 }}>{p.task}</div>
                  <div style={{ marginTop:"0.55rem", fontSize:"0.7rem", color:C.blue, fontWeight:600 }}>Bắt đầu viết →</div>
                </button>
              ))}
            </>
          ) : (
            <>
              {/* Task context */}
              <div style={{ background:C.blueL, border:`1.5px solid ${C.blue}33`, borderRadius:14, padding:"0.85rem 1rem", borderLeft:`4px solid ${C.blue}` }}>
                <div style={{ fontSize:"0.6rem", fontWeight:700, color:C.blue, textTransform:"uppercase", letterSpacing:"0.1em", marginBottom:5 }}>📘 Đề bài · {editoTask.title}</div>
                <div style={{ fontSize:"0.85rem", color:C.ink, lineHeight:1.65, fontFamily:"Georgia,serif" }}>{editoTask.task}</div>
              </div>

              {!result && (
                <div style={{ background:C.white, border:`1.5px solid ${C.border}`, borderRadius:14, padding:"0.85rem" }}>
                  <textarea value={input} onChange={e => setInput(e.target.value)}
                    placeholder="Écrivez votre réponse en français…"
                    rows={5}
                    style={{ width:"100%", border:`1.5px solid ${C.border}`, borderRadius:10, padding:"0.6rem 0.75rem", fontFamily:"Georgia,serif", fontSize:"0.92rem", lineHeight:1.7, outline:"none", resize:"vertical", boxSizing:"border-box", color:C.ink }} />
                  {err && (
                    <div style={{ display:"flex", alignItems:"center", gap:"0.5rem", marginTop:"0.4rem" }}>
                      <div style={{ fontSize:"0.72rem", color:"#DC2626" }}>⚠ {err}</div>
                      <button onClick={() => check(editoTask.task)} style={{ padding:"0.2rem 0.6rem", background:"#DC2626", color:"#fff", border:"none", borderRadius:20, fontSize:"0.65rem", cursor:"pointer", fontWeight:600 }}>↺ Thử lại</button>
                    </div>
                  )}
                  <div style={{ display:"flex", gap:"0.5rem", marginTop:"0.7rem" }}>
                    <button onClick={() => { setEditoTask(null); setResult(null); setInput(""); }}
                      style={{ padding:"0.6rem 0.85rem", background:"transparent", border:`1.5px solid ${C.border}`, color:C.gray, borderRadius:10, fontSize:"0.78rem", cursor:"pointer", fontFamily:"inherit" }}>
                      ← Đổi đề
                    </button>
                    <button onClick={() => check(editoTask.task)} disabled={loading || !input.trim()}
                      style={{ flex:1, padding:"0.65rem", background: input.trim() ? `linear-gradient(135deg, ${C.accent}, #c0392b)` : C.border, color:"#fff", border:"none", borderRadius:10, fontFamily:"'Playfair Display',Georgia,serif", fontSize:"0.9rem", cursor: input.trim() ? "pointer" : "default", fontWeight:700, transition:"background 0.15s", boxShadow: input.trim() ? `0 4px 14px ${C.accent}44` : "none" }}>
                      {loading ? "AI đang chấm…" : "Chấm bài ✦"}
                    </button>
                  </div>
                </div>
              )}

              {loading && <div style={{ display:"flex", justifyContent:"center", padding:"1.5rem" }}><Spinner /></div>}

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
      </div>
    );
  }

  // ════════════════════════════════════════════════════════════
  // FREE WRITING TAB
  // ════════════════════════════════════════════════════════════
  return (
    <div style={{ animation:"fadeUp 0.3s ease" }}>
      {heroBanner}
      {tabBar}

      <div style={{ padding:"0.75rem 1rem 4rem", display:"flex", flexDirection:"column", gap:"0.8rem" }}>

        {/* Hint banner */}
        <div style={{ background:C.blueL, border:`1.5px solid ${C.blue}22`, borderRadius:14, padding:"0.85rem 1rem" }}>
          <div style={{ fontSize:"0.65rem", fontWeight:700, color:C.blue, textTransform:"uppercase", letterSpacing:"0.1em", marginBottom:3 }}>✍️ Viết câu tự do</div>
          <div style={{ fontSize:"0.74rem", color:C.gray, lineHeight:1.6 }}>
            Nhập câu tiếng Pháp — AI chấm điểm, phân loại lỗi và giải thích bằng tiếng Việt.
          </div>
        </div>

        {!result && (
          <div style={{ background:C.white, border:`1.5px solid ${C.border}`, borderRadius:14, padding:"0.85rem" }}>
            <textarea value={input} onChange={e => setInput(e.target.value)}
              placeholder="Nhập câu tiếng Pháp… vd: Je suis une étudiant."
              rows={4}
              style={{ width:"100%", border:`1.5px solid ${C.border}`, borderRadius:10, padding:"0.6rem 0.75rem", fontFamily:"Georgia,serif", fontSize:"0.92rem", lineHeight:1.7, outline:"none", resize:"vertical", boxSizing:"border-box", color:C.ink }} />
            {err && (
              <div style={{ display:"flex", alignItems:"center", gap:"0.5rem", marginTop:"0.4rem" }}>
                <div style={{ fontSize:"0.72rem", color:"#DC2626" }}>⚠ {err}</div>
                <button onClick={() => check()} style={{ padding:"0.2rem 0.6rem", background:"#DC2626", color:"#fff", border:"none", borderRadius:20, fontSize:"0.65rem", cursor:"pointer", fontWeight:600 }}>↺ Thử lại</button>
              </div>
            )}
            <button onClick={() => check()} disabled={loading || !input.trim()}
              style={{ marginTop:"0.7rem", width:"100%", padding:"0.75rem", background: input.trim() ? `linear-gradient(135deg, ${C.accent}, #c0392b)` : C.border, color:"#fff", border:"none", borderRadius:12, fontFamily:"'Playfair Display',Georgia,serif", fontSize:"0.92rem", cursor: input.trim() ? "pointer" : "default", fontWeight:700, transition:"background 0.15s", boxShadow: input.trim() ? `0 4px 14px ${C.accent}44` : "none" }}>
              {loading ? "AI đang chấm…" : "Chấm bài ✦"}
            </button>
          </div>
        )}

        {loading && <div style={{ display:"flex", justifyContent:"center", padding:"1.5rem" }}><Spinner /></div>}

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
                  onMouseEnter={e => e.currentTarget.style.background = C.blueL}
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
    </div>
  );
}
