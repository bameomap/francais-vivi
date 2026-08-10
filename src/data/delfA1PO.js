// Production orale — « Le DELF A1 100 % réussite » p.88–107.
//
// The speaking paper is the one where an app can least stand in for a room with
// an examiner in it, so the book's own drills matter more here, not less: most
// of what it teaches is decidable on paper — which answer actually answers the
// question, which question word goes with which kind of information, which
// reaction fits which reply.
//
// Three lists, by what can be checked:
//
//   PO_PREPARE — Activités with one right answer (p.90–102), keyed against the
//     Corrigés (p.151–155). Graded like any other exercise.
//   PO_AUDIO — the listen-and-repeat drills and, more usefully, Youssef's
//     complete mock oral (Activités 13, 26, 37): the audio plus the book's
//     filled-in transcript behind a reveal.
//   PO_TASKS — the drills that ask you to speak or write freely. Prompt,
//     recorder, and the book's Proposition behind a reveal.
//
// PO_TRAIN is the S'ENTRAÎNER half (p.103–106): the nine exercices as the book
// sets them, three per part of the exam.

const piste = n => `/api/audio?b=delf-a1&p=${n}`;
const DOC = "/delf-a1/docs";
const img = (id, alt) => ({ kind: "image", src: `${DOC}/${id}.webp`, alt });

const QUI = ["C'est Luc qui se présente", "C'est une autre personne", "Ce n'est pas une présentation"];
const THEME = ["Vie privée", "Vie professionnelle", "Loisirs"];
const SALUT = ["Saluer", "Prendre congé", "Les deux"];

