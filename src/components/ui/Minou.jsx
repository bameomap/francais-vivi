import { useEffect, useState } from "react";

// ── Mood config ──────────────────────────────────────────────
const MOODS = {
  happy:    { face:"(=^･ω･^=)", color:"#F59E0B", bg:"#FFFBEB", accent:"#D97706", bounce:true  },
  excited:  { face:"(=^▽^=) ♪", color:"#EC4899", bg:"#FDF2F8", accent:"#BE185D", bounce:true  },
  proud:    { face:"(=^◕‿◕^=)", color:"#10B981", bg:"#ECFDF5", accent:"#059669", bounce:false },
  sad:      { face:"(=ㅠ.ㅠ=)",  color:"#6B7280", bg:"#F9FAFB", accent:"#4B5563", bounce:false },
  sleeping: { face:"(=-..-=) zzz",color:"#8B5CF6",bg:"#F5F3FF", accent:"#7C3AED", bounce:false },
  thinking: { face:"(=^･_･^=)?",  color:"#3B82F6", bg:"#EFF6FF", accent:"#2563EB", bounce:false },
};

// ── Confetti ─────────────────────────────────────────────────
const CONFETTI_COLORS = ["#002395","#ED2939","#F59E0B","#10B981","#EC4899","#fff"];

export function Confetti({ active, onDone }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!active) return;
    setVisible(true);
    const t = setTimeout(() => { setVisible(false); onDone?.(); }, 3200);
    return () => clearTimeout(t);
  }, [active]);

  if (!visible) return null;

  const pieces = Array.from({ length: 38 }, (_, i) => {
    const color = CONFETTI_COLORS[i % CONFETTI_COLORS.length];
    return {
      id: i,
      color: color === "#fff" ? "#E5E7EB" : color,
      left: 3 + (i * 2.6) % 94,
      delay: (i * 0.07) % 1.4,
      dur: 2.2 + (i * 0.05) % 1,
      size: 7 + (i * 3) % 9,
      round: i % 3 !== 0,
    };
  });

  return (
    <div style={{ position:"fixed", inset:0, pointerEvents:"none", zIndex:600, overflow:"hidden" }}>
      {pieces.map(p => (
        <div key={p.id} style={{
          position:"absolute", top:-16,
          left:`${p.left}%`,
          width:p.size, height:p.size,
          background:p.color,
          borderRadius: p.round ? "50%" : "2px",
          animation:`confettiFall ${p.dur}s ${p.delay}s ease-in forwards`,
        }}/>
      ))}
    </div>
  );
}

// ── Minou mascot ─────────────────────────────────────────────
export default function Minou({ mood = "happy", message, size = "md", align = "center" }) {
  const m = MOODS[mood] || MOODS.happy;
  const fontSize = { sm:"0.85rem", md:"1.05rem", lg:"1.3rem" }[size];
  const msgSize  = { sm:"0.68rem", md:"0.78rem", lg:"0.88rem" }[size];

  return (
    <div style={{ display:"flex", flexDirection:"column", alignItems: align === "left" ? "flex-start" : "center", gap:"0.45rem" }}>
      {/* Cat face */}
      <div style={{
        display:"inline-flex", alignItems:"center", justifyContent:"center",
        background:m.bg, border:`2px solid ${m.color}44`,
        borderRadius:20, padding:"0.45rem 0.85rem",
        animation: m.bounce ? "minouBounce 2s ease-in-out infinite" : "none",
        boxShadow:`0 4px 16px ${m.color}22`,
      }}>
        {/* Beret */}
        <span style={{ fontSize:"0.7rem", marginRight:"0.3rem", opacity:0.85 }}>🎩</span>
        {/* ASCII cat face */}
        <span style={{
          fontFamily:"'Courier New', monospace",
          fontSize, color:m.accent, fontWeight:700,
          letterSpacing:"0.03em",
        }}>{m.face}</span>
      </div>

      {/* Speech bubble */}
      {message && (
        <div style={{ position:"relative", maxWidth:220 }}>
          {/* Bubble tail */}
          <div style={{
            position:"absolute", top:-6, left:28,
            width:0, height:0,
            borderLeft:"6px solid transparent",
            borderRight:"6px solid transparent",
            borderBottom:`6px solid ${m.color}44`,
          }}/>
          <div style={{
            background:m.bg,
            border:`1.5px solid ${m.color}44`,
            borderRadius:"4px 16px 16px 16px",
            padding:"0.42rem 0.75rem",
            fontSize:msgSize, color:m.accent,
            fontWeight:600, lineHeight:1.55,
          }}>
            {message}
          </div>
        </div>
      )}
    </div>
  );
}
