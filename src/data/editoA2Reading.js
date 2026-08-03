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

  // ═══════════════════ Unité 2 — Je me souviens ═══════════════════

  // ── A · Saveurs de Corse (p. 27) ───────────────────────────────────
  {
    id: "b2-livre-saveurs-corse",
    unit: 2,
    unitTitle: "Je me souviens",
    source: "livre",
    section: "compréhension écrite",
    page: 27,
    title: "Saveurs de Corse",
    instruction: "Lisez le témoignage de Lisandra et repérez tous les verbes à l'imparfait.",
    text: `Lisandra se souvient de la maison de ses grands-parents, en Corse. « C'était d'abord des souvenirs de cuisine. Ma grand-mère préparait des confitures de figues et d'abricots, et toute la maison sentait bon pendant des heures. Le matin, je mangeais mes tartines à côté d'elle, et parfois je lui demandais de tremper mon pain dans son café. Elle répondait toujours : "D'accord, mais juste pour goûter !"

Le soir, avec mon frère, on s'asseyait devant la cheminée et on mangeait des beignets tout chauds — on appelait ça des "frappes", en Corse.

Mais ce que je n'oublie pas, c'est le jardin. Mon grand-père y faisait du feu presque tous les soirs, et on écoutait le chant des oiseaux jusqu'à la nuit. Puis on s'allongeait dans l'herbe pour regarder les étoiles. Il me montrait la Grande Ourse et me disait de faire un vœu à chaque étoile filante.

Aujourd'hui encore, une odeur de confiture ou un feu de bois me ramène directement à ce jardin. »`,
    questions: [
      { id: "b2-corse-q1", type: "open", prompt: "Quel lieu lié à votre enfance est très important pour vous ? Pourquoi ?" },
      { id: "b2-corse-q2", type: "multiple_choice", prompt: "De quel lieu Lisandra parle-t-elle ?", options: ["De son école en Corse.", "De la maison de ses grands-parents en Corse.", "D'un restaurant corse."], answer: "De la maison de ses grands-parents en Corse." },
      { id: "b2-corse-q3", type: "multiple_choice", prompt: "De ce lieu, Lisandra a gardé :", options: ["de bons souvenirs.", "de mauvais souvenirs.", "de bons et de mauvais souvenirs."], answer: "de bons souvenirs." },
      { id: "b2-corse-q4", type: "short_answer", prompt: "À quelle personne sont associés ses souvenirs de nourriture ? et ses souvenirs dans le jardin ?", answer: "Sa grand-mère (les confitures, les frappes) et son grand-père (le feu dans le jardin, les étoiles)." },
      { id: "b2-corse-q5", type: "short_answer", prompt: "Qu'est-ce que Lisandra aimait manger ?", answer: "Des tartines avec du pain trempé dans le café, de la confiture de figues et d'abricots, et des beignets (« frappes »)." },
      { id: "b2-corse-q6", type: "short_answer", prompt: "Qu'est-ce qu'elle aimait sentir et entendre dans le jardin ?", answer: "L'odeur du feu de bois et le chant des oiseaux." },
      { id: "b2-corse-q7", type: "multi_select", prompt: "Vocabulaire : relevez trois verbes à l'imparfait dans le texte.", options: ["préparait", "s'est assise", "faisait", "on écoutait", "a mangé"], answer: ["préparait", "faisait", "on écoutait"] },
      { id: "b2-corse-q8", type: "open", prompt: "Production écrite : écrivez un témoignage. Dites quels sont vos souvenirs liés à une odeur, à une saveur, à un lieu, à un objet…" },
    ],
  },

  // ── C · Un été chez mon grand-père (p. 30) ──────────────────────────
  {
    id: "b2-livre-souvenirs-famille",
    unit: 2,
    unitTitle: "Je me souviens",
    source: "livre",
    section: "compréhension écrite",
    page: 30,
    title: "Un été chez mon grand-père",
    instruction: "Lisez cet extrait littéraire (inspiré du thème du chapitre) et répondez aux questions.",
    text: `Mon grand-père n'était pas un homme comme les autres. Il changeait de métier presque chaque année, et personne dans la famille ne savait vraiment ce qu'il faisait. Il ressemblait plus à un acteur qu'à un grand-père ordinaire.

Le mercredi, il venait me chercher à l'école, et rien que ça me rendait heureux. On prenait le bus, on traversait toute la ville, et pour moi c'était une vraie expédition — j'étais un explorateur, il était mon guide.

On allait voir un spectacle de marionnettes, tout au bout de la ligne. Il regardait sa montre pendant tout le trajet, avec l'inquiétude d'un homme qui était toujours en retard. « On arrive bientôt ? », je demandais à chaque arrêt. « Le spectacle nous attend au bout du monde ! », il répondait en riant. Et on courait ensemble jusqu'à la porte pour ne pas rater le début.

Il aimait la vie, il aimait rire, et moi, j'aimais être son petit-fils.`,
    questions: [
      { id: "b2-famille-q1", type: "open", prompt: "Regardez le titre. Vous avez un souvenir semblable avec un grand-parent ? Racontez." },
      { id: "b2-famille-q2", type: "multiple_choice", prompt: "L'auteur raconte un souvenir avec :", options: ["son père.", "son grand-père.", "son oncle."], answer: "son grand-père." },
      { id: "b2-famille-q3", type: "short_answer", prompt: "Comment ils se déplaçaient pour aller voir le spectacle ?", answer: "En bus, en traversant toute la ville." },
      { id: "b2-famille-q4", type: "short_answer", prompt: "Pourquoi devaient-ils courir ?", answer: "Pour ne pas rater le début du spectacle — le grand-père était toujours en retard." },
      { id: "b2-famille-q5", type: "true_false", prompt: "Vrai ou faux ? L'homme décrit avait un métier stable, comme tout le monde.", answer: false },
      { id: "b2-famille-q6", type: "multiple_choice", prompt: "Vocabulaire : que signifie « ressembler plus à un acteur qu'à un grand-père ordinaire » ?", options: ["Il était très classique et prévisible.", "Il était original, imprévisible, plein de surprises."], answer: "Il était original, imprévisible, plein de surprises." },
      { id: "b2-famille-q7", type: "multi_select", prompt: "Relevez les verbes à l'imparfait qui décrivent une HABITUDE (répétée chaque mercredi).", options: ["venait me chercher", "on prenait le bus", "j'étais un explorateur", "on courait"], answer: ["venait me chercher", "on prenait le bus"] },
      { id: "b2-famille-q8", type: "open", prompt: "Production orale : racontez les souvenirs que vous avez avec une personne de votre famille. De qui parlez-vous ? Pourquoi ?" },
    ],
  },

  // ── D · Une vue de rêve (p. 32) ────────────────────────────────────
  {
    id: "b2-livre-vue-de-reve",
    unit: 2,
    unitTitle: "Je me souviens",
    source: "livre",
    section: "compréhension écrite",
    page: 32,
    title: "Une vue de rêve",
    instruction: "Lisez cet article de blog voyage et repérez les pronoms y et en.",
    text: `Blog Destination le paradis — Île Maurice — « Un souvenir inoubliable »
Article écrit par Emmanuel

Certains paysages vous marquent à jamais. Aujourd'hui, je voulais vous parler de l'île Maurice. C'est une destination très touristique, mais on y trouve encore des endroits calmes et magiques, entre mer et montagne.

La photo que vous voyez ici, c'est le Morne Brabant, classé au patrimoine mondial de l'UNESCO. Après une randonnée assez facile de quelques heures, on arrive au sommet, et là, on découvre une vue magnifique sur les plages et sur toute l'île. Le vent, le silence, la barrière de corail en dessous… un vrai souvenir inoubliable.

Vous ne savez pas quoi faire à l'île Maurice ? Prenez de bonnes chaussures et montez au sommet du Morne. On en revient toujours enchanté !`,
    questions: [
      { id: "b2-vue-q1", type: "open", prompt: "Observez le titre. Vous aimez ce genre de paysage ? Pourquoi ?" },
      { id: "b2-vue-q2", type: "multiple_choice", prompt: "De quelle île francophone Emmanuel parle-t-il ?", options: ["La Corse", "L'île Maurice", "La Martinique"], answer: "L'île Maurice" },
      { id: "b2-vue-q3", type: "short_answer", prompt: "Pourquoi Emmanuel aime-t-il cette île ?", answer: "Parce qu'on y trouve encore des endroits calmes et magiques, entre mer et montagne." },
      { id: "b2-vue-q4", type: "short_answer", prompt: "De quelle montagne parle-t-il ? Pourquoi est-elle connue ?", answer: "Le Morne Brabant — il est classé au patrimoine mondial de l'UNESCO." },
      { id: "b2-vue-q5", type: "true_false", prompt: "Vrai ou faux ? La randonnée jusqu'au sommet est très difficile.", answer: false },
      { id: "b2-vue-q6", type: "multi_select", prompt: "Grammaire : relevez les pronoms y et en dans le texte.", options: ["on y trouve", "on en revient", "on découvre", "vous voyez"], answer: ["on y trouve", "on en revient"] },
      { id: "b2-vue-q7", type: "short_answer", prompt: "Que remplace « y » dans « on y trouve des endroits calmes » ?", answer: "L'île Maurice (« sur l'île Maurice »)." },
      { id: "b2-vue-q8", type: "open", prompt: "Production écrite : vous avez découvert un lieu fantastique pendant un de vos voyages. Présentez ce lieu sur votre blog." },
    ],
  },

  // ── F · Quel temps fait-il ? (Culture(s), p. 34) ────────────────────
  {
    id: "b2-livre-parlons-meteo",
    unit: 2,
    unitTitle: "Je me souviens",
    source: "livre",
    section: "culture(s)",
    page: 34,
    title: "Parlons météo !",
    instruction: "Lisez l'article et répondez aux questions.",
    text: `Pourquoi les Français parlent-ils autant de la météo ?

« Tu as vu cette pluie ? On va avoir ce temps gris tout le week-end ? » En France, on parle du temps qu'il fait partout, tout le temps. Selon une étude, plus de 8 Français sur 10 disent que la météo est leur sujet de conversation préféré pendant la pause au travail. C'est un sujet universel, facile, qui permet de parler avec des gens qu'on ne connaît pas encore.

Le bulletin météo est apparu à la radio en 1922, puis à la télévision en 1946 : une vraie révolution ! Avant, pour décider de sortir, les gens regardaient simplement le ciel. Avec le bulletin météo, ils ont pu commencer à prévoir une sortie à vélo pour le week-end suivant. Aujourd'hui, avec les applications sur smartphone, les Français sont encore plus attachés aux prévisions.

En français, on dit d'ailleurs « parler de la pluie et du beau temps » pour parler de sujets sans grande importance.`,
    questions: [
      { id: "b2-meteo-q1", type: "open", prompt: "Dans votre pays, est-ce que les gens parlent beaucoup du temps qu'il fait ?" },
      { id: "b2-meteo-q2", type: "true_false", prompt: "Vrai ou faux ? La météo est un sujet de conversation courant en France.", answer: true },
      { id: "b2-meteo-q3", type: "short_answer", prompt: "Qu'est-ce que le bulletin météo a changé dans l'organisation des loisirs des Français ?", answer: "Avant, les gens regardaient le ciel pour décider de sortir. Avec le bulletin météo, ils ont pu prévoir leurs sorties à l'avance." },
      { id: "b2-meteo-q4", type: "multiple_choice", prompt: "Qu'est-ce qui a rendu les Français encore plus attachés à la météo récemment ?", options: ["La radio.", "Les applications sur smartphone.", "La télévision."], answer: "Les applications sur smartphone." },
      { id: "b2-meteo-q5", type: "open", prompt: "Et vous, vous regardez souvent la météo ? Pour quelles raisons ?" },
      { id: "b2-meteo-q6", type: "multiple_choice", prompt: "Que signifie « parler de la pluie et du beau temps » ?", options: ["Parler de sujets peu importants.", "Se plaindre du climat."], answer: "Parler de sujets peu importants." },
    ],
  },

  // ── G · Envie de fraîcheur (vidéo/culture, p. 34) ───────────────────
  {
    id: "b2-livre-envie-fraicheur",
    unit: 2,
    unitTitle: "Je me souviens",
    source: "livre",
    section: "culture(s)",
    page: 34,
    title: "Envie de fraîcheur",
    instruction: "Lisez ce reportage (résumé du document vidéo) et répondez aux questions.",
    text: `Cet été, une vague de chaleur a poussé de nombreux Parisiens à quitter la capitale : il faisait presque 40 °C ! Direction le Cotentin, une presqu'île du Nord-Ouest de la France, à environ 350 kilomètres de Paris. Là-bas, la température était presque 15 °C plus fraîche.

Les touristes peuvent s'y promener au bord de la mer, se baigner, ou simplement profiter du vent frais sur la côte. Beaucoup de familles y cherchent un peu de fraîcheur pendant les grosses chaleurs de l'été.

Oh, le cliché ! On dit souvent qu'il pleut dans le Nord de la France et qu'il fait beau dans le Sud. En réalité, c'est dans le Nord-Ouest qu'il pleut le plus, mais le Sud-Ouest arrive juste après ! Les villes les plus ensoleillées sont d'abord Ajaccio, en Corse, puis Nice et Montpellier.`,
    questions: [
      { id: "b2-fraicheur-q1", type: "multiple_choice", prompt: "Les Parisiens ont quitté Paris parce qu'il y faisait environ :", options: ["30 °C.", "35 °C.", "40 °C."], answer: "40 °C." },
      { id: "b2-fraicheur-q2", type: "true_false", prompt: "Vrai ou faux ? Il fait environ 15 °C de moins dans le Cotentin qu'à Paris.", answer: true },
      { id: "b2-fraicheur-q3", type: "short_answer", prompt: "Quelles activités les touristes peuvent-ils faire dans le Cotentin ?", answer: "Se promener au bord de la mer, se baigner, profiter du vent frais." },
      { id: "b2-fraicheur-q4", type: "multiple_choice", prompt: "Quel est le contraire de « chaleur » ?", options: ["Canicule.", "Fraîcheur."], answer: "Fraîcheur." },
      { id: "b2-fraicheur-q5", type: "multiple_choice", prompt: "Quelle ville est la plus ensoleillée de France, selon le texte ?", options: ["Nice.", "Ajaccio.", "Montpellier."], answer: "Ajaccio." },
      { id: "b2-fraicheur-q6", type: "open", prompt: "Pour vous, quelle est la température idéale ? Pourquoi ?" },
    ],
  },

  // ── H · Pourquoi on achète des souvenirs de vacances ? (p. 36) ─────
  {
    id: "b2-livre-souvenirs-vacances",
    unit: 2,
    unitTitle: "Je me souviens",
    source: "livre",
    section: "compréhension écrite",
    page: 36,
    title: "Pourquoi on achète des souvenirs de vacances ?",
    instruction: "Lisez l'article et repérez la place des adjectifs.",
    text: `Plus d'un touriste sur deux ramène des souvenirs de vacances. C'est une jolie paire d'espadrilles du Pays basque, d'excellentes épices marocaines, un grand plat à tajine ou du sirop d'érable canadien. Dans leurs valises, les voyageurs de l'été ramènent presque toujours un petit morceau de leur voyage.

Selon un sondage récent, un peu plus de la moitié des touristes choisissent un petit objet-gadget : un mug, un porte-clés, un joli magnet. Environ 4 sur 10 préfèrent un beau vêtement typique, comme une marinière bretonne ou un sombrero mexicain. Un tiers ramène plutôt une spécialité gastronomique locale.

Pour Estelle, responsable d'une boutique de produits locaux en Normandie, l'achat de souvenirs est une dépense presque obligatoire : les touristes français dépensent en moyenne 25 à 30 euros par famille.`,
    questions: [
      { id: "b2-vacances2-q1", type: "open", prompt: "Est-ce que vous achetez des souvenirs en vacances ? Pourquoi ?" },
      { id: "b2-vacances2-q2", type: "true_false", prompt: "Vrai ou faux ? Plus de 50 % des touristes ramènent des souvenirs.", answer: true },
      { id: "b2-vacances2-q3", type: "multiple_choice", prompt: "Quel type de souvenir est le PLUS populaire selon le sondage ?", options: ["Les vêtements typiques.", "Les gadgets (mug, porte-clés…).", "La gastronomie locale."], answer: "Les gadgets (mug, porte-clés…)." },
      { id: "b2-vacances2-q4", type: "short_answer", prompt: "Combien les touristes français dépensent-ils en moyenne pour les souvenirs ?", answer: "Entre 25 et 30 euros par famille." },
      { id: "b2-vacances2-q5", type: "multi_select", prompt: "Grammaire : relevez des adjectifs placés AVANT le nom.", options: ["une jolie paire", "d'excellentes épices", "un grand plat", "épices marocaines", "spécialité locale"], answer: ["une jolie paire", "d'excellentes épices", "un grand plat"] },
      { id: "b2-vacances2-q6", type: "multi_select", prompt: "Grammaire : relevez des adjectifs placés APRÈS le nom.", options: ["épices marocaines", "sirop canadien", "vêtement typique", "jolie paire"], answer: ["épices marocaines", "sirop canadien", "vêtement typique"] },
      { id: "b2-vacances2-q7", type: "open", prompt: "Production orale : qu'est-ce que vous rapportez de vos vacances, en général ?" },
    ],
  },

  // ═══════════════════ Unité 3 — Comme à la maison ═══════════════════

  // ── A · Étudiants : comment trouver un toit ? (p. 41) ───────────────
  {
    id: "b3-livre-comment-trouver-toit",
    unit: 3,
    unitTitle: "Comme à la maison",
    source: "livre",
    section: "compréhension écrite",
    page: 41,
    title: "Étudiants : comment trouver un toit ?",
    instruction: "Lisez l'article et repérez les pronoms relatifs qui, que, où.",
    text: `Chercher un logement quand on est étudiant n'est pas toujours simple. Environ un tiers des étudiants habitent encore chez leurs parents, un autre tiers vit en location (seul ou en couple), et un peu plus d'un dixième choisit la résidence universitaire. Heureusement, il existe plusieurs bons plans pour trouver une location qui reste abordable.

La colocation est une option très populaire : on partage un appartement avec un ou plusieurs colocataires, des amis ou des personnes qu'on ne connaît pas encore. Cela permet d'avoir un logement plus grand pour un loyer moins cher, et une colocation qui se passe bien est aussi l'occasion de partager de bons moments.

On peut aussi chercher un peu à l'extérieur de la ville, où les loyers sont souvent plus bas. Certaines associations proposent des petits logements aménagés dans des fermes, en pleine nature.

Autre solution intéressante : la cohabitation intergénérationnelle. Une personne âgée propose une chambre gratuite ou à faible loyer à un jeune, en échange d'un peu de présence et de petits services — s'occuper du courrier, arroser les plantes. C'est une solution pratique pour tout le monde.

Enfin, les foyers pour jeunes travailleurs accueillent les 16-30 ans : on y trouve des jeunes actifs, des stagiaires et des étudiants étrangers — de très bons endroits pour se faire des amis.`,
    questions: [
      { id: "b3-toit-q1", type: "open", prompt: "Est-ce qu'il existe des logements réservés aux étudiants dans votre pays ?" },
      { id: "b3-toit-q2", type: "multiple_choice", prompt: "Quelle proportion d'étudiants vit en résidence universitaire ?", options: ["Environ un tiers.", "Un peu plus d'un dixième.", "La moitié."], answer: "Un peu plus d'un dixième." },
      { id: "b3-toit-q3", type: "short_answer", prompt: "Quel est l'avantage principal de la colocation ?", answer: "Avoir un logement plus grand pour un loyer moins cher, et partager de bons moments." },
      { id: "b3-toit-q4", type: "short_answer", prompt: "En quoi consiste la cohabitation intergénérationnelle ?", answer: "Une personne âgée propose une chambre gratuite ou à faible loyer à un jeune, en échange de présence et de petits services." },
      { id: "b3-toit-q5", type: "multiple_choice", prompt: "Les foyers pour jeunes travailleurs sont accessibles à quel âge ?", options: ["16-30 ans.", "18-25 ans.", "Tous les âges."], answer: "16-30 ans." },
      { id: "b3-toit-q6", type: "multi_select", prompt: "Grammaire : relevez les pronoms relatifs (qui/que/où) dans le texte.", options: ["une location qui reste abordable", "des personnes qu'on ne connaît pas encore", "où les loyers sont souvent plus bas", "on partage un appartement"], answer: ["une location qui reste abordable", "des personnes qu'on ne connaît pas encore", "où les loyers sont souvent plus bas"] },
      { id: "b3-toit-q7", type: "open", prompt: "Production orale : vous préférez quel type d'hébergement ? Pourquoi ?" },
    ],
  },

  // ── B · À louer (p. 43) ──────────────────────────────────────────
  {
    id: "b3-livre-a-louer",
    unit: 3,
    unitTitle: "Comme à la maison",
    source: "livre",
    section: "compréhension écrite",
    page: 43,
    title: "À louer",
    instruction: "Lisez les trois petites annonces et comparez-les.",
    text: `Studio lumineux
Studio de 30 m² à louer dans un quartier calme. Aménagé sous les toits, au cinquième étage sans ascenseur, très clair. Une grande pièce principale avec une cuisine américaine et une salle d'eau. 560 € par mois, charges comprises.

Beau T2 rénové
Appartement deux pièces entièrement rénové, dans un bel immeuble ancien du centre-ville, avec une cave. Il comprend une chambre avec un coin bureau, un séjour, une petite cuisine équipée, une salle de bain et un balcon. Loyer de 870 € par mois.

Coliving à Nantes
Cette maison neuve, située à proximité du centre, propose 15 chambres et studios meublés en location. Ses espaces communs sont : deux cuisines, un grand salon confortable, une véranda, une buanderie et un jardin partagé. De 600 € à 980 € par mois.`,
    questions: [
      { id: "b3-louer-q1", type: "open", prompt: "D'après vous, à qui s'adresse chaque annonce ?" },
      { id: "b3-louer-q2", type: "short_answer", prompt: "Où se trouve le studio, et à quel étage ?", answer: "Dans un quartier calme, aménagé sous les toits, au cinquième étage sans ascenseur." },
      { id: "b3-louer-q3", type: "short_answer", prompt: "Combien de pièces a le T2 rénové ? Quelles sont ses caractéristiques ?", answer: "Deux pièces : une chambre avec coin bureau, un séjour, une petite cuisine équipée, une salle de bain, un balcon et une cave." },
      { id: "b3-louer-q4", type: "multiple_choice", prompt: "Quelle annonce propose la fourchette de prix la plus large ?", options: ["Le studio.", "Le T2 rénové.", "Le coliving."], answer: "Le coliving." },
      { id: "b3-louer-q5", type: "multiple_choice", prompt: "Que veut dire « une cuisine américaine » ?", options: ["Une cuisine ouverte sur le salon.", "Une cuisine très grande.", "Une cuisine avec des appareils américains."], answer: "Une cuisine ouverte sur le salon." },
      { id: "b3-louer-q6", type: "open", prompt: "Production écrite : vous avez un appartement à louer. Écrivez une petite annonce pour le décrire." },
    ],
  },

  // ── D · Cent jours en cabine (p. 46) ─────────────────────────────
  {
    id: "b3-livre-cent-jours-cabine",
    unit: 3,
    unitTitle: "Comme à la maison",
    source: "livre",
    section: "compréhension écrite",
    page: 46,
    title: "Cent jours en cabine",
    instruction: "Lisez ce court récit (inspiré du thème du chapitre) et répondez aux questions.",
    text: `À quarante ans, Léa décide de partir seule pour un long voyage en bateau : cent jours en mer, plusieurs continents, une dizaine de pays. Pendant tout le voyage, elle va loger seule dans une petite cabine.

La cabine est plus grande qu'elle ne l'imaginait sur les photos de l'annonce. Dès qu'elle ouvre la porte, elle sait qu'elle va s'y plaire : un lit deux places avec une épaisse couette, un petit bureau et sa chaise, un canapé, des placards, une télévision, une table de chevet avec une lampe, une salle d'eau, un petit réfrigérateur et, luxe suprême, un balcon avec deux chaises et une table.

Elle pose sa valise, s'assoit sur le balcon et regarde la mer. « Je crois que je vais très bien vivre ici », se dit-elle.`,
    questions: [
      { id: "b3-cabine-q1", type: "open", prompt: "Où peut-on dormir quand on est en voyage ?" },
      { id: "b3-cabine-q2", type: "short_answer", prompt: "Que va faire Léa ? Pendant combien de temps ?", answer: "Un voyage en bateau, seule, pendant cent jours." },
      { id: "b3-cabine-q3", type: "true_false", prompt: "Vrai ou faux ? La cabine est plus petite que Léa ne l'imaginait.", answer: false },
      { id: "b3-cabine-q4", type: "short_answer", prompt: "Citez trois meubles présents dans la cabine.", answer: "Par exemple : un lit deux places, un bureau, un canapé, des placards, une table de chevet, une lampe." },
      { id: "b3-cabine-q5", type: "true_false", prompt: "Vrai ou faux ? Ce logement plaît à Léa.", answer: true },
      { id: "b3-cabine-q6", type: "open", prompt: "Production écrite : pensez à un endroit agréable, original ou amusant où dormir, et décrivez-le." },
    ],
  },

  // ── F · L'architecture de Victor Horta (Culture(s), p. 48) ──────
  {
    id: "b3-livre-architecture-horta",
    unit: 3,
    unitTitle: "Comme à la maison",
    source: "livre",
    section: "culture(s)",
    page: 48,
    title: "L'architecture de Victor Horta",
    instruction: "Lisez l'article sur l'Art nouveau à Bruxelles et répondez aux questions.",
    text: `L'Art nouveau est un style artistique qu'on retrouve dans l'architecture et les arts décoratifs. Il s'inspire des formes de la nature et il est souvent très coloré. L'architecte Victor Horta a développé ce style en Belgique, à la fin du 19e siècle et au début du 20e siècle. Voici quelques-unes de ses réalisations, toutes à Bruxelles.

L'hôtel Tassel, sa première grande œuvre, se situe dans un quartier populaire et vivant ; on le considère comme le bâtiment fondateur de l'Art nouveau à Bruxelles.

L'hôtel Solvay, une magnifique maison qu'on peut admirer sur une avenue chic et commerçante, est ouvert à la visite depuis quelques années.

Le musée Horta, installé dans une petite rue calme et tranquille, est en réalité l'ancienne maison personnelle de l'architecte — elle a conservé une grande partie de sa décoration intérieure.

L'hôtel Van Eetvelde se trouve au milieu d'espaces verts, non loin des bureaux d'institutions européennes.

Enfin, le Centre belge de la bande dessinée occupe d'anciens grands magasins transformés en musée, dans le centre historique de la ville.`,
    questions: [
      { id: "b3-horta-q1", type: "open", prompt: "Aimez-vous l'architecture ? Connaissez-vous des architectes célèbres ?" },
      { id: "b3-horta-q2", type: "short_answer", prompt: "De quel style architectural parle ce document ? Qui l'a développé ?", answer: "L'Art nouveau, développé en Belgique par l'architecte Victor Horta." },
      { id: "b3-horta-q3", type: "short_answer", prompt: "Qu'est-ce que les bâtiments présentés ont en commun ?", answer: "Ce sont tous des réalisations de Victor Horta, à Bruxelles." },
      { id: "b3-horta-q4", type: "true_false", prompt: "Vrai ou faux ? L'hôtel Tassel est considéré comme le bâtiment fondateur de l'Art nouveau à Bruxelles.", answer: true },
      { id: "b3-horta-q5", type: "true_false", prompt: "Vrai ou faux ? Le musée Horta était autrefois la maison personnelle de l'architecte.", answer: true },
      { id: "b3-horta-q6", type: "short_answer", prompt: "Où se trouve l'hôtel Van Eetvelde ?", answer: "Au milieu d'espaces verts, près des bureaux d'institutions européennes." },
      { id: "b3-horta-q7", type: "open", prompt: "Que pensez-vous du style Art nouveau ? Cela vous donne-t-il envie de visiter ces bâtiments ?" },
    ],
  },

  // ── H · Voisins solidaires (vidéo/culture, p. 50) ───────────────
  {
    id: "b3-livre-voisins-solidaires",
    unit: 3,
    unitTitle: "Comme à la maison",
    source: "livre",
    section: "culture(s)",
    page: 50,
    title: "Voisins solidaires",
    instruction: "Lisez ce reportage (résumé du document vidéo) et répondez aux questions.",
    text: `Mireille a 75 ans. Elle vit seule dans un petit appartement depuis qu'elle est veuve, il y a dix ans. Enfin, seule… pas vraiment : chaque jour à 16 heures, Inès, sa jeune voisine de 9 ans, vient faire ses devoirs chez elle, et Mireille lui prépare un bon goûter. Le soir, c'est la maman d'Inès, Dona, qui passe apporter des courses à Mireille et récupérer sa fille.

Dona et Inès habitent au troisième étage de cet immeuble un peu spécial : c'est ce qu'on appelle un habitat solidaire intergénérationnel. Le principe est simple — on mélange les âges et les situations, on se rend service, et on partage des moments et des espaces communs.

Ainsi, dans cet immeuble : Arthur sort les poubelles pour deux voisins plus âgés ; Baptiste s'occupe du local à vélos ; Jade s'occupe du potager avec Dona ; un voisin plus âgé donne des conseils de jardinage et tond la pelouse ; et un autre habitant s'occupe du poulailler commun. Un voisin, Siméon, aide régulièrement Dona pour de petites réparations chez elle.

« Être mieux, vivre mieux, habiter mieux » : voilà ce que cet habitat solidaire propose à tous ses habitants.`,
    questions: [
      { id: "b3-voisins-q1", type: "open", prompt: "Regardez le titre. Qui sont, à votre avis, les personnes de ce reportage ?" },
      { id: "b3-voisins-q2", type: "true_false", prompt: "Vrai ou faux ? Toutes les personnes de l'immeuble ont le même âge.", answer: false },
      { id: "b3-voisins-q3", type: "true_false", prompt: "Vrai ou faux ? Les habitants s'entendent bien et se rendent des services.", answer: true },
      { id: "b3-voisins-q4", type: "matching", prompt: "Qui fait quoi ? Associez.", answer: "Arthur → sort les poubelles de deux voisins âgés\nBaptiste → s'occupe du local à vélos\nJade → s'occupe du potager avec Dona\nSiméon → aide Dona pour de petites réparations" },
      { id: "b3-voisins-q5", type: "short_answer", prompt: "Que fait Inès chez Mireille chaque jour à 16 heures ?", answer: "Elle vient faire ses devoirs, et Mireille lui prépare un goûter." },
      { id: "b3-voisins-q6", type: "open", prompt: "Et vous, vous avez quelles relations avec vos voisins ?" },
    ],
  },

  // ── I · Entre voisins (p. 51) ────────────────────────────────────
  {
    id: "b3-livre-entre-voisins",
    unit: 3,
    unitTitle: "Comme à la maison",
    source: "livre",
    section: "compréhension écrite",
    page: 51,
    title: "Entre voisins",
    instruction: "Lisez ces échanges sur une application de voisinage et répondez aux questions.",
    text: `Voisins solidaires — REJOINDRE →

Hier
Camille : J'ai perdu mon chat, Câlin… Si vous le voyez, contactez-moi s'il vous plaît !
Antoine : Mince ! Je suis sûr qu'il va revenir, ne t'inquiète pas !
Leïla : Courage Camille ! J'espère que tu vas le retrouver et que ça va aller !

Aujourd'hui
Leïla : Je donne un fauteuil, il est en très bon état. Ça vous intéresse ?
Antoine : Ah zut, j'ai acheté un nouveau fauteuil hier, c'est dommage !
Camille : Ça m'intéresse ! Il est comment ? Merci !
Leïla : Il est bleu foncé. Si tu es disponible, tu peux passer le voir ce soir !
Camille : Ce soir, je ne suis pas là…
Leïla : C'est pas grave, tu peux passer ce week-end si ça t'arrange.`,
    questions: [
      { id: "b3-voisins2-q1", type: "open", prompt: "Qu'est-ce qu'on peut demander à ses voisins, selon vous ?" },
      { id: "b3-voisins2-q2", type: "multiple_choice", prompt: "Qui donne un meuble ?", options: ["Camille", "Antoine", "Leïla"], answer: "Leïla" },
      { id: "b3-voisins2-q3", type: "short_answer", prompt: "Que s'est-il passé avec le chat de Camille ?", answer: "Elle l'a perdu." },
      { id: "b3-voisins2-q4", type: "short_answer", prompt: "Pourquoi Antoine n'est-il pas intéressé par le fauteuil ?", answer: "Parce qu'il a acheté un nouveau fauteuil la veille." },
      { id: "b3-voisins2-q5", type: "multi_select", prompt: "Relevez les expressions qui servent à consoler ou réconforter.", options: ["Ne t'inquiète pas !", "Courage !", "Ça m'intéresse !", "C'est pas grave."], answer: ["Ne t'inquiète pas !", "Courage !", "C'est pas grave."] },
      { id: "b3-voisins2-q6", type: "open", prompt: "Production écrite (DELF, 50 mots min.) : un(e) ami(e) vous écrit que ses nouveaux voisins sont très bruyants et l'empêchent de dormir. Répondez-lui pour le/la réconforter et lui proposer une solution." },
    ],
  },

  // ═══════════════ Unité 4 — Tous pareils, tous différents ═══════════════

  // ── A · Les mannequins atypiques (p. 55) ─────────────────────────
  {
    id: "b4-livre-mannequins-atypiques",
    unit: 4,
    unitTitle: "Tous pareils, tous différents",
    source: "livre",
    section: "compréhension écrite",
    page: 55,
    title: "Les mannequins atypiques",
    instruction: "Lisez l'article et repérez le vocabulaire du portrait physique.",
    text: `De plus en plus de mannequins « atypiques » posent aujourd'hui pour de grandes marques, loin des standards habituels de la mode.

C'est le cas d'une mannequin de 61 ans qui défile avec ses longs cheveux gris. Pour elle, un corps parfait n'existe pas : « chaque corps est unique, et c'est ça qui le rend beau », explique-t-elle. Elle fait une taille 44 et ne s'en cache pas.

Un autre mannequin, la quarantaine, travaille dans le métier depuis huit ans. Il se décrit lui-même comme « costaud », sans complexe. Pour lui, montrer des corps différents des canons de beauté habituels peut aider d'autres personnes à se sentir mieux dans leur peau.

Enfin, un jeune mannequin de 1,55 m espère devenir le premier mannequin noir de petite taille reconnu dans le milieu. Il le reconnaît : dans le monde de la mode, on demande en général aux hommes d'être grands, musclés et secs. Il ne remplit aucun de ces critères — mais rappelle que ce sont les mannequins qui portent les vêtements, pas l'inverse.`,
    questions: [
      { id: "b4-mannequins-q1", type: "open", prompt: "Regardez des photos de mannequins atypiques. Qu'en pensez-vous ?" },
      { id: "b4-mannequins-q2", type: "short_answer", prompt: "D'après la mannequin de 61 ans, pourquoi tous les corps sont-ils beaux ?", answer: "Parce que chaque corps est unique, et c'est ça qui le rend beau." },
      { id: "b4-mannequins-q3", type: "short_answer", prompt: "Comment le deuxième mannequin se décrit-il ? Pourquoi ce mot ne le dérange pas ?", answer: "Il se décrit comme « costaud ». Il n'a pas de problème avec ce mot et pense que montrer des corps différents peut aider les autres." },
      { id: "b4-mannequins-q4", type: "multiple_choice", prompt: "Quel est le rêve du jeune mannequin de 1,55 m ?", options: ["Devenir styliste.", "Devenir le premier mannequin noir de petite taille reconnu.", "Ouvrir sa propre marque."], answer: "Devenir le premier mannequin noir de petite taille reconnu." },
      { id: "b4-mannequins-q5", type: "true_false", prompt: "Vrai ou faux ? Selon le texte, un homme mannequin doit habituellement être grand, musclé et sec.", answer: true },
      { id: "b4-mannequins-q6", type: "open", prompt: "Production écrite : décrivez un(e) mannequin que vous avez vu(e) dans une publicité ou un magazine." },
    ],
  },

  // ── C · Le sosie de Napoléon (p. 58) ─────────────────────────────
  {
    id: "b4-livre-sosie-napoleon",
    unit: 4,
    unitTitle: "Tous pareils, tous différents",
    source: "livre",
    section: "compréhension écrite",
    page: 58,
    title: "Le sosie de Napoléon",
    instruction: "Lisez l'article et répondez aux questions.",
    text: `Ce n'est pas tous les jours qu'on croise Napoléon dans la rue — même si c'est seulement un sosie. Pendant dix ans, un homme a été la doublure officielle de l'empereur pour des reconstitutions historiques. Aujourd'hui âgé de 54 ans, barbu et un peu dégarni, il admet en riant : « Je n'ai plus du tout la tête de l'emploi ! »

Au début, pourtant, tout collait parfaitement : il mesurait presque la même taille que Napoléon, avait la même silhouette, le même visage rond, et même la même petite fossette au menton. Mais ressembler physiquement ne suffisait pas — il fallait aussi « coller au personnage ». Il a donc appris à monter à cheval et s'est entraîné longuement à imiter les gestes typiques de l'empereur : son petit rictus, sa façon de toujours tirer sur sa manche.`,
    questions: [
      { id: "b4-napoleon-q1", type: "open", prompt: "Savez-vous qui était Napoléon Bonaparte ?" },
      { id: "b4-napoleon-q2", type: "short_answer", prompt: "Qui est l'homme dont parle l'article ?", answer: "L'ancienne doublure officielle de Napoléon pendant dix ans, pour des reconstitutions historiques." },
      { id: "b4-napoleon-q3", type: "short_answer", prompt: "Pourquoi ne ressemble-t-il plus à Napoléon aujourd'hui ?", answer: "Il est maintenant barbu et un peu dégarni." },
      { id: "b4-napoleon-q4", type: "multi_select", prompt: "Qu'avait-il en commun avec Napoléon au départ ?", options: ["La même taille (à peu près).", "La même silhouette.", "Le même visage rond.", "La même fossette au menton.", "La même voix."], answer: ["La même taille (à peu près).", "La même silhouette.", "Le même visage rond.", "La même fossette au menton."] },
      { id: "b4-napoleon-q5", type: "short_answer", prompt: "Qu'a-t-il fait pour bien jouer le rôle de Napoléon ?", answer: "Il a appris à monter à cheval et s'est entraîné à imiter les gestes typiques de l'empereur." },
      { id: "b4-napoleon-q6", type: "multiple_choice", prompt: "Vocabulaire : que signifie « coller au personnage » ?", options: ["Correspondre vraiment au personnage, pas seulement physiquement.", "Se déguiser en personnage pour une fête."], answer: "Correspondre vraiment au personnage, pas seulement physiquement." },
      { id: "b4-napoleon-q7", type: "open", prompt: "Production écrite : voudriez-vous être le sosie d'une personne célèbre ? Pourquoi ?" },
    ],
  },

  // ── D · Les qualités de vos défauts (p. 60) ──────────────────────
  {
    id: "b4-livre-qualites-defauts",
    unit: 4,
    unitTitle: "Tous pareils, tous différents",
    source: "livre",
    section: "compréhension écrite",
    page: 60,
    title: "Les qualités de vos défauts",
    instruction: "Lisez l'article et répondez aux questions.",
    text: `Personne n'est parfait, tout le monde le sait. Nous avons tous des qualités et des défauts, mais nous avons tendance à les voir de façon très binaire : c'est bien, ou c'est mal. En réalité, presque tous les traits de caractère peuvent devenir utiles selon la situation. Chaque « défaut » a son revers positif.

Vous vous trouvez bavard(e) et un peu bruyant(e) ? C'est peut-être surtout que vous êtes sociable, chaleureux(-se) et spontané(e) dans toutes les situations — bref, doué(e) pour la communication !

Vous êtes plutôt d'un naturel timide, mal à l'aise pour parler en public ? Voyez plutôt le bon côté : vous êtes discret(-ète) et réfléchi(e), on peut compter sur votre prudence.

Le désordre vous rend fou/folle ? C'est simplement que vous êtes ordonné(e) et rigoureux(-se) — et ça vous fait gagner un temps fou au quotidien.

Chaque faiblesse a donc aussi sa force. Le savoir rend plus tolérant, avec les autres comme avec soi-même.`,
    questions: [
      { id: "b4-qualites-q1", type: "open", prompt: "Citez un de vos défauts et une de vos qualités." },
      { id: "b4-qualites-q2", type: "short_answer", prompt: "Comment voyons-nous les qualités et les défauts en général, selon le texte ?", answer: "De façon binaire : c'est bien, ou c'est mal." },
      { id: "b4-qualites-q3", type: "matching", prompt: "Associez chaque « défaut » à sa qualité cachée.", answer: "bavard(e), bruyant(e) → sociable, chaleureux(-se), doué(e) pour la communication\ntimide → discret(-ète), réfléchi(e), prudent(e)\nmaniaque du désordre → ordonné(e), rigoureux(-se)" },
      { id: "b4-qualites-q4", type: "open", prompt: "Dans quelles situations ces « défauts » peuvent-ils être des qualités ? a. Bavard(e). b. Désordonné(e). c. Nerveux, nerveuse." },
      { id: "b4-qualites-q5", type: "open", prompt: "Production écrite (DELF) : décrivez le caractère d'un personnage de fiction." },
    ],
  },

  // ── E · Le quadrant d'Ofman (vidéo, p. 61) ───────────────────────
  {
    id: "b4-livre-quadrant-ofman",
    unit: 4,
    unitTitle: "Tous pareils, tous différents",
    source: "livre",
    section: "culture(s)",
    page: 61,
    title: "Le quadrant d'Ofman",
    instruction: "Lisez ce résumé du document vidéo et répondez aux questions.",
    text: `Le quadrant d'Ofman est un outil conçu aux Pays-Bas dans les années 1990 pour comprendre nos qualités fondamentales — et leurs opposés.

Il fonctionne en quatre cases. On part d'une QUALITÉ : par exemple, la détermination. Si on pousse cette qualité à l'extrême, elle devient un PIÈGE : l'obstination. Pour corriger ce piège, il faut développer son opposé positif, le CHALLENGE : ici, la souplesse. Mais si on pousse la souplesse elle-même à l'excès, on arrive à une quatrième case, l'ALLERGIE : l'indécision. Une personne très déterminée aura souvent du mal à s'entendre avec une personne très indécise — chacune est « l'allergie » de l'autre.

Même logique avec le courage : poussé à l'extrême, il devient de la témérité (piège) ; son opposé positif est la prudence (challenge) ; mais une prudence excessive devient de la peur (allergie).`,
    questions: [
      { id: "b4-ofman-q1", type: "open", prompt: "Regardez le schéma en 4 cases. À quoi sert cet outil, à votre avis ?" },
      { id: "b4-ofman-q2", type: "short_answer", prompt: "À quoi sert le quadrant d'Ofman ?", answer: "À comprendre nos qualités fondamentales, leurs pièges (l'excès), et comment les corriger." },
      { id: "b4-ofman-q3", type: "matching", prompt: "Complétez le quadrant de la détermination.", answer: "Qualité → détermination\nPiège (excès) → obstination\nChallenge (opposé positif) → souplesse\nAllergie (excès du challenge) → indécision" },
      { id: "b4-ofman-q4", type: "matching", prompt: "Complétez le quadrant du courage.", answer: "Qualité → courage\nPiège (excès) → témérité\nChallenge (opposé positif) → prudence\nAllergie (excès du challenge) → peur" },
      { id: "b4-ofman-q5", type: "open", prompt: "Production écrite : choisissez une de vos qualités et faites son quadrant d'Ofman (qualité → piège → challenge → allergie)." },
    ],
  },

  // ── F · Jean de La Fontaine, roi des animaux (Culture(s), p. 62) ──
  {
    id: "b4-livre-la-fontaine",
    unit: 4,
    unitTitle: "Tous pareils, tous différents",
    source: "livre",
    section: "culture(s)",
    page: 62,
    title: "Jean de La Fontaine, roi des animaux",
    instruction: "Lisez l'article et répondez aux questions.",
    text: `Écrivain du 17e siècle, Jean de La Fontaine est resté célèbre pour ses fables : de petites histoires avec une morale, écrites pour instruire le lecteur. Dans ses textes, La Fontaine met en scène des animaux qui représentent en réalité les humains de son époque.

Chaque animal y symbolise un trait de caractère précis. Le renard est intelligent mais menteur. Le chien reste fidèle à son maître, alors que le loup, lui, est indépendant mais souvent naïf face au renard. L'agneau est doux et honnête, tandis que le lion, au contraire, se montre autoritaire et cruel. Le rat change selon les situations : superficiel en groupe, il devient curieux et réfléchi une fois seul. La grenouille, envieuse et prétentieuse, voudrait toujours être plus grosse qu'elle n'est. La Fontaine aime aussi jouer sur les contrastes : la fourmi, toujours inquiète et travailleuse, s'oppose à la cigale, optimiste mais paresseuse.

Dans l'ensemble de son œuvre, La Fontaine se montre plutôt pessimiste sur la nature humaine — il conseille à ses lecteurs de vivre simplement, sans désirer l'impossible.`,
    questions: [
      { id: "b4-fontaine-q1", type: "open", prompt: "Connaissez-vous des histoires avec des animaux qui représentent des humains ?" },
      { id: "b4-fontaine-q2", type: "short_answer", prompt: "Qui était Jean de La Fontaine ? Qu'est-ce qu'une fable ?", answer: "Un écrivain du 17e siècle, célèbre pour ses fables : de petites histoires avec une morale, pour instruire le lecteur." },
      { id: "b4-fontaine-q3", type: "matching", prompt: "Associez chaque animal à son trait de caractère.", answer: "le renard → intelligent, menteur\nle chien → fidèle\nle loup → indépendant, un peu naïf\nl'agneau → doux, honnête\nle lion → autoritaire, cruel\nla fourmi → inquiète, travailleuse\nla cigale → optimiste, paresseuse" },
      { id: "b4-fontaine-q4", type: "true_false", prompt: "Vrai ou faux ? Le rat a toujours le même caractère, seul ou en groupe.", answer: false },
      { id: "b4-fontaine-q5", type: "true_false", prompt: "Vrai ou faux ? La Fontaine est plutôt optimiste sur la nature humaine.", answer: false },
      { id: "b4-fontaine-q6", type: "open", prompt: "Quelle est la réputation des gens de votre pays, selon les clichés que vous connaissez ?" },
    ],
  },

  // ── H · Quelles photos pour vos profils ? (p. 64) ────────────────
  {
    id: "b4-livre-photos-profils",
    unit: 4,
    unitTitle: "Tous pareils, tous différents",
    source: "livre",
    section: "compréhension écrite",
    page: 64,
    title: "Quelles photos pour vos profils ?",
    instruction: "Lisez l'article et repérez les pronoms possessifs.",
    text: `La première question à se poser à propos d'une photo de profil, c'est de savoir si la vôtre est adaptée au réseau visé : on ne met pas la même photo sur un réseau professionnel et sur un réseau personnel.

Sur les comptes professionnels, une photo réussie peut être originale, mais pas trop bizarre. Mieux vaut éviter les photos de groupe avec la famille ou les amis — c'est votre visage que l'employeur veut voir, pas le leur. On peut sourire, mais pas trop : il faut surtout paraître sûr(e) de soi. Un ami cherchait un emploi depuis plusieurs mois ; le jour où il a changé sa photo de profil pour une photo plus sérieuse, il a trouvé un poste dans la semaine.

Sur les réseaux personnels ou les sites de rencontres, c'est différent : il s'agit plutôt d'attirer la sympathie et de sortir du lot. La photo peut en dire beaucoup sur votre personnalité — n'hésitez pas à vous mettre en scène pour montrer vos passions. On a tous envie de rencontrer des gens qui partagent des centres d'intérêt proches des nôtres.

Enfin, pensez à changer votre photo de profil régulièrement : gardez toujours une petite série de photos d'avance !`,
    questions: [
      { id: "b4-profils-q1", type: "open", prompt: "Décrivez une photo que vous avez utilisée pour un profil de compte." },
      { id: "b4-profils-q2", type: "multi_select", prompt: "D'après cet article, pourquoi faut-il avoir différentes photos de profil ?", options: ["Pour montrer toute sa vie.", "Pour s'adapter aux différents réseaux.", "Pour actualiser son profil."], answer: ["Pour s'adapter aux différents réseaux.", "Pour actualiser son profil."] },
      { id: "b4-profils-q3", type: "multi_select", prompt: "Quels conseils concernent plutôt les réseaux professionnels ?", options: ["Il faut avoir l'air sérieux.", "Il faut avoir l'air sympathique.", "On peut montrer ses goûts et loisirs.", "Mieux vaut être seul(e) sur la photo."], answer: ["Il faut avoir l'air sérieux.", "Mieux vaut être seul(e) sur la photo."] },
      { id: "b4-profils-q4", type: "multi_select", prompt: "Grammaire : relevez les pronoms possessifs du texte.", options: ["la vôtre", "des centres d'intérêt proches des nôtres", "votre visage", "le leur"], answer: ["la vôtre", "des centres d'intérêt proches des nôtres", "le leur"] },
      { id: "b4-profils-q5", type: "open", prompt: "Sur quels réseaux utiliseriez-vous une photo sérieuse ? Une photo plus personnelle ? Pourquoi ?" },
    ],
  },

  // ═══════════════ Unité 5 — En route vers le futur ! ═══════════════

  // ── A · Comment seront nos vies en 2050 ? (p. 69) ────────────────
  {
    id: "b5-livre-vies-2050",
    unit: 5,
    unitTitle: "En route vers le futur !",
    source: "livre",
    section: "compréhension écrite",
    page: 69,
    title: "Comment seront nos vies en 2050 ?",
    instruction: "Lisez ce que des enfants imaginent du futur et repérez les verbes au futur simple.",
    text: `Oh là là, comme ça paraît loin, la vie dans trente ans ! On a demandé à des enfants comment ils imaginent leur vie en 2050.

Léo, 8 ans : « Bientôt, il y aura des maisons qui pourront se téléporter jusqu'à la plage ! Elles flotteront dans les airs, avec des escaliers volants et une piscine. À l'intérieur, il y aura plusieurs robots : un qui fera le ménage, un qui fera la cuisine et pourra tout cuire très vite, et un qui fera apparaître des burgers et des frites ! »

Inès, 10 ans : « Un jour, pour remplacer les transports en commun, il y aura de petites navettes individuelles, comme de petites soucoupes volantes. Elles seront sous terre, dans des tubes, et elles sauront leur chemin toutes seules — on n'aura pas besoin de volant ! Il y aura juste des tickets, comme dans le bus. »

Adam, 7 ans : « Dans le futur, on mangera un comprimé, quatre fois par jour, pour avoir tous nos repas. Mais on aura aussi le choix de continuer à manger d'autres aliments si on veut. Et dans un avenir proche, des robots nous serviront, à la maison et au restaurant ! »`,
    questions: [
      { id: "b5-2050-q1", type: "open", prompt: "Lisez le titre. Comment imaginez-vous votre vie dans trente ans ?" },
      { id: "b5-2050-q2", type: "matching", prompt: "Associez chaque enfant à son sujet.", answer: "Léo → les logements du futur\nInès → les transports du futur\nAdam → la nourriture du futur" },
      { id: "b5-2050-q3", type: "multi_select", prompt: "D'après Léo, les maisons pourront :", options: ["se déplacer.", "se transformer.", "voler."], answer: ["se déplacer.", "voler."] },
      { id: "b5-2050-q4", type: "multiple_choice", prompt: "Inès pense que les navettes seront :", options: ["collectives.", "autonomes.", "gratuites."], answer: "autonomes." },
      { id: "b5-2050-q5", type: "true_false", prompt: "Vrai ou faux ? Selon Adam, tout le monde devra obligatoirement manger des comprimés.", answer: false },
      { id: "b5-2050-q6", type: "multi_select", prompt: "Grammaire : relevez des verbes au futur simple dans le texte.", options: ["pourront", "flotteront", "il y a", "sauront"], answer: ["pourront", "flotteront", "sauront"] },
      { id: "b5-2050-q7", type: "open", prompt: "Production orale : selon vous, quelles idées présentées sont de bonnes idées pour le futur ? De mauvaises idées ? Pourquoi ?" },
    ],
  },

  // ── C · L'école de demain (p. 73) ────────────────────────────────
  {
    id: "b5-livre-ecole-demain",
    unit: 5,
    unitTitle: "En route vers le futur !",
    source: "livre",
    section: "compréhension écrite",
    page: 73,
    title: "L'école de demain",
    instruction: "Lisez l'article et repérez les verbes au futur simple.",
    text: `Un jour, les technologies seront partout dans les écoles : en classe, en amphi ou à la cantine.

Dans un avenir proche, chaque enfant aura une tablette numérique à l'école et pourra faire ses exercices à son propre rythme. Quand un élève aura des difficultés à comprendre un texte, la tablette modifiera automatiquement le contenu de l'activité et l'adaptera à son niveau. Ces appareils seront aussi très utiles pour les professeurs, qui pourront connaître immédiatement les difficultés de chaque élève.

Dans les universités, les professeurs utiliseront des hologrammes pour donner des cours à distance. Les étudiants verront leur enseignant apparaître en 3D dans leur amphithéâtre, avec l'impression qu'il est vraiment devant eux.

La technologie sera aussi présente dans les cantines. La reconnaissance faciale permettra d'adapter la nourriture à chaque élève : on servira par exemple des plats sans viande aux élèves végétariens, et on adaptera les quantités à l'âge de chacun. De quoi avoir une alimentation plus saine, et gaspiller beaucoup moins de nourriture.`,
    questions: [
      { id: "b5-ecole-q1", type: "open", prompt: "Est-ce que vous aimez utiliser les nouvelles technologies pour apprendre ?" },
      { id: "b5-ecole-q2", type: "short_answer", prompt: "Dans quels lieux les écoles vont-elles utiliser les nouvelles technologies ?", answer: "En classe, en amphi et à la cantine." },
      { id: "b5-ecole-q3", type: "multi_select", prompt: "Quels sont les avantages de la tablette numérique ?", options: ["Elle adapte le contenu au niveau de l'élève.", "Elle permet au professeur de connaître les difficultés de chaque élève.", "Elle remplace complètement le professeur."], answer: ["Elle adapte le contenu au niveau de l'élève.", "Elle permet au professeur de connaître les difficultés de chaque élève."] },
      { id: "b5-ecole-q4", type: "short_answer", prompt: "À quoi vont servir les hologrammes ?", answer: "À donner des cours à distance, en faisant apparaître l'enseignant en 3D." },
      { id: "b5-ecole-q5", type: "true_false", prompt: "Vrai ou faux ? Tous les enfants mangeront exactement la même chose à la cantine.", answer: false },
      { id: "b5-ecole-q6", type: "open", prompt: "Production orale : votre école vous propose des cours de français avec un professeur en hologramme. Vous inscrivez-vous ? Pourquoi ?" },
    ],
  },

  // ── E · Comment vivre sans téléphone portable ? (p. 75) ──────────
  {
    id: "b5-livre-vivre-sans-portable",
    unit: 5,
    unitTitle: "En route vers le futur !",
    source: "livre",
    section: "compréhension écrite",
    page: 75,
    title: "Comment vivre sans téléphone portable ?",
    instruction: "Lisez ces conseils et répondez aux questions.",
    text: `Vous voulez utiliser moins souvent votre téléphone portable mais vous ne savez pas comment faire ? Suivez ces conseils.

1) Préparez vos itinéraires à l'avance. Si vous devez aller dans un endroit inconnu, cherchez le chemin sur un ordinateur avant de partir. Si vous vous perdez quand même, vous pourrez toujours demander votre route à quelqu'un.

2) Remplacez par d'autres activités. Utilisez le temps que vous passez d'habitude sur votre smartphone pour faire autre chose. Par exemple, si vous avez l'habitude de jouer ou d'envoyer des SMS pendant la pause déjeuner, lisez plutôt un livre ou écoutez de la musique.

3) Laissez votre téléphone à la maison de temps en temps. Si vous allez juste au supermarché, essayez de partir sans votre smartphone. Petit à petit, essayez de le laisser à la maison pendant une journée entière.

4) Prévenez vos proches. Donnez-leur un autre moyen de vous contacter (téléphone fixe, e-mail) : comme ça, ils ne s'inquiéteront pas si vous ne décrochez pas tout de suite.`,
    questions: [
      { id: "b5-sansportable-q1", type: "short_answer", prompt: "À qui s'adresse ce document ?", answer: "Aux personnes qui veulent utiliser moins souvent leur téléphone portable." },
      { id: "b5-sansportable-q2", type: "multi_select", prompt: "Les conseils donnés permettent de réduire l'utilisation de :", options: ["du GPS.", "des jeux.", "des SMS.", "de la navigation sur Internet."], answer: ["du GPS.", "des jeux.", "des SMS.", "de la navigation sur Internet."] },
      { id: "b5-sansportable-q3", type: "short_answer", prompt: "Quel conseil pour quelqu'un qui veut aller dans un lieu inconnu sans utiliser son téléphone ?", answer: "Chercher le chemin sur un ordinateur à l'avance." },
      { id: "b5-sansportable-q4", type: "short_answer", prompt: "Comment rester en contact avec ses proches sans portable ?", answer: "En leur donnant un autre moyen de contact : téléphone fixe ou e-mail." },
      { id: "b5-sansportable-q5", type: "open", prompt: "Production écrite : vous voulez participer à une journée sans portable. Écrivez un e-mail à vos amis pour expliquer pourquoi et comment ils pourront vous contacter." },
    ],
  },

  // ── F · 16 levers de soleil (vidéo, p. 76) ───────────────────────
  {
    id: "b5-livre-16-levers-de-soleil",
    unit: 5,
    unitTitle: "En route vers le futur !",
    source: "livre",
    section: "culture(s)",
    page: 76,
    title: "16 levers de soleil",
    instruction: "Lisez ce résumé du document vidéo et répondez aux questions.",
    text: `16 levers de soleil est un film documentaire consacré à l'astronaute français Thomas Pesquet et à sa mission à bord de la Station spatiale internationale.

Le film montre différentes scènes : les entraînements avant le départ, le lancement de la fusée, la vie quotidienne à bord de la station, et la vue extraordinaire de la Terre depuis l'espace.

Le titre du film fait référence à un fait surprenant : en orbite autour de la Terre, la Station spatiale en fait le tour environ seize fois par jour. Les astronautes qui y vivent voient donc le soleil se lever... seize fois par jour !`,
    questions: [
      { id: "b5-levers-q1", type: "open", prompt: "Connaissez-vous Thomas Pesquet ? Quelle est sa profession ?" },
      { id: "b5-levers-q2", type: "multiple_choice", prompt: "De quel type de document s'agit-il ?", options: ["Une bande annonce.", "Un extrait de film documentaire.", "Un reportage sportif."], answer: "Un extrait de film documentaire." },
      { id: "b5-levers-q3", type: "short_answer", prompt: "Où se passent les scènes du film ?", answer: "Pendant les entraînements, au lancement, et à bord de la Station spatiale internationale." },
      { id: "b5-levers-q4", type: "multiple_choice", prompt: "Le film s'appelle « 16 levers de soleil » parce que dans l'espace, les astronautes voient :", options: ["16 levers de soleil par jour.", "16 levers de soleil par semaine."], answer: "16 levers de soleil par jour." },
    ],
  },

  // ── G · Connecté, même dans l'espace (p. 76) ─────────────────────
  {
    id: "b5-livre-connecte-espace",
    unit: 5,
    unitTitle: "En route vers le futur !",
    source: "livre",
    section: "culture(s)",
    page: 76,
    title: "Connecté, même dans l'espace",
    instruction: "Lisez l'article et répondez aux questions.",
    text: `Un selfie flottant en apesanteur, une petite séquence de guitare improvisée, ou simplement la vue de la Terre sous ses pieds : pendant son séjour à bord de la Station spatiale internationale (ISS), l'astronaute français Thomas Pesquet a fait sensation avec ses messages envoyés depuis les étoiles sur les réseaux sociaux. Il n'a pas déçu son million d'abonnés, avec déjà une vingtaine de messages publiés, en français et en anglais.

Thomas Pesquet publie-t-il lui-même ces messages depuis l'espace, avec un smartphone ? Pas tout à fait. En réalité, il choisit la majorité des messages que son équipe de communication publie depuis la Terre. Occasionnellement, il peut les envoyer lui-même grâce à un accès personnel à Internet.

L'essentiel des échanges passe par un système de mails : l'astronaute envoie textes et images à son équipe, qui les met en forme, les traduit si nécessaire, puis les lui renvoie pour validation avant de les publier. L'équipe peut faire des propositions, mais rien n'est jamais publié sans l'accord de l'astronaute.`,
    questions: [
      { id: "b5-connecte-q1", type: "short_answer", prompt: "À qui s'adressent les messages de Thomas Pesquet sur les réseaux sociaux ?", answer: "À son million d'abonnés." },
      { id: "b5-connecte-q2", type: "multiple_choice", prompt: "En général, ses messages sont envoyés :", options: ["depuis l'espace, directement avec son smartphone.", "depuis la Terre, par son équipe de communication."], answer: "depuis la Terre, par son équipe de communication." },
      { id: "b5-connecte-q3", type: "true_false", prompt: "Vrai ou faux ? Thomas Pesquet valide toujours les messages avant leur publication.", answer: true },
      { id: "b5-connecte-q4", type: "true_false", prompt: "Vrai ou faux ? C'est toujours l'équipe de communication qui traduit les messages si nécessaire.", answer: true },
      { id: "b5-connecte-q5", type: "open", prompt: "Production écrite : imaginez le message que Thomas Pesquet aurait pu publier en découvrant la Station spatiale pour la première fois." },
      { id: "b5-connecte-q6", type: "open", prompt: "Oh, le cliché ! On dit parfois que les Français sont mauvais en langues étrangères. Et dans votre pays, quelles langues apprend-on à l'école ?" },
    ],
  },

  // ── H · Je fais un rêve (BD, p. 78) ──────────────────────────────
  {
    id: "b5-livre-je-fais-un-reve",
    unit: 5,
    unitTitle: "En route vers le futur !",
    source: "livre",
    section: "compréhension écrite",
    page: 78,
    title: "Je fais un rêve",
    instruction: "Lisez le résumé de cette bande dessinée en 6 vignettes et répondez aux questions.",
    text: `Deux robots de service, un rouge et un jaune, travaillent côte à côte dans un restaurant. Le robot rouge semble fatigué et un peu triste : il porte des plateaux toute la journée, sans jamais s'arrêter.

Le soir, pendant la pause, le robot rouge confie à son collègue jaune : « Cette nuit, j'ai fait un rêve. Je rêvais que je n'étais plus un robot de service — je voyageais, je découvrais le monde, libre. »

Le robot jaune réfléchit un instant, puis répond : « C'est bien de rêver. Mais nous sommes des robots de service : demain, il faudra quand même retourner travailler. »

Sur la dernière image, le robot rouge regarde les étoiles à travers la fenêtre du restaurant, pensif.`,
    questions: [
      { id: "b5-reve-q1", type: "multiple_choice", prompt: "Quel est le rôle des deux robots ?", options: ["Jouer avec les enfants.", "Faire les tâches ménagères.", "Faire le service dans un restaurant."], answer: "Faire le service dans un restaurant." },
      { id: "b5-reve-q2", type: "short_answer", prompt: "Le robot rouge est-il heureux ? Pourquoi ?", answer: "Non, il semble fatigué et triste car il travaille sans arrêt." },
      { id: "b5-reve-q3", type: "multiple_choice", prompt: "Sur la dernière image, le robot jaune pense que :", options: ["les robots ne sont pas capables de rêver.", "les robots peuvent rêver mais doivent quand même travailler.", "les robots doivent réaliser leurs rêves."], answer: "les robots peuvent rêver mais doivent quand même travailler." },
      { id: "b5-reve-q4", type: "open", prompt: "Avez-vous des robots chez vous ? Si oui, à quoi servent-ils ? Si non, quel type de robot voudriez-vous avoir ?" },
      { id: "b5-reve-q5", type: "open", prompt: "À votre avis, un jour, les robots pourront-ils penser et avoir des émotions ?" },
    ],
  },

  // ── DELF · Compréhension des écrits — Des cadeaux technologiques (p. 82) ──
  {
    id: "b5-livre-delf-cadeaux-technologiques",
    unit: 5,
    unitTitle: "En route vers le futur !",
    source: "livre",
    section: "compréhension écrite",
    page: 82,
    title: "DELF A2 — Des cadeaux technologiques",
    instruction: "Vous adorez les technologies et voulez faire plaisir à vos ami(e)s avec un cadeau. Lisez ces publicités et associez chaque personne au bon produit. (6 points)",
    text: `Galac Tech 4 — Restez connecté(e) même pendant vos activités sportives ! Cette montre vous indiquera le nombre de kilomètres parcourus et les calories perdues.

Ludo vidéo — Avec ce jeu vidéo, vous pouvez jouer et apprendre en même temps. Vous choisissez votre niveau de difficulté en fonction de votre âge !

MG shiatsu — Vous avez besoin de vous détendre mais vous n'avez pas le temps ? En 30 minutes, ce coussin de massage vous offrira une détente complète pour le dos !

Roborock S7 — Vous aimez votre intérieur mais détestez nettoyer ? Ce robot-aspirateur fait le ménage à votre place !

Solar Nomade — Très pratique et écologique, ce chargeur sera votre meilleur ami pendant vos promenades, grâce aux rayons du soleil.

Explore V40 — Vous avez des difficultés à vous orienter ? Cet assistant de conduite vous indiquera les meilleurs chemins pour arriver à destination.`,
    questions: [
      { id: "b5-delf-q1", type: "multiple_choice", prompt: "Sophie passe beaucoup de temps sur les écrans. Quel cadeau lui offrir ?", options: ["Galac Tech 4", "Ludo vidéo", "Roborock S7"], answer: "Ludo vidéo" },
      { id: "b5-delf-q2", type: "multiple_choice", prompt: "Vincent apprend à conduire. Quel cadeau lui offrir ?", options: ["Explore V40", "Solar Nomade", "MG shiatsu"], answer: "Explore V40" },
      { id: "b5-delf-q3", type: "multiple_choice", prompt: "Amalia est très sportive. Quel cadeau lui offrir ?", options: ["Galac Tech 4", "Roborock S7", "Ludo vidéo"], answer: "Galac Tech 4" },
      { id: "b5-delf-q4", type: "multiple_choice", prompt: "Charles n'aime pas faire le ménage. Quel cadeau lui offrir ?", options: ["Roborock S7", "Solar Nomade", "Galac Tech 4"], answer: "Roborock S7" },
      { id: "b5-delf-q5", type: "multiple_choice", prompt: "Nadia est très stressée par son travail. Quel cadeau lui offrir ?", options: ["MG shiatsu", "Explore V40", "Ludo vidéo"], answer: "MG shiatsu" },
      { id: "b5-delf-q6", type: "multiple_choice", prompt: "Jérémy aime la nature et déteste gaspiller. Quel cadeau lui offrir ?", options: ["Solar Nomade", "MG shiatsu", "Roborock S7"], answer: "Solar Nomade" },
    ],
  },

  // ═══════════════ Unité 6 — En cuisine ═══════════════

  // ── A · Manger des légumes du jardin (p. 83) ──────────────────────
  {
    id: "b6-livre-legumes-jardin",
    unit: 6,
    unitTitle: "En cuisine",
    source: "livre",
    section: "compréhension écrite",
    page: 83,
    title: "Manger des légumes du jardin",
    instruction: "Guylaine Goulfier a écrit Guide de survie joyeuse pour donner des conseils et expliquer comment cultiver son jardin. Lisez son témoignage.",
    text: `Avant, je faisais ma liste de courses chaque semaine et j'achetais des produits que je cuisinais. Mais, j'ai eu des problèmes d'argent, alors j'ai commencé à jardiner. Par exemple, j'ai arrêté d'acheter de la salade et j'en ai mis dans mon jardin.

Aujourd'hui, bien sûr, je ne produis pas tous mes légumes. Je continue d'acheter les pommes de terre et les bottes d'oignons. Mais, je cultive des tomates, des courges, des haricots, parce que j'en consomme beaucoup. J'ai aussi une grande quantité d'herbes aromatiques.

De juillet à septembre, je plante plein de légumes qui vont occuper le terrain jusqu'en mars de l'année suivante : des poireaux, des choux, des carottes, des betteraves, des radis noirs et des endives.

Je cuisine mes légumes avec les œufs de mon poulailler, avec des yaourts et des fromages que je fais, avec des céréales (du riz), des légumes secs (des lentilles), un peu de miel et de la viande que j'achète.

En bref, j'aime être plus indépendante sur le plan alimentaire. Et si on habite en ville sans jardin, on peut aussi arrêter d'acheter des plats transformés, cuisiner et faire des conserves avec des produits de saison.

— Carine Mayo, Femme actuelle, octobre 2021`,
    questions: [
      { id: "b6-legumes-q1", type: "open", prompt: "D'où viennent les légumes que vous mangez ?" },
      { id: "b6-legumes-q2", type: "short_answer", prompt: "Pourquoi Guylaine Goulfier a commencé à cultiver des légumes ?", answer: "Elle a eu des problèmes d'argent." },
      { id: "b6-legumes-q3", type: "short_answer", prompt: "Pourquoi est-elle contente de cultiver son jardin ?", answer: "Elle aime être plus indépendante sur le plan alimentaire." },
      { id: "b6-legumes-q4", type: "matching", prompt: "Complétez le tableau : les aliments qu'elle produit / les aliments qu'elle achète.", answer: "Produit → tomates, courges, haricots, herbes aromatiques, poireaux, choux, carottes, betteraves, radis noirs, endives, œufs, yaourts, fromages, miel\nAchète → pommes de terre, bottes d'oignons, riz, lentilles, viande" },
      { id: "b6-legumes-q5", type: "multi_select", prompt: "Grammaire : relevez les phrases avec le pronom en.", options: ["J'en ai mis dans mon jardin.", "J'en consomme beaucoup.", "J'ai commencé à jardiner.", "Je ne produis pas tous mes légumes."], answer: ["J'en ai mis dans mon jardin.", "J'en consomme beaucoup."] },
      { id: "b6-legumes-q6", type: "open", prompt: "Production orale : à deux ! Que pensez-vous de ses conseils ? Est-ce que vous mangez ou voudriez manger de cette façon ?" },
    ],
  },

  // ── C · Une recette sucrée — Clafoutis aux fruits rouges (p. 85) ──
  {
    id: "b6-livre-clafoutis",
    unit: 6,
    unitTitle: "En cuisine",
    source: "livre",
    section: "compréhension écrite",
    page: 85,
    title: "Une recette sucrée — Clafoutis aux fruits rouges",
    instruction: "Lisez cette recette et repérez les instructions de cuisine (verbes à l'impératif).",
    text: `INGRÉDIENTS POUR 4 PERSONNES
20 cl de lait — 1 petit pot de crème liquide (20 cl) — 75 g de farine — 50 g de sucre en poudre — 1 g de sel (1 pincée) — 1 barquette de framboises (150 g) — 1 barquette de mûres (150 g) — 1 barquette de myrtilles (150 g) — 25 g de beurre — des groseilles ou un bouquet de menthe — de la glace à la vanille ou de la crème chantilly

PRÉPARATION
1. Préchauffez le four à 200°C.
2. Lavez et séchez les fruits rouges.
3. Dans un saladier, mélangez le lait avec la crème liquide, la farine, le sucre en poudre et une pincée de sel.
4. Mettez les framboises, les mûres et les myrtilles dans un plat beurré.
5. Versez la pâte sur les fruits.
6. Coupez le beurre en petits morceaux et posez-les dessus.
7. Enfournez le clafoutis et faites-le cuire pendant 35-40 minutes.
8. Sortez le gâteau du four quand le dessus est doré et laissez refroidir.
9. Ajoutez des feuilles de menthe ou des groseilles pour décorer.
10. Servez tiède avec une boule de glace à la vanille ou de la crème chantilly.

VARIANTES
Vous pouvez remplacer les fruits rouges par des poires, des prunes, des kiwis ou des bananes.

— Source : www.supertoinette.com`,
    questions: [
      { id: "b6-clafoutis-q1", type: "open", prompt: "Quels fruits rouges connaissez-vous ?" },
      { id: "b6-clafoutis-q2", type: "matching", prompt: "Classez les ingrédients dans le tableau : les fruits / les produits laitiers / les autres ingrédients.", answer: "Fruits → framboises, mûres, myrtilles\nProduits laitiers → lait, crème liquide, beurre, glace à la vanille\nAutres → farine, sucre en poudre, sel, menthe, groseilles" },
      { id: "b6-clafoutis-q3", type: "multiple_choice", prompt: "Dans ce gâteau, il y a :", options: ["plus de fruits que de pâte.", "plus de pâte que de fruits.", "autant de pâte que de fruits."], answer: "plus de pâte que de fruits." },
      { id: "b6-clafoutis-q4", type: "multi_select", prompt: "Grammaire : relevez les verbes à l'impératif de la préparation.", options: ["Préchauffez", "Lavez", "vous pouvez remplacer", "Ajoutez"], answer: ["Préchauffez", "Lavez", "Ajoutez"] },
      { id: "b6-clafoutis-q5", type: "multiple_choice", prompt: "Vocabulaire : le contraire du sucre en poudre est :", options: ["le sucre en morceaux.", "le sucre brun.", "le sucre glace."], answer: "le sucre en morceaux." },
      { id: "b6-clafoutis-q6", type: "open", prompt: "Production orale : à deux ! Est-ce que vous cuisinez ? Des plats sucrés ou salés ? Qui cuisine bien autour de vous ?" },
      { id: "b6-clafoutis-q7", type: "open", prompt: "Production écrite : choisissez un plat sucré ou salé que vous aimez et écrivez sa recette." },
    ],
  },

  // ── D · La charte Locmiam (p. 88) ──────────────────────────────────
  {
    id: "b6-livre-charte-locmiam",
    unit: 6,
    unitTitle: "En cuisine",
    source: "livre",
    section: "compréhension écrite",
    page: 88,
    title: "La charte Locmiam",
    instruction: "Locmiam est une application qui permet de commander des plats faits maison à des cuisiniers passionnés mais non professionnels. Lisez sa charte.",
    text: `« Je ne suis pas difficile, je suis un gourmet. »

Si vous voulez être cuisinier ou cuisinière Locmiam, vous devez respecter notre charte.

— Vous ne devez pas être cuisinier ou cuisinière de métier.
— Vous avez l'obligation de préparer uniquement des plats « faits maison ».
— Il est interdit de vendre vos plats de manière régulière. La vente doit rester occasionnelle.
— Utilisez toujours de l'eau potable.
— Il est indispensable de cuisiner des produits frais et de qualité.
— Faites attention aux températures de conservation des aliments.
— Il faut avoir une bonne hygiène personnelle. Quand vous cuisinez, portez un tablier propre, attachez-vous les cheveux et lavez-vous souvent les mains.
— Il est défendu de cuisiner dans des conditions non hygiéniques et non sécuritaires. Votre espace de travail doit être propre et ordonné.
— Attention ! Ne laissez pas d'animal entrer dans votre cuisine, c'est dangereux.
— Il faut donner un maximum d'informations utiles sur vos plats.
— Fixez toujours un prix juste.
— Respectez vos engagements (plats, quantités, prix, horaires).

☑ Oui, je m'engage à respecter la charte Locmiam.`,
    questions: [
      { id: "b6-locmiam-q1", type: "multiple_choice", prompt: "Une charte est :", options: ["un règlement.", "un menu."], answer: "un règlement." },
      { id: "b6-locmiam-q2", type: "multi_select", prompt: "Vrai ou faux ? Cochez les affirmations VRAIES.", options: ["Locmiam est réservée aux cuisiniers professionnels.", "Les cuisiniers doivent préparer les plats chez eux.", "Ils peuvent vendre des plats tous les jours.", "Respecter les règles d'hygiène et de sécurité alimentaire est obligatoire.", "Il faut bien décrire les plats et ne pas faire payer trop cher."], answer: ["Respecter les règles d'hygiène et de sécurité alimentaire est obligatoire.", "Il faut bien décrire les plats et ne pas faire payer trop cher."] },
      { id: "b6-locmiam-q3", type: "multiple_choice", prompt: "Choisissez l'image de la cuisine où il faut cuisiner.", options: ["une cuisine en désordre, avec un chat.", "une cuisine propre et rangée."], answer: "une cuisine propre et rangée." },
      { id: "b6-locmiam-q4", type: "multi_select", prompt: "Grammaire : relevez les expressions d'obligation et d'interdiction.", options: ["Vous avez l'obligation de préparer…", "Il est interdit de vendre…", "Il est indispensable de cuisiner…", "Vous devez respecter notre charte.", "Vous ne devez pas être cuisinier de métier."], answer: ["Vous avez l'obligation de préparer…", "Il est interdit de vendre…", "Il est indispensable de cuisiner…", "Vous ne devez pas être cuisinier de métier."] },
      { id: "b6-locmiam-q5", type: "open", prompt: "Est-ce que vous voudriez utiliser cette application pour acheter des plats ou pour cuisiner ?" },
    ],
  },

  // ── F · Au bistrot (p. 90) ─────────────────────────────────────────
  {
    id: "b6-livre-au-bistrot",
    unit: 6,
    unitTitle: "En cuisine",
    source: "livre",
    section: "culture(s)",
    page: 90,
    title: "Au bistrot",
    instruction: "Lisez cet article sur les bistrots parisiens et répondez aux questions.",
    text: `Quand on vous dit « bistrot » vous pensez à quoi ? À Paris bien sûr ! Il y a des crêpes en Bretagne, des tartiflettes à la montagne, des saucisses en Alsace, du confit de canard dans le Sud et des bistrots à Paris. Dans ces cafés-bars-restaurants aussi appelés brasseries, on boit un verre, on grignote et on mange des plats traditionnels.

Des nappes à carreaux rouges et blancs, un service rapide, une ambiance populaire et familiale, voilà pourquoi les bistrots parisiens ont du succès ! On y retrouve souvent les mêmes entrées et des plats simples mais goûteux, comme le pâté, le croque-monsieur, les petites salades, le poulet rôti avec ses frites ou sa purée, le bœuf bourguignon, le pot-au-feu, la choucroute ou le très classique poireaux-vinaigrette.

— Source : www.cometoparis.com`,
    questions: [
      { id: "b6-bistrot-q1", type: "open", prompt: "Décrivez l'image. Comment s'appelle ce type de restaurant ?" },
      { id: "b6-bistrot-q2", type: "short_answer", prompt: "Cet article présente les bistrots comme une spécialité de quelle ville ?", answer: "Paris." },
      { id: "b6-bistrot-q3", type: "multi_select", prompt: "Qu'est-ce qui plaît dans les bistrots ?", options: ["Les nappes à carreaux rouges et blancs.", "Un service rapide.", "Une ambiance populaire et familiale.", "Des plats très chers et raffinés."], answer: ["Les nappes à carreaux rouges et blancs.", "Un service rapide.", "Une ambiance populaire et familiale."] },
      { id: "b6-bistrot-q4", type: "open", prompt: "Production orale : à deux ! Où préférez-vous manger ? Pourquoi ?" },
    ],
  },

  // ── I · Ça vous a plu ? (p. 93) ────────────────────────────────────
  {
    id: "b6-livre-ca-vous-a-plu",
    unit: 6,
    unitTitle: "En cuisine",
    source: "livre",
    section: "compréhension écrite",
    page: 93,
    title: "Ça vous a plu ?",
    instruction: "Lisez ces trois avis laissés en ligne sur un restaurant et répondez aux questions.",
    text: `S'abonner — Avis

Teamclassique ★★★★☆
Le cadre avec vue sur la mer est agréable. Le personnel est sympathique et professionnel. Mais je ne donne que quatre étoiles sur cinq parce que, ce soir, les plats étaient un peu trop épicés pour moi.

Papygrognon ★☆☆☆☆
Je n'aime pas attendre et, dans ce restaurant, le service est trop lent. Il faut patienter une demi-heure entre chaque plat. C'est une honte ! Et en plus, les plats sont mauvais. Dans ces conditions, c'est scandaleux de payer aussi cher ! Je ne mets qu'une étoile, et encore, je suis gentil.

Miam-miam ★★★★★
Un régal ! La cuisine est délicieuse, les desserts sont excellents et les prix sont très corrects. J'ai eu un coup de cœur pour ce restaurant. Je suis ravie de cette expérience ; je ne peux en dire que du bien.`,
    questions: [
      { id: "b6-avis-q1", type: "open", prompt: "Numérotez du plus au moins important pour vous quand vous mangez au restaurant : l'ambiance – le cadre – la présentation des plats – la qualité des plats – le prix – le service." },
      { id: "b6-avis-q2", type: "short_answer", prompt: "Combien d'avis sur ce restaurant sont positifs ? négatifs ? un peu des deux ?", answer: "1 avis très positif (Miam-miam), 1 avis négatif (Papygrognon), 1 avis un peu des deux (Teamclassique)." },
      { id: "b6-avis-q3", type: "multi_select", prompt: "Quels sont les points positifs de ce restaurant ?", options: ["Le cadre avec vue sur la mer.", "Le personnel sympathique et professionnel.", "Le service rapide.", "Les desserts excellents.", "Les prix très corrects."], answer: ["Le cadre avec vue sur la mer.", "Le personnel sympathique et professionnel.", "Les desserts excellents.", "Les prix très corrects."] },
      { id: "b6-avis-q4", type: "multi_select", prompt: "Grammaire : relevez les phrases avec ne… que.", options: ["Je ne donne que quatre étoiles sur cinq.", "Je ne mets qu'une étoile.", "Je ne peux en dire que du bien.", "Le service est trop lent."], answer: ["Je ne donne que quatre étoiles sur cinq.", "Je ne mets qu'une étoile.", "Je ne peux en dire que du bien."] },
      { id: "b6-avis-q5", type: "open", prompt: "Production écrite (DELF) : choisissez un restaurant que vous connaissez, et écrivez un commentaire pour exprimer votre satisfaction ou votre insatisfaction. Décrivez le lieu, le repas et vos impressions (60-80 mots)." },
    ],
  },

  // ── J · Une roulotte à Tahiti (vidéo, p. 93) ───────────────────────
  {
    id: "b6-livre-roulotte-tahiti",
    unit: 6,
    unitTitle: "En cuisine",
    source: "livre",
    section: "culture(s)",
    page: 93,
    title: "Une roulotte à Tahiti",
    instruction: "Lisez ce résumé du document vidéo sur les roulottes tahitiennes et répondez aux questions.",
    text: `À Tahiti, les roulottes sont une véritable tradition : ces camions-restaurants garés sur les places et le long des routes servent à manger toute la journée, du petit déjeuner jusqu'au dîner. Ce type de restauration plaît à beaucoup de monde, pas seulement aux touristes — les habitants eux-mêmes s'y retrouvent régulièrement.

Les plats servis dans les roulottes sont simples et frais : poissons crus marinés, grillades, chow mein, et bien sûr le poké, ce plat d'origine hawaïenne à base de poisson cru coupé en dés. Le poké bowl contient une base de riz vinaigré, du saumon ou du thon et quelques légumes et fruits froids.

Au fait ! Le poké est un plat d'origine hawaïenne avec du poisson cru coupé en dés. Le poké bowl contient une base de riz vinaigré, du saumon ou du thon et quelques légumes et fruits froids.`,
    questions: [
      { id: "b6-roulotte-q1", type: "open", prompt: "Savez-vous où se situe Tahiti ? À votre avis, qu'est-ce qu'une roulotte ?" },
      { id: "b6-roulotte-q2", type: "multi_select", prompt: "Choisissez les bonnes réponses.", options: ["À Tahiti, les roulottes sont une tradition.", "À Tahiti, les roulottes sont une nouvelle mode.", "Ce type de restaurant plaît à beaucoup de monde.", "Ce type de restaurant plaît seulement aux touristes.", "On y sert à manger toute la journée."], answer: ["À Tahiti, les roulottes sont une tradition.", "Ce type de restaurant plaît à beaucoup de monde.", "On y sert à manger toute la journée."] },
      { id: "b6-roulotte-q3", type: "multiple_choice", prompt: "Les plats des roulottes sont :", options: ["gras et salés.", "simples et frais."], answer: "simples et frais." },
      { id: "b6-roulotte-q4", type: "short_answer", prompt: "Qu'est-ce qu'un poké bowl ?", answer: "Une base de riz vinaigré avec du poisson cru (saumon ou thon) et des légumes/fruits froids." },
      { id: "b6-roulotte-q5", type: "open", prompt: "Production écrite : à deux ! Imaginez que vous créez une roulotte dans le pays, la région ou la ville de votre choix. Décidez ensemble de ses spécialités, ses horaires, les endroits où la garer, sa décoration, etc." },
    ],
  },
];

export default editoA2ReadingComprehension;