export const PO_PREPARE = [
  // ── Objectif 1 · L'entretien dirigé ────────────────────────────
  {
    objectif: 1, id: "po-a1", label: "Activité 1", page: 90,
    setup: "« Bonjour. Je m'appelle Luc… » Cochez les phrases correspondant à la présentation de Luc.",
    setupVi: "Câu nào là Luc đang tự giới thiệu? Có ba loại: Luc nói về mình, câu nói về người khác, và câu không giới thiệu ai cả.",
    tip: "Se présenter, c'est parler de soi : « je ». Une phrase en « il » ou « elle » présente quelqu'un d'autre, et une phrase sur un objet ne présente personne.",
    tipVi: "Tự giới thiệu là nói về mình → dùng « je ». Câu dùng « il / elle » là nói về người khác; câu về đồ vật thì không giới thiệu ai.",
    questions: [
      { q: "« Je suis belge. »", options: QUI, answer: "C'est Luc qui se présente" },
      { q: "« Elle est blonde. »", options: QUI, answer: "C'est une autre personne" },
      { q: "« Il a un chien. »", options: QUI, answer: "C'est une autre personne" },
      { q: "« Son père s'appelle David. »", options: QUI, answer: "C'est une autre personne" },
      { q: "« Je suis avocat. »", options: QUI, answer: "C'est Luc qui se présente" },
      { q: "« J'ai 24 ans. »", options: QUI, answer: "C'est Luc qui se présente" },
      { q: "« J'ai un livre. »", options: QUI, answer: "Ce n'est pas une présentation",
        note: "« Je » est bien là, mais avoir un livre ne dit rien de qui on est." },
      { q: "« La maison est blanche. »", options: QUI, answer: "Ce n'est pas une présentation" },
    ],
  },
  {
    objectif: 1, id: "po-a2", label: "Activité 2", page: 90,
    setup: "Complétez la présentation de Fatima : « Je … Fatima. J'… 34 … . … mère … Samia. J'ai … chien. Je … espagnole. »",
    setupVi: "Điền vào chỗ trống trong đoạn Fatima tự giới thiệu. Đây là bộ khung câu bạn sẽ dùng lại ở phần thi nói số 1.",
    questions: [
      { lead: "Je … Fatima.", q: "Quel mot ?", options: ["m'appelle", "appelle", "suis"], answer: "m'appelle" },
      { lead: "J'… 34 …", q: "Le verbe", options: ["ai", "suis", "a"], answer: "ai",
        note: "L'âge se dit avec avoir : « j'ai 34 ans », jamais « je suis 34 »." },
      { lead: "J'ai 34 …", q: "Le mot qui manque", options: ["ans", "années", "an"], answer: "ans" },
      { lead: "… mère s'appelle Samia.", q: "Le déterminant", options: ["Ma", "Mon", "Mes"], answer: "Ma" },
      { lead: "Ma mère … Samia.", q: "Le verbe", options: ["s'appelle", "appelle", "est appelle"], answer: "s'appelle" },
      { lead: "J'ai … chien.", q: "Le déterminant", options: ["un", "une", "le"], answer: "un" },
      { lead: "Je … espagnole.", q: "Le verbe", options: ["suis", "ai", "est"], answer: "suis",
        note: "La nationalité se dit avec être : « je suis espagnole »." },
    ],
  },
  {
    objectif: 1, id: "po-a5", label: "Activité 5", page: 91,
    setup: "Présentez l'activité. Exemple : « Je joue au piano. / J'aime le piano. / J'ai des cours de piano. »",
    setupVi: "Gọi tên hoạt động trong mỗi hình. Sách gợi ý ba cách nói cho cùng một hình — nhớ cả ba để lúc thi có cái thay thế.",
    doc: img("po-a5-doc", "Quatre activités, A–D"),
    questions: [
      { q: "Image A", options: ["la guitare", "le tennis", "le parc", "la bibliothèque"], answer: "la guitare",
        note: "« Je joue de la guitare. » — on joue DE pour un instrument." },
      { q: "Image B", options: ["la guitare", "le tennis", "le parc", "la bibliothèque"], answer: "le tennis",
        note: "« Je joue au tennis. » — on joue À pour un sport." },
      { q: "Image C", options: ["la guitare", "le tennis", "le parc", "la bibliothèque"], answer: "le parc",
        note: "« Je vais au parc. / Je me promène dans le parc. »" },
      { q: "Image D", options: ["la guitare", "le tennis", "le parc", "la bibliothèque"], answer: "la bibliothèque",
        note: "« Je vais à la bibliothèque. / Je prends des livres à la bibliothèque. »" },
    ],
  },
  {
    objectif: 1, id: "po-a7", label: "Activité 7", page: 92,
    setup: "Reliez les informations. Exemple : « Le samedi, je vais à la piscine. »",
    setupVi: "Nối để tạo câu có nghĩa. Mỗi vế trái đi với đúng một động từ và một bổ ngữ.",
    questions: [
      { q: "1 — Le matin,", options: ["je me lève à 7 h 30.", "je regarde des films d'action.",
                                      "je mange de la viande.", "j'aime les jeux.", "je vois mes parents."],
        answer: "je me lève à 7 h 30." },
      { q: "2 — À la télévision,", options: ["je me lève à 7 h 30.", "je regarde des films d'action.",
                                             "je mange de la viande.", "j'aime les jeux.", "je vois mes parents."],
        answer: "je regarde des films d'action." },
      { q: "3 — Le midi,", options: ["je me lève à 7 h 30.", "je regarde des films d'action.",
                                     "je mange de la viande.", "j'aime les jeux.", "je vois mes parents."],
        answer: "je mange de la viande." },
      { q: "4 — Au parc,", options: ["je me lève à 7 h 30.", "je regarde des films d'action.",
                                     "je mange de la viande.", "j'aime les jeux.", "je vois mes parents."],
        answer: "j'aime les jeux." },
      { q: "5 — Le dimanche,", options: ["je me lève à 7 h 30.", "je regarde des films d'action.",
                                         "je mange de la viande.", "j'aime les jeux.", "je vois mes parents."],
        answer: "je vois mes parents." },
    ],
  },
  {
    objectif: 1, id: "po-a9", label: "Activité 9", page: 92,
    setup: "Cochez la bonne réponse.",
    setupVi: "Chọn câu trả lời đúng. Các phương án sai đều đúng ngữ pháp — chúng chỉ trả lời sai câu hỏi.",
    tip: "Une réponse doit reprendre la personne de la question : on vous demande « vous », vous répondez « je ».",
    tipVi: "Câu hỏi dùng « vous » thì trả lời phải dùng « je ». Đây là lỗi mất điểm phổ biến nhất ở phần thi nói.",
    questions: [
      { q: "1 — Quel âge avez-vous ?",
        options: ["J'ai 20 ans.", "Il a 20 ans.", "Vous avez 20 ans."], answer: "J'ai 20 ans." },
      { q: "2 — Où habitez-vous ?",
        options: ["Je vais en vacances à Washington.", "Je suis à Washington.", "J'habite à Washington."],
        answer: "J'habite à Washington.",
        note: "« Je suis à Washington » dit où vous êtes maintenant, pas où vous habitez." },
      { q: "3 — Qu'est-ce que vous faites le soir ?",
        options: ["Je vais au cinéma.", "J'aime le cinéma.", "Je fais du cinéma."],
        answer: "Je vais au cinéma.",
        note: "La question porte sur une action, pas sur un goût." },
      { q: "4 — Quelle est votre activité sportive ?",
        options: ["Je fais mes devoirs.", "Je fais un gâteau.", "Je fais du tennis."],
        answer: "Je fais du tennis." },
    ],
  },
  {
    objectif: 1, id: "po-a12", label: "Activité 12", page: 93, piste: 75, audio: piste(75),
    setup: "Écoutez les questions et cochez les réponses entendues.",
    setupVi: "Nghe rồi chọn đúng câu đã nghe. Các phương án chỉ khác nhau một chi tiết nhỏ — con số, tên riêng, ngày trong tuần.",
    questions: [
      { lead: "Question 1", q: "Quelle réponse ?",
        options: ["Vous avez 50 ans.", "J'ai 52 ans.", "J'ai 50 ans."], answer: "J'ai 50 ans." },
      { lead: "Question 2", q: "Quelle réponse ?",
        options: ["J'ai des oiseaux.", "J'ai des poissons.", "Je n'ai pas d'animaux."],
        answer: "J'ai des oiseaux." },
      { lead: "Question 3", q: "Quelle réponse ?",
        options: ["J'ai une mère. Elle s'appelle Louise. Et mon père, il s'appelle André.",
                  "Ma mère s'appelle Julie. Mon père, lui, s'appelle André.",
                  "Ma mère s'appelle Louise et mon père, lui, s'appelle André."],
        answer: "Ma mère s'appelle Louise et mon père, lui, s'appelle André." },
      { lead: "Question 4", q: "Quelle réponse ?",
        options: ["Je fais du vélo le vendredi et après, je vais au cinéma avec des amis.",
                  "Je fais du vélo le samedi et après, je vais au cinéma avec mes amis.",
                  "Je vais en vélo à la piscine et après, je vais au cinéma avec un ami."],
        answer: "Je fais du vélo le samedi et après, je vais au cinéma avec mes amis." },
      { lead: "Question 5", q: "Quelle réponse ?",
        options: ["Je suis chirurgien.", "Je suis médecin.", "Je suis pharmacien."],
        answer: "Je suis chirurgien." },
    ],
  },

  // ── Objectif 2 · L'échange d'informations ──────────────────────
  {
    objectif: 2, id: "po-a14", label: "Activité 14", page: 95,
    setup: "Classez les mots suivants dans le tableau : métier – âge – parc – cinéma – diplôme – enfants – nationalité – piano – secrétaire – rugby – réunion – adresse.",
    setupVi: "Xếp 12 từ vào ba nhóm. Ở phần thi số 2 bạn bốc thẻ từ — biết từ thuộc chủ đề nào thì đặt câu hỏi nhanh hơn.",
    questions: [
      { q: "métier", options: THEME, answer: "Vie professionnelle" },
      { q: "âge", options: THEME, answer: "Vie privée" },
      { q: "parc", options: THEME, answer: "Loisirs" },
      { q: "cinéma", options: THEME, answer: "Loisirs" },
      { q: "diplôme", options: THEME, answer: "Vie professionnelle" },
      { q: "enfants", options: THEME, answer: "Vie privée" },
      { q: "nationalité", options: THEME, answer: "Vie privée" },
      { q: "piano", options: THEME, answer: "Loisirs" },
      { q: "secrétaire", options: THEME, answer: "Vie professionnelle" },
      { q: "rugby", options: THEME, answer: "Loisirs" },
      { q: "réunion", options: THEME, answer: "Vie professionnelle" },
      { q: "adresse", options: THEME, answer: "Vie privée" },
    ],
  },
  {
    objectif: 2, id: "po-a16", label: "Activité 16", page: 95,
    setup: "Associez des mots de la même thématique.",
    setupVi: "Ghép hai từ cùng chủ đề. Bài này luyện phản xạ liên tưởng — thấy một từ là bật ra cả nhóm từ quanh nó.",
    questions: [
      ...[["Téléphone", "Numéro"], ["Acteur", "Cinéma"], ["Chanter", "Musique"], ["Maison", "Chambre"],
          ["Bureau", "Ordinateur"], ["Père", "Famille"], ["Magasin", "Acheter"]].map(([a, b]) => ({
        q: a,
        options: ["Musique", "Chambre", "Famille", "Numéro", "Acheter", "Ordinateur", "Cinéma"],
        answer: b,
      })),
    ],
  },
  {
    objectif: 2, id: "po-a18", label: "Activité 18", page: 96,
    setup: "Reliez les mots aux mots interrogatifs correspondants.",
    setupVi: "Mỗi loại thông tin đi với một từ để hỏi. Nhớ cặp này thì phần thi số 2 không bao giờ bí.",
    questions: [
      { q: "Nom", options: ["Comment ?", "Où ?", "Combien ?", "Qui ?", "Quand ?"], answer: "Comment ?",
        note: "« Comment vous appelez-vous ? » — pour un nom, le français demande comment, pas qui." },
      { q: "Adresse", options: ["Comment ?", "Où ?", "Combien ?", "Qui ?", "Quand ?"], answer: "Où ?" },
      { q: "Nombre", options: ["Comment ?", "Où ?", "Combien ?", "Qui ?", "Quand ?"], answer: "Combien ?" },
      { q: "Personne", options: ["Comment ?", "Où ?", "Combien ?", "Qui ?", "Quand ?"], answer: "Qui ?" },
      { q: "Date", options: ["Comment ?", "Où ?", "Combien ?", "Qui ?", "Quand ?"], answer: "Quand ?" },
    ],
  },
  {
    objectif: 2, id: "po-a19", label: "Activité 19", page: 96, piste: 77, audio: piste(77),
    setup: "Complétez les questions avec le mot interrogatif correspondant. Pour vous aider, écoutez les questions.",
    setupVi: "Điền từ để hỏi cho đúng. Nghe audio để kiểm tra lại.",
    questions: [
      { q: "1 — … habitez-vous ?", options: ["Où", "Comment", "Quand", "Combien", "Quel", "Quelle", "Quoi", "Qu'est-ce que"], answer: "Où" },
      { q: "2 — … s'appelle votre femme ?", options: ["Où", "Comment", "Quand", "Combien", "Quel", "Quelle", "Quoi", "Qu'est-ce que"], answer: "Comment" },
      { q: "3 — … allez-vous au cinéma ?", options: ["Où", "Comment", "Quand", "Combien", "Quel", "Quelle", "Quoi", "Qu'est-ce que"], answer: "Quand" },
      { q: "4 — … est-ce que vous allez à votre bureau ?", options: ["Où", "Comment", "Quand", "Combien", "Quel", "Quelle", "Quoi", "Qu'est-ce que"], answer: "Comment" },
      { q: "5 — … avez-vous de frères et de sœurs ?", options: ["Où", "Comment", "Quand", "Combien", "Quel", "Quelle", "Quoi", "Qu'est-ce que"], answer: "Combien" },
      { q: "6 — … est votre profession ?", options: ["Où", "Comment", "Quand", "Combien", "Quel", "Quelle", "Quoi", "Qu'est-ce que"], answer: "Quelle",
        note: "« Profession » est féminin, donc « quelle » avec deux L et un E." },
      { q: "7 — Vous lisez … ?", options: ["Où", "Comment", "Quand", "Combien", "Quel", "Quelle", "Quoi", "Qu'est-ce que"], answer: "Quoi" },
      { q: "8 — … est votre nationalité ?", options: ["Où", "Comment", "Quand", "Combien", "Quel", "Quelle", "Quoi", "Qu'est-ce que"], answer: "Quelle" },
      { q: "9 — … est votre film préféré ?", options: ["Où", "Comment", "Quand", "Combien", "Quel", "Quelle", "Quoi", "Qu'est-ce que"], answer: "Quel",
        note: "« Film » est masculin : « quel film »." },
      { q: "10 — … est-ce que vous faites le dimanche ?", options: ["Où", "Comment", "Quand", "Combien", "Quel", "Quelle", "Quoi", "Qu'est-ce que"], answer: "Qu'est-ce que" },
    ],
  },
  {
    objectif: 2, id: "po-a20", label: "Activité 20", page: 96, piste: 78, audio: piste(78),
    setup: "Replacez les mots dans l'ordre pour former une question. Pour vous aider, écoutez les questions.",
    setupVi: "Sắp lại thành câu hỏi đúng thứ tự.",
    questions: [
      { lead: "est-ce que / soir / à / vous / quelle / mangez / le / heure ?", q: "Quelle question ?",
        options: ["À quelle heure est-ce que vous mangez le soir ?",
                  "Quelle heure est-ce que vous mangez à le soir ?",
                  "Le soir à quelle heure vous est-ce que mangez ?"],
        answer: "À quelle heure est-ce que vous mangez le soir ?" },
      { lead: "langues / parlez / est-ce que / quelles / vous ?", q: "Quelle question ?",
        options: ["Quelles langues est-ce que vous parlez ?",
                  "Est-ce que quelles langues vous parlez ?",
                  "Vous parlez est-ce que quelles langues ?"],
        answer: "Quelles langues est-ce que vous parlez ?" },
      { lead: "préférée / quelle / votre / est / couleur ?", q: "Quelle question ?",
        options: ["Quelle est votre couleur préférée ?",
                  "Quelle votre couleur préférée est ?",
                  "Est votre couleur quelle préférée ?"],
        answer: "Quelle est votre couleur préférée ?" },
      { lead: "quoi / le / vous / samedi / faites ?", q: "Quelle question ?",
        options: ["Le samedi vous faites quoi ?", "Quoi vous faites le samedi ?", "Vous quoi faites le samedi ?"],
        answer: "Le samedi vous faites quoi ?" },
      { lead: "à / allez / est-ce que / l'école / comment / vous ?", q: "Quelle question ?",
        options: ["Comment est-ce que vous allez à l'école ?",
                  "Comment vous est-ce que allez à l'école ?",
                  "Est-ce que comment vous allez à l'école ?"],
        answer: "Comment est-ce que vous allez à l'école ?" },
    ],
  },
  {
    objectif: 2, id: "po-a22", label: "Activité 22", page: 97, piste: 80, audio: piste(80),
    setup: "Associez une réaction à une réponse.",
    setupVi: "Ghép mỗi câu trả lời với phản ứng phù hợp. Phần thi số 2 chấm cả việc bạn có phản ứng lại câu trả lời của giám khảo hay không — im lặng là mất điểm.",
    tip: "« Moi aussi » répond à une phrase positive, « moi non plus » à une phrase négative.",
    tipVi: "Câu khẳng định → « Moi aussi ». Câu phủ định → « Moi non plus ». Dùng nhầm là lỗi rất dễ mắc.",
    questions: [
      ...[["Ma couleur préférée est le bleu.", "Moi, c'est le vert."],
          ["J'ai un chien et deux chats.", "Ah, c'est bien. Moi je n'ai pas d'animaux."],
          ["Je n'ai pas d'animaux.", "Ah, moi j'ai un chien."],
          ["J'aime aller au cinéma avec mes amis.", "Moi aussi."],
          ["L'été, je vais en vacances à la mer.", "D'accord. Où est-ce que vous allez ?"],
          ["Je ne prends pas le métro.", "Moi non plus."]].map(([a, b]) => ({
        q: a,
        options: ["Moi aussi.", "Moi non plus.", "Moi, c'est le vert.", "Ah, moi j'ai un chien.",
                  "Ah, c'est bien. Moi je n'ai pas d'animaux.", "D'accord. Où est-ce que vous allez ?"],
        answer: b,
      })),
    ],
  },

  // ── Objectif 3 · Le dialogue simulé ────────────────────────────
  {
    objectif: 3, id: "po-a27", label: "Activité 27", page: 99,
    setup: "Classez les expressions : saluer ou prendre congé ?",
    setupVi: "Chào lúc gặp hay lúc chia tay? Riêng « Salut » dùng được cả hai lúc — nhưng chỉ với người thân quen.",
    questions: [
      { q: "Bonjour Madame", options: SALUT, answer: "Saluer" },
      { q: "Bonsoir", options: SALUT, answer: "Saluer" },
      { q: "Salut", options: SALUT, answer: "Les deux",
        note: "Le livre le range dans les deux colonnes : « Salut ! » à l'arrivée comme au départ." },
      { q: "Au revoir", options: SALUT, answer: "Prendre congé" },
      { q: "Bonne journée", options: SALUT, answer: "Prendre congé" },
      { q: "À bientôt", options: SALUT, answer: "Prendre congé" },
    ],
  },
  {
    objectif: 3, id: "po-a34", label: "Activité 34", page: 101,
    setup: "Reliez le ticket au moyen de paiement nécessaire pour payer.",
    setupVi: "Đọc kỹ hoá đơn rồi chọn cách trả tiền khả dĩ.",
    doc: img("po-a34-doc", "Ticket du restaurant Côte Ouest et trois moyens de paiement"),
    questions: [
      { q: "Comment est-ce que vous pouvez payer ?",
        options: ["A — par chèque", "B — par carte bancaire", "C — en espèces"], answer: "C — en espèces",
        note: "Le ticket fait 55 €, et le restaurant n'accepte carte et chèque qu'à partir de 60 €. Il ne reste que les espèces." },
    ],
  },
  {
    objectif: 3, id: "po-a35", label: "Activité 35", page: 102, piste: 85, audio: piste(85),
    setup: "Écoutez et répondez aux questions.",
    setupVi: "Nghe rồi chọn đúng số tiền. Ở phần thi số 3 bạn phải nghe được giá — nghe nhầm là trả nhầm.",
    questions: [
      { q: "1 — Combien coûte le manteau ?", options: ["115 €", "150 €", "15 €"], answer: "115 €" },
      { q: "2 — Combien est-ce que vous devez payer ?", options: ["7,70 €", "7,17 €", "17,70 €"], answer: "7,70 €" },
      { q: "3 — Quel est le prix du plat principal ?", options: ["16 €", "6 €", "60 €"], answer: "16 €" },
      { q: "4 — Combien coûte le billet de train pour Paris ?", options: ["68 €", "78 €", "60 €"], answer: "68 €" },
    ],
  },
];

