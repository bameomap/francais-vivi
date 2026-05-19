import { useState } from "react";
import { C } from "../constants.js";
import { callAI } from "../utils/api.js";
import Spinner from "./ui/Spinner.jsx";
import { ExerciseMC, ExerciseFill } from "./QuizSections.jsx";

const WEAK_KEY = "weak_spots_log";

export function logError(type) {
  try {
    const log = JSON.parse(localStorage.getItem(WEAK_KEY) || "{}");
    log[type] = (log[type] || 0) + 1;
    localStorage.setItem(WEAK_KEY, JSON.stringify(log));
  } catch {}
}

export default function WeakSpotsPanel() {
  const [log, setLog] = useState(() => {
    try { return JSON.parse(localStorage.getItem(WEAK_KEY) || "{}"); } catch { return {}; }
  });
  const [exercises, setExercises] = useState(null);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");
  const [manualTopics, setManualTopics] = useState([]);

  const entries = Object.entries(log).sort((a,b) => b[1]-a[1]);
  const total = entries.reduce((s,[,v])=>s+v, 0);
  const topWeak = entries.slice(0,5).map(([k])=>k);

  const COMMON_ERRORS = ["Mạo từ le/la/l'/les","Giới từ à/de","Thì hiện tại (présent)","Phủ định ne...pas","Tính từ sở hữu","Đại từ nhân xưng","Động từ être & avoir","Số từ","Câu hỏi","Tính từ vị trí"];

  const generate = async (topics) => {
    if (!topics.length) { setErr("Chọn ít nhất 1 chủ đề!"); return; }
    setLoading(true); setErr(""); setExercises(null);
    try {
      const r = await callAI(`French teacher for A1 Vietnamese learners. Create 6 targeted exercises for these weak grammar areas: ${topics.join(", ")}.
Mix exercise types. Return ONLY JSON:
{
  "sections": [
    {
      "topic": "topic name",
      "type": "mc|fill|order",
      "exercises": [
        {"question":"...","options":["A","B","C","D"],"answer":"exact option","explanation":"Vietnamese tip"},
        {"sentence":"sentence with ___","answer":"word","hint":"Vietnamese hint","explanation":"Vietnamese why"}
      ]
    }
  ]
}`);
      setExercises(r);
    } catch(e) { setErr(e.message); }
    setLoading(false);
  };

  const toggleManual = (t) => setManualTopics(prev => prev.includes(t) ? prev.filter(x=>x!==t) : [...prev, t]);

  return (
    <div style={{ padding:"1rem", display:"flex", flexDirection:"column", gap:"0.85rem" }}>
      <div style={{ fontSize:"0.72rem", fontWeight:600, color:C.red }}>🎯 Bài tập theo điểm yếu</div>
      <div style={{ fontSize:"0.73rem", color:C.gray, lineHeight:1.6 }}>AI phân tích lỗi bạn hay gặp và tạo bài tập trúng đích.</div>

      {/* Stats from writing history */}
      {total > 0 && (
        <div style={{ background:C.white, border:`1.5px solid ${C.border}`, borderRadius:12, padding:"0.85rem" }}>
          <div style={{ fontSize:"0.63rem", textTransform:"uppercase", letterSpacing:1, color:C.red, marginBottom:"0.6rem", fontWeight:600 }}>📊 Lỗi hay gặp ({total} lần)</div>
          {entries.slice(0,6).map(([type, count], i) => (
            <div key={i} style={{ display:"flex", alignItems:"center", gap:"0.5rem", marginBottom:"0.35rem" }}>
              <div style={{ fontSize:"0.78rem", color:C.ink, flex:1 }}>{type}</div>
              <div style={{ flex:2, height:6, background:C.cream, borderRadius:3 }}>
                <div style={{ height:"100%", width:`${Math.min(100,(count/entries[0][1])*100)}%`, background:C.red, borderRadius:3 }} />
              </div>
              <div style={{ fontSize:"0.7rem", color:C.red, fontWeight:600, minWidth:20 }}>{count}</div>
            </div>
          ))}
          <button onClick={()=>generate(topWeak)} disabled={loading}
            style={{ marginTop:"0.7rem", width:"100%", padding:"0.6rem", background:C.red, color:C.white, border:"none", borderRadius:8, fontFamily:"Georgia,serif", fontSize:"0.85rem", cursor:"pointer" }}>
            🎯 Tạo bài tập theo lỗi của tôi
          </button>
        </div>
      )}

      {/* Manual topic selection */}
      <div style={{ background:C.white, border:`1.5px solid ${C.border}`, borderRadius:12, padding:"0.85rem" }}>
        <div style={{ fontSize:"0.63rem", textTransform:"uppercase", letterSpacing:1, color:C.purple, marginBottom:"0.6rem", fontWeight:600 }}>🧩 Chọn chủ đề muốn luyện</div>
        <div style={{ display:"flex", flexWrap:"wrap", gap:"0.35rem", marginBottom:"0.7rem" }}>
          {COMMON_ERRORS.map((t,i) => (
            <button key={i} onClick={()=>toggleManual(t)}
              style={{ padding:"0.25rem 0.6rem", border:`1.5px solid ${manualTopics.includes(t)?C.purple:C.border}`, borderRadius:20, background: manualTopics.includes(t)?C.purple:C.white, color: manualTopics.includes(t)?C.white:C.ink, fontSize:"0.72rem", cursor:"pointer", fontFamily:"inherit" }}>
              {t}
            </button>
          ))}
        </div>
        {err && <div style={{ fontSize:"0.72rem", color:C.red, marginBottom:"0.5rem" }}>⚠ {err}</div>}
        <button onClick={()=>generate(manualTopics)} disabled={loading||!manualTopics.length}
          style={{ width:"100%", padding:"0.6rem", background: manualTopics.length ? C.purple : C.border, color:C.white, border:"none", borderRadius:8, fontFamily:"Georgia,serif", fontSize:"0.85rem", cursor: manualTopics.length?"pointer":"default" }}>
          {loading ? "Đang tạo bài tập..." : `Tạo bài tập (${manualTopics.length} chủ đề) ✦`}
        </button>
      </div>

      {loading && <div style={{ display:"flex", justifyContent:"center", padding:"1rem" }}><Spinner /></div>}

      {/* Exercises */}
      {exercises?.sections?.map((sec, si) => (
        <div key={si} style={{ background:C.white, border:`1.5px solid ${C.border}`, borderRadius:12, overflow:"hidden" }}>
          <div style={{ background:C.purple, color:C.white, padding:"0.6rem 0.9rem", fontSize:"0.78rem", fontFamily:"Georgia,serif" }}>
            🎯 {sec.topic}
          </div>
          <div style={{ padding:"0.85rem" }}>
            {sec.exercises?.map((ex, ei) => {
              if (ex.options) return <ExerciseMC key={ei} ex={ex} idx={ei} />;
              if (ex.sentence) return <ExerciseFill key={ei} ex={ex} idx={ei} />;
              return null;
            })}
          </div>
        </div>
      ))}

      {exercises && (
        <button onClick={()=>{ setExercises(null); setManualTopics([]); }}
          style={{ padding:"0.5rem", background:"transparent", border:`1px solid ${C.border}`, borderRadius:8, color:C.gray, fontSize:"0.78rem", cursor:"pointer" }}>
          🔄 Tạo bài khác
        </button>
      )}
    </div>
  );
}
