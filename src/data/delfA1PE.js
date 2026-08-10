// Production écrite — the SE PRÉPARER drills, « Le DELF A1 100 % réussite »
// p.74–79. The S'ENTRAÎNER half (Exercices 1–8, p.80–83) is in delfA1Book.js.
//
// The book splits these into two kinds, and so does this file:
//
//   PE_PREPARE — Activités 1 to 7, which have one right answer. Sorting a
//     jumbled form, copying details out of a letter, matching a consigne to the
//     text that answers it. They are keyed against the Corrigés (p.149) and
//     graded like any other exercise.
//
//   PE_TASKS — Activités 8 to 15, which are writing tasks. Nothing to grade
//     mechanically, so each carries the consigne, the points the consigne asks
//     for, and the book's own Proposition behind a reveal.
//
// Two documents are pictures rather than text: the handwriting face the book
// uses for Activité 5 and for production A of Activité 7 carries no usable
// Unicode mapping, so « Je m'appelle Rémi Blanchard » extracts as « Je m'appel
// Rémi Blnchr ». Both are cut by scripts/delf-a1-crop.py.

const DOC = "/delf-a1/docs";

// ── Objectif 1 · Se présenter (p.74–75) ──────────────────────────

// Activité 1 prints the form with every value against the wrong label, so the
// nine values are the choices for all nine questions.
const A1_VALUES = ["DELAYEN", "Évelyne", "14/03/1969", "evelyne.delayen@wana.fr",
                   "21 rue de la Saussière", "44000", "Nantes", "France", "02.40.41.93.36"];

const A2_VALUES = ["LOPEZ", "Esteban", "15 avenue de la Liberté", "59000",
                   "Lille", "07 86 54 79 02", "elopez@gmai.fr", "27 ans"];

const pair = (values, rows) =>
  rows.map(([label, answer]) => ({ q: label, options: values, answer }));

