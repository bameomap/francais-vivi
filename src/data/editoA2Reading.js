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

  // ═══════════════ Unité 7 — À votre santé ! ═══════════════

  // ── A · Pour bien dormir… (p. 97) ──────────────────────────────────
  {
    id: "b7-livre-bien-dormir",
    unit: 7,
    unitTitle: "À votre santé !",
    source: "livre",
    section: "compréhension écrite",
    page: 97,
    title: "Pour bien dormir…",
    instruction: "Vous n'êtes pas en pleine forme au réveil ? Voici quelques conseils pratiques de Nicolas, notre coach bien-être.",
    text: `Vous n'êtes pas en pleine forme au réveil ? Vous avez des douleurs musculaires ? Saviez-vous que la qualité de votre repos dépend en partie de votre manière de dormir ? Il est donc important d'être attentif à votre position de sommeil.
Voici quelques conseils pratiques de Nicolas, notre coach bien-être.

SUR LE CÔTÉ
Si vous avez mal au dos, il est conseillé de dormir sur le côté. Par contre, la colonne vertébrale subit des tensions car elle n'est pas alignée avec le cou. Il faut donc poser votre tête au milieu de l'oreiller : cet oreiller doit toucher votre épaule. Je vous recommande également de placer un oreiller entre vos jambes et un autre sous votre bras pour le surélever, vous relâchez ainsi les tensions dans le haut du corps.

SUR LE DOS
Placez votre tête au milieu de l'oreiller, le cou sera bien calé. Pour éviter de tordre votre colonne vertébrale, mettez un oreiller sous vos genoux. Vos chevilles seront plus reposées : l'oreiller leur évite des tensions inutiles.

SUR LE VENTRE
Je vous déconseille de dormir sur le ventre, c'est mauvais pour le dos. Évitez en général les positions qui lui imposent des tensions. Si vous préférez cette position, placez des oreillers sous votre corps : ventre, cuisses, genoux et pieds.

Dans tous les cas, changez de position régulièrement pendant la nuit pour éviter les courbatures.

… et pour bien se réveiller :
Au réveil, restez allongé(e) quelques minutes et étirez-vous. Mettez-vous en position assise et attendez encore un instant pour habituer votre corps qui a été au repos toute la nuit. Enfin levez-vous doucement pour ne pas avoir de vertiges quand vous êtes debout.`,
    questions: [
      { id: "b7-dormir-q1", type: "open", prompt: "Entrée en matière : aimez-vous dormir ?" },
      { id: "b7-dormir-q2", type: "short_answer", prompt: "Qui donne des conseils pour mieux dormir ?", answer: "Nicolas, le coach bien-être." },
      { id: "b7-dormir-q3", type: "short_answer", prompt: "Que peut provoquer une mauvaise position de sommeil ?", answer: "Des douleurs musculaires, des tensions dans la colonne vertébrale et des courbatures." },
      { id: "b7-dormir-q4", type: "short_answer", prompt: "À qui conseille-t-on la position sur le côté ?", answer: "Aux personnes qui ont mal au dos." },
      { id: "b7-dormir-q5", type: "short_answer", prompt: "Où placer des oreillers pour mieux dormir sur le dos ?", answer: "Sous les genoux (et la tête au milieu de l'oreiller)." },
      { id: "b7-dormir-q6", type: "multiple_choice", prompt: "Est-il conseillé de dormir sur le ventre ?", options: ["Oui, c'est la meilleure position.", "Non, c'est déconseillé, c'est mauvais pour le dos."], answer: "Non, c'est déconseillé, c'est mauvais pour le dos." },
      { id: "b7-dormir-q7", type: "multi_select", prompt: "Grammaire : relevez les pronoms COD et COI dans le texte.", options: ["Je vous recommande de placer un oreiller.", "L'oreiller leur évite des tensions inutiles.", "Je vous déconseille de dormir sur le ventre.", "Il est important d'être attentif à votre position."], answer: ["Je vous recommande de placer un oreiller.", "L'oreiller leur évite des tensions inutiles.", "Je vous déconseille de dormir sur le ventre."] },
      { id: "b7-dormir-q8", type: "open", prompt: "Et vous, dans quelle position dormez-vous ?" },
      { id: "b7-dormir-q9", type: "open", prompt: "Production orale : à deux ! Un(e) de vos amis vous explique qu'il/elle dort très mal. Vous lui donnez des conseils pour mieux dormir." },
    ],
  },

  // ── C · Le cycle du sommeil (infographie, p. 100) ───────────────────
  {
    id: "b7-livre-cycle-sommeil",
    unit: 7,
    unitTitle: "À votre santé !",
    source: "livre",
    section: "compréhension écrite",
    page: 100,
    title: "Le cycle du sommeil",
    instruction: "Infographie : pour passer une bonne nuit, il faut compter 4 à 5 cycles d'environ 90 minutes chacun. Lisez les 5 phases.",
    text: `1. ENDORMISSEMENT (5 à 10 minutes) — Bâillements, engourdissement.

2. SOMMEIL LENT LÉGER (10 à 15 minutes) — Le cerveau est réceptif mais ne comprend plus. Respiration et rythme cardiaque plus lents.

3. SOMMEIL PROFOND (30 minutes) — Le cerveau ne perçoit plus rien. Respiration très lente, muscles relâchés.

4. SOMMEIL TRÈS PROFOND (30 minutes) — Étape cruciale de récupération. Le corps se remet de la fatigue physique de la journée.

5. SOMMEIL PARADOXAL (10 à 15 minutes) — Respiration et rythme cardiaque irréguliers. Déclenchement des rêves. Lorsque ce cycle prend fin, on peut se réveiller ou reprendre un cycle de sommeil lent léger.

— Source : www.lefigaro.fr, André De Chastenet`,
    questions: [
      { id: "b7-cycle-q1", type: "open", prompt: "Entrée en matière : que savez-vous du cycle du sommeil ?" },
      { id: "b7-cycle-q2", type: "matching", prompt: "Quelles sont les cinq phases d'un cycle de sommeil, dans l'ordre ?", answer: "1. Endormissement → 2. Sommeil lent léger → 3. Sommeil profond → 4. Sommeil très profond → 5. Sommeil paradoxal" },
      { id: "b7-cycle-q3", type: "short_answer", prompt: "À partir de quelle phase le cerveau ne sent-il plus rien ?", answer: "À partir du sommeil profond (phase 3)." },
      { id: "b7-cycle-q4", type: "true_false", prompt: "Vrai ou faux ? On rêve pendant toutes les phases de sommeil.", answer: false },
      { id: "b7-cycle-q5", type: "open", prompt: "Production orale : faire un beau rêve, c'est rêver de quoi ? de succès, de voyage, d'amour ?" },
    ],
  },

  // ── D · Les meilleures plantes pour les tisanes (p. 101) ────────────
  {
    id: "b7-livre-plantes-tisanes",
    unit: 7,
    unitTitle: "À votre santé !",
    source: "livre",
    section: "compréhension écrite",
    page: 101,
    title: "Les meilleures plantes pour les tisanes",
    instruction: "Lisez la présentation de six plantes médicinales et de leurs bienfaits.",
    text: `Le thym : le thym est une plante aromatique et un formidable remède. Il est le plus souvent utilisé pour les maux de gorge, la toux et le rhume, mais il est aussi efficace pour les problèmes digestifs.

Le romarin : c'est le romarin qui soulage le mieux les migraines. Il donne de l'énergie en cas de stress ou d'anxiété et il est bénéfique pour la concentration et la mémoire. C'est une plante qui donne du tonus.

La lavande : cette plante est antiseptique¹ et aide à s'endormir. Elle soigne également les indigestions, les problèmes de peau et les piqûres d'insectes.

L'eucalyptus : c'est la plus efficace des plantes contre les rhumes et les infections grâce à son pouvoir antiseptique. L'eucalyptus est particulièrement efficace contre la fièvre.

Le millepertuis : c'est peut-être la plante la moins connue de cette liste mais c'est un excellent remède contre les insomnies et l'anxiété.

L'échinacée : c'est une plante intéressante pour ses propriétés² antibiotiques, elle est efficace pour aider le système immunitaire. Elle soulage entre autres les allergies ou encore l'asthme.

1 Désinfectante. 2 Qualités.`,
    questions: [
      { id: "b7-plantes-q1", type: "open", prompt: "Entrée en matière : utilisez-vous des plantes pour vous soigner ?" },
      { id: "b7-plantes-q2", type: "open", prompt: "1re lecture : connaissez-vous les plantes de ce document ?" },
      { id: "b7-plantes-q3", type: "matching", prompt: "Quelles plantes sont efficaces : a. contre le mal de tête ? b. en cas de problèmes de sommeil ? c. contre les allergies ? d. pour protéger le corps des infections ?", answer: "a. le romarin\nb. la lavande, le millepertuis\nc. l'échinacée\nd. l'eucalyptus, l'échinacée" },
      { id: "b7-plantes-q4", type: "short_answer", prompt: "Quelle plante peut être utile aux étudiants ?", answer: "Le romarin (bénéfique pour la concentration et la mémoire)." },
      { id: "b7-plantes-q5", type: "short_answer", prompt: "Vocabulaire : retrouvez dans le texte une expression qui signifie « apporter de l'énergie ».", answer: "Donner du tonus." },
      { id: "b7-plantes-q6", type: "open", prompt: "Production écrite : vous avez découvert une nouvelle plante médicinale. Imaginez son nom et ses bienfaits." },
    ],
  },

  // ── G · Le transport d'urgence au Québec (p. 104) ───────────────────
  {
    id: "b7-livre-transport-urgence-quebec",
    unit: 7,
    unitTitle: "À votre santé !",
    source: "livre",
    section: "culture(s)",
    page: 104,
    title: "Le transport d'urgence au Québec",
    instruction: "Lisez ce texte sur l'histoire du transport d'urgence à Montréal et au Québec.",
    text: `Jusqu'aux années 50, la ville de Montréal ne propose pas de service ambulancier municipal aux citoyens victimes d'accidents de la circulation. Ce sont les pompes funèbres qui prennent en charge les blessés.
Pour les aider, la mairie engage environ 120 policiers en 1959. Ils vont conduire des ambulances.
La première loi sur les services de transport d'urgence est de 1972. Les entreprises privées doivent avoir un permis pour proposer des services ambulanciers.
À partir de 1973, le transport ambulancier est réglementé. Les ambulanciers doivent être diplômés pour exercer leur métier et les entreprises de transport d'urgence doivent avoir des équipements adaptés.
En 1977, les habitants de Laval sont les premiers au Québec à avoir un numéro central d'urgence : le 911. À la centrale d'urgence, les appels sont traités et renvoyés vers les pompiers, les ambulanciers ou les policiers, selon le cas.

— www.urgences-sante.qc`,
    questions: [
      { id: "b7-quebec-q1", type: "matching", prompt: "Quel titre correspond à chaque paragraphe du document ? a. Une réglementation plus stricte. b. Un numéro pour les urgences. c. La naissance du service d'ambulance. d. Une première loi pour les services privés d'urgence.", answer: "§1 → c. La naissance du service d'ambulance.\n§2-3 → d. Une première loi pour les services privés d'urgence.\n§4 → a. Une réglementation plus stricte.\n§5 → b. Un numéro pour les urgences." },
      { id: "b7-quebec-q2", type: "short_answer", prompt: "Qui conduisait les premières ambulances ?", answer: "Des policiers engagés par la mairie (environ 120 en 1959)." },
      { id: "b7-quebec-q3", type: "short_answer", prompt: "Quelles sont les conditions pour travailler comme ambulancier à partir de 1973 ?", answer: "Être diplômé et travailler pour une entreprise ayant des équipements adaptés." },
      { id: "b7-quebec-q4", type: "open", prompt: "Production écrite : aimeriez-vous travailler dans un service d'urgence (comme pompier(ère), ambulancier(ère)…) ? Expliquez pourquoi dans un court texte." },
      { id: "b7-quebec-q5", type: "open", prompt: "Oh, le cliché ! « Les Français consomment beaucoup d'antibiotiques. » Les Français sont parmi les plus gros consommateurs d'antibiotiques au monde et se trouvent au troisième rang européen. Depuis quelques années, les organisations de santé alertent sur cette surconsommation. Et dans votre pays, quelle est la situation ?" },
    ],
  },

  // ── H · Les Mille et Une Vies des urgences (BD, p. 106) ─────────────
  {
    id: "b7-livre-bd-urgences",
    unit: 7,
    unitTitle: "À votre santé !",
    source: "livre",
    section: "compréhension écrite",
    page: 106,
    title: "Les Mille et Une Vies des urgences",
    instruction: `Bande dessinée en 3 vignettes, intitulée « L'effet placebo du soignant¹ ». Vignette 1 : un jeune étudiant en médecine à l'allure décontractée à côté d'un médecin âgé aux lunettes à monture noire, barbe naissante, voix « Uncle Ben's », chemise de grand-père, stéthoscope dans la poche — « C'est ce gamin qui va me soigner ? » se demande le patient. Vignette 2 : texte « Étant un peu renard² et doutant encore de ma technique, je "placébolise" mes patients avec mon allure de jeune-futur-vieux professeur de médecine. » Vignette 3 : deux personnages se serrent la main devant un bâtiment hospitalier — « Baptiste, interne³ aux Urgences. Que puis-je pour vous ? » — « Je me sens déjà mieux, docteur. »`,
    text: `1 Personne qui soigne, médecin, infirmier... 2 Être malin. 3 Étudiant en médecine en fin de cursus.

— D. Mermoux, B. Beaulieu, Les Mille et Une Vies des urgences, 2017`,
    questions: [
      { id: "b7-bd-q1", type: "open", prompt: "Entrée en matière : expliquez ce qu'est l'effet placebo." },
      { id: "b7-bd-q2", type: "short_answer", prompt: "Décrivez le jeune homme en haut à gauche. Pourquoi les patients ne lui font pas confiance ?", answer: "C'est un jeune étudiant en médecine à l'allure décontractée ; les patients doutent de sa compétence parce qu'il paraît trop jeune." },
      { id: "b7-bd-q3", type: "short_answer", prompt: "Qu'essaie de changer l'étudiant en médecine dans son apparence ?", answer: "Il adopte une allure de « jeune-futur-vieux professeur » : lunettes à monture noire, barbe naissante, chemise de grand-père, stéthoscope dans la poche." },
      { id: "b7-bd-q4", type: "short_answer", prompt: "Où se trouve-t-il sur la dernière image ?", answer: "Devant un bâtiment hospitalier, aux Urgences." },
      { id: "b7-bd-q5", type: "short_answer", prompt: "Avec qui parle-t-il ?", answer: "Avec un patient / une patiente qu'il accueille aux Urgences." },
      { id: "b7-bd-q6", type: "short_answer", prompt: "Qu'imagine-t-il ?", answer: "Que son apparence de médecin expérimenté rassure le patient et crée un effet placebo (« Je me sens déjà mieux »)." },
      { id: "b7-bd-q7", type: "multiple_choice", prompt: "Vocabulaire : que signifie le mot « allure » ici ?", options: ["Apparence.", "Compétence.", "Sensation."], answer: "Apparence." },
      { id: "b7-bd-q8", type: "open", prompt: "Production orale (DELF) : dans sa transformation d'étudiant à médecin, quel élément est le plus convaincant selon vous ?" },
    ],
  },

  // ── I · Médecine d'Outre-mer (vidéo, p. 107) ────────────────────────
  {
    id: "b7-livre-medecine-outremer",
    unit: 7,
    unitTitle: "À votre santé !",
    source: "livre",
    section: "culture(s)",
    page: 107,
    title: "Médecine d'Outre-mer",
    instruction: "Lisez ce résumé du document vidéo sur les médecines traditionnelles à La Réunion et répondez aux questions.",
    text: `Ce document présente une infirmière réunionnaise, dans un couloir d'hôpital, en tenue blanche. Le documentaire s'ouvre sur les paysages de l'île de La Réunion, un territoire français d'Outre-mer.

Les Réunionnais utilisent depuis longtemps des méthodes traditionnelles pour se soigner, à côté de la médecine moderne : plantes médicinales, tisanes, remèdes transmis de génération en génération. Yohan, natif de La Réunion, parcourt son île pour rencontrer les personnes qui connaissent et utilisent encore ces remèdes traditionnels.

Contre l'hypertension et le diabète, deux maladies très répandues sur l'île, les Réunionnais utilisent notamment des plantes locales en complément des traitements médicaux classiques.`,
    questions: [
      { id: "b7-outremer-q1", type: "open", prompt: "Entrée en matière : regardez la photo. Décrivez cette personne. Où se trouve-t-elle ?" },
      { id: "b7-outremer-q2", type: "open", prompt: "1er visionnage (du début à « natif de La Réunion ») : décrivez les paysages." },
      { id: "b7-outremer-q3", type: "open", prompt: "De quoi va-t-on parler dans ce documentaire à votre avis ?" },
      { id: "b7-outremer-q4", type: "short_answer", prompt: "2e visionnage : quelles méthodes utilisent les Réunionnais pour se soigner ?", answer: "Des méthodes traditionnelles : plantes médicinales, tisanes et remèdes transmis de génération en génération, en complément de la médecine moderne." },
      { id: "b7-outremer-q5", type: "short_answer", prompt: "Qui est Yohan ? Pourquoi va-t-il parcourir son île ?", answer: "Un habitant natif de La Réunion qui parcourt l'île pour rencontrer les personnes qui connaissent les remèdes traditionnels." },
      { id: "b7-outremer-q6", type: "short_answer", prompt: "Qu'utilisent les Réunionnais contre l'hypertension et le diabète ?", answer: "Des plantes locales, en complément des traitements médicaux classiques." },
      { id: "b7-outremer-q7", type: "open", prompt: "Production orale : que pensez-vous des médecines traditionnelles ?" },
    ],
  },

  // ── J · Que faire en cas d'urgence ? (p. 109) ───────────────────────
  {
    id: "b7-livre-que-faire-urgence",
    unit: 7,
    unitTitle: "À votre santé !",
    source: "livre",
    section: "compréhension écrite",
    page: 109,
    title: "Que faire en cas d'urgence ?",
    instruction: "Seulement 20 % des Français sont formés aux gestes de premiers secours. Faites ce petit test proposé par des secouristes et formateurs.",
    text: `Seulement 20 % des Français sont formés aux gestes de premiers secours. Pour nous, secouristes et formateurs, ce n'est pas suffisant. Nous pensons que les formations gratuites aux gestes d'urgence ne sont pas assez nombreuses. Accident, brûlure, malaise... dans ce genre de situation, garder son calme est très important. Nous vous proposons un petit test.

À votre avis, que faut-il faire dans les situations suivantes ?

1. Que faire en cas d'accident corporel ?
   a. Protéger, alerter, secourir.
   b. Alerter, protéger, secourir.
   c. Secourir, alerter, protéger.

2. En cas d'accident dans l'Union européenne, quel numéro d'urgence faut-il appeler ?
   a. Le 15
   b. Le 18
   c. Le 112

3. Comment vérifier qu'une personne inconsciente respire ?
   a. Vous la tournez en douceur sur le côté.
   b. Vous regardez si sa poitrine se soulève.
   c. Vous pratiquez du bouche-à-bouche.

4. Parmi les actions suivantes, lesquelles sont utiles pour faciliter l'arrivée des secours sur le lieu d'un accident ?
   a. Indiquer aux secours l'adresse exacte du lieu de l'accident.
   b. Laisser la victime et aller à la rencontre de l'ambulance.
   c. Envoyer quelqu'un à la rencontre de l'ambulance.

Réponses : 1. a. – 2. c. – 3. b. – 4. a./c.`,
    questions: [
      { id: "b7-urgence-q1", type: "short_answer", prompt: "1re lecture (1er paragraphe) : quel est le constat des secouristes et formateurs ?", answer: "Seulement 20 % des Français sont formés aux gestes de premiers secours, et les formations gratuites ne sont pas assez nombreuses." },
      { id: "b7-urgence-q2", type: "short_answer", prompt: "Quelle attitude est la bonne en cas d'urgence ?", answer: "Garder son calme." },
      { id: "b7-urgence-q3", type: "multiple_choice", prompt: "Faites le test — question 1 : que faire en cas d'accident corporel ?", options: ["Protéger, alerter, secourir.", "Alerter, protéger, secourir.", "Secourir, alerter, protéger."], answer: "Protéger, alerter, secourir." },
      { id: "b7-urgence-q4", type: "multiple_choice", prompt: "Question 2 : en cas d'accident dans l'Union européenne, quel numéro d'urgence faut-il appeler ?", options: ["Le 15", "Le 18", "Le 112"], answer: "Le 112" },
      { id: "b7-urgence-q5", type: "multiple_choice", prompt: "Question 3 : comment vérifier qu'une personne inconsciente respire ?", options: ["Vous la tournez en douceur sur le côté.", "Vous regardez si sa poitrine se soulève.", "Vous pratiquez du bouche-à-bouche."], answer: "Vous regardez si sa poitrine se soulève." },
      { id: "b7-urgence-q6", type: "multi_select", prompt: "Question 4 : parmi les actions suivantes, lesquelles sont utiles pour faciliter l'arrivée des secours ?", options: ["Indiquer aux secours l'adresse exacte du lieu de l'accident.", "Laisser la victime et aller à la rencontre de l'ambulance.", "Envoyer quelqu'un à la rencontre de l'ambulance."], answer: ["Indiquer aux secours l'adresse exacte du lieu de l'accident.", "Envoyer quelqu'un à la rencontre de l'ambulance."] },
      { id: "b7-urgence-q7", type: "open", prompt: "Lisez les réponses. Avez-vous appris des choses dans ce test ?" },
      { id: "b7-urgence-q8", type: "open", prompt: "Production écrite : doit-on enseigner les gestes de premiers secours selon vous ? Pourquoi ?" },
    ],
  },

  // ── DELF · Compréhension des écrits — Parcours de santé (p. 110) ────
  {
    id: "b7-livre-delf-parcours-sante",
    unit: 7,
    unitTitle: "À votre santé !",
    source: "livre",
    section: "compréhension écrite",
    page: 110,
    title: "DELF A2 — Parcours de santé en famille",
    instruction: "Vous faites partie d'une association « Famille et Santé » et vous recevez ce courriel. Pour répondre aux questions, cochez la bonne réponse. (6 points)",
    text: `De : assofamillesante@edito.fr
Objet : parcours de santé 2 février

Chers membres,

Nous vous invitons à notre premier événement de l'année : un parcours de santé en famille le dimanche 2 février.

Programme :
09 h 00 : Rendez-vous à l'association
09 h 30 : Départ pour deux heures de marche sportive
12 h 00 : Déjeuner (prévoir un pique-nique)
14 h 00 : Balade-découverte des plantes sauvages (animée par Léa)
15 h 00 : Atelier de fabrication de tisanes (avec Matteo)
16 h 00 : Activités sportives et jeux concours (avec Livia). Des cadeaux pour les gagnants : jeux de cartes, ballons, billes…
17 h 00 : Retour à l'association.

Merci de confirmer votre présence par e-mail à assofamillesante@gmail.com au plus tard le 2 février.

Nous recherchons aussi des personnes pour aider à l'organisation de nos prochains événements : yoga famille le 8 mars / week-end à la mer / soirée spéciale alimentation. Si vous êtes intéressé(e), contactez Sophie au 07 21 54 40 65.

À bientôt !
L'association Famille Santé`,
    questions: [
      { id: "b7-delf-q1", type: "multiple_choice", prompt: "Quelle est la première activité de l'événement organisé par l'association ?", options: ["Un pique-nique.", "Une marche sportive.", "Un jeu de cartes."], answer: "Une marche sportive." },
      { id: "b7-delf-q2", type: "multiple_choice", prompt: "Le premier événement a lieu…", options: ["le 2 février.", "le 8 février.", "le 2 mars."], answer: "le 2 février." },
      { id: "b7-delf-q3", type: "multiple_choice", prompt: "L'activité sports et jeux est animée par…", options: ["Matteo.", "Léa.", "Livia."], answer: "Livia." },
      { id: "b7-delf-q4", type: "multiple_choice", prompt: "Que peut-on gagner ?", options: ["Des bonbons colorés.", "Des jeux de cartes.", "Une pile de livres."], answer: "Des jeux de cartes." },
      { id: "b7-delf-q5", type: "multiple_choice", prompt: "Vous voulez participer au premier événement, vous devez…", options: ["envoyer un courriel.", "téléphoner à Sophie.", "aller à l'association."], answer: "envoyer un courriel." },
      { id: "b7-delf-q6", type: "multiple_choice", prompt: "L'association cherche aussi des personnes pour…", options: ["animer les prochains événements.", "participer aux prochains événements.", "préparer les prochains événements."], answer: "préparer les prochains événements." },
    ],
  },

  // ═══════════════ Unité 8 — Dans les médias ═══════════════

  // ── A · L'actualité en BD (p. 112) ──────────────────────────────────
  {
    id: "b8-livre-actualite-bd",
    unit: 8,
    unitTitle: "Dans les médias",
    source: "livre",
    section: "compréhension écrite",
    page: 112,
    title: "L'actualité en BD",
    instruction: "Découvrez La Revue Dessinée, un magazine qui raconte l'actualité en bande dessinée.",
    text: `La Revue Dessinée — « L'actualité en bande dessinée »
🕐 tous les trois mois · ✅ en librairie ou sur abonnement · 📖 18 € / 228 pages d'enquêtes et de reportages · ✏️ réalisée en équipe par des dessinateurs et des journalistes

La Revue Dessinée raconte l'actualité en bande dessinée. Elle propose une information critique et engagée, grâce à des enquêtes, des reportages et des documentaires réalisés en équipe par des dessinateurs et des journalistes. La Revue Dessinée est une revue trimestrielle de 228 pages, parce qu'elle prend le temps de mener des enquêtes pour offrir un autre regard sur la réalité.
Nous donnons une grande importance à la diversité des points de vue et des formes. C'est pourquoi vous découvrirez dans nos pages toutes sortes de sujets, de l'économie à l'écologie, sans oublier la politique, la société, la musique, le cinéma, les guerres et les utopies.`,
    questions: [
      { id: "b8-bd-q1", type: "open", prompt: "Entrée en matière : regardez le document. Quelle est la caractéristique de la revue présentée ?" },
      { id: "b8-bd-q2", type: "short_answer", prompt: "1re lecture : quels contenus journalistiques met-on en BD dans cette revue ?", answer: "Des enquêtes, des reportages et des documentaires." },
      { id: "b8-bd-q3", type: "short_answer", prompt: "2e lecture : qui publie dans cette revue ?", answer: "Des dessinateurs et des journalistes, en équipe." },
      { id: "b8-bd-q4", type: "short_answer", prompt: "Pourquoi sort-elle tous les 3 mois ?", answer: "Parce qu'elle prend le temps de mener des enquêtes pour offrir un autre regard sur la réalité." },
      { id: "b8-bd-q5", type: "short_answer", prompt: "Quels sujets y sont abordés ?", answer: "L'économie, l'écologie, la politique, la société, la musique, le cinéma, les guerres et les utopies." },
      { id: "b8-bd-q6", type: "multiple_choice", prompt: "Vocabulaire : proposer « une information critique et engagée », c'est…", options: ["exprimer son opinion, prendre parti.", "ne pas exprimer d'opinion."], answer: "exprimer son opinion, prendre parti." },
      { id: "b8-bd-q7", type: "open", prompt: "Production écrite : à votre avis, la BD est-elle un bon moyen d'informer et de s'informer ? Peut-elle être mieux que les photos ou les vidéos ? Pourquoi ?" },
    ],
  },

  // ── C · Le succès de Twitch (p. 113) ────────────────────────────────
  {
    id: "b8-livre-succes-twitch",
    unit: 8,
    unitTitle: "Dans les médias",
    source: "livre",
    section: "compréhension écrite",
    page: 113,
    title: "Le succès de Twitch",
    instruction: "Lisez cet article sur Twitch, une plateforme qui bouleverse le journalisme numérique.",
    text: `Dans le domaine du journalisme numérique, la nouvelle tendance, c'est Twitch : une plateforme de diffusion de vidéos en direct (streaming).

Au début, seuls les joueurs de jeux vidéo (gamers) utilisaient cette plateforme. Ils filmaient et commentaient leurs parties en direct à travers le tchat. Aujourd'hui, les gamers ne sont plus seuls sur Twitch. Tout le monde peut créer sa chaîne pour parler de cuisine, de musique, de sport, de bricolage ou d'actualité.

Grâce à Twitch, les médias classiques (la radio, la télévision et la presse) essaient de toucher un public plus jeune et plus connecté. C'est pour cela que le magazine Sciences & Avenir et le journal régional Ouest France proposent chacun une émission sur la plateforme. Des journalistes indépendants font aussi des revues de presse¹ quotidiennes interactives, car c'est bien l'interaction qui séduit le public actuel. Le succès de Twitch n'a donc rien d'étonnant.

1 Résumés d'articles et points de vue publiés dans la presse.
— Sources : larevuedesmedias.ina.fr, blogfr.influence4you.com et lefigaro.fr.`,
    questions: [
      { id: "b8-twitch-q1", type: "multiple_choice", prompt: "Entrée en matière : regardez l'image. À votre avis, qu'est-ce que Twitch ?", options: ["Une plateforme interactive.", "Un logiciel de visioconférence."], answer: "Une plateforme interactive." },
      { id: "b8-twitch-q2", type: "short_answer", prompt: "1re lecture : qui étaient les premiers utilisateurs de Twitch ?", answer: "Les joueurs de jeux vidéo (gamers)." },
      { id: "b8-twitch-q3", type: "short_answer", prompt: "Qui peut faire une émission sur Twitch aujourd'hui ?", answer: "Tout le monde : pour parler de cuisine, de musique, de sport, de bricolage ou d'actualité." },
      { id: "b8-twitch-q4", type: "short_answer", prompt: "2e lecture : pourquoi les médias utilisent Twitch aujourd'hui ?", answer: "Pour essayer de toucher un public plus jeune et plus connecté." },
      { id: "b8-twitch-q5", type: "short_answer", prompt: "Qu'est-ce que les gens aiment sur cette plateforme ?", answer: "L'interaction, qui séduit le public actuel." },
      { id: "b8-twitch-q6", type: "open", prompt: "Production écrite : à deux ! Vous voulez créer une chaîne ou une émission sur Twitch. Écrivez une présentation de votre projet et partagez-la avec la classe." },
    ],
  },

  // ── E · Sciences et réseaux sociaux (p. 116) ────────────────────────
  {
    id: "b8-livre-sciences-reseaux",
    unit: 8,
    unitTitle: "Dans les médias",
    source: "livre",
    section: "compréhension écrite",
    page: 116,
    title: "Sciences et réseaux sociaux",
    instruction: "Twitter, Facebook, Instagram, Snapchat, YouTube… sont-ils seulement des passe-temps, ou peuvent-ils aussi être des dispositifs de communication scientifique ?",
    text: `Lutter contre les « infox »
Nous entendons beaucoup parler d'« Infox » aujourd'hui. Mais les scientifiques peuvent passer par les réseaux sociaux pour faire barrage¹ à ces fausses nouvelles. Pour cela, il faut utiliser les mêmes codes et outils pour sensibiliser les internautes et leur apprendre à se méfier².

Un véritable intérêt pour la communication scientifique
Les réseaux sociaux permettent aux participants de congrès³ de collaborer. Ils facilitent les façons de commenter ou de compléter une présentation à distance.
Aussi, ils sont un bon moyen pour montrer la science « en train de se faire ». Sur le compte Twitter @EnDirectDuLabo, chaque semaine, un nouveau scientifique présente ses travaux et sa façon de travailler.
Donc oui, les réseaux sociaux sont un outil puissant pour la communication scientifique. Mais, il est important qu'ils s'adaptent aux différents publics. Il faut aussi qu'on accompagne ces publics pour qu'ils gardent un esprit critique.

1 Arrêter, contrer, s'opposer à. 2 Faire attention, ne pas faire confiance. 3 Rencontres scientifiques, colloques.
— www.raccoursci.com`,
    questions: [
      { id: "b8-sciences-q1", type: "open", prompt: "Entrée en matière : connaissez-vous des réseaux sociaux éducatifs ou scientifiques ?" },
      { id: "b8-sciences-q2", type: "short_answer", prompt: "1re lecture : selon l'article, les réseaux sont-ils un bon outil pour diffuser les sciences ?", answer: "Oui : « les réseaux sociaux sont un outil puissant pour la communication scientifique »." },
      { id: "b8-sciences-q3", type: "multi_select", prompt: "2e lecture : vrai ou faux ? Avec les réseaux sociaux…", options: ["les scientifiques peuvent apprendre aux internautes à identifier les fausses nouvelles. (Vrai)", "les congrès sont plus compliqués à préparer. (Faux)", "les scientifiques peuvent montrer leurs travaux, projets, recherches en cours. (Vrai)"], answer: ["les scientifiques peuvent apprendre aux internautes à identifier les fausses nouvelles. (Vrai)", "les scientifiques peuvent montrer leurs travaux, projets, recherches en cours. (Vrai)"] },
      { id: "b8-sciences-q4", type: "short_answer", prompt: "Selon cet article, que faut-il faire pour bien diffuser les sciences ?", answer: "Adapter les réseaux sociaux aux différents publics et accompagner ces publics pour qu'ils gardent un esprit critique." },
    ],
  },

  // ── F · La maison de la Radio (p. 118) ──────────────────────────────
  {
    id: "b8-livre-maison-radio",
    unit: 8,
    unitTitle: "Dans les médias",
    source: "livre",
    section: "culture(s)",
    page: 118,
    title: "La maison de la Radio",
    instruction: "Charlie Zanello, Maison Ronde, 2020 — un bd reporter raconte un an passé à explorer la « maison ronde » de Radio France.",
    text: `Pendant un an, Charlie Zanello a tenté de faire le tour de la « maison ronde ». Rouge, jaune, bleu, rose, violet, noir ou bordeaux, il est passé par toutes les couleurs des chaînes de Radio France au risque de s'y perdre ! À la fois monument architectural, haut lieu du journalisme, de la culture et de la musique, la « maison ronde » est en perpétuel mouvement, mue par les 4 000 professionnels passionnés qui y travaillent. Avec finesse et humour, le bd reporter livre une enquête passionnante entre et hors les murs d'une véritable institution.

Trois vignettes extraites de la BD :
a. Une femme dans une cuisine coiffée d'un bonnet de douche : « la radio cultive ce rapport intime avec l'auditeur. »
b. Une femme devant une poêle en feu, regardant un écran de télévision : « à l'inverse de la vidéo qui nécessite une autre attention, plus passive. »
c. Un homme âgé mangeant, écoutant la radio en marchant : « elle l'accompagne dans ses tâches quotidiennes. »

Oh, le cliché ! « Les Français ne font pas confiance aux médias. » 52 % des Français font confiance aux informations à la radio, 48 % ont confiance dans les journaux et 42 % dans les informations à la télévision. Mais seulement 28 % des Français pensent que les informations d'Internet sont crédibles.`,
    questions: [
      { id: "b8-radio-q1", type: "open", prompt: "Entrée en matière : regardez la couverture et la quatrième de couverture de la BD. À votre avis, qu'est-ce qu'on appelle « la maison ronde » ? Pourquoi ?" },
      { id: "b8-radio-q2", type: "short_answer", prompt: "Lecture : quels appareils utilisent les personnes des 3 vignettes ?", answer: "Une douche/radio en cuisinant, une télévision, une radio en marchant." },
      { id: "b8-radio-q3", type: "matching", prompt: "Associez chaque vignette à un message. a → ? / b → ? / c → ?", answer: "a → On peut écouter la radio et cuisiner.\nb → Avec les écrans, on ne peut pas faire plusieurs choses à la fois.\nc → La radio nous accompagne partout." },
      { id: "b8-radio-q4", type: "open", prompt: "Production orale : vous aimez écouter la radio ? Vous l'écoutez souvent ? Où ? Vous faites d'autres choses en même temps ?" },
      { id: "b8-radio-q5", type: "open", prompt: "Oh, le cliché ! Et vous, vous faites confiance à quels supports d'information ?" },
    ],
  },

  // ── H · Critiques du film Eiffel (p. 120) ───────────────────────────
  {
    id: "b8-livre-critiques-eiffel",
    unit: 8,
    unitTitle: "Dans les médias",
    source: "livre",
    section: "compréhension écrite",
    page: 120,
    title: "Critiques du film Eiffel",
    instruction: "cinémaFORUM — résumé du film Eiffel et discussions d'internautes qui l'ont vu.",
    text: `RÉSUMÉ
Paris, 1886. Gustave Eiffel (Romain Duris) rentre de New York où il a construit la structure métallique de la Statue de la Liberté. Il retrouve Adrienne Bourgès (Emma Mackey), son amour de jeunesse. Il propose alors de construire la plus haute tour de son époque pour l'exposition universelle de 1889.

DISCUSSIONS
Seb_32 : Ce film est une bonne surprise, je le conseille à tous les fans de Romain Duris. Le rôle de Gustave Eiffel lui va très bien ! Et si vous ne connaissez pas l'actrice Emma Mackey, c'est l'occasion de la découvrir : vous allez l'adorer ! C'est aussi l'occasion de découvrir comment le projet de la Tour Eiffel est né et comment il s'est concrétisé. C'est passionnant !

Caro F. : Les vues du Paris de l'époque et les images de la construction de la tour Eiffel sont magnifiques. C'est très bien filmé, mais le scénario est mauvais. L'histoire d'amour entre Gustave Eiffel et Adrienne Bourgès prend beaucoup trop de place.

Charles B. : Je n'ai pas du tout aimé. Ce film n'est pas réaliste. L'âge des acteurs ne correspond pas. L'héroïne, Adrienne Bourgès, avait 46 ans en 1886 : vingt ans de plus qu'Emma Mackey. Et le film ne parle pas assez de Claire Eiffel, la fille de Gustave qui l'assistait au quotidien. Je pensais voir un bon film historique, mais il est très ennuyeux !

Cinéphilou : Les avis négatifs sur ce film m'étonnent, car je le trouve intéressant. C'est un film grand public, très sympa. Et, pour une fois, le héros n'est pas un politique ou un écrivain mais un ingénieur !

Nath T. : Les premières scènes, je les ai trouvées nulles. Mais ensuite, j'ai bien aimé. Mes enfants aussi ; le film leur a beaucoup plu !`,
    questions: [
      { id: "b8-eiffel-q1", type: "multiple_choice", prompt: "Entrée en matière : regardez cette page Internet. Qui a écrit ces critiques ?", options: ["Des journalistes.", "Des gens qui ont vu le film."], answer: "Des gens qui ont vu le film." },
      { id: "b8-eiffel-q2", type: "short_answer", prompt: "1re lecture : combien de critiques sont positives, négatives ou les deux ?", answer: "Positives : Seb_32, Cinéphilou (2). Négatives : Charles B. (1). Les deux (positif et négatif) : Caro F., Nath T. (2)." },
      { id: "b8-eiffel-q3", type: "short_answer", prompt: "2e lecture : qu'est-ce que chaque personne a aimé ou n'a pas aimé dans le film ?", answer: "Seb_32 : aime les acteurs et l'histoire de la Tour Eiffel. Caro F. : aime les images, n'aime pas le scénario. Charles B. : n'aime pas le manque de réalisme et l'ennui. Cinéphilou : aime le film grand public avec un héros ingénieur. Nath T. : n'aime pas les premières scènes, aime la suite." },
      { id: "b8-eiffel-q4", type: "matching", prompt: "Vocabulaire : trouvez dans le document les mots qu'on utilise pour parler a. de l'histoire d'un film ; b. des personnages principaux d'un film ; c. d'un film destiné à un maximum de personnes.", answer: "a. le scénario\nb. le héros, l'héroïne\nc. un film grand public" },
      { id: "b8-eiffel-q5", type: "open", prompt: "Production écrite : écrivez une critique positive et/ou négative d'une série ou d'un film que vous avez vu." },
    ],
  },

  // ── I · La tour Eiffel grandit ! (vidéo, p. 121) ────────────────────
  {
    id: "b8-livre-tour-eiffel-grandit",
    unit: 8,
    unitTitle: "Dans les médias",
    source: "livre",
    section: "compréhension audiovisuelle",
    page: 121,
    title: "La tour Eiffel grandit !",
    instruction: "Résumé du reportage vidéo : une journaliste présente un plateau télé avec en fond la Tour Eiffel et un hélicoptère, qui vient d'installer une nouvelle antenne au sommet du monument.",
    text: `Ce reportage montre l'installation d'une nouvelle antenne au sommet de la tour Eiffel, transportée par hélicoptère. Grâce à cette antenne, la tour Eiffel a grandi de plusieurs mètres.

Cette nouvelle antenne va servir à diffuser la télévision numérique terrestre (TNT) pour la région parisienne. L'installation n'a pas été facile : il a fallu attendre une météo parfaite, sans vent, pour que l'hélicoptère puisse déposer l'antenne en toute sécurité au sommet du monument, à plus de 300 mètres de hauteur.

Au fait ! La tour Eiffel est restée le plus haut monument du monde pendant 40 ans, jusqu'à la construction du Chrysler Building en 1930.`,
    questions: [
      { id: "b8-tour-q1", type: "open", prompt: "Entrée en matière : savez-vous combien mesure la tour Eiffel ? Connaissez-vous d'autres monuments très hauts ?" },
      { id: "b8-tour-q2", type: "short_answer", prompt: "1er visionnage : la tour Eiffel a grandi de combien de mètres ?", answer: "De plusieurs mètres, grâce à la nouvelle antenne installée à son sommet." },
      { id: "b8-tour-q3", type: "short_answer", prompt: "Comment ont-ils transporté l'antenne en haut de la tour Eiffel ?", answer: "Par hélicoptère." },
      { id: "b8-tour-q4", type: "short_answer", prompt: "2e visionnage : à quoi va servir cette antenne ?", answer: "À diffuser la télévision numérique terrestre (TNT) pour la région parisienne." },
      { id: "b8-tour-q5", type: "short_answer", prompt: "Pourquoi l'installation n'a pas été facile ?", answer: "Il a fallu attendre une météo parfaite, sans vent, pour déposer l'antenne en toute sécurité à plus de 300 mètres de hauteur." },
      { id: "b8-tour-q6", type: "open", prompt: "Production orale : que pensez-vous de la tour Eiffel ? Comment la trouvez-vous ?" },
    ],
  },

  // ═══════════════ Unité 9 — Consommer responsable ═══════════════

  // ── A · Réduisons nos achats ! (p. 125) ─────────────────────────────
  {
    id: "b9-livre-reduisons-achats",
    unit: 9,
    unitTitle: "Consommer responsable",
    source: "livre",
    section: "compréhension écrite",
    page: 125,
    title: "Réduisons nos achats !",
    instruction: "Lina_712 publie sa liste de souhaits du défi « Rien de neuf » sur Instagram.",
    text: `Lina_712
Ma liste de souhaits du défi « Rien de neuf »

Des millions d'objets existent déjà. Utilisons-les et arrêtons d'acheter des objets neufs !

➜ Je voudrais emprunter plus de livres à la bibliothèque. En général, je ne les relis pas et ils restent sur une étagère. FAIT ✅
➜ J'aimerais arrêter d'acheter du matériel de sport. C'est cher et je dépense trop d'argent pour mes loisirs. (PRESQUE)
➜ Je souhaiterais économiser de l'argent mais je suis toujours attirée par les soldes et les produits en promotion. J'espère que je vais apprendre à résister ! À FAIRE !

#riendeneuf #consommationresponsable #occasion #partage

Le principe du défi « Rien de neuf » est d'essayer de réduire au maximum ses achats d'objets neufs (électroménager, meubles, vêtements...) pendant un an. Ça ne concerne pas l'alimentation ou les produits de beauté. Ça permet de réfléchir à sa consommation et de découvrir des alternatives au neuf (achat d'occasion, don, partage...). C'est un défi écologique, économique et stimulant !

Commentaires
Renato_à_Paris (il y a 2 j., 3 J'aime) : J'ai envie d'essayer ce défi. Tu pourrais me donner plus d'informations s'il te plaît ?
Pat_bouquine (il y a 2 j., 4 J'aime) : Tu peux aussi partager tes livres avec tes amis.
Jo_le_sportif (il y a 1 j., 2 J'aime) : Tu as pensé à la location ? Beaucoup de magasins louent du matériel de sport (vélos, tentes, kayaks...). C'est un bon moyen d'économiser.
Sam_Eddie (il y a 1 j., 3 J'aime) : Je te comprends ! Avant, j'avais le même problème avec les offres « un produit acheté = un produit gratuit ». Ça te dirait d'en discuter ?`,
    questions: [
      { id: "b9-reduisons-q1", type: "open", prompt: "Entrée en matière : observez le document. Qu'est-ce que c'est ?" },
      { id: "b9-reduisons-q2", type: "multiple_choice", prompt: "1re lecture : quel est le principe du défi « Rien de neuf » ?", options: ["Limiter ses achats d'objets neufs pendant un an.", "Ne pas acheter de produits neufs pendant un an."], answer: "Limiter ses achats d'objets neufs pendant un an." },
      { id: "b9-reduisons-q3", type: "multi_select", prompt: "2e lecture : vrai ou faux ?", options: ["Ce défi concerne tous les produits. (Faux)", "Avec ce défi, on découvre de nouvelles manières de consommer. (Vrai)", "Avec ce défi, on peut économiser de l'argent. (Vrai)"], answer: ["Avec ce défi, on découvre de nouvelles manières de consommer. (Vrai)", "Avec ce défi, on peut économiser de l'argent. (Vrai)"] },
      { id: "b9-reduisons-q4", type: "short_answer", prompt: "Lina_712 participe au défi. Quel est son souhait déjà réalisé, son souhait pas encore réalisé et son souhait bientôt réalisé ?", answer: "Déjà réalisé : emprunter plus de livres à la bibliothèque. Pas encore réalisé : économiser de l'argent. Bientôt réalisé : arrêter d'acheter du matériel de sport." },
      { id: "b9-reduisons-q5", type: "short_answer", prompt: "Lisez les commentaires : comment lire sans acheter de livres neufs ? Comment faire du sport sans acheter de matériel neuf ?", answer: "En partageant ses livres avec ses amis ; en louant du matériel de sport (vélos, tentes, kayaks...)." },
      { id: "b9-reduisons-q6", type: "matching", prompt: "Vocabulaire : associez les mots de sens contraire. a. neuf / b. dépenser / c. l'achat", answer: "a. neuf ≠ d'occasion\nb. dépenser ≠ économiser\nc. l'achat ≠ la location" },
      { id: "b9-reduisons-q7", type: "open", prompt: "Production écrite : vous avez décidé de participer à ce défi. Vous postez votre liste de souhaits sur Instagram et vous expliquez pourquoi vous faites ces souhaits." },
    ],
  },

  // ── C · À vendre ! (p. 128) ──────────────────────────────────────────
  {
    id: "b9-livre-a-vendre",
    unit: 9,
    unitTitle: "Consommer responsable",
    source: "livre",
    section: "compréhension écrite",
    page: 128,
    title: "À vendre !",
    instruction: "Sur un forum, Lou demande des conseils pour vendre des vêtements sur Leboncoin.",
    text: `Lou — Publié il y a 18 heures
Bonjour ! J'essaie de vendre des vêtements sur Leboncoin mais sans succès 😢 Est-ce que vous auriez des conseils à me donner ?
♥ J'aime | Répondre — 5 réponses

Clem (il y a 17 heures) : Salut Lou ! Déjà, ton annonce doit être complète. Il faut préciser la marque, la taille et la couleur de chaque vêtement. Et pour les photos, il y a quelques trucs pour mettre tes vêtements en valeur. Par exemple, c'est mieux de porter les vêtements pour les photographier. 📷
Lou (il y a 16 heures) : C'est vrai que mes photos ne sont pas géniales…
Clem (il y a 16 heures) : Tu devrais les refaire ! Et pour avoir une belle lumière, je te conseille de les prendre vers midi.
Greg (il y a 14 heures) : Le prix aussi est important. Tu pourrais lire Je saute sur l'occasion de Pascal Poulin. Dans la deuxième partie, il donne des conseils pour choisir son prix et négocier. Regarde aussi les annonces proposées par les autres vendeurs ! C'est sûr que, pour le même article, les acheteurs paieront toujours le minimum…
Lou (il y a 11 heures) : Merci pour vos conseils ! J'ai modifié mon annonce et j'ai déjà trouvé une cliente pour une robe !!`,
    questions: [
      { id: "b9-vendre-q1", type: "open", prompt: "Entrée en matière : est-ce que vous écrivez sur des forums de discussion ? Pourquoi ?" },
      { id: "b9-vendre-q2", type: "short_answer", prompt: "1re lecture : quel est le problème de Lou ?", answer: "Elle n'arrive pas à vendre ses vêtements sur Leboncoin." },
      { id: "b9-vendre-q3", type: "short_answer", prompt: "Que font Clem et Greg pour l'aider ?", answer: "Ils lui donnent des conseils : Clem sur l'annonce et les photos, Greg sur le prix." },
      { id: "b9-vendre-q4", type: "short_answer", prompt: "2e lecture : que faut-il écrire dans l'annonce ?", answer: "La marque, la taille et la couleur de chaque vêtement." },
      { id: "b9-vendre-q5", type: "short_answer", prompt: "Comment faire de belles photos ?", answer: "Porter les vêtements pour les photographier et les prendre vers midi pour avoir une belle lumière." },
      { id: "b9-vendre-q6", type: "short_answer", prompt: "Que faut-il faire avant de fixer un prix de vente ?", answer: "Regarder les annonces proposées par les autres vendeurs pour le même article." },
      { id: "b9-vendre-q7", type: "short_answer", prompt: "Vocabulaire : trouvez dans le texte un synonyme d'« une acheteuse ».", answer: "Une cliente." },
      { id: "b9-vendre-q8", type: "open", prompt: "Production écrite ➜ DELF : Félix a posté un message sur un forum pour demander comment vendre ses meubles avant de déménager. Vous lui répondez et vous lui donnez des conseils." },
    ],
  },

  // ── D · Le fait maison, c'est tendance (p. 130) ─────────────────────
  {
    id: "b9-livre-fait-maison",
    unit: 9,
    unitTitle: "Consommer responsable",
    source: "livre",
    section: "compréhension écrite",
    page: 130,
    title: "Le fait maison, c'est tendance",
    instruction: "Un article sur la nouvelle passion des Français pour les activités créatives et le fait maison.",
    text: `Depuis quelques années, les Français ont une grande passion pour les activités créatives et le fait maison. Ils sont de plus en plus nombreux à pratiquer la cuisine, le jardinage, le bricolage, la décoration d'intérieur ou la mécanique.

Alors comment expliquer cette nouvelle tendance ? D'abord, beaucoup de personnes aiment créer. Elles font ça par plaisir. Elles cuisinent en écoutant de la musique, elles tricotent en regardant la télévision et elles se détendent. D'autres personnes choisissent le fait maison pour des raisons économiques. Ça coûte souvent moins cher de fabriquer un objet ou de réparer un objet cassé plutôt que de l'acheter dans un magasin. Enfin, c'est aussi une pratique écologique, meilleure pour la planète.

Les fans du fait maison s'échangent des idées en mettant en ligne des milliers de tutoriels et d'articles de blog chaque jour. Les magasins de bricolage et de loisirs créatifs connaissent aussi beaucoup de succès. De nombreuses merceries ouvrent pour vendre du matériel de couture et de tricot. Elles proposent aussi souvent des ateliers créatifs (fabrication de mouchoirs en tissu, d'écharpe en laine, etc.). Pour finir, le fait maison se développe aussi dans les grands magasins. Ils s'adaptent à cette pratique en vendant des kits pour fabriquer ses repas, ses produits de beauté et ses produits ménagers.`,
    questions: [
      { id: "b9-faitmaison-q1", type: "open", prompt: "Entrée en matière : lisez le titre de l'article. Qu'est-ce qui peut être fait maison ?" },
      { id: "b9-faitmaison-q2", type: "short_answer", prompt: "1re lecture : à quelles activités s'intéressent de plus en plus de Français ?", answer: "La cuisine, le jardinage, le bricolage, la décoration d'intérieur et la mécanique." },
      { id: "b9-faitmaison-q3", type: "short_answer", prompt: "2e lecture : pourquoi les Français aiment le fait maison ?", answer: "Par plaisir de créer, pour des raisons économiques (moins cher que d'acheter) et parce que c'est écologique." },
      { id: "b9-faitmaison-q4", type: "short_answer", prompt: "Comment font-ils pour s'échanger des idées ?", answer: "En mettant en ligne des milliers de tutoriels et d'articles de blog chaque jour." },
      { id: "b9-faitmaison-q5", type: "short_answer", prompt: "Quelles conséquences le fait maison a sur les commerces ?", answer: "Les magasins de bricolage et de loisirs créatifs, ainsi que les merceries, connaissent beaucoup de succès ; les grands magasins vendent des kits pour fabriquer ses repas, produits de beauté et produits ménagers." },
      { id: "b9-faitmaison-q6", type: "open", prompt: "Vocabulaire : à quelles activités correspondent des pelotes de laine et des aiguilles à tricoter, une machine à coudre, une clé à molette ?" },
      { id: "b9-faitmaison-q7", type: "open", prompt: "Production écrite : vous organisez un atelier créatif dans votre école. Vous préparez une affiche pour présenter cet atelier (date, lieu, activité...)." },
    ],
  },

  // ── E · Atelier créatif (vidéo, p. 131) ──────────────────────────────
  {
    id: "b9-livre-atelier-creatif",
    unit: 9,
    unitTitle: "Consommer responsable",
    source: "livre",
    section: "compréhension audiovisuelle",
    page: 131,
    title: "Atelier créatif",
    instruction: "Résumé du reportage vidéo : une femme utilise une machine à coudre dans un atelier créatif situé dans un magasin de bricolage/loisirs créatifs.",
    text: `Ce reportage montre un atelier créatif où des clientes fabriquent des accessoires (comme des sacs) à partir de vieux objets, en utilisant notamment une machine à coudre.

Ces ateliers sont écologiques car ils permettent de réutiliser des objets ou des matériaux qui, sans cela, seraient jetés : on recycle plutôt que de mettre à la poubelle.

Ils sont aussi devenus de véritables « lieux de vie » : les clientes s'y retrouvent régulièrement, échangent des idées et des conseils, et créent du lien social autour d'une passion commune pour le fait maison et la réparation.`,
    questions: [
      { id: "b9-atelierav-q1", type: "open", prompt: "Entrée en matière : regardez le titre et l'image. À votre avis, quel est le thème de la vidéo ?" },
      { id: "b9-atelierav-q2", type: "short_answer", prompt: "1er visionnage : dans quel type de magasin se trouve cet atelier ?", answer: "Un magasin de bricolage / loisirs créatifs." },
      { id: "b9-atelierav-q3", type: "short_answer", prompt: "Les clientes fabriquent quel accessoire ? À partir de quel objet ?", answer: "Un accessoire (comme un sac), à partir d'un vieil objet ou d'un vêtement abîmé." },
      { id: "b9-atelierav-q4", type: "short_answer", prompt: "2e visionnage : pourquoi ces ateliers sont écologiques ?", answer: "Parce qu'ils permettent de réutiliser et de recycler des objets, plutôt que de les jeter." },
      { id: "b9-atelierav-q5", type: "short_answer", prompt: "Pourquoi sont-ils des « lieux de vie » ?", answer: "Parce que les clientes s'y retrouvent régulièrement, échangent des idées et créent du lien social." },
      { id: "b9-atelierav-q6", type: "matching", prompt: "Vocabulaire : associez les synonymes. a. recycler / b. mettre à la poubelle / c. recoudre", answer: "a. recycler → réutiliser\nb. mettre à la poubelle → jeter\nc. recoudre → réparer" },
      { id: "b9-atelierav-q7", type: "multiple_choice", prompt: "Un vêtement abîmé est un vêtement…", options: ["en bon état.", "en mauvais état."], answer: "en mauvais état." },
      { id: "b9-atelierav-q8", type: "open", prompt: "Production orale : est-ce que vous aimeriez participer à cet atelier ? Pourquoi ?" },
    ],
  },

  // ── F · Les bricothèques (p. 132) ────────────────────────────────────
  {
    id: "b9-livre-bricotheques",
    unit: 9,
    unitTitle: "Consommer responsable",
    source: "livre",
    section: "culture(s)",
    page: 132,
    title: "Les bricothèques",
    instruction: "Culture(s) — Les bons plans pour bricoler. Un article sur les bricothèques, ces lieux où l'on emprunte des outils.",
    text: `Vous devez monter un meuble ? Installer une étagère ? Poncer une table en bois ? Mais vous manquez d'outils et, surtout, vous n'avez pas envie de dépenser de l'argent… Empruntez-les !

Une bricothèque fonctionne un peu comme une bibliothèque, avec une grosse différence : ici pas de romans sur les étagères, mais des outils, plein d'outils ! Scie, ponceuse, échelle, tondeuse… Vous avez l'embarras du choix¹ ! Il suffit de prendre un abonnement annuel (une dizaine d'euros en général) et de verser une caution². La durée de l'emprunt est en général de trois à quatre jours. Certaines bricothèques proposent même des ateliers gratuits animés par des bénévoles.

Si vous vivez trop loin d'une bricothèque, pourquoi ne pas emprunter ou louer des outils à vos voisins ? Et vous pouvez aussi mettre votre matériel en location.

Une façon simple d'éviter de grosses dépenses inutiles !

https://www.femmeactuelle.fr
1 Beaucoup de choix. 2 Une garantie.`,
    questions: [
      { id: "b9-bricotheque-q1", type: "short_answer", prompt: "1re lecture : qu'est-ce qu'une bricothèque ?", answer: "Un lieu qui fonctionne comme une bibliothèque, mais où l'on emprunte des outils au lieu de livres." },
      { id: "b9-bricotheque-q2", type: "short_answer", prompt: "2e lecture : comment fonctionnent les emprunts dans les bricothèques ?", answer: "Il faut prendre un abonnement annuel (une dizaine d'euros) et verser une caution ; l'emprunt dure en général trois à quatre jours." },
      { id: "b9-bricotheque-q3", type: "short_answer", prompt: "Quelle autre activité peut-on faire dans certaines bricothèques ?", answer: "Participer à des ateliers gratuits animés par des bénévoles." },
      { id: "b9-bricotheque-q4", type: "short_answer", prompt: "Quelle autre solution d'emprunt est proposée ?", answer: "Emprunter ou louer des outils à ses voisins." },
      { id: "b9-bricotheque-q5", type: "short_answer", prompt: "Quels outils sont cités dans le texte ?", answer: "Scie, ponceuse, échelle, tondeuse." },
      { id: "b9-bricotheque-q6", type: "open", prompt: "Production écrite : imaginez un nouveau lieu (une « ...thèque ») où on emprunte des choses : des vêtements, du matériel de sport, des meubles... Présentez le fonctionnement de ce lieu dans un court article." },
    ],
  },

  // ── H · Échangez des services (p. 134) ───────────────────────────────
  {
    id: "b9-livre-echangez-services",
    unit: 9,
    unitTitle: "Consommer responsable",
    source: "livre",
    section: "compréhension écrite",
    page: 134,
    title: "Échangez des services",
    instruction: "Un courriel de Fanny Latour à une accorderie, un système d'échange de services entre habitants d'un même lieu.",
    text: `Courriel
De : Fanny Latour
Objet : Vous rejoindre

Bonjour,

J'ai lu un article sur votre accorderie et je suis très intéressée par son fonctionnement. Moi aussi, je souhaiterais échanger des services avec d'autres habitants de la ville. Pourriez-vous m'expliquer comment faire ?

Pour me présenter en quelques mots, je m'appelle Fanny, j'ai 28 ans et je viens d'arriver dans la région.

Avant je vivais à la campagne dans une maison avec un grand jardin. Maintenant, j'habite dans un appartement en ville et le jardinage me manque. J'adore ça et j'ai la main verte ! Je propose donc de faire du jardinage le soir et le week-end.

En plus de ça, j'aime aussi conduire et j'utilise souvent ma voiture pour visiter la région. Donc je peux faire du covoiturage. C'est sympa de voyager à plusieurs !

En échange, j'ai besoin d'aide en allemand parce que je travaille pour une entreprise allemande. J'ai un très bon niveau en grammaire et à l'écrit, mais j'aimerais améliorer l'oral. Je cherche donc quelqu'un avec qui pratiquer cette langue.

J'attends votre réponse avec impatience. J'ai très envie de rejoindre votre accorderie !

Bien cordialement,
Fanny Latour

Au fait ! Les accorderies viennent du Québec. Ce sont des systèmes d'échange de services entre habitants d'un même lieu.

Infographie — Échanger et coopérer : vous aussi devenez accordeur(euse) ! Catégories : Aide aux personnes âgées, Cuisine, Garde d'enfants, Jardinage, Repassage, Déménagement, Ménage, Promenade du chien.`,
    questions: [
      { id: "b9-services-q1", type: "open", prompt: "Entrée en matière : regardez l'affiche. Que font les membres d'une accorderie ?" },
      { id: "b9-services-q2", type: "short_answer", prompt: "1re lecture : dans quel objectif Fanny Latour écrit à l'accorderie ?", answer: "Pour rejoindre l'accorderie et échanger des services avec d'autres habitants de la ville." },
      { id: "b9-services-q3", type: "short_answer", prompt: "2e lecture : Fanny propose quels services ? Pourquoi ?", answer: "Le jardinage (elle adore ça et a la main verte) et le covoiturage (elle aime conduire et utilise souvent sa voiture pour visiter la région)." },
      { id: "b9-services-q4", type: "short_answer", prompt: "Qu'est-ce qu'elle recherche en échange ? Pourquoi ?", answer: "De l'aide en allemand à l'oral, parce qu'elle travaille pour une entreprise allemande et veut améliorer son niveau à l'oral." },
      { id: "b9-services-q5", type: "matching", prompt: "Vocabulaire : quelles expressions du document signifient a. être bon en jardinage ? b. voyager à plusieurs dans une voiture ?", answer: "a. avoir la main verte\nb. faire du covoiturage" },
      { id: "b9-services-q6", type: "open", prompt: "Production orale ➜ DELF : à deux ! Vous avez besoin de faire du bricolage dans votre appartement. Vous demandez de l'aide à votre voisin(e). Vous lui proposez un service en échange. Jouez la scène." },
    ],
  },

  // ═══════════════ Unité 10 — Envies d'ailleurs ? ═══════════════

  // ── A · Voyage sur-mesure ! (p. 139) ─────────────────────────────────
  {
    id: "b10-livre-voyage-sur-mesure",
    unit: 10,
    unitTitle: "Envies d'ailleurs ?",
    source: "livre",
    section: "compréhension écrite",
    page: 139,
    title: "Voyage sur-mesure !",
    instruction: "Une page du site « Le monde en voyages », agence spécialiste du Vietnam, avec une idée de circuit de 12 jours.",
    text: `Le monde en voyages
PROMOS | SÉJOURS | CIRCUITS | VOYAGES À THÈMES | DESTINATIONS

Florence — spécialiste Vietnam
DEMANDEZ UN DEVIS ou Personnalisez cette idée de voyage avec un(e) spécialiste
01 19 10 27 25 — Du lundi au samedi de 10 h à 13 h et de 14 h à 18 h

Idée de circuit de 12 jours
Jours 1-2 — HANOÏ
Jour 3 — BAIE D'HALONG
Jour 4 — HANOÏ
Jours 5-6-7 — HUÉ
Jours 8-9-10-11-12 — HOI AN

ASIE > Voyage Vietnam — 9,6/10 ★★★★★ (122 avis sur le Vietnam)
[DEMANDER UN DEVIS] [PARTAGER]

VIETNAM — Balade au pays du dragon
voir nos 5 idées de voyages au Vietnam

Vous passerez un séjour unique au Vietnam ! Entre amis, en famille, ou en couple, vous pourrez d'abord découvrir la capitale, Hanoï. Ensuite, direction la Baie d'Halong pour une croisière inoubliable. Après, vous pourrez prendre un vol pour aller dans la ville de Hué et visiter ses magnifiques monuments. Enfin, selon l'itinéraire choisi, vous pourrez aller à Hoi An. À vous sa campagne, ses rizières et ses plages !

Pendant votre voyage, nous vous proposons de rencontrer des locaux si vous passez par la ville où ils habitent. Avec un(e) guide, vous en apprenez plus sur l'histoire de la ville et ses incontournables. Avec un(e) Welcome Host, francophone et expert(e) de sa ville, vous la découvrez sous l'angle du quotidien et l'appréhendez non plus comme un(e) touriste mais comme un(e) habitant(e) : vous découvrez une ville autrement !`,
    questions: [
      { id: "b10-voyagesurmesure-q1", type: "open", prompt: "Entrée en matière : regardez le document. Comment s'appelle cette agence de voyage ?" },
      { id: "b10-voyagesurmesure-q2", type: "multi_select", prompt: "1re lecture : vrai ou faux ? a. L'agence propose un circuit appelé « Balade au pays du dragon ». b. Ce circuit sera le même pour tous les voyageurs intéressés.", options: ["a. Vrai", "b. Faux, il peut être personnalisé avec un(e) spécialiste"], answer: ["a. Vrai", "b. Faux, il peut être personnalisé avec un(e) spécialiste"] },
      { id: "b10-voyagesurmesure-q3", type: "short_answer", prompt: "2e lecture : pendant leur voyage, les touristes peuvent passer un peu de temps avec qui ?", answer: "Avec des locaux : un(e) guide ou un(e) Welcome Host." },
      { id: "b10-voyagesurmesure-q4", type: "short_answer", prompt: "Quelles sont les particularités de ces personnes ?", answer: "Le/la guide connaît l'histoire de la ville et ses incontournables ; le/la Welcome Host est francophone et expert(e) de sa ville." },
      { id: "b10-voyagesurmesure-q5", type: "short_answer", prompt: "Pourquoi c'est différent de découvrir une ville avec elles ?", answer: "Parce qu'on la découvre sous l'angle du quotidien, non plus comme un(e) touriste mais comme un(e) habitant(e)." },
      { id: "b10-voyagesurmesure-q6", type: "multiple_choice", prompt: "Vocabulaire : une agence de voyage fait un devis au client :", options: ["pour donner les détails et le prix d'un voyage.", "pour confirmer que le voyage est payé."], answer: "pour donner les détails et le prix d'un voyage." },
      { id: "b10-voyagesurmesure-q7", type: "open", prompt: "Production écrite : un ami français va vous rendre visite dans votre pays. Vous lui écrivez un mail pour lui proposer un circuit (D'abord…, Après…, Ensuite…, Enfin…)." },
    ],
  },

  // ── C · Quelles aventures ! (p. 142) ──────────────────────────────────
  {
    id: "b10-livre-quelles-aventures",
    unit: 10,
    unitTitle: "Envies d'ailleurs ?",
    source: "livre",
    section: "compréhension écrite",
    page: 142,
    title: "Quelles aventures !",
    instruction: "Un avis de lectrice (★★★★★ Charlotte T.) sur le livre Vie de van, récits et virtaventures à faire rêver, de Mathieu Côté dit Go-Van.",
    text: `★★★★★ Charlotte. T
VIE DE VAN — RÉCITS ET VIRTAVENTURES À FAIRE RÊVER — PAR MATHIEU CÔTÉ dit GO-VAN

J'ai adoré ce livre ! Je suis moi aussi passionnée de voyage en van. Les anecdotes que l'auteur raconte montrent très bien la réalité du quotidien quand on fait ce type de voyage. Le passage que j'ai préféré, c'est quand il raconte comment cette aventure a commencé pour lui : il travaillait dans une agence à Montréal, dans un bureau qui avait une vue sur la montagne. Mais il commençait à s'ennuyer, à trouver le temps long… Et l'agence a fermé son service et a supprimé son poste ! Alors, à 33 ans, il a profité de l'occasion pour partir faire un road trip de 4 000 km entre Montréal et le Mexique ! J'ai adoré lire ses récits, ça m'a rappelé les voyages que j'ai faits en Argentine et au Chili. C'était extraordinaire. On sort de sa zone de confort, mais quelle liberté !

Julien Roussin-Côté est aussi le fondateur du magazine en ligne Go-Van consacré à la culture de la Van life. Il était en route vers le Mexique quand il a eu l'idée de créer cette plateforme de voyageurs en van. On peut y partager des idées, des histoires, des conseils, des destinations sympas, des photos, des vidéos, etc. Il anime aussi une émission de télévision La belle vie avec Go-Van.`,
    questions: [
      { id: "b10-aventures-q1", type: "open", prompt: "Entrée en matière : regardez la couverture du livre. De quel type de voyage parle-t-on dans ce livre ?" },
      { id: "b10-aventures-q2", type: "short_answer", prompt: "1re lecture : pourquoi Charlotte T. a beaucoup aimé ce livre et les récits de l'auteur ?", answer: "Parce que les anecdotes montrent bien la réalité du quotidien de ce type de voyage et lui rappellent ses propres voyages en Argentine et au Chili." },
      { id: "b10-aventures-q3", type: "short_answer", prompt: "2e lecture : quel événement a permis à Julien Roussin-Côté de se lancer dans un voyage en van de 4 000 km ?", answer: "L'agence où il travaillait à Montréal a fermé son service et supprimé son poste." },
      { id: "b10-aventures-q4", type: "short_answer", prompt: "Qu'est-ce qu'il a créé pour les voyageurs en van ? À quoi ça sert ?", answer: "Le magazine en ligne Go-Van : une plateforme pour partager des idées, des histoires, des conseils, des destinations, des photos et des vidéos." },
      { id: "b10-aventures-q5", type: "short_answer", prompt: "Vocabulaire : trouvez dans le texte l'expression qui signifie « changer ses habitudes pour faire de nouvelles choses ».", answer: "Sortir de sa zone de confort." },
      { id: "b10-aventures-q6", type: "open", prompt: "Production orale : est-ce que vous avez déjà fait un voyage en van ? Est-ce que vous aimeriez en faire un ? Pourquoi ?" },
    ],
  },

  // ── D · Un bus amphibie ! (vidéo, p. 144) ─────────────────────────────
  {
    id: "b10-livre-bus-amphibie",
    unit: 10,
    unitTitle: "Envies d'ailleurs ?",
    source: "livre",
    section: "compréhension audiovisuelle",
    page: 144,
    title: "Un bus amphibie !",
    instruction: "Résumé du reportage vidéo : Sarah, guide touristique pour Les Canards de Paris, présente Marcel le Canard, un bus amphibie qui visite Paris.",
    text: `Ce reportage présente Marcel le Canard, un bus amphibie qui permet de visiter Paris à la fois sur la route et sur l'eau : le véhicule roule dans les rues de la capitale puis « flotte » sur la Seine.

Sarah est guide touristique et travaille pour Les Canards de Paris, l'entreprise qui propose ces visites. Grâce à ce bus amphibie, les touristes n'ont pas besoin de changer de véhicule entre la visite terrestre et la balade sur l'eau : le même bus fait les deux, ce qui évite le problème du changement de transport.

« Flotter », c'est rester au-dessus de l'eau — le bus amphibie n'est pas un bus classique qui roule seulement sur les routes, il peut aussi naviguer.

Le Lady Dive est le premier bus amphibie et il est canadien. Il y a aussi un bus amphibie en Belgique, le Crocodile rouge.`,
    questions: [
      { id: "b10-busamphibie-q1", type: "open", prompt: "Entrée en matière : regardez l'image. À votre avis, qu'est-ce qu'un bus amphibie ?" },
      { id: "b10-busamphibie-q2", type: "multi_select", prompt: "Visionnage : vrai ou faux ? a. Sarah est guide touristique et travaille pour les Canards de Paris. b. Marcel le Canard est un bus classique qui se déplace sur les routes. c. Ce bus permet de visiter Paris et les Hauts-de-Seine.", options: ["a. Vrai", "b. Faux, il roule aussi bien qu'il flotte", "c. Faux, il visite Paris (pas les Hauts-de-Seine)"], answer: ["a. Vrai", "b. Faux, il roule aussi bien qu'il flotte", "c. Faux, il visite Paris (pas les Hauts-de-Seine)"] },
      { id: "b10-busamphibie-q3", type: "short_answer", prompt: "Quel problème on évite grâce à ce bus amphibie ?", answer: "Le changement de véhicule entre la visite sur route et la balade sur l'eau." },
      { id: "b10-busamphibie-q4", type: "multiple_choice", prompt: "Vocabulaire : « flotter » c'est :", options: ["rester au-dessus de l'eau.", "se déplacer sur une route."], answer: "rester au-dessus de l'eau." },
      { id: "b10-busamphibie-q5", type: "open", prompt: "Production orale : est-ce que vous aimeriez visiter une ville en bus amphibie ? Pourquoi ?" },
    ],
  },

  // ── E · Ça vous a plu ? (p. 145) ──────────────────────────────────────
  {
    id: "b10-livre-ca-vous-a-plu",
    unit: 10,
    unitTitle: "Envies d'ailleurs ?",
    source: "livre",
    section: "compréhension écrite",
    page: 145,
    title: "Ça vous a plu ?",
    instruction: "Trois avis publiés sur un site d'avis (rubrique ACTIVITÉS) à propos de la visite en bus amphibie Amphicoincoin.",
    text: `Avis | HÔTELS | ACTIVITÉS | RESTAURANTS

Jami a écrit un avis (Hier) — 1 avis — ★★★★★
Amphicoincoin
C'est une visite de Paris que nous avons adorée ! Quelle bonne idée de proposer un bus touristique qui roule et qui flotte ! Dans ce « bus bateau » on découvre la capitale autrement : les informations sur l'histoire et le patrimoine de la ville, on les a eues en faisant un quiz ! Les questions sur les fontaines de la Concorde et sur le pont des Arts étaient très intéressantes. Merci à la guide pour cette visite originale et ludique !

Antonia V a écrit un avis (Hier) — 1 avis — ★★★★☆
N'hésitez pas si vous passez dans le coin-coin !
Quelle excursion ! On fait souvent des visites guidées, mais en bus amphibie, ça change ! Et les anecdotes que la guide a racontées étaient très drôles ! C'est mieux qu'avec un audioguide, mais 35 euros pour 1 h 45 de visite, c'est un peu cher pour ce que c'est… la visite d'1 h 30 qu'on a faite des ruines romaines du quartier latin ne coûte que 15 euros.

Eva a écrit un avis (14 oct.) — 3 avis — ★☆☆☆☆
À éviter
Après le Vercors, les volcans d'Auvergne, les grottes de Lascaux et les falaises d'Étretat, j'ai fini mon tour de France à Paris. À l'hôtel, j'ai vu la brochure du bus amphibie et à l'office de tourisme, on m'a donné toutes les informations pratiques. Mais quelle déception ! Cette visite ne m'a pas plu, pour moi, elle est sans intérêt. Et puis j'ai eu froid, c'était horrible ! Et je n'ai pas pu profiter des monuments… C'était trop rapide pour moi ! Disons que ce n'est pas mon style de visite !`,
    questions: [
      { id: "b10-cavousaplu-q1", type: "open", prompt: "Entrée en matière : observez le document. De quoi s'agit-il ?" },
      { id: "b10-cavousaplu-q2", type: "short_answer", prompt: "Lecture : pourquoi Jami trouve cette visite différente ?", answer: "Parce qu'on découvre l'histoire et le patrimoine de la ville en faisant un quiz, avec une guide, dans un bus qui roule et qui flotte." },
      { id: "b10-cavousaplu-q3", type: "short_answer", prompt: "Qu'est-ce qui a plu à Antonia ?", answer: "Le changement par rapport aux visites guidées classiques, les anecdotes drôles racontées par la guide — meilleur qu'un audioguide, même si elle trouve le prix un peu élevé." },
      { id: "b10-cavousaplu-q4", type: "short_answer", prompt: "Pourquoi Eva n'a pas aimé cette visite ?", answer: "Elle a trouvé la visite sans intérêt, elle a eu froid, elle n'a pas pu profiter des monuments et la visite était trop rapide pour elle." },
      { id: "b10-cavousaplu-q5", type: "open", prompt: "Production écrite : vous avez visité deux lieux touristiques. La première visite vous a enchanté(e), mais la deuxième vous a déçu(e). Vous écrivez des commentaires sur un site." },
    ],
  },

  // ── F · Les Français ont envie de nature ! (culture, p. 146) ─────────
  {
    id: "b10-livre-francais-nature",
    unit: 10,
    unitTitle: "Envies d'ailleurs ?",
    source: "livre",
    section: "culture(s)",
    page: 146,
    title: "Les Français ont envie de nature !",
    instruction: "Culture(s) — Des vacances grandeur nature. Un article sur la tendance des Français pour le tourisme local, écologique et le slow tourisme.",
    text: `La tendance est claire : 82 % des Français ont envie de nature ! Ce désir de nature et de grands espaces montre que les Français sont de plus en plus sensibles à l'écologie. Les Français ont aussi un grand intérêt pour le tourisme local.

Parmi les Français interrogés qui disent que l'écologie et le tourisme local sont importants dans leurs choix de voyage, 52 % sont des femmes.

Le touriste responsable français est un adepte de la tendance du slow tourisme (ou tourisme lent) : il veut pouvoir communiquer avec les locaux quand il voyage, il veut rencontrer de nouvelles personnes et vivre des expériences culturelles sur place.

Enfin, pour le logement, les Français souhaitent des hébergements plus locaux ou authentiques.

https://interfacetourism.fr`,
    questions: [
      { id: "b10-francaisnature-q1", type: "short_answer", prompt: "Lecture : quelle est la tendance concernant les Français et le tourisme ?", answer: "82 % des Français ont envie de nature et sont de plus en plus sensibles à l'écologie et au tourisme local." },
      { id: "b10-francaisnature-q2", type: "multiple_choice", prompt: "Est-ce que les Français interrogés veulent partir loin de chez eux ?", options: ["Non, ils préfèrent le tourisme local.", "Oui, ils préfèrent partir très loin."], answer: "Non, ils préfèrent le tourisme local." },
      { id: "b10-francaisnature-q3", type: "short_answer", prompt: "Qu'est-ce que le touriste responsable souhaite quand il est en voyage ?", answer: "Communiquer avec les locaux, rencontrer de nouvelles personnes et vivre des expériences culturelles sur place." },
      { id: "b10-francaisnature-q4", type: "short_answer", prompt: "Où les Français préfèrent-ils dormir ?", answer: "Dans des hébergements plus locaux ou authentiques." },
      { id: "b10-francaisnature-q5", type: "open", prompt: "Production orale : et vous, quel type de tourisme vous aimez ?" },
    ],
  },

  // ── Atelier médiation · 1. La Guadeloupe ──────────────────────────────
  {
    id: "b10-livre-guadeloupe",
    unit: 10,
    unitTitle: "Envies d'ailleurs ?",
    source: "livre",
    section: "atelier médiation",
    page: 152,
    title: "Atelier médiation — 1. La Guadeloupe",
    instruction: "Document destination pour l'atelier « Écrire un article de blog » : présentation de la Guadeloupe.",
    text: `La Guadeloupe, ou Karukera en créole, est un archipel des Antilles situé au sud de la mer des Caraïbes. Vue du ciel, la Guadeloupe a la forme d'un papillon. Ses deux plus grandes îles, Grande-Terre et Basse-Terre, forment ses ailes. Grande-Terre (590 m²) est l'endroit idéal pour faire des balades en bateau sur une eau bleue magnifique, presque transparente. Parfois, les dauphins accompagnent les bateaux… Sur l'île de Basse-Terre (848 m²), les passionnés de nature pourront visiter le parc national de la Guadeloupe et ses chutes du Carbet ou encore gravir le volcan de la Soufrière.

La petite île de Marie-Galante fera le bonheur des amateurs de marche grâce à ses nombreux sentiers de randonnée. Mais elle plaira aussi, comme les îles La Désirade ou Les Saintes, aux amateurs de plongée sous-marine qui pourront admirer les fonds marins et les récifs coralliens.

Sur ce territoire français d'Outre-mer vous profiterez des richesses naturelles, des plaisirs de la mer et des spécialités culinaires bien épicées !`,
    questions: [
      { id: "b10-guadeloupe-q1", type: "short_answer", prompt: "Où se trouve cet endroit ?", answer: "Un archipel des Antilles, au sud de la mer des Caraïbes." },
      { id: "b10-guadeloupe-q2", type: "short_answer", prompt: "Qu'est-ce qu'on peut y faire, y visiter ?", answer: "Des balades en bateau, le parc national et ses chutes du Carbet, gravir le volcan de la Soufrière, la randonnée à Marie-Galante, la plongée sous-marine à La Désirade et aux Saintes." },
      { id: "b10-guadeloupe-q3", type: "open", prompt: "En groupes : préparez en quelques lignes une présentation de la Guadeloupe et imaginez quatre anecdotes de voyage (visite, activité, rencontre, hébergement) pour un article de blog." },
    ],
  },

  // ── Atelier médiation · 2. Montréal ────────────────────────────────────
  {
    id: "b10-livre-montreal",
    unit: 10,
    unitTitle: "Envies d'ailleurs ?",
    source: "livre",
    section: "atelier médiation",
    page: 152,
    title: "Atelier médiation — 2. Montréal",
    instruction: "Document destination pour l'atelier « Écrire un article de blog » : présentation de Montréal.",
    text: `Située au Québec, à l'est du Canada, Montréal est une des villes multiculturelles les plus attractives du pays et du monde. Elle est à la fois moderne et historique. Son quartier le Vieux Montréal date du XVIIe siècle. On peut y voir la basilique Notre-Dame et les ruines archéologiques de la ville dans le musée Pointe-à-Callière. Ses rues pavées vous mènent aussi vers des boutiques et des restaurants très modernes. Le Vieux-Montréal est un quartier en constante évolution, c'est l'un des plus dynamiques de la ville, comme le quartier du Vieux-Port, situé au bord du fleuve Saint-Laurent. Il abrite le Centre des sciences de Montréal et la célèbre tour de l'horloge. Du sommet de la tour, on a une magnifique vue sur les environs. En été, il est possible de faire une croisière sur le Saint-Laurent ou une excursion vers les îles du parc Jean-Drapeau. En plein milieu du Saint-Laurent, deux îles forment un espace vert d'environ 2,6 km² pour le divertissement et le sport. Piscine, plage, location de barques, rollers, vélos, etc. Et il y a des pique-niques avec de la musique électronique les dimanches en été, un parc d'attractions, un casino, deux musées… Montréal est une ville vivante et pleine d'histoire !`,
    questions: [
      { id: "b10-montreal-q1", type: "short_answer", prompt: "Où se trouve cet endroit ?", answer: "Au Québec, à l'est du Canada." },
      { id: "b10-montreal-q2", type: "short_answer", prompt: "Qu'est-ce qu'on peut y faire, y visiter ?", answer: "Le Vieux-Montréal (basilique Notre-Dame, musée Pointe-à-Callière), le Vieux-Port (Centre des sciences, tour de l'horloge), une croisière sur le Saint-Laurent, les îles du parc Jean-Drapeau (piscine, plage, vélo, parc d'attractions, casino, musées)." },
      { id: "b10-montreal-q3", type: "open", prompt: "En groupes : préparez en quelques lignes une présentation de Montréal et imaginez quatre anecdotes de voyage (visite, activité, rencontre, hébergement) pour un article de blog." },
    ],
  },

  // ── Atelier médiation · 3. Lausanne ────────────────────────────────────
  {
    id: "b10-livre-lausanne",
    unit: 10,
    unitTitle: "Envies d'ailleurs ?",
    source: "livre",
    section: "atelier médiation",
    page: 152,
    title: "Atelier médiation — 3. Lausanne",
    instruction: "Document destination pour l'atelier « Écrire un article de blog » : présentation de Lausanne.",
    text: `Située sur les bords du lac Léman, Lausanne est une ville très agréable à vivre. Elle n'est qu'à une heure des montagnes du Jura et des Alpes suisses. Et la campagne est accessible en très peu de temps.

La vie culturelle de Lausanne est d'une incroyable richesse pour une ville de cette taille. On y trouve de nombreux musées, comme le Musée Olympique, la Collection de l'art brut, ou encore le Musée de l'Élysée (musée de photographie). Et grâce aux nombreux festivals, aux petites scènes et théâtres qui animent les quartiers, tout le monde peut profiter de la culture.

Dans la ville de Lausanne, il y a trois collines : la Cité, le Bourg et Saint-Laurent. Se promener dans cette ville, c'est donc sportif ! On monte et on descend les petites rues, on prend des escaliers… Au cœur de la Cité, qui est le quartier historique de la ville, la cathédrale de Lausanne domine la ville. C'est l'un des plus beaux monuments d'art gothique d'Europe. La Cité, c'est aussi le quartier des petits bistrots typiques et de l'artisanat. Et si vous souhaitez profiter du lac, vous pouvez faire une balade en barque sur ses eaux tranquilles.`,
    questions: [
      { id: "b10-lausanne-q1", type: "short_answer", prompt: "Où se trouve cet endroit ?", answer: "Sur les bords du lac Léman, en Suisse, à une heure des montagnes du Jura et des Alpes suisses." },
      { id: "b10-lausanne-q2", type: "short_answer", prompt: "Qu'est-ce qu'on peut y faire, y visiter ?", answer: "Le Musée Olympique, la Collection de l'art brut, le Musée de l'Élysée, la cathédrale de Lausanne dans le quartier de la Cité, les bistrots et l'artisanat, une balade en barque sur le lac." },
      { id: "b10-lausanne-q3", type: "open", prompt: "En groupes : préparez en quelques lignes une présentation de Lausanne et imaginez quatre anecdotes de voyage (visite, activité, rencontre, hébergement) pour un article de blog." },
    ],
  },
];

export default editoA2ReadingComprehension;
