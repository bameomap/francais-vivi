import { useState, useCallback } from "react";
import { C } from "../constants.js";
import { speak } from "../utils/helpers.js";
import WordCardBack from "./ui/WordCardBack.jsx";
import {
  getDueCards, getAllCards, getSRSStats,
  updateSRSCardRating, ratingIntervalLabel,
  addWordsToSRS, removeFromSRS, resetSRS,
} from "../utils/srs.js";
import { shuffleArray } from "../utils/helpers.js";

const PURPLE   = "#7C3AED";
const PURPLE_L = "#F5F0FF";

// ── Helpers ─────────────────────────────────────────────────────
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

// ── Rating bar ───────────────────────────────────────────────────
const RATINGS = [
  { id:0, label:"Lại",  emoji:"😵", bg:"#FEF2F2", border:"#FCA5A5", fg:"#DC2626" },
  { id:1, label:"Khó",  emoji:"😓", bg:"#FFFBEB", border:"#FCD34D", fg:"#D97706" },
  { id:2, label:"Tốt",  emoji:"😊", bg:"#F0FDF4", border:"#6EE7B7", fg:"#059669" },
  { id:3, label:"Dễ",   emoji:"😎", bg:"#EFF6FF", border:"#93C5FD", fg:"#2563EB" },
];

function RatingBar({ card, onRate }) {
  return (
    <div style={{ display:"flex", gap:"0.45rem" }}>
      {RATINGS.map(r => {
        const sub = card ? ratingIntervalLabel(card, r.id) : "";
        return (
          <button key={r.id} onClick={() => onRate(r.id)}
            style={{
              flex:1, padding:"0.65rem 0.2rem",
              background:r.bg, border:`1.5px solid ${r.border}`, color:r.fg,
              borderRadius:16, cursor:"pointer", fontFamily:"inherit",
              transition:"transform 0.1s, box-shadow 0.1s",
              boxShadow:`0 3px 10px ${r.border}55`,
              display:"flex", flexDirection:"column", alignItems:"center", gap:2,
            }}
            onPointerDown={e => { e.currentTarget.style.transform="scale(0.93)"; }}
            onPointerUp={e =>   { e.currentTarget.style.transform="scale(1)"; }}
          >
            <span style={{ fontSize:"1.1rem" }}>{r.emoji}</span>
            <span style={{ fontSize:"0.82rem", fontWeight:800 }}>{r.label}</span>
            <span style={{ fontSize:"0.58rem", opacity:0.8 }}>{sub}</span>
          </button>
        );
      })}
    </div>
  );
}

