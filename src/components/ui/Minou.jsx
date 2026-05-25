import { useEffect, useState } from "react";

// ── Mood config ──────────────────────────────────────────────
// frames = number of frames in the sprite sheet (width / 80)
// fps    = playback speed
const MOODS = {
  happy:    { sprite:"IDLE",  frames:8,  fps:8,  color:"#F59E0B", bg:"#FFFBEB", accent:"#D97706", bounce:true  },
  excited:  { sprite:"RUN",   frames:8,  fps:12, color:"#EC4899", bg:"#FDF2F8", accent:"#BE185D", bounce:false },
  proud:    { sprite:"WALK",  frames:12, fps:8,  color:"#10B981", bg:"#ECFDF5", accent:"#059669", bounce:false },
  sad:      { sprite:"HURT",  frames:4,  fps:5,  color:"#6B7280", bg:"#F9FAFB", accent:"#4B5563", bounce:false },
  sleeping: { sprite:"IDLE",  frames:8,  fps:3,  color:"#8B5CF6", bg:"#F5F3FF", accent:"#7C3AED", bounce:false },
  thinking: { sprite:"IDLE",  frames:8,  fps:5,  color:"#3B82F6", bg:"#EFF6FF", accent:"#2563EB", bounce:false },
};

const FRAME_W = 80;
const FRAME_H = 64;

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

// ── Pixel cat sprite ──────────────────────────────────────────
function PixelCat({ sprite, frames, fps, size }) {
  const scale = { sm:1, md:1.5, lg:2 }[size] ?? 1.5;
  const dur = (frames / fps).toFixed(2);
  const totalW = frames * FRAME_W;
  const animName = `sprite_${sprite}_${frames}_${scale}`;
  const dispW = Math.round(FRAME_W * scale);
  const dispH = Math.round(FRAME_H * scale);

  return (
    <>
      <style>{`
        @keyframes ${animName} {
          from { background-position-x: 0px; }
          to   { background-position-x: -${totalW * scale}px; }
        }
      `}</style>
      <div style={{
        width: dispW,
        height: dispH,
        backgroundImage: `url(/sprites/${sprite}.png)`,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "0 0",
        backgroundSize: `${totalW * scale}px ${dispH}px`,
        animation: `${animName} ${dur}s steps(${frames}) infinite`,
        imageRendering: "pixelated",
        flexShrink: 0,
      }} />
    </>
  );
}

// ── Minou mascot ─────────────────────────────────────────────
export default function Minou({ mood = "happy", message, size = "md", align = "center" }) {
  const m = MOODS[mood] || MOODS.happy;

  return (
    <div style={{
      display: "inline-flex",
      alignItems: "center",
      animation: m.bounce ? "minouBounce 2s ease-in-out infinite" : "none",
    }}>
      <PixelCat sprite={m.sprite} frames={m.frames} fps={m.fps} size={size} />
    </div>
  );
}