export const PE_PREPARE = [
  {
    objectif: 1, id: "pe-a1", label: "Activité 1", page: 74,
    setup: "Mettez les informations du formulaire dans l'ordre. Inscription à l'Atelier de lecture.",
    setupVi: "Phiếu này bị xếp lệch: mỗi giá trị đang nằm cạnh nhãn sai. Xếp lại cho đúng.",
    tip: "Chaque information a une forme reconnaissable : un code postal a 5 chiffres, un téléphone français en a 10, le nom de famille s'écrit en majuscules.",
    tipVi: "Nhận dạng theo hình thức: mã bưu điện 5 chữ số, điện thoại Pháp 10 chữ số, họ viết IN HOA — không cần đoán nghĩa.",
    questions: pair(A1_VALUES, [
      ["NOM", "DELAYEN"],
      ["Prénom", "Évelyne"],
      ["Date de naissance", "14/03/1969"],
      ["E-mail", "evelyne.delayen@wana.fr"],
      ["Adresse (n° et nom de la voie)", "21 rue de la Saussière"],
      ["Code postal", "44000"],
      ["Ville", "Nantes"],
      ["Pays", "France"],
      ["Téléphone", "02.40.41.93.36"],
    ]),
  },
  {
    objectif: 1, id: "pe-a2", label: "Activité 2", page: 74,
    setup: "Classez les mots dans la bonne case pour inscrire Esteban à une école de langues à Lille : 59000 – Esteban – 07 86 54 79 02 – 27 ans – LOPEZ – Lille – elopez@gmai.fr – 15 avenue de la Liberté.",
    setupVi: "Xếp 8 thông tin vào đúng ô của phiếu đăng ký học tiếng cho Esteban ở Lille.",
    questions: pair(A2_VALUES, [
      ["NOM", "LOPEZ"],
      ["Prénom", "Esteban"],
      ["Adresse", "15 avenue de la Liberté"],
      ["Code postal", "59000"],
      ["Ville", "Lille"],
      ["Téléphone", "07 86 54 79 02"],
      ["Adresse électronique", "elopez@gmai.fr"],
      ["Âge", "27 ans"],
    ]),
  },
  {
    objectif: 1, id: "pe-a3", label: "Activité 3", page: 75,
    setup: "Voici un bon de commande en ligne. Vous commandez deux shampoings (10 euros l'unité) et un pantalon (60 euros) sur internet. Remplissez le formulaire avec les informations demandées.",
    setupVi: "Điền đơn đặt hàng: 2 chai dầu gội (10 € / chai) và 1 cái quần (60 €).",
    tip: "Les informations de livraison — nom, adresse, pays, téléphone, e-mail — sont à vous : à l'examen vous inventez une identité. Ce qui se vérifie ici, c'est la commande elle-même.",
    tipVi: "Phần thông tin giao hàng là do bạn tự bịa (trong phòng thi cũng vậy). Phần chấm được ở đây là chính đơn hàng.",
    questions: [
      { q: "ARTICLE — qu'est-ce que vous commandez ?",
        options: ["2 shampoings et 1 pantalon", "1 shampoing et 2 pantalons", "2 shampoings seulement"],
        answer: "2 shampoings et 1 pantalon" },
      { q: "QUANTITÉ — combien d'articles au total ?",
        options: ["2", "3", "4"], answer: "3",
        note: "Deux shampoings plus un pantalon : la quantité compte les objets, pas les lignes." },
      { q: "PRIX — les deux shampoings",
        options: ["10 euros", "20 euros", "60 euros"], answer: "20 euros",
        note: "10 euros l'unité, et vous en commandez deux." },
      { q: "PRIX TOTAL",
        options: ["70 euros", "80 euros", "100 euros"], answer: "80 euros",
        note: "20 euros de shampoings + 60 euros de pantalon.",
        vi: "Lưu ý: Corrigés của sách in « 100 euros », nhưng 20 + 60 = 80 — đây là lỗi của sách." },
    ],
  },
  {
    objectif: 1, id: "pe-a4", label: "Activité 4", page: 75,
    setup: "Lisez cette lettre et complétez la fiche d'inscription à l'école de musique.",
    setupVi: "Đọc thư rồi điền phiếu ghi danh lớp nhạc.",
    tip: "Attention : la personne qui écrit n'est pas la personne à inscrire.",
    tipVi: "Cẩn thận: người viết thư (mẹ) không phải người được ghi danh (con).",
    doc: {
      kind: "text", style: "mail",
      paras: [
        "Madame, Monsieur,",
        "Mon fils Antoine a 12 ans. Il veut apprendre à jouer du piano. Il souhaite s'inscrire au cours débutant du mercredi soir à 19 heures. Merci de confirmer son inscription.",
        "Cordialement,",
        "Hélène Duroc",
      ],
    },
    questions: [
      { q: "NOM (en majuscules)", options: ["DUROC", "ANTOINE", "HÉLÈNE"], answer: "DUROC",
        note: "Le nom de famille de la mère est aussi celui du fils." },
      { q: "Prénom", options: ["Antoine", "Hélène", "Duroc"], answer: "Antoine",
        note: "C'est le fils qui s'inscrit, pas la mère qui écrit." },
      { q: "Âge de l'élève", options: ["10 ans", "12 ans", "19 ans"], answer: "12 ans" },
      { q: "Niveau", options: ["débutant", "intermédiaire", "avancé"], answer: "débutant" },
      { q: "Instrument de musique", options: ["le piano", "la guitare", "le violon"], answer: "le piano" },
      { q: "Horaires",
        options: ["mercredi soir à 19 heures", "mercredi matin à 9 heures", "mardi soir à 19 heures"],
        answer: "mercredi soir à 19 heures" },
    ],
  },
  {
    objectif: 1, id: "pe-a5", label: "Activité 5", page: 75,
    setup: "Lisez ces informations sur Rémi et remplissez le sondage sur les pratiques culturelles des Français.",
    setupVi: "Đọc đoạn giới thiệu của Rémi rồi điền phiếu khảo sát.",
    tip: "« Coordonnées » veut dire : ce qu'il faut pour joindre quelqu'un — nom, adresse, téléphone, courriel.",
    tipVi: "« Coordonnées » = thông tin để liên lạc: tên, địa chỉ, điện thoại, email. Đây là từ hay gặp trong phiếu tiếng Pháp.",
    doc: { kind: "image", src: `${DOC}/pe-a5-doc.webp`, alt: "Rémi se présente" },
    questions: [
      { q: "Adresse", options: ["25, rue Rodier à Paris", "22, rue Rodier à Paris", "25, rue Roger à Paris"],
        answer: "25, rue Rodier à Paris" },
      { q: "Téléphone", options: ["06.45.87.66.12", "06.45.78.66.12", "06.54.87.66.12"],
        answer: "06.45.87.66.12" },
      { q: "Âge", options: ["23 ans", "33 ans", "43 ans"], answer: "33 ans" },
      { q: "Sexe", options: ["masculin", "féminin"], answer: "masculin" },
      { q: "Nationalité", options: ["française", "espagnole", "italienne"], answer: "française" },
      { q: "Profession",
        options: ["entraîneur international de golf", "joueur de golf professionnel", "professeur de sport"],
        answer: "entraîneur international de golf",
        note: "« Je suis entraîneur international pour un club de golf » — il entraîne, il ne joue pas." },
      { q: "Sport pratiqué", options: ["la course à pied", "le golf", "la natation"],
        answer: "la course à pied",
        note: "Le golf est son travail. Le sport qu'il pratique, c'est « je cours tous les jours »." },
      { q: "Fréquence", options: ["2 heures par jour", "2 heures par semaine", "2 fois par mois"],
        answer: "2 heures par jour" },
      { q: "Loisirs préférés",
        options: ["Le sport, le cinéma et la lecture.", "Le sport et la musique.", "Le cinéma et le théâtre."],
        answer: "Le sport, le cinéma et la lecture." },
    ],
  },

  // ── Objectif 2 · Écrire un texte court (p.76) ──────────────────
  {
    objectif: 2, id: "pe-a6", label: "Activité 6", page: 76,
    setup: "Repérez les mots clés de cette consigne et répondez aux questions : « Vous êtes en vacances en été à la montagne dans les Alpes en France. Vous écrivez une carte postale à vos amis français. Vous décrivez vos activités et la météo. (40 mots minimum) »",
    setupVi: "Đọc kỹ đề bài rồi trả lời: ai viết, viết cho ai, ở đâu, khi nào, viết cái gì, để nói gì. Đây là bước phải làm trước mọi bài viết.",
    tip: "Toute la production sort de la consigne : chaque mot clé est une chose à écrire, et rien de plus n'est demandé.",
    tipVi: "Cả bài viết nằm sẵn trong đề: mỗi từ khoá là một ý phải viết — và không cần gì thêm.",
    questions: [
      { q: "1 — qui ?", options: ["Vous", "Vos amis français", "Une amie suisse"], answer: "Vous" },
      { q: "2 — à qui ?", options: ["À vos amis français", "À votre frère", "À une amie suisse"],
        answer: "À vos amis français",
        note: "Des amis : on écrit donc en tutoiement et avec une formule familière." },
      { q: "3 — où ?", options: ["Dans les Alpes, en France", "En Belgique", "Au Québec"],
        answer: "Dans les Alpes, en France" },
      { q: "4 — quand ?", options: ["En été", "En hiver", "Au printemps"], answer: "En été" },
      { q: "5 — quoi ?", options: ["Une carte postale", "Un courriel", "Une lettre formelle"],
        answer: "Une carte postale" },
      { q: "6 — pour dire quoi ?",
        options: ["Décrire vos activités et la météo", "Inviter vos amis", "Refuser une invitation"],
        answer: "Décrire vos activités et la météo",
        note: "Deux choses à dire, donc deux choses à ne pas oublier : les activités ET le temps qu'il fait." },
    ],
  },
  {
    objectif: 2, id: "pe-a7", label: "Activité 7", page: 76,
    setup: "Reliez la consigne à la production correspondante.",
    setupVi: "Nối mỗi đề bài với bài viết tương ứng. Nhìn dạng thư và lời chào là ra: bưu thiếp gửi từ nước ngoài, lời nhắn để lại, thư mời.",
    doc: { kind: "image", src: `${DOC}/pe-a7-doc.webp`, alt: "Trois productions, A, B et C" },
    questions: [
      { q: "Consigne 1 — carte postale de Belgique à une amie suisse : avec qui vous êtes, vos activités, la météo, quand vous rentrez.",
        options: ["Production A", "Production B", "Production C"], answer: "Production C",
        note: "« Bruxelles, le 14 août… Je rentre à Lausanne mercredi prochain » : le lieu, les activités, la météo et le retour y sont tous." },
      { q: "Consigne 2 — un mot dans la boîte aux lettres d'un ami absent : lui demander d'appeler.",
        options: ["Production A", "Production B", "Production C"], answer: "Production A",
        note: "« Tu n'étais pas là. Appelle-nous quand tu rentres. »" },
      { q: "Consigne 3 — invitation d'anniversaire par mail : où, quand, confirmer, apporter à boire ou à manger.",
        options: ["Production A", "Production B", "Production C"], answer: "Production B",
        note: "« Venez tous chez moi à 19 heures. Apportez des boissons… J'attends votre réponse. »" },
    ],
  },
];

