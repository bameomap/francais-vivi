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
      { id:"parler",   icon:"🗣️", kind:"Nói",       color:"#D97706", sub:"Chủ điểm nói & câu mẫu",     section:"conversation",  view:"conversation"  },
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

// ── Per-unit cycle overrides ────────────────────────────────────────────
// A1 units default to the flat "Khám phá / Luyện tập / Kiểm tra" grouping
// above. A unit can instead follow the book's own document → grammar →
// vocabulaire rhythm (same idea as A2's STEP_GROUPS_A2) by defining its own
// step groups here and registering it in UNIT_STEP_GROUPS. Units without an
// entry keep using STEP_GROUPS/STEP_DEFS untouched.

// Unité 10 "Au travail !" — 4 documents in the livre (étudiants ambassadeurs,
// visite de l'université, année de césure, exposition Hexagone, télétravail),
// each anchoring one grammar point and a slice of vocabulaire, exactly like
// STEP_GROUPS_A2 does for A2 Unité 1. subIds were cross-checked against
// getStepSubIds("u10", …) so every existing sub-lesson lands in exactly one
// card — see scripts/check-parcours-a1.mjs.
export const STEP_GROUPS_U10 = [
  {
    id: "vong1",
    label: "Vòng 1 · Khám phá trường đại học",
    emoji: "🎓",
    steps: [
      { id:"v1_lecture", stepKey:"lecture", subIds:["u10-livre-etudiants-ambassadeurs"],
        icon:"📜", kind:"Đọc", color:"#059669", sub:"Rencontrez les étudiants ambassadeurs !",
        section:"lecture", view:"lecture" },
      { id:"v1_ecouter", stepKey:"ecouter", subIds:["u10-b"],
        icon:"🎧", kind:"Nghe", color:"#0891B2", sub:"Visite de l'université",
        section:"dictee", view:"dictee" },
      { id:"v1_grammar", stepKey:"grammar", subIds:["p0"],
        icon:"⚜️", kind:"Ngữ pháp", color:"#1B3A6B", sub:"Pronoms COD (2) — me/te/nous/vous",
        section:"grammar", view:"grammar" },
      { id:"v1_vocab", stepKey:"vocab", subIds:["u10g1"],
        icon:"📖", kind:"Từ vựng", color:"#4A90D9", sub:"Le campus",
        section:"vocab", view:"edito" },
      { id:"v1_parler", stepKey:"parler", subIds:["s0"],
        icon:"🗣️", kind:"Nói", color:"#D97706", sub:"Présenter son université",
        section:"conversation", view:"conversation" },
      { id:"v1_ecrire", stepKey:"ecrire", subIds:["w0"],
        icon:"🖋️", kind:"Viết", color:"#E67E22", sub:"Profil étudiant",
        section:"writing", view:"writing" },
    ],
  },
  {
    id: "vong2",
    label: "Vòng 2 · Con đường học tập",
    emoji: "🎒",
    steps: [
      { id:"v2_ecouter", stepKey:"ecouter", subIds:["u10-c"],
        icon:"🎧", kind:"Nghe", color:"#0891B2", sub:"L'année de césure",
        section:"dictee", view:"dictee" },
      { id:"v2_grammar", stepKey:"grammar", subIds:["p3"],
        icon:"⚜️", kind:"Ngữ pháp", color:"#1B3A6B", sub:"La durée — pendant/toujours/longtemps",
        section:"grammar", view:"grammar" },
      { id:"v2_vocab", stepKey:"vocab", subIds:["u10g2","u10g3"],
        icon:"📖", kind:"Từ vựng", color:"#4A90D9", sub:"Les études, les personnes · les disciplines",
        section:"vocab", view:"edito" },
      { id:"v2_verbes", stepKey:"verbes", subIds:["present","passe","futur_pro"],
        icon:"🖊️", kind:"Động từ", color:"#7B6CF6", sub:"Ôn tập: présent · passé composé · futur proche",
        section:"reference_hub", view:"reference_hub", refTab:"verbes" },
      { id:"v2_parler", stepKey:"parler", subIds:["s1","s2"],
        icon:"🗣️", kind:"Nói", color:"#D97706", sub:"Compétences · projet professionnel",
        section:"conversation", view:"conversation" },
      { id:"v2_ecrire", stepKey:"ecrire", subIds:["w1"],
        icon:"🖋️", kind:"Viết", color:"#E67E22", sub:"Projet professionnel",
        section:"writing", view:"writing" },
    ],
  },
  {
    id: "vong3",
    label: "Vòng 3 · Chân dung & nghề nghiệp",
    emoji: "👥",
    steps: [
      { id:"v3_lecture", stepKey:"lecture", subIds:["u10-livre-exposition-hexagone"],
        icon:"📜", kind:"Đọc", color:"#059669", sub:"L'exposition Hexagone",
        section:"lecture", view:"lecture" },
      { id:"v3_grammar", stepKey:"grammar", subIds:["p1"],
        icon:"⚜️", kind:"Ngữ pháp", color:"#1B3A6B", sub:"Pronoms relatifs — qui / que",
        section:"grammar", view:"grammar" },
      { id:"v3_vocab", stepKey:"vocab", subIds:["u10g5"],
        icon:"📖", kind:"Từ vựng", color:"#4A90D9", sub:"Les professions",
        section:"vocab", view:"edito" },
      { id:"v3_parler", stepKey:"parler", subIds:["s3"],
        icon:"🗣️", kind:"Nói", color:"#D97706", sub:"Parler de son travail et de ses études",
        section:"conversation", view:"conversation" },
    ],
  },
  {
    id: "vong4",
    label: "Vòng 4 · Cuộc sống công sở",
    emoji: "💻",
    steps: [
      { id:"v4_ecouter", stepKey:"ecouter", subIds:["u10-f"],
        icon:"🎧", kind:"Nghe", color:"#0891B2", sub:"Pour ou contre le télétravail ?",
        section:"dictee", view:"dictee" },
      { id:"v4_grammar", stepKey:"grammar", subIds:["p2"],
        icon:"⚜️", kind:"Ngữ pháp", color:"#1B3A6B", sub:"L'intensité — un peu/assez/très/beaucoup/trop",
        section:"grammar", view:"grammar" },
      { id:"v4_vocab", stepKey:"vocab", subIds:["u10g4","u10g6","u10g7","u10g8","u10g9"],
        icon:"📖", kind:"Từ vựng", color:"#4A90D9", sub:"L'entreprise · tâches · outils · intensité",
        section:"vocab", view:"edito" },
    ],
  },
  {
    id: "bilan",
    label: "Tổng kết",
    emoji: "⚫",
    steps: [
      { id:"bilan_lecture", stepKey:"lecture", subIds:["u10-cahier-travail-equipe","u10-delf-annonces-universite"],
        icon:"📜", kind:"Đọc thêm", color:"#059669", sub:"Travail d'équipe · Annonces DELF",
        section:"lecture", view:"lecture" },
      { id:"bilan_ecouter", stepKey:"ecouter", subIds:["u10-essentiel"],
        icon:"🎧", kind:"Nghe", color:"#0891B2", sub:"Compréhension orale cuối bài",
        section:"dictee", view:"dictee" },
      { id:"bilan_phono", stepKey:"phono", subIds:["accent_tonique","groupes_rythmiques","quiz"],
        icon:"🎵", kind:"Phono", color:"#E8574A", sub:"Nhịp điệu & trọng âm",
        section:"reference_hub", view:"reference_hub", refTab:"phono" },
      { id:"bilan_ecrire", stepKey:"ecrire", subIds:["w2"],
        icon:"🖋️", kind:"Viết", color:"#E67E22", sub:"Centre de langue (Atelier médiation)",
        section:"writing", view:"writing" },
      { id:"bilan_quiz", stepKey:"quiz", subIds:["quiz"],
        icon:"🏆", kind:"Quiz bài", color:"#E8574A", sub:"Quiz tổng hợp toàn bài",
        section:"quiz-unit", view:"quiz-unit" },
    ],
  },
];
export const STEP_DEFS_U10 = STEP_GROUPS_U10.flatMap(g => g.steps);

