import { useState } from "react";
import { C } from "../constants.js";
import { getMistakes, clearMistake, clearAllMistakes } from "../utils/storage.js";
import { speak } from "../utils/helpers.js";
import SpeakBtn from "./ui/SpeakBtn.jsx";
import Minou from "./ui/Minou.jsx";

const MODULE_LABELS = {
  vocab:"Từ vựng", grammar:"Ngữ pháp", conversation:"Giao tiếp",
  writing:"Luyện viết", defi:"Thử thách", srs:"Ôn tập",
  lecture:"Đọc hiểu", dictee:"Nghe chép", unknown:"Khác",
};
const MODULE_COLORS = {
  vocab:"#4A90D9", grammar:"#7B6CF6", conversation:"#2980B9",
  writing:"#E67E22", defi:"#8E44AD", srs:"#0D9488",
  lecture:"#059669", dictee:"#0891B2", unknown:"#9CA3AF",
};

// ── Flashcard drill ───────────────────────────────────────────
function FlashDrill({ mistakes, onDone }) {
  const [idx,   setIdx]   = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [known,   setKnown]   = useState([]);   // ts of "đã nhớ"
  const [again,   setAgain]   = useState([]);   // ts of "chưa nhớ"

  const remaining = mistakes.filter(m => !known.includes(m.ts) && !again.includes(m.ts));
  const card = remaining[idx] || null;

  if (!card) {
    const total = mistakes.length;
    const pct = total > 0 ? Math.round(known.length / total * 100) : 100;
    return (
      <div style={{ padding:"1rem", textAlign:"center" }}>
        <Minou
          mood={pct>=80?"excited":pct>=60?"happy":"sad"}
          message={pct>=80?"Parfait! Nhớ hết rồi! 🎉":pct>=60?"Bien! Ôn thêm nhé 💪":"Tiếp tục ôn lại nhé~ 🐱"}
          size="md"
        />
        <div style={{ fontFamily:"'Playfair Display',Georgia,serif", fontSize:"1.8rem", color:pct>=80?"#059669":pct>=60?C.gold:C.red, fontWeight:700, marginTop:"0.8rem" }}>
          {known.length}/{total}
        </div>
        <div style={{ fontSize:"0.78rem", color:C.gray, marginTop:"0.2rem", marginBottom:"1.2rem" }}>đã nhớ</div>
        <div style={{ display:"flex", gap:"0.5rem", justifyContent:"center" }}>
          <button onClick={onDone}
            style={{ padding:"0.55rem 1.2rem", background:C.white, border:`1.5px solid ${C.border}`, color:C.ink, borderRadius:12, fontSize:"0.82rem", cursor:"pointer" }}>
            ← Về danh sách
          </button>
          {again.length > 0 && (
            <button onClick={() => { setIdx(0); setKnown([]); setAgain([]); setFlipped(false); }}
              style={{ padding:"0.55rem 1.2rem", background:C.blue, color:C.white, border:"none", borderRadius:12, fontSize:"0.82rem", cursor:"pointer", fontWeight:700 }}>
              🔄 Ôn lại {again.length} chưa nhớ
            </button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div style={{ padding:"1rem", display:"flex", flexDirection:"column", gap:"0.75rem" }}>
      {/* Progress */}
      <div style={{ display:"flex", justifyContent:"space-between", fontSize:"0.72rem", color:C.gray }}>
        <span>Còn lại: {remaining.length}</span>
        <span>✅ {known.length} đã nhớ · ↩ {again.length} ôn lại</span>
      </div>

      {/* Card */}
      <div
        onClick={() => setFlipped(v => !v)}
        style={{ background: flipped ? "#ECFDF5" : C.white, borderRadius:20, padding:"2rem 1.2rem", border:`1.5px solid ${flipped?"#059669":C.border}`, textAlign:"center", cursor:"pointer", minHeight:180, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", gap:"0.75rem", transition:"background 0.2s, border-color 0.2s", animation:"pop 0.25s ease" }}>
        <div style={{ fontSize:"0.6rem", textTransform:"uppercase", letterSpacing:2, color:C.gray }}>
          {flipped ? "Nghĩa" : "Nhấn để lật"}
        </div>
        {!flipped ? (
          <>
            <div style={{ fontFamily:"'Playfair Display',Georgia,serif", fontSize:"1.6rem", color:C.ink, fontWeight:700 }}>{card.fr}</div>
            {card.context && (
              <div style={{ fontSize:"0.75rem", color:C.gray, fontStyle:"italic", maxWidth:240 }}>"{card.context}"</div>
            )}
            <div style={{ display:"flex", gap:"0.35rem", alignItems:"center" }}>
              <span style={{ background:MODULE_COLORS[card.module]||"#9CA3AF", color:"#fff", borderRadius:20, padding:"0.1rem 0.55rem", fontSize:"0.62rem", fontWeight:600 }}>
                {MODULE_LABELS[card.module]||card.module}
              </span>
              <SpeakBtn text={card.fr} size="sm" />
            </div>
          </>
        ) : (
          <>
            <div style={{ fontFamily:"'Playfair Display',Georgia,serif", fontSize:"1.4rem", color:"#059669", fontWeight:700 }}>{card.vi || "—"}</div>
            <div style={{ fontFamily:"Georgia,serif", fontSize:"0.88rem", color:C.ink, fontStyle:"italic" }}>{card.fr}</div>
            {card.context && (
              <div style={{ fontSize:"0.75rem", color:C.gray, fontStyle:"italic", maxWidth:240 }}>"{card.context}"</div>
            )}
          </>
        )}
      </div>

      {/* Actions */}
      {flipped ? (
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"0.5rem" }}>
          <button
            onClick={() => { setAgain(a => [...a, card.ts]); setIdx(0); setFlipped(false); }}
            style={{ padding:"0.7rem", background:"#FEF2F2", border:`1.5px solid ${C.red}44`, borderRadius:12, color:C.red, fontSize:"0.85rem", cursor:"pointer", fontWeight:700 }}>
            ↩ Chưa nhớ
          </button>
          <button
            onClick={() => { setKnown(k => [...k, card.ts]); clearMistake(card.ts); setIdx(0); setFlipped(false); }}
            style={{ padding:"0.7rem", background:"#ECFDF5", border:`1.5px solid #05966944`, borderRadius:12, color:"#059669", fontSize:"0.85rem", cursor:"pointer", fontWeight:700 }}>
            ✅ Đã nhớ
          </button>
        </div>
      ) : (
        <div style={{ textAlign:"center", fontSize:"0.72rem", color:C.gray }}>Nhấn vào thẻ để xem nghĩa</div>
      )}
    </div>
  );
}

// ── Main ──────────────────────────────────────────────────────
export default function RevisionPanel() {
  const [mistakes, setMistakes] = useState(() => getMistakes().reverse()); // newest first
  const [filter,   setFilter]   = useState("all");
  const [drilling, setDrilling] = useState(false);
  const [showClearConfirm, setShowClearConfirm] = useState(false);

  const reload = () => setMistakes(getMistakes().reverse());

  const modules = ["all", ...new Set(mistakes.map(m => m.module))];
  const filtered = filter === "all" ? mistakes : mistakes.filter(m => m.module === filter);

  const dismiss = (ts) => { clearMistake(ts); reload(); };
  const clearAll = () => { clearAllMistakes(); setMistakes([]); setShowClearConfirm(false); };

  if (drilling && filtered.length > 0) {
    return <FlashDrill mistakes={filtered} onDone={() => { setDrilling(false); reload(); }} />;
  }

  if (mistakes.length === 0) return (
    <div style={{ padding:"1.5rem 1rem", textAlign:"center" }}>
      <Minou mood="proud" message="Không có lỗi nào cần ôn — parfait! ✨" size="md" />
      <div style={{ fontSize:"0.78rem", color:C.gray, marginTop:"1rem", lineHeight:1.7 }}>
        Câu sai trong Défi, Dictée, và Quiz sẽ được<br/>gom về đây để bạn ôn lại.
      </div>
    </div>
  );

  return (
    <div style={{ padding:"1rem", animation:"fadeUp 0.3s ease", display:"flex", flexDirection:"column", gap:"0.75rem" }}>

      {/* Header */}
      <div style={{ display:"flex", alignItems:"center", gap:"0.5rem" }}>
        <div style={{ flex:1, fontSize:"0.72rem", color:C.gray }}>{filtered.length} lỗi{filter!=="all"?` · ${MODULE_LABELS[filter]||filter}`:""}</div>
        {filtered.length > 0 && (
          <button onClick={() => setDrilling(true)}
            style={{ padding:"0.35rem 0.9rem", background:C.blue, color:C.white, border:"none", borderRadius:20, fontSize:"0.72rem", cursor:"pointer", fontWeight:700 }}>
            🃏 Luyện flashcard
          </button>
        )}
        <button onClick={() => setShowClearConfirm(v=>!v)}
          style={{ padding:"0.3rem 0.65rem", background:"transparent", border:`1px solid ${C.border}`, borderRadius:20, color:C.gray, fontSize:"0.65rem", cursor:"pointer" }}>
          Xóa tất cả
        </button>
      </div>

      {showClearConfirm && (
        <div style={{ background:"#FEF2F2", border:`1.5px solid ${C.red}44`, borderRadius:12, padding:"0.75rem 1rem", display:"flex", alignItems:"center", gap:"0.75rem", animation:"fadeUp 0.2s ease" }}>
          <div style={{ flex:1, fontSize:"0.78rem", color:C.red }}>Xóa hết {mistakes.length} lỗi?</div>
          <button onClick={clearAll} style={{ padding:"0.3rem 0.7rem", background:C.red, color:C.white, border:"none", borderRadius:8, fontSize:"0.72rem", cursor:"pointer", fontWeight:700 }}>Xóa</button>
          <button onClick={() => setShowClearConfirm(false)} style={{ padding:"0.3rem 0.7rem", background:"transparent", border:`1px solid ${C.border}`, borderRadius:8, fontSize:"0.72rem", cursor:"pointer" }}>Hủy</button>
        </div>
      )}

      {/* Module filter */}
      {modules.length > 2 && (
        <div style={{ display:"flex", gap:"0.35rem", flexWrap:"wrap" }}>
          {modules.map(m => (
            <button key={m} onClick={() => setFilter(m)}
              style={{ padding:"0.25rem 0.65rem", borderRadius:20, border:`1.5px solid ${filter===m?(MODULE_COLORS[m]||C.blue):C.border}`, background: filter===m?(MODULE_COLORS[m]||C.blue):"transparent", color: filter===m?C.white:C.gray, fontSize:"0.68rem", cursor:"pointer", fontWeight:600, transition:"all 0.15s" }}>
              {m === "all" ? "Tất cả" : MODULE_LABELS[m] || m}
            </button>
          ))}
        </div>
      )}

      {/* Mistake list */}
      <div style={{ display:"flex", flexDirection:"column", gap:"0.4rem" }}>
        {filtered.map(m => (
          <div key={m.ts} style={{ background:C.white, borderRadius:14, padding:"0.75rem 0.9rem", border:`1.5px solid ${C.border}`, display:"flex", alignItems:"flex-start", gap:"0.7rem" }}>
            <div style={{ flex:1, minWidth:0 }}>
              <div style={{ display:"flex", alignItems:"center", gap:"0.4rem", flexWrap:"wrap" }}>
                <span style={{ fontFamily:"Georgia,serif", fontSize:"0.92rem", color:C.ink, fontWeight:600 }}>{m.fr}</span>
                <SpeakBtn text={m.fr} size="sm" />
                <span style={{ background:MODULE_COLORS[m.module]||"#9CA3AF", color:C.white, borderRadius:20, padding:"0.05rem 0.45rem", fontSize:"0.58rem", fontWeight:600 }}>
                  {MODULE_LABELS[m.module]||m.module}
                </span>
              </div>
              {m.vi && <div style={{ fontSize:"0.75rem", color:C.gray, marginTop:"0.15rem" }}>{m.vi}</div>}
              {m.context && (
                <div style={{ fontSize:"0.72rem", color:"#6B7280", fontStyle:"italic", marginTop:"0.2rem", lineHeight:1.5 }}>"{m.context}"</div>
              )}
              <div style={{ fontSize:"0.62rem", color:C.border, marginTop:"0.3rem" }}>{m.date}</div>
            </div>
            <button onClick={() => dismiss(m.ts)}
              style={{ background:"none", border:"none", color:C.border, cursor:"pointer", fontSize:"1rem", flexShrink:0, padding:"0.1rem 0.2rem", lineHeight:1 }}
              title="Đã nhớ, xóa khỏi danh sách">
              ✕
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
