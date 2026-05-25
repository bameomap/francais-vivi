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
    text: `Festival International de la Bande Dessinée d'Angoulême — 47e édition — 30 janvier > 2 février 2020 — bdangouleme.com\n\nQuelques auteur(e)s en compétition...\n\nCharles Burns — Il est né le 27 septembre 1955 à Washington, aux États-Unis. Il habite à Philadelphie, aux États-Unis.\n\nAkiko Higashimura — Elle est née et elle habite à Miyazaki, au Japon.\n\nIgnacio Minaverry — Il est né en Argentine en 1978. Il habite à La Plata, en Argentine.\n\nIsabelle Pralong — Elle est née à Sion, en Suisse. Elle habite à Genève, en Suisse.`,
    questions: [
      { id: "u1-angouleme-q1", type: "open", prompt: "Vous connaissez le Festival d'Angoulême ?" },
      { id: "u1-angouleme-q2", type: "multiple_choice", prompt: "C'est un festival de :", options: ["musique", "cinéma", "bande dessinée"], answer: "bande dessinée" },
      { id: "u1-angouleme-q3", type: "multiple_choice", prompt: "Où est né Charles Burns ? Où est-ce qu'il habite ?", options: ["Il est né au Japon et il habite en France.", "Il est né et il habite aux États-Unis.", "Il est né en Argentine et il habite en Suisse."], answer: "Il est né et il habite aux États-Unis." },
      { id: "u1-angouleme-q4", type: "matching", prompt: "Associez les auteurs à leur nationalité.", answer: "Akiko Higashimura → japonaise\nIgnacio Minaverry → argentin\nIsabelle Pralong → suisse" }
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
    text: `[Chat Milo / Lina]\nMilo : Salut Lina ! Ça va ?\nLina : Salut Milo ! Oui, très bien et toi ? Tu habites où ?\nMilo : Ça va bien ! Je suis à Lyon maintenant, à l'université Lumière.\nLina : C'est super ! Et tu habites dans un quartier sympa ?\nMilo : Oui, dans le quartier Saint-Jean. C'est très sympa !\nLina : C'est beau ! Moi, j'habite à Nice !\nMilo : Oh ! C'est bien ! À Nice, il y a la mer, la plage. Et tu habites où à Nice ?\nLina : J'habite un appartement avec des amies, Mira et Julie. On habite dans une rue calme. C'est la rue Mantega.\nMilo : Elles sont super les photos ! Ah ! Vous avez une guitare ?\nLina : Deux guitares ! Et un piano. Ce sont les instruments de musique de Julie et de Mira.`,
    questions: [
      { id: "u2-tu-habites-q1", type: "open", prompt: "Observez le document. Qu'est-ce que c'est ?" },
      { id: "u2-tu-habites-q2", type: "short_answer", prompt: "Qui écrit à qui ?", answer: "Milo écrit à Lina." },
      { id: "u2-tu-habites-q3", type: "matching", prompt: "Associez les personnes aux villes.", answer: "Lina → Nice\nMilo → Lyon" },
      { id: "u2-tu-habites-q4", type: "short_answer", prompt: "Pourquoi Milo aime le quartier Saint-Jean ?", answer: "C'est très sympa !" },
      { id: "u2-tu-habites-q5", type: "short_answer", prompt: "Lina habite avec qui ?", answer: "Avec des amies, Mira et Julie." },
      { id: "u2-tu-habites-q6", type: "short_answer", prompt: "Lina a un instrument de musique ?", answer: "Non, les guitares et le piano appartiennent à Julie et Mira." }
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
    text: `[Chat Nina / Théo]\nNina : Théo, je prépare la liste des invités pour notre mariage. Moi, j'invite mes parents, ma grand-mère, mon frère (chez lui, ils sont quatre : lui, sa femme et ses enfants). Et toi ?\nThéo : Moi, j'invite mes parents, ma tante Olivia, mon oncle Paul, mes grands-parents, mon cousin Raphaël et ma cousine Clara, son fils et sa fille.\nNina : Ta cousine Clara est libre ?\nThéo : Oui !\nNina : Super !\nThéo : Ah oui ! Je n'ai pas de frères et sœurs, je suis fils unique, alors mes cousins, c'est important pour moi !\nNina : Oui ! Et mon neveu et ma nièce adorent les enfants de Clara ! Et pour les amis ? On invite qui ?\nThéo : Sofia, son mari et leurs enfants. Et Nessim, le frère de Sofia ! C'est aussi mon ami.\nNina : Il est marié ?\nThéo : Non, il est célibataire.\nNina : Ok ! Il y a aussi nos amis Robin et Aya. Et monsieur Bertoli, l'ami de mon père ? Il est grand-père maintenant ! Son petit-fils a 2 mois !\nThéo : Non… On invite NOS amis !`,
    questions: [
      { id: "u2-inviter-q1", type: "open", prompt: "À votre avis, qui sont Nina et Théo ?" },
      { id: "u2-inviter-q2", type: "short_answer", prompt: "Qu'est-ce que Nina prépare ?", answer: "La liste des invités pour leur mariage." },
      { id: "u2-inviter-q3a", type: "true_false", prompt: "Théo invite son oncle Paul.", answer: true },
      { id: "u2-inviter-q3b", type: "true_false", prompt: "Théo n'invite pas sa cousine.", answer: false },
      { id: "u2-inviter-q3c", type: "true_false", prompt: "Le frère de Nina est marié.", answer: true },
      { id: "u2-inviter-q3d", type: "true_false", prompt: "Sofia, l'amie de Théo, a des enfants.", answer: true }
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
    text: `mon-panier-local.fr\n[Accueil | Les paniers bio | Les produits bio | Nos magasins | Contact]\n\nNous proposons des paniers bio avec des fruits, des légumes et des produits de saison.\n\nFormule 1 : Le panier avec des fruits et des légumes — 16,90 €\nFormule 2 : Le panier complet avec des fruits et des légumes, un poulet, six œufs et un fromage de chèvre — 39,40 €\n\nVos commentaires :\nAmélie Deniaud ★★★★★ : J'achète un panier par semaine, les produits sont frais et c'est 100 % local !\nStéphane Petit ★★★★★ : Nous achetons un panier complet par semaine. Les produits sont bio. Et c'est très facile !\n\nVoici les fruits et les légumes de la semaine du 9 au 15 juillet : des fraises, des pêches, des cerises, des abricots, des tomates, une salade, des poivrons, des courgettes, des pommes de terre, des haricots verts.\n\nLes paniers sont disponibles le vendredi : Laure Fleuriste, 8, rue Jean Jaurès.`,
    questions: [
      { id: "u3-panier-q1", type: "open", prompt: "Regardez le document. Qu'est-ce que c'est ?" },
      { id: "u3-panier-q2a", type: "true_false", prompt: "Le document propose des produits bio.", answer: true },
      { id: "u3-panier-q2b", type: "true_false", prompt: "Le document propose trois formules différentes.", answer: false },
      { id: "u3-panier-q3", type: "short_answer", prompt: "Quelles différences il y a entre les formules ?", answer: "Formule 1 : panier fruits et légumes (16,90 €). Formule 2 : panier complet avec poulet, six œufs et fromage de chèvre (39,40 €)." },
      { id: "u3-panier-q4", type: "short_answer", prompt: "Quel jour les paniers sont disponibles à « Laure Fleuriste » ?", answer: "Le vendredi." },
      { id: "u3-panier-q5", type: "short_answer", prompt: "Les avis clients sont positifs ou négatifs ? Pourquoi ?", answer: "Positifs. Les produits sont frais, bio et locaux." }
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
    text: `Document a — Infographie : Les commerces de quartier préférés des Français\n90 % → la boulangerie\n70 % → la boucherie\n69 % → l'épicerie\n59 % → la poissonnerie\n51 % → la fromagerie\n\nDocument b — Texte\nEn France, on aime faire ses courses chez les commerçants de son quartier. On achète le pain, la baguette ou les croissants à la boulangerie. Pour le poisson, on va chez le poissonnier, pour la viande, on va à la boucherie. On achète le fromage chez le fromager. Le week-end, les Français aiment aller au marché. Pour les autres produits, par exemple, le beurre, les pâtes, le riz, les Français vont à l'épicerie ou au supermarché. Il y a du monde aux caisses des supermarchés mais c'est pratique !`,
    questions: [
      { id: "u3-courses-q1", type: "open", prompt: "Regardez le document a. Quels commerces vous connaissez ?" },
      { id: "u3-courses-q2", type: "multiple_choice", prompt: "Quel commerce est le plus important pour les Français ?", options: ["la boucherie", "la boulangerie", "la poissonnerie"], answer: "la boulangerie" },
      { id: "u3-courses-q3", type: "true_false", prompt: "Les Français aiment faire leurs courses dans les commerces de leur quartier.", answer: true },
      { id: "u3-courses-q4", type: "short_answer", prompt: "Où les Français font-ils leurs courses le samedi ou le dimanche ?", answer: "Au marché." },
      { id: "u3-courses-q5", type: "short_answer", prompt: "Quels produits les Français achètent à l'épicerie ou au supermarché ?", answer: "Le beurre, les pâtes, le riz, etc." }
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
    text: `Picknick Restaurant [Page Facebook]\n14, rue Fantin-Latour, 38000 Grenoble\nDes produits bio de saison\n\nPicknick Restaurant, mercredi, à 10:00 :\nSalut les gourmands !\nAujourd'hui, les plats du jour du chef (12 €) :\n• magret de canard, mangue et riz sauvage,\n• pâtes fraîches aux 4 fromages et crème de poivrons.\nEt les desserts du jour (5,50 €) :\n• gâteau au chocolat,\n• tarte aux pommes.\nSur place ou à emporter !\n\nCommentaires :\nAssia : « Merci Nicolas ! J'adore ta cuisine ! J'aime tes entrées, tes plats, tes desserts ! C'est délicieux ! »\nFabien : « Mes enfants n'aiment pas le poisson, ils détestent ça mais au Picknick Restaurant, ils commandent du poisson et ils mangent aussi un peu de légumes ! Merci Nico ! »\nClaire : « Je mange le jeudi au Picknick mais aujourd'hui il y a des pâtes aux 4 fromages, hum ! J'arrive ! C'est bon, c'est sûr ! »\nSohan : « Moi, j'aime cuisiner pour ma famille et mes amis. La cuisine des restaurants ? Non ! Ça n'a pas de goût ou c'est mauvais mais au Picknick Restaurant, c'est pas mal. »`,
    questions: [
      { id: "u3-plat-q1", type: "open", prompt: "Observez le document. Qu'est-ce que c'est ?" },
      { id: "u3-plat-q2", type: "short_answer", prompt: "Combien de plats du jour et de desserts le chef propose aujourd'hui ?", answer: "2 plats du jour et 2 desserts." },
      { id: "u3-plat-q3", type: "short_answer", prompt: "Combien coûtent un plat du jour et un dessert ?", answer: "Un plat du jour coûte 12 € et un dessert coûte 5,50 €." },
      { id: "u3-plat-q4", type: "short_answer", prompt: "Les clients aiment les plats et le restaurant ? Pourquoi ?", answer: "Oui, globalement. Assia adore la cuisine. Fabien dit que ses enfants commandent du poisson grâce au restaurant. Claire aime les pâtes aux 4 fromages. Sohan dit que c'est « pas mal »." }
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
    text: `grenoble-tourisme.com [Office de Tourisme Grenoble-Alpes Métropole]\n\nÀ Grenoble, au mois de juin, il y a le « Street Art Fest Grenoble-Alpes ». C'est un festival avec des artistes nationaux et internationaux, Snek par exemple. C'est un artiste, il est grenoblois.\n\nDans les quartiers de la ville, au centre-ville et en banlieue, les artistes font des fresques sur les bâtiments. Ils travaillent dans les rues, sur les boulevards et les avenues. Ils utilisent des techniques différentes. Les habitants et les touristes regardent les artistes créer. Le festival propose un programme riche pour découvrir des artistes et leurs pratiques. C'est une expérience unique.\n\nL'Office de Tourisme organise des visites guidées. C'est une visite d'1 heure (6 €) ou d'1 heure 30 (9 €).\n\nOffice de Tourisme Grenoble-Alpes Métropole — 14 rue de la République, 38000 Grenoble`,
    questions: [
      { id: "u4-artistes-q1", type: "open", prompt: "Regardez les photos. Qu'est-ce que vous voyez ?" },
      { id: "u4-artistes-q2", type: "short_answer", prompt: "L'Office de tourisme présente quel événement ?", answer: "Le Street Art Fest Grenoble-Alpes." },
      { id: "u4-artistes-q3", type: "short_answer", prompt: "Où et quand se passe l'événement ?", answer: "À Grenoble, au mois de juin." },
      { id: "u4-artistes-q4a", type: "true_false", prompt: "Tous les artistes sont français.", answer: false },
      { id: "u4-artistes-q4b", type: "true_false", prompt: "Les artistes travaillent et les gens regardent.", answer: true },
      { id: "u4-artistes-q4c", type: "true_false", prompt: "Il y a des visites guidées des fresques.", answer: true }
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
    text: `Au Luxembourg, les transports en commun sont gratuits !\n\nLes tramways, les bus et les trains sont maintenant gratuits au Luxembourg pour les habitants et pour les touristes.\n\nC'est une mesure écologique : il y a beaucoup de voitures et de pollution dans le pays. C'est aussi une mesure sociale : 40 % des Luxembourgeois utilisent les transports en commun.\n\nAllez travailler, faites vos courses ou visitez la ville… Se déplacer au Luxembourg, c'est simple avec les transports en commun : montez dans le bus ou dans le tram et n'achetez pas de ticket, n'achetez pas de carte de transport ! Économisez de l'argent ! « C'est fantastique ! On économise 25 euros par mois ! », dit une Luxembourgeoise.\n\nC'est une bonne nouvelle pour vous, amis touristes ! Vous prenez les transports en commun pour visiter le pays ou la ville. Par exemple, pour aller du centre-ville au musée d'Art moderne en tram, prenez la ligne T1, descendez à l'arrêt « Philharmonie », c'est rapide ! Marchez 5 minutes et vous êtes au musée !`,
    questions: [
      { id: "u4-bus-q1", type: "multiple_choice", prompt: "Regardez le document. Qu'est-ce que c'est ?", options: ["un article de journal", "un blog"], answer: "un article de journal" },
      { id: "u4-bus-q2", type: "short_answer", prompt: "De quel pays on parle dans le document ?", answer: "Le Luxembourg." },
      { id: "u4-bus-q3", type: "short_answer", prompt: "Pour qui les transports en commun sont-ils gratuits ?", answer: "Pour les habitants et pour les touristes." },
      { id: "u4-bus-q4", type: "multi_select", prompt: "Pourquoi les transports en commun sont-ils gratuits ? (2 réponses)", options: ["Les gens utilisent souvent leur voiture et il y a beaucoup de pollution.", "C'est simple pour les touristes.", "Pour 40 % des utilisateurs, ce sont des économies importantes."], answer: ["Les gens utilisent souvent leur voiture et il y a beaucoup de pollution.", "Pour 40 % des utilisateurs, ce sont des économies importantes."] },
      { id: "u4-bus-q5", type: "short_answer", prompt: "Avec les transports en commun, c'est possible de faire quelles activités ?", answer: "Aller travailler, faire des courses, visiter la ville, visiter le pays (ex : aller au musée d'Art moderne en tram, ligne T1)." }
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
    text: `[Infographie : Pour les trajets courts]\nMarche : 0-1 km\nTrottinette : 1-2 km\nVélo : 2-5 km\nVélo électrique : 5-10 km\n[Pour les trajets longs] : Tram + Bus (transports en commun)\n\nMixez les moyens de transport !\n\nLes français utilisent leur voiture parce que c'est pratique. Mais la voiture coûte 5 000 €/an au minimum et elle n'est pas écologique. Comment se déplacer sans polluer et sans payer cher ?\n\nPour faire 1 km, marchez ! Pour faire 2 km, utilisez la trottinette et pour faire entre 2 et 10 km, prenez votre vélo.\n\nPour aller plus loin, sans voiture, prenez le métro, le bus ou le tram !\n\nEt pour faire 30 km et plus, la solution, c'est le covoiturage ! Voyagez avec d'autres personnes !\n\nBien sûr, c'est possible de mixer les moyens de transport. Allez à vélo jusqu'à une station de métro, et après, prenez le bus ou la voiture !`,
    questions: [
      { id: "u4-metro-q1", type: "open", prompt: "Est-ce que vous marchez beaucoup ? Combien de kilomètres par jour ?" },
      { id: "u4-metro-q2a", type: "true_false", prompt: "L'image présente les moyens de transport pour les trajets courts.", answer: true },
      { id: "u4-metro-q2b", type: "true_false", prompt: "Le texte propose des solutions économiques et écologiques pour se déplacer.", answer: true },
      { id: "u4-metro-q3", type: "matching", prompt: "Complétez le tableau : associez chaque distance à un moyen de transport.", answer: "1 km → marche (à pied)\n2 km → trottinette\n2-10 km → vélo\n> 30 km → covoiturage" }
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
    text: `Olivia — La mode et moi [Blog]\nAccueil | Style | Conseils | Mode | Beauté | Contact\n\nAujourd'hui, je parle de… Vinted\nQu'est-ce que c'est ? C'est une application pour acheter ou vendre des vêtements et des accessoires d'occasion. Génial, non ?\n\nMoi, j'achète beaucoup de vêtements sur Vinted : des jeans, des jupes, des robes, des tee-shirts ! C'est facile et ce n'est pas cher ! Par exemple, le prix de ma robe noire et de ma jupe bleue : 5 €. Elles sont simples, mais elles sont élégantes ! Le prix de mon pantalon blanc, 7 € et ma veste en cuir… 50 € ! C'est bon marché !\n\nMon frère achète aussi ses vêtements sur Vinted : des chemises, des shorts, des pulls, des costumes et des cravates. Il adore la mode et les styles différents. Un jour, il porte un jean bleu ou un jean noir avec un tee-shirt en coton et des baskets. Un jour, il met un costume élégant. Avec mon frère, nous aimons acheter sur Vinted, mais nous vendons aussi beaucoup. Nous mettons nos vêtements 5 ou 6 mois et après on change !\n\nDonc, avec l'application, on achète et on ne vend pas cher…\n\nAu fait ! Sur Vinted, il y a aussi des accessoires : des chaussures, des ceintures, des lunettes de soleil, des sacs à main et des bijoux !`,
    questions: [
      { id: "u5-mode-q1", type: "open", prompt: "Regardez le document. À votre avis, qu'est-ce que c'est ?" },
      { id: "u5-mode-q2", type: "short_answer", prompt: "De quelle application parle Olivia ?", answer: "Vinted." },
      { id: "u5-mode-q3a", type: "true_false", prompt: "Sur l'application, on trouve des vêtements et des accessoires d'occasion.", answer: true },
      { id: "u5-mode-q3b", type: "true_false", prompt: "Sur l'application, on achète mais on ne vend pas.", answer: false },
      { id: "u5-mode-q3c", type: "true_false", prompt: "Sur l'application, on ne trouve pas de vêtements pour homme.", answer: false },
      { id: "u5-mode-q4", type: "short_answer", prompt: "Pourquoi Olivia et son frère utilisent beaucoup l'application ?", answer: "C'est facile, ce n'est pas cher, et ils achètent ET vendent leurs vêtements. Ils changent de vêtements après 5 ou 6 mois." }
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
    text: `leetchi.com\n\nBienvenue sur la cagnotte « Anniversaire de Valentin »\n\nC'est bientôt l'anniversaire de Valentin ! Il va avoir 30 ans. Vous êtes d'accord pour acheter un cadeau ensemble ? Si oui, participez ! Il adore le tennis et les objets high-tech, alors, voilà mes idées pour le cadeau :\n• un grand sac de sport ou un sac à dos pour son ordinateur portable ;\n• une jolie tenue pour le tennis ;\n• une petite enceinte Bluetooth pour écouter de la musique ;\n• une montre connectée ;\n• des écouteurs sans fil ;\n• une tablette ;\n• une batterie externe pour son smartphone.\n\nJ'aime beaucoup la montre connectée ! Et il y a des montres bleues, sa couleur préférée. C'est très utile, ça sert à téléphoner, à se repérer avec le GPS, à se connecter à Internet. Ou vous préférez un autre cadeau ? J'attends vos réponses ou vos idées ! Merci !\n\nColine\nOrganisateur : Garnier Coline`,
    questions: [
      { id: "u5-cagnotte-q1", type: "short_answer", prompt: "Regardez le document. Pour quel événement il y a une cagnotte en ligne ?", answer: "Pour l'anniversaire de Valentin (ses 30 ans)." },
      { id: "u5-cagnotte-q2", type: "true_false", prompt: "La cagnotte en ligne, c'est pour acheter un cadeau à Valentin pour ses 30 ans.", answer: true },
      { id: "u5-cagnotte-q3", type: "short_answer", prompt: "Qu'est-ce que Valentin aime ?", answer: "Le tennis et les objets high-tech." },
      { id: "u5-cagnotte-q4", type: "multiple_choice", prompt: "Coline :", options: ["propose des idées de cadeaux", "préfère acheter un GPS"], answer: "propose des idées de cadeaux" },
      { id: "u5-cagnotte-q5", type: "short_answer", prompt: "À quoi sert une montre connectée ?", answer: "Ça sert à téléphoner, à se repérer avec le GPS, à se connecter à Internet." }
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
    text: `Personnalisez vos objets !\n\nTout le monde a un porte-monnaie, un porte-clés, un téléphone portable, des cadres photo… Mais ces objets ne sont pas uniques. Alors aujourd'hui, les gens personnalisent leurs objets, c'est à la mode !\n\nCette coque de téléphone avec la photo de votre chat est originale, ce sac à dos avec le prénom de votre enfant aussi cet étui pour tablette. C'est possible de personnaliser des objets petits ou grands, lourds ou légers, carrés, ronds ou rectangulaires… et des objets de marques aussi, par exemple des portefeuilles ou des valises. Personnaliser les objets du quotidien est original et pratique !`,
    questions: [
      { id: "u5-objets-q1", type: "open", prompt: "Regardez les photos du document. Quels objets vous connaissez ?" },
      { id: "u5-objets-q2", type: "true_false", prompt: "Un objet personnalisé est un objet unique.", answer: true },
      { id: "u5-objets-q3", type: "short_answer", prompt: "Est-ce que les objets personnalisés ont du succès ?", answer: "Oui, c'est à la mode ! Les gens personnalisent beaucoup leurs objets." },
      { id: "u5-objets-q4", type: "multi_select", prompt: "Les objets présentés dans l'article sont personnalisés avec :", options: ["une photo", "une couleur", "un prénom"], answer: ["une photo", "un prénom"] },
      { id: "u5-objets-q5", type: "true_false", prompt: "Les grandes marques proposent aussi des objets personnalisés.", answer: true }
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
    text: `Une journée avec Mathilde Boulesteix !\n\n« Bonjour, je m'appelle Mathilde Boulesteix. Je suis journaliste sportive à Trek TV. C'est une chaîne de télévision française. Je travaille pour l'émission "Le Spot". Elle présente des sports de montagne, par exemple, le vélo (VTT) en été et le ski en hiver. Voici ma journée ! »\n\n6 h 30 : Je me réveille, j'écoute la radio et je bois un café. Avec mon chien, Léon, nous allons au lac d'Annecy. On aime se promener le matin. C'est calme.\n\n8 h : Je rentre à la maison. Je me douche et je me prépare. Je m'habille : je mets des vêtements de montagne pour mon travail. Je me coiffe et je me maquille. Mon mari se lève, se douche et se rase et nous prenons notre petit déjeuner : des œufs, du pain, du beurre et encore du café !\n\n9 h : Je commence à travailler à la maison. J'organise mes futures émissions. J'utilise beaucoup mon ordinateur !\n\n12 h 30 : Je retrouve Romain, mon collègue. Il est cameraman. Nous mangeons ensemble et nous discutons de notre travail.\n\n14 h : L'après-midi, nous allons voir une compétition sportive. Nous interviewons un sportif. Je pose les questions et Romain filme. À 18 h 30, nous arrêtons de travailler et nous rentrons.\n\n19 h : Je suis à la maison. J'aime lire des livres, écouter de la musique, surfer sur Internet ou faire du bricolage. Mais souvent, je fais du sport. Je fais du jogging.\n\n20 h : C'est l'heure du dîner ! Mon mari fait la cuisine. Je fais la vaisselle. Le soir, nous aimons regarder la télévision ou aller au cinéma. On adore les comédies et les films policiers. Le week-end, nous aimons aussi voir des amis.\n\n22 h 30 : Je me brosse les dents et je me couche. Mon mari et moi, nous ne nous couchons pas à la même heure. Il aime travailler le soir (et jouer à des jeux vidéo !). Il se couche vers minuit. Moi, je préfère travailler le matin !`,
    questions: [
      { id: "u6-journee-q1", type: "open", prompt: "Observez la photo et le titre de l'article. De qui on parle ?" },
      { id: "u6-journee-q2a", type: "true_false", prompt: "Mathilde est journaliste sportive à la radio.", answer: false },
      { id: "u6-journee-q2b", type: "true_false", prompt: "Elle travaille avec Romain.", answer: true },
      { id: "u6-journee-q2c", type: "true_false", prompt: "Elle commence le travail à 8 h et finit à 18 h.", answer: false },
      { id: "u6-journee-q2d", type: "true_false", prompt: "Le soir, elle est avec son mari.", answer: true },
      { id: "u6-journee-q3", type: "short_answer", prompt: "Quel type de sports Mathilde présente dans son émission ?", answer: "Des sports de montagne (le vélo VTT en été et le ski en hiver)." },
      { id: "u6-journee-q4", type: "short_answer", prompt: "Le matin, elle travaille où ?", answer: "À la maison." },
      { id: "u6-journee-q5", type: "short_answer", prompt: "Qu'est-ce que Mathilde et Romain font l'après-midi ?", answer: "Ils vont voir une compétition sportive. Mathilde pose les questions et Romain filme." },
      { id: "u6-journee-q6", type: "short_answer", prompt: "Pourquoi Mathilde et son mari ne se couchent pas à la même heure ?", answer: "Son mari aime travailler le soir et jouer à des jeux vidéo (il se couche vers minuit). Mathilde préfère travailler le matin et se couche à 22h30." }
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
    text: `Tous les lundis, découvrez quatre héros de bande dessinée ! Aujourd'hui : la BD francophone.\n\nPersonnage : Paul\nAuteur : Michel Rabagliati | Pays : Canada (Québec)\nHistoire : C'est la vie de Paul. Il habite à Montréal. Il a une fille et il est auteur de bandes dessinées. Paul est un homme gentil et calme. Il a une vie simple. Il s'occupe de sa mère malade et de sa fille.\n\nPersonnage : Joséphine\nAuteure : Pénélope Bagieu | Pays : France\nHistoire : C'est la vie de Joséphine. Elle habite à Paris. Elle a 30 ans. Elle est célibataire. Elle a un chat. Il s'appelle Bradpitt. Elle est sympathique et drôle. Elle fait beaucoup de sorties avec ses amis, Cyril et Rose. Ils parlent beaucoup parce qu'ils sont bavards !\n\nPersonnage : Aya de Yopougon\nAuteurs : Marguerite Abouet et Clément Oubrerie | Pays : Côte d'Ivoire et France\nHistoire : C'est la vie d'Aya. Elle a 19 ans. Elle habite à Abidjan. Elle est étudiante et veut être médecin. Elle est généreuse : elle fait beaucoup de choses pour ses amies. Elle est sérieuse et elle est parfois stressée.\n\nPersonnage : Lucky Luke\nAuteurs : Morris / Jul, Achdé | Pays : Belgique\nHistoire : C'est la vie de Lucky Luke. Il est en Amérique. Il a un cheval intelligent, Jolly Jumper. Il met des personnes méchantes en prison. Il se promène dans l'ouest de l'Amérique. Il aime l'aventure. C'est un cow-boy gentil et courageux.`,
    questions: [
      { id: "u6-lecture-q1", type: "open", prompt: "Observez le document. Qu'est-ce que vous voyez ?" },
      { id: "u6-lecture-q2", type: "short_answer", prompt: "Quelle est l'origine de ces BD francophones ?", answer: "Paul est canadien (Québec). Joséphine est française. Aya de Yopougon est franco-ivoirienne. Lucky Luke est belge." },
      { id: "u6-lecture-q3a", type: "short_answer", prompt: "Quel personnage (Paul, Aya, Joséphine ou Lucky Luke) a un enfant ?", answer: "Paul." },
      { id: "u6-lecture-q3b", type: "short_answer", prompt: "Quel personnage est en Amérique et met des méchants en prison ?", answer: "Lucky Luke." },
      { id: "u6-lecture-q3c", type: "short_answer", prompt: "Quel personnage aime sortir avec ses amis ?", answer: "Joséphine." },
      { id: "u6-lecture-q3d", type: "short_answer", prompt: "Quel personnage étudie ?", answer: "Aya." },
      { id: "u6-lecture-q4", type: "short_answer", prompt: "Quelle profession veut faire Aya ?", answer: "Elle veut être médecin." }
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
    text: `CINÉ CASTING [http://www.quefaire.be/]\n\nPour notre film, L'anniversaire, nous cherchons 4 acteurs.\n\nArthur (23 ans) : il a la moustache et les yeux marron. Il est drôle et sociable. Il aime faire la fête avec ses amis. Il sort souvent !\n\nMarion (24 ans) : elle est petite et elle a les cheveux courts. Elle est sympa et bavarde. Elle travaille tard et elle ne dort pas beaucoup.\n\nPatrick, le père d'Arthur (50 ans) : il est mince et il a les cheveux gris. Il est calme, sérieux et timide. Il aime rester à la maison avec son gros chien.\n\nMartine, la mère d'Arthur (50 ans) : elle a les cheveux roux et frisés. Elle est dynamique et généreuse. Elle part souvent en week-end sans son mari.\n\nHistoire : Arthur et ses parents sortent pour fêter l'anniversaire d'Arthur. Ils vont au restaurant. Ils rencontrent Marion, la serveuse, et une aventure étrange commence !\n\nCasting : le 12 et le 13 février\nEnvoyez votre photo à cette adresse : anniversaire@gmail.com`,
    questions: [
      { id: "u6-casting-q1", type: "open", prompt: "Il y a un casting pour un film dans votre ville. Vous vous présentez ?" },
      { id: "u6-casting-q2", type: "short_answer", prompt: "Quel est le titre du film ?", answer: "L'anniversaire." },
      { id: "u6-casting-q3", type: "short_answer", prompt: "Où les quatre personnages se rencontrent-ils dans le film ?", answer: "Au restaurant." },
      { id: "u6-casting-q4", type: "short_answer", prompt: "Comment participer au casting ?", answer: "Envoyer sa photo à anniversaire@gmail.com. Le casting a lieu le 12 et le 13 février." },
      { id: "u6-casting-q5", type: "matching", prompt: "Associez les personnages à leurs descriptions physiques.", answer: "Arthur (23 ans) → moustache, yeux marron\nMarion (24 ans) → petite, cheveux courts\nPatrick (50 ans) → mince, cheveux gris\nMartine (50 ans) → cheveux roux et frisés" }
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
    text: `[Chat Marco / David]\nMarco : Salut David ! On est au vide-grenier avec Ophélie. On a acheté une cuisinière et un four à micro-ondes !\nDavid : Vous avez trouvé des meubles ?\nMarco : Oui, un bureau et deux fauteuils. Et pas cher. Mais on n'a pas trouvé de lit.\nDavid : Vous cherchez un lit ? Il y a peut-être un autre vide-grenier ?\nMarco : Oui ! Dimanche, près de chez nous ! On cherche aussi une armoire et des objets de décoration !`,
    questions: [
      { id: "u7-vide-grenier-q1", type: "open", prompt: "Regardez l'affiche du vide-grenier. Qu'est-ce que vous voyez ?" },
      { id: "u7-vide-grenier-q2", type: "short_answer", prompt: "Marco est avec qui ?", answer: "Avec Ophélie." },
      { id: "u7-vide-grenier-q3a", type: "true_false", prompt: "Ils n'ont pas acheté d'appareils électroménagers.", answer: false },
      { id: "u7-vide-grenier-q3b", type: "true_false", prompt: "Les meubles sont bon marché.", answer: true },
      { id: "u7-vide-grenier-q4", type: "short_answer", prompt: "Quand et où est le prochain vide-grenier ?", answer: "Dimanche, près de chez eux." }
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
    text: `RÈGLEMENT\n\n1. Merci de fermer la porte d'entrée.\n2. Il est interdit de faire des barbecues (dans les jardins et sur les balcons).\n3. Attention au bruit (chez vous, mais aussi dans le hall ou les escaliers) ! Respectez vos voisins !\n4. Interdiction de fumer ou de vapoter dans l'ascenseur et dans les parties communes de l'immeuble.\n5. Tenir les chiens en laisse.\n6. Défense de marcher sur la pelouse de la résidence.\n7. Ne pas laisser votre vélo dans les couloirs.\n8. Prière de trier vos déchets.`,
    questions: [
      { id: "u7-vivre-q1", type: "open", prompt: "Regardez les documents. Qu'est-ce que vous voyez ?" },
      { id: "u7-vivre-q2", type: "short_answer", prompt: "À quoi sert le document b (le règlement) ?", answer: "À respecter les règles de l'immeuble / à expliquer ce qu'il faut faire ou ne pas faire." },
      { id: "u7-vivre-q3", type: "matching", prompt: "Associez les règles du règlement aux dessins.", answer: "Fermer la porte / Pas de barbecue / Attention au bruit / Pas de fumée / Chiens en laisse / Ne pas marcher sur la pelouse / Pas de vélo dans les couloirs / Trier les déchets" }
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
    text: `Document a — Les activités sportives et du quotidien (calories dépensées)\n\nLes activités sportives :\n0 à 150 kcal : Corde à sauter (20 min), Marche rapide (30 min), Yoga (1 h)\n150 à 300 kcal : Natation (30 min), Gymnastique (1 h 30), Course à pied (30 min)\n300 à 450 kcal : Judo (1 h), Volley/rugby (1 match), Tennis (1 h 30), Musculation (1 h 30)\n\nLes activités du quotidien :\n0 à 150 kcal : Jouer avec un animal (20 min), Cuisiner (30 min), Lire (1 h)\n150 à 300 kcal : Faire de la trottinette (30 min), Laver la voiture (1 h), Faire le ménage (1 h)\n300 à 450 kcal : Jardiner (1 h 30)\n\nDocument b — Message de Louise à son mari\n\nSurprise ! Tu veux perdre des calories… J'ai la solution : faire de l'activité physique. Regarde ! Tu peux faire 1 h 30 de musculation et tu perds 450 calories. Ou fais 30 minutes de course à pied, c'est entre 300 et 450 calories. Mais tu peux aussi jardiner ou… faire le ménage.\nÀ ce soir ! Louise`,
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
    text: `5 idées originales de vacances !\n\n1. Les vacances à vélo\nVous êtes sportif/sportive ? Pensez aux vacances à vélo. C'est plus écologique que l'avion ou la voiture. La nuit, vous dormez sous une tente dans un camping ou dans une chambre d'hôtes. Mais la météo peut être un problème.\n\n2. Voyager en van\nVous détestez organiser vos vacances ? Vous aimez être indépendant(e) ? Avec un van, vous avez le transport et l'hébergement. Vous pouvez aller à la mer ou à la montagne. C'est très pratique !\n\n3. L'échange de maisons ou d'appartements\nVous voulez partir en vacances avec votre famille ? Vous pouvez échanger votre maison ou votre appartement. Vous vivez dans le logement d'une autre famille et cette famille vit chez vous. Ces logements sont aussi confortables que des locations, mais ils sont gratuits !\n\n4. Le wwoofing\nVous aimez la campagne et vous n'avez pas beaucoup d'argent ? Avec le wwoofing, vous travaillez quatre heures par jour dans une ferme biologique et vous y dormez et mangez gratuitement. C'est possible de « wwoofer » dans beaucoup de pays !\n\n5. La micro-aventure\nVous êtes courageux/courageuse et vous adorez l'aventure ? Choisissez la micro-aventure et faites une expérience différente près de chez vous. Sport extrême, nuit dans un igloo : vivez quelques heures extraordinaires !`,
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
    text: `Visitez la France avec ses peintres !\n\n1. La Franche-Comté avec Gustave Courbet (1819–1877)\nGustave Courbet est né en Franche-Comté. À 20 ans, il est allé à Paris, mais il est revenu dans cette région à 30 ans. Sur ce tableau, il y a une rivière, des maisons et de l'herbe verte. Avec ses forêts et sa nature, c'est une belle région !\n\n2. La Provence avec Paul Cézanne (1839–1906)\nPaul Cézanne est né en Provence. Après ses études, il est parti à Paris, mais il est souvent retourné dans sa région. Sur cette peinture, on voit des arbres, des champs et la montagne Sainte-Victoire. C'est un endroit parfait pour la randonnée !\n\n3. La Normandie avec Claude Monet (1840–1926)\nClaude Monet a habité plusieurs années en Normandie. Il est mort dans un petit village normand, Giverny. Sur ce tableau, on voit un chemin, des fleurs, la plage et la mer. En Normandie, la mer est froide, mais c'est très joli !\n\n4. La région parisienne avec Berthe Morisot (1841–1895)\nBerthe Morisot a fait beaucoup de peintures de la campagne près de Paris. Ici, c'est un lac dans le bois de Boulogne. Deux femmes font du bateau. Il y a aussi deux canards. Ce bois est très agréable pour se promener !`,
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
    text: `Salut Mehdi !\n\nJe suis en vacances chez des amis à Marseille. C'est génial ! Je vais à la plage, je me baigne dans les Calanques et je bronze !\n\nHier, il ne faisait pas beau. Il y avait des nuages. Ce n'est pas normal à Marseille ! Alors, j'ai visité le Mucem. C'était très intéressant !\n\nAujourd'hui, j'ai pris le bateau. J'ai visité le château d'If. Tu sais, c'est la prison du « Comte de Monte-Cristo », le roman d'Alexandre Dumas. Il se trouve sur une île à 4 kilomètres de Marseille.\n\nEt demain, je vais faire une randonnée à cheval avec mes amis pour découvrir la Provence. On va pique-niquer, je suis très contente !\n\nÀ bientôt,\nCarole`,
    questions: [
      { id: "u9-marseille-q1", type: "open", prompt: "Regardez la carte postale. Qu'est-ce que vous voyez ?" },
      { id: "u9-marseille-q2", type: "short_answer", prompt: "Qui écrit ? À qui ?", answer: "Carole écrit à Mehdi." },
      { id: "u9-marseille-q3", type: "short_answer", prompt: "Où Carole passe-t-elle ses vacances ?", answer: "À Marseille." },
      { id: "u9-marseille-q4", type: "short_answer", prompt: "Quelles activités Carole fait tous les jours ? A fait hier ? A fait aujourd'hui ? Va faire demain ?", answer: "Tous les jours : va à la plage, se baigne, bronze. Hier : a visité le Mucem. Aujourd'hui : a pris le bateau, a visité le château d'If. Demain : randonnée à cheval, pique-nique." },
      { id: "u9-marseille-q5", type: "short_answer", prompt: "Pourquoi Carole a visité le Mucem ?", answer: "Parce qu'il ne faisait pas beau (il y avait des nuages)." }
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
    text: `Vous allez commencer des études supérieures et vous hésitez entre plusieurs formations ? Contactez les étudiants ambassadeurs. Ils sont là pour vous !\n\nNoam et Leslie font des études différentes. Noam étudie à Toulouse et Leslie étudie à Montpellier. Ils sont tous les deux étudiants ambassadeurs de leur université. Leur mission ? Ils vous écoutent et répondent à vos questions. Ils vous informent et vous aident à choisir votre formation.\n\n« Les futurs étudiants nous interrogent sur beaucoup de sujets. Quels métiers on peut faire après ces études ? Combien il y a d'heures de cours par semaine ? Comment est le restaurant universitaire ? Et nous avons souvent la réponse parce que nous sommes étudiants. » explique Noam, étudiant ambassadeur en master d'économie à l'université Toulouse 1 Capitole.\n\n« Pour choisir mes études, j'ai discuté avec beaucoup d'étudiants de sciences, de mathématiques et d'informatique. Nous avons parlé des cours et de l'université. C'était très intéressant. Maintenant, je fais la même chose avec les futurs étudiants ! » raconte Leslie, étudiante en troisième année de licence de mathématiques à Montpellier.\n\nPour contacter les étudiants ambassadeurs, allez sur Parcoursup ou demandez au secrétariat de votre future université.`,
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
    text: `L'exposition Hexagone\n\nÉric Bouvet et Yan Morvan sont photographes et journalistes. Pendant deux ans, de 2018 à 2020, ils ont voyagé en France pour interviewer et photographier des Françaises et des Français.\n\nAvec les interviews, ils ont fait 80 photographies qui montrent les Français d'aujourd'hui. Il y a, par exemple, une libraire, un policier, un boucher, un agriculteur, une fleuriste, etc. L'exposition Hexagone présente ces photographies dans deux gares de France : la gare de Lyon à Paris et la gare d'Avignon-TGV. À côté de chaque photographie, un petit texte présente la personne photographiée.\n\nElsa — comédienne et danseuse\n« Je suis comédienne et danseuse. En France ou à l'étranger, je change souvent de ville pour mon travail. Je suis artiste. C'est un métier que j'adore mais, parfois, c'est difficile : j'ai un rythme très différent du rythme des autres Français. »\n\nHana — informaticienne\n« Je suis née en Algérie et je suis arrivée en France à 2 ans. Je suis informaticienne. La France est un pays qui change mais qui garde aussi ses traditions. »\n\nCyril — chauffeur\n« Je travaille comme chauffeur. J'ai créé mon entreprise de transport de personnes. Être indépendant, c'est une chose que j'aime. Je n'ai pas de chef, pas de directeur. Je rêve de développer cette entreprise ! »`,
    questions: [
      { id: "u10-hexagone-q1", type: "open", prompt: "Vous prenez souvent des photos ? Qu'est-ce que vous photographiez ?" },
      { id: "u10-hexagone-q2a", type: "true_false", prompt: "L'exposition Hexagone présente des Françaises et des Français.", answer: true },
      { id: "u10-hexagone-q2b", type: "true_false", prompt: "Il y a 70 photos dans l'exposition.", answer: false },
      { id: "u10-hexagone-q2c", type: "true_false", prompt: "Il y a des photos et des présentations des personnes photographiées.", answer: true },
      { id: "u10-hexagone-q3", type: "short_answer", prompt: "Où est-ce qu'on peut voir cette exposition ?", answer: "Dans deux gares : la gare de Lyon à Paris et la gare d'Avignon-TGV." },
      { id: "u10-hexagone-q4", type: "short_answer", prompt: "Qu'est-ce qu'Elsa, l'artiste, trouve difficile dans son travail ?", answer: "Elle a un rythme très différent des autres Français." },
      { id: "u10-hexagone-q5", type: "short_answer", prompt: "Qu'est-ce que Hana, l'informaticienne, pense de la France ?", answer: "C'est un pays qui change mais qui garde aussi ses traditions." },
      { id: "u10-hexagone-q6", type: "short_answer", prompt: "Qu'est-ce que Cyril, le chauffeur, aime dans son travail ?", answer: "Être indépendant, ne pas avoir de chef (pas de directeur). Il rêve de développer son entreprise." }
    ]
  }
];

export const getReadingsByUnit = (unit) =>
  editoA1ReadingComprehension.filter((activity) => activity.unit === unit);

export default editoA1ReadingComprehension;
