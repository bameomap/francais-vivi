export const editoA1ReadingComprehension = [
  {
    id: "u0-cahier-salutations",
    unit: 0,
    unitTitle: "Bienvenue !",
    source: "cahier",
    section: "compréhension écrite",
    page: 3,
    title: "Bonjour, ça va ?",
    instruction: "Associez les dialogues et les images, puis complétez les dialogues avec les éléments proposés.",
    text: `Dialogues :\n1. – Bonjour Madame ! – Bonjour Yannick, ça va ?\n2. – Bonjour monsieur Bertoni ! – Bonjour madame Hurip ! Vous allez bien ?\n3. – Au revoir les enfants ! – Au revoir Madame !\n4. – Salut, ça va ? – Oui et toi ?\n\nÉléments proposés : À bientôt – Merci – Bonjour – Salut – Au revoir`,
    questions: [
      { id: "u0-q1", type: "matching", prompt: "Associez les dialogues et les images." },
      { id: "u0-q2a", type: "short_answer", prompt: "– … Stéphanie ! Ça va ? – Oui, ça va bien, et toi ?", answer: "Salut" },
      { id: "u0-q2b", type: "short_answer", prompt: "– …, monsieur Bens. Vous allez bien ? – Très bien, merci !", answer: "Bonjour" },
      { id: "u0-q2c", type: "short_answer", prompt: "– Bonne journée, Mano ! – … maman !", answer: "Merci" },
      { id: "u0-q2d", type: "short_answer", prompt: "– …, monsieur ! – À demain, Coco !", answer: "Au revoir" },
      { id: "u0-q2e", type: "short_answer", prompt: "– Au revoir, les enfants ! – … !", answer: "À bientôt" }
    ]
  },
  {
    id: "u1-livre-langues-en-duo",
    unit: 1,
    unitTitle: "Je suis…",
    source: "livre",
    section: "compréhension écrite",
    page: 20,
    title: "Langues en duo",
    instruction: "Lisez l'échange entre Sanae et Vincent et répondez aux questions.",
    text: `Salut Vincent, je m'appelle Sanae. Je suis japonaise. Tu es français ?\n\nNon, je suis suisse et j'ai 25 ans. Et toi ?\n\nMoi, j'ai 23 ans.\n\nEt tu aimes la musique ?\n\nOui, j'aime la musique, le cinéma et le sport ! Et toi ?\n\nMoi, j'aime l'art et les langues !`,
    questions: [
      { id: "u1-livre-q1", type: "true_false", prompt: "Vrai ou faux ? Sanae et Vincent se présentent sur Duo.", answer: true },
      { id: "u1-livre-q2", type: "short_answer", prompt: "Sanae est japonaise. Et Vincent ?", answer: "Il est suisse." },
      { id: "u1-livre-q3", type: "short_answer", prompt: "Vincent a 25 ans. Et Sanae ?", answer: "Elle a 23 ans." },
      { id: "u1-livre-q4", type: "multi_select", prompt: "Retrouvez les loisirs de Sanae.", options: ["la musique", "l'art", "les langues", "le sport", "le cinéma"], answer: ["l'art", "les langues"] }
    ]
  },
  {
    id: "u1-cahier-festival-bd",
    unit: 1,
    unitTitle: "Je suis…",
    source: "cahier",
    section: "production écrite avec support",
    page: 13,
    title: "Fiche auteur — Thomas Puissat",
    instruction: "Vous participez à un festival de BD dans votre ville. Vous lisez la fiche d'auteur et vous présentez Thomas Puissat sur le site du festival.",
    text: `LE FESTIVAL BD — L'AUTEUR\nPuissat, Thomas\nNom : Puissat\nPrénom : Thomas\nLieu de naissance : Anvers\nPays de naissance : Belgique\nÂge : 36 ans\nLieu actuel : Marseille\nLoisirs : la musique, le cinéma\nLangues : français, italien, japonais`,
    questions: [
      { id: "u1-cahier-q1", type: "short_answer", prompt: "Quel est le prénom de l'auteur ?", answer: "Thomas" },
      { id: "u1-cahier-q2", type: "short_answer", prompt: "Quel est son nom ?", answer: "Puissat" },
      { id: "u1-cahier-q3", type: "short_answer", prompt: "Où est-il né ?", answer: "À Anvers, en Belgique." },
      { id: "u1-cahier-q4", type: "short_answer", prompt: "Quel âge a-t-il ?", answer: "Il a 36 ans." },
      { id: "u1-cahier-q5", type: "short_answer", prompt: "Où habite-t-il maintenant ?", answer: "À Marseille." },
      { id: "u1-cahier-q6", type: "multi_select", prompt: "Quels sont ses loisirs ?", options: ["la musique", "le cinéma", "le sport", "l'art"], answer: ["la musique", "le cinéma"] },
      { id: "u1-cahier-q7", type: "multi_select", prompt: "Quelles langues parle-t-il ?", options: ["français", "italien", "japonais", "anglais"], answer: ["français", "italien", "japonais"] }
    ]
  },
  {
    id: "u1-delf-francofolies",
    unit: 1,
    unitTitle: "Je suis…",
    source: "cahier",
    section: "DELF compréhension écrite",
    page: 16,
    title: "Festival de musique — Francofolies",
    instruction: "Vous êtes en France. Vous lisez cette affiche dans la rue. Répondez aux questions.",
    text: `FESTIVAL DE MUSIQUE — FRANCOFOLIES\nMercredi 14 juillet. Concert de Jane Birkin à La Rochelle. Jane Birkin est une musicienne anglaise. Elle est née le 14 décembre 1946 à Londres. Elle habite en France depuis 1960. Jane Birkin parle français et italien. Programme : 19 h présentation de l'artiste ; 20 h concert. Prix du billet : 25 euros sur le site de billetterie.`,
    questions: [
      { id: "u1-delf-q1", type: "multiple_choice", prompt: "L'affiche est pour quel événement ?", options: ["Un festival de musique", "Une exposition", "Un cours de français"], answer: "Un festival de musique" },
      { id: "u1-delf-q2", type: "multiple_choice", prompt: "Quelle est la nationalité de l'artiste ?", options: ["Anglaise", "Italienne", "Française"], answer: "Anglaise" },
      { id: "u1-delf-q3", type: "multiple_choice", prompt: "Quelle est la date de naissance de l'artiste ?", options: ["14 juillet", "25 septembre", "14 décembre"], answer: "14 décembre" },
      { id: "u1-delf-q4", type: "multiple_choice", prompt: "À quelle heure commence l'événement ?", options: ["À 19 h", "À 20 h", "À 21 h"], answer: "À 19 h" },
      { id: "u1-delf-q5", type: "multiple_choice", prompt: "Comment pouvez-vous avoir un billet ?", options: ["Au festival", "Sur Internet", "Au téléphone"], answer: "Sur Internet" }
    ]
  },
  {
    id: "u2-cahier-comment-tu-vas",
    unit: 2,
    unitTitle: "Près de moi",
    source: "cahier",
    section: "compréhension écrite",
    page: 25,
    title: "Comment tu vas ?",
    instruction: "Lisez le mail de Fiona et répondez aux questions.",
    text: `Salut Mimi,\nComment tu vas ?\nMoi, ça va très bien ! J'ai un petit ami maintenant, il s'appelle Marius. Il est très sympa. Il travaille avec mon frère, ils sont professeurs à l'université. La famille de Marius est super aussi, son père est fleuriste et sa mère est informaticienne. Marius est fils unique mais il a beaucoup de cousins.\nMarius et moi, nous habitons ensemble dans un appartement, dans un quartier sympa. C'est le quartier de Barriol, il est très calme.\nOn aime beaucoup la danse ! Nous dansons le rock ! Et on adore la musique. Nous avons un piano maintenant !\nEt toi, et ton mari ? Vous habitez dans quel quartier maintenant ? Et tes parents, ta sœur, ça va ?\nBisous,\nFiona`,
    questions: [
      { id: "u2-q1a", type: "multiple_choice", prompt: "Marius est…", options: ["le mari de Fiona", "le petit ami de Fiona"], answer: "le petit ami de Fiona" },
      { id: "u2-q1b", type: "multiple_choice", prompt: "Marius est…", options: ["professeur", "fleuriste"], answer: "professeur" },
      { id: "u2-q1c", type: "multiple_choice", prompt: "Marius…", options: ["a des frères et sœurs", "n'a pas de frères et sœurs"], answer: "n'a pas de frères et sœurs" },
      { id: "u2-q2", type: "true_false", prompt: "Les parents de Marius travaillent.", answer: true },
      { id: "u2-q3", type: "true_false", prompt: "Fiona et Marius habitent dans un appartement.", answer: true },
      { id: "u2-q4", type: "true_false", prompt: "Fiona n'aime pas son quartier.", answer: false },
      { id: "u2-q5", type: "short_answer", prompt: "Quels sont les deux loisirs de Fiona et Marius ?", answer: "La danse et la musique." },
      { id: "u2-q6", type: "short_answer", prompt: "Quel instrument de musique ont-ils ?", answer: "Ils ont un piano." }
    ]
  },
  {
    id: "u2-delf-blanche",
    unit: 2,
    unitTitle: "Près de moi",
    source: "cahier",
    section: "DELF compréhension écrite",
    page: 28,
    title: "Week-end à la montagne",
    instruction: "Vous habitez en France. Vous recevez ce message de votre amie Blanche. Lisez le document et répondez aux questions.",
    text: `Salut,\nCe week-end, je vais chez ma sœur, à la montagne. Je t'invite. Elle habite dans un grand appartement. Elle est infirmière à l'hôpital et son mari est professeur de ski. Tu aimes skier ? Moi, j'adore ! C'est plus sympa que la plage, je déteste nager.\nJe t'attends vendredi à 10 h, devant l'université. Il y a 5 heures entre Paris et Grenoble. Nous arrivons l'après-midi, à 15 h.\nBisous,\nBlanche`,
    questions: [
      { id: "u2-delf-q1", type: "multiple_choice", prompt: "Où va Blanche ce week-end ?", options: ["À la campagne", "À la mer", "À la montagne"], answer: "À la montagne" },
      { id: "u2-delf-q2", type: "multiple_choice", prompt: "Quelle est la profession de la sœur de Blanche ?", options: ["Infirmière", "Professeure", "Informaticienne"], answer: "Infirmière" },
      { id: "u2-delf-q3", type: "multiple_choice", prompt: "Blanche adore…", options: ["skier", "nager", "marcher"], answer: "skier" },
      { id: "u2-delf-q4", type: "multiple_choice", prompt: "Vous partez avec Blanche à quelle heure ?", options: ["À 5 h", "À 10 h", "À 15 h"], answer: "À 10 h" },
      { id: "u2-delf-q5", type: "multiple_choice", prompt: "Où est le rendez-vous ?", options: ["À la gare", "À l'hôpital", "À l'université"], answer: "À l'université" }
    ]
  },
  {
    id: "u3-delf-annonces-canada",
    unit: 3,
    unitTitle: "Qu'est-ce qu'on mange ?",
    source: "cahier",
    section: "DELF compréhension écrite",
    page: 40,
    title: "Annonces au bureau",
    instruction: "Vous travaillez au Canada. Vous lisez ces annonces sur le panneau d'affichage de votre entreprise. Répondez aux questions.",
    text: `À LA CARTE\nPlats végans. Ouvert pendant les pauses-déjeuner, du lundi au vendredi.\n\nATELIERS CUISINE\nApprenez à cuisiner avec vos collègues ! Le week-end, de 14 h à 18 h.\n\nCANTINE FRANCOPHONE\nLundi et jeudi à partir de 15 h : découverte de desserts francophones.\n\nBOULANGERIE FRANÇAISE\nMangez pains au chocolat et croissants ! Ouverte l'après-midi, entre 13 h 30 et 19 h 30.\n\nMARCHÉ AU BUREAU\nTous les premiers lundis du mois. Légumes et fruits du jardin. Renseignements : marcheaubureau@gmail.com`,
    questions: [
      { id: "u3-delf-q1", type: "multiple_choice", prompt: "Que pouvez-vous faire le week-end ?", options: ["Travailler au restaurant", "Cuisiner en groupe", "Découvrir la cuisine végane"], answer: "Cuisiner en groupe" },
      { id: "u3-delf-q2", type: "multiple_choice", prompt: "À quelle heure ferme la boulangerie ?", options: ["À 13 h", "À 19 h 30", "À 20 h"], answer: "À 19 h 30" },
      { id: "u3-delf-q3", type: "multiple_choice", prompt: "Vous pouvez manger végan…", options: ["Au déjeuner", "Au goûter", "Au dîner"], answer: "Au déjeuner" },
      { id: "u3-delf-q4", type: "multiple_choice", prompt: "Que pouvez-vous faire une fois par mois ?", options: ["Aller au restaurant", "Manger des croissants", "Acheter des légumes"], answer: "Acheter des légumes" },
      { id: "u3-delf-q5", type: "multiple_choice", prompt: "La cantine francophone ouvre…", options: ["à 13 h", "à 14 h", "à 15 h"], answer: "à 15 h" }
    ]
  },
  {
    id: "u4-cahier-visite-rennes",
    unit: 4,
    unitTitle: "C'est où ?",
    source: "cahier",
    section: "compréhension écrite",
    page: 49,
    title: "J'attends votre visite !",
    instruction: "Lisez le post de Lena et répondez aux questions.",
    text: `Lena45 — Des nouvelles de Rennes !\nJ'habite à Rennes maintenant ! Mon quartier n'est pas loin du centre-ville et il est très sympa. J'adore la ville parce qu'il y a beaucoup de bâtiments historiques, des théâtres, des musées, des églises… Il y a toujours des choses à visiter. Je suis à 5 minutes de la place de la Mairie mais ma rue est très calme. Je marche beaucoup et le week-end, je prends souvent mon vélo pour aller dans la nature. Voilà ma vie à Rennes !\nJ'attends votre visite ! Ne prenez pas votre voiture, prenez le train pour venir à Rennes, pour aller de la gare jusqu'à chez moi c'est très facile. J'habite à 15 minutes à pied ou à 5 minutes en métro !\n#rennes #jadoremaville`,
    questions: [
      { id: "u4-q1", type: "true_false", prompt: "Lena habite à Rennes.", answer: true },
      { id: "u4-q2", type: "true_false", prompt: "Lena n'aime pas son quartier.", answer: false },
      { id: "u4-q3", type: "true_false", prompt: "À Rennes, il y a beaucoup de monuments.", answer: true },
      { id: "u4-q4", type: "multiple_choice", prompt: "Lena…", options: ["habite loin de la place de la Mairie", "n'habite pas loin de la place de la Mairie", "habite place de la Mairie"], answer: "n'habite pas loin de la place de la Mairie" },
      { id: "u4-q5", type: "multiple_choice", prompt: "Le week-end, Lena…", options: ["prend souvent le vélo pour aller dans la nature", "ne prend jamais le vélo pour aller dans la nature", "prend toujours le train pour visiter une ville"], answer: "prend souvent le vélo pour aller dans la nature" },
      { id: "u4-q6", type: "multiple_choice", prompt: "Pour aller à Rennes, Lena propose de…", options: ["prendre la voiture", "prendre le train", "prendre le bus"], answer: "prendre le train" },
      { id: "u4-q7", type: "multi_select", prompt: "De la gare, on peut aller chez Lena…", options: ["à pied", "en bus", "en métro"], answer: ["à pied", "en métro"] }
    ]
  },
  {
    id: "u4-delf-grenoble",
    unit: 4,
    unitTitle: "C'est où ?",
    source: "cahier",
    section: "DELF compréhension écrite",
    page: 52,
    title: "Exposition — Histoire de Grenoble",
    instruction: "Vous êtes en France, à l'office du tourisme. Vous lisez le panneau suivant. Répondez aux questions.",
    text: `EXPOSITION — HISTOIRE DE GRENOBLE\nÀ partir du 17 septembre, le musée de Grenoble propose une exposition sur l'histoire de la ville. Visites tous les mercredis matin et le week-end jusqu'à 18 h. Appelez pour réserver au 04 76 63 20 21. Le musée se trouve en face du gymnase : traversez le pont, continuez tout droit et prenez la première à gauche, à côté de l'arrêt de tram. Entrée gratuite pour les étudiants, apportez votre carte !`,
    questions: [
      { id: "u4-delf-q1", type: "multiple_choice", prompt: "Les visites sont…", options: ["le lundi", "le mardi", "le mercredi"], answer: "le mercredi" },
      { id: "u4-delf-q2", type: "multiple_choice", prompt: "À quelle heure se termine la visite du week-end ?", options: ["À 17 h", "À 18 h", "À 20 h"], answer: "À 18 h" },
      { id: "u4-delf-q3", type: "multiple_choice", prompt: "Pour réserver, vous devez…", options: ["téléphoner", "aller au musée", "envoyer un mail"], answer: "téléphoner" },
      { id: "u4-delf-q4", type: "short_answer", prompt: "Où se trouve le musée ?", answer: "En face du gymnase, à côté de l'arrêt de tram." },
      { id: "u4-delf-q5", type: "short_answer", prompt: "Que doivent apporter les étudiants ?", answer: "Leur carte d'étudiant." }
    ]
  },
  {
    id: "u5-delf-yasmine",
    unit: 5,
    unitTitle: "C'est tendance !",
    source: "cahier",
    section: "DELF compréhension écrite",
    page: 64,
    title: "Mercredi après-midi",
    instruction: "Vous recevez ce message de votre amie suisse. Lisez le document et répondez aux questions.",
    text: `De : yasmine@gmail.com\nObjet : Mercredi après-midi\nSalut,\nC'est bientôt l'anniversaire de ma sœur Elsa. Tu viens avec moi en ville ? Je vais acheter un super cadeau ! Un beau chapeau rouge, c'est sa couleur préférée. Ou un manteau pour les vacances d'hiver, Elsa adore le ski ! Tu peux venir chez moi, mercredi, à 12 h. Les magasins ouvrent à 14 h mais nous pouvons manger ensemble ! Il va pleuvoir mercredi, prends ton parapluie !\nÀ bientôt, Yasmine`,
    questions: [
      { id: "u5-delf-q1", type: "multiple_choice", prompt: "Que propose Yasmine ?", options: ["Faire du sport", "Faire du shopping", "Aller au restaurant"], answer: "Faire du shopping" },
      { id: "u5-delf-q2", type: "multiple_choice", prompt: "Elsa adore…", options: ["le rouge", "le jaune", "le violet"], answer: "le rouge" },
      { id: "u5-delf-q3", type: "multiple_choice", prompt: "Vous avez rendez-vous où ?", options: ["En ville", "Au restaurant", "Chez Yasmine"], answer: "Chez Yasmine" },
      { id: "u5-delf-q4", type: "multiple_choice", prompt: "Vous pouvez faire du shopping à quelle heure ?", options: ["À 12 h", "À 13 h", "À 14 h"], answer: "À 14 h" },
      { id: "u5-delf-q5", type: "multiple_choice", prompt: "Qu'est-ce que vous devez prendre ?", options: ["Un manteau", "Un parapluie", "Un chapeau"], answer: "Un parapluie" }
    ]
  },
  {
    id: "u6-cahier-a-plus-tard",
    unit: 6,
    unitTitle: "Qu'est-ce qu'on fait aujourd'hui ?",
    source: "cahier",
    section: "compréhension écrite",
    page: 73,
    title: "À plus tard !",
    instruction: "Lisez le document et répondez aux questions.",
    text: `Coucou Tom,\nJe vois mes copines à 20 h. Je ne peux pas faire le dîner pour les enfants, tu t'en occupes ? Karine vient juste de terminer ses devoirs, elle est allée au cinéma. Elle revient vers 19 h 30. Hugo fait du vélo de 19 h à 20 h. Après le repas, ils peuvent regarder un film, mais ils se brossent les dents et ils se couchent à 22 h 30 maximum !\nMerci !\nJe rentre à 23 h 00. À plus tard.\nCatherine`,
    questions: [
      { id: "u6-q1", type: "short_answer", prompt: "Pour qui est le message ?", answer: "Pour Tom." },
      { id: "u6-q2", type: "multiple_choice", prompt: "Catherine parle…", options: ["du matin", "de l'après-midi", "du soir"], answer: "du soir" },
      { id: "u6-q3", type: "short_answer", prompt: "Qu'est-ce qu'elle demande ?", answer: "Elle demande à Tom de faire le dîner / de s'occuper des enfants." },
      { id: "u6-q4", type: "true_false", prompt: "Karine doit faire ses devoirs.", answer: false },
      { id: "u6-q5", type: "true_false", prompt: "Les enfants ne peuvent pas regarder la télé.", answer: false },
      { id: "u6-q6", type: "true_false", prompt: "Quand Catherine rentre, les enfants sont couchés.", answer: true },
      { id: "u6-q7", type: "short_answer", prompt: "Combien de temps sort Catherine ?", answer: "Environ 3 heures, de 20 h à 23 h." }
    ]
  },
  {
    id: "u6-delf-casting",
    unit: 6,
    unitTitle: "Qu'est-ce qu'on fait aujourd'hui ?",
    source: "cahier",
    section: "DELF compréhension écrite",
    page: 76,
    title: "Casting pour la série Dix pour cent !",
    instruction: "Vous êtes en France, à Paris. Vous lisez cette annonce dans un journal. Répondez aux questions.",
    text: `CASTING POUR LA SÉRIE DIX POUR CENT !\nLa célèbre série cherche deux acteurs : une actrice de 30 ans, avec les cheveux courts et châtains, et un homme de 45 ans, blond. Intéressés ? Venez au studio samedi 25 juin de 9 h à 12 h. Descendez du bus à l'arrêt Échange. Prenez la rue à gauche et tournez à droite. Traversez le parc. Les studios sont en face du parking à vélos.`,
    questions: [
      { id: "u6-delf-q1", type: "multiple_choice", prompt: "La série cherche une femme…", options: ["brune", "châtain", "blonde"], answer: "châtain" },
      { id: "u6-delf-q2", type: "multiple_choice", prompt: "Quel âge doit avoir l'acteur ?", options: ["25 ans", "30 ans", "45 ans"], answer: "45 ans" },
      { id: "u6-delf-q3", type: "multiple_choice", prompt: "Quand est le casting ?", options: ["Le matin", "L'après-midi", "Le soir"], answer: "Le matin" },
      { id: "u6-delf-q4", type: "multiple_choice", prompt: "Comment est-ce que vous allez au casting ?", options: ["À vélo", "En bus", "En métro"], answer: "En bus" }
    ]
  },
  {
    id: "u7-delf-demenagement",
    unit: 7,
    unitTitle: "Chez moi !",
    source: "cahier",
    section: "DELF compréhension écrite",
    page: 88,
    title: "Déménagement",
    instruction: "Vous recevez ce message de votre ami belge. Lisez le document et répondez aux questions.",
    text: `De : karim@gmail.com\nObjet : Déménagement\nSalut,\nAvec ma femme, nous déménageons dans un plus grand appartement pour l'arrivée du bébé. Tu peux nous aider ? Il y a beaucoup de meubles et en plus nous avons acheté une table basse et un fauteuil au vide-grenier ! C'est au 5e étage sans ascenseur. On offre les boissons ! L'immeuble est au 3 rue du Capitole et le code de la porte est A423.\nÀ bientôt !\nKarim`,
    questions: [
      { id: "u7-delf-q1", type: "multiple_choice", prompt: "Pourquoi Karim déménage ?", options: ["Il va se marier", "Il va avoir un enfant", "Il va travailler"], answer: "Il va avoir un enfant" },
      { id: "u7-delf-q2", type: "multi_select", prompt: "Qu'est-ce que Karim a acheté ?", options: ["une table basse", "un fauteuil", "une armoire", "un lit"], answer: ["une table basse", "un fauteuil"] },
      { id: "u7-delf-q3", type: "multiple_choice", prompt: "À quel étage est l'appartement ?", options: ["Au 3e", "Au 5e", "Au 7e"], answer: "Au 5e" },
      { id: "u7-delf-q4", type: "multiple_choice", prompt: "Dans l'immeuble, il n'y a pas…", options: ["de parking", "d'ascenseur", "de garage à vélos"], answer: "d'ascenseur" },
      { id: "u7-delf-q5", type: "multiple_choice", prompt: "Qu'est-ce que Karim prépare ?", options: ["des gâteaux", "des sandwiches", "des boissons"], answer: "des boissons" }
    ]
  },
  {
    id: "u8-cahier-ordonnance",
    unit: 8,
    unitTitle: "En forme !",
    source: "cahier",
    section: "compréhension écrite",
    page: 97,
    title: "Qu'est-ce qui vous arrive ?",
    instruction: "Lisez le document et répondez aux questions.",
    text: `Docteur Marc Antoine\nMédecine générale\n3 rue des pommeaux d'or — 06500 Menton\nConsultation sur rendez-vous : 03 56 76 56 45 ou sur doctolib.com\n\nDate : 04/05/2021\nMadame Dominique Montfort\nFemme 65 kg — 1,70 m\nNé(e) le 22/08/1980 — 41 ans\n\n1) Paracétamol — 3 fois par jour\n2) Examen : radio du bras`,
    questions: [
      { id: "u8-cahier-q1", type: "short_answer", prompt: "Qui a écrit ce document ?", answer: "Le docteur Marc Antoine." },
      { id: "u8-cahier-q2", type: "short_answer", prompt: "Comment faire pour prendre rendez-vous ?", answer: "Téléphoner au 03 56 76 56 45 ou sur doctolib.com." },
      { id: "u8-cahier-q3a", type: "true_false", prompt: "Dominique est un homme.", answer: false },
      { id: "u8-cahier-q3b", type: "true_false", prompt: "Dominique pèse 70 kg.", answer: false },
      { id: "u8-cahier-q3c", type: "true_false", prompt: "La date de naissance de Dominique est le 22/08/1980.", answer: true },
      { id: "u8-cahier-q4", type: "multiple_choice", prompt: "Dominique a mal…", options: ["au dos", "à la tête", "au bras", "au pied"], answer: "au bras" },
      { id: "u8-cahier-q5", type: "short_answer", prompt: "Qu'est-ce que Dominique doit faire ?", answer: "Prendre du Paracétamol 3 fois par jour et faire une radio du bras." }
    ]
  },
  {
    id: "u8-delf-des-nouvelles",
    unit: 8,
    unitTitle: "En forme !",
    source: "cahier",
    section: "DELF compréhension écrite",
    page: 100,
    title: "Des nouvelles",
    instruction: "Vous recevez ce message de votre ami suisse. Lisez le document et répondez aux questions.",
    text: `De : gabriel@yahoo.fr\nObjet : Des nouvelles\nSalut,\nJe suis fatigué en ce moment alors je suis allé chez le docteur. Il m'a dit de marcher 30 minutes par jour et de faire du sport. Je veux faire de la natation. C'est bien pour moi car j'ai mal au dos. Ma sœur Julia fait de la gymnastique 15 minutes par jour, elle est moins stressée ! Et toi, tu fais toujours du basket ?\nÀ bientôt !\nGabriel`,
    questions: [
      { id: "u8-delf-q1", type: "multiple_choice", prompt: "Comment se sent Gabriel ?", options: ["Triste", "Stressé", "Fatigué"], answer: "Fatigué" },
      { id: "u8-delf-q2", type: "multiple_choice", prompt: "Combien de temps Gabriel doit marcher ?", options: ["15 minutes", "30 minutes", "45 minutes"], answer: "30 minutes" },
      { id: "u8-delf-q3", type: "multiple_choice", prompt: "Quel sport veut faire Gabriel ?", options: ["de la course à pied", "du yoga", "de la natation"], answer: "de la natation" },
      { id: "u8-delf-q4", type: "multiple_choice", prompt: "Gabriel a mal…", options: ["au dos", "au ventre", "aux jambes"], answer: "au dos" },
      { id: "u8-delf-q5", type: "multiple_choice", prompt: "Quel sport fait la sœur de Gabriel ?", options: ["de la danse", "de la gymnastique", "du basket"], answer: "de la gymnastique" }
    ]
  },
  {
    id: "u9-delf-bretagne-passion",
    unit: 9,
    unitTitle: "Bonnes vacances !",
    source: "cahier",
    section: "DELF compréhension écrite",
    page: 112,
    title: "Bretagne Passion — Week-end touristique à Saint-Malo",
    instruction: "Vous êtes en France. Vous lisez ce programme dans une brochure. Répondez aux questions.",
    text: `BRETAGNE PASSION : Week-end touristique à Saint-Malo !\nSAMEDI 25 JUIN : visite guidée de la vieille ville ; déjeuner à 12 h dans une crêperie traditionnelle ; à 15 h, départ en bateau pour la jolie ville de Dinard et promenade près de la plage.\nDIMANCHE 26 JUIN à 10 h : randonnée en forêt ; pique-nique près d'une rivière ; visite d'un jardin de plantes locales. Retour à 17 h.`,
    questions: [
      { id: "u9-delf-q1", type: "short_answer", prompt: "Qu'est-ce que vous pouvez faire samedi matin ?", answer: "Une visite guidée de la vieille ville." },
      { id: "u9-delf-q2", type: "short_answer", prompt: "Où est le déjeuner samedi ?", answer: "Dans une crêperie traditionnelle." },
      { id: "u9-delf-q3", type: "short_answer", prompt: "À quelle heure est le départ en bateau ?", answer: "À 15 h." },
      { id: "u9-delf-q4", type: "short_answer", prompt: "Quelles activités sont proposées dimanche ?", answer: "Randonnée en forêt, pique-nique près d'une rivière, visite d'un jardin de plantes locales." },
      { id: "u9-delf-q5", type: "short_answer", prompt: "À quelle heure est le retour dimanche ?", answer: "À 17 h." }
    ]
  },
  {
    id: "u10-cahier-travail-equipe",
    unit: 10,
    unitTitle: "Au travail !",
    source: "cahier",
    section: "compréhension écrite",
    page: 121,
    title: "Travail d'équipe !",
    instruction: "Lisez les documents et répondez aux questions.",
    text: `FILMS\nTaxi : Daniel, ex-livreur de pizzas est aujourd'hui chauffeur de taxi et il aime conduire très vite. Un jour, il rencontre Émilien, un policier qui n'a toujours pas obtenu son permis de conduire. Pour pouvoir continuer à travailler, il accepte d'aider Émilien à rechercher un gang de voleurs qui utilise des grosses voitures pour braquer les banques de Marseille.\n\nMédecin de campagne : Tous les habitants, dans ce coin de campagne, peuvent compter sur Jean-Pierre, le médecin qui les soigne jour et nuit, 7 jours sur 7. Jean-Pierre, qui est malade, accueille Nathalie, médecin depuis peu, venue de l'hôpital pour l'aider. Mais est-ce qu'elle va pouvoir s'adapter à cette nouvelle vie ?`,
    questions: [
      { id: "u10-q1", type: "multi_select", prompt: "Cochez les professions présentées dans les deux films (3 réponses).", options: ["banquier", "livreur de pizza", "policier", "agriculteur", "médecin", "chauffeur"], answer: ["policier", "médecin", "chauffeur"] },
      { id: "u10-q2", type: "true_false", prompt: "Daniel est toujours livreur de pizza.", answer: false },
      { id: "u10-q3", type: "true_false", prompt: "Émilien a son permis de conduire.", answer: false },
      { id: "u10-q4", type: "true_false", prompt: "Nathalie a travaillé longtemps comme médecin.", answer: false },
      { id: "u10-q5", type: "multiple_choice", prompt: "En général, Jean-Pierre travaille…", options: ["un peu", "seulement le week-end", "trop"], answer: "trop" }
    ]
  },
  {
    id: "u10-delf-annonces-universite",
    unit: 10,
    unitTitle: "Au travail !",
    source: "cahier",
    section: "DELF compréhension écrite",
    page: 124,
    title: "Annonces dans le hall de l'université",
    instruction: "Vous étudiez en France. Vous lisez ces annonces dans le hall de votre université. Répondez aux questions.",
    text: `Annonces :\n1. Boutique de mode cherche vendeuse les jeudis soir, contrat de 6 mois.\n2. Venez travailler au restaurant Margoulette tous les samedis. Téléphonez l'après-midi seulement.\n3. Entreprise cherche étudiant en master d'économie pour un stage de 3 mois. Écrivez à contact@sitrans.com.\n4. Écrivez des articles pour le journal de l'université. Réunion d'information mardi 12 avril, à 10 h.\n5. Donne cours de maths pendant les deux mois d'été. Appelez après 19 h.`,
    questions: [
      { id: "u10-delf-q1", type: "short_answer", prompt: "Quelle annonce concerne un stage ?", answer: "L'annonce de l'entreprise qui cherche un étudiant en master d'économie." },
      { id: "u10-delf-q2", type: "short_answer", prompt: "Quel travail est proposé le jeudi soir ?", answer: "Vendeuse dans une boutique de mode." },
      { id: "u10-delf-q3", type: "short_answer", prompt: "Quand peut-on téléphoner au restaurant Margoulette ?", answer: "L'après-midi seulement." },
      { id: "u10-delf-q4", type: "short_answer", prompt: "Quand a lieu la réunion d'information du journal ?", answer: "Mardi 12 avril à 10 h." },
      { id: "u10-delf-q5", type: "short_answer", prompt: "Pendant combien de temps les cours de maths sont-ils proposés ?", answer: "Pendant deux mois d'été." }
    ]
  },

  // ─── U1 Livre ─────────────────────────────────────────────────────────────
  {
    id: "u1-livre-festival-angouleme",
    unit: 1,
    unitTitle: "Je suis…",
    source: "livre",
    section: "compréhension écrite",
    page: 24,
    title: "Au Festival d'Angoulême",
    instruction: "Lisez la page web du festival et répondez aux questions.",
    text: `FESTIVAL INTERNATIONAL DE LA BANDE DESSINÉE D'ANGOULÊME\nwww.bdangouleme.com\n\nLe Festival International de la Bande Dessinée a lieu chaque année à Angoulême, en France. C'est l'un des plus grands festivals de BD au monde.\n\nAuteurs invités :\n- Charles Burns — États-Unis\n- Isabelle Pralong — Suisse\n- Jul — France`,
    questions: [
      { id: "u1-angouleme-q1", type: "multiple_choice", prompt: "C'est quel type de festival ?", options: ["cinéma", "bande dessinée", "musique"], answer: "bande dessinée" },
      { id: "u1-angouleme-q2", type: "multiple_choice", prompt: "Charles Burns est…", options: ["français", "américain", "belge"], answer: "américain" },
      { id: "u1-angouleme-q3", type: "matching", prompt: "Associez les auteurs à leur pays.", answer: "Charles Burns → États-Unis\nIsabelle Pralong → Suisse\nJul → France" }
    ]
  },

  // ─── U2 Livre ─────────────────────────────────────────────────────────────
  {
    id: "u2-livre-tu-habites-ou",
    unit: 2,
    unitTitle: "Près de moi",
    source: "livre",
    section: "compréhension écrite",
    page: 32,
    title: "Tu habites où ?",
    instruction: "Lisez la conversation et répondez aux questions.",
    text: `[Chat Milo / Lina]\nMilo : Salut Lina ! Comment tu vas ?\nLina : Ça va bien ! Et toi ? Tu habites où maintenant ?\nMilo : J'habite à Saint-Jean, c'est un village près de Lyon. J'adore ! Il y a une belle place et des commerces sympas. Et toi ?\nLina : Moi, j'habite à Nice avec ma famille. Il fait beau ici !\nMilo : Super ! Tu habites avec tes parents ?\nLina : Oui, avec mes parents et ma sœur.`,
    questions: [
      { id: "u2-tu-habites-q1", type: "short_answer", prompt: "C'est quel type de document ?", answer: "C'est un chat / une conversation en ligne." },
      { id: "u2-tu-habites-q2", type: "short_answer", prompt: "Qui écrit à qui ?", answer: "Milo écrit à Lina." },
      { id: "u2-tu-habites-q3a", type: "true_false", prompt: "Lina habite à Nice.", answer: true },
      { id: "u2-tu-habites-q3b", type: "true_false", prompt: "Milo habite à Lyon.", answer: false },
      { id: "u2-tu-habites-q4", type: "short_answer", prompt: "Pourquoi Milo aime Saint-Jean ?", answer: "Il y a une belle place et des commerces sympas." },
      { id: "u2-tu-habites-q5", type: "short_answer", prompt: "Lina habite avec qui ?", answer: "Avec ses parents et sa sœur." }
    ]
  },
  {
    id: "u2-livre-on-invite-qui",
    unit: 2,
    unitTitle: "Près de moi",
    source: "livre",
    section: "compréhension écrite",
    page: 38,
    title: "On invite qui ?",
    instruction: "Lisez la conversation et répondez aux questions.",
    text: `[Chat Nina / Théo]\nNina : Théo, j'ai commencé la liste des invités pour notre mariage ! Tu peux m'aider ?\nThéo : Oui ! Qui tu invites de ta famille ?\nNina : Mon frère et sa femme. Oh non, il est divorcé maintenant…\nThéo : Ah oui ! Et ma cousine Léa ?\nNina : Bien sûr ! Et ton oncle Paul ?\nThéo : Oui, il vient ! Et Sofia ? Elle a deux enfants maintenant.\nNina : Super, elle vient avec ses enfants !`,
    questions: [
      { id: "u2-inviter-q1", type: "short_answer", prompt: "Qui sont Nina et Théo ?", answer: "Ce sont deux personnes qui vont se marier / des fiancés." },
      { id: "u2-inviter-q2", type: "short_answer", prompt: "Qu'est-ce que Nina prépare ?", answer: "La liste des invités pour leur mariage." },
      { id: "u2-inviter-q3a", type: "true_false", prompt: "Théo invite son oncle Paul.", answer: true },
      { id: "u2-inviter-q3b", type: "true_false", prompt: "Théo n'invite pas sa cousine Léa.", answer: false },
      { id: "u2-inviter-q3c", type: "true_false", prompt: "Le frère de Nina est marié.", answer: false },
      { id: "u2-inviter-q3d", type: "true_false", prompt: "Sofia a des enfants.", answer: true }
    ]
  },

  // ─── U3 Livre ─────────────────────────────────────────────────────────────
  {
    id: "u3-livre-mon-panier",
    unit: 3,
    unitTitle: "Qu'est-ce qu'on mange ?",
    source: "livre",
    section: "compréhension écrite",
    page: 46,
    title: "Mon panier",
    instruction: "Lisez le site internet et répondez aux questions.",
    text: `www.mon-panier-local.fr\n\nMon panier local, c'est la livraison de paniers de produits bio et locaux directement chez vous !\n\nNos formules :\n• Formule S : 1 panier par semaine, 5 produits, 15 €\n• Formule L : 2 paniers par semaine, 10 produits, 28 €\n\nRetrait possible chez nos partenaires :\n• Laure Fleuriste — disponible le vendredi\n• Bio Market — disponible le mardi et le samedi\n\nAvis clients :\n⭐⭐⭐⭐⭐ « Les légumes sont frais et délicieux ! » — Sophie\n⭐⭐⭐⭐⭐ « Livraison rapide, je recommande ! » — Thomas`,
    questions: [
      { id: "u3-panier-q1", type: "short_answer", prompt: "Qu'est-ce que c'est, mon-panier-local.fr ?", answer: "C'est un site de livraison de paniers de produits bio et locaux." },
      { id: "u3-panier-q2a", type: "true_false", prompt: "Les produits sont biologiques.", answer: true },
      { id: "u3-panier-q2b", type: "true_false", prompt: "Il y a trois formules.", answer: false },
      { id: "u3-panier-q3", type: "short_answer", prompt: "Quelle est la différence entre les formules S et L ?", answer: "La formule S : 1 panier / 5 produits / 15 €. La formule L : 2 paniers / 10 produits / 28 €." },
      { id: "u3-panier-q4", type: "multiple_choice", prompt: "Vous pouvez retirer votre panier chez Laure Fleuriste quel jour ?", options: ["mardi", "vendredi", "samedi"], answer: "vendredi" },
      { id: "u3-panier-q5", type: "short_answer", prompt: "Les avis clients sont-ils positifs ou négatifs ?", answer: "Positifs." }
    ]
  },
  {
    id: "u3-livre-les-francais-courses",
    unit: 3,
    unitTitle: "Qu'est-ce qu'on mange ?",
    source: "livre",
    section: "compréhension écrite",
    page: 48,
    title: "Les Français et les courses",
    instruction: "Lisez l'infographie et répondez aux questions.",
    text: `LES FRANÇAIS ET LES COURSES — Infographie\n\nLes commerces les plus importants pour les Français :\n• La boulangerie : 90 %\n• La boucherie : 75 %\n• L'épicerie : 60 %\n\n• 78 % des Français aiment faire leurs courses dans les commerces de leur quartier.\n• Le week-end, les Français aiment faire leurs courses au marché.\n• À l'épicerie et au supermarché : fruits, légumes, produits du quotidien.`,
    questions: [
      { id: "u3-courses-q1", type: "multiple_choice", prompt: "Quel est le commerce le plus important pour les Français ?", options: ["la boucherie", "la boulangerie", "l'épicerie"], answer: "la boulangerie" },
      { id: "u3-courses-q2", type: "true_false", prompt: "Les Français aiment les commerces de leur quartier.", answer: true },
      { id: "u3-courses-q3", type: "short_answer", prompt: "Où les Français font-ils leurs courses le week-end ?", answer: "Au marché." },
      { id: "u3-courses-q4", type: "short_answer", prompt: "Qu'est-ce qu'on achète à l'épicerie et au supermarché ?", answer: "Des fruits, des légumes, des produits du quotidien." }
    ]
  },
  {
    id: "u3-livre-le-plat-du-jour",
    unit: 3,
    unitTitle: "Qu'est-ce qu'on mange ?",
    source: "livre",
    section: "compréhension écrite",
    page: 52,
    title: "Le plat du jour",
    instruction: "Lisez la page Facebook du restaurant Picknick et répondez aux questions.",
    text: `Picknick Restaurant\nPage Facebook\n\nAujourd'hui chez Picknick :\nPlat du jour 1 : Salade niçoise — 12 €\nPlat du jour 2 : Pâtes au pesto — 12 €\nDessert 1 : Tarte aux pommes — 5,50 €\nDessert 2 : Crème brûlée — 5,50 €\n\nCommentaires clients :\n« Délicieux comme toujours ! » — Marie\n« Le meilleur restaurant du quartier ! » — Paul\n« Très bon rapport qualité-prix ! » — Léa`,
    questions: [
      { id: "u3-plat-q1", type: "multiple_choice", prompt: "C'est quel type de document ?", options: ["un site internet", "une page Facebook", "un menu papier"], answer: "une page Facebook" },
      { id: "u3-plat-q2", type: "short_answer", prompt: "Combien de plats y a-t-il aujourd'hui ?", answer: "2 plats du jour et 2 desserts." },
      { id: "u3-plat-q3", type: "short_answer", prompt: "Quel est le prix d'un plat du jour ? D'un dessert ?", answer: "12 € pour un plat du jour et 5,50 € pour un dessert." },
      { id: "u3-plat-q4", type: "short_answer", prompt: "Est-ce que les clients aiment le restaurant ?", answer: "Oui, les commentaires sont très positifs." }
    ]
  },

  // ─── U4 Livre ─────────────────────────────────────────────────────────────
  {
    id: "u4-livre-artistes-grenoble",
    unit: 4,
    unitTitle: "C'est où ?",
    source: "livre",
    section: "compréhension écrite",
    page: 60,
    title: "Des artistes à Grenoble !",
    instruction: "Lisez le site de l'office du tourisme de Grenoble et répondez aux questions.",
    text: `Grenoble Tourisme — www.grenoble-tourisme.com\n\nSTREET ART FEST GRENOBLE\n\nChaque année en juin, des artistes du monde entier viennent à Grenoble pour le Street Art Fest ! Des artistes français et internationaux créent des œuvres sur les murs de la ville. Les habitants regardent les artistes travailler dans les rues.\n\nActivités proposées :\n• Visites guidées des œuvres de street art\n• Ateliers de création artistique\n• Expositions en galerie`,
    questions: [
      { id: "u4-artistes-q1", type: "short_answer", prompt: "Quel est l'événement présenté ?", answer: "Le Street Art Fest Grenoble." },
      { id: "u4-artistes-q2", type: "short_answer", prompt: "Où et quand a lieu cet événement ?", answer: "À Grenoble, en juin." },
      { id: "u4-artistes-q3a", type: "true_false", prompt: "Tous les artistes sont français.", answer: false },
      { id: "u4-artistes-q3b", type: "true_false", prompt: "Les artistes travaillent et les habitants regardent.", answer: true },
      { id: "u4-artistes-q3c", type: "true_false", prompt: "Il y a des visites guidées.", answer: true }
    ]
  },
  {
    id: "u4-livre-prenez-bus-tram",
    unit: 4,
    unitTitle: "C'est où ?",
    source: "livre",
    section: "compréhension écrite",
    page: 66,
    title: "Prenez le bus, le tram ou le train !",
    instruction: "Lisez l'article et répondez aux questions.",
    text: `Les transports gratuits au Luxembourg !\n\nDepuis 2020, les transports en commun sont entièrement gratuits au Luxembourg : bus, tram et train. C'est une première en Europe !\n\nPour qui ?\nLes habitants du Luxembourg et les touristes peuvent utiliser tous les transports gratuitement.\n\nPourquoi cette décision ?\n• Les gens utilisent trop leur voiture : il y a beaucoup de pollution.\n• Les transports gratuits représentent des économies importantes pour les habitants.\n\nActivités possibles : visiter les châteaux, explorer la nature, découvrir la capitale Luxembourg-Ville.`,
    questions: [
      { id: "u4-bus-q1", type: "multiple_choice", prompt: "Dans quel pays les transports sont-ils gratuits ?", options: ["France", "Belgique", "Luxembourg"], answer: "Luxembourg" },
      { id: "u4-bus-q2", type: "multiple_choice", prompt: "Pour qui les transports sont-ils gratuits ?", options: ["seulement les habitants", "seulement les touristes", "les habitants et les touristes"], answer: "les habitants et les touristes" },
      { id: "u4-bus-q3", type: "multi_select", prompt: "Pourquoi les transports sont-ils gratuits ? (2 raisons)", options: ["les gens utilisent trop leur voiture et il y a de la pollution", "les transports coûtent trop cher à l'État", "ça représente des économies importantes pour les habitants", "les trains sont trop lents"], answer: ["les gens utilisent trop leur voiture et il y a de la pollution", "ça représente des économies importantes pour les habitants"] },
      { id: "u4-bus-q4", type: "short_answer", prompt: "Quelles activités sont possibles avec les transports gratuits ?", answer: "Visiter les châteaux, explorer la nature, découvrir la capitale Luxembourg-Ville." }
    ]
  },
  {
    id: "u4-livre-metro-velo",
    unit: 4,
    unitTitle: "C'est où ?",
    source: "livre",
    section: "compréhension écrite",
    page: 68,
    title: "En métro ou à vélo ?",
    instruction: "Lisez l'infographie sur les transports écologiques et répondez aux questions.",
    text: `TRANSPORTS ÉCOLOGIQUES EN VILLE — Infographie\n\nPour les petits trajets (moins de 3 km) : le vélo est idéal !\nPour les trajets moyens (3–10 km) : le métro ou le bus.\nPour les longs trajets (plus de 10 km) : le tramway ou le train.\n\nLe vélo et les transports en commun sont des solutions économiques et écologiques.\nMoins de voitures = moins de pollution dans les villes !`,
    questions: [
      { id: "u4-metro-q1a", type: "true_false", prompt: "L'infographie parle des transports pour les trajets courts, moyens et longs.", answer: true },
      { id: "u4-metro-q1b", type: "true_false", prompt: "Le vélo et les transports en commun sont des solutions économiques.", answer: true },
      { id: "u4-metro-q2", type: "matching", prompt: "Associez les distances aux moyens de transport.", answer: "Moins de 3 km → vélo\n3–10 km → métro / bus\nPlus de 10 km → tramway / train" }
    ]
  },

  // ─── U5 Livre ─────────────────────────────────────────────────────────────
  {
    id: "u5-livre-la-mode",
    unit: 5,
    unitTitle: "C'est tendance !",
    source: "livre",
    section: "compréhension écrite",
    page: 74,
    title: "La mode est à nous !",
    instruction: "Lisez l'article de blog et répondez aux questions.",
    text: `Blog — La mode est à nous !\n\nVous aimez la mode mais vous n'avez pas beaucoup d'argent ? Essayez Vinted ! C'est une application pour acheter et vendre des vêtements d'occasion.\n\nComment ça marche ?\n• Vous créez un compte sur Vinted.\n• Vous mettez vos vêtements en vente.\n• Vous achetez les vêtements des autres utilisateurs.\n\nVinted, c'est pour tout le monde : femmes, hommes, enfants ! Et c'est écologique aussi.`,
    questions: [
      { id: "u5-mode-q1", type: "short_answer", prompt: "Quel est le nom de l'application présentée ?", answer: "Vinted." },
      { id: "u5-mode-q2a", type: "true_false", prompt: "On peut acheter des vêtements d'occasion sur Vinted.", answer: true },
      { id: "u5-mode-q2b", type: "true_false", prompt: "On peut seulement acheter, pas vendre.", answer: false },
      { id: "u5-mode-q2c", type: "true_false", prompt: "Il n'y a pas de vêtements pour hommes.", answer: false },
      { id: "u5-mode-q3", type: "short_answer", prompt: "Pourquoi utiliser Vinted ?", answer: "Pour acheter et vendre des vêtements d'occasion. C'est économique et écologique." }
    ]
  },
  {
    id: "u5-livre-vous-participez",
    unit: 5,
    unitTitle: "C'est tendance !",
    source: "livre",
    section: "compréhension écrite",
    page: 80,
    title: "Vous participez ?",
    instruction: "Lisez la cagnotte Leetchi et répondez aux questions.",
    text: `Leetchi — Cagnotte en ligne\n\nJOYEUX ANNIVERSAIRE VALENTIN !\nOrganisé par Coline\n\nValentin a 30 ans ! Pour fêter son anniversaire, nous organisons une cagnotte pour lui offrir un beau cadeau.\n\nValentin adore le tennis et les objets high-tech. Coline propose des idées de cadeaux :\n• Une montre connectée — 150 €\n• Une raquette de tennis professionnelle — 80 €\n\nLa montre connectée, à quoi ça sert ?\nElle compte les pas, mesure le rythme cardiaque et peut recevoir les messages du smartphone.\n\nParticipez avant le 15 décembre !`,
    questions: [
      { id: "u5-cagnotte-q1", type: "short_answer", prompt: "Pour quel événement est cette cagnotte ?", answer: "Pour les 30 ans de Valentin." },
      { id: "u5-cagnotte-q2", type: "true_false", prompt: "La cagnotte est pour les 30 ans de Valentin.", answer: true },
      { id: "u5-cagnotte-q3", type: "short_answer", prompt: "Qu'est-ce que Valentin aime ?", answer: "Le tennis et les objets high-tech." },
      { id: "u5-cagnotte-q4", type: "multiple_choice", prompt: "Quel est le rôle de Coline ?", options: ["Elle organise la fête", "Elle propose des idées de cadeaux", "Elle paie le cadeau"], answer: "Elle propose des idées de cadeaux" },
      { id: "u5-cagnotte-q5", type: "short_answer", prompt: "À quoi sert la montre connectée ?", answer: "Elle compte les pas, mesure le rythme cardiaque et peut recevoir les messages du smartphone." }
    ]
  },
  {
    id: "u5-livre-personnalisez-objets",
    unit: 5,
    unitTitle: "C'est tendance !",
    source: "livre",
    section: "compréhension écrite",
    page: 82,
    title: "Personnalisez vos objets !",
    instruction: "Lisez l'article et répondez aux questions.",
    text: `Personnalisez vos objets !\n\nVous voulez offrir un cadeau unique ? Personnalisez un objet ! T-shirts, mugs, coussins… vous pouvez mettre une photo, un prénom ou un message sur votre objet.\n\nCes objets personnalisés ont beaucoup de succès. Les clients adorent l'idée ! Les grandes marques comme Nike ou Adidas proposent aussi des objets personnalisés maintenant.`,
    questions: [
      { id: "u5-objets-q1", type: "true_false", prompt: "Un objet personnalisé est unique.", answer: true },
      { id: "u5-objets-q2", type: "short_answer", prompt: "Est-ce que ces objets ont du succès ?", answer: "Oui, ils ont beaucoup de succès, les clients adorent l'idée." },
      { id: "u5-objets-q3", type: "multi_select", prompt: "Avec quoi peut-on personnaliser un objet ? (2 réponses)", options: ["une photo", "un prénom", "une couleur spéciale", "un tissu"], answer: ["une photo", "un prénom"] },
      { id: "u5-objets-q4", type: "true_false", prompt: "Les grandes marques proposent aussi des objets personnalisés.", answer: true }
    ]
  },

  // ─── U6 Livre ─────────────────────────────────────────────────────────────
  {
    id: "u6-livre-journee-active",
    unit: 6,
    unitTitle: "Qu'est-ce qu'on fait aujourd'hui ?",
    source: "livre",
    section: "compréhension écrite",
    page: 88,
    title: "Une journée active",
    instruction: "Lisez l'article et répondez aux questions.",
    text: `Une journée avec Mathilde Boulesteix, journaliste sportive\n\n7 h 00 — Mathilde se lève et travaille à la maison le matin. Elle prépare ses articles.\n8 h 00 — Elle commence sa journée de travail avec Romain, son collègue, à la télévision.\n8 h 00 – 18 h 00 — Elle travaille à la télévision.\n18 h 30 — Elle fait du sport : des sports de montagne (ski, escalade, randonnée…)\n20 h 00 — Elle rentre à la maison. Elle passe la soirée avec son mari.\n22 h 00 — Elle se couche tôt le soir avant un match ; plus tard les autres jours.`,
    questions: [
      { id: "u6-journee-q1a", type: "true_false", prompt: "Mathilde est journaliste à la radio.", answer: false },
      { id: "u6-journee-q1b", type: "true_false", prompt: "Elle travaille avec Romain.", answer: true },
      { id: "u6-journee-q1c", type: "true_false", prompt: "Elle travaille de 8 h à 18 h.", answer: true },
      { id: "u6-journee-q1d", type: "true_false", prompt: "Elle passe la soirée avec son mari.", answer: true },
      { id: "u6-journee-q2", type: "short_answer", prompt: "Quels types de sports fait-elle ?", answer: "Des sports de montagne (ski, escalade, randonnée…)." },
      { id: "u6-journee-q3", type: "short_answer", prompt: "Où travaille-t-elle le matin ?", answer: "À la maison." },
      { id: "u6-journee-q4", type: "short_answer", prompt: "Qu'est-ce qu'elle fait l'après-midi ?", answer: "Elle travaille à la télévision." },
      { id: "u6-journee-q5", type: "short_answer", prompt: "Pourquoi son heure de coucher change selon les jours ?", answer: "Avant un match elle se couche tôt ; les autres jours elle se couche plus tard." }
    ]
  },
  {
    id: "u6-livre-idees-lecture",
    unit: 6,
    unitTitle: "Qu'est-ce qu'on fait aujourd'hui ?",
    source: "livre",
    section: "compréhension écrite",
    page: 94,
    title: "Idées de lecture",
    instruction: "Lisez l'article sur les bandes dessinées francophones et répondez aux questions.",
    text: `Idées de lecture — BD francophones\n\nLa bande dessinée est née en Belgique et en France.\n\nQuelques personnages célèbres :\n• Lucky Luke — cowboy dans l'Ouest américain (auteur belge)\n• Joséphine — une Parisienne qui adore les sorties et les amis\n• Paul — un homme ordinaire qui a un enfant\n• Aya — une jeune femme de Côte d'Ivoire qui veut devenir médecin`,
    questions: [
      { id: "u6-lecture-q1", type: "short_answer", prompt: "Où est née la bande dessinée ?", answer: "En Belgique et en France." },
      { id: "u6-lecture-q2", type: "matching", prompt: "Associez les personnages à leur description.", answer: "Lucky Luke → cowboy américain\nJoséphine → adore les sorties\nPaul → a un enfant\nAya → veut devenir médecin" },
      { id: "u6-lecture-q3", type: "short_answer", prompt: "Quel est le projet professionnel d'Aya ?", answer: "Elle veut devenir médecin." }
    ]
  },
  {
    id: "u6-livre-casting",
    unit: 6,
    unitTitle: "Qu'est-ce qu'on fait aujourd'hui ?",
    source: "livre",
    section: "compréhension écrite",
    page: 96,
    title: "Casting",
    instruction: "Lisez l'annonce de casting et répondez aux questions.",
    text: `CASTING — Film L'anniversaire\n\nNous recherchons des acteurs et des actrices pour le film L'anniversaire !\n\nHistoire : Des amis se retrouvent au restaurant pour fêter un anniversaire.\n\nProfil recherché : hommes et femmes, 25–45 ans, tous les profils.\n\nComment participer ?\nEnvoyez votre photo à : anniversaire@gmail.com`,
    questions: [
      { id: "u6-casting-q1", type: "short_answer", prompt: "Quel est le titre du film ?", answer: "L'anniversaire." },
      { id: "u6-casting-q2", type: "short_answer", prompt: "Où se retrouvent les personnages ?", answer: "Au restaurant." },
      { id: "u6-casting-q3", type: "short_answer", prompt: "Comment participer au casting ?", answer: "Envoyer sa photo à anniversaire@gmail.com." }
    ]
  },

  // ─── U7 Livre ─────────────────────────────────────────────────────────────
  {
    id: "u7-livre-vide-grenier",
    unit: 7,
    unitTitle: "Chez moi !",
    source: "livre",
    section: "compréhension écrite",
    page: 103,
    title: "Au vide-grenier",
    instruction: "Lisez la conversation et répondez aux questions.",
    text: `[Chat Marco / David]\nDavid : Salut Marco ! Tu es où ?\nMarco : Je suis au vide-grenier avec Ophélie ! Il y a beaucoup de choses intéressantes ici.\nDavid : Il y a des électroménagers ?\nMarco : Non, pas d'électroménagers. Mais il y a des meubles pas chers ! On a trouvé une belle table.\nDavid : Super ! Il y a encore des vide-greniers ce week-end ?\nMarco : Oui ! Dimanche il y en a un près de chez moi. Tu veux venir ?`,
    questions: [
      { id: "u7-vide-grenier-q1", type: "short_answer", prompt: "Marco est avec qui ?", answer: "Avec Ophélie." },
      { id: "u7-vide-grenier-q2a", type: "true_false", prompt: "Il n'y a pas d'électroménagers au vide-grenier.", answer: true },
      { id: "u7-vide-grenier-q2b", type: "true_false", prompt: "Les meubles sont bon marché.", answer: true },
      { id: "u7-vide-grenier-q3", type: "short_answer", prompt: "Quand et où est le prochain vide-grenier ?", answer: "Dimanche, près de chez Marco." }
    ]
  },
  {
    id: "u7-livre-vivre-ensemble",
    unit: 7,
    unitTitle: "Chez moi !",
    source: "livre",
    section: "compréhension écrite",
    page: 108,
    title: "Vivre ensemble !",
    instruction: "Lisez le règlement de l'immeuble et répondez aux questions.",
    text: `RÈGLEMENT DE L'IMMEUBLE — 12 rue des Lilas\n\nPour vivre ensemble dans le respect :\n\n- Ne pas faire de bruit entre 22 h et 8 h.\n- Mettre les poubelles dans le local poubelles.\n- Les animaux sont acceptés mais ils ne doivent pas faire de bruit.\n- Les vélos doivent être dans le local vélos, pas dans les couloirs.\n- Respecter la propreté des parties communes (couloirs, ascenseur, cave).`,
    questions: [
      { id: "u7-vivre-q1", type: "multiple_choice", prompt: "Quel est le but de ce document ?", options: ["présenter l'immeuble", "respecter les règles", "décorer l'immeuble"], answer: "respecter les règles" },
      { id: "u7-vivre-q2", type: "matching", prompt: "Associez les règles aux dessins.", answer: "Pas de bruit 22h–8h / Poubelles dans le local / Animaux silencieux / Vélos dans le local / Propreté des parties communes" }
    ]
  },

  // ─── U8 Livre ─────────────────────────────────────────────────────────────
  {
    id: "u8-livre-forum-sante",
    unit: 8,
    unitTitle: "En forme !",
    source: "livre",
    section: "compréhension écrite",
    page: 116,
    title: "Forum Santé",
    instruction: "Lisez le forum de discussion et répondez aux questions.",
    text: `Forum santé — forum.sante.fr\n\nJonathan : Bonjour ! J'ai 40 ans, j'adore le sport mais j'ai souvent mal au dos. Je suis allé chez mon médecin, j'ai lu des articles, mais sans résultat. Je suis inquiet.\n\nVincent : Salut Jonathan ! Moi aussi j'ai eu mal au dos. Je suis allé chez un spécialiste. J'utilise l'application « Activ'Dos » pour faire des exercices à la maison. J'ai pu recommencer le jogging. Faire du sport, c'est agréable ! Je me sens bien !\n\nJonathan : J'adore le ski mais je ne peux plus skier. Je vais prendre rendez-vous chez un spécialiste du dos !\n\nSophie : Moi, j'ai des problèmes de sommeil. Je dors 4 heures par nuit. Je suis fatiguée et stressée.\n\nAnaïs : Moi aussi j'ai eu des problèmes de sommeil. J'ai utilisé l'application « Petit bambou ». J'ai appris à respirer et j'ai retrouvé le sommeil !\n\nSophie : Je suis contente pour toi ! Je vais tester la relaxation !`,
    questions: [
      { id: "u8-forum-q1", type: "open", prompt: "Est-ce que vous écrivez des messages sur des forums de discussion ? Sur quels thèmes ?" },
      { id: "u8-forum-q2", type: "short_answer", prompt: "Quel est le thème de ce forum de discussion ?", answer: "La santé / les problèmes de santé." },
      { id: "u8-forum-q3", type: "matching", prompt: "Associez : a. Jonathan — b. Sophie", answer: "a. Jonathan → parle de ses problèmes de dos\nb. Sophie → parle de ses problèmes de sommeil" },
      { id: "u8-forum-q4", type: "short_answer", prompt: "Quelle activité Jonathan aimerait recommencer ? Pourquoi ?", answer: "Le jogging / le ski. Parce qu'il adore le sport et se sent bien quand il fait du sport." },
      { id: "u8-forum-q5", type: "short_answer", prompt: "Que va faire Jonathan pour résoudre son problème ? Et Sophie ?", answer: "Jonathan va prendre rendez-vous chez un spécialiste du dos. Sophie va tester la relaxation." }
    ]
  },
  {
    id: "u8-livre-sport-bien-etre",
    unit: 8,
    unitTitle: "En forme !",
    source: "livre",
    section: "compréhension écrite",
    page: 122,
    title: "Sport et bien-être",
    instruction: "Lisez le règlement intérieur de la salle de sport et répondez aux questions.",
    text: `Espace forme et bien-être\nRèglement intérieur\n\nBienvenue ! Vous pouvez utiliser nos appareils, faire du sport avec un coach ou aller au sauna.\n\nPour des raisons de sécurité :\n• Il faut apprendre à utiliser les appareils.\n• Il faut éteindre les appareils après utilisation.\n• Ne pas laisser d'objets de valeur dans le vestiaire.\n\nPour des raisons d'hygiène :\n• Il faut apporter sa serviette de bain.\n• Il faut nettoyer les appareils après utilisation.\n• Il est interdit de marcher dans la salle avec des chaussures de la rue.\n• Il est interdit de manger dans la salle de sport.\n• Pour aller au sauna, il faut porter un maillot de bain et prendre une douche.\n\nPour la tranquillité de tous :\n• Ne pas utiliser son téléphone portable.\n• Il ne faut pas écouter de la musique fort.\n\nApportez votre certificat médical le premier cours.`,
    questions: [
      { id: "u8-sport-q1", type: "open", prompt: "Vous êtes sportifs ? Vous allez souvent dans une salle de sport ?" },
      { id: "u8-sport-q2", type: "short_answer", prompt: "Quel est le nom de la salle de sport ?", answer: "Espace forme et bien-être." },
      { id: "u8-sport-q3", type: "multiple_choice", prompt: "Ce document donne…", options: ["les règles à respecter dans la salle de sport", "des conseils pour pratiquer un sport dans la salle", "des informations pour s'inscrire dans la salle de sport"], answer: "les règles à respecter dans la salle de sport" },
      { id: "u8-sport-q4", type: "multi_select", prompt: "Qu'est-ce qui est interdit dans cette salle de sport ? (2 bonnes réponses)", options: ["nettoyer les appareils", "manger", "utiliser son téléphone"], answer: ["manger", "utiliser son téléphone"] },
      { id: "u8-sport-q5", type: "short_answer", prompt: "Pour le premier cours, quel document est demandé ?", answer: "Un certificat médical." }
    ]
  },
  {
    id: "u8-livre-bougez-quotidien",
    unit: 8,
    unitTitle: "En forme !",
    source: "livre",
    section: "compréhension écrite",
    page: 124,
    title: "Bougez au quotidien !",
    instruction: "Lisez les documents (infographie et message) et répondez aux questions.",
    text: `Document a — Calories dépensées selon l'activité\n\n0–150 kcal : jouer avec un animal (20 min), cuisiner (30 min), lire (1 h)\n150–300 kcal : faire de la trottinette (30 min), laver la voiture (1 h), faire le ménage (1 h)\n300–450 kcal : natation (30 min), yoga (1 h), course à pied (30 min)\n> 450 kcal : judo (1 h), tennis (1 h 30), musculation (1 h 30)\n\nDocument b — Message de Louise à son mari\n\nSurprise ! Tu veux perdre des calories… J'ai la solution : fais de la musculation 1 h 30 et tu perds 450 calories ! Ou fais 30 minutes de course à pied, c'est entre 300 et 450 calories. Mais tu peux aussi jardiner ou faire le ménage.\nÀ ce soir ! Louise`,
    questions: [
      { id: "u8-bougez-q1", type: "open", prompt: "À votre avis, combien de calories perd-on quand on fait une heure de yoga ? Vérifiez votre réponse dans le document a." },
      { id: "u8-bougez-q2", type: "short_answer", prompt: "Pour perdre entre 150 et 300 calories, quelles activités du quotidien peut-on faire ?", answer: "Faire de la trottinette (30 min), laver la voiture (1 h) ou faire le ménage (1 h)." },
      { id: "u8-bougez-q3", type: "short_answer", prompt: "Pourquoi Louise écrit ce message à son mari ?", answer: "Pour lui donner des conseils pour perdre des calories." },
      { id: "u8-bougez-q4", type: "short_answer", prompt: "Quelles activités Louise conseille à son mari ?", answer: "Faire de la musculation (1 h 30), la course à pied (30 min), jardiner ou faire le ménage." }
    ]
  },

  // ─── U9 Livre ─────────────────────────────────────────────────────────────
  {
    id: "u9-livre-idees-vacances",
    unit: 9,
    unitTitle: "Bonnes vacances !",
    source: "livre",
    section: "compréhension écrite",
    page: 130,
    title: "5 idées originales de vacances !",
    instruction: "Lisez l'article et répondez aux questions.",
    text: `5 idées originales de vacances !\n\n1. Les vacances à vélo\nVous êtes sportif/sportive ? Pensez aux vacances à vélo. C'est écologique ! La nuit, vous dormez dans un camping ou une chambre d'hôtes.\n\n2. Voyager en van\nVous détestez organiser vos vacances ? Avec un van, vous avez le transport et l'hébergement. Vous pouvez aller à la mer ou à la montagne.\n\n3. L'échange de maisons ou d'appartements\nVous voulez partir en vacances avec votre famille ? Échangez votre maison. C'est gratuit !\n\n4. Le wwoofing\nVous aimez la campagne et vous n'avez pas beaucoup d'argent ? Avec le wwoofing, vous travaillez dans une ferme biologique et vous dormez et mangez gratuitement.\n\n5. La micro-aventure\nVous êtes courageux/courageuse et vous adorez l'aventure ? Faites une expérience différente près de chez vous : sport extrême, nuit dans un igloo…`,
    questions: [
      { id: "u9-vacances-q1", type: "open", prompt: "Observez les photos. À votre avis, quel est le thème du document ?" },
      { id: "u9-vacances-q2", type: "short_answer", prompt: "Ce document propose quel type de vacances ?", answer: "Des idées originales / alternatives de vacances." },
      { id: "u9-vacances-q3a", type: "short_answer", prompt: "Situation : J'aime la campagne et je n'ai pas beaucoup d'argent.", answer: "Le wwoofing." },
      { id: "u9-vacances-q3b", type: "short_answer", prompt: "Situation : Je suis sportif/sportive et je n'ai pas de voiture.", answer: "Les vacances à vélo." },
      { id: "u9-vacances-q3c", type: "short_answer", prompt: "Situation : J'ai un appartement à Paris et je veux aller en vacances à la mer.", answer: "L'échange de maisons ou d'appartements." },
      { id: "u9-vacances-q3d", type: "short_answer", prompt: "Situation : J'aime vivre des moments exceptionnels.", answer: "La micro-aventure." },
      { id: "u9-vacances-q3e", type: "short_answer", prompt: "Situation : J'aime la mer et la montagne et je veux être libre.", answer: "Voyager en van." }
    ]
  },
  {
    id: "u9-livre-visitez-france",
    unit: 9,
    unitTitle: "Bonnes vacances !",
    source: "livre",
    section: "compréhension écrite",
    page: 136,
    title: "Visitez la France avec ses peintres !",
    instruction: "Lisez l'article et répondez aux questions.",
    text: `Visitez la France avec ses peintres !\n\n1. La Franche-Comté avec Gustave Courbet (1819–1877)\nGustave Courbet est né en Franche-Comté. Dans ses tableaux, il y a des rivières, des maisons et des forêts. C'est une belle région !\n\n2. La Provence avec Paul Cézanne (1839–1906)\nPaul Cézanne est né en Provence. On voit des arbres, des champs et la montagne Sainte-Victoire dans ses peintures. C'est un endroit parfait pour la randonnée !\n\n3. La Normandie avec Claude Monet (1840–1926)\nClaude Monet a habité plusieurs années en Normandie. On voit la plage et la mer dans ses tableaux. La mer est froide, mais c'est très joli !\n\n4. La région parisienne avec Berthe Morisot (1841–1895)\nBerthe Morisot a fait beaucoup de peintures de la campagne près de Paris. C'est agréable pour se promener !`,
    questions: [
      { id: "u9-peintres-q1", type: "open", prompt: "Vous connaissez des peintres français ?" },
      { id: "u9-peintres-q2", type: "multiple_choice", prompt: "Que propose ce document ?", options: ["Une exposition de peinture", "La découverte des régions de peintres célèbres", "Des livres sur des peintres"], answer: "La découverte des régions de peintres célèbres" },
      { id: "u9-peintres-q3", type: "matching", prompt: "Qui a peint la Provence ? la Normandie ? la région parisienne ? la Franche-Comté ?", answer: "Provence → Paul Cézanne\nNormandie → Claude Monet\nRégion parisienne → Berthe Morisot\nFranche-Comté → Gustave Courbet" },
      { id: "u9-peintres-q4", type: "short_answer", prompt: "Dans quelle région peut-on aller pour marcher dans la montagne ? Pour voir la mer ?", answer: "La Provence pour la montagne (randonnée). La Normandie pour voir la mer." }
    ]
  },
  {
    id: "u9-livre-bonjour-marseille",
    unit: 9,
    unitTitle: "Bonnes vacances !",
    source: "livre",
    section: "compréhension écrite",
    page: 138,
    title: "Bonjour de Marseille !",
    instruction: "Lisez la carte postale et répondez aux questions.",
    text: `Salut Mehdi !\n\nJe suis en vacances chez des amis à Marseille. C'est génial ! Je vais à la plage, je me baigne dans les Calanques et je bronze !\n\nHier, il ne faisait pas beau. Il y avait des nuages. Alors, j'ai visité le Mucem. C'était très intéressant !\n\nAujourd'hui, j'ai pris le bateau. J'ai visité le château d'If. Tu sais, c'est la prison du « Comte de Monte-Cristo », le roman d'Alexandre Dumas. Il se trouve sur une île à 4 kilomètres de Marseille.\n\nEt demain, je vais faire une randonnée à cheval avec mes amis pour découvrir la Provence.\n\nÀ bientôt,\nCarole`,
    questions: [
      { id: "u9-marseille-q1", type: "open", prompt: "Regardez la carte postale. Qu'est-ce que vous voyez ?" },
      { id: "u9-marseille-q2", type: "short_answer", prompt: "Qui écrit ? À qui ?", answer: "Carole écrit à Mehdi." },
      { id: "u9-marseille-q3", type: "short_answer", prompt: "Où Carole passe-t-elle ses vacances ?", answer: "À Marseille." },
      { id: "u9-marseille-q4", type: "short_answer", prompt: "Quelles activités Carole fait tous les jours ? A fait hier ? Va faire demain ?", answer: "Tous les jours : va à la plage, se baigne, bronze. Hier : a visité le Mucem et le château d'If. Demain : randonnée à cheval." },
      { id: "u9-marseille-q5", type: "short_answer", prompt: "Pourquoi Carole a visité le Mucem ?", answer: "Il faisait mauvais temps et c'était très intéressant." }
    ]
  },

  // ─── U10 Livre ────────────────────────────────────────────────────────────
  {
    id: "u10-livre-etudiants-ambassadeurs",
    unit: 10,
    unitTitle: "Au travail !",
    source: "livre",
    section: "compréhension écrite",
    page: 144,
    title: "Rencontrez les étudiants ambassadeurs !",
    instruction: "Lisez l'article et répondez aux questions.",
    text: `Futur étudiant à l'université ?\n\nVous allez commencer des études supérieures et vous hésitez entre plusieurs formations ? Contactez les étudiants ambassadeurs. Ils sont là pour vous !\n\nNoam et Leslie font des études différentes. Noam étudie à Toulouse et Leslie étudie à Montpellier. Ils sont tous les deux étudiants ambassadeurs de leur université. Leur mission ? Ils vous écoutent et répondent à vos questions. Ils vous informent et vous aident à choisir votre formation.\n\n« Les futurs étudiants nous interrogent sur beaucoup de sujets. Quels métiers on peut faire après ces études ? Combien il y a d'heures de cours par semaine ? Comment est le restaurant universitaire ? » explique Noam, étudiant en master d'économie.\n\nPour contacter les étudiants ambassadeurs, allez sur Parcoursup ou demandez au secrétariat de votre future université.`,
    questions: [
      { id: "u10-ambassadeurs-q1", type: "open", prompt: "Regardez l'affiche. À votre avis, qui sont ces personnes ?" },
      { id: "u10-ambassadeurs-q2", type: "matching", prompt: "Associez : a. Cet article s'adresse à… — b. Noam et Leslie sont…", answer: "a. → des futurs étudiants\nb. → des étudiants ambassadeurs" },
      { id: "u10-ambassadeurs-q3", type: "short_answer", prompt: "Quelle est la mission des étudiants ambassadeurs ?", answer: "Écouter et répondre aux questions des futurs étudiants ; les informer et les aider à choisir leur formation." },
      { id: "u10-ambassadeurs-q4", type: "short_answer", prompt: "Quelles questions les futurs étudiants peuvent poser ?", answer: "Sur les métiers possibles après les études, le nombre d'heures de cours, le restaurant universitaire…" },
      { id: "u10-ambassadeurs-q5", type: "short_answer", prompt: "Comment les futurs étudiants peuvent contacter les étudiants ambassadeurs ?", answer: "Sur Parcoursup ou au secrétariat de leur future université." }
    ]
  },
  {
    id: "u10-livre-exposition-hexagone",
    unit: 10,
    unitTitle: "Au travail !",
    source: "livre",
    section: "compréhension écrite",
    page: 150,
    title: "L'exposition Hexagone",
    instruction: "Lisez l'article et répondez aux questions.",
    text: `L'exposition Hexagone\n\nÉric Bouvet et Yan Morvan sont photographes et journalistes. Pendant deux ans, de 2018 à 2020, ils ont voyagé en France pour interviewer et photographier des Françaises et des Français.\n\nAvec les interviews, ils ont fait 80 photographies qui montrent les Français d'aujourd'hui. L'exposition Hexagone présente ces photographies dans deux gares de France : la gare de Lyon à Paris et la gare d'Avignon-TGV. À côté de chaque photographie, un petit texte présente la personne photographiée.\n\nElsa — comédienne et danseuse\n« Je suis artiste. C'est un métier que j'adore mais c'est difficile : j'ai un rythme très différent du rythme des autres Français. »\n\nHana — informaticienne\n« Je suis née en Algérie et je suis arrivée en France à 2 ans. La France est un pays qui change mais qui garde aussi ses traditions. »\n\nCyril — chauffeur\n« Je travaille comme chauffeur. J'ai créé mon entreprise de transport. Être indépendant, c'est une chose que j'aime. Je n'ai pas de chef. »`,
    questions: [
      { id: "u10-hexagone-q1", type: "open", prompt: "Vous prenez souvent des photos ? Qu'est-ce que vous photographiez ?" },
      { id: "u10-hexagone-q2a", type: "true_false", prompt: "L'exposition Hexagone présente des Françaises et des Français.", answer: true },
      { id: "u10-hexagone-q2b", type: "true_false", prompt: "Il y a 70 photos dans l'exposition.", answer: false },
      { id: "u10-hexagone-q2c", type: "true_false", prompt: "Il y a des photos et des présentations des personnes photographiées.", answer: true },
      { id: "u10-hexagone-q3", type: "short_answer", prompt: "Où est-ce qu'on peut voir cette exposition ?", answer: "Dans deux gares : la gare de Lyon à Paris et la gare d'Avignon-TGV." },
      { id: "u10-hexagone-q4", type: "short_answer", prompt: "Qu'est-ce qu'Elsa, l'artiste, trouve difficile dans son travail ?", answer: "Elle a un rythme très différent des autres Français." },
      { id: "u10-hexagone-q5", type: "short_answer", prompt: "Qu'est-ce que Hana, l'informaticienne, pense de la France ?", answer: "C'est un pays qui change mais qui garde aussi ses traditions." },
      { id: "u10-hexagone-q6", type: "short_answer", prompt: "Qu'est-ce que Cyril, le chauffeur, aime dans son travail ?", answer: "Être indépendant et ne pas avoir de chef." }
    ]
  }
];

export const getReadingsByUnit = (unit) =>
  editoA1ReadingComprehension.filter((activity) => activity.unit === unit);

export default editoA1ReadingComprehension;
