/**
 * editoAudioNotes.js — « Pour communiquer » notes cho mỗi bài nghe B/C/F
 * Khớp với track ID trong editoAudio.js
 */

export const EDITO_POUR_NOTES = {

  // ─── Unité 1 ──────────────────────────────────────────────────────
  "u1-b": [
    {
      heading: "Pour se présenter",
      phrases: [
        "Je m'appelle [prénom].",
        "J'ai [X] ans.",
        "Je suis [nationalité].",
      ],
    },
    {
      heading: "Pour demander des informations sur quelqu'un",
      phrases: [
        "Comment vous vous appelez ? / Comment tu t'appelles ?",
        "Vous avez quel âge ? / Tu as quel âge ?",
        "Vous êtes / Tu es [nationalité] ?",
      ],
    },
  ],

  "u1-f": [
    {
      heading: "Pour parler de ses goûts",
      phrases: [
        "J'aime / J'adore [nom / infinitif].",
        "Tu aimes [nom] ?",
      ],
    },
    {
      heading: "Pour échanger des coordonnées",
      phrases: [
        "Tu as Facebook / Instagram ?",
        "Quel est ton numéro [de téléphone] ?",
        "C'est le [06 XX XX XX XX].",
      ],
    },
  ],

  // ─── Unité 2 ──────────────────────────────────────────────────────
  "u2-b": [
    {
      heading: "Pour exprimer ses goûts",
      phrases: [
        "J'aime / J'adore [nom / infinitif].",
        "Je n'aime pas [nom / infinitif].",
        "Je déteste [nom / infinitif].",
        "Moi aussi ! / Moi non plus !",
      ],
    },
  ],

  // ─── Unité 3 ──────────────────────────────────────────────────────
  "u3-b": [
    {
      heading: "Pour acheter dans un magasin",
      phrases: [
        "Ça coûte combien ? / Combien ça coûte ?",
        "[Le produit] coûte [X] euros.",
        "Ce sera tout ?",
      ],
    },
    {
      heading: "Pour payer",
      phrases: [
        "Vous payez comment ?",
        "Par carte / En espèces, s'il vous plaît.",
      ],
    },
  ],

  "u3-f": [
    {
      heading: "Pour parler des aliments disponibles",
      phrases: [
        "Il y a / On a [de la / du / des] + aliment.",
        "Il n'y a pas / On n'a pas de + aliment.",
        "On a un peu de [huile d'olive].",
      ],
    },
    {
      heading: "Pour faire une suggestion culinaire",
      phrases: [
        "On fait [des pâtes] ? / On mange [une quiche] ?",
        "Qu'est-ce qu'on mange ?",
        "Qu'est-ce que tu préfères ?",
      ],
    },
  ],

  // ─── Unité 4 ──────────────────────────────────────────────────────
  "u4-b": [
    {
      heading: "Pour décrire un quartier / une ville",
      phrases: [
        "C'est un quartier [agréable / dynamique / calme].",
        "Il y a [des cafés / une église / une mairie].",
        "C'est loin / près [du centre / de chez moi].",
      ],
    },
    {
      heading: "Pour situer un lieu",
      phrases: [
        "Là, c'est [la place du Capitole].",
        "Sur la place, il y a…",
        "Ici, c'est [la mairie]. / Moi, j'habite là, [rue des Jacobins].",
      ],
    },
  ],

  "u4-c": [
    {
      heading: "Pour parler de la fréquence",
      phrases: [
        "Je vais souvent / toujours / parfois [au musée / dans les parcs].",
        "Je vais rarement [au théâtre].",
        "Je ne vais jamais [rue de la République].",
      ],
    },
  ],

  "u4-f": [
    {
      heading: "Pour demander son chemin",
      phrases: [
        "Excusez-moi, on cherche [les Arènes].",
        "Où est [l'arrêt de bus], s'il vous plaît ?",
        "C'est quelle ligne ?",
      ],
    },
    {
      heading: "Pour indiquer un chemin",
      phrases: [
        "Tournez à droite / à gauche.",
        "Continuez tout droit sur [100] mètres.",
        "Prenez la première rue à droite.",
        "Prenez le bus direction [« Lices »].",
        "Descendez à l'arrêt [« Lices »].",
      ],
    },
  ],

  // ─── Unité 5 ──────────────────────────────────────────────────────
  "u5-b": [
    {
      heading: "Pour parler de la taille et de la pointure",
      phrases: [
        "Je fais du [38]. / Tu fais quelle taille ?",
        "Je chausse du [39]. / Tu chausses du combien ?",
      ],
    },
    {
      heading: "Pour donner son avis sur un vêtement",
      phrases: [
        "Il / Elle me plaît. / Il / Elle ne me plaît pas.",
        "Il / Elle te va bien !",
        "J'aime / Je n'aime pas [la couleur / le style].",
        "Quelle horreur ! / C'est à la mode !",
      ],
    },
  ],

  "u5-c": [
    {
      heading: "Pour parler de la météo",
      phrases: [
        "Il fait beau / froid / chaud. / Il fait [X] degrés.",
        "Il pleut. / Il neige. / Il y a du vent / des orages.",
        "Il y a des nuages.",
      ],
    },
    {
      heading: "Pour parler des saisons",
      phrases: [
        "En été / en automne / en hiver / au printemps…",
        "Début [septembre], il fait [30 degrés].",
        "L'hiver va être difficile, il va faire moins [10] degrés !",
      ],
    },
  ],

  "u5-f": [
    {
      heading: "Pour décrire un objet / un cadeau",
      phrases: [
        "C'est [un scanner portable]. C'est [rapide et pratique].",
        "À quoi ça sert ? / Ça sert à [numériser des documents].",
        "C'est pour [mettre une tablette].",
        "C'est [moderne / utile / idéal] !",
      ],
    },
    {
      heading: "Pour donner son avis",
      phrases: [
        "C'est une bonne idée ! / Je suis d'accord (avec [quelqu'un]).",
        "[La montre connectée], c'est le cadeau parfait !",
        "Je participe aussi !",
      ],
    },
  ],

  // ─── Unité 6 ──────────────────────────────────────────────────────
  "u6-b": [
    {
      heading: "Pour dire et demander l'heure",
      phrases: [
        "Quelle heure il est ? / Il est [neuf heures cinq].",
        "À quelle heure [le match] ? / C'est à quelle heure ?",
        "Le supermarché ouvre à [neuf heures].",
        "Midi moins dix = 11h50 · Dix-huit heures quarante-cinq = 18h45",
      ],
    },
    {
      heading: "Pour parler des activités du jour",
      phrases: [
        "Ils ont un cours de [dessin] à [dix heures et demie].",
        "On a le temps !",
        "Je vais [jardiner / faire le ménage].",
      ],
    },
  ],

  "u6-c": [
    {
      heading: "Pour proposer une sortie",
      phrases: [
        "Tu es libre ce soir ? On va [au théâtre] ?",
        "Tu veux aller [au musée] ?",
        "Ça te dit [une exposition sur Brancusi] ?",
      ],
    },
    {
      heading: "Pour accepter une proposition",
      phrases: [
        "Pourquoi pas ! / D'accord.",
        "Bonne idée ! / Super !",
      ],
    },
    {
      heading: "Pour refuser une proposition",
      phrases: [
        "Je ne peux pas, je suis désolé(e).",
        "Je n'ai pas envie. / Bof.",
        "Malheureusement non.",
      ],
    },
  ],

  "u6-f": [
    {
      heading: "Pour décrire l'apparence physique",
      phrases: [
        "Il / Elle est [grand(e) / mince / brun(e) / chauve].",
        "Il / Elle a les cheveux [courts / bruns / châtains / blonds].",
        "Il / Elle a les yeux [verts / noirs / bleus].",
        "Il / Elle a [la barbe / un grand nez].",
      ],
    },
  ],

  // ─── Unité 7 ──────────────────────────────────────────────────────
  "u7-c": [
    {
      heading: "Pour situer des objets dans une pièce",
      phrases: [
        "Je place [la télé] en face de [le canapé].",
        "[La lampe] est à droite / à gauche [du canapé].",
        "[Le tableau] est entre [les deux fenêtres].",
        "[Le tapis] est sous [la table].",
        "[L'aquarium] est à côté de [la fenêtre].",
        "[La table] est derrière / devant [le canapé].",
      ],
    },
  ],

  "u7-f": [
    {
      heading: "Pour exprimer l'obligation et l'interdiction",
      phrases: [
        "C'est interdit. / Ce n'est pas possible.",
        "On peut [mettre les objets dans le couloir].",
        "Ce n'est pas agréable…",
      ],
    },
    {
      heading: "Pour faire une suggestion",
      phrases: [
        "On peut [dire à notre voisin de participer].",
        "Je vais [mettre un mot dans l'ascenseur].",
        "Bonne idée ! On va s'amuser !",
      ],
    },
  ],

  // ─── Unité 8 ──────────────────────────────────────────────────────
  "u8-b": [
    {
      heading: "Pour parler de ses symptômes",
      phrases: [
        "J'ai mal à [la gorge / la tête / les oreilles / le genou].",
        "J'ai [un rhume / de la fièvre / 39 de fièvre].",
        "Je tousse. / Je suis inquiet(e).",
        "Ça a commencé [hier] / il y a [deux jours].",
      ],
    },
    {
      heading: "Pour consulter un médecin",
      phrases: [
        "Qu'est-ce qui vous arrive ?",
        "Vous toussez ? / Vous avez encore de la fièvre ?",
        "Vous avez pris des médicaments ?",
        "Vous pesez combien ? / Quelle est votre taille ?",
      ],
    },
  ],

  "u8-c": [
    {
      heading: "Pour parler de sa santé",
      phrases: [
        "Je suis en [bonne santé / pleine forme].",
        "Je ne suis pas souvent malade.",
        "Marcher, ça fait du bien !",
      ],
    },
    {
      heading: "Pour parler d'un rendez-vous médical",
      phrases: [
        "Je vais chez le médecin [une fois par an].",
        "Je vais téléphoner et prendre un rendez-vous.",
        "Mon médecin fait des visites à domicile.",
      ],
    },
  ],

  "u8-f": [
    {
      heading: "Pour exprimer l'obligation et l'interdiction",
      phrases: [
        "Je dois [faire attention à mon alimentation].",
        "Je ne dois pas manger de [produits gras / sucrés].",
        "On doit [changer notre manière de manger].",
      ],
    },
    {
      heading: "Pour réagir à une information",
      phrases: [
        "Tu as raison ! / Tu as tort !",
        "C'est incroyable ! / Ah bon ? C'est vrai ?",
        "Je suis d'accord !",
      ],
    },
  ],

  // ─── Unité 9 ──────────────────────────────────────────────────────
  "u9-b": [
    {
      heading: "Pour réserver une chambre d'hôtel",
      phrases: [
        "Je voudrais réserver une chambre [pour les vacances].",
        "À quelles dates ? / Du [18] au [23 août].",
        "C'est pour combien de personnes ?",
        "À quel nom, s'il vous plaît ?",
      ],
    },
    {
      heading: "Pour se renseigner à l'hôtel",
      phrases: [
        "Le petit déjeuner est compris ?",
        "Les animaux sont acceptés ?",
        "Il y a un parking [privé] ?",
        "Qu'est-ce qu'on peut faire dans la région ?",
      ],
    },
  ],

  "u9-c": [
    {
      heading: "Pour raconter un voyage au passé",
      phrases: [
        "J'ai fait [de la randonnée].",
        "J'ai visité [des villes et des musées].",
        "J'ai vu [des amis]. / J'ai adoré / aimé.",
        "J'ai pris des photos.",
      ],
    },
    {
      heading: "Pour décrire un lieu visité",
      phrases: [
        "C'est [magnifique / très sympa / très animé].",
        "Les gens sont [très gentils].",
        "On mange bien.",
        "Tu dois y aller !",
      ],
    },
  ],

  "u9-f": [
    {
      heading: "Pour exprimer une préférence",
      phrases: [
        "Je préfère [les vacances à la mer].",
        "J'aime mieux [bronzer et nager].",
        "J'aime bien [la campagne], mais je préfère [la mer].",
      ],
    },
  ],

  // ─── Unité 10 ─────────────────────────────────────────────────────
  "u10-b": [
    {
      heading: "Pour parler de ses études",
      phrases: [
        "Je suis en [quatrième] année / en master / en licence.",
        "J'étudie [le droit / les langues / le commerce].",
        "J'ai eu ma [licence] [l'année dernière].",
        "J'hésite entre [les langues] et [le droit].",
      ],
    },
    {
      heading: "Pour donner son avis sur les études",
      phrases: [
        "Les cours et les profs sont [excellents / intéressants].",
        "On apprend de nouvelles choses tous les jours.",
        "C'est important pour avoir de [bonnes notes].",
      ],
    },
  ],

  "u10-c": [
    {
      heading: "Pour parler de ses projets",
      phrases: [
        "Je rêve de [travailler pour une organisation internationale].",
        "J'espère [avoir mon diplôme / trouver un travail intéressant].",
        "Je veux [être utile].",
        "Je dois finir [mon master].",
      ],
    },
    {
      heading: "Pour parler d'une expérience enrichissante",
      phrases: [
        "J'ai appris beaucoup de choses.",
        "Je suis plus [patient(e)] maintenant.",
        "C'est une pause pour [faire de nouvelles choses].",
      ],
    },
  ],

  "u10-f": [
    {
      heading: "Pour parler de son travail",
      phrases: [
        "Je suis [responsable]. / Je travaille dans une équipe de [8] personnes.",
        "J'ai [un bon salaire]. / Je viens de commencer.",
        "Mon nouveau bureau est [assez grand].",
      ],
    },
    {
      heading: "Pour parler des avantages du télétravail",
      phrases: [
        "Je suis moins [fatigué(e)] avec le télétravail.",
        "Je peux [m'organiser comme je veux].",
        "Je peux commencer plus tôt / finir plus tard.",
        "C'est [pratique] !",
      ],
    },
  ],
};