// ── Listen-along: pronunciation drills and Youssef's mock oral ────
export const PO_AUDIO = [
  {
    objectif: 1, id: "po-a11", label: "Activité 11", page: 93, piste: 74,
    setup: "Écoutez, répétez et notez les liaisons.",
    setupVi: "Nghe, nhắc lại, và để ý chỗ nối âm (liaison) — sách gạch chân sẵn trong đáp án.",
    text:
      "1. Je m'appelle Amélie.\n2. J'ai_un frère et deux sœurs.\n" +
      "3. Je me lève à sept_heures et je vais à l'université à huit_heures.\n" +
      "4. Je fais de l'équitation.\n5. J'habite_à Madrid, en_Espagne.\n" +
      "6. Mon père s'appelle Thomas et ma mère s'appelle_Angelina.\n" +
      "7. Mon père a quarante_et_un_ans et ma mère a trente-huit ans.",
  },
  {
    objectif: 1, id: "po-a13", label: "Activité 13", page: 94, piste: 76,
    setup: "Youssef passe l'épreuve de production orale du DELF A1. Écoutez le premier exercice — l'entretien dirigé.",
    setupVi: "Nghe trọn phần thi số 1 của một thí sinh thật. Nghe trước một lượt và tự trả lời theo, rồi mới mở lời thoại.",
    text:
      "E : Bonjour.\nY : Bonjour.\n" +
      "E : Bienvenue à votre épreuve de production orale du DELF A1. Le premier exercice est un entretien dirigé. Je vous pose des questions pour vous connaître. Ça va ? Est-ce que nous pouvons commencer ?\n" +
      "Y : Oui, ça va.\n" +
      "E : Comment est-ce que vous vous appelez ?\nY : Je m'appelle Youssef.\n" +
      "E : Est-ce que vous pouvez épeler votre prénom s'il vous plaît ?\nY : Y-O-U-S-S-E-F.\n" +
      "E : Et quel âge avez-vous ?\nY : 26 ans. J'ai 26 ans.\n" +
      "E : Merci. Combien de frères et sœurs avez-vous ?\nY : J'ai un frère et deux sœurs.\n" +
      "E : Comment s'appellent-ils ?\nY : Mon frère s'appelle Ahmed et mes sœurs s'appellent Liliane et Sara.\n" +
      "E : Est-ce que vous faites un sport ?\nY : Oui.\n" +
      "E : Quel sport est-ce que vous faites ?\nY : Je fais du basketball et du karaté.\n" +
      "E : D'accord. Et vous faites ces sports quels jours ?\n" +
      "Y : Le basketball, c'est le mercredi et le samedi. Je fais du karaté le mardi et le jeudi.\n" +
      "E : Merci Youssef. L'exercice 1 est terminé. Nous passons maintenant à l'exercice 2.",
  },
  {
    objectif: 2, id: "po-a24", label: "Activité 24", page: 97, piste: 81,
    setup: "Écoutez et répétez.",
    setupVi: "Nghe và nhắc lại. Đây đúng là những câu bạn sẽ dùng ở phần thi số 2.",
    text:
      "1. Quel âge avez-vous ?\n2. Quelle est la date de votre anniversaire ?\n" +
      "3. Est-ce que vous faites du vélo ?\n4. Combien d'enfants est-ce que vous avez ?\n" +
      "5. Quand partez-vous en vacances ?\n6. Où est-ce que vous allez en vacances ?\n" +
      "7. Le samedi, vous faites quoi ?",
  },
  {
    objectif: 2, id: "po-a25", label: "Activité 25", page: 98, piste: 82,
    setup: "Écoutez et notez les intonations : ↗ l'intonation monte, ↘ l'intonation baisse.",
    setupVi: "Nghe ngữ điệu lên hay xuống. Câu hỏi thường lên giọng ở cuối, câu kể thì xuống — cùng một câu chữ, hai ngữ điệu là hai nghĩa khác nhau.",
    text:
      "1. Quel âge avez-vous ?\n2. Quelle est la date de votre anniversaire ?\n" +
      "3. La date de mon anniversaire est le 13 mai.\n4. La date de mon anniversaire ? C'est le 13 mai.\n" +
      "5. Est-ce que vous aimez la télévision ?\n6. Vous aimez la télévision.\n" +
      "7. Combien de frères avez-vous ?\n8. Vous avez deux frères. Moi, j'ai un frère.\n" +
      "9. Le samedi, vous faites quoi ?\n10. Le samedi, vous allez au parc. Avec qui ?\n" +
      "11. J'aime les chats. Pourquoi ? Je ne sais pas.",
  },
  {
    objectif: 2, id: "po-a26", label: "Activité 26", page: 98, piste: 83,
    setup: "L'épreuve de Youssef, deuxième exercice — l'échange d'informations.",
    setupVi: "Phần thi số 2 của Youssef: chính thí sinh đặt câu hỏi cho giám khảo. Để ý cách cậu ấy phản ứng lại từng câu trả lời.",
    text:
      "E : L'exercice 2 est un échange d'informations. Vous me posez des questions pour me connaître. Utilisez les mots pour poser vos questions.\n" +
      "Y : Quelle est votre nationalité ?\nE : Je suis française. Et vous ?\n" +
      "Y : Moi, je suis syrien. Combien de langues est-ce que vous parlez ?\n" +
      "E : Je parle français, anglais et un peu italien.\n" +
      "Y : Oh, d'accord. Moi aussi je parle anglais, un peu français mais pas italien. Je parle espagnol. À quelle heure vous vous levez ?\n" +
      "E : Je me lève à 6 h 30 tous les jours.\nY : C'est tôt !\n" +
      "E : Oui, c'est vrai. Je travaille tôt.\n" +
      "Y : Est-ce que vous avez un appartement ou une maison ?\nE : J'ai une maison.\n" +
      "Y : Moi, j'habite dans un appartement. Et comment est-ce que vous venez à l'école ?\n" +
      "E : Je viens en métro, c'est rapide !\nY : Oh, moi aussi !\n" +
      "E : Merci. L'exercice 2 est terminé. Nous passons maintenant à l'exercice 3.",
  },
  {
    objectif: 3, id: "po-a36", label: "Activité 36", page: 102, piste: 86,
    setup: "Écoutez et notez les liaisons.",
    setupVi: "Nghe và để ý nối âm trong các câu dùng ở cửa hàng.",
    text:
      "1. Bonjour Monsieur. Je voudrais une boîte de chocolats. C'est pour un anniversaire.\n" +
      "2. Quel est le prix d'une enveloppe s'il vous plaît ?\n" +
      "3. Le menu est à treize euros, c'est ça ?\n" +
      "4. Est-ce que vous avez un animal noir et blanc ?\n" +
      "5. Je cherche des chaussures pour jouer au tennis avec mes amis.",
  },
  {
    objectif: 3, id: "po-a37", label: "Activité 37", page: 102, piste: 87,
    setup: "L'épreuve de Youssef, troisième exercice — le dialogue simulé, dans une épicerie.",
    setupVi: "Phần thi số 3 của Youssef: đóng vai khách trong cửa hàng tạp hoá. Đây là khuôn mẫu để bắt chước — chào, hỏi số lượng, hỏi giá, hỏi tổng, trả tiền, chào tạm biệt.",
    text:
      "E : L'exercice 3 est un dialogue simulé. Nous sommes dans une épicerie. Vous voulez acheter des produits. Vous êtes le client et je suis la vendeuse. Nous commençons.\n" +
      "Y : Bonjour Madame.\nE : Bonjour Monsieur.\n" +
      "Y : Je voudrais acheter du sucre et des tomates s'il vous plaît.\n" +
      "E : Oui, combien de kilos de sucre ?\nY : 2 kilos de sucre s'il vous plaît.\n" +
      "E : D'accord et combien de tomates ?\n" +
      "Y : 1 kilo de tomates s'il vous plaît. Quel est le prix du kilo de tomates ?\nE : 1,30 €.\n" +
      "Y : Merci. Et combien coûte le sucre ?\nE : Le sucre ? C'est 3 € pour les 2 kilos.\nY : Merci.\n" +
      "E : Est-ce que vous voulez autre chose Monsieur ?\n" +
      "Y : Oui, je voudrais aussi du pain s'il vous plaît. Est-ce que vous avez des baguettes ?\n" +
      "E : Oui, combien de baguettes est-ce que vous voulez ?\n" +
      "Y : Seulement 1 baguette. Quel est le prix ?\nE : La baguette coûte 0,70 € (70 centimes).\n" +
      "Y : Merci. Quel est le prix total pour le sucre, les tomates et la baguette s'il vous plaît ?\n" +
      "E : Alors, le prix total est de 5 €. Comment est-ce que vous payez Monsieur ?\n" +
      "Y : Je paye en espèces. Et voilà 5 €.\n" +
      "E : Merci Monsieur. Et voilà vos produits.\n" +
      "Y : Merci beaucoup. Au revoir Madame et bonne journée.\n" +
      "E : Au revoir Monsieur. Merci Youssef. L'épreuve est terminée.",
  },
];

