// Compréhension de l'oral — the SE PRÉPARER drills the text parser can't read,
// « Le DELF A1 100 % réussite » p.12–22.
//
// scripts/delf-a1-parse-co.py reads a drill only when its choices are marked by
// the checkbox glyph and sit next to their question. These ones are drawn as
// tables ("remplissez le tableau"), as two columns joined by lines ("reliez les
// propositions"), or with two questions hanging off one message — layouts whose
// pieces land far apart in the extracted text, so the parser drops them rather
// than guess.
//
// Written by hand against the pages, with every answer taken from the book's
// own Corrigés (p.144–146). A table cell and a matching line are both "pick one
// label for this item", so they become ordinary questions here and grading
// stays exact.
//
// The picture drills — notez le numéro sous l'image, cochez les objets
// entendus — are in delfA1COPictures.js, which needs crops as well as text.

const piste = n => `/api/audio?b=delf-a1&p=${n}`;

// Repeated option sets, named so a typo in one cell can't quietly change the task.
const LIEU_TRANSPORT = ["À la gare", "À l'aéroport"];
const MESSAGES_5 = ["n° 1", "n° 2", "n° 3", "n° 4", "n° 5"];
const QUI_MESSAGE = ["Votre directeur", "Votre collègue"];
const TU_VOUS = ["Tutoiement", "Vouvoiement"];
const CONNAIT = ["se connaissent.", "ne se connaissent pas."];
const ANNIV = ["13 février", "30 mars", "20 juin", "5 juillet"];
const AGES = ["12 ans", "13 ans", "14 ans"];

