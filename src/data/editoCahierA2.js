/**
 * editoCahierA2.js — Exercices du Cahier d'activités, Édito A2 2e édition.
 *
 * Source: materials/A2/EDITO A2/Edito A2 by Unite md/cahier_unite_1.md
 * Answers come from the cahier's own Corrigés (p. 155) — not generated, so a
 * self-learner can trust them. This is what the grammar step was missing:
 * theory with no way to check yourself.
 *
 * Audio exercises carry `audioSrc`; the cahier tracks are hosted next to the
 * livre ones and their printed piste number matches the filename directly.
 * A handful of cahier exercises depend on photographs rather than sound
 * (p.4 act.4, p.6 act.1, p.11 act.4) — those stay in the .md only. Where the
 * DELF listening uses pictures as answer options, the option is written out.
 *
 * Exercise types:
 *   fill      — type the missing word;  `bank` = words to pick from
 *   choice    — pick one of `options`
 *   order     — put `tokens` back into a sentence
 *   match     — pair each `pairs[].l` with its `pairs[].r`
 *   truefalse — answer is a boolean
 *   transform — rewrite the sentence (checked leniently, see normalize())
 *
 * `example` marks the item the book already solves as a worked example; it is
 * shown filled in and not scored.
 */

const AUDIO_BASE = "https://bameomap.github.io/francais-vivi";
const piste = (n) => `${AUDIO_BASE}/${String(n).padStart(3, "0")}_Edito_A2_Cahier.mp3`;

