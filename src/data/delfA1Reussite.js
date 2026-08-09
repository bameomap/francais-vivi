// « Le DELF A1 100 % réussite » (Didier FLE, 2e édition 2022)
// — Épreuve 2 : Compréhension des écrits, p.41–70.
//
// The book teaches one skill per objectif in two passes: SE PRÉPARER drills the
// sub-skill on short activités, then S'ENTRAÎNER runs full exam-format exercices
// with points. Both passes are kept, in the book's order, because the second
// only makes sense after the first.
//
// Answers come from the book's own Corrigés (p.147–149). Exercices 1, 4, 7 and
// 10 have no entry there — they are the book's worked examples, printed with
// their answers already ticked and a method note under every question. Those
// carry `worked: true` and are shown as solved walkthroughs rather than quizzes;
// pretending they are unanswered would be a lie, since the crops show the ticks.
//
// Documents set in the book's handwriting face can't be extracted as text (the
// glyphs carry no Unicode mapping — see scripts/delf-a1-crop.py), so those, and
// every picture-choice question, are page crops under public/delf-a1/.

const IMG = "/delf-a1";

// ── OBJECTIF 1 · Suivre des instructions simples ─────────────────
const ACT1 = {
  id: "act1", label: "Activité 1", page: 44,
  setup: "Vous trouvez ce message sur la table de la cuisine.",
  setupVi: "Bạn thấy tin nhắn này trên bàn bếp.",
  doc: { kind: "image", src: `${IMG}/docs/act1-doc.webp`, alt: "Mot de Juliette" },
  questions: [
    { q: "Qui vous écrit ?", vi: "Ai viết cho bạn?",
      options: ["Maria.", "Étienne.", "Juliette."], answer: "Juliette." },
    { q: "Qu'est-ce que vous faites en fin de journée ?", vi: "Cuối ngày bạn làm gì?",
      options: ["Vous recevez des amis.", "Vous regardez un film.", "Vous allez au restaurant."],
      answer: "Vous recevez des amis." },
    { q: "Étienne et Maria viennent avec quoi ?", vi: "Étienne và Maria mang gì tới?",
      options: ["Des fleurs.", "Des desserts.", "Des boissons."], answer: "Des desserts." },
    { q: "On vous écrit pour vous demander quoi ?", vi: "Người ta nhắn nhờ bạn làm gì?",
      kind: "image", src: `${IMG}/options/act1-q4.webp`, answer: "A" },
    { q: "À quelle heure Juliette revient ?", vi: "Mấy giờ Juliette về?",
      options: ["À 13 h 30.", "À 15 h 30.", "À 19 h 30."], answer: "À 15 h 30." },
  ],
};

const ACT2 = {
  id: "act2", label: "Activité 2", page: 44,
  setup: "Vous arrivez dans une auberge et vous voyez ce message à l'entrée.",
  setupVi: "Bạn đến một nhà trọ và thấy thông báo này ở lối vào.",
  doc: {
    kind: "text", style: "affiche", title: "Chers clients,",
    paras: [
      "– Dans l'auberge, vous pouvez payer par carte bancaire, mais nous ne prenons pas les chèques. C'est pareil pour les dollars (il y a un bureau de change à 100 mètres).",
      "– Dans la cuisine, il faut laver vos plats, verres et assiettes.",
      "– Dans les chambres, vous ne devez pas faire de bruit après 21 h.",
      "– Dans la salle de bains, vous devez garder les lieux propres.",
      "Le jour de votre départ, passez à la réception avant 10 h 30.",
      "Rappel : le petit déjeuner est servi de 7 h à 9 h 30.",
      "Bon séjour !",
      "La direction",
    ],
  },
  questions: [
    { q: "Pour qui est ce message ?", vi: "Thông báo này dành cho ai?",
      options: ["Les cuisiniers.", "Les voyageurs.", "Les directeurs."], answer: "Les voyageurs." },
    { q: "Comment pouvez-vous payer dans l'auberge ?", vi: "Bạn có thể trả tiền bằng cách nào?",
      kind: "image", src: `${IMG}/options/act2-q2.webp`, answer: "B" },
    { q: "Où faut-il faire silence le soir ?", vi: "Buổi tối phải giữ yên lặng ở đâu?",
      options: ["Dans la cuisine.", "Dans les chambres.", "Dans la salle de bains."],
      answer: "Dans les chambres." },
    { q: "Qu'est-ce que vous devez faire avant de partir ?", vi: "Trước khi rời đi bạn phải làm gì?",
      options: ["Passer à la réception.", "Ranger votre chambre.", "Laver vos plats, verres et assiettes."],
      answer: "Passer à la réception." },
    { q: "À quelle heure pouvez-vous boire un jus d'orange et manger un croissant ?",
      vi: "Mấy giờ bạn có thể uống nước cam và ăn bánh sừng bò?",
      kind: "image", src: `${IMG}/options/act2-q5.webp`, answer: "B" },
  ],
};

const ACT3 = {
  id: "act3", label: "Activité 3", page: 45,
  setup: "Vous recevez ce document par erreur.",
  setupVi: "Bạn nhận nhầm tài liệu này.",
  doc: {
    kind: "text", style: "carte", title: "Salut Mélanie,",
    paras: [
      "Est-ce que tu passes de belles vacances en Bretagne ? Je suis arrivée lundi dernier à Genève en Suisse. Il fait un temps magnifique. Je me promène dans le centre-ville, je fais du vélo et je lis des livres dans les cafés. Jeudi, je vais visiter Lausanne et dîner dans un restaurant à côté du lac Léman. Je reviens en train à Paris dimanche soir.",
      "Téléphone-moi quand tu peux.",
      "Je t'embrasse,",
      "Ana",
    ],
    aside: ["Mélanie Lombard", "34 rue des chênes", "29000 Quimper", "France"],
  },
  questions: [
    { q: "Qu'est-ce que c'est ?", vi: "Đây là gì?",
      options: ["Un courriel.", "Une publicité.", "Une carte postale."], answer: "Une carte postale." },
    { q: "Où est Mélanie ?", vi: "Mélanie đang ở đâu?",
      options: ["À Paris.", "En Suisse.", "En Bretagne."], answer: "En Bretagne." },
    { q: "Qu'est-ce que fait Ana ?", vi: "Ana làm gì?",
      kind: "image", src: `${IMG}/options/act3-q3.webp`, answer: "B" },
    { q: "Quand Ana rentre en France ?", vi: "Khi nào Ana về Pháp?",
      options: ["Lundi.", "Jeudi.", "Dimanche."], answer: "Dimanche." },
    { q: "Qu'est-ce que doit faire Mélanie ?", vi: "Mélanie phải làm gì?",
      options: ["Venir.", "Écrire.", "Appeler."], answer: "Appeler." },
  ],
};

const ACT4 = {
  id: "act4", label: "Activité 4", page: 45,
  setup: "Vous recevez ce message dans votre boîte aux lettres.",
  setupVi: "Bạn nhận được thiệp này trong hộp thư.",
  doc: {
    kind: "text", style: "invitation", title: "Laurine et Antoine",
    paras: [
      "vous attendent le samedi 30 juillet pour fêter leur bonheur.",
      "Cérémonie civile 14 h 30 • Mairie, 23 rue Auguste Renoir",
      "Vin d'honneur 17 h 30 • Salle des fêtes, 32 rue Émile Zola",
      "Dîner 20 h 00 • Salle des fêtes, 32 rue Émile Zola",
      "Soirée concert 22 h 30 • Salle des fêtes, 32 rue Émile Zola",
      "Pour réserver une chambre, contactez Marion et Mathieu avant le 25 juin.",
      "Réponse souhaitée avant le 28 mai. — Laurine et Antoine, 12, rue de Loire 37100 Tours",
    ],
  },
  questions: [
    { q: "Ce message est une invitation pour quoi ?", vi: "Thiệp mời nhân dịp gì?",
      options: ["Un mariage.", "Une naissance.", "Un anniversaire."], answer: "Un mariage." },
    { q: "Qui vous invite ?", vi: "Ai mời bạn?",
      options: ["Laurine et Antoine.", "Marion et Mathieu.", "Laurine et Mathieu."],
      answer: "Laurine et Antoine." },
    { q: "Vous êtes invité quand ?", vi: "Bạn được mời vào ngày nào?",
      options: ["Le 28 mai.", "Le 25 juin.", "Le 30 juillet."], answer: "Le 30 juillet." },
    { q: "Dans combien de lieux différents on vous invite ?", vi: "Bạn được mời tới bao nhiêu địa điểm khác nhau?",
      options: ["2.", "3.", "4."], answer: "2." },
    { q: "À quelle heure vous pouvez écouter de la musique et danser ?",
      vi: "Mấy giờ bạn có thể nghe nhạc và nhảy?",
      options: ["À 17 h 30.", "À 20 h 00.", "À 22 h 30."], answer: "À 22 h 30." },
  ],
};

