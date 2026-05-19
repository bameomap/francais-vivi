const XP_KEY     = "xp_data";
const BADGES_KEY = "badges_earned";

export const LEVELS = [
  { min:0,    label:"Débutant",      icon:"🌱", color:"#9CA3AF" },
  { min:50,   label:"Apprenti",      icon:"📚", color:"#3B82F6" },
  { min:200,  label:"Intermédiaire", icon:"⭐", color:"#D97706" },
  { min:500,  label:"Avancé",        icon:"🏆", color:"#7C3AED" },
  { min:1000, label:"Expert",        icon:"🎯", color:"#DC2626" },
];

export const BADGE_DEFS = [
  { id:"first_lesson",  icon:"🎓", label:"Première leçon",   desc:"Dùng module đầu tiên"          },
  { id:"words_10",      icon:"📝", label:"10 từ",             desc:"Thêm 10 từ vào SRS"             },
  { id:"words_50",      icon:"📚", label:"50 từ",             desc:"Thêm 50 từ vào SRS"             },
  { id:"words_100",     icon:"🏅", label:"100 từ",            desc:"Thêm 100 từ vào SRS"            },
  { id:"streak_3",      icon:"🔥", label:"3 ngày liền",       desc:"Học 3 ngày liên tiếp"           },
  { id:"streak_7",      icon:"⚡", label:"7 ngày liền",       desc:"Học 7 ngày liên tiếp"           },
  { id:"streak_30",     icon:"💫", label:"30 ngày liền",      desc:"Học 30 ngày liên tiếp"          },
  { id:"first_defi",    icon:"🎲", label:"Premier Défi",      desc:"Hoàn thành thử thách đầu tiên"  },
  { id:"defi_perfect",  icon:"💯", label:"Défi Parfait",      desc:"Đạt 100% trong Défi"            },
  { id:"first_dictee",  icon:"🎧", label:"Première Dictée",   desc:"Hoàn thành Dictée đầu tiên"     },
  { id:"read_5",        icon:"📰", label:"Lecteur",           desc:"Đọc 5 bài Lecture"              },
  { id:"master_5",      icon:"✨", label:"5 từ thuộc",        desc:"Thuộc 5 từ trong SRS"           },
  { id:"master_20",     icon:"🌟", label:"20 từ thuộc",       desc:"Thuộc 20 từ trong SRS"          },
  { id:"conjugaison_5", icon:"🔤", label:"Grammairien",       desc:"Luyện chia động từ 5 lần"       },
];

export function getXPData() {
  try { return JSON.parse(localStorage.getItem(XP_KEY) || '{"total":0}'); }
  catch { return { total:0 }; }
}

export function awardXP(amount) {
  const data = getXPData();
  data.total = (data.total || 0) + amount;
  localStorage.setItem(XP_KEY, JSON.stringify(data));
  return data.total;
}

export function getLevel(xp) {
  let level = LEVELS[0];
  for (const l of LEVELS) { if (xp >= l.min) level = l; }
  return level;
}

export function getNextLevel(xp) {
  return LEVELS.find(l => l.min > xp) || null;
}

export function getBadges() {
  try { return new Set(JSON.parse(localStorage.getItem(BADGES_KEY) || "[]")); }
  catch { return new Set(); }
}

// Returns true if newly earned
export function awardBadge(id) {
  const badges = getBadges();
  if (badges.has(id)) return false;
  badges.add(id);
  localStorage.setItem(BADGES_KEY, JSON.stringify([...badges]));
  return true;
}

// Convenience: check conditions and award multiple badges
export function checkBadges({ srsTotal, mastered, streak, defiCount, defiPerfect, dicteeCount, lectureCount, conjugaisonCount }) {
  const earned = [];
  const try_ = (id) => { if (awardBadge(id)) earned.push(id); };

  if (srsTotal >= 1)   try_("first_lesson");
  if (srsTotal >= 10)  try_("words_10");
  if (srsTotal >= 50)  try_("words_50");
  if (srsTotal >= 100) try_("words_100");
  if (mastered >= 5)   try_("master_5");
  if (mastered >= 20)  try_("master_20");
  if (streak >= 3)     try_("streak_3");
  if (streak >= 7)     try_("streak_7");
  if (streak >= 30)    try_("streak_30");
  if (defiCount >= 1)  try_("first_defi");
  if (defiPerfect)     try_("defi_perfect");
  if (dicteeCount >= 1) try_("first_dictee");
  if (lectureCount >= 5) try_("read_5");
  if (conjugaisonCount >= 5) try_("conjugaison_5");

  return earned; // list of newly earned badge IDs
}

// Simple counter helpers stored in localStorage
export function increment(key) {
  const n = parseInt(localStorage.getItem(key) || "0") + 1;
  localStorage.setItem(key, String(n));
  return n;
}
export function getCount(key) {
  return parseInt(localStorage.getItem(key) || "0");
}