// ── Speak it yourself ────────────────────────────────────────────
export const PO_TASKS = [
  {
    objectif: 1, id: "po-a3", label: "Activité 3", page: 90,
    setup: "Décrivez les personnes à partir de leur carte d'identité : nom, nationalité, âge, date de naissance, ville, apparence.",
    setupVi: "Nhìn ba tấm thẻ và mô tả từng người: tên, quốc tịch, tuổi, ngày sinh, nơi ở, ngoại hình.",
    doc: img("po-a3-doc", "Trois cartes d'identité"),
    must: ["le nom", "la nationalité", "l'âge", "la date de naissance", "la ville", "l'apparence"],
    model: "1. Il s'appelle Igor Bogrov. Il est russe. Il a 46 ans. Il est né le 25 mai 1970. Il habite à Moscou, en Russie. Il est grand. Il a des lunettes. Ses cheveux sont blonds.\n2. Elle s'appelle Ling Wang. Elle est chinoise. Elle a 39 ans. Elle est née le 1er juillet 1977. Elle habite à Shanghai, en Chine. Elle est brune.\n3. Il s'appelle Victor Campos. Il est mexicain. Il a 15 ans. Il est né le 9 février 2001. Il habite à Acapulco, au Mexique. Ses cheveux sont noirs.",
  },
  {
    objectif: 1, id: "po-a4", label: "Activité 4", page: 91,
    setup: "Complétez la présentation de la famille de Steve à partir de l'arbre : « Je m'appelle Steve. Je suis né le 13 janvier 1989… »",
    setupVi: "Nhìn cây gia phả và giới thiệu gia đình Steve: từng người tên gì và sinh ngày nào.",
    doc: img("po-a4-doc", "L'arbre généalogique de Steve"),
    must: ["la sœur", "le père", "la mère", "les dates de naissance"],
    model: "Je m'appelle Steve. Je suis né le 13 janvier 1989. Ma sœur s'appelle Kelly. Elle est née le 23 septembre 1991. Mon père s'appelle Michael et il est né le 28 mai 1960. Ma mère s'appelle Sonia. Elle est née le 14 avril 1964.",
  },
  {
    objectif: 1, id: "po-a6", label: "Activité 6", page: 91,
    setup: "Répondez aux questions. 1 — Qu'est-ce que vous faites le samedi ? 2 — Quels sont vos loisirs ? 3 — Quels sports est-ce que vous faites ?",
    setupVi: "Trả lời ba câu về hoạt động của bạn. Trả lời cả câu, đừng cụt lủn một từ.",
    tip: "Exemple : « Qu'est-ce que vous faites le soir ? — Le soir, je regarde la télévision et je lis un livre avant de dormir. »",
    tipVi: "Mẹo của sách: nhắc lại phần đầu câu hỏi rồi mới trả lời — vừa có thời gian nghĩ, vừa thành câu đầy đủ.",
    must: ["le samedi", "les loisirs", "les sports"],
    model: "1. Le samedi, je fais… / je joue… / je vais…\n2. Je fais… / Je joue… / Je vais…\n3. Je joue au tennis, au football, au basketball… / Je fais de la natation, de l'équitation…",
  },
  {
    objectif: 1, id: "po-a8", label: "Activité 8", page: 92,
    setup: "Décrivez la journée de Victor à partir des images : « Le matin, je… »",
    setupVi: "Kể lại một ngày của Victor theo tranh, nói ở ngôi « je ».",
    doc: img("po-a8-doc", "La journée de Victor"),
    must: ["le matin", "les heures", "les activités", "le soir"],
    model: "Le matin, je joue du piano. Après, je vais à la piscine / je fais de la natation. Je rentre chez moi à 18 h 00. Je mange un gâteau au chocolat. Je me couche à 22 h 30.",
  },
  {
    objectif: 1, id: "po-a10", label: "Activité 10", page: 93,
    setup: "Répondez aux questions. 1 — Est-ce que vous avez des frères et des sœurs ? Combien ? Comment s'appellent-ils ? 2 — Quelle est votre nationalité ? 3 — Quelle est votre date de naissance ? 4 — Qu'est-ce que vous faites le samedi et le dimanche ?",
    setupVi: "Bốn câu hỏi đúng kiểu giám khảo sẽ hỏi ở phần thi số 1. Trả lời to thành tiếng.",
    must: ["frères et sœurs", "nationalité", "date de naissance", "le week-end"],
    model: "1. J'ai (un) frère et (deux) sœurs. Ils s'appellent (X), (Y) et (Z). / Non, je n'ai pas de frères et sœurs.\n2. Je suis (nationalité).\n3. Je suis né(e) le (23 janvier 1975). / Ma date de naissance est le (18 septembre 1992).\n4. Le samedi et le dimanche, je vais au / à la… / je fais…",
  },
  {
    objectif: 2, id: "po-a15", label: "Activité 15", page: 95,
    setup: "Trouvez des mots pour chaque thématique — le sport, les transports, les études — en cinq colonnes : types, verbes, lieux, personnes, autres.",
    setupVi: "Với mỗi chủ đề, liệt kê từ theo 5 cột: loại, động từ, nơi chốn, người, và các từ khác. Đây là cách tự dựng vốn từ cho phần thi số 2.",
    must: ["Le sport", "Les transports", "Les études"],
    model: "Le sport — types : football, basketball, rugby, équitation, vélo ; verbes : jouer, gagner, perdre, faire ; lieux : stade, piscine ; personnes : sportif, spectateur ; autres : inscription, jours, horaires.\nLes transports — moyens : voiture, bus, vélo, taxi, métro, moto, train, avion, bateau, tramway ; verbes : voyager, partir, arriver, attendre, réserver, visiter ; lieux : gare, aéroport, station, quai, voie, rue, route ; personnes : voyageur, chauffeur ; autres : tourisme, voyage, vol, départ, arrivée, retard, billet, ticket, réservation, bagage, valise.\nLes études — matières : cours, langues vivantes, français, anglais, mathématiques, histoire, géographie, chimie, physique ; verbes : étudier, apprendre, lire, écrire, compter, comprendre ; lieux : école, université, classe, salle ; personnes : étudiant, élève, professeur ; autres : exercice, inscription, devoirs, leçon, note, diplôme.",
  },
  {
    objectif: 2, id: "po-a17", label: "Activité 17", page: 96,
    setup: "Définissez chaque mot par 3 autres mots : Hiver — Déjeuner — Métro — Internet — Théâtre — Situation de famille. Exemple : Samedi = jour, semaine, week-end.",
    setupVi: "Mỗi từ, tìm 3 từ liên quan. Nếu lúc thi quên mất một từ, chính ba từ này sẽ cứu bạn — nói vòng quanh vẫn hơn im lặng.",
    must: ["Hiver", "Déjeuner", "Métro", "Internet", "Théâtre", "Situation de famille"],
    model: "Hiver : mois / météo / neige\nDéjeuner : plat / restaurant / manger\nMétro : transport / ticket / voyager\nInternet : ordinateur / lire / informations\nThéâtre : spectacle / billet / loisir\nSituation de famille : célibataire / marié / enfants",
  },
  {
    objectif: 2, id: "po-a21", label: "Activité 21", page: 97, piste: 79, audio: piste(79),
    setup: "Posez une question avec le mot donné : Animal — Amis — Plage — Musique — Stylo. Pour vous aider, écoutez les questions.",
    setupVi: "Với mỗi từ, đặt một câu hỏi cho giám khảo. Đây chính xác là phần thi số 2.",
    must: ["Animal", "Amis", "Plage", "Musique", "Stylo"],
    model: "1. Combien d'animaux avez-vous ? / Est-ce que vous avez un chien ? / Quel est votre animal préféré ?\n2. Combien d'amis avez-vous ? / Comment s'appelle votre meilleur ami ? / Qu'est-ce que vous faites avec vos amis ?\n3. Est-ce que vous aimez la plage ? / Où allez-vous en vacances ? / Quelle est votre plage préférée ?\n4. Quel instrument est-ce que vous jouez ? / Quel type de musique écoutez-vous ? / Est-ce que vous écoutez la radio ?\n5. Est-ce que vous avez un stylo bleu ? / Combien de stylos avez-vous ? / Où est votre stylo ?",
  },
  {
    objectif: 2, id: "po-a23", label: "Activité 23", page: 97,
    setup: "Réagissez aux affirmations. 1 — Je ne bois pas de jus d'orange. 2 — Mon numéro de téléphone est le 04.47.65.00.22. 3 — J'adore le chocolat. 4 — Je parle français et espagnol. 5 — Je vais au supermarché tous les samedis.",
    setupVi: "Phản ứng lại từng câu. Không cần dài — một câu ngắn là đủ, nhưng phải có.",
    must: ["une réaction par affirmation"],
    model: "1. Moi non plus. / Moi, j'aime le jus d'orange. / Moi, je préfère l'eau.\n2. D'accord, merci.\n3. Moi aussi. / Moi, je n'aime pas.\n4. Et moi, je parle anglais et un peu français.\n5. Ah bon ? C'est beaucoup ! / Et qu'est-ce que vous achetez ?",
  },
  {
    objectif: 3, id: "po-a28", label: "Activité 28", page: 99,
    setup: "Complétez les trois dialogues avec les formules de salutation et de prise de congé qui conviennent.",
    setupVi: "Điền lời chào đầu và cuối cho ba đoạn hội thoại. Chú ý mức thân mật: bạn bè, người bán hàng, và buổi tối muộn.",
    must: ["dialogue familier", "dialogue en magasin", "dialogue le soir"],
    model: "Dialogue n° 1 : – Salut ! Ça va ? … – Super ! À ce soir. / À tout à l'heure.\nDialogue n° 2 : – Bonjour Madame. Je voudrais une baguette s'il vous plaît. … – Merci Monsieur. Au revoir. / Bonne journée.\nDialogue n° 3 : – Bonsoir. Il est tard ! … – Au revoir. / Bonsoir. / Bonne soirée. – Bonsoir Monsieur. / Bonne soirée Monsieur.",
  },
  {
    objectif: 3, id: "po-a29", label: "Activité 29", page: 99,
    setup: "Modifiez les phrases en ajoutant une ou plusieurs formules de politesse. Exemple : « Je veux une baguette. » → « Est-ce que je peux avoir une baguette s'il vous plaît ? »",
    setupVi: "Viết lại cho lịch sự. « Je veux » nghe rất cộc — đây là lỗi mất điểm sociolinguistique.",
    must: ["1 — Je cherche un livre.", "2 — Je veux un kilo de tomates.",
           "3 — Bonjour. Combien coûte la robe ?", "4 — Voilà 22 euros. Au revoir.",
           "5 — Tu peux me donner le prix ?"],
    model: "1. Excusez-moi, je cherche un livre s'il vous plaît.\n2. Je voudrais un kilo de tomates s'il vous plaît.\n3. Bonjour Madame / Monsieur. Quel est le prix de la robe s'il vous plaît ?\n4. Voilà 22 euros. Merci. Au revoir et bonne journée.\n5. Est-ce que vous pouvez me donner le prix s'il vous plaît ?",
  },
  {
    objectif: 3, id: "po-a30", label: "Activité 30", page: 100,
    setup: "Vous souhaitez acheter les articles suivants. Posez deux questions par mot : Carottes — Cahier — Télévision — Pain — Billet de cinéma. Exemple : Chemise → « Quelles tailles de chemise est-ce que vous avez ? Combien coûte la chemise ? »",
    setupVi: "Mỗi món hỏi hai câu. Ở phần thi số 3, hỏi càng nhiều câu khác nhau càng được điểm — đừng hỏi mãi một kiểu.",
    must: ["deux questions par article"],
    model: "1. Est-ce que vous avez des carottes ? / Quel est le prix du kilo de carottes ?\n2. Est-ce que vous avez des cahiers bleus et rouges ? / Combien coûte le cahier ?\n3. Quelle est la télévision la plus grande dans le magasin ? / Est-ce que je peux acheter cette télévision ?\n4. Quel pain est-ce que vous avez ? / Combien coûte une baguette ?\n5. À quelle heure est le film ? / Quels sont les films aujourd'hui au cinéma ?",
  },
  {
    objectif: 3, id: "po-a31", label: "Activité 31", page: 100, piste: 84, audio: piste(84),
    setup: "Trouvez la question à chaque réponse. 1 — « Ce magazine coûte 1,50 €. » 2 — « Je vous apporte la carte tout de suite Madame. » 3 — « Oui, nous avons des pulls bleus. » 4 — « Non, nous acceptons seulement les cartes bancaires. » 5 — « Cette jupe, c'est du 40. »",
    setupVi: "Nghe câu trả lời rồi dựng lại câu hỏi. Bài này luyện đúng thứ bạn cần ở phần thi số 3.",
    must: ["une question par réponse"],
    model: "1. Combien coûte ce magazine ?\n2. Est-ce que je peux avoir la carte s'il vous plaît ?\n3. Est-ce que vous avez des pulls bleus ?\n4. Est-ce que je peux payer en espèces ?\n5. Quelle est la taille de cette jupe ?",
  },
  {
    objectif: 3, id: "po-a32", label: "Activité 32", page: 100,
    setup: "Vous souhaitez acheter les objets suivants. Précisez deux informations par objet pour le vendeur : CD (type de musique, type de chanteur) — Chemise (couleur, taille) — Jouet (personne, âge) — Gâteau (fête, goût) — Livre (type, année).",
    setupVi: "Mỗi món phải nêu hai chi tiết cho người bán. Nói « je voudrais un gâteau » là chưa đủ — phải nói rõ cho dịp gì, vị gì.",
    must: ["CD", "Chemise", "Jouet", "Gâteau", "Livre"],
    model: "1. Type de musique : rock, salsa, valse… / Type de chanteur : le préféré des Français, le plus vendu, jeune, groupe…\n2. Couleur : blanche, bleue, rouge… / Taille : petite, moyenne, grande, 32, 34, 36…\n3. Personne : enfant, adolescent… / Âge : 8 ans, 10 ans, 12 ans…\n4. Fête : anniversaire, départ… / Goût : chocolat, vanille, fraise…\n5. Type : roman, aventure, amour… / Année : de cette année, de 2015, de 2014…",
  },
  {
    objectif: 3, id: "po-a33", label: "Activité 33", page: 101,
    setup: "Répondez aux questions avec des détails. 1 — Qu'est-ce que vous souhaitez manger ? (entrées : salade, soupe de poissons, tomates ; plats : poisson/riz, poulet/riz, poulet/frites ; desserts : glace, tarte, crème brûlée) 2 — À quel sport est-ce que vous souhaitez vous inscrire ? 3 — Pour quel film est-ce que vous voulez un billet ?",
    setupVi: "Trả lời có chi tiết, đừng trả lời một từ. Ba tình huống: gọi món, ghi danh lớp thể thao, mua vé phim.",
    must: ["entrée + plat + dessert", "jours et horaires", "type de film et contrainte d'heure"],
    model: "1. En entrée, je voudrais la soupe de poissons. Pour le plat, je souhaite le poulet avec du riz. Et pour le dessert, la crème brûlée. Et de l'eau s'il vous plaît.\n2. Je suis disponible les lundis, mercredis et vendredis entre 17 h et 20 h. J'aime les sports avec un ballon. Je peux commencer la semaine prochaine.\n3. J'aime les films d'action et les comédies. Mais je n'aime pas les films d'amour. Je dois rentrer chez moi avant 21 h.",
  },
];

