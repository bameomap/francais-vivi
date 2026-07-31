// Édito A2 — speaking & writing tasks per unit.
// Same shape as editoA1Units.js (EDITO_A1_UNITS) so WritingPanel and
// ConversationPanel can consume either list through their `units` prop.
//
// `unit` is the book's unit number; ids match the "b"-prefixed parcours ids
// used everywhere else in A2 (see parcoursDataA2.js).

export const EDITO_A2_UNITS = [
  {
    id: "unite-1", unit: 1, title: "Nouvelles vies",
    speakingPractice: [
      {
        title: "Racontez votre parcours",
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
];
