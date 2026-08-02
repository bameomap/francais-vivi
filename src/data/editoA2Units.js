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
];
