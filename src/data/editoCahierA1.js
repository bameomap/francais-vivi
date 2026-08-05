/**
 * editoCahierA1.js — Exercices du Cahier d'activités, Édito A1 2e édition.
 *
 * Source: materials/A1/Edito A1 by Unite md/cahier_unite_1.md … cahier_unite_10.md
 * Answers come from the cahier's own Corrigés — not generated, so a
 * self-learner can trust them.
 *
 * Unlike the A2 cahier, the A1 cahier prints no piste numbers next to its
 * audio exercises. The piste ↔ exercise mapping was reconstructed by
 * transcribing all 112 audio files (Whisper) — each piste announces its own
 * page number aloud, and every unit boundary was cross-checked against the
 * DELF page printed in the cahier's sommaire (100% match, 10/10 units). See
 * materials/A1/Edito A1 by Unite md/PISTE_MAPPING_NOTES.md for the full
 * derivation. piste_000.mp3 is a copyright/credits announcement, not an
 * exercise — real exercises start at piste_001.
 *
 * Unité 0 ("Bienvenue !", cahier p.3-6) is not represented here — it exists
 * in EDITO_GRAMMAR as "g0" but its cahier content was intentionally not
 * transcribed (see PISTE_MAPPING_NOTES.md); its 6 pistes (1-6) are reserved.
 *
 * Data shape, keyed by unit id ("u1".."u10", matching PARCOURS_UNITS):
 *   grammar: { p0: [...], p1: [...], ... }  — one key per point index in
 *            EDITO_GRAMMAR's matching unit ("g1".."g10"), consumed by
 *            GrammarPanel.jsx per grammar point (subId "p"+i).
 *   vocab:   { <stepId>: [...] }  — keyed by each unit's own Parcours vocab
 *            step id(s) from parcoursData.js's STEP_GROUPS_U<N> (e.g. u1's
 *            v1_vocab/v2_vocab/v3_vocab — every A1 unit has a custom
 *            STEP_GROUPS_U<N>, none fall back to the flat default), because
 *            EditoVocabPanel.jsx looks up `vocab[cahierStep]` where
 *            cahierStep is that step's own id, not a vocab-group id. Check
 *            each unit's STEP_GROUPS_U<N> before wiring its vocab.
 *   phono:   [...]  — flat array, consumed by EditoPhonoPanel.jsx by unit id.
 *   bilan:   [...]  — flat array, consumed by UnitQuizPanel.jsx by unit id.
 *            A1 has no per-unit DELF exam screen (unlike A2's DelfA2Panel),
 *            so each unit's cahier DELF A1 exercises are folded into `bilan`,
 *            clearly marked, alongside the printed "Bilan linguistique".
 *
 * Exercise types (see CahierExercises.jsx):
 *   fill      — type the missing word;  `bank` = words to pick from
 *   choice    — pick one of `options`
 *   order     — put `tokens` back into a sentence
 *   match     — pair each `pairs[].l` with its `pairs[].r`
 *   truefalse — answer is a boolean
 *   transform — rewrite the sentence (checked leniently, see normalize())
 *
 * `example` marks the item the book already solves as a worked example; it
 * is shown filled in and not scored.
 */

const AUDIO_BASE = "https://bameomap.github.io/francais-vivi";
const piste = (n) => `${AUDIO_BASE}/${String(n).padStart(3, "0")}_Edito_A1_Cahier.mp3`;