const EX1 = {
  id: "ex1", label: "Exercice 1", page: 56, pts: 6, worked: true,
  setup: "Vous recevez ce message.",
  setupVi: "Bạn nhận được tin nhắn này.",
  tip: "Lisez d'abord les questions avant de lire le document.",
  tipVi: "Đọc câu hỏi TRƯỚC khi đọc tài liệu — để biết cần tìm thông tin gì.",
  doc: {
    kind: "text", style: "mail", title: "Salut les amis !",
    paras: [
      "Je vous invite les 11 et 12 mai dans ma maison de campagne.",
      "Voici le programme : samedi, nous déjeunons avec Émilie près d'un lac et après nous nous promenons. Dimanche, nous visitons un château et nous mangeons le soir avec Clément au restaurant. Vous pouvez arriver vendredi soir. La gare est à côté. Quand vous arrivez, vous m'appelez et je viens vous chercher en voiture. Prenez des pulls parce que le soir il fait 10 degrés. J'attends votre réponse.",
      "À bientôt,",
      "Christophe",
    ],
  },
  questions: [
    { q: "Qui vous écrit ce message ?", vi: "Ai viết tin nhắn này?", pts: 1,
      options: ["Émilie.", "Clément.", "Christophe."], answer: "Christophe.",
      note: "On vous demande de trouver qui vous invite." },
    { q: "Où est-ce que vous allez samedi ?", vi: "Thứ Bảy bạn đi đâu?", pts: 1.5,
      kind: "image", src: `${IMG}/options/ex1-q2.webp`, answer: "A",
      note: "Dans le message : « samedi… près d'un lac ». À vous de trouver l'image." },
    { q: "Quand est-ce que vous dînez à l'extérieur ?", vi: "Khi nào bạn ăn tối bên ngoài?", pts: 1,
      options: ["Vendredi.", "Samedi.", "Dimanche."], answer: "Dimanche.",
      note: "Dans le message : « manger le soir au restaurant »." },
    { q: "Comment est-ce que Christophe va aller à la gare ?", vi: "Christophe ra ga bằng gì?", pts: 1.5,
      kind: "image", src: `${IMG}/options/ex1-q4.webp`, answer: "C",
      note: "Dans le texte : « je viens vous chercher en voiture »." },
    { q: "Quelle est la température le soir ?", vi: "Buổi tối nhiệt độ bao nhiêu?", pts: 1,
      options: ["10 degrés.", "11 degrés.", "12 degrés."], answer: "10 degrés.",
      note: "Cherchez les chiffres. Pour une température, on utilise « degrés »." },
  ],
};

const EX2 = {
  id: "ex2", label: "Exercice 2", page: 57, pts: 6,
  setup: "Vous lisez ce message.",
  setupVi: "Bạn đọc tin nhắn này.",
  doc: { kind: "image", src: `${IMG}/docs/ex2-doc.webp`, alt: "Mot de Pascal" },
  questions: [
    { q: "On vous invite à quoi ?", vi: "Bạn được mời dự gì?", pts: 1,
      options: ["À un dîner.", "À un mariage.", "À un anniversaire."], answer: "À un anniversaire." },
    { q: "Quelle est l'activité de samedi après-midi ?", vi: "Chiều thứ Bảy làm hoạt động gì?", pts: 1.5,
      kind: "image", src: `${IMG}/options/ex2-q2.webp`, answer: "A" },
    { q: "Quand Pascal vous invite chez lui ?", vi: "Khi nào Pascal mời bạn đến nhà?", pts: 1,
      options: ["Vendredi.", "Samedi.", "Dimanche."], answer: "Dimanche." },
    { q: "Quelle est l'adresse de la soirée chez Pascal ?", vi: "Địa chỉ buổi tiệc tối ở nhà Pascal?", pts: 1,
      options: ["20, rue Vauban.", "18, rue Jean Moulin.", "15, rue Louis Pasteur."],
      answer: "18, rue Jean Moulin." },
    { q: "Vous devez venir avec quoi ?", vi: "Bạn phải mang theo gì?", pts: 1.5,
      kind: "image", src: `${IMG}/options/ex2-q5.webp`, answer: "A" },
  ],
};

const EX3 = {
  id: "ex3", label: "Exercice 3", page: 58, pts: 6,
  setup: "Vous lisez ce message sur le réfrigérateur.",
  setupVi: "Bạn đọc mẩu giấy này trên tủ lạnh.",
  doc: { kind: "image", src: `${IMG}/docs/ex3-doc.webp`, alt: "Mot d'Alex" },
  questions: [
    { q: "Quel document est-ce que vous devez prendre à l'ambassade ?",
      vi: "Bạn phải lấy giấy tờ gì ở đại sứ quán?", pts: 1.5,
      kind: "image", src: `${IMG}/options/ex3-q1.webp`, answer: "B" },
    { q: "Quels sont les horaires d'ouverture de l'ambassade ?", vi: "Đại sứ quán mở cửa giờ nào?", pts: 1,
      options: ["De 9 h à 12 h.", "De 13 h 30 à 17 h 30.", "De 9 h à 19 h."], answer: "De 9 h à 12 h." },
    { q: "Qu'est-ce que vous devez envoyer à la poste ?", vi: "Bạn phải gửi gì ở bưu điện?", pts: 1.5,
      kind: "image", src: `${IMG}/options/ex3-q3.webp`, answer: "C" },
    { q: "Pourquoi est-ce que vous devez aller chez Clara ?", vi: "Tại sao bạn phải đến nhà Clara?", pts: 1,
      options: ["Pour donner le chien à Clara.", "Pour garder le chien de Clara.", "Pour prendre le chien de Clara."],
      answer: "Pour donner le chien à Clara." },
    { q: "Où est-ce que Clara habite ?", vi: "Clara sống ở đâu?", pts: 1,
      options: ["Avenue Claude Debussy.", "Boulevard Paul Cézanne.", "Rue Antoine de Saint-Exupéry."],
      answer: "Boulevard Paul Cézanne." },
  ],
};

// ── OBJECTIF 2 · Lire pour s'orienter dans l'espace ───────────────
const ACT5 = {
  id: "act5", label: "Activité 5", page: 46,
  setup: "Vous marchez dans la rue et une personne vous donne ce document.",
  setupVi: "Bạn đang đi trên phố và một người đưa cho bạn tờ này.",
  doc: {
    kind: "text", style: "affiche", title: "Des sports et des arts près de chez vous !",
    paras: [
      "Le Centre culturel situé au 14, rue Richard Lenoir vous propose des sports et des arts.",
      "Pour vous inscrire, venez à l'accueil du Centre situé au 55, rue Auguste Comte, avec une photo, un certificat médical et un chèque.",
    ],
    cards: [
      { title: "Salsa / tango", lines: ["24, rue Albert Thomas", "Lundi de 10 h à 12 h", "Professeur Guerin"] },
      { title: "Football / rugby", lines: ["34, rue Joseph Gillet", "Mercredi de 14 h à 16 h", "Professeur Roussel"] },
      { title: "Dessin / peinture", lines: ["15, rue Antoine Lumière", "Vendredi de 18 h 30 à 20 h 30", "Professeur Germain"] },
    ],
    footer: "Pour toute information : 01.34.65.23.55",
  },
  questions: [
    { q: "On vous propose quoi ?", vi: "Người ta mời bạn cái gì?",
      options: ["Des fêtes.", "Des cours.", "Des vacances."], answer: "Des cours." },
    { q: "Où allez-vous pour payer ?", vi: "Bạn đến đâu để đóng tiền?",
      options: ["Au 14, rue Richard Lenoir.", "Au 24, rue Albert Thomas.", "Au 55, rue Auguste Comte."],
      answer: "Au 55, rue Auguste Comte." },
    { q: "Qu'est-ce qu'il faut donner pour faire du sport ?", vi: "Muốn chơi thể thao phải nộp gì?",
      kind: "image", src: `${IMG}/options/act5-q3.webp`, answer: "A" },
    { q: "Quelle est l'adresse des cours de danse ?", vi: "Địa chỉ lớp khiêu vũ ở đâu?",
      options: ["14, rue Richard Lenoir.", "24, rue Albert Thomas.", "34, rue Joseph Gillet."],
      answer: "24, rue Albert Thomas." },
    { q: "Quand est-ce que vous pouvez jouer avec un ballon ?", vi: "Khi nào bạn có thể chơi bóng?",
      options: ["Le matin.", "L'après-midi.", "Le soir."], answer: "L'après-midi." },
  ],
};

