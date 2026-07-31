// Édito A2 — Phonie-graphie par unité.
// Same shape as EDITO_A1_PHONO (editoPhono.js) so EditoPhonoPanel can render
// either list through its `data` prop.

export const EDITO_A2_PHONO = [
  // ─────────────────────────────────────────────────────────────────
  {
    unitId: "b1", unitNum: "1", title: "Nouvelles vies",
    color: "#10B981", bg: "#E7F8F1",
    topic: "Les sons [y] et [u]",
    topicVi: "Phân biệt [y] (tu) và [u] (tout)",
    sounds: [
      {
        id: "son_y",
        phoneme: "[y]",
        label: "Âm [y] — « tu », « vu »",
        graphemes: ["u", "û", "eu (trong « j'ai eu »)"],
        description: "[y] — môi tròn, lưỡi ra TRƯỚC",
        descVi: "Không có trong tiếng Việt. Mẹo: đọc « i » (như « đi »), giữ nguyên lưỡi, rồi chu môi tròn lại. Lưỡi vẫn ở phía trước!",
        examples: [
          { word: "tu",       vi: "bạn (thân mật)" },
          { word: "vu",       vi: "đã thấy (voir)" },
          { word: "lu",       vi: "đã đọc (lire)" },
          { word: "dû",       vi: "đã phải (devoir)" },
          { word: "j'ai eu",  vi: "tôi đã có (avoir)" },
          { word: "salut",    vi: "chào" },
        ],
        tip: "Bí quyết: nói « i » → giữ lưỡi y nguyên → chỉ chu môi. Nếu lưỡi tụt về sau, bạn sẽ ra [u] mất rồi.",
      },
      {
        id: "son_u",
        phoneme: "[u]",
        label: "Âm [u] — « tout », « vous »",
        graphemes: ["ou", "où", "oû (août)"],
        description: "[u] — môi tròn, lưỡi ra SAU",
        descVi: "Chính là âm « u » của tiếng Việt (như trong « tu hú »). Môi chu, lưỡi kéo về phía sau cổ họng.",
        examples: [
          { word: "tout",   vi: "tất cả" },
          { word: "vous",   vi: "các bạn / ngài" },
          { word: "doux",   vi: "mềm, dịu" },
          { word: "fou",    vi: "điên" },
          { word: "où",     vi: "ở đâu" },
          { word: "août",   vi: "tháng Tám" },
        ],
        tip: "Viết « ou » → luôn đọc [u]. Viết « u » một mình → luôn đọc [y]. Đây là quy tắc gần như tuyệt đối.",
      },
    ],
    pairs: [
      { a: "tu",   b: "tout",  aVi: "bạn",            bVi: "tất cả",       note: "[y] vs [u]" },
      { a: "vu",   b: "vous",  aVi: "đã thấy",        bVi: "các bạn",      note: "[y] vs [u]" },
      { a: "su",   b: "sous",  aVi: "đã biết",        bVi: "ở dưới",       note: "[y] vs [u]" },
      { a: "dessus", b: "dessous", aVi: "ở trên",     bVi: "ở dưới",       note: "Cặp dễ nhầm nhất!" },
      { a: "bu",   b: "boue",  aVi: "đã uống",        bVi: "bùn",          note: "[y] vs [u]" },
      { a: "rue",  b: "roue",  aVi: "con đường",      bVi: "bánh xe",      note: "[y] vs [u]" },
    ],
    practice: [
      "Tu as su. Tu as dû. Tu as lu. Tu as vu. Tu as bu.",
      "C'est à vous. C'est mou. C'est fou. C'est doux. C'est tout.",
      "Tu as eu un rendez-vous hier soir et tu as dû annuler ta soirée.",
      "Nous nous retrouvons où pour les vacances au mois d'août ?",
      "Salut Julie ! Avec ma cousine, nous avons participé aux Journées du patrimoine à Toulouse.",
      "Nous avons eu la chance de rencontrer beaucoup d'artistes. Nous nous sommes bien amusées.",
    ],
    quiz: [
      { word: "tu",       target: "son_y", label: "[y]" },
      { word: "tout",     target: "son_u", label: "[u]" },
      { word: "vous",     target: "son_u", label: "[u]" },
      { word: "vu",       target: "son_y", label: "[y]" },
      { word: "août",     target: "son_u", label: "[u]" },
      { word: "dû",       target: "son_y", label: "[y]" },
      { word: "j'ai eu",  target: "son_y", label: "[y]" },
      { word: "doux",     target: "son_u", label: "[u]" },
      { word: "salut",    target: "son_y", label: "[y]" },
      { word: "Toulouse", target: "son_u", label: "[u]" },
    ],
  },
];
