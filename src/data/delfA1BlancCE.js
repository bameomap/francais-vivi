// Épreuves blanches — compréhension des écrits, « 100 % réussite » p.115–118
// and p.124–127, keyed against the Corrigés on p.156 and p.158.
//
// Four exercices per paper, 25 points, 30 minutes. Every document here is
// artwork rather than prose — a mock email client, a wall of sticky notes, a
// wedding invitation set in script — so each is cut whole by
// scripts/delf-a1-crop.py and shown as an image, the way the candidate sees it.
//
// Question wording and points are transcribed from the pages; answers come from
// the Corrigés, which give the letter and the wording for text choices and the
// letter alone for picture ones.

const OPT = "/delf-a1/options";
const DOC = "/delf-a1/docs";

const img = (id, alt) => ({ kind: "image", src: `${DOC}/${id}.webp`, alt });

// ── Épreuve blanche 1 (p.115–118) ────────────────────────────────
export const BLANC1_CE = [
  {
    id: "b1-ce1", label: "Exercice 1", page: 115, pts: 6,
    setup: "Vous recevez ce message électronique de votre ami français.",
    setupVi: "Bạn nhận được email này từ một người bạn Pháp.",
    doc: img("b1ce-ex1-doc", "Courriel de Pierre — aéroport"),
    questions: [
      { q: "À quel moment votre vol arrive ?", pts: 1,
        options: ["Le matin.", "L'après-midi.", "Le soir."], answer: "Le matin." },
      { q: "Qu'est-ce que vous devez faire à votre arrivée ?", pts: 1.5,
        kind: "image", src: `${OPT}/b1ce-ex1-q2.webp`, answer: "B" },
      { q: "Où se trouve l'ascenseur ?", pts: 1,
        options: ["En face de la porte B.", "À droite de la porte B.", "À droite des escaliers."],
        answer: "En face de la porte B." },
      { q: "Quelle sortie est-ce que vous devez prendre ?", pts: 1,
        options: ["1.", "2.", "3."], answer: "2." },
      { q: "Comment est la voiture ?", pts: 1.5,
        kind: "image", src: `${OPT}/b1ce-ex1-q5.webp`, answer: "C" },
    ],
  },
  {
    id: "b1-ce2", label: "Exercice 2", page: 116, pts: 6,
    setup: "Vous recevez ce message du théâtre de la ville.",
    setupVi: "Bạn nhận được thư này từ nhà hát thành phố.",
    doc: img("b1ce-ex2-doc", "Message du service des remboursements"),
    questions: [
      { q: "Combien de billets est-ce que vous avez ?", pts: 1,
        options: ["3.", "4.", "5."], answer: "4." },
      { q: "Pourquoi recevez-vous ce message ?", pts: 1,
        options: ["Pour reporter une réservation.", "Pour confirmer une réservation.", "Pour annuler une réservation."],
        answer: "Pour annuler une réservation." },
      { q: "Quand a lieu l'événement ?", pts: 1,
        options: ["Jeudi.", "Vendredi.", "Samedi."], answer: "Samedi." },
      { q: "Que devez-vous faire ?", pts: 1,
        options: ["Venir sur place.", "Aller sur Internet.", "Envoyer un courrier."],
        answer: "Venir sur place." },
      { q: "Quel est le chemin pour aller à l'entrée du théâtre ?", pts: 2,
        kind: "image", src: `${OPT}/b1ce-ex2-q5.webp`, answer: "B" },
    ],
  },
  {
    id: "b1-ce3", label: "Exercice 3", page: 117, pts: 6,
    setup: "Vous commencez votre travail dans une entreprise française. Vous lisez vos messages.",
    setupVi: "Ngày đầu đi làm ở một công ty Pháp. Bạn đọc các tin nhắn để lại.",
    doc: img("b1ce-ex3-doc", "Cinq messages"),
    questions: [
      { q: "Quels sont les horaires de la réunion de votre département ?", pts: 1.5,
        options: ["De 10 h 30 à 11 h 30.", "De 10 h 30 à 12 h 30.", "De 11 h 30 à 12 h 30."],
        answer: "De 11 h 30 à 12 h 30." },
      { q: "À quelle heure est-ce que vous pouvez parler à vos collègues ?", pts: 1,
        options: ["À 9 h 30.", "À 10 h 30.", "À 12 h 30."], answer: "À 10 h 30." },
      { q: "Avec qui est-ce que vous déjeunez pour votre premier jour ?", pts: 1,
        options: ["Avec le directeur.", "Avec tous les collègues.", "Avec le directeur et tous les collègues."],
        answer: "Avec le directeur." },
      { q: "Pendant combien de temps est-ce que le parking des employés est fermé ?", pts: 1.5,
        options: ["1 mois.", "2 mois.", "3 mois."], answer: "2 mois." },
      { q: "Où est-ce que vous devez aller pour prendre des cahiers et des stylos ?", pts: 1,
        options: ["Au 1er étage.", "Au 2e étage.", "Au 3e étage."], answer: "Au 3e étage." },
    ],
  },
  {
    id: "b1-ce4", label: "Exercice 4", page: 117, pts: 7,
    setup: "Vous lisez cet article dans un journal.",
    setupVi: "Bạn đọc bài báo này.",
    doc: img("b1ce-ex4-doc", "Quel cadeau pour la Saint-Valentin ?"),
    questions: [
      { q: "Pour la Saint-Valentin, qu'est-ce que tous les couples font ?", pts: 1,
        options: ["Aller au restaurant.", "Rester à la maison.", "S'écrire des mots d'amour."],
        answer: "S'écrire des mots d'amour." },
      { q: "Au Japon, qu'est-ce qu'on offre à son directeur ?", pts: 2,
        kind: "image", src: `${OPT}/b1ce-ex4-q2.webp`, answer: "B" },
      { q: "En France, qu'est-ce qu'on fait pour la Saint-Valentin ?", pts: 1,
        options: ["Aller dans un parc.", "Aller au cinéma.", "Aller au restaurant."],
        answer: "Aller au restaurant." },
      { q: "Quel est l'objet le plus vendu pour cette fête ?", pts: 1.5,
        options: ["Des fleurs.", "Un bijou.", "Du parfum."], answer: "Du parfum." },
      { q: "L'article propose aux célibataires d'aller…", pts: 1.5,
        options: ["au cinéma.", "au restaurant.", "chez des amis."], answer: "au cinéma." },
    ],
  },
];

