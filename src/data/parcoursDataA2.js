// Le Parcours — A2 Édito unit definitions
// Ids are prefixed "b" (b1, b2, …) so localStorage progress never collides
// with Édito A1's "u"/"g" ids (A1 already has units u1–u10).

export const PARCOURS_UNITS_A2 = [
  { id:"b1", num:1, fr:"Nouvelles vies", vi:"Cuộc sống mới", grammar:"Passé composé · Négation · il y a/pendant/depuis", emoji:"🌱" },
];

// ── Step groups ────────────────────────────────────────────────────
// Unlike A1's "one card per skill", A2 follows the book's own rhythm. Édito
// repeats a three-beat cycle inside each unit (livre p.13–26 for Unité 1):
//
//     documents  →  grammar drawn from those documents  →  themed vocabulary
//
// The guide pédagogique states the rule explicitly — grammar starts from
// "un corpus issu d'un document écrit ou audio", and "le lexique est
// contextualisé : les mots sont présents dans les documents des pages
// précédentes". Phonie-graphie sits at the END (p.24) because its corpus is
// drawn from vocabulary already met. So vocabulary-first, phono-first would
// invert the method.
//
// A step therefore covers only PART of a skill. Two fields make that work:
//   • stepKey — the underlying progress bucket ("ecouter", "lecture", …).
//     Panels keep writing there, unchanged, so none of them needed editing.
//   • subIds  — the sub-lessons this particular card owns. Progress and the
//     unit tally are computed over this subset only.
// Across a unit the subIds partition each stepKey exactly once, so the unit
// total is the same 38 sub-lessons as before.
export const STEP_GROUPS_A2 = [
  {
    id: "cycle1",
    label: "Vòng 1 · Parcours de vie",
    emoji: "🔵",
    steps: [
      { id:"c1_ecouter", stepKey:"ecouter", subIds:["b1-a","b1-c"],
        icon:"🎧", kind:"Nghe A + C", color:"#0891B2", sub:"Gaël Faye · Ma vie en France",
        section:"dictee", view:"ecouter" },
      { id:"c1_lecture", stepKey:"lecture", subIds:["b1-livre-histoire-amour"],
        icon:"📜", kind:"Đọc B", color:"#059669", sub:"Une histoire d'amour",
        section:"lecture", view:"lecture" },
      { id:"c1_grammar", stepKey:"grammar", subIds:["p0"],
        icon:"⚜️", kind:"Ngữ pháp", color:"#1B3A6B", sub:"Passé composé",
        section:"grammar", view:"grammar" },
      // Ngay sau ngữ pháp: passé composé chỉ thuộc được khi luyện chia,
      // vì chọn avoir/être và quá khứ phân từ bất quy tắc đều phải nhớ.
      { id:"c1_verbes", stepKey:"verbes", subIds:["present","passe_compose"],
        icon:"🖊️", kind:"Động từ", color:"#7B6CF6", sub:"Chia passé composé · 25 động từ",
        section:"reference_hub", view:"reference_hub", refTab:"verbes" },
      { id:"c1_vocab", stepKey:"vocab", subIds:["b1g1","b1g2","b1g3","b1g4","b1g5"],
        icon:"📖", kind:"Từ vựng", color:"#2E8B57", sub:"Parcours de vie · 5 nhóm",
        section:"vocab", view:"edito" },
      { id:"c1_parler", stepKey:"parler", subIds:["s0","s1"],
        icon:"🗣️", kind:"Nói", color:"#D97706", sub:"Kể parcours · vì sao học tiếng Pháp",
        section:"conversation", view:"conversation" },
      { id:"c1_ecrire", stepKey:"ecrire", subIds:["w0","w1"],
        icon:"🖋️", kind:"Viết", color:"#E67E22", sub:"Couple célèbre · biographie",
        section:"writing", view:"writing" },
    ],
  },
  {
    id: "cycle2",
    label: "Vòng 2 · Loisirs",
    emoji: "🟢",
    steps: [
      { id:"c2_lecture", stepKey:"lecture", subIds:["b1-livre-vacances-famille"],
        icon:"📜", kind:"Đọc D", color:"#059669", sub:"Vacances en famille",
        section:"lecture", view:"lecture" },
      { id:"c2_ecouter", stepKey:"ecouter", subIds:["b1-e"],
        icon:"🎧", kind:"Nghe E", color:"#0891B2", sub:"Nos activités du week-end",
        section:"dictee", view:"ecouter" },
      { id:"c2_grammar", stepKey:"grammar", subIds:["p1"],
        icon:"⚜️", kind:"Ngữ pháp", color:"#1B3A6B", sub:"La phrase négative",
        section:"grammar", view:"grammar" },
      { id:"c2_culture", stepKey:"lecture", subIds:["b1-livre-journees-patrimoine"],
        icon:"🏛️", kind:"Văn hóa F", color:"#7B6CF6", sub:"Journées du patrimoine",
        section:"lecture", view:"lecture" },
      { id:"c2_vocab", stepKey:"vocab", subIds:["b1g7","b1g8","b1g9","b1g10","b1g11"],
        icon:"📖", kind:"Từ vựng", color:"#2E8B57", sub:"Les loisirs · 5 nhóm",
        section:"vocab", view:"edito" },
      { id:"c2_parler", stepKey:"parler", subIds:["s2"],
        icon:"🗣️", kind:"Nói", color:"#D97706", sub:"Vos loisirs préférés",
        section:"conversation", view:"conversation" },
      { id:"c2_ecrire", stepKey:"ecrire", subIds:["w2","w3","w4"],
        icon:"🖋️", kind:"Viết", color:"#E67E22", sub:"Phủ định · lieux à visiter · sorties",
        section:"writing", view:"writing" },
    ],
  },
  {
    id: "cycle3",
    label: "Vòng 3 · Sorties & Francophonie",
    emoji: "🟠",
    steps: [
      { id:"c3_lecture", stepKey:"lecture", subIds:["b1-livre-jeux-francophonie","b1-livre-envie-de-sortir"],
        icon:"📜", kind:"Đọc H + I", color:"#059669", sub:"Jeux de la Francophonie · Envie de sortir ?",
        section:"lecture", view:"lecture" },
      { id:"c3_grammar", stepKey:"grammar", subIds:["p2"],
        icon:"⚜️", kind:"Ngữ pháp", color:"#1B3A6B", sub:"il y a · pendant · depuis",
        section:"grammar", view:"grammar" },
      { id:"c3_vocab", stepKey:"vocab", subIds:["b1g6"],
        icon:"📖", kind:"Từ vựng", color:"#2E8B57", sub:"Proposer une sortie",
        section:"vocab", view:"edito" },
      { id:"c3_parler", stepKey:"parler", subIds:["s3"],
        icon:"🗣️", kind:"Nói", color:"#D97706", sub:"Proposer une sortie (DELF)",
        section:"conversation", view:"conversation" },
      { id:"c3_ecrire", stepKey:"ecrire", subIds:["w5"],
        icon:"🖋️", kind:"Viết", color:"#E67E22", sub:"Une compétition (DELF)",
        section:"writing", view:"writing" },
    ],
  },
  {
    id: "bilan",
    label: "Tổng kết",
    emoji: "⚫",
    steps: [
      { id:"b_phono", stepKey:"phono", subIds:["son_y","son_u","quiz"],
        icon:"🎵", kind:"Phono", color:"#E8574A", sub:"Âm [y] và [u]",
        section:"reference_hub", view:"reference_hub", refTab:"phono" },
      { id:"b_quiz", stepKey:"quiz", subIds:["quiz"],
        icon:"🏆", kind:"L'essentiel", color:"#E8574A", sub:"Quiz tổng hợp toàn bài",
        section:"quiz-unit", view:"quiz-unit" },
      { id:"b_atelier", stepKey:"parler", subIds:["s4"],
        icon:"🎨", kind:"Atelier", color:"#D97706", sub:"Organiser une sortie cho cả lớp",
        section:"conversation", view:"conversation" },
      { id:"b_delf", stepKey:"ecouter", subIds:["b1-delf"],
        icon:"🎓", kind:"DELF A2", color:"#0891B2", sub:"Đề thi thử · 4 kỹ năng",
        section:"delf-a2", view:"delf-a2" },
    ],
  },
];

// Flat list — used by parcours.js for progress tracking
export const STEP_DEFS_A2 = STEP_GROUPS_A2.flatMap(g => g.steps);
