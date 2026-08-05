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
};
