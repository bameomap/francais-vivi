// Compréhension de l'oral — the SE PRÉPARER drills whose answer is a drawing,
// « Le DELF A1 100 % réussite » p.13–27.
//
// Nothing here can be read out of the PDF as text: the choices are photographs
// and illustrations, and the only text inside them is the A./B./C. label under
// each. So the grid is cut whole by scripts/delf-a1-crop.py and shown as the
// item's document, and the labels become the questions — the same trick
// delfA1COGrid.js uses for the S'ENTRAÎNER picture exercices.
//
// Every answer is the book's Corrigés (p.144–146). Where the corrigés name a
// picture ("A. 3."), that is the key; where they list the ones to tick
// ("Images B., C., D., G."), each picture becomes an OUI/NON question, which is
// exactly the checkbox the page prints.
//
// One task is reshaped rather than copied: Activité 58 prints two objects per
// message with a OUI/NON pair under each. That is one decision about a pair, so
// it is asked as one question per message ("les deux / seulement celui de
// gauche / …") instead of two half-questions. Same information, same key.

const piste = n => `/api/delf-audio?p=${n}`;
const DOC = "/delf-a1/docs";
const OPT = "/delf-a1/options";

const img = (id, alt) => ({ kind: "image", src: `${DOC}/${id}.webp`, alt });
const img2 = (a, b, alt) => ({ kind: "image", src: `${DOC}/${a}.webp`, src2: `${DOC}/${b}.webp`, alt });

const N4 = ["n° 1", "n° 2", "n° 3", "n° 4"];
const N5 = ["n° 1", "n° 2", "n° 3", "n° 4", "n° 5"];
const N4_OR_NONE = [...N4, "Aucune situation"];
const OUI_NON = ["OUI", "NON"];
const AB = ["A", "B"];

// « cochez les images entendues » — every drawing is its own OUI/NON checkbox,
// so the key is just the list of letters the corrigés tick.
const ticks = (letters, yes, q = "Vous entendez cet objet ?") =>
  letters.map(l => ({ lead: `Image ${l}`, q, options: OUI_NON, answer: yes.includes(l) ? "OUI" : "NON" }));