const ACT6 = {
  id: "act6", label: "Activité 6", page: 47,
  setup: "Vous êtes devant l'entrée principale de la clinique et vous lisez ce message.",
  setupVi: "Bạn đứng trước cổng chính phòng khám và đọc thông báo này.",
  doc: {
    kind: "text", style: "affiche", title: "Chers visiteurs,",
    paras: [
      "L'entrée principale et le jardin sont fermés cette semaine parce que la clinique loue les lieux à une société de production de cinéma pour faire un film. L'entrée principale ouvre ce week-end.",
      "Pendant ce temps, l'accueil est à côté du bureau des frais de séjour.",
      "Pour aller à la cafétéria (ouverte de 8 h à 18 h), vous devez entrer par la rue d'Arcole. Après, passez par le bureau des admissions et descendez l'escalier.",
      "Pour aller au centre de radiologie (ouvert au public de 9 h à 11 h 30), il faut entrer par la rue de la Cité. Passez devant les urgences et allez dans la galerie A.",
      "Pour aller à la pharmacie (ouverte de 10 h à 18 h), entrez par le quai de la Corse. Après, tournez à droite.",
      "La direction de la clinique",
    ],
  },
  questions: [
    { q: "Pourquoi l'entrée principale est fermée ?", vi: "Tại sao cổng chính đóng?",
      kind: "image", src: `${IMG}/options/act6-q1.webp`, answer: "B" },
    { q: "Par où vous passez pour aller boire un café ?", vi: "Đi lối nào để uống cà phê?",
      options: ["Par la rue d'Arcole.", "Par la rue de la Cité.", "Par le quai de la Corse."],
      answer: "Par la rue d'Arcole." },
    { q: "Par où entrez-vous pour acheter des médicaments ?", vi: "Đi lối nào để mua thuốc?",
      options: ["Par la rue d'Arcole.", "Par la rue de la Cité.", "Par le quai de la Corse."],
      answer: "Par le quai de la Corse." },
    { q: "On peut utiliser l'entrée principale à partir de quel jour ?", vi: "Từ ngày nào dùng được cổng chính?",
      options: ["Jeudi.", "Vendredi.", "Samedi."], answer: "Samedi." },
    { q: "Où est l'accueil cette semaine ?", vi: "Tuần này quầy tiếp đón ở đâu?",
      options: ["Près du bureau des admissions.", "En face du service des urgences.", "À côté de l'entrée de la cafétéria."],
      answer: "Près du bureau des admissions." },
  ],
};

const ACT7 = {
  id: "act7", label: "Activité 7", page: 47,
  setup: "Vous êtes devant le bureau de poste et vous lisez ce message sur la porte d'entrée.",
  setupVi: "Bạn đứng trước bưu điện và đọc thông báo dán trên cửa.",
  doc: {
    kind: "text", style: "affiche", title: "Madame, Monsieur,",
    paras: [
      "Nous vous informons que la poste du 13, avenue Niel est fermée pour travaux du 1er avril au 31 juillet.",
      "Pendant les travaux, allez à la poste du 27, rue des Renaudes (5 minutes à pied) ouverte de 9 h à 17 h du mardi au vendredi et de 9 h 30 à 12 h 30 le samedi.",
      "À pied : remontez l'avenue Niel et tournez à droite sur la rue Fourcroy. Après, prenez la troisième rue à droite. Le bâtiment est à côté de l'école. À l'entrée, deux agents vous accueillent.",
      "Les agents de la poste",
    ],
  },
  questions: [
    { q: "Qu'est-ce que ce message vous explique ?", vi: "Thông báo này cho biết điều gì?",
      options: ["Il y a une grève des agents.", "Il y a des travaux à 50 mètres.", "Il y a un autre bureau de poste."],
      answer: "Il y a un autre bureau de poste." },
    { q: "Quand le bureau de poste va rouvrir ?", vi: "Khi nào bưu điện mở lại?",
      options: ["En mai.", "En juin.", "En août."], answer: "En août." },
    { q: "Où vous devez aller pour envoyer un colis ?", vi: "Bạn phải đến đâu để gửi bưu kiện?",
      options: ["13, avenue Niel.", "37, rue Fourcroy.", "27, rue des Renaudes."],
      answer: "27, rue des Renaudes." },
    { q: "Qu'est-ce qu'on vous propose ?", vi: "Người ta khuyên bạn đi bằng gì?",
      options: ["De marcher.", "D'aller en voiture.", "De prendre le métro."], answer: "De marcher." },
    { q: "Vous voulez aller à la poste pour acheter des timbres. Vous êtes devant la librairie, avenue Niel. Cochez le bon chemin.",
      vi: "Bạn muốn tới bưu điện mua tem, đang đứng trước hiệu sách trên avenue Niel. Chọn đường đi đúng.",
      kind: "image", src: `${IMG}/options/act7-q5.webp`, answer: "A" },
  ],
};

const ACT8 = {
  id: "act8", label: "Activité 8", page: 48,
  setup: "Vous voulez faire du sport. Un ami vous donne ce document.",
  setupVi: "Bạn muốn chơi thể thao. Một người bạn đưa bạn tờ này.",
  doc: {
    kind: "text", style: "affiche", title: "Journée portes ouvertes",
    paras: [
      "Notre club de sport situé au 18, rue Léon Gambetta, organise une journée d'accueil le 15 septembre de 13 h à 16 h 30 et nous vous proposons de venir pour avoir des informations sur les sports du club et pour parler avec les professeurs.",
      "Pour venir au club, prenez la ligne 1 du métro et sortez à la station Gambetta. Remontez la rue de Flandre et tournez à gauche rue Mourmant. Après, tournez à droite. Faites 100 mètres et vous arrivez à notre club. Il est en face du commissariat.",
      "Pour toute information : 01.20.54.67.12",
    ],
  },
  questions: [
    { q: "Qu'est-ce que c'est ?", vi: "Đây là gì?",
      options: ["Une invitation.", "Une inscription.", "Une réservation."], answer: "Une invitation." },
    { q: "À quelle heure pouvez-vous venir ?", vi: "Bạn có thể đến lúc mấy giờ?",
      options: ["À 12 h 15.", "À 14 h 30.", "À 16 h 45."], answer: "À 14 h 30." },
    { q: "On vous propose quoi ?", vi: "Người ta mời bạn làm gì?",
      kind: "image", src: `${IMG}/options/act8-q3.webp`, answer: "B" },
    { q: "Le club de sport est devant quoi ?", vi: "Câu lạc bộ nằm đối diện cái gì?",
      options: ["L'école.", "Le commissariat.", "La station Gambetta."], answer: "Le commissariat." },
    { q: "Vous êtes à la station de métro Gambetta. Quel est le chemin pour aller au club de sport ?",
      vi: "Bạn ở ga métro Gambetta. Đường nào dẫn tới câu lạc bộ?",
      kind: "image", src: `${IMG}/options/act8-q5.webp`, answer: "B" },
  ],
};

const EX4 = {
  id: "ex4", label: "Exercice 4", page: 59, pts: 6, worked: true,
  setup: "Vous habitez en France. Vous lisez cette affiche.",
  setupVi: "Bạn sống ở Pháp. Bạn đọc tấm áp phích này.",
  doc: {
    kind: "text", style: "affiche", title: "LES MARCHÉS DE VOTRE VILLE",
    paras: ["Nous vous invitons à venir acheter vos fruits, vos légumes et autres produits dans les marchés de votre ville."],
    cards: [
      { title: "Le marché Saint-Marceau", lines: [
        "Le vendredi de 14 h à 17 h 30",
        "Fruits, légumes, viande, pain, boissons et fleurs.",
        "Lieu : Place du Capitaine"] },
      { title: "Le marché Royal", lines: [
        "Le samedi de 18 h à 22 h",
        "Fruits, légumes, œufs, viande, poisson, livres et journaux.",
        "Lieu : Place de la Résistance",
        "Pour l'entrée du marché, prenez la rue Clovis et allez tout droit. Prenez la petite rue à droite puis la première rue à gauche. Vous arrivez sur la place."] },
      { title: "Le marché des Quais", lines: [
        "Le dimanche de 7 h à 12 h",
        "Fruits, légumes, viande, poisson, meubles et vêtements.",
        "Lieu : Quai du Château"] },
    ],
  },
  questions: [
    { q: "Où est-ce que vous allez pour acheter une chemise ?", vi: "Bạn đi đâu để mua áo sơ mi?", pts: 1,
      options: ["Quai du Château.", "Place du Capitaine.", "Place de la Résistance."],
      answer: "Quai du Château.",
      note: "Où peut-on acheter des vêtements ? Cherchez cette information dans le document." },
    { q: "À quelle adresse vous allez pour acheter un bouquet de roses ?", vi: "Mua bó hoa hồng thì đến địa chỉ nào?", pts: 1,
      options: ["Quai du Château.", "Place du Capitaine.", "Place de la Résistance."],
      answer: "Place du Capitaine.", note: "Où peut-on acheter des fleurs ?" },
    { q: "Vous êtes libre l'après-midi pendant la semaine. Vous allez…",
      vi: "Bạn rảnh buổi chiều trong tuần. Bạn sẽ đi…", pts: 1,
      options: ["au marché Royal.", "au marché des Quais.", "au marché Saint-Marceau."],
      answer: "au marché Saint-Marceau.",
      note: "Regardez les horaires et trouvez le marché ouvert l'après-midi en semaine." },
    { q: "Vous êtes à la gare. Quel est le chemin pour aller à l'entrée du marché Royal ?",
      vi: "Bạn ở nhà ga. Đường nào dẫn tới lối vào chợ Royal?", pts: 2,
      kind: "image", src: `${IMG}/options/ex4-q4-ab.webp`, src2: `${IMG}/options/ex4-q4-c.webp`,
      answer: "A", note: "Suivez l'itinéraire du document sur le plan, puis cochez." },
    { q: "Quand est-ce que vous pouvez acheter une chaise ?", vi: "Khi nào bạn có thể mua ghế?", pts: 1,
      options: ["Le vendredi de 14 h à 17 h 30.", "Le samedi de 18 h à 22 h.", "Le dimanche de 7 h à 12 h."],
      answer: "Le dimanche de 7 h à 12 h.", note: "Retrouvez le marché qui vend des meubles." },
  ],
};