// Unité 5 "C'est tendance !" — vêtements/adjectifs, météo/saisons, objets/cadeaux.
export const STEP_GROUPS_U5 = [
  {
    id: "vong1", label: "Vòng 1 · Trong cửa hàng thời trang", emoji: "👗",
    steps: [
      { id:"v1_lecture", stepKey:"lecture", subIds:["u5-livre-la-mode"],
        icon:"📜", kind:"Đọc", color:"#059669", sub:"La mode est à nous !", section:"lecture", view:"lecture" },
      { id:"v1_ecouter", stepKey:"ecouter", subIds:["u5-b"],
        icon:"🎧", kind:"Nghe", color:"#0891B2", sub:"Un styliste personnel", section:"dictee", view:"dictee" },
      { id:"v1_grammar", stepKey:"grammar", subIds:["p0","p2"],
        icon:"⚜️", kind:"Ngữ pháp", color:"#1B3A6B", sub:"Giống/số và vị trí của tính từ", section:"grammar", view:"grammar" },
      { id:"v1_vocab", stepKey:"vocab", subIds:["u5g1","u5g3"],
        icon:"📖", kind:"Từ vựng", color:"#4A90D9", sub:"Les vêtements · les couleurs", section:"vocab", view:"edito" },
      { id:"v1_parler", stepKey:"parler", subIds:["s0"],
        icon:"🗣️", kind:"Nói", color:"#D97706", sub:"Dans un magasin", section:"conversation", view:"conversation" },
      { id:"v1_ecrire", stepKey:"ecrire", subIds:["w0"],
        icon:"🖋️", kind:"Viết", color:"#E67E22", sub:"Journal en ligne", section:"writing", view:"writing" },
    ],
  },
  {
    id: "vong2", label: "Vòng 2 · Thời tiết & mùa trong năm", emoji: "🌤️",
    steps: [
      { id:"v2_ecouter", stepKey:"ecouter", subIds:["u5-c"],
        icon:"🎧", kind:"Nghe", color:"#0891B2", sub:"Une saison, un vêtement", section:"dictee", view:"dictee" },
      { id:"v2_grammar", stepKey:"grammar", subIds:["p3"],
        icon:"⚜️", kind:"Ngữ pháp", color:"#1B3A6B", sub:"Tính từ chỉ định — ce/cet/cette/ces", section:"grammar", view:"grammar" },
      { id:"v2_vocab", stepKey:"vocab", subIds:["u5g5","u5g4"],
        icon:"📖", kind:"Từ vựng", color:"#4A90D9", sub:"La météo · les matières", section:"vocab", view:"edito" },
      { id:"v2_parler", stepKey:"parler", subIds:["s1"],
        icon:"🗣️", kind:"Nói", color:"#D97706", sub:"Parler de la météo", section:"conversation", view:"conversation" },
    ],
  },
  {
    id: "vong3", label: "Vòng 3 · Đồ vật & quà tặng", emoji: "🎁",
    steps: [
      { id:"v3_lecture", stepKey:"lecture", subIds:["u5-livre-vous-participez","u5-livre-personnalisez-objets"],
        icon:"📜", kind:"Đọc", color:"#059669", sub:"Vous participez ? · Personnalisez vos objets !", section:"lecture", view:"lecture" },
      { id:"v3_ecouter", stepKey:"ecouter", subIds:["u5-f"],
        icon:"🎧", kind:"Nghe", color:"#0891B2", sub:"Quel cadeau pour Valentin ?", section:"dictee", view:"dictee" },
      { id:"v3_grammar", stepKey:"grammar", subIds:["p1","p4"],
        icon:"⚜️", kind:"Ngữ pháp", color:"#1B3A6B", sub:"Futur proche · vendre/mettre/venir", section:"grammar", view:"grammar" },
      { id:"v3_vocab", stepKey:"vocab", subIds:["u5g2","u5g6","u5g7","u5g8"],
        icon:"📖", kind:"Từ vựng", color:"#4A90D9", sub:"Accessoires · objets techno · objets du quotidien", section:"vocab", view:"edito" },
      { id:"v3_parler", stepKey:"parler", subIds:["s2","s3"],
        icon:"🗣️", kind:"Nói", color:"#D97706", sub:"Décrire un objet · poids/taille/matière/prix", section:"conversation", view:"conversation" },
      { id:"v3_ecrire", stepKey:"ecrire", subIds:["w1","w2"],
        icon:"🖋️", kind:"Viết", color:"#E67E22", sub:"Annonce produit · message shopping", section:"writing", view:"writing" },
    ],
  },
  {
    id: "bilan", label: "Tổng kết", emoji: "⚫",
    steps: [
      { id:"bilan_lecture", stepKey:"lecture", subIds:["u5-delf-yasmine"],
        icon:"📜", kind:"Đọc thêm", color:"#059669", sub:"Annonce DELF", section:"lecture", view:"lecture" },
      { id:"bilan_ecouter", stepKey:"ecouter", subIds:["u5-essentiel1","u5-essentiel2"],
        icon:"🎧", kind:"Nghe", color:"#0891B2", sub:"Compréhension orale cuối bài", section:"dictee", view:"dictee" },
      { id:"bilan_verbes", stepKey:"verbes", subIds:["present"],
        icon:"🖊️", kind:"Động từ", color:"#7B6CF6", sub:"Ôn tập présent", section:"reference_hub", view:"reference_hub", refTab:"verbes" },
      { id:"bilan_phono", stepKey:"phono", subIds:["son_e_ferme","son_e_ouvert","e_muet","quiz"],
        icon:"🎵", kind:"Phono", color:"#E8574A", sub:"Les sons [e], [ɛ] và e muet", section:"reference_hub", view:"reference_hub", refTab:"phono" },
      { id:"bilan_quiz", stepKey:"quiz", subIds:["quiz"],
        icon:"🏆", kind:"Quiz bài", color:"#E8574A", sub:"Quiz tổng hợp toàn bài", section:"quiz-unit", view:"quiz-unit" },
    ],
  },
];
export const STEP_DEFS_U5 = STEP_GROUPS_U5.flatMap(g => g.steps);