// ── S'ENTRAÎNER (p.103–106) ──────────────────────────────────────
// The nine exercices as the book sets them: three per part of the exam.
export const PO_TRAIN = [
  {
    objectif: 1, id: "po-ex1", label: "Exercice 1", page: 103, pts: 5,
    setup: "L'entretien dirigé. Vous ne préparez pas cet exercice — vous répondez directement.",
    setupVi: "Phần phỏng vấn. Đây là bài DUY NHẤT không được chuẩn bị — 10 phút chuẩn bị chỉ dành cho bài 2 và 3.",
    prompts: ["Est-ce que vous pouvez épeler votre nom ?", "Quelle est votre nationalité ?",
              "Où est-ce que vous habitez ?", "Quel est votre sport préféré ?",
              "Comment s'appellent vos parents ?"],
    model: "Mon nom s'écrit… / Je suis… / J'habite à… / J'aime le… Mon sport préféré est… / Mes parents s'appellent…",
    tips: [
      { fr: "Répondre par une phrase, pas par un mot. Exemple incorrect : « Manuel. » Exemple correct : « Je m'appelle Manuel. »",
        vi: "Trả lời cả câu. Sai: « Manuel. » Đúng: « Je m'appelle Manuel. » — giám khảo chấm khả năng nói thành câu." },
      { fr: "Si vous ne comprenez pas, demandez : « Est-ce que vous pouvez répéter s'il vous plaît ? »",
        vi: "Không hiểu thì cứ hỏi lại — đó là điều được phép, và im lặng mới là mất điểm." },
      { fr: "Si vous ne savez pas dire votre vraie réponse, inventez-en une autre : au lieu de « danse », dites « tennis ».",
        vi: "Không biết nói từ thật thì đổi sang từ bạn biết: không nhớ « danse » thì nói « tennis ». Không ai kiểm tra bạn có nói thật không." },
    ],
  },
  {
    objectif: 1, id: "po-ex2", label: "Exercice 2", page: 103, pts: 5,
    setup: "L'entretien dirigé.",
    setupVi: "Phần phỏng vấn — bộ câu hỏi thứ hai.",
    prompts: ["Parlez-moi de votre famille. Vous avez des frères et des sœurs ? Comment s'appellent-ils ?",
              "Quel est votre âge ?", "Qu'est-ce que vous faites le samedi ?",
              "Quelles langues est-ce que vous parlez ?", "Quelle est votre profession ?"],
    model: "J'ai … frère(s) et … sœur(s). Ils s'appellent… / Je n'ai pas de frères et sœurs.\nJ'ai … ans.\nLe samedi, je vais… / je fais…\nJe parle …, … et … .\nJe suis…",
  },
  {
    objectif: 1, id: "po-ex3", label: "Exercice 3", page: 103, pts: 5,
    setup: "L'entretien dirigé.",
    setupVi: "Phần phỏng vấn — bộ câu hỏi thứ ba.",
    prompts: ["Quelles sont vos activités préférées ?", "Quelle est votre adresse ?",
              "Comment est votre maison ?",
              "Parlez-moi de vos repas. Qu'est-ce que vous mangez ? À quelle heure est-ce que vous mangez ?",
              "Combien d'animaux est-ce que vous avez ? Comment ils s'appellent ?"],
    model: "Mes activités préférées sont… / J'aime…\nJ'habite…\nMa maison / Mon appartement est…\nLe matin, je mange… Le midi, je mange… Et le soir, je mange… Je mange à …h…\nJ'ai … animaux. Ils s'appellent… / Je n'ai pas d'animaux.",
  },
  {
    objectif: 2, id: "po-ex4", label: "Exercice 4", page: 104, pts: 4,
    setup: "L'échange d'informations. Vous posez des questions à l'examinateur avec les mots écrits sur les cartes.",
    setupVi: "Bốc thẻ từ và đặt câu hỏi cho giám khảo. Từ trên thẻ là CHỦ ĐỀ — không bắt buộc phải dùng đúng từ đó trong câu hỏi.",
    prompts: ["Maison ?", "Enfants ?", "Téléphone ?", "Langue ?", "Boulangerie ?", "Voyager ?"],
    model: "Maison → Comment est votre maison ? Quelle est votre pièce préférée ? Est-ce que vous habitez dans une maison ou dans un appartement ?\nEnfants → Combien avez-vous d'enfants ? Comment s'appellent vos enfants ?\nTéléphone → Quel est votre numéro de téléphone ? Est-ce que vous avez un téléphone portable ?\nLangue → Combien de langues parlez-vous ? Quelles langues est-ce que vous parlez ?\nBoulangerie → Qu'est-ce que vous achetez à la boulangerie ? Combien de fois par semaine vous y allez ?\nVoyager → Où est-ce que vous voyagez ? Quel est votre pays préféré ? Avec qui est-ce que vous voyagez ?",
    tips: [
      { fr: "Variez les mots interrogatifs : combien, comment, quand, quel, est-ce que. N'utilisez pas seulement « est-ce que ».",
        vi: "Đổi từ để hỏi liên tục: combien, comment, quand, quel, est-ce que. Hỏi mãi bằng « est-ce que » là tự giới hạn điểm của mình." },
      { fr: "Vous interrogez l'examinateur sur LUI. Correct : « Quel est votre monument préféré ? » Incorrect : « Quel est le monument préféré des Français ? »",
        vi: "Hỏi về CHÍNH giám khảo, không hỏi chung chung. Đúng: « votre monument préféré ». Sai: « le monument préféré des Français »." },
      { fr: "Réagissez après chaque réponse : « Moi aussi », « Moi non plus », un sourire, un signe de tête.",
        vi: "Sau mỗi câu trả lời phải có phản ứng — một câu ngắn, một cái gật đầu. Đây là tiêu chí được chấm." },
    ],
  },
  {
    objectif: 2, id: "po-ex5", label: "Exercice 5", page: 105, pts: 4,
    setup: "L'échange d'informations.",
    setupVi: "Bộ thẻ từ thứ hai.",
    prompts: ["Profession ?", "Dormir ?", "Couleur ?", "Devoirs ?", "Vélo ?", "Cinéma ?"],
    model: "Profession → Quelle est votre profession ?\nDormir → À quelle heure est-ce que vous dormez ?\nCouleur → Est-ce que vous aimez le bleu ?\nDevoirs → Où est-ce que vous faites vos devoirs ?\nVélo → Quand faites-vous du vélo ?\nCinéma → Est-ce que vous allez au cinéma avec vos amis ou avec votre famille ?",
  },
  {
    objectif: 2, id: "po-ex6", label: "Exercice 6", page: 105, pts: 4,
    setup: "L'échange d'informations.",
    setupVi: "Bộ thẻ từ thứ ba.",
    prompts: ["Nationalité ?", "Famille ?", "Animal ?", "Internet ?", "Heure ?", "Sport ?"],
    model: "Nationalité → Quelle est votre nationalité ?\nFamille → Comment s'appelle votre frère ?\nAnimal → Combien d'animaux est-ce que vous avez ?\nInternet → Quand est-ce que vous utilisez internet ?\nHeure → À quelle heure est-ce que vous arrivez au travail ?\nSport → Est-ce que vous jouez au football ?",
  },
  {
    objectif: 3, id: "po-ex7", label: "Exercice 7", page: 105, pts: 7,
    setup: "Dans un magasin de vêtements. Vous allez dans un magasin de vêtements à Paris. Vous demandez des informations sur les vêtements (tailles, couleurs, prix). Vous achetez deux ou trois articles et vous payez. L'examinateur joue le rôle du vendeur.",
    setupVi: "Đóng vai khách ở cửa hàng quần áo Paris: hỏi size, màu, giá; mua 2–3 món rồi trả tiền. Giám khảo đóng vai người bán — luôn dùng « vous ».",
    prompts: ["un pantalon beige", "une jupe", "une chemise", "un pull noir",
              "un manteau", "des chaussures", "un chapeau", "une ceinture"],
    model: "– Bonjour Madame. Est-ce que vous avez un pantalon bleu s'il vous plaît ?\n– Bien sûr. Quelle est votre taille ?\n– Excusez-moi, est-ce que vous pouvez répéter s'il vous plaît ?\n– Quelle taille souhaitez-vous ?\n– 38 s'il vous plaît. Quel est le prix ?\n– C'est 19 euros.\n– Merci. Je paye en espèces. Bonne journée !",
    tips: [
      { fr: "Préparez trois choses sur le brouillon : les questions (tailles, couleurs, prix), les formules de politesse, et quelques phrases toutes faites.",
        vi: "Trong 10 phút chuẩn bị, ghi ra nháp ba thứ: câu hỏi (size / màu / giá), lời lịch sự, và vài câu dựng sẵn." },
      { fr: "Vous ne connaissez pas le vendeur : utilisez toujours « vous ».",
        vi: "Người bán là người lạ — luôn « vous », không bao giờ « tu »." },
      { fr: "Prendre son temps : on peut faire une pause, demander de répéter, dire non et demander autre chose.",
        vi: "Được phép dừng lại nghĩ, xin nhắc lại, từ chối rồi hỏi món khác. Đây là hội thoại, không phải bài đọc thuộc lòng." },
    ],
  },
  {
    objectif: 3, id: "po-ex8", label: "Exercice 8", page: 106, pts: 7,
    setup: "Au restaurant. Vous êtes au restaurant à Nice. Vous demandez la carte et vous commandez une entrée, un plat et un dessert. Vous demandez l'addition et vous payez. L'examinateur joue le rôle du serveur.",
    setupVi: "Ở nhà hàng tại Nice: xin thực đơn, gọi khai vị + món chính + tráng miệng, xin hoá đơn rồi trả tiền.",
    prompts: ["la carte", "une entrée", "un plat", "un dessert", "une boisson", "l'addition"],
    model: "– Bonjour Madame. Est-ce que je peux avoir la carte s'il vous plaît ?\n– Voilà Monsieur.\n– Merci. En entrée, je voudrais la soupe de poissons. Pour le plat, le poulet avec du riz. Et pour le dessert, la crème brûlée. Et de l'eau s'il vous plaît.\n– Très bien.\n– L'addition s'il vous plaît. Est-ce que je peux payer par carte ?",
  },
  {
    objectif: 3, id: "po-ex9", label: "Exercice 9", page: 106, pts: 7,
    setup: "Au centre de loisirs. Vous habitez à Bastia, en Corse. Vous allez au centre de loisirs pour vous inscrire à un sport. Vous demandez des informations (jours, horaires, prix), vous vous inscrivez et vous payez. L'examinateur joue le rôle de l'animateur.",
    setupVi: "Ở trung tâm sinh hoạt tại Bastia: hỏi ngày, giờ, giá của một môn thể thao, rồi ghi danh và trả tiền.",
    prompts: ["le sport", "les jours", "les horaires", "le prix", "l'inscription", "le paiement"],
    model: "– Bonjour Madame. Je voudrais m'inscrire à un sport s'il vous plaît. Quels sports est-ce que vous avez ?\n– Nous avons le football, le tennis et la natation.\n– Le tennis, c'est quels jours ? Et à quelle heure ?\n– Le mardi et le jeudi, de 18 h à 20 h.\n– Très bien. Quel est le prix pour l'année ?\n– C'est 120 euros.\n– D'accord, je m'inscris. Est-ce que je peux payer par carte ? Merci beaucoup, bonne journée !",
  },
];

// The book's three speaking objectifs — the three parts of the exam.
export const PO_OBJECTIFS = [
  { num: 1, fr: "L'entretien dirigé" },
  { num: 2, fr: "L'échange d'informations" },
  { num: 3, fr: "Le dialogue simulé" },
];