export const CAHIER_A2 = {
  b1: {

    // ── Grammaire, keyed by the grammar point index in editoGrammarA2.js ──
    grammar: {

      // p0 — Le passé composé (cahier p. 3)
      p0: [
        {
          num: 1, page: 3, audioSrc: piste(1),
          instruction: "Écoutez et dites si vous entendez le passé composé.",
          vi: "Nghe từng câu và cho biết câu đó có dùng passé composé không.",
          type: "truefalse",
          items: [
            { q: "a. Tu as préparé toutes tes affaires.", answer: false },
            { q: "b. Hier vous avez vu un film.", answer: true },
            { q: "c. Dans un bar, debout, j'ai bu un cocktail de fruits.", answer: true },
            { q: "d. Il a lu à son fils l'histoire du loup.", answer: true },
            { q: "e. Sa moto à trois roues est dans la rue.", answer: true },
            { q: "f. Elle a su gérer son stress.", answer: false },
          ],
        },
        {
          num: 2, page: 3,
          instruction: "Complétez les phrases avec l'auxiliaire être ou avoir.",
          vi: "Điền trợ động từ être hoặc avoir.",
          type: "fill",
          items: [
            { q: "Virginie ___ rencontré son conjoint à l'étranger.", answer: "a", example: true },
            { q: "Jamel Debbouze s'___ marié en 2008.", answer: "est" },
            { q: "Leïla Bekhti et Tahar Rahim ___ eu trois enfants.", answer: "ont" },
            { q: "Nous ___ écouté le nouvel album de Stromae.", answer: "avons" },
            { q: "Vous ___ allés au concert de Gaël Faye ?", answer: "êtes" },
            { q: "Tu ___ déjà rencontré une célébrité ?", answer: "as" },
          ],
        },
        {
          num: 3, page: 3,
          instruction: "Écrivez les participes passés des verbes.",
          vi: "Viết quá khứ phân từ của các động từ.",
          type: "fill",
          items: [
            { q: "venir", answer: "venu", example: true },
            { q: "dire", answer: "dit" },
            { q: "être", answer: "été" },
            { q: "recevoir", answer: "reçu" },
            { q: "devoir", answer: "dû" },
            { q: "vivre", answer: "vécu" },
          ],
        },
        {
          num: 4, page: 3,
          instruction: "Choisissez la forme correcte.",
          vi: "Chọn dạng đúng — chú ý hợp giống–số của quá khứ phân từ.",
          type: "choice",
          items: [
            { q: "Ma meilleure amie est ___ en Erasmus l'an dernier.", options: ["parti", "partie"], answer: "partie", example: true },
            { q: "Mes parents se sont ___ à Venise.", options: ["rencontré", "rencontrés"], answer: "rencontrés" },
            { q: "Ma conjointe a ___ ses études.", options: ["fini", "finie"], answer: "fini" },
            { q: "Ma grand-mère est ___ l'an dernier.", options: ["mort", "morte"], answer: "morte" },
            { q: "La chanteuse Angèle est ___ très populaire.", options: ["devenu", "devenue"], answer: "devenue" },
            { q: "Mes sœurs sont ___ dimanche.", options: ["arrivé", "arrivées"], answer: "arrivées" },
          ],
        },
        {
          num: 5, page: 3,
          instruction: "Conjuguez les verbes entre parenthèses au passé composé.",
          vi: "Chia động từ trong ngoặc ở passé composé — đoạn văn về Juliette Armanet.",
          type: "fill",
          items: [
            { q: "Elle (naître) ___ le 4 mars 1984 à Lille.", answer: "est née", example: true },
            { q: "Elle (grandir) ___ en région parisienne.", answer: "a grandi" },
            { q: "Après ses études, elle (devenir) ___ journaliste.", answer: "est devenue" },
            { q: "Elle (travailler) ___ pour la radio et la télévision.", answer: "a travaillé" },
            { q: "Puis elle (décider) ___ de changer de profession.", answer: "a décidé" },
            { q: "Son premier album (sortir) ___ en 2017.", answer: "est sorti" },
            { q: "Les deux albums (avoir) ___ beaucoup de succès.", answer: "ont eu" },
          ],
        },
      ],

      // p1 — La phrase négative (cahier p. 5)
      p1: [
        {
          num: 1, page: 5,
          instruction: "Remettez les éléments dans l'ordre pour former des phrases à la forme négative.",
          vi: "Sắp xếp lại các thành phần thành câu phủ định.",
          type: "order",
          items: [
            { tokens: ["fait", "jamais", "Mick", "ne", "de", "judo."], answer: "Mick ne fait jamais de judo." },
            { tokens: ["le", "match", "ne", "regarde", "à", "télé.", "la", "Personne"], answer: "Personne ne regarde le match à la télé." },
            { tokens: ["aux", "vidéo.", "Je", "joue", "ne", "pas", "jeux"], answer: "Je ne joue pas aux jeux vidéo." },
            { tokens: ["Nous", "mangeons", "rien.", "ne"], answer: "Nous ne mangeons rien." },
            { tokens: ["randonnée.", "ne", "Personne", "fait", "de"], answer: "Personne ne fait de randonnée." },
            { tokens: ["jamais", "moi.", "Romain", "danse", "avec", "ne"], answer: "Romain ne danse jamais avec moi." },
          ],
        },
        {
          num: 2, page: 5,
          instruction: "Complétez les phrases avec rien, personne, jamais, plus.",
          vi: "Điền rien / personne / jamais / plus.",
          type: "fill",
          bank: ["rien", "personne", "jamais", "plus"],
          items: [
            { q: "– Il y a quelqu'un ? – Non, il n'y a ___.", answer: "personne", example: true },
            { q: "– Tu fais quoi demain soir ? – Je ne fais ___, j'ai envie de me reposer.", answer: "rien" },
            { q: "– Damien habite toujours à Cannes ? – Non, il n'habite ___ à Cannes.", answer: "plus" },
            { q: "– Tu regardes des séries parfois ? – Non, je ne regarde ___ de séries.", answer: "jamais" },
            { q: "– Tu as rencontré quelqu'un au concert ? – Non, je n'ai rencontré ___.", answer: "personne" },
            { q: "– Tu fais encore de l'escalade ? – Non, je ne fais ___ de sport.", answer: "plus" },
          ],
        },
        {
          num: 3, page: 5,
          instruction: "Transformez les phrases au passé composé.",
          vi: "Chuyển câu sang passé composé — chú ý vị trí của phủ định.",
          type: "transform",
          items: [
            { q: "Il ne va jamais au cirque.", answer: "Il n'est jamais allé au cirque.", example: true },
            { q: "Je ne vois personne.", answer: "Je n'ai vu personne." },
            { q: "Vous ne mangez rien ?", answer: "Vous n'avez rien mangé ?" },
            { q: "Elle ne fait plus de vélo.", answer: "Elle n'a plus fait de vélo." },
            { q: "Tu ne joues jamais au foot ?", answer: "Tu n'as jamais joué au foot ?" },
            { q: "Nous n'avons rien à faire.", answer: "Nous n'avons rien eu à faire." },
          ],
        },
        {
          num: 4, page: 5, audioSrc: piste(3),
          instruction: "Écoutez et répondez aux questions avec la négation proposée.",
          vi: "Nghe câu hỏi rồi trả lời bằng từ phủ định cho sẵn trong ngoặc.",
          type: "transform",
          items: [
            { q: "(jamais)", answer: "Non, je ne fais jamais de jardinage.", example: true },
            { q: "(personne)", answer: "Je ne vais au concert avec personne." },
            { q: "(rien)", answer: "Je n'ai rien dit." },
            { q: "(plus)", answer: "Non, je n'ai plus d'argent." },
            { q: "(personne)", answer: "Non, personne ne parle italien ici." },
            { q: "(jamais)", answer: "Non, je n'ai jamais vu ce spectacle." },
          ],
        },
      ],

      // p2 — Les indicateurs de temps (cahier p. 7)
      p2: [
        {
          num: 1, page: 7,
          instruction: "Complétez avec il y a et depuis.",
          vi: "Điền il y a hoặc depuis.",
          type: "fill",
          bank: ["il y a", "depuis"],
          items: [
            { q: "Jérôme s'est marié ___ deux ans.", answer: "il y a", example: true },
            { q: "Juliette et Miro sont en couple ___ six mois.", answer: "depuis" },
            { q: "Manu a commencé à travailler dans cette entreprise ___ dix ans.", answer: "il y a" },
            { q: "Nous faisons de la randonnée ensemble ___ longtemps.", answer: "depuis" },
            { q: "La nouvelle chanson d'Angèle est sortie ___ une semaine.", answer: "il y a" },
            { q: "Adeline fait du paddle ___ une heure.", answer: "depuis" },
          ],
        },
        {
          num: 2, page: 7,
          instruction: "Entourez la bonne réponse.",
          vi: "Chọn đáp án đúng.",
          type: "choice",
          items: [
            { q: "Bertille a commencé à chanter ___ trois ans.", options: ["depuis", "il y a", "pendant"], answer: "il y a", example: true },
            { q: "Karim ne fait plus de vélo ___ janvier.", options: ["depuis", "il y a", "pendant"], answer: "depuis" },
            { q: "Hier, Maryse a fait de l'escalade ___ quatre heures.", options: ["depuis", "il y a", "pendant"], answer: "pendant" },
            { q: "Je suis allée au Cirque d'hiver Bouglione ___ un an.", options: ["depuis", "il y a", "pendant"], answer: "il y a" },
            { q: "Tu fais de la compétition ___ longtemps ?", options: ["depuis", "il y a", "pendant"], answer: "depuis" },
            { q: "Je vais au Festival de Cannes chaque année, ___ huit ans.", options: ["depuis", "il y a", "pendant"], answer: "depuis" },
            { q: "Mes parents aiment faire des activités en plein air ___ leurs vacances d'été.", options: ["depuis", "il y a", "pendant"], answer: "pendant" },
          ],
        },
        {
          num: 3, page: 7,
          instruction: "Complétez les phrases avec depuis, il y a, pendant. (Pierre Niney)",
          vi: "Điền depuis / il y a / pendant — đoạn về diễn viên Pierre Niney.",
          type: "fill",
          bank: ["depuis", "il y a", "pendant"],
          items: [
            { q: "Il est comédien ___ l'âge de 11 ans.", answer: "depuis", example: true },
            { q: "Il a fait des études de théâtre ___ plusieurs années.", answer: "pendant" },
            { q: "Il est en couple avec Natasha Andrews ___ huit ans.", answer: "depuis" },
            { q: "Il a été comédien à la Comédie-Française ___ cinq ans, de 2010 à 2015.", answer: "pendant" },
            { q: "Il est célèbre surtout ___ 2015.", answer: "depuis" },
            { q: "La série La Flamme est sortie ___ deux ans.", answer: "il y a" },
          ],
        },
        {
          num: 4, page: 7, audioSrc: piste(5),
          instruction: "Écoutez et complétez les phrases avec pendant, depuis et il y a.",
          vi: "Nghe rồi điền pendant / depuis / il y a.",
          type: "fill",
          bank: ["pendant", "depuis", "il y a"],
          items: [
            { q: "J'ai joué au foot ___ deux heures.", answer: "pendant", example: true },
            { q: "Nous sommes allées au Festival de Vercors ___ deux ans.", answer: "il y a" },
            { q: "Je ne fais plus de compétition ___ un an.", answer: "depuis" },
            { q: "Annabelle est restée à Berlin ___ cinq mois.", answer: "pendant" },
            { q: "Je travaille ici ___ dix jours.", answer: "depuis" },
            { q: "J'ai rencontré mon meilleur ami ___ 22 ans.", answer: "il y a" },
          ],
        },
      ],
    },

    // ── Phonie-graphie (cahier p. 8) — wired into the Phono step ─────
    phono: [
      {
        num: 1, page: 8, audioSrc: piste(6),
        instruction: "Discrimination — écoutez et dites dans quel ordre vous entendez les sons [y] et [u].",
        vi: "Nghe và cho biết thứ tự hai âm: [y] (như « tu ») trước hay [u] (như « coucou ») trước?",
        type: "choice",
        items: [
          { q: "a. Tu as préparé toutes tes affaires.", options: ["[y] avant [u]", "[u] avant [y]"], answer: "[y] avant [u]", example: true },
          { q: "b. Hier vous avez vu un film.", options: ["[y] avant [u]", "[u] avant [y]"], answer: "[u] avant [y]" },
          { q: "c. Dans un bar, debout, j'ai bu un cocktail.", options: ["[y] avant [u]", "[u] avant [y]"], answer: "[u] avant [y]" },
          { q: "d. Il a lu à son fils l'histoire du loup.", options: ["[y] avant [u]", "[u] avant [y]"], answer: "[y] avant [u]" },
          { q: "e. Sa moto à trois roues est dans la rue.", options: ["[y] avant [u]", "[u] avant [y]"], answer: "[u] avant [y]" },
          { q: "f. Elle a su gérer son stress et ne pas être sous pression.", options: ["[y] avant [u]", "[u] avant [y]"], answer: "[y] avant [u]" },
        ],
      },
      {
        num: 3, page: 8, audioSrc: piste(8),
        instruction: "Dictée — écoutez le texte et complétez les mots.",
        vi: "Nghe và điền các từ còn thiếu. Toàn bộ đều là âm [y] hoặc [u].",
        type: "fill",
        items: [
          { q: "Sal___ Jules,", answer: "ut", example: true },
          { q: "au mois d'a___t,", answer: "oû" },
          { q: "n___s avons d___ annuler nos vacances. (2 từ, cách nhau bởi dấu cách)", answer: "ou û" },
          { q: "N___s avons ___ un gros problème. (2 từ)", answer: "ou eu" },
          { q: "Et toi, tu pars ___ p___r les vacances ? (2 từ)", answer: "où ou" },
        ],
      },
    ],

    // ── Vocabulaire, keyed by the cycle's vocab step ──────────────────
    vocab: {
      // Cycle 1 — Parcours de vie (cahier p. 4)
      c1_vocab: [
        {
          num: 1, page: 4,
          instruction: "Associez les débuts et les fins de phrases.",
          vi: "Nối nghề nghiệp với công việc tương ứng.",
          type: "match",
          pairs: [
            { l: "Un acteur",      r: "joue dans un film." },
            { l: "Un scénariste",  r: "écrit l'histoire d'un film." },
            { l: "Un chanteur",    r: "chante des chansons." },
            { l: "Un compositeur", r: "compose de la musique." },
            { l: "Une écrivaine",  r: "écrit des livres." },
          ],
        },
        {
          num: 2, page: 4,
          instruction: "Complétez les phrases avec les éléments proposés.",
          vi: "Điền từ cho sẵn vào chỗ trống.",
          type: "fill",
          bank: ["célibataire", "déménager", "faire connaissance", "coup de foudre", "se faire des amis", "rencontre"],
          items: [
            { q: "Dom a tout de suite aimé Laurence, il a eu un ___.", answer: "coup de foudre", example: true },
            { q: "Je cherche un travail dans le sud de la France, je voudrais ___.", answer: "déménager" },
            { q: "Ce n'est pas toujours facile de ___ quand on arrive dans une nouvelle ville.", answer: "se faire des amis" },
            { q: "Papi, tu nous racontes ta ___ avec mamie ?", answer: "rencontre" },
            { q: "La vie en couple ? Non, ce n'est pas pour moi, je préfère rester ___.", answer: "célibataire" },
            { q: "Je ne connais pas encore les parents de mon copain mais je vais ___ avec eux le week-end prochain.", answer: "faire connaissance" },
          ],
        },
        {
          num: 3, page: 4,
          instruction: "Remettez l'histoire de Lise et Luc dans l'ordre.",
          vi: "Sắp xếp câu chuyện của Lise và Luc theo đúng thứ tự.",
          type: "order",
          sentences: true,
          items: [
            {
              tokens: [
                "Ils se sont mariés et ils ont décidé d'avoir un enfant.",
                "Ils sont tombés amoureux.",
                "Lise et Luc se sont rencontrés pendant leur séjour Erasmus à Barcelone.",
                "Ils se sont séparés 20 ans après leur rencontre.",
                "Ils ont décidé de s'installer ensemble.",
                "Leur enfant est né.",
              ],
              answer: [
                "Lise et Luc se sont rencontrés pendant leur séjour Erasmus à Barcelone.",
                "Ils sont tombés amoureux.",
                "Ils ont décidé de s'installer ensemble.",
                "Ils se sont mariés et ils ont décidé d'avoir un enfant.",
                "Leur enfant est né.",
                "Ils se sont séparés 20 ans après leur rencontre.",
              ],
            },
          ],
        },
      ],

      // Cycle 2 — Les loisirs (cahier p. 6)
      c2_vocab: [
        {
          num: 2, page: 6,
          instruction: "Entourez la bonne réponse.",
          vi: "Chọn từ đúng.",
          type: "choice",
          items: [
            { q: "Ce week-end, je vais faire ___ à la montagne.", options: ["une randonnée", "du bricolage"], answer: "une randonnée", example: true },
            { q: "On va au ___ ? Il y a un film intéressant.", options: ["cinéma", "musée"], answer: "cinéma" },
            { q: "C'est un sportif professionnel, il a fait beaucoup de ___.", options: ["compétitions", "spectacles"], answer: "compétitions" },
            { q: "J'adore le ___ de Fontainebleau, c'est vraiment un beau monument.", options: ["château", "concert"], answer: "château" },
            { q: "Maman, je peux aller dans ma chambre faire de ___ ?", options: ["l'escalade", "la peinture"], answer: "la peinture" },
            { q: "Dominique aime beaucoup les activités en plein air, surtout le ___.", options: ["judo", "vélo"], answer: "vélo" },
          ],
        },
        {
          num: 3, page: 6,
          instruction: "Complétez le texte « Bienvenue à Rennes ! » avec les mots proposés.",
          vi: "Điền từ vào bài giới thiệu thành phố Rennes.",
          type: "fill",
          bank: ["musées", "sports nautiques", "amateurs et amatrices", "promenades", "visites guidées", "monuments"],
          items: [
            { q: "Vous aimez les ___ ? Venez visiter l'exposition Celtique au musée de Bretagne.", answer: "musées", example: true },
            { q: "Envie de nature ? En famille ou en amoureux, faites de jolies ___ dans les bois de Rennes !", answer: "promenades" },
            { q: "Vous aimez les ___ ? Louez un paddle ou un kayak sur le quai Saint Cyr.", answer: "sports nautiques" },
            { q: "Vous voulez découvrir le centre historique ? L'office de tourisme organise des ___.", answer: "visites guidées" },
            { q: "Pour les ___ de jeux vidéo, le Stunfest festival est là pour vous !", answer: "amateurs et amatrices" },
            { q: "Vous pouvez aussi sortir de Rennes et aller visiter d'autres ___.", answer: "monuments" },
          ],
        },
      ],
    },

    // ── Bilan linguistique (cahier p. 10-11, noté /40) ──────────────
    // Wired into the "L'essentiel" step, alongside the AI-generated quiz.
    bilan: [
      {
        num: 1, page: 10,
        instruction: "Transformez les phrases au passé composé. (/7)",
        vi: "Chuyển sang passé composé — chú ý hợp giống–số.",
        type: "transform",
        items: [
          { q: "Marc déménage à Paris.", answer: "Marc a déménagé à Paris." },
          { q: "Lana a un enfant.", answer: "Lana a eu un enfant." },
          { q: "Cathy tombe amoureuse.", answer: "Cathy est tombée amoureuse." },
          { q: "Vincent et Ève se marient !", answer: "Vincent et Ève se sont mariés !" },
          { q: "Ma conjointe va à un spectacle.", answer: "Ma conjointe est allée à un spectacle." },
          { q: "Mon frère finit son stage.", answer: "Mon frère a fini son stage." },
          { q: "Cédric et Anouk décident d'avoir un enfant.", answer: "Cédric et Anouk ont décidé d'avoir un enfant." },
        ],
      },
      {
        num: 2, page: 10,
        instruction: "Dites le contraire. Utilisez rien, personne, jamais ou plus. (/7)",
        vi: "Viết câu trái nghĩa bằng phủ định.",
        type: "transform",
        items: [
          { q: "Je vois tout.", answer: "Je ne vois rien." },
          { q: "Vous connaissez tout le monde ici.", answer: "Vous ne connaissez personne ici." },
          { q: "Je fais encore de la compétition.", answer: "Je ne fais plus de compétition." },
          { q: "Tu as toujours été en retard.", answer: "Tu n'as jamais été en retard." },
          { q: "Quelqu'un a parlé de notre stage.", answer: "Personne n'a parlé de notre stage." },
          { q: "Tout a été simple avec toi.", answer: "Rien n'a été simple avec toi." },
          { q: "J'ai déjà fait cette balade.", answer: "Je n'ai jamais fait cette balade." },
        ],
      },
      {
        num: 3, page: 10,
        instruction: "Complétez les phrases avec il y a, pendant, depuis. (/6)",
        vi: "Điền il y a / pendant / depuis.",
        type: "fill",
        bank: ["il y a", "pendant", "depuis"],
        items: [
          { q: "Mon mari fait de l'escalade ___ 15 ans.", answer: "depuis" },
          { q: "J'ai fait du kayak pour la première fois ___ six mois.", answer: "il y a" },
          { q: "Hier, nous avons fait une promenade ___ deux heures.", answer: "pendant" },
          { q: "J'ai vu ce musicien en concert ___ cinq ans.", answer: "il y a" },
          { q: "Ali et moi, nous sommes mariés ___ septembre 2009.", answer: "depuis" },
          { q: "J'ai travaillé dans cette entreprise ___ trois ans.", answer: "il y a" },
        ],
      },
      {
        num: 4, page: 11,
        instruction: "Vocabulaire — Choisissez la réponse correcte. (/5)",
        vi: "Chọn từ đúng.",
        type: "choice",
        items: [
          { q: "Ma sœur n'est pas mariée mais elle vit en couple, ___ est musicien.", options: ["son mari", "son conjoint"], answer: "son conjoint" },
          { q: "J'ai fini mes études et maintenant je ___.", options: ["fais un séjour Erasmus", "cherche du travail"], answer: "cherche du travail" },
          { q: "Mon conjoint est ___, il écrit des livres pour enfants.", options: ["écrivain", "chanteur"], answer: "écrivain" },
          { q: "Ma meilleure amie est ___, elle joue dans une pièce de théâtre.", options: ["actrice", "trader"], answer: "actrice" },
          { q: "Mathieu et Mathilde se sont mariés et ils ont eu un ___.", options: ["enfant", "coup de foudre"], answer: "enfant" },
        ],
      },
      {
        num: 5, page: 11,
        instruction: "Associez les phrases qui ont le même sens. (/5)",
        vi: "Nối hai câu cùng nghĩa.",
        type: "match",
        pairs: [
          { l: "Ils sont mariés.",                      r: "Ils sont mari et femme." },
          { l: "Ils déménagent.",                       r: "Ils s'installent dans un autre lieu." },
          { l: "Ils sont tombés amoureux tout de suite.", r: "Ils ont eu un coup de foudre." },
          { l: "Ils se sont rencontrés.",               r: "Ils ont fait connaissance." },
          { l: "Ils ont des enfants.",                  r: "Ils ont une vie de famille." },
        ],
      },
      {
        num: 6, page: 11,
        instruction: "Répondez par vrai ou faux. (/5)",
        vi: "Đúng hay sai?",
        type: "truefalse",
        items: [
          { q: "Le château est un monument.", answer: true },
          { q: "Le vélo est un sport aquatique.", answer: false },
          { q: "On va voir une exposition dans un musée.", answer: true },
          { q: "On fait de l'escalade dans un théâtre.", answer: false },
          { q: "Le bricolage est une activité en plein air.", answer: false },
        ],
      },
      {
        num: 7, page: 9, audioSrc: piste(10),
        instruction: "Compréhension orale — Rencontre avec Abd Al Malik.",
        vi: "Nghe bài phỏng vấn rapper Abd Al Malik rồi trả lời.",
        type: "truefalse",
        items: [
          { q: "« Le modèle noir » est le nom d'un tableau.", answer: false },
          { q: "Le rappeur Abd Al Malik présente son spectacle au musée d'Orsay.", answer: true },
        ],
      },
      {
        num: 8, page: 9, audioSrc: piste(10),
        instruction: "Compréhension orale — cochez les bonnes réponses.",
        vi: "Vẫn bài nghe trên — chọn đáp án đúng.",
        type: "choice",
        items: [
          { q: "Abd Al Malik raconte :", options: ["la rencontre d'un jeune homme avec un Français", "le parcours d'un jeune homme"], answer: "le parcours d'un jeune homme" },
          { q: "Le jeune homme se pose des questions sur :", options: ["son travail", "lui et son identité"], answer: "lui et son identité" },
          { q: "Où est né le jeune homme ?", options: ["En France.", "Au Congo."], answer: "En France." },
        ],
      },
      {
        num: 9, page: 14,
        instruction: "Jeux — Barrez l'intrus.",
        vi: "Tìm từ lạc loài trong mỗi nhóm.",
        type: "choice",
        items: [
          { q: "a.", options: ["le scénariste", "le compositeur", "l'interprète", "la conjointe"], answer: "la conjointe" },
          { q: "b.", options: ["faire un stage", "partir en Erasmus", "s'installer", "obtenir un diplôme"], answer: "s'installer" },
          { q: "c.", options: ["se marier", "avoir un enfant", "avoir un coup de foudre", "grandir"], answer: "grandir" },
          { q: "d.", options: ["le cirque", "la peinture", "le cinéma", "le château"], answer: "la peinture" },
          { q: "e.", options: ["le paddle", "une exposition", "le musée", "une visite guidée"], answer: "le paddle" },
          { q: "f.", options: ["faire du vélo", "faire une balade", "regarder une série", "jouer au foot"], answer: "regarder une série" },
        ],
      },
    ],

    // ── DELF A2 blanc (cahier p. 12-14) ────────────────────────────
    delf: {
      // The livre's own DELF prep listening (p.26). The book prints three of
      // its six answer sets as photographs; those options are written out from
      // the official transcript, where the answer is unambiguous. The audio
      // lives with the livre tracks, not the cahier ones.
      coLivre: [
        {
          num: 1, page: 26,
          audioSrc: "https://bameomap.github.io/francais-vivi/010_Edito_A2_Livre.mp3",
          instruction: "Livre p.26 — vous écoutez 6 annonces diffusées dans des lieux publics. (6 points)",
          vi: "Nghe 6 thông báo nơi công cộng. Đọc câu hỏi TRƯỚC khi nghe — mỗi thông báo được nghe 2 lần.",
          type: "choice",
          transcript: "1. Mesdames et Messieurs, le concert va commencer. Merci d'éteindre vos téléphones portables. — 2. La ville de Bordeaux propose des activités pour la Semaine du patrimoine. Pour regarder le programme, connectez-vous sur le site internet de la ville. — 3. Nous informons les visiteurs que le château va bientôt fermer ses portes. Merci de marcher vers la sortie et bonne fin de journée. — 4. Mesdames et messieurs, notre spectacle de cirque va commencer. Merci d'aller vous asseoir à votre place. — 5. Bienvenue au centre aquatique ! Nous vous informons qu'il est interdit de courir près des piscines. — 6. Les inscriptions pour la sortie en canoë-kayak sont ouvertes. Venez vite réserver votre place pour la journée à la réception du camping.",
          items: [
            { q: "1. Qu'est-ce que vous devez faire ?", options: ["Allumer votre téléphone portable.", "Éteindre votre téléphone portable.", "Ranger votre téléphone portable."], answer: "Éteindre votre téléphone portable." },
            { q: "2. Comment connaître le programme de la Semaine du patrimoine à Bordeaux ?", options: ["Sur le site internet de la ville.", "À l'office de tourisme.", "Par téléphone."], answer: "Sur le site internet de la ville." },
            { q: "3. Quand entendez-vous ce message ?", options: ["Le matin.", "Le midi.", "Le soir."], answer: "Le soir." },
            { q: "4. Qu'est-ce que vous devez faire ?", options: ["Aller vous asseoir à votre place.", "Sortir de la salle.", "Éteindre la lumière."], answer: "Aller vous asseoir à votre place." },
            { q: "5. Qu'est-ce qui est interdit près des piscines ?", options: ["Courir.", "Sauter.", "Marcher."], answer: "Courir." },
            { q: "6. À quelle activité pouvez-vous vous inscrire ?", options: ["Une sortie en canoë-kayak.", "Un cours de natation.", "Une randonnée en montagne."], answer: "Une sortie en canoë-kayak." },
          ],
        },
      ],

      // Compréhension de l'oral — the cahier's own exam. Three of the six
      // questions use photographs as options in the book; they are written out.
      co: [
        {
          num: 1, page: 12, audioSrc: piste(11),
          instruction: "Compréhension de l'oral — vous écoutez des annonces publiques. (6 points)",
          vi: "Nghe 6 thông báo nơi công cộng rồi chọn đáp án đúng.",
          type: "choice",
          items: [
            { q: "1. Quel événement est organisé au cinéma ?", options: ["Une signature de livre.", "Une projection de film.", "Une présentation de CD."], answer: "Une présentation de CD." },
            { q: "2. Où est-ce qu'il faut aller pour retrouver le sac ?", options: ["La salle de cinéma.", "Le kiosque d'accueil.", "Le restaurant."], answer: "Le kiosque d'accueil." },
            { q: "3. Quelle sortie propose le club cette année ?", options: ["Le canoë-kayak.", "L'escalade.", "L'accrobranche."], answer: "Le canoë-kayak." },
            { q: "4. À quel concours est-ce que vous pouvez vous inscrire ?", options: ["La photographie.", "La peinture.", "La sculpture."], answer: "La photographie." },
            { q: "5. Dans le parc du château de Versailles, vous pouvez…", options: ["écouter un concert.", "rencontrer le jardinier.", "faire une visite guidée."], answer: "faire une visite guidée." },
            { q: "6. Qu'est-ce qui est interdit ?", options: ["Venir à côté des sportifs.", "Discuter avec les sportifs.", "Photographier les sportifs."], answer: "Venir à côté des sportifs." },
          ],
        },
      ],
      // Compréhension des écrits — 6 documents, 8 candidates, 6 to place.
      ce: [
        {
          num: 1, page: 12,
          instruction: "Compréhension des écrits — associez chaque document à la personne correspondante. (6 points)",
          vi: "Bạn muốn rủ bạn bè đi chơi và đọc chương trình hoạt động của thành phố Rennes. Nối mỗi thông báo với người phù hợp — có 8 người nhưng chỉ 6 thông báo.",
          type: "match",
          pairs: [
            { l: "1. Samedi 10 juin, l'Opéra de Bretagne va présenter ses nouveaux spectacles de chant et de danse.", r: "E. Nina enseigne le ballet." },
            { l: "2. Promenade guidée du magnifique jardin du Tabor. Fleurs exotiques et arbres de cent ans.", r: "D. Timoteo s'intéresse à la nature." },
            { l: "3. À la librairie Pagina, l'écrivain Sylvain Tesson signe son nouveau livre sur l'Asie traditionnelle.", r: "B. Rose aime les cultures du monde." },
            { l: "4. Jeudi 15, enregistrement en public de l'émission politique de Radio Armorique.", r: "G. Blanche voudrait devenir journaliste." },
            { l: "5. Pendant les vacances, la piscine de Bréquigny propose un stage de natation. 135 euros la semaine.", r: "C. Jasper adore les sports aquatiques." },
            { l: "6. Des tableaux du XXe siècle de la collection du Louvre sont exposés pour la première fois à Rennes.", r: "H. Luca apprécie la peinture moderne." },
          ],
          // Distractors the book includes on purpose — offered in the dropdowns.
          extraOptions: ["A. Mahé adore aller au cinéma.", "F. Jan a envie de bricoler."],
        },
      ],
      // Production — no auto-grading; the cahier's model answer is the yardstick.
      production: [
        {
          skill: "Production écrite", points: "12,5 points", page: 13,
          prompt: "Vous habitez en France. Vous êtes allé(e) aux Journées du Patrimoine de votre ville, samedi dernier. Vous écrivez à un(e) ami(e) français(e) pour lui raconter votre visite. Vous lui donnez aussi vos impressions. (60 mots minimum)",
          vi: "Viết thư kể cho bạn Pháp nghe về chuyến đi Ngày Di sản. (tối thiểu 60 từ)",
          model: "Salut ! Comment ça va ? Samedi dernier, c'était les journées du Patrimoine. Avec Thibaut, nous sommes allés visiter l'Opéra de Paris. C'était magnifique. Il y a de l'or et des sculptures partout ! Nous avons vu le hall, la salle de spectacle et les coulisses. J'ai adoré voir toutes les machines derrière la scène. Le soir, on a mangé au restaurant de l'Opéra. C'était très bon. On a passé une journée vraiment agréable. Si ça te dit, on peut y aller l'année prochaine ? Bisous Léo",
        },
        {
          skill: "Production orale", points: "2 minutes environ", page: 13,
          prompt: "Partie 2 — monologue suivi. Sujet : Vacances préférées. Racontez vos vacances préférées. Vous êtes parti où et avec qui ? Qu'est-ce que vous avez fait ? Pourquoi est-ce que vous avez aimé ces vacances ?",
          vi: "Nói 2 phút về kỳ nghỉ bạn thích nhất: đi đâu, với ai, làm gì, vì sao thích.",
          model: "Mes vacances préférées c'était en Suisse. J'y suis allée avec mon mari et ma fille l'année dernière. La première semaine, nous sommes restés dans une petite ville, près de Genève. Nous avons visité un vieux château et la maison de l'acteur de cinéma Charlie Chaplin. Elle est très grande. Il y a beaucoup de souvenirs de lui et de sa famille. On a regardé des extraits de ses films dans son studio de cinéma et on s'est promené dans le jardin. Il y a une belle vue sur le lac et les montagnes. C'était magnifique et en plus il faisait beau. Après, nous sommes allés voir mon cousin. Il habite à Neuchâtel. Ma fille a joué avec ses cousines. Nous nous sommes baignés et on a fait du paddle sur le lac. C'était mes vacances préférées parce que la Suisse est un très beau pays, c'est calme, on peut se reposer. Et j'ai aimé passer du temps avec ma famille.",
        },
      ],
    },
  },

  b3: {
    // DELF A2 blanc (livre p. 54) — no cahier data built yet for this unit,
    // so only the livre's own DELF prep listening is included here (same
    // pattern as b1.delf.coLivre).
    delf: {
      coLivre: [
        {
          num: 1, page: 54,
          audioSrc: "https://bameomap.github.io/francais-vivi/031_Edito_A2_Livre.mp3",
          instruction: "Livre p.54, Exercice 3 — vous écoutez un message téléphonique. (6 points)",
          vi: "Nghe tin nhắn thoại của Manon Ladier rồi trả lời 6 câu hỏi.",
          type: "choice",
          transcript: "Bonjour, c'est Manon Ladier. Je vous appelle parce qu'on a des questions pour la location de l'appartement rue Lamartine. Il est à quel étage ? Ce n'est pas écrit dans l'annonce. Et est-ce qu'il y a déjà un lave-linge dans l'appartement ? Parce qu'on n'a pas de machine à laver. Et la troisième chose, c'est... est-ce qu'il y a un parc ou des espaces verts dans le quartier ? Voilà, c'est tout. Ah non, on voudrait faire la visite jeudi à 15 h si c'est possible pour vous. Rappelez-moi quand vous pouvez au 06 09 92 66 65. Merci !",
          items: [
            { q: "1. Que souhaite Manon Ladier ?", options: ["Louer une maison.", "Louer un appartement.", "Acheter un appartement."], answer: "Louer un appartement." },
            { q: "2. Sa première question porte sur :", options: ["le prix.", "la superficie.", "l'étage."], answer: "l'étage." },
            { q: "3. Elle demande s'il y a déjà :", options: ["une machine à laver.", "une machine à café.", "une lampe."], answer: "une machine à laver." },
            { q: "4. Qu'est-ce qu'elle voudrait dans le quartier ?", options: ["Un cinéma.", "Une piscine.", "Un parc ou un espace vert."], answer: "Un parc ou un espace vert." },
            { q: "5. Quand voudrait-elle faire la visite ?", options: ["Le matin.", "L'après-midi.", "Le soir."], answer: "L'après-midi." },
            { q: "6. Que faut-il faire ?", options: ["La rappeler.", "Attendre son prochain appel.", "Lui envoyer un message."], answer: "La rappeler." },
          ],
        },
        {
          num: 2, page: 54,
          audioSrc: "https://bameomap.github.io/francais-vivi/032_Edito_A2_Livre.mp3",
          instruction: "Livre p.54, Exercice 4 — vous écoutez 4 dialogues informels. Associez chacun à sa situation de communication. (7 points)",
          vi: "Nghe 4 đoạn hội thoại và chọn đúng tình huống giao tiếp cho từng đoạn (6 tình huống có sẵn, chỉ 4 đúng).",
          type: "choice",
          transcript: "Dialogue 1 — La femme : Ça va ? — L'homme : Super ! J'ai trouvé un appartement ! — La femme : Mais c'est génial ! Tu dois être content. — L'homme : Très ! Allez, je t'invite à dîner, on va fêter ça. || Dialogue 2 — L'homme : Bonjour monsieur, je cherche l'hôtel Solvay... — La femme : Il est tout près. Continuez tout droit sur l'avenue. Vous allez le voir vite : c'est un très beau bâtiment. || Dialogue 3 — L'homme : Qu'est-ce que tu fais ? — La femme : Je fixe l'étagère. — L'homme : Tu veux que je t'aide ? — La femme : Ah oui, je veux bien. Merci ! || Dialogue 4 — La femme : Excusez-moi pour le retard. Je n'ai pas fait attention à l'heure. Je suis désolée. — L'homme : Ben maintenant vous êtes là. On commence la visite ?",
          items: [
            { q: "Dialogue 1 (2 points) — quelle situation ?", options: ["Demander/donner un renseignement", "Inviter quelqu'un à dîner", "Présenter quelqu'un", "Proposer de l'aide", "Raconter un souvenir", "S'excuser"], answer: "Inviter quelqu'un à dîner" },
            { q: "Dialogue 2 (2 points) — quelle situation ?", options: ["Demander/donner un renseignement", "Inviter quelqu'un à dîner", "Présenter quelqu'un", "Proposer de l'aide", "Raconter un souvenir", "S'excuser"], answer: "Demander/donner un renseignement" },
            { q: "Dialogue 3 (2 points) — quelle situation ?", options: ["Demander/donner un renseignement", "Inviter quelqu'un à dîner", "Présenter quelqu'un", "Proposer de l'aide", "Raconter un souvenir", "S'excuser"], answer: "Proposer de l'aide" },
            { q: "Dialogue 4 (1 point) — quelle situation ?", options: ["Demander/donner un renseignement", "Inviter quelqu'un à dîner", "Présenter quelqu'un", "Proposer de l'aide", "Raconter un souvenir", "S'excuser"], answer: "S'excuser" },
          ],
        },
      ],
    },
  },
};

// Answers are compared loosely: case, accents on the apostrophe, doubled
// spaces and trailing punctuation shouldn't cost the learner a point.
export function normalizeAnswer(s) {
  return String(s || "")
    .toLowerCase()
    .replace(/[''’]/g, "'")
    .replace(/\s+/g, " ")
    .replace(/[.!?;:]+$/g, "")
    .trim();
}

export function isAnswerCorrect(given, expected) {
  return normalizeAnswer(given) === normalizeAnswer(expected);
}