// ── Flip card ────────────────────────────────────────────────────
function FlipCard({ card, flipped, onFlip }) {
  return (
    <div onClick={onFlip}
      style={{ perspective:"1200px", cursor:"pointer", userSelect:"none", minHeight:230 }}>
      <div style={{
        position:"relative", width:"100%", minHeight:230,
        transformStyle:"preserve-3d",
        transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
        transition:"transform 0.42s cubic-bezier(0.4,0,0.2,1)",
      }}>

        {/* Front — French word */}
        <div style={{
          position:"absolute", inset:0, backfaceVisibility:"hidden", WebkitBackfaceVisibility:"hidden",
          background:`linear-gradient(135deg, ${PURPLE}, #9F67FF)`,
          borderRadius:22, padding:"1.5rem",
          display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", gap:"0.5rem",
          boxShadow:`0 8px 32px ${PURPLE}44`,
        }}>
          {/* Watermark */}
          <div style={{ position:"absolute", inset:0, display:"flex", alignItems:"center", justifyContent:"center", pointerEvents:"none", overflow:"hidden", borderRadius:22 }}>
            <span style={{ fontSize:"88px", fontFamily:"'Playfair Display',Georgia,serif", color:"rgba(255,255,255,0.06)", fontWeight:700, whiteSpace:"nowrap" }}>{card.fr}</span>
          </div>

          {card.repetitions === 0 && (
            <div style={{ position:"absolute", top:14, left:14, fontSize:"0.58rem", color:"rgba(255,255,255,0.9)", background:"rgba(255,255,255,0.2)", borderRadius:20, padding:"0.1rem 0.5rem", fontWeight:700 }}>
              Mới
            </div>
          )}
          {card.interval >= 7 && (
            <div style={{ position:"absolute", top:14, right:14, fontSize:"0.58rem", color:"rgba(255,255,255,0.9)", background:"rgba(255,255,255,0.2)", borderRadius:20, padding:"0.1rem 0.5rem", fontWeight:700 }}>
              ⭐ {intervalLabel(card.interval)}
            </div>
          )}

          <div style={{ fontSize:"0.6rem", color:"rgba(255,255,255,0.7)", textTransform:"uppercase", letterSpacing:2 }}>🇫🇷 Tiếng Pháp</div>
          <div style={{ fontFamily:"'Playfair Display',Georgia,serif", fontSize:"2.4rem", color:"#fff", fontWeight:700, textAlign:"center", lineHeight:1.15 }}>
            {card.fr}
          </div>
          <button onClick={e => { e.stopPropagation(); speak(card.fr); }}
            style={{ background:"rgba(255,255,255,0.22)", border:"1.5px solid rgba(255,255,255,0.4)", color:"#fff", borderRadius:20, padding:"0.28rem 0.85rem", fontSize:"0.78rem", cursor:"pointer", fontWeight:600 }}>
            🔊 Nghe
          </button>
          <div style={{ position:"absolute", bottom:14, fontSize:"0.62rem", color:"rgba(255,255,255,0.55)" }}>
            Nhấn để xem nghĩa ↕
          </div>
        </div>

        {/* Back — meaning */}
        <div style={{
          position:"absolute", inset:0, backfaceVisibility:"hidden", WebkitBackfaceVisibility:"hidden",
          transform:"rotateY(180deg)",
          background:C.white, borderRadius:22,
          boxShadow:"0 6px 28px rgba(0,0,0,0.09)", border:`1.5px solid ${C.border}`,
          overflow:"hidden",
        }}>
          <WordCardBack word={card} />
        </div>
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════
export default function SRSPanel({ currentWords = [] }) {
  const [mode,      setMode]      = useState("home");
  const [queue,     setQueue]     = useState([]);
  const [idx,       setIdx]       = useState(0);
  const [flipped,   setFlipped]   = useState(false);
  const [session,   setSession]   = useState({ correct:0, wrong:0, cards:[] });
  const [stats,     setStats]     = useState(getSRSStats());
  const [allCards,  setAllCards]  = useState(getAllCards());
  const [toast,     setToast]     = useState("");

  const refreshStats = () => { setStats(getSRSStats()); setAllCards(getAllCards()); };
  const showToast = msg => { setToast(msg); setTimeout(() => setToast(""), 2200); };

  const startReview = () => {
    const due = shuffleArray(getDueCards());
    if (!due.length) { showToast("Không có từ nào cần ôn!"); return; }
    setQueue(due); setIdx(0); setFlipped(false);
    setSession({ correct:0, wrong:0, cards:[] });
    setMode("review");
  };

  const answer = useCallback((rating) => {
    const card = queue[idx];
    updateSRSCardRating(card.fr, rating);
    const isCorrect = rating >= 2;
    const newSession = {
      correct: session.correct + (isCorrect ? 1 : 0),
      wrong:   session.wrong   + (isCorrect ? 0 : 1),
      cards:   [...session.cards, { ...card, correct: isCorrect, rating }],
    };
    setSession(newSession);

    if (rating === 0) {
      const next = [...queue];
      const [c] = next.splice(idx, 1);
      next.push(c);
      setQueue(next);
      setIdx(i => Math.min(i, next.length - 1));
      setFlipped(false);
    } else if (idx + 1 >= queue.length) {
      refreshStats();
      setMode("done");
    } else {
      setIdx(i => i + 1);
      setFlipped(false);
    }
  }, [queue, idx, session]);

  const addCurrentWords = () => {
    if (!currentWords.length) { showToast("Chưa có từ vựng nào!"); return; }
    const added = addWordsToSRS(currentWords);
    refreshStats();
    showToast(added > 0 ? `✓ Đã thêm ${added} từ mới!` : "Tất cả từ đã có rồi!");
  };

  const current = queue[idx];
  const reviewed = session.cards.filter(c => c.rating !== 0).length;
  const pct = queue.length ? Math.round((reviewed / queue.length) * 100) : 0;

  // ════════════════════════════════════════════════════════════════
  // HOME
  // ════════════════════════════════════════════════════════════════
  if (mode === "home") return (
    <div style={{ padding:"1rem", animation:"fadeUp 0.3s ease" }}>
      {toast && (
        <div style={{ position:"fixed",top:20,left:"50%",transform:"translateX(-50%)",background:C.ink,color:"#fff",padding:"0.5rem 1.2rem",borderRadius:24,fontSize:"0.8rem",zIndex:400,animation:"pop 0.3s ease" }}>
          {toast}
        </div>
      )}

      {/* Hero card */}
      <div style={{ background:`linear-gradient(135deg, ${PURPLE}, #9F67FF)`, borderRadius:22, padding:"1.4rem", color:"#fff", marginBottom:"1rem", boxShadow:`0 8px 30px ${PURPLE}44` }}>
        <div style={{ fontSize:"0.6rem", textTransform:"uppercase", letterSpacing:2, opacity:0.8, marginBottom:"0.3rem" }}>SPACED REPETITION</div>
        <div style={{ fontFamily:"'Playfair Display',Georgia,serif", fontSize:"1.4rem", fontWeight:700, marginBottom:"1rem" }}>🧠 Thẻ ôn tập</div>
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:"0.5rem", marginBottom:"1rem" }}>
          {[
            { label:"Tổng thẻ", val:stats.total,   icon:"📚" },
            { label:"Cần ôn",   val:stats.due,     icon:"⏰" },
            { label:"Thành thạo",val:stats.mastered,icon:"⭐" },
          ].map((s, i) => (
            <div key={i} style={{ background:"rgba(255,255,255,0.18)", borderRadius:14, padding:"0.65rem 0.5rem", textAlign:"center" }}>
              <div style={{ fontSize:"1rem", marginBottom:"0.15rem" }}>{s.icon}</div>
              <div style={{ fontFamily:"'Playfair Display',Georgia,serif", fontSize:"1.3rem", fontWeight:700 }}>{s.val}</div>
              <div style={{ fontSize:"0.6rem", opacity:0.85 }}>{s.label}</div>
            </div>
          ))}
        </div>
        <button onClick={startReview} disabled={stats.due === 0}
          style={{ width:"100%", padding:"0.8rem", background: stats.due > 0 ? "#fff" : "rgba(255,255,255,0.3)", color: stats.due > 0 ? PURPLE : "rgba(255,255,255,0.6)", border:"none", borderRadius:12, fontFamily:"'Playfair Display',Georgia,serif", fontSize:"0.95rem", cursor: stats.due > 0 ? "pointer" : "default", fontWeight:700, transition:"all 0.2s" }}>
          {stats.due > 0 ? `Ôn ${stats.due} từ ngay →` : "✓ Không có từ cần ôn!"}
        </button>
      </div>

      {/* Add current words */}
      {currentWords.length > 0 && (
        <div style={{ background:C.white, border:`1.5px solid ${C.border}`, borderRadius:16, padding:"0.9rem 1rem", marginBottom:"0.75rem", display:"flex", justifyContent:"space-between", alignItems:"center" }}>
          <div>
            <div style={{ fontSize:"0.85rem", fontWeight:700, color:C.ink }}>📝 Từ vựng hiện tại</div>
            <div style={{ fontSize:"0.7rem", color:C.gray, marginTop:"0.15rem" }}>{currentWords.length} từ · thêm vào thẻ SRS</div>
          </div>
          <button onClick={addCurrentWords}
            style={{ padding:"0.45rem 1rem", background:PURPLE, color:"#fff", border:"none", borderRadius:20, fontSize:"0.78rem", cursor:"pointer", fontWeight:600 }}>
            + Thêm
          </button>
        </div>
      )}

      {/* Schedule */}
      <div style={{ background:C.white, border:`1.5px solid ${C.border}`, borderRadius:16, padding:"1rem", marginBottom:"0.75rem" }}>
        <div style={{ fontSize:"0.78rem", fontWeight:700, color:C.ink, marginBottom:"0.65rem" }}>📅 Lịch ôn sắp tới</div>
        {[
          { label:"Hôm nay",  val:stats.today, color:"#DC2626" },
          { label:"Tuần này", val:stats.week,  color:PURPLE     },
          { label:"Tổng",     val:stats.total, color:C.gray     },
        ].map((r, i) => (
          <div key={i} style={{ display:"flex", justifyContent:"space-between", alignItems:"center", padding:"0.4rem 0", borderBottom: i < 2 ? `1px solid ${C.border}` : "none" }}>
            <span style={{ fontSize:"0.82rem", color:C.gray }}>{r.label}</span>
            <span style={{ fontFamily:"'Playfair Display',Georgia,serif", fontSize:"1rem", color:r.color, fontWeight:700 }}>{r.val} từ</span>
          </div>
        ))}
      </div>

      {stats.total > 0 && (
        <button onClick={() => setMode("manage")}
          style={{ width:"100%", padding:"0.7rem", background:"transparent", border:`1.5px solid ${C.border}`, color:C.gray, borderRadius:12, fontSize:"0.8rem", cursor:"pointer" }}>
          ⚙️ Quản lý thẻ ({stats.total} từ)
        </button>
      )}
    </div>
  );

  // ════════════════════════════════════════════════════════════════
  // REVIEW
  // ════════════════════════════════════════════════════════════════
  if (mode === "review") return (
    <div style={{ padding:"0 0 1rem", animation:"fadeUp 0.3s ease" }}>

      {/* Progress */}
      <div style={{ padding:"0.75rem 1rem 0" }}>
        <div style={{ display:"flex", gap:3, marginBottom:4 }}>
          {queue.map((_, i) => (
            <div key={i} style={{ flex:1, height:3, borderRadius:99, background: i < idx ? PURPLE : i === idx ? `${PURPLE}88` : C.border, transition:"background 0.3s" }}/>
          ))}
        </div>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
          <button onClick={() => setMode("home")}
            style={{ background:"transparent", border:"none", color:C.gray, cursor:"pointer", fontSize:"0.72rem", padding:0, fontWeight:600 }}>
            ← Dừng
          </button>
          <span style={{ fontSize:"0.62rem", color:C.gray }}>
            {idx+1}/{queue.length} · <span style={{ color:"#059669" }}>✓{session.correct}</span> · <span style={{ color:"#DC2626" }}>✗{session.wrong}</span>
          </span>
        </div>
      </div>

      {/* Card */}
      {current && (
        <div style={{ padding:"0.75rem 1rem 0" }}>
          <FlipCard card={current} flipped={flipped} onFlip={() => setFlipped(f => !f)} key={`${current.fr}-${idx}`} />
        </div>
      )}

      {/* Rating buttons */}
      {current && (
        <div style={{ padding:"0.75rem 1rem 0" }}>
          {!flipped && (
            <div style={{ textAlign:"center", marginBottom:"0.6rem" }}>
              <button onClick={() => setFlipped(true)}
                style={{ padding:"0.55rem 1.5rem", background:PURPLE, color:"#fff", border:"none", borderRadius:20, fontSize:"0.82rem", cursor:"pointer", fontWeight:700, boxShadow:`0 4px 14px ${PURPLE}44` }}>
                Xem nghĩa →
              </button>
            </div>
          )}
          {flipped && <RatingBar card={current} onRate={answer} />}
        </div>
      )}
    </div>
  );

  // ════════════════════════════════════════════════════════════════
  // DONE
  // ════════════════════════════════════════════════════════════════
  if (mode === "done") return (
    <div style={{ padding:"1.5rem 1rem", animation:"fadeUp 0.3s ease" }}>
      <div style={{ textAlign:"center", marginBottom:"1.25rem" }}>
        <div style={{ width:72, height:72, borderRadius:"50%", background:PURPLE_L, display:"flex", alignItems:"center", justifyContent:"center", fontSize:"2.5rem", margin:"0 auto 0.75rem" }}>
          {session.correct / Math.max(session.cards.length, 1) >= 0.8 ? "🎉" : "💪"}
        </div>
        <div style={{ fontFamily:"'Playfair Display',Georgia,serif", fontSize:"1.6rem", color:C.ink, fontWeight:700 }}>
          {session.correct}/{session.cards.length}
        </div>
        <div style={{ fontSize:"0.82rem", color:PURPLE, fontWeight:600, marginTop:2 }}>
          {session.cards.length > 0 ? Math.round(session.correct / session.cards.length * 100) : 0}% · Xong buổi ôn!
        </div>
      </div>

      {/* Score breakdown */}
      <div style={{ display:"flex", gap:"0.5rem", marginBottom:"1rem" }}>
        <div style={{ flex:1, background:"#F0FDF4", border:"1.5px solid #6EE7B7", borderRadius:16, padding:"0.85rem", textAlign:"center" }}>
          <div style={{ fontFamily:"'Playfair Display',Georgia,serif", fontSize:"1.8rem", color:"#059669", fontWeight:700 }}>{session.correct}</div>
          <div style={{ fontSize:"0.68rem", color:"#059669", fontWeight:600 }}>Tốt + Dễ</div>
        </div>
        <div style={{ flex:1, background:"#FEF2F2", border:"1.5px solid #FCA5A5", borderRadius:16, padding:"0.85rem", textAlign:"center" }}>
          <div style={{ fontFamily:"'Playfair Display',Georgia,serif", fontSize:"1.8rem", color:"#DC2626", fontWeight:700 }}>{session.wrong}</div>
          <div style={{ fontSize:"0.68rem", color:"#DC2626", fontWeight:600 }}>Lại + Khó</div>
        </div>
      </div>

      <div style={{ display:"flex", gap:"0.5rem" }}>
        {stats.due > 0 && (
          <button onClick={startReview}
            style={{ flex:1, padding:"0.8rem", background:PURPLE, color:"#fff", border:"none", borderRadius:14, fontFamily:"'Playfair Display',Georgia,serif", fontSize:"0.9rem", cursor:"pointer", fontWeight:700 }}>
            Ôn tiếp ({stats.due}) →
          </button>
        )}
        <button onClick={() => setMode("home")}
          style={{ flex:1, padding:"0.8rem", background:"transparent", color:PURPLE, border:`1.5px solid ${PURPLE}`, borderRadius:14, fontSize:"0.9rem", cursor:"pointer", fontWeight:600 }}>
          Về tổng quan
        </button>
      </div>
    </div>
  );

  // ════════════════════════════════════════════════════════════════
  // MANAGE
  // ════════════════════════════════════════════════════════════════
  if (mode === "manage") return (
    <div style={{ padding:"1rem", animation:"fadeUp 0.3s ease" }}>
      {toast && (
        <div style={{ position:"fixed",top:20,left:"50%",transform:"translateX(-50%)",background:C.ink,color:"#fff",padding:"0.5rem 1.2rem",borderRadius:24,fontSize:"0.8rem",zIndex:400 }}>
          {toast}
        </div>
      )}
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:"0.9rem" }}>
        <button onClick={() => setMode("home")}
          style={{ background:PURPLE_L, border:"none", color:PURPLE, cursor:"pointer", fontSize:"0.82rem", padding:"0.3rem 0.65rem", borderRadius:10, fontWeight:600 }}>
          ← Quay lại
        </button>
        <div style={{ fontSize:"0.78rem", fontWeight:700, color:C.ink }}>⚙️ Quản lý thẻ</div>
        <button onClick={() => { if (window.confirm("Xóa toàn bộ thẻ SRS?")) { resetSRS(); refreshStats(); setMode("home"); } }}
          style={{ background:"transparent", border:`1px solid #DC2626`, color:"#DC2626", borderRadius:8, padding:"0.25rem 0.55rem", fontSize:"0.7rem", cursor:"pointer" }}>
          Xóa tất cả
        </button>
      </div>
      <div style={{ display:"flex", flexDirection:"column", gap:"0.4rem" }}>
        {allCards.sort((a, b) => a.dueDate - b.dueDate).map((card, i) => (
          <div key={i} style={{ background:C.white, border:`1.5px solid ${C.border}`, borderRadius:12, padding:"0.65rem 0.85rem", display:"flex", justifyContent:"space-between", alignItems:"center" }}>
            <div>
              <div style={{ fontFamily:"'Playfair Display',Georgia,serif", fontSize:"0.9rem", color:C.ink, fontWeight:600 }}>{card.fr}</div>
              <div style={{ fontSize:"0.7rem", color:C.gray }}>{card.vi} · ôn lần {card.repetitions} · {fmtDate(card.dueDate)}</div>
            </div>
            <div style={{ display:"flex", alignItems:"center", gap:"0.5rem" }}>
              <span style={{ fontSize:"0.62rem", background: card.interval>=21 ? "#F0FDF4" : card.interval>=7 ? PURPLE_L : "#FEF2F2", color: card.interval>=21 ? "#059669" : card.interval>=7 ? PURPLE : "#DC2626", padding:"0.1rem 0.45rem", borderRadius:20, fontWeight:600 }}>
                {intervalLabel(card.interval)}
              </span>
              <button onClick={() => { removeFromSRS(card.fr); refreshStats(); showToast("Đã xóa"); }}
                style={{ background:"none", border:"none", color:C.gray, cursor:"pointer", fontSize:"0.85rem" }}>
                ×
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
