import { C } from "../constants.js";
import { getStreak, getProgress, getStudyHistory, loadSets } from "../utils/storage.js";
import { getSRSStats, getAllCards } from "../utils/srs.js";
import { getXPData, getLevel, getNextLevel, getBadges, BADGE_DEFS } from "../utils/xp.js";

const MODULES_META = [
  { id:"vocab",        label:"Từ vựng",    icon:"📚", color:"#4A90D9" },
  { id:"grammar",      label:"Ngữ pháp",   icon:"🧩", color:"#7B6CF6" },
  { id:"conversation", label:"Giao tiếp",  icon:"💬", color:"#2980B9" },
  { id:"writing",      label:"Luyện viết", icon:"✍️", color:"#E67E22" },
  { id:"defi",         label:"Thử thách",  icon:"🎲", color:"#8E44AD" },
  { id:"srs",          label:"Ôn tập",     icon:"🧠", color:"#0D9488" },
  { id:"reference",    label:"Cẩm nang",   icon:"📖", color:"#6D28D9" },
  { id:"lecture",      label:"Đọc hiểu",   icon:"📰", color:"#059669" },
  { id:"dictee",       label:"Nghe chép",  icon:"🎧", color:"#0891B2" },
  { id:"phrasebook",   label:"Mẫu câu",    icon:"💡", color:"#D97706" },
];

// ── Streak calendar ───────────────────────────────────────────
function StreakCalendar({ history }) {
  const days = [];
  const today = new Date();
  today.setHours(0,0,0,0);
  // Build last 35 days (5 weeks), starting from Monday
  const startOffset = (today.getDay() + 6) % 7; // days since last Monday
  const start = new Date(today);
  start.setDate(today.getDate() - startOffset - 28); // 5 weeks back

  for (let i = 0; i < 35; i++) {
    const d = new Date(start);
    d.setDate(start.getDate() + i);
    days.push(d);
  }

  const DAYS = ["T2","T3","T4","T5","T6","T7","CN"];

  return (
    <div>
      {/* Day labels */}
      <div style={{ display:"grid", gridTemplateColumns:"repeat(7,1fr)", gap:3, marginBottom:4 }}>
        {DAYS.map(d => (
          <div key={d} style={{ fontSize:"0.58rem", color:C.gray, textAlign:"center", fontWeight:600 }}>{d}</div>
        ))}
      </div>
      {/* Cells */}
      <div style={{ display:"grid", gridTemplateColumns:"repeat(7,1fr)", gap:3 }}>
        {days.map((d, i) => {
          const key    = d.toDateString();
          const isToday = d.getTime() === today.getTime();
          const studied = history.has(key);
          const future  = d > today;
          return (
            <div key={i} title={d.toLocaleDateString("vi-VN")}
              style={{
                aspectRatio:"1", borderRadius:5,
                background: future ? "transparent" : studied ? "#059669" : "#F3F4F6",
                border: isToday ? `2px solid ${C.blue}` : "none",
                opacity: future ? 0.2 : 1,
                transition:"background 0.2s",
              }}
            />
          );
        })}
      </div>
      <div style={{ display:"flex", gap:"0.75rem", marginTop:"0.6rem", fontSize:"0.65rem", color:C.gray }}>
        <span><span style={{ display:"inline-block", width:10, height:10, background:"#F3F4F6", borderRadius:3, marginRight:3 }}/>Chưa học</span>
        <span><span style={{ display:"inline-block", width:10, height:10, background:"#059669", borderRadius:3, marginRight:3 }}/>Đã học</span>
      </div>
    </div>
  );
}