const EX5 = {
  id: "ex5", label: "Exercice 5", page: 60, pts: 6,
  setup: "Vous habitez en France. Vous recevez ce document dans votre boîte à lettres.",
  setupVi: "Bạn sống ở Pháp. Bạn nhận được tờ này trong hộp thư.",
  doc: {
    kind: "text", style: "affiche", title: "Promenade à vélo",
    paras: [
      "Nous vous proposons de vous promener à vélo tous les dimanches. La promenade est gratuite et il ne faut pas s'inscrire.",
      "Le rendez-vous est à 10 h 30 place de la Libération devant la mairie, le départ est à 11 h et le retour vers 13 h.",
      "D'abord, nous remontons la rue de la Liberté. Après, nous prenons la deuxième rue à droite et nous allons tout droit pour sortir du centre-ville.",
      "Pour plus d'informations, envoyez un mail à promenade.vélo@villeverte.fr",
    ],
  },
  questions: [
    { q: "Pour faire la promenade, vous devez…", vi: "Để tham gia buổi đạp xe, bạn phải…", pts: 1,
      options: ["aller vous inscrire.", "envoyer un courriel.", "venir au rendez-vous."],
      answer: "venir au rendez-vous." },
    { q: "Combien vous payez ?", vi: "Bạn phải trả bao nhiêu?", pts: 1,
      options: ["0 €.", "11 €.", "13 €."], answer: "0 €." },
    { q: "Où est le lieu de rendez-vous ?", vi: "Điểm hẹn ở đâu?", pts: 1,
      options: ["Rue du Bourg.", "Rue de la Liberté.", "Place de la Libération."],
      answer: "Place de la Libération." },
    { q: "À quelle heure la promenade commence ?", vi: "Mấy giờ bắt đầu đạp xe?", pts: 1,
      options: ["À 10 h 30.", "À 11 h.", "À 13 h."], answer: "À 11 h." },
    { q: "Les vélos prennent quel chemin pour sortir du centre-ville ?",
      vi: "Đoàn xe đạp đi đường nào để ra khỏi trung tâm?", pts: 2,
      kind: "image", src: `${IMG}/options/ex5-q5.webp`, answer: "C" },
  ],
};

const EX6 = {
  id: "ex6", label: "Exercice 6", page: 61, pts: 6,
  setup: "Vous lisez cette publicité.",
  setupVi: "Bạn đọc quảng cáo này.",
  doc: {
    kind: "text", style: "affiche", title: "Goût de Provence",
    paras: [
      "17, rue du 4 septembre • Aix-en-Provence • 04.42.56.34.65",
      "Notre restaurant vous accueille du mardi au samedi sur réservation.",
      "Formule simple : entrée + plat ou plat + dessert — 18 €",
      "Formule classique : entrée + plat + boisson — 22 €",
      "Formule complète : entrée + plat + dessert — 25 €",
      "Pour venir de la Fontaine de la Rotonde (10 min de marche) : quand vous êtes sur l'avenue Victor Hugo, prenez la première rue à gauche. Allez tout droit puis prenez la troisième rue à droite. Nous sommes à une dizaine de mètres sur la droite.",
    ],
    cards: [
      { title: "Entrée", lines: ["Œufs mimosa", "Assiette de crudités", "Salade d'avocats"] },
      { title: "Plat", lines: ["Bœuf aux poivrons", "Agneau aux champignons", "Poulet et pommes de terre"] },
      { title: "Dessert", lines: ["Gâteau au chocolat", "Glace à la vanille", "Salade de fruits"] },
    ],
  },
  questions: [
    { q: "Quel jour est-ce que vous pouvez dîner au restaurant ?", vi: "Ngày nào bạn có thể ăn tối ở nhà hàng?", pts: 1,
      options: ["Le lundi.", "Le vendredi.", "Le dimanche."], answer: "Le vendredi." },
    { q: "Vous voulez goûter les œufs et la glace. Vous prenez la formule…",
      vi: "Bạn muốn ăn trứng và kem. Bạn chọn suất…", pts: 1,
      options: ["simple.", "classique.", "complète."], answer: "complète." },
    { q: "Qu'est-ce que vous pouvez manger dans ce restaurant ?", vi: "Ở nhà hàng này bạn ăn được món gì?", pts: 1,
      options: ["Des pâtes.", "Du poisson.", "De la viande."], answer: "De la viande." },
    { q: "On vous donne des explications pour venir…", vi: "Người ta chỉ đường cho bạn đi bằng…", pts: 1,
      options: ["à pied.", "en bus.", "en métro."], answer: "à pied." },
    { q: "Quel est le chemin pour aller au restaurant depuis la fontaine de la Rotonde ?",
      vi: "Từ đài phun nước Rotonde, đường nào tới nhà hàng?", pts: 2,
      kind: "image", src: `${IMG}/options/ex6-q5.webp`, answer: "C" },
  ],
};

// ── OBJECTIF 3 · Lire pour s'orienter dans le temps ───────────────
const ACT9 = {
  id: "act9", label: "Activité 9", page: 50,
  setup: "C'est votre premier jour dans une entreprise française. Vous lisez ces instructions sur votre bureau.",
  setupVi: "Đây là ngày đầu bạn đi làm ở một công ty Pháp. Bạn đọc bản hướng dẫn trên bàn làm việc.",
  doc: { kind: "image", src: `${IMG}/docs/act9-doc.webp`, alt: "Instructions — Bienvenue !" },
  questions: [
    { q: "Votre ordinateur est allumé. Qu'est-ce que vous devez faire maintenant ?",
      vi: "Máy tính đã bật. Giờ bạn phải làm gì?",
      options: ["Écrire au directeur.", "Regarder mon agenda.", "Contacter mes collègues."],
      answer: "Regarder mon agenda." },
    { q: "Où est le restaurant ?", vi: "Nhà ăn ở đâu?",
      options: ["Dans mon bâtiment.", "À l'extérieur de l'entreprise.", "Dans le jardin de l'entreprise."],
      answer: "Dans le jardin de l'entreprise." },
    { q: "Où est le rendez-vous avec vos collègues pour aller manger ?", vi: "Hẹn đồng nghiệp ở đâu để đi ăn?",
      options: ["À l'entrée du restaurant.", "À l'entrée de l'entreprise.", "À l'entrée de mon bâtiment."],
      answer: "À l'entrée de mon bâtiment." },
    { q: "Quels sont vos horaires ?", vi: "Giờ làm việc của bạn là?",
      options: ["De 7 h 30 à 17 h.", "De 8 h 30 à 16 h.", "De 8 h 30 à 17 h."], answer: "De 8 h 30 à 17 h." },
    { q: "À quelle heure est-ce que vous terminez le travail le vendredi ?", vi: "Thứ Sáu bạn tan làm lúc mấy giờ?",
      options: ["À 16 h.", "À 17 h.", "À 19 h."], answer: "À 16 h." },
  ],
};

