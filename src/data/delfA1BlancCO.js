// Épreuves blanches — compréhension de l'oral, « 100 % réussite » p.112–114 and
// p.121–123, with the Corrigés from p.156 and p.158.
//
// The mock papers run the real exam's five exercices: three multiple-choice
// documents, one six-picture matching task, and one OUI/NON object grid. Same
// question shapes the Écouter tab already grades, so nothing new is needed —
// only the artwork, cut by scripts/delf-a1-crop.py.
//
// Hand-written because these pages label their choices A/B/C with the wording
// on a separate baseline, and two of the picture rows have no text labels at
// all (the letters are drawn into the artwork), which the geometry parser reads
// as a question with no choices.

const piste = n => `/api/delf-audio?p=${n}`;
const OPT = "/delf-a1/options";
const DOC = "/delf-a1/docs";

const DIALOGUES = ["n° 1", "n° 2", "n° 3", "n° 4", "Aucune situation"];

const LISEZ = "Lisez les questions. Écoutez le document puis répondez.";
const CONSIGNE_MATCH =
  "Vous allez entendre quatre petits dialogues correspondant à quatre situations différentes. " +
  "Notez, sous chaque image, le numéro du dialogue qui correspond. Attention, il y a six images " +
  "(A, B, C, D, E et F) mais seulement quatre dialogues.";
const CONSIGNE_OBJ =
  "Vous allez entendre un message. Quels objets sont donnés dans le message ? " +
  "Vous entendez le nom de l'objet ? Cochez Oui. Sinon, cochez Non.";

const ouiNon = (answers) =>
  answers.map((a, i) => ({
    lead: `Objet n° ${i + 1}`, q: "Vous entendez le nom de cet objet ?",
    options: ["Oui", "Non"], answer: a, pts: 1,
  }));

const matchQuestions = (answers) =>
  ["A", "B", "C", "D", "E", "F"].map((letter, i) => ({
    q: `Image ${letter}`, options: DIALOGUES, answer: answers[i],
  }));