// Unité 6 "Qu'est-ce qu'on fait aujourd'hui ?" — journée active, sorties/temps
// libre, séries/portraits.
export const STEP_GROUPS_U6 = [
  {
    id: "vong1", label: "Vòng 1 · Một ngày bận rộn", emoji: "⏰",
    steps: [
      { id:"v1_lecture", stepKey:"lecture", subIds:["u6-livre-journee-active"],
        icon:"📜", kind:"Đọc", color:"#059669", sub:"Une journée active", section:"lecture", view:"lecture" },
      { id:"v1_ecouter", stepKey:"ecouter", subIds:["u6-b"],
        icon:"🎧", kind:"Nghe", color:"#0891B2", sub:"Quel programme !", section:"dictee", view:"dictee" },
      { id:"v1_grammar", stepKey:"grammar", subIds:["p0"],
        icon:"⚜️", kind:"Ngữ pháp", color:"#1B3A6B", sub:"Động từ phản thân ở hiện tại", section:"grammar", view:"grammar" },
      { id:"v1_vocab", stepKey:"vocab", subIds:["u6g1","u6gjms","u6g2"],
        icon:"📖", kind:"Từ vựng", color:"#4A90D9", sub:"Giờ giấc · ngày tháng · hoạt động hằng ngày", section:"vocab", view:"edito" },
      { id:"v1_parler", stepKey:"parler", subIds:["s0"],
        icon:"🗣️", kind:"Nói", color:"#D97706", sub:"Routine quotidienne", section:"conversation", view:"conversation" },
      { id:"v1_ecrire", stepKey:"ecrire", subIds:["w0"],
        icon:"🖋️", kind:"Viết", color:"#E67E22", sub:"Production écrite", section:"writing", view:"writing" },
    ],
  },
  {
    id: "vong2", label: "Vòng 2 · Đi chơi & thời gian rảnh", emoji: "🎭",
    steps: [
      { id:"v2_lecture", stepKey:"lecture", subIds:["u6-livre-idees-lecture"],
        icon:"📜", kind:"Đọc", color:"#059669", sub:"Idées de lecture", section:"lecture", view:"lecture" },
      { id:"v2_ecouter", stepKey:"ecouter", subIds:["u6-c"],
        icon:"🎧", kind:"Nghe", color:"#0891B2", sub:"On sort ce soir ?", section:"dictee", view:"dictee" },
      { id:"v2_grammar", stepKey:"grammar", subIds:["p1","p3"],
        icon:"⚜️", kind:"Ngữ pháp", color:"#1B3A6B", sub:"Tần suất (2) · partir/sortir/dormir", section:"grammar", view:"grammar" },
      { id:"v2_vocab", stepKey:"vocab", subIds:["u6g3","u6g4","u6g5"],
        icon:"📖", kind:"Từ vựng", color:"#4A90D9", sub:"Việc nhà · thời gian rảnh · sinh hoạt văn hoá", section:"vocab", view:"edito" },
      { id:"v2_parler", stepKey:"parler", subIds:["s1"],
        icon:"🗣️", kind:"Nói", color:"#D97706", sub:"Proposer une sortie", section:"conversation", view:"conversation" },
      { id:"v2_ecrire", stepKey:"ecrire", subIds:["w2"],
        icon:"🖋️", kind:"Viết", color:"#E67E22", sub:"Agenda", section:"writing", view:"writing" },
    ],
  },
  {
    id: "vong3", label: "Vòng 3 · Phim ảnh & chân dung", emoji: "📺",
    steps: [
      { id:"v3_lecture", stepKey:"lecture", subIds:["u6-livre-casting"],
        icon:"📜", kind:"Đọc", color:"#059669", sub:"Casting", section:"lecture", view:"lecture" },
      { id:"v3_ecouter", stepKey:"ecouter", subIds:["u6-f"],
        icon:"🎧", kind:"Nghe", color:"#0891B2", sub:"Une série à suivre !", section:"dictee", view:"dictee" },
      { id:"v3_grammar", stepKey:"grammar", subIds:["p2","p4"],
        icon:"⚜️", kind:"Ngữ pháp", color:"#1B3A6B", sub:"Passé récent · pouvoir/vouloir", section:"grammar", view:"grammar" },
      { id:"v3_vocab", stepKey:"vocab", subIds:["u6g6","u6g7"],
        icon:"📖", kind:"Từ vựng", color:"#4A90D9", sub:"Ngoại hình · tính cách", section:"vocab", view:"edito" },
      { id:"v3_parler", stepKey:"parler", subIds:["s2","s3"],
        icon:"🗣️", kind:"Nói", color:"#D97706", sub:"Décrire une personne · proposer une sortie", section:"conversation", view:"conversation" },
      { id:"v3_ecrire", stepKey:"ecrire", subIds:["w1"],
        icon:"🖋️", kind:"Viết", color:"#E67E22", sub:"Affiche d'une célébrité", section:"writing", view:"writing" },
    ],
  },
  {
    id: "bilan", label: "Tổng kết", emoji: "⚫",
    steps: [
      { id:"bilan_lecture", stepKey:"lecture", subIds:["u6-cahier-a-plus-tard","u6-delf-casting"],
        icon:"📜", kind:"Đọc thêm", color:"#059669", sub:"À plus tard ! · Casting DELF", section:"lecture", view:"lecture" },
      { id:"bilan_ecouter", stepKey:"ecouter", subIds:["u6-essentiel1","u6-essentiel2"],
        icon:"🎧", kind:"Nghe", color:"#0891B2", sub:"Compréhension orale cuối bài", section:"dictee", view:"dictee" },
      { id:"bilan_verbes", stepKey:"verbes", subIds:["present","futur_pro"],
        icon:"🖊️", kind:"Động từ", color:"#7B6CF6", sub:"Ôn tập présent · futur proche", section:"reference_hub", view:"reference_hub", refTab:"verbes" },
      { id:"bilan_phono", stepKey:"phono", subIds:["son_ch","son_j","quiz"],
        icon:"🎵", kind:"Phono", color:"#E8574A", sub:"Les sons [ʃ] et [ʒ]", section:"reference_hub", view:"reference_hub", refTab:"phono" },
      { id:"bilan_quiz", stepKey:"quiz", subIds:["quiz"],
        icon:"🏆", kind:"Quiz bài", color:"#E8574A", sub:"Quiz tổng hợp toàn bài", section:"quiz-unit", view:"quiz-unit" },
    ],
  },
];
export const STEP_DEFS_U6 = STEP_GROUPS_U6.flatMap(g => g.steps);

