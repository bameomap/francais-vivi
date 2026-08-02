// Édito A2 — speaking & writing tasks per unit.
//
// `notes` on a speaking task lists keys into EDITO_POUR_NOTES_A2
// (editoPourNotesA2.js): the « Pour communiquer » boxes the learner needs for
// that topic — structures, sample sentences, Vietnamese glosses. The A2
// speaking step is a preparation sheet built from these, not an AI roleplay.
//
// Otherwise the same shape as editoA1Units.js (EDITO_A1_UNITS), so WritingPanel
// consumes either list through its `units` prop.
//
// `unit` is the book's unit number; ids match the "b"-prefixed parcours ids
// used everywhere else in A2 (see parcoursDataA2.js).

export const EDITO_A2_UNITS = [
  {
    id: "unite-1", unit: 1, title: "Nouvelles vies",
    speakingPractice: [
      {
        title: "Racontez votre parcours",
        notes: ["b1-a"],
        task: "Racontez votre parcours à votre partenaire : où vous êtes né(e), où vous avez grandi, vos études, ce que vous êtes devenu(e). Utilisez le passé composé.",
        usefulPhrases: [
          "Je suis né(e) à/en/au(x)…",
          "J'ai grandi à/en/au(x)…",
          "Je suis venu(e) ici en 2019.",
          "J'ai fait mes études à…",
          "Je suis devenu(e)…",
        ],
      },
      {
        title: "Pourquoi le français ?",
        notes: ["b1-c"],
        task: "Expliquez pourquoi vous avez décidé d'apprendre le français et ce que vous comptez faire avec cette langue.",
        usefulPhrases: [
          "J'ai décidé d'apprendre le français parce que…",
          "Je compte chercher du travail en France.",
          "J'ai l'intention de rester ici.",
          "Je pense rentrer au Vietnam.",
          "C'est décidé !",
        ],
      },
      {
        title: "Vos loisirs préférés",
        notes: ["b1-d"],
        task: "Quels sont vos loisirs préférés ? Quelles activités ne vous intéressent pas du tout ? Discutez avec votre partenaire.",
        usefulPhrases: [
          "Ma passion, c'est…",
          "J'aime bien sortir.",
          "Je (ne) suis (pas) fan de jazz.",
          "Je n'aime pas trop les sports aquatiques.",
          "C'est pas du tout mon truc.",
        ],
      },
      {
        title: "Proposer une sortie (DELF)",
        notes: ["b1-i"],
        task: "Proposez une sortie à votre partenaire. Discutez pour trouver une activité qui plaît aux deux et fixez un rendez-vous (jour, heure, lieu).",
        usefulPhrases: [
          "Ça te dit ?",
          "Tu es libre le 9 juillet ?",
          "On se retrouve chez moi à 19 h ?",
          "Avec plaisir ! / Ça marche !",
          "Je m'excuse, mais je ne peux pas.",
        ],
      },
      {
        title: "Organiser une sortie pour la classe",
        notes: ["b1-atelier"],
        task: "Atelier médiation : présentez une sortie à faire ensemble. Décrivez l'activité, dites pourquoi elle est intéressante, puis donnez les informations pratiques (date, lieu de rendez-vous, transport, tarif, inscription).",
        usefulPhrases: [
          "Nous vous proposons…",
          "C'est l'occasion de…",
          "C'est une expérience unique.",
          "Le tarif est de 16,50 € par personne.",
          "Il faut réserver les places.",
        ],
      },
    ],
    writingPractice: [
      {
        title: "L'histoire d'un couple célèbre",
        task: "Racontez l'histoire d'un couple célèbre : leur rencontre, leur vie de famille. Écrivez au passé composé (60–80 mots).",
      },
      {
        title: "Une courte biographie",
        task: "Écrivez une courte biographie d'une personne de votre choix — une célébrité, un(e) ami(e), un membre de votre famille. Racontez sa naissance, ses études, sa carrière (60–80 mots).",
      },
      {
        title: "Une vie sans rien ni personne",
        task: "Imaginez la vie d'un homme très solitaire. Écrivez 4 phrases avec ne… plus, ne… jamais, ne… rien, ne… personne. Exemple : « Il ne fait jamais de sport. »",
      },
      {
        title: "Deux lieux à visiter",
        task: "Choisissez une ville et écrivez un petit texte pour présenter deux lieux à visiter. Expliquez pourquoi ils sont intéressants (60–80 mots).",
      },
      {
        title: "Vos sorties préférées",
        task: "Présentez vos sorties et activités préférées. Précisez où et avec qui vous aimez faire ces activités.",
      },
      {
        title: "Une compétition (DELF · 50 mots min.)",
        task: "Avez-vous déjà participé à une compétition sportive ou artistique ? Si oui, racontez votre expérience. Si non, racontez l'expérience d'une personne que vous connaissez ou d'une célébrité (50 mots minimum).",
      },
    ],
  },
  {
    id: "unite-2", unit: 2, title: "Je me souviens",
    speakingPractice: [
      {
        title: "Racontez un souvenir",
        notes: ["b2-a"],
        task: "Racontez à votre partenaire un souvenir lié à une odeur, une saveur, un lieu ou un objet — comme Lisandra avec les confitures de sa grand-mère. Utilisez « je me souviens de… » et « je me rappelle… ».",
        usefulPhrases: [
          "Je me souviens des confitures de ma grand-mère.",
          "Je me rappelle les bugnes qu'elle nous préparait.",
          "Ça sentait bon !",
          "C'est gravé dans ma mémoire.",
        ],
      },
      {
        title: "Vos vacances, avant et aujourd'hui",
        notes: ["b2-imparfait"],
        task: "Discutez avec un(e) ami(e) de vos vacances, avant et aujourd'hui. Utilisez l'imparfait pour parler de vos habitudes d'avant. Exemple : « Avant, je partais avec mes parents. Aujourd'hui je pars avec des amis. »",
        usefulPhrases: [
          "Avant, je partais avec mes parents.",
          "À cette époque, on allait chaque année à…",
          "Quand j'étais petit(e), nous…",
          "Maintenant, c'est différent : je…",
        ],
      },
      {
        title: "Interroger sur un souvenir (DELF)",
        notes: ["b2-e"],
        task: "À deux ! Questionnez votre voisin(e) sur un de ses souvenirs de vacances, puis inversez les rôles.",
        usefulPhrases: [
          "Quels souvenirs vous gardez de votre expérience ?",
          "Vous êtes content(e) de votre expérience ?",
          "Vous allez recommencer l'expérience ?",
        ],
      },
      {
        title: "Vos souvenirs de vacances",
        notes: ["b2-h"],
        task: "Qu'est-ce que vous rapportez en général de vos vacances ? Un objet, un vêtement, une spécialité gastronomique ? Expliquez pourquoi à votre partenaire.",
        usefulPhrases: [
          "En général, je rapporte…",
          "J'aime bien ramener une petite spécialité locale.",
          "Ce n'est pas du tout mon truc, les souvenirs-gadgets.",
        ],
      },
      {
        title: "Présenter l'exposition photo",
        notes: ["b2-atelier"],
        task: "Atelier médiation : présentez une exposition photo sur le thème « Souvenirs d'une époque » (années 70, 80 ou 90). Décrivez les objets, la mode, la musique de cette période et expliquez pourquoi vous l'avez choisie.",
        usefulPhrases: [
          "Nous avons choisi les années…",
          "À cette époque, on portait / on écoutait / on utilisait…",
          "Cette photo montre…",
          "C'est un objet emblématique de cette période.",
        ],
      },
    ],
    writingPractice: [
      {
        title: "Un témoignage sensoriel",
        task: "Écrivez un témoignage. Dites quels sont vos souvenirs liés à une odeur, à une saveur, à un lieu, à un objet… (60–80 mots).",
      },
      {
        title: "Un souvenir heureux (DELF · 50 mots min.)",
        task: "Décrivez un souvenir heureux (âge, lieu, activités, etc.). Utilisez l'imparfait. Exemple : « J'avais 5 ans, j'étais en vacances avec mes parents à la mer… » (50 mots minimum).",
      },
      {
        title: "Un lieu fantastique sur votre blog",
        task: "Vous avez découvert un lieu fantastique pendant un de vos voyages. Présentez ce lieu sur votre blog (60–80 mots).",
      },
      {
        title: "Lettre aux parents",
        task: "Vous êtes en vacances. Écrivez à vos parents pour leur donner des nouvelles et leur dire quels souvenirs vous avez achetés. Attention à la place des adjectifs !",
      },
    ],
  },
  {
    id: "unite-3", unit: 3, title: "Comme à la maison",
    speakingPractice: [
      {
        title: "Louer un logement",
        notes: ["b3-c"],
        task: "À deux ! Posez des questions à votre voisin(e) sur le logement décrit dans son annonce (superficie, loyer, charges…) ou un autre logement de son choix.",
        usefulPhrases: [
          "Je suis intéressé(e) par votre annonce.",
          "Quelle est la superficie du logement ?",
          "Quel est le montant du loyer ?",
          "Ça inclut les charges ?",
        ],
      },
      {
        title: "Ville ou campagne ?",
        notes: ["b3-e"],
        task: "À deux ! Une personne veut vivre en ville et l'autre préfère la campagne. Défendez votre position avec des comparaisons (plus/moins/aussi… que, meilleur, mieux).",
        usefulPhrases: [
          "Je veux déménager à la campagne pour avoir une vie meilleure.",
          "C'est plus calme qu'en ville.",
          "On a un meilleur cadre de vie.",
          "On vit mieux ici.",
        ],
      },
      {
        title: "Consoler un voisin",
        notes: ["b3-i"],
        task: "Un(e) ami(e) vous raconte un problème (objet perdu, voisin bruyant…). Réagissez : exprimez votre déception pour lui/elle, puis consolez-le/la.",
        usefulPhrases: [
          "Zut ! Mince ! C'est dommage.",
          "Ce n'est pas grave.",
          "Ça va aller.",
          "Courage ! Ne t'inquiète pas.",
        ],
      },
      {
        title: "Organiser une colocation",
        notes: ["b3-atelier"],
        task: "Atelier médiation : avec votre groupe, mettez-vous d'accord sur les caractéristiques du logement idéal pour une colocation, puis présentez votre projet à la classe.",
        usefulPhrases: [
          "Je préfère habiter en ville : c'est plus animé qu'à la campagne.",
          "Une maison, c'est mieux qu'un appartement parce que c'est plus grand.",
          "Si vous êtes d'accord, on peut prendre un logement meublé.",
          "J'ai trouvé un appartement qui a trois chambres et un grand salon.",
        ],
      },
    ],
    writingPractice: [
      {
        title: "Rédiger une petite annonce",
        task: "Vous avez un appartement à louer. Écrivez une petite annonce pour le décrire (localisation, pièces, loyer, caractéristiques).",
      },
      {
        title: "Un logement original",
        task: "Pensez à un endroit agréable, original ou amusant où dormir (bateau, bus, cabane…) et décrivez-le.",
      },
      {
        title: "Présenter son quartier",
        task: "Présentez votre quartier ou votre village sur un forum. Décrivez ses espaces, ses bâtiments, son ambiance, ses points positifs et négatifs.",
      },
      {
        title: "Réconforter un voisin (DELF · 50 mots min.)",
        task: "Un(e) ami(e) vous écrit que ses nouveaux voisins sont très bruyants et l'empêchent de dormir. Répondez-lui pour le/la réconforter et lui proposer une solution (50 mots minimum).",
      },
    ],
  },
  {
    id: "unite-4", unit: 4, title: "Tous pareils, tous différents",
    speakingPractice: [
      {
        title: "Décrire et complimenter",
        notes: ["b4-a", "b4-b"],
        task: "Décrivez le physique d'une personne que vous admirez (mannequin, acteur/actrice…), puis faites-lui un compliment sincère à voix haute.",
        usefulPhrases: [
          "Il/Elle a les cheveux longs/courts, gris/bruns.",
          "Il/Elle mesure 1,70 m.",
          "Il/Elle est costaud(e) = corpulent(e).",
          "Vous êtes trop fort(e) !",
          "Cette couleur vous donne bonne mine.",
        ],
      },
      {
        title: "Parler du caractère",
        notes: ["b4-d"],
        task: "Choisissez trois traits de votre caractère (qualités ou défauts) et expliquez à votre voisin(e) dans quelles situations ils peuvent être utiles ou gênants.",
        usefulPhrases: [
          "Je suis du genre extraverti / d'un naturel timide.",
          "Je suis doué(e) pour la communication.",
          "C'est quelqu'un de discret et réfléchi.",
          "Chaque défaut a aussi sa qualité.",
        ],
      },
      {
        title: "Choisir sa photo de profil",
        notes: ["b4-h", "b4-i"],
        task: "Discutez avec votre voisin(e) : quelle photo utilisez-vous sur les réseaux professionnels ? Et sur les réseaux personnels ? Pourquoi ?",
        usefulPhrases: [
          "Sur ce réseau, je préfère une photo sérieuse.",
          "J'aime bien montrer mes passions en photo.",
          "C'est la mienne / la tienne / la sienne.",
          "Voici les miennes !",
        ],
      },
      {
        title: "Présenter une œuvre d'art",
        notes: ["b4-atelier"],
        task: "Atelier médiation : café artistique. Choisissez une œuvre d'art, décrivez-la (sujet, couleurs, composition) et partagez les émotions qu'elle vous inspire.",
        usefulPhrases: [
          "C'est un tableau/une photographie qui date de…",
          "On voit… / On observe… / Elle représente…",
          "Au premier plan… / Au centre… / À gauche…",
          "Cette œuvre inspire la joie/la tristesse/la surprise.",
        ],
      },
    ],
    writingPractice: [
      {
        title: "Décrire un(e) mannequin",
        task: "Décrivez un(e) mannequin que vous avez vu(e) dans une publicité ou un magazine (physique, style, ce qui le/la rend particulier(-ère)).",
      },
      {
        title: "Le caractère d'un personnage de fiction (DELF)",
        task: "Décrivez le caractère d'un personnage de fiction que vous aimez : ses qualités, ses défauts, dans quelles situations ils apparaissent.",
      },
      {
        title: "Conseils pour une photo de profil",
        task: "Sur quels réseaux utiliseriez-vous une photo sérieuse ? Une photo plus personnelle ? Expliquez vos choix dans un court texte.",
      },
    ],
  },
  {
    id: "unite-5", unit: 5, title: "En route vers le futur !",
    speakingPractice: [
      {
        title: "Imaginer l'avenir",
        notes: ["b5-a"],
        task: "Selon vous, quelles idées pour le futur (maisons volantes, navettes autonomes, repas en comprimé…) sont de bonnes idées ? De mauvaises idées ? Discutez avec votre voisin(e).",
        usefulPhrases: [
          "Bientôt, il y aura…",
          "Un jour, on pourra…",
          "Dans un avenir proche, des robots…",
          "Ça paraît loin, la vie dans trente ans !",
        ],
      },
      {
        title: "Exprimer sa surprise",
        notes: ["b5-d"],
        task: "À deux ! Vous dites à votre ami(e) que vous avez remplacé votre smartphone par un téléphone sans Internet. Votre ami(e) est très surpris(e). Jouez la scène.",
        usefulPhrases: [
          "C'est pas possible !",
          "Ah bon ?",
          "Ça alors !",
          "Sérieux ?",
        ],
      },
      {
        title: "Convaincre avec des conditions",
        notes: ["b5-si"],
        task: "Votre enfant vous demande un téléphone et vous explique pourquoi c'est utile. Vous répondez chacun avec des conditions (si… / quand…). Jouez la scène avec votre voisin(e).",
        usefulPhrases: [
          "Si tu m'achètes un portable…",
          "Si tu as un portable, tu…",
          "Quand tu seras plus grand(e), tu…",
          "D'accord, mais seulement si…",
        ],
      },
      {
        title: "Interviewer un(e) scientifique",
        notes: ["b5-atelier"],
        task: "Atelier médiation : en groupe, préparez et jouez l'interview d'un(e) scientifique (Marie Curie, les frères Montgolfier, Arthur Zang…) sur sa vie et son invention.",
        usefulPhrases: [
          "Cette invention sert à…",
          "Cette découverte est révolutionnaire parce que…",
          "Dans le futur, cette invention permettra de…",
          "Comment avez-vous eu cette idée ?",
        ],
      },
    ],
    writingPractice: [
      {
        title: "Une ville dans 20 ans",
        task: "Choisissez une ville et écrivez un petit texte pour raconter comment vous l'imaginez dans 20 ans (transports, logements, commerces, relations sociales…).",
      },
      {
        title: "Une journée sans portable",
        task: "Vous voulez participer à une journée sans portable. Écrivez un e-mail à vos amis pour expliquer pourquoi, et comment ils pourront vous contacter ce jour-là.",
      },
      {
        title: "Rendez-vous à la RoboCup (DELF · 50-60 mots)",
        task: "Vous rêvez d'aller à la prochaine RoboCup. Écrivez un mail à un(e) ami(e) : présentez cet événement et proposez-lui de vous accompagner (50 à 60 mots).",
      },
    ],
  },
];
