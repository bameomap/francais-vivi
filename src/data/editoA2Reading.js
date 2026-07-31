// Édito A2 — compréhension écrite (real texts from the book).
// Same shape as editoA1ReadingComprehension.js so LectureEditoPanel can render
// either list through its `readings` prop.
//
// Question types supported by the panel:
//   true_false | multiple_choice | multi_select  → auto-scored
//   short_answer | matching                      → reveal the answer
//   open                                         → free discussion, no answer

const editoA2ReadingComprehension = [

  // ── B · Une histoire d'amour comme au cinéma (p. 15) ──────────────
  {
    id: "b1-livre-histoire-amour",
    unit: 1,
    unitTitle: "Nouvelles vies",
    source: "livre",
    section: "compréhension écrite",
    page: 15,
    title: "Une histoire d'amour comme au cinéma",
    instruction: "Lisez l'article sur Leïla Bekhti et Tahar Rahim, puis répondez aux questions. Repérez tous les verbes au passé composé.",
    text: `Leïla Bekhti, l'actrice de la comédie française culte Tout ce qui brille, a raconté dans un long entretien avec le magazine Paris Match sa rencontre avec son mari, Tahar Rahim.

Leur coup de foudre
Les deux acteurs ont fait connaissance en 2008 sur le tournage du film de Jacques Audiard Un Prophète. Immédiatement, il y a eu une connexion entre eux, mais ils ont choisi de rester professionnels et de prendre leur temps. Ils ont rejoué ensemble dans la série Netflix The Eddy.

Leur vie de famille
Ils se sont mariés deux ans après leur rencontre. Et, encore une fois, ils ont pris leur temps avant d'agrandir la famille. Leur premier enfant Souleymane est né en 2017. Ils ont ensuite accueilli une petite fille en 2020. Ils ont eu leur troisième enfant en 2021, mais ils n'ont pas voulu dire son prénom aux médias.
À propos de Leïla Bekhti, Tahar Rahim a déclaré dans une interview avec le magazine Elle : « Je l'aime comme un fou. C'est ma femme, mon amour, ma meilleure amie. » C'est un couple de stars uni et très discret.

Julia DURANTON, Cosmopolitan, 24 juin 2021
(un coup de foudre = un amour immédiat, à la première rencontre)`,
    questions: [
      { id: "b1-amour-q1", type: "open", prompt: "Connaissez-vous ces deux acteurs ? Avez-vous vu un de leurs films ?" },
      { id: "b1-amour-q2", type: "multiple_choice", prompt: "Quelle est la profession de Leïla Bekhti et de Tahar Rahim ?", options: ["Ils sont chanteurs.", "Ils sont acteurs.", "Ils sont scénaristes."], answer: "Ils sont acteurs." },
      { id: "b1-amour-q3", type: "multiple_choice", prompt: "Où se sont-ils rencontrés ?", options: ["Sur le tournage du film Un Prophète.", "Dans la série The Eddy.", "À une interview de Paris Match."], answer: "Sur le tournage du film Un Prophète." },
      { id: "b1-amour-q4", type: "multiple_choice", prompt: "Combien d'enfants ont-ils ?", options: ["Un.", "Deux.", "Trois."], answer: "Trois." },
      { id: "b1-amour-q5", type: "true_false", prompt: "Vrai ou faux ? Leïla et Tahar ont joué ensemble une seule fois.", answer: false },
      { id: "b1-amour-q6", type: "short_answer", prompt: "Justifiez votre réponse avec une phrase du texte.", answer: "« Ils ont rejoué ensemble dans la série Netflix The Eddy. » — ils ont donc joué ensemble au moins deux fois." },
      { id: "b1-amour-q7", type: "true_false", prompt: "Vrai ou faux ? Tahar Rahim est très amoureux de sa femme.", answer: true },
      { id: "b1-amour-q8", type: "short_answer", prompt: "Justifiez votre réponse avec une phrase du texte.", answer: "« Je l'aime comme un fou. C'est ma femme, mon amour, ma meilleure amie. »" },
      { id: "b1-amour-q9", type: "short_answer", prompt: "Vocabulaire : trouvez dans le texte une expression qui signifie « ne pas aller trop vite ».", answer: "prendre son temps (« ils ont choisi de … prendre leur temps »)" },
      { id: "b1-amour-q10", type: "multi_select", prompt: "Quels verbes du texte se conjuguent avec ÊTRE au passé composé ?", options: ["se marier", "faire connaissance", "naître", "choisir", "avoir"], answer: ["se marier", "naître"] },
      { id: "b1-amour-q11", type: "open", prompt: "Production écrite : racontez l'histoire d'un couple célèbre de votre pays." },
    ],
  },

  // ── D · Vacances en famille (p. 18) ───────────────────────────────
  {
    id: "b1-livre-vacances-famille",
    unit: 1,
    unitTitle: "Nouvelles vies",
    source: "livre",
    section: "compréhension écrite",
    page: 18,
    title: "Vacances en famille",
    instruction: "Lisez l'article et repérez les quatre activités proposées, puis répondez aux questions.",
    text: `Ça y est, c'est les vacances ! Tout est prêt, vous n'avez rien oublié ? C'est l'occasion de faire des sorties et, pourquoi pas, du sport ensemble. Mais faire du sport en famille, ce n'est jamais simple : il faut trouver une activité pour tout le monde. Voici quelques idées d'activités sportives à pratiquer en famille cet été.

Le canoë-kayak
C'est l'activité familiale idéale quand il fait beau. Entre loisir nautique et véritable sport, vous pouvez faire une balade de plusieurs heures sur une rivière ou un fleuve, voir des paysages superbes et profiter de l'eau fraîche.

Le stand-up paddle
C'est la star des sports d'eau en famille. Ce sport simple et accessible est très agréable pour s'amuser tous ensemble. Il faut juste tenir debout sur une planche et pagayer !

Le vélo
Si votre famille n'aime pas trop les sports aquatiques, il y a l'option vélo ! En plus d'offrir un moment en plein air au milieu de beaux paysages, le vélo est un bon moyen de rester en bonne santé.

La via ferrata
C'est l'aventure familiale parfaite ! Entre randonnée et escalade, cette activité sportive permet de découvrir d'une autre manière la montagne et la nature. Du matériel de sécurité est présent sur tout le parcours et permet aux plus petits de monter sans problème.

CVIFS Toulouse, 8 juillet 2020`,
    questions: [
      { id: "b1-vacances-q1", type: "open", prompt: "À votre avis, quelles activités peut-on faire pendant des vacances en famille ?" },
      { id: "b1-vacances-q2", type: "multi_select", prompt: "Parmi les activités proposées, quels sont les sports d'eau ?", options: ["Le canoë-kayak", "Le stand-up paddle", "Le vélo", "La via ferrata"], answer: ["Le canoë-kayak", "Le stand-up paddle"] },
      { id: "b1-vacances-q3", type: "short_answer", prompt: "Où peut-on faire les deux autres activités ?", answer: "Le vélo : en plein air, au milieu de beaux paysages. La via ferrata : à la montagne, dans la nature." },
      { id: "b1-vacances-q4", type: "matching", prompt: "Trouvez un avantage pour chaque activité.", answer: "Le canoë-kayak → voir des paysages superbes et profiter de l'eau fraîche\nLe stand-up paddle → simple, accessible, agréable pour s'amuser tous ensemble\nLe vélo → un moment en plein air, un bon moyen de rester en bonne santé\nLa via ferrata → découvrir la montagne autrement, sûr même pour les plus petits" },
      { id: "b1-vacances-q5", type: "true_false", prompt: "Vrai ou faux ? Selon l'article, faire du sport en famille est toujours facile.", answer: false },
      { id: "b1-vacances-q6", type: "short_answer", prompt: "Relevez dans le texte une phrase à la forme négative avec « rien » et une avec « jamais ».", answer: "« Vous n'avez rien oublié ? » — « Ce n'est jamais simple. »" },
      { id: "b1-vacances-q7", type: "open", prompt: "Production orale : proposez une autre activité à faire pendant les vacances, et dites pourquoi elle est bien." },
    ],
  },

  // ── H · J'ai participé aux Jeux de la Francophonie (p. 22) ────────
  {
    id: "b1-livre-jeux-francophonie",
    unit: 1,
    unitTitle: "Nouvelles vies",
    source: "livre",
    section: "compréhension écrite",
    page: 22,
    title: "J'ai participé aux Jeux de la Francophonie",
    instruction: "Lisez l'interview de Pascale Stöcklin et répondez aux questions.",
    text: `La parole à Pascale Stöcklin (Suisse) : médaille d'or en athlétisme féminin (saut à la perche) en 2017, aux VIIIes Jeux de la Francophonie, à Abidjan, en Côte d'Ivoire.

— Présentez-vous.
J'ai 22 ans et j'habite dans une jolie ville qui s'appelle Bâle, au nord de la Suisse. Ces dernières années, le saut à la perche est devenu indispensable pour moi dans ma vie. J'ai fait ma première compétition il y a onze ans.

— Que représentent les Jeux de la Francophonie, selon vous ?
Pour moi, les jeux représentent la collectivité. Tout le monde parle la même langue, même si nous venons tous de pays différents.

— Pourquoi vous avez décidé de participer aux Jeux de la Francophonie ?
J'ai décidé de participer aux Jeux de la Francophonie pour faire des expériences nouvelles, dans un autre pays, avec une autre culture.

— Avez-vous échangé avec des personnes venues d'autres États et gouvernements ?
Oui, pendant deux semaines j'ai fait la connaissance de beaucoup d'athlètes de divers pays. Ils sont tous très ouverts.

— Quels conseils donnez-vous aux prochains participants aux Jeux ?
Entraînez-vous bien, restez ouverts et faites des expériences uniques.

— Un mot à la jeunesse francophone ?
Si on ne rêve pas, on n'avance pas.

CIJF, 21 mai 2019`,
    questions: [
      { id: "b1-jeux-q1", type: "multiple_choice", prompt: "Regardez la photo. Comment s'appelle ce sport ?", options: ["Le judo", "L'escalade", "Le saut à la perche"], answer: "Le saut à la perche" },
      { id: "b1-jeux-q2", type: "multiple_choice", prompt: "Pascale Stöcklin a représenté quel pays aux Jeux de la Francophonie ?", options: ["La France", "La Suisse", "La Côte d'Ivoire"], answer: "La Suisse" },
      { id: "b1-jeux-q3", type: "short_answer", prompt: "Où et quand a-t-elle participé aux Jeux de la Francophonie ? Est-ce qu'elle a gagné ?", answer: "À Abidjan, en Côte d'Ivoire, en 2017. Oui : elle a gagné la médaille d'or." },
      { id: "b1-jeux-q4", type: "short_answer", prompt: "De quelle ville vient Pascale Stöcklin ?", answer: "De Bâle, une ville au nord de la Suisse." },
      { id: "b1-jeux-q5", type: "short_answer", prompt: "Qu'est-ce que Pascale Stöcklin pense des autres participants ?", answer: "Elle les trouve très ouverts : « Ils sont tous très ouverts. »" },
      { id: "b1-jeux-q6", type: "multiple_choice", prompt: "Vocabulaire : que signifie « entraînez-vous » ?", options: ["Préparez-vous.", "Relaxez-vous."], answer: "Préparez-vous." },
      { id: "b1-jeux-q7", type: "multiple_choice", prompt: "« J'ai fait ma première compétition il y a onze ans. » — que veut dire « il y a » ici ?", options: ["Le point de départ d'une action qui continue.", "Le temps passé entre un événement terminé et maintenant.", "La durée d'une action."], answer: "Le temps passé entre un événement terminé et maintenant." },
      { id: "b1-jeux-q8", type: "multiple_choice", prompt: "« Pendant deux semaines, j'ai fait la connaissance de beaucoup d'athlètes. » — « pendant » exprime :", options: ["La durée de l'action.", "Le point de départ de l'action.", "La distance dans le passé."], answer: "La durée de l'action." },
      { id: "b1-jeux-q9", type: "open", prompt: "Production écrite DELF (50 mots minimum) : avez-vous déjà participé à une compétition sportive ou artistique ? Si oui, racontez votre expérience. Si non, racontez celle d'une personne que vous connaissez." },
    ],
  },

  // ── I · Envie de sortir ? (p. 23) ─────────────────────────────────
  {
    id: "b1-livre-envie-de-sortir",
    unit: 1,
    unitTitle: "Nouvelles vies",
    source: "livre",
    section: "compréhension écrite",
    page: 23,
    title: "Envie de sortir ?",
    instruction: "Lisez le dialogue entre Julie et Sarah et répondez aux questions. Repérez les expressions pour proposer, accepter et refuser.",
    text: `— Julie : T'as vu, les places pour les Francofolies sont en vente depuis hier. Ça te dit ?
— Sarah : Ah oui, avec plaisir ! Tu veux y aller quand ?
— Julie : Tu es libre le 9 juillet ? Il y a plein de concerts sympas.
— Sarah : Je suis désolée, ce n'est pas possible, j'ai un rendez-vous de travail. Mais le 10 juillet la programmation est cool aussi. Ça te va ?
— Julie : OK, ça me va ! On se retrouve chez moi ce soir pour réserver nos places ? À 19 h, c'est bon pour toi ?
— Sarah : Je m'excuse, mais je ne peux pas. Je sors du travail à 19 h 30. À 20 h, c'est possible ?
— Julie : D'accord, ça marche. À ce soir !`,
    questions: [
      { id: "b1-sortir-q1", type: "multiple_choice", prompt: "D'après la photo, les Francofolies de La Rochelle sont :", options: ["un festival de musique", "un monument historique", "une compétition sportive"], answer: "un festival de musique" },
      { id: "b1-sortir-q2", type: "short_answer", prompt: "Qu'est-ce que Julie propose à Sarah ?", answer: "D'aller ensemble au festival des Francofolies — les places sont en vente depuis hier." },
      { id: "b1-sortir-q3", type: "true_false", prompt: "Vrai ou faux ? Sarah accepte la proposition de Julie.", answer: true },
      { id: "b1-sortir-q4", type: "multiple_choice", prompt: "Finalement, quel jour vont-elles au festival ?", options: ["Le 9 juillet", "Le 10 juillet", "Ce soir"], answer: "Le 10 juillet" },
      { id: "b1-sortir-q5", type: "short_answer", prompt: "Où, quand et pourquoi se donnent-elles rendez-vous ?", answer: "Chez Julie, ce soir à 20 h, pour réserver leurs places." },
      { id: "b1-sortir-q6", type: "short_answer", prompt: "Pourquoi Sarah refuse-t-elle le 9 juillet, puis 19 h ?", answer: "Le 9 juillet elle a un rendez-vous de travail ; à 19 h elle n'est pas libre, elle sort du travail à 19 h 30." },
      { id: "b1-sortir-q7", type: "multi_select", prompt: "Quelles expressions servent à ACCEPTER une proposition ?", options: ["Avec plaisir !", "Ça marche !", "Je m'excuse, mais je ne peux pas.", "OK, ça me va !", "Ce n'est pas possible."], answer: ["Avec plaisir !", "Ça marche !", "OK, ça me va !"] },
      { id: "b1-sortir-q8", type: "multi_select", prompt: "Quelles expressions servent à PROPOSER ou à vérifier que ça convient ?", options: ["Ça te dit ?", "Tu es libre le 9 juillet ?", "Ça te va ?", "Je suis désolée.", "C'est bon pour toi ?"], answer: ["Ça te dit ?", "Tu es libre le 9 juillet ?", "Ça te va ?", "C'est bon pour toi ?"] },
      { id: "b1-sortir-q9", type: "multiple_choice", prompt: "« Les places sont en vente depuis hier. » — « depuis » indique :", options: ["la durée de la vente", "le point de départ d'une action qui continue maintenant", "un moment terminé dans le passé"], answer: "le point de départ d'une action qui continue maintenant" },
      { id: "b1-sortir-q10", type: "open", prompt: "Production orale DELF : à deux ! Proposez une sortie à votre partenaire, discutez pour trouver une activité et fixez un rendez-vous." },
    ],
  },

  // ── F · Les Journées du patrimoine (Culture(s), p. 20) ────────────
  {
    id: "b1-livre-journees-patrimoine",
    unit: 1,
    unitTitle: "Nouvelles vies",
    source: "livre",
    section: "culture(s)",
    page: 20,
    title: "Les Journées du patrimoine",
    instruction: "Lisez l'article sur les Journées du patrimoine en Île-de-France et répondez aux questions.",
    text: `Chaque année, les Journées du Patrimoine sont le bon plan de la rentrée culturelle : la découverte des plus beaux trésors de France. Cette année, à Paris et en Île-de-France, de nombreux musées, monuments, théâtres, châteaux et autres lieux culturels ouvrent leurs portes gratuitement et proposent de belles animations, visites guidées et expositions. En famille, entre amis, en couple ou en solitaire, cet évènement culturel est incontournable. Tout le monde y trouve son bonheur !

Le Cirque d'hiver Bouglione
Pour la 38e édition des Journées du Patrimoine, les amateurs de spectacles se donnent rendez-vous au Cirque d'hiver Bouglione. C'est le plus ancien cirque en activité du monde. Au programme : une visite guidée inédite pour découvrir les coulisses du cirque !

Le Panthéon
Le Panthéon participe aux Journées du Patrimoine 2021 et ouvre ses portes. En plus de la visite gratuite de ce monument destiné aux Grands Hommes, une projection en plein air vous attend sur les façades du Panthéon.

Le château de Fontainebleau
Le château de Fontainebleau participe bien aux Journées du Patrimoine. Cette année, en plus de la visite des grands appartements du Château, on peut apprendre le jeu de paume et rencontrer les artisans qui s'occupent du lieu !

Sources : Cécile D. & My B., Sortir à Paris, septembre 2021
(un bon plan = une bonne idée ; les coulisses = la partie cachée derrière la scène ; une façade = un mur extérieur)`,
    questions: [
      { id: "b1-patrimoine-q1", type: "open", prompt: "D'après les images, que peut-on visiter pendant les Journées du patrimoine ?" },
      { id: "b1-patrimoine-q2", type: "true_false", prompt: "Vrai ou faux ? Pendant les Journées du patrimoine, les visites ne sont pas payantes.", answer: true },
      { id: "b1-patrimoine-q3", type: "true_false", prompt: "Vrai ou faux ? Les Journées du patrimoine s'adressent seulement aux familles.", answer: false },
      { id: "b1-patrimoine-q4", type: "matching", prompt: "Quelles activités peut-on faire dans chaque lieu ?", answer: "Le Cirque d'hiver Bouglione → une visite guidée inédite des coulisses du cirque\nLe Panthéon → la visite gratuite du monument + une projection en plein air sur les façades\nLe château de Fontainebleau → la visite des grands appartements, apprendre le jeu de paume, rencontrer les artisans" },
      { id: "b1-patrimoine-q5", type: "multiple_choice", prompt: "Vocabulaire : que signifie « un trésor » ?", options: ["Une activité amusante.", "Une richesse cachée."], answer: "Une richesse cachée." },
      { id: "b1-patrimoine-q6", type: "multiple_choice", prompt: "Vocabulaire : que signifie « inédit » ?", options: ["Nouveau.", "Drôle."], answer: "Nouveau." },
      { id: "b1-patrimoine-q7", type: "open", prompt: "Que pensez-vous de cet événement ? Est-ce qu'il y a des Journées du patrimoine dans votre pays ?" },
      { id: "b1-patrimoine-q8", type: "open", prompt: "Oh, le cliché ! « Les Français sont fiers de Paris. » En réalité, les deux monuments préférés des Français (le mont Saint-Michel et le château de Versailles) ne sont pas dans la capitale. De quoi sont fiers les gens dans votre pays ?" },
    ],
  },
];

export default editoA2ReadingComprehension;
