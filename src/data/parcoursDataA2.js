// Le Parcours — A2 Édito unit definitions
// Same shape as PARCOURS_UNITS in parcoursData.js — fill in as units are built.
// Ids are prefixed "b" (b1, b2, …) so localStorage progress never collides
// with Édito A1's "u"/"g" ids (A1 already has units u1–u10).

export const PARCOURS_UNITS_A2 = [
  { id:"b1", num:1, fr:"Nouvelles vies", vi:"Cuộc sống mới", grammar:"Passé composé · Négation · il y a/pendant/depuis", emoji:"🌱" },
];

// ── Step groups ────────────────────────────────────────────────────
// Mirrors STEP_GROUPS in parcoursData.js. One A1 step is deliberately absent:
//   • verbes — no per-unit A2 conjugation tables authored yet
export const STEP_GROUPS_A2 = [
  {
    id: "decouverte",
    label: "Khám phá",
    emoji: "📚",
    steps: [
      { id:"vocab",   icon:"📖", kind:"Từ vựng",   color:"#2E8B57", sub:"Học & ôn từ của bài",       section:"vocab",         view:"edito" },
      { id:"phono",   icon:"🎵", kind:"Phono",      color:"#E8574A", sub:"Âm [y] và [u]",             section:"reference_hub", view:"reference_hub", refTab:"phono" },
      { id:"grammar", icon:"⚜️", kind:"Ngữ pháp",  color:"#1B3A6B", sub:"Điểm ngữ pháp của bài",     section:"grammar",       view:"grammar" },
    ],
  },
  {
    id: "pratique",
    label: "Luyện tập",
    emoji: "🏋️",
    steps: [
      { id:"lecture", icon:"📜", kind:"Đọc hiểu",  color:"#059669", sub:"Bài đọc thật & câu hỏi",    section:"lecture",       view:"lecture" },
      { id:"ecouter", icon:"🎧", kind:"Nghe",       color:"#0891B2", sub:"4 bài nghe của sách",       section:"dictee",        view:"ecouter" },
      { id:"ecrire",  icon:"🖋️", kind:"Viết",     color:"#E67E22", sub:"Luyện viết theo đề bài",    section:"writing",       view:"writing" },
      { id:"parler",  icon:"🥐", kind:"Giao tiếp", color:"#D97706", sub:"Roleplay hội thoại với AI", section:"conversation",  view:"conversation" },
    ],
  },
  {
    id: "evaluation",
    label: "Kiểm tra",
    emoji: "🏆",
    steps: [
      { id:"quiz", icon:"🏆", kind:"Quiz bài", color:"#E8574A", sub:"Kiểm tra tổng hợp toàn bài", section:"quiz-unit", view:"quiz-unit" },
    ],
  },
];

// Flat list — used by parcours.js for progress tracking
export const STEP_DEFS_A2 = STEP_GROUPS_A2.flatMap(g => g.steps);