// Unité 7 "Chez moi !" — trouver un logement, s'installer/vivre ensemble,
// problèmes de voisinage.
export const STEP_GROUPS_U7 = [
  {
    id: "vong1", label: "Vòng 1 · Tìm nhà mới", emoji: "🏠",
    steps: [
      { id:"v1_lecture", stepKey:"lecture", subIds:["u7-livre-vide-grenier"],
        icon:"📜", kind:"Đọc", color:"#059669", sub:"Au vide-grenier", section:"lecture", view:"lecture" },
      { id:"v1_ecouter", stepKey:"ecouter", subIds:["u7-a"],
        icon:"🎧", kind:"Nghe", color:"#0891B2", sub:"Un nouveau logement", section:"dictee", view:"dictee" },
      { id:"v1_grammar", stepKey:"grammar", subIds:["p0"],
        icon:"⚜️", kind:"Ngữ pháp", color:"#1B3A6B", sub:"Passé composé (1) với avoir", section:"grammar", view:"grammar" },
      { id:"v1_vocab", stepKey:"vocab", subIds:["u7g1","u7g2","u7g4"],
        icon:"📖", kind:"Từ vựng", color:"#4A90D9", sub:"Nhà ở · các phòng · đồ điện gia dụng", section:"vocab", view:"edito" },
      { id:"v1_parler", stepKey:"parler", subIds:["s0","s3"],
        icon:"🗣️", kind:"Nói", color:"#D97706", sub:"Décrire son logement · chercher un logement", section:"conversation", view:"conversation" },
      { id:"v1_ecrire", stepKey:"ecrire", subIds:["w0"],
        icon:"🖋️", kind:"Viết", color:"#E67E22", sub:"Annonce logement", section:"writing", view:"writing" },
    ],
  },
  {
    id: "vong2", label: "Vòng 2 · Dọn vào & sống chung", emoji: "🛋️",
    steps: [
      { id:"v2_lecture", stepKey:"lecture", subIds:["u7-livre-vivre-ensemble"],
        icon:"📜", kind:"Đọc", color:"#059669", sub:"Vivre ensemble !", section:"lecture", view:"lecture" },
      { id:"v2_ecouter", stepKey:"ecouter", subIds:["u7-c"],
        icon:"🎧", kind:"Nghe", color:"#0891B2", sub:"On bouge les meubles !", section:"dictee", view:"dictee" },
      { id:"v2_grammar", stepKey:"grammar", subIds:["p1","p2"],
        icon:"⚜️", kind:"Ngữ pháp", color:"#1B3A6B", sub:"Giới từ chỉ vị trí (2) · obligation/interdiction", section:"grammar", view:"grammar" },
      { id:"v2_vocab", stepKey:"vocab", subIds:["u7g3","u7g5","u7g9"],
        icon:"📖", kind:"Từ vựng", color:"#4A90D9", sub:"Đồ nội thất · trang trí · giới từ chỉ vị trí", section:"vocab", view:"edito" },
      { id:"v2_parler", stepKey:"parler", subIds:["s1"],
        icon:"🗣️", kind:"Nói", color:"#D97706", sub:"Règles de colocation", section:"conversation", view:"conversation" },
    ],
  },
  {
    id: "vong3", label: "Vòng 3 · Sự cố hàng xóm", emoji: "🔧",
    steps: [
      { id:"v3_ecouter", stepKey:"ecouter", subIds:["u7-f","u7-g"],
        icon:"🎧", kind:"Nghe", color:"#0891B2", sub:"Chers voisins · Problèmes à la maison !", section:"dictee", view:"dictee" },
      { id:"v3_grammar", stepKey:"grammar", subIds:["p3","p4"],
        icon:"⚜️", kind:"Ngữ pháp", color:"#1B3A6B", sub:"Pronoms COD (1) · connaître", section:"grammar", view:"grammar" },
      { id:"v3_vocab", stepKey:"vocab", subIds:["u7g6","u7g7","u7g8"],
        icon:"📖", kind:"Từ vựng", color:"#4A90D9", sub:"Toà nhà · sự cố · thợ sửa chữa", section:"vocab", view:"edito" },
      { id:"v3_parler", stepKey:"parler", subIds:["s2"],
        icon:"🗣️", kind:"Nói", color:"#D97706", sub:"Problème domestique", section:"conversation", view:"conversation" },
      { id:"v3_ecrire", stepKey:"ecrire", subIds:["w1","w2"],
        icon:"🖋️", kind:"Viết", color:"#E67E22", sub:"Message d'excuse · demande de réparation", section:"writing", view:"writing" },
    ],
  },
  {
    id: "bilan", label: "Tổng kết", emoji: "⚫",
    steps: [
      { id:"bilan_lecture", stepKey:"lecture", subIds:["u7-delf-demenagement"],
        icon:"📜", kind:"Đọc thêm", color:"#059669", sub:"Déménagement (DELF)", section:"lecture", view:"lecture" },
      { id:"bilan_ecouter", stepKey:"ecouter", subIds:["u7-essentiel1","u7-essentiel2"],
        icon:"🎧", kind:"Nghe", color:"#0891B2", sub:"Compréhension orale cuối bài", section:"dictee", view:"dictee" },
      { id:"bilan_verbes", stepKey:"verbes", subIds:["present"],
        icon:"🖊️", kind:"Động từ", color:"#7B6CF6", sub:"Ôn tập présent", section:"reference_hub", view:"reference_hub", refTab:"verbes" },
      { id:"bilan_phono", stepKey:"phono", subIds:["son_j_yod","son_w","quiz"],
        icon:"🎵", kind:"Phono", color:"#E8574A", sub:"Les semi-voyelles [j], [w], [ɥ]", section:"reference_hub", view:"reference_hub", refTab:"phono" },
      { id:"bilan_quiz", stepKey:"quiz", subIds:["quiz"],
        icon:"🏆", kind:"Quiz bài", color:"#E8574A", sub:"Quiz tổng hợp toàn bài", section:"quiz-unit", view:"quiz-unit" },
    ],
  },
];
export const STEP_DEFS_U7 = STEP_GROUPS_U7.flatMap(g => g.steps);

