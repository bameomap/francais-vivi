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
  {
    id: "unite-6", unit: 6, title: "En cuisine",
    speakingPractice: [
      {
        title: "Expliquer une recette",
        notes: ["b6-c"],
        task: "À deux ! Présentez à votre voisin(e) un plat sucré ou salé que vous aimez cuisiner, en donnant les instructions dans l'ordre (mélangez, coupez, versez, faites cuire…).",
        usefulPhrases: [
          "Mélangez le lait avec la crème.",
          "Coupez le beurre en petits morceaux.",
          "Versez la pâte sur les fruits.",
          "Faites cuire pendant 35-40 minutes.",
        ],
      },
      {
        title: "Mettre en garde",
        notes: ["b6-d"],
        task: "À deux ! Imaginez et jouez une scène où vous donnez des règles et des mises en garde dans un lieu de votre choix (cuisine, restaurant, réunion de famille…), en utilisant des expressions d'obligation et d'interdiction.",
        usefulPhrases: [
          "Faites attention aux températures de conservation.",
          "Attention ! C'est dangereux.",
          "Il est interdit de…",
          "Il ne faut pas…",
        ],
      },
      {
        title: "Passer commande au restaurant",
        notes: ["b6-h"],
        task: "À deux ! Au restaurant, posez des questions au serveur ou à la serveuse sur les plats, puis passez commande.",
        usefulPhrases: [
          "Vous avez choisi ? – En entrée, je voudrais…",
          "Quel est le plat du jour ?",
          "Qu'est-ce que vous me conseillez ?",
          "Ça vous a plu ? – Oui, c'était très bon !",
        ],
      },
      {
        title: "Donner son avis sur un restaurant",
        notes: ["b6-i"],
        task: "À deux ! Vous sortez d'un restaurant : l'un(e) a adoré, l'autre a détesté. Discutez et exprimez votre satisfaction ou votre insatisfaction.",
        usefulPhrases: [
          "(C'est) un régal !",
          "J'ai eu un coup de cœur.",
          "Le service est trop lent.",
          "C'est une honte !",
        ],
      },
      {
        title: "Réaliser un sondage sur l'alimentation",
        notes: ["b6-atelier"],
        task: "Atelier médiation : en groupe, choisissez un thème (consommation de viande/poisson, type de plats consommés, partage de photos, origine des recettes), préparez 2 questions, interrogez la classe et présentez vos résultats sous forme de graphique.",
        usefulPhrases: [
          "Manger de la viande ou du poisson ≠ être végétarien(ne).",
          "Manger des plats préparés ≠ faits maison.",
          "Partager des photos de plats en ligne.",
          "Suivre ≠ ne pas suivre une recette.",
        ],
      },
    ],
    writingPractice: [
      {
        title: "Écrire une recette",
        task: "Choisissez un plat sucré ou salé que vous aimez et écrivez sa recette (ingrédients + préparation à l'impératif).",
      },
      {
        title: "Des règles pour un restaurant pas comme les autres",
        task: "À deux ! Imaginez et écrivez une liste de règles amusantes ou originales pour un restaurant pas comme les autres. Utilisez des expressions d'interdiction et d'obligation.",
      },
      {
        title: "Un avis sur un restaurant (DELF · 60-80 mots)",
        task: "Choisissez un restaurant que vous connaissez et écrivez un commentaire pour exprimer votre satisfaction ou votre insatisfaction. Décrivez le lieu, le repas et vos impressions (60 à 80 mots).",
      },
    ],
  },
  {
    id: "unite-7", unit: 7, title: "À votre santé !",
    speakingPractice: [
      {
        title: "Donner des conseils pour bien dormir",
        notes: ["b7-a"],
        task: "À deux ! Un(e) de vos amis vous explique qu'il/elle dort très mal. Vous lui donnez des conseils pour mieux dormir, en utilisant des pronoms COD et COI.",
        usefulPhrases: [
          "Il est important d'être attentif(ve) à votre position de sommeil.",
          "Il est conseillé de dormir sur le côté.",
          "Je vous recommande de placer un oreiller entre vos jambes.",
          "Je te déconseille de dormir sur le ventre.",
        ],
      },
      {
        title: "Chez le/la pharmacien(ne)",
        notes: ["b7-e"],
        task: "À deux ! Vous ne vous sentez pas très bien, vous allez à la pharmacie. Le/La pharmacien(ne) vous pose des questions. Vous expliquez vos symptômes. Jouez la scène.",
        usefulPhrases: [
          "Qu'est-ce qui ne va pas ? – Je suis un peu patraque.",
          "Vous avez consulté votre médecin ?",
          "Vous avez mal à la gorge ? – J'ai le nez bouché.",
          "Vous avez de la fièvre ?",
        ],
      },
      {
        title: "Débattre des gestes de premiers secours",
        notes: ["b7-j"],
        task: "À deux ! Faites le test « Que faire en cas d'urgence ? », puis débattez : doit-on enseigner les gestes de premiers secours à l'école ? Exprimez votre point de vue.",
        usefulPhrases: [
          "Pour nous/moi, ce n'est pas suffisant.",
          "Je crois/pense/trouve que…",
          "À mon avis, il faut appeler les secours.",
        ],
      },
      {
        title: "Participer à une campagne de prévention",
        notes: ["b7-atelier"],
        task: "Atelier médiation : en groupe, choisissez un domaine de santé (alimentation, pollution, sécurité routière, risques auditifs, sédentarité), faites des recherches, préparez un support (diaporama, affiche, flyer, vidéo) et présentez votre campagne de prévention à la classe.",
        usefulPhrases: [
          "Évitez de…",
          "Il est (dé)conseillé de…",
          "Pensez à…",
          "Le mieux, c'est de…",
        ],
      },
    ],
    writingPractice: [
      {
        title: "Un message après une sieste (DELF)",
        task: "Vous avez découvert un bar à sieste dans votre quartier. Vous y êtes allé(e) et vous avez fait une sieste. Vous écrivez à un(e) ami(e) francophone pour lui raconter votre expérience et donner vos impressions.",
      },
      {
        title: "Un message à son coach sportif",
        task: "Vous avez mal dormi et vous ne pourrez pas participer à une compétition sportive. Vous écrivez à votre coach pour lui expliquer ce qui vous arrive.",
      },
      {
        title: "Les gestes de premiers secours à l'école",
        task: "Doit-on enseigner les gestes de premiers secours selon vous ? Pourquoi ? Rédigez un court texte pour donner votre avis.",
      },
    ],
  },
  {
    id: "unite-8", unit: 8, title: "Dans les médias",
    speakingPractice: [
      {
        title: "Comment vous informez-vous ?",
        notes: ["b8-b"],
        task: "À deux ! Vous parlez avec votre voisin(e) de votre manière de vous informer. Vous exprimez vos préférences.",
        usefulPhrases: [
          "J'aime mieux lire la presse en ligne.",
          "Je préfère les réseaux sociaux aux médias traditionnels.",
          "C'est mieux (que…).",
        ],
      },
      {
        title: "Ce qui vous intéresse sur les réseaux sociaux",
        notes: ["b8-d"],
        task: "À deux ! Qu'est-ce qui vous intéresse sur les réseaux sociaux ? Qu'est-ce qui ne vous intéresse pas ? Discutez avec votre voisin(e).",
        usefulPhrases: [
          "Ça m'/nous intéresse !",
          "Je m'intéresse à leur vie !",
          "C'est fascinant ! C'est passionnant !",
          "Je suis curieux/curieuse de savoir comment ça fonctionne.",
        ],
      },
      {
        title: "Critiquer un film ou une série",
        notes: ["b8-h"],
        task: "À deux ! Discutez d'un film ou d'une série que vous avez vu(e) récemment. L'un(e) en fait une critique positive, l'autre une critique négative.",
        usefulPhrases: [
          "Ce film est une bonne surprise. C'est passionnant !",
          "J'ai bien aimé. Ce film m'a plu.",
          "Je n'ai pas du tout aimé. Le scénario est mauvais.",
          "C'est (très) ennuyeux.",
        ],
      },
      {
        title: "Faire la critique d'un média (atelier médiation)",
        notes: ["b8-atelier"],
        task: "En groupes de trois ou quatre : choisissez un média (podcast, réseaux sociaux, télévision, presse people, cinéma…), listez ses points positifs et négatifs, puis préparez et présentez à la classe une critique positive et/ou négative sous forme de podcast ou de présentation orale.",
        usefulPhrases: [
          "C'est intéressant d'écouter des podcasts, parce que…",
          "La télé, c'est très bien parce que…",
          "Les réseaux sociaux, c'est nul, parce que…",
          "On trouve les journaux ennuyeux, parce que…",
        ],
      },
    ],
    writingPractice: [
      {
        title: "Pourquoi je n'utilise plus certains médias (DELF)",
        task: "Sur un forum, expliquez pourquoi vous n'utilisez plus certains supports ou médias. Utilisez les connecteurs de l'écrit : parce que, car, c'est pourquoi, c'est pour cela que. (50-60 mots)",
      },
      {
        title: "Les réseaux sociaux et l'information sérieuse",
        task: "Sur un forum, vous répondez à la question : les réseaux sociaux sont-ils utiles pour diffuser des informations sérieuses ou complexes ?",
      },
      {
        title: "Critique d'un film ou d'une série",
        task: "Écrivez une critique positive et/ou négative d'une série ou d'un film que vous avez vu(e).",
      },
    ],
  },
  {
    id: "unite-9", unit: 9, title: "Consommer responsable",
    speakingPractice: [
      {
        title: "Exprimer un souhait et donner un conseil",
        notes: ["b9-a", "b9-c"],
        task: "À deux ! Vous parlez de vos souhaits et vous vous donnez des conseils pour les réaliser.",
        usefulPhrases: [
          "J'aimerais être riche ! → Tu devrais dépenser moins d'argent.",
          "Je voudrais…",
          "Tu devrais… / Je te conseille de…",
        ],
      },
      {
        title: "Proposer quelque chose à son voisin(e)",
        task: "Écrivez un message à votre voisin(e) pour lui proposer de faire quelque chose. Utilisez le conditionnel présent.",
        usefulPhrases: [
          "Ça te dirait de… ?",
          "On pourrait…",
          "Tu ne voudrais pas… ?",
        ],
      },
      {
        title: "Demander et proposer un service",
        notes: ["b9-h"],
        task: "À deux ! Vous avez besoin de faire du bricolage dans votre appartement. Vous demandez de l'aide à votre voisin(e). Vous lui proposez un service en échange. Jouez la scène.",
        usefulPhrases: [
          "Pourriez-vous m'expliquer ?",
          "J'ai besoin d'aide en…",
          "Je propose de faire…",
          "Je peux faire…",
        ],
      },
      {
        title: "Organiser un troc (atelier médiation)",
        notes: ["b9-atelier"],
        task: "En groupes de trois ou quatre : préparez des annonces pour proposer et rechercher des objets ou des services, collez-les au tableau, puis discutez avec les autres étudiant(e)s pour organiser des trocs.",
        usefulPhrases: [
          "Je donne… / Je cherche… / Je propose de…",
          "J'aimerais avoir des informations sur…",
          "Ça te dirait de… ?",
          "Quand est-ce que tu es libre ?",
        ],
      },
    ],
    writingPractice: [
      {
        title: "Liste de souhaits pour le défi « Rien de neuf »",
        task: "Vous avez décidé de participer au défi « Rien de neuf ». Postez votre liste de souhaits sur Instagram et expliquez pourquoi vous faites ces souhaits.",
      },
      {
        title: "Conseils pour vendre des meubles (DELF)",
        task: "Félix a posté un message sur un forum : il déménage bientôt et veut vendre ses meubles sur Internet. Répondez-lui et donnez-lui des conseils.",
      },
      {
        title: "Comment mieux consommer",
        task: "Comment peut-on mieux consommer ? Faites une liste de propositions en utilisant le gérondif. Exemple : On peut mieux consommer en achetant moins d'objets neufs.",
      },
      {
        title: "Une Troc Party entre amis",
        task: "Vous écrivez un message à un(e) ami(e) pour lui proposer de vous accompagner à une Troc Party. Expliquez comment fonctionne cet événement et précisez quels objets vous allez apporter.",
      },
    ],
  },
  {
    id: "unite-10", unit: 10, title: "Envies d'ailleurs ?",
    speakingPractice: [
      {
        title: "Demander des renseignements sur un voyage",
        notes: ["b10-a", "b10-b"],
        task: "À deux ! Vous travaillez dans une agence de voyage. Un(e) client(e) veut faire un voyage sur-mesure dans votre pays et vous téléphone. Il/Elle vous demande des renseignements sur l'hébergement, le vol, le prix et les repas. Vous le/la renseignez. Inversez les rôles.",
        usefulPhrases: [
          "Je voudrais avoir des renseignements s'il vous plaît.",
          "Vous pouvez me donner des précisions sur l'hébergement ?",
          "Est-ce que les vols sont inclus dans le prix ?",
        ],
      },
      {
        title: "Exprimer et répondre à l'agacement",
        notes: ["b10-i"],
        task: "À deux ! Vous êtes en voyage avec un(e) ami(e). Mais il/elle a une attitude qui vous agace. Jouez la scène puis inversez les rôles.",
        usefulPhrases: [
          "Tu exagères !",
          "Mais c'est pas possible !",
          "Ça va ! Du calme !",
        ],
      },
      {
        title: "Échanger sur sa manière de visiter une ville",
        task: "À deux ! Échangez avec votre voisin(e) sur votre manière de visiter une ville et sur les visites qui vous intéressent. Et vous, quel type de tourisme vous aimez ?",
        usefulPhrases: [
          "Je préfère…",
          "Ça change !",
          "Le tourisme local/lent/durable.",
        ],
      },
      {
        title: "Réagir à un article de blog (atelier médiation)",
        notes: ["b10-atelier"],
        task: "Les personnes de la classe lisent votre article de blog sur votre dernier voyage et vous envoient un petit commentaire pour y réagir.",
        usefulPhrases: [
          "J'ai bien ri !",
          "Quel beau voyage ! Quelle aventure !",
          "Bravo pour ce blog !",
        ],
      },
    ],
    writingPractice: [
      {
        title: "Proposer un circuit à un ami",
        task: "Un ami français va vous rendre visite dans votre pays. Vous lui écrivez un mail pour lui proposer un circuit (D'abord…, Après…, Ensuite…, Enfin…).",
      },
      {
        title: "Expliquer sa manière de voyager",
        task: "Un(e) ami(e) vous propose de faire une croisière pendant une semaine sur la Méditerranée mais vous n'aimez pas les voyages en bateau. Vous lui écrivez un message pour lui expliquer le type de voyages, d'hébergements, de déplacements, de rencontres que vous aimez.",
      },
      {
        title: "Commenter deux visites touristiques",
        task: "Vous avez visité deux lieux touristiques. La première visite vous a enchanté(e), mais la deuxième vous a déçu(e). Vous écrivez des commentaires sur un site.",
      },
      {
        title: "Écrire un article de blog (atelier médiation)",
        task: "Vous allez écrire un article sur votre blog pour raconter votre dernier voyage. Choisissez une destination (la Guadeloupe, Montréal ou Lausanne), préparez une présentation du lieu et rédigez quatre anecdotes qui ont eu lieu pendant votre voyage.",
      },
    ],
  },

  // ═══════════════ Unité 11 — De jolis parcours ═══════════════
  {
    id: "unite-11", unit: 11, title: "De jolis parcours",
    speakingPractice: [
      {
        title: "Présenter son parcours scolaire ou professionnel (DELF)",
        notes: ["b11-a"],
        task: "À deux ! Présentez votre parcours scolaire, d'études ou professionnel à votre voisin(e).",
        usefulPhrases: [
          "J'ai passé mon bac scientifique.",
          "Je me suis inscrit(e) en…",
          "J'ai réussi mes examens.",
        ],
      },
      {
        title: "Faire un CV, échanger sur un profil professionnel",
        notes: ["b11-e"],
        task: "À deux ! Interrogez votre voisin(e) comme un recruteur ou une recruteuse pour connaître des éléments de son CV. Ensuite, échangez les rôles.",
        usefulPhrases: [
          "Quelles sont vos compétences ?",
          "Quelle est votre expérience professionnelle ?",
          "Quels sont vos centres d'intérêt ?",
        ],
      },
      {
        title: "Exprimer une évidence (DELF)",
        notes: ["b11-i"],
        task: "À deux ! Commentez les résultats du test « Êtes-vous prêt(e) à changer de métier ? » avec votre voisin(e). Sont-ils évidents pour vous ?",
        usefulPhrases: [
          "Évidemment !",
          "C'est sûr.",
          "C'est certain.",
        ],
      },
      {
        title: "Présenter le travail idéal de la classe (atelier médiation)",
        notes: ["b11-atelier"],
        task: "Présentez le « top 10 » des critères du travail idéal établi par votre groupe. Prenez des notes sur les réponses des autres groupes puis synthétisez les propositions pour faire le portrait-robot du travail idéal de la classe.",
        usefulPhrases: [
          "Le plus important, c'est de…",
          "Ce qui est important, c'est…",
          "Travailler en équipe, avoir un travail utile.",
        ],
      },
      {
        title: "DELF A2 — Monologue suivi (exercice 2)",
        task: "Choisissez un sujet et parlez pendant deux minutes. Sujet A : parlez de votre professeur(e) préféré(e) — qu'est-ce qu'il/elle enseignait ? Où ? Quand ? Comment ? Quels souvenirs gardez-vous de cette personne ? Sujet B : avez-vous déjà passé un entretien pour un travail ou des études ? Où ? Quand ? Pourquoi ? Comment avez-vous vécu cette expérience ? Racontez.",
        usefulPhrases: [
          "Mon professeur préféré était…",
          "J'ai passé un entretien pour…",
          "Et, mais, alors, donc… (pour relier ses idées)",
        ],
      },
      {
        title: "DELF A2 — Exercice en interaction (exercice 3)",
        task: "Choisissez un sujet et jouez la scène avec l'examinateur ou l'examinatrice. Sujet A : un(e) ami(e) francophone vient travailler dans votre pays et vous pose des questions sur le monde du travail (offres d'emploi, recrutement, salaires, vacances…). Sujet B : vous êtes en France et vous voulez étudier dans une école professionnelle — vous passez un entretien avec le directeur ou la directrice, vous vous présentez et expliquez pourquoi vous voulez étudier dans cette école.",
        usefulPhrases: [
          "Dans mon pays, le monde du travail…",
          "Je voudrais étudier dans cette école parce que…",
          "Est-ce que vous pouvez m'expliquer… ?",
        ],
      },
    ],
    writingPractice: [
      {
        title: "Écrire une lettre de remerciement (DELF)",
        task: "Écrivez une lettre à quelqu'un qui a changé votre vie pour lui dire merci. (60 mots minimum)",
      },
      {
        title: "Écrire un message formel",
        task: "Avec votre voisin(e), échangez des messages comme sur un réseau professionnel : vous faites une demande de connexion, votre voisin(e) vous accepte, vous lui répondez, etc.",
      },
      {
        title: "Faire son CV",
        task: "À votre tour, faites votre CV en français.",
      },
      {
        title: "Raconter une reconversion professionnelle",
        task: "Choisissez deux professions très différentes et racontez le parcours d'une personne qui passe d'un métier à l'autre.",
      },
    ],
  },

  // ═══════════════ Unité 12 — Soif de nature ═══════════════
  {
    id: "unite-12", unit: 12, title: "Soif de nature",
    speakingPractice: [
      {
        title: "Discuter de son inquiétude pour l'avenir de la Terre",
        notes: ["b12-a"],
        task: "À deux ! Est-ce que vous vous inquiétez de l'avenir de notre Terre ? Discutez !",
        usefulPhrases: [
          "Cela nous fait peur.",
          "Nous sommes inquiets.",
          "Vous vous inquiétez de l'avenir de notre Terre ?",
        ],
      },
      {
        title: "Présenter la fête de l'environnement (DELF)",
        task: "Vous êtes membre du Centre de protection de l'environnement. Un(e) ami(e) veut participer à une action de protection de la nature et vous pose des questions. Vous lui présentez la fête de l'environnement. Vous lui expliquez pourquoi il faut y participer.",
        usefulPhrases: [
          "Nous voulons sensibiliser le public à…",
          "Nous proposons des ateliers sur…",
          "Il faut agir pour préserver…",
        ],
      },
      {
        title: "Approuver un changement positif pour l'environnement",
        notes: ["b12-g"],
        task: "Dans le domaine de l'environnement, présentez un changement positif. Dites pourquoi vous l'approuvez.",
        usefulPhrases: [
          "Bravo !",
          "Nous approuvons cette décision.",
          "Nous sommes pour les bonnes nouvelles !",
        ],
      },
      {
        title: "Protester contre une atteinte à la nature",
        notes: ["b12-i"],
        task: "À deux ! Choisissez un sujet (déforestation, pollution, maltraitance animale…) et exprimez votre désaccord. Votre voisin(e) vous répond.",
        usefulPhrases: [
          "Je ne suis pas d'accord avec cela.",
          "Je proteste contre…",
          "Je dis non à…",
        ],
      },
      {
        title: "Présenter ses compétences en jardinage",
        notes: ["b12-j"],
        task: "À deux ! Présentez vos compétences (jardinage, bricolage, informatique…) à votre voisin(e) et proposez de l'aider dans un domaine.",
        usefulPhrases: [
          "Je sais faire beaucoup de choses.",
          "Je suis bon(ne) en…",
          "Je connais très bien…",
        ],
      },
      {
        title: "Présenter et choisir des œuvres pour un festival (atelier médiation)",
        notes: ["b12-atelier"],
        task: "Formez trois groupes. Choisissez un texte, présentez-le à la classe (auteur(e), thème, vos sentiments sur le texte) puis, en grand groupe, choisissez les cinq œuvres qui seront présentées au festival Littérature et Écologie.",
        usefulPhrases: [
          "Ce texte est extrait de…",
          "J'aime bien ce texte parce que…",
          "Nous nous sommes mis(es) d'accord.",
        ],
      },
    ],
    writingPractice: [
      {
        title: "Motiver les gens à protéger la biodiversité",
        task: "À deux ! Choisissez un domaine d'action (pollution, gaspillage, protection des animaux…) et écrivez un petit texte pour motiver les gens à agir.",
      },
      {
        title: "Écrire un message sur les objectifs d'une organisation (DELF)",
        task: "Vous faites partie d'une organisation qui protège les animaux. Vous écrivez à un(e) camarade. Vous lui expliquez les objectifs de cette organisation et vous donnez vos impressions. (60 mots minimum)",
      },
      {
        title: "Protester pour la forêt sur un réseau social",
        task: "Vous travaillez dans une association active pour la protection de la nature. Contre quoi vous protestez ? Écrivez un message pour votre réseau social.",
      },
      {
        title: "Poster une annonce de co-jardinage",
        task: "Postez un message sur le site plantezcheznous. Présentez vos compétences et proposez de jardiner chez quelqu'un.",
      },
    ],
  },
];
