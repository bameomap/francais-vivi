// Le Parcours — A1 Édito unit definitions
// Each unit maps to a chapter in EDITO_VOCAB_UNITS (editoVocab.js)

export const PARCOURS_UNITS = [
  { id:"u0", num:0,  fr:"Bienvenue !",                   vi:"Khởi động",          grammar:"Salutations · Alphabet",          emoji:"👋" },
  { id:"u1", num:1,  fr:"Je suis…",                      vi:"Tôi là…",            grammar:"Être · avoir · articles",         emoji:"🪪" },
  { id:"u2", num:2,  fr:"Près de moi",                   vi:"Xung quanh tôi",     grammar:"Adjectifs · pluriel",             emoji:"🏘️" },
  { id:"u3", num:3,  fr:"Qu'est-ce qu'on mange ?",       vi:"Chúng ta ăn gì?",   grammar:"Articles partitifs · quantité",   emoji:"🥐" },
  { id:"u4", num:4,  fr:"C'est où ?",                    vi:"Ở đâu?",             grammar:"Prépositions · questions",        emoji:"🗺️" },
  { id:"u5", num:5,  fr:"C'est tendance !",              vi:"Thời trang!",        grammar:"Adjectifs couleurs · comparatif", emoji:"👗" },
  { id:"u6", num:6,  fr:"Qu'est-ce qu'on fait ?",        vi:"Làm gì hôm nay?",   grammar:"Verbes réguliers · futur proche", emoji:"📅" },
  { id:"u7", num:7,  fr:"Chez moi !",                    vi:"Nhà tôi!",           grammar:"Prépositions lieu · il y a",      emoji:"🏠" },
  { id:"u8", num:8,  fr:"En forme !",                    vi:"Sức khỏe!",          grammar:"Impératif · verbes pronominaux",  emoji:"💪" },
  { id:"u9", num:9,  fr:"Bonnes vacances !",             vi:"Kỳ nghỉ vui!",       grammar:"Passé composé · avoir/être",      emoji:"🌴" },
];

export const STEP_DEFS = [
  { id:"vocab",   icon:"V", kind:"Vocabulaire", color:"#4A90D9", sub:"Học từ của unit",    view:"unit-vocab"    },
  { id:"grammar", icon:"G", kind:"Grammaire",   color:"#1B3A6B", sub:"Ngữ pháp bài này",  view:"unit-grammar"  },
  { id:"lecture", icon:"L", kind:"Lecture",     color:"#059669", sub:"Đọc hiểu",           view:"lecture"       },
  { id:"ecouter", icon:"É", kind:"Écouter",     color:"#7B6CF6", sub:"Nghe & chép",        view:"dictee"        },
  { id:"parler",  icon:"P", kind:"Parler",       color:"#E67E22", sub:"Roleplay với AI",   view:"conversation"  },
  { id:"quiz",    icon:"Q", kind:"Quiz tổng",   color:"#E8574A", sub:"Kiểm tra unit",      view:"quiz-unit"     },
];