export const CAHIER_A1 = {
  u1: {

    // ── Grammaire, keyed by the grammar point index in editoGrammar.js's "g1" ──
    // g1 has 6 points; only 4 have a dedicated "Grammaire" page in the cahier
    // (p.7, p.8, p.10, p.11) — p4 "Poser des questions" and p5 "Les nombres
    // 32-100" have no matching cahier grammar page (the cahier's number
    // exercises are filed under its own "Vocabulaire" header, p.9/p.12, so
    // they live in `vocab` below instead, matching the book's own labeling).
    grammar: {

      // p0 — Les adjectifs de nationalité (cahier p. 7)
      p0: [
        {
          num: 1, page: 7,
          instruction: "Classez les adjectifs dans le tableau (masculin ou féminin).",
          vi: "Xếp các tính từ chỉ quốc tịch vào bảng theo giống đực/giống cái.",
          type: "choice",
          items: [
            { q: "américain", options: ["masculin", "féminin"], answer: "masculin", example: true },
            { q: "sénégalaise", options: ["masculin", "féminin"], answer: "féminin" },
            { q: "allemand", options: ["masculin", "féminin"], answer: "masculin" },
            { q: "argentin", options: ["masculin", "féminin"], answer: "masculin" },
            { q: "espagnole", options: ["masculin", "féminin"], answer: "féminin" },
            { q: "colombienne", options: ["masculin", "féminin"], answer: "féminin" },
          ],
        },
        {
          num: 2, page: 7,
          instruction: "Complétez avec l'adjectif masculin ou féminin.",
          vi: "Chuyển tính từ quốc tịch từ giống đực sang giống cái (hoặc ngược lại).",
          type: "fill",
          items: [
            { q: "Il est suisse. → Elle est ___ .", answer: "suisse" },
            { q: "Il est ___ . → Elle est colombienne.", answer: "colombien" },
            { q: "Il est congolais. → Elle est ___ .", answer: "congolaise" },
            { q: "Il est ___ . → Elle est turque.", answer: "turc" },
            { q: "Il est tunisien. → Elle est ___ .", answer: "tunisienne" },
          ],
        },
        {
          num: 3, page: 7,
          instruction: "Soulignez la bonne réponse.",
          vi: "Gạch chân tính từ quốc tịch đúng theo giống của chủ ngữ.",
          type: "choice",
          items: [
            { q: "Pedro, il est ___ .", options: ["brésilien", "brésilienne"], answer: "brésilien", example: true },
            { q: "Pauline, elle est ___ .", options: ["français", "française"], answer: "française" },
            { q: "Simon, il est ___ .", options: ["suédois", "suédoise"], answer: "suédois" },
            { q: "Naomi, elle est ___ .", options: ["japonais", "japonaise"], answer: "japonaise" },
            { q: "Kosta, il est ___ .", options: ["grec", "grecque"], answer: "grec" },
            { q: "Jeff, il est ___ .", options: ["anglais", "anglaise"], answer: "anglais" },
          ],
        },
        {
          num: 4, page: 7, audioSrc: piste(7),
          instruction: "Écoutez et complétez avec l'adjectif masculin ou féminin.",
          vi: "Nghe và hoàn thành tính từ quốc tịch (giống đực hoặc giống cái tuỳ theo giọng đọc).",
          type: "fill",
          items: [
            { q: "ital……", answer: "italienne" },
            { q: "belg……", answer: "belge" },
            { q: "chin……", answer: "chinoise" },
            { q: "maroc……", answer: "marocain" },
            { q: "coré……", answer: "coréen" },
            { q: "portug……", answer: "portugais" },
          ],
        },
        {
          num: 5, page: 7,
          instruction: "Associez pour former des phrases.",
          vi: "Nối chủ ngữ với phần còn lại của câu cho đúng ngữ pháp.",
          type: "match",
          pairs: [
            { l: "Je", r: "m'appelle Ramzi." },
            { l: "Tu", r: "as 24 ans ?" },
            { l: "Paul et moi, nous", r: "sommes français." },
            { l: "Sam et Émilie", r: "ont 30 ans." },
            { l: "Vous", r: "êtes américain ?" },
            { l: "Elle", r: "s'appelle Colette." },
          ],
        },
      ],

      // p1 — Les articles définis le, la, l', les (cahier p. 8)
      p1: [
        {
          num: 1, page: 8,
          instruction: "Classez les pays dans le tableau (masculin, féminin, ou pluriel).",
          vi: "Xếp tên các nước vào bảng theo giống đực / giống cái / số nhiều, cùng với mạo từ đi kèm.",
          type: "choice",
          items: [
            { q: "Mali", options: ["masculin (Le)", "féminin (La)", "pluriel (Les)"], answer: "masculin (Le)", example: true },
            { q: "Iran", options: ["masculin (Le/L')", "féminin (La)", "pluriel (Les)"], answer: "masculin (Le/L')" },
            { q: "France", options: ["masculin (Le)", "féminin (La)", "pluriel (Les)"], answer: "féminin (La)" },
            { q: "Italie", options: ["masculin (Le)", "féminin (La/L')", "pluriel (Les)"], answer: "féminin (La/L')" },
            { q: "Pays-Bas", options: ["masculin (Le)", "féminin (La)", "pluriel (Les)"], answer: "pluriel (Les)" },
            { q: "États-Unis", options: ["masculin (Le)", "féminin (La)", "pluriel (Les)"], answer: "pluriel (Les)" },
          ],
        },
        {
          num: 2, page: 8,
          instruction: "Écrivez les articles devant les noms de pays.",
          vi: "Viết mạo từ xác định đúng trước tên các nước (dựa vào cờ nước trong sách).",
          type: "fill",
          items: [
            { q: "Exemple : ___ Zimbabwe", answer: "Le", example: true },
            { q: "___ Mexique", answer: "le" },
            { q: "___ Chine", answer: "la" },
            { q: "___ Japon", answer: "le" },
            { q: "___ Argentine", answer: "l'" },
          ],
        },
        {
          num: 3, page: 8,
          instruction: "Soulignez la bonne réponse.",
          vi: "Gạch chân mạo từ xác định đúng.",
          type: "choice",
          items: [
            { q: "Tu aimes ___ art ?", options: ["l'", "le"], answer: "l'" },
            { q: "C'est ___ langue de Paul.", options: ["la", "les"], answer: "la" },
            { q: "J'aime ___ Algérie.", options: ["l'", "les"], answer: "l'" },
            { q: "Radka aime ___ géographie.", options: ["les", "la"], answer: "la" },
            { q: "Julie aime ___ Espagne.", options: ["l'", "la"], answer: "l'" },
          ],
        },
        {
          num: 4, page: 8, audioSrc: piste(8),
          instruction: "Écoutez et complétez les phrases avec le, la, l' ou les.",
          vi: "Nghe và điền mạo từ xác định đúng.",
          type: "fill",
          items: [
            { q: "Nino aime …… cinéma, Lisa aime …… musique. (2 từ)", answer: "le la" },
            { q: "Sonia aime …… langues, Hussein aime …… histoire. (2 từ)", answer: "les l'" },
            { q: "Bertille aime …… café, Denis aime …… chocolat. (2 từ)", answer: "le le" },
          ],
        },
      ],

      // p2 — Les prépositions devant les noms de villes et de pays (cahier p. 10)
      p2: [
        {
          num: 1, page: 10,
          instruction: "Remettez les mots dans l'ordre pour terminer les phrases.",
          vi: "Sắp xếp lại từ để tạo thành câu đúng với giới từ chỉ nơi chốn + tên thành phố/nước.",
          type: "order",
          items: [
            { tokens: ["Nikita", "est", "né", "à", "Moscou,", "en", "Russie."],
              answer: ["Nikita", "est", "né", "à", "Moscou,", "en", "Russie."] },
            { tokens: ["Florence", "habite", "à", "Ottawa,", "au", "Canada."],
              answer: ["Florence", "habite", "à", "Ottawa,", "au", "Canada."] },
            { tokens: ["Vasu", "est", "né", "à", "Calcutta,", "en", "Inde."],
              answer: ["Vasu", "est", "né", "à", "Calcutta,", "en", "Inde."] },
            { tokens: ["Lydia", "habite", "à", "Amsterdam,", "aux", "Pays-Bas."],
              answer: ["Lydia", "habite", "à", "Amsterdam,", "aux", "Pays-Bas."] },
            { tokens: ["Louis", "est", "né", "à", "Porto,", "au", "Portugal."],
              answer: ["Louis", "est", "né", "à", "Porto,", "au", "Portugal."] },
          ],
        },
        {
          num: 2, page: 10, audioSrc: piste(11),
          instruction: "Écoutez et cochez (en / au / aux / à).",
          vi: "Nghe và đánh dấu giới từ đúng (en/au/aux/à) cho mỗi câu.",
          type: "choice",
          items: [
            { q: "a.", options: ["en", "au", "aux", "à"], answer: "à", example: true },
            { q: "b.", options: ["en", "au", "aux", "à"], answer: "au" },
            { q: "c.", options: ["en", "au", "aux", "à"], answer: "en" },
            { q: "d.", options: ["en", "au", "aux", "à"], answer: "au" },
            { q: "e.", options: ["en", "au", "aux", "à"], answer: "à" },
            { q: "f.", options: ["en", "au", "aux", "à"], answer: "en" },
          ],
        },
        {
          num: 3, page: 10,
          instruction: "Écrivez des phrases comme dans l'exemple (Emma – Oslo : Emma habite à Oslo, en Norvège.).",
          vi: "Viết câu hoàn chỉnh theo mẫu, nêu thành phố và nước tương ứng.",
          type: "fill",
          items: [
            { q: "Petra – Glasgow.", answer: "Petra habite à Glasgow, au Royaume-Uni." },
            { q: "Jan – Rotterdam.", answer: "Jan habite à Rotterdam, aux Pays-Bas." },
            { q: "Ana – Bordeaux.", answer: "Ana habite à Bordeaux, en France." },
            { q: "Pablo – Madrid.", answer: "Pablo habite à Madrid, en Espagne." },
            { q: "Nasser – Alger.", answer: "Nasser habite à Alger, en Algérie." },
          ],
        },
        {
          num: 4, page: 10,
          instruction: "Soulignez le bon verbe (avoir ou être).",
          vi: "Chọn động từ đúng (avoir hay être) theo nghĩa của câu.",
          type: "choice",
          items: [
            { q: "Loana ___ 24 ans et elle est hollandaise.", options: ["a", "est"], answer: "a" },
            { q: "Lucille et moi, nous ___ belges.", options: ["avons", "sommes"], answer: "sommes" },
            { q: "Tu ___ deux nationalités, Pedro ?", options: ["as", "es"], answer: "as" },
            { q: "Kristof et Nils ___ à Toulouse maintenant.", options: ["ont", "sont"], answer: "sont" },
            { q: "Vous ___ une adresse à Lyon ?", options: ["avez", "êtes"], answer: "avez" },
          ],
        },
      ],

      // p3 — L'adjectif interrogatif quel (cahier p. 11)
      p3: [
        {
          num: 1, page: 11,
          instruction: "Accordez l'adjectif quel si nécessaire.",
          vi: "Chia tính từ nghi vấn \"quel\" theo giống/số của danh từ đi kèm.",
          type: "fill",
          items: [
            { q: "Quel…… langues vous parlez ?", answer: "Quelles" },
            { q: "Tu habites à quel…… adresse ?", answer: "quelle" },
            { q: "Quel…… est la date de naissance de Louane ?", answer: "Quelle" },
            { q: "Quel…… sont les nationalités dans la classe ?", answer: "Quelles" },
            { q: "Quel…… artistes tu aimes ?", answer: "Quels" },
            { q: "Tu habites dans quel…… pays ?", answer: "quel" },
          ],
        },
        {
          num: 2, page: 11,
          instruction: "Complétez les phrases avec les mots proposés : numéro – langues – âge – ville – auteurs – adresse.",
          vi: "Điền danh từ phù hợp sau tính từ nghi vấn \"quel/quelle/quels/quelles\".",
          type: "fill",
          bank: ["numéro", "langues", "âge", "ville", "auteurs", "adresse"],
          items: [
            { q: "Tu as quel …… ?", answer: "âge" },
            { q: "Tu parles quelles …… ?", answer: "langues" },
            { q: "Vous aimez quels …… ?", answer: "auteurs" },
            { q: "Quel est le …… de Bilal ?", answer: "numéro" },
            { q: "Vous habitez dans quelle …… ?", answer: "ville" },
            { q: "Quelle est votre …… mail ?", answer: "adresse" },
          ],
        },
        {
          num: 3, page: 11, audioSrc: piste(12),
          instruction: "Écoutez et cochez (Quel / Quelle / Quels / Quelles).",
          vi: "Nghe và đánh dấu đúng dạng của \"quel\" (giống/số) trong mỗi câu.",
          type: "choice",
          items: [
            { q: "a.", options: ["Quel", "Quelle", "Quels", "Quelles"], answer: "Quel", example: true },
            { q: "b.", options: ["Quel", "Quelle", "Quels", "Quelles"], answer: "Quels" },
            { q: "c.", options: ["Quel", "Quelle", "Quels", "Quelles"], answer: "Quelle" },
            { q: "d.", options: ["Quel", "Quelle", "Quels", "Quelles"], answer: "Quelles" },
            { q: "e.", options: ["Quel", "Quelle", "Quels", "Quelles"], answer: "Quelle" },
            { q: "f.", options: ["Quel", "Quelle", "Quels", "Quelles"], answer: "Quelles" },
          ],
        },
        {
          num: 4, page: 11,
          instruction: "Complétez avec quel, quelle, quels, quelles.",
          vi: "Điền đúng dạng của \"quel\" vào đầu câu hỏi.",
          type: "fill",
          items: [
            { q: "…… est votre nom ?", answer: "Quel" },
            { q: "…… sport vous pratiquez ?", answer: "Quel" },
            { q: "…… est votre adresse ?", answer: "Quelle" },
            { q: "…… villes de France vous aimez ?", answer: "Quelles" },
            { q: "…… sont les pays de naissance des personnes ici ?", answer: "Quels" },
            { q: "…… est votre nationalité ?", answer: "Quelle" },
          ],
        },
        {
          num: 5, page: 11,
          instruction: "Complétez les phrases avec le verbe parler au présent.",
          vi: "Chia động từ \"parler\" ở thì hiện tại theo chủ ngữ.",
          type: "fill",
          items: [
            { q: "Sur Duo, je …… espagnol avec Francesco.", answer: "parle" },
            { q: "Dans la classe, nous …… français.", answer: "parlons" },
            { q: "Vous …… quelle langue ?", answer: "parlez" },
            { q: "Li et Chang …… chinois.", answer: "parlent" },
            { q: "Lisa …… français, portugais et polonais.", answer: "parle" },
            { q: "Tu …… quatre langues ?", answer: "parles" },
          ],
        },
      ],
    },

    // ── Vocabulaire (cahier p. 9 "Les loisirs, les nombres (1)" + p. 12 ──
    // "Les pays et les nationalités, l'identité et les coordonnées, les
    // nombres (2)"). Unlike A2's flat "vocab" fallback, Unité 1 has its own
    // custom STEP_GROUPS_U1 (parcoursData.js) that narrows vocab per cycle —
    // keys below match those step ids exactly: v1_vocab (subIds u1g1+u1g2,
    // p.9), v2_vocab (subIds u1g3, p.12 pays/nationalités), v3_vocab (subIds
    // u1g4+u1g5, p.12 identité + nombres 70-100).
    vocab: {
      v1_vocab: [
        {
          num: 1, page: 9,
          instruction: "Associez les phrases et les images.",
          vi: "Nối câu nói về sở thích với hình ảnh minh hoạ tương ứng.",
          type: "match",
          pairs: [
            { l: "Paola aime le sport.", r: "pictogrammes sportifs" },
            { l: "Jessica aime les langues.", r: "pictogramme drapeaux/langues" },
            { l: "Peter aime le cinéma.", r: "caméra" },
            { l: "Corinne aime la musique.", r: "notes de musique" },
            { l: "Élisa aime l'art.", r: "palette de peinture" },
          ],
        },
        {
          num: 2, page: 9,
          instruction: "Classez les nombres du plus petit au plus grand.",
          vi: "Xếp các số từ nhỏ đến lớn.",
          type: "fill",
          items: [
            { q: "trente-deux → thứ tự", answer: "1", example: true },
            { q: "trente-sept → thứ tự", answer: "2" },
            { q: "quarante et un → thứ tự", answer: "3" },
            { q: "quarante-cinq → thứ tự", answer: "4" },
            { q: "cinquante-cinq → thứ tự", answer: "5" },
            { q: "soixante-huit → thứ tự", answer: "6" },
            { q: "soixante et un → thứ tự", answer: "7" },
          ],
        },
        {
          num: 3, page: 9,
          instruction: "Complétez les nombres en lettres.",
          vi: "Viết số bằng chữ.",
          type: "fill",
          items: [
            { q: "46", answer: "quarante-six" },
            { q: "38", answer: "trente-huit" },
            { q: "65", answer: "soixante-cinq" },
            { q: "52", answer: "cinquante-deux" },
            { q: "37", answer: "trente-sept" },
            { q: "51", answer: "cinquante et un" },
          ],
        },
        {
          num: 4, page: 9, audioSrc: piste(9),
          instruction: "Écoutez et écrivez les nombres.",
          vi: "Nghe và viết lại các số bằng chữ số.",
          type: "fill",
          items: [
            { q: "Le numéro ……, s'il vous plaît !", answer: "59", example: true },
            { q: "Kristie a …… ans.", answer: "68" },
            { q: "Demain, j'ai …… ans !", answer: "40" },
            { q: "C'est le …… décembre !", answer: "31" },
            { q: "Mon numéro, c'est le 06 …… …… …… …… .", answer: "69 31 42 57" },
          ],
        },
      ],

      v2_vocab: [
        {
          num: 5, page: 12,
          instruction: "Complétez les phrases avec les nationalités.",
          vi: "Điền tính từ quốc tịch đúng theo nước sinh ra.",
          type: "fill",
          items: [
            { q: "Hélène est née en Belgique, elle est …… .", answer: "belge" },
            { q: "Akem est né au Cameroun, il est …… .", answer: "camerounais" },
            { q: "Hyunsok est né en Corée, il est …… .", answer: "coréen" },
            { q: "Malia est née au Sénégal, elle est …… .", answer: "sénégalaise" },
            { q: "Adam est né en Pologne, il est …… .", answer: "polonais" },
            { q: "Angela est née en Allemagne, elle est …… .", answer: "allemande" },
          ],
        },
        {
          num: 7, page: 12,
          instruction: "Complétez le tableau (le pays / la nationalité).",
          vi: "Hoàn thành bảng tên nước ↔ quốc tịch.",
          type: "fill",
          items: [
            { q: "L'Argentine → nationalité ?", answer: "argentin(e)", example: true },
            { q: "L'Inde → nationalité ?", answer: "indien(ne)" },
            { q: "nationalité tchèque → pays ?", answer: "La République tchèque" },
            { q: "Le Maroc → nationalité ?", answer: "marocain(e)" },
            { q: "nationalité américain(e) → pays ?", answer: "Les États-Unis" },
            { q: "Le Vietnam → nationalité ?", answer: "vietnamien(ne)" },
          ],
        },
      ],

      v3_vocab: [
        {
          num: 6, page: 12,
          instruction: "Complétez le formulaire d'inscription avec les mots proposés : Téléphone – Nom – Mail – Prénom – Adresse – Pays.",
          vi: "Điền đúng nhãn (Tên, Họ, Địa chỉ, Nước, Điện thoại, Email) vào mẫu đăng ký thư viện.",
          type: "fill",
          bank: ["Téléphone", "Nom", "Mail", "Prénom", "Adresse", "Pays"],
          items: [
            { q: "___ : Péret", answer: "Nom", example: true },
            { q: "___ : Anne-Marie", answer: "Prénom" },
            { q: "___ : 32, place de la République", answer: "Adresse" },
            { q: "___ : France", answer: "Pays" },
            { q: "___ : 06 87 98 14 08", answer: "Téléphone" },
            { q: "___ : peret.annem@hotmail.fr", answer: "Mail" },
          ],
        },
        {
          num: 8, page: 12, audioSrc: piste(13),
          instruction: "Écoutez et complétez les phrases avec les mots et les nombres.",
          vi: "Nghe và điền từ + số vào chỗ trống (ngày sinh, tuổi, nơi sinh, số điện thoại…).",
          type: "fill",
          items: [
            { q: "Quelle est votre …… …… …… ……………… , s'il vous plaît ?", answer: "date de naissance" },
            { q: "C'est la fête ! Paulette a …… ans !", answer: "81" },
            { q: "Le numéro …… ? J'ai ! Bingo !", answer: "99" },
            { q: "…… euros, s'il vous plaît.", answer: "64" },
            { q: "Mon ………… …… ………… ? C'est Lausanne.", answer: "lieu de naissance" },
            { q: "Ton téléphone, c'est bien le …… …… …… …… …… ?", answer: "06 76 66 89 99" },
          ],
        },
      ],
    },

    // ── Phonie-graphie (cahier p. 9 groupes rythmiques + p. 12 liaisons) ──
    phono: [
      {
        num: 1, page: 9, audioSrc: piste(10),
        instruction: "Phonie-graphie : les groupes rythmiques et la place de l'accent tonique. Écoutez et associez les phrases. Soulignez l'accent tonique. Puis répétez les phrases.",
        vi: "Nghe, nối các nửa câu và gạch chân trọng âm cuối nhóm nhịp, sau đó lặp lại.",
        type: "match",
        pairs: [
          { l: "Nous sommes", r: "coréennes." },
          { l: "J'aime", r: "le tennis." },
          { l: "Il s'appelle", r: "Vincent." },
          { l: "Tu as", r: "quarante-deux ans." },
          { l: "Il habite", r: "à Munich." },
          { l: "Elle parle", r: "anglais." },
        ],
      },
      {
        num: 2, page: 12, audioSrc: piste(14),
        instruction: "Phonie-graphie : les liaisons avec les prépositions. Écoutez les phrases, associez les mots et notez les liaisons. Répétez les phrases.",
        vi: "Nghe, nối các nửa câu và chú ý liên âm (liaison) sau giới từ, rồi lặp lại.",
        type: "match",
        pairs: [
          { l: "Il est né", r: "en Inde." },
          { l: "Elle est née", r: "aux États-Unis." },
          { l: "Il habite", r: "aux îles Fidji." },
          { l: "Elle habite", r: "en Espagne." },
          { l: "Tu habites", r: "en Algérie." },
        ],
      },
    ],

    // ── Bilan (cahier p. 13 CO+PE, p. 14-15 Bilan linguistique /40, ──
    // p. 16-17 DELF A1, p. 18 Jeux). A1 has no per-unit DELF exam screen
    // (unlike A2's DelfA2Panel), so DELF content is folded in here,
    // clearly marked, alongside the printed Bilan linguistique and Jeux.
    bilan: [
      {
        num: 1, page: 13, audioSrc: piste(15),
        instruction: "Compréhension orale — « Vous êtes Monsieur ? » Écoutez le dialogue et répondez aux questions.",
        vi: "Nghe hội thoại ở quầy đăng ký và trả lời câu hỏi về danh tính của ông Briant.",
        type: "fill",
        items: [
          { q: "Comment s'appelle l'homme ?", answer: "Adam Briant" },
          { q: "Quelle est sa nationalité ?", answer: "belge" },
          { q: "Il est né dans quelle ville ?", answer: "à Bruxelles" },
          { q: "Dans quel pays il habite ?", answer: "En France" },
          { q: "Quel est son numéro de passeport ?", answer: "EA311273" },
        ],
      },
      {
        num: 2, page: 13,
        instruction: "Production écrite — Vous présentez Thomas Puissat sur le site d'un festival de BD, à partir de sa fiche d'auteur (Nom Puissat, Prénom Thomas, né à Anvers, Belgique, 36 ans, habite à Marseille, aime la musique/le cinéma, parle français/italien/japonais).",
        vi: "Dựa vào bảng thông tin, viết một đoạn giới thiệu tác giả truyện tranh ở ngôi thứ ba.",
        type: "fill",
        items: [
          { q: "Rédigez la présentation complète.", answer: "Il s'appelle Thomas Puissat. Il est né à Anvers, en Belgique. Il a 36 ans. Il habite à Marseille, en France. Il aime la musique et le cinéma. Il parle français, italien et japonais." },
        ],
      },
      {
        num: 3, page: 14,
        instruction: "Bilan linguistique — Grammaire : Complétez les phrases avec les adjectifs féminins. (/5)",
        vi: "Chia tính từ quốc tịch sang giống cái.",
        type: "fill",
        items: [
          { q: "Il est japonais. Elle est ……………………… .", answer: "japonaise" },
          { q: "Il est turc. Elle est ……………………… .", answer: "turque" },
          { q: "Il est suédois. Elle est ……………………… .", answer: "suédoise" },
          { q: "Il est espagnol. Elle est ……………………… .", answer: "espagnole" },
          { q: "Il est mexicain. Elle est ……………………… .", answer: "mexicaine" },
        ],
      },
      {
        num: 4, page: 14,
        instruction: "Bilan linguistique — Grammaire : Complétez les phrases avec le, la, l', les. (/5)",
        vi: "Điền mạo từ xác định đúng.",
        type: "fill",
        items: [
          { q: "J'aime …… café.", answer: "le" },
          { q: "Tu aimes …… histoire ?", answer: "l'" },
          { q: "C'est quel pays, …… Italie ?", answer: "l'" },
          { q: "Kathlyn aime …… langues.", answer: "les" },
          { q: "San aime …… Tunisie.", answer: "la" },
        ],
      },
      {
        num: 5, page: 14,
        instruction: "Bilan linguistique — Grammaire : Choisissez la bonne préposition. (/5)",
        vi: "Chọn giới từ đúng.",
        type: "choice",
        items: [
          { q: "Tao est chinoise. Elle habite ___ Chine.", options: ["au", "en"], answer: "en" },
          { q: "Charlie est américaine. Elle habite ___ États-Unis.", options: ["aux", "en"], answer: "aux" },
          { q: "Matteo est suisse. Il habite ___ Genève.", options: ["en", "à"], answer: "à" },
          { q: "Nélia est portugaise. Elle habite ___ Portugal.", options: ["à", "au"], answer: "au" },
          { q: "Amrish est indien. Il habite ___ Inde.", options: ["en", "à"], answer: "en" },
        ],
      },
      {
        // Page 14 — Grammaire, ex.4. Le corrigé imprimé ne donne que des
        // paires numérotées (a→4, b→2, c→5, d→3, e→1) sans réécrire les fins
        // de phrase ; la reformulation ci-dessous est une déduction (voir la
        // note ⚠️ dans cahier_unite_1.md), pas le texte imprimé littéral.
        num: 6, page: 14,
        instruction: "Bilan linguistique — Grammaire : Associez les débuts et les fins de phrases. (/5)",
        vi: "Nối \"quel/quelle/quels/quelles/dans quel\" với phần câu hỏi phù hợp.",
        type: "match",
        pairs: [
          { l: "Quel", r: "sport vous aimez ?" },
          { l: "Quelle", r: "est la nationalité de John ?" },
          { l: "Quels", r: "artistes tu aimes ?" },
          { l: "Quelles", r: "langues vous parlez ?" },
          { l: "Dans quel", r: "pays tu habites ?" },
        ],
      },
      {
        num: 7, page: 14,
        instruction: "Bilan linguistique — Vocabulaire : Regardez les images et complétez les noms de loisirs. (/5)",
        vi: "Điền tên các môn sở thích của Raquel dựa vào hình ảnh.",
        type: "fill",
        items: [
          { q: "l'……… (palette de peinture)", answer: "art" },
          { q: "la ……… (notes de musique)", answer: "musique" },
          { q: "les ……… (drapeaux)", answer: "langues" },
          { q: "le ……… (caméra)", answer: "cinéma" },
          { q: "le ……… (ballon)", answer: "sport" },
        ],
      },
      {
        num: 8, page: 14,
        instruction: "Bilan linguistique — Vocabulaire : Écrivez les nombres. (/5)",
        vi: "Viết số bằng chữ số.",
        type: "fill",
        items: [
          { q: "quarante-deux", answer: "42" },
          { q: "cinquante-neuf", answer: "59" },
          { q: "trente et un", answer: "31" },
          { q: "soixante-huit", answer: "68" },
          { q: "cinquante et un", answer: "51" },
        ],
      },
      {
        num: 9, page: 15,
        instruction: "Bilan linguistique — Vocabulaire : Complétez avec les noms de pays. (/5)",
        vi: "Điền tên nước đúng.",
        type: "fill",
        items: [
          { q: "Chris est allemand, il est né en ……………………… .", answer: "Allemagne" },
          { q: "Miranda est américaine, elle est née aux ……………………… .", answer: "États-Unis" },
          { q: "Ignacio est argentin, il est né en ……………………… .", answer: "Argentine" },
          { q: "Aya est marocaine, elle est née au ……………………… .", answer: "Maroc" },
          { q: "Mai est vietnamienne, elle est née au ……………………… .", answer: "Vietnam" },
        ],
      },
      {
        num: 10, page: 15,
        instruction: "Bilan linguistique — Vocabulaire : Écrivez les nombres en lettres. (/5)",
        vi: "Viết số bằng chữ.",
        type: "fill",
        items: [
          { q: "79", answer: "soixante-dix-neuf" },
          { q: "82", answer: "quatre-vingt-deux" },
          { q: "92", answer: "quatre-vingt-douze" },
          { q: "70", answer: "soixante-dix" },
          { q: "80", answer: "quatre-vingts" },
        ],
      },
      {
        // Page 16-17 — DELF A1. Les questions 3-4 de la CO proposent des
        // pictogrammes (A/B/C) sans texte dans le corrigé imprimé — reproduit
        // tel quel (voir ⚠️ dans cahier_unite_1.md).
        num: 11, page: 16, audioSrc: piste(16),
        instruction: "DELF A1 — Compréhension de l'oral (4 points). Annonce radio du festival de BD, invité Henrik Müller (34 ans, né en Allemagne, habite en France depuis 22 ans, aime la musique espagnole et le sport).",
        vi: "Nghe bản tin radio giới thiệu khách mời Henrik và chọn đáp án đúng (một số câu hỏi có lựa chọn bằng hình ảnh).",
        type: "choice",
        items: [
          { q: "Quel âge a Henrik ?", options: ["19 ans", "22 ans", "34 ans"], answer: "34 ans" },
          { q: "Où habite Henrik ?", options: ["France", "Espagne", "Allemagne"], answer: "France" },
        ],
      },
      {
        num: 12, page: 16,
        instruction: "DELF A1 — Compréhension des écrits (7 points). Affiche du festival Francofolies : concert de Jane Birkin (musicienne anglaise, née le 14 décembre 1946 à Londres, en France depuis 1960, parle français/italien), mercredi 14 juillet, 19h, billet 25€ sur internet.",
        vi: "Đọc áp phích quảng cáo buổi hòa nhạc và trả lời câu hỏi về sự kiện và nghệ sĩ.",
        type: "choice",
        items: [
          { q: "Quelle est la nationalité de l'artiste ?", options: ["anglaise", "italienne", "française"], answer: "anglaise" },
          { q: "Quelle est la date de naissance de l'artiste ?", options: ["14 juillet", "25 septembre", "14 décembre"], answer: "14 décembre" },
          { q: "À quelle heure commence l'événement ?", options: ["19h", "20h", "21h"], answer: "19h" },
          { q: "Comment vous pouvez avoir un billet ?", options: ["au festival", "sur Internet", "au téléphone"], answer: "sur Internet" },
        ],
      },
      {
        num: 13, page: 17,
        instruction: "DELF A1 — Production écrite (10 points). Complétez ce formulaire pour vous présenter à votre professeur de français (Nom, Prénom, Adresse, Ville, Téléphone, Âge, Nationalité, Langues, Qu'est-ce que vous aimez, Pays préféré).",
        vi: "Điền mẫu tự giới thiệu bản thân với giáo viên tiếng Pháp (tên, tuổi, quốc tịch, sở thích…).",
        type: "fill",
        items: [
          { q: "Exemple de production complet (modèle du corrigé) :", answer: "Prénom : Atsuko — Adresse : 5 rue Martainville — Ville : Rouen — Téléphone : 06 25 39 07 13 — Âge : 22 ans — Nationalité : japonaise — Langues : japonais, anglais — Qu'est-ce que vous aimez ? la musique, le café — Pays préféré : Italie" },
        ],
      },
      {
        num: 14, page: 17,
        instruction: "DELF A1 — Production orale. Posez des questions à l'examinateur à partir des mots : Nationalité ? Âge ? Téléphone ? Aimer ? Langue ? Habiter ?",
        vi: "Dựa vào các từ khoá trên thẻ, đặt câu hỏi phỏng vấn giám khảo.",
        type: "fill",
        items: [
          { q: "Nationalité", answer: "Vous êtes française ?" },
          { q: "Âge", answer: "Vous avez quel âge ?" },
          { q: "Téléphone", answer: "Quel est votre numéro de téléphone ?" },
          { q: "Aimer", answer: "Vous aimez le cinéma ?" },
          { q: "Langue", answer: "Vous parlez quelle(s) langue(s) ?" },
          { q: "Habiter", answer: "Dans quelle ville vous habitez ?" },
        ],
      },
      {
        num: 15, page: 18,
        instruction: "Jeux — Associez les étiquettes pour trouver 5 noms de loisirs.",
        vi: "Ghép các mảnh chữ để tạo thành 5 từ chỉ sở thích.",
        type: "fill",
        items: [
          { q: "5 mots à retrouver :", answer: "art, sport, langues, cinéma, musique" },
        ],
      },
      {
        num: 16, page: 18,
        instruction: "Jeux — Utilisez les lettres du mot « nationalité » et écrivez des nationalités au féminin.",
        vi: "Dùng các chữ cái trong từ \"nationalité\" để tìm các tính từ quốc tịch giống cái.",
        type: "fill",
        items: [
          { q: "11 nationalités féminines à retrouver :", answer: "polonaise, française, vietnamienne, italienne, coréenne, indienne, espagnole, sénégalaise, chinoise, tunisienne, égyptienne" },
        ],
      },
      {
        num: 17, page: 18,
        instruction: "Jeux — Regardez les drapeaux et retrouvez les noms de pays avec les articles.",
        vi: "Nhìn quốc kỳ và tìm tên nước kèm mạo từ đúng.",
        type: "fill",
        items: [
          { q: "a. (exemple)", answer: "l'Algérie", example: true },
          { q: "b.", answer: "la Colombie" },
          { q: "c.", answer: "le Brésil" },
          { q: "d.", answer: "l'Allemagne" },
          { q: "e.", answer: "le Cameroun" },
          { q: "f.", answer: "les Pays-Bas" },
        ],
      },
    ],
  },
};
