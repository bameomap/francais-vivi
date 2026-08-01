// Édito A1 — speaking & writing tasks per unit.
//
// `notes` on a speaking task lists keys into EDITO_POUR_NOTES
// (editoAudioNotes.js): the « Pour communiquer » boxes of that lesson —
// structures and sample sentences with Vietnamese glosses. The speaking step
// is a preparation sheet built from these (ProductionOralePanel).
// Unité 0 has no « Pour communiquer » boxes, so its tasks carry no `notes`.

export const EDITO_A1_UNITS = [
  {
    id: "unite-0", unit: 0, title: "Bienvenue !",
    speakingPractice: [
      { title: "Se présenter", task: "Présentez-vous à votre partenaire : dites bonjour et donnez votre prénom.", usefulPhrases: ["Bonjour, je m'appelle…", "Et vous ?", "Moi, je m'appelle…"] },
      { title: "Saluer", task: "Saluez votre partenaire selon la situation (le matin, le soir, un ami, un professeur), puis dites au revoir.", usefulPhrases: ["Bonjour", "Salut", "Au revoir", "À bientôt"] },
      { title: "Dans la classe", task: "Vous êtes en classe de français : demandez de répéter, demandez comment on dit un mot, dites que vous ne comprenez pas.", usefulPhrases: ["Vous pouvez répéter ?", "Comment on dit… ?", "Je ne comprends pas.", "Qu'est-ce que ça veut dire ?"] },
    ],
    writingPractice: [
      { title: "Écrire son prénom", task: "Épelez et écrivez des prénoms." },
      { title: "Dire une date", task: "Écrivez la date d'une fête ou d'un événement." },
    ],
  },
  {
    id: "unite-1", unit: 1, title: "Je suis…",
    speakingPractice: [
      { notes: ["u1-a", "u1-b"], title: "Speak-dating", task: "Vous participez à un speak-dating : présentez-vous et posez des questions à votre partenaire.", usefulPhrases: ["Je m'appelle…", "Et toi ?", "Vous avez quel âge ?", "Je suis vietnamien(ne)."] },
      { notes: ["u1-b"], title: "Nationalité d'une personnalité", task: "Présentez un acteur, chanteur ou sportif célèbre : son nom, sa nationalité, sa profession. Votre partenaire vous pose des questions.", usefulPhrases: ["Il s'appelle…", "Elle est américaine.", "Il est chanteur."] },
      { notes: ["u1-f", "u1-e"], title: "Questionnaire d'identité", task: "Interviewez votre partenaire : posez des questions sur son nom, son âge, sa nationalité, sa ville.", usefulPhrases: ["Comment tu t'appelles ?", "Tu as quel âge ?", "Tu habites où ?"] },
    ],
    writingPractice: [
      { title: "Profil personnel", task: "Complétez ou écrivez une courte fiche avec nom, prénom, âge, nationalité, ville, goûts." },
      { title: "Présentation d'un artiste", task: "Préparez un texte court pour présenter un(e) artiste francophone." },
    ],
  },
  {
    id: "unite-2", unit: 2, title: "Près de moi",
    speakingPractice: [
      { notes: ["u2-a"], title: "Parler de son quartier", task: "Présentez votre ville, votre quartier ou votre logement.", usefulPhrases: ["J'habite à…", "Mon quartier est calme.", "Il y a un parc.", "C'est près du centre."] },
      { notes: ["u2-b"], title: "Exprimer ses goûts", task: "Dites ce que vous aimez et ce que vous détestez.", usefulPhrases: ["J'aime…", "J'adore…", "Je déteste…", "Je n'aime pas…"] },
      { notes: ["u2-d", "u2-e"], title: "Présenter sa famille", task: "Présentez les membres de votre famille : qui, âge, profession. Votre partenaire vous pose des questions.", usefulPhrases: ["J'ai un frère.", "Ma mère s'appelle…", "Il a … ans."] },
    ],
    writingPractice: [
      { title: "Portrait collectif", task: "Écrivez un court portrait de votre groupe : prénoms, villes, goûts, professions." },
      { title: "Famille", task: "Écrivez une courte présentation de votre famille." },
    ],
  },
  {
    id: "unite-3", unit: 3, title: "Qu'est-ce qu'on mange ?",
    speakingPractice: [
      { notes: ["u3-b"], title: "Acheter dans une épicerie", task: "Achetez des produits et demandez le prix.", usefulPhrases: ["Je voudrais…", "Ce sera tout ?", "Vous payez comment ?", "Combien ça coûte ?"] },
      { notes: ["u3-f"], title: "Parler des commerces", task: "Dites quels commerces il y a dans votre quartier.", usefulPhrases: ["Il y a une boulangerie.", "À côté, il y a une pharmacie.", "Je fais mes courses au marché.", "Il n'y a pas de supermarché."] },
      { notes: ["u3-g", "u3-e"], title: "Commander au restaurant", task: "Posez des questions sur la carte et commandez.", usefulPhrases: ["Je voudrais…", "Pour moi…", "Une carafe d'eau, s'il vous plaît."] },
    ],
    writingPractice: [
      { title: "Pique-nique", task: "Écrivez un mail à vos ami(e)s pour organiser les achats." },
      { title: "Courses", task: "Écrivez où vous faites vos courses et quels produits vous achetez." },
      { title: "Plat préféré", task: "Présentez votre plat préféré et ses ingrédients." },
    ],
  },
  {
    id: "unite-4", unit: 4, title: "C'est où ?",
    speakingPractice: [
      { notes: ["u4-b"], title: "Présenter son quartier", task: "Présentez votre quartier à un(e) ami(e).", usefulPhrases: ["Voilà mon quartier.", "Ici, c'est…", "Il y a…", "Ce n'est pas loin."] },
      { notes: ["u4-c", "u4-e"], title: "Enquête sur les lieux", task: "Dites où vous allez souvent et où vous n'allez jamais.", usefulPhrases: ["Je vais souvent au parc.", "Je ne vais jamais à la piscine.", "Tous les jours, je vais au travail.", "Le week-end, je vais au marché."] },
      { notes: ["u4-f"], title: "Demander le chemin", task: "Demandez et indiquez un itinéraire dans la ville.", usefulPhrases: ["Pardon, où est la poste ?", "C'est tout droit.", "Tournez à gauche.", "C'est en face de la banque."] },
    ],
    writingPractice: [
      { title: "Blog ville/quartier", task: "Présentez votre ville et votre quartier en 30 à 40 mots." },
      { title: "Post réseau social", task: "Écrivez un post de réseau social sur un festival : décrivez le festival et dites pourquoi vous l'aimez." },
      { title: "Audioguide", task: "Écrivez un court texte d'audioguide pour un lieu de votre ville." },
    ],
  },
  {
    id: "unite-5", unit: 5, title: "C'est tendance !",
    speakingPractice: [
      { notes: ["u5-b", "u5-a"], title: "Dans un magasin", task: "Demandez une taille ou une pointure et donnez votre avis sur un vêtement.", usefulPhrases: ["Vous avez cette robe en 38 ?", "Je fais du 40.", "C'est trop petit.", "Ça me va."] },
      { notes: ["u5-c"], title: "Parler de la météo", task: "Présentez la météo d'aujourd'hui ou de demain.", usefulPhrases: ["Aujourd'hui, il fait beau.", "Il pleut.", "Demain, il va faire froid.", "Il y a du soleil."] },
      { notes: ["u5-g", "u5-f"], title: "Décrire un objet", task: "Décrivez un objet : forme, taille, poids, utilité.", usefulPhrases: ["C'est petit et rond.", "C'est en plastique.", "Ça sert à écrire.", "C'est léger."] },
    ],
    writingPractice: [
      { title: "Journal en ligne", task: "Créez un court article sur la mode, le recyclage ou une tendance." },
      { title: "Annonce produit", task: "Écrivez une petite annonce pour vendre ou présenter un objet." },
      { title: "Message shopping", task: "Écrivez un message pour demander un avis sur un vêtement." },
    ],
  },
  {
    id: "unite-6", unit: 6, title: "Qu'est-ce qu'on fait aujourd'hui ?",
    speakingPractice: [
      { notes: ["u6-b"], title: "Routine quotidienne", task: "Présentez votre journée habituelle.", usefulPhrases: ["Je me lève à sept heures.", "Le matin, je travaille.", "Je déjeune à midi.", "Le soir, je regarde la télé."] },
      { notes: ["u6-c"], title: "Proposer une sortie", task: "Proposez une sortie ; votre ami(e) accepte ou refuse.", usefulPhrases: ["On va au cinéma ?", "Tu veux venir ?", "D'accord !", "Désolé(e), je ne peux pas."] },
      { notes: ["u6-f", "u6-e"], title: "Décrire une personne", task: "Décrivez une célébrité sans dire son nom ; votre partenaire devine qui c'est.", usefulPhrases: ["Il est grand.", "Elle a les cheveux longs.", "Il est acteur.", "C'est… ?"] },
    ],
    writingPractice: [
      { title: "Production écrite", task: "Écrivez un message pour proposer, accepter ou refuser une sortie." },
      { title: "Affiche d'une célébrité", task: "Écrivez le texte d'une affiche sur une célébrité : description physique, caractère et activités." },
      { title: "Agenda", task: "Écrivez votre programme de la journée avec les heures." },
    ],
  },
  {
    id: "unite-7", unit: 7, title: "Chez moi !",
    speakingPractice: [
      { notes: ["u7-a", "u7-c"], title: "Décrire son logement", task: "Présentez votre logement, les pièces et les meubles.", usefulPhrases: ["J'habite dans un appartement.", "Il y a deux chambres.", "Dans le salon, il y a un canapé.", "La cuisine est petite."] },
      { notes: ["u7-f"], title: "Règles de colocation", task: "Expliquez les règles de vie commune.", usefulPhrases: ["Il faut ranger la cuisine.", "On ne fume pas.", "Chacun fait le ménage.", "Il est interdit de faire du bruit."] },
      { notes: ["u7-g"], title: "Problème domestique", task: "Expliquez un problème et demandez une solution.", usefulPhrases: ["Le chauffage ne marche pas.", "Il y a une fuite d'eau.", "Vous pouvez réparer ?", "C'est urgent."] },
    ],
    writingPractice: [
      { title: "Annonce logement", task: "Écrivez une annonce pour louer ou partager un logement." },
      { title: "Message d'excuse", task: "Écrivez un message à un voisin pour vous excuser." },
      { title: "Demande de réparation", task: "Écrivez un message pour signaler un problème domestique." },
    ],
  },
  {
    id: "unite-8", unit: 8, title: "En forme !",
    speakingPractice: [
      { notes: ["u8-b", "u8-c"], title: "Chez le médecin", task: "Expliquez vos symptômes et répondez aux questions du médecin.", usefulPhrases: ["J'ai mal à la tête.", "J'ai de la fièvre.", "Je suis fatigué(e).", "Depuis deux jours."] },
      { notes: ["u8-c"], title: "Sport et santé", task: "Parlez de vos habitudes sportives et alimentaires.", usefulPhrases: ["Je fais du sport deux fois par semaine.", "Je mange des légumes.", "Je bois beaucoup d'eau.", "Je ne fume pas."] },
      { notes: ["u8-f"], title: "Donner un conseil", task: "Donnez des conseils à une personne fatiguée ou malade.", usefulPhrases: ["Repose-toi bien.", "Bois de l'eau.", "Il faut dormir.", "Ne mange pas trop de sucre."] },
    ],
    writingPractice: [
      { title: "Programme sport et bien-être", task: "Créez un programme simple avec activités, conseils et interdictions." },
      { title: "Message santé", task: "Écrivez un message pour expliquer pourquoi vous ne pouvez pas venir." },
      { title: "Production écrite", task: "Rédigez quelques conseils pour être en forme." },
    ],
  },
  {
    id: "unite-9", unit: 9, title: "Bonnes vacances !",
    speakingPractice: [
      { notes: ["u9-b"], title: "Réserver un hôtel", task: "Appelez un hôtel et réservez une chambre.", usefulPhrases: ["Je voudrais réserver une chambre.", "Pour deux nuits.", "C'est combien ?"] },
      { notes: ["u9-c", "u9-e"], title: "Décrire une destination", task: "Présentez une ville, un pays ou un paysage de vacances.", usefulPhrases: ["C'est une belle ville.", "Il y a la mer.", "Le paysage est magnifique.", "On peut visiter des musées."] },
      { notes: ["u9-f"], title: "Préférences", task: "Comparez deux destinations et dites laquelle vous préférez.", usefulPhrases: ["Je préfère la montagne.", "La plage est plus reposante.", "Paris est plus grand que Nice.", "J'aime mieux la campagne."] },
    ],
    writingPractice: [
      { title: "Carte postale", task: "Écrivez une carte postale de vacances." },
      { title: "Brochure touristique", task: "Écrivez le texte d'une brochure touristique : lieux à visiter, activités et conseils." },
      { title: "Avis de voyage", task: "Écrivez un court avis sur une destination." },
    ],
  },
  {
    id: "unite-10", unit: 10, title: "Au travail !",
    speakingPractice: [
      { notes: ["u10-b"], title: "Présenter son université", task: "Présentez votre centre de langue, école ou université.", usefulPhrases: ["J'étudie à l'université.", "Mon école est à Hanoi.", "J'apprends le français.", "Les cours sont intéressants."] },
      { notes: ["u10-c"], title: "Compétences", task: "Dites ce que vous savez faire et ce que vous voulez apprendre.", usefulPhrases: ["Je sais parler anglais.", "Je sais utiliser un ordinateur.", "Je voudrais apprendre l'espagnol.", "Je veux travailler à l'étranger."] },
      { notes: ["u10-c", "u10-e"], title: "Projet professionnel", task: "Présentez votre métier idéal ou votre projet professionnel.", usefulPhrases: ["Je voudrais être médecin.", "Je veux travailler dans le tourisme.", "Mon métier idéal, c'est professeur.", "Plus tard, je vais créer mon entreprise."] },
    ],
    writingPractice: [
      { title: "Profil étudiant", task: "Écrivez une courte présentation de vos études et compétences." },
      { title: "Projet professionnel", task: "Écrivez ce que vous voulez faire plus tard." },
      { title: "Centre de langue", task: "Préparez le texte d'une vidéo pour présenter votre centre de langue." },
    ],
  },
];
