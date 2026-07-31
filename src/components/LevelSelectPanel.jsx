import { C } from "../constants.js";
import { LEVELS, isSelectable } from "../data/levels.js";

// Full-screen CEFR level picker. Levels come from src/data/levels.js —
// adding B1/B2 there makes them show up here with no change to this file.

const STATUS_BADGE = {
  ready:    { label: "Sẵn sàng",     bg: () => C.greenL, fg: () => C.green },
  building: { label: "Đang xây dựng", bg: () => C.goldL,  fg: () => C.gold  },
  soon:     { label: "Sắp có",       bg: () => C.cream,  fg: () => C.gray2 },
};

function LevelCard({ level, isCurrent, onSelect }) {
  const selectable = isSelectable(level);
  const badge = STATUS_BADGE[level.status] || STATUS_BADGE.soon;

  return (
    <button
      onClick={() => selectable && onSelect(level.id)}
      disabled={!selectable}
      aria-label={`Trình độ ${level.code} — ${level.vi}${selectable ? "" : " (sắp có)"}`}
      className={selectable ? "card-hover" : undefined}
      style={{
        display: "flex", alignItems: "stretch", gap: 0, width: "100%",
        background: C.white,
        borderTop: `1.5px solid ${isCurrent ? level.color : C.border}`,
        borderRight: `1.5px solid ${isCurrent ? level.color : C.border}`,
        borderBottom: `1.5px solid ${isCurrent ? level.color : C.border}`,
        borderLeft: `5px solid ${selectable ? level.color : C.border}`,
        borderRadius: 16, overflow: "hidden", padding: 0,
        cursor: selectable ? "pointer" : "not-allowed",
        opacity: selectable ? 1 : 0.55,
        fontFamily: "inherit", textAlign: "left",
        boxShadow: isCurrent ? `0 4px 16px ${level.color}33` : "none",
      }}
    >
      {/* Code column */}
      <div style={{
        flexShrink: 0, width: 66,
        background: selectable ? `${level.color}14` : C.cream,
        display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center", gap: 2,
        padding: "14px 0",
      }}>
        <span style={{ fontSize: 20, lineHeight: 1 }}>{level.emoji}</span>
        <span style={{
          fontFamily: "'Playfair Display',Georgia,serif", fontWeight: 800,
          fontSize: 17, color: selectable ? level.color : C.gray2, lineHeight: 1.1,
        }}>
          {level.code}
        </span>
      </div>

      {/* Body */}
      <div style={{ flex: 1, minWidth: 0, padding: "12px 14px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 7, flexWrap: "wrap", marginBottom: 3 }}>
          <span style={{
            fontFamily: "'Playfair Display',Georgia,serif", fontWeight: 700,
            fontSize: 15, color: C.ink, lineHeight: 1.2,
          }}>
            {level.vi}
          </span>
          <span style={{ fontSize: 11.5, color: C.gray, fontStyle: "italic" }}>{level.fr}</span>
        </div>

        <div style={{ fontSize: 11.5, color: C.gray, lineHeight: 1.55, marginBottom: 8 }}>
          {level.tagline}
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 6, flexWrap: "wrap" }}>
          {isCurrent && (
            <span style={{
              background: level.color, color: "#fff", borderRadius: 20,
              padding: "2px 9px", fontSize: 10, fontWeight: 800, letterSpacing: "0.03em",
            }}>
              ✓ ĐANG HỌC
            </span>
          )}
          <span style={{
            background: badge.bg(), color: badge.fg(), borderRadius: 20,
            padding: "2px 9px", fontSize: 10, fontWeight: 700,
          }}>
            {badge.label}
          </span>
          {level.unitCount != null && (
            <span style={{ fontSize: 10.5, color: C.gray2 }}>{level.unitCount} unités</span>
          )}
        </div>
      </div>

      {/* Affordance */}
      <div style={{
        flexShrink: 0, display: "flex", alignItems: "center",
        paddingRight: 13, color: selectable ? C.gray2 : C.border, fontSize: 17,
      }}>
        {selectable ? "›" : "🔒"}
      </div>
    </button>
  );
}

export default function LevelSelectPanel({ currentLevel, onSelect, onClose }) {
  return (
    <div style={{ animation: "fadeUp 0.3s ease", paddingBottom: 24 }}>
      {/* Hero */}
      <div style={{
        background: `linear-gradient(135deg, ${C.heroFrom} 0%, ${C.heroTo} 100%)`,
        padding: "1rem 1rem 1.1rem", color: "#fff",
      }}>
        {onClose && (
          <button onClick={onClose}
            style={{
              background: "rgba(255,255,255,0.15)", border: "none", color: "#fff",
              fontSize: "0.72rem", fontWeight: 600, cursor: "pointer",
              padding: "0.2rem 0.65rem", borderRadius: 20, marginBottom: "0.7rem",
              fontFamily: "inherit",
            }}>
            ← Quay lại
          </button>
        )}
        <div style={{
          fontFamily: "'JetBrains Mono',monospace", fontSize: "0.58rem",
          letterSpacing: "0.18em", opacity: 0.6, textTransform: "uppercase", marginBottom: 5,
        }}>
          Khung tham chiếu CEFR
        </div>
        <div style={{
          fontFamily: "'Playfair Display',Georgia,serif", fontSize: "1.3rem",
          fontWeight: 700, lineHeight: 1.15, marginBottom: 4,
        }}>
          Chọn trình độ học
        </div>
        <div style={{ fontSize: "0.78rem", opacity: 0.78, lineHeight: 1.6 }}>
          Mỗi trình độ có lộ trình, từ vựng và ngữ pháp riêng.
          Tiến độ của từng trình độ được lưu tách biệt.
        </div>
      </div>

      {/* Cards */}
      <div style={{ padding: "1rem", display: "flex", flexDirection: "column", gap: 10 }}>
        {LEVELS.map((lv, i) => (
          <div key={lv.id} style={{ animation: `fadeUp 0.25s ease ${i * 0.05}s both` }}>
            <LevelCard level={lv} isCurrent={lv.id === currentLevel} onSelect={onSelect} />
          </div>
        ))}

        <div style={{
          marginTop: 4, background: C.cream, borderRadius: 12,
          padding: "10px 13px", fontSize: 11.5, color: C.gray, lineHeight: 1.65,
        }}>
          💡 Đổi trình độ bất cứ lúc nào — bấm vào huy hiệu trình độ ở góc trên trang chủ.
          Từ vựng đã thuộc và chuỗi ngày học vẫn được giữ chung.
        </div>
      </div>
    </div>
  );
}