export const CO_PICTURES = [
  {
    objectif: 1, id: "co-a10", label: "Activité 10", page: 13, piste: 10, audio: piste(10),
    setup: "Écoutez les messages et reliez chaque prénom à l'image correspondante.",
    setupVi: "Nghe 3 tin nhắn rồi cho biết mỗi hình là của ai. Nghe nơi hẹn: piscine, cinéma, théâtre.",
    doc: img("co-a10", "Trois lieux : cinéma, piscine, théâtre"),
    transcript:
      "1. Salut, c'est Pauline. Dimanche, je vais à la piscine. Est-ce que tu veux venir avec moi ?\n" +
      "2. Allô ? Tu m'entends ? C'est Julien. On va au cinéma ce soir ? Dis-moi oui !\n" +
      "3. Bonjour ! C'est moi, Julie. J'ai les billets de théâtre. On se retrouve à l'entrée avec Bastien ?",
    questions: [
      { q: "Image A", options: ["Julien", "Pauline", "Julie"], answer: "Julien" },
      { q: "Image B", options: ["Julien", "Pauline", "Julie"], answer: "Pauline" },
      { q: "Image C", options: ["Julien", "Pauline", "Julie"], answer: "Julie" },
    ],
  },
  {
    objectif: 2, id: "co-a14", label: "Activité 14", page: 14, piste: 14, audio: piste(14),
    setup: "Écoutez les messages et notez le numéro du message sous l'image correspondante.",
    setupVi: "Nghe 4 bản tin thời tiết rồi ghép mỗi bản đồ với số bản tin: pluie / soleil / nuages et orages / neige.",
    doc: img("co-a14", "Quatre cartes météo de la France"),
    transcript:
      "1. Demain, il fait beau ! Soleil sur toute la France avec des températures agréables.\n" +
      "2. Attention ! Demain, dimanche, de la neige dans le nord avec, donc, des températures très basses.\n" +
      "3. Aujourd'hui, n'oubliez pas votre manteau. De la pluie au nord, à l'est, à l'ouest et au centre !\n" +
      "4. Attention ! Beaucoup de nuages dans le nord de la France et des orages importants dans le sud.",
    questions: [
      { q: "Image A", options: N4, answer: "n° 3" },
      { q: "Image B", options: N4, answer: "n° 1" },
      { q: "Image C", options: N4, answer: "n° 4" },
      { q: "Image D", options: N4, answer: "n° 2" },
    ],
  },
  {
    objectif: 3, id: "co-a30", label: "Activité 30", page: 18, piste: 30, audio: piste(30),
    setup: "Écoutez les messages et notez les numéros sous les horloges correspondantes.",
    setupVi: "Nghe giờ rồi ghép với mặt đồng hồ. Đồng hồ kim chỉ giờ 24 tiếng: 14 h 20 hiện là 2 h 20.",
    doc: img("co-a30", "Cinq horloges"),
    transcript:
      "1. Le rendez-vous de mercredi est à 11 h 30.\n2. Le déjeuner avec le directeur est à 12 h 00.\n" +
      "3. Votre rendez-vous avec le médecin est à 10 h 15.\n4. Votre entretien commence à 9 h 45.\n" +
      "5. Le dentiste confirme votre rendez-vous de mercredi à 14 h 20.",
    questions: [
      { q: "Horloge A", options: N5, answer: "n° 3" },
      { q: "Horloge B", options: N5, answer: "n° 5" },
      { q: "Horloge C", options: N5, answer: "n° 2" },
      { q: "Horloge D", options: N5, answer: "n° 1" },
      { q: "Horloge E", options: N5, answer: "n° 4" },
    ],
  },
  {
    objectif: 3, id: "co-a32", label: "Activité 32", page: 18, piste: 32, audio: piste(32),
    setup: "Écoutez le message et cochez les bonnes réponses. Où est-ce que vous allez pour acheter les produits ?",
    setupVi: "Nghe rồi chọn OUI cho những nơi bạn phải đến. Justine cũng nói cô ấy đi đâu — chỗ đó không phải việc của bạn.",
    doc: img2("co-a32-abc", "co-a32-def", "Six commerces"),
    transcript:
      "Allô ? C'est Justine. Ce midi, c'est le déjeuner pour fêter les 10 ans de l'entreprise. Pour le repas " +
      "avec les collègues, est-ce que tu peux acheter le pain ? Et va chercher la viande s'il te plaît. Moi, " +
      "je vais au supermarché pour les boissons. Prends le journal pour notre directeur, il y a un article " +
      "sur notre anniversaire. Merci.",
    questions: ticks(["A", "B", "C", "D", "E", "F"], ["A", "B", "C"], "Vous allez dans ce magasin ?"),
  },
  {
    objectif: 3, id: "co-a33", label: "Activité 33", page: 19, piste: 33, audio: piste(33),
    setup: "Écoutez le message et cochez le plan avec le bon itinéraire.",
    setupVi: "Nghe chỉ đường rồi chọn bản đồ đúng. Theo từng bước một: boulevard Saint-Michel → rẽ phải rue du Tournesol → đi thẳng → rẽ ở phố có trường học → thấy rạp chiếu phim thì rẽ trái.",
    doc: img2("co-a33-ab", "co-a33-c", "Trois plans du quartier"),
    transcript:
      "Bonjour, c'est Mme Lee. Je vous téléphone pour vous dire comment venir dans nos bureaux. C'est très " +
      "facile à partir de la place de la République où vous travaillez. Prenez le boulevard Saint-Michel. " +
      "Ensuite, tournez à droite, rue du Tournesol et continuez tout droit. Tournez dans la rue avec l'école. " +
      "Je ne sais plus le nom de cette rue. Quand vous voyez un cinéma, tournez à gauche. Nos bureaux sont " +
      "face à la pharmacie. À tout à l'heure.",
    questions: [
      { q: "Quel plan montre le bon itinéraire ?", options: ["A", "B", "C"], answer: "A" },
    ],
  },
  {
    objectif: 4, id: "co-a39", label: "Activité 39", page: 21, piste: 39, audio: piste(39),
    setup: "Écoutez les descriptions et notez le numéro sous l'image correspondante.",
    setupVi: "Nghe mô tả rồi ghép với hình. Hai chi tiết phân biệt: cao hay thấp, tóc vàng hay tóc nâu.",
    doc: img("co-a39", "Quatre hommes"),
    transcript:
      "1. Tom, c'est le professeur de mathématiques. Il a 40 ans. Il est grand et il est blond.\n" +
      "2. Louis a 23 ans. C'est le secrétaire de la directrice. Il est petit et il est blond.\n" +
      "3. Arthur a 27 ans. C'est le professeur d'anglais. Il est grand et il a les cheveux bruns.\n" +
      "4. Alain est le professeur d'histoire. Il a 45 ans. Il est petit et il a les cheveux bruns.",
    questions: [
      { q: "Image A", options: N4, answer: "n° 2" },
      { q: "Image B", options: N4, answer: "n° 3" },
      { q: "Image C", options: N4, answer: "n° 4" },
      { q: "Image D", options: N4, answer: "n° 1" },
    ],
  },
  {
    objectif: 4, id: "co-a40", label: "Activité 40", page: 21, piste: 40, audio: piste(40),
    setup: "Écoutez les descriptions et indiquez le prénom des personnes.",
    setupVi: "Nghe rồi gọi tên từng người trên hai bức ảnh. Chú ý vị trí (assis, debout à gauche/à droite) và tóc (blonde, cheveux bruns, courts, longs).",
    doc: img("co-a40", "Photo n° 1 et photo n° 2"),
    transcript:
      "1. Regarde, c'est une photo de l'équipe de l'école. Il y a Monsieur André, le directeur. C'est l'homme " +
      "assis. Il a 60 ans donc ses cheveux sont gris. L'homme debout à gauche est le professeur de français. " +
      "Il s'appelle Arnaud. Il a 46 ans. L'autre homme, à droite, le très grand, c'est Philippe, le professeur " +
      "de géographie. Et les 2 femmes, ce sont aussi des professeures. La blonde s'appelle Monique, c'est la " +
      "professeure d'histoire. Béatrice, la femme aux cheveux bruns, est la professeure d'anglais.\n" +
      "2. Sur cette photo, il y a le secrétaire de l'école, Jean-Luc. C'est l'homme petit avec une moustache. " +
      "Il y a aussi Jacques, le responsable de la bibliothèque. Lui, il est grand. Il a une moustache aussi. " +
      "Ils sont sur la photo avec 3 professeures : Mathilde, Sonia et Clara. La femme blonde aux cheveux " +
      "courts, c'est Clara. Sonia, c'est la femme blonde avec les cheveux très longs. Et l'autre, c'est Mathilde.",
    questions: [
      ...["Arnaud", "André", "Philippe", "Béatrice", "Monique"].map((name, i) => ({
        lead: "Photo n° 1", q: `Personne n° ${i + 1}`,
        options: ["Arnaud", "André", "Philippe", "Béatrice", "Monique"], answer: name,
      })),
      ...["Jean-Luc", "Jacques", "Sonia", "Clara", "Mathilde"].map((name, i) => ({
        lead: "Photo n° 2", q: `Personne n° ${i + 1}`,
        options: ["Jean-Luc", "Jacques", "Sonia", "Clara", "Mathilde"], answer: name,
      })),
    ],
  },
  {
    objectif: 4, id: "co-a42", label: "Activité 42", page: 21, piste: 42, audio: piste(42),
    setup: "Écoutez la description et indiquez le prénom des personnes. Chantal vous montre une photo des professeurs.",
    setupVi: "Nghe rồi gọi tên 7 người. Chantal là người kể — cô ấy tự nhận ra mình ở cuối bằng chi tiết « avec mes lunettes ». Nghe kỹ quần áo và màu sắc.",
    doc: img("co-a42", "Sept professeurs"),
    transcript:
      "Regarde, c'est une photo des professeurs de l'école. Il y a Alexandre, le professeur d'espagnol. C'est " +
      "l'homme avec un jean et un pull rouge. L'homme aux lunettes et au tee-shirt bleu, c'est Alexis, le " +
      "professeur d'anglais. Et le jeune homme au tee-shirt jaune, ce n'est pas un professeur mais le " +
      "bibliothécaire. C'est Julien. La femme avec le sac à main, c'est Isabelle, la professeure d'histoire. " +
      "La femme avec la jupe rose et le chapeau, c'est Lucie, la professeure de musique. Et il y a Marie, la " +
      "professeure d'informatique. Sur la photo, elle a une jupe blanche, une veste rose et un chapeau à la " +
      "main. Moi, je suis sur la photo. Tu me vois, avec mes lunettes ?",
    questions: ["Isabelle", "Marie", "Julien", "Alexandre", "Alexis", "Lucie", "Chantal"].map((name, i) => ({
      q: `Personne n° ${i + 1}`,
      options: ["Alexandre", "Alexis", "Julien", "Isabelle", "Lucie", "Marie", "Chantal"],
      answer: name,
    })),
  },
  {
    objectif: 4, id: "co-a47", label: "Activité 47", page: 23, piste: 47, audio: piste(47),
    setup: "Écrivez le numéro du dialogue sous l'image qui correspond. Attention, il y a quatre dialogues et six images.",
    setupVi: "4 hội thoại nhưng 6 hình — hai hình không khớp với hội thoại nào. Đừng ép cho đủ.",
    doc: img2("co-a47-abc", "co-a47-def", "Six situations, A–F"),
    transcript:
      "1. – Ils sortent à quelle heure les élèves ?\n– À 16 h 30. Regarde, les voilà !\n" +
      "2. – C'est à quelle heure le cours de dessin ?\n– À 14 h 30.\n– Mais il est 14 h 30. Vite !\n" +
      "3. – Super ! Il y a du poulet aujourd'hui à la cantine !\n– Et il y a des frites aussi ! J'adore le poulet avec des frites !\n" +
      "4. – Papa, est-ce que tu peux m'aider à faire mes devoirs ?\n– Maintenant ? Mais c'est le petit déjeuner ! C'est pour quand tes devoirs ?\n– Pour le cours d'histoire de tout à l'heure !\n– Quoi ? Mais il est trop tard !",
    questions: [
      { q: "Image A", options: N4_OR_NONE, answer: "n° 2" },
      { q: "Image B", options: N4_OR_NONE, answer: "n° 4" },
      { q: "Image C", options: N4_OR_NONE, answer: "Aucune situation" },
      { q: "Image D", options: N4_OR_NONE, answer: "n° 3" },
      { q: "Image E", options: N4_OR_NONE, answer: "n° 1" },
      { q: "Image F", options: N4_OR_NONE, answer: "Aucune situation" },
    ],
  },
  {
    objectif: 4, id: "co-a48", label: "Activité 48", page: 23, piste: 48, audio: piste(48),
    setup: "Écrivez le numéro du dialogue sous l'image qui correspond. Attention, il y a quatre dialogues et six images.",
    setupVi: "Cũng 4 hội thoại, 6 hình. Nghe xem chuyện xảy ra ở đâu: hành lang, thư viện, phòng ghi danh, lớp học.",
    doc: img2("co-a48-abc", "co-a48-def", "Six situations, A–F"),
    transcript:
      "1. – Excusez-moi, où est la salle 12 ?\n– La salle 12 est au premier étage. Prenez les escaliers !\n" +
      "2. – Est-ce que vous avez des documents en anglais ?\n– Bien sûr ! Qu'est-ce que vous cherchez ?\n– Je cherche des livres et des journaux.\n" +
      "3. – Bonjour. Je viens inscrire ma fille au cours de musique.\n– Bonjour. Bienvenue. D'accord. C'est pour quel instrument ?\n– La guitare. Quand commencent les cours ?\n– La semaine prochaine.\n" +
      "4. – Monsieur, où est la ville de Lyon ?\n– Lyon ? C'est ici !\n– Au sud de Paris ?\n– Oui, c'est ça.",
    questions: [
      { q: "Image A", options: N4_OR_NONE, answer: "Aucune situation" },
      { q: "Image B", options: N4_OR_NONE, answer: "n° 1" },
      { q: "Image C", options: N4_OR_NONE, answer: "n° 3" },
      { q: "Image D", options: N4_OR_NONE, answer: "Aucune situation" },
      { q: "Image E", options: N4_OR_NONE, answer: "n° 4" },
      { q: "Image F", options: N4_OR_NONE, answer: "n° 2" },
    ],
  },
  {
    objectif: 5, id: "co-a49", label: "Activité 49", page: 24, piste: 49, audio: piste(49),
    setup: "Écoutez les dialogues et cochez les bonnes réponses.",
    setupVi: "Nghe mô tả một đồ vật rồi chọn hình. Mỗi mô tả cho nhiều manh mối: nơi để, màu sắc, công dụng.",
    transcript:
      "1. C'est un moyen de transport. Il est blanc. Je prends ce moyen de transport pour aller faire les courses. Toute la famille vient avec moi.\n" +
      "2. L'objet est dans la salle de bains. C'est utile le matin et le soir. C'est pour laver mes dents.\n" +
      "3. L'objet est de couleur noire. Je prends cet objet pour sortir dans la rue. Je mets l'objet sur ma tête.",
    questions: [
      { lead: "Message n° 1", q: "Quel est l'objet ?", kind: "image", src: `${OPT}/co-a49-q1.webp`, options: AB, answer: "B" },
      { lead: "Message n° 2", q: "Quel est l'objet ?", kind: "image", src: `${OPT}/co-a49-q2.webp`, options: AB, answer: "A" },
      { lead: "Message n° 3", q: "Quel est l'objet ?", kind: "image", src: `${OPT}/co-a49-q3.webp`, options: AB, answer: "B" },
    ],
  },
  {
    objectif: 5, id: "co-a50", label: "Activité 50", page: 24, piste: 50, audio: piste(50),
    setup: "Écoutez les noms d'objets et reliez au bon numéro.",
    setupVi: "Nghe tên 5 đồ vật theo thứ tự 1→5 rồi ghép mỗi hình với số của nó.",
    doc: img("co-a50", "Cinq objets, A–E"),
    transcript: "1. Un passeport.\n2. Une lettre.\n3. Un diplôme.\n4. Une valise.\n5. Un sac.",
    questions: [
      { q: "Image A", options: N5, answer: "n° 3" },
      { q: "Image B", options: N5, answer: "n° 2" },
      { q: "Image C", options: N5, answer: "n° 5" },
      { q: "Image D", options: N5, answer: "n° 1" },
      { q: "Image E", options: N5, answer: "n° 4" },
    ],
  },
  {
    objectif: 5, id: "co-a51", label: "Activité 51", page: 24, piste: 51, audio: piste(51),
    setup: "Reliez chaque objet à son nom. Écoutez l'audio pour vérifier vos réponses.",
    setupVi: "Bài này làm trước rồi mới nghe để kiểm tra. Phân biệt số ít / số nhiều: une pomme (một quả) khác des fruits (nhiều loại).",
    doc: img("co-a51", "Cinq aliments, A–E"),
    transcript:
      "Image A, n° 3 : des fruits\nImage B, n° 1 : un jus de fruits\nImage C, n° 5 : une pomme\n" +
      "Image D, n° 2 : des légumes\nImage E, n° 4 : une tomate",
    questions: [
      { q: "Image A", options: ["Un jus de fruits", "Des légumes", "Des fruits", "Une tomate", "Une pomme"], answer: "Des fruits" },
      { q: "Image B", options: ["Un jus de fruits", "Des légumes", "Des fruits", "Une tomate", "Une pomme"], answer: "Un jus de fruits" },
      { q: "Image C", options: ["Un jus de fruits", "Des légumes", "Des fruits", "Une tomate", "Une pomme"], answer: "Une pomme" },
      { q: "Image D", options: ["Un jus de fruits", "Des légumes", "Des fruits", "Une tomate", "Une pomme"], answer: "Des légumes" },
      { q: "Image E", options: ["Un jus de fruits", "Des légumes", "Des fruits", "Une tomate", "Une pomme"], answer: "Une tomate" },
    ],
  },
  {
    objectif: 5, id: "co-a52", label: "Activité 52", page: 25, piste: 52, audio: piste(52),
    setup: "Écoutez les noms des 6 objets et cochez leur numéro dans le lieu correspondant.",
    setupVi: "Nghe tên 6 đồ vật theo thứ tự rồi xếp mỗi đồ vào đúng nơi. Đồ vật không có hình — chỉ nghe.",
    doc: img("co-a52", "Le restaurant, la chambre, la salle de bains"),
    transcript:
      "Objet n° 1 : un savon\nObjet n° 2 : un menu\nObjet n° 3 : une chemise\n" +
      "Objet n° 4 : du papier toilettes\nObjet n° 5 : une addition\nObjet n° 6 : une jupe",
    questions: [1, 2, 3, 4, 5, 6].map(n => ({
      q: `Objet n° ${n}`,
      options: ["Le restaurant", "La chambre", "La salle de bains"],
      answer: { 1: "La salle de bains", 2: "Le restaurant", 3: "La chambre",
                4: "La salle de bains", 5: "Le restaurant", 6: "La chambre" }[n],
    })),
  },
  {
    objectif: 5, id: "co-a53", label: "Activité 53", page: 25, piste: 53, audio: piste(53),
    setup: "Écoutez les noms d'objets et cochez les objets entendus.",
    setupVi: "Chỉ chọn OUI khi nghe đúng tên đồ vật trong hình. Sách gài bẫy: nghe « un ticket de bus » nhưng hình là chiếc xe buýt; nghe « une fourchette » nhưng hình là cái thìa.",
    doc: img("co-a53", "Huit objets, A–H"),
    transcript:
      "Une télévision. Une table. Un ticket de bus. Un couteau. Une fourchette. " +
      "Une bouteille d'eau. Un crayon. Une feuille.",
    questions: ticks(["A", "B", "C", "D", "E", "F", "G", "H"], ["A", "C", "G"]),
  },
  {
    objectif: 5, id: "co-a54", label: "Activité 54", page: 25, piste: 54, audio: piste(54),
    setup: "Écoutez les messages et cochez les bonnes réponses.",
    setupVi: "Mỗi tin nhắn nhắc tới hai đồ vật — chỉ một cái trả lời đúng câu hỏi được hỏi.",
    transcript:
      "1. En voyage, je prends toujours mon ordinateur portable. Je dois souvent regarder mes messages électroniques pour le travail. C'est la vie !\n" +
      "2. J'adore mon lit. Et tu sais, il y a toujours un livre à côté de mon lit. Tous les soirs, je dois lire pour l'université.\n" +
      "3. Pour mon travail, je dois avoir un permis de conduire. Je prends ma voiture et je paye l'essence. Après, mon entreprise me donne de l'argent pour l'essence.",
    questions: [
      { lead: "Message n° 1", q: "Qu'est-ce que Manuela prend toujours en voyage ?",
        kind: "image", src: `${OPT}/co-a54-q1.webp`, options: AB, answer: "B" },
      { lead: "Message n° 2", q: "Qu'est-ce que Manuela adore ?",
        kind: "image", src: `${OPT}/co-a54-q2.webp`, options: AB, answer: "B" },
      { lead: "Message n° 3", q: "Qu'est-ce que Manuela doit avoir pour son travail ?",
        kind: "image", src: `${OPT}/co-a54-q3.webp`, options: AB, answer: "A" },
    ],
  },
  {
    objectif: 5, id: "co-a55", label: "Activité 55", page: 26, piste: 55, audio: piste(55),
    setup: "Écoutez le message et classez dans l'ordre (de 1 à 5) les objets que vous entendez.",
    setupVi: "Nghe rồi đánh số theo thứ tự được nhắc tới trong tin nhắn — không phải theo thứ tự hình.",
    doc: img("co-a55", "Cinq objets, A–E"),
    transcript:
      "Je suis dans une librairie. Je prends des cartes postales et des timbres. J'achète un stylo bleu. " +
      "Ah, et je prends des enveloppes. Et il y a une tasse souvenir de la ville, super.",
    questions: [
      { q: "Image A", options: N5, answer: "n° 5" },
      { q: "Image B", options: N5, answer: "n° 3" },
      { q: "Image C", options: N5, answer: "n° 1" },
      { q: "Image D", options: N5, answer: "n° 2" },
      { q: "Image E", options: N5, answer: "n° 4" },
    ],
  },
  {
    objectif: 5, id: "co-a56", label: "Activité 56", page: 26, piste: 56, audio: piste(56),
    setup: "Écoutez le message et cochez les objets présents sur le bureau de Salim.",
    setupVi: "Nghe rồi chọn OUI cho những đồ vật có trên bàn. Hình vẽ 8 đồ nhưng tin nhắn chỉ nhắc 5.",
    doc: img("co-a56", "Le bureau de Salim et huit objets"),
    transcript:
      "Sur mon bureau, il y a mes lunettes. À côté, il y a des papiers. J'ai aussi une bouteille d'eau et " +
      "un verre. Et bien sûr, il y a mon téléphone.",
    questions: ticks(["A", "B", "C", "D", "E", "F", "G", "H"], ["B", "C", "D", "G"],
                     "Cet objet est sur le bureau ?"),
  },
  {
    objectif: 5, id: "co-a57", label: "Activité 57", page: 26, piste: 57, audio: piste(57),
    setup: "Écoutez et cochez les plats du déjeuner de Frida et du déjeuner de Richard.",
    setupVi: "Hai người, hai thực đơn. Chú ý: hai bảng hình xếp khác nhau — cùng một món có thể mang chữ cái khác ở bảng dưới.",
    doc: img2("co-a57-frida", "co-a57-richard", "Les plats de Frida et de Richard"),
    transcript:
      "– Pour mon déjeuner, je voudrais du poulet avec des pâtes. Pour le dessert, c'est de la glace.\n" +
      "– Moi, pour le plat, je voudrais du poisson et du riz. Pour le dessert, je préfère des fruits.",
    questions: [
      ...ticks(["A", "B", "C", "D", "E", "F"], ["A", "C", "E"], "Frida prend ce plat ?"),
      ...ticks(["A", "B", "C", "D", "E", "F"], ["B", "D", "F"], "Richard prend ce plat ?"),
    ],
  },
  {
    objectif: 5, id: "co-a58", label: "Activité 58", page: 27, piste: 58, audio: piste(58),
    setup: "Écoutez les messages. Vous entendez le nom de l'objet ? Cochez « oui » ou « non ».",
    setupVi: "Với mỗi tin nhắn, xét cả hai đồ vật: có thể cả hai đều được nhắc, chỉ một, hoặc không cái nào.",
    transcript:
      "1. Pour mon travail, j'ai des chaussures noires. J'ai aussi des gants blancs. Après, je mets une chemise noire et un pantalon noir.\n" +
      "2. Bonjour ! Pour payer votre carte postale, c'est avec des espèces s'il vous plaît. Vous avez des pièces ou des billets ? Merci.\n" +
      "3. Mon entreprise est à 30 kilomètres. Je prends le train tous les jours. Je n'ai pas de voiture. Parfois, je viens avec un collègue.",
    questions: [
      { lead: "Message n° 1", q: "Quels objets est-ce que vous entendez ?",
        kind: "image", src: `${OPT}/co-a58-1.webp`,
        options: ["Les deux", "Seulement celui de gauche", "Seulement celui de droite", "Aucun des deux"],
        answer: "Les deux" },
      { lead: "Message n° 2", q: "Quels objets est-ce que vous entendez ?",
        kind: "image", src: `${OPT}/co-a58-2.webp`,
        options: ["Les deux", "Seulement celui de gauche", "Seulement celui de droite", "Aucun des deux"],
        answer: "Seulement celui de gauche" },
      { lead: "Message n° 3", q: "Quels objets est-ce que vous entendez ?",
        kind: "image", src: `${OPT}/co-a58-3.webp`,
        options: ["Les deux", "Seulement celui de gauche", "Seulement celui de droite", "Aucun des deux"],
        answer: "Seulement celui de droite" },
    ],
  },
];
