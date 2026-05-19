import { useState, useEffect, useCallback } from "react";
import { C } from "../constants.js";
import { speak } from "../utils/helpers.js";
import {
  getDueCards, getAllCards, getSRSStats,
  updateSRSCard, addWordsToSRS, removeFromSRS, resetSRS,
} from "../utils/srs.js";
import { shuffleArray } from "../utils/helpers.js";

// ── Helpers ─────────────────────────────────────────────────
function fmtDate(ts) {
  if (!ts) return "—";
  const d = new Date(ts);
  const today    = new Date(); today.setHours(0,0,0,0);
  const tomorrow = new Date(today); tomorrow.setDate(today.getDate()+1);
  if (d < tomorrow) return "Hôm nay";
  if (d < new Date(tomorrow.getTime()+86400000)) return "Ngày mai";
  return d.toLocaleDateString("vi-VN");
}

function intervalLabel(days) {
  if (days === 0) return "Mới";
  if (days === 1) return "1 ngày";
  if (days < 7)  return `${days} ngày`;
  if (days < 30) return `${Math.round(days/7)} tuần`;
  return `${Math.round(days/30)} tháng`;
}

// ── Card Flip component ─────────────────────────────────────
function FlashCard({ card, flipped, onFlip }) {
  return (
    <div onClick={onFlip} style={{ perspective:"1000px", cursor:"pointer", userSelect:"none" }}>
      <div style={{
        position:"relative", width:"100%", minHeight:200,
        transformStyle:"preserve-3d",
        transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
        transition:"transform 0.45s ease",
      }}>
        {/* Front */}
        <div style={{
          position:"absolute", inset:0, backfaceVisibility:"hidden",
          background:`linear-gradient(135deg, ${C.blue}ee, ${C.blueDark})`,
          borderRadius:22, padding:"1.5rem", display:"flex", flexDirection:"column",
          alignItems:"center", justifyContent:"center", gap:"0.6rem",
          boxShadow:`0 10px 40px ${C.blue}44`,
        }}>
          <div style={{ fontSize:"0.65rem", color:"rgba(255,255,255,0.7)", textTransform:"uppercase", letterSpacing:2 }}>Tiếng Pháp</div>
          <div style={{ fontFamily:"'Playfair Display',Georgia,serif", fontSize:"2rem", color:"#fff", fontWeight:700, textAlign:"center", lineHeight:1.2 }}>
            {card.fr}
          </div>
          <button
            onClick={e=>{ e.stopPropagation(); speak(card.fr); }}
            style={{ background:"rgba(255,255,255,0.2)", border:"none", color:"#fff", borderRadius:20, padding:"0.3rem 0.85rem", fontSize:"0.8rem", cursor:"pointer", marginTop:"0.25rem" }}>
            🔊 Nghe
          </button>
          <div style={{ position:"absolute", bottom:16, fontSize:"0.7rem", color:"rgba(255,255,255,0.6)" }}>
            Nhấn để lật ↕
          </div>
        </div>

        {/* Back */}
        <div style={{
          position:"absolute", inset:0, backfaceVisibility:"hidden",
          transform:"rotateY(180deg)",
          background:C.white, borderRadius:22, padding:"1.5rem",
          display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", gap:"0.5rem",
          boxShadow:`0 10px 40px rgba(0,0,0,0.08)`, border:`1.5px solid ${C.border}`,
        }}>
          <div style={{ fontSize:"0.65rem", color:C.gray, textTransform:"uppercase", letterSpacing:2 }}>Nghĩa tiếng Việt</div>
          <div style={{ fontFamily:"'Playfair Display',Georgia,serif", fontSize:"1.7rem", color:C.ink, fontWeight:700, textAlign:"center" }}>
            {card.vi || "—"}
          </div>
          <div style={{ fontSize:"0.8rem", color:C.blue, fontStyle:"italic", marginTop:"0.3rem" }}>{card.fr}</div>
          <div style={{ position:"absolute", bottom:16, fontSize:"0.68rem", color:C.gray }}>
            Bạn có nhớ không?
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Main SRS Panel ───────────────────────────────────────────
export default function SRSPanel({ currentWords = [] }) {
  const [mode, setMode]         = useState("home"); // home | review | done | manage
  const [queue, setQueue]       = useState([]);
  const [idx, setIdx]           = useState(0);
  const [flipped, setFlipped]   = useState(false);
  const [session, setSession]   = useState({ correct:0, wrong:0, cards:[] });
  const [stats, setStats]       = useState(getSRSStats());
  const [allCards, setAllCards] = useState(getAllCards());
  const [toast, setToast]       = useState("");

  const refreshStats = () => { setStats(getSRSStats()); setAllCards(getAllCards()); };

  const showToast = (msg) => { setToast(msg); setTimeout(()=>setToast(""),2200); };

  // Start review session
  const startReview = () => {
    const due = shuffleArray(getDueCards());
    if (!due.length) { showToast("Không có từ nào cần ôn!"); return; }
    setQueue(due);
    setIdx(0); setFlipped(false);
    setSession({ correct:0, wrong:0, cards:[] });
    setMode("review");
  };

  // Answer a card
  const answer = useCallback((correct) => {
    const card = queue[idx];
    updateSRSCard(card.fr, correct);
    const newSession = {
      correct: session.correct + (correct?1:0),
      wrong:   session.wrong  + (correct?0:1),
      cards:   [...session.cards, { ...card, correct }],
    };
    setSession(newSession);
    if (idx + 1 >= queue.length) {
      refreshStats();
      setMode("done");
    } else {
      setIdx(i=>i+1);
      setFlipped(false);
    }
  }, [queue, idx, session]);

  // Add current vocabulary set to deck
  const addCurrentWords = () => {
    if (!currentWords.length) { showToast("Chưa có từ vựng nào!"); return; }
    const added = addWordsToSRS(currentWords);
    refreshStats();
    showToast(added > 0 ? `✓ Đã thêm ${added} từ mới vào thẻ!` : "Tất cả từ đã có trong thẻ rồi!");
  };

  const current = queue[idx];
  const pct = queue.length ? Math.round((idx / queue.length) * 100) : 0;

  // ── HOME ──────────────────────────────────────────────────
  if (mode === "home") return (
    <div style={{ padding:"1rem", animation:"fadeUp 0.3s ease" }}>
      {toast && <div style={{ position:"fixed",top:20,left:"50%",transform:"translateX(-50%)",background:C.ink,color:"#fff",padding:"0.5rem 1.2rem",borderRadius:24,fontSize:"0.8rem",zIndex:400,animation:"pop 0.3s ease" }}>{toast}</div>}

      {/* Header card */}
      <div style={{ background:`linear-gradient(135deg,${C.blue},${C.blueDark})`, borderRadius:22, padding:"1.4rem", color:"#fff", marginBottom:"1rem", boxShadow:`0 8px 30px ${C.blue}44` }}>
        <div style={{ fontSize:"0.65rem", textTransform:"uppercase", letterSpacing:2, opacity:0.8, marginBottom:"0.3rem" }}>SPACED REPETITION</div>
        <div style={{ fontFamily:"'Playfair Display',Georgia,serif", fontSize:"1.4rem", fontWeight:700, marginBottom:"1rem" }}>🧠 Thẻ ôn tập</div>
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:"0.5rem", marginBottom:"1rem" }}>
          {[
            { label:"Tổng thẻ",   val:stats.total,    icon:"📚" },
            { label:"Cần ôn",     val:stats.due,      icon:"⏰" },
            { label:"Thành thạo", val:stats.mastered, icon:"⭐" },
          ].map((s,i)=>(
            <div key={i} style={{ background:"rgba(255,255,255,0.18)", borderRadius:14, padding:"0.65rem 0.5rem", textAlign:"center" }}>
              <div style={{ fontSize:"1rem", marginBottom:"0.15rem" }}>{s.icon}</div>
              <div style={{ fontFamily:"'Playfair Display',Georgia,serif", fontSize:"1.3rem", fontWeight:700 }}>{s.val}</div>
              <div style={{ fontSize:"0.62rem", opacity:0.85 }}>{s.label}</div>
            </div>
          ))}
        </div>
        <button
          onClick={startReview}
          disabled={stats.due === 0}
          style={{ width:"100%", padding:"0.8rem", background: stats.due>0?"#fff":"rgba(255,255,255,0.3)", color: stats.due>0?C.blue:"rgba(255,255,255,0.6)", border:"none", borderRadius:12, fontFamily:"'Playfair Display',Georgia,serif", fontSize:"0.95rem", cursor:stats.due>0?"pointer":"default", fontWeight:700 }}>
          {stats.due > 0 ? `Ôn ${stats.due} từ ngay →` : "✓ Không có từ nào cần ôn!"}
        </button>
      </div>

      {/* Add words card */}
      {currentWords.length > 0 && (
        <div style={{ background:C.white, border:`1.5px solid ${C.border}`, borderRadius:16, padding:"1rem", marginBottom:"0.75rem", display:"flex", justifyContent:"space-between", alignItems:"center", boxShadow:"0 2px 12px rgba(74,144,217,0.06)" }}>
          <div>
            <div style={{ fontSize:"0.85rem", fontWeight:700, color:C.ink }}>📝 Từ vựng hiện tại</div>
            <div style={{ fontSize:"0.72rem", color:C.gray, marginTop:"0.15rem" }}>{currentWords.length} từ · thêm vào thẻ SRS</div>
          </div>
          <button onClick={addCurrentWords}
            style={{ padding:"0.45rem 1rem", background:C.blue, color:"#fff", border:"none", borderRadius:20, fontSize:"0.78rem", cursor:"pointer", fontWeight:600, whiteSpace:"nowrap" }}>
            + Thêm vào thẻ
          </button>
        </div>
      )}

      {/* Upcoming schedule */}
      <div style={{ background:C.white, border:`1.5px solid ${C.border}`, borderRadius:16, padding:"1rem", marginBottom:"0.75rem", boxShadow:"0 2px 12px rgba(74,144,217,0.06)" }}>
        <div style={{ fontSize:"0.78rem", fontWeight:700, color:C.ink, marginBottom:"0.65rem" }}>📅 Lịch ôn sắp tới</div>
        {[
          { label:"Hôm nay",  val:stats.today,  color:C.red   },
          { label:"Tuần này", val:stats.week,   color:C.blue  },
          { label:"Tổng",     val:stats.total,  color:C.gray  },
        ].map((r,i)=>(
          <div key={i} style={{ display:"flex", justifyContent:"space-between", alignItems:"center", padding:"0.4rem 0", borderBottom: i<2 ? `1px solid ${C.border}` : "none" }}>
            <span style={{ fontSize:"0.82rem", color:C.gray }}>{r.label}</span>
            <span style={{ fontFamily:"'Playfair Display',Georgia,serif", fontSize:"1rem", color:r.color, fontWeight:700 }}>{r.val} từ</span>
          </div>
        ))}
      </div>

      {/* Manage deck */}
      {stats.total > 0 && (
        <button onClick={()=>setMode("manage")}
          style={{ width:"100%", padding:"0.7rem", background:"transparent", border:`1.5px solid ${C.border}`, color:C.gray, borderRadius:12, fontSize:"0.8rem", cursor:"pointer" }}>
          ⚙️ Quản lý thẻ ({stats.total} từ)
        </button>
      )}
    </div>
  );

  // ── REVIEW ────────────────────────────────────────────────
  if (mode === "review") return (
    <div style={{ padding:"1rem", animation:"fadeUp 0.3s ease" }}>
      {/* Progress */}
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:"0.75rem" }}>
        <button onClick={()=>setMode("home")} style={{ background:C.blueL, border:"none", color:C.blue, cursor:"pointer", fontSize:"0.82rem", padding:"0.3rem 0.65rem", borderRadius:10, fontWeight:600 }}>← Dừng</button>
        <span style={{ fontSize:"0.8rem", color:C.gray, fontWeight:500 }}>{idx+1} / {queue.length}</span>
        <span style={{ fontSize:"0.8rem", fontWeight:700 }}>
          <span style={{ color:C.green }}>✓{session.correct}</span>
          <span style={{ color:C.gray }}> · </span>
          <span style={{ color:C.red }}>✗{session.wrong}</span>
        </span>
      </div>

      {/* Progress bar */}
      <div style={{ height:5, background:C.border, borderRadius:999, marginBottom:"1.25rem" }}>
        <div style={{ height:"100%", width:`${pct}%`, background:`linear-gradient(90deg,${C.blue},${C.red})`, borderRadius:999, transition:"width 0.4s ease" }}/>
      </div>

      {/* Card */}
      <FlashCard card={current} flipped={flipped} onFlip={()=>setFlipped(f=>!f)}/>

      {/* Answer buttons — only show after flip */}
      <div style={{ marginTop:"1.1rem", display:"flex", gap:"0.75rem", opacity: flipped?1:0, transition:"opacity 0.3s", pointerEvents: flipped?"auto":"none" }}>
        <button onClick={()=>answer(false)}
          style={{ flex:1, padding:"0.85rem", background:C.redL, border:`2px solid ${C.red}`, color:C.red, borderRadius:16, fontSize:"0.95rem", cursor:"pointer", fontWeight:700, fontFamily:"inherit", transition:"all 0.15s" }}
          onMouseEnter={e=>e.currentTarget.style.background=C.red+"; color: white"}
        >
          😅 Quên rồi
        </button>
        <button onClick={()=>answer(true)}
          style={{ flex:1, padding:"0.85rem", background:C.greenL, border:`2px solid ${C.green}`, color:C.green, borderRadius:16, fontSize:"0.95rem", cursor:"pointer", fontWeight:700, fontFamily:"inherit", transition:"all 0.15s" }}>
          😊 Nhớ rồi!
        </button>
      </div>

      {/* Interval info */}
      {flipped && (
        <div style={{ textAlign:"center", marginTop:"0.75rem", fontSize:"0.7rem", color:C.gray }}>
          Lần ôn tiếp: {intervalLabel(current.interval)} · lần {current.repetitions} ôn
        </div>
      )}
    </div>
  );

  // ── DONE ─────────────────────────────────────────────────
  if (mode === "done") return (
    <div style={{ padding:"1.5rem 1rem", display:"flex", flexDirection:"column", alignItems:"center", animation:"pop 0.4s ease" }}>
      <div style={{ fontSize:"3rem", marginBottom:"0.5rem" }}>🎉</div>
      <div style={{ fontFamily:"'Playfair Display',Georgia,serif", fontSize:"1.5rem", color:C.ink, fontWeight:700, marginBottom:"0.3rem" }}>Xong buổi ôn!</div>
      <div style={{ fontSize:"0.85rem", color:C.gray, marginBottom:"1.5rem" }}>Bạn đã ôn {queue.length} từ hôm nay</div>

      {/* Result stats */}
      <div style={{ display:"flex", gap:"1rem", marginBottom:"1.5rem" }}>
        <div style={{ textAlign:"center", background:C.greenL, border:`2px solid ${C.green}`, borderRadius:16, padding:"0.9rem 1.5rem" }}>
          <div style={{ fontFamily:"'Playfair Display',Georgia,serif", fontSize:"2rem", color:C.green, fontWeight:700 }}>{session.correct}</div>
          <div style={{ fontSize:"0.72rem", color:C.green, fontWeight:600 }}>Nhớ 😊</div>
        </div>
        <div style={{ textAlign:"center", background:C.redL, border:`2px solid ${C.red}`, borderRadius:16, padding:"0.9rem 1.5rem" }}>
          <div style={{ fontFamily:"'Playfair Display',Georgia,serif", fontSize:"2rem", color:C.red, fontWeight:700 }}>{session.wrong}</div>
          <div style={{ fontSize:"0.72rem", color:C.red, fontWeight:600 }}>Quên 😅</div>
        </div>
      </div>

      {/* Accuracy */}
      {queue.length > 0 && (
        <div style={{ width:"100%", background:C.white, border:`1.5px solid ${C.border}`, borderRadius:16, padding:"0.9rem 1rem", marginBottom:"1rem" }}>
          <div style={{ display:"flex", justifyContent:"space-between", marginBottom:"0.5rem" }}>
            <span style={{ fontSize:"0.8rem", color:C.gray }}>Độ chính xác</span>
            <span style={{ fontSize:"0.8rem", fontWeight:700, color: session.correct/queue.length>=0.8?C.green:C.gold }}>
              {Math.round(session.correct/queue.length*100)}%
            </span>
          </div>
          <div style={{ height:6, background:C.border, borderRadius:999 }}>
            <div style={{ height:"100%", width:`${Math.round(session.correct/queue.length*100)}%`, background: session.correct/queue.length>=0.8?C.green:C.gold, borderRadius:999 }}/>
          </div>
        </div>
      )}

      {/* Wrong words recap */}
      {session.cards.filter(c=>!c.correct).length > 0 && (
        <div style={{ width:"100%", background:C.redL, border:`1.5px solid ${C.red}33`, borderRadius:16, padding:"0.9rem 1rem", marginBottom:"1rem" }}>
          <div style={{ fontSize:"0.75rem", fontWeight:700, color:C.red, marginBottom:"0.5rem" }}>Từ cần ôn thêm:</div>
          <div style={{ display:"flex", flexWrap:"wrap", gap:"0.3rem" }}>
            {session.cards.filter(c=>!c.correct).map((c,i)=>(
              <span key={i} style={{ background:"#fff", border:`1px solid ${C.red}44`, borderRadius:20, padding:"0.15rem 0.55rem", fontSize:"0.75rem", color:C.red, fontWeight:500 }}>{c.fr}</span>
            ))}
          </div>
        </div>
      )}

      <div style={{ display:"flex", gap:"0.6rem", width:"100%" }}>
        {stats.due > 0 && (
          <button onClick={startReview}
            style={{ flex:1, padding:"0.8rem", background:C.blue, color:"#fff", border:"none", borderRadius:12, fontFamily:"'Playfair Display',Georgia,serif", fontSize:"0.9rem", cursor:"pointer", fontWeight:700 }}>
            Ôn tiếp ({stats.due}) →
          </button>
        )}
        <button onClick={()=>setMode("home")}
          style={{ flex:1, padding:"0.8rem", background:"transparent", color:C.blue, border:`1.5px solid ${C.blue}`, borderRadius:12, fontSize:"0.9rem", cursor:"pointer", fontWeight:600 }}>
          Về tổng quan
        </button>
      </div>
    </div>
  );

  // ── MANAGE ───────────────────────────────────────────────
  if (mode === "manage") return (
    <div style={{ padding:"1rem", animation:"fadeUp 0.3s ease" }}>
      {toast && <div style={{ position:"fixed",top:20,left:"50%",transform:"translateX(-50%)",background:C.ink,color:"#fff",padding:"0.5rem 1.2rem",borderRadius:24,fontSize:"0.8rem",zIndex:400 }}>{toast}</div>}
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:"0.9rem" }}>
        <button onClick={()=>setMode("home")} style={{ background:C.blueL, border:"none", color:C.blue, cursor:"pointer", fontSize:"0.82rem", padding:"0.3rem 0.65rem", borderRadius:10, fontWeight:600 }}>← Quay lại</button>
        <div style={{ fontSize:"0.78rem", fontWeight:700, color:C.ink }}>⚙️ Quản lý thẻ</div>
        <button onClick={()=>{ if(window.confirm("Xóa toàn bộ thẻ SRS?")){resetSRS();refreshStats();setMode("home");} }}
          style={{ background:"transparent", border:`1px solid ${C.red}`, color:C.red, borderRadius:8, padding:"0.25rem 0.55rem", fontSize:"0.7rem", cursor:"pointer" }}>
          Xóa tất cả
        </button>
      </div>
      <div style={{ display:"flex", flexDirection:"column", gap:"0.4rem" }}>
        {allCards.sort((a,b)=>a.dueDate-b.dueDate).map((card,i)=>(
          <div key={i} style={{ background:C.white, border:`1.5px solid ${C.border}`, borderRadius:12, padding:"0.65rem 0.85rem", display:"flex", justifyContent:"space-between", alignItems:"center" }}>
            <div>
              <div style={{ fontFamily:"'Playfair Display',Georgia,serif", fontSize:"0.9rem", color:C.ink, fontWeight:600 }}>{card.fr}</div>
              <div style={{ fontSize:"0.7rem", color:C.gray }}>{card.vi} · ôn lần {card.repetitions} · {fmtDate(card.dueDate)}</div>
            </div>
            <div style={{ display:"flex", alignItems:"center", gap:"0.5rem" }}>
              <span style={{ fontSize:"0.65rem", background: card.interval>=21?C.greenL:card.interval>=7?C.blueL:C.redL, color: card.interval>=21?C.green:card.interval>=7?C.blue:C.red, padding:"0.1rem 0.45rem", borderRadius:20, fontWeight:600 }}>
                {intervalLabel(card.interval)}
              </span>
              <button onClick={()=>{ removeFromSRS(card.fr); refreshStats(); showToast("Đã xóa"); }}
                style={{ background:"none", border:"none", color:C.gray, cursor:"pointer", fontSize:"0.85rem" }}>×</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