// ── Épreuve blanche 1 (p.112–114, pistes 88–92) ──────────────────
export const BLANC1_CO = [
  {
    id: "b1-co1", label: "Exercice 1", page: 112, piste: 88, pts: 4,
    setup: `${LISEZ} Vous écoutez ce message sur votre répondeur téléphonique.`,
    setupVi: "Đọc câu hỏi trước, rồi nghe tin nhắn thoại và trả lời.",
    audio: piste(88),
    transcript: "Bonjour chère cousine, c’est Gilles. Je suis dans ta ville pour mon travail avec mon directeur. On peut se voir demain après 19 h ? Je t’invite dans un petit restaurant sympa près de mon hôtel. Envoie-moi un texto avant 17 h si tu es d’accord et je réserve une table pour 20 h. Bisous",
    questions: [
      { q: "Qui est Gilles ?", pts: 1,
        options: ["Votre ami.", "Votre cousin.", "Votre directeur."], answer: "Votre cousin." },
      { q: "Où est Gilles ?", pts: 1,
        options: ["À son bureau.", "Dans votre ville.", "Dans un restaurant."], answer: "Dans votre ville." },
      { q: "Que devez-vous faire ?", kind: "image", pts: 1,
        src: `${OPT}/b1-ex1-q3.webp`, answer: "B" },
      { q: "À quelle heure est le rendez-vous ?", pts: 1,
        options: ["17 h.", "19 h.", "20 h."], answer: "20 h." },
    ],
  },
  {
    id: "b1-co2", label: "Exercice 2", page: 112, piste: 89, pts: 4,
    setup: `${LISEZ} Vous entendez cette annonce dans un magasin.`,
    setupVi: "Nghe thông báo trong một cửa hàng.",
    audio: piste(89),
    transcript: "Chers clients, courez vite au rayon librairie ! Depuis 14 h et jusqu’à 16 h seulement, pour un livre acheté, un deuxième offert. Et n’oubliez pas de demander à la caisse un bon pour participer au grand tirage au sort à 19 h et gagner deux entrées gratuites pour le festival du livre qui commence demain.",
    questions: [
      { q: "Où faut-il courir ?", kind: "image", pts: 1,
        src: `${OPT}/b1-ex2-q1.webp`, answer: "C" },
      { q: "Cette annonce est valable…", pts: 1,
        options: ["entre 14 h et 19 h.", "entre 14 h et 16 h.", "entre 16 h et 19 h."],
        answer: "entre 14 h et 16 h." },
      { q: "Où est-ce que vous pouvez avoir un bon pour participer au jeu ?", kind: "image", pts: 1,
        src: `${OPT}/b1-ex2-q3.webp`, answer: "B" },
      { q: "Quand commence le festival ?", pts: 1,
        options: ["Aujourd'hui.", "Demain.", "Après-demain."], answer: "Demain." },
    ],
  },
  {
    id: "b1-co3", label: "Exercice 3", page: 113, piste: 90, pts: 4,
    setup: `${LISEZ} Vous écoutez ce message sur votre répondeur téléphonique.`,
    setupVi: "Nghe tin nhắn thoại và trả lời.",
    audio: piste(90),
    transcript: "Bonjour, c’est José, le secrétaire du directeur. Vous avez rendez-vous avec le médecin du travail lundi prochain. Pour votre rendez-vous, venez à 10 h au 2 e étage. Vous pouvez parler de votre accident d’hier. Racontez votre visite à l’hôpital et montrez votre ordonnance. Si vous avez des questions, appelez-moi vendredi. Bonne journée.",
    questions: [
      { q: "Qui vous laisse ce message ?", pts: 1,
        options: ["Votre secrétaire.", "Le secrétaire du médecin.", "Le secrétaire du directeur."],
        answer: "Le secrétaire du directeur." },
      { q: "À quelle heure est-ce que vous devez aller au rendez-vous ?", pts: 1,
        options: ["8 h.", "10 h.", "12 h."], answer: "10 h." },
      { q: "Le rendez-vous, c'est pour parler de votre accident…", pts: 1,
        options: ["de lundi.", "d'hier.", "de vendredi."], answer: "d'hier." },
      { q: "Qu'est-ce que vous devez prendre avec vous ?", pts: 1,
        options: ["Votre ordonnance.", "Votre pièce d'identité.", "Votre feuille de visite à l'hôpital."],
        answer: "Votre ordonnance." },
    ],
  },
  {
    id: "b1-co4", label: "Exercice 4", page: 113, piste: 91, pts: 8,
    setup: CONSIGNE_MATCH,
    setupVi: "Nghe 4 hội thoại, ghi số hội thoại tương ứng dưới mỗi hình. 6 hình nhưng chỉ 4 hội thoại.",
    audio: piste(91),
    transcript: "1. – Bonjour, je voudrais m’inscrire s’il vous plaît.\n– Vous avez une pièce d’identité?\n– Oui, et j’ai aussi une carte d’étudiant.\n2. – Vous ne pouvez pas emprunter 6 DVD.\n– Ah bon ! C’est écrit sur le panneau.\n– Non, c’est 6 livres et 3 DVD.\n3. – Bonjour, je cherche une méthode pour apprendre le chinois.\n– Toutes nos méthodes sont classées au rayon 25 derrière vous.\n– Ah merci ! Je n’avais pas fait attention.\n4. – C’est fermé ? Mais ça fait longtemps ?\n– Non, regardez le panneau, c’est une fermeture exceptionnelle.\n– Ah bon merci, je reviendrai demain.",
    doc: { kind: "image", src: `${DOC}/b1-ex4-abc.webp`, src2: `${DOC}/b1-ex4-def.webp`,
           alt: "Six situations, A–F" },
    questions: matchQuestions(["n° 4", "n° 1", "Aucune situation", "Aucune situation", "n° 2", "n° 3"]),
  },
  {
    id: "b1-co5", label: "Exercice 5", page: 114, piste: 92, pts: 5,
    setup: CONSIGNE_OBJ,
    setupVi: "Nghe thấy tên đồ vật thì chọn Oui, không nghe thấy thì chọn Non.",
    audio: piste(92),
    transcript: "Allô ? Est-ce que tu peux m’aider à faire le sac pour ce week-end ? Prends des gants s’il te plaît. Il faut aussi des serviettes. Elles sont sur mon lit, dans ma chambre. Mets aussi le dentifrice et les brosses à dents dans le sac. Pour nos vêtements, je vais apporter une valise. Merci.",
    doc: { kind: "image", src: `${DOC}/b1-ex5.webp`, alt: "Cinq objets numérotés" },
    questions: ouiNon(["Oui", "Oui", "Non", "Non", "Oui"]),
  },
];

