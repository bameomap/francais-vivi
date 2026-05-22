import { useState, useEffect } from "react";
import { C } from "../constants.js";
import { callAI } from "../utils/api.js";
import SpeakBtn from "./ui/SpeakBtn.jsx";
import Spinner from "./ui/Spinner.jsx";
import { logError } from "./WeakSpotsPanel.jsx";
import AnalysePanel from "./AnalysePanel.jsx";
import { EDITO_A1_UNITS } from "../data/editoA1Units.js";

const UNIT_COLORS = [
  { color:"#2980B9", bg:"#E8F4FD" }, { color:"#8E44AD", bg:"#F5EEFF" },
  { color:"#16A085", bg:"#E6FAF5" }, { color:"#E67E22", bg:"#FEF3E2" },
  { color:"#C0392B", bg:"#FDEDEC" }, { color:"#D35400", bg:"#FDEBD0" },
  { color:"#27AE60", bg:"#EAFAF1" }, { color:"#2471A3", bg:"#EAF4FB" },
  { color:"#6C3483", bg:"#F5EEF8" }, { color:"#0E6655", bg:"#E8F8F5" },
  { color:"#784212", bg:"#FEF9E7" },
];

export default function WritingPanel() {
  const [tab, setTab] = useState("write");
  const [input, setInput] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");
  const [history, setHistory] = useState(() => {
    try { return JSON.parse(localStorage.getItem("writing_history") || "[]"); } catch { return []; }
  });
  const [editoUnit, setEditoUnit] = useState(0);
  const [editoTask, setEditoTask] = useState(null);

  useEffect(() => {
    const idx = localStorage.getItem("parcours_writing_idx");
    if (idx !== null) {
      setTab("edito");
      setEditoUnit(Number(idx));
      localStorage.removeItem("parcours_writing_idx");
    }
  }, []); // { title, task }

  const check = async (contextTask) => {
    if (!input.trim()) return;
    setLoading(true); setErr(""); setResult(null);
    const taskContext = contextTask
      ? `The learner is responding to this writing task: "${contextTask}"\n`
      : "";
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
      r.errors?.forEach(e => { if(e.type) logError(e.type); });
    } catch(e) { setErr(e.message); }
    setLoading(false);
  };

  const scoreColor = s => s >= 90 ? C.green : s >= 70 ? C.gold : s >= 50 ? "#e67e22" : C.red;
  const verdictBg = v => ({"Xuất sắc":"#e8f7f1","Tốt":"#eaf4fb","Khá":"#fff8e6","Cần cải thiện":"#fde8e6"}[v] || C.cream);

  const TAB_BAR = (
    <div style={{ display:"flex", gap:"0.35rem", marginBottom:"0.05rem" }}>
      {[{id:"write",label:"✍️ Tự do"},{id:"edito",label:"📘 Edito"},{id:"analyse",label:"🔍 Phân tích"}].map(t=>(
        <button key={t.id} onClick={()=>{ setTab(t.id); setResult(null); setInput(""); setEditoTask(null); }}
          style={{ flex:1, padding:"0.5rem 0.3rem", border:`1.5px solid ${tab===t.id?"#e67e22":C.border}`, borderRadius:10, background:tab===t.id?"#e67e22":C.white, color:tab===t.id?C.white:C.ink, fontSize:"0.75rem", cursor:"pointer", fontWeight:tab===t.id?700:400, fontFamily:"inherit", transition:"all 0.15s" }}>
          {t.label}
        </button>
      ))}
    </div>
  );

  if (tab === "analyse") return (
    <div>
      <div style={{ padding:"1rem 1rem 0" }}>{TAB_BAR}</div>
      <AnalysePanel />
    </div>
  );

  // ── Edito writing tab ──
  if (tab === "edito") {
    const unit = EDITO_A1_UNITS[editoUnit];
    const uc = UNIT_COLORS[editoUnit] || UNIT_COLORS[0];
    return (
      <div style={{ padding:"1rem", display:"flex", flexDirection:"column", gap:"0.8rem" }}>
        {TAB_BAR}

        {!editoTask ? (
          <>
            {/* Unit chips */}
            <div style={{ overflowX:"auto", display:"flex", gap:6, paddingBottom:2 }}>
              {EDITO_A1_UNITS.map((u, i) => {
                const ucc = UNIT_COLORS[i] || UNIT_COLORS[0];
                const active = editoUnit === i;
                return (
                  <button key={u.id} onClick={()=>setEditoUnit(i)}
                    style={{ flexShrink:0, padding:"5px 11px", borderRadius:999, fontSize:11, fontWeight:active?700:500, cursor:"pointer", fontFamily:"inherit", whiteSpace:"nowrap", transition:"all 0.15s", background:active?ucc.color:C.white, color:active?"#fff":C.ink2, border:`1.5px solid ${active?ucc.color:C.border}` }}>
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
            {/* Task context card */}
            <div style={{ background:uc.bg, border:`1.5px solid ${uc.color}44`, borderRadius:12, padding:"0.85rem 1rem" }}>
              <div style={{ fontSize:"0.6rem", fontWeight:700, color:uc.color, textTransform:"uppercase", letterSpacing:"0.1em", marginBottom:4 }}>Đề bài · {editoTask.title}</div>
              <div style={{ fontSize:"0.83rem", color:C.ink, lineHeight:1.6, fontFamily:"Georgia,serif" }}>{editoTask.task}</div>
            </div>

            <div style={{ background:C.white, border:`1.5px solid ${C.border}`, borderRadius:12, padding:"0.85rem" }}>
              <textarea value={input} onChange={e=>setInput(e.target.value)}
                placeholder="Écrivez votre réponse en français…"
                style={{ width:"100%", minHeight:110, border:`1.5px solid ${C.border}`, borderRadius:8, padding:"0.55rem 0.7rem", fontFamily:"Georgia,serif", fontSize:"0.92rem", lineHeight:1.6, outline:"none", resize:"vertical", boxSizing:"border-box", color:C.ink }} />
              {err && (
                <div style={{ display:"flex", alignItems:"center", gap:"0.5rem", marginTop:"0.4rem" }}>
                  <div style={{ fontSize:"0.72rem", color:C.red }}>⚠ {err}</div>
                  <button onClick={()=>check(editoTask.task)} style={{ padding:"0.2rem 0.6rem", background:C.red, color:C.white, border:"none", borderRadius:20, fontSize:"0.65rem", cursor:"pointer", fontWeight:600, flexShrink:0 }}>↺ Thử lại</button>
                </div>
              )}
              <div style={{ display:"flex", gap:"0.5rem", marginTop:"0.6rem" }}>
                <button onClick={()=>{ setEditoTask(null); setResult(null); setInput(""); }}
                  style={{ padding:"0.6rem 0.8rem", background:"transparent", border:`1.5px solid ${C.border}`, color:C.gray, borderRadius:8, fontSize:"0.78rem", cursor:"pointer", fontFamily:"inherit" }}>
                  ← Đổi đề
                </button>
                <button onClick={()=>check(editoTask.task)} disabled={loading||!input.trim()}
                  style={{ flex:1, padding:"0.65rem", background:input.trim()?uc.color:C.border, color:C.white, border:"none", borderRadius:8, fontFamily:"Georgia,serif", fontSize:"0.88rem", cursor:input.trim()?"pointer":"default" }}>
                  {loading ? "AI đang chấm..." : "Chấm bài ✦"}
                </button>
              </div>
            </div>

            {loading && <div style={{ display:"flex", justifyContent:"center", padding:"1rem" }}><Spinner /></div>}

            {result && (
              <div style={{ display:"flex", flexDirection:"column", gap:"0.65rem", animation:"fadeUp 0.3s ease" }}>
                <div style={{ background: verdictBg(result.verdict), border:`1.5px solid ${scoreColor(result.score)}44`, borderRadius:12, padding:"1rem", display:"flex", alignItems:"center", gap:"1rem" }}>
                  <div style={{ textAlign:"center", minWidth:64 }}>
                    <div style={{ fontFamily:"Georgia,serif", fontSize:"2.2rem", color:scoreColor(result.score), fontWeight:700, lineHeight:1 }}>{result.score}</div>
                    <div style={{ fontSize:"0.6rem", color:C.gray, textTransform:"uppercase", letterSpacing:1 }}>điểm</div>
                  </div>
                  <div>
                    <div style={{ fontFamily:"Georgia,serif", fontSize:"1rem", color:scoreColor(result.score), marginBottom:"0.2rem" }}>{result.verdict}</div>
                    {result.tip && <div style={{ fontSize:"0.75rem", color:C.gray, lineHeight:1.5 }}>{result.tip}</div>}
                  </div>
                </div>
                {!result.is_perfect && result.corrected && (
                  <div style={{ background:C.white, border:`1.5px solid ${C.green}44`, borderRadius:12, padding:"0.85rem" }}>
                    <div style={{ fontSize:"0.63rem", textTransform:"uppercase", letterSpacing:1, color:C.green, marginBottom:"0.4rem", fontWeight:600 }}>✓ Bản sửa</div>
                    <div style={{ fontFamily:"Georgia,serif", fontSize:"0.92rem", color:C.ink, lineHeight:1.65 }}>{result.corrected} <SpeakBtn text={result.corrected} /></div>
                    {result.translation && <div style={{ fontSize:"0.73rem", color:C.gray, fontStyle:"italic", marginTop:4 }}>→ {result.translation}</div>}
                  </div>
                )}
                {result.errors?.length > 0 && (
                  <div style={{ background:C.white, border:`1.5px solid ${C.border}`, borderRadius:12, padding:"0.85rem" }}>
                    <div style={{ fontSize:"0.63rem", textTransform:"uppercase", letterSpacing:1, color:C.red, marginBottom:"0.6rem", fontWeight:600 }}>✗ Lỗi ({result.errors.length})</div>
                    {result.errors.map((e, i) => (
                      <div key={i} style={{ borderLeft:`3px solid ${C.red}`, paddingLeft:"0.75rem", marginBottom:"0.7rem" }}>
                        <div style={{ display:"flex", gap:"0.5rem", alignItems:"center", marginBottom:"0.25rem", flexWrap:"wrap" }}>
                          <span style={{ fontFamily:"Georgia,serif", fontSize:"0.88rem", color:C.red, textDecoration:"line-through" }}>{e.original}</span>
                          <span style={{ color:C.gray }}>→</span>
                          <span style={{ fontFamily:"Georgia,serif", fontSize:"0.88rem", color:C.green, fontWeight:600 }}>{e.correction}</span>
                          <span style={{ background:`${C.purple}22`, color:C.purple, fontSize:"0.6rem", padding:"0.1rem 0.45rem", borderRadius:20 }}>{e.type}</span>
                        </div>
                        <div style={{ fontSize:"0.75rem", color:C.gray, lineHeight:1.5 }}>💡 {e.explanation}</div>
                      </div>
                    ))}
                  </div>
                )}
                <button onClick={()=>{ setInput(""); setResult(null); }}
                  style={{ padding:"0.5rem", background:"transparent", border:`1px solid ${C.border}`, borderRadius:8, color:C.gray, fontSize:"0.78rem", cursor:"pointer" }}>
                  ✏️ Viết lại
                </button>
              </div>
            )}
          </>
        )}
      </div>
    );
  }

  return (
    <div style={{ padding:"1rem", display:"flex", flexDirection:"column", gap:"0.8rem" }}>
      {TAB_BAR}
      <div style={{ fontSize:"0.72rem", fontWeight:600, color:"#e67e22", marginBottom:"-0.2rem" }}>✍️ Viết câu tự do</div>
      <div style={{ fontSize:"0.73rem", color:C.gray, lineHeight:1.6 }}>Nhập một câu tiếng Pháp bất kỳ — AI sẽ chấm điểm, chỉ ra lỗi và giải thích bằng tiếng Việt.</div>

      <div style={{ background:C.white, border:`1.5px solid ${C.border}`, borderRadius:12, padding:"0.85rem" }}>
        <textarea value={input} onChange={e=>setInput(e.target.value)}
          placeholder="Nhập câu tiếng Pháp... vd: Je suis une étudiant."
          style={{ width:"100%", minHeight:80, border:`1.5px solid ${C.border}`, borderRadius:8, padding:"0.55rem 0.7rem", fontFamily:"Georgia,serif", fontSize:"0.92rem", lineHeight:1.6, outline:"none", resize:"vertical", boxSizing:"border-box", color:C.ink }} />
        {err && (
          <div style={{ display:"flex", alignItems:"center", gap:"0.5rem", marginTop:"0.4rem" }}>
            <div style={{ fontSize:"0.72rem", color:C.red }}>⚠ {err}</div>
            <button onClick={()=>check()} style={{ padding:"0.2rem 0.6rem", background:C.red, color:C.white, border:"none", borderRadius:20, fontSize:"0.65rem", cursor:"pointer", fontWeight:600, flexShrink:0 }}>↺ Thử lại</button>
          </div>
        )}
        <button onClick={()=>check()} disabled={loading||!input.trim()}
          style={{ marginTop:"0.6rem", width:"100%", padding:"0.65rem", background: input.trim() ? "#e67e22" : C.border, color:C.white, border:"none", borderRadius:8, fontFamily:"Georgia,serif", fontSize:"0.88rem", cursor: input.trim() ? "pointer" : "default" }}>
          {loading ? "AI đang chấm..." : "Chấm bài ✦"}
        </button>
      </div>

      {loading && <div style={{ display:"flex", justifyContent:"center", padding:"1rem" }}><Spinner /></div>}

      {result && (
        <div style={{ display:"flex", flexDirection:"column", gap:"0.65rem", animation:"fadeUp 0.3s ease" }}>
          {/* Score card */}
          <div style={{ background: verdictBg(result.verdict), border:`1.5px solid ${scoreColor(result.score)}44`, borderRadius:12, padding:"1rem", display:"flex", alignItems:"center", gap:"1rem" }}>
            <div style={{ textAlign:"center", minWidth:64 }}>
              <div style={{ fontFamily:"Georgia,serif", fontSize:"2.2rem", color: scoreColor(result.score), fontWeight:700, lineHeight:1 }}>{result.score}</div>
              <div style={{ fontSize:"0.6rem", color:C.gray, textTransform:"uppercase", letterSpacing:1 }}>điểm</div>
            </div>
            <div>
              <div style={{ fontFamily:"Georgia,serif", fontSize:"1rem", color: scoreColor(result.score), marginBottom:"0.2rem" }}>{result.verdict}</div>
              {result.tip && <div style={{ fontSize:"0.75rem", color:C.gray, lineHeight:1.5 }}>{result.tip}</div>}
            </div>
          </div>

          {/* Corrected sentence */}
          {!result.is_perfect && (
            <div style={{ background:C.white, border:`1.5px solid ${C.green}44`, borderRadius:12, padding:"0.85rem" }}>
              <div style={{ fontSize:"0.63rem", textTransform:"uppercase", letterSpacing:1, color:C.green, marginBottom:"0.4rem", fontWeight:600 }}>✓ Câu đúng</div>
              <div style={{ fontFamily:"Georgia,serif", fontSize:"0.95rem", color:C.ink, marginBottom:"0.25rem" }}>{result.corrected} <SpeakBtn text={result.corrected} /></div>
              {result.translation && <div style={{ fontSize:"0.75rem", color:C.gray, fontStyle:"italic" }}>→ {result.translation}</div>}
            </div>
          )}
          {result.is_perfect && (
            <div style={{ background:"#e8f7f1", border:`1.5px solid ${C.green}`, borderRadius:12, padding:"0.85rem", textAlign:"center" }}>
              <div style={{ fontSize:"1.2rem", marginBottom:"0.3rem" }}>🎉</div>
              <div style={{ fontFamily:"Georgia,serif", color:C.green }}>Hoàn hảo! Không có lỗi nào.</div>
            </div>
          )}

          {/* Errors */}
          {result.errors?.length > 0 && (
            <div style={{ background:C.white, border:`1.5px solid ${C.border}`, borderRadius:12, padding:"0.85rem" }}>
              <div style={{ fontSize:"0.63rem", textTransform:"uppercase", letterSpacing:1, color:C.red, marginBottom:"0.6rem", fontWeight:600 }}>✗ Lỗi cần sửa ({result.errors.length})</div>
              {result.errors.map((e, i) => (
                <div key={i} style={{ borderLeft:`3px solid ${C.red}`, paddingLeft:"0.75rem", marginBottom:"0.7rem" }}>
                  <div style={{ display:"flex", gap:"0.5rem", alignItems:"center", marginBottom:"0.25rem", flexWrap:"wrap" }}>
                    <span style={{ fontFamily:"Georgia,serif", fontSize:"0.88rem", color:C.red, textDecoration:"line-through" }}>{e.original}</span>
                    <span style={{ color:C.gray }}>→</span>
                    <span style={{ fontFamily:"Georgia,serif", fontSize:"0.88rem", color:C.green, fontWeight:600 }}>{e.correction}</span>
                    <span style={{ background:`${C.purple}22`, color:C.purple, fontSize:"0.6rem", padding:"0.1rem 0.45rem", borderRadius:20 }}>{e.type}</span>
                  </div>
                  <div style={{ fontSize:"0.75rem", color:C.gray, lineHeight:1.5 }}>💡 {e.explanation}</div>
                </div>
              ))}
            </div>
          )}

          <button onClick={()=>{ setInput(""); setResult(null); }}
            style={{ padding:"0.5rem", background:"transparent", border:`1px solid ${C.border}`, borderRadius:8, color:C.gray, fontSize:"0.78rem", cursor:"pointer" }}>
            ✏️ Viết câu khác
          </button>
        </div>
      )}

      {/* History */}
      {history.length > 0 && !result && (
        <div>
          <div style={{ fontSize:"0.65rem", textTransform:"uppercase", letterSpacing:1, color:C.gray, marginBottom:"0.5rem", fontWeight:600 }}>📜 Câu đã viết gần đây</div>
          {history.slice(0,5).map((h,i) => (
            <div key={i} onClick={()=>{ setInput(h.sentence); setResult(h.result); }}
              style={{ background:C.white, border:`1px solid ${C.border}`, borderRadius:8, padding:"0.55rem 0.75rem", marginBottom:"0.35rem", cursor:"pointer", display:"flex", justifyContent:"space-between", alignItems:"center" }}
              onMouseEnter={e=>e.currentTarget.style.background=C.cream}
              onMouseLeave={e=>e.currentTarget.style.background=C.white}>
              <div>
                <div style={{ fontFamily:"Georgia,serif", fontSize:"0.83rem", color:C.ink }}>{h.sentence}</div>
                <div style={{ fontSize:"0.65rem", color:C.gray, marginTop:"0.1rem" }}>{h.date}</div>
              </div>
              <div style={{ fontFamily:"Georgia,serif", fontSize:"1rem", color: scoreColor(h.result.score), fontWeight:700, minWidth:36, textAlign:"center" }}>{h.result.score}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
