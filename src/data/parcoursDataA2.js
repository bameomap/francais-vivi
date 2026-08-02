// Le Parcours — A2 Édito unit definitions
// Ids are prefixed "b" (b1, b2, …) so localStorage progress never collides
// with Édito A1's "u"/"g" ids (A1 already has units u1–u10).

export const PARCOURS_UNITS_A2 = [
  { id:"b1", num:1, fr:"Nouvelles vies", vi:"Cuộc sống mới", grammar:"Passé composé · Négation · il y a/pendant/depuis", emoji:"🌱" },
  { id:"b2", num:2, fr:"Je me souviens", vi:"Tôi nhớ lại", grammar:"L'imparfait · Pronoms y/en · Place de l'adjectif", emoji:"📷" },
  { id:"b3", num:3, fr:"Comme à la maison", vi:"Như ở nhà", grammar:"Pronoms relatifs qui/que/où · Comparaison · Si + présent", emoji:"🏠" },
  { id:"b4", num:4, fr:"Tous pareils, tous différents", vi:"Ai cũng giống, ai cũng khác", grammar:"Comparaison : équivalence · Adjectifs indéfinis · Pronoms possessifs", emoji:"🎭" },
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

// ── Unité 2 · Je me souviens ──────────────────────────────────────
// Same three-beat rhythm (documents → grammar → vocab), but the book's own
// order for this unit interleaves TWO grammar-linked speaking/writing tasks
// inside cycle 1 (récit + imparfait) before moving on, so cycle 1 carries an
// extra "parler"/"ecrire" pair compared to Unité 1.
export const STEP_GROUPS_B2 = [
  {
    id: "cycle1",
    label: "Vòng 1 · Souvenirs de famille",
    emoji: "🔵",
    steps: [
      { id:"c1_lecture", stepKey:"lecture", subIds:["b2-livre-saveurs-corse"],
        icon:"📜", kind:"Đọc A", color:"#059669", sub:"Saveurs de Corse",
        section:"lecture", view:"lecture" },
      { id:"c1_ecouter", stepKey:"ecouter", subIds:["b2-b"],
        icon:"🎧", kind:"Nghe B", color:"#0891B2", sub:"Revivre de beaux moments !",
        section:"dictee", view:"ecouter" },
      { id:"c1_lecture2", stepKey:"lecture", subIds:["b2-livre-souvenirs-famille"],
        icon:"📜", kind:"Đọc C", color:"#059669", sub:"Souvenirs de famille · Foenkinos",
        section:"lecture", view:"lecture" },
      { id:"c1_grammar", stepKey:"grammar", subIds:["p0"],
        icon:"⚜️", kind:"Ngữ pháp", color:"#1B3A6B", sub:"L'imparfait",
        section:"grammar", view:"grammar" },
      { id:"c1_verbes", stepKey:"verbes", subIds:["present","imparfait"],
        icon:"🖊️", kind:"Động từ", color:"#7B6CF6", sub:"Chia imparfait · 24 động từ",
        section:"reference_hub", view:"reference_hub", refTab:"verbes" },
      { id:"c1_vocab", stepKey:"vocab", subIds:["b2g1","b2g2","b2g3"],
        icon:"📖", kind:"Từ vựng", color:"#2E8B57", sub:"Le souvenir · 3 nhóm",
        section:"vocab", view:"edito" },
      { id:"c1_parler", stepKey:"parler", subIds:["s0","s1"],
        icon:"🗣️", kind:"Nói", color:"#D97706", sub:"Kể một kỷ niệm · vacances avant/aujourd'hui",
        section:"conversation", view:"conversation" },
      { id:"c1_ecrire", stepKey:"ecrire", subIds:["w0","w1"],
        icon:"🖋️", kind:"Viết", color:"#E67E22", sub:"Témoignage sensoriel · souvenir heureux (DELF)",
        section:"writing", view:"writing" },
    ],
  },
  {
    id: "cycle2",
    label: "Vòng 2 · Voyages & paysages",
    emoji: "🟢",
    steps: [
      { id:"c2_lecture", stepKey:"lecture", subIds:["b2-livre-vue-de-reve"],
        icon:"📜", kind:"Đọc D", color:"#059669", sub:"Une vue de rêve · Île Maurice",
        section:"lecture", view:"lecture" },
      { id:"c2_ecouter", stepKey:"ecouter", subIds:["b2-e"],
        icon:"🎧", kind:"Nghe E", color:"#0891B2", sub:"Quelle expérience !",
        section:"dictee", view:"ecouter" },
      { id:"c2_grammar", stepKey:"grammar", subIds:["p1"],
        icon:"⚜️", kind:"Ngữ pháp", color:"#1B3A6B", sub:"Les pronoms y et en",
        section:"grammar", view:"grammar" },
      { id:"c2_culture", stepKey:"lecture", subIds:["b2-livre-parlons-meteo","b2-livre-envie-fraicheur"],
        icon:"🏛️", kind:"Văn hóa F + G", color:"#7B6CF6", sub:"Parlons météo · Envie de fraîcheur",
        section:"lecture", view:"lecture" },
      { id:"c2_vocab", stepKey:"vocab", subIds:["b2g4","b2g5"],
        icon:"📖", kind:"Từ vựng", color:"#2E8B57", sub:"Paysages & météo · 2 nhóm",
        section:"vocab", view:"edito" },
      { id:"c2_parler", stepKey:"parler", subIds:["s2"],
        icon:"🗣️", kind:"Nói", color:"#D97706", sub:"Interroger sur un souvenir (DELF)",
        section:"conversation", view:"conversation" },
      { id:"c2_ecrire", stepKey:"ecrire", subIds:["w2"],
        icon:"🖋️", kind:"Viết", color:"#E67E22", sub:"Un lieu fantastique sur votre blog",
        section:"writing", view:"writing" },
    ],
  },
  {
    id: "cycle3",
    label: "Vòng 3 · Souvenirs de vacances",
    emoji: "🟠",
    steps: [
      { id:"c3_lecture", stepKey:"lecture", subIds:["b2-livre-souvenirs-vacances"],
        icon:"📜", kind:"Đọc H", color:"#059669", sub:"Pourquoi on achète des souvenirs ?",
        section:"lecture", view:"lecture" },
      { id:"c3_ecouter", stepKey:"ecouter", subIds:["b2-i"],
        icon:"🎧", kind:"Nghe I", color:"#0891B2", sub:"La tendance rétro",
        section:"dictee", view:"ecouter" },
      { id:"c3_grammar", stepKey:"grammar", subIds:["p2"],
        icon:"⚜️", kind:"Ngữ pháp", color:"#1B3A6B", sub:"La place de l'adjectif",
        section:"grammar", view:"grammar" },
      { id:"c3_parler", stepKey:"parler", subIds:["s3"],
        icon:"🗣️", kind:"Nói", color:"#D97706", sub:"Vos souvenirs de vacances",
        section:"conversation", view:"conversation" },
      { id:"c3_ecrire", stepKey:"ecrire", subIds:["w3"],
        icon:"🖋️", kind:"Viết", color:"#E67E22", sub:"Lettre aux parents · attention aux adjectifs",
        section:"writing", view:"writing" },
    ],
  },
  {
    id: "bilan",
    label: "Tổng kết",
    emoji: "⚫",
    steps: [
      { id:"b_phono", stepKey:"phono", subIds:["son_n","son_z","son_t","son_r","quiz"],
        icon:"🎵", kind:"Phono", color:"#E8574A", sub:"Les liaisons obligatoires",
        section:"reference_hub", view:"reference_hub", refTab:"phono" },
      { id:"b_quiz", stepKey:"quiz", subIds:["quiz"],
        icon:"🏆", kind:"L'essentiel", color:"#E8574A", sub:"Quiz tổng hợp toàn bài",
        section:"quiz-unit", view:"quiz-unit" },
      { id:"b_atelier", stepKey:"parler", subIds:["s4"],
        icon:"🎨", kind:"Atelier", color:"#D97706", sub:"Exposition photo · Souvenirs d'une époque",
        section:"conversation", view:"conversation" },
    ],
  },
];

export const STEP_DEFS_B2 = STEP_GROUPS_B2.flatMap(g => g.steps);

// ── Unité 3 · Comme à la maison ────────────────────────────────────
// This unit's grammar (qui/que/où, comparaison, si) doesn't introduce a new
// verb tense to drill, so — unlike b1/b2 — there's no "verbes" reference-hub
// card here. The book's own vocab split (p.45 "Le logement et la location"
// vs p.49 "Le mobilier et le cadre de vie") maps directly onto cycle 1 vs 2.
export const STEP_GROUPS_B3 = [
  {
    id: "cycle1",
    label: "Vòng 1 · Chercher un logement",
    emoji: "🔵",
    steps: [
      { id:"c1_lecture", stepKey:"lecture", subIds:["b3-livre-comment-trouver-toit"],
        icon:"📜", kind:"Đọc A", color:"#059669", sub:"Étudiants : comment trouver un toit ?",
        section:"lecture", view:"lecture" },
      { id:"c1_lecture2", stepKey:"lecture", subIds:["b3-livre-a-louer"],
        icon:"📜", kind:"Đọc B", color:"#059669", sub:"À louer · petites annonces",
        section:"lecture", view:"lecture" },
      { id:"c1_ecouter", stepKey:"ecouter", subIds:["b3-c"],
        icon:"🎧", kind:"Nghe C", color:"#0891B2", sub:"Je suis intéressé par votre annonce",
        section:"dictee", view:"ecouter" },
      { id:"c1_grammar", stepKey:"grammar", subIds:["p0"],
        icon:"⚜️", kind:"Ngữ pháp", color:"#1B3A6B", sub:"Pronoms relatifs qui, que, où",
        section:"grammar", view:"grammar" },
      { id:"c1_vocab", stepKey:"vocab", subIds:["b3g1","b3g2","b3g3"],
        icon:"📖", kind:"Từ vựng", color:"#2E8B57", sub:"Le logement et la location · 3 nhóm",
        section:"vocab", view:"edito" },
      { id:"c1_parler", stepKey:"parler", subIds:["s0"],
        icon:"🗣️", kind:"Nói", color:"#D97706", sub:"Louer un logement",
        section:"conversation", view:"conversation" },
      { id:"c1_ecrire", stepKey:"ecrire", subIds:["w0"],
        icon:"🖋️", kind:"Viết", color:"#E67E22", sub:"Rédiger une petite annonce",
        section:"writing", view:"writing" },
    ],
  },
  {
    id: "cycle2",
    label: "Vòng 2 · Logements atypiques",
    emoji: "🟢",
    steps: [
      { id:"c2_lecture", stepKey:"lecture", subIds:["b3-livre-cent-jours-cabine"],
        icon:"📜", kind:"Đọc D", color:"#059669", sub:"Cent jours en cabine",
        section:"lecture", view:"lecture" },
      { id:"c2_ecouter", stepKey:"ecouter", subIds:["b3-e"],
        icon:"🎧", kind:"Nghe E", color:"#0891B2", sub:"Vivre dans un bus",
        section:"dictee", view:"ecouter" },
      { id:"c2_grammar", stepKey:"grammar", subIds:["p1"],
        icon:"⚜️", kind:"Ngữ pháp", color:"#1B3A6B", sub:"La comparaison",
        section:"grammar", view:"grammar" },
      { id:"c2_culture", stepKey:"lecture", subIds:["b3-livre-architecture-horta"],
        icon:"🏛️", kind:"Văn hóa F", color:"#7B6CF6", sub:"L'architecture de Victor Horta",
        section:"lecture", view:"lecture" },
      { id:"c2_vocab", stepKey:"vocab", subIds:["b3g4","b3g5"],
        icon:"📖", kind:"Từ vựng", color:"#2E8B57", sub:"Mobilier & cadre de vie · 2 nhóm",
        section:"vocab", view:"edito" },
      { id:"c2_parler", stepKey:"parler", subIds:["s1"],
        icon:"🗣️", kind:"Nói", color:"#D97706", sub:"Ville ou campagne ?",
        section:"conversation", view:"conversation" },
      { id:"c2_ecrire", stepKey:"ecrire", subIds:["w1","w2"],
        icon:"🖋️", kind:"Viết", color:"#E67E22", sub:"Logement original · présenter son quartier",
        section:"writing", view:"writing" },
    ],
  },
  {
    id: "cycle3",
    label: "Vòng 3 · Bon voisinage",
    emoji: "🟠",
    steps: [
      { id:"c3_ecouter", stepKey:"ecouter", subIds:["b3-g"],
        icon:"🎧", kind:"Nghe G", color:"#0891B2", sub:"La ville du quart d'heure",
        section:"dictee", view:"ecouter" },
      { id:"c3_lecture", stepKey:"lecture", subIds:["b3-livre-voisins-solidaires"],
        icon:"📜", kind:"Đọc H", color:"#059669", sub:"Voisins solidaires",
        section:"lecture", view:"lecture" },
      { id:"c3_lecture2", stepKey:"lecture", subIds:["b3-livre-entre-voisins"],
        icon:"📜", kind:"Đọc I", color:"#059669", sub:"Entre voisins",
        section:"lecture", view:"lecture" },
      { id:"c3_grammar", stepKey:"grammar", subIds:["p2"],
        icon:"⚜️", kind:"Ngữ pháp", color:"#1B3A6B", sub:"Si + présent",
        section:"grammar", view:"grammar" },
      { id:"c3_parler", stepKey:"parler", subIds:["s2"],
        icon:"🗣️", kind:"Nói", color:"#D97706", sub:"Consoler un voisin",
        section:"conversation", view:"conversation" },
      { id:"c3_ecrire", stepKey:"ecrire", subIds:["w3"],
        icon:"🖋️", kind:"Viết", color:"#E67E22", sub:"Réconforter un voisin (DELF)",
        section:"writing", view:"writing" },
    ],
  },
  {
    id: "bilan",
    label: "Tổng kết",
    emoji: "⚫",
    steps: [
      { id:"b_phono", stepKey:"phono", subIds:["son_j","son_hu","son_w","quiz"],
        icon:"🎵", kind:"Phono", color:"#E8574A", sub:"Les sons [j] [ɥ] [w]",
        section:"reference_hub", view:"reference_hub", refTab:"phono" },
      { id:"b_quiz", stepKey:"quiz", subIds:["quiz"],
        icon:"🏆", kind:"L'essentiel", color:"#E8574A", sub:"Quiz tổng hợp toàn bài",
        section:"quiz-unit", view:"quiz-unit" },
      { id:"b_atelier", stepKey:"parler", subIds:["s3"],
        icon:"🎨", kind:"Atelier", color:"#D97706", sub:"Organiser une colocation",
        section:"conversation", view:"conversation" },
      { id:"b_delf", stepKey:"ecouter", subIds:["b3-delf"],
        icon:"🎓", kind:"DELF A2", color:"#0891B2", sub:"Compréhension de l'oral",
        section:"delf-a2", view:"delf-a2" },
    ],
  },
];

export const STEP_DEFS_B3 = STEP_GROUPS_B3.flatMap(g => g.steps);

// ── Unité 4 · Tous pareils, tous différents ────────────────────────
// Also no new verb tense here (comparaison/adjectifs indéfinis/pronoms
// possessifs are structures, not tenses) — same shape as b3, no "verbes" card.
export const STEP_GROUPS_B4 = [
  {
    id: "cycle1",
    label: "Vòng 1 · Portraits & compliments",
    emoji: "🔵",
    steps: [
      { id:"c1_lecture", stepKey:"lecture", subIds:["b4-livre-mannequins-atypiques"],
        icon:"📜", kind:"Đọc A", color:"#059669", sub:"Les mannequins atypiques",
        section:"lecture", view:"lecture" },
      { id:"c1_ecouter", stepKey:"ecouter", subIds:["b4-b"],
        icon:"🎧", kind:"Nghe B", color:"#0891B2", sub:"Faites des compliments !",
        section:"dictee", view:"ecouter" },
      { id:"c1_lecture2", stepKey:"lecture", subIds:["b4-livre-sosie-napoleon"],
        icon:"📜", kind:"Đọc C", color:"#059669", sub:"Le sosie de Napoléon",
        section:"lecture", view:"lecture" },
      { id:"c1_grammar", stepKey:"grammar", subIds:["p0"],
        icon:"⚜️", kind:"Ngữ pháp", color:"#1B3A6B", sub:"La comparaison : l'équivalence",
        section:"grammar", view:"grammar" },
      { id:"c1_vocab", stepKey:"vocab", subIds:["b4g1","b4g2","b4g3"],
        icon:"📖", kind:"Từ vựng", color:"#2E8B57", sub:"L'apparence physique · 3 nhóm",
        section:"vocab", view:"edito" },
      { id:"c1_parler", stepKey:"parler", subIds:["s0"],
        icon:"🗣️", kind:"Nói", color:"#D97706", sub:"Décrire et complimenter",
        section:"conversation", view:"conversation" },
      { id:"c1_ecrire", stepKey:"ecrire", subIds:["w0"],
        icon:"🖋️", kind:"Viết", color:"#E67E22", sub:"Décrire un(e) mannequin",
        section:"writing", view:"writing" },
    ],
  },
  {
    id: "cycle2",
    label: "Vòng 2 · Qualités & défauts",
    emoji: "🟢",
    steps: [
      { id:"c2_lecture", stepKey:"lecture", subIds:["b4-livre-qualites-defauts"],
        icon:"📜", kind:"Đọc D", color:"#059669", sub:"Les qualités de vos défauts",
        section:"lecture", view:"lecture" },
      { id:"c2_lecture2", stepKey:"lecture", subIds:["b4-livre-quadrant-ofman"],
        icon:"🎬", kind:"Đọc E", color:"#7B6CF6", sub:"Le quadrant d'Ofman (vidéo)",
        section:"lecture", view:"lecture" },
      { id:"c2_grammar", stepKey:"grammar", subIds:["p1"],
        icon:"⚜️", kind:"Ngữ pháp", color:"#1B3A6B", sub:"Chaque · tout, toute, tous, toutes",
        section:"grammar", view:"grammar" },
      { id:"c2_vocab", stepKey:"vocab", subIds:["b4g4","b4g5"],
        icon:"📖", kind:"Từ vựng", color:"#2E8B57", sub:"Les traits de caractère · 2 nhóm",
        section:"vocab", view:"edito" },
      { id:"c2_parler", stepKey:"parler", subIds:["s1"],
        icon:"🗣️", kind:"Nói", color:"#D97706", sub:"Parler du caractère",
        section:"conversation", view:"conversation" },
      { id:"c2_ecrire", stepKey:"ecrire", subIds:["w1"],
        icon:"🖋️", kind:"Viết", color:"#E67E22", sub:"Caractère d'un personnage de fiction (DELF)",
        section:"writing", view:"writing" },
    ],
  },
  {
    id: "cycle3",
    label: "Vòng 3 · Culture & réseaux",
    emoji: "🟠",
    steps: [
      { id:"c3_lecture", stepKey:"lecture", subIds:["b4-livre-la-fontaine"],
        icon:"🏛️", kind:"Văn hóa F", color:"#7B6CF6", sub:"Jean de La Fontaine, roi des animaux",
        section:"lecture", view:"lecture" },
      { id:"c3_ecouter", stepKey:"ecouter", subIds:["b4-g"],
        icon:"🎧", kind:"Nghe G", color:"#0891B2", sub:"L'anthropomorphisme",
        section:"dictee", view:"ecouter" },
      { id:"c3_lecture2", stepKey:"lecture", subIds:["b4-livre-photos-profils"],
        icon:"📜", kind:"Đọc H", color:"#059669", sub:"Quelles photos pour vos profils ?",
        section:"lecture", view:"lecture" },
      { id:"c3_ecouter2", stepKey:"ecouter", subIds:["b4-i"],
        icon:"🎧", kind:"Nghe I", color:"#0891B2", sub:"La photo de classe",
        section:"dictee", view:"ecouter" },
      { id:"c3_grammar", stepKey:"grammar", subIds:["p2"],
        icon:"⚜️", kind:"Ngữ pháp", color:"#1B3A6B", sub:"Les pronoms possessifs",
        section:"grammar", view:"grammar" },
      { id:"c3_parler", stepKey:"parler", subIds:["s2"],
        icon:"🗣️", kind:"Nói", color:"#D97706", sub:"Choisir sa photo de profil",
        section:"conversation", view:"conversation" },
      { id:"c3_ecrire", stepKey:"ecrire", subIds:["w2"],
        icon:"🖋️", kind:"Viết", color:"#E67E22", sub:"Conseils pour une photo de profil",
        section:"writing", view:"writing" },
    ],
  },
  {
    id: "bilan",
    label: "Tổng kết",
    emoji: "⚫",
    steps: [
      { id:"b_phono", stepKey:"phono", subIds:["son_o_on","son_a_an","son_e_in","quiz"],
        icon:"🎵", kind:"Phono", color:"#E8574A", sub:"Les voyelles orales et nasales",
        section:"reference_hub", view:"reference_hub", refTab:"phono" },
      { id:"b_quiz", stepKey:"quiz", subIds:["quiz"],
        icon:"🏆", kind:"L'essentiel", color:"#E8574A", sub:"Quiz tổng hợp toàn bài",
        section:"quiz-unit", view:"quiz-unit" },
      { id:"b_atelier", stepKey:"parler", subIds:["s3"],
        icon:"🎨", kind:"Atelier", color:"#D97706", sub:"Café artistique · présenter une œuvre",
        section:"conversation", view:"conversation" },
    ],
  },
];

export const STEP_DEFS_B4 = STEP_GROUPS_B4.flatMap(g => g.steps);

// ── Per-unit lookup (fallback registry, mirrors A1's getStepGroupsFor) ────
const UNIT_STEP_GROUPS_A2 = { b1: STEP_GROUPS_A2, b2: STEP_GROUPS_B2, b3: STEP_GROUPS_B3, b4: STEP_GROUPS_B4 };
const UNIT_STEP_DEFS_A2   = { b1: STEP_DEFS_A2,   b2: STEP_DEFS_B2,   b3: STEP_DEFS_B3,   b4: STEP_DEFS_B4 };

export const getStepGroupsForA2 = (unitId) => UNIT_STEP_GROUPS_A2[unitId] || STEP_GROUPS_A2;
export const getStepDefsForA2   = (unitId) => UNIT_STEP_DEFS_A2[unitId]   || STEP_DEFS_A2;