const ACT10 = {
  id: "act10", label: "Activité 10", page: 50,
  setup: "Vous travaillez dans une grande entreprise. Votre directeur vous donne son emploi du temps de la semaine.",
  setupVi: "Bạn làm ở một công ty lớn. Giám đốc đưa bạn lịch làm việc trong tuần của ông ấy.",
  doc: {
    kind: "table",
    cols: ["Lundi 12", "Mardi 13", "Mercredi 14", "Jeudi 15", "Vendredi 16"],
    rows: [
      ["10 h - 12 h\nRéunion d'informations",
       "9 h - 12 h\nConférence internationale\n12, rue Jean Mermoz",
       "9 h - 11 h 30\nSalon commercial au Parc des Expositions",
       "9 h 30 - 10 h 30\nRendez-vous à la banque (Mme Durand)\n45, rue Jeanne d'Arc",
       "9 h - 11 h 30\nRéunion avec le conseil d'administration"],
      ["14 h Rendez-vous avec M. Gauthier\n\n15 h - 16 h Rendez-vous avec un client (M. Dumont)",
       "14 h - 15 h Rendez-vous avec la comptable (Mme Chevalier)",
       "12 h Restaurant avec un client (M. Perrin)\n\n14 h - 18 h Salon commercial au Parc des Expositions",
       "13 h - 20 h Voyage professionnel – Visite d'un site de production\nDépart gare du Nord à 14 h 15",
       "14 h Rendez-vous extérieur avec un client (M. Garcia)\n34, rue Guillaume Apollinaire"],
    ],
  },
  questions: [
    { q: "Où doit être votre directeur jeudi matin ?", vi: "Sáng thứ Năm giám đốc phải ở đâu?",
      options: ["À la banque.", "À la comptabilité.", "À la conférence internationale."], answer: "À la banque." },
    { q: "Quand est-ce que votre directeur a un déjeuner ?", vi: "Khi nào giám đốc có bữa trưa?",
      options: ["Lundi.", "Mercredi.", "Vendredi."], answer: "Mercredi." },
    { q: "À quelle heure est-ce que votre directeur doit prendre un train ?", vi: "Mấy giờ giám đốc phải lên tàu?",
      options: ["À 10 h 30.", "À 13 h.", "À 14 h 15."], answer: "À 14 h 15." },
    { q: "Quand est-ce que votre directeur a rendez-vous dans l'entreprise avec un client ?",
      vi: "Khi nào giám đốc gặp khách hàng tại công ty?",
      options: ["Lundi après-midi.", "Mercredi après-midi.", "Vendredi après-midi."], answer: "Lundi après-midi." },
    { q: "Où est le dernier rendez-vous de la semaine ?", vi: "Cuộc hẹn cuối tuần diễn ra ở đâu?",
      options: ["45, rue Jeanne d'Arc.", "12, rue Jean Mermoz.", "34, rue Guillaume Apollinaire."],
      answer: "34, rue Guillaume Apollinaire." },
  ],
};

const ACT11 = {
  id: "act11", label: "Activité 11", page: 51,
  setup: "Vous travaillez dans un magasin en France. Vous lisez ces messages dans la salle des employés.",
  setupVi: "Bạn làm ở một cửa hàng tại Pháp. Bạn đọc các thông báo trong phòng nhân viên.",
  doc: {
    kind: "text", style: "affiche",
    cards: [
      { title: "Rendez-vous avec le médecin du travail", lines: ["jeudi 2 décembre.", "Horaires : 10 h - 15 h", "(pause entre 12 h 30 et 13 h 30)."] },
      { title: "FÊTE DU MAGASIN", lines: ["le 18 décembre (pour les clients).", "Horaires : de 9 h à 20 h."] },
      { title: "Nouveaux horaires du magasin", lines: ["de 9 h 30 à 19 h.", "Employés du matin : 8 h 30 – 16 h.", "Employés de l'après-midi : 12 h – 19 h 30."] },
      { title: "CONCOURS POUR LES EMPLOYÉS", lines: ["Gagnez un voyage à Paris pour le 31 décembre.", "Participez avant le 20 novembre."] },
    ],
  },
  questions: [
    { q: "À quelle heure est-ce que vous pouvez voir le médecin ?", vi: "Mấy giờ bạn có thể gặp bác sĩ?",
      options: ["À 10 h 30.", "À 12 h 30.", "À 15 h 30."], answer: "À 10 h 30." },
    { q: "Le magasin propose une fête pour les clients quel jour ?", vi: "Cửa hàng tổ chức tiệc cho khách vào ngày nào?",
      options: ["Le 20 novembre.", "Le 18 décembre.", "Le 31 décembre."], answer: "Le 18 décembre." },
    { q: "Vous travaillez le matin. Quels sont vos horaires ?", vi: "Bạn làm ca sáng. Giờ làm của bạn là?",
      options: ["De 8 h 30 à 12 h.", "De 8 h 30 à 16 h.", "De 9 h 30 à 15 h."], answer: "De 8 h 30 à 16 h." },
    { q: "Vous pouvez participer au concours avant quelle date ?", vi: "Bạn phải đăng ký cuộc thi trước ngày nào?",
      options: ["Le 20 novembre.", "Le 2 décembre.", "Le 31 décembre."], answer: "Le 20 novembre." },
  ],
};

const ACT12 = {
  id: "act12", label: "Activité 12", page: 52,
  setup: "Vous cherchez un travail en France. Vous lisez ces annonces.",
  setupVi: "Bạn tìm việc ở Pháp. Bạn đọc các mẩu tin tuyển dụng.",
  doc: {
    kind: "text", style: "annonces",
    cards: [
      { title: "Offre n° 1839", lines: ["Nous cherchons un cuisinier pour les soirs de la semaine.", "Restaurant italien."] },
      { title: "Offre n° 1679", lines: ["Vendeur dans une boulangerie.", "Samedi et dimanche, de 9 h à 18 h."] },
      { title: "Offre n° 3045", lines: ["Je cherche un professeur d'espagnol pour mes enfants.", "Cours tous les mercredis de 14 h à 16 h."] },
      { title: "Offre n° 2387", lines: ["Emploi : secrétaire.", "Du lundi au vendredi, le matin uniquement.", "Langue parlée : anglais."] },
      { title: "Offre n° 2027", lines: ["Vendeur dans une épicerie.", "Du mercredi au samedi, de 14 h à 20 h."] },
    ],
  },
  questions: [
    { q: "Vous souhaitez travailler le matin. Quelle annonce choisissez-vous ?", vi: "Bạn muốn làm buổi sáng. Chọn tin nào?",
      options: ["Vendeur.", "Cuisinier.", "Secrétaire."], answer: "Secrétaire." },
    { q: "Quel travail est-ce que vous pouvez faire le week-end ?", vi: "Việc nào làm được cuối tuần?",
      options: ["Vendeur.", "Cuisinier.", "Professeur."], answer: "Vendeur." },
    { q: "Vous voulez travailler le soir. Quelle offre choisissez-vous ?", vi: "Bạn muốn làm buổi tối. Chọn tin nào?",
      options: ["L'offre n° 1839.", "L'offre n° 2027.", "L'offre n° 3045."], answer: "L'offre n° 1839." },
    { q: "Vous parlez espagnol. Quel emploi vous correspond ?", vi: "Bạn nói tiếng Tây Ban Nha. Việc nào hợp?",
      options: ["Cuisinier.", "Secrétaire.", "Professeur."], answer: "Professeur." },
    { q: "À quelle heure termine le travail à l'épicerie ?", vi: "Cửa hàng tạp hoá kết thúc ca lúc mấy giờ?",
      options: ["À 16 h.", "À 18 h.", "À 20 h."], answer: "À 20 h." },
  ],
};

