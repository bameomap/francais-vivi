// Compréhension de l'oral — the « reliez » drills, « 100 % réussite » p.13–20.
//
// The book draws these as two columns joined by lines. That is the same task as
// picking one label per item, so each left-hand item becomes a question whose
// choices are the whole right-hand column — no new question type needed, and
// grading stays exact against the Corrigés.
//
// Hand-written rather than generated: scripts/delf-a1-parse-co.py reads the
// multiple-choice drills, where the checkbox glyph marks the choices, but a
// matching table has no such marker to key on.

const piste = n => `/api/audio?b=delf-a1&p=${n}`;

export const CO_MATCH = [
  {
    objectif: 1, id: "co-a7", label: "Activité 7", page: 13,
    setup: "Écoutez la conversation et reliez les informations.",
    setupVi: "Nghe hội thoại rồi nối tên người với ngày sinh.",
    audio: piste(7), piste: 7,
    transcript: "– Je suis né le 28 août 1978. Et toi Audrey ?\n– Moi ? Le 1er mars 1982.\n– Tu es plus jeune que moi. Et toi Alexandra ?\n– Je suis née la même année, le 30 mai 1982.",
    questions: [
      { q: "Vincent", options: ["30 / 05 / 1982", "01 / 03 / 1982", "28 / 08 / 1978"], answer: "28 / 08 / 1978" },
      { q: "Audrey", options: ["30 / 05 / 1982", "01 / 03 / 1982", "28 / 08 / 1978"], answer: "01 / 03 / 1982" },
      { q: "Alexandra", options: ["30 / 05 / 1982", "01 / 03 / 1982", "28 / 08 / 1978"], answer: "30 / 05 / 1982" },
    ],
  },
  {
    objectif: 1, id: "co-a8", label: "Activité 8", page: 13,
    setup: "Écoutez les messages et reliez les propositions.",
    setupVi: "Nghe các tin nhắn rồi nối tên người với số điện thoại.",
    audio: piste(8), piste: 8,
    transcript: "1. Allô ? C'est Sylvain. Rappelez-moi. Mon numéro est le 06.41.12.71.39.\n2. Bonjour. C'est Robert. Peux-tu me rappeler au 03.21.96.55.41 ? Merci.\n3. Notez mon numéro de téléphone : 04.83.72.11.29.",
    questions: [
      { q: "Sylvain", options: ["04.83.72.11.29", "06.41.12.71.39", "03.21.96.55.41"], answer: "06.41.12.71.39" },
      { q: "Robert", options: ["04.83.72.11.29", "06.41.12.71.39", "03.21.96.55.41"], answer: "03.21.96.55.41" },
      { q: "Carole", options: ["04.83.72.11.29", "06.41.12.71.39", "03.21.96.55.41"], answer: "04.83.72.11.29" },
    ],
  },
  {
    objectif: 1, id: "co-a12", label: "Activité 12", page: 14,
    setup: "Écoutez les messages et reliez les propositions.",
    setupVi: "Nghe rồi nối mỗi tin nhắn với nơi được nhắc tới.",
    audio: piste(12), piste: 12,
    transcript: "1. Pour vos vacances, prenez un billet de train et allez à la mer. Dans votre valise, mettez une serviette et des lunettes de soleil !\n2. Vous voulez voir des animaux ? Visitez les forêts de notre région. Dans les arbres, cherchez les petits animaux. Il y a aussi beaucoup de champs avec des vaches.\n3. Venez visiter nos monuments, nos musées et nos magasins. Prenez le métro, c'est plus rapide !",
    questions: [
      { lead: "Message n° 1", q: "C'est…", options: ["Mer", "Ville", "Campagne"], answer: "Mer" },
      { lead: "Message n° 2", q: "C'est…", options: ["Mer", "Ville", "Campagne"], answer: "Campagne" },
      { lead: "Message n° 3", q: "C'est…", options: ["Mer", "Ville", "Campagne"], answer: "Ville" },
    ],
  },
  {
    objectif: 2, id: "co-a16", label: "Activité 16", page: 15,
    setup: "Écoutez les messages et reliez les propositions.",
    setupVi: "Nghe rồi xác định mỗi tin nhắn là mời, khuyến cáo hay thông tin.",
    audio: piste(16), piste: 16,
    transcript: "1. Nouveau magasin de vêtements dans le centre-ville. Grande inauguration avec 25 % de réduction jeudi de 10 h à 18 h. Allez-y !\n2. Beaucoup de voitures sur les routes ce matin. Attention ! Prenez les transports en commun et laissez votre voiture chez vous.\n3. Aujourd'hui, il y a des millions d'animaux domestiques en France. Ce sont surtout des chiens, des chats et des oiseaux.",
    questions: [
      { lead: "Message n° 1", q: "C'est une…", options: ["Invitation", "Information", "Recommandation"], answer: "Invitation" },
      { lead: "Message n° 2", q: "C'est une…", options: ["Invitation", "Information", "Recommandation"], answer: "Recommandation" },
      { lead: "Message n° 3", q: "C'est une…", options: ["Invitation", "Information", "Recommandation"], answer: "Information" },
    ],
  },
  {
    objectif: 2, id: "co-a21", label: "Activité 21", page: 16,
    setup: "Écoutez les messages et reliez les propositions.",
    setupVi: "Nghe ngữ điệu rồi xác định câu khẳng định, câu hỏi hay câu cảm thán — chỉ khác nhau ở giọng đọc.",
    audio: piste(21), piste: 21,
    transcript: "1. C'est une grande maison !\n2. C'est une grande maison ?\n3. C'est une grande maison.\n4. Le voyage est long ?\n5. Le voyage est long.\n6. Le voyage est long !",
    questions: [
      { lead: "Message n° 1", q: "C'est une…", options: ["Affirmation.", "Interrogation.", "Exclamation."], answer: "Exclamation." },
      { lead: "Message n° 2", q: "C'est une…", options: ["Affirmation.", "Interrogation.", "Exclamation."], answer: "Interrogation." },
      { lead: "Message n° 3", q: "C'est une…", options: ["Affirmation.", "Interrogation.", "Exclamation."], answer: "Affirmation." },
      { lead: "Message n° 4", q: "C'est une…", options: ["Affirmation.", "Interrogation.", "Exclamation."], answer: "Interrogation." },
      { lead: "Message n° 5", q: "C'est une…", options: ["Affirmation.", "Interrogation.", "Exclamation."], answer: "Affirmation." },
      { lead: "Message n° 6", q: "C'est une…", options: ["Affirmation.", "Interrogation.", "Exclamation."], answer: "Exclamation." },
    ],
  },
  {
    objectif: 3, id: "co-a35", label: "Activité 35", page: 20,
    setup: "Écoutez les messages et reliez les propositions.",
    setupVi: "Nghe rồi cho biết mỗi người gọi để làm gì.",
    audio: piste(35), piste: 35,
    transcript: "1. Bonjour, c'est Maxime. Je suis désolé. Demain, je ne peux pas aller à notre rendez-vous. Excuse-moi. Est-ce que tu es disponible jeudi ? Appelle-moi !\n2. Salut, c'est Caroline. Alors, tu es en vacances à partir de jeudi. Super ! Tu vas à Montréal, c'est ça ? Bonnes vacances et à très bientôt !\n3. Bonjour, c'est Sarah. Félicitations pour ton nouveau travail ! Je suis très contente pour toi.",
    questions: [
      { lead: "Message n° 1", q: "Maxime téléphone pour…",
        options: ["s'excuser.", "vous féliciter.", "vous souhaiter de bonnes vacances."], answer: "s'excuser." },
      { lead: "Message n° 2", q: "Caroline téléphone pour…",
        options: ["s'excuser.", "vous féliciter.", "vous souhaiter de bonnes vacances."], answer: "vous souhaiter de bonnes vacances." },
      { lead: "Message n° 3", q: "Sarah téléphone pour…",
        options: ["s'excuser.", "vous féliciter.", "vous souhaiter de bonnes vacances."], answer: "vous féliciter." },
    ],
  },
];

export default CO_MATCH;
