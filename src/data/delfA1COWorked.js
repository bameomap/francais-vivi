// Compréhension de l'oral — the S'ENTRAÎNER worked examples,
// « Le DELF A1 100 % réussite » Exercices 1, 4, 7, 10 and 13 (p.28–36).
//
// One exercice per objectif is printed already solved: the tick is drawn in
// green and the book's method notes run alongside in pink. Because they are
// solved on the page, the Corrigés have no entry for them — which is why
// scripts/delf-a1-parse-co-train.py drops them ("worked example, no key").
//
// So they are written out here as walkthroughs, `worked: true`, exactly like
// the reading ones in delfA1Reussite.js: the answer is revealed from the start
// and each question carries the book's own note on how to get there. The value
// is the method, not the score, so these are excluded from the progress count.
//
// Answers are read off the printed page (the green ticks and the numbers filled
// into Exercice 10's blanks), then checked against the transcripts on p.139.
// The notes are the book's, translated where a Vietnamese gloss helps.

const piste = n => `/api/delf-audio?p=${n}`;
const DOC = "/delf-a1/docs";
const OPT = "/delf-a1/options";

export const CO_WORKED = [
  {
    objectif: 1, id: "co-ex1", label: "Exercice 1", page: 28, piste: 59, pts: 4, worked: true,
    setup: "Lisez les questions. Écoutez le document puis répondez. Vous écoutez ce message sur votre répondeur.",
    setupVi: "Nghe tin nhắn trên hộp thư thoại rồi trả lời.",
    audio: piste(59),
    tip: "Lisez les questions et surlignez les mots importants : « aller où ? » = un lieu ; « quel jour ? » = un jour de la semaine. Préparez votre brouillon avant la 1re écoute et notez les mots clés.",
    tipVi: "Đọc câu hỏi trước và gạch chân từ khoá: hỏi « où » → đáp án là một NƠI CHỐN; hỏi « quel jour » → là một THỨ trong tuần. Biết trước dạng đáp án thì khi nghe chỉ cần bắt đúng loại thông tin đó.",
    transcript:
      "Allô ? Bonjour, c'est Hugo. Avec mes amis, Carlos et Anna, nous allons au cinéma mardi soir. " +
      "Est-ce que tu veux venir ? Il y a un super film sur le nord de la France ! Rendez-vous à 18 h 30 " +
      "devant le cinéma. Tu peux venir avec Carmen bien sûr. Appelle-moi ! À bientôt.",
    questions: [
      { q: "Hugo vous propose d'aller où ?", pts: 1,
        options: ["Au cinéma.", "Au théâtre.", "Au restaurant."], answer: "Au cinéma.",
        note: "La question attend un lieu : « nous allons au cinéma »." },
      { q: "Quel jour est le rendez-vous ?", pts: 1,
        options: ["Mardi.", "Mercredi.", "Jeudi."], answer: "Mardi.",
        note: "La question attend un jour de la semaine : « mardi soir »." },
      { q: "À quelle heure est le rendez-vous ?", pts: 1,
        options: ["18 h 00.", "18 h 30.", "19 h 00."], answer: "18 h 30.",
        note: "Les trois choix sont proches : écoutez les minutes autant que l'heure." },
      { q: "Avec qui est-ce que vous pouvez venir ?", pts: 1,
        options: ["Anna.", "Carlos.", "Carmen."], answer: "Carmen.",
        note: "Le document donne quatre prénoms. Notez-les tous sur le brouillon, puis distinguez les amis d'Hugo (Carlos, Anna) de la personne qui peut venir avec VOUS : « tu peux venir avec Carmen »." },
    ],
  },
  {
    objectif: 2, id: "co-ex4", label: "Exercice 4", page: 30, piste: 62, pts: 4, worked: true,
    setup: "Lisez les questions. Écoutez le document puis répondez. Vous entendez cette annonce dans un magasin.",
    setupVi: "Bạn nghe thông báo này trong một cửa hàng.",
    audio: piste(62),
    tip: "Lisez attentivement la consigne : vous êtes dans un magasin = vous êtes un client, et une annonce = des informations importantes.",
    tipVi: "Đọc kỹ đề: bạn đang ở trong cửa hàng → bạn là khách; đây là thông báo → toàn thông tin quan trọng.",
    transcript:
      "Chers clients, aujourd'hui, vendredi, nous vous rappelons le début de la grande promotion sur tous " +
      "les disques de notre magasin. 25 % de réduction ! Oui, 25 % de réduction ! Retrouvez les disques à " +
      "côté des livres. Attention, la réduction est valable jusqu'au 13 mai uniquement.",
    questions: [
      { q: "La promotion est sur quel objet ?", pts: 1,
        kind: "image", src: `${OPT}/co-ex4-q1.webp`, options: ["a", "b", "c"], answer: "b",
        note: "Repérez le mot important de la question — « objet » — et concentrez-vous sur les objets nommés dans le document : « la grande promotion sur tous les disques »." },
      { q: "Quel est le pourcentage de réduction ?", pts: 1,
        options: ["15 %.", "25 %.", "35 %."], answer: "25 %.",
        note: "La réponse attendue est un chiffre. « % » se prononce « pour cent »." },
      { q: "Où sont les livres et les disques ?", pts: 1,
        kind: "image", src: `${OPT}/co-ex4-q3.webp`, options: ["a", "b", "c"], answer: "a",
        note: "Avant l'écoute, décrivez les images dans votre tête : « les disques sont à côté des livres », « les disques sont en dessous des livres »… Vous vous préparez ainsi à entendre la bonne phrase." },
      { q: "La réduction est valable jusqu'au…", pts: 1,
        options: ["3 mai.", "13 mai.", "16 mai."], answer: "13 mai.",
        note: "Sur le brouillon, avant la 1re écoute, écrivez les chiffres en lettres : 3 = trois, 13 = treize, 16 = seize." },
    ],
  },
  {
    objectif: 3, id: "co-ex7", label: "Exercice 7", page: 32, piste: 65, pts: 4, worked: true,
    setup: "Lisez les questions. Écoutez le document puis répondez. Vous cherchez un travail en France. Vous entendez ce message sur votre répondeur.",
    setupVi: "Bạn đang tìm việc ở Pháp và nghe tin nhắn này trên hộp thư thoại.",
    audio: piste(65),
    tip: "Vous êtes en France, le message s'adresse à vous. C'est un message professionnel : entretien, travail.",
    tipVi: "Tin nhắn này gửi cho chính bạn, trong bối cảnh công việc: phỏng vấn, xin việc.",
    transcript:
      "Bonjour, c'est Madame Laforêt de l'entreprise Guy Mauve. Je vous appelle pour le travail de " +
      "secrétaire. L'entretien avec le directeur est jeudi à quinze heures quarante-cinq. Pouvez-vous " +
      "apporter votre CV et une photocopie de votre pièce d'identité ? Merci de vous présenter à la " +
      "porte E. Au revoir.",
    questions: [
      { q: "L'entretien est pour quel travail ?", pts: 1,
        options: ["Vendeur.", "Directeur.", "Secrétaire."], answer: "Secrétaire.",
        note: "Deux des trois mots sont dans le document : « directeur » et « secrétaire ». Notez-les pendant la 1re écoute, puis pendant la 2e écoutez le mot « travail » de la question — c'est lui qui départage : « le travail de secrétaire »." },
      { q: "À quelle heure est l'entretien ?", pts: 1,
        options: ["À 13 h 45.", "À 15 h 45.", "À 16 h 45."], answer: "À 15 h 45.",
        note: "Les minutes sont « 45 » dans les trois choix. Concentrez-vous sur l'heure : 13 (treize), 15 (quinze) ou 16 (seize)." },
      { q: "Pour l'entretien, vous devez apporter la photocopie de quel document ?", pts: 1,
        options: ["Mon CV.", "Ma pièce d'identité.", "Ma lettre de motivation."], answer: "Ma pièce d'identité.",
        note: "Soulignez les mots importants : photocopie, document. Le CV est demandé lui aussi, mais pas en photocopie : « une photocopie de votre pièce d'identité »." },
      { q: "À quelle porte est-ce que vous devez vous présenter ?", pts: 1,
        options: ["Porte E.", "Porte I.", "Porte U."], answer: "Porte E.",
        note: "La différence porte sur les voyelles « E », « I », « U ». Avant la 1re écoute, prononcez-les dans votre tête." },
    ],
  },
  {
    objectif: 4, id: "co-ex10", label: "Exercice 10", page: 34, piste: 68, pts: 8, worked: true,
    setup: "Vous allez entendre quatre petits dialogues correspondant à quatre situations différentes. Notez, sous chaque image, le numéro du dialogue qui correspond. Attention, il y a six images (A, B, C, D, E et F) mais seulement quatre dialogues.",
    setupVi: "Nghe 4 hội thoại rồi ghi số hội thoại dưới hình tương ứng. Có 6 hình nhưng chỉ 4 hội thoại — hai hình sẽ để trống.",
    audio: piste(68),
    tip: "Soyez attentif aux détails : image C = horloge 7 h 45, image D = horloge 9 h 45. Repérez aussi si les images montrent des adultes ou des enfants, et le contexte : à l'école, à la maison, dans une bibliothèque, dans la rue. Pendant l'écoute, écrivez des mots sur votre brouillon avant d'écrire votre réponse — exemple : dialogue n° 1 = retard, petit déjeuner.",
    tipVi: "Để ý chi tiết nhỏ: đồng hồ trong hình C chỉ 7 h 45, hình D chỉ 9 h 45. Xem là người lớn hay trẻ em, và bối cảnh: trường học, ở nhà, thư viện, ngoài phố. Khi nghe, ghi từ khoá ra nháp trước rồi mới điền.",
    doc: { kind: "image", src: `${DOC}/co-ex10.webp`, alt: "Six situations, A–F, avec les réponses du livre" },
    transcript:
      "1. – Dépêche-toi, tu vas être en retard pour l'école !\n– J'ai bientôt fini mon petit déjeuner.\n" +
      "2. – Excusez-moi, vous connaissez la date de la réunion avec les professeurs ?\n– Oui, c'est jeudi.\n– Merci. Et c'est dans quelle salle ?\n– C'est dans la bibliothèque de l'école.\n" +
      "3. – C'est à quelle heure le cours de mathématiques ?\n– À 10 h 00.\n– Ah, ça va. Encore 15 minutes.\n" +
      "4. – Bonjour. Ici, c'est la bibliothèque. Vous pouvez prendre des livres.\n– Super ! Et des films aussi ?\n– Oui, tu peux prendre des films aussi.",
    questions: [
      { q: "Image A", options: ["n° 1", "n° 2", "n° 3", "n° 4", "Aucune situation"], answer: "Aucune situation",
        note: "Il y a six images et seulement quatre dialogues : deux images restent sans numéro." },
      { q: "Image B", options: ["n° 1", "n° 2", "n° 3", "n° 4", "Aucune situation"], answer: "n° 4",
        note: "« Ici, c'est la bibliothèque. Vous pouvez prendre des livres » — on présente le lieu à un groupe." },
      { q: "Image C", options: ["n° 1", "n° 2", "n° 3", "n° 4", "Aucune situation"], answer: "n° 1",
        note: "Le petit déjeuner, et l'horloge à 7 h 45 : « tu vas être en retard pour l'école »." },
      { q: "Image D", options: ["n° 1", "n° 2", "n° 3", "n° 4", "Aucune situation"], answer: "n° 3",
        note: "L'horloge à 9 h 45 : « le cours de mathématiques… à 10 h 00. Encore 15 minutes »." },
      { q: "Image E", options: ["n° 1", "n° 2", "n° 3", "n° 4", "Aucune situation"], answer: "n° 2",
        note: "Deux adultes devant l'école : on demande la date et la salle de la réunion des professeurs." },
      { q: "Image F", options: ["n° 1", "n° 2", "n° 3", "n° 4", "Aucune situation"], answer: "Aucune situation",
        note: "La deuxième image sans numéro." },
    ],
  },
  {
    objectif: 5, id: "co-ex13", label: "Exercice 13", page: 36, piste: 71, pts: 5, worked: true,
    setup: "Vous allez entendre un message. Quels objets sont donnés dans le message ? Vous entendez le nom de l'objet ? Cochez OUI. Sinon, cochez NON.",
    setupVi: "Nghe tin nhắn. Nghe thấy TÊN đồ vật thì chọn OUI, không nghe thấy thì chọn NON.",
    audio: piste(71),
    tip: "Après la lecture de la consigne, regardez les 5 objets et prononcez leur nom dans votre tête — entre la consigne et la 1re écoute il n'y a que 15 secondes. Les objets sont mélangés : ils ne sont pas dans l'ordre du message.",
    tipVi: "Đọc đề xong hãy nhìn 5 đồ vật và tự đọc tên chúng trong đầu — từ lúc đọc đề tới lần nghe đầu chỉ có 15 giây. Thứ tự hình không theo thứ tự trong tin nhắn.",
    doc: { kind: "image", src: `${DOC}/co-ex13-a.webp`, src2: `${DOC}/co-ex13-b.webp`,
           alt: "Cinq objets, avec les réponses du livre" },
    transcript:
      "Bonjour, c'est Pierre. Tu veux venir à la maison ce soir ? Il y a un super film à la télévision. " +
      "Viens à 20 heures ! Tu as la clé de l'appartement alors tu peux entrer. Je prépare des pâtes à la " +
      "sauce tomate. Tu peux apporter du pain ? Merci, à tout à l'heure.",
    questions: [
      { lead: "Objet n° 1", q: "Vous entendez le nom de cet objet ?", pts: 1,
        options: ["OUI", "NON"], answer: "NON",
        note: "Le message parle d'un film « à la télévision », pas d'un billet de cinéma." },
      { lead: "Objet n° 2", q: "Vous entendez le nom de cet objet ?", pts: 1,
        options: ["OUI", "NON"], answer: "OUI",
        note: "« Tu peux apporter du pain ? » — le mot arrive à la toute fin du message." },
      { lead: "Objet n° 3", q: "Vous entendez le nom de cet objet ?", pts: 1,
        options: ["OUI", "NON"], answer: "OUI",
        note: "« un super film à la télévision »." },
      { lead: "Objet n° 4", q: "Vous entendez le nom de cet objet ?", pts: 1,
        options: ["OUI", "NON"], answer: "OUI",
        note: "« Tu as la clé de l'appartement »." },
      { lead: "Objet n° 5", q: "Vous entendez le nom de cet objet ?", pts: 1,
        options: ["OUI", "NON"], answer: "NON",
        note: "Le piège de l'exercice : on peut manger des pâtes à la sauce tomate avec du fromage, mais il ne faut pas interpréter ni déduire. Le mot « fromage » n'est pas dans le message, donc c'est NON.",
        vi: "Bẫy của bài: mì sốt cà chua thường ăn kèm phô mai, nhưng không được suy diễn — phải NGHE THẤY từ « fromage » mới được chọn OUI." },
    ],
  },
];