const EX7 = {
  id: "ex7", label: "Exercice 7", page: 63, pts: 6, worked: true,
  setup: "Vous habitez en France et vous cherchez un travail. Vous lisez ces annonces.",
  setupVi: "Bạn sống ở Pháp và đang tìm việc. Bạn đọc các mẩu tin này.",
  tip: "Lisez attentivement les informations avec des chiffres et les jours ; vous pouvez les souligner.",
  tipVi: "Đọc kỹ các con số và các thứ trong tuần — gạch chân để dễ tìm lại.",
  doc: {
    kind: "text", style: "annonces",
    cards: [
      { title: "Le bar Viva Italia", lines: ["recherche un musicien.", "Tous les soirs de la semaine.", "Appelez Julien au 01 93 15 33 89."] },
      { title: "L'école WELCOME", lines: ["cherche un professeur de français.", "Cours tous les lundis et mercredis à partir de 9 h.", "01 93 75 34 03."] },
      { title: "Vous parlez anglais ?", lines: ["Écrivez-moi à annonce3765@travail.fr.", "C'est pour parler avec mes enfants.", "Tous les samedis à 11 h. Merci ! Thomas."] },
      { title: "L'hôpital Pont-Neuf", lines: ["recherche des médecins.", "Uniquement pour le week-end.", "Téléphone : 01 93 01 45 28."] },
      { title: "Recherche mécanicien.", lines: ["7 heures par jour, du lundi au vendredi.", "Contactez Sophie : annonce3127@travail.fr"] },
    ],
  },
  questions: [
    { q: "À quelle heure est-ce que le cours d'anglais commence ?", vi: "Buổi học tiếng Anh bắt đầu lúc mấy giờ?", pts: 1.5,
      options: ["À 7 h.", "À 9 h.", "À 11 h."], answer: "À 11 h." },
    { q: "Quel est le travail pour le samedi et le dimanche ?", vi: "Việc nào làm thứ Bảy và Chủ nhật?", pts: 1,
      options: ["Médecin.", "Musicien.", "Mécanicien."], answer: "Médecin.",
      note: "« week-end » = samedi et dimanche." },
    { q: "Vous jouez de la guitare. Quel numéro est-ce que vous appelez ?", vi: "Bạn chơi ghi-ta. Gọi số nào?", pts: 1.5,
      options: ["01 93 01 45 28.", "01 93 15 33 89.", "01 93 75 34 03."], answer: "01 93 15 33 89.",
      note: "« Jouer de la guitare » renvoie au travail « musicien »." },
    { q: "Où est-ce que Sophie travaille ?", vi: "Sophie làm việc ở đâu?", pts: 1,
      options: ["Dans une école.", "Dans un garage.", "Dans un hôpital."], answer: "Dans un garage.",
      note: "Les mots des questions diffèrent des mots du document : garage → mécanicien." },
    { q: "Quelle langue est-ce que vous devez parler pour travailler à l'école Welcome ?",
      vi: "Muốn làm ở trường Welcome phải nói ngôn ngữ nào?", pts: 1,
      options: ["Italien.", "Anglais.", "Français."], answer: "Français.",
      note: "« Viva Italia » est le nom du bar, ce n'est pas une langue." },
  ],
};

const EX8 = {
  id: "ex8", label: "Exercice 8", page: 64, pts: 6,
  setup: "Vous lisez ces informations à l'entrée de votre lieu de travail en France.",
  setupVi: "Bạn đọc các thông báo này ở lối vào nơi làm việc tại Pháp.",
  doc: {
    kind: "text", style: "affiche",
    cards: [
      { title: "Salle de sport", lines: ["ouverte tous les jours de 6 h à 11 h.", "Rendez-vous au 2e étage."] },
      { title: "Espace café", lines: ["au 4e étage.", "Retrouvez des tables et des chaises pour manger."] },
      { title: "Cartes professionnelles", lines: ["disponibles au bureau 201.", "Passez entre 10 h et 12 h."] },
      { title: "Bureau 101", lines: ["nouveau bureau du directeur au 1er étage.", "Sa secrétaire est dans le bureau 102."] },
      { title: "Jours de présence du médecin", lines: ["lundi, mercredi et vendredi.", "Écrire à medecin@rdv.fr."] },
    ],
  },
  questions: [
    { q: "À quelle heure est-ce que vous pouvez prendre votre carte de travail ?",
      vi: "Mấy giờ bạn có thể lấy thẻ nhân viên?", pts: 1.5,
      options: ["À 9 h.", "À 11 h.", "À 13 h."], answer: "À 11 h." },
    { q: "Où est-ce que vous devez aller pour voir la secrétaire du directeur ?",
      vi: "Bạn phải đến đâu để gặp thư ký giám đốc?", pts: 1,
      options: ["Au bureau 101.", "Au bureau 102.", "Au bureau 201."], answer: "Au bureau 102." },
    { q: "Quels jours est-ce que vous pouvez demander un rendez-vous médical ?",
      vi: "Những ngày nào bạn có thể xin hẹn khám bệnh?", pts: 1,
      options: ["Mardi et jeudi.", "Lundi, mercredi et vendredi.", "Tous les jours de la semaine."],
      answer: "Lundi, mercredi et vendredi." },
    { q: "À quel étage est-ce que vous pouvez boire une boisson ?", vi: "Tầng mấy bạn có thể uống nước?", pts: 1.5,
      options: ["Au 1er étage.", "Au 2e étage.", "Au 4e étage."], answer: "Au 4e étage." },
    { q: "Quand est-ce que vous pouvez aller à la salle de sport ?", vi: "Khi nào bạn có thể đến phòng tập?", pts: 1,
      options: ["Le matin.", "L'après-midi.", "Le soir."], answer: "Le matin." },
  ],
};

const EX9 = {
  id: "ex9", label: "Exercice 9", page: 64, pts: 6,
  setup: "Vous habitez en France et vous cherchez un travail.",
  setupVi: "Bạn sống ở Pháp và đang tìm việc.",
  doc: {
    kind: "text", style: "annonces",
    cards: [
      { title: "Recherche employé de pharmacie.", lines: ["20 heures minimum par semaine, entre 8 h et 15 h.", "Contacter Pierre (pierre@travail.fr)."] },
      { title: "Cherche vendeur en librairie.", lines: ["Contrat pour le week-end de 10 h à 18 h.", "Téléphonez au 01 45 00 65 32."] },
      { title: "Ouverture du cinéma 3000", lines: ["dans une semaine.", "Nous recherchons des employés pour un contrat d'1 mois.", "3000@travail.fr."] },
      { title: "Recherche serveur", lines: ["1 soir par semaine (mercredi, vendredi ou samedi).", "Contactez André avant 12 h 30 au 06 72 00 98 21."] },
      { title: "Accueil de l'université", lines: ["Vous voulez travailler le lundi et le mercredi ?", "Appelez Mme Fontaine avant vendredi au 01 45 55 21 49."] },
    ],
  },
  questions: [
    { q: "Quand est-ce que le cinéma ouvre ?", vi: "Khi nào rạp chiếu phim khai trương?", pts: 1,
      options: ["Demain.", "Dans une semaine.", "Dans un mois."], answer: "Dans une semaine." },
    { q: "Quand est-ce que vous pouvez appeler André ?", vi: "Khi nào bạn có thể gọi cho André?", pts: 1,
      options: ["Le matin.", "L'après-midi.", "Le soir."], answer: "Le matin." },
    { q: "Quand est-ce que vous pouvez vendre des livres ?", vi: "Khi nào bạn có thể bán sách?", pts: 1,
      options: ["Du lundi au vendredi.", "Le samedi et le dimanche.", "Du lundi au dimanche."],
      answer: "Le samedi et le dimanche." },
    { q: "Pour accueillir les étudiants, la personne va travailler…", vi: "Người làm tiếp đón sinh viên sẽ làm…", pts: 1.5,
      options: ["1 jour par semaine.", "2 jours par semaine.", "4 jours par semaine."], answer: "2 jours par semaine." },
    { q: "Dans la pharmacie, combien d'heures par semaine est-ce que vous pouvez travailler ?",
      vi: "Ở nhà thuốc, bạn làm được bao nhiêu giờ mỗi tuần?", pts: 1.5,
      options: ["8 heures.", "15 heures.", "20 heures."], answer: "20 heures." },
  ],
};

// ── OBJECTIF 4 · Lire pour s'informer ────────────────────────────
const ACT13 = {
  id: "act13", label: "Activité 13", page: 53,
  setup: "Vous lisez cet article dans le journal.",
  setupVi: "Bạn đọc bài báo này.",
  doc: {
    kind: "text", style: "article", title: "Fête des voisins",
    paras: [
      "En France, il y a la fête des voisins dans toutes les villes. C'est un rendez-vous pour connaître ses voisins. La fête se déroule dans la rue. On installe des tables. Dans les immeubles, on organise la fête dans le jardin ou dans le hall. Tous les voisins apportent de la nourriture et des boissons. Chaque année, des millions de Français participent. L'événement existe depuis 1990. En 2025, c'est la 35e édition. C'est toujours un vendredi, à partir de 19 h.",
    ],
  },
  questions: [
    { q: "La fête des voisins, c'est quoi ?", vi: "Ngày hội hàng xóm là gì?",
      options: ["Un événement pour fêter le week-end.", "Un événement pour connaître ses voisins.", "Un événement pour donner de la nourriture aux voisins."],
      answer: "Un événement pour connaître ses voisins." },
    { q: "Où est-ce que la fête des voisins a lieu ?", vi: "Ngày hội diễn ra ở đâu?",
      kind: "image", src: `${IMG}/options/act13-q2.webp`, answer: "B" },
    { q: "Qui apporte de la nourriture et des boissons ?", vi: "Ai mang đồ ăn thức uống?",
      options: ["Un seul voisin.", "Tous les voisins.", "Les responsables de la ville."], answer: "Tous les voisins." },
    { q: "Quand a lieu l'événement ?", vi: "Sự kiện diễn ra bao lâu một lần?",
      options: ["Une fois par an.", "Deux fois par an.", "Plusieurs fois par an."], answer: "Une fois par an." },
    { q: "Quel jour de la semaine a lieu l'événement ?", vi: "Sự kiện rơi vào thứ mấy?",
      options: ["Mardi.", "Vendredi.", "Samedi."], answer: "Vendredi." },
  ],
};

