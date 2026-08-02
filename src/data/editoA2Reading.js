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
];

export default editoA2ReadingComprehension;