export const CO_MORE = [
  {
    objectif: 1, id: "co-a4", label: "Activité 4", page: 12, piste: 4, audio: piste(4),
    setup: "Écoutez les messages et cochez les bonnes réponses.",
    setupVi: "Nghe rồi chọn đáp án đúng. Mỗi tin nhắn có hai câu hỏi — một về bạn, một về người gọi.",
    transcript:
      "1. Bonjour, c'est Martine. Alors, pour la fête de samedi, tu dois apporter un jus de fruits. Nicole apporte un gâteau et moi, une salade. À samedi !\n" +
      "2. Salut ! C'est Jean-Luc. J'ai les billets pour le concert de vendredi. Tu peux venir avec Sophie. Moi, j'invite Brigitte. À vendredi !\n" +
      "3. Oui, c'est Marc. Écoute, je suis disponible jeudi pour jouer au football. Mercredi, je vois Alberto. Est-ce que tu es d'accord pour jeudi alors ?",
    questions: [
      { lead: "Message n° 1", q: "Qu'est-ce que vous devez apporter ?",
        options: ["Un gâteau.", "Une salade.", "Un jus de fruits."], answer: "Un jus de fruits." },
      { lead: "Message n° 1", q: "Qu'est-ce que Martine apporte ?",
        options: ["Un gâteau.", "Une salade.", "Un jus de fruits."], answer: "Une salade." },
      { lead: "Message n° 2", q: "Avec qui est-ce que vous pouvez aller au concert ?",
        options: ["Avec Brigitte.", "Avec Sophie.", "Avec Jean-Luc."], answer: "Avec Sophie." },
      { lead: "Message n° 2", q: "Avec qui est-ce que Jean-Luc va au concert ?",
        options: ["Avec Sophie.", "Avec Marie.", "Avec Brigitte."], answer: "Avec Brigitte." },
      { lead: "Message n° 3", q: "Quel jour est-ce que vous avez rendez-vous avec Marc ?",
        options: ["Jeudi.", "Mercredi.", "Vendredi."], answer: "Jeudi." },
      { lead: "Message n° 3", q: "Quel jour Marc a rendez-vous avec Alberto ?",
        options: ["Jeudi.", "Mercredi.", "Vendredi."], answer: "Mercredi." },
    ],
  },
  {
    objectif: 1, id: "co-a9", label: "Activité 9", page: 13, piste: 9, audio: piste(9),
    setup: "Écoutez les messages et cochez les bonnes réponses.",
    setupVi: "Nghe rồi chọn đúng số điện thoại. Các lựa chọn chỉ khác nhau vài chữ số cuối.",
    transcript:
      "1. Bonjour. Pouvez-vous me rappeler au 01.47.72.33.09 ? Merci.\n" +
      "2. Le numéro de téléphone de la direction est le 03.20.90.01.00.\n" +
      "3. Peux-tu appeler Julia sur son téléphone portable ? C'est le 06.09.77.50.11.",
    questions: [
      { lead: "Message n° 1", q: "Quel est le numéro de téléphone ?",
        options: ["01.47.72.33.09", "01.47.62.39.90", "01.47.75.34.09"], answer: "01.47.72.33.09" },
      { lead: "Message n° 2", q: "Quel est le numéro de téléphone ?",
        options: ["03.20.90.01.02", "03.20.94.12.00", "03.20.90.01.00"], answer: "03.20.90.01.00" },
      { lead: "Message n° 3", q: "Quel est le numéro de téléphone ?",
        options: ["06.09.77.50.91", "06.09.77.50.11", "06.90.77.50.51"], answer: "06.09.77.50.11" },
    ],
  },
  {
    objectif: 1, id: "co-a11", label: "Activité 11", page: 14, piste: 11, audio: piste(11),
    setup: "Écoutez les messages et cochez les bonnes réponses.",
    setupVi: "Nghe rồi chọn đáp án đúng. Mỗi tin nhắn nhắc tới nhiều thứ — chỉ một thứ trả lời đúng câu hỏi.",
    transcript:
      "1. Oui, c'est Jacques. Alors, samedi, je ne travaille pas au magasin de moto. On peut aller au parc faire du vélo. Après, on peut faire des crêpes chez moi. Appelle-moi !\n" +
      "2. Salut ! C'est Clara. Tu es toujours d'accord pour aller au centre commercial acheter un pantalon ? Toi, tu veux une chemise, c'est ça ? Rendez-vous à 11 h !\n" +
      "3. Salut ! C'est Lucie. Samedi, on peut aller au marché pour acheter les fruits. Mais pour les boissons, on va au magasin. D'accord ? Appelle-moi !",
    questions: [
      { lead: "Message n° 1", q: "Qu'est-ce que Jacques veut faire samedi au parc ?",
        options: ["Faire du vélo.", "Nettoyer sa moto.", "Manger des crêpes."], answer: "Faire du vélo." },
      { lead: "Message n° 2", q: "Pourquoi Clara veut aller au centre commercial avec vous ?",
        options: ["Elle veut acheter un pantalon.", "Elle veut acheter un manteau.", "Elle veut acheter une chemise."],
        answer: "Elle veut acheter un pantalon." },
      { lead: "Message n° 3", q: "Pour quoi Lucie veut aller au marché avec vous ?",
        options: ["Pour acheter des fruits.", "Pour acheter des légumes.", "Pour acheter des boissons."],
        answer: "Pour acheter des fruits." },
    ],
  },
  {
    objectif: 2, id: "co-a20", label: "Activité 20", page: 16, piste: 20, audio: piste(20),
    setup: "Écoutez les messages et remplissez le tableau : à la gare ou à l'aéroport ?",
    setupVi: "Nghe từng thông báo rồi cho biết nó được phát ở nhà ga hay ở sân bay. Nghe từ khoá: avion / bagages à main → sân bay; train / quai → nhà ga.",
    transcript:
      "1. Mesdames, Messieurs. Nous vous rappelons que le poids maximum des bagages à main est de 12 kg. Les autres bagages doivent être enregistrés avant de monter dans l'avion. Merci.\n" +
      "2. Mesdames, Messieurs. Tous nos trains ont un bar pour acheter des boissons et des biscuits pendant votre voyage. Merci de votre attention et bon voyage.\n" +
      "3. Mesdames, Messieurs. Les quais 3 et 5 sont exceptionnellement fermés. Tous les trains partent des quais 2 et 4. Merci de votre attention.",
    questions: [
      { q: "Message n° 1", options: LIEU_TRANSPORT, answer: "À l'aéroport" },
      { q: "Message n° 2", options: LIEU_TRANSPORT, answer: "À la gare" },
      { q: "Message n° 3", options: LIEU_TRANSPORT, answer: "À la gare" },
    ],
  },
  {
    objectif: 2, id: "co-a22", label: "Activité 22", page: 16, piste: 22, audio: piste(22),
    setup: "Écoutez les messages et remplissez le tableau : quel message pour quel sentiment ?",
    setupVi: "Nghe 5 tin nhắn rồi ghép mỗi cảm xúc với số tin nhắn tương ứng. Mỗi tin nhắn dùng đúng một lần.",
    transcript:
      "1. Allô ? C'est Rachida. Je t'appelle pour te dire que je ne peux pas venir ce soir. Je suis malade. Je vais chez le médecin tout à l'heure.\n" +
      "2. Salut ! Je vais au Brésil pendant les vacances ! C'est super ! Je te raconte samedi.\n" +
      "3. Oh, tu ne viens pas à la fête ? Moi, je veux y aller avec toi. Allez, viens, s'il te plaît.\n" +
      "4. Allô ? Pourquoi tu ne réponds pas ? C'est important. Tu es où ? Appelle-moi !\n" +
      "5. Oui, c'est moi. Je ne peux pas aller au cinéma ce soir. J'ai beaucoup de travail. Je suis très fatigué.",
    questions: [
      { q: "Content(e)", options: MESSAGES_5, answer: "n° 2" },
      { q: "Triste", options: MESSAGES_5, answer: "n° 3" },
      { q: "Fatigué(e)", options: MESSAGES_5, answer: "n° 5" },
      { q: "En colère", options: MESSAGES_5, answer: "n° 4" },
      { q: "Malade", options: MESSAGES_5, answer: "n° 1" },
    ],
  },
  {
    objectif: 3, id: "co-a31", label: "Activité 31", page: 18, piste: 31, audio: piste(31),
    setup: "Écoutez les messages et cochez les bonnes réponses.",
    setupVi: "Nghe giờ. Các lựa chọn cố tình gần nhau (15 h 40 / 14 h 40 / 3 h 40) — phải nghe rõ cả giờ lẫn phút.",
    transcript:
      "1. Votre rendez-vous est lundi avec Monsieur Denis. Il vous attend à 15 h 40.\n" +
      "2. Allô ? C'est Madame Leblanc. Il est 9 h 45. Je vous attends pour votre entretien. Merci.\n" +
      "3. La réunion n'est plus à 13 h. Le directeur demande à faire la réunion à 17 h 30. Merci.",
    questions: [
      { lead: "Message n° 1", q: "À quelle heure est votre rendez-vous ?",
        options: ["3 h 40.", "14 h 40.", "15 h 40."], answer: "15 h 40." },
      { lead: "Message n° 2", q: "Quelle est l'heure du message ?",
        options: ["9 h 15.", "9 h 30.", "9 h 45."], answer: "9 h 45." },
      { lead: "Message n° 3", q: "À quelle heure est la réunion ?",
        options: ["12 h 00.", "13 h 30.", "17 h 30."], answer: "17 h 30." },
    ],
  },
  {
    objectif: 3, id: "co-a34", label: "Activité 34", page: 20, piste: 34, audio: piste(34),
    setup: "Écoutez les messages et complétez le tableau : qui vous laisse le message ?",
    setupVi: "Nghe cách xưng hô. « tu », gọi tên riêng → đồng nghiệp; « vous », xưng Monsieur/Madame → sếp.",
    transcript:
      "1. Salut ! C'est Renaud. La réunion de demain est annulée. Est-ce que tu peux appeler le directeur ? Merci.\n" +
      "2. Bonjour, c'est Monsieur Lenoir. Je ne suis pas au bureau aujourd'hui. Est-ce que vous pouvez appeler ma secrétaire pour un rendez-vous s'il vous plaît ? Au revoir.\n" +
      "3. Bonjour, c'est Adrien Rousseau. Je ne trouve pas le dossier pour la réunion de cet après-midi. Est-ce que tu peux m'appeler ? C'est urgent.",
    questions: [
      { q: "Message n° 1", options: QUI_MESSAGE, answer: "Votre collègue" },
      { q: "Message n° 2", options: QUI_MESSAGE, answer: "Votre directeur" },
      { q: "Message n° 3", options: QUI_MESSAGE, answer: "Votre collègue" },
    ],
  },
  {
    objectif: 3, id: "co-a36", label: "Activité 36", page: 20, piste: 36, audio: piste(36),
    setup: "Écoutez les messages et cochez les bonnes réponses.",
    setupVi: "Nghe kỹ chỉ dẫn phải làm gì. Tin nhắn nhắc tới nhiều cách liên hệ — chỉ một cách là điều bạn phải làm.",
    transcript:
      "1. Bonjour, c'est Madame Dupuis de l'Agence pour l'emploi. Nous avons une offre pour un emploi de serveur les samedis et dimanches. Si vous êtes intéressé, vous devez aller sur notre site internet et répondre à l'offre. Au revoir !\n" +
      "2. Bonjour, c'est Madame Dupuis de l'Agence pour l'emploi. Pour les offres d'emploi à l'aéroport, vous devez téléphoner directement à Monsieur Olivier. C'est le responsable des entretiens. N'oubliez pas de m'écrire pour me dire si vous appelez Monsieur Olivier. À bientôt !\n" +
      "3. Bonjour, c'est Madame Lecomte. Pour la réunion, merci d'apporter des feuilles et des stylos pour tout le monde. Pas de crayons ! Juste des stylos pour écrire. C'est important. Merci beaucoup.",
    questions: [
      { lead: "Message n° 1", q: "Pour répondre à l'offre, vous devez…",
        options: ["écrire à l'agence.", "aller sur le site Internet.", "téléphoner à Mme Dupuis."],
        answer: "aller sur le site Internet." },
      { lead: "Message n° 2", q: "Pour répondre à une offre d'emploi à l'aéroport, vous devez…",
        options: ["téléphoner à Mme Dupuis.", "téléphoner à M. Olivier.", "écrire à Mme Dupuis."],
        answer: "téléphoner à M. Olivier." },
      { lead: "Message n° 3", q: "Qu'est-ce que vous devez apporter à la réunion ?",
        options: ["Des crayons.", "Des stylos.", "Des stylos et des feuilles."],
        answer: "Des stylos et des feuilles." },
    ],
  },
  {
    objectif: 4, id: "co-a38", label: "Activité 38", page: 20, piste: 38, audio: piste(38),
    setup: "Écoutez le dialogue et complétez le tableau : date d'anniversaire et âge de chaque élève.",
    setupVi: "Nghe cả đoạn hội thoại rồi điền ngày sinh và tuổi cho từng học sinh. Emma không tự nói tuổi — Margot nói hộ.",
    transcript:
      "Professeur : Nous allons faire le calendrier des anniversaires de la classe. David, c'est quand ton anniversaire ?\n" +
      "David : Mon anniversaire, c'est le 13 février.\n" +
      "Professeur : C'est bientôt ! Tu vas avoir quel âge ?\n" +
      "David : 14 ans.\n" +
      "Professeur : Merci. Et toi Margot ?\n" +
      "Margot : Moi, je suis née le 5 juillet.\n" +
      "Professeur : D'accord, j'écris ta date de naissance sur le calendrier. Et tu as quel âge ?\n" +
      "Margot : J'ai 13 ans. Ma copine Emma, elle a 13 ans aussi.\n" +
      "Emma : C'est vrai, nous avons le même âge. Mon anniversaire, c'est le 30 mars.\n" +
      "Professeur : Merci les filles. Victor, est-ce que je peux avoir ta date d'anniversaire et ton âge s'il te plaît ?\n" +
      "Victor : Mon anniversaire, c'est le 20 juin. J'ai 12 ans.",
    questions: [
      { lead: "David", q: "Date d'anniversaire", options: ANNIV, answer: "13 février" },
      { lead: "David", q: "Âge", options: AGES, answer: "14 ans" },
      { lead: "Margot", q: "Date d'anniversaire", options: ANNIV, answer: "5 juillet" },
      { lead: "Margot", q: "Âge", options: AGES, answer: "13 ans" },
      { lead: "Emma", q: "Date d'anniversaire", options: ANNIV, answer: "30 mars" },
      { lead: "Emma", q: "Âge", options: AGES, answer: "13 ans" },
      { lead: "Victor", q: "Date d'anniversaire", options: ANNIV, answer: "20 juin" },
      { lead: "Victor", q: "Âge", options: AGES, answer: "12 ans" },
    ],
  },
  {
    objectif: 4, id: "co-a41", label: "Activité 41", page: 21, piste: 41, audio: piste(41),
    setup: "Écoutez les dialogues et cochez les bonnes réponses.",
    setupVi: "Nghe hội thoại. Người nói đầu tiên không phải lúc nào cũng là chủ nhân của đồ vật.",
    transcript:
      "1. – S'il vous plaît ! Il y a une montre sur la table. C'est à toi Guillaume ?\n– Non Madame.\n– C'est ma montre Madame.\n– D'accord. Termine ton exercice Delphine. Après, viens prendre ta montre.\n" +
      "2. – Thomas, qu'est-ce que c'est sur la table ?\n– C'est mon parapluie.\n– Le parapluie, c'est à l'entrée de la salle. Sur ta table, tu dois mettre tes livres et tes stylos.\n" +
      "3. – Alors, il y a une nouvelle élève dans la classe. C'est Yasmine.\n– Bonjour !\n– Yasmine, j'aime beaucoup ton manteau rose.\n– Merci. Mes chaussures sont roses aussi.",
    questions: [
      { lead: "Dialogue n° 1", q: "C'est la montre de qui ?",
        options: ["De Delphine.", "De Guillaume.", "De la professeure."], answer: "De Delphine." },
      { lead: "Dialogue n° 2", q: "Qu'est-ce qu'il y a sur la table de Thomas ?",
        options: ["Ses stylos.", "Ses clés.", "Son parapluie."], answer: "Son parapluie." },
      { lead: "Dialogue n° 3", q: "La professeure aime… de Yasmine.",
        options: ["le chapeau", "le manteau", "les chaussures"], answer: "le manteau" },
    ],
  },
  {
    objectif: 4, id: "co-a43", label: "Activité 43", page: 22, piste: 43, audio: piste(43),
    setup: "Écoutez les messages et complétez le tableau : tutoiement ou vouvoiement ?",
    setupVi: "Nghe xem người nói dùng « tu » hay « vous ». Chú ý cả dạng mệnh lệnh: asseyez-vous → vouvoiement, lis → tutoiement.",
    transcript:
      "1. Bonjour. Je vous souhaite la bienvenue. Je suis contente de vous rencontrer. Asseyez-vous.\n" +
      "2. Samuel, qu'est-ce que tu penses de cette note ? Pour toi, est-ce que c'est une bonne note ?\n" +
      "3. Monsieur et Madame Leroy ? Bonjour. Je suis Monsieur Dumont, le professeur de français de votre fils. Comment allez-vous ?\n" +
      "4. Aurélie et Adrien, est-ce que vous pouvez lire s'il vous plaît ? Aurélie, toi, tu lis la page 4 et toi, Adrien, tu lis la page 5.",
    questions: [
      { q: "Message n° 1", options: TU_VOUS, answer: "Vouvoiement" },
      { q: "Message n° 2", options: TU_VOUS, answer: "Tutoiement" },
      { q: "Message n° 3", options: TU_VOUS, answer: "Vouvoiement" },
      { q: "Message n° 4", options: TU_VOUS, answer: "Tutoiement",
        vi: "« vous pouvez lire » là số nhiều (hai học sinh), không phải xưng hô lịch sự — ngay sau đó là « tu lis »." },
    ],
  },
  {
    objectif: 4, id: "co-a44", label: "Activité 44", page: 22, piste: 44, audio: piste(44),
    setup: "Écoutez les dialogues et cochez les bonnes réponses.",
    setupVi: "Hai người có quen nhau không? Gọi tên riêng, chào « salut » → có quen. Tự giới thiệu họ tên đầy đủ → chưa quen.",
    transcript:
      "1. – Bonjour Marion. Est-ce que tu es prête pour l'examen ?\n– Salut Valentine ! Oui, je suis prête pour l'examen de Madame Leduc.\n" +
      "2. – Bonjour. Je suis Madame Olivia Laroche, la directrice de l'école.\n– Bonjour. Anne-Marie Bourdon, la maman de Jules. Je vous remercie pour le rendez-vous.\n" +
      "3. – Monsieur Lemaître, pouvez-vous m'envoyer les résultats de votre classe ?\n– Bien sûr monsieur le directeur. Je vous envoie les résultats tout de suite.",
    questions: [
      { lead: "Dialogue n° 1", q: "Marion et Valentine…", options: CONNAIT, answer: "se connaissent." },
      { lead: "Dialogue n° 2", q: "Olivia et Anne-Marie…", options: CONNAIT, answer: "ne se connaissent pas." },
      { lead: "Dialogue n° 3", q: "Monsieur Lemaître et le directeur…", options: CONNAIT, answer: "se connaissent.",
        vi: "Họ xưng « vous » với nhau nhưng vẫn là quen biết — đây là quan hệ cấp trên / cấp dưới, không phải người lạ." },
    ],
  },
];