const ACT14 = {
  id: "act14", label: "Activité 14", page: 53,
  setup: "Vous lisez cette affiche à l'entrée de votre université.",
  setupVi: "Bạn đọc tấm áp phích ở cổng trường đại học.",
  doc: {
    kind: "text", style: "affiche", title: "Vous voulez apprendre une langue ?",
    paras: [
      "Notre université a un centre de langues. Il est dans le bâtiment de la faculté des lettres. Pour avoir des informations, M. Lefol est au bureau d'accueil du lundi au vendredi. Dans le centre de langues, il y a une bibliothèque et un laboratoire informatique.",
      "Lieux des cours : salles A et B dans le centre de langues pour les cours de russe et d'espagnol ; salles E et F dans le bâtiment d'histoire pour les cours de français et d'anglais.",
      "Pour vous inscrire, prenez votre carte d'étudiant.",
    ],
  },
  questions: [
    { q: "Où est le centre de langues ?", vi: "Trung tâm ngoại ngữ nằm ở đâu?",
      options: ["Dans la bibliothèque de l'université.", "Dans le bâtiment de la faculté d'histoire.", "Dans le bâtiment de la faculté des lettres."],
      answer: "Dans le bâtiment de la faculté des lettres." },
    { q: "Qui est M. Lefol ?", vi: "Ông Lefol là ai?",
      options: ["Un étudiant du centre de langues.", "Un professeur au centre de langues.", "Un employé à l'accueil du centre de langues."],
      answer: "Un employé à l'accueil du centre de langues." },
    { q: "Où est-ce que les cours d'espagnol ont lieu ?", vi: "Lớp tiếng Tây Ban Nha học ở đâu?",
      options: ["Dans le laboratoire informatique.", "Dans le bâtiment de la faculté d'histoire.", "Dans le bâtiment de la faculté des lettres."],
      answer: "Dans le bâtiment de la faculté des lettres." },
    { q: "Où est-ce que les cours de français ont lieu ?", vi: "Lớp tiếng Pháp học ở đâu?",
      options: ["Dans le laboratoire informatique.", "Dans le bâtiment de la faculté d'histoire.", "Dans le bâtiment de la faculté des lettres."],
      answer: "Dans le bâtiment de la faculté d'histoire." },
    { q: "Qu'est-ce que vous devez apporter pour votre inscription ?", vi: "Bạn phải mang gì khi đăng ký?",
      kind: "image", src: `${IMG}/options/act14-q5.webp`, answer: "A" },
  ],
};

const ACT15 = {
  id: "act15", label: "Activité 15", page: 54,
  setup: "Vous êtes à l'université. Vous lisez ce document sur le tableau d'affichage.",
  setupVi: "Bạn ở trường đại học và đọc tờ này trên bảng tin.",
  doc: {
    kind: "text", style: "affiche", title: "Les soirées du mardi",
    paras: ["Venez aux soirées des mardis : des rendez-vous pour les étudiants. À partir de 19 h 30."],
    cards: [
      { title: "1er mardi : soirée sport", lines: ["Venez parler de football, de rugby, de tennis…", "Café de la Gare – 54, rue Aristide Briand", "En métro : ligne 5, le café est en face de la station Gare."] },
      { title: "2e mardi : soirée lecture", lines: ["pour parler de vos livres préférés.", "Café de l'Université – 5, rue Antoine Lavoisier", "Arrêt de bus Université"] },
      { title: "3e mardi : soirée cinéma", lines: ["Venez regarder une comédie ou un drame.", "Cinéma Mademoiselle – 67, rue Hector Berlioz", "En métro : ligne 6, arrêt Théâtre."] },
      { title: "4e mardi : soirée voyage", lines: ["Chaque mardi, des étudiants parlent de leur pays préféré.", "Maison des étudiants – 25, rue Jules Verne", "Arrêt de bus Université"] },
    ],
  },
  questions: [
    { q: "Qui peut aller aux soirées du mardi ?", vi: "Ai được dự các buổi tối thứ Ba?",
      options: ["Les étudiants et leurs amis.", "Les étudiants de l'université.", "Les étudiants et les professeurs."],
      answer: "Les étudiants de l'université." },
    { q: "Comment est-ce que vous pouvez aller à la soirée sport ?", vi: "Đi tới buổi thể thao bằng phương tiện gì?",
      options: ["En bus.", "En train.", "En métro."], answer: "En métro." },
    { q: "Où est-ce que vous devez aller pour parler de livres ?", vi: "Muốn nói về sách thì đến đâu?",
      options: ["25, rue Jules Verne.", "54, rue Aristide Briand.", "5, rue Antoine Lavoisier."],
      answer: "5, rue Antoine Lavoisier." },
    { q: "Quand est-ce que vous pouvez regarder un film ?", vi: "Khi nào bạn có thể xem phim?",
      options: ["Le 2e mardi.", "Le 3e mardi.", "Le 4e mardi."], answer: "Le 3e mardi." },
    { q: "Où est-ce que vous devez aller pour parler de vos voyages ?", vi: "Muốn kể về chuyến đi thì đến đâu?",
      options: ["Au café de la Gare.", "Au café de l'université.", "À la maison des étudiants."],
      answer: "À la maison des étudiants." },
  ],
};

const ACT16 = {
  id: "act16", label: "Activité 16", page: 55,
  setup: "Vous lisez cet article sur Internet.",
  setupVi: "Bạn đọc bài viết này trên mạng.",
  doc: {
    kind: "text", style: "article", title: "La Samaritaine Paris",
    paras: [
      "La Samaritaine est un grand magasin à Paris. Il se trouve entre la rue de Rivoli et la Seine. Il existe depuis 1870. En 2005, le magasin ferme. Le directeur fait des travaux pendant 16 ans. Et en 2021, La Samaritaine ouvre enfin ses portes. Vous pouvez acheter des vêtements, des accessoires, des parfums, etc. Vous pouvez aussi manger : il y a 12 restaurants. Si vous ne voulez pas acheter, vous pouvez visiter le bâtiment. Il y a un grand escalier au centre, des petites statues et des décorations.",
    ],
  },
  questions: [
    { q: "Qu'est-ce que c'est, La Samaritaine ?", vi: "La Samaritaine là gì?",
      options: ["Un musée.", "Un magasin.", "Un centre commercial."], answer: "Un magasin." },
    { q: "La Samaritaine existe depuis quelle année ?", vi: "La Samaritaine có từ năm nào?",
      options: ["1870.", "2005.", "2021."], answer: "1870." },
    { q: "En quelle année La Samaritaine ferme ses portes ?", vi: "Năm nào La Samaritaine đóng cửa?",
      options: ["1870.", "2005.", "2021."], answer: "2005." },
    { q: "Qu'est-ce que vous pouvez aussi faire à La Samaritaine ?", vi: "Ở La Samaritaine bạn còn làm được gì?",
      options: ["Aller au restaurant.", "Visiter la rue de Rivoli.", "Parler avec le directeur."],
      answer: "Aller au restaurant." },
    { q: "Qu'est-ce que vous pouvez voir au centre du bâtiment ?", vi: "Ở giữa toà nhà bạn thấy gì?",
      kind: "image", src: `${IMG}/options/act16-q5.webp`, answer: "C" },
  ],
};

const EX10 = {
  id: "ex10", label: "Exercice 10", page: 65, pts: 7, worked: true,
  setup: "Vous lisez cette affiche dans votre université en France.",
  setupVi: "Bạn đọc tấm áp phích này ở trường đại học tại Pháp.",
  tip: "Lisez d'abord les questions : elles montrent quelles informations repérer.",
  tipVi: "Đọc câu hỏi trước — chúng cho biết cần tìm thông tin nào trong tài liệu.",
  doc: {
    kind: "text", style: "affiche", title: "CENTRE DE LANGUES",
    paras: [
      "Venez visiter le nouveau centre de langues de l'université.",
      "Il est ouvert depuis le 1er septembre. Le centre est au 1er étage du bâtiment 2 dans le centre-ville.",
      "Les cours commencent le 15 septembre. Horaires : de 7 h 30 à 9 h 30 et de 10 h à 11 h 30.",
      "Fête d'inauguration le 20 septembre avec le président de l'université. Les professeurs étrangers vont parler de leur pays et de leur culture. Les étudiants sont les bienvenus. Boissons et gâteaux pour tout le monde !",
      "Cadeaux : des livres pour les premiers inscrits.",
    ],
  },
  questions: [
    { q: "Quelle est la date d'ouverture du centre de langues ?", vi: "Trung tâm ngoại ngữ mở cửa ngày nào?", pts: 1,
      options: ["1er septembre.", "15 septembre.", "20 septembre."], answer: "1er septembre.",
      note: "Les 3 dates sont dans le texte. « Date d'ouverture » = « ouvert depuis »." },
    { q: "Où est le centre de langues ?", vi: "Trung tâm nằm ở đâu?", pts: 1.5,
      options: ["Au centre de l'université.", "Au 1er étage de la mairie de la ville.", "À l'étage du bâtiment du centre-ville."],
      answer: "À l'étage du bâtiment du centre-ville.",
      note: "Attention : des mots de chaque proposition sont dans le texte. Lisez-les plusieurs fois." },
    { q: "Quand est-ce que vous pouvez aller aux cours ?", vi: "Khi nào bạn có thể đi học?", pts: 1,
      options: ["Le matin.", "Le midi.", "Le soir."], answer: "Le matin." },
    { q: "Qu'est-ce que les professeurs vont faire à l'inauguration ?", vi: "Trong lễ khai trương các thầy cô sẽ làm gì?", pts: 1.5,
      options: ["Présenter leur pays.", "Donner un cours de langue.", "Apporter un plat traditionnel."],
      answer: "Présenter leur pays." },
    { q: "Qu'est-ce que vous pouvez avoir à votre inscription ?", vi: "Khi đăng ký bạn được nhận gì?", pts: 2,
      kind: "image", src: `${IMG}/options/ex10-q5.webp`, answer: "B",
      note: "Après avoir répondu, relisez le document en entier et vérifiez vos réponses." },
  ],
};