// ── Épreuve blanche 2 (p.121–123, pistes 93–97) ──────────────────
export const BLANC2_CO = [
  {
    id: "b2-co1", label: "Exercice 1", page: 121, piste: 93, pts: 4,
    setup: `${LISEZ} Vous écoutez ce message sur votre répondeur téléphonique.`,
    setupVi: "Nghe tin nhắn thoại và trả lời.",
    audio: piste(93),
    transcript: "Salut, c’est Cyril. Qu’est-ce que tu fais vendredi ? Moi, je rentre de vacances jeudi. Tu veux aller au cinéma ? Regarde le programme des films sur le site internet. Après, écris-moi un message. Je ne peux pas répondre au téléphone. Je vais t’apporter un tee-shirt souvenir de mes vacances. À bientôt !",
    questions: [
      { q: "Quel jour est-ce que Cyril vous propose d'aller au cinéma ?", pts: 1,
        options: ["Mercredi.", "Jeudi.", "Vendredi."], answer: "Vendredi." },
      { q: "Où est-ce que vous pouvez voir le programme ?", pts: 1,
        options: ["À l'entrée du cinéma.", "Dans le message de Cyril.", "Sur le site internet du cinéma."],
        answer: "Sur le site internet du cinéma." },
      { q: "Qu'est-ce que vous devez faire ?", pts: 1,
        options: ["Aller chez Cyril.", "Téléphoner à Cyril.", "Envoyer un message à Cyril."],
        answer: "Envoyer un message à Cyril." },
      { q: "Quel souvenir est-ce que Cyril va acheter ?", kind: "image", pts: 1,
        src: `${OPT}/b2-ex1-q4.webp`, answer: "B" },
    ],
  },
  {
    id: "b2-co2", label: "Exercice 2", page: 121, piste: 94, pts: 4,
    setup: `${LISEZ} Vous entendez cette publicité à la radio.`,
    setupVi: "Nghe quảng cáo trên đài.",
    audio: piste(94),
    transcript: "Ce week-end, c’est la fête des mères. Venez dans notre magasin. Nous sommes ouverts de 10 h à 19 h. Et il y a 15 % de réduction sur tous les produits ! Venez vite ! Il y a plein d’idées pour vos cadeaux. Nous avons beaucoup de parfums pour les mamans. Et on vous propose un prix spécial de 25 euros sur tous les chapeaux.",
    questions: [
      { q: "Quelle est la fête ce week-end ?", pts: 1,
        options: ["La fête des pères.", "La fête des mères.", "La fête des grands-mères."],
        answer: "La fête des mères." },
      { q: "La réduction sur les produits est de combien ?", pts: 1,
        options: ["10 %.", "15 %.", "25 %."], answer: "15 %." },
      { q: "Quel cadeau est-ce que vous pouvez trouver dans le magasin ?", kind: "image", pts: 1,
        src: `${OPT}/b2-ex2-q3.webp`, answer: "C" },
      { q: "Qu'est-ce qui coûte 25 euros ?", kind: "image", pts: 1,
        src: `${OPT}/b2-ex2-q4.webp`, answer: "A" },
    ],
  },
  {
    id: "b2-co3", label: "Exercice 3", page: 122, piste: 95, pts: 4,
    setup: `${LISEZ} Vous écoutez le message suivant au travail.`,
    setupVi: "Nghe thông báo ở nơi làm việc.",
    audio: piste(95),
    transcript: "Bienvenue dans l’entreprise ! Vous êtes dans le bâtiment principal, rue Louis Pasteur. Pour le restaurant du personnel, allez rue Napoléon. Avec le téléphone sur votre bureau, vous pouvez appeler le service informatique. Appelez le 6806. Notez cette information : l’entreprise est fermée en décembre. Pour terminer, votre contrat est disponible au service du personnel. Bonne journée !",
    questions: [
      { q: "Où est le restaurant du personnel ?", pts: 1,
        options: ["Rue Napoléon.", "Rue Léon Blum.", "Rue Louis Pasteur."], answer: "Rue Napoléon." },
      { q: "Quel est le numéro pour appeler le service informatique ?", pts: 1,
        options: ["6008.", "6600.", "6806."], answer: "6806." },
      { q: "Quand est-ce que l'entreprise ferme ?", pts: 1,
        options: ["En septembre.", "En novembre.", "En décembre."], answer: "En décembre." },
      { q: "Pourquoi est-ce que vous devez aller au service du personnel ?", pts: 1,
        options: ["Pour prendre votre contrat.", "Pour rencontrer le personnel.", "Pour avoir un ordinateur portable."],
        answer: "Pour prendre votre contrat." },
    ],
  },
  {
    id: "b2-co4", label: "Exercice 4", page: 122, piste: 96, pts: 8,
    setup: CONSIGNE_MATCH,
    setupVi: "Nghe 4 hội thoại, ghi số hội thoại tương ứng dưới mỗi hình. 6 hình nhưng chỉ 4 hội thoại.",
    audio: piste(96),
    transcript: "1. – Tiens, mon stylo vert.\n– Oh, merci. Qu’est-ce que je dois écrire en vert ?\n– Tu écris la date en haut de la feuille.\n2. – Tous les jours, il y a de la viande au restaurant de l’université.\n– C’est vrai. Tu n’aimes pas la viande ?\n– Non, je ne mange pas de viande. Je vais sortir pour manger dehors.\n3. – Regarde, c’est la professeure d’histoire. Elle est à l’entrée de la bibliothèque.\n– Ah oui, je la connais. C’est aussi ma professeure de géographie.\n4. – Madame, je ne comprends pas l’exercice.\n– Oui ? Alors viens au tableau. On va faire l’exercice.\n– D’accord. Je prends mon livre ?\n– Oui, prends ton livre.",
    doc: { kind: "image", src: `${DOC}/b2-ex4-abc.webp`, src2: `${DOC}/b2-ex4-def.webp`,
           alt: "Six situations, A–F" },
    questions: matchQuestions(["Aucune situation", "Aucune situation", "n° 2", "n° 4", "n° 3", "n° 1"]),
  },
  {
    id: "b2-co5", label: "Exercice 5", page: 123, piste: 97, pts: 5,
    setup: CONSIGNE_OBJ,
    setupVi: "Nghe thấy tên đồ vật thì chọn Oui, không nghe thấy thì chọn Non.",
    audio: piste(97),
    transcript: "Allô ? Je suis devant le menu du restaurant. Qu’est-ce que tu veux ? Pour le plat, il y a du poisson avec du riz. Il y a aussi une boisson avec du lait. Et pour le dessert, c’est de la glace avec une banane. Le restaurant vend aussi des verres. Ils sont très beaux. Appelle-moi !",
    doc: { kind: "image", src: `${DOC}/b2-ex5.webp`, alt: "Cinq objets numérotés" },
    questions: ouiNon(["Non", "Oui", "Oui", "Non", "Oui"]),
  },
];
