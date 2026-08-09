// Compréhension de l'oral — the picture-grid exercices, « 100 % réussite » p.34–37.
//
// Two shapes the plain parser can't read, because the answer lives in a drawing
// rather than in text:
//
//   • Exercices 11–12 — six drawings A–F against four dialogues, two of the
//     drawings matching nothing. Each drawing becomes a question over the four
//     dialogue numbers plus « aucune situation », which is the same task.
//   • Exercices 14–15 — five numbered objects, OUI or NON for each.
//
// Either way the grid is the document and the labels are the questions, so no
// new question type is needed. Answers are the book's Corrigés (p.147); the
// grids are cut by scripts/delf-a1-crop.py.
//
// Exercices 10 and 13 are the book's worked examples — printed with the answers
// filled in and no corrigés entry — so they are not here.

const piste = n => `/api/delf-audio?p=${n}`;
const DOC = "/delf-a1/docs";

const DIALOGUES = ["n° 1", "n° 2", "n° 3", "n° 4", "Aucune situation"];

const CONSIGNE_MATCH =
  "Vous allez entendre quatre petits dialogues correspondant à quatre situations différentes. " +
  "Notez, sous chaque image, le numéro du dialogue qui correspond. Attention, il y a six images " +
  "(A, B, C, D, E et F) mais seulement quatre dialogues.";
const CONSIGNE_MATCH_VI =
  "Nghe 4 đoạn hội thoại rồi ghi số của đoạn tương ứng dưới mỗi hình. Có 6 hình nhưng chỉ 4 hội thoại " +
  "— nghĩa là 2 hình không khớp với hội thoại nào.";

const CONSIGNE_OBJ =
  "Vous allez entendre un message. Quels objets sont donnés dans le message ? " +
  "Vous entendez le nom de l'objet ? Cochez OUI. Sinon, cochez NON.";
const CONSIGNE_OBJ_VI =
  "Nghe tin nhắn. Nghe thấy tên đồ vật nào thì chọn OUI, không nghe thấy thì chọn NON. " +
  "Phải nghe đúng từ đó — suy đoán là sai.";

const ouiNon = (answers) =>
  answers.map((a, i) => ({
    lead: `Objet n° ${i + 1}`, q: "Vous entendez le nom de cet objet ?",
    options: ["OUI", "NON"], answer: a, pts: 1,
  }));

export const CO_GRID = [
  {
    objectif: 4, id: "co-ex11", label: "Exercice 11", page: 34, piste: 69, pts: 8,
    setup: CONSIGNE_MATCH, setupVi: CONSIGNE_MATCH_VI,
    audio: piste(69),
    doc: { kind: "image", src: `${DOC}/co-ex11-abc.webp`, src2: `${DOC}/co-ex11-def.webp`,
           alt: "Six situations, A–F" },
    transcript:
      "1. – Bonjour Monsieur Garcia, comment allez-vous ?\n– Oh, bonjour monsieur le directeur. Je vais bien merci et vous ?\n– Très bien, je vous remercie.\n" +
      "2. – Oh non, il y a toujours du riz à la cantine !\n– Oui, tu as raison. Moi, je veux des frites !\n" +
      "3. – Où est-ce que tu cours ?\n– Je suis en retard pour le cours de sport.\n– Mais le cours de sport c'est par là !\n– Ah oui, tu as raison. Merci.\n" +
      "4. – Bonjour, je suis le professeur de français de votre fils. Asseyez-vous.\n– Bonjour. Merci pour le rendez-vous.",
    questions: [
      { q: "Image A", options: DIALOGUES, answer: "n° 1" },
      { q: "Image B", options: DIALOGUES, answer: "n° 3" },
      { q: "Image C", options: DIALOGUES, answer: "Aucune situation" },
      { q: "Image D", options: DIALOGUES, answer: "n° 2" },
      { q: "Image E", options: DIALOGUES, answer: "Aucune situation" },
      { q: "Image F", options: DIALOGUES, answer: "n° 4" },
    ],
  },
  {
    objectif: 4, id: "co-ex12", label: "Exercice 12", page: 35, piste: 70, pts: 8,
    setup: CONSIGNE_MATCH, setupVi: CONSIGNE_MATCH_VI,
    audio: piste(70),
    doc: { kind: "image", src: `${DOC}/co-ex12.webp`, alt: "Six situations, A–F" },
    transcript:
      "1. – Tu es inscrit à l'université toi ?\n– Oui, je suis inscrit à l'université. Regarde, j'ai mon papier. Et toi ?\n– Pas encore.\n" +
      "2. – Ah, regarde, c'est Madame Belkacem, la nouvelle professeure.\n– C'est la prof de quoi ?\n– C'est la professeure d'histoire.\n" +
      "3. – Tu viens comment à l'université toi ?\n– Je viens à pied.\n– À pied ? C'est long non ?\n– Pas du tout. Seulement 10 minutes.\n" +
      "4. – Bonjour, entrez. Je vous présente Carla, la nouvelle élève. C'est son premier jour.\n– Bonjour tout le monde !",
    questions: [
      { q: "Image A", options: DIALOGUES, answer: "n° 1" },
      { q: "Image B", options: DIALOGUES, answer: "n° 4" },
      { q: "Image C", options: DIALOGUES, answer: "n° 3" },
      { q: "Image D", options: DIALOGUES, answer: "n° 2" },
      { q: "Image E", options: DIALOGUES, answer: "Aucune situation" },
      { q: "Image F", options: DIALOGUES, answer: "Aucune situation" },
    ],
  },
  {
    objectif: 5, id: "co-ex14", label: "Exercice 14", page: 36, piste: 72, pts: 5,
    setup: CONSIGNE_OBJ, setupVi: CONSIGNE_OBJ_VI,
    audio: piste(72),
    doc: { kind: "image", src: `${DOC}/co-ex14.webp`, alt: "Cinq objets numérotés" },
    transcript:
      "Bonjour, c'est Rebecca ! Demain, c'est votre premier jour dans notre entreprise. Vous devez apporter votre pièce d'identité. Dans votre bureau, il y a une grande chaise, votre ordinateur et une machine à café. Il y a aussi une tasse avec le nom de l'entreprise. Le midi, nous pouvons aller au restaurant de l'entreprise. À demain !",
    questions: ouiNon(["OUI", "NON", "OUI", "NON", "OUI"]),
  },
  {
    objectif: 5, id: "co-ex15", label: "Exercice 15", page: 37, piste: 73, pts: 5,
    setup: CONSIGNE_OBJ, setupVi: CONSIGNE_OBJ_VI,
    audio: piste(73),
    doc: { kind: "image", src: `${DOC}/co-ex15.webp`, alt: "Cinq objets numérotés" },
    transcript:
      "Salut ! Tu peux faire des courses s'il te plaît ? Alors, prends du beurre, une salade et des œufs. Je voudrais aussi du thé. Pour le dessert, qu'est-ce que tu veux ? Tu peux prendre des pommes. J'ai des bananes à la maison. Va aussi à la pharmacie pour prendre les médicaments. Merci beaucoup. Bisous.",
    questions: ouiNon(["OUI", "NON", "NON", "NON", "OUI"]),
  },
];

export default CO_GRID;
