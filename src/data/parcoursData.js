// Le Parcours — A1 Édito unit definitions
// Each unit maps to a chapter in EDITO_VOCAB_UNITS (editoVocab.js)

export const PARCOURS_UNITS = [
  { id:"u0",  num:0,  fr:"Bienvenue !",               vi:"Khởi động",           grammar:"Salutations · Alphabet",           emoji:"👋" },
  { id:"u1",  num:1,  fr:"Je suis…",                  vi:"Tôi là…",             grammar:"Être · avoir · articles",          emoji:"🪪" },
  { id:"u2",  num:2,  fr:"Près de moi",               vi:"Xung quanh tôi",      grammar:"Adjectifs · pluriel",              emoji:"🏘️" },
  { id:"u3",  num:3,  fr:"Qu'est-ce qu'on mange ?",   vi:"Chúng ta ăn gì?",    grammar:"Articles partitifs · quantité",    emoji:"🥐" },
  { id:"u4",  num:4,  fr:"C'est où ?",                vi:"Ở đâu?",              grammar:"Prépositions · questions",         emoji:"🗺️" },
  { id:"u5",  num:5,  fr:"C'est tendance !",          vi:"Thời trang!",         grammar:"Adjectifs couleurs · comparatif",  emoji:"👗" },
  { id:"u6",  num:6,  fr:"Qu'est-ce qu'on fait ?",    vi:"Làm gì hôm nay?",    grammar:"Verbes réguliers · futur proche",  emoji:"📅" },
  { id:"u7",  num:7,  fr:"Chez moi !",                vi:"Nhà tôi!",            grammar:"Prépositions lieu · il y a",       emoji:"🏠" },
  { id:"u8",  num:8,  fr:"En forme !",                vi:"Sức khỏe!",           grammar:"Impératif · verbes pronominaux",   emoji:"💪" },
  { id:"u9",  num:9,  fr:"Bonnes vacances !",         vi:"Kỳ nghỉ vui!",        grammar:"Passé composé · avoir/être",       emoji:"🌴" },
  { id:"u10", num:10, fr:"Au travail !",              vi:"Đi làm!",             grammar:"Passé composé · futur proche (révision)", emoji:"💼" },
];

// ── Step groups (shown as grouped cards in UnitDetail) ─────────────────────
export const STEP_GROUPS = [
  {
    id: "decouverte",
    label: "Khám phá",
    emoji: "📚",
    steps: [
      { id:"vocab",   icon:"📖", kind:"Từ vựng",   color:"#4A90D9", sub:"Học & ôn từ của bài",          section:"vocab",         view:"edito"         },
      { id:"phono",   icon:"🎵", kind:"Phono",      color:"#E8574A", sub:"Phát âm & âm vị bài này",      section:"reference_hub", view:"reference_hub", refTab:"phono"  },
      { id:"verbes",  icon:"🖊️", kind:"Động từ",   color:"#7B6CF6", sub:"Chia động từ · luyện tập",     section:"reference_hub", view:"reference_hub", refTab:"verbes" },
      { id:"grammar", icon:"⚜️", kind:"Ngữ pháp",  color:"#1B3A6B", sub:"Điểm ngữ pháp của bài",        section:"grammar",       view:"grammar"       },
    ],
  },
  {
    id: "pratique",
    label: "Luyện tập",
    emoji: "🏋️",
    steps: [
      { id:"lecture",  icon:"📜", kind:"Đọc hiểu",   color:"#059669", sub:"Bài đọc & câu hỏi",           section:"lecture",       view:"lecture"       },
      { id:"ecouter",  icon:"🎧", kind:"Nghe",        color:"#0891B2", sub:"Nghe & chép chính tả",        section:"dictee",        view:"dictee"        },
      { id:"ecrire",   icon:"🖋️", kind:"Viết",       color:"#E67E22", sub:"Luyện viết tự do",            section:"writing",       view:"writing"       },
      { id:"parler",   icon:"🥐", kind:"Giao tiếp",  color:"#D97706", sub:"Roleplay hội thoại với AI",   section:"conversation",  view:"conversation"  },
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
export const STEP_DEFS = STEP_GROUPS.flatMap(g => g.steps);