// ── Épreuve blanche 2 (p.124–127) ────────────────────────────────
export const BLANC2_CE = [
  {
    id: "b2-ce1", label: "Exercice 1", page: 124, pts: 6,
    setup: "Vous recevez cette invitation.",
    setupVi: "Bạn nhận được thiệp mời này.",
    doc: img("b2ce-ex1-doc", "Invitation de Gisela et Yves"),
    questions: [
      { q: "Gisela et Yves vous invitent à leur…", pts: 1.5,
        kind: "image", src: `${OPT}/b2ce-ex1-q1.webp`, answer: "B" },
      { q: "À quelle heure est-ce que vous devez aller à la mairie ?", pts: 1,
        options: ["À 14 h 30.", "À 15 h 30.", "À 16 h 30."], answer: "À 14 h 30." },
      { q: "Quel est le chemin pour aller à l'église ?", pts: 1,
        options: ["Tout droit, de la mairie à la salle.",
                  "Tout droit, de la rue Leclerc à l'église.",
                  "Tout droit, de la mairie à la rue Leclerc."],
        answer: "Tout droit, de la mairie à la rue Leclerc." },
      { q: "Qu'est-ce que les parents vont offrir ?", pts: 1.5,
        kind: "image", src: `${OPT}/b2ce-ex1-q4.webp`, answer: "B" },
      { q: "Vous devez envoyer votre réponse avant quelle date ?", pts: 1,
        options: ["Le 20 avril.", "Le 21 mai.", "Le 21 juin."], answer: "Le 20 avril." },
    ],
  },
  {
    id: "b2-ce2", label: "Exercice 2", page: 125, pts: 6,
    setup: "Vous lisez cette affiche à l'entrée d'une zone commerciale.",
    setupVi: "Bạn đọc tấm áp phích ở lối vào khu thương mại.",
    doc: img("b2ce-ex2-doc", "Nouveau magasin : plantes et fleurs"),
    questions: [
      { q: "Qu'est-ce que vous trouvez devant le magasin ?", pts: 1,
        options: ["Les petites plantes.", "Les grandes plantes.", "Des plantes et des fleurs."],
        answer: "Les grandes plantes." },
      { q: "Où sont les fleurs ?", pts: 1,
        options: ["Au rez-de-chaussée.", "Au 1er étage.", "Au 2e étage."], answer: "Au 1er étage." },
      { q: "Qu'est-ce que les vendeurs peuvent faire ?", pts: 1,
        options: ["Préparer des bouquets de fleurs.", "Choisir des fleurs pour les clients.",
                  "Donner un bouquet à chaque client."],
        answer: "Préparer des bouquets de fleurs." },
      { q: "Qu'est-ce qu'il y a pendant la première semaine ?", pts: 1,
        options: ["Le magasin donne une rose à chaque client.",
                  "Le magasin donne un bouquet à chaque client.",
                  "Le magasin donne une rose avec chaque plante."],
        answer: "Le magasin donne une rose à chaque client." },
      { q: "Quel est le chemin pour aller au magasin ?", pts: 2,
        kind: "image", src: `${OPT}/b2ce-ex2-q5-ab.webp`, src2: `${OPT}/b2ce-ex2-q5-c.webp`,
        answer: "B" },
    ],
  },
  {
    id: "b2-ce3", label: "Exercice 3", page: 126, pts: 6,
    setup: "Vous travaillez en France. Vous lisez ces annonces à l'entrée de votre entreprise.",
    setupVi: "Bạn làm việc ở Pháp và đọc các thông báo ở lối vào công ty.",
    doc: img("b2ce-ex3-doc", "Cinq annonces"),
    questions: [
      { q: "En novembre, on vous propose de travailler…", pts: 1,
        options: ["l'anglais.", "les messages.", "l'informatique."], answer: "l'informatique." },
      { q: "À quelle heure est la fête jeudi ?", pts: 1.5,
        options: ["9 h.", "10 h.", "10 h 30."], answer: "10 h 30." },
      { q: "Qui est le professeur d'anglais ?", pts: 1,
        options: ["Julien.", "Samia.", "Sophie."], answer: "Samia." },
      { q: "Pour visiter un musée, l'entreprise propose une réduction de…", pts: 1.5,
        options: ["10 %.", "12 %.", "15 %."], answer: "10 %." },
      { q: "Au 2e étage, vous pouvez commander…", pts: 1,
        options: ["un cahier.", "un bureau.", "un ordinateur."], answer: "un cahier." },
    ],
  },
  {
    id: "b2-ce4", label: "Exercice 4", page: 127, pts: 7,
    setup: "Vous étudiez en France. Vous lisez ce message sur le site internet de l'université.",
    setupVi: "Bạn học ở Pháp và đọc thông báo trên trang web của trường.",
    doc: img("b2ce-ex4-doc", "Nouvelle salle informatique"),
    questions: [
      { q: "Qui est présent mercredi dans la salle ?", pts: 1,
        options: ["Le président de l'université.", "Les professeurs de l'université.",
                  "Tous les étudiants de l'université."],
        answer: "Le président de l'université." },
      { q: "Avec les ordinateurs, qu'est-ce qu'on peut travailler ?", pts: 1.5,
        options: ["La production orale.", "La compréhension orale.", "La compréhension écrite."],
        answer: "La compréhension orale." },
      { q: "Quand est-ce que le responsable est présent ?", pts: 1,
        options: ["Du lundi au jeudi.", "Du lundi au vendredi.", "Du lundi au samedi."],
        answer: "Du lundi au jeudi." },
      { q: "Dans la salle, il est interdit de…", pts: 1.5,
        options: ["manger et boire.", "faire ses devoirs.", "parler à voix haute."],
        answer: "manger et boire." },
      { q: "Qu'est-ce que vous pouvez avoir pour les cours ?", pts: 2,
        kind: "image", src: `${OPT}/b2ce-ex4-q5.webp`, answer: "C" },
    ],
  },
];
