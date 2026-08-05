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
};