// ── SRS breakdown bar ─────────────────────────────────────────
function SRSBar({ stats }) {
  const { total, new: newW, mastered } = stats;
  const learning = Math.max(0, total - newW - mastered);
  if (total === 0) return (
    <div style={{ fontSize:"0.78rem", color:C.gray, textAlign:"center", padding:"0.5rem 0" }}>
      Chưa có từ nào trong SRS — hãy luyện tập để bắt đầu!
    </div>
  );
  const pct = (n) => Math.round(n / total * 100);
  const segments = [
    { label:"Mới",       n: newW,     color:"#94A3B8" },
    { label:"Đang học",  n: learning, color:"#3B82F6" },
    { label:"Thuộc",     n: mastered, color:"#059669" },
  ].filter(s => s.n > 0);

  return (
    <div>
      <div style={{ display:"flex", height:12, borderRadius:999, overflow:"hidden", marginBottom:"0.6rem" }}>
        {segments.map((s, i) => (
          <div key={i} style={{ flex: s.n, background: s.color, transition:"flex 0.5s ease" }}/>
        ))}
      </div>
      <div style={{ display:"flex", gap:"0.85rem", flexWrap:"wrap" }}>
        {segments.map((s, i) => (
          <div key={i} style={{ display:"flex", alignItems:"center", gap:"0.3rem" }}>
            <div style={{ width:10, height:10, borderRadius:2, background:s.color, flexShrink:0 }}/>
            <span style={{ fontSize:"0.72rem", color:C.gray }}>{s.label}</span>
            <span style={{ fontSize:"0.72rem", color:C.ink, fontWeight:700 }}>{s.n}</span>
            <span style={{ fontSize:"0.65rem", color:C.gray }}>({pct(s.n)}%)</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Module activity list ──────────────────────────────────────
function ModuleActivity({ progress }) {
  const used = MODULES_META
    .map(m => ({ ...m, count: progress[m.id]?.count || 0, last: progress[m.id]?.last }))
    .filter(m => m.count > 0)
    .sort((a, b) => b.count - a.count);

  if (used.length === 0) return (
    <div style={{ fontSize:"0.78rem", color:C.gray, textAlign:"center", padding:"0.5rem 0" }}>
      Chưa dùng module nào — bắt đầu học thôi!
    </div>
  );

  const maxCount = used[0].count;
  return (
    <div style={{ display:"flex", flexDirection:"column", gap:"0.5rem" }}>
      {used.map(m => (
        <div key={m.id}>
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:"0.2rem" }}>
            <div style={{ fontSize:"0.78rem", color:C.ink, fontWeight:600 }}>{m.icon} {m.label}</div>
            <div style={{ fontSize:"0.68rem", color:C.gray }}>{m.count} lần{m.last ? ` · ${m.last}` : ""}</div>
          </div>
          <div style={{ height:5, background:`${m.color}20`, borderRadius:999 }}>
            <div style={{ height:"100%", width:`${Math.round(m.count/maxCount*100)}%`, background:m.color, borderRadius:999, transition:"width 0.5s ease" }}/>
          </div>
        </div>
      ))}
    </div>
  );
}

// ── Main ──────────────────────────────────────────────────────
export default function StatsPanel() {
  const streak   = getStreak();
  const progress = getProgress();
  const history  = getStudyHistory();
  const srsStats = getSRSStats();
  const allCards = getAllCards();
  const sets     = loadSets();
  const xpData   = getXPData();
  const xp       = xpData.total || 0;
  const level    = getLevel(xp);
  const nextLv   = getNextLevel(xp);
  const xpPct    = nextLv ? Math.round((xp - level.min) / (nextLv.min - level.min) * 100) : 100;
  const earnedBadges = getBadges();

  const totalVocab  = allCards.length;
  const masteredCnt = srsStats.mastered;
  const studiedDays = history.size;
  const totalSets   = sets.length;
  const totalSetWords = sets.reduce((a, s) => a + (s.count || 0), 0);

  // Ease factor distribution → avg difficulty
  const avgEase = allCards.length
    ? (allCards.reduce((a, c) => a + c.easeFactor, 0) / allCards.length).toFixed(2)
    : null;

  const card = (children, style = {}) => (
    <div style={{ background:C.white, borderRadius:16, padding:"1rem 1.1rem", border:`1.5px solid ${C.border}`, ...style }}>
      {children}
    </div>
  );

  const sectionLabel = (text) => (
    <div style={{ fontSize:"0.62rem", textTransform:"uppercase", letterSpacing:2, color:C.gray, fontWeight:700, marginBottom:"0.65rem" }}>{text}</div>
  );

  return (
    <div style={{ padding:"1rem", display:"flex", flexDirection:"column", gap:"0.75rem", animation:"fadeUp 0.3s ease" }}>

      {/* ── XP & Level ── */}
      {card(<>
        {sectionLabel("Cấp độ")}
        <div style={{ display:"flex", alignItems:"center", gap:"0.85rem", marginBottom:"0.65rem" }}>
          <span style={{ fontSize:"2rem" }}>{level.icon}</span>
          <div style={{ flex:1 }}>
            <div style={{ fontFamily:"'Playfair Display',Georgia,serif", fontSize:"1.1rem", color:level.color, fontWeight:700 }}>{level.label}</div>
            <div style={{ fontSize:"0.68rem", color:C.gray }}>{xp} XP{nextLv ? ` · còn ${nextLv.min-xp} XP lên ${nextLv.label}` : " · Cấp tối đa!"}</div>
          </div>
        </div>
        <div style={{ height:8, background:C.border, borderRadius:999, overflow:"hidden" }}>
          <div style={{ height:"100%", width:`${xpPct}%`, background:level.color, borderRadius:999 }}/>
        </div>
      </>)}

      {/* ── Badges ── */}
      {card(<>
        {sectionLabel(`Huy hiệu · ${earnedBadges.size}/${BADGE_DEFS.length}`)}
        <div style={{ display:"flex", flexWrap:"wrap", gap:"0.4rem" }}>
          {BADGE_DEFS.map(b => {
            const earned = earnedBadges.has(b.id);
            return (
              <div key={b.id} title={`${b.label}: ${b.desc}`}
                style={{ display:"flex", alignItems:"center", gap:"0.3rem", padding:"0.3rem 0.6rem", background:earned?"#F5F0FF":C.cream, border:`1.5px solid ${earned?"#7C3AED44":C.border}`, borderRadius:20, opacity:earned?1:0.4 }}>
                <span style={{ fontSize:"0.95rem" }}>{b.icon}</span>
                <span style={{ fontSize:"0.65rem", color:earned?"#7C3AED":C.gray, fontWeight:earned?700:400 }}>{b.label}</span>
              </div>
            );
          })}
        </div>
      </>)}

      {/* ── Hero stats ── */}
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:"0.5rem" }}>
        {[
          { icon:"🔥", value: streak.streak || 0, label:"Ngày streak", color:streak.streak>0?"#D97706":"#9CA3AF" },
          { icon:"📚", value: totalVocab,          label:"Từ trong SRS", color:C.blue },
          { icon:"✅", value: masteredCnt,          label:"Đã thuộc",    color:"#059669" },
        ].map((s, i) => (
          <div key={i} style={{ background:C.white, borderRadius:14, padding:"0.85rem 0.6rem", border:`1.5px solid ${C.border}`, textAlign:"center" }}>
            <div style={{ fontSize:"1.5rem", marginBottom:"0.2rem" }}>{s.icon}</div>
            <div style={{ fontFamily:"'Playfair Display',Georgia,serif", fontSize:"1.6rem", color:s.color, fontWeight:700, lineHeight:1 }}>{s.value}</div>
            <div style={{ fontSize:"0.6rem", color:C.gray, marginTop:"0.2rem", lineHeight:1.3 }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* ── Secondary stats ── */}
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"0.5rem" }}>
        {[
          { icon:"📅", value: studiedDays,   label:"Ngày đã học" },
          { icon:"📂", value: totalSets,     label:"Bộ từ đã lưu" },
          { icon:"📝", value: totalSetWords, label:"Từ trong bộ" },
          { icon:"🎯", value: avgEase ?? "—", label:"Ease trung bình" },
        ].map((s, i) => (
          <div key={i} style={{ background:C.white, borderRadius:12, padding:"0.65rem 0.85rem", border:`1.5px solid ${C.border}`, display:"flex", alignItems:"center", gap:"0.65rem" }}>
            <span style={{ fontSize:"1.2rem" }}>{s.icon}</span>
            <div>
              <div style={{ fontFamily:"'Playfair Display',Georgia,serif", fontSize:"1.2rem", color:C.ink, fontWeight:700, lineHeight:1 }}>{s.value}</div>
              <div style={{ fontSize:"0.63rem", color:C.gray, marginTop:"0.1rem" }}>{s.label}</div>
            </div>
          </div>
        ))}
      </div>

      {/* ── Streak calendar ── */}
      {card(<>
        {sectionLabel("Lịch học — 5 tuần gần nhất")}
        <StreakCalendar history={history} />
      </>)}

      {/* ── SRS breakdown ── */}
      {card(<>
        {sectionLabel(`Tiến độ SRS · ${totalVocab} từ`)}
        <SRSBar stats={srsStats} />
        {srsStats.due > 0 && (
          <div style={{ marginTop:"0.75rem", background:"#FEF2F2", borderRadius:10, padding:"0.45rem 0.75rem", fontSize:"0.75rem", color:C.red, fontWeight:600 }}>
            ⚡ Còn {srsStats.due} từ cần ôn hôm nay!
          </div>
        )}
      </>)}

      {/* ── Module activity ── */}
      {card(<>
        {sectionLabel("Hoạt động theo module")}
        <ModuleActivity progress={progress} />
      </>)}

    </div>
  );
}
