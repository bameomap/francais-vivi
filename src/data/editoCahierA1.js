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

  u2: {

    // ── Grammaire, keyed by grammar point index in editoGrammar.js's "g2" ──
    // g2 has 5 points; p1 "IL Y A" has no dedicated "Grammaire" page in the
    // cahier (the cahier only covers articles p.19, verbes -ER p.20, adjectifs
    // possessifs p.22, professions p.23 — il y a is not drilled on its own
    // cahier page), so p1 is intentionally absent below.
    grammar: {

      // p0 — Mạo từ xác định và bất định (cahier p. 19)
      p0: [
        {
          num: 1, page: 19, audioSrc: piste(17),
          instruction: "Écoutez et cochez la bonne réponse (un / une / des / le / la / l' / les).",
          vi: "Nghe và đánh dấu mạo từ đúng (xác định hoặc bất định) cho mỗi từ.",
          type: "choice",
          items: [
            { q: "a.", options: ["un", "une", "des", "le", "la", "l'", "les"], answer: "un" },
            { q: "b.", options: ["un", "une", "des", "le", "la", "l'", "les"], answer: "le" },
            { q: "c.", options: ["un", "une", "des", "le", "la", "l'", "les"], answer: "la" },
            { q: "d.", options: ["un", "une", "des", "le", "la", "l'", "les"], answer: "les" },
            { q: "e.", options: ["un", "une", "des", "le", "la", "l'", "les"], answer: "des" },
            { q: "f.", options: ["un", "une", "des", "le", "la", "l'", "les"], answer: "l'" },
            { q: "g.", options: ["un", "une", "des", "le", "la", "l'", "les"], answer: "une" },
          ],
        },
        {
          num: 2, page: 19,
          instruction: "Soulignez le bon article.",
          vi: "Gạch chân mạo từ đúng (xác định hoặc bất định).",
          type: "choice",
          items: [
            { q: "Exemple : C'est la / une rue de la Liberté.", options: ["la", "une"], answer: "la", example: true },
            { q: "Tu as un / le piano ?", options: ["un", "le"], answer: "un" },
            { q: "Pauline adore les / des langues.", options: ["les", "des"], answer: "les" },
            { q: "J'aime la / l' histoire de la France.", options: ["la", "l'"], answer: "l'" },
            { q: "Un / Le quartier Saint-Laurent est super !", options: ["Un", "Le"], answer: "Le" },
          ],
        },
        {
          num: 3, page: 19,
          instruction: "Complétez avec un, une, des, le, la, l' ou les.",
          vi: "Điền mạo từ phù hợp vào đoạn văn kể về nơi ở của Jeanine.",
          type: "fill",
          items: [
            { q: "Jeanine habite …… quartier calme.", answer: "un" },
            { q: "C'est …… quartier de Vizille.", answer: "le" },
            { q: "Elle est dans …… appartement avec …… amie. (2 từ)", answer: "un une" },
            { q: "…… appartement de Jeanine et de Mireille est très sympa.", answer: "L'" },
            { q: "Elles aiment …… musique.", answer: "la" },
            { q: "Elles ont …… instruments de musique.", answer: "des" },
            { q: "Mireille a …… piano et Jeanine a …… guitare ! (2 từ)", answer: "un une" },
          ],
        },
        {
          num: 4, page: 19,
          instruction: "Complétez les terminaisons du verbe habiter.",
          vi: "Chia động từ \"habiter\" ở thì hiện tại theo chủ ngữ.",
          type: "fill",
          items: [
            { q: "Marie et Frédéric habit…… à Bruxelles.", answer: "habitent" },
            { q: "Stéphane habit…… à Genève.", answer: "habite" },
            { q: "J'habit…… à Dakar.", answer: "habite" },
            { q: "Rio et moi, nous habit…… à Montréal.", answer: "habitons" },
            { q: "Vous habit…… où ?", answer: "habitez" },
            { q: "Tu habit…… avec Jacques ?", answer: "habites" },
          ],
        },
      ],

      // p2 — Les verbes en -er au présent (cahier p. 20)
      p2: [
        {
          num: 1, page: 20,
          instruction: "Soulignez la bonne réponse.",
          vi: "Chọn dạng đúng \"je/j'\" hoặc \"ne/n'\" trước nguyên âm hay phụ âm.",
          type: "choice",
          items: [
            { q: "Je / J' déteste le sport.", options: ["Je", "J'"], answer: "Je" },
            { q: "Je / J' adore la montagne.", options: ["Je", "J'"], answer: "J'" },
            { q: "Il ne / n' aime pas la ville.", options: ["ne", "n'"], answer: "n'" },
            { q: "Nous ne / n' habitons pas à Paris.", options: ["ne", "n'"], answer: "n'" },
            { q: "Tu ne / n' parles pas espagnol ?", options: ["ne", "n'"], answer: "ne" },
            { q: "Je / J' habite à Lyon.", options: ["Je", "J'"], answer: "J'" },
          ],
        },
        {
          num: 2, page: 20,
          instruction: "Associez pour former des phrases.",
          vi: "Nối chủ ngữ với động từ chia đúng ở thì hiện tại.",
          type: "match",
          pairs: [
            { l: "Mike et moi, nous", r: "parlons suédois." },
            { l: "Je n'", r: "aime pas l'histoire." },
            { l: "Jacqueline", r: "écoute la radio." },
            { l: "Vous", r: "regardez des films français ?" },
            { l: "Tu", r: "marches le dimanche ?" },
            { l: "Les amis de Rick", r: "détestent le ski." },
          ],
        },
        {
          num: 3, page: 20,
          instruction: "Complétez les phrases avec les verbes proposés.",
          vi: "Điền động từ -er đúng chia theo chủ ngữ.",
          type: "fill",
          bank: ["détestes", "aime", "adorent", "dansez", "parle", "aimons"],
          items: [
            { q: "Elle ……………….. l'appartement de Julie ! Il est super !", answer: "aime" },
            { q: "Ils ……………….. la danse.", answer: "adorent" },
            { q: "Je ne ……………….. pas bien anglais.", answer: "parle" },
            { q: "Tu ……………….. le quartier Saint-Jean ? Il n'est pas bien ?", answer: "détestes" },
            { q: "Nous ……………….. les films argentins.", answer: "aimons" },
            { q: "Vous ……………….. avec nous ?", answer: "dansez" },
          ],
        },
        {
          num: 4, page: 20,
          instruction: "Complétez les terminaisons des verbes.",
          vi: "Điền đúng đuôi động từ -er theo chủ ngữ.",
          type: "fill",
          items: [
            { q: "Je détest…… le sport.", answer: "déteste" },
            { q: "Léo march…… à la montagne.", answer: "marche" },
            { q: "Lou et Vadim ador…… danser.", answer: "adorent" },
            { q: "Vous habit…… où ?", answer: "habitez" },
            { q: "Tu dans…… avec moi ?", answer: "danses" },
            { q: "Jorma et moi, nous ne ski…… pas.", answer: "skions" },
          ],
        },
        {
          num: 5, page: 20, audioSrc: piste(18),
          instruction: "Écoutez et écrivez les verbes à la forme négative.",
          vi: "Nghe và viết lại động từ ở thể phủ định (ne...pas).",
          type: "fill",
          items: [
            { q: "Nous ……………….………………. le dimanche.", answer: "ne marchons pas" },
            { q: "Je ……………….………………. nager.", answer: "n'aime pas" },
            { q: "Gaël ……………….………………. italien.", answer: "ne parle pas" },
            { q: "Ils ……………….………………. danser.", answer: "n'aiment pas" },
            { q: "Vous ……………….………………. à Montpellier ?", answer: "n'habitez pas" },
            { q: "Tu ……………….………………. le rock ?", answer: "ne danses pas" },
          ],
        },
      ],

      // p3 — Les adjectifs possessifs (cahier p. 22)
      p3: [
        {
          num: 1, page: 22,
          instruction: "Soulignez la bonne réponse.",
          vi: "Gạch chân tính từ sở hữu đúng theo giống/số của danh từ.",
          type: "choice",
          items: [
            { q: "Ma / Mon cousine est fille unique.", options: ["Ma", "Mon"], answer: "Ma" },
            { q: "Ta / Ton père est fleuriste ?", options: ["Ta", "Ton"], answer: "Ton" },
            { q: "Sa / Son rue est calme.", options: ["Sa", "Son"], answer: "Sa" },
            { q: "Ma / Mes parents habitent à Paris.", options: ["Ma", "Mes"], answer: "Mes" },
            { q: "Ton / Tes frères ont quel âge ?", options: ["Ton", "Tes"], answer: "Tes" },
            { q: "Sa / Ses tante est informaticienne ?", options: ["Sa", "Ses"], answer: "Sa" },
          ],
        },
        {
          num: 2, page: 22,
          instruction: "Cochez la réponse correcte.",
          vi: "Chọn tính từ sở hữu đúng dựa vào chủ ngữ và số lượng.",
          type: "choice",
          items: [
            { q: "Il a deux frères. Ce sont…", options: ["ses frères", "leurs frères"], answer: "ses frères" },
            { q: "Nous avons trois enfants. Ce sont…", options: ["nos enfants", "leurs enfants"], answer: "nos enfants" },
            { q: "Elles ont des amis à l'université. Ce sont…", options: ["leurs amis", "ses amis"], answer: "leurs amis" },
            { q: "Vous avez deux filles. Ce sont…", options: ["vos filles", "leurs filles"], answer: "vos filles" },
            { q: "Ils ont deux fils. Ce sont…", options: ["ses fils", "leurs fils"], answer: "leurs fils" },
            { q: "Nous avons huit cousins. Ce sont…", options: ["notre cousin", "nos cousins"], answer: "nos cousins" },
          ],
        },
        {
          num: 3, page: 22, audioSrc: piste(22),
          instruction: "Écoutez et cochez (à moi / à toi / à lui-à elle / à nous / à vous / à eux-à elles).",
          vi: "Nghe và xác định người sở hữu tương ứng (à moi/à toi/...).",
          type: "choice",
          items: [
            { q: "a.", options: ["à moi", "à toi", "à lui/à elle", "à nous", "à vous", "à eux/à elles"], answer: "à moi" },
            { q: "b.", options: ["à moi", "à toi", "à lui/à elle", "à nous", "à vous", "à eux/à elles"], answer: "à moi" },
            { q: "c.", options: ["à moi", "à toi", "à lui/à elle", "à nous", "à vous", "à eux/à elles"], answer: "à vous" },
            { q: "d.", options: ["à moi", "à toi", "à lui/à elle", "à nous", "à vous", "à eux/à elles"], answer: "à toi" },
            { q: "e.", options: ["à moi", "à toi", "à lui/à elle", "à nous", "à vous", "à eux/à elles"], answer: "à lui/à elle" },
            { q: "f.", options: ["à moi", "à toi", "à lui/à elle", "à nous", "à vous", "à eux/à elles"], answer: "à vous" },
            { q: "g.", options: ["à moi", "à toi", "à lui/à elle", "à nous", "à vous", "à eux/à elles"], answer: "à eux/à elles" },
            { q: "h.", options: ["à moi", "à toi", "à lui/à elle", "à nous", "à vous", "à eux/à elles"], answer: "à nous" },
          ],
        },
        {
          num: 4, page: 22,
          instruction: "Transformez les phrases comme dans l'exemple (Exemple : L'appartement est à vous ? → C'est votre appartement ?).",
          vi: "Chuyển câu sở hữu \"être à...\" thành tính từ sở hữu.",
          type: "fill",
          items: [
            { q: "Le piano est à toi ? → C'est …..……... piano ?", answer: "ton" },
            { q: "La guitare est à moi ! → C'est …..……... guitare !", answer: "ma" },
            { q: "C'est la famille de Nicolas. → C'est …..……... famille.", answer: "sa" },
            { q: "C'est l'adresse de madame Pinot. → C'est …..……... adresse.", answer: "son" },
            { q: "Les instruments de musique sont à moi. → Ce sont …..……... instruments de musique.", answer: "mes" },
            { q: "Ce sont les parents de Pia et Kelly. → Ce sont …..……... parents.", answer: "leurs" },
          ],
        },
      ],

      // p4 — Le masculin et le féminin des professions (cahier p. 23)
      p4: [
        {
          num: 1, page: 23,
          instruction: "Classez les mots dans le tableau (masculin ou féminin).",
          vi: "Xếp tên nghề nghiệp vào bảng theo giống đực/giống cái.",
          type: "choice",
          items: [
            { q: "infirmier", options: ["masculin", "féminin"], answer: "masculin", example: true },
            { q: "professeure", options: ["masculin", "féminin"], answer: "féminin" },
            { q: "actrice", options: ["masculin", "féminin"], answer: "féminin" },
            { q: "coiffeuse", options: ["masculin", "féminin"], answer: "féminin" },
            { q: "informaticien", options: ["masculin", "féminin"], answer: "masculin" },
            { q: "étudiant", options: ["masculin", "féminin"], answer: "masculin" },
          ],
        },
        {
          num: 2, page: 23,
          instruction: "Lisez le texte et soulignez la bonne réponse.",
          vi: "Đọc đoạn văn và gạch chân đúng dạng nghề nghiệp theo giới tính của người được nói tới.",
          type: "choice",
          items: [
            { q: "Je m'appelle Sophie, je suis professeur / professeure.", options: ["professeur", "professeure"], answer: "professeure" },
            { q: "Mon mari Younès est informaticien / informaticienne.", options: ["informaticien", "informaticienne"], answer: "informaticien" },
            { q: "Notre fils Florent est étudiant / étudiante à l'université.", options: ["étudiant", "étudiante"], answer: "étudiant" },
            { q: "Notre fille Rose est coiffeur / coiffeuse.", options: ["coiffeur", "coiffeuse"], answer: "coiffeuse" },
            { q: "La petite amie de Florent est acteur / actrice.", options: ["acteur", "actrice"], answer: "actrice" },
            { q: "Le mari de Rose est infirmier / infirmière.", options: ["infirmier", "infirmière"], answer: "infirmier" },
          ],
        },
        {
          num: 3, page: 23, audioSrc: piste(23),
          instruction: "Écoutez et cochez (infirmier/infirmière, coiffeur/coiffeuse, informaticien/informaticienne, étudiant/étudiante, acteur/actrice).",
          vi: "Nghe và đánh dấu đúng dạng giống đực hay giống cái của nghề nghiệp.",
          type: "choice",
          items: [
            { q: "infirmier / infirmière ?", options: ["infirmier", "infirmière"], answer: "infirmier" },
            { q: "coiffeur / coiffeuse ?", options: ["coiffeur", "coiffeuse"], answer: "coiffeuse" },
            { q: "informaticien / informaticienne ?", options: ["informaticien", "informaticienne"], answer: "informaticienne" },
            { q: "étudiant / étudiante ?", options: ["étudiant", "étudiante"], answer: "étudiant" },
            { q: "acteur / actrice ?", options: ["acteur", "actrice"], answer: "actrice" },
          ],
        },
        {
          num: 4, page: 23,
          instruction: "Soulignez la bonne forme des verbes travailler et étudier.",
          vi: "Chọn dạng chia đúng của \"travailler\" và \"étudier\".",
          type: "choice",
          items: [
            { q: "J'étudie / étudies la littérature.", options: ["étudie", "étudies"], answer: "étudie" },
            { q: "Mon mari et moi, nous travaillent / travaillons à l'hôpital.", options: ["travaillent", "travaillons"], answer: "travaillons" },
            { q: "Mes parents travaille / travaillent à l'université, ils sont professeurs.", options: ["travaille", "travaillent"], answer: "travaillent" },
            { q: "Tes amies étudient / étudions l'histoire aussi ?", options: ["étudient", "étudions"], answer: "étudient" },
            { q: "Vous travaillons / travaillez dans quelle ville ?", options: ["travaillons", "travaillez"], answer: "travaillez" },
            { q: "Tu étudies / étudie le cinéma à l'université ?", options: ["étudies", "étudie"], answer: "étudies" },
          ],
        },
        {
          num: 5, page: 23,
          instruction: "Complétez les phrases avec les verbes proposés (travailler ou étudier).",
          vi: "Chia động từ \"travailler\" hoặc \"étudier\" theo chủ ngữ.",
          type: "fill",
          items: [
            { q: "Je …..……...…..……... à Bruxelles. (travailler)", answer: "travaille" },
            { q: "Mon père et ma mère …..……...…..……... à Paris. (travailler)", answer: "travaillent" },
            { q: "Mon frère Stan …..……...…..……... à Lyon. (étudier)", answer: "étudie" },
            { q: "Ma sœur et ma cousine, elles …..……...…..……... à l'université de Grenoble. (étudier)", answer: "étudient" },
            { q: "Mon oncle …..……...…..……... beaucoup, il est professeur. (travailler)", answer: "travaille" },
            { q: "Tu …..……...…..……... où ? (étudier)", answer: "étudies" },
          ],
        },
      ],
    },

    // ── Vocabulaire (cahier p. 21 "Les lieux, les loisirs (2)" + p. 24 ──
    // "La famille, les professions"). Custom STEP_GROUPS_U2 narrows vocab per
    // cycle: v1_vocab (subIds u2g1 "Les lieux"), v2_vocab (subIds u2g2/u2g3/
    // u2g4 "La musique/Le cinéma/Le sport"), v3_vocab (subIds u2g5/u2g6/u2g7
    // "La famille/La situation familiale/Les professions"). Page 21 mixes
    // lieux and loisirs vocabulary under one header — exercises were split
    // between v1_vocab and v2_vocab by their actual subject, not by page.
    vocab: {
      v1_vocab: [
        {
          num: 2, page: 21,
          instruction: "Complétez les mots dans les phrases.",
          vi: "Điền các chữ cái còn thiếu để hoàn thành từ vựng về nơi ở.",
          type: "fill",
          items: [
            { q: "L'_ _ _ _ _ _ _ _ _ _ _ de Thierry est dans une r_ _ sympa ? (2 từ)", answer: "appartement rue" },
            { q: "À Nice, il y a la m_ _ et les p_ _ _ _ _ sont grandes. (2 từ)", answer: "mer plages" },
            { q: "L'université de Carl est dans un q_ _ _ _ _ _ _ calme.", answer: "quartier" },
            { q: "Tu as un i_ _ _ _ _ _ _ _ _ de musique ?", answer: "instrument" },
          ],
        },
      ],

      v2_vocab: [
        {
          num: 1, page: 21,
          instruction: "Complétez les phrases comme dans l'exemple (Exemple : Naoki aime le ski. Elle aime skier.).",
          vi: "Chuyển giữa danh từ chỉ hoạt động và động từ tương ứng.",
          type: "fill",
          items: [
            { q: "Bertille adore la ……………….… Elle adore nager.", answer: "natation" },
            { q: "Zaza déteste la ……………….… Elle déteste marcher.", answer: "marche" },
            { q: "Albert n'aime pas la danse. Il n'aime pas ……………….… .", answer: "danser" },
          ],
        },
        {
          num: 3, page: 21, audioSrc: piste(19),
          instruction: "Écoutez et associez les phrases entendues aux images.",
          vi: "Nghe các câu và nối với hình ảnh tương ứng (marche, piano, guitare, danse, natation, ski, cinéma).",
          type: "match",
          pairs: [
            { l: "a. Il adore la marche.", r: "image 3 · marche/randonnée" },
            { l: "b. Vous avez un piano ?", r: "image 6 · piano" },
            { l: "c. J'ai une guitare.", r: "image 7 · guitare" },
            { l: "d. Nous aimons danser.", r: "image 4 · danse" },
            { l: "e. Elle adore la natation.", r: "image 5 · natation" },
            { l: "f. Vous aimez le ski ?", r: "image 1 · ski" },
            { l: "g. J'adore les films français !", r: "image 2 · cinéma" },
          ],
        },
        {
          num: 4, page: 21,
          instruction: "Complétez les phrases avec les mots proposés.",
          vi: "Điền từ vựng phù hợp về sở thích và nơi chốn.",
          type: "fill",
          bank: ["films", "marche", "festival", "université", "guitare"],
          items: [
            { q: "J'adore les ……………….. des frères Podalydès.", answer: "films" },
            { q: "Deux places pour le ……………….. de danse, s'il vous plaît.", answer: "festival" },
            { q: "Tu préfères le piano ou la ……………….. ?", answer: "guitare" },
            { q: "Le dimanche, je ……………….. à la montagne.", answer: "marche" },
            { q: "Armelle est à l'……………….. de Lyon.", answer: "université" },
          ],
        },
      ],

      v3_vocab: [
        {
          num: 1, page: 24,
          instruction: "Lisez le texte et complétez les prénoms des personnes de l'arbre généalogique.",
          vi: "Đọc đoạn văn và điền tên các thành viên vào cây gia phả.",
          type: "fill",
          items: [
            { q: "Comment s'appellent les grands-parents de Cécilia ?", answer: "Monique et Albert" },
            { q: "Comment s'appelle le père de Cécilia ?", answer: "Richard" },
            { q: "Comment s'appelle la tante de Cécilia ?", answer: "Isabelle" },
            { q: "Comment s'appelle le mari d'Isabelle ?", answer: "Karim" },
            { q: "Comment s'appelle la mère de Cécilia ?", answer: "Diane" },
            { q: "Comment s'appelle la cousine de Cécilia ?", answer: "Sarah" },
          ],
        },
        {
          num: 2, page: 24,
          instruction: "Choisissez la bonne réponse.",
          vi: "Chọn từ đúng để mô tả quan hệ họ hàng.",
          type: "choice",
          items: [
            { q: "Le frère de mon père, c'est mon oncle / neveu.", options: ["oncle", "neveu"], answer: "oncle" },
            { q: "Mon père, c'est le fils de mes parents / grands-parents.", options: ["parents", "grands-parents"], answer: "grands-parents" },
            { q: "Le fils de mon oncle et de ma tante, c'est mon frère / cousin.", options: ["frère", "cousin"], answer: "cousin" },
            { q: "Je suis la fille / petite-fille de mes grands-parents.", options: ["fille", "petite-fille"], answer: "petite-fille" },
            { q: "La sœur de ma mère, c'est ma tante / grand-mère.", options: ["tante", "grand-mère"], answer: "tante" },
          ],
        },
        {
          num: 3, page: 24, audioSrc: piste(24),
          instruction: "Écoutez et complétez les phrases.",
          vi: "Nghe và điền từ vựng gia đình còn thiếu.",
          type: "fill",
          items: [
            { q: "Mon …………………… s'appelle Frédéric.", answer: "grand-père" },
            { q: "Comment s'appelle ton …………………… ?", answer: "mari" },
            { q: "Ma nièce est …………………… .", answer: "célibataire" },
            { q: "Monsieur Truffaut a neuf …………………… .", answer: "petits-enfants" },
            { q: "Mon …………………… est fleuriste.", answer: "petit ami" },
            { q: "Luc et May organisent leur …………………… .", answer: "mariage" },
          ],
        },
        {
          num: 4, page: 24,
          instruction: "Regardez les images et complétez les phrases avec les professions.",
          vi: "Nhìn hình và điền tên nghề nghiệp phù hợp.",
          type: "fill",
          items: [
            { q: "Suzanne est ………………", answer: "professeure" },
            { q: "Hortense est ………………", answer: "fleuriste" },
            { q: "Benoît est ………………", answer: "coiffeur" },
            { q: "Joseph est ………………", answer: "informaticien" },
            { q: "Barbara est ………………", answer: "étudiante" },
            { q: "Milan est ………………", answer: "acteur" },
          ],
        },
      ],
    },

    // ── Phonie-graphie (cahier p. 21 verbes -er + p. 24 liaisons) ──
    // Two "écoutez et répétez" audio exercises (p.21 piste 20, p.24 piste 26)
    // have no checkable right/wrong content — they're pure pronunciation
    // drills with no corrigé to grade against — so they're intentionally
    // left out here; only the two exercises with an actual written answer
    // are represented.
    phono: [
      {
        num: 2, page: 21, audioSrc: piste(21),
        instruction: "Phonie-graphie : la prononciation des verbes en -er. Écoutez et complétez le texte avec la terminaison des verbes.",
        vi: "Nghe và điền đúng đuôi động từ -er còn thiếu trong đoạn văn.",
        type: "fill",
        items: [
          { q: "J'habit……… à Grenoble.", answer: "habite" },
          { q: "Je travaill……… à l'université.", answer: "travaille" },
          { q: "Mon collègue Mathieu jou……… de la guitare.", answer: "joue" },
          { q: "Ma collègue Manon jou……… du piano.", answer: "joue" },
          { q: "Ils ador……… la musique classique.", answer: "adorent" },
          { q: "Avec mon amie Pauline, nous aim……… le cinéma.", answer: "aimons" },
        ],
      },
      {
        num: 1, page: 24, audioSrc: piste(25),
        instruction: "Phonie-graphie : les liaisons avec les déterminants. Écoutez les phrases et indiquez la liaison ([n], [z] ou aucune [-]).",
        vi: "Nghe các câu và xác định loại liên âm (liaison) sau mạo từ/tính từ sở hữu.",
        type: "choice",
        items: [
          { q: "un ami", options: ["[n]", "[z]", "[-]"], answer: "[n]" },
          { q: "les parents", options: ["[n]", "[z]", "[-]"], answer: "[-]" },
          { q: "mes enfants", options: ["[n]", "[z]", "[-]"], answer: "[z]" },
          { q: "des hommes", options: ["[n]", "[z]", "[-]"], answer: "[z]" },
          { q: "mon oncle", options: ["[n]", "[z]", "[-]"], answer: "[n]" },
          { q: "des cousins", options: ["[n]", "[z]", "[-]"], answer: "[-]" },
        ],
      },
    ],

    // ── Bilan (cahier p. 25 CE+PO, p. 26-27 Bilan linguistique /40, ──
    // p. 28-29 DELF A1, p. 30 Jeux). The "Production orale — Jeu de rôle"
    // (p. 25) and "Devinettes" (Jeux, p. 30 activité 4) are free-answer
    // ("Réponses libres" in the corrigé) and are intentionally not
    // represented — there is no fixed answer to check against.
    bilan: [
      {
        num: 1, page: 25,
        instruction: "Compréhension écrite — « Comment tu vas ? » Lisez le mail de Fiona et répondez aux questions (choix).",
        vi: "Đọc email của Fiona và chọn đáp án đúng cho các câu hỏi 1a-1c.",
        type: "choice",
        items: [
          { q: "1a. Marius est…", options: ["le mari de Fiona", "le petit ami de Fiona"], answer: "le petit ami de Fiona" },
          { q: "1b. Marius est…", options: ["professeur", "fleuriste"], answer: "professeur" },
          { q: "1c. Marius…", options: ["a des frères et sœurs", "n'a pas de frères et sœurs"], answer: "n'a pas de frères et sœurs" },
        ],
      },
      {
        num: 2, page: 25,
        instruction: "Compréhension écrite — « Comment tu vas ? » Vrai ou faux ?",
        vi: "Đọc email của Fiona và xác định đúng/sai cho các câu 2a-2c.",
        type: "truefalse",
        items: [
          { q: "2a. Les parents de Marius travaillent.", answer: true },
          { q: "2b. Fiona et Marius habitent dans un appartement.", answer: true },
          { q: "2c. Fiona n'aime pas son quartier.", answer: false },
        ],
      },
      {
        num: 3, page: 25,
        instruction: "Compréhension écrite — « Comment tu vas ? » Répondez aux questions.",
        vi: "Đọc email của Fiona và trả lời câu hỏi 3-4.",
        type: "fill",
        items: [
          { q: "3. Quels sont les deux loisirs de Fiona et Marius ?", answer: "La danse et la musique." },
          { q: "4. Quel instrument de musique ils ont ?", answer: "Ils ont un piano." },
        ],
      },
      {
        num: 4, page: 26,
        instruction: "Bilan linguistique — Grammaire : Complétez les phrases avec les articles définis ou indéfinis. (/5)",
        vi: "Điền mạo từ xác định hoặc bất định.",
        type: "fill",
        items: [
          { q: "C'est ............. rue calme.", answer: "une" },
          { q: "Ce sont ............. instruments de Martin.", answer: "les" },
          { q: "C'est ............. appartement de Marilou.", answer: "l'" },
          { q: "Vous travaillez dans ............. quartier sympa.", answer: "un" },
          { q: "C'est ............. ville de naissance d'Abel.", answer: "la" },
        ],
      },
      {
        num: 5, page: 26,
        instruction: "Bilan linguistique — Grammaire : Conjuguez les verbes au présent. (/5)",
        vi: "Chia động từ ở thì hiện tại.",
        type: "fill",
        items: [
          { q: "Je ....................................... anglais. (parler)", answer: "parle" },
          { q: "Nous ....................................... un quartier sympa. (habiter)", answer: "habitons" },
          { q: "Il ne ....................................... pas. (skier)", answer: "skie" },
          { q: "Vous ....................................... la natation ? (aimer)", answer: "aimez" },
          { q: "Magali et Léo ....................................... la marche. (adorer)", answer: "adorent" },
        ],
      },
      {
        num: 6, page: 26,
        instruction: "Bilan linguistique — Grammaire : Complétez les réponses avec les adjectifs possessifs. (/5)",
        vi: "Điền tính từ sở hữu đúng.",
        type: "fill",
        items: [
          { q: "– C'est l'appartement de Sofia ? – Oui, c'est ............. appartement.", answer: "son" },
          { q: "– Comment s'appelle ta fille ? – ............. fille s'appelle Dita.", answer: "Ma" },
          { q: "– Les parents de Joe travaillent ? – Oui, ............. parents travaillent.", answer: "ses" },
          { q: "– Le fils de Marie et Antoine est à l'université ? – Oui, ............. fils est à l'université.", answer: "son" },
          { q: "– Les amis de Matyas et Jacob sont sympas ? – Oui, ............. amis sont très sympas !", answer: "leurs" },
        ],
      },
      {
        num: 7, page: 27,
        instruction: "Bilan linguistique — Grammaire : Transformez l'adjectif si nécessaire. (/5)",
        vi: "Chuyển tính từ nghề nghiệp sang đúng giống.",
        type: "fill",
        items: [
          { q: "Ma fille est ....................................... (coiffeur).", answer: "coiffeuse" },
          { q: "Mon frère est ....................................... (fleuriste).", answer: "fleuriste" },
          { q: "Ma cousine est ....................................... (acteur).", answer: "actrice" },
          { q: "Mon oncle est ....................................... (infirmier).", answer: "infirmier" },
          { q: "Ma sœur est ....................................... (informaticien).", answer: "informaticienne" },
        ],
      },
      {
        num: 8, page: 27,
        instruction: "Bilan linguistique — Vocabulaire : Complétez le texte avec les mots de vocabulaire. (/5)",
        vi: "Điền từ vựng vào đoạn văn.",
        type: "fill",
        items: [
          { q: "Notre rue est dans un ................................... très sympa.", answer: "quartier" },
          { q: "Nous avons deux instruments de musique : un piano et une ................................... .", answer: "guitare" },
          { q: "On adore le ................................... international de Cannes !", answer: "festival" },
          { q: "Le week-end, on adore marcher sur la ................................... ", answer: "plage" },
          { q: "…et nager dans la ................................... .", answer: "mer" },
        ],
      },
      {
        num: 9, page: 27,
        instruction: "Bilan linguistique — Vocabulaire : Associez les phrases et les images. (/5)",
        vi: "Nối câu với hình ảnh tương ứng.",
        type: "match",
        pairs: [
          { l: "Ta rue est très calme.", r: "image 5" },
          { l: "Marcella adore la danse.", r: "image 4" },
          { l: "Vous aimez le ski ?", r: "image 1" },
          { l: "Avec mes amies, on aime la marche.", r: "image 2" },
          { l: "Akim nage bien.", r: "image 3" },
        ],
      },
      {
        num: 10, page: 27,
        instruction: "Bilan linguistique — Vocabulaire : Vrai ou faux ? (/5)",
        vi: "Xác định đúng/sai.",
        type: "truefalse",
        items: [
          { q: "La sœur de ma mère est ma tante.", answer: true },
          { q: "Mon père est le fils de mes grands-parents.", answer: true },
          { q: "Elle étudie à l'université. Elle est étudiante.", answer: true },
          { q: "J'ai deux frères. Je suis fille unique.", answer: false },
          { q: "Le neveu de ma mère est mon cousin.", answer: true },
        ],
      },
      {
        num: 11, page: 27,
        instruction: "Bilan linguistique — Vocabulaire : Complétez les phrases avec les mots proposés. (/5)",
        vi: "Điền từ vựng phù hợp.",
        type: "fill",
        bank: ["petits-enfants", "petit ami", "infirmier", "professeure", "actrice"],
        items: [
          { q: "Mon frère travaille à l'hôpital. Il est ................................... .", answer: "infirmier" },
          { q: "Ma sœur n'est pas mariée. Son ................................... s'appelle Marc.", answer: "petit ami" },
          { q: "Mes grands-parents ont 13 ................................... .", answer: "petits-enfants" },
          { q: "Ma mère est ................................... de cinéma.", answer: "actrice" },
          { q: "Ma tante travaille à l'université, elle est ................................... .", answer: "professeure" },
        ],
      },
      {
        // Page 28 — DELF A1, CO. Le corrigé imprimé ne donne pas le texte des
        // 6 images A-F, seulement leur correspondance avec les 4 situations
        // (2 images sans correspondance) — reproduit tel quel.
        num: 12, page: 28, audioSrc: piste(27),
        instruction: "DELF A1 — Compréhension de l'oral (8 points). Quatre dialogues correspondant à quatre situations, sur six images A-F (deux images ne correspondent à aucune situation).",
        vi: "Nghe 4 đoạn hội thoại ngắn và ghép mỗi đoạn với hình ảnh tương ứng (2 hình dư không tương ứng).",
        type: "fill",
        items: [
          { q: "Image A", answer: "situation n°4" },
          { q: "Image B", answer: "ne correspond à aucune situation" },
          { q: "Image C", answer: "situation n°2" },
          { q: "Image D", answer: "ne correspond à aucune situation" },
          { q: "Image E", answer: "situation n°3" },
          { q: "Image F", answer: "situation n°1" },
        ],
      },
      {
        // Page 28-29 — DELF A1, CE. Le corrigé imprimé ne donne que les lettres
        // de réponse (avec un bref indice entre parenthèses pour 3, 4, 5), pas
        // le texte complet des questions à choix multiples — reproduit tel quel.
        num: 13, page: 28,
        instruction: "DELF A1 — Compréhension des écrits (6 points). Vous recevez un message de votre amie Blanche.",
        vi: "Đọc tin nhắn của bạn Blanche và trả lời câu hỏi trắc nghiệm (nơi đến, giờ hẹn, nghề nghiệp…).",
        type: "fill",
        items: [
          { q: "Question 1", answer: "C." },
          { q: "Question 2", answer: "A." },
          { q: "Question 3 (indice : marcher)", answer: "C." },
          { q: "Question 4 (indice : à 10 h)", answer: "B." },
          { q: "Question 5 (indice : à l'hôpital)", answer: "B." },
        ],
      },
      {
        num: 14, page: 29,
        instruction: "DELF A1 — Production écrite (15 points). Vous étudiez en France. Vous vous présentez sur le forum de l'université (famille, loisirs, 40 mots minimum).",
        vi: "Viết bài giới thiệu bản thân trên diễn đàn của trường đại học (gia đình, sở thích).",
        type: "fill",
        items: [
          { q: "Exemple de production complet (modèle du corrigé) :", answer: "Bonjour, Je m'appelle Atsuko. Je suis japonaise, j'ai 22 ans. J'étudie les langues à l'université de Rouen. Mes parents habitent au Japon, à Osaka. Je n'ai pas de frères et sœurs. J'adore la musique française et le café italien. Le week-end, je vais au cinéma ou au restaurant avec mes amis. À bientôt !" },
        ],
      },
      {
        num: 15, page: 29,
        instruction: "DELF A1 — Production orale. Échange d'informations à partir des mots : Profession ? Quartier ? Adresse ? Sport ? Famille ? Détester ?",
        vi: "Dựa vào các từ khoá trên thẻ, đặt câu hỏi phỏng vấn giám khảo.",
        type: "fill",
        items: [
          { q: "Profession", answer: "Quelle est votre profession ?" },
          { q: "Quartier", answer: "Votre quartier est calme ?" },
          { q: "Adresse", answer: "Vous habitez où ?" },
          { q: "Sport", answer: "Vous aimez le sport ?" },
          { q: "Famille", answer: "Combien vous avez de frères et sœurs ?" },
          { q: "Détester", answer: "Quelle ville vous détestez ?" },
        ],
      },
      {
        num: 16, page: 30,
        instruction: "Jeux — Recomposez les mots.",
        vi: "Sắp xếp lại các âm tiết để tạo thành từ vựng về gia đình/tình trạng hôn nhân.",
        type: "fill",
        items: [
          { q: "ba – li – cé – taire", answer: "célibataire" },
          { q: "é – ma – ri", answer: "marié" },
          { q: "ri – age – ma", answer: "mariage" },
          { q: "tit – pe – mi – a", answer: "petit ami" },
          { q: "tu – di – ant – é", answer: "étudiant" },
          { q: "ts – fan – en", answer: "enfants" },
        ],
      },
      {
        // Page 30 — Jeux, activité 2. ⚠️ Note : le corrigé imprimé indique
        // seulement « Six professions au masculin » sans lister explicitement
        // les 6 noms — seuls infirmier, informaticien et professeur sont
        // récupérables depuis le texte du corrigé (voir cahier_unite_2.md).
        num: 17, page: 30,
        instruction: "Jeux — Trouvez dans la grille 6 noms de professions au masculin.",
        vi: "Tìm 6 tên nghề nghiệp (giống đực) trong ô chữ — chỉ 3/6 từ được ghi rõ trong đáp án in.",
        type: "fill",
        items: [
          { q: "3 des 6 professions identifiables dans le corrigé imprimé :", answer: "infirmier, informaticien, professeur" },
        ],
      },
      {
        num: 18, page: 30,
        instruction: "Jeux — Conjuguez et écrivez les verbes dans la grille (mots croisés).",
        vi: "Chia động từ và điền vào ô chữ.",
        type: "fill",
        items: [
          { q: "a. (horizontal)", answer: "travaillent" },
          { q: "b. (horizontal)", answer: "nage" },
          { q: "c. (horizontal)", answer: "danse" },
          { q: "d. (horizontal)", answer: "étudies" },
          { q: "1. (vertical)", answer: "adore" },
          { q: "2. (vertical)", answer: "parlons" },
          { q: "3. (vertical)", answer: "aiment" },
          { q: "4. (vertical)", answer: "détestez" },
        ],
      },
    ],
  },

  u3: {

    // ── Grammaire, keyed by grammar point index in editoGrammar.js's "g3" ──
    // g3 has 5 points. p4 "Verbes irréguliers — Acheter, Payer, Aller, Faire"
    // has no dedicated cahier Grammaire page of its own — the cahier drills
    // these verbs as a single extra exercise embedded in two OTHER grammar
    // pages instead (p.32 ex.5 "payer/acheter/aller", under the prépositions
    // page; p.34 ex.4 "faire/manger", under the quantité page). Those two
    // exercises are filed under p4 here (matching their actual verb content),
    // not under p1/p2 (matching their page header) — see cahier_unite_3.md.
    grammar: {

      // p0 — Le singulier et le pluriel des noms (cahier p. 31)
      p0: [
        {
          num: 1, page: 31,
          instruction: "Lisez et classez les noms dans le tableau (singulier ou pluriel).",
          vi: "Xếp danh từ vào bảng theo số ít / số nhiều.",
          type: "choice",
          items: [
            { q: "baguette", options: ["singulier", "pluriel"], answer: "singulier" },
            { q: "abricots", options: ["singulier", "pluriel"], answer: "pluriel" },
            { q: "tomates", options: ["singulier", "pluriel"], answer: "pluriel" },
            { q: "courgette", options: ["singulier", "pluriel"], answer: "singulier" },
            { q: "pâtes", options: ["singulier", "pluriel"], answer: "pluriel" },
            { q: "panier", options: ["singulier", "pluriel"], answer: "singulier" },
            { q: "poulet", options: ["singulier", "pluriel"], answer: "singulier" },
          ],
        },
        {
          num: 2, page: 31, audioSrc: piste(28),
          instruction: "Écoutez et soulignez la bonne réponse (singulier ou pluriel).",
          vi: "Nghe và gạch chân dạng số ít hay số nhiều đúng.",
          type: "choice",
          items: [
            { q: "Quatre …… (yaourt/yaourts)", options: ["yaourt", "yaourts"], answer: "yaourts" },
            { q: "Le …… (panier/paniers)", options: ["panier", "paniers"], answer: "panier" },
            { q: "Les …… (œuf/œufs)", options: ["œuf", "œufs"], answer: "œufs" },
            { q: "Trois …… (poivron/poivrons)", options: ["poivron", "poivrons"], answer: "poivrons" },
            { q: "Des …… de saison. (produit/produits)", options: ["produit", "produits"], answer: "produits" },
            { q: "Une …… (formule/formules)", options: ["formule", "formules"], answer: "formule" },
          ],
        },
        {
          num: 3, page: 31,
          instruction: "Soulignez la bonne réponse.",
          vi: "Chọn dạng số ít/số nhiều đúng của danh từ.",
          type: "choice",
          items: [
            { q: "J'aime les fruit / fruits de saison.", options: ["fruit", "fruits"], answer: "fruits" },
            { q: "Il y a une boulangerie / boulangeries ici ?", options: ["boulangerie", "boulangeries"], answer: "boulangerie" },
            { q: "Le poissonnier / poissonniers est très sympa.", options: ["poissonnier", "poissonniers"], answer: "poissonnier" },
            { q: "J'achète mes légume / légumes au marché.", options: ["légume", "légumes"], answer: "légumes" },
            { q: "Deux fromage / fromages de chèvre, s'il vous plaît.", options: ["fromage", "fromages"], answer: "fromages" },
          ],
        },
        {
          num: 4, page: 31,
          instruction: "Complétez avec les noms au singulier ou au pluriel (Exemple : J'achète un croissant. → Tu achètes trois croissants.).",
          vi: "Điền danh từ ở số ít hoặc số nhiều theo mẫu cho sẵn.",
          type: "fill",
          items: [
            { q: "Je mange une ……………….. Tu manges deux pêches.", answer: "pêche" },
            { q: "Lydia achète un kilo de pommes. Son ami achète trois ……………….. de pommes.", answer: "kilos" },
            { q: "Marie a une ……………….. bleue. Claude a deux cartes bleues.", answer: "carte" },
            { q: "Dans mon quartier, il y a une épicerie. Dans ton quartier, il y a trois ……………….. .", answer: "épiceries" },
            { q: "Je paie un ……………….. de riz. Tu paies deux paquets de riz.", answer: "paquet" },
          ],
        },
      ],

      // p1 — Les prépositions de lieu (1) : à la/au/à l'/aux/chez (cahier p. 32)
      p1: [
        {
          // ⚠️ Note (cahier_unite_3.md) : le corrigé imprimé ne détaille que
          // la réponse "a" ; les 5 autres se déduisent directement de la
          // transcription des phrases entendues (reproduite dans le corrigé).
          num: 1, page: 32, audioSrc: piste(29),
          instruction: "Écoutez et cochez (chez le / chez l' / au / à la / à l' / aux).",
          vi: "Nghe và chọn giới từ đúng — 5/6 đáp án suy ra từ lời thoại (⚠️ voir note dans cahier_unite_3.md), không phải bảng đáp án trực tiếp.",
          type: "choice",
          items: [
            { q: "a. Tu vas …… boulanger ?", options: ["chez le", "au", "à la", "chez l'", "à l'", "aux"], answer: "chez le" },
            { q: "b. J'aime aller …… marché.", options: ["chez le", "au", "à la", "chez l'", "à l'", "aux"], answer: "au" },
            { q: "c. Pour le poisson, on va …… poissonnerie.", options: ["chez le", "au", "à la", "chez l'", "à l'", "aux"], answer: "à la" },
            { q: "d. Tu achètes les yaourts …… épicier, s'il te plaît ?", options: ["chez le", "au", "à la", "chez l'", "à l'", "aux"], answer: "chez l'" },
            { q: "e. Les paniers sont disponibles …… épicerie.", options: ["chez le", "au", "à la", "chez l'", "à l'", "aux"], answer: "à l'" },
            { q: "f. Je déteste payer …… caisses automatiques.", options: ["chez le", "au", "à la", "chez l'", "à l'", "aux"], answer: "aux" },
          ],
        },
        {
          num: 2, page: 32,
          instruction: "Associez.",
          vi: "Nối giới từ với địa điểm/nghề đúng.",
          type: "match",
          pairs: [
            { l: "On va chez l'", r: "épicière." },
            { l: "On va chez la", r: "boulangère." },
            { l: "On va à la", r: "fromagerie." },
            { l: "On va à l'", r: "épicerie." },
            { l: "On va au", r: "marché." },
            { l: "On va aux", r: "caisses." },
          ],
        },
        {
          num: 3, page: 32,
          instruction: "Soulignez la bonne réponse.",
          vi: "Chọn giới từ đúng: \"à la/à l'/au/aux\" (nơi chốn) hay \"chez\" (người bán hàng).",
          type: "choice",
          items: [
            { q: "Pour le fromage, je vais à la / chez la fromagère.", options: ["à la", "chez la"], answer: "chez la" },
            { q: "J'achète ma viande à la / chez la boucherie.", options: ["à la", "chez la"], answer: "à la" },
            { q: "Avec mon mari, on va au / chez le marché le dimanche.", options: ["au", "chez le"], answer: "au" },
            { q: "Il y a beaucoup de monde à l' / chez l'épicier.", options: ["à l'", "chez l'"], answer: "chez l'" },
            { q: "J'aime payer aux / chez les caisses automatiques.", options: ["aux", "chez les"], answer: "aux" },
            { q: "Le dimanche, on achète les croissants à la / chez la boulangerie.", options: ["à la", "chez la"], answer: "à la" },
          ],
        },
        {
          num: 4, page: 32,
          instruction: "Complétez les dialogues avec à, au, chez.",
          vi: "Điền giới từ vào các đoạn hội thoại ngắn.",
          type: "fill",
          items: [
            { q: "– Salut. Je suis ...................... la fromagère.", answer: "chez" },
            { q: "– Nous allons ...................... marché samedi ?", answer: "au" },
            { q: "– Vous payez comment ...................... supermarché ?", answer: "au" },
            { q: "– Non, c'est bon, je vais ...................... la boulangerie.", answer: "à" },
            { q: "– On va ...................... le boucher.", answer: "chez" },
          ],
        },
      ],

      // p2 — La quantité non définie : du/de la/de l'/des (cahier p. 34)
      p2: [
        {
          num: 1, page: 34, audioSrc: piste(33),
          instruction: "Écoutez et cochez (du / de la / de l' / des / un peu de / beaucoup de / pas de).",
          vi: "Nghe và đánh dấu lượng từ đúng cho từng loại thực phẩm.",
          type: "choice",
          items: [
            { q: "pâtes", options: ["du", "de la", "de l'", "des", "un peu de", "beaucoup de", "pas de"], answer: "des" },
            { q: "beurre", options: ["du", "de la", "de l'", "des", "un peu de", "beaucoup de", "pas de"], answer: "du" },
            { q: "légumes", options: ["du", "de la", "de l'", "des", "un peu de", "beaucoup de", "pas de"], answer: "beaucoup de" },
            { q: "huile d'olive", options: ["du", "de la", "de l'", "des", "un peu de", "beaucoup de", "pas de"], answer: "de l'" },
            { q: "fruits", options: ["du", "de la", "de l'", "des", "un peu de", "beaucoup de", "pas de"], answer: "un peu de" },
            { q: "crème", options: ["du", "de la", "de l'", "des", "un peu de", "beaucoup de", "pas de"], answer: "de la" },
            { q: "viande", options: ["du", "de la", "de l'", "des", "un peu de", "beaucoup de", "pas de"], answer: "pas de" },
          ],
        },
        {
          num: 2, page: 34,
          instruction: "Soulignez la bonne réponse.",
          vi: "Chọn lượng từ đúng theo danh từ.",
          type: "choice",
          items: [
            { q: "Nous mangeons de la / de l' viande au restaurant.", options: ["de la", "de l'"], answer: "de la" },
            { q: "Je voudrais de la / du café.", options: ["de la", "du"], answer: "du" },
            { q: "Il y a de la / de glace ?", options: ["de la", "de"], answer: "de la" },
            { q: "Dans ma quiche, il y a un peu de / du sel.", options: ["un peu de", "du"], answer: "un peu de" },
            { q: "Tu commandes de l' / d' eau, s'il te plaît ?", options: ["de l'", "d'"], answer: "de l'" },
          ],
        },
        {
          num: 3, page: 34,
          instruction: "Complétez les phrases avec de la, de l', du, des, de, d'.",
          vi: "Điền lượng từ/mạo từ partitif đúng.",
          type: "fill",
          items: [
            { q: "Isa adore le poisson, elle mange ................ poisson à la maison et au restaurant.", answer: "du" },
            { q: "Jean-Pierre aime les pâtes, il mange beaucoup ................ pâtes.", answer: "de" },
            { q: "Je suis végétarienne, je ne mange pas ................ viande.", answer: "de" },
            { q: "Mes enfants mangent ................ glace après le repas.", answer: "de la" },
            { q: "Alexandra achète ................ huile bio.", answer: "de l'" },
          ],
        },
      ],

      // p3 — Les verbes en -ir (2e groupe) au présent : choisir, finir (cahier p. 35)
      p3: [
        {
          num: 1, page: 35,
          instruction: "Complétez les phrases avec Je, Tu, Elle, Nous, Vous, Ils.",
          vi: "Điền chủ ngữ phù hợp với động từ chia sẵn.",
          type: "fill",
          items: [
            { q: "................ choisissons le plat.", answer: "Nous" },
            { q: "................ finit le café.", answer: "Elle" },
            { q: "................ ne finis pas mon assiette.", answer: "Je" },
            { q: "................ choisis ton dessert ?", answer: "Tu" },
            { q: "................ choisissent l'entrée.", answer: "Ils" },
            { q: "................ finissez la salade ?", answer: "Vous" },
          ],
        },
        {
          num: 2, page: 35,
          instruction: "Complétez les phrases avec les verbes proposés.",
          vi: "Điền động từ \"choisir\"/\"finir\" chia đúng.",
          type: "fill",
          bank: ["choisit", "finissent", "finis", "choisissez", "choisissent"],
          items: [
            { q: "Les enfants, vous ……………….……… : on mange à la maison ou au restaurant ?", answer: "choisissez" },
            { q: "Pourquoi les enfants ne ……………….……… pas leur assiette ?", answer: "finissent" },
            { q: "Mes parents ……………….……… le restaurant pour mon anniversaire !", answer: "choisissent" },
            { q: "Je ……………….……… le dessert et on commande un café ?", answer: "finis" },
            { q: "Mon mari ……………….……… le plat du jour et moi, le magret de canard.", answer: "choisit" },
          ],
        },
        {
          num: 3, page: 35,
          instruction: "Complétez les terminaisons des verbes.",
          vi: "Điền đúng đuôi động từ nhóm -ir (choisir/finir).",
          type: "fill",
          items: [
            { q: "Mes amis et moi, nous choisiss…… nos plats en ligne.", answer: "choisissons" },
            { q: "Tu chois…… quel plat ?", answer: "choisis" },
            { q: "Je ne fin…… pas mon assiette, désolée.", answer: "finis" },
            { q: "Vous finiss…… la mousse au chocolat ?", answer: "finissez" },
            { q: "Mes enfants choisiss…… toujours le steak-frites au restaurant.", answer: "choisissent" },
          ],
        },
        {
          num: 4, page: 35, audioSrc: piste(34),
          instruction: "Écoutez et complétez les phrases avec les verbes choisir ou finir.",
          vi: "Nghe và điền đúng động từ \"choisir\" hoặc \"finir\".",
          type: "fill",
          items: [
            { q: "On ……………….……… les courses et on va à la maison !", answer: "finit" },
            { q: "Mon fils ……………….……… le plat du jour et moi la blanquette de veau.", answer: "choisit" },
            { q: "Vous ne ……………….……… pas votre omelette ?", answer: "finissez" },
            { q: "Nous ……………….……… le croque-monsieur végétarien en entrée, s'il vous plaît.", answer: "choisissons" },
            { q: "Je ……………….……… ma salade et je mange le riz au lait en dessert.", answer: "finis" },
          ],
        },
      ],

      // p4 — Verbes irréguliers : acheter, payer, aller, faire (see note above —
      // no dedicated cahier page; exercises pulled from p.32 and p.34)
      p4: [
        {
          num: 5, page: 32,
          instruction: "Conjuguez les verbes au présent (payer, acheter, aller).",
          vi: "Chia động từ \"payer\" và \"acheter\"/\"aller\" theo chủ ngữ.",
          type: "fill",
          items: [
            { q: "Tu ……………….……… (payer) ton panier en ligne ?", answer: "payes" },
            { q: "Elles ……………….……… (acheter) le fromage chez le fromager.", answer: "achètent" },
            { q: "Je ……………….……… (aller) à la boulangerie et j'achète le pain.", answer: "vais" },
            { q: "Vous ……………….……… (payer) comment, Monsieur ?", answer: "payez" },
            { q: "Mon fils ……………….……… (acheter) le pain au marché.", answer: "achète" },
            { q: "Vous ……………….……… (aller) où pour faire vos courses ?", answer: "allez" },
          ],
        },
        {
          num: 4, page: 34,
          instruction: "Transformez les verbes avec les sujets proposés (faire, manger — Exemple : Je mange beaucoup de fruits. → Ils mangent beaucoup de fruits.).",
          vi: "Chia lại động từ \"faire\"/\"manger\" theo chủ ngữ mới.",
          type: "fill",
          items: [
            { q: "Vous faites les courses au marché. → Nous ……………….. les courses au marché.", answer: "faisons" },
            { q: "Tu manges avec nous ? → Vous ……………….. avec nous ?", answer: "mangez" },
            { q: "Je fais la cuisine aujourd'hui ! → Nous ……………….. la cuisine aujourd'hui !", answer: "faisons" },
            { q: "Elle ne mange pas au restaurant. → Elles ne ……………….. pas au restaurant.", answer: "mangent" },
            { q: "Je ne mange pas le soir. → Nous ne ……………….. pas le soir.", answer: "mangeons" },
            { q: "Il fait les courses chez l'épicier. → Ils ……………….. les courses chez l'épicier.", answer: "font" },
          ],
        },
      ],
    },

    // ── Vocabulaire (cahier p. 33 "Les commerces, la nourriture" + p. 36 ──
    // "Les repas"). Custom STEP_GROUPS_U3: v1_vocab (u3g1-u3g4, "Cửa hàng ·
    // trái cây · rau củ · thực phẩm"), v2_vocab (u3g5-u3g6, "Số lượng ·
    // phương thức thanh toán"), v3_vocab (u3g7-u3g11, "Ở nhà hàng · đồ uống
    // · món ăn · tráng miệng · bát đĩa"). Page 33's audio exercise (ex.3,
    // quantities/payment vocabulary) was filed under v2_vocab, not v1_vocab,
    // to match its actual content rather than its page.
    vocab: {
      v1_vocab: [
        {
          num: 1, page: 33,
          instruction: "Complétez les deux listes avec les mots proposés.",
          vi: "Xếp từ vào 2 danh sách: tên cửa hàng và tên người bán hàng.",
          type: "choice",
          items: [
            { q: "la poissonnerie", options: ["un commerce", "un(e) commerçant(e)"], answer: "un commerce", example: true },
            { q: "la fromagerie", options: ["un commerce", "un(e) commerçant(e)"], answer: "un commerce" },
            { q: "la boucherie", options: ["un commerce", "un(e) commerçant(e)"], answer: "un commerce" },
            { q: "la poissonnière", options: ["un commerce", "un(e) commerçant(e)"], answer: "un(e) commerçant(e)" },
            { q: "la fromagère", options: ["un commerce", "un(e) commerçant(e)"], answer: "un(e) commerçant(e)" },
            { q: "la bouchère", options: ["un commerce", "un(e) commerçant(e)"], answer: "un(e) commerçant(e)" },
          ],
        },
        {
          num: 2, page: 33,
          instruction: "Complétez les phrases avec les aliments sur les images.",
          vi: "Nhìn hình và điền tên thực phẩm phù hợp.",
          type: "fill",
          items: [
            { q: "Le matin, je mange deux ………………...", answer: "croissants" },
            { q: "Je n'aime pas les ………………...", answer: "haricots verts" },
            { q: "Je voudrais deux kilos de ……………….., s'il vous plaît.", answer: "pommes de terre" },
            { q: "Je vais au marché pour acheter des ……………….. et des ……………….. (2 từ)", answer: "fraises pêches" },
            { q: "J'adore le ……………….. mais je n'aime pas la ……………….. (2 từ)", answer: "poisson viande" },
          ],
        },
      ],

      v2_vocab: [
        {
          num: 3, page: 33, audioSrc: piste(30),
          instruction: "Écoutez et complétez les phrases.",
          vi: "Nghe và điền từ chỉ đơn vị đo lường hoặc thực phẩm.",
          type: "fill",
          items: [
            { q: "Je voudrais une ……………. de thon, s'il vous plaît !", answer: "boîte" },
            { q: "Vous payez par ……………… ou en ……………… ? (2 từ)", answer: "carte espèces" },
            { q: "J'ai un ……………….. de pâtes.", answer: "kilo" },
            { q: "Tu achètes un ……………….. de crème, s'il te plaît ?", answer: "pot" },
            { q: "Je n'aime pas le ……………….. de chèvre.", answer: "fromage" },
            { q: "Combien coûte la ……………….., s'il vous plaît ?", answer: "salade" },
          ],
        },
      ],

      v3_vocab: [
        {
          num: 1, page: 36,
          instruction: "Associez les images et les mots.",
          vi: "Nối tên đồ dùng bàn ăn với hình ảnh tương ứng.",
          type: "match",
          pairs: [
            { l: "une assiette", r: "image 2 (exemple)" },
            { l: "une carafe d'eau", r: "image 1" },
            { l: "un couteau", r: "image 6" },
            { l: "une cuillère", r: "image 5" },
            { l: "une fourchette", r: "image 4" },
            { l: "un verre", r: "image 3" },
          ],
        },
        {
          num: 2, page: 36,
          instruction: "Remettez les actions dans l'ordre (au restaurant).",
          vi: "Sắp xếp các hành động khi đi ăn nhà hàng theo thứ tự đúng.",
          type: "fill",
          items: [
            { q: "lire la carte", answer: "1", example: true },
            { q: "commander", answer: "2" },
            { q: "manger l'entrée", answer: "3" },
            { q: "manger le plat", answer: "4" },
            { q: "manger le dessert", answer: "5" },
            { q: "payer l'addition", answer: "6" },
          ],
        },
        {
          num: 3, page: 36,
          instruction: "Soulignez la bonne réponse.",
          vi: "Chọn từ đúng theo nghĩa của câu (đồ ăn/thức uống/vật dụng).",
          type: "choice",
          items: [
            { q: "Je paie le restaurant / l'addition.", options: ["le restaurant", "l'addition"], answer: "l'addition" },
            { q: "Je voudrais une tarte aux pommes / une quiche en dessert.", options: ["une tarte aux pommes", "une quiche"], answer: "une tarte aux pommes" },
            { q: "En plat du jour, nous avons le magret de canard / le riz au lait.", options: ["le magret de canard", "le riz au lait"], answer: "le magret de canard" },
            { q: "Je mange la glace / les frites avec la cuillère.", options: ["la glace", "les frites"], answer: "la glace" },
            { q: "Comme boisson, je voudrais un jus de fruits / une omelette.", options: ["un jus de fruits", "une omelette"], answer: "un jus de fruits" },
          ],
        },
        {
          num: 4, page: 36, audioSrc: piste(35),
          instruction: "Écoutez et complétez le dialogue au restaurant.",
          vi: "Nghe và điền các từ còn thiếu vào đoạn hội thoại tại nhà hàng.",
          type: "fill",
          items: [
            { q: "Le client : Je voudrais ……………….., s'il vous plaît.", answer: "plat du jour" },
            { q: "Le serveur : Très bien. Il y a un ……………….. à 16 euros avec le ……………….. et le …………….. (3 từ)", answer: "menu plat dessert" },
            { q: "Le client : Ok, alors je prends le ……………….. aussi. Et de l'……………….., s'il vous plaît. (2 từ)", answer: "riz au lait eau" },
          ],
        },
      ],
    },

    // ── Phonie-graphie (cahier p. 33 voyelles [i]/[y]/[u] + p. 36 ──
    // intonation). Page 36's activité 2 (jouer le dialogue à deux) is
    // "Réponses libres (pratique orale, pas de corrigé écrit)" and is
    // intentionally excluded — no fixed answer to check.
    phono: [
      {
        num: 1, page: 33, audioSrc: piste(31),
        instruction: "Phonie-graphie : les voyelles [i], [y], [u]. Écoutez les phrases et indiquez combien de fois vous entendez [i], [y], [u] (format : i/y/u). Puis répétez.",
        vi: "Nghe và đếm số lần xuất hiện của mỗi nguyên âm [i], [y], [u] trong câu (định dạng i/y/u), sau đó lặp lại.",
        type: "fill",
        items: [
          { q: "a. Je voudrais le menu du jour s'il vous plaît.", answer: "1/2/3", example: true },
          { q: "b. Nous proposons tous les midis des formules avec des légumes.", answer: "2/2/2" },
          { q: "c. Voici la liste des courses pour l'épicerie.", answer: "4/0/2" },
          { q: "d. Dimanche, Arthur organise un pique-nique avec ses amis.", answer: "5/1/0" },
          { q: "e. Tu aimes beaucoup les cerises, les abricots et les kiwis.", answer: "4/1/1" },
        ],
      },
      {
        num: 2, page: 33, audioSrc: piste(32),
        instruction: "Écoutez et complétez le texte avec les graphies correctes (i, u, ou).",
        vi: "Nghe và điền đúng chữ cái tương ứng với nguyên âm [i]/[y]/[u].",
        type: "fill",
        items: [
          { q: "Lund………, (voyelle de \"lundi\")", answer: "i" },
          { q: "L………cie fait une liste. (voyelle de \"Lucie\")", answer: "u" },
          { q: "une l………ste de courses. (voyelle de \"liste\")", answer: "i" },
          { q: "une liste de c………rses. (voyelle de \"courses\")", answer: "ou" },
          { q: "la b………langerie. (voyelle de \"boulangerie\")", answer: "ou" },
          { q: "le s………permarché. (voyelle de \"supermarché\")", answer: "u" },
          { q: "un p………let. (voyelle de \"poulet\")", answer: "ou" },
          { q: "deux b………teilles de jus. (voyelle de \"bouteilles\")", answer: "ou" },
          { q: "j………s de pommes. (voyelle de \"jus\")", answer: "u" },
          { q: "beauc………p de légumes. (voyelle de \"beaucoup\")", answer: "ou" },
          { q: "lég………mes. (voyelle de \"légumes\")", answer: "u" },
        ],
      },
      {
        num: 1, page: 36, audioSrc: piste(36),
        instruction: "Phonie-graphie : l'intonation montante et descendante. Écoutez le dialogue et complétez avec « ? » ou « . » (dans l'ordre, séparés par un espace).",
        vi: "Nghe và điền dấu chấm hỏi hoặc dấu chấm theo ngữ điệu lên/xuống (theo thứ tự, cách nhau bằng dấu cách).",
        type: "fill",
        items: [
          { q: "a. J'aime bien manger du poisson… Et toi… – Moi je préfère manger de la viande… (3 dấu)", answer: ". ? ." },
          { q: "b. Qu'est-ce que tu choisis… – La blanquette de veau… (2 dấu)", answer: "? ." },
          { q: "c. Et tu manges toujours un dessert… – Oui j'adore les desserts… (2 dấu)", answer: "? ." },
          { q: "d. Tu voudrais un café… Un thé… – Je préfère un thé… Je n'aime pas le café… Et toi… – Je voudrais un café… (6 dấu)", answer: "? ? . . ? ." },
        ],
      },
    ],

    // ── Bilan (cahier p. 37 CO+PE, p. 38 Bilan linguistique /40, ──
    // p. 40-41 DELF A1, p. 42 Jeux). Jeux activité 2 ("liste de courses en
    // chaîne") is a free spoken group game with no written corrigé and is
    // intentionally excluded. DELF PE (p.41, formulaire) has no example
    // production printed in the corrigé ("Réponses libres") and is also
    // excluded — there is nothing to check against.
    bilan: [
      {
        num: 1, page: 37, audioSrc: piste(37),
        instruction: "Compréhension orale — « Qu'est-ce qu'on mange ? » Écoutez et répondez aux questions.",
        vi: "Nghe hội thoại của một cặp vợ chồng bàn về bữa tối và trả lời câu hỏi.",
        type: "choice",
        items: [
          { q: "1. Qui parle ?", options: ["un couple", "des amis"], answer: "un couple" },
          { q: "2. Qui prépare le plat principal ?", options: ["l'homme", "la femme"], answer: "l'homme" },
          { q: "3a. Qu'est-ce qu'ils choisissent ?", options: ["une quiche", "une omelette"], answer: "une omelette" },
          { q: "3b. Quelle salade ?", options: ["une salade de tomates", "une salade verte"], answer: "une salade de tomates" },
          { q: "3c. Quelle tarte ?", options: ["une tarte aux abricots", "une tarte aux pommes"], answer: "une tarte aux pommes" },
          { q: "4. Où l'homme va pour acheter de la glace ?", options: ["Au supermarché", "À l'épicerie"], answer: "À l'épicerie" },
        ],
      },
      {
        num: 2, page: 37,
        instruction: "Production écrite — Lisez le message et répondez à Lina (« Coucou, qu'est-ce qu'on mange ce soir ? Une quiche à la courgette ou un croque-monsieur végétarien ? Qui achète quoi ? Bisous »).",
        vi: "Trả lời tin nhắn của Lina, đề xuất món ăn tối và phân công đi mua đồ.",
        type: "fill",
        items: [
          { q: "Rédigez la réponse complète.", answer: "Salut ! Je voudrais manger un croque-monsieur et une salade verte. Tu achètes le pain et les œufs ? Moi, je vais au marché, j'achète le jambon, le fromage et la salade. Je fais une mousse au chocolat pour le dessert. On a du chocolat ?" },
        ],
      },
      {
        num: 3, page: 38,
        instruction: "Bilan linguistique — Grammaire : Soulignez la bonne réponse. (/5)",
        vi: "Chọn dạng số ít/số nhiều đúng.",
        type: "choice",
        items: [
          { q: "Il y a des œuf / œufs dans la quiche ?", options: ["œuf", "œufs"], answer: "œufs" },
          { q: "On achète un poulet / poulets au marché.", options: ["poulet", "poulets"], answer: "poulet" },
          { q: "Le panier / paniers est disponible chez le fleuriste.", options: ["panier", "paniers"], answer: "panier" },
          { q: "Je voudrais trois pot de crème / pots de crème, s'il vous plaît.", options: ["pot de crème", "pots de crème"], answer: "pots de crème" },
          { q: "Tu achètes une bouteille / bouteilles d'huile d'olive.", options: ["bouteille", "bouteilles"], answer: "bouteille" },
        ],
      },
      {
        num: 4, page: 38,
        instruction: "Bilan linguistique — Grammaire : Complétez les phrases avec chez le, chez la, au, à l', aux. (/5)",
        vi: "Điền giới từ chỉ nơi chốn/người đúng.",
        type: "fill",
        items: [
          { q: "Je paie ……………….. caisses automatiques.", answer: "aux" },
          { q: "Le dimanche, nous allons ……………….. boulanger.", answer: "chez le" },
          { q: "Vous faites vos courses ……………….. supermarché ?", answer: "au" },
          { q: "Pour l'huile, on va ……………….. épicerie bio.", answer: "à l'" },
          { q: "Tu achètes le fromage ……………….. fromagère ?", answer: "chez la" },
        ],
      },
      {
        num: 5, page: 38,
        instruction: "Bilan linguistique — Grammaire : Complétez les phrases avec du, de la, de l', des, de. (/5)",
        vi: "Điền lượng từ/mạo từ partitif đúng.",
        type: "fill",
        items: [
          { q: "On mange ............. poisson aujourd'hui ?", answer: "du" },
          { q: "Je voudrais ............. eau, s'il vous plaît.", answer: "de l'" },
          { q: "Nous avons ............. pommes de terre ?", answer: "des" },
          { q: "Il y a ............. salade pour le dîner.", answer: "de la" },
          { q: "Vous mangez beaucoup ............. légumes !", answer: "de" },
        ],
      },
      {
        num: 6, page: 38,
        instruction: "Bilan linguistique — Grammaire : Complétez les phrases avec les verbes choisir ou finir. (/5)",
        vi: "Chia động từ \"choisir\"/\"finir\" đúng.",
        type: "fill",
        items: [
          { q: "Tu ne ……………….………… pas ton assiette ? Ce n'est pas bien !", answer: "finis" },
          { q: "Je ……………….………… le restaurant pour demain, ok ?", answer: "choisis" },
          { q: "On ……………….………… de manger et on paie.", answer: "finit" },
          { q: "Quel dessert vous ……………….………… les enfants ?", answer: "choisissez" },
          { q: "Nous ……………….………… les courses au supermarché et nous allons chez le boucher.", answer: "finissons" },
        ],
      },
      {
        num: 7, page: 38,
        instruction: "Bilan linguistique — Vocabulaire : Complétez les phrases. (/5)",
        vi: "Điền từ vựng về cửa hàng và thực phẩm.",
        type: "fill",
        items: [
          { q: "Pour acheter le pain, je vais à la ................................................................. .", answer: "boulangerie" },
          { q: "Le fromager travaille dans une ................................................................... .", answer: "fromagerie" },
          { q: "Pour le poisson, je vais chez la .................................................................... .", answer: "poissonnière" },
          { q: "Je ne paie pas en espèces, je paie par ....................................................... .", answer: "carte" },
          { q: "À la boucherie, j'achète de la ...................................................................... .", answer: "viande" },
        ],
      },
      {
        num: 8, page: 38,
        instruction: "Bilan linguistique — Vocabulaire : Associez (contenants). (/5)",
        vi: "Nối đơn vị đựng với thực phẩm tương ứng.",
        type: "match",
        pairs: [
          { l: "une boîte de", r: "thon" },
          { l: "un paquet de", r: "riz" },
          { l: "une bouteille de", r: "jus de pomme" },
          { l: "un kilo de", r: "poires" },
          { l: "un pot de", r: "crème" },
        ],
      },
      {
        num: 9, page: 38,
        instruction: "Bilan linguistique — Vocabulaire : Classez les noms de plats dans le tableau (plat principal ou dessert). (/5)",
        vi: "Xếp tên món ăn vào bảng theo món chính hoặc tráng miệng.",
        type: "choice",
        items: [
          { q: "le magret de canard", options: ["plat principal", "dessert"], answer: "plat principal" },
          { q: "le riz au lait", options: ["plat principal", "dessert"], answer: "dessert" },
          { q: "la mousse au chocolat", options: ["plat principal", "dessert"], answer: "dessert" },
          { q: "la quiche", options: ["plat principal", "dessert"], answer: "plat principal" },
          { q: "la blanquette de veau", options: ["plat principal", "dessert"], answer: "plat principal" },
        ],
      },
      {
        num: 10, page: 38,
        instruction: "Bilan linguistique — Vocabulaire : Associez les débuts et les fins de phrases. (/5)",
        vi: "Nối đầu câu với cuối câu phù hợp (thứ tự khi đi ăn nhà hàng).",
        type: "match",
        pairs: [
          { l: "Je voudrais payer,", r: "je demande l'addition." },
          { l: "Je voudrais de l'eau,", r: "je demande une carafe d'eau." },
          { l: "Je finis le plat principal et", r: "je commande un dessert." },
          { l: "Pour choisir mes plats,", r: "je regarde la carte." },
          { l: "Je mange mon steak-frites", r: "avec un couteau et une fourchette." },
        ],
      },
      {
        // Page 40 — DELF A1, CO. Le corrigé imprimé donne un indice entre
        // parenthèses pour les questions 2 et 4 seulement.
        num: 11, page: 40, audioSrc: piste(38),
        instruction: "DELF A1 — Compréhension de l'oral (4 points). Vous écoutez un message sur votre répondeur téléphonique.",
        vi: "Nghe tin nhắn thoại và trả lời câu hỏi trắc nghiệm (nơi đến, ngày hẹn, giờ đến, cần mang theo gì).",
        type: "fill",
        items: [
          { q: "Question 1", answer: "B." },
          { q: "Question 2 (indice : mercredi)", answer: "C." },
          { q: "Question 3", answer: "B." },
          { q: "Question 4 (indice : à 13 h)", answer: "A." },
        ],
      },
      {
        // Page 40-41 — DELF A1, CE. ⚠️ Note : le texte de l'option C de la
        // question 4 est tronqué dans le corrigé imprimé (« C. Acheter d… ») ;
        // reconstitué en « Acheter des fruits et légumes » d'après l'annonce
        // « Marché au bureau » (voir cahier_unite_3.md).
        num: 12, page: 40,
        instruction: "DELF A1 — Compréhension des écrits (6 points). Vous travaillez au Canada et lisez des annonces sur le panneau d'affichage du bureau.",
        vi: "Đọc các thông báo trên bảng tin công ty và trả lời câu hỏi — câu 4 có đáp án C bị cắt chữ trong bản gốc, đã được suy luận lại.",
        type: "fill",
        items: [
          { q: "1. (indice : Cuisiner en groupe)", answer: "B." },
          { q: "2. (indice : 19h30)", answer: "B." },
          { q: "3. (indice : Au déjeuner)", answer: "A." },
          { q: "4. Que pouvez-vous faire une fois par mois ? (⚠️ option C reconstituée : Acheter des fruits et légumes)", answer: "C." },
          { q: "5. (indice : à 15h)", answer: "C." },
        ],
      },
      {
        num: 13, page: 41,
        instruction: "DELF A1 — Production orale. Partie 3 de l'épreuve : jeu de rôle « Au restaurant » (vous êtes en vacances en France, vous allez au restaurant avec vos amis, vous posez des questions sur les plats et les prix, vous choisissez et vous payez).",
        vi: "Đóng vai đối thoại tại nhà hàng — gọi món, hỏi giá và thanh toán.",
        type: "fill",
        items: [
          { q: "Exemple de dialogue complet (modèle du corrigé) :", answer: "Vous : Bonjour monsieur ! Vous avez de la place pour trois personnes, s'il vous plaît ? Merci beaucoup. Quel est le plat du jour ? Ah, non merci, je suis végétarienne. Est-ce que vous avez des plats sans viande et sans poisson ? D'accord, je vais prendre le croque-monsieur, s'il vous plaît. Combien ça coûte ? Je vais prendre la formule plat et dessert, s'il vous plaît. Est-ce que je peux payer par carte bancaire ? Je voudrais bien 3 boules de glace, s'il vous plait : fraise, vanille et chocolat. Je vais prendre de l'eau, s'il vous plaît. Merci !" },
        ],
      },
      {
        // Page 42 — Jeux, activité 1. ⚠️ Note : la grille de mots croisés
        // repose sur des images (8 mots) ; seul le mot n°1 (poisson) est
        // lisible dans le texte extrait du corrigé (voir cahier_unite_3.md).
        num: 14, page: 42,
        instruction: "Jeux — Regardez les images et complétez la grille avec les noms d'aliments (mots croisés).",
        vi: "Nhìn hình và điền tên thực phẩm vào ô chữ — chỉ 1/8 từ được ghi rõ trong đáp án in.",
        type: "fill",
        items: [
          { q: "1.", answer: "poisson" },
        ],
      },
      {
        num: 15, page: 42,
        instruction: "Jeux — Associez les sujets et les verbes (plusieurs possibilités).",
        vi: "Nối chủ ngữ với động từ chia đúng (có nhiều khả năng).",
        type: "fill",
        items: [
          { q: "Les combinaisons possibles du corrigé :", answer: "ils/elles choisissent, ils/elles vont, nous allons, vous mangez, je/il/elle/on paie, je vais, il/elle/on choisit, il/elle/on va, tu manges" },
        ],
      },
      {
        num: 16, page: 42,
        instruction: "Jeux — Complétez les noms (commerçant(e)s, commerces, vaisselle, plats).",
        vi: "Hoàn thành các từ vựng còn thiếu (nghề bán hàng, cửa hàng, dụng cụ ăn uống, món ăn).",
        type: "fill",
        items: [
          { q: "Commerçant(e) a.", answer: "poissonnière" },
          { q: "Commerçant(e) b.", answer: "boulanger" },
          { q: "Commerce a.", answer: "boucherie" },
          { q: "Commerce b.", answer: "fromagerie" },
          { q: "Vaisselle a.", answer: "fourchette" },
          { q: "Vaisselle b.", answer: "assiette" },
          { q: "Plat a.", answer: "omelette" },
          { q: "Plat b.", answer: "quiche" },
        ],
      },
    ],
  },

  u4: {

    // ── Grammaire, keyed by grammar point index in editoGrammar.js's "g4" ──
    // g4 has 4 points, and all 4 have a matching cahier Grammaire page —
    // no skips this unit.
    grammar: {

      // p0 — C'est / Il-Elle est (cahier p. 43)
      p0: [
        {
          num: 1, page: 43,
          instruction: "Soulignez la bonne réponse.",
          vi: "Chọn \"c'est/ce sont\" (giới thiệu, kèm danh từ) hoặc \"il/elle est\" (mô tả trực tiếp).",
          type: "choice",
          items: [
            { q: "Il est / C'est un touriste.", options: ["Il est", "C'est"], answer: "C'est" },
            { q: "Il est / C'est allemand.", options: ["Il est", "C'est"], answer: "Il est" },
            { q: "Elle est / C'est la ville de Toulouse sur la photo ?", options: ["Elle est", "C'est"], answer: "C'est" },
            { q: "Rouen ? C'est / Elle est une ville française.", options: ["C'est", "Elle est"], answer: "C'est" },
            { q: "Ce sont / C'est des artistes internationaux.", options: ["Ce sont", "C'est"], answer: "Ce sont" },
          ],
        },
        {
          num: 2, page: 43,
          instruction: "Complétez les phrases avec c'est ou il/elle est.",
          vi: "Điền \"c'est\" hoặc \"il/elle est\" phù hợp với ngữ cảnh.",
          type: "fill",
          items: [
            { q: "……………….. la rue Victor-Hugo.", answer: "C'est" },
            { q: "L'artiste s'appelle Snek et ……………….. grenoblois.", answer: "il est" },
            { q: "« Street Art Fest Grenoble – Alpes », ……………….. un festival international.", answer: "c'est" },
            { q: "Toulouse, ……………….. la ville rose.", answer: "c'est" },
            { q: "Ici, ……………….. l'école du quartier.", answer: "c'est" },
          ],
        },
        {
          num: 3, page: 43,
          instruction: "Associez pour former une phrase.",
          vi: "Nối phần đầu câu với phần cuối câu phù hợp.",
          type: "match",
          pairs: [
            { l: "C'est", r: "une visite d'une heure." },
            { l: "Ce sont", r: "des artistes parisiens." },
            { l: "Il est", r: "dynamique le centre-ville ?" },
            { l: "Elle est", r: "grande, la place de la République ?" },
          ],
        },
        {
          num: 4, page: 43, audioSrc: piste(39),
          instruction: "Écoutez et complétez les phrases avec c'est ou ce sont, il/elle est.",
          vi: "Nghe hội thoại về khu phố của Pedro và điền \"c'est/ce sont/il est/elle est\" đúng.",
          type: "fill",
          items: [
            { q: "Pedro : Voilà, ici, ……………….. mon quartier.", answer: "c'est" },
            { q: "Andréa : ……………….. sympa ?", answer: "c'est" },
            { q: "Pedro : Oui, ……………….. très agréable et il y a beaucoup de monuments historiques !", answer: "il est" },
            { q: "Andréa : Ah oui, ……………….. beau le bâtiment ici, qu'est-ce que c'est ?", answer: "il est" },
            { q: "Pedro : ……………….. la mairie !", answer: "c'est" },
            { q: "Pedro : Et là, à côté, ……………….. les jardins de Sainte-Cécile !", answer: "ce sont" },
            { q: "Andréa : C'est ta rue ? ……………….. belle !", answer: "Elle est" },
          ],
        },
      ],

      // p1 — L'impératif (cahier p. 46)
      p1: [
        {
          num: 1, page: 46,
          instruction: "Lisez et classez les phrases dans le tableau (présent de l'indicatif ou impératif).",
          vi: "Xếp câu vào bảng theo thì hiện tại chỉ định hay thức mệnh lệnh.",
          type: "choice",
          items: [
            { q: "a. Tu prends le bus ?", options: ["présent", "impératif"], answer: "présent", example: true },
            { q: "b. Allez tout droit.", options: ["présent", "impératif"], answer: "impératif" },
            { q: "c. Nous n'avons pas de ticket.", options: ["présent", "impératif"], answer: "présent" },
            { q: "d. Regarde le bâtiment ici !", options: ["présent", "impératif"], answer: "impératif" },
            { q: "e. Vous montez dans le tram.", options: ["présent", "impératif"], answer: "présent" },
          ],
        },
        {
          num: 2, page: 46,
          instruction: "Conjuguez les verbes à l'impératif.",
          vi: "Chia động từ ở thức mệnh lệnh theo chủ ngữ tu/nous/vous.",
          type: "fill",
          items: [
            { q: "Tu – prendre", answer: "Prends." },
            { q: "Nous – traverser", answer: "Traversons." },
            { q: "Vous – être", answer: "Soyez." },
            { q: "Tu – aller", answer: "Va." },
            { q: "Nous – avoir", answer: "Ayons." },
            { q: "Vous – acheter", answer: "Achetez." },
          ],
        },
        {
          num: 3, page: 46,
          instruction: "Transformez les phrases à l'impératif (Exemple : Vous tournez à droite. → Tournez à droite.).",
          vi: "Chuyển câu từ thì hiện tại sang thức mệnh lệnh.",
          type: "fill",
          items: [
            { q: "Tu fais attention dans la rue, s'il te plaît.", answer: "Fais attention dans la rue, s'il te plaît !" },
            { q: "Nous prenons le bus aujourd'hui.", answer: "Prenons le bus aujourd'hui." },
            { q: "Vous allez à pied à la gare.", answer: "Allez à pied à la gare." },
            { q: "Tu es calme en voiture.", answer: "Sois calme en voiture." },
            { q: "Nous regardons le plan sur le téléphone.", answer: "Regardons le plan sur le téléphone." },
            { q: "Vous cherchez l'itinéraire sur Internet.", answer: "Cherchez l'itinéraire sur Internet." },
          ],
        },
        {
          num: 4, page: 46, audioSrc: piste(43),
          instruction: "Écoutez et complétez les dialogues.",
          vi: "Nghe và điền động từ mệnh lệnh vào đoạn hội thoại chỉ đường.",
          type: "fill",
          items: [
            { q: "– C'est simple ! ……………….. tout droit et ……………….. la première à droite. (2 từ)", answer: "Allez prenez" },
            { q: "– Non, ce n'est pas loin, ………………..!", answer: "marchons" },
            { q: "– Oui, c'est un peu loin. …………….., il y a l'arrêt de tram B, …………….. dans le tram et …………….. à la gare. (3 từ)", answer: "Regarde monte descends" },
          ],
        },
        {
          num: 5, page: 46,
          instruction: "Complétez avec la forme correcte du verbe prendre au présent.",
          vi: "Chia động từ \"prendre\" ở thì hiện tại.",
          type: "fill",
          items: [
            { q: "Mathieu et Adeline ……………………………… le tram.", answer: "prennent" },
            { q: "Mes parents et moi, nous ……………………………… le train dimanche !", answer: "prenons" },
            { q: "Je ne ……………………………… pas le métro aujourd'hui.", answer: "prends" },
            { q: "Vous ……………………………… la voiture.", answer: "prenez" },
            { q: "Romain, il ne ……………………………… pas souvent le bus.", answer: "prend" },
          ],
        },
      ],

      // p2 — Les connecteurs : pour, parce que, mais, avec, sans (cahier p. 47)
      p2: [
        {
          num: 1, page: 47,
          instruction: "Soulignez la bonne réponse.",
          vi: "Chọn liên từ đúng (pour/parce que/mais/avec/sans).",
          type: "choice",
          items: [
            { q: "Pour aller loin, la voiture c'est pratique mais / parce que ce n'est pas écologique.", options: ["mais", "parce que"], answer: "mais" },
            { q: "On préfère le centre-ville parce que / sans voitures.", options: ["parce que", "sans"], answer: "sans" },
            { q: "Avec / sans ma femme, on prend le bus le matin.", options: ["Avec", "sans"], answer: "Avec" },
            { q: "Pour / Parce qu' aller à l'école, nous ne prenons pas la trottinette.", options: ["Pour", "Parce qu'"], answer: "Pour" },
            { q: "Je ne vais pas à pied à l'université pour / parce que c'est loin.", options: ["pour", "parce que"], answer: "parce que" },
          ],
        },
        {
          num: 2, page: 47, audioSrc: piste(44),
          instruction: "Écoutez et complétez avec pour, parce que/parce qu', mais, avec.",
          vi: "Nghe và điền liên từ đúng.",
          type: "fill",
          items: [
            { q: "Je vais chez mes grands-parents en train ……………….. mes cousins.", answer: "avec" },
            { q: "Je n'achète pas de ticket ……………….. j'ai ma carte.", answer: "parce que" },
            { q: "……………….. aller chez toi, je prends le tram ?", answer: "Pour" },
            { q: "Je n'aime pas ton itinéraire ……………….. il est long !", answer: "parce qu'" },
            { q: "Il y a beaucoup de pollution dans cette ville ……………….. elle est magnifique.", answer: "mais" },
          ],
        },
        {
          num: 3, page: 47,
          instruction: "Associez pour former des phrases.",
          vi: "Nối phần đầu và phần cuối câu bằng liên từ phù hợp.",
          type: "match",
          pairs: [
            { l: "Aller à la montagne sans", r: "voiture, c'est compliqué." },
            { l: "On fait souvent du covoiturage avec", r: "mes amis." },
            { l: "Prends le vélo pour", r: "aller au centre-ville." },
            { l: "Je préfère prendre le train parce que", r: "je prends souvent le bus." },
            { l: "J'ai une voiture mais", r: "c'est écologique." },
            { l: "Comment se déplacer sans", r: "polluer ?" },
          ],
        },
        {
          num: 4, page: 47,
          instruction: "Complétez avec pour, parce que/parce qu', avec, sans.",
          vi: "Điền liên từ vào các đoạn hội thoại về phương tiện di chuyển.",
          type: "fill",
          items: [
            { q: "– Oui, c'est très facile ……………….. il y a le tram, le bus et le métro.", answer: "parce qu'" },
            { q: "– Oui, moi aussi, c'est super de parler ……………….. des gens différents.", answer: "avec" },
            { q: "– Dans la ville, je marche à pied mais ……………….. aller au travail, je prends mon vélo.", answer: "pour" },
            { q: "– Oui, je prends le tram pour aller à l'université ……………….. je prends ma voiture pour faire mes courses.", answer: "mais" },
            { q: "– Oui, j'aime beaucoup ma trottinette ……………….. c'est pratique et écologique.", answer: "parce que" },
            { q: "– Oui, je vais souvent à la montagne et ce n'est pas pratique ……………….. voiture.", answer: "sans" },
          ],
        },
      ],

      // p3 — La fréquence (1) : toujours, souvent, jamais (cahier p. 44)
      p3: [
        {
          num: 1, page: 44,
          instruction: "Soulignez la bonne réponse.",
          vi: "Chọn trạng từ tần suất đúng (toujours/souvent/jamais) theo ngữ cảnh.",
          type: "choice",
          items: [
            { q: "Lundi, mardi et mercredi, Jonathan va à la bibliothèque. Il va toujours / souvent à la bibliothèque.", options: ["toujours", "souvent"], answer: "toujours" },
            { q: "Annabelle marche beaucoup le samedi et le dimanche. Elle marche jamais / souvent le week-end.", options: ["jamais", "souvent"], answer: "souvent" },
            { q: "À Paris, il y a toujours / jamais beaucoup de touristes.", options: ["toujours", "jamais"], answer: "toujours" },
            { q: "On ne va toujours / jamais au musée le mardi. Les musées ferment le mardi dans mon pays.", options: ["toujours", "jamais"], answer: "jamais" },
            { q: "José est professeur d'histoire. Il visite souvent / jamais des monuments historiques.", options: ["souvent", "jamais"], answer: "souvent" },
          ],
        },
        {
          num: 2, page: 44, audioSrc: piste(40),
          instruction: "Écoutez et cochez la bonne réponse.",
          vi: "Nghe và đánh dấu tần suất đúng (souvent/toujours/jamais) cho mỗi hoạt động.",
          type: "choice",
          items: [
            { q: "Il va au théâtre.", options: ["souvent", "toujours", "jamais"], answer: "jamais" },
            { q: "Il fait les courses au centre-ville.", options: ["souvent", "toujours", "jamais"], answer: "souvent" },
            { q: "Il va à la bibliothèque.", options: ["souvent", "toujours", "jamais"], answer: "toujours" },
            { q: "Il va au cinéma en semaine.", options: ["souvent", "toujours", "jamais"], answer: "jamais" },
            { q: "Il marche le dimanche.", options: ["souvent", "toujours", "jamais"], answer: "souvent" },
          ],
        },
        {
          num: 3, page: 44,
          instruction: "Lisez les descriptions de Linda et Isabelle et cochez vrai ou faux.",
          vi: "Đọc đoạn văn mô tả sở thích của Linda và Isabelle rồi xác định đúng/sai.",
          type: "truefalse",
          items: [
            { q: "Linda marche souvent dans la nature.", answer: true },
            { q: "Linda ne va jamais à la montagne le week-end.", answer: false },
            { q: "Linda va toujours au musée le dimanche.", answer: false },
            { q: "Isabelle visite souvent des villes.", answer: true },
            { q: "Isabelle ne visite jamais d'églises.", answer: false },
            { q: "Isabelle va toujours marcher dans la nature le week-end.", answer: false },
          ],
        },
        {
          num: 4, page: 44,
          instruction: "Transformez les phrases avec les mots proposés (Exemple : Jacques marche toujours le dimanche.).",
          vi: "Viết lại câu, thêm trạng từ tần suất đã cho.",
          type: "fill",
          items: [
            { q: "Le théâtre propose un programme intéressant. (souvent)", answer: "Le théâtre propose souvent un programme intéressant." },
            { q: "Ma mère va à la bibliothèque le samedi. (jamais)", answer: "Ma mère ne va jamais à la bibliothèque le samedi." },
            { q: "Je prends le pont Saint-Laurent. (toujours)", answer: "Je prends toujours le pont Saint-Laurent." },
            { q: "Avec ma classe, on va au musée. (souvent)", answer: "Avec ma classe, on va souvent au musée." },
            { q: "Nous allons au théâtre. (jamais)", answer: "Nous n'allons jamais au théâtre." },
          ],
        },
      ],
    },

    // ── Vocabulaire (cahier p. 45 "La ville" + p. 48 "Les transports et ──
    // les nombres (3)"). Custom STEP_GROUPS_U4: v1_vocab (u4g1-u4g4, "Đường
    // phố · khu phố · địa danh · con người"), v2_vocab (u4g10, "La
    // fréquence (1)"), v3_vocab (u4g5-u4g9, "Phương tiện · chỉ đường · số
    // đếm lớn"). v2_vocab (u4g10, frequency adverbs) has NO dedicated cahier
    // Vocabulaire page — "la fréquence" is only drilled on the Grammaire
    // page p.44 (folded into grammar p3 above) — so v2_vocab is
    // intentionally left without cahier exercises here.
    vocab: {
      v1_vocab: [
        {
          num: 1, page: 45,
          instruction: "Observez les images et soulignez la bonne réponse.",
          vi: "Nhìn hình và chọn từ đúng về địa điểm trong thành phố.",
          type: "choice",
          items: [
            { q: "Il est à la gare / banque.", options: ["gare", "banque"], answer: "gare" },
            { q: "Son appartement n'est pas loin du fleuve / boulevard.", options: ["fleuve", "boulevard"], answer: "fleuve" },
            { q: "Ils sont au théâtre / musée.", options: ["théâtre", "musée"], answer: "théâtre" },
            { q: "Ils habitent en ville / banlieue.", options: ["ville", "banlieue"], answer: "banlieue" },
            { q: "Ils marchent sur le quai / pont.", options: ["quai", "pont"], answer: "quai" },
            { q: "Il habite place / avenue de la Liberté.", options: ["place", "avenue"], answer: "avenue" },
          ],
        },
        {
          num: 2, page: 45,
          instruction: "Complétez les phrases avec les mots proposés.",
          vi: "Điền từ vựng chỉ địa điểm công cộng vào chỗ trống.",
          type: "fill",
          bank: ["théâtre", "bibliothèque", "musée", "parcs", "école", "jardins", "gare"],
          items: [
            { q: "Je prends le train à la ……………………………… de Nice.", answer: "gare" },
            { q: "On va à la ……………………………… ? Je voudrais lire le livre de Gaël Faye !", answer: "bibliothèque" },
            { q: "Mon mari est acteur, il travaille au ……………………………… du centre-ville.", answer: "théâtre" },
            { q: "J'adore marcher dans des ……………………………… et des ……………………………… en ville. (2 từ)", answer: "parcs jardins" },
            { q: "Comment ça va à l'……………………………… , les enfants ?", answer: "école" },
            { q: "L'exposition au ……………………………… d'art moderne est intéressante ?", answer: "musée" },
          ],
        },
        {
          num: 3, page: 45, audioSrc: piste(41),
          instruction: "Écoutez et associez les phrases aux images.",
          vi: "Nghe và nối câu với hình ảnh tương ứng.",
          type: "match",
          pairs: [
            { l: "Phrase 1", r: "image 3" },
            { l: "Phrase 2", r: "image 2" },
            { l: "Phrase 3", r: "image 1" },
            { l: "Phrase 4", r: "image 5" },
            { l: "Phrase 5", r: "image 4" },
          ],
        },
      ],

      v3_vocab: [
        {
          num: 1, page: 48,
          instruction: "Regardez l'image et complétez la légende avec des mots de la liste (il y a deux intrus : en métro, en train).",
          vi: "Nhìn hình và điền phương tiện di chuyển đúng (có 2 từ dư trong danh sách: en métro, en train).",
          type: "fill",
          bank: ["à pied", "à trottinette", "à vélo", "en bus", "en métro", "en train", "en voiture"],
          items: [
            { q: "a.", answer: "en trottinette" },
            { q: "b.", answer: "à pied" },
            { q: "c.", answer: "en vélo" },
            { q: "d.", answer: "en bus" },
            { q: "e.", answer: "en voiture" },
          ],
        },
        {
          // ⚠️ Note (cahier_unite_4.md) : la fin de l'énoncé « f » du corrigé
          // imprimé (« deux millions deux cent vingt-deux ») ne correspond pas
          // littéralement à 2 222 — probable coquille du manuel, reproduite
          // telle quelle.
          num: 2, page: 48,
          instruction: "Associez le nombre en chiffres à son écriture en lettres.",
          vi: "Nối số viết bằng chữ số với cách đọc bằng chữ — phần f có khả năng là lỗi in trong sách gốc (⚠️ voir note).",
          type: "match",
          pairs: [
            { l: "2 222 000", r: "deux millions deux cent vingt-deux mille" },
            { l: "2 000 222 000", r: "deux milliards deux cent vingt-deux millions" },
            { l: "2 000 222", r: "deux mille deux cent vingt-deux" },
            { l: "2 222 000 000", r: "deux milliards deux cents vingt-deux mille" },
            { l: "222", r: "deux cent vingt-deux" },
            { l: "2 222", r: "deux millions deux cent vingt-deux" },
          ],
        },
        {
          num: 3, page: 48, audioSrc: piste(45),
          instruction: "Écoutez et complétez avec les mots et les nombres.",
          vi: "Nghe và điền từ + số vào chỗ trống.",
          type: "fill",
          items: [
            { q: "……………………………… personnes utilisent les transports en commun dans notre ville.", answer: "1 300 420" },
            { q: "Tu regardes souvent ton ……………………………… sur internet ?", answer: "itinéraire" },
            { q: "À Bordeaux, il y a ……………………………… habitants.", answer: "256 045" },
            { q: "Votre ……………………………… s'il vous plaît.", answer: "ticket" },
            { q: "Faites du ………………………………, c'est pratique et écologique !", answer: "covoiturage" },
          ],
        },
      ],
    },

    // ── Phonie-graphie (cahier p. 45 [ɛ̃]/[ɑ̃] + p. 48 [ɑ̃]/[ɔ̃]) ──
    phono: [
      {
        num: 1, page: 45, audioSrc: piste(42),
        instruction: "Phonie-graphie : les voyelles nasales [ɛ̃] et [ɑ̃]. Écoutez les phrases et indiquez combien de fois vous entendez [ɛ̃] et [ɑ̃] (format : ɛ̃/ɑ̃). Puis répétez.",
        vi: "Nghe và đếm số lần xuất hiện nguyên âm mũi [ɛ̃] và [ɑ̃] trong câu (định dạng ɛ̃/ɑ̃), sau đó lặp lại.",
        type: "fill",
        items: [
          { q: "a. J'habite dans un quartier sympa.", answer: "2/1", example: true },
          { q: "b. Martin va souvent dans les magasins.", answer: "2/2" },
          { q: "c. Le dimanche, les habitants marchent dans les jardins du centre-ville.", answer: "1/4" },
          { q: "d. En France, de juin à septembre, c'est l'été !", answer: "1/3" },
          { q: "e. Tous les matins, je prends les transports en commun.", answer: "2/2" },
        ],
      },
      {
        num: 2, page: 48, audioSrc: piste(46),
        instruction: "Phonie-graphie : les voyelles nasales [ɑ̃] et [ɔ̃]. Écoutez les phrases et indiquez combien de fois vous entendez [ɑ̃] et [ɔ̃] (format : ɑ̃/ɔ̃). Puis répétez.",
        vi: "Nghe và đếm số lần xuất hiện nguyên âm mũi [ɑ̃] và [ɔ̃] trong câu (định dạng ɑ̃/ɔ̃), sau đó lặp lại.",
        type: "fill",
        items: [
          { q: "a. Nous prenons souvent les transports.", answer: "2/1", example: true },
          { q: "b. Pendant les vacances nous allons en Espagne en avion.", answer: "5/2" },
          { q: "c. Avec la carte de transport, les étudiants vont à l'université à Lyon.", answer: "2/2" },
          { q: "d. Au Luxembourg, les transports en commun sont gratuits.", answer: "3/1" },
          { q: "e. Nous utilisons des applications pour visiter la France.", answer: "1/2" },
        ],
      },
    ],

    // ── Bilan (cahier p. 49 CE+PO, p. 50-51 Bilan linguistique /40, ──
    // p. 52-53 DELF A1, p. 54 Jeux). The "Production orale — Jeu de rôle"
    // (p.49) and Jeux activité 1 ("Dites le début d'un mot…") are free
    // answer ("Réponses libres") and intentionally excluded.
    bilan: [
      {
        num: 1, page: 49,
        instruction: "Compréhension écrite — « J'attends votre visite ! » Lisez le post de Lena et répondez : vrai ou faux ?",
        vi: "Đọc bài đăng của Lena về thành phố Rennes và xác định đúng/sai (câu 1a-1c).",
        type: "truefalse",
        items: [
          { q: "1a. Lena habite à Rennes.", answer: true },
          { q: "1b. Lena n'aime pas son quartier.", answer: false },
          { q: "1c. À Rennes, il y a beaucoup de monuments.", answer: true },
        ],
      },
      {
        num: 2, page: 49,
        instruction: "Compréhension écrite — « J'attends votre visite ! » Répondez aux questions (choix).",
        vi: "Đọc bài đăng của Lena và chọn đáp án đúng (câu 2a-2c).",
        type: "choice",
        items: [
          { q: "2a. Lena…", options: ["habite loin de la place de la Mairie", "n'habite pas loin de la place de la Mairie", "habite place de la Mairie"], answer: "n'habite pas loin de la place de la Mairie" },
          { q: "2b. Le week-end, Lena…", options: ["prend souvent le vélo pour aller dans la nature", "ne prend jamais le vélo pour aller dans la nature", "prend toujours le train pour visiter une ville"], answer: "prend souvent le vélo pour aller dans la nature" },
          { q: "2c. Pour aller à Rennes, Lena propose de…", options: ["prendre la voiture", "prendre le train", "prendre le bus"], answer: "prendre le train" },
        ],
      },
      {
        num: 3, page: 49,
        instruction: "Compréhension écrite — De la gare, on peut aller chez Lena… (2 réponses)",
        vi: "Đọc bài đăng của Lena và tìm 2 cách đi từ ga đến nhà Lena.",
        type: "fill",
        items: [
          { q: "2d. De la gare, on peut aller chez Lena…", answer: "à pied ; en métro" },
        ],
      },
      {
        num: 4, page: 50,
        instruction: "Bilan linguistique — Grammaire : Complétez avec c'est, ce sont, il/elle est. (/5)",
        vi: "Điền \"c'est/ce sont/il est/elle est\" đúng.",
        type: "fill",
        items: [
          { q: "Il s'appelle Banksy. ……………….. un artiste de street art.", answer: "C'est" },
          { q: "Voici la mairie de Paris. ……………….. grande !", answer: "Elle est" },
          { q: "Québec et Montréal, ……………….. des villes sympas.", answer: "ce sont" },
          { q: "J'adore le musée d'Arts de Nantes. ……………….. très intéressant.", answer: "Il est" },
          { q: "Mon quartier, ……………….. le quartier Saint-Jean.", answer: "c'est" },
        ],
      },
      {
        num: 5, page: 50,
        instruction: "Bilan linguistique — Grammaire : Mettez les éléments de la phrase dans l'ordre. (/5)",
        vi: "Sắp xếp các phần câu theo đúng thứ tự.",
        type: "fill",
        items: [
          { q: "à la bibliothèque ? / Tu ne vas / jamais /", answer: "Tu ne vas jamais à la bibliothèque ?" },
          { q: "pour aller / Je prends / à l'école / toujours / le bus", answer: "Je prends toujours le bus pour aller à l'école." },
          { q: "souvent / Avec mes parents, / au musée. / on va", answer: "Avec mes parents, on va souvent au musée." },
          { q: "souvent / des visites guidées / L'Office du tourisme / organise", answer: "L'Office du tourisme organise souvent des visites guidées." },
          { q: "Vous n'allez / au théâtre ? / jamais", answer: "Vous n'allez jamais au théâtre ?" },
        ],
      },
      {
        num: 6, page: 50,
        instruction: "Bilan linguistique — Grammaire : Transformez les phrases à l'impératif. (/5)",
        vi: "Chuyển câu sang thức mệnh lệnh.",
        type: "fill",
        items: [
          { q: "Tu vas à l'école à pied.", answer: "Va à l'école à pied." },
          { q: "Nous montons dans le bus.", answer: "Montons dans le bus." },
          { q: "Vous êtes sympas.", answer: "Soyez sympas." },
          { q: "Tu as du courage.", answer: "Aie du courage." },
          { q: "Tu ne regardes pas sur internet.", answer: "Ne regarde pas sur Internet." },
        ],
      },
      {
        num: 7, page: 50,
        instruction: "Bilan linguistique — Grammaire : Complétez les phrases avec pour, mais, sans, avec, parce qu'. (/5)",
        vi: "Điền liên từ đúng.",
        type: "fill",
        items: [
          { q: "Attendez, je prends le tram ……………….. vous !", answer: "avec" },
          { q: "……………….. voiture, c'est difficile d'aller à mon travail.", answer: "Sans" },
          { q: "Quels transports vous utilisez ……………….. aller chez vous ?", answer: "pour" },
          { q: "Je préfère habiter en ville ……………….. il y a beaucoup de choses à faire.", answer: "parce qu'" },
          { q: "Mon appartement est au centre-ville ……………….. il est calme.", answer: "mais" },
        ],
      },
      {
        num: 8, page: 51,
        instruction: "Bilan linguistique — Vocabulaire : Complétez les phrases avec les noms de lieux de la ville. (/5)",
        vi: "Điền tên địa điểm trong thành phố.",
        type: "fill",
        items: [
          { q: "Je n'habite pas au centre-ville, j'habite en ……………….. .", answer: "banlieue" },
          { q: "On va au ……………….. ? Il y a une exposition de Picasso, elle est super !", answer: "musée" },
          { q: "Je vais chercher le livre de Murakami à la ……………….. .", answer: "bibliothèque" },
          { q: "Tu prends le train à la ……………….. de Grenoble ?", answer: "gare" },
          { q: "Les enfants vont à l'……………….. et les étudiants à l'université.", answer: "école" },
        ],
      },
      {
        num: 9, page: 51,
        instruction: "Bilan linguistique — Vocabulaire : Répondez par vrai ou faux. (/5)",
        vi: "Xác định đúng/sai.",
        type: "truefalse",
        items: [
          { q: "Le pont est un bâtiment.", answer: false },
          { q: "Le centre-ville est un quartier de la ville.", answer: true },
          { q: "Les policiers travaillent à la poste.", answer: false },
          { q: "On marche sur un fleuve.", answer: false },
          { q: "Il y a beaucoup de touristes à Paris.", answer: true },
        ],
      },
      {
        num: 10, page: 51,
        instruction: "Bilan linguistique — Vocabulaire : Complétez les phrases avec les mots proposés. (/5)",
        vi: "Điền từ vựng về giao thông.",
        type: "fill",
        bank: ["train", "arrêt", "à pied", "ticket", "covoiturage"],
        items: [
          { q: "Je prends le bus à l'……………………………… Gambetta.", answer: "arrêt" },
          { q: "Avant de monter dans le bus, achète un ……………………………… .", answer: "ticket" },
          { q: "Pour aller dans une autre ville, je prends le ……………………………… .", answer: "train" },
          { q: "En ………………………………, il y a plusieurs personnes dans la voiture.", answer: "covoiturage" },
          { q: "J'aime marcher, je vais souvent à mon école ……………………………… .", answer: "à pied" },
        ],
      },
      {
        num: 11, page: 51,
        instruction: "Bilan linguistique — Vocabulaire : Écrivez les nombres en chiffres. (/5)",
        vi: "Viết số bằng chữ số.",
        type: "fill",
        items: [
          { q: "trois cent quarante-cinq", answer: "345" },
          { q: "six mille trois cent vingt-neuf", answer: "6 329" },
          { q: "mille six cent soixante et un", answer: "1 661" },
          { q: "huit milliards", answer: "8 000 000 000" },
          { q: "un million sept cent mille", answer: "1 700 000" },
        ],
      },
      {
        num: 12, page: 52, audioSrc: piste(47),
        instruction: "DELF A1 — Compréhension de l'oral (4 points). Message à l'arrêt de tram (retard du tram B, alternative bus 2 ou 3).",
        vi: "Nghe thông báo trễ tàu điện tại trạm dừng và trả lời câu hỏi (một số câu có lựa chọn bằng hình ảnh).",
        type: "fill",
        items: [
          { q: "1. (indice : tram B)", answer: "B." },
          { q: "2. (indice : 1 heure)", answer: "A." },
          { q: "3. Quelle image correspond ?", answer: "image « prendre le bus »" },
          { q: "4. Quelle image correspond ?", answer: "image « à côté de la pharmacie »" },
        ],
      },
      {
        // Page 52-53 — DELF A1, CE. ⚠️ Note : la question 5 propose A. votre
        // diplôme / B. votre passeport / C. votre car[te], mais le texte de
        // l'annonce (« apportez votre carte ! ») pointe logiquement vers C,
        // pas B — le corrigé imprimé n'a pas pu être confirmé lettre par
        // lettre pour cette question (voir cahier_unite_4.md).
        num: 13, page: 52,
        instruction: "DELF A1 — Compréhension des écrits (6 points). Panneau de l'office du tourisme (exposition « Histoire de Grenoble »).",
        vi: "Đọc thông báo phòng du lịch về triển lãm và trả lời câu hỏi — câu 5 có nghi vấn giữa đáp án B/C in trong sách (⚠️ voir note).",
        type: "fill",
        items: [
          { q: "1. (indice : le mercredi)", answer: "C." },
          { q: "2. (indice : à 18h)", answer: "B." },
          { q: "3. (indice : téléphoner)", answer: "A." },
          { q: "4. Quel itinéraire correspond aux indications du panneau ?", answer: "traverser le pont, tout droit, première à gauche" },
          { q: "5. Vous devez apporter… (⚠️ corrigé imprimé : B ; texte de l'annonce suggère C, votre carte)", answer: "B." },
        ],
      },
      {
        num: 14, page: 53,
        instruction: "DELF A1 — Production écrite (15 points). Vous écrivez une lettre à votre ami(e) belge pour l'inviter à visiter votre ville (sorties à faire ensemble, 40 mots minimum).",
        vi: "Viết thư mời bạn người Bỉ đến thăm thành phố của mình.",
        type: "fill",
        items: [
          { q: "Exemple de production complet (modèle du corrigé) :", answer: "Salut Alexis, tu vas bien ? Maintenant, j'habite à Grenoble ! Je t'invite chez moi pendant les vacances d'hiver. Tu viens ? Nous allons visiter la ville, il y a un très beau musée. Nous pouvons faire des randonnées dans la montagne et du ski. À bientôt." },
        ],
      },
      {
        num: 15, page: 53,
        instruction: "DELF A1 — Production orale. Partie 3 de l'épreuve : jeu de rôle « À la gare » (réserver un billet de train, demander des renseignements, choisir et payer).",
        vi: "Đóng vai hội thoại tại ga tàu — hỏi thông tin, đặt vé và thanh toán.",
        type: "fill",
        items: [
          { q: "Exemple de dialogue complet (modèle du corrigé) :", answer: "Vous : Bonjour ! Je suis en vacances en France pour visiter le pays. Je suis à Paris, mais je veux aller dans le Sud. Non, je n'ai pas envie de me baigner. Toulouse, c'est loin de Paris ? Très bien, je veux partir demain. Combien coûte le trajet ? 137 euros ? C'est très cher ! Et combien coûte le trajet Paris-Lyon ? Je vais prendre un billet pour Lyon alors. Le matin, c'est possible ? C'est très bien, je vais réserver ce billet, s'il vous plaît. Je peux payer par carte ? Je vais payer en espèces alors. Merci, au revoir !" },
        ],
      },
      {
        num: 16, page: 54,
        instruction: "Jeux — Trouvez l'intrus.",
        vi: "Tìm từ không cùng nhóm trong mỗi hàng.",
        type: "fill",
        items: [
          { q: "cent – million – mille – école", answer: "école" },
          { q: "train – métro – mairie – bus", answer: "mairie" },
          { q: "rue – boulevard – fontaine – avenue", answer: "fontaine" },
          { q: "centre-ville – musée – théâtre – bibliothèque", answer: "centre-ville" },
          { q: "touriste – arrêt – ligne – station", answer: "touriste" },
        ],
      },
      {
        // Page 54 — Jeux, activité 3. ⚠️ Note : seuls 2 des 9 bâtiments
        // annoncés sont récupérables depuis le texte extrait de la grille
        // (voir cahier_unite_4.md).
        num: 17, page: 54,
        instruction: "Jeux — Trouvez dans la grille les noms de 9 bâtiments de la ville.",
        vi: "Tìm 9 tên công trình trong thành phố trong ô chữ — chỉ 2/9 từ được ghi rõ trong đáp án in.",
        type: "fill",
        items: [
          { q: "2 des 9 bâtiments identifiables dans le corrigé imprimé :", answer: "commissariat, théâtre" },
        ],
      },
      {
        num: 18, page: 54,
        instruction: "Jeux — Découpez les verbes à l'impératif.",
        vi: "Cắt/nhận diện các động từ ở thức mệnh lệnh trong chuỗi chữ liền nhau.",
        type: "fill",
        items: [
          { q: "9 verbes à l'impératif à retrouver :", answer: "Prends, allez, aie, va, regardons, tourne, sois, ayons, demande" },
        ],
      },
      {
        num: 19, page: 54,
        instruction: "Jeux — Regardez l'image et choisissez une destination : dites la distance en kilomètres, votre partenaire trouve la bonne ville.",
        vi: "Theo cặp, đọc khoảng cách (km) và đoán tên thành phố tương ứng trên bản đồ.",
        type: "fill",
        items: [
          { q: "9 915 km", answer: "Lima" },
          { q: "2 871 km", answer: "Moscou" },
          { q: "8 735 km", answer: "Las Vegas" },
          { q: "3 115 km", answer: "Tambov" },
          { q: "8 019 km", answer: "Vancouver" },
          { q: "17 313 km", answer: "Sydney" },
          { q: "8 559 km", answer: "Washington" },
          { q: "10 010 km", answer: "Hong-Kong" },
          { q: "8 771 km", answer: "Rio de Janeiro" },
          { q: "9 658 km", answer: "Shanghai" },
        ],
      },
    ],
  },

  u5: {

    // ── Grammaire, keyed by grammar point index in editoGrammar.js's "g5" ──
    // g5 has 5 points. p4 "Verbes — Vendre, Mettre, Venir" has no dedicated
    // cahier Grammaire page of its own — its only drill (conjugating mettre/
    // vendre/venir) is exercise 4 embedded in the "genre et nombre des
    // adjectifs" page (p.55), and is filed under p4 here by verb content,
    // not under p0 by page header — see cahier_unite_5.md.
    grammar: {

      // p0 — Le genre et le nombre des adjectifs (cahier p. 55)
      p0: [
        {
          // ⚠️ Note (cahier_unite_5.md) : le corrigé imprimé pour cet
          // exercice contient une contradiction interne entre l'exemple
          // annoncé (case "a" = masculin) et la répartition détaillée qui
          // suit (case "a" = féminin). Reproduit tel qu'imprimé dans le
          // corrigé détaillé : Féminin = a(exemple), c, d, f, h ;
          // Masculin = b, e, g.
          num: 1, page: 55, audioSrc: piste(48),
          instruction: "Écoutez et cochez le genre masculin ou féminin.",
          vi: "Nghe và đánh dấu giống đực/giống cái của tính từ nghe được — ⚠️ corrigé imprimé incohérent avec l'exemple annoncé, voir note dans cahier_unite_5.md.",
          type: "choice",
          items: [
            { q: "a.", options: ["masculin", "féminin"], answer: "féminin", example: true },
            { q: "b.", options: ["masculin", "féminin"], answer: "masculin" },
            { q: "c.", options: ["masculin", "féminin"], answer: "féminin" },
            { q: "d.", options: ["masculin", "féminin"], answer: "féminin" },
            { q: "e.", options: ["masculin", "féminin"], answer: "masculin" },
            { q: "f.", options: ["masculin", "féminin"], answer: "féminin" },
            { q: "g.", options: ["masculin", "féminin"], answer: "masculin" },
            { q: "h.", options: ["masculin", "féminin"], answer: "féminin" },
          ],
        },
        {
          // ⚠️ Note : l'énoncé imprimé de la phrase "d" contient une coquille
          // ("un beau / belle chemise" — "chemise" est féminin, donc devrait
          // être "une belle / beau chemise"), mais le corrigé donne
          // littéralement "d. belle" — reproduit tel quel.
          num: 2, page: 55,
          instruction: "Soulignez la bonne réponse.",
          vi: "Gạch chân tính từ đúng theo giống của danh từ — câu d có lỗi in ấn trong đề (⚠️ voir note).",
          type: "choice",
          items: [
            { q: "Tu portes une robe élégant / élégante.", options: ["élégant", "élégante"], answer: "élégante" },
            { q: "Vous vendez des chaussures noires / noirs.", options: ["noires", "noirs"], answer: "noires" },
            { q: "Je vends une veste bleu / bleue sur internet.", options: ["bleu", "bleue"], answer: "bleue" },
            { q: "Vous avez un beau / belle chemise.", options: ["beau", "belle"], answer: "belle" },
            { q: "Pierre vend son costume grise / gris.", options: ["grise", "gris"], answer: "gris" },
          ],
        },
        {
          num: 3, page: 55,
          instruction: "Accordez les adjectifs.",
          vi: "Chia tính từ trong ngoặc đúng giống/số theo danh từ.",
          type: "fill",
          items: [
            { q: "En été, elle porte des jupes (court) …………………… et des tee-shirts (simple) …………………… . (2 từ)", answer: "courtes simples" },
            { q: "Sur Vinted, Olivia vend des robes (long) ………………… et ses chaussures (gris) …………………… . (2 từ)", answer: "longues grises" },
            { q: "Tu prends tes vestes (élégant) …………………… ?", answer: "élégantes" },
            { q: "Elle porte des (beau) …………………… robes.", answer: "belles" },
            { q: "En hiver, je mets souvent des manteaux (gris) …………………… et des bottes (noir) …………………… . (2 từ)", answer: "gris noires" },
          ],
        },
      ],

      // p1 — Le futur proche (cahier p. 56)
      p1: [
        {
          num: 1, page: 56, audioSrc: piste(49),
          instruction: "Écoutez et cochez le présent ou le futur proche.",
          vi: "Nghe và đánh dấu thì hiện tại hay tương lai gần.",
          type: "choice",
          items: [
            { q: "a.", options: ["présent", "futur proche"], answer: "présent" },
            { q: "b.", options: ["présent", "futur proche"], answer: "futur proche" },
            { q: "c.", options: ["présent", "futur proche"], answer: "futur proche" },
            { q: "d.", options: ["présent", "futur proche"], answer: "présent" },
            { q: "e.", options: ["présent", "futur proche"], answer: "futur proche" },
            { q: "f.", options: ["présent", "futur proche"], answer: "présent" },
            { q: "g.", options: ["présent", "futur proche"], answer: "futur proche" },
            { q: "h.", options: ["présent", "futur proche"], answer: "présent" },
          ],
        },
        {
          num: 2, page: 56,
          instruction: "Transformez ces phrases au futur proche (Exemple : Il fait chaud aujourd'hui ! → Il va faire chaud aujourd'hui.).",
          vi: "Chuyển câu từ thì hiện tại sang tương lai gần (futur proche).",
          type: "fill",
          items: [
            { q: "Je porte une robe longue pour son mariage.", answer: "Je vais porter une robe longue pour son mariage." },
            { q: "Léa est élégante avec sa veste.", answer: "Léa va être élégante avec sa veste." },
            { q: "Ils achètent une tablette.", answer: "Ils vont acheter une tablette." },
            { q: "Malik met un costume gris et une chemise blanche.", answer: "Malik va mettre un costume gris et une chemise blanche." },
          ],
        },
        {
          num: 3, page: 56,
          instruction: "Qu'est-ce qu'ils vont faire ? Écrivez une phrase au futur proche (Exemple : acheter un téléphone / il / demain → Il va acheter un téléphone demain.).",
          vi: "Viết câu ở thì tương lai gần dựa vào các từ gợi ý.",
          type: "fill",
          items: [
            { q: "tricoter un pull / elle / cet hiver", answer: "Elle va tricoter un pull cet hiver." },
            { q: "créer des vêtements / tu / ce week-end", answer: "Tu vas créer des vêtements ce week-end." },
            { q: "vendre des vêtements / je / ce soir", answer: "Je vais vendre des vêtements ce soir." },
            { q: "acheter des chaussures / elle / samedi", answer: "Elle va acheter des chaussures samedi." },
            { q: "prendre des cours de couture / vous / en avril", answer: "Vous allez prendre des cours de couture en avril." },
          ],
        },
        {
          num: 4, page: 56,
          instruction: "Remettez les phrases dans l'ordre.",
          vi: "Sắp xếp lại từ để tạo câu ở thì tương lai gần.",
          type: "order",
          items: [
            { tokens: ["Ce", "matin,", "ils", "vont", "acheter", "des", "vêtements."],
              answer: ["Ce", "matin,", "ils", "vont", "acheter", "des", "vêtements."] },
            { tokens: ["Demain,", "Marine", "va", "offrir", "un", "pull", "à", "son", "mari."],
              answer: ["Demain,", "Marine", "va", "offrir", "un", "pull", "à", "son", "mari."] },
            { tokens: ["En", "été,", "vous", "allez", "porter", "des", "robes", "légères."],
              answer: ["En", "été,", "vous", "allez", "porter", "des", "robes", "légères."] },
            { tokens: ["Jeudi,", "je", "vais", "prendre", "des", "cours", "de", "couture."],
              answer: ["Jeudi,", "je", "vais", "prendre", "des", "cours", "de", "couture."] },
          ],
        },
      ],

      // p2 — La place des adjectifs (cahier p. 58)
      p2: [
        {
          num: 1, page: 58, audioSrc: piste(52),
          instruction: "Écoutez et soulignez la bonne réponse.",
          vi: "Nghe và xác định vị trí đúng của tính từ (trước hay sau danh từ).",
          type: "choice",
          items: [
            { q: "Maurice porte un (élégant) costume (élégant).", options: ["un élégant costume", "un costume élégant"], answer: "un costume élégant" },
            { q: "Élise met une (rouge) robe (rouge).", options: ["une rouge robe", "une robe rouge"], answer: "une robe rouge" },
            { q: "Les enfants portent un (blanc) chapeau (blanc).", options: ["un blanc chapeau", "un chapeau blanc"], answer: "un chapeau blanc" },
            { q: "Tu prends ton (bleu) sac à dos (bleu).", options: ["ton bleu sac à dos", "ton sac à dos bleu"], answer: "ton sac à dos bleu" },
            { q: "Je préfère les (grandes) valises (grandes).", options: ["les grandes valises", "les valises grandes"], answer: "les grandes valises" },
          ],
        },
        {
          num: 2, page: 58,
          instruction: "Écrivez l'adjectif au bon endroit : avant ou après le nom.",
          vi: "Đặt tính từ đúng vị trí (trước hoặc sau danh từ).",
          type: "fill",
          items: [
            { q: "Il vend des ………………………. baskets ………………………. (bleues)", answer: "des baskets bleues" },
            { q: "Ma sœur aime les ………………………. tenues ………………………. (élégantes)", answer: "les tenues élégantes" },
            { q: "Les ………………………. jupes ………………………. sont à la mode. (courtes)", answer: "les jupes courtes" },
            { q: "C'est une ………………………. robe ………………………. ! (jolie)", answer: "une jolie robe" },
            { q: "Vous avez un ………………………. appareil photo ………………………. . (bon)", answer: "un bon appareil photo" },
          ],
        },
        {
          num: 3, page: 58,
          instruction: "Écrivez les phrases avec les adjectifs (Exemple : Il achète un sac à dos. (grand) → Il achète un grand sac à dos.).",
          vi: "Viết lại câu, đặt tính từ vào đúng vị trí.",
          type: "fill",
          items: [
            { q: "Elena cherche une enceinte (petite).", answer: "Elena cherche une petite enceinte." },
            { q: "Vous avez une montre (connectée) !", answer: "Vous avez une montre connectée !" },
            { q: "C'est une idée (bonne) !", answer: "C'est une bonne idée !" },
            { q: "Pour son anniversaire, nous voulons un cadeau (beau).", answer: "Pour son anniversaire, nous voulons un beau cadeau." },
            { q: "Il achète un sac à dos (vert).", answer: "Il achète un sac à dos vert." },
          ],
        },
      ],

      // p3 — L'adjectif démonstratif : ce, cet, cette, ces (cahier p. 59)
      p3: [
        {
          num: 1, page: 59, audioSrc: piste(53),
          instruction: "Écoutez et indiquez si l'adjectif démonstratif est masculin, féminin ou pluriel.",
          vi: "Nghe và xác định tính từ chỉ định là giống đực, giống cái hay số nhiều.",
          type: "choice",
          items: [
            { q: "a.", options: ["masculin", "féminin", "pluriel"], answer: "masculin", example: true },
            { q: "b.", options: ["masculin", "féminin", "pluriel"], answer: "pluriel" },
            { q: "c.", options: ["masculin", "féminin", "pluriel"], answer: "féminin" },
            { q: "d.", options: ["masculin", "féminin", "pluriel"], answer: "pluriel" },
            { q: "e.", options: ["masculin", "féminin", "pluriel"], answer: "masculin" },
            { q: "f.", options: ["masculin", "féminin", "pluriel"], answer: "féminin" },
          ],
        },
        {
          num: 2, page: 59,
          instruction: "Soulignez la bonne réponse.",
          vi: "Gạch chân tính từ chỉ định đúng.",
          type: "choice",
          items: [
            { q: "Ce / cet / cette étui est rouge.", options: ["Ce", "cet", "cette"], answer: "cet" },
            { q: "Cette / ce / ces chapeau est joli.", options: ["Cette", "ce", "ces"], answer: "ce" },
            { q: "Cette / ce / cet valise est très lourde !", options: ["Cette", "ce", "cet"], answer: "Cette" },
            { q: "Ce / cet / ces lunettes sont à vendre.", options: ["Ce", "cet", "ces"], answer: "ces" },
            { q: "Ce / cet / cette / ces veste est grande.", options: ["Ce", "cet", "cette", "ces"], answer: "cette" },
          ],
        },
        {
          num: 3, page: 59,
          instruction: "Remplacez les articles par ce, cet, cette, ces (Exemple : Le téléphone est noir. → Ce téléphone est noir.).",
          vi: "Thay mạo từ bằng tính từ chỉ định phù hợp.",
          type: "fill",
          items: [
            { q: "La coque de téléphone est rectangulaire.", answer: "Cette coque de téléphone est rectangulaire." },
            { q: "Le sac à dos est lourd.", answer: "Ce sac à dos est lourd." },
            { q: "Les objets connectés sont chers.", answer: "Ces objets connectés sont chers." },
            { q: "L'étui est bleu.", answer: "Cet étui est bleu." },
            { q: "L'enceinte est petite.", answer: "Cette enceinte est petite." },
          ],
        },
        {
          num: 4, page: 59,
          instruction: "Complétez avec ce, cet, cette, ces.",
          vi: "Điền tính từ chỉ định đúng.",
          type: "fill",
          items: [
            { q: "Dany aime ………………………. valise bleue.", answer: "cette" },
            { q: "Vous voulez ………………………. batteries externes ?", answer: "ces" },
            { q: "Je préfère ………………………. ordinateur portable.", answer: "cet" },
            { q: "Tu prends ………………………. écouteurs.", answer: "ces" },
            { q: "Il va aimer ………………………. cadeau.", answer: "ce" },
          ],
        },
      ],

      // p4 — Verbes vendre, mettre, venir (see note above — no dedicated
      // cahier page; the only drill is p.55 ex.4, under the adjectifs page)
      p4: [
        {
          num: 4, page: 55,
          instruction: "Conjuguez les verbes au présent (mettre, vendre, venir).",
          vi: "Chia động từ \"mettre\", \"vendre\" và \"venir\" ở thì hiện tại.",
          type: "fill",
          items: [
            { q: "Ils (mettre) ……………………………… des lunettes de soleil en été.", answer: "mettent" },
            { q: "Qu'est-ce tu (vendre) ……………………………… sur Vinted ?", answer: "vends" },
            { q: "Je (venir) ……………………………… avec toi au cours de couture.", answer: "viens" },
            { q: "Nous (vendre) ……………………………… des vêtements de sport.", answer: "vendons" },
            { q: "Vous (mettre) ……………………………… une veste ou un gilet avec cette robe ?", answer: "mettez" },
          ],
        },
      ],
    },

    // ── Vocabulaire (cahier p. 57 "Les vêtements, les accessoires, la ──
    // météo" + p. 60 "Les objets technologiques, les objets du quotidien").
    // Custom STEP_GROUPS_U5: v1_vocab (u5g1/u5g3, "Les vêtements · les
    // couleurs"), v2_vocab (u5g5/u5g4, "La météo · les matières"), v3_vocab
    // (u5g2/u5g6/u5g7/u5g8, "Accessoires · objets techno · objets du
    // quotidien"). Page 57's exercise 3 (matching clothing to weather) was
    // filed under v2_vocab, matching its météo content, not under v1_vocab.
    vocab: {
      v1_vocab: [
        {
          num: 1, page: 57,
          instruction: "Complétez la description des vêtements à vendre (Exemple : Je vends une jupe bleue, courte, en coton.).",
          vi: "Mô tả các món đồ đăng bán (màu sắc, độ dài, chất liệu) theo mẫu.",
          type: "fill",
          items: [
            { q: "a. (robe / longue / noire / coton)", answer: "Je vends une robe longue, noire, en coton." },
            { q: "b. (manteau / gris / laine)", answer: "Je vends un manteau gris, en laine." },
            { q: "c. (bottes / marron / cuir)", answer: "Je vends des bottes marron, en cuir." },
            { q: "d. (gilet / rose / laine)", answer: "Je vends un gilet rose, en laine." },
            { q: "e. (pantalon / vert / coton)", answer: "Je vends un pantalon vert, en coton." },
          ],
        },
        {
          num: 2, page: 57, audioSrc: piste(50),
          instruction: "Écoutez les phrases et choisissez la bonne personne (Lucile, Sarah, Noé, Philippe).",
          vi: "Nghe mô tả trang phục và chọn đúng người trong hình (Lucile, Sarah, Noé, Philippe).",
          type: "fill",
          items: [
            { q: "Lucile", answer: "a." },
            { q: "Sarah", answer: "b." },
            { q: "Noé", answer: "c." },
            { q: "Philippe", answer: "d." },
          ],
        },
      ],

      v2_vocab: [
        {
          num: 3, page: 57,
          instruction: "Associez les vêtements et les accessoires à la météo (plusieurs réponses possibles).",
          vi: "Nối trang phục/phụ kiện với thời tiết phù hợp (có nhiều đáp án đúng).",
          type: "fill",
          items: [
            { q: "Il pleut → (2 vêtements/accessoires)", answer: "un imperméable, des bottes" },
            { q: "Il fait chaud → (2 vêtements/accessoires)", answer: "un tee-shirt, une robe" },
            { q: "Il neige → (2 vêtements/accessoires)", answer: "un chapeau, un pull" },
            { q: "Il fait beau → (1 accessoire)", answer: "des lunettes de soleil" },
          ],
        },
      ],

      v3_vocab: [
        {
          num: 1, page: 60,
          instruction: "Complétez le dialogue avec les mots proposés.",
          vi: "Điền từ vựng đồ vật vào đoạn hội thoại giữa người bán và khách hàng.",
          type: "fill",
          bank: ["en cuir", "légers", "mode", "pratiques", "porte-monnaie", "noirs", "écouteurs sans fils", "rectangulaire"],
          items: [
            { q: "1. (dans l'ordre du dialogue)", answer: "écouteurs sans fil" },
            { q: "2.", answer: "mode" },
            { q: "3.", answer: "légers" },
            { q: "4.", answer: "pratiques" },
            { q: "5.", answer: "noirs" },
            { q: "6.", answer: "en cuir" },
            { q: "7.", answer: "rectangulaire" },
          ],
        },
        {
          num: 2, page: 60,
          instruction: "Associez l'objet à sa fonction.",
          vi: "Nối tên đồ vật với công dụng của nó.",
          type: "match",
          pairs: [
            { l: "Un portefeuille", r: "mettre ses billets de banque, ses papiers d'identité." },
            { l: "Un porte-monnaie", r: "mettre ses pièces de 1€, 2€." },
            { l: "Une enceinte Bluetooth", r: "écouter seul ou avec ses amis de la musique." },
            { l: "Un sac à dos", r: "transporter ses documents, un vêtement, des stylos." },
            { l: "Une valise", r: "transporter ses vêtements, ses chaussures." },
            { l: "Une liseuse", r: "lire un livre et stocker beaucoup de livres." },
          ],
        },
        {
          // ⚠️ Note (cahier_unite_5.md) : le corrigé imprimé associe Manon à
          // "montre connectée" et Valentin à "portefeuille" — un ordre
          // légèrement différent de celui suggéré par la description directe
          // des besoins de chaque personne dans la transcription. Reproduit
          // tel qu'imprimé dans le corrigé.
          num: 3, page: 60, audioSrc: piste(54),
          instruction: "Écoutez et indiquez quel cadeau on cherche pour Paul, Karim, Isabelle, Noémie, Valentin, Manon.",
          vi: "Nghe mô tả nhu cầu của từng người và xác định món quà phù hợp — ⚠️ thứ tự Manon/Valentin trong đáp án in khác với suy luận trực tiếp, xem note.",
          type: "fill",
          items: [
            { q: "Paul", answer: "des écouteurs sans fil" },
            { q: "Karim", answer: "une valise" },
            { q: "Isabelle", answer: "une tablette" },
            { q: "Noémie", answer: "une batterie externe" },
            { q: "Manon", answer: "une montre connectée" },
            { q: "Valentin", answer: "un portefeuille" },
          ],
        },
      ],
    },

    // ── Phonie-graphie (cahier p. 57 consonnes [ʃ]/[ʒ] + p. 60 liaisons ──
    // obligatoires avec l'adjectif)
    phono: [
      {
        num: 1, page: 57, audioSrc: piste(51),
        instruction: "Phonie-graphie : les consonnes [ʃ] et [ʒ]. Écoutez les phrases et indiquez combien de fois vous entendez [ʃ] et [ʒ] (format : ʃ/ʒ). Puis répétez.",
        vi: "Nghe và đếm số lần xuất hiện phụ âm [ʃ] và [ʒ] trong câu (định dạng ʃ/ʒ), sau đó lặp lại.",
        type: "fill",
        items: [
          { q: "a. J'achète des vêtements pas chers et de jolis bijoux sur Vinted.", answer: "2/3", example: true },
          { q: "b. Il porte un short beige, un tee-shirt jaune et des chaussures rouges.", answer: "3/3" },
          { q: "c. Dimanche, je ne fais pas de shopping, je marche avec mon chien.", answer: "4/2" },
          { q: "d. En juin, c'est l'été, il fait chaud !", answer: "1/1" },
          { q: "e. J'aime acheter des chemises blanches et des jupes rouges.", answer: "3/3" },
        ],
      },
      {
        num: 1, page: 60, audioSrc: piste(55),
        instruction: "Phonie-graphie : les liaisons obligatoires avec l'adjectif. Écoutez et complétez les phrases. Puis jouez les mini-dialogues à deux.",
        vi: "Nghe và điền tính từ đúng, chú ý liên âm bắt buộc trước danh từ bắt đầu bằng nguyên âm.",
        type: "fill",
        items: [
          { q: "– Nous te souhaitons un ……………………… anniversaire ! – Merci ! C'est très gentil !", answer: "joyeux" },
          { q: "– Vous avez des ……………………… enfants ? – Oui, deux. Ils ont six ans et dix ans.", answer: "petits" },
          { q: "– Tu as des ……………………… idées de cadeau pour Noël ? – Oui, je voudrais un ……………………… ordinateur et des ……………………… écouteurs. (3 từ)", answer: "nouvelles petit bons" },
        ],
      },
    ],

    // ── Bilan (cahier p. 61 CO+PE, p. 62 Bilan linguistique /40, p. 64-65 ──
    // DELF A1, p. 66 Jeux). Production orale jeux de rôle is not separately
    // printed for this unit's p.61 (only CO+PE); DELF PO (p.65) and CE image
    // items are preserved with their model answers/notes as printed.
    bilan: [
      {
        num: 1, page: 61, audioSrc: piste(56),
        instruction: "Compréhension orale — « Week-end à Nice ». Écoutez le dialogue et répondez aux questions.",
        vi: "Nghe hội thoại về việc chuẩn bị vali đi Nice cuối tuần và trả lời câu hỏi.",
        type: "fill",
        items: [
          { q: "1. Laure et Jérémy vont passer le week-end :", answer: "chez la sœur de Laure à Nice." },
          { q: "3. À quelle saison se passe la scène ?", answer: "Au printemps." },
          { q: "4. Ce week-end, à Nice :", answer: "il va faire chaud." },
          { q: "5. Quel temps il fait à Lyon ?", answer: "Il pleut." },
          { q: "6. Quels vêtements va prendre Jérémy ?", answer: "Son short rouge, des tee-shirts et un pantalon (pour aller au restaurant le soir)." },
          { q: "7. Laure prend :", answer: "ses baskets." },
          { q: "8. Pourquoi Laure et Jérémy ne prennent pas leur ordinateur ?", answer: "Parce qu'il est lourd (ils prennent la tablette, plus légère)." },
          { q: "9. Laure prend aussi :", answer: "ses lunettes de soleil et son chapeau." },
        ],
      },
      {
        num: 1, page: 61,
        instruction: "Compréhension orale — Jérémy veut prendre un jean bleu pour aller à Nice.",
        vi: "Nghe hội thoại và xác định đúng/sai.",
        type: "truefalse",
        items: [
          { q: "2. Jérémy veut prendre un jean bleu pour aller à Nice.", answer: false },
        ],
      },
      {
        num: 2, page: 61,
        instruction: "Production écrite — Vous êtes Laure, vous écrivez un mail à votre sœur Emma qui vient à Lyon en janvier (météo, vêtements, accessoires à prendre).",
        vi: "Viết email cho em gái Emma, tư vấn trang phục mang theo khi đến Lyon vào mùa đông.",
        type: "fill",
        items: [
          { q: "Rédigez le mail complet.", answer: "Salut Emma, Comment vas-tu ? Tu vas venir samedi et je suis très contente. À Lyon, en hiver, il fait froid et il y a du vent. Tu peux prendre des pulls, des pantalons, un gros manteau. Samedi, nous allons visiter le centre-ville et nous allons beaucoup marcher. Tu peux mettre tes baskets dans ta valise ! À samedi ! Laure." },
        ],
      },
      {
        num: 3, page: 62,
        instruction: "Bilan linguistique — Grammaire : Complétez les phrases et accordez l'adjectif. (/5)",
        vi: "Chia tính từ đúng giống.",
        type: "fill",
        items: [
          { q: "Un pantalon élégant. Une jupe ...................................................................", answer: "élégante" },
          { q: "Un manteau chaud. Des robes ...................................................................", answer: "chaudes" },
          { q: "Un pantalon gris. Une ceinture ...................................................................", answer: "grise" },
          { q: "Un gilet vert. Des vestes .........................................................................", answer: "vertes" },
          { q: "Un costume blanc. Une tenue ...................................................................", answer: "blanche" },
        ],
      },
      {
        num: 4, page: 62,
        instruction: "Bilan linguistique — Grammaire : Soulignez la bonne réponse (place de l'adjectif). (/5)",
        vi: "Chọn đúng vị trí tính từ.",
        type: "choice",
        items: [
          { q: "Léo vend son (gris) pull (gris).", options: ["son gris pull", "son pull gris"], answer: "son pull gris" },
          { q: "Tu n'aimes pas les (noirs) vêtements (noirs).", options: ["les noirs vêtements", "les vêtements noirs"], answer: "les vêtements noirs" },
          { q: "Il achète une (connectée) montre (connectée).", options: ["une connectée montre", "une montre connectée"], answer: "une montre connectée" },
          { q: "Yann et son frère aiment les (élégantes) chaussures (élégantes).", options: ["les élégantes chaussures", "les chaussures élégantes"], answer: "les chaussures élégantes" },
          { q: "Sur ce site, on trouve des (chers) vêtements (chers).", options: ["des chers vêtements", "des vêtements chers"], answer: "des vêtements chers" },
        ],
      },
      {
        num: 5, page: 62,
        instruction: "Bilan linguistique — Grammaire : Répondez aux questions au futur proche. (/5)",
        vi: "Trả lời câu hỏi ở thì tương lai gần.",
        type: "fill",
        items: [
          { q: "– Il fait beau cet après-midi ? – Oui, il .............................................................", answer: "va faire beau" },
          { q: "– Tu viens à l'anniversaire de Lucas ? – Oui, je ............................................................", answer: "vais venir" },
          { q: "– Vous mettez un manteau ? – Oui, nous .......................................................................", answer: "allons mettre un manteau" },
          { q: "– Ils prennent leur ordinateur ? – Oui, ils ...........................................................................", answer: "vont prendre leur ordinateur" },
          { q: "– Tu vends tes écouteurs ? – Oui, je .............................................................................", answer: "vais vendre mes écouteurs" },
        ],
      },
      {
        num: 6, page: 62,
        instruction: "Bilan linguistique — Grammaire : Soulignez la bonne réponse (adjectif démonstratif). (/5)",
        vi: "Chọn tính từ chỉ định đúng.",
        type: "choice",
        items: [
          { q: "Je voudrais essayer cette /cet /ces bottes.", options: ["cette", "cet", "ces"], answer: "ces" },
          { q: "Ces / Cette / Cet étui est très beau !", options: ["Ces", "Cette", "Cet"], answer: "Cet" },
          { q: "Il va acheter ces / cette /ce costume.", options: ["ces", "cette", "ce"], answer: "ce" },
          { q: "Vous aimez ce / cet / cette style ?", options: ["ce", "cet", "cette"], answer: "ce" },
          { q: "Cet / Cette / Ces écouteurs sont à la mode.", options: ["Cet", "Cette", "Ces"], answer: "Ces" },
        ],
      },
      {
        num: 7, page: 63,
        instruction: "Bilan linguistique — Vocabulaire : Complétez les phrases avec les mots proposés. (/5)",
        vi: "Điền từ vựng về quần áo.",
        type: "fill",
        bank: ["robe", "costume", "imperméable", "taille", "bottes"],
        items: [
          { q: "Il pleut ! Je ne prends pas ma veste, je mets mon ……………………………………….. .", answer: "imperméable" },
          { q: "Je voudrais essayer cette jupe. Quelle ……………………………………….. vous avez ?", answer: "taille" },
          { q: "J'aime beaucoup cette ……………………………………….., elle est très élégante.", answer: "robe" },
          { q: "Boris va acheter un beau ……………………………………….. pour le mariage de son frère.", answer: "costume" },
          { q: "Il fait froid aujourd'hui ! Je vais mettre mes ……………………………………….. .", answer: "bottes" },
        ],
      },
      {
        // ⚠️ Note (cahier_unite_5.md) : les 5 images (pictogrammes météo) de
        // cet exercice n'ont pas pu être décrites individuellement à partir
        // du texte extrait ; seule la liste des 5 conditions possibles est
        // certaine.
        num: 8, page: 63,
        instruction: "Bilan linguistique — Vocabulaire : Quel temps il fait ? Associez la phrase à l'image. (/5)",
        vi: "Nối câu mô tả thời tiết với hình ảnh tương ứng — ⚠️ không trích xuất được nội dung hình ảnh cụ thể, xem note.",
        type: "fill",
        items: [
          { q: "Les 5 conditions météo de l'exercice (images non identifiables individuellement) :", answer: "Il fait froid, Il neige, Il fait beau, Il pleut, Il fait chaud" },
        ],
      },
      {
        num: 9, page: 63,
        instruction: "Bilan linguistique — Vocabulaire : Qu'est-ce qu'ils achètent ? Écrivez le nom de l'objet. (/5)",
        vi: "Đọc câu đố và điền tên đồ vật tương ứng.",
        type: "fill",
        bank: ["des chaussures", "un cadre photo", "des écouteurs sans fil", "un sac à dos", "une enceinte Bluetooth"],
        items: [
          { q: "Sans fil, ils sont pratiques, c'est bien pour écouter de la musique quand je me promène !", answer: "des écouteurs sans fil" },
          { q: "Je cherche un grand modèle pour cette photo de vacances.", answer: "un cadre photo" },
          { q: "Ma pointure ? Du 38.", answer: "des chaussures" },
          { q: "Ah oui ! Il est pratique pour mettre ses affaires de sport ou faire de la randonnée.", answer: "un sac à dos" },
          { q: "Elle est parfaite pour écouter de la musique avec vos amis. Elle est facile à transporter !", answer: "une enceinte Bluetooth" },
        ],
      },
      {
        num: 10, page: 63,
        instruction: "Bilan linguistique — Vocabulaire : Choisissez les réponses possibles. (/5)",
        vi: "Chọn các đáp án phù hợp để mô tả đồ vật.",
        type: "fill",
        items: [
          { q: "Un smartphone est", answer: "rectangulaire" },
          { q: "Ton cadre photo est", answer: "rond ; rectangulaire" },
          { q: "Cette valise est", answer: "lourde ; légère" },
          { q: "Le porte-monnaie est", answer: "léger ; en cuir" },
          { q: "Cette tablette est", answer: "grande ; rectangulaire" },
        ],
      },
      {
        // ⚠️ Note (cahier_unite_5.md) : la correspondance objets↔réponses de
        // cet exercice n'a pas pu être localisée explicitement dans le
        // corrigé imprimé — seule la structure "Oui/Non" de la grille est
        // visible ; les réponses ci-dessous sont la reconstitution documentée
        // dans cahier_unite_5.md, non confirmée contre le livre original.
        num: 11, page: 64, audioSrc: piste(57),
        instruction: "DELF A1 — Compréhension de l'oral (5 points). Vous entendez un message. Quels objets sont donnés dans le message ?",
        vi: "Nghe tin nhắn và xác định các đồ vật được tặng (Có/Không) — ⚠️ đáp án chưa được xác nhận với sách gốc, xem note.",
        type: "truefalse",
        items: [
          { q: "Objet 1 : donné ?", answer: true },
          { q: "Objet 2 : donné ?", answer: true },
          { q: "Objet 3 : donné ?", answer: false },
          { q: "Objet 4 : donné ?", answer: false },
          { q: "Objet 5 : donné ?", answer: true },
        ],
      },
      {
        num: 12, page: 64,
        instruction: "DELF A1 — Compréhension des écrits (6 points). Message de votre amie suisse Yasmine sur l'anniversaire de sa sœur Elsa.",
        vi: "Đọc tin nhắn của bạn Yasmine và trả lời câu hỏi hiểu văn bản.",
        type: "fill",
        items: [
          { q: "1. Que propose Yasmine ? (image)", answer: "image « faire du shopping ensemble »" },
          { q: "2. Elsa adore…", answer: "A. le rouge." },
          { q: "3. Vous avez rendez-vous où ?", answer: "C. Chez Yasmine." },
          { q: "4. Vous pouvez faire du shopping à quelle heure ?", answer: "C. À 14 h." },
          { q: "5. Qu'est-ce que vous devez prendre ? (image)", answer: "image « un parapluie »" },
        ],
      },
      {
        num: 13, page: 65,
        instruction: "DELF A1 — Production écrite (10 points). Vous complétez ce formulaire pour vous présenter à votre professeur de français (incluant couleurs préférées).",
        vi: "Điền mẫu tự giới thiệu bản thân (bao gồm màu sắc yêu thích).",
        type: "fill",
        items: [
          { q: "Exemple de production complet (modèle du corrigé) :", answer: "Nom : XXXXXXXXXXXXXXXX — Prénom : Jugurta — Date de naissance : 11/05/2001 — Nationalité : suisse — Courriel : jugurta07@gmail.com — Adresse postale (numéro et rue) : 17 rue de la Victoire — Pays : France — Téléphone : 07 56 43 12 40 — Profession : ingénieur informatique — Couleurs préférées : jaune, vert" },
        ],
      },
      {
        num: 14, page: 65,
        instruction: "DELF A1 — Production orale. Partie 3 de l'épreuve : jeu de rôle « Au magasin de vêtements » (prix, tailles, couleurs, acheter au moins 3 articles).",
        vi: "Đóng vai hội thoại tại cửa hàng quần áo — hỏi giá, kích cỡ, màu sắc và mua ít nhất 3 món đồ.",
        type: "fill",
        items: [
          { q: "Exemple de dialogue complet (modèle du corrigé) :", answer: "Vous : Bonjour monsieur ! Je voudrais acheter une robe pour ma sœur, c'est son anniversaire. Je pense que sa taille est M. Elle aime bien le vert. Quel est le prix de cette robe ? Je vais la prendre, merci. Et pour moi, je voudrais cette chemise rouge. Combien elle coûte ? Est-ce que vous avez un modèle moins cher ? Je vais prendre la chemise blanche. Et pour la cravate, vous avez du rouge ? Je vais prendre la cravate rouge à 8 euros. Je peux payer par carte ? Voilà, merci, au revoir." },
        ],
      },
      {
        num: 15, page: 66,
        instruction: "Jeux — Mots croisés des vêtements.",
        vi: "Giải ô chữ về trang phục và phụ kiện.",
        type: "fill",
        items: [
          { q: "Verticalement 1.", answer: "PANTALON" },
          { q: "Verticalement 2.", answer: "MANTEAU" },
          { q: "Verticalement 3.", answer: "CHAPEAU" },
          { q: "Verticalement 4.", answer: "COSTUME" },
          { q: "Horizontalement a.", answer: "PULL" },
          { q: "Horizontalement b.", answer: "SAC" },
          { q: "Horizontalement c.", answer: "BASKETS" },
          { q: "Horizontalement d.", answer: "PARAPLUIE" },
          { q: "Horizontalement e.", answer: "POINTURE" },
        ],
      },
      {
        num: 16, page: 66,
        instruction: "Jeux — Barrez l'intrus.",
        vi: "Tìm từ không cùng nhóm.",
        type: "fill",
        items: [
          { q: "chemise – pantalon – sac – cravate", answer: "sac" },
          { q: "baskets – bottes – parapluie – chaussures", answer: "parapluie" },
          { q: "orange – rose – couleur – rouge", answer: "couleur" },
          { q: "long – court – petit – cuir", answer: "cuir" },
        ],
      },
      {
        num: 17, page: 66,
        instruction: "Jeux — Remettez les lettres dans l'ordre pour trouver les mots.",
        vi: "Sắp xếp lại các chữ cái để tạo thành từ vựng công nghệ.",
        type: "fill",
        items: [
          { q: "TETABLET", answer: "tablette" },
          { q: "NOMTER", answer: "montre" },
          { q: "RUTEOIDANR", answer: "ordinateur" },
          { q: "DONR", answer: "rond" },
          { q: "SUECOTUER", answer: "écouteurs" },
        ],
      },
      {
        num: 18, page: 66,
        instruction: "Jeux — Associez les étiquettes pour former des mots (thème météo).",
        vi: "Ghép các mảnh chữ để tạo thành 5 từ vựng về thời tiết.",
        type: "fill",
        items: [
          { q: "5 mots de météo à retrouver :", answer: "pluie, soleil, vent, nuage, degré" },
        ],
      },
      {
        num: 19, page: 66,
        instruction: "Jeux — Devinettes (objets technologiques).",
        vi: "Đọc câu đố và đoán tên đồ vật công nghệ tương ứng.",
        type: "fill",
        items: [
          { q: "C'est un objet rectangulaire, ça sert à mettre des vêtements pour partir en voyage.", answer: "une valise" },
          { q: "C'est un objet carré ou rectangulaire, en cuir, ça sert à mettre des billets de banque, des papiers d'identité.", answer: "un portefeuille" },
          { q: "C'est un objet rectangulaire, léger. Ça sert à se connecter à Internet, à regarder des films, à jouer.", answer: "une tablette" },
          { q: "C'est un objet rond ou rectangulaire, léger. Ça sert à lire l'heure et à donner des informations avec un téléphone.", answer: "une montre (connectée)" },
          { q: "C'est un objet rectangulaire. Ça sert à charger son téléphone quand on n'a pas d'électricité.", answer: "une batterie externe" },
        ],
      },
    ],
  },

  u6: {

    // ── Grammaire, keyed by grammar point index in editoGrammar.js's "g6" ──
    // g6 has 5 points, all with a matching cahier "Grammaire" page — except
    // p4 "Pouvoir et Vouloir" which has no dedicated page: its only drill is
    // exercise 4 embedded in the "fréquence (2)" page (p.68), filed under p4
    // here by verb content, not under p1 by page header (same pattern as
    // u5's p4 verbs) — see cahier_unite_6.md.
    grammar: {

      // p0 — Les verbes pronominaux au présent (cahier p. 67)
      p0: [
        {
          num: 1, page: 67,
          instruction: "Complétez la conjugaison du verbe s'habiller au présent (Exemple : Je m'habille avant de prendre mon petit déjeuner.).",
          vi: "Chia đại từ phản thân đúng theo chủ ngữ với động từ \"s'habiller\".",
          type: "fill",
          items: [
            { q: "Il ……… habille pour aller dîner.", answer: "s'" },
            { q: "Tu ……… habilles pour sortir ce soir ?", answer: "t'" },
            { q: "Vous ……… habillez pour le travail.", answer: "vous" },
            { q: "Nous ……… habillons pour faire du jardinage.", answer: "nous" },
          ],
        },
        {
          num: 2, page: 67, audioSrc: piste(58),
          instruction: "Écoutez et retrouvez les verbes manquants (dialogue sur la routine du matin).",
          vi: "Nghe hội thoại và điền các động từ phản thân còn thiếu, theo đúng thứ tự.",
          type: "fill",
          items: [
            { q: "1. (dans l'ordre du dialogue)", answer: "tu te lèves" },
            { q: "2.", answer: "je me réveille" },
            { q: "3.", answer: "je me lève" },
            { q: "4.", answer: "tu te laves" },
            { q: "5.", answer: "je me lave" },
            { q: "6.", answer: "je me prépare" },
            { q: "7.", answer: "je m'habille" },
            { q: "8.", answer: "je me coiffe" },
            { q: "9.", answer: "tu te maquilles" },
          ],
        },
        {
          num: 3, page: 67,
          instruction: "Complétez les phrases avec les verbes qui conviennent au présent (se réveiller – se doucher – se lever – se promener – se raser).",
          vi: "Điền động từ phản thân phù hợp vào đoạn văn kể về buổi sáng.",
          type: "fill",
          bank: ["se réveiller", "se doucher", "se lever", "se promener", "se raser"],
          items: [
            { q: "Tous les matins, je ……… à 8 h.", answer: "je me réveille" },
            { q: "Je ……… et je ……… avant de prendre mon petit déjeuner. (2 từ)", answer: "je me douche je me rase" },
            { q: "Ma femme ……… à 8 h 30.", answer: "Ma femme se lève" },
            { q: "À 9 h, nous partons, et nous ……… .", answer: "nous nous promenons" },
          ],
        },
        {
          num: 4, page: 67,
          instruction: "Conjuguez les verbes à la forme négative (Exemple : Ils (se coucher) tard → Ils ne se couchent pas tard.).",
          vi: "Chia động từ phản thân ở dạng phủ định.",
          type: "fill",
          items: [
            { q: "Mon frère (se laver) ……… le soir.", answer: "ne se lave pas" },
            { q: "Je (se réveiller) ……… à 7 h.", answer: "ne me réveille pas" },
            { q: "Alexandra et Géraldine (se maquiller) ……… pour aller au concert.", answer: "ne se maquillent pas" },
            { q: "Nous (se préparer) ……… dans la salle de bains.", answer: "ne nous préparons pas" },
            { q: "Tu (se raser) ……… le matin ?", answer: "ne te rases pas" },
          ],
        },
      ],

      // p1 — La fréquence (2) (cahier p. 68)
      p1: [
        {
          num: 1, page: 68,
          instruction: "Remettez les mots dans l'ordre.",
          vi: "Sắp xếp lại từ để tạo câu có trạng từ chỉ tần suất.",
          type: "order",
          items: [
            { tokens: ["Christine", "mange", "parfois", "au", "restaurant."],
              answer: ["Christine", "mange", "parfois", "au", "restaurant."] },
            { tokens: ["Nous", "lisons", "souvent", "le", "journal."],
              answer: ["Nous", "lisons", "souvent", "le", "journal."] },
            { tokens: ["Je", "vais", "au", "sport", "tous", "les", "mardis."],
              answer: ["Je", "vais", "au", "sport", "tous", "les", "mardis."] },
            { tokens: ["Le", "samedi,", "vous", "allez", "au", "cinéma."],
              answer: ["Le", "samedi,", "vous", "allez", "au", "cinéma."] },
            { tokens: ["Tu", "ne", "fais", "jamais", "la", "vaisselle."],
              answer: ["Tu", "ne", "fais", "jamais", "la", "vaisselle."] },
          ],
        },
        {
          num: 2, page: 68,
          instruction: "Complétez les phrases avec des expressions de fréquence : jamais, toujours, parfois, tous les, rarement, souvent (plusieurs réponses possibles).",
          vi: "Điền trạng từ tần suất phù hợp (nhiều đáp án đúng có thể chấp nhận).",
          type: "fill",
          bank: ["jamais", "toujours", "parfois", "tous les", "rarement", "souvent"],
          items: [
            { q: "Paul se brosse ……… les dents après manger.", answer: "toujours / parfois" },
            { q: "Ma mère jardine ………, elle n'aime pas beaucoup cette activité !", answer: "rarement" },
            { q: "Je ne cuisine ………, je préfère commander mon repas.", answer: "jamais" },
            { q: "Jordan et Mickaël font ……… du sport ensemble, mais ils ne se parlent plus.", answer: "parfois / toujours / souvent" },
            { q: "Tu te promènes ………, je te vois ……… matins. (2 từ)", answer: "souvent tous les" },
          ],
        },
        {
          num: 3, page: 68,
          instruction: "Faites des phrases en utilisant les expressions de fréquence (exemples de réponses — production libre guidée).",
          vi: "Đặt câu tự do với động từ và trạng từ tần suất cho sẵn (đáp án mẫu, không duy nhất).",
          type: "fill",
          items: [
            { q: "(regarder la télévision) Nous ………", answer: "Nous regardons la télévision tous les soirs." },
            { q: "(écouter la radio) Ils ………", answer: "Ils écoutent souvent la radio." },
            { q: "(jouer aux jeux vidéo) Tu ………", answer: "Tu joues parfois aux jeux vidéo." },
            { q: "(faire la lessive) Michel ………", answer: "Michel ne fait jamais la lessive." },
            { q: "(déjeuner ensemble) Vous ………", answer: "Vous déjeunez toujours ensemble." },
          ],
        },
      ],

      // p2 — Le passé récent (cahier p. 70)
      p2: [
        {
          num: 1, page: 70,
          instruction: "Conjuguez le verbe venir au présent.",
          vi: "Chia động từ \"venir\" (đến) ở thì hiện tại, dùng trong cấu trúc \"vừa mới làm gì\" (venir de + infinitif).",
          type: "fill",
          items: [
            { q: "Tu ……… de finir de travailler.", answer: "viens" },
            { q: "Nous ……… de lire ce livre.", answer: "venons" },
            { q: "Je ……… de cuisiner.", answer: "viens" },
            { q: "Vous ……… de regarder le film.", answer: "venez" },
            { q: "Ils ……… de terminer le ménage.", answer: "viennent" },
          ],
        },
        {
          num: 2, page: 70, audioSrc: piste(64),
          instruction: "Écoutez les phrases et cochez la bonne réponse.",
          vi: "Nghe và xác định câu dùng thì hiện tại hay \"quá khứ gần\" (venir de + infinitif).",
          type: "choice",
          items: [
            { q: "a.", options: ["présent", "passé récent"], answer: "présent" },
            { q: "b.", options: ["présent", "passé récent"], answer: "passé récent" },
            { q: "c.", options: ["présent", "passé récent"], answer: "présent" },
            { q: "d.", options: ["présent", "passé récent"], answer: "passé récent" },
            { q: "e.", options: ["présent", "passé récent"], answer: "passé récent" },
          ],
        },
        {
          num: 3, page: 70,
          instruction: "Transformez le présent en passé récent dans ces phrases (Exemple : J'écoute de la musique. → Je viens d'écouter de la musique.).",
          vi: "Chuyển câu ở thì hiện tại sang cấu trúc \"quá khứ gần\" (venir de + infinitif).",
          type: "fill",
          items: [
            { q: "Je lis un article de journal.", answer: "Je viens de lire un article de journal." },
            { q: "Ils regardent une série.", answer: "Ils viennent de regarder une série." },
            { q: "Nous faisons un jogging.", answer: "Nous venons de faire un jogging." },
            { q: "Tu écoutes l'émission ?", answer: "Tu viens d'écouter l'émission ?" },
            { q: "Il va au cours de dessin.", answer: "Il vient d'aller au cours de dessin." },
          ],
        },
        {
          num: 4, page: 70,
          instruction: "Regardez les images et complétez les phrases avec un passé récent (Exemple : J'ai chaud parce que je viens de bricoler.).",
          vi: "Nhìn hình và hoàn thành câu giải thích lý do bằng cấu trúc \"quá khứ gần\".",
          type: "fill",
          items: [
            { q: "Manon fait la vaisselle parce qu'elle ……… .", answer: "elle vient de cuisiner" },
            { q: "Nous nous brossons les dents parce que nous ……… .", answer: "nous venons de manger" },
            { q: "Il se douche parce qu'il ……… .", answer: "il vient de courir" },
            { q: "Vous êtes fatigué parce que vous ……… .", answer: "vous venez de travailler" },
            { q: "Je me coiffe parce que je ……… .", answer: "je viens de me lever" },
          ],
        },
      ],

      // p3 — Les verbes en -ir au présent (2) : dormir, sortir, partir (cahier p. 71)
      p3: [
        {
          num: 1, page: 71,
          instruction: "Associez le sujet et le verbe.",
          vi: "Nối chủ ngữ với dạng chia đúng của các động từ dormir, sortir, partir (nhóm động từ -ir đặc biệt).",
          type: "match",
          pairs: [
            { l: "Je", r: "dors" },
            { l: "Tu", r: "sors" },
            { l: "Elle", r: "part" },
            { l: "Nous", r: "dormons" },
            { l: "Vous", r: "partez" },
            { l: "Ils", r: "sortent" },
          ],
        },
        {
          num: 2, page: 71,
          instruction: "Conjuguez les verbes pour former une phrase (Exemple : Sortir souvent le samedi soir (nous) → Nous sortons souvent le samedi soir.).",
          vi: "Chia động từ theo chủ ngữ cho sẵn để tạo câu hoàn chỉnh.",
          type: "fill",
          items: [
            { q: "Partir au travail à 7 h (je)", answer: "Je pars au travail à 7 h." },
            { q: "Dormir beaucoup le week-end (tu)", answer: "Tu dors beaucoup le week-end." },
            { q: "Sortir de la maison (vous)", answer: "Vous sortez de la maison." },
            { q: "Dormir le jour et travailler la nuit (elle)", answer: "Elle dort le jour et elle travaille la nuit." },
            { q: "Partir en vacances (ils)", answer: "Ils partent en vacances." },
          ],
        },
        {
          num: 3, page: 71, audioSrc: piste(65),
          instruction: "Écoutez et répondez aux questions. Utilisez les verbes partir, sortir, dormir au présent (exemples de réponses, production libre).",
          vi: "Nghe câu hỏi và trả lời tự do bằng động từ partir, sortir, dormir.",
          type: "fill",
          items: [
            { q: "Vous sortez le week-end ?", answer: "Oui, je sors le samedi soir." },
            { q: "Ton ami part travailler à quelle heure ?", answer: "Il part à 8 h." },
            { q: "En vacances, tu dors où ?", answer: "Je dors à l'hôtel." },
            { q: "Il sort avec Justine ?", answer: "Oui, il sort avec elle. / Oui, ils sortent ensemble." },
            { q: "Vous partez en voiture ?", answer: "Non, nous partons en bus." },
          ],
        },
        {
          num: 4, page: 71,
          instruction: "Conjuguez les verbes et complétez les phrases (réponses libres, exemples de réponses).",
          vi: "Hoàn thành câu tự do với động từ chia đúng ngôi.",
          type: "fill",
          items: [
            { q: "Je (sortir) ………", answer: "Je sors tous les soirs." },
            { q: "Nous (dormir) ………", answer: "Nous dormons beaucoup." },
            { q: "Tu (partir) ………", answer: "Tu pars en vacances." },
            { q: "Ils (venir) ………", answer: "Ils viennent chez moi." },
            { q: "Vous (sortir) ………", answer: "Vous sortez en ville." },
          ],
        },
      ],

      // p4 — Pouvoir et Vouloir (see note above — no dedicated cahier page;
      // the only drill is p.68 ex.4, under the fréquence (2) page)
      p4: [
        {
          num: 4, page: 68, audioSrc: piste(59),
          instruction: "Écoutez et complétez les phrases avec le verbe pouvoir ou vouloir au présent.",
          vi: "Nghe và điền động từ \"pouvoir\" (có thể) hoặc \"vouloir\" (muốn) ở thì hiện tại.",
          type: "fill",
          items: [
            { q: "Thomas, tu ……… m'aider à cuisiner ? Je ne sais pas faire à manger.", answer: "peux" },
            { q: "Il fait beau, je ……… aller me promener.", answer: "veux" },
            { q: "Ma petite sœur ……… s'habiller toute seule.", answer: "veut" },
            { q: "Nous ……… aller au musée, mais c'est fermé aujourd'hui.", answer: "voulons" },
            { q: "Vous ……… écouter de la musique mais pas trop fort.", answer: "pouvez" },
          ],
        },
      ],
    },

    // ── Vocabulaire (cahier p. 69 "L'heure, les activités" + p. 72 "La ──
    // description physique, le caractère"). Custom STEP_GROUPS_U6: v1_vocab
    // (u6g1/u6gjms/u6g2, "Giờ giấc · ngày tháng · hoạt động hằng ngày"),
    // v2_vocab (u6g3/u6g4/u6g5, "Việc nhà · thời gian rảnh · sinh hoạt văn
    // hoá"), v3_vocab (u6g6/u6g7, "Ngoại hình · tính cách"). The cahier has
    // only ONE vocabulaire page matching v1_vocab's themes (p.69) — its
    // activity-checklist exercise (1) mixes words from all three vocab
    // groups (daily routine, housework, leisure, cultural outings) without a
    // page split, so it is filed entirely under v1_vocab, matching the
    // book's own single "Vocabulaire" header; v2_vocab has no dedicated
    // cahier exercise of its own for this unit. v3_vocab maps directly to
    // the p.72 vocabulaire page (physical description + caractère).
    vocab: {
      v1_vocab: [
        {
          num: 1, page: 69, audioSrc: piste(60),
          instruction: "Écoutez le dialogue et cochez les activités entendues (parmi : jouer aux jeux vidéo, dessiner, faire une promenade, aller à un concert, voir des amis, voir une exposition, faire du jogging, surfer sur internet, faire du bricolage, faire du jardinage).",
          vi: "Nghe hội thoại và đánh dấu các hoạt động được nhắc đến.",
          type: "fill",
          items: [
            { q: "Activités entendues (parmi a-j) :", answer: "b, c, e, f, h, j (dessiner, faire une promenade, voir des amis, voir une exposition, surfer sur internet, faire du jardinage)" },
          ],
        },
        {
          num: 2, page: 69,
          instruction: "Barrez l'intrus.",
          vi: "Gạch bỏ từ không cùng nhóm nghĩa với các từ còn lại.",
          type: "fill",
          items: [
            { q: "la peinture – le dessin – le tableau – la musique", answer: "la musique" },
            { q: "se coiffer – se maquiller – faire la lessive – se préparer", answer: "faire la lessive" },
            { q: "bricoler – jardiner – parler – cuisiner", answer: "parler" },
            { q: "regarder la télévision – aller au cinéma – écouter de la musique – voir un film", answer: "écouter de la musique" },
          ],
        },
        {
          num: 3, page: 69, audioSrc: piste(61),
          instruction: "Écoutez et cochez les heures entendues (parmi : 7h10, 7h45, 8h15, 8h45, 9h30, 11h15, 12h15, 13h15, 13h30, 17h, 18h, 19h, 19h30).",
          vi: "Nghe và đánh dấu các giờ được nhắc đến trong bài nghe.",
          type: "fill",
          items: [
            { q: "Heures entendues :", answer: "7 h 10 – 7 h 45 – 9 h 30 – 12 h 15 – 13 h 30 – 18 h – 19 h" },
          ],
        },
        {
          // ⚠️ Note (cahier_unite_6.md) : l'énoncé imprimé donne « c. 13 h 40
          // : deux heures moins vingt » comme texte de départ (au lieu de
          // « treize heures quarante »), probablement une coquille du cahier
          // — mais le corrigé confirme bien « treize heures quarante » comme
          // réponse à la question c. Énoncé et corrigé reproduits tels quels,
          // sans les harmoniser.
          num: 4, page: 69,
          instruction: "Écrivez les heures d'une manière différente (Exemple : 10 h 30 : dix heures trente → dix heures et demie).",
          vi: "Viết lại giờ theo cách khác (giờ hành chính ↔ giờ thông dụng) — câu c có khả năng lỗi in trong đề, xem note.",
          type: "fill",
          items: [
            { q: "11 h 50 : onze heures cinquante", answer: "midi moins dix" },
            { q: "7 h 15 : sept heures quinze", answer: "sept heures et quart" },
            { q: "13 h 40 : deux heures moins vingt (⚠️ énoncé imprimé ainsi — voir note)", answer: "treize heures quarante" },
            { q: "6 h 45 : six heures quarante-cinq", answer: "sept heures moins le quart" },
            { q: "12 h 30 : douze heures trente", answer: "midi et demi" },
          ],
        },
      ],

      v3_vocab: [
        {
          num: 1, page: 72,
          instruction: "Associez les images à la description (Thérèse, Igor, Charles, Marie-France).",
          vi: "Nối mô tả ngoại hình với tên nhân vật tương ứng.",
          type: "fill",
          items: [
            { q: "Il / Elle a un petit nez et une grande bouche. Il / Elle a les cheveux blancs et raides.", answer: "Thérèse" },
            { q: "Il / Elle a une barbe et une moustache châtains. Il / Elle est chauve.", answer: "Igor" },
            { q: "Il / Elle a un grand nez. Il / Elle a les cheveux bruns, frisés et courts. Il / Elle porte des boucles d'oreille.", answer: "Marie-France" },
            { q: "Il / Elle a une petite bouche. Il / Elle a les cheveux courts, frisés et blonds. Il / Elle n'a pas de moustache.", answer: "Charles" },
          ],
        },
        {
          num: 2, page: 72,
          instruction: "Écrivez les contraires (Exemple : timide → sociable).",
          vi: "Viết từ trái nghĩa (mô tả vóc dáng, tính cách, tóc).",
          type: "fill",
          items: [
            { q: "gros", answer: "mince" },
            { q: "dynamique", answer: "calme" },
            { q: "petite", answer: "grande" },
            { q: "gentil", answer: "méchant" },
            { q: "courte", answer: "longue" },
            { q: "frisés", answer: "raides" },
          ],
        },
        {
          // ⚠️ Note (cahier_unite_6.md) : l'exercice imprimé liste six
          // personnes à décrire (Anna, Jacques, Édouard, David, Ludivine, et
          // une ligne « f » vierge dans le tableau du cahier) mais seules 5
          // sont couvertes par le corrigé et la transcription officielle ;
          // seules ces 5 lignes sont complétées ici.
          num: 3, page: 72, audioSrc: piste(66),
          instruction: "Écoutez les descriptions. Écrivez dans le tableau les adjectifs entendus (le corps, les cheveux, le visage, le caractère).",
          vi: "Nghe mô tả 5 người và điền tính từ vào bảng theo từng mục (vóc dáng, tóc, khuôn mặt, tính cách) — chỉ 5/6 dòng có đáp án, xem note.",
          type: "fill",
          items: [
            { q: "a. Anna — corps / cheveux / visage / caractère", answer: "grande ; blonds et courts ; petits yeux verts ; bavarde, sociable, stressée", example: true },
            { q: "b. Jacques — corps / cheveux / visage / caractère", answer: "petit, mince ; chauve ; petite moustache grise ; intelligent, généreux" },
            { q: "c. Édouard — corps / cheveux / visage / caractère", answer: "grand, un peu gros ; cheveux longs, châtains ; pas de moustache ; courageux" },
            { q: "d. David — corps / cheveux / visage / caractère", answer: "pas très grand ; cheveux noirs ; grand nez, petite bouche, yeux noirs ; sérieux, pas drôle" },
            { q: "e. Ludivine — corps / cheveux / visage / caractère", answer: "grande, mince ; cheveux frisés, longs, roux ; (non précisé) ; sérieuse (au travail), très sympa (en dehors)" },
          ],
        },
      ],
    },

    // ── Phonie-graphie (cahier p. 69 consonnes [s]/[z] + p. 72 voyelles ──
    // [ø]/[œ])
    phono: [
      {
        num: 1, page: 69, audioSrc: piste(62),
        instruction: "Phonie-graphie : les sons [s] et [z]. Écoutez les phrases et indiquez combien de fois vous entendez [s] et [z] (format : s/z). Puis répétez.",
        vi: "Nghe và đếm số lần xuất hiện âm [s] và [z] trong mỗi câu (định dạng s/z).",
        type: "fill",
        items: [
          { q: "a. Cette journaliste organise ses futures émissions sur son ordinateur.", answer: "6/2" },
          { q: "b. Elle se lève à six heures trente, se prépare et réveille son petit garçon.", answer: "5/1" },
          { q: "c. Ce magazine de sport présente tous les nouveaux événements de la semaine.", answer: "3/3" },
          { q: "d. Nous aimons souvent aller au cinéma avec des amis.", answer: "2/2" },
          { q: "e. Ils adorent écouter de la musique et vont souvent voir des concerts.", answer: "2/2" },
        ],
      },
      {
        num: 2, page: 69, audioSrc: piste(63),
        instruction: "Dictée : complétez le texte.",
        vi: "Nghe và điền các từ còn thiếu trong đoạn văn (chính tả).",
        type: "fill",
        items: [
          { q: "Texte complet à retrouver :", answer: "Le samedi, nous faisons les courses, la cuisine, la lessive et la vaisselle. Mais le dimanche, nous nous reposons, nous écoutons de la musique, nous faisons du sport ou nous allons voir des amis. Parfois, nous visitons une exposition ou nous allons au cinéma." },
        ],
      },
      {
        num: 1, page: 72, audioSrc: piste(67),
        instruction: "Phonie-graphie : les voyelles [ø] et [œ]. Écoutez les phrases et indiquez combien de fois vous entendez [ø] et [œ] (format : ø/œ). Puis répétez.",
        vi: "Nghe và đếm số lần xuất hiện âm [ø] (như trong jeu) và [œ] (như trong sœur).",
        type: "fill",
        items: [
          { q: "a. C'est un jeu dangereux.", answer: "3/0", example: true },
          { q: "b. C'est un auteur. Il a les cheveux noirs. Il est sérieux et courageux.", answer: "3/1" },
          { q: "c. C'est un jeune acteur. Il est brun aux yeux bleus.", answer: "2/2" },
          { q: "d. Ma sœur ne peut pas être seule, elle a peur.", answer: "1/3" },
          { q: "e. À 18 heures les étudiants peuvent sortir du cours.", answer: "0/2" },
        ],
      },
      {
        num: 2, page: 72, audioSrc: piste(68),
        instruction: "Dictée : complétez le texte (Antoine de Saint-Exupéry).",
        vi: "Nghe và điền từ còn thiếu trong đoạn văn về Antoine de Saint-Exupéry và tác phẩm Le Petit Prince.",
        type: "fill",
        items: [
          { q: "Texte complet à retrouver :", answer: "Antoine de Saint-Exupéry est un aviateur, un grand voyageur. C'est aussi un auteur célèbre grâce à son œuvre « Le petit Prince », le seul livre de littérature traduit en 481 langues et dialectes. Les enfants du monde entier peuvent lire cette belle histoire !" },
        ],
      },
    ],

    // ── Bilan (cahier p. 73 CE, p. 74-75 Bilan linguistique /40, p. 76-77 ──
    // DELF A1, p. 78 Jeux). The "Production orale — Jeu de rôle" (p.73,
    // célébrité interviewée) and Jeux activité 3 ("Avis de recherche") are
    // free answer ("Réponses libres") and intentionally excluded. DELF PE
    // (p.77) has no example production printed in the corrigé ("Réponse
    // libre — pas de corrigé imprimé") and is also excluded.
    bilan: [
      {
        num: 1, page: 73,
        instruction: "Compréhension écrite — « À plus tard ! » Message de Catherine à Tom. Répondez aux questions.",
        vi: "Đọc tin nhắn của Catherine gửi Tom và trả lời câu hỏi (ai, khi nào, yêu cầu gì).",
        type: "fill",
        items: [
          { q: "1. Pour qui est le message ?", answer: "Tom (le mari de Catherine)" },
          { q: "2. Catherine parle... (du matin / de l'après-midi / du soir)", answer: "du soir" },
          { q: "3. Qu'est-ce qu'elle demande ?", answer: "de s'occuper des enfants et de préparer le dîner" },
          { q: "5. Combien de temps sort Catherine ?", answer: "3 heures (de 20 h à 23 h)" },
        ],
      },
      {
        // ⚠️ Note (cahier_unite_6.md) : le corrigé donne « a. faux – b. faux
        // – c. vrai » sans reproduire le texte des affirmations dans le même
        // ordre que l'énoncé du cahier ; chaque lettre a été réassociée à
        // l'affirmation correspondante de l'énoncé.
        num: 2, page: 73,
        instruction: "Compréhension écrite — « À plus tard ! » Vrai ou faux ?",
        vi: "Đọc tin nhắn và xác định đúng/sai.",
        type: "truefalse",
        items: [
          { q: "4a. Karine doit faire ses devoirs.", answer: false },
          { q: "4b. Les enfants ne peuvent pas regarder la télé.", answer: false },
          { q: "4c. Quand Catherine rentre, les enfants sont couchés.", answer: true },
        ],
      },
      {
        num: 3, page: 74,
        instruction: "Bilan linguistique — Grammaire : Reliez pour former des phrases. (/5)",
        vi: "Nối chủ ngữ với phần còn lại của câu.",
        type: "match",
        pairs: [
          { l: "Tous les matins, je", r: "m'occupe des enfants." },
          { l: "Marie", r: "se coiffe devant le miroir." },
          { l: "Ma sœur et moi, nous", r: "nous brossons les dents trois fois par jour." },
          { l: "Tu", r: "te réveilles à 8 heures." },
          { l: "Vous", r: "vous rasez souvent ?" },
        ],
      },
      {
        num: 4, page: 74,
        instruction: "Bilan linguistique — Grammaire : Complétez avec les expressions de fréquence suivantes : tous les, jamais, souvent, le matin, rarement. (/5)",
        vi: "Điền trạng từ tần suất phù hợp.",
        type: "fill",
        bank: ["tous les", "jamais", "souvent", "le matin", "rarement"],
        items: [
          { q: "Je vais ……… au tennis, surtout le week-end !", answer: "souvent" },
          { q: "……… dimanches, je me promène avec mon chien.", answer: "Tous les" },
          { q: "Ils cuisinent ………, ils préfèrent les plats surgelés.", answer: "rarement" },
          { q: "Elle ne va ……… au cinéma, elle pense que c'est cher !", answer: "jamais" },
          { q: "………, elle aime prendre son petit déjeuner tranquillement.", answer: "Le matin" },
        ],
      },
      {
        num: 5, page: 74,
        instruction: "Bilan linguistique — Grammaire : Transformez les phrases avec un passé récent. (/5)",
        vi: "Chuyển câu sang cấu trúc \"quá khứ gần\".",
        type: "fill",
        items: [
          { q: "Je vois une exposition.", answer: "Je viens de voir une exposition." },
          { q: "Nous faisons la vaisselle.", answer: "Nous venons de faire la vaisselle." },
          { q: "Tu regardes une série à la télévision.", answer: "Tu viens de regarder une série à la télévision." },
          { q: "Michel part du cinéma.", answer: "Michel vient de partir du cinéma." },
          { q: "Ils sortent du cours de dessin.", answer: "Ils viennent de sortir du cours de dessin." },
        ],
      },
      {
        num: 6, page: 74,
        instruction: "Bilan linguistique — Grammaire : Soulignez la bonne réponse. (/5)",
        vi: "Chọn đúng dạng chia động từ.",
        type: "choice",
        items: [
          { q: "Je dors / dort toujours au cinéma.", options: ["dors", "dort"], answer: "dors" },
          { q: "Tu partez / pars de l'exposition ? Tu n'as pas aimé ?", options: ["partez", "pars"], answer: "pars" },
          { q: "Il dorment / dort et après il prend sa douche.", options: ["dorment", "dort"], answer: "dort" },
          { q: "Ta mère pars / part à quelle heure travailler ?", options: ["pars", "part"], answer: "part" },
          { q: "Vous travaillez ou vous sortez / sortons le dimanche ?", options: ["sortez", "sortons"], answer: "sortez" },
        ],
      },
      {
        num: 7, page: 75,
        instruction: "Bilan linguistique — Vocabulaire : Remplacez les activités soulignées par les bonnes activités. (/5)",
        vi: "Sửa lại câu bằng cách thay hoạt động gạch chân bằng hoạt động hợp lý hơn.",
        type: "fill",
        items: [
          { q: "Nathalie se couche à 9h.", answer: "Nathalie se lève à 9h." },
          { q: "Mon père se réveille avant d'aller se coucher.", answer: "Mon père se brosse les dents avant d'aller se coucher." },
          { q: "Je cherche une maison à acheter, alors je fais la lessive.", answer: "Je cherche une maison à acheter, alors je surfe sur internet." },
          { q: "Christelle fait du bricolage au supermarché.", answer: "Christelle fait les courses au supermarché." },
          { q: "Ma mère va au cinéma, elle adore les tableaux.", answer: "Ma mère va au musée, elle adore les tableaux." },
        ],
      },
      {
        // ⚠️ Note (cahier_unite_6.md) : les 5 horloges (cadrans) de cet
        // exercice ne sont pas reproductibles en texte ; chaque réponse du
        // corrigé propose deux formulations valides (format 24h / format 12h
        // courant), reproduites telles quelles.
        num: 8, page: 75,
        instruction: "Bilan linguistique — Vocabulaire : Écrivez les heures en lettres (exercice basé sur des horloges illustrées). (/5)",
        vi: "Viết giờ bằng chữ, dựa theo hình đồng hồ minh hoạ — hình không trích xuất được văn bản, xem note.",
        type: "fill",
        items: [
          { q: "a. (horloge illustrée)", answer: "dix heures et quart / vingt-deux heures quinze" },
          { q: "b. (horloge illustrée)", answer: "minuit / midi" },
          { q: "c. (horloge illustrée)", answer: "huit heures cinq" },
          { q: "d. (horloge illustrée)", answer: "neuf heures moins le quart / huit heures quarante-cinq" },
          { q: "e. (horloge illustrée)", answer: "douze heures cinquante / midi moins dix" },
        ],
      },
      {
        num: 9, page: 75,
        instruction: "Bilan linguistique — Vocabulaire : Reliez les contraires. (/5)",
        vi: "Nối các từ trái nghĩa.",
        type: "match",
        pairs: [
          { l: "grand", r: "petit" },
          { l: "frisé", r: "raide" },
          { l: "blond", r: "brun" },
          { l: "beaucoup de cheveux", r: "chauve" },
          { l: "gros", r: "mince" },
        ],
      },
      {
        num: 10, page: 75,
        instruction: "Bilan linguistique — Vocabulaire : Lisez et cochez vrai ou faux. (/5)",
        vi: "Đọc và xác định đúng/sai.",
        type: "truefalse",
        items: [
          { q: "Si une personne parle beaucoup, elle est timide.", answer: false },
          { q: "Si une personne donne beaucoup, elle est généreuse.", answer: true },
          { q: "Si une personne n'a pas peur, elle est drôle.", answer: false },
          { q: "Si une personne étudie beaucoup, elle est méchante.", answer: false },
          { q: "Si une personne a beaucoup d'amis, elle est sociable.", answer: true },
        ],
      },
      {
        num: 11, page: 76, audioSrc: piste(69),
        instruction: "DELF A1 — Compréhension de l'oral (4 points). Message vocal de Ludo.",
        vi: "Nghe tin nhắn thoại của Ludo và chọn đáp án đúng.",
        type: "choice",
        items: [
          { q: "1. Qu'est-ce que Ludo fait demain ?", options: ["Il travaille au bureau", "Il va à une exposition", "Il s'occupe de sa fille"], answer: "Il s'occupe de sa fille" },
          { q: "2. Quand est-ce que Ludo va au supermarché ?", options: ["Le matin", "Le midi", "L'après-midi"], answer: "Le matin" },
          { q: "3. Qu'est-ce que Ludo vous propose ? (image)", options: ["A", "B", "C"], answer: "B" },
          { q: "4. Qu'est-ce que vous devez apporter ?", options: ["Un fruit", "Un dessert", "Une boisson"], answer: "Une boisson" },
        ],
      },
      {
        // ⚠️ Note (cahier_unite_6.md) : le corrigé pour la question 5 (plan
        // du chemin, réponse graphique) n'est pas explicitement lisible dans
        // le texte extrait du corrigé ; la réponse B est retrouvée par
        // déduction à partir de l'ordre des corrigés de la page — à vérifier
        // visuellement contre le plan imprimé du cahier.
        num: 12, page: 76,
        instruction: "DELF A1 — Compréhension des écrits. Annonce « Casting pour la série Dix pour cent ».",
        vi: "Đọc thông báo tuyển diễn viên và trả lời câu hỏi — câu 5 (bản đồ) chưa xác nhận chắc chắn, xem note.",
        type: "choice",
        items: [
          { q: "1. La série cherche une femme…", options: ["brune", "châtain", "blonde"], answer: "châtain" },
          { q: "2. Quel âge doit avoir l'acteur ?", options: ["25 ans", "30 ans", "45 ans"], answer: "45 ans" },
          { q: "3. Quand est le casting ?", options: ["Le matin", "L'après-midi", "Le soir"], answer: "Le matin" },
          { q: "4. Comment est-ce que vous allez au casting ?", options: ["À vélo", "En bus", "En métro"], answer: "En bus" },
          { q: "5. Quel est le chemin pour aller au casting ? (3 plans A/B/C, ⚠️ voir note)", options: ["A", "B", "C"], answer: "B" },
        ],
      },
      {
        num: 13, page: 77,
        instruction: "DELF A1 — Production orale. Partie 3 de l'épreuve : jeu de rôle « Au club du quartier » (horaires, jours, prix, professeur, choisir une activité et payer l'inscription).",
        vi: "Đóng vai hỏi thông tin về một câu lạc bộ khu phố (giờ học, ngày, giá, giáo viên) rồi đăng ký.",
        type: "fill",
        items: [
          { q: "Exemple de dialogue complet (modèle du corrigé) :", answer: "Vous : Bonjour ! – Employé : Bonjour ! – Vous : Votre club propose quelles activités ? – Employé : Nous avons beaucoup d'activités : des activités sportives, des activités culturelles… Qu'est-ce que vous aimez ? – Vous : Vous avez des cours de musique ? – Employé : Non, nous n'avons pas de cours de musique mais nous avons des cours de théâtre et de dessin. Nos professeurs sont très sympas et sérieux. – Vous : J'aime bien le théâtre. C'est aussi pour les débutants ? – Employé : Oui, bien sûr. – Vous : Qui est le professeur ? – Employé : C'est Mme Cébron. C'est une comédienne professionnelle. – Vous : Elle est actrice dans un théâtre ? – Employé : Oui. Elle joue tous les samedis soir. – Vous : Ah, c'est intéressant ! Je voudrais m'inscrire au cours de théâtre. Les cours sont quel jour ? – Employé : Il y a trois cours par semaine : le mercredi après-midi à 15 h, le jeudi soir à 18 h et le samedi matin à 10 h. – Vous : Je travaille la journée, alors jeudi soir c'est bien. Le cours finit à quelle heure ? – Employé : Le cours dure 2 heures, il finit à 20 h. – Vous : Parfait. Et ça coûte combien ? – Employé : C'est 45 euros pour 3 mois. – Vous : Très bien, je peux payer par carte bancaire ? – Employé : Non, désolé, en espèces ou en chèque. – Vous : D'accord, je vais faire un chèque." },
        ],
      },
      {
        num: 14, page: 78,
        instruction: "Jeux — Retrouvez le message d'Adrien pour Aurélie (message codé, alphabet substitué a→z).",
        vi: "Giải mã tin nhắn của Adrien gửi Aurélie (thay thế chữ cái a→z).",
        type: "fill",
        items: [
          { q: "Message décodé :", answer: "Je peux t'inviter au restaurant ?" },
        ],
      },
      {
        // ⚠️ Note (cahier_unite_6.md) : le corrigé imprimé montre la grille
        // remplie, mais le texte brut extrait ne permet de lire distinctement
        // que 4 des 6 mots attendus ; les 2 mots manquants n'ont pas pu être
        // identifiés de façon fiable — à vérifier visuellement sur la page.
        num: 15, page: 78,
        instruction: "Jeux — Trouvez dans la grille 6 mots pour décrire le caractère d'une personne.",
        vi: "Tìm trong ô chữ 6 từ mô tả tính cách — chỉ 4/6 từ xác định được rõ ràng, xem note.",
        type: "fill",
        items: [
          { q: "4 des 6 mots identifiables dans le corrigé imprimé :", answer: "calme, drôle, sociable, dynamique" },
        ],
      },
      {
        num: 16, page: 78,
        instruction: "Jeux — Qui suis-je ? Associez la description à la célébrité (francophone).",
        vi: "Đọc mô tả và đoán tên người nổi tiếng (Pháp/Bỉ/Thụy Sĩ) tương ứng.",
        type: "fill",
        items: [
          { q: "Cheveux mi-longs et bruns, mince, timide mais grand(e) acteur(-trice).", answer: "Marion Cotillard" },
          { q: "Cheveux châtains, Suisse, sportif(-ve).", answer: "Roger Federer" },
          { q: "Jeune et mince, grande bouche, yeux gris-vert, cheveux courts, Belge, sociable.", answer: "Stromae" },
          { q: "Jeune et sportif(-ve), cheveux très courts et noirs, généreux(-se) et dynamique, aime le foot.", answer: "Kylian Mbappé" },
          { q: "Jeune, cheveux blonds et longs, yeux marron, aime la musique, Belge.", answer: "Angèle" },
        ],
      },
    ],
  },

  u7: {

    // ── Grammaire, keyed by grammar point index in editoGrammar.js's "g7" ──
    // g7 has 5 points, all with a matching cahier "Grammaire" page — except
    // p4 "Verbe connaître" which has no dedicated page and no embedded drill
    // anywhere else in this unit's cahier (unlike u5/u6's embedded verb
    // points) — see cahier_unite_7.md.
    grammar: {

      // p0 — Le passé composé (1) avec AVOIR (cahier p. 79)
      p0: [
        {
          // ⚠️ Note (cahier_unite_7.md) : le corrigé imprimé donne la
          // séquence « a. passé composé – b. présent – c. passé composé –
          // d. présent – e. présent – f. passé composé – g. passé composé –
          // h. présent », reproduite telle quelle.
          num: 1, page: 79, audioSrc: piste(70),
          instruction: "Présent ou passé composé ? Écoutez et cochez.",
          vi: "Nghe và xác định câu ở thì hiện tại hay thì quá khứ kép (passé composé).",
          type: "choice",
          items: [
            { q: "a.", options: ["présent", "passé composé"], answer: "passé composé" },
            { q: "b.", options: ["présent", "passé composé"], answer: "présent" },
            { q: "c.", options: ["présent", "passé composé"], answer: "passé composé" },
            { q: "d.", options: ["présent", "passé composé"], answer: "présent" },
            { q: "e.", options: ["présent", "passé composé"], answer: "présent" },
            { q: "f.", options: ["présent", "passé composé"], answer: "passé composé" },
            { q: "g.", options: ["présent", "passé composé"], answer: "passé composé" },
            { q: "h.", options: ["présent", "passé composé"], answer: "présent" },
          ],
        },
        {
          num: 2, page: 79,
          instruction: "Associez le sujet et le verbe conjugué.",
          vi: "Nối chủ ngữ với động từ chia đúng ở thì passé composé.",
          type: "match",
          pairs: [
            { l: "J'", r: "ai déménagé à Paris." },
            { l: "Ils", r: "ont visité un studio." },
            { l: "Tu", r: "as trouvé un canapé et deux fauteuils." },
            { l: "Elle", r: "a cherché une table." },
            { l: "Vous", r: "avez décoré votre salon." },
          ],
        },
        {
          num: 3, page: 79,
          instruction: "Mettez les verbes au passé composé.",
          vi: "Chuyển câu ở thì hiện tại sang thì passé composé (thời gian trong quá khứ).",
          type: "fill",
          items: [
            { q: "Maintenant, tu cherches un logement. (L'année dernière, …)", answer: "Tu as cherché un logement." },
            { q: "Cet après-midi, vous trouvez un appartement. (La semaine dernière, …)", answer: "Vous avez trouvé un appartement." },
            { q: "Aujourd'hui, ils achètent un lave-linge. (Il y a trois mois, …)", answer: "Ils ont acheté un lave-linge." },
            { q: "Ce soir, je visite une maison. (Hier soir, …)", answer: "J'ai visité une maison." },
            { q: "En septembre, elle ne déménage pas à Lyon. (Le mois dernier, …)", answer: "Elle n'a pas déménagé." },
          ],
        },
        {
          // ⚠️ Note (cahier_unite_7.md) : l'énoncé imprimé de cet exercice
          // saute la lettre « d » (numérotation a, b, c, e, f dans le cahier
          // source) ; reproduit fidèlement sans inventer d'énoncé.
          num: 4, page: 79,
          instruction: "Conjuguez les verbes au passé composé.",
          vi: "Chia động từ ở thì passé composé để hoàn thành câu — câu « d » manquante dans l'énoncé imprimé, voir note.",
          type: "fill",
          items: [
            { q: "a. Ma sœur (trouver) ……… un frigo.", answer: "a trouvé" },
            { q: "b. Vous (déménager) ……… la semaine dernière ?", answer: "avez déménagé" },
            { q: "c. Nous (habiter) ……… dix ans dans cette maison.", answer: "avons habité" },
            { q: "e. Tu (chercher) ……… un logement ?", answer: "as cherché" },
            { q: "f. J'(visiter) ……… un beau studio.", answer: "ai visité" },
          ],
        },
      ],

      // p1 — Les prépositions de lieu (2) (cahier p. 80)
      p1: [
        {
          num: 2, page: 80, audioSrc: piste(71),
          instruction: "Écoutez et complétez les phrases avec les prépositions de lieu.",
          vi: "Nghe và điền giới từ chỉ vị trí phù hợp.",
          type: "fill",
          items: [
            { q: "Le fauteuil est ……… du canapé.", answer: "à gauche" },
            { q: "Le tapis est ……… la table.", answer: "sous" },
            { q: "Il y a une petite table ronde ……… le fauteuil et le canapé.", answer: "derrière" },
            { q: "La petite table ronde est ……… de la grande plante.", answer: "à droite" },
            { q: "……… la table carrée, il y a une plante et des objets.", answer: "Sur" },
            { q: "Les fenêtres sont ……… le canapé.", answer: "derrière" },
          ],
        },
        {
          num: 3, page: 80,
          instruction: "Observez les dessins et écrivez les 4 différences (Exemple : L'armoire est à gauche de la fenêtre. (image A) / L'armoire est à droite de la fenêtre. (image B)).",
          vi: "So sánh hai hình vẽ và tìm 4 điểm khác nhau, diễn đạt bằng giới từ chỉ vị trí.",
          type: "fill",
          items: [
            { q: "a. Image A : Le tapis est à côté du lit → Image B :", answer: "Le tapis est sous le lit" },
            { q: "b. Image A : L'ordinateur est à gauche de la plante → Image B :", answer: "L'ordinateur est à droite de la plante" },
            { q: "c. Image A : La chaise est devant le bureau → Image B :", answer: "La chaise est sous le bureau" },
            { q: "d. Image A : Il y a une télévision → Image B :", answer: "Il n'y a pas de télévision" },
          ],
        },
      ],

      // p2 — L'obligation et l'interdiction (1) (cahier p. 82)
      p2: [
        {
          num: 1, page: 82, audioSrc: piste(74),
          instruction: "Écoutez les phrases et cochez la bonne réponse.",
          vi: "Nghe và xác định câu diễn đạt sự bắt buộc, yêu cầu lịch sự hay cấm đoán.",
          type: "choice",
          items: [
            { q: "a.", options: ["obligation", "demande", "interdiction"], answer: "obligation" },
            { q: "b.", options: ["obligation", "demande", "interdiction"], answer: "interdiction" },
            { q: "c.", options: ["obligation", "demande", "interdiction"], answer: "demande" },
            { q: "d.", options: ["obligation", "demande", "interdiction"], answer: "interdiction" },
            { q: "e.", options: ["obligation", "demande", "interdiction"], answer: "interdiction" },
            { q: "f.", options: ["obligation", "demande", "interdiction"], answer: "obligation" },
          ],
        },
        {
          num: 2, page: 82,
          instruction: "Lisez le règlement de l'immeuble et cochez les phrases correctes (Merci de fermer la porte d'entrée. / Défense de fumer dans l'ascenseur. / Prière de jeter vos poubelles dans le local à poubelles. / Interdiction de faire du bruit après 22h. / Défense de laisser votre vélo dans l'entrée.).",
          vi: "Đọc nội quy tòa nhà và xác định câu nào diễn đạt đúng nội dung nội quy.",
          type: "truefalse",
          items: [
            { q: "a. Il faut fermer la porte d'entrée.", answer: false },
            { q: "b. Il est possible de fumer dans l'ascenseur.", answer: false },
            { q: "c. Il est interdit de jeter les poubelles dans le local à poubelles.", answer: false },
            { q: "d. Il n'est pas possible de faire du bruit après 22h.", answer: true },
            { q: "e. Il est interdit de laisser son vélo dans l'entrée.", answer: true },
          ],
        },
        {
          num: 3, page: 82,
          instruction: "Remettez les phrases dans l'ordre.",
          vi: "Sắp xếp lại từ để tạo câu diễn đạt yêu cầu/cấm đoán trong khu chung cư.",
          type: "order",
          items: [
            { tokens: ["Prière", "de", "trier", "vos", "déchets."],
              answer: ["Prière", "de", "trier", "vos", "déchets."] },
            { tokens: ["Merci", "de", "tenir", "votre", "chien", "en", "laisse."],
              answer: ["Merci", "de", "tenir", "votre", "chien", "en", "laisse."] },
            { tokens: ["Il", "est", "interdit", "de", "fumer", "dans", "les", "parties", "communes."],
              answer: ["Il", "est", "interdit", "de", "fumer", "dans", "les", "parties", "communes."] },
            { tokens: ["Ne", "laissez", "pas", "la", "porte", "d'entrée", "ouverte."],
              answer: ["Ne", "laissez", "pas", "la", "porte", "d'entrée", "ouverte."] },
            { tokens: ["Défense", "de", "jouer", "au", "ballon", "dans", "le", "hall."],
              answer: ["Défense", "de", "jouer", "au", "ballon", "dans", "le", "hall."] },
          ],
        },
        {
          num: 4, page: 82,
          instruction: "Regardez les panneaux et soulignez la phrase correcte du règlement de l'immeuble (Exemple : (panneau vélo interdit) → Interdiction de laisser votre vélo dans le local.).",
          vi: "Nhìn biển báo và chọn câu nội quy đúng nghĩa với biển báo.",
          type: "choice",
          items: [
            { q: "a. (fumer barré)", options: ["Il est interdit de fumer.", "Prière de fumer."], answer: "Il est interdit de fumer." },
            { q: "b. (fête barrée)", options: ["Merci de respecter les fêtes des voisins.", "Interdiction de faire du bruit après 22h."], answer: "Interdiction de faire du bruit après 22h." },
            { q: "c. (déchets)", options: ["Ne pas trier les déchets.", "Merci de trier les déchets."], answer: "Merci de trier les déchets." },
            { q: "d. (pelouse barrée)", options: ["Prière de marcher sur la pelouse.", "Défense de marcher sur la pelouse."], answer: "Défense de marcher sur la pelouse." },
            { q: "e. (chien en laisse)", options: ["Prière de tenir les chiens en laisse.", "Il est interdit de tenir les chiens en laisse."], answer: "Prière de tenir les chiens en laisse." },
          ],
        },
      ],

      // p3 — Les pronoms COD (1) : le, la, l', les (cahier p. 83)
      p3: [
        {
          num: 1, page: 83,
          instruction: "Associez les phrases.",
          vi: "Thay danh từ bổ ngữ trực tiếp bằng đại từ le, la, les phù hợp.",
          type: "match",
          pairs: [
            { l: "Il contacte ses voisins.", r: "Il les contacte." },
            { l: "Il contacte Alice.", r: "Il la contacte." },
            { l: "Il contacte le peintre.", r: "Il le contacte." },
            { l: "Il contacte le plombier et le serrurier.", r: "Il les contacte." },
            { l: "Il contacte l'informaticien.", r: "Il le contacte." },
          ],
        },
        {
          // ⚠️ Note (cahier_unite_7.md) : le corrigé imprimé donne la
          // séquence brute « a. l' – b. les – c. l' – d. les – e. le – f. la
          // – g. les – h. le » ; cette séquence est retenue telle quelle
          // (elle correspond bien à la transcription audio complète).
          num: 2, page: 83, audioSrc: piste(75),
          instruction: "Cochez quand vous entendez le pronom le, la, l' ou les.",
          vi: "Nghe và đánh dấu đại từ bổ ngữ trực tiếp nghe được (le, la, l', les).",
          type: "fill",
          items: [
            { q: "a.", answer: "l'" },
            { q: "b.", answer: "les" },
            { q: "c.", answer: "l'" },
            { q: "d.", answer: "les" },
            { q: "e.", answer: "le" },
            { q: "f.", answer: "la" },
            { q: "g.", answer: "les" },
            { q: "h.", answer: "le" },
          ],
        },
        {
          num: 3, page: 83,
          instruction: "Répondez aux questions avec les pronoms le, la, l', les (Exemple : Tu appelles l'informaticien ? → Oui, je l'appelle.).",
          vi: "Trả lời câu hỏi bằng đại từ bổ ngữ trực tiếp thay cho danh từ.",
          type: "fill",
          items: [
            { q: "Vous contactez l'électricien ?", answer: "Oui, je le contacte." },
            { q: "Vous aidez votre voisine ?", answer: "Oui, je l'aide." },
            { q: "Le plombier répare la fuite d'eau ?", answer: "Oui, il la répare." },
            { q: "Marie connaît ses voisins ?", answer: "Non, elle ne les connaît pas." },
            { q: "Tu rencontres Paul et sa femme dans la résidence ?", answer: "Oui, je les rencontre." },
          ],
        },
        {
          num: 4, page: 83,
          instruction: "Devinettes. Que remplacent les pronoms le, la, les ? (Exemple : Je l'ouvre quand je rentre chez moi → la porte)",
          vi: "Đoán từ mà đại từ le/la/les thay thế trong mỗi câu đố.",
          type: "fill",
          items: [
            { q: "Je l'appelle pour réparer ma serrure ou ouvrir ma porte.", answer: "le serrurier" },
            { q: "Nous les trions avant de les jeter.", answer: "les déchets" },
            { q: "Vous le prenez pour monter à votre appartement.", answer: "l'ascenseur" },
            { q: "Je les vois tous les jours parce qu'ils habitent dans mon immeuble.", answer: "les voisins" },
            { q: "Tu le contactes pour réparer ton ordinateur.", answer: "l'informaticien" },
          ],
        },
      ],
    },

    // ── Vocabulaire (cahier p. 81 "Le logement, l'équipement" + p. 84 ──
    // "L'immeuble, les réparations"). Custom STEP_GROUPS_U7: v1_vocab
    // (u7g1/u7g2/u7g4, "Nhà ở · các phòng · đồ điện gia dụng"), v2_vocab
    // (u7g3/u7g5/u7g9, "Đồ nội thất · trang trí · giới từ chỉ vị trí"),
    // v3_vocab (u7g6/u7g7/u7g8, "Toà nhà · sự cố · thợ sửa chữa"). The
    // cahier's p.81 vocabulaire page maps to v1_vocab (logement, meubles par
    // pièce, équipement) and p.84 maps to v3_vocab (immeuble, réparations,
    // professionnels). v2_vocab has no dedicated cahier vocab exercise for
    // this unit — its "prépositions de lieu" theme is already drilled under
    // grammar p1 (cahier p.80), and its meubles/décoration words appear
    // only within p.81's exercises, filed under v1_vocab there.
    vocab: {
      v1_vocab: [
        {
          num: 1, page: 81,
          instruction: "Complétez les phrases avec les mots suivants (rez-de-chaussée – déménager – étage – jardin – surface).",
          vi: "Điền từ vựng về nhà ở (chuyển nhà, tầng, tầng trệt, diện tích, vườn).",
          type: "fill",
          bank: ["rez-de-chaussée", "déménager", "étage", "jardin", "surface"],
          items: [
            { q: "Paul habite à Lyon mais il va travailler à Grenoble. Il va ……… demain.", answer: "déménager" },
            { q: "Dans notre maison, au ……… il y a une cuisine, un salon, une chambre et une salle de bains. À l'……… il y a deux chambres et des toilettes. (2 từ)", answer: "rez-de-chaussée étage" },
            { q: "Notre appartement a une grande ……… : environ 120 m².", answer: "surface" },
            { q: "Nous recherchons une maison avec un ……… pour nos enfants. Ils aiment jouer dehors !", answer: "jardin" },
          ],
        },
        {
          num: 2, page: 81,
          instruction: "Regardez les images et écrivez les meubles et les objets dans chaque pièce (un fauteuil – un four – un réfrigérateur – un lit – une armoire – une plante – une table basse – un canapé – un bureau – une cuisinière – un tableau – une chaise).",
          vi: "Xếp đồ nội thất vào đúng phòng (bếp, phòng khách, phòng ngủ).",
          type: "fill",
          items: [
            { q: "Cuisine :", answer: "un réfrigérateur, un four, une cuisinière" },
            { q: "Salon :", answer: "un fauteuil, une table basse, un canapé, une plante, un tableau" },
            { q: "Chambre :", answer: "une armoire, un bureau, un lit (+ une chaise, donnée en exemple dans l'énoncé)" },
          ],
        },
        {
          // ⚠️ Note (cahier_unite_7.md) : la liste de mots proposée contient
          // « lave-linge », qui n'apparaît finalement dans aucun blanc du
          // corrigé (c'est un intrus — l'appartement décrit n'a pas de
          // lave-linge, confirmé aussi par la compréhension orale p.85).
          num: 3, page: 81, audioSrc: piste(72),
          instruction: "Écoutez le message et complétez les phrases avec les mots suivants (chaises – four – lave-linge – frigo – canapé – équipée – cuisinière – table – loyer – douche – surface). Attention, un mot est un intrus.",
          vi: "Nghe tin nhắn rao cho thuê studio và điền từ vựng về nội thất, tiện nghi — chú ý có 1 từ dư (lave-linge), xem note.",
          type: "fill",
          bank: ["chaises", "four", "lave-linge", "frigo", "canapé", "équipée", "cuisinière", "table", "loyer", "douche", "surface"],
          items: [
            { q: "LOUE STUDIO — ……… : 456 €", answer: "Loyer" },
            { q: "……… : 22 m²", answer: "Surface" },
            { q: "Meublé avec un ………, une ………, des ……… . (3 từ)", answer: "canapé table chaises" },
            { q: "Cuisine ……… avec un ………, une ………, un ……… . (4 từ)", answer: "équipée four cuisinière frigo" },
            { q: "Salle de bains avec ……… .", answer: "douche" },
          ],
        },
      ],

      v3_vocab: [
        {
          num: 1, page: 84, audioSrc: piste(76),
          instruction: "Écoutez les problèmes de ces personnes. Elles contactent quel professionnel ?",
          vi: "Nghe các vấn đề và xác định cần liên hệ thợ chuyên môn nào.",
          type: "fill",
          items: [
            { q: "a. (ordinateur en panne)", answer: "un informaticien" },
            { q: "b. (clés perdues)", answer: "un serrurier" },
            { q: "c. (murs à repeindre)", answer: "un peintre" },
            { q: "d. (électricité coupée)", answer: "un électricien" },
            { q: "e. (fuite d'eau)", answer: "un plombier" },
          ],
        },
        {
          num: 2, page: 84,
          instruction: "Complétez le dialogue avec les mots suivants (porte d'entrée – plombier – voisin – réparer – résidence – appartement).",
          vi: "Điền từ vào hội thoại giữa hàng xóm mới về sự cố rò rỉ nước.",
          type: "fill",
          bank: ["porte d'entrée", "plombier", "voisin", "réparer", "résidence", "appartement"],
          items: [
            { q: "1. (dans l'ordre du dialogue)", answer: "voisin" },
            { q: "2.", answer: "appartement" },
            { q: "3.", answer: "résidence" },
            { q: "4.", answer: "plombier" },
            { q: "5.", answer: "réparer" },
            { q: "6.", answer: "porte d'entrée" },
          ],
        },
        {
          num: 3, page: 84,
          instruction: "Associez les débuts et fins de phrases.",
          vi: "Nối đầu câu và cuối câu để tạo câu hoàn chỉnh về nhà ở, sửa chữa.",
          type: "match",
          pairs: [
            { l: "Merci de trier vos déchets avant", r: "de les jeter à la poubelle." },
            { l: "J'ai visité un appartement dans le centre mais", r: "j'ai préféré le studio à côté de la gare." },
            { l: "Tu as téléphoné au plombier pour", r: "réparer la fuite d'eau dans la salle de bains." },
            { l: "Il a visité l'appartement de mon voisin et", r: "il a décidé de déménager en décembre." },
            { l: "Pour décorer notre salon", r: "nous allons mettre des tableaux." },
          ],
        },
      ],
    },

    // ── Phonie-graphie (cahier p. 81 voyelles [e]/[ɛ]). The p.84 phonie- ──
    // graphie ("le « e » final non prononcé", piste 77) is a "listen and
    // repeat" dialogue exercise with no fill-in blanks or printed corrigé to
    // check against — like the free-answer Jeux items, it is intentionally
    // excluded here. The p.81 page also has no second (dictée) activity
    // printed, unlike most other units' phono pages — see cahier_unite_7.md.
    phono: [
      {
        num: 1, page: 81, audioSrc: piste(73),
        instruction: "Phonie-graphie : les voyelles [e] et [ɛ]. Écoutez les phrases et indiquez combien de fois vous entendez [e] et [ɛ] (format : e/ɛ). Puis répétez.",
        vi: "Nghe và đếm số lần xuất hiện âm [e] (như trong été) và [ɛ] (như trong fenêtre).",
        type: "fill",
        items: [
          { q: "a. La semaine prochaine, je vais déménager.", answer: "3/3" },
          { q: "b. Dans cette pièce, il y a deux fenêtres avec une belle vue.", answer: "0/5" },
          { q: "c. Au vide-grenier, nous avons acheté des vêtements pas chers.", answer: "3/2" },
          { q: "d. La semaine dernière, elles ont trouvé des objets de décoration.", answer: "3/5" },
          { q: "e. Cet été, vous allez être en vacances et voyager à bicyclette.", answer: "5/3" },
        ],
      },
    ],

    // ── Bilan (cahier p. 85 CO+PE, p. 86-87 Bilan linguistique /40, ──
    // p. 88-89 DELF A1, p. 90 Jeux). Jeux activité 2 ("grille de mots
    // cachés" — positions not reproducible, but the target word list is
    // known, kept as a single item) and activité 3 ("le petit bac", a
    // free-answer group game) are handled per their own notes below;
    // Production orale p.89 (jeu de cartes-mots) is kept as a single fill
    // item with the corrigé's example questions.
    bilan: [
      {
        // ⚠️ Note (cahier_unite_7.md) : dans le dialogue transcrit, c'est
        // Mona (pas Clarisse) qui a le problème d'ordinateur, et c'est
        // Clarisse qui recommande son collègue informaticien à Mona — la
        // numérotation imprimée des questions 8/9 semble inverser les deux
        // personnages. Reproduit tel quel, sans correction.
        num: 1, page: 85, audioSrc: piste(78),
        instruction: "Compréhension orale — « Nouveau logement ». Écoutez le dialogue et répondez aux questions.",
        vi: "Nghe hội thoại về căn hộ mới và trả lời câu hỏi — có khả năng nhầm lẫn tên nhân vật trong đề gốc ở câu 8/9, xem note.",
        type: "fill",
        items: [
          { q: "1. Pourquoi Mona est-elle fatiguée ?", answer: "Elle est fatiguée parce qu'elle ne peut pas dormir : ses voisins font du bruit." },
          { q: "2. Mona : a déménagé / va déménager.", answer: "va déménager" },
          { q: "4. L'appartement fait ……… mètres carrés.", answer: "45" },
          { q: "6. Que peut voir Mona derrière son appartement ?", answer: "Un joli jardin." },
          { q: "7. Dans le salon, il y a :", answer: "un canapé et deux fauteuils." },
          { q: "8. Quel est le problème de Clarisse ? (⚠️ voir note — c'est en réalité Mona qui a ce problème)", answer: "un problème avec son ordinateur" },
          { q: "9. Le collègue de Mona peut aider Clarisse parce qu'il est :", answer: "informaticien." },
        ],
      },
      {
        num: 2, page: 85,
        instruction: "Compréhension orale — Vrai ou faux ?",
        vi: "Nghe hội thoại và xác định đúng/sai.",
        type: "truefalse",
        items: [
          { q: "3. L'appartement est devant la bibliothèque.", answer: true },
          { q: "5. Dans la cuisine, il y a un four, un lave-linge, un frigo et une cuisinière.", answer: false },
        ],
      },
      {
        num: 3, page: 85,
        instruction: "Production écrite — Vous partez en vacances et vous souhaitez louer votre studio. Vous écrivez une annonce pour décrire votre studio meublé et expliquer pourquoi il est agréable.",
        vi: "Viết một mẩu quảng cáo cho thuê studio, mô tả nội thất và lý do căn hộ dễ chịu.",
        type: "fill",
        items: [
          { q: "Rédigez l'annonce complète.", answer: "Location dans le centre de Lyon. C'est un studio très agréable et confortable. Il a une grande pièce avec un coin cuisine, une cuisinière et un frigo. La salle de bain est totalement neuve. L'appartement est meublé. Dans le salon, il y a un canapé, un meuble avec la télévision et une table basse. Le lit est très confortable et l'appartement est très calme. Les voisins ne font pas de bruit. Vous allez l'adorer." },
        ],
      },
      {
        num: 4, page: 86,
        instruction: "Bilan linguistique — Grammaire : Conjuguez les verbes au passé composé. (/5)",
        vi: "Chia động từ ở thì passé composé.",
        type: "fill",
        items: [
          { q: "Mes voisins (déménager) ……… hier.", answer: "ont déménagé" },
          { q: "Vous (trouver) ……… une belle maison !", answer: "avez trouvé" },
          { q: "J'(décorer) ……… ma chambre.", answer: "ai décoré" },
          { q: "Tu (visiter) ……… combien d'appartements ?", answer: "as visité" },
          { q: "Paul (acheter) ……… un réfrigérateur et une machine à laver.", answer: "a acheté" },
        ],
      },
      {
        num: 5, page: 86,
        instruction: "Bilan linguistique — Grammaire : Remettez les phrases dans l'ordre. (/5)",
        vi: "Sắp xếp lại từ để tạo câu.",
        type: "fill",
        items: [
          { q: "du / canapé / La lampe / est / à côté", answer: "La lampe est à côté du canapé." },
          { q: "ai / un appartement / à gauche / J'/ du / cinéma / trouvé", answer: "J'ai trouvé un appartement à gauche du cinéma." },
          { q: "Mon /dormir / le fauteuil / aime / sous / chat", answer: "Mon chat aime dormir sous le fauteuil." },
          { q: "sur / oublié / as / clés / tes / Tu / la table", answer: "Tu as oublié tes clés sur la table." },
          { q: "est / du frigo / La machine à laver / à droite", answer: "La machine à laver est à droite du frigo." },
        ],
      },
      {
        num: 6, page: 86,
        instruction: "Bilan linguistique — Grammaire : Cochez la phrase de même sens. (/5)",
        vi: "Chọn câu có nghĩa tương đương.",
        type: "fill",
        items: [
          { q: "Défense de fumer !", answer: "Je ne dois pas fumer." },
          { q: "Prière de respecter les voisins après 22 h.", answer: "Vous ne devez pas déranger les voisins le soir." },
          { q: "Interdiction de manger dans la classe.", answer: "Vous ne pouvez pas manger dans la classe." },
          { q: "Merci de trier les déchets.", answer: "Il est nécessaire de trier les déchets." },
          { q: "Fermez la porte à clé.", answer: "Vous devez fermer la porte à clé." },
        ],
      },
      {
        num: 7, page: 86,
        instruction: "Bilan linguistique — Grammaire : Quel pronom remplace les mots soulignés ? (/5)",
        vi: "Xác định đại từ thay thế cho danh từ được gạch chân.",
        type: "fill",
        items: [
          { q: "Il visite l'appartement ce soir.", answer: "le" },
          { q: "Elle connaît son voisin.", answer: "le" },
          { q: "Vous mettez la télévision en face du canapé.", answer: "la" },
          { q: "Il répare le lave-linge et la cuisinière.", answer: "les" },
          { q: "Notre chat adore cet endroit de l'appartement.", answer: "l'" },
        ],
      },
      {
        // ⚠️ Note (cahier_unite_7.md) : le corrigé disponible pour cette
        // page semble en réalité provenir de l'exercice 4 des Jeux p.90
        // (mots croisés), pas de cet exercice 1 basé sur des images de
        // meubles. Les réponses ci-dessous sont une estimation prudente
        // basée sur le vocabulaire de l'unité (meubles cités p.81), à
        // vérifier visuellement contre les images imprimées.
        num: 8, page: 87,
        instruction: "Bilan linguistique — Vocabulaire : Écrivez le nom des meubles et des objets (exercice basé sur 5 images). (/5)",
        vi: "Viết tên đồ nội thất theo hình minh hoạ — đáp án là ước tính thận trọng, xem note.",
        type: "fill",
        items: [
          { q: "a. (meuble illustré)", answer: "FAUTEUIL" },
          { q: "b. (meuble illustré)", answer: "RÉFRIGÉRATEUR" },
          { q: "c. (meuble illustré)", answer: "CANAPÉ" },
          { q: "d. (meuble illustré)", answer: "LIT" },
          { q: "e. (meuble illustré)", answer: "TABLEAU" },
        ],
      },
      {
        // ⚠️ Note (cahier_unite_7.md) : l'énoncé propose 6 activités (a-f)
        // mais le corrigé imprimé ne donne que 5 correspondances (a-e) ;
        // f → 2 est une déduction logique (prendre une douche → salle de
        // bains), non confirmée par le corrigé imprimé.
        num: 9, page: 87,
        instruction: "Bilan linguistique — Vocabulaire : Lisez les phrases et associez une activité à une pièce de la maison. (/5)",
        vi: "Nối hoạt động với phòng tương ứng trong nhà — mục f là suy luận, chưa xác nhận với đáp án in, xem note.",
        type: "match",
        pairs: [
          { l: "Gabrielle prépare le dîner.", r: "dans la cuisine." },
          { l: "Je me brosse les dents.", r: "dans la salle de bains." },
          { l: "Juliette dort.", r: "dans la chambre." },
          { l: "Les enfants jouent au ballon.", r: "dans le jardin." },
          { l: "On regarde la télévision.", r: "dans le salon." },
        ],
      },
      {
        num: 10, page: 87,
        instruction: "Bilan linguistique — Vocabulaire : Complétez les phrases avec les mots suivants (la pelouse – appartements – voisins – la porte d'entrée – l'escalier). (/5)",
        vi: "Điền từ vựng về toà nhà.",
        type: "fill",
        bank: ["la pelouse", "appartements", "voisins", "la porte d'entrée", "l'escalier"],
        items: [
          { q: "L'ascenseur ne fonctionne plus, je vais monter par ……… .", answer: "l'escalier" },
          { q: "Dans notre résidence, il est interdit de marcher sur ……… .", answer: "la pelouse" },
          { q: "Mes ……… sont très gentils, je les rencontre souvent dans l'ascenseur.", answer: "voisins" },
          { q: "Il est nécessaire de fermer ……… de l'immeuble.", answer: "la porte d'entrée" },
          { q: "Dans notre immeuble, il y a 10 ……… .", answer: "appartements" },
        ],
      },
      {
        num: 11, page: 87,
        instruction: "Bilan linguistique — Vocabulaire : Cochez la bonne réponse. (/5)",
        vi: "Chọn đáp án đúng về nghề nghiệp thợ sửa chữa.",
        type: "fill",
        items: [
          { q: "Le plombier", answer: "répare les fuites d'eau." },
          { q: "Le peintre", answer: "change la couleur des murs." },
          { q: "Le serrurier", answer: "répare des serrures." },
          { q: "L'informaticien", answer: "répare des ordinateurs." },
          { q: "L'électricien", answer: "répare une lampe." },
        ],
      },
      {
        // ⚠️ Note (cahier_unite_7.md) : la transcription mentionne un
        // problème de fuite d'eau (pas d'électricité), mais la réponse
        // imprimée à la question 1 est pourtant B (l'électricité) —
        // contradiction reproduite fidèlement sans harmonisation.
        num: 12, page: 88, audioSrc: piste(79),
        instruction: "DELF A1 — Compréhension de l'oral (4 points). Message vocal (répondeur du bureau).",
        vi: "Nghe tin nhắn thoại về sự cố ở văn phòng và trả lời câu hỏi — lưu ý mâu thuẫn giữa lời thoại và đáp án in sẵn ở câu 1, xem note.",
        type: "choice",
        items: [
          { q: "1. Au bureau, il y a un problème avec… (⚠️ voir note)", options: ["A. la fuite d'eau", "B. l'électricité", "C. l'ascenseur"], answer: "B. l'électricité" },
          { q: "2. Où sont rangés les livres ?", options: ["A. Dans le salon", "B. Dans le couloir", "C. Dans la chambre"], answer: "B. Dans le couloir" },
          { q: "3. Où est l'ordinateur ?", options: ["A. À droite de l'armoire", "B. À gauche de l'armoire", "C. Sur l'armoire"], answer: "B. À gauche de l'armoire" },
          { q: "4. À quelle heure est la réunion mardi ?", options: ["A. À 13 h 30", "B. À 15 h 30", "C. À 17 h 30"], answer: "B. À 15 h 30" },
        ],
      },
      {
        num: 13, page: 88,
        instruction: "DELF A1 — Compréhension des écrits. Email de Karim, ami belge.",
        vi: "Đọc email của Karim và trả lời câu hỏi (nội dung: chuyển nhà, tầng, đồ đạc).",
        type: "choice",
        items: [
          { q: "1. Pourquoi Karim déménage ?", options: ["A. Il a acheté une maison.", "B. Il va avoir un enfant.", "C. Il a un nouveau travail."], answer: "B. Il va avoir un enfant." },
          { q: "2. Qu'est-ce que Karim a acheté ? (image)", options: ["A", "B", "C"], answer: "A" },
          { q: "3. À quel étage est l'appartement ?", options: ["A. Au 3e.", "B. Au 5e.", "C. Au 2e."], answer: "B. Au 5e." },
          { q: "4. Dans l'immeuble, il n'y a pas…", options: ["A. de local à vélos.", "B. d'ascenseur.", "C. de balcon."], answer: "B. d'ascenseur." },
          { q: "5. Qu'est-ce que Karim prépare ? (image)", options: ["A", "B", "C"], answer: "C" },
        ],
      },
      {
        num: 14, page: 89,
        instruction: "DELF A1 — Production écrite (10 points). Formulaire d'inscription au vide-grenier.",
        vi: "Điền mẫu đơn đăng ký tham gia chợ đồ cũ (vide-grenier).",
        type: "fill",
        items: [
          { q: "Exemple de production complet (modèle du corrigé) :", answer: "Prénom : Anchali — Date de naissance : 01/12/2002 — Nationalité : thaïlandaise — Courriel : anchalitipa@gmail.com — Adresse (numéro et rue) : 32 rue Palatine — Pays : Belgique — Téléphone : 07 68 56 90 81 — Profession : comédienne — Meubles à vendre : une armoire et un fauteuil" },
        ],
      },
      {
        num: 15, page: 89,
        instruction: "DELF A1 — Production orale. Échange d'informations à partir de cartes-mots : Canapé ? Maison ? Adresse ? Jardin ? Chien ? Appartement ?",
        vi: "Đặt câu hỏi trao đổi thông tin dựa trên các từ khóa cho sẵn (nhà ở).",
        type: "fill",
        items: [
          { q: "Exemples de questions (modèle du corrigé) :", answer: "Canapé : Vous avez un canapé dans votre salon ? — Maison : Vous habitez dans une maison ou un appartement ? — Adresse : Quelle est votre adresse ? — Jardin : Vous avez un jardin ? — Chien : Vous préférez les chiens ou les chats ? — Appartement : Vous habitez quel appartement ?" },
        ],
      },
      {
        num: 16, page: 90,
        instruction: "Jeux — Devinettes.",
        vi: "Đoán từ vựng đồ nội thất qua các câu đố.",
        type: "fill",
        items: [
          { q: "Je suis confortable, je suis dans le salon.", answer: "canapé" },
          { q: "Je suis un meuble de la chambre pour dormir.", answer: "lit" },
          { q: "Je sers à ranger les vêtements, je suis dans la chambre.", answer: "armoire" },
          { q: "Je suis un objet utile dans la cuisine pour réchauffer un plat, une boisson.", answer: "micro-ondes" },
        ],
      },
      {
        num: 17, page: 90,
        instruction: "Jeux — Trouvez les mots dans la grille (positions non reproductibles — liste des mots à retrouver ci-dessous).",
        vi: "Tìm các từ trong ô chữ — vị trí trong bảng không trích xuất được, chỉ có danh sách từ cần tìm.",
        type: "fill",
        items: [
          { q: "10 mots à retrouver dans la grille :", answer: "appartement, escalier, réfrigérateur, tableau, lit, cuisine, chambre, fauteuil, canapé, four" },
        ],
      },
      {
        num: 18, page: 90,
        instruction: "Jeux — Trouvez les lettres pour compléter le mot.",
        vi: "Điền chữ cái còn thiếu để hoàn thành từ.",
        type: "fill",
        items: [
          { q: "F – – T – – I L", answer: "FAUTEUIL" },
          { q: "R – – R I – E R – T – U R", answer: "RÉFRIGÉRATEUR" },
          { q: "– M – E U – L E", answer: "IMMEUBLE" },
          { q: "D – – E N – G – R", answer: "DÉMÉNAGER" },
          { q: "– U I – I N – E R E", answer: "CUISINIÈRE" },
        ],
      },
      {
        // ⚠️ Note (cahier_unite_7.md) : le corrigé imprimé confirme
        // seulement les mots-clés de chaque étape de la charade (jeu de
        // sons oral), sans détailler le rapprochement phonétique complet.
        num: 19, page: 90,
        instruction: "Jeux — Charades. Qu'est-ce que c'est ?",
        vi: "Giải câu đố chữ (charade) — ghép các âm tiết để tạo thành từ vựng về nhà ở, xem note.",
        type: "fill",
        items: [
          { q: "Mon premier est un adjectif possessif féminin (ta) ; mon deuxième est une couleur (bleu) ; mon tout est un meuble de la cuisine ou du salon.", answer: "table" },
          { q: "Mon premier est une voyelle (a) ; mon deuxième est le contraire de « avec » (sans) ; mon troisième est le féminin de « frère » (sœur) ; mon tout monte et descend dans un immeuble.", answer: "ascenseur" },
        ],
      },
    ],
  },
};