// ── Objectif 2 · les tâches d'écriture (p.77–79) ─────────────────
// Nothing to grade here, so each carries the consigne, the points it asks for
// as chips, and the book's Proposition behind a reveal.
export const PE_TASKS = [
  {
    objectif: 2, id: "pe-a8", label: "Activité 8", page: 77,
    setup: "C'est l'été. Vous êtes en voyage au Québec, à Montréal. Vous marchez dans la ville et visitez les sites historiques. Vous mangez des plats typiques dans des restaurants. Vous écrivez une carte postale à votre frère. Vous racontez où vous êtes et ce que vous faites. Vous demandez à le voir bientôt. (40 mots minimum)",
    setupVi: "Bạn đang du lịch Montréal mùa hè. Viết bưu thiếp cho anh/em trai: kể bạn đang ở đâu, làm gì, và hẹn gặp sớm. (≥ 40 từ)",
    must: ["saluer", "où vous êtes", "ce que vous faites", "demander à le voir", "prendre congé"],
    model: "Montréal, le 12 juillet 2016.\nSalut !\nComment ça va ? Moi, je vais très bien. Je suis à Montréal. C'est l'été, il fait très chaud ! Je me promène dans le Vieux-Montréal. C'est magnifique et romantique !\nOn se voit dans une semaine ? Téléphone-moi.\nJe t'embrasse",
  },
  {
    objectif: 2, id: "pe-a9", label: "Activité 9", page: 77,
    setup: "Dans votre agenda personnel, vous décrivez vos activités des trois prochains jours. Écrivez une phrase par jour avec un détail.",
    setupVi: "Viết vào sổ tay: mỗi ngày một câu về việc bạn sẽ làm trong ba ngày tới, kèm một chi tiết cụ thể.",
    minWords: 20,
    must: ["une phrase par jour", "un détail par phrase"],
    model: "Vendredi 9 : Génial, je vais au cinéma avec ma meilleure amie !\nSamedi 10 : Je pars en week-end en Bretagne et je fais du bateau avec ma famille.\nDimanche 11 : Super, je vais à la plage et je mange des huîtres.",
  },
  {
    objectif: 2, id: "pe-a10", label: "Activité 10", page: 77,
    setup: "Vous écrivez un courriel à votre correspondant(e) francophone pour la première fois. Vous vous présentez, vous dites où vous habitez et ce que vous faites (travail, études, loisirs). Vous lui posez des questions sur ses loisirs. (40 mots minimum)",
    setupVi: "Viết email lần đầu cho bạn qua thư người Pháp: tự giới thiệu, nói bạn sống ở đâu, làm gì (công việc / học hành / sở thích), rồi hỏi về sở thích của họ. (≥ 40 từ)",
    must: ["se présenter", "où vous habitez", "travail ou études", "loisirs", "poser des questions"],
    model: "Bonjour,\nJe m'appelle Seamus Mc Cracken, je suis irlandais. J'habite à Dublin. J'ai 25 ans et je suis étudiant en médecine. J'adore le surf et les jeux vidéo. Et vous ? Qu'est-ce que vous aimez faire ? Vous aimez le sport ?\nÀ bientôt, Seamus",
  },
  {
    objectif: 2, id: "pe-a11", label: "Activité 11", page: 78,
    setup: "Vous étudiez dans une école de langues. Votre professeur de français vous demande d'écrire un petit texte de présentation : vous parlez de votre famille et de vos loisirs. (40 mots minimum)",
    setupVi: "Thầy cô yêu cầu viết đoạn tự giới thiệu: nói về gia đình và sở thích của bạn. (≥ 40 từ)",
    must: ["se présenter", "la famille", "les loisirs"],
    model: "Je suis Yuki Nonoshita. Je suis japonaise et j'ai 23 ans. Je suis étudiante. J'ai deux petites sœurs. J'étudie le français. Mon activité préférée est le tango. Je danse trois fois par semaine dans une école de tango à Paris.",
  },
  {
    objectif: 2, id: "pe-a12", label: "Activité 12", page: 78,
    setup: "Vous annoncez à vos amis votre promotion à Londres. Vous les invitez à fêter la bonne nouvelle. Vous écrivez un courriel. Vous décrivez la raison de votre message, le lieu, la date, l'heure du rendez-vous et vous demandez d'apporter une boisson. Vous leur demandez de confirmer par courriel. Adaptez la formule de politesse. (40 mots minimum)",
    setupVi: "Báo tin bạn được thăng chức ở London và mời bạn bè ăn mừng: nêu lý do, địa điểm, ngày, giờ, dặn mang đồ uống, và xin xác nhận qua email. (≥ 40 từ)",
    tip: "C'est un courriel : pensez aux champs De / Date / À / Objet avant même le texte.",
    tipVi: "Đây là email — sách in sẵn các ô De / Date / À / Objet, nhớ điền cả phần đó chứ không chỉ thân thư.",
    must: ["la raison", "le lieu", "la date", "l'heure", "apporter une boisson", "confirmer par courriel"],
    model: "Chers amis,\nJ'ai le plaisir de vous annoncer ma promotion de directeur général à Londres. Je vous invite à faire la fête au café Le Repère au 18, boulevard Haussmann le vendredi 11 septembre à 19 h. Merci de confirmer par mail avant lundi 7 septembre.\nBien à vous, Gwénaëlle",
  },
  {
    objectif: 2, id: "pe-a13", label: "Activité 13", page: 78,
    setup: "Pour les vacances d'été, vos amis vous proposent de venir passer une semaine à la mer dans leur maison de vacances. Vous leur écrivez une lettre pour accepter leur invitation. Vous rappelez pourquoi vous écrivez, vous confirmez votre venue et vous annoncez votre arrivée (dates, durée du séjour). Vous remerciez vos amis et adaptez la formule de politesse. (40 mots minimum)",
    setupVi: "Bạn bè mời đi biển một tuần. Viết thư nhận lời: nhắc lý do viết, xác nhận sẽ đến, báo ngày đến và ở bao lâu, cảm ơn, và chọn lời kết phù hợp. (≥ 40 từ)",
    must: ["rappeler pourquoi", "accepter", "la date d'arrivée", "la durée", "remercier", "formule de politesse"],
    model: "Chers Mia et Luc,\nC'est avec plaisir que j'accepte votre invitation dans votre maison de vacances. J'arrive le jeudi 12 août à la gare de Nice à 13 h 06. Je reste 5 jours. Merci encore pour votre invitation !\nBises, Edwige",
  },
  {
    objectif: 2, id: "pe-a14", label: "Activité 14", page: 79,
    setup: "Votre enfant se marie. Vous écrivez le carton d'invitation au mariage. Vous donnez la date, le lieu de l'invitation et demandez de confirmer (délai). Vous rappelez vos coordonnées (adresse, courriel ou téléphone) pour recevoir la confirmation de la venue de vos invités.",
    setupVi: "Con bạn cưới. Viết thiệp mời: ngày, địa điểm, hạn xác nhận, và thông tin liên lạc của bạn để khách báo lại.",
    tip: "Un carton d'invitation ne se rédige pas comme une lettre : on annonce à la troisième personne, sans « je ».",
    tipVi: "Thiệp mời không viết như thư: dùng ngôi thứ ba (« M. et Mme X ont le plaisir de… »), không xưng « je ».",
    must: ["la date", "le lieu", "le délai de confirmation", "vos coordonnées"],
    model: "M. et Mme Monsaingeon ont le bonheur de vous annoncer le mariage de Chloé et Loïc samedi 25 septembre 2016 à la mairie de Manosque à 14 heures. Un cocktail suivra la cérémonie à la salle des fêtes de Manosque. Réponse souhaitée avant le 18 août à monsaingeon@courriel.fr ou au 04.92.54.86.53.",
  },
  {
    objectif: 2, id: "pe-a15", label: "Activité 15", page: 79,
    setup: "Un collègue part travailler aux États-Unis. Il vous invite à sa fête de départ. Vous n'êtes pas disponible à la date proposée. Vous le félicitez. Vous refusez l'invitation. Vous expliquez pourquoi. (40 mots minimum)",
    setupVi: "Một đồng nghiệp sắp sang Mỹ làm việc và mời bạn dự tiệc chia tay, nhưng bạn bận. Chúc mừng họ, từ chối, và giải thích lý do. (≥ 40 từ)",
    tip: "Adaptez la formule de politesse : c'est un collègue, ni un ami proche ni un supérieur.",
    tipVi: "Chọn lời kết cho đúng mức: đồng nghiệp — không thân như bạn bè, cũng không trang trọng như với sếp.",
    must: ["féliciter", "refuser", "expliquer pourquoi", "formule de politesse adaptée"],
    model: "Bonjour Michel,\nFélicitations pour ton départ aux États-Unis ! Merci pour ton invitation. C'est gentil mais je ne peux pas accepter ton invitation. Je suis désolée, ce n'est pas possible : c'est l'anniversaire de ma mère. C'est dommage.\nAmicalement, Yves",
  },
];

// The book's two writing objectifs (p.74, p.76).
export const PE_OBJECTIFS = [
  { num: 1, fr: "Se présenter" },
  { num: 2, fr: "Écrire un texte court" },
];
