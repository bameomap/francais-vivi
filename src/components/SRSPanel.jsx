import { useState, useEffect, useCallback } from "react";
import { C } from "../constants.js";
import { speak } from "../utils/helpers.js";
import { callAIText } from "../utils/api.js";
import SpeakBtn from "./ui/SpeakBtn.jsx";
import Spinner from "./ui/Spinner.jsx";
import {
  getDueCards, getAllCards, getSRSStats,
  updateSRSCardRating, ratingIntervalLabel,
  addWordsToSRS, removeFromSRS, resetSRS,
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

// ── 4-button rating bar (always visible) ─────────────────────
const RATING_CONFIG = [
  { id:0, label:"Lại",  bg:"#EF4444", fg:"#fff",     border:"#EF4444" },
  { id:1, label:"Khó",  bg:"#FEF3C7", fg:"#D97706",  border:"#F59E0B" },
  { id:2, label:"Tốt",  bg:"#D1FAE5", fg:"#059669",  border:"#10B981" },
  { id:3, label:"Dễ",   bg:"#DBEAFE", fg:"#2563EB",  border:"#3B82F6" },
];

function RatingBar({ card, onRate }) {
  return (
    <div style={{ display:"flex", gap:"0.5rem" }}>
      {RATING_CONFIG.map(r => {
        const sub = card ? ratingIntervalLabel(card, r.id) : "";
        return (
          <button key={r.id} onClick={() => onRate(r.id)}
            style={{
              flex:1, padding:"0.6rem 0.2rem",
              background:r.bg, border:`1.5px solid ${r.border}`, color:r.fg,
              borderRadius:16, cursor:"pointer", fontFamily:"inherit",
              transition:"transform 0.1s, box-shadow 0.1s",
              boxShadow:`0 2px 8px ${r.border}33`,
            }}
            onPointerDown={e => { e.currentTarget.style.transform="scale(0.93)"; e.currentTarget.style.boxShadow="none"; }}
            onPointerUp={e =>   { e.currentTarget.style.transform="scale(1)";    e.currentTarget.style.boxShadow=`0 2px 8px ${r.border}33`; }}
          >
            <div style={{ fontSize:"0.9rem", fontWeight:800 }}>{r.label}</div>
            <div style={{ fontSize:"0.6rem", fontWeight:500, marginTop:"0.12rem", opacity:0.85 }}>{sub}</div>
          </button>
        );
      })}
    </div>
  );
}

// ── Word detail card (shown on back after flip) ───────────────
function CardBack({ card }) {
  const [details, setDetails] = useState(() => {
    try { return JSON.parse(localStorage.getItem(`srs_det_${card.fr}`)) || null; } catch { return null; }
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (details) return;
    setLoading(true);
    callAIText(
      [{ role:"user", content:
        `Từ tiếng Pháp: "${card.fr}" (nghĩa: ${card.vi || "?"}).\n` +
        `Trả lời đúng 5 dòng, không thêm gì khác:\n` +
        `POS: <loại từ ngắn: Danh từ / Động từ / Tính từ / ...>\n` +
        `IPA: <phiên âm IPA>\n` +
        `DEF: <định nghĩa 1 câu tiếng Việt>\n` +
        `EX_FR: <1 câu ví dụ ngắn tiếng Pháp>\n` +
        `EX_VI: <dịch tiếng Việt>`
      }],
      "Giáo viên tiếng Pháp. Chỉ trả lời đúng 5 dòng format."
    ).then(text => {
      const get = tag => text.match(new RegExp(`^${tag}:\\s*(.+)`, "m"))?.[1]?.trim() || "";
      const result = { pos:get("POS"), ipa:get("IPA"), def:get("DEF"), ex_fr:get("EX_FR"), ex_vi:get("EX_VI") };
      localStorage.setItem(`srs_det_${card.fr}`, JSON.stringify(result));
      setDetails(result);
    }).catch(() => {}).finally(() => setLoading(false));
  }, [card.fr]);

  return (
    <div style={{ width:"100%", height:"100%", display:"flex", flexDirection:"column", alignItems:"flex-start", justifyContent:"center", padding:"1.4rem 1.5rem", gap:"0.55rem" }}>
      {/* Word + POS tag */}
      <div style={{ display:"flex", alignItems:"center", gap:"0.6rem", flexWrap:"wrap" }}>
        <span style={{ fontFamily:"'Playfair Display',Georgia,serif", fontSize:"1.9rem", color:C.ink, fontWeight:700, lineHeight:1 }}>
          {card.fr}
        </span>
        {details?.pos && (
          <span style={{ background:C.blue, color:"#fff", fontSize:"0.66rem", fontWeight:700, padding:"0.18rem 0.6rem", borderRadius:20 }}>
            {details.pos}
          </span>
        )}
      </div>

      {/* Vietnamese translation */}
      <div style={{ fontFamily:"'Playfair Display',Georgia,serif", fontSize:"1.15rem", color:C.blue, fontWeight:600 }}>
        {card.vi || "—"}
      </div>

      {/* IPA + speak */}
      <div style={{ display:"flex", alignItems:"center", gap:"0.5rem" }}>
        {details?.ipa
          ? <span style={{ fontFamily:"'Courier New',monospace", fontSize:"0.82rem", color:"#6D28D9", background:"#F5F0FF", borderRadius:8, padding:"0.15rem 0.5rem" }}>/{details.ipa}/</span>
          : null
        }
        <SpeakBtn text={card.fr} />
      </div>

      {/* Definition */}
      {loading
        ? <div style={{ display:"flex", alignItems:"center", gap:"0.4rem" }}><Spinner size={13}/><span style={{ fontSize:"0.7rem", color:C.gray }}>Đang tải…</span></div>
        : details?.def
          ? <div style={{ fontSize:"0.8rem", color:C.gray, lineHeight:1.6 }}>{details.def}</div>
          : null
      }

      {/* Example */}
      {details?.ex_fr && (
        <div style={{ background:"#FFFBEB", borderRadius:12, padding:"0.6rem 0.85rem", border:"1px solid #FDE68A", width:"100%", boxSizing:"border-box" }}>
          <div style={{ fontSize:"0.6rem", textTransform:"uppercase", letterSpacing:1.5, color:"#D97706", fontWeight:700, marginBottom:"0.3rem" }}>✦ Ví dụ</div>
          <div style={{ fontSize:"0.8rem", color:C.ink, fontStyle:"italic", lineHeight:1.55, marginBottom:"0.2rem" }}>{details.ex_fr}</div>
          <div style={{ fontSize:"0.72rem", color:C.gray }}>↳ {details.ex_vi}</div>
        </div>
      )}
    </div>
  );
}

// ── Flip card ────────────────────────────────────────────────
function FlipCard({ card, flipped, onFlip }) {
  return (
    <div onClick={onFlip}
      style={{ perspective:"1200px", cursor:"pointer", userSelect:"none", minHeight:220 }}>
      <div style={{
        position:"relative", width:"100%", minHeight:220,
        transformStyle:"preserve-3d",
        transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
        transition:"transform 0.42s cubic-bezier(0.4,0,0.2,1)",
      }}>

        {/* Front — French word */}
        <div style={{
          position:"absolute", inset:0, backfaceVisibility:"hidden", WebkitBackfaceVisibility:"hidden",
          background:`linear-gradient(135deg,${C.blue}ee,${C.blueDark})`,
          borderRadius:22, padding:"1.5rem",
          display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", gap:"0.5rem",
          boxShadow:`0 6px 28px ${C.blue}44`,
        }}>
          <div style={{ fontSize:"0.6rem", color:"rgba(255,255,255,0.7)", textTransform:"uppercase", letterSpacing:2 }}>🇫🇷 Tiếng Pháp</div>
          <div style={{ fontFamily:"'Playfair Display',Georgia,serif", fontSize:"2.2rem", color:"#fff", fontWeight:700, textAlign:"center", lineHeight:1.2 }}>
            {card.fr}
          </div>
          <button onClick={e=>{ e.stopPropagation(); speak(card.fr); }}
            style={{ background:"rgba(255,255,255,0.22)", border:"none", color:"#fff", borderRadius:20, padding:"0.28rem 0.85rem", fontSize:"0.78rem", cursor:"pointer" }}>
            🔊 Nghe
          </button>
          <div style={{ position:"absolute", bottom:14, fontSize:"0.65rem", color:"rgba(255,255,255,0.55)" }}>
            Nhấn để xem nghĩa ↕
          </div>
          {card.repetitions === 0 && (
            <div style={{ position:"absolute", top:12, left:14, fontSize:"0.58rem", color:"rgba(255,255,255,0.8)", background:"rgba(255,255,255,0.15)", borderRadius:20, padding:"0.1rem 0.45rem", fontWeight:600 }}>
              Mới
            </div>
          )}
        </div>

        {/* Back — word details */}
        <div style={{
          position:"absolute", inset:0, backfaceVisibility:"hidden", WebkitBackfaceVisibility:"hidden",
          transform:"rotateY(180deg)",
          background:C.white, borderRadius:22,
          boxShadow:"0 6px 28px rgba(0,0,0,0.09)", border:`1.5px solid ${C.border}`,
          overflow:"hidden",
        }}>
          <CardBack card={card} />
        </div>
      </div>
    </div>
  );
}

// ── Main SRS Panel ───────────────────────────────────────────
export default function SRSPanel({ currentWords = [] }) {
  const [mode, setMode]         = useState("home");
  const [queue, setQueue]       = useState([]);
  const [idx, setIdx]           = useState(0);
  const [flipped, setFlipped]   = useState(false);
  const [session, setSession]   = useState({ correct:0, wrong:0, cards:[] });
  const [stats, setStats]       = useState(getSRSStats());
  const [allCards, setAllCards] = useState(getAllCards());
  const [toast, setToast]       = useState("");

  const refreshStats = () => { setStats(getSRSStats()); setAllCards(getAllCards()); };
  const showToast = msg => { setToast(msg); setTimeout(()=>setToast(""),2200); };

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
      // "Lại" — move to end of queue
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

  // ── HOME ──────────────────────────────────────────────────
  if (mode === "home") return (
    <div style={{ padding:"1rem", animation:"fadeUp 0.3s ease" }}>
      {toast && <div style={{ position:"fixed",top:20,left:"50%",transform:"translateX(-50%)",background:C.ink,color:"#fff",padding:"0.5rem 1.2rem",borderRadius:24,fontSize:"0.8rem",zIndex:400,animation:"pop 0.3s ease" }}>{toast}</div>}
      <div style={{ background:`linear-gradient(135deg,${C.blue},${C.blueDark})`, borderRadius:22, padding:"1.4rem", color:"#fff", marginBottom:"1rem", boxShadow:`0 8px 30px ${C.blue}44` }}>
        <div style={{ fontSize:"0.65rem", textTransform:"uppercase", letterSpacing:2, opacity:0.8, marginBottom:"0.3rem" }}>SPACED REPETITION</div>
        <div style={{ fontFamily:"'Playfair Display',Georgia,serif", fontSize:"1.4rem", fontWeight:700, marginBottom:"1rem" }}>🧠 Thẻ ôn tập</div>
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:"0.5rem", marginBottom:"1rem" }}>
          {[{label:"Tổng thẻ",val:stats.total,icon:"📚"},{label:"Cần ôn",val:stats.due,icon:"⏰"},{label:"Thành thạo",val:stats.mastered,icon:"⭐"}].map((s,i)=>(
            <div key={i} style={{ background:"rgba(255,255,255,0.18)", borderRadius:14, padding:"0.65rem 0.5rem", textAlign:"center" }}>
              <div style={{ fontSize:"1rem", marginBottom:"0.15rem" }}>{s.icon}</div>
              <div style={{ fontFamily:"'Playfair Display',Georgia,serif", fontSize:"1.3rem", fontWeight:700 }}>{s.val}</div>
              <div style={{ fontSize:"0.62rem", opacity:0.85 }}>{s.label}</div>
            </div>
          ))}
        </div>
        <button onClick={startReview} disabled={stats.due===0}
          style={{ width:"100%", padding:"0.8rem", background:stats.due>0?"#fff":"rgba(255,255,255,0.3)", color:stats.due>0?C.blue:"rgba(255,255,255,0.6)", border:"none", borderRadius:12, fontFamily:"'Playfair Display',Georgia,serif", fontSize:"0.95rem", cursor:stats.due>0?"pointer":"default", fontWeight:700 }}>
          {stats.due > 0 ? `Ôn ${stats.due} từ ngay →` : "✓ Không có từ nào cần ôn!"}
        </button>
      </div>
      {currentWords.length > 0 && (
        <div style={{ background:C.white, border:`1.5px solid ${C.border}`, borderRadius:16, padding:"1rem", marginBottom:"0.75rem", display:"flex", justifyContent:"space-between", alignItems:"center" }}>
          <div>
            <div style={{ fontSize:"0.85rem", fontWeight:700, color:C.ink }}>📝 Từ vựng hiện tại</div>
            <div style={{ fontSize:"0.72rem", color:C.gray, marginTop:"0.15rem" }}>{currentWords.length} từ · thêm vào thẻ SRS</div>
          </div>
          <button onClick={addCurrentWords}
            style={{ padding:"0.45rem 1rem", background:C.blue, color:"#fff", border:"none", borderRadius:20, fontSize:"0.78rem", cursor:"pointer", fontWeight:600 }}>+ Thêm</button>
        </div>
      )}
      <div style={{ background:C.white, border:`1.5px solid ${C.border}`, borderRadius:16, padding:"1rem", marginBottom:"0.75rem" }}>
        <div style={{ fontSize:"0.78rem", fontWeight:700, color:C.ink, marginBottom:"0.65rem" }}>📅 Lịch ôn sắp tới</div>
        {[{label:"Hôm nay",val:stats.today,color:C.red},{label:"Tuần này",val:stats.week,color:C.blue},{label:"Tổng",val:stats.total,color:C.gray}].map((r,i)=>(
          <div key={i} style={{ display:"flex", justifyContent:"space-between", alignItems:"center", padding:"0.4rem 0", borderBottom:i<2?`1px solid ${C.border}`:"none" }}>
            <span style={{ fontSize:"0.82rem", color:C.gray }}>{r.label}</span>
            <span style={{ fontFamily:"'Playfair Display',Georgia,serif", fontSize:"1rem", color:r.color, fontWeight:700 }}>{r.val} từ</span>
          </div>
        ))}
      </div>
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
    <div style={{ padding:"1rem", animation:"fadeUp 0.3s ease", display:"flex", flexDirection:"column", gap:"0.9rem" }}>

      {/* Top bar */}
      <div style={{ display:"flex", alignItems:"center", gap:"0.75rem" }}>
        <button onClick={()=>setMode("home")}
          style={{ background:C.blueL, border:"none", color:C.blue, cursor:"pointer", fontSize:"0.82rem", padding:"0.3rem 0.65rem", borderRadius:10, fontWeight:600, flexShrink:0 }}>
          ← Dừng
        </button>
        <div style={{ flex:1 }}>
          <div style={{ display:"flex", justifyContent:"space-between", marginBottom:"0.28rem" }}>
            <span style={{ fontSize:"0.67rem", color:C.gray }}>{pct}% hoàn thành</span>
            <span style={{ fontSize:"0.67rem", color:C.gray }}>
              <span style={{ color:C.green }}>✓{session.correct}</span>
              {" · "}
              <span style={{ color:C.red }}>✗{session.wrong}</span>
              {" · "}
              {idx+1}/{queue.length}
            </span>
          </div>
          <div style={{ height:5, background:C.border, borderRadius:999 }}>
            <div style={{ height:"100%", width:`${pct}%`, background:`linear-gradient(90deg,${C.blue},${C.green})`, borderRadius:999, transition:"width 0.35s ease" }}/>
          </div>
        </div>
      </div>

      {/* Flip card */}
      {current && (
        <FlipCard card={current} flipped={flipped} onFlip={()=>setFlipped(f=>!f)} key={`${current.fr}-${idx}`} />
      )}

      {/* 4 rating buttons — always visible */}
      {current && <RatingBar card={current} onRate={answer} />}

      {/* "Mark as Mastered" shortcut for well-known cards */}
      {current && current.interval >= 7 && (
        <button onClick={() => answer(3)}
          style={{ background:"none", border:"none", color:C.green, fontSize:"0.78rem", cursor:"pointer", fontWeight:700, textAlign:"center", padding:"0.1rem" }}>
          ✅ Mark as Mastered
        </button>
      )}
    </div>
  );

  // ── DONE ─────────────────────────────────────────────────
  if (mode === "done") return (
    <div style={{ padding:"1.5rem 1rem", display:"flex", flexDirection:"column", alignItems:"center", animation:"pop 0.4s ease" }}>
      <div style={{ fontSize:"3rem", marginBottom:"0.5rem" }}>🎉</div>
      <div style={{ fontFamily:"'Playfair Display',Georgia,serif", fontSize:"1.5rem", color:C.ink, fontWeight:700, marginBottom:"0.3rem" }}>Xong buổi ôn!</div>
      <div style={{ fontSize:"0.85rem", color:C.gray, marginBottom:"1.5rem" }}>Bạn đã ôn {session.cards.length} từ hôm nay</div>
      <div style={{ display:"flex", gap:"1rem", marginBottom:"1.5rem" }}>
        <div style={{ textAlign:"center", background:C.greenL, border:`2px solid ${C.green}`, borderRadius:16, padding:"0.9rem 1.5rem" }}>
          <div style={{ fontFamily:"'Playfair Display',Georgia,serif", fontSize:"2rem", color:C.green, fontWeight:700 }}>{session.correct}</div>
          <div style={{ fontSize:"0.72rem", color:C.green, fontWeight:600 }}>Tốt + Dễ</div>
        </div>
        <div style={{ textAlign:"center", background:C.redL, border:`2px solid ${C.red}`, borderRadius:16, padding:"0.9rem 1.5rem" }}>
          <div style={{ fontFamily:"'Playfair Display',Georgia,serif", fontSize:"2rem", color:C.red, fontWeight:700 }}>{session.wrong}</div>
          <div style={{ fontSize:"0.72rem", color:C.red, fontWeight:600 }}>Lại + Khó</div>
        </div>
      </div>
      {session.cards.length > 0 && (
        <div style={{ width:"100%", background:C.white, border:`1.5px solid ${C.border}`, borderRadius:16, padding:"0.9rem 1rem", marginBottom:"1rem" }}>
          <div style={{ display:"flex", justifyContent:"space-between", marginBottom:"0.5rem" }}>
            <span style={{ fontSize:"0.8rem", color:C.gray }}>Độ chính xác</span>
            <span style={{ fontSize:"0.8rem", fontWeight:700, color:session.correct/session.cards.length>=0.8?C.green:C.gold }}>
              {Math.round(session.correct/session.cards.length*100)}%
            </span>
          </div>
          <div style={{ height:6, background:C.border, borderRadius:999 }}>
            <div style={{ height:"100%", width:`${Math.round(session.correct/session.cards.length*100)}%`, background:C.green, borderRadius:999 }}/>
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
          style={{ background:"transparent", border:`1px solid ${C.red}`, color:C.red, borderRadius:8, padding:"0.25rem 0.55rem", fontSize:"0.7rem", cursor:"pointer" }}>Xóa tất cả</button>
      </div>
      <div style={{ display:"flex", flexDirection:"column", gap:"0.4rem" }}>
        {allCards.sort((a,b)=>a.dueDate-b.dueDate).map((card,i)=>(
          <div key={i} style={{ background:C.white, border:`1.5px solid ${C.border}`, borderRadius:12, padding:"0.65rem 0.85rem", display:"flex", justifyContent:"space-between", alignItems:"center" }}>
            <div>
              <div style={{ fontFamily:"'Playfair Display',Georgia,serif", fontSize:"0.9rem", color:C.ink, fontWeight:600 }}>{card.fr}</div>
              <div style={{ fontSize:"0.7rem", color:C.gray }}>{card.vi} · ôn lần {card.repetitions} · {fmtDate(card.dueDate)}</div>
            </div>
            <div style={{ display:"flex", alignItems:"center", gap:"0.5rem" }}>
              <span style={{ fontSize:"0.65rem", background:card.interval>=21?C.greenL:card.interval>=7?C.blueL:C.redL, color:card.interval>=21?C.green:card.interval>=7?C.blue:C.red, padding:"0.1rem 0.45rem", borderRadius:20, fontWeight:600 }}>
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