// Unité 8 "En forme !" — chez le médecin, bouger au quotidien, bien manger.
export const STEP_GROUPS_U8 = [
  {
    id: "vong1", label: "Vòng 1 · Đi khám bác sĩ", emoji: "🩺",
    steps: [
      { id:"v1_lecture", stepKey:"lecture", subIds:["u8-livre-forum-sante"],
        icon:"📜", kind:"Đọc", color:"#059669", sub:"Forum Santé", section:"lecture", view:"lecture" },
      { id:"v1_ecouter", stepKey:"ecouter", subIds:["u8-b"],
        icon:"🎧", kind:"Nghe", color:"#0891B2", sub:"Bonjour docteure !", section:"dictee", view:"dictee" },
      { id:"v1_grammar", stepKey:"grammar", subIds:["p0"],
        icon:"⚜️", kind:"Ngữ pháp", color:"#1B3A6B", sub:"Passé composé (2) — participes bất quy tắc", section:"grammar", view:"grammar" },
      { id:"v1_vocab", stepKey:"vocab", subIds:["u8g1","u8g2","u8g3","u8g4","u8g5","u8g6","u8g7"],
        icon:"📖", kind:"Từ vựng", color:"#4A90D9", sub:"Cơ thể · sức khoẻ · cảm xúc", section:"vocab", view:"edito" },
      { id:"v1_parler", stepKey:"parler", subIds:["s0","s3"],
        icon:"🗣️", kind:"Nói", color:"#D97706", sub:"Chez le médecin", section:"conversation", view:"conversation" },
      { id:"v1_ecrire", stepKey:"ecrire", subIds:["w1"],
        icon:"🖋️", kind:"Viết", color:"#E67E22", sub:"Message santé", section:"writing", view:"writing" },
    ],
  },
  {
    id: "vong2", label: "Vòng 2 · Vận động mỗi ngày", emoji: "🏃",
    steps: [
      { id:"v2_lecture", stepKey:"lecture", subIds:["u8-livre-bougez-quotidien"],
        icon:"📜", kind:"Đọc", color:"#059669", sub:"Bougez au quotidien !", section:"lecture", view:"lecture" },
      { id:"v2_ecouter", stepKey:"ecouter", subIds:["u8-c"],
        icon:"🎧", kind:"Nghe", color:"#0891B2", sub:"Marcher, ça fait du bien !", section:"dictee", view:"dictee" },
      { id:"v2_grammar", stepKey:"grammar", subIds:["p1"],
        icon:"⚜️", kind:"Ngữ pháp", color:"#1B3A6B", sub:"Pronom Y", section:"grammar", view:"grammar" },
      { id:"v2_vocab", stepKey:"vocab", subIds:["u8g8","u8g10"],
        icon:"📖", kind:"Từ vựng", color:"#4A90D9", sub:"Phòng gym · các môn thể thao", section:"vocab", view:"edito" },
      { id:"v2_parler", stepKey:"parler", subIds:["s1"],
        icon:"🗣️", kind:"Nói", color:"#D97706", sub:"Sport et santé", section:"conversation", view:"conversation" },
      { id:"v2_ecrire", stepKey:"ecrire", subIds:["w0"],
        icon:"🖋️", kind:"Viết", color:"#E67E22", sub:"Programme sport et bien-être", section:"writing", view:"writing" },
    ],
  },
  {
    id: "vong3", label: "Vòng 3 · Ăn uống & lời khuyên", emoji: "🥗",
    steps: [
      { id:"v3_lecture", stepKey:"lecture", subIds:["u8-livre-sport-bien-etre"],
        icon:"📜", kind:"Đọc", color:"#059669", sub:"Sport et bien-être", section:"lecture", view:"lecture" },
      { id:"v3_ecouter", stepKey:"ecouter", subIds:["u8-f"],
        icon:"🎧", kind:"Nghe", color:"#0891B2", sub:"Manger sain", section:"dictee", view:"dictee" },
      { id:"v3_grammar", stepKey:"grammar", subIds:["p2","p3","p4"],
        icon:"⚜️", kind:"Ngữ pháp", color:"#1B3A6B", sub:"Devoir · le conseil · boire", section:"grammar", view:"grammar" },
      { id:"v3_vocab", stepKey:"vocab", subIds:["u8g9"],
        icon:"📖", kind:"Từ vựng", color:"#4A90D9", sub:"L'alimentation", section:"vocab", view:"edito" },
      { id:"v3_parler", stepKey:"parler", subIds:["s2"],
        icon:"🗣️", kind:"Nói", color:"#D97706", sub:"Donner un conseil", section:"conversation", view:"conversation" },
      { id:"v3_ecrire", stepKey:"ecrire", subIds:["w2"],
        icon:"🖋️", kind:"Viết", color:"#E67E22", sub:"Production écrite", section:"writing", view:"writing" },
    ],
  },
  {
    id: "bilan", label: "Tổng kết", emoji: "⚫",
    steps: [
      { id:"bilan_lecture", stepKey:"lecture", subIds:["u8-cahier-ordonnance","u8-delf-des-nouvelles"],
        icon:"📜", kind:"Đọc thêm", color:"#059669", sub:"Qu'est-ce qui vous arrive ? · Des nouvelles (DELF)", section:"lecture", view:"lecture" },
      { id:"bilan_ecouter", stepKey:"ecouter", subIds:["u8-essentiel1","u8-essentiel2"],
        icon:"🎧", kind:"Nghe", color:"#0891B2", sub:"Compréhension orale cuối bài", section:"dictee", view:"dictee" },
      { id:"bilan_verbes", stepKey:"verbes", subIds:["present"],
        icon:"🖊️", kind:"Động từ", color:"#7B6CF6", sub:"Ôn tập présent", section:"reference_hub", view:"reference_hub", refTab:"verbes" },
      { id:"bilan_phono", stepKey:"phono", subIds:["cons_muettes","cons_prononcees","quiz"],
        icon:"🎵", kind:"Phono", color:"#E8574A", sub:"Phụ âm cuối: câm hay phát âm?", section:"reference_hub", view:"reference_hub", refTab:"phono" },
      { id:"bilan_quiz", stepKey:"quiz", subIds:["quiz"],
        icon:"🏆", kind:"Quiz bài", color:"#E8574A", sub:"Quiz tổng hợp toàn bài", section:"quiz-unit", view:"quiz-unit" },
    ],
  },
];
export const STEP_DEFS_U8 = STEP_GROUPS_U8.flatMap(g => g.steps);