const EX11 = {
  id: "ex11", label: "Exercice 11", page: 66, pts: 7,
  setup: "Vous habitez en France. Vous lisez cet article dans le journal.",
  setupVi: "Bạn sống ở Pháp. Bạn đọc bài báo này.",
  doc: {
    kind: "text", style: "article", title: "LES FRANÇAIS AIMENT LA TÉLÉVISION",
    paras: [
      "Dans les maisons, vous trouvez en moyenne deux télévisions. La grande télévision se trouve dans la salle à manger. C'est l'endroit où toute la famille mange en regardant le journal télévisé.",
      "Le soir, les Français regardent des séries. Le dimanche soir, il y a une tradition : regarder un film. C'est le dernier moment de détente du week-end avant le lundi.",
      "Les jeunes ne regardent plus beaucoup la télévision. Ils préfèrent utiliser leur téléphone portable ou leur tablette pour regarder leur série sur une plateforme en ligne. Les adultes restent dans leur canapé avec le chien sur les genoux.",
    ],
  },
  questions: [
    { q: "Combien de télévisions est-ce qu'il y a dans les maisons en France ?", vi: "Nhà ở Pháp có mấy cái tivi?", pts: 1,
      options: ["1.", "2.", "3."], answer: "2." },
    { q: "Dans quelle pièce est-ce que les Français mangent devant la télévision ?",
      vi: "Người Pháp ăn trước tivi ở phòng nào?", pts: 1.5,
      options: ["Le salon.", "La cuisine.", "La salle à manger."], answer: "La salle à manger." },
    { q: "Quand est-ce que les Français aiment regarder un film ?", vi: "Khi nào người Pháp thích xem phim?", pts: 1.5,
      options: ["Le lundi soir.", "Le dimanche soir.", "Tous les soirs."], answer: "Le dimanche soir." },
    { q: "Les jeunes préfèrent voir leur série sur…", vi: "Giới trẻ thích xem phim bộ trên…", pts: 1,
      options: ["un téléphone portable.", "un ordinateur portable.", "une télévision portable."],
      answer: "un téléphone portable." },
    { q: "Comment est-ce que les Français s'installent devant la télévision ?",
      vi: "Người Pháp ngồi xem tivi như thế nào?", pts: 2,
      kind: "image", src: `${IMG}/options/ex11-q5.webp`, answer: "B" },
  ],
};

const EX12 = {
  id: "ex12", label: "Exercice 12", page: 67, pts: 7,
  setup: "Vous êtes à l'université en France. Vous lisez ces instructions du professeur.",
  setupVi: "Bạn học đại học ở Pháp. Bạn đọc hướng dẫn của giáo viên.",
  doc: {
    kind: "text", style: "affiche", title: "Bienvenue au cours de géographie !",
    paras: [
      "Je suis le professeur Martin. Pendant le 1er mois du cours, nous étudions l'Europe. Pour le 2e mois, c'est l'Asie. Et le 3e mois, c'est l'Afrique. Les Amériques, c'est pour l'année prochaine.",
      "Pour le cours, il faut du matériel. Je veux des stylos et des feutres. Avec le feutre rouge, on va dessiner des frontières et le feutre bleu, c'est pour les mers et les fleuves. Le stylo bleu sert à écrire les villes et le stylo rouge les capitales. N'oubliez pas d'apporter un cahier pour écrire les cours et coller les feuilles !",
    ],
  },
  questions: [
    { q: "Quand est-ce que vous étudiez la géographie de l'Afrique ?", vi: "Khi nào học địa lý châu Phi?", pts: 1,
      options: ["Le 1er mois.", "Le 2e mois.", "Le 3e mois."], answer: "Le 3e mois." },
    { q: "Quel continent est au programme de la 2e année ?", vi: "Châu lục nào học ở năm thứ hai?", pts: 1.5,
      options: ["L'Asie.", "L'Europe.", "Les Amériques."], answer: "Les Amériques." },
    { q: "Qu'est-ce que vous allez dessiner avec le feutre bleu ?", vi: "Bút dạ xanh dùng để vẽ gì?", pts: 1,
      options: ["Des villes.", "Des fleuves.", "Des frontières."], answer: "Des fleuves." },
    { q: "À quoi sert le stylo rouge ?", vi: "Bút bi đỏ dùng để làm gì?", pts: 1.5,
      options: ["À écrire le nom des pays.", "À écrire le nom des villes.", "À écrire le nom des capitales."],
      answer: "À écrire le nom des capitales." },
    { q: "Qu'est-ce que vous devez prendre ?", vi: "Bạn phải mang theo gì?", pts: 2,
      kind: "image", src: `${IMG}/options/ex12-q5.webp`, answer: "B" },
  ],
};

// ── The épreuve ──────────────────────────────────────────────────
export const DELF_A1_CE = {
  book: "Le DELF A1 100 % réussite — Didier FLE, 2022",
  epreuve: "Compréhension des écrits",
  duree: "30 minutes",
  points: 25,
  pages: "p.41–70",
  intro:
    "Épreuve 2 du DELF A1 : 4 exercices, 8 documents à lire, questions à choix multiples (3 choix, 1 seule bonne réponse).",
  introVi:
    "Phần thi thứ 2 của DELF A1: 4 bài, 8 tài liệu để đọc, câu hỏi trắc nghiệm 3 lựa chọn — chỉ 1 đáp án đúng. 30 phút, 25 điểm.",
  method: [
    "Đọc câu hỏi TRƯỚC, rồi mới đọc tài liệu.",
    "Quan sát hình thức tài liệu và tiêu đề trước khi đọc chữ.",
    "Gạch chân con số, ngày tháng và từ khoá.",
    "Câu hỏi luôn theo đúng thứ tự thông tin trong tài liệu.",
    "Từ trong câu hỏi thường KHÁC từ trong tài liệu (garage → mécanicien, prix → tarif, €).",
  ],
  sections: [
    { id: "obj1", num: 1, fr: "Suivre des instructions simples", vi: "Làm theo chỉ dẫn đơn giản",
      domaine: "Domaine personnel",
      supports: "lettre, carte postale, courriel, carte d'invitation, mode d'emploi",
      prepare: [ACT1, ACT2, ACT3, ACT4], train: [EX1, EX2, EX3] },
    { id: "obj2", num: 2, fr: "Lire pour s'orienter dans l'espace", vi: "Đọc để định hướng trong không gian",
      domaine: "Domaine public",
      supports: "affiche, publicité, brochure, horaires, prospectus, panneau d'affichage",
      prepare: [ACT5, ACT6, ACT7, ACT8], train: [EX4, EX5, EX6] },
    { id: "obj3", num: 3, fr: "Lire pour s'orienter dans le temps", vi: "Đọc để định hướng thời gian",
      domaine: "Domaine professionnel",
      supports: "courrier et courriel professionnel, instructions, mode d'emploi, brochure, programme",
      prepare: [ACT9, ACT10, ACT11, ACT12], train: [EX7, EX8, EX9] },
    { id: "obj4", num: 4, fr: "Lire pour s'informer", vi: "Đọc để lấy thông tin",
      domaine: "Domaine éducationnel ou public",
      supports: "affiche, brochure, programme d'un événement, article de presse",
      prepare: [ACT13, ACT14, ACT15, ACT16], train: [EX10, EX11, EX12] },
  ],
};

export default DELF_A1_CE;