// Unité 9 "Bonnes vacances !" — réserver/voyager, destinations et paysages,
// retour de voyage.
export const STEP_GROUPS_U9 = [
  {
    id: "vong1", label: "Vòng 1 · Đặt phòng & di chuyển", emoji: "✈️",
    steps: [
      { id:"v1_ecouter", stepKey:"ecouter", subIds:["u9-b","u9-c"],
        icon:"🎧", kind:"Nghe", color:"#0891B2", sub:"Hôtel Atlantique · à l'aéroport", section:"dictee", view:"dictee" },
      { id:"v1_grammar", stepKey:"grammar", subIds:["p0","p3"],
        icon:"⚜️", kind:"Ngữ pháp", color:"#1B3A6B", sub:"So sánh · giới từ chỉ xuất xứ", section:"grammar", view:"grammar" },
      { id:"v1_vocab", stepKey:"vocab", subIds:["u9g2","u9g3","u9g4"],
        icon:"📖", kind:"Từ vựng", color:"#4A90D9", sub:"Chỗ ở · đặt phòng · phương tiện di chuyển", section:"vocab", view:"edito" },
      { id:"v1_parler", stepKey:"parler", subIds:["s0","s3"],
        icon:"🗣️", kind:"Nói", color:"#D97706", sub:"Réserver un hôtel · planifier des vacances", section:"conversation", view:"conversation" },
    ],
  },
  {
    id: "vong2", label: "Vòng 2 · Điểm đến & thiên nhiên", emoji: "🏞️",
    steps: [
      { id:"v2_lecture", stepKey:"lecture", subIds:["u9-livre-idees-vacances","u9-livre-visitez-france"],
        icon:"📜", kind:"Đọc", color:"#059669", sub:"5 idées de vacances · Visitez la France", section:"lecture", view:"lecture" },
      { id:"v2_grammar", stepKey:"grammar", subIds:["p2"],
        icon:"⚜️", kind:"Ngữ pháp", color:"#1B3A6B", sub:"L'imparfait — miêu tả trong quá khứ", section:"grammar", view:"grammar" },
      { id:"v2_vocab", stepKey:"vocab", subIds:["u9g1","u9g5","u9g6","u9g7","u9g8","u9g9"],
        icon:"📖", kind:"Từ vựng", color:"#4A90D9", sub:"Điểm đến · hoạt động · thiên nhiên", section:"vocab", view:"edito" },
      { id:"v2_parler", stepKey:"parler", subIds:["s1","s2"],
        icon:"🗣️", kind:"Nói", color:"#D97706", sub:"Décrire une destination · préférences", section:"conversation", view:"conversation" },
      { id:"v2_ecrire", stepKey:"ecrire", subIds:["w1"],
        icon:"🖋️", kind:"Viết", color:"#E67E22", sub:"Brochure touristique", section:"writing", view:"writing" },
    ],
  },
  {
    id: "vong3", label: "Vòng 3 · Trở về sau chuyến đi", emoji: "📮",
    steps: [
      { id:"v3_lecture", stepKey:"lecture", subIds:["u9-livre-bonjour-marseille"],
        icon:"📜", kind:"Đọc", color:"#059669", sub:"Bonjour de Marseille !", section:"lecture", view:"lecture" },
      { id:"v3_ecouter", stepKey:"ecouter", subIds:["u9-f"],
        icon:"🎧", kind:"Nghe", color:"#0891B2", sub:"Retour de vacances", section:"dictee", view:"dictee" },
      { id:"v3_grammar", stepKey:"grammar", subIds:["p1"],
        icon:"⚜️", kind:"Ngữ pháp", color:"#1B3A6B", sub:"Passé composé với être", section:"grammar", view:"grammar" },
      { id:"v3_ecrire", stepKey:"ecrire", subIds:["w0","w2"],
        icon:"🖋️", kind:"Viết", color:"#E67E22", sub:"Carte postale · avis de voyage", section:"writing", view:"writing" },
    ],
  },
  {
    id: "bilan", label: "Tổng kết", emoji: "⚫",
    steps: [
      { id:"bilan_lecture", stepKey:"lecture", subIds:["u9-delf-bretagne-passion"],
        icon:"📜", kind:"Đọc thêm", color:"#059669", sub:"Bretagne Passion (DELF)", section:"lecture", view:"lecture" },
      { id:"bilan_ecouter", stepKey:"ecouter", subIds:["u9-essentiel1","u9-essentiel2"],
        icon:"🎧", kind:"Nghe", color:"#0891B2", sub:"Compréhension orale cuối bài", section:"dictee", view:"dictee" },
      { id:"bilan_verbes", stepKey:"verbes", subIds:["present","passe"],
        icon:"🖊️", kind:"Động từ", color:"#7B6CF6", sub:"Ôn tập présent · passé composé", section:"reference_hub", view:"reference_hub", refTab:"verbes" },
      { id:"bilan_phono", stepKey:"phono", subIds:["intonation_question","intonation_affirmation","quiz"],
        icon:"🎵", kind:"Phono", color:"#E8574A", sub:"L'intonation montante et descendante", section:"reference_hub", view:"reference_hub", refTab:"phono" },
      { id:"bilan_quiz", stepKey:"quiz", subIds:["quiz"],
        icon:"🏆", kind:"Quiz bài", color:"#E8574A", sub:"Quiz tổng hợp toàn bài", section:"quiz-unit", view:"quiz-unit" },
    ],
  },
];
export const STEP_DEFS_U9 = STEP_GROUPS_U9.flatMap(g => g.steps);

const UNIT_STEP_GROUPS = {
  u5: STEP_GROUPS_U5, u6: STEP_GROUPS_U6, u7: STEP_GROUPS_U7, u8: STEP_GROUPS_U8, u9: STEP_GROUPS_U9,
  u10: STEP_GROUPS_U10,
};
const UNIT_STEP_DEFS = {
  u5: STEP_DEFS_U5, u6: STEP_DEFS_U6, u7: STEP_DEFS_U7, u8: STEP_DEFS_U8, u9: STEP_DEFS_U9,
  u10: STEP_DEFS_U10,
};

export const getStepGroupsFor = (unitId) => UNIT_STEP_GROUPS[unitId] || STEP_GROUPS;
export const getStepDefsFor   = (unitId) => UNIT_STEP_DEFS[unitId]   || STEP_DEFS;
