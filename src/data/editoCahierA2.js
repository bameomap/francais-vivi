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

  b2: {

    // ── Grammaire, keyed by the grammar point index in editoGrammarA2.js ──
    grammar: {

      // p0 — L'imparfait (cahier p. 15)
      p0: [
        {
          // Only the answer key is printed in the corrigé (présent/imparfait
          // per case) — the cahier doesn't reprint the individual sentences
          // for this listening exercise, so the items below are labelled by
          // case letter only, as in the source.
          num: 1, page: 15, audioSrc: piste(12),
          instruction: "Écoutez et cochez : la phrase est-elle au présent ou à l'imparfait ?",
          vi: "Nghe từng câu (a→f) và cho biết câu đó ở thì hiện tại hay imparfait.",
          type: "choice",
          items: [
            { q: "a. (exemple)", options: ["présent", "imparfait"], answer: "présent", example: true },
            { q: "b.", options: ["présent", "imparfait"], answer: "imparfait" },
            { q: "c.", options: ["présent", "imparfait"], answer: "présent" },
            { q: "d.", options: ["présent", "imparfait"], answer: "imparfait" },
            { q: "e.", options: ["présent", "imparfait"], answer: "présent" },
            { q: "f.", options: ["présent", "imparfait"], answer: "imparfait" },
          ],
        },
        {
          num: 2, page: 15,
          instruction: "Complétez les terminaisons des verbes à l'imparfait.",
          vi: "Điền đuôi động từ ở imparfait.",
          type: "fill",
          items: [
            { q: "Je me rappelle, nous étudi…… ensemble.", answer: "étudiions", example: true },
            { q: "Chaque semaine, j'écriv…… une lettre à ma meilleure amie.", answer: "écrivais" },
            { q: "On chang…… souvent de professeur.", answer: "changeait" },
            { q: "Dans ma famille, on chant…… beaucoup.", answer: "chantait" },
            { q: "À cette époque, vous espér…… devenir célèbres.", answer: "espériez" },
            { q: "Tu voy…… souvent tes cousins ?", answer: "voyais" },
          ],
        },
        {
          num: 3, page: 15,
          instruction: "Conjuguez les verbes entre parenthèses à l'imparfait.",
          vi: "Chia động từ trong ngoặc ở imparfait — đoạn văn kể kỷ niệm nghỉ hè.",
          type: "fill",
          items: [
            { q: "L'hiver, on (partir) ___ à la neige.", answer: "partait", example: true },
            { q: "Mon frère et moi, nous (faire) ___ du ski,", answer: "faisions" },
            { q: "ma sœur (préférer) ___ le snowboard.", answer: "préférait" },
            { q: "L'été, nous (aller) ___ toujours chez ma tante et mon oncle.", answer: "allions" },
            { q: "À cette époque, ils (habiter) ___ dans le sud de la France.", answer: "habitaient" },
            { q: "J'(adorer) ___ leur maison, leur jardin et tous ces moments passés en famille.", answer: "adorais" },
            { q: "On (cuisiner) ___", answer: "cuisinait" },
            { q: "et on (manger) ___ toujours tous ensemble.", answer: "mangeait" },
            { q: "C'(être) ___ des moments inoubliables.", answer: "était" },
          ],
        },
        {
          num: 4, page: 15,
          instruction: "Transformez les phrases au présent à l'imparfait.",
          vi: "Chuyển câu từ hiện tại sang imparfait.",
          type: "transform",
          items: [
            { q: "Anne oublie toujours tout.", answer: "Anne oubliait toujours tout.", example: true },
            { q: "Étienne et Alex se déplacent souvent.", answer: "Étienne et Alex se déplaçaient souvent." },
            { q: "Tu as beaucoup de photos de vacances.", answer: "Tu avais beaucoup de photos de vacances." },
            { q: "Nous sommes souvent en retard.", answer: "Nous étions souvent en retard." },
            { q: "Vous faites beaucoup de choses ensemble.", answer: "Vous faisiez beaucoup de choses ensemble." },
            { q: "J'adore écouter le chant des oiseaux.", answer: "J'adorais écouter le chant des oiseaux." },
            { q: "Tu me tiens toujours la main quand on va à l'école.", answer: "Tu me tenais toujours la main quand on allait à l'école." },
          ],
        },
      ],

      // p1 — Les pronoms y et en (cahier p. 17)
      p1: [
        {
          num: 1, page: 17,
          instruction: "Entourez le pronom y ou en qui convient dans les réponses.",
          vi: "Chọn đại từ y hoặc en phù hợp trong câu trả lời.",
          type: "choice",
          items: [
            { q: "– Tu reviens sur la même île l'été prochain ? – Oui, j'___ reviens.", options: ["y", "en"], answer: "y", example: true },
            { q: "– Tu descends du sommet ? – Oui, j'___ descends.", options: ["y", "en"], answer: "en" },
            { q: "– Vous êtes partis quand de chez vous ? – On ___ est partis il y a deux heures.", options: ["y", "en"], answer: "en" },
            { q: "– Tes parents habitent à Cannes ? – Oui, ils ___ habitent depuis l'année dernière.", options: ["y", "en"], answer: "y" },
            { q: "– Les enfants sont rentrés de leur balade ? – Oui, ils ___ sont rentrés.", options: ["y", "en"], answer: "en" },
            { q: "– Tu aimes le climat dans ce pays ? – Oui, il ___ fait toujours beau.", options: ["y", "en"], answer: "y" },
          ],
        },
        {
          num: 2, page: 17,
          instruction: "Complétez les phrases avec le pronom y ou en.",
          vi: "Điền đại từ y hoặc en.",
          type: "fill",
          bank: ["y", "en"],
          items: [
            { q: "Ma sœur va tous les ans en Croatie. Elle ___ retourne encore cette année.", answer: "y", example: true },
            { q: "Adrien va bientôt rentrer de Montpellier, il ___ est parti à 15 heures.", answer: "en" },
            { q: "Cathy a visité une ferme. Elle ___ a acheté du fromage.", answer: "y" },
            { q: "Je pars de Nice. J'___ pars très contente, c'était génial !", answer: "en" },
            { q: "On revient de notre chalet. C'était difficile d'___ repartir, on était tellement bien !", answer: "en" },
            { q: "Laure adore aller dans ce pays. Elle veut s'___ installer.", answer: "y" },
          ],
        },
        {
          // Le corrigé imprimé donne « en » pour d, alors que la question
          // transcrite (« Ton père est parti à l'aéroport ? ») suggère plutôt
          // « y ». Incohérence signalée dans la source, non résolue ici —
          // réponse reprise telle quelle du corrigé p. 156.
          num: 3, page: 17, audioSrc: piste(14),
          instruction: "Écoutez et complétez les réponses comme dans l'exemple.",
          vi: "Nghe câu hỏi rồi hoàn thành câu trả lời bằng y/en (như ví dụ). Lưu ý: câu d có một mâu thuẫn nhỏ trong sách gốc — đáp án giữ nguyên theo corrigé in sẵn.",
          type: "fill",
          items: [
            { q: "Réponse a (exemple)", answer: "nous y allons souvent", example: true },
            { q: "Réponse b", answer: "il en est revenu" },
            { q: "Réponse c", answer: "elle n'y est pas" },
            { q: "Réponse d", answer: "il en est parti" },
            { q: "Réponse e", answer: "je n'y suis pas allé(e)" },
            { q: "Réponse f", answer: "ils n'en sont pas rentrés" },
            { q: "Réponse g", answer: "elles y sont toujours" },
          ],
        },
        {
          num: 4, page: 17,
          instruction: "Complétez la carte postale avec les pronoms y ou en.",
          vi: "Điền y hoặc en vào tấm bưu thiếp.",
          type: "fill",
          bank: ["y", "en"],
          items: [
            { q: "Je t'envoie un bisou de La Rochelle. J'___ suis avec mes amis.", answer: "y", example: true },
            { q: "Nous ___ avons fait du vélo, c'était super !", answer: "y" },
            { q: "Nous sommes partis de là-bas le soir. Nous ___ sommes revenus fatigués, mais heureux.", answer: "en" },
            { q: "Hier, on est allés chez mes amis à Rochefort. On ___ a passé un très bon moment.", answer: "y" },
            { q: "On est rentrés tard de chez eux : nous ___ sommes partis à minuit !", answer: "en" },
            { q: "Demain, on retourne à Paris. Je dois ___ être lundi, je reprends le travail.", answer: "y" },
          ],
        },
      ],

      // p2 — La place de l'adjectif (cahier p. 19)
      p2: [
        {
          // Comme pour p0/num1, seul le corrigé (avant/après le nom par cas)
          // est imprimé — les phrases individuelles ne sont pas retranscrites.
          num: 1, page: 19, audioSrc: piste(16),
          instruction: "Écoutez et cochez : l'adjectif est-il placé avant ou après le nom ?",
          vi: "Nghe từng câu (a→g) và cho biết tính từ đứng trước hay sau danh từ.",
          type: "choice",
          items: [
            { q: "a. (exemple)", options: ["avant le nom", "après le nom"], answer: "après le nom", example: true },
            { q: "b.", options: ["avant le nom", "après le nom"], answer: "avant le nom" },
            { q: "c.", options: ["avant le nom", "après le nom"], answer: "après le nom" },
            { q: "d.", options: ["avant le nom", "après le nom"], answer: "après le nom" },
            { q: "e.", options: ["avant le nom", "après le nom"], answer: "avant le nom" },
            { q: "f.", options: ["avant le nom", "après le nom"], answer: "après le nom" },
            { q: "g.", options: ["avant le nom", "après le nom"], answer: "avant le nom" },
          ],
        },
        {
          num: 2, page: 19,
          instruction: "Remettez les mots dans l'ordre.",
          vi: "Sắp xếp lại các từ thành câu đúng.",
          type: "order",
          items: [
            { tokens: ["chaud", "un", "vêtement"], answer: "un vêtement chaud", example: true },
            { tokens: ["touristes", "des", "japonais"], answer: "des touristes japonais" },
            { tokens: ["souvenir", "inoubliable", "un"], answer: "un souvenir inoubliable" },
            { tokens: ["une", "fraîcheur", "grande"], answer: "une grande fraîcheur" },
            { tokens: ["vieux", "un", "port"], answer: "un vieux port" },
            { tokens: ["des", "spéciaux", "moments"], answer: "des moments spéciaux" },
            { tokens: ["gros", "un", "bateau"], answer: "un gros bateau" },
          ],
        },
        {
          num: 3, page: 19,
          instruction: "Placez les adjectifs entre parenthèses dans les phrases.",
          vi: "Đặt tính từ trong ngoặc vào đúng vị trí trong câu.",
          type: "transform",
          items: [
            { q: "On a mangé un plat. (hongrois/bon)", answer: "On a mangé un bon plat hongrois.", example: true },
            { q: "Regarde ce ciel ! (beau/bleu)", answer: "Regarde ce beau ciel bleu." },
            { q: "Nous avons visité des villages. (corses/jolis)", answer: "Nous avons visité de jolis villages corses." },
            { q: "J'ai vu des bâtiments. (modernes/grands)", answer: "J'ai vu de grands bâtiments modernes." },
            { q: "Il nous a offert un souvenir. (petit/original)", answer: "Il nous a offert un petit souvenir original." },
            { q: "C'est une fête. (traditionnelle/grande)", answer: "C'est une grande fête traditionnelle." },
            { q: "Je préfère acheter des produits. (locaux/bons)", answer: "Je préfère acheter de bons produits locaux." },
          ],
        },
        {
          num: 4, page: 19,
          instruction: "Complétez les réponses avec l'adjectif entre parenthèses. Attention aux accords et à la place des adjectifs.",
          vi: "Hoàn thành câu trả lời với tính từ trong ngoặc — chú ý hợp giống–số và vị trí.",
          type: "transform",
          items: [
            { q: "Tu as acheté des cadeaux ? (petit)", answer: "Oui, j'ai acheté de petits cadeaux.", example: true },
            { q: "Vous vous souvenez de ces moments ? (incroyable)", answer: "Oui, on se souvient de ces moments incroyables." },
            { q: "Tu es content de cette expérience ? (fantastique)", answer: "Oui, je suis contente d'une expérience fantastique." },
            { q: "Quelle cuisine tu préfères ? (italien)", answer: "Je préfère la cuisine italienne." },
            { q: "Tu as des chaussures de randonnée ? (bon)", answer: "Oui, j'ai de bonnes chaussures de randonnée." },
            { q: "Vous allez louer un chalet ? (grand)", answer: "Oui, nous allons louer un grand chalet." },
            { q: "Tu connais cette île ? (magique)", answer: "Oui, je connais une île magique." },
          ],
        },
      ],
    },

    // ── Phonie-graphie (cahier p. 20) — wired into the Phono step ─────
    // Les 4 sous-exercices de la page sont Discrimination / Articulation /
    // Graphies / Interprétation. Comme pour l'unité 1, seule la discrimination
    // se prête à une correction automatique ; Articulation et Interprétation
    // sont des exercices de répétition/lecture à voix haute sans réponse à
    // vérifier (même choix que cahier_unite_1 : ces deux-là ne sont pas
    // repris ici). Graphies (act. 3, marquage des liaisons ‿ sur un texte
    // continu) n'est pas non plus repris : le corrigé source signale que la
    // position exacte des liaisons n'est pas fiablement lisible sur le scan,
    // donc il n'y a pas de réponse texte exploitable pour ce format.
    phono: [
      {
        num: 1, page: 20, audioSrc: piste(17),
        instruction: "Discrimination — écoutez et dites combien de fois vous entendez [n], [z] ou [t] dans chaque phrase.",
        vi: "Nghe và đếm số lần xuất hiện của liên kết [n] (như « un ami »), [z] (như « des amis ») và [t] (như « petit ami ») trong mỗi câu.",
        type: "choice",
        items: [
          { q: "a. (exemple) — combien de [n] ?", options: ["0", "1", "2"], answer: "1", example: true },
          { q: "a. (exemple) — combien de [z] ?", options: ["0", "1", "2"], answer: "2", example: true },
          { q: "a. (exemple) — combien de [t] ?", options: ["0", "1", "2"], answer: "1", example: true },
          { q: "b. — combien de [n] ?", options: ["0", "1", "2"], answer: "1" },
          { q: "b. — combien de [z] ?", options: ["0", "1", "2"], answer: "1" },
          { q: "b. — combien de [t] ?", options: ["0", "1", "2"], answer: "1" },
          { q: "c. — combien de [n] ?", options: ["0", "1", "2"], answer: "0" },
          { q: "c. — combien de [z] ?", options: ["0", "1", "2"], answer: "1" },
          { q: "c. — combien de [t] ?", options: ["0", "1", "2"], answer: "2" },
          { q: "d. — combien de [n] ?", options: ["0", "1", "2"], answer: "1" },
          { q: "d. — combien de [z] ?", options: ["0", "1", "2"], answer: "2" },
          { q: "d. — combien de [t] ?", options: ["0", "1", "2"], answer: "1" },
          { q: "e. — combien de [n] ?", options: ["0", "1", "2"], answer: "1" },
          { q: "e. — combien de [z] ?", options: ["0", "1", "2"], answer: "1" },
          { q: "e. — combien de [t] ?", options: ["0", "1", "2"], answer: "1" },
        ],
      },
    ],

    // ── Vocabulaire, keyed by the cycle's vocab step ──────────────────
    vocab: {
      // Cycle 1 — Le souvenir (cahier p. 16)
      c1_vocab: [
        {
          num: 1, page: 16,
          instruction: "Associez les phrases aux images correspondantes (indiquez le numéro de l'image).",
          vi: "Nối câu với số ảnh tương ứng.",
          type: "fill",
          items: [
            { q: "Tu vois, c'est là-bas.", answer: "1", example: true },
            { q: "Le chant des oiseaux le matin, j'adore !", answer: "4" },
            { q: "Ça sent mauvais !", answer: "5" },
            { q: "Je te tiens la main.", answer: "6" },
            { q: "On aime regarder des albums photos.", answer: "3" },
            { q: "Ça n'a pas bon goût.", answer: "2" },
          ],
        },
        {
          num: 2, page: 16,
          instruction: "Entourez le mot ou l'expression correct.",
          vi: "Chọn từ hoặc cụm từ đúng.",
          type: "choice",
          items: [
            { q: "Le chant des oiseaux, c'est un ___ agréable.", options: ["bruit", "goût"], answer: "bruit", example: true },
            { q: "J'aime ___ l'odeur du pain frais.", options: ["sentir", "voir"], answer: "sentir" },
            { q: "Elle regarde l'album photo pour ___.", options: ["oublier son enfance", "replonger dans son enfance"], answer: "replonger dans son enfance" },
            { q: "On ne veut pas se rappeler un ___.", options: ["souvenir heureux", "mauvais souvenir"], answer: "mauvais souvenir" },
            { q: "Avant, on avait une grande maison avec une jolie ___ sur la mer.", options: ["vue", "saveur"], answer: "vue" },
            { q: "J'ai adoré ma fête d'anniversaire, c'est un souvenir ___.", options: ["difficile", "inoubliable"], answer: "inoubliable" },
            { q: "J'aime ce parfum, ça sent ___.", options: ["bon", "mauvais"], answer: "bon" },
          ],
        },
        {
          num: 3, page: 16,
          instruction: "Complétez le texte avec les mots et expressions suivants : saveurs – souvenirs heureux – sentir – regarde – raconte – goûter.",
          vi: "Điền từ vào đoạn văn.",
          type: "fill",
          bank: ["saveurs", "souvenirs heureux", "sentir", "regarde", "raconte", "goûter"],
          items: [
            { q: "On ___ souvent les vieilles photos de famille avec ma mère.", answer: "regarde", example: true },
            { q: "Elle me ___ toujours plein de ……", answer: "raconte" },
            { q: "… plein de ___ . Ça me plaît.", answer: "souvenirs heureux" },
            { q: "Elle aimait ___ les bonnes odeurs,", answer: "sentir" },
            { q: "……, ___ les plats qu'elles cuisinaient ensemble.", answer: "goûter" },
            { q: "Elle se souvient de toutes ces ___, comme si c'était hier.", answer: "saveurs" },
          ],
        },
        {
          num: 4, page: 16, audioSrc: piste(13),
          instruction: "Écoutez et associez chaque phrase à un souvenir.",
          vi: "Nghe và nối mỗi câu với một loại kỷ niệm.",
          type: "fill",
          items: [
            { q: "Souvenir d'adolescence → quelle phrase ?", answer: "a", example: true },
            { q: "Souvenir de vacances → quelle phrase ?", answer: "e" },
            { q: "Souvenir d'enfance → quelle phrase ?", answer: "b" },
            { q: "Souvenir de famille → quelle phrase ?", answer: "d" },
            { q: "Souvenir de jeunesse → quelle phrase ?", answer: "f" },
            { q: "Souvenir d'école → quelle phrase ?", answer: "c" },
          ],
        },
      ],

      // Cycle 2 — Les paysages et la météo (cahier p. 18)
      c2_vocab: [
        {
          num: 1, page: 18,
          instruction: "Classez les mots et expressions suivants : une île – une prairie – un chalet – une mouette – un sommet – un port – une ferme.",
          vi: "Xếp các từ vào đúng nhóm: biển / núi / nông thôn.",
          type: "match",
          pairs: [
            { l: "une île (exemple)", r: "La mer" },
            { l: "une mouette",        r: "La mer" },
            { l: "un port",            r: "La mer" },
            { l: "un chalet",          r: "La montagne" },
            { l: "un sommet",          r: "La montagne" },
            { l: "une ferme",          r: "La campagne" },
            { l: "une prairie",        r: "La campagne" },
          ],
        },
        {
          num: 2, page: 18,
          instruction: "Lisez et associez les phrases aux images (indiquez le numéro de l'image).",
          vi: "Đọc và nối câu với số ảnh tương ứng.",
          type: "fill",
          items: [
            { q: "On a passé nos vacances au bord d'un lac.", answer: "5", example: true },
            { q: "Le ciel est tout gris, il va y avoir un orage.", answer: "3" },
            { q: "Aujourd'hui, il y a beaucoup de vent.", answer: "6" },
            { q: "Derrière la ferme, il y a ce très beau champ.", answer: "1" },
            { q: "Sur cette côte, il y a beaucoup de dunes.", answer: "4" },
            { q: "Cette barrière de corail est magnifique.", answer: "2" },
          ],
        },
        {
          num: 3, page: 18,
          instruction: "Répondez par vrai ou faux.",
          vi: "Đúng hay sai?",
          type: "truefalse",
          items: [
            { q: "Quand la mer avance sur la plage, c'est la marée haute.", answer: true, example: true },
            { q: "Quand il fait froid, on parle de chaleur.", answer: false },
            { q: "Un agriculteur habite et travaille dans une ferme.", answer: true },
            { q: "Le sommet est le point le plus haut d'une montagne.", answer: true },
            { q: "Quand il y a du soleil, le ciel est gris.", answer: false },
            { q: "On peut voir des animaux manger dans une prairie.", answer: true },
            { q: "Quand on habite sur la côte, on est loin de la mer.", answer: false },
          ],
        },
        {
          num: 4, page: 18, audioSrc: piste(15),
          instruction: "Écoutez et associez les dialogues aux situations (indiquez le numéro du dialogue).",
          vi: "Nghe và nối mỗi tình huống với số đoạn hội thoại tương ứng.",
          type: "fill",
          items: [
            { q: "C'est la canicule. → quel dialogue ?", answer: "1", example: true },
            { q: "Le temps est gris. → quel dialogue ?", answer: "5" },
            { q: "C'est la marée basse. → quel dialogue ?", answer: "2" },
            { q: "À la plage, c'est agréable. → quel dialogue ?", answer: "4" },
            { q: "C'est un climat différent. → quel dialogue ?", answer: "6" },
            { q: "C'est un temps sec. → quel dialogue ?", answer: "3" },
          ],
        },
      ],
    },

    // ── Bilan linguistique (cahier p. 22-23, noté /40) ──────────────
    // Wired into the "L'essentiel" step, alongside the AI-generated quiz.
    // Comme pour b1, la compréhension écrite de la page 21 (texte + vrai/faux
    // + QCM + vocabulaire) et les mini-jeux corrigeables de la page 26 sont
    // repris ici aussi (même traitement que le num7-9 « Abd Al Malik » /
    // « Barrez l'intrus » de b1). Le jeu de rôle libre de la page 21 et les
    // jeux 1 et 3 de la page 26 (brainstorm en groupe, mots cachés à
    // découper) n'ont pas de réponse à vérifier et ne sont pas repris.
    bilan: [
      {
        num: 1, page: 22,
        instruction: "Conjuguez les verbes entre parenthèses à l'imparfait. (/7)",
        vi: "Chia động từ trong ngoặc ở imparfait.",
        type: "fill",
        items: [
          { q: "À cette époque, nous (habiter) ___ près d'un lac.", answer: "habitions" },
          { q: "On (se déplacer) ___ beaucoup à vélo.", answer: "se déplaçait" },
          { q: "Nos enfants (aller) ___ à l'école près de la maison.", answer: "allaient" },
          { q: "Tu (faire) ___ une randonnée tous les week-ends.", answer: "faisais" },
          { q: "Je (voyager) ___ souvent.", answer: "voyageais" },
          { q: "Elle (commencer) ___ à comprendre le français.", answer: "commençait" },
          { q: "Nous (écrire) ___ des poèmes ensemble.", answer: "écrivions" },
        ],
      },
      {
        num: 2, page: 22,
        instruction: "Transformez les phrases en remplaçant les éléments soulignés par y ou en. (/7)",
        vi: "Thay thành phần được gạch chân bằng y hoặc en.",
        type: "transform",
        items: [
          { q: "Je n'étais pas heureuse dans cette école.", answer: "Je n'y étais pas heureuse." },
          { q: "Nous sommes partis de Lyon à 13 heures.", answer: "Nous en sommes partis à 13 heures." },
          { q: "À quelle heure tu vas à la plage ?", answer: "À quelle heure tu y vas ?" },
          { q: "Elle est descendue rapidement de l'avion.", answer: "Elle en est descendue rapidement." },
          { q: "Tu ne passes pas beaucoup de temps dans l'eau.", answer: "Tu n'y passes pas beaucoup de temps." },
          { q: "Vous vous promenez souvent sur le port ?", answer: "Vous vous y promenez souvent ?" },
          { q: "Quand est-ce que tu repars de la ville ?", answer: "Quand est-ce que tu en repars ?" },
        ],
      },
      {
        num: 3, page: 22,
        instruction: "Accordez et placez les adjectifs entre parenthèses dans les phrases. (/6)",
        vi: "Hợp giống–số và đặt tính từ trong ngoặc vào đúng vị trí.",
        type: "transform",
        items: [
          { q: "Nous avons créé une affiche. (nouveau)", answer: "Nous avons créé une nouvelle affiche." },
          { q: "J'ai acheté des espadrilles au Maroc. (confortable)", answer: "J'ai acheté des espadrilles confortables au Maroc." },
          { q: "Ce plat a un goût. (fort)", answer: "Ce plat a un goût fort." },
          { q: "C'est une odeur. (insupportable)", answer: "C'est une odeur insupportable." },
          { q: "Je me rappelle toutes ces saveurs. (incroyable)", answer: "Je me rappelle de toutes ces saveurs incroyables." },
          { q: "Tu as rencontré beaucoup d'étudiants. (étranger)", answer: "Tu as rencontré beaucoup d'étudiants étrangers." },
        ],
      },
      {
        num: 4, page: 23,
        instruction: "Vocabulaire — Associez les débuts et les fins de phrases. (/5)",
        vi: "Nối đầu câu với cuối câu.",
        type: "match",
        pairs: [
          { l: "C'est un mauvais souvenir,",       r: "je veux oublier ce moment." },
          { l: "Je n'aime pas cette odeur,",        r: "ça sent mauvais." },
          { l: "Le matin, on allait à l'école avec ma sœur,", r: "je lui tenais souvent la main." },
          { l: "Je regarde mes photos d'enfance,",  r: "je replonge dans mon enfance." },
          { l: "Par ma fenêtre, je vois les montagnes,", r: "c'est une jolie vue." },
        ],
      },
      {
        num: 5, page: 23,
        instruction: "Complétez les phrases avec les mots suivants : bruit – jeunesse – goûter – joyeux – sent. (/5)",
        vi: "Điền từ vào chỗ trống.",
        type: "fill",
        bank: ["bruit", "jeunesse", "goûter", "joyeux", "sent"],
        items: [
          { q: "J'ai fait un gâteau, tu veux ___ ?", answer: "goûter" },
          { q: "Le chant des oiseaux est un ___ agréable.", answer: "bruit" },
          { q: "À cette époque, j'avais 25 ans, j'ai beaucoup de souvenirs de ___ .", answer: "jeunesse" },
          { q: "J'adore son parfum, il ___ très bon.", answer: "sent" },
          { q: "On a beaucoup ri ensemble, on a beaucoup de souvenirs ___ .", answer: "joyeux" },
        ],
      },
      {
        num: 6, page: 23,
        instruction: "Entourez la réponse correcte. (/5)",
        vi: "Chọn đáp án đúng.",
        type: "choice",
        items: [
          { q: "Il n'y a pas de soleil, le ciel est ___.", options: ["bleu", "gris"], answer: "gris" },
          { q: "On annonce encore de la pluie pour ce week-end, le temps est ___.", options: ["sec", "humide"], answer: "humide" },
          { q: "Pendant notre randonnée, on s'est baigné dans un ___ de montagne.", options: ["lac", "champ"], answer: "lac" },
          { q: "Il y a des ___ de sable sur cette plage.", options: ["dunes", "prairies"], answer: "dunes" },
          { q: "Il a fait plus de 40 degrés, c'était ___.", options: ["la canicule", "l'orage"], answer: "la canicule" },
        ],
      },
      {
        num: 7, page: 23,
        instruction: "Remplacez les images par les mots correspondants. (/5)",
        vi: "Thay hình ảnh bằng từ tương ứng.",
        type: "fill",
        items: [
          { q: "Nous passions tous les hivers dans notre …… (image : un chalet)", answer: "chalet" },
          { q: "L'été dernier, j'ai travaillé dans une …… (image : une ferme)", answer: "ferme" },
          { q: "Nous sommes montés jusqu'au …… (image : un sommet)", answer: "sommet" },
          { q: "Regarde cette jolie …… (image : une prairie)", answer: "prairie" },
          { q: "Nous nous promenions souvent sur le …… (image : un port)", answer: "port" },
        ],
      },
      {
        // Page 21 — Compréhension écrite : « La Commode aux tiroirs de
        // couleurs », Olivia Ruiz, 2020.
        num: 8, page: 21,
        instruction: "Compréhension écrite — « La Commode aux tiroirs de couleurs » — Vrai ou faux ?",
        vi: "Đọc đoạn trích của Olivia Ruiz rồi trả lời Đúng/Sai.",
        type: "truefalse",
        items: [
          { q: "L'écrivaine raconte un souvenir d'école.", answer: false },
          { q: "Elle aimait faire les courses et parler français aux commerçants.", answer: true },
        ],
      },
      {
        num: 9, page: 21,
        instruction: "Compréhension écrite — Cochez la bonne réponse.",
        vi: "Chọn đáp án đúng dựa trên đoạn trích.",
        type: "choice",
        items: [
          { q: "Quand elle parlait français, elle :", options: ["avait un accent espagnol", "n'avait pas d'accent espagnol"], answer: "n'avait pas d'accent espagnol" },
          { q: "André était :", options: ["français", "espagnol"], answer: "français" },
          { q: "Il habitait :", options: ["dans la même rue", "en face de l'immeuble"], answer: "dans la même rue" },
          { q: "Il savait très bien :", options: ["coudre", "cuisiner"], answer: "coudre" },
        ],
      },
      {
        num: 10, page: 21,
        instruction: "De quoi parlent l'écrivaine et André ?",
        vi: "Hai người nói chuyện về đề tài gì?",
        type: "fill",
        items: [
          { q: "De quoi parlent-ils ?", answer: "Ils parlent de l'Espagne." },
        ],
      },
      {
        num: 11, page: 21,
        instruction: "Vocabulaire — Cochez la bonne signification.",
        vi: "Chọn đúng nghĩa của cụm từ.",
        type: "choice",
        items: [
          { q: "« Ces moments étaient un bol d'air. »", options: ["Ces moments sortaient de la vie ordinaire et c'était agréable.", "Ces moments étaient fatigants."], answer: "Ces moments sortaient de la vie ordinaire et c'était agréable." },
          { q: "« Il regardait les femmes à l'œuvre. »", options: ["Il regardait les femmes travailler.", "Il regardait un tableau."], answer: "Il regardait les femmes travailler." },
          { q: "« Ma place prenait une autre tournure. »", options: ["Ma place changeait.", "Ma place disparaissait."], answer: "Ma place changeait." },
        ],
      },
      {
        // Page 26 — Jeux, act. 2 : correspondance symbole → verbe non
        // entièrement lisible sur le scan source ; réponses reprises fidèlement
        // dans l'ordre d'apparition des blancs, sans reconstruction indépendante.
        num: 12, page: 26,
        instruction: "Jeux — Remplacez les symboles par les verbes correspondants et conjuguez-les à l'imparfait.",
        vi: "Thay các ký hiệu bằng động từ phù hợp rồi chia ở imparfait (thứ tự chỗ trống trong bài).",
        type: "fill",
        bank: ["se sentir", "se réveiller", "être", "préparer", "avoir", "descendre", "s'installer", "dire", "boire", "commencer"],
        items: [
          { q: "Tous les dimanches matin, je [♥] ___ avec l'odeur des crêpes", answer: "me réveillais", example: true },
          { q: "que mon père [♦] ___ dans la cuisine.", answer: "était" },
          { q: "Mon frère et moi, nous y [■] ___, encore en pyjama.", answer: "descendions" },
          { q: "On [★] ___ un rapide bonjour à nos parents,", answer: "disait" },
          { q: "on [★] ___ à table", answer: "s'installait" },
          { q: "et on [❖] ___ à manger.", answer: "commençait" },
          { q: "Mes parents [❖] ___ leur café au lait,", answer: "buvaient" },
          { q: "nous, on [▲] ___ notre chocolat chaud.", answer: "avait" },
          { q: "Ces moments [♦] ___ très simples", answer: "étaient" },
          { q: "mais on [✳] ___ heureux.", answer: "se sentait" },
        ],
      },
      {
        num: 13, page: 26,
        instruction: "Jeux — Qui suis-je ?",
        vi: "Tôi là ai?",
        type: "fill",
        items: [
          { q: "Je suis blanche, j'aime la mer et les poissons.", answer: "une mouette", example: true },
          { q: "Je vois la mer de tous les côtés.", answer: "une île" },
          { q: "Je me lève le matin et je me couche le soir.", answer: "le soleil" },
          { q: "Je suis la frontière entre la mer et la terre.", answer: "la côte" },
          { q: "Les enfants m'utilisent pour faire un château sur la plage.", answer: "le sable" },
        ],
      },
    ],

    // ── DELF A2 blanc (cahier p. 24-25) ────────────────────────────
    // Le livre n'a pas de page « Préparation au DELF » propre à l'Unité 2
    // (contrairement aux unités 1 et 3) — aucun coLivre pour cette unité.
    delf: {
      co: [
        {
          num: 1, page: 24, audioSrc: piste(21),
          instruction: "Compréhension de l'oral — vous écoutez trois annonces radio. (6 points)",
          vi: "Nghe 3 thông báo radio rồi chọn đáp án đúng.",
          type: "choice",
          items: [
            { q: "1. Ce week-end, la médiathèque propose…", options: ["de lire des BD", "de voir des artistes", "d'écrire ses souvenirs"], answer: "d'écrire ses souvenirs" },
            { q: "2. Pour participer, il faut…", options: ["s'inscrire en ligne", "téléphoner", "se présenter à l'accueil"], answer: "s'inscrire en ligne" },
            { q: "3. Le thème de l'émission est…", options: ["la santé", "le travail", "les congés"], answer: "les congés" },
            { q: "4. Pour témoigner, vous devez…", options: ["téléphoner", "écrire un mail", "envoyer un sms"], answer: "téléphoner" },
            { q: "5. Vous allez prendre des photos de…", options: ["nature", "maison", "nourriture"], answer: "nourriture" },
            { q: "6. Vous pouvez gagner…", options: ["de l'argent", "un petit-déjeuner", "des magazines"], answer: "des magazines" },
          ],
        },
      ],
      // Compréhension des écrits — lettre de l'association « Les amoureux de
      // la Bretagne » (anniversaire des 10 ans de l'association, le 7 juin).
      // Le texte de la lettre elle-même n'est pas reproduit dans le corrigé
      // source, seulement les questions et réponses — items ci-dessous.
      ce: [
        {
          num: 2, page: 24,
          instruction: "Compréhension des écrits — Lettre de l'association « Les amoureux de la Bretagne ». (6 points)",
          vi: "Đọc thư mời của hội « Les amoureux de la Bretagne » (kỷ niệm 10 năm, ngày 7 tháng 6) rồi chọn đáp án đúng.",
          type: "choice",
          items: [
            { q: "1. Vous êtes invité pour fêter…", options: ["un mariage", "une naissance", "un anniversaire"], answer: "un anniversaire" },
            { q: "2. Quelle activité est proposée aux enfants ?", options: ["des crayons de couleur", "des crêpes", "des jouets de plage"], answer: "des crêpes" },
            { q: "3. L'exposition a pour thème…", options: ["les animaux", "les paysages de la région", "les plats typiques"], answer: "les paysages de la région" },
            { q: "4. Que recevra le gagnant ?", options: ["des billets", "un trophée", "un poisson rouge"], answer: "des billets" },
            { q: "5. L'association a besoin d'aide pour…", options: ["la cuisine", "la décoration", "le rangement"], answer: "le rangement" },
            { q: "6. Pour vous inscrire, vous devez…", options: ["aller sur place", "téléphoner à Aude", "envoyer un message"], answer: "envoyer un message" },
          ],
        },
      ],
      // Production — no auto-grading; the cahier's model answer is the yardstick.
      production: [
        {
          skill: "Production écrite", points: "12,5 points", page: 25,
          prompt: "Vous avez reçu ce courriel de votre amie belge Ève : « Coucou, Je t'invite pour mon anniversaire le week-end prochain à Arcachon ! J'ai loué une petite maison pour 15 personnes, ça va être génial ! Tu peux m'aider pour préparer les repas ? Je suis nulle en cuisine ! À bientôt, Ève » Vous répondez à Ève. Vous acceptez son invitation, vous posez des questions sur l'organisation et vous lui proposez quelques idées de repas. (60 mots minimum)",
          vi: "Viết thư trả lời Ève: nhận lời mời sinh nhật, hỏi thêm về tổ chức, gợi ý vài món ăn. (tối thiểu 60 từ)",
          model: "Salut Ève, Merci pour l'invitation. Oui, je viens à ton anniversaire, ça va être super ! Je peux venir avec une amie ? Elle s'appelle Salomé, elle est très sympa. J'adore cuisiner alors je vais t'aider. Pour le dîner, nous pouvons préparer de grandes salades à partager ou faire des crêpes. J'apporte ma recette de gâteau au chocolat pour le dessert ! À samedi ! Diane",
        },
        {
          skill: "Production orale", points: "3 à 4 minutes", page: 25,
          prompt: "Partie 3 de l'épreuve : exercice en interaction. Sujet : Souvenirs de vacances. Vous êtes en vacances à Montpellier, dans le sud de la France. Vous voulez acheter des souvenirs pour vos amis et votre famille. Vous êtes dans un magasin, vous demandez des conseils au vendeur et vous vous renseignez sur les prix. (L'examinateur joue le rôle du vendeur.)",
          vi: "Đóng vai: bạn đang đi mua quà lưu niệm ở Montpellier, hỏi người bán tư vấn và hỏi giá. (giám khảo đóng vai người bán hàng)",
          model: "– Bonjour madame. – Bonjour. – Je voudrais acheter un souvenir de Montpellier pour mon père. Vous pouvez me conseiller ? Il adore lire et il aime beaucoup l'architecture. – Oui, bien sûr. Il y a un livre sur les plus beaux monuments de la ville avec de très belles photos. Il y a aussi un magazine sur l'histoire de l'architecture dans le sud de la France. – Je préfère le livre avec les photos. Quel est le prix s'il vous plaît ? – Il est à 29,99 euros. – Je vais le prendre, merci. Je cherche aussi un petit souvenir pour mon neveu, il a 7 ans. Il adore jouer bien sûr et il aime beaucoup les animaux. – Pour un enfant je vous conseille ce puzzle avec des bateaux, il plaît beaucoup aux petits. Nous avons aussi un livre de coloriages sur les animaux de la mer. – Vous avez un puzzle avec des animaux ? – Oui, j'ai un puzzle avec des éléphants mais ce ne sont pas des animaux de Montpellier ! – Ah d'accord. Alors je ne prends pas le puzzle mais je prends le livre de coloriage sur les animaux. Il coûte combien ? – Il est à 7 euros. – D'accord, merci. Pour ma meilleure amie, je cherche un tee-shirt ou une robe. Vous vendez aussi des habits ? – J'ai seulement des tee-shirts avec le nom de la ville dessus. – Vous avez un tee-shirt de couleur jaune ? C'est sa couleur préférée. – Non, désolée. Je n'ai que du blanc, du rouge et du bleu. – Dommage. Alors je vais prendre le tee-shirt rouge. Est-ce que vous avez la taille M pour ce modèle ? – Ah non, désolée. Il reste seulement les tailles S et L. – Alors je ne prends pas de tee-shirt. Ce n'est pas grave. – D'accord. Vous voulez des paquets cadeaux pour les deux livres ? – Oui, s'il vous plaît. – D'accord. Le total est à 51,14 euros s'il vous plaît. – Très bien. Je peux payer par carte ? – Oui, c'est possible. – Merci beaucoup. Bonne journée. – À vous aussi, au revoir.",
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

  b4: {

    // ── Grammaire, keyed by the grammar point index in editoGrammarA2.js ──
    // points[0]=comparaison d'équivalence, [1]=adjectifs indéfinis (chaque/
    // tout), [2]=pronoms possessifs — voir editoGrammarA2.js b4.points.
    grammar: {

      // p0 — La comparaison : l'équivalence (cahier p. 39)
      p0: [
        {
          num: 1, page: 39, audioSrc: piste(35),
          instruction: "Écoutez les phrases et dites si vous entendez une ressemblance, une équivalence ou une différence.",
          vi: "Nghe từng câu (a→g) và cho biết đó là sự giống nhau (ressemblance), bằng nhau (équivalence) hay khác nhau (différence).",
          type: "choice",
          items: [
            { q: "a.", options: ["ressemblance", "équivalence", "différence"], answer: "ressemblance", example: true },
            { q: "b.", options: ["ressemblance", "équivalence", "différence"], answer: "équivalence" },
            { q: "c.", options: ["ressemblance", "équivalence", "différence"], answer: "différence" },
            { q: "d.", options: ["ressemblance", "équivalence", "différence"], answer: "équivalence" },
            { q: "e.", options: ["ressemblance", "équivalence", "différence"], answer: "différence" },
            { q: "f.", options: ["ressemblance", "équivalence", "différence"], answer: "ressemblance" },
            { q: "g.", options: ["ressemblance", "équivalence", "différence"], answer: "différence" },
          ],
        },
        {
          num: 2, page: 39,
          instruction: "Entourez la réponse correcte.",
          vi: "Chọn đáp án đúng.",
          type: "choice",
          items: [
            { q: "Ali fait ___ poids que Paul.", options: ["le même", "la même"], answer: "le même", example: true },
            { q: "Nous ressemblons ___ à notre père qu'à notre mère.", options: ["autant", "aussi"], answer: "autant" },
            { q: "Vous ne faites pas ___ taille que Lise.", options: ["la même", "autant"], answer: "la même" },
            { q: "Ils font ___ sport que leurs voisins.", options: ["autant de", "aussi"], answer: "autant de" },
            { q: "Judith a ___ vêtements que Cécile.", options: ["les mêmes", "aussi"], answer: "les mêmes" },
            { q: "Leur mère les habille avec ___ pantalon.", options: ["autant de", "le même"], answer: "le même" },
          ],
        },
        {
          num: 3, page: 39,
          instruction: "Complétez les phrases avec aussi ou autant.",
          vi: "Điền aussi hoặc autant.",
          type: "fill",
          bank: ["aussi", "autant"],
          items: [
            { q: "Paul est ___ musclé que son frère.", answer: "aussi", example: true },
            { q: "Pourquoi tu t'intéresses ___ à la mode qu'au sport ?", answer: "autant" },
            { q: "Ma cousine est ___ brune que toi.", answer: "aussi" },
            { q: "Il achète ___ de chemises que de pantalons tous les ans.", answer: "autant" },
            { q: "Maintenant, la fille de Patrick ne ressemble plus ___ à sa mère.", answer: "autant" },
            { q: "Tu es ___ grande que ce mannequin.", answer: "aussi" },
          ],
        },
        {
          num: 4, page: 39,
          instruction: "Associez les éléments pour former des phrases.",
          vi: "Nối đầu câu với cuối câu.",
          type: "match",
          pairs: [
            { l: "Paul a",                  r: "le même menton que son frère." },
            { l: "Nos cousins ressemblent", r: "autant à Paul qu'à Louise." },
            { l: "Tu fais",                 r: "autant de sport que ta sœur." },
            { l: "Jules et Gabriel ont",    r: "les mêmes cheveux bruns." },
            { l: "Natacha est",             r: "aussi ronde que sa cousine." },
            { l: "Vous portez",             r: "la même robe que Marion Cotillard." },
            { l: "Vos cheveux sont",        r: "pareils." },
          ],
        },
      ],

      // p1 — Les adjectifs indéfinis : chaque, tout/toute/tous/toutes (cahier p. 41)
      p1: [
        {
          num: 1, page: 41, audioSrc: piste(37),
          instruction: "Écoutez et dites si vous entendez le masculin, féminin ou pluriel.",
          vi: "Nghe từng câu (a→f) và cho biết đó là giống đực, giống cái hay số nhiều.",
          type: "choice",
          items: [
            { q: "a.", options: ["masculin", "féminin", "pluriel"], answer: "féminin", example: true },
            { q: "b.", options: ["masculin", "féminin", "pluriel"], answer: "pluriel" },
            { q: "c.", options: ["masculin", "féminin", "pluriel"], answer: "féminin" },
            { q: "d.", options: ["masculin", "féminin", "pluriel"], answer: "pluriel" },
            { q: "e.", options: ["masculin", "féminin", "pluriel"], answer: "masculin" },
            { q: "f.", options: ["masculin", "féminin", "pluriel"], answer: "féminin" },
          ],
        },
        {
          num: 2, page: 41,
          instruction: "Complétez le texte avec tout, tous, toute, toutes.",
          vi: "Điền tout / tous / toute / toutes.",
          type: "fill",
          bank: ["tout", "tous", "toute", "toutes"],
          items: [
            { q: "Il a acheté ___ les magazines de mode.", answer: "tous", example: true },
            { q: "Dans ce défilé, ___ les mannequins font du 44.", answer: "tous" },
            { q: "Heureusement, ___ le monde a des qualités et des défauts.", answer: "tout" },
            { q: "Il est maniaque, il range ses affaires ___ la journée.", answer: "toute" },
            { q: "___ les compliments sont agréables à entendre !", answer: "tous" },
            { q: "___ les personnes de notre famille ont les mêmes défauts.", answer: "toutes" },
          ],
        },
        {
          num: 3, page: 41,
          instruction: "Entourez la bonne réponse.",
          vi: "Chọn đáp án đúng.",
          type: "choice",
          items: [
            { q: "Marie n'a pas ___ les défauts de sa sœur.", options: ["toutes", "chaque", "tous"], answer: "tous", example: true },
            { q: "Max change sa photo de profil ___ les semaines.", options: ["toutes", "chaque", "tous"], answer: "toutes" },
            { q: "J'aime ___ ses qualités et ses défauts.", options: ["tous", "toutes", "toute"], answer: "toutes" },
            { q: "___ jour, Nina voit la vie en rose !", options: ["Chaque", "Tout", "Tous"], answer: "Chaque" },
            { q: "___ défaut peut devenir une qualité.", options: ["Toutes", "Tous", "Chaque"], answer: "Chaque" },
            { q: "Pourquoi tu es ___ le temps inquiet ?", options: ["toute", "tout", "chaque"], answer: "tout" },
          ],
        },
        {
          num: 4, page: 41,
          instruction: "Répondez aux questions avec chaque, tout, tous, toute, toutes.",
          vi: "Trả lời câu hỏi bằng chaque / tout / tous / toute / toutes (viết cả câu).",
          type: "fill",
          items: [
            { q: "Vous êtes optimiste ?", answer: "Oui, tous les jours sont agréables !", example: true },
            { q: "Vous connaissez bien Céline ?", answer: "Oui, je connais bien Céline, je connais toutes ses qualités et toutes ses défauts." },
            { q: "Vous suivez la mode ?", answer: "Oui, chaque année, je regarde les nouvelles collections dans les magazines." },
            { q: "Vous êtes très ordonné ?", answer: "Oui, je range tout le temps mes affaires." },
            { q: "Vous êtes calme ?", answer: "Oui, je reste calme dans chaque situation." },
          ],
        },
        {
          // Exercice original : « Associez les éléments pour former des
          // phrases » — colonne a-d (Tout/Tous/Toute/Toutes) à associer à 7
          // fins de phrase numérotées 1-7. Le corrigé imprimé donne « b. 3.,
          // 5., 6. – c. 2. – d. 1. » (b associé à TROIS fins à la fois, car
          // « Tous » est compatible avec les trois — voir note dans le .md
          // source) ; « a » n'apparaît pas dans le corrigé et sa fin (n°4)
          // n'est déduite que d'une flèche imprimée marquant l'exemple. Une
          // association 1-vers-1 « colonne → fin de phrase » n'est donc pas
          // reconstructible sans ambiguïté. L'exercice est repris ici dans
          // l'autre sens — chaque fin de phrase numérotée devient un item, et
          // la réponse demandée est le mot indéfini qui la complète — ce qui
          // reste bijectif (un seul mot correct par fin de phrase) et fidèle
          // au contenu grammatical du corrigé.
          num: 5, page: 41,
          instruction: "Associez chaque fin de phrase au bon mot (tout, tous, toute, toutes).",
          vi: "Nối mỗi vế câu với từ chỉ định phù hợp (tout / tous / toute / toutes).",
          type: "fill",
          bank: ["tout", "tous", "toute", "toutes"],
          items: [
            { q: "4. (exemple) ___ le monde peut admirer son optimisme.", answer: "Tout", example: true },
            { q: "1. ___ mes amies sont chaleureuses.", answer: "Toutes" },
            { q: "2. ___ la famille se réunit pour l'anniversaire de Louis.", answer: "Toute" },
            { q: "3. ___ les enfants de Marie sont ordonnés.", answer: "Tous" },
            { q: "5. ___ nos collègues sont travailleurs.", answer: "Tous" },
            { q: "6. ___ tes voisins sont bruyants.", answer: "Tous" },
          ],
        },
      ],

      // p2 — Les pronoms possessifs (cahier p. 43)
      p2: [
        {
          num: 1, page: 43, audioSrc: piste(39),
          instruction: "Écoutez et cochez si le pronom possessif est masculin, féminin ou pluriel.",
          vi: "Nghe từng câu (a→g) và cho biết đại từ sở hữu là giống đực, giống cái hay số nhiều.",
          type: "choice",
          items: [
            { q: "a.", options: ["féminin", "masculin", "pluriel"], answer: "féminin", example: true },
            { q: "b.", options: ["féminin", "masculin", "pluriel"], answer: "pluriel" },
            { q: "c.", options: ["féminin", "masculin", "pluriel"], answer: "masculin" },
            { q: "d.", options: ["féminin", "masculin", "pluriel"], answer: "pluriel" },
            { q: "e.", options: ["féminin", "masculin", "pluriel"], answer: "féminin" },
            { q: "f.", options: ["féminin", "masculin", "pluriel"], answer: "pluriel" },
            { q: "g.", options: ["féminin", "masculin", "pluriel"], answer: "masculin" },
          ],
        },
        {
          num: 2, page: 43,
          instruction: "Associez les questions et les réponses.",
          vi: "Nối câu hỏi với câu trả lời tương ứng.",
          type: "match",
          pairs: [
            { l: "C'est votre profil ?",              r: "Oui, c'est le mien." },
            { l: "Ce sont tes photos ?",               r: "Oui, ce sont les miennes." },
            { l: "C'est la caméra de Mme Potier ?",    r: "Oui, c'est la sienne." },
            { l: "Ce sont tes chiens ?",                r: "Oui, ce sont les miens." },
            { l: "Ce sont les chats des voisins ?",     r: "Oui, ce sont les leurs." },
            { l: "C'est ta passion ?",                  r: "Oui, c'est la mienne." },
          ],
        },
        {
          num: 3, page: 43,
          instruction: "Répondez aux questions avec un pronom possessif.",
          vi: "Trả lời câu hỏi bằng đại từ sở hữu (viết cả câu).",
          type: "fill",
          items: [
            { q: "– C'est ton copain ?", answer: "Oui, c'est le mien.", example: true },
            { q: "– Cette veste est à toi ?", answer: "Oui, c'est la mienne." },
            { q: "– Ce téléphone est à Pierre ?", answer: "Oui, c'est le sien." },
            { q: "– Cette tablette est à Cyril et Delphine ?", answer: "Oui, c'est la leur." },
            { q: "– Ces photos de vacances sont à Léa et toi ?", answer: "Oui, ce sont les nôtres." },
            { q: "– Ce profil est à toi ?", answer: "Oui, c'est le mien." },
            { q: "– Ces magazines sont à Lisa ?", answer: "Oui, ce sont les siens." },
          ],
        },
        {
          num: 4, page: 43,
          instruction: "Complétez les phrases avec un pronom possessif.",
          vi: "Điền đại từ sở hữu phù hợp.",
          type: "fill",
          items: [
            { q: "Tu utilises ton profil et moi, j'utilise ___.", answer: "le mien", example: true },
            { q: "J'ai oublié mon appareil photo, Lucie me prête ___.", answer: "le sien" },
            { q: "Louis n'a plus d'idées, tu lui donnes ___.", answer: "les tiennes" },
            { q: "Solène me présente ses amis, je lui montre ___.", answer: "les miens" },
            { q: "Tu photographies tes enfants et ils photographient ___.", answer: "les leurs" },
            { q: "Je vous prête ma caméra et vous me prêtez ___.", answer: "la vôtre" },
            { q: "Ils montrent leurs photos et nous montrons ___.", answer: "les nôtres" },
          ],
        },
      ],
    },

    // ── Phonie-graphie (cahier p. 44) — wired into the Phono step ─────
    // Seules Discrimination (act. 1) et Dictée (act. 3) ont une réponse
    // vérifiable. Articulation (act. 2, dialogues à répéter) et
    // Interprétation (act. 4, citation de Gabrielle Chanel à lire à voix
    // haute) restent des exercices oraux sans réponse unique — même choix
    // que pour les autres unités.
    phono: [
      {
        // Trois séries de sons distinctes sur cette page (au lieu d'une
        // seule comme dans les autres unités) : [i]/[ɛ̃], [a]/[ɑ̃], [ɔ]/[ɔ̃].
        num: 1, page: 44, audioSrc: piste(40),
        instruction: "Discrimination — écoutez et cochez le son que vous entendez, dans les trois séries proposées.",
        vi: "Nghe và chọn âm đúng nghe được, trong 3 chuỗi câu hỏi khác nhau.",
        type: "choice",
        items: [
          { q: "[i] (« vrai ») ou [ɛ̃] (« vingt ») — a. la mienne / le mien", options: ["la mienne", "le mien"], answer: "le mien", example: true },
          { q: "[i] ou [ɛ̃] — b. elles viennent / elle vient", options: ["elles viennent", "elle vient"], answer: "elles viennent" },
          { q: "[i] ou [ɛ̃] — c. la sienne / le sien", options: ["la sienne", "le sien"], answer: "le sien" },
          { q: "[a] (« la ») ou [ɑ̃] (« an ») — a. des grammes / des grands", options: ["des grammes", "des grands"], answer: "des grammes" },
          { q: "[a] ou [ɑ̃] — b. une dame / une dent", options: ["une dame", "une dent"], answer: "une dent" },
          { q: "[a] ou [ɑ̃] — c. il passe / il pense", options: ["il passe", "il pense"], answer: "il pense" },
          { q: "[ɔ] (« dort ») ou [ɔ̃] (« on ») — a. la mode / le monde", options: ["la mode", "le monde"], answer: "le monde" },
          { q: "[ɔ] ou [ɔ̃] — b. elle est bonne / il est bon", options: ["elle est bonne", "il est bon"], answer: "elle est bonne" },
          { q: "[ɔ] ou [ɔ̃] — c. il sort / ils sont", options: ["il sort", "ils sont"], answer: "ils sont" },
        ],
      },
      {
        num: 3, page: 44, audioSrc: piste(42),
        instruction: "Dictée — écoutez le texte et complétez les mots.",
        vi: "Nghe và điền các âm còn thiếu.",
        type: "fill",
        items: [
          { q: "Être mannequ___ est ___ métier qui fait rêver. (2 từ)", answer: "in un", example: true },
          { q: "___ général, Il faut être gr___, jeune et m___ce. (3 từ)", answer: "En and ince" },
          { q: "Mais heureusem___ le m___de ch___e (3 từ)", answer: "ent onde ange" },
          { q: "et les mannequ___s différ___s s___t mieux acceptés et ___ beaucoup de succès ! (4 từ)", answer: "ins ents ont ont" },
        ],
      },
    ],

    // ── Vocabulaire, keyed to match the Parcours vocab steps ──────────
    // c1_vocab (cahier p. 40) couvre b4g1-b4g3 (tête/visage, corps/
    // apparence, mode) ; c2_vocab (cahier p. 42) couvre b4g4-b4g5
    // (qualités, défauts) — voir parcoursDataA2.js.
    vocab: {
      c1_vocab: [
        {
          num: 1, page: 40, audioSrc: piste(36),
          instruction: "Qui suis-je ? Écoutez et trouvez à qui correspond la description (1. Rose – 2. Gaëlle – 3. Mona – 4. André – 5. Joachim).",
          vi: "Nghe và tìm ra người được miêu tả trong mỗi đoạn (a→e).",
          type: "fill",
          transcript: "a. « Je suis blonde. J'ai les cheveux longs et j'ai les yeux bleus… Je suis très jeune » (Rose) — b. « Je suis brun, j'ai les cheveux courts… je suis barbu. J'ai des fossettes… » (Joachim) — c. « J'ai les cheveux longs et blancs, je ne suis plus très jeune, j'ai les yeux clairs » (Mona) — d. « Je suis barbu et je suis dégarni… Je suis âgé » (André) — e. « Je suis brune et j'ai les cheveux longs… J'ai une fossette quand je souris » (Gaëlle).",
          items: [
            { q: "a.", answer: "1. Rose", example: true },
            { q: "b.", answer: "5. Joachim" },
            { q: "c.", answer: "3. Mona" },
            { q: "d.", answer: "4. André" },
            { q: "e.", answer: "2. Gaëlle" },
          ],
        },
        {
          // « jeune » est barré dans la liste de mots proposée par le cahier
          // (déjà utilisé comme exemple) — il n'est donc pas repris dans le
          // bank ci-dessous, comme dans le texte source.
          num: 2, page: 40,
          instruction: "Complétez le texte avec les mots suivants : costaud – défile – se sent bien dans sa peau – porte des vêtements – musclé – mesure – sosie – créateur – fait – chauve.",
          vi: "Điền từ cho sẵn vào đoạn văn (« jeune » đã dùng làm ví dụ nên không nằm trong danh sách từ).",
          type: "fill",
          bank: ["costaud", "défile", "se sent bien dans sa peau", "porte des vêtements", "musclé", "mesure", "sosie", "créateur", "fait", "chauve"],
          items: [
            { q: "Lise a 26 ans, elle est ___ (26 tuổi).", answer: "jeune", example: true },
            { q: "elle ___ 1,78 m,", answer: "mesure" },
            { q: "elle ___ du 34 : elle est très mince.", answer: "fait" },
            { q: "Elle travaille pour un grand ___ de vêtements,", answer: "créateur" },
            { q: "elle ___ pour présenter la nouvelle collection.", answer: "défile" },
            { q: "Elle ___ originaux, qui la rendent encore plus belle.", answer: "porte des vêtements" },
            { q: "Elle ressemble beaucoup à l'actrice Audrey Tautou : c'est son ___.", answer: "sosie" },
            { q: "Amaury… il est ___ parce qu'il fait beaucoup de sport", answer: "costaud" },
            { q: "donc il est ___.", answer: "musclé" },
            { q: "Il est jeune mais il a déjà perdu ses cheveux, il est ___.", answer: "chauve" },
            { q: "Pour lui, ce n'est pas un problème parce qu'il ___.", answer: "se sent bien dans sa peau" },
          ],
        },
        {
          // ⚠️ Note du corrigé source : le corrigé imprimé donne littéralement
          // « a. sosie – b. ressembler – c. chauve – d. poser – e. beau –
          // f. vieux ». La logique de chaque intrus est reproduite ici telle
          // qu'imprimée, sans réinterprétation.
          num: 3, page: 40,
          instruction: "Barrez l'intrus.",
          vi: "Tìm từ lạc loài trong mỗi nhóm.",
          type: "choice",
          items: [
            { q: "a.", options: ["menton", "sosie", "sourire", "barbu"], answer: "sosie", example: true },
            { q: "b.", options: ["créateur", "ressembler", "vêtements", "défiler"], answer: "ressembler" },
            { q: "c.", options: ["chauve", "sec", "musclé", "costaud"], answer: "chauve" },
            { q: "d.", options: ["avoir bonne mine", "poser", "avoir un corps parfait", "être bien dans sa peau"], answer: "poser" },
            { q: "e.", options: ["beau", "vieux", "rond", "corpulent"], answer: "vieux" },
            { q: "f.", options: ["bruns", "gris", "longs", "vieux"], answer: "vieux" },
          ],
        },
        {
          num: 4, page: 40,
          instruction: "Dites le contraire.",
          vi: "Viết câu trái nghĩa.",
          type: "fill",
          items: [
            { q: "Roméo est sec. → Samy est ___.", answer: "musclé", example: true },
            { q: "Agnès est jeune. Louise est ___.", answer: "vieille" },
            { q: "Susie a mauvaise mine. Léa a ___.", answer: "bonne mine" },
            { q: "Paul a beaucoup de cheveux. Son père est ___.", answer: "chauve" },
            { q: "Jérémy est de petite taille. Valentin est ___.", answer: "de grande taille" },
            { q: "Pauline a un corps parfait. Justine a ___.", answer: "un corps imparfait" },
            { q: "Akim a beaucoup de cheveux. Léo est ___.", answer: "chauve" },
          ],
        },
      ],

      c2_vocab: [
        {
          num: 1, page: 42, audioSrc: piste(38),
          instruction: "Écoutez et dites si on parle de la qualité ou du défaut d'une personne.",
          vi: "Nghe từng câu (a→h) và cho biết đó là điểm tốt (qualité) hay điểm xấu (défaut).",
          type: "choice",
          items: [
            { q: "a.", options: ["qualité", "défaut"], answer: "défaut", example: true },
            { q: "b.", options: ["qualité", "défaut"], answer: "qualité" },
            { q: "c.", options: ["qualité", "défaut"], answer: "qualité" },
            { q: "d.", options: ["qualité", "défaut"], answer: "défaut" },
            { q: "e.", options: ["qualité", "défaut"], answer: "qualité" },
            { q: "f.", options: ["qualité", "défaut"], answer: "défaut" },
            { q: "g.", options: ["qualité", "défaut"], answer: "défaut" },
            { q: "h.", options: ["qualité", "défaut"], answer: "qualité" },
          ],
        },
        {
          // ⚠️ Note du corrigé source : le corrigé imprimé porte « b. maniaque
          // – c. fidèle – d. chaleureux – d. peureux – e. pessimiste –
          // f. autoritaire », avec la lettre d répétée deux fois et aucune
          // lettre g — probable coquille d'impression (décalage à partir du
          // deuxième « d. »). Les réponses ci-dessous appliquent la
          // correction logique (d→e→f→g) via la correspondance évidente
          // entre chaque citation et le trait de caractère associé.
          num: 2, page: 42,
          instruction: "Dites quel est le trait de caractère de chaque personne.",
          vi: "Xác định tính cách qua từng câu trích dẫn.",
          type: "fill",
          items: [
            { q: "« La vie est belle, il fait beau, demain va être aussi agréable qu'aujourd'hui. »", answer: "optimiste", example: true },
            { q: "« Je ne supporte pas le désordre, tout doit être propre et à sa place ! »", answer: "maniaque" },
            { q: "« Mon ami Pierre est très important pour moi, je lui téléphone souvent et je le vois régulièrement. »", answer: "fidèle" },
            { q: "« Entrez chez moi, je suis content de vous voir, qu'est-ce que vous voulez boire ? »", answer: "chaleureux" },
            { q: "« Rentrer seul chez moi le soir, oh non, je préfère ne pas sortir, je ne suis pas tranquille. »", answer: "peureux" },
            { q: "« Je suis sûr que ça va mal se passer, la vie est toujours difficile ! »", answer: "pessimiste" },
            { q: "« Tu vas faire ce que je te demande et tu ne dis rien ! »", answer: "autoritaire" },
          ],
        },
        {
          // ⚠️ Note du corrigé source : même type de coquille que l'exercice
          // 2 (« b. menteur – b. réfléchi – c. envieuse – d. discret –
          // e. curieuse », lettre b répétée). Les réponses ci-dessous
          // appliquent la correspondance logique avec l'énoncé de chaque
          // phrase (c→réfléchi, d→envieuse, e→discret, f→curieuse).
          num: 3, page: 42,
          instruction: "Comment sont-ils ? Complétez avec une qualité ou un défaut.",
          vi: "Điền tính từ chỉ tính cách phù hợp.",
          type: "fill",
          items: [
            { q: "Sophie parle facilement avec tout le monde, elle est ___.", answer: "spontanée", example: true },
            { q: "Paul ne dit pas la vérité à ses amis, il est ___.", answer: "menteur" },
            { q: "Gabriel pense beaucoup avant de dire ou de faire quelque chose, il est ___.", answer: "réfléchi" },
            { q: "Lou veut avoir les mêmes vêtements que ses amies, elle est ___.", answer: "envieuse" },
            { q: "Anatole ne fait pas de bruit, personne ne le remarque, il est ___.", answer: "discret" },
            { q: "Paloma s'intéresse à tout, elle pose des questions, elle est ___.", answer: "curieuse" },
          ],
        },
        {
          num: 4, page: 42,
          instruction: "Trouvez l'expression correspondant à l'image.",
          vi: "Tìm thành ngữ ứng với hình ảnh.",
          type: "fill",
          items: [
            { q: "âne perplexe", answer: "être têtu comme une mule" },
            { q: "éléphant qui réfléchit", answer: "avoir une mémoire d'éléphant" },
            { q: "chat aux yeux perçants", answer: "avoir des yeux de lynx" },
          ],
        },
      ],
    },

    // ── Bilan linguistique (cahier p. 46-47, noté /40) ────────────────
    // Wired into the "L'essentiel" step, alongside the AI-generated quiz.
    // La Compréhension écrite & Production orale de la page 45 (« La
    // musique et notre personnalité ») n'a pas de piste audio — elle est
    // reprise ici (items 8-10), après le /40 linguistique, même pattern que
    // la CO p.141 ajoutée à la suite du bilan de b12. Sa Production orale
    // (jeu de rôle, réponses libres) est rangée dans delf.production. Les
    // Jeux p.50 (items 11-14) suivent, même pattern que b9/b12.
    bilan: [
      {
        // Le tableau jumbled du corrigé source ne fournit pas toujours assez
        // de jetons pour reconstruire la phrase imprimée telle quelle (ex. c
        // et g ont besoin de « qu'à »/« qu'au », absents du découpage
        // imprimé). Les jetons ci-dessous sont donc redécoupés au niveau du
        // mot/groupe directement depuis la phrase corrigée, comme pour
        // l'exercice équivalent de b12.
        num: 1, page: 46,
        instruction: "Remettez les mots dans l'ordre pour former des phrases. (/7)",
        vi: "Sắp xếp lại từ để tạo thành câu đúng.",
        type: "order",
        items: [
          { tokens: ["sourire", "le même", "que", "Noémie", "a", "sa", "sœur."], answer: ["Noémie", "a", "le même", "sourire", "que", "sa", "sœur."], example: true },
          { tokens: ["tous", "n'avons", "le même", "pas", "Nous", "caractère."], answer: ["Nous", "n'avons", "pas", "tous", "le même", "caractère."] },
          { tokens: ["à", "sa", "ressemble", "mère", "Il", "autant", "qu'à", "son", "père."], answer: ["Il", "ressemble", "autant", "à", "sa", "mère", "qu'à", "son", "père."] },
          { tokens: ["musclé", "aussi", "Cet", "que", "ce", "sportif professionnel.", "acteur", "est"], answer: ["Cet", "acteur", "est", "aussi", "musclé", "que", "ce", "sportif professionnel."] },
          { tokens: ["cheveux", "aussi", "les", "longs", "Vous", "que", "avez", "votre amie."], answer: ["Vous", "avez", "les", "cheveux", "aussi", "longs", "que", "votre amie."] },
          { tokens: ["les mêmes", "pas", "ne", "vêtements", "Tu", "que", "Joachim.", "portes"], answer: ["Tu", "ne", "portes", "pas", "les mêmes", "vêtements", "que", "Joachim."] },
          { tokens: ["à la mode", "autant", "cinéma.", "Je", "qu'au", "m'intéresse"], answer: ["Je", "m'intéresse", "autant", "à la mode", "qu'au", "cinéma."] },
        ],
      },
      {
        num: 2, page: 46,
        instruction: "Complétez les phrases avec tout, tous, toute, toutes ou chaque. (/7)",
        vi: "Điền tout / tous / toute / toutes / chaque.",
        type: "fill",
        bank: ["tout", "tous", "toute", "toutes", "chaque"],
        items: [
          { q: "___ ses amis sont sympathiques.", answer: "Tous" },
          { q: "Les mannequins défilent ___ année pour présenter la nouvelle collection.", answer: "chaque" },
          { q: "J'aime cet acteur pour ___ ses qualités.", answer: "toutes" },
          { q: "Vous connaissez ___ la collection automne-hiver ?", answer: "toute" },
          { q: "___ le monde lui fait des compliments pour son travail.", answer: "Tout" },
          { q: "Vous portez ___ ces vêtements ?", answer: "tous" },
          { q: "___ jour, Olivia choisit une tenue différente.", answer: "Chaque" },
        ],
      },
      {
        num: 3, page: 46,
        instruction: "Entourez la réponse correcte. (/6)",
        vi: "Chọn đáp án đúng.",
        type: "choice",
        items: [
          { q: "– Ces albums photos sont à vous ? – Oui, ce sont ___.", options: ["les nôtres", "les vôtres"], answer: "les nôtres" },
          { q: "– C'est le sosie de Fanny ? – Oui, c'est ___.", options: ["le sien", "le leur"], answer: "le sien" },
          { q: "– Ce sont les petits-enfants de vos voisins ? – Oui, ce sont ___.", options: ["les siennes", "les leurs"], answer: "les leurs" },
          { q: "– C'est ta tablette ? – Oui, c'est ___.", options: ["la mienne", "la tienne"], answer: "la mienne" },
          { q: "– C'est la photo de classe de Théo et Élise ? – Oui, c'est ___.", options: ["le leur", "la leur"], answer: "la leur" },
          { q: "– Macha, c'est ton amie ? – Oui, c'est ___.", options: ["la mienne", "le mien"], answer: "la mienne" },
        ],
      },
      {
        num: 4, page: 46,
        instruction: "Vocabulaire — Écrivez le commentaire correspondant à la photo. (/5)",
        vi: "Chọn câu bình luận phù hợp với hình ảnh.",
        type: "fill",
        bank: ["Je suis dégarni.", "Je suis musclé.", "J'ai bonne mine.", "J'ai une fossette.", "J'ai trouvé mon sosie !"],
        items: [
          { q: "homme qui rit", answer: "J'ai une fossette." },
          { q: "homme qui se touche le crâne", answer: "Je suis dégarni." },
          { q: "homme musclé qui crie", answer: "Je suis musclé." },
          { q: "dessin ancien + homme au chapeau", answer: "J'ai trouvé mon sosie !" },
          { q: "femme souriante", answer: "J'ai bonne mine." },
        ],
      },
      {
        num: 5, page: 47,
        instruction: "Vocabulaire — Complétez les phrases avec les mots ou expressions. (/5)",
        vi: "Điền từ/cụm từ phù hợp.",
        type: "fill",
        items: [
          { q: "Marie mesure 1,80 m, elle est de ___.", answer: "grande taille" },
          { q: "Paul mesure 1,70 m et pèse 85 kg, il est ___.", answer: "corpulent" },
          { q: "Depuis qu'Olivia accepte son corps, elle se sent mieux dans sa ___.", answer: "peau" },
          { q: "Pour photographier les mannequins, le créateur leur demande de ___.", answer: "poser" },
          { q: "Cet acteur ___ à Napoléon alors il peut jouer le rôle dans ce film historique.", answer: "ressemble" },
        ],
      },
      {
        num: 6, page: 47,
        instruction: "Vocabulaire — À quels qualités ou défauts correspondent les définitions suivantes ? (/5)",
        vi: "Tìm tính từ chỉ tính cách ứng với định nghĩa.",
        type: "fill",
        items: [
          { q: "Qui dit toujours la vérité", answer: "honnête" },
          { q: "Qui aime commander les autres", answer: "autoritaire" },
          { q: "Qui ne change pas d'idée", answer: "têtu" },
          { q: "Qui veut avoir ce que les autres possèdent", answer: "envieux" },
          { q: "Qui s'intéresse aux autres", answer: "curieux" },
        ],
      },
      {
        // Le corrigé source ne donne que la lettre (« 1. b. – 2. a. – 3. b. –
        // 4. b. ») ; le texte des deux propositions (a/b) pour chaque image
        // n'est pas reproduit dans le .md transcrit. La réponse demandée
        // ci-dessous est donc la lettre elle-même, comme pour des cas
        // similaires ailleurs dans ce fichier (ex. b12 DELF CE).
        num: 7, page: 47,
        instruction: "Vocabulaire — Entourez la phrase qui correspond à l'image (répondez avec la lettre a ou b, imprimée dans le corrigé). (/5)",
        vi: "Ghi chữ cái (a hoặc b) của câu đúng ứng với hình ảnh — văn bản đầy đủ của 2 lựa chọn không có trong bản gốc được số hoá.",
        type: "fill",
        items: [
          { q: "1. homme, main sur le cœur", answer: "b" },
          { q: "2. femme perplexe", answer: "a" },
          { q: "3. homme endormi sur le canapé", answer: "b" },
          { q: "4. femme qui nettoie", answer: "b" },
        ],
      },
      {
        // Page 45 — Compréhension écrite, article « Vos goûts musicaux
        // révèlent votre personnalité » (© ETX Studio). Pas de piste audio.
        num: 8, page: 45,
        instruction: "Compréhension écrite — « La musique et notre personnalité ». Cochez les bonnes réponses.",
        vi: "Đọc bài về sở thích âm nhạc và tính cách rồi chọn đáp án đúng.",
        type: "choice",
        items: [
          { q: "Ce texte présente :", options: ["les goûts des musiciens dans le monde", "les goûts musicaux et les traits de caractère", "les styles de musique en Europe et en Australie"], answer: "les goûts musicaux et les traits de caractère" },
          { q: "Les chercheurs ont fait une étude :", options: ["en Europe et en Australie", "dans plus de 50 pays", "en Inde, en France et en Australie"], answer: "dans plus de 50 pays" },
          { q: "Les personnes qui aiment la compagnie des autres aiment :", options: ["les musiques rythmées", "le jazz", "les musiques douces"], answer: "les musiques douces" },
        ],
      },
      {
        num: 9, page: 45,
        instruction: "Compréhension écrite — Vrai ou faux ?",
        vi: "Đúng hay sai?",
        type: "truefalse",
        items: [
          { q: "Nous n'aimons pas les mêmes musiques quand nous sommes de nationalité différente.", answer: false },
          { q: "Quand on aime le jazz, en général, on s'intéresse aux autres et aux choses.", answer: true },
        ],
      },
      {
        num: 10, page: 45,
        instruction: "Vocabulaire — Que signifie l'expression « avoir tendance à » ?",
        vi: "« Avoir tendance à » có nghĩa là gì?",
        type: "choice",
        items: [
          { q: "« avoir tendance à » signifie :", options: ["Préférer", "Être à la mode", "Avoir besoin de"], answer: "Préférer" },
        ],
      },
      {
        // Page 50 — Jeux, act. 1 : Micmac ! (associer phrases et images).
        num: 11, page: 50,
        instruction: "Jeux — Micmac ! Associez les phrases aux bonnes images (1. homme pensif ; 2. groupe surpris ; 3. homme souriant, pouces levés ; 4. femme qui écoute).",
        vi: "Nối câu với hình ảnh tương ứng.",
        type: "match",
        pairs: [
          { l: "« Je suis optimiste. »", r: "Image 3 (homme souriant, pouces levés)" },
          { l: "« Je suis curieuse. »",  r: "Image 4 (femme qui écoute)" },
          { l: "« Ils sont peureux. »",  r: "Image 2 (groupe surpris)" },
          { l: "« Je suis réfléchi. »",  r: "Image 1 (homme pensif)" },
        ],
      },
      {
        num: 12, page: 50,
        instruction: "Jeux — Remettez les lettres dans l'ordre pour trouver des traits de caractère.",
        vi: "Sắp xếp lại chữ cái để tìm ra tính từ chỉ tính cách.",
        type: "fill",
        items: [
          { q: "HAUCELXRUE", answer: "chaleureux" },
          { q: "CHÉFRLIÉ", answer: "réfléchi" },
          { q: "FECIPSILEUR", answer: "superficiel" },
          { q: "QIAMUNAE", answer: "maniaque" },
          { q: "ESEUTIPÉNRTE", answer: "prétentieuse" },
        ],
      },
      {
        // Page 50 — Jeux, act. 4 : grille de mots mêlés. Les 6 mots et leur
        // position sont donnés avec certitude dans le corrigé source.
        num: 13, page: 50,
        instruction: "Jeux — Retrouvez 6 mots en relation avec la tête et le visage (grille de mots mêlés).",
        vi: "Tìm 6 từ liên quan đến đầu và khuôn mặt trong bảng chữ.",
        type: "fill",
        items: [
          { q: "1re ligne, horizontal", answer: "SOURIRE" },
          { q: "3e ligne, horizontal", answer: "CHEVEUX" },
          { q: "colonne 6, vertical", answer: "BARBU" },
          { q: "colonne 1, vertical", answer: "CHAUVE" },
          { q: "colonne 10, vertical", answer: "FOSSETTE" },
          { q: "dernière ligne, horizontal", answer: "MENTON" },
        ],
      },
      {
        num: 14, page: 50,
        instruction: "Jeux — Charades : qu'est-ce que c'est ?",
        vi: "Giải câu đố ghép chữ.",
        type: "fill",
        items: [
          { q: "Mon premier est le contraire de « avec » ; mon deuxième est une forme à la première personne du verbe « avoir » ; mon troisième est une partie de la forme négative ; mon tout qualifie une personne qui est impolie en société.", answer: "sans-gêne" },
          { q: "Mon premier est un métal précieux ; mon deuxième est une partie du corps ; mon troisième est une partie du visage ; mon tout qualifie une personne qui range bien ses affaires.", answer: "ordonné" },
        ],
      },
    ],

    // ── DELF A2 blanc (cahier p. 48-49) ────────────────────────────
    // Le livre n'a pas de page « Préparation au DELF » propre à l'Unité 4
    // (ni écoute DELF dans editoAudioA2.js, ni lecture DELF dans
    // editoA2Reading.js pour b4) — donc pas de coLivre, même pattern que
    // b2/b5/b7/b9/b12. Le Parcours de cette unité ne route d'ailleurs pas
    // vers DelfA2Panel (pas de step "delf-a2" dans STEP_GROUPS_B4).
    delf: {
      co: [
        {
          num: 1, page: 48, audioSrc: piste(44),
          instruction: "Compréhension de l'oral — vous écoutez des annonces publiques. Répondez avec la lettre A, B ou C. (6 points)",
          vi: "Nghe 6 thông báo nơi công cộng rồi chọn đáp án đúng (A/B/C).",
          type: "fill",
          items: [
            { q: "1. Quel enfant est attendu ? (photos A · B · C)", answer: "A" },
            { q: "2. Que va faire la mannequin ? (A. Un défilé de mode · B. Une séance de dédicaces · C. Une interview avec ses fans)", answer: "C" },
            { q: "3. Vous pouvez gagner… (A. de l'argent · B. une séance photo en famille · C. un appareil photo)", answer: "B" },
            { q: "4. Le coach aide à développer… (A. vos qualités personnelles · B. vos connaissances informatiques · C. vos compétences professionnelles)", answer: "A" },
            { q: "5. Pour candidater, vous devez… (A. aller à l'agence · B. écrire un courriel · C. créer un dossier en ligne)", answer: "B" },
            { q: "6. Que pourrez-vous faire ? (A. Rencontrer des artistes · B. Dessiner dans un atelier · C. Préparer des plats sucrés)", answer: "A" },
          ],
        },
      ],
      // Compréhension des écrits — « Photo de classe », article sur
      // l'histoire et l'évolution des photos de classe (source : slate.fr).
      ce: [
        {
          num: 1, page: 48,
          instruction: "Compréhension des écrits — « Photo de classe ». Répondez avec la lettre A, B ou C. (7 points)",
          vi: "Đọc bài về ảnh lớp học rồi chọn đáp án đúng (A/B/C).",
          type: "fill",
          items: [
            { q: "1. D'après l'article, les photos de classe sont… (A. adorées · B. critiquées · C. inutilisées) par les parents.", answer: "A" },
            { q: "2. D'après l'article, les photos de classe évoluent avec le temps. (A. Vrai · B. Faux)", answer: "B" },
            { q: "3. Selon l'article, les habits des élèves donnent des informations sur… (A. leur milieu social · B. la mode de l'époque · C. les températures de saison)", answer: "B" },
            { q: "4. La vente des photos est utile pour… (A. payer les voyages des élèves · B. donner de l'argent au photographe · C. financer la construction d'autres écoles)", answer: "A" },
            { q: "5. Les photos sont mises sur Internet pour… (A. retrouver des amis · B. féliciter les professeurs · C. partager avec ses enfants)", answer: "A" },
          ],
        },
      ],
      // Production — no auto-grading; the cahier's model answer is the yardstick.
      production: [
        {
          skill: "Production écrite", points: "12,5 points", page: 49,
          prompt: "Vous êtes parti(e) en vacances avec un(e) collègue de travail. Vous écrivez un courriel à un(e) ami(e) francophone pour lui raconter vos vacances. Vous décrivez votre collègue et son caractère. Vous donnez vos impressions sur votre voyage. (60 mots minimum)",
          vi: "Viết thư kể cho bạn Pháp nghe về chuyến du lịch với đồng nghiệp, mô tả tính cách đồng nghiệp và cảm nghĩ về chuyến đi. (tối thiểu 60 từ)",
          model: "Salut Léo, Tu as passé de bonnes vacances ? Je suis parti avec mon collègue, Jean, pendant dix jours à Paris. C'était super ! Jean est très gentil. Il adore jouer au tennis et visiter des musées. Nous avons visité le Louvre et nous avons adoré. Les peintures sont très belles mais il y avait beaucoup de monde. À bientôt, Éric",
        },
        {
          // Page 45 — Production orale (jeu de rôle à deux, pas notée DELF) :
          // pas de corrigé unique dans le cahier ("Réponses libres").
          skill: "Production orale — jeu de rôle (page 45)", points: "réponses libres", page: 45,
          prompt: "À deux. Choisissez la fiche A ou B. Apprenant A : Vous participez à l'émission de radio Histoires d'amitiés. Le/La journaliste vous demande de présenter votre meilleur(e) ami(e), ses qualités et ses défauts, et les ressemblances ou différences dans vos caractères. Apprenant B : Vous êtes journaliste, vous animez l'émission et posez ces questions à votre invité(e).",
          vi: "Đóng vai theo cặp: người A giới thiệu bạn thân của mình (ưu/nhược điểm, điểm giống/khác) trên đài phát thanh; người B đóng vai nhà báo phỏng vấn. (Réponses libres — không có đáp án mẫu duy nhất trong cahier.)",
          model: "Réponses libres — le cahier ne donne pas de corrigé unique pour ce jeu de rôle.",
        },
        {
          // ⚠️ Note du corrigé source : contrairement aux autres épreuves de
          // production de cette unité, aucun exemple de production n'est
          // fourni dans les Corrigés imprimés pour cette question de
          // monologue suivi — l'incertitude est signalée telle quelle,
          // sans exemple inventé.
          skill: "Production orale — DELF, monologue suivi", points: "2 minutes environ", page: 49,
          prompt: "Partie 2 de l'épreuve : monologue suivi (2 minutes environ). Sujet : Amitié. Décrivez votre meilleur(e) ami(e). Parlez de son physique. Quelles sont ses qualités ? Ses défauts ? Pourquoi est-ce qu'il/elle est votre meilleur(e) ami(e) ?",
          vi: "Nói 2 phút mô tả bạn thân: ngoại hình, ưu điểm, nhược điểm, vì sao là bạn thân.",
          model: "Réponses libres — aucun exemple de production n'est fourni dans les Corrigés du cahier pour cette question.",
        },
      ],
    },
  },
  b5: {

    // ── Grammaire, keyed by the grammar point index in editoGrammarA2.js ──
    grammar: {

      // p0 — Le futur simple (cahier p. 51)
      p0: [
        {
          // Seul le corrigé (présent/futur par cas) est imprimé — les phrases
          // individuelles ne sont pas retranscrites dans le cahier (même
          // traitement que b2 p0 num1 / p2 num1).
          num: 1, page: 51, audioSrc: piste(45),
          instruction: "Écoutez et dites si la phrase est au présent ou au futur simple.",
          vi: "Nghe từng câu (a→g) và cho biết câu đó ở thì hiện tại hay futur simple.",
          type: "choice",
          items: [
            { q: "a. (exemple)", options: ["présent", "futur simple"], answer: "présent", example: true },
            { q: "b.", options: ["présent", "futur simple"], answer: "futur simple" },
            { q: "c.", options: ["présent", "futur simple"], answer: "présent" },
            { q: "d.", options: ["présent", "futur simple"], answer: "futur simple" },
            { q: "e.", options: ["présent", "futur simple"], answer: "futur simple" },
            { q: "f.", options: ["présent", "futur simple"], answer: "présent" },
            { q: "g.", options: ["présent", "futur simple"], answer: "futur simple" },
          ],
        },
        {
          num: 2, page: 51,
          instruction: "Entourez le verbe correct.",
          vi: "Chọn dạng động từ đúng.",
          type: "choice",
          items: [
            { q: "Ils ___ l'intelligence artificielle pour fabriquer ce robot.", options: ["utiliseront", "utilisera"], answer: "utiliseront", example: true },
            { q: "En 2050, tu ___ l'évolution des machines.", options: ["verras", "verrai"], answer: "verras" },
            { q: "La semaine prochaine, elle ___ un robot très utile.", options: ["fabriquera", "fabriqueras"], answer: "fabriquera" },
            { q: "Vous ___ imprimer cet objet en 3D ?", options: ["pourrez", "pourrai"], answer: "pourrez" },
            { q: "Avec un moteur électrique, l'appareil ne ___ pas en panne.", options: ["tombera", "tomberas"], answer: "tombera" },
            { q: "Je ___ cette innovation au salon des technologies.", options: ["découvrira", "découvrirai"], answer: "découvrirai" },
          ],
        },
        {
          num: 3, page: 51,
          instruction: "Conjuguez les verbes entre parenthèses au futur simple.",
          vi: "Chia động từ trong ngoặc ở futur simple.",
          type: "fill",
          items: [
            { q: "Ils (être) ___ au salon des innovations technologiques.", answer: "seront", example: true },
            { q: "Où (vivre) ___-tu l'année prochaine ?", answer: "vivras" },
            { q: "Ils (aller) ___ travailler avec de nouveaux moyens de transport.", answer: "iront" },
            { q: "Je (voir) ___ comment organiser mon travail à distance.", answer: "verrai" },
            { q: "Les étudiants (avoir) ___ des cours avec un hologramme.", answer: "auront" },
            { q: "Qu'est-ce que vous (faire) ___ après vos cours à l'université ?", answer: "ferez" },
            { q: "Je ne (pouvoir) ___ pas me téléporter !", answer: "pourrai" },
          ],
        },
        {
          num: 4, page: 51,
          instruction: "Transformez les phrases au présent au futur simple.",
          vi: "Chuyển câu từ hiện tại sang futur simple.",
          type: "transform",
          items: [
            { q: "Il invente un logiciel.", answer: "Demain, il inventera un logiciel.", example: true },
            { q: "Pauline veut changer de voiture.", answer: "Demain, Pauline voudra aussi changer de voiture." },
            { q: "Nous fabriquons des objets pratiques.", answer: "L'année prochaine, nous fabriquerons aussi des objets pratiques." },
            { q: "Vous savez travailler à distance.", answer: "Dans le futur, vous saurez aussi travailler à distance." },
            { q: "Il y a des cours avec des hologrammes.", answer: "Demain, il y aura aussi des cours avec des hologrammes." },
            { q: "Des robots ménagers font des tâches domestiques.", answer: "Dans le futur, des robots ménagers feront aussi des tâches domestiques." },
          ],
        },
      ],

      // p1 — La condition avec si (cahier p. 53)
      p1: [
        {
          num: 1, page: 53, audioSrc: piste(47),
          instruction: "Écoutez les phrases et cochez la structure entendue.",
          vi: "Nghe từng câu (a→f) và cho biết cấu trúc nào được dùng.",
          type: "choice",
          items: [
            { q: "a. (exemple)", options: ["Si + présent + présent", "Si + présent + impératif", "Si + présent + futur"], answer: "Si + présent + impératif", example: true },
            { q: "b.", options: ["Si + présent + présent", "Si + présent + impératif", "Si + présent + futur"], answer: "Si + présent + présent" },
            { q: "c.", options: ["Si + présent + présent", "Si + présent + impératif", "Si + présent + futur"], answer: "Si + présent + futur" },
            { q: "d.", options: ["Si + présent + présent", "Si + présent + impératif", "Si + présent + futur"], answer: "Si + présent + futur" },
            { q: "e.", options: ["Si + présent + présent", "Si + présent + impératif", "Si + présent + futur"], answer: "Si + présent + présent" },
            { q: "f.", options: ["Si + présent + présent", "Si + présent + impératif", "Si + présent + futur"], answer: "Si + présent + impératif" },
          ],
        },
        {
          num: 2, page: 53,
          instruction: "Entourez le verbe correct.",
          vi: "Chọn dạng động từ đúng.",
          type: "choice",
          items: [
            { q: "Tu pourras lire mon mail si tu ___ ta tablette.", options: ["prends", "prendras"], answer: "prends", example: true },
            { q: "Si vous ___ une visioconférence, nous y participerons.", options: ["organisez", "organiserez"], answer: "organisez" },
            { q: "J'enverrai un message à Pierre s'il ne ___ pas au téléphone.", options: ["répond", "répondra"], answer: "répond" },
            { q: "Si tu ne ___ pas cette imprimante en magasin, commande-la en ligne !", options: ["trouves", "trouveras"], answer: "trouves" },
            { q: "Les jeunes se désabonneront des réseaux sociaux quand ils ___ se déconnecter de leur téléphone.", options: ["voudront", "veulent"], answer: "voudront" },
            { q: "Si notre ordinateur ___ toujours en panne lundi prochain, nous ne serons pas joignables par mail.", options: ["est", "sera"], answer: "est" },
            { q: "Vous gagnerez du temps si vous ___ cette application.", options: ["téléchargez", "téléchargerez"], answer: "téléchargez" },
          ],
        },
        {
          num: 3, page: 53,
          instruction: "Conjuguez les verbes entre parenthèses au futur simple.",
          vi: "Chia động từ trong ngoặc ở futur simple.",
          type: "fill",
          items: [
            { q: "Gaëlle (lire) ___ ses courriels au bureau si son PC fonctionne.", answer: "lira", example: true },
            { q: "Je te (répondre) ___ si tu m'envoies un message.", answer: "répondrai" },
            { q: "Quand vous (contacter) ___ M. Moreaux, il vous expliquera comment utiliser ce logiciel.", answer: "contacterez" },
            { q: "Si vous continuez à me parler comme ça, la prochaine fois, je vous (raccrocher) ___ au nez.", answer: "raccrocherai" },
            { q: "Votre téléphone (s'éteindre) ___ très vite si vous le laissez dans le froid !", answer: "s'éteindra" },
            { q: "Si tu ne peux pas venir samedi, on (s'appeler) ___ .", answer: "s'appellera" },
            { q: "Quand tes amis (venir) ___ à la fête, on fera un selfie.", answer: "viendront" },
          ],
        },
        // Act. 4 « Terminez les phrases » n'est pas reprise : sauf pour
        // l'exemple, le corrigé ne donne que des exemples de réponses
        // libres (production personnelle), sans réponse unique à vérifier —
        // même choix que pour Articulation/Interprétation en phono.
      ],

      // p2 — Le pronom on (cahier p. 55)
      p2: [
        {
          num: 1, page: 55,
          instruction: "Quels mots peuvent remplacer le pronom on ? Associez.",
          vi: "Nối câu với từ có thể thay thế cho « on » (Nous / Quelqu'un / Les gens).",
          type: "match",
          pairs: [
            { l: "Dans ma famille, on utilise de plus en plus de robots ménagers.", r: "Nous" },
            { l: "On fait un selfie tous ensemble ?",                              r: "Quelqu'un" },
            { l: "On va au salon des innovations, tu viens ?",                     r: "Nous" },
            { l: "On a volé mon smartphone dans le bus.",                          r: "Quelqu'un" },
            { l: "Dans ces entreprises, on utilise une imprimante 3D.",            r: "Les gens" },
            { l: "En 2050, on mangera des comprimés dans tous les pays.",          r: "Les gens" },
          ],
        },
        {
          num: 2, page: 55, audioSrc: piste(49),
          instruction: "Que remplace le pronom on ? Écoutez et cochez.",
          vi: "Nghe từng câu (a→g) và cho biết « on » thay cho Quelqu'un / Nous / Les gens.",
          type: "choice",
          items: [
            { q: "a. (exemple)", options: ["Quelqu'un", "Nous", "Les gens"], answer: "Quelqu'un", example: true },
            { q: "b.", options: ["Quelqu'un", "Nous", "Les gens"], answer: "Nous" },
            { q: "c.", options: ["Quelqu'un", "Nous", "Les gens"], answer: "Les gens" },
            { q: "d.", options: ["Quelqu'un", "Nous", "Les gens"], answer: "Nous" },
            { q: "e.", options: ["Quelqu'un", "Nous", "Les gens"], answer: "Quelqu'un" },
            { q: "f.", options: ["Quelqu'un", "Nous", "Les gens"], answer: "Les gens" },
            { q: "g.", options: ["Quelqu'un", "Nous", "Les gens"], answer: "Nous" },
          ],
        },
        {
          num: 3, page: 55,
          instruction: "Transformez les phrases avec quelqu'un, les gens ou nous.",
          vi: "Chuyển câu dùng « on » sang quelqu'un / les gens / nous.",
          type: "transform",
          items: [
            { q: "Dans le futur, on voyagera en voiture volante.", answer: "Dans le futur, les gens voyageront en voiture volante.", example: true },
            { q: "On emploie la reconnaissance faciale dans les aéroports.", answer: "Les gens emploient la reconnaissance faciale dans les aéroports." },
            { q: "On a découvert des innovations intéressantes dans notre entreprise.", answer: "Nous avons découvert des innovations intéressantes dans notre entreprise." },
            { q: "On envoie moins de lettres et plus de courriels dans le monde actuel.", answer: "Les gens envoient moins de lettres et plus de courriels dans le monde actuel." },
            { q: "On t'invite à découvrir notre dernière invention, viens chez nous !", answer: "Nous t'invitons à découvrir notre dernière invention, viens chez nous !" },
            { q: "On a utilisé sa tablette sans lui demander l'autorisation.", answer: "Quelqu'un a utilisé sa tablette sans lui demander l'autorisation." },
          ],
        },
        {
          num: 4, page: 55,
          instruction: "Transformez les phrases avec le pronom on.",
          vi: "Chuyển câu sang dùng đại từ « on ».",
          type: "transform",
          items: [
            { q: "Les gens utilisent des robots pour faire le ménage.", answer: "On utilise des robots pour faire le ménage.", example: true },
            { q: "Nous avons créé une coupe du monde de robots.", answer: "On a créé une coupe du monde de robots." },
            { q: "Les gens veulent se déconnecter des réseaux sociaux.", answer: "On veut se déconnecter des réseaux sociaux." },
            { q: "Quelqu'un nous a pris en photo sans demander l'autorisation.", answer: "On nous a pris en photo sans demander l'autorisation." },
            { q: "Nous envoyons des tweets à nos amis.", answer: "On envoie des tweets à nos amis." },
            { q: "Les gens parlent mal l'anglais en France !", answer: "On parle mal l'anglais en France !" },
          ],
        },
      ],
    },

    // ── Phonie-graphie (cahier p. 56) — wired into the Phono step ─────
    // Discrimination et Dictée se prêtent à une correction automatique.
    // Articulation (act. 2, questions à réponse libre sur 2050) et
    // Interprétation (act. 4, lecture à voix haute d'un texte) ne sont pas
    // reprises, faute de réponse unique à vérifier — même choix que pour b1/b2.
    phono: [
      {
        num: 1, page: 56, audioSrc: piste(50),
        instruction: "Discrimination — écoutez et cochez le mot que vous entendez.",
        vi: "Nghe và chọn từ nào được phát âm.",
        type: "choice",
        items: [
          { q: "a.", options: ["drap", "bras"], answer: "drap", example: true },
          { q: "b.", options: ["trois", "croit"], answer: "croit" },
          { q: "c.", options: ["grand", "prend"], answer: "prend" },
          { q: "d.", options: ["brun", "train"], answer: "brun" },
          { q: "e.", options: ["très", "prêt"], answer: "très" },
          { q: "f.", options: ["cri", "gris"], answer: "gris" },
        ],
      },
      {
        num: 3, page: 56, audioSrc: piste(52),
        instruction: "Dictée — écoutez le texte et complétez les mots avec le groupe consonantique manquant.",
        vi: "Nghe và điền nhóm phụ âm còn thiếu vào mỗi từ.",
        type: "fill",
        items: [
          { q: "Comment vivre sans téléphone portable ? Dans no___e monde très", answer: "tr", example: true },
          { q: "a___o aux technologies,", answer: "ccr" },
          { q: "il est important d'utiliser moins souvent vo___e téléphone portable", answer: "tr" },
          { q: "et de ne pas répon___e immédiatement aux messages.", answer: "dr" },
          { q: "Laissez-le une ___ande partie la journée à la maison.", answer: "gr" },
          { q: "Vous pouvez ___endre rendez-vous avec vos amis par courriel ou téléphone fixe.", answer: "pr" },
          { q: "Faites d'au___es activités :", answer: "tr" },
          { q: "___atiquer un sport, écouter de la musique, se promener.", answer: "pr" },
          { q: "Vous serez plus li___e !", answer: "br" },
        ],
      },
    ],

    // ── Vocabulaire, keyed by the cycle's vocab step ──────────────────
    vocab: {
      // Cycle 1 — Les sciences et les techniques (cahier p. 52)
      c1_vocab: [
        {
          num: 1, page: 52,
          instruction: "Complétez les phrases avec les mots suivants : moteur – énergie solaire – en panne – navette – soucoupe volante – indispensable.",
          vi: "Điền từ vào chỗ trống.",
          type: "fill",
          bank: ["moteur", "énergie solaire", "en panne", "navette", "soucoupe volante", "indispensable"],
          items: [
            { q: "Notre nouvelle voiture fonctionne avec un ___ électrique.", answer: "moteur", example: true },
            { q: "Dans ce film de science-fiction, les gens prennent une ___ pour aller au travail.", answer: "soucoupe volante" },
            { q: "L'ordinateur restera un objet nécessaire ? Oui, il sera ___ !", answer: "indispensable" },
            { q: "L'astronaute Thomas Pesquet a pris une ___ pour aller sur la station spatiale.", answer: "navette" },
            { q: "Cet appareil ne s'allume plus, il est ___ depuis hier.", answer: "en panne" },
            { q: "Notre moteur ne fonctionne pas à l'électricité mais avec de l'___.", answer: "énergie solaire" },
          ],
        },
        {
          num: 2, page: 52, audioSrc: piste(46),
          instruction: "Écoutez et dites à quelle innovation correspondent les phrases entendues.",
          vi: "Nghe và cho biết mỗi câu nói về phát minh nào.",
          type: "fill",
          items: [
            { q: "Phrase a (exemple)", answer: "l'hologramme", example: true },
            { q: "Phrase b", answer: "le logiciel" },
            { q: "Phrase c", answer: "la reconnaissance faciale" },
            { q: "Phrase d", answer: "la téléportation" },
            { q: "Phrase e", answer: "le GPS" },
            { q: "Phrase f", answer: "l'imprimante 3D" },
          ],
        },
        {
          num: 3, page: 52,
          instruction: "Associez la caractéristique d'un objet à chaque image : automatique – électrique – futuriste – robotisé – pratique.",
          vi: "Nối mỗi hình với tính từ phù hợp.",
          type: "fill",
          items: [
            { q: "Image a (exemple)", answer: "pratique", example: true },
            { q: "Image b", answer: "robotisé" },
            { q: "Image c", answer: "électrique" },
            { q: "Image d", answer: "automatique" },
            { q: "Image e", answer: "futuriste" },
          ],
        },
        {
          num: 4, page: 52,
          instruction: "Trouvez les mots qui ont le même sens que les mots soulignés.",
          vi: "Tìm từ đồng nghĩa với từ được gạch chân.",
          type: "fill",
          items: [
            { q: "Cette machine peut remplacer mon travail !", answer: "robot", example: true },
            { q: "L'inventeur fait un objet robotisé très pratique pour notre vie quotidienne.", answer: "fabrique" },
            { q: "Regarde ce métro sans chauffeur ! Il est autonome !", answer: "automatique" },
            { q: "Le changement des technologies est très rapide au XXIe siècle.", answer: "l'évolution" },
            { q: "L'imprimante 3D ne marche pas, elle a un problème.", answer: "fonctionne" },
            { q: "Cet objet nouveau nous aidera à travailler plus rapidement.", answer: "innovation" },
          ],
        },
      ],

      // Cycle 2 — Les technologies de la communication (cahier p. 54)
      c2_vocab: [
        {
          num: 1, page: 54,
          instruction: "Associez les mots à leur définition.",
          vi: "Nối từ với định nghĩa.",
          type: "match",
          pairs: [
            { l: "l'appel",     r: "une communication téléphonique" },
            { l: "le smartphone", r: "un téléphone avec plusieurs applications" },
            { l: "le SMS",      r: "un message écrit" },
            { l: "la batterie", r: "l'énergie du téléphone" },
            { l: "le selfie",   r: "une photo de moi ou de mes amis et moi" },
          ],
        },
        {
          num: 2, page: 54, audioSrc: piste(48),
          instruction: "Écoutez et associez les phrases aux actions correspondantes.",
          vi: "Nghe và nối mỗi câu với hành động tương ứng.",
          type: "fill",
          items: [
            { q: "allumer (exemple) → quelle phrase ?", answer: "a", example: true },
            { q: "décrocher → quelle phrase ?", answer: "f" },
            { q: "éteindre → quelle phrase ?", answer: "d" },
            { q: "répondre → quelle phrase ?", answer: "b" },
            { q: "raccrocher → quelle phrase ?", answer: "e" },
            { q: "contacter → quelle phrase ?", answer: "c" },
          ],
        },
        {
          num: 3, page: 54,
          instruction: "Écrivez le nom des objets sous les images.",
          vi: "Viết tên đồ vật dưới mỗi hình.",
          type: "fill",
          items: [
            { q: "Image 1 (exemple)", answer: "un écran", example: true },
            { q: "Image 2", answer: "une souris" },
            { q: "Image 3", answer: "un clavier" },
            { q: "Image 4", answer: "une imprimante" },
            { q: "Image 5", answer: "une clé USB" },
            { q: "Image 6", answer: "un ordinateur" },
          ],
        },
        {
          num: 4, page: 54,
          instruction: "Complétez les phrases avec les mots suivants : appli – télécharger – faire une visio – courriel – en ligne – se désabonner – se connecter.",
          vi: "Điền từ vào chỗ trống.",
          type: "fill",
          bank: ["appli", "télécharger", "faire une visio", "courriel", "en ligne", "se désabonner", "se connecter"],
          items: [
            { q: "Vous pouvez m'envoyer un ___ pour confirmer votre venue.", answer: "courriel", example: true },
            { q: "Je n'ai plus besoin de mon GPS, je vais télécharger une ___ sur mon smartphone.", answer: "appli" },
            { q: "Alice ne se sent plus libre, elle préfère ___ des réseaux sociaux.", answer: "se désabonner" },
            { q: "Nos amis vivent loin de la ville, ils font donc beaucoup d'achats ___.", answer: "en ligne" },
            { q: "Les voisins ont des problèmes avec Internet, ils ne peuvent pas ___.", answer: "se connecter" },
            { q: "Tous nos collègues ne pourront pas venir à la réunion, nous allons donc ___ demain.", answer: "faire une visio" },
          ],
        },
      ],
    },

    // ── Bilan linguistique (cahier p. 58-59, noté /40) ──────────────
    // Wired into the "L'essentiel" step, alongside the AI-generated quiz.
    // Comme pour b1/b2, la compréhension orale + production écrite de la
    // page 57 (« Un robot à notre service ! ») et les mini-jeux corrigeables
    // de la page 62 sont repris ici aussi. Les mots croisés (act. 1, sans
    // texte de définition, seulement les réponses) et les voyelles manquantes
    // (act. 2, format des blancs non reproductible fidèlement depuis la
    // source) ne sont pas repris — même logique que pour les jeux non
    // reconstructibles de b1/b2.
    bilan: [
      {
        num: 1, page: 58,
        instruction: "Conjuguez les verbes entre parenthèses au futur simple. (/7)",
        vi: "Chia động từ trong ngoặc ở futur simple.",
        type: "fill",
        items: [
          { q: "Un jour, tous les professeurs (avoir) ___ des hologrammes pour faire cours.", answer: "auront" },
          { q: "L'année prochaine, cet ingénieur (fabriquer) ___ un appareil robotisé.", answer: "fabriquera" },
          { q: "Demain, ils (aller) ___ au musée des découvertes.", answer: "iront" },
          { q: "Un jour, tous les appareils (fonctionner) ___ avec de l'énergie solaire.", answer: "fonctionneront" },
          { q: "La vie (être) ___ très différente en 2050.", answer: "sera" },
          { q: "Tu (pouvoir) ___ m'expliquer comment fonctionne ta tablette ?", answer: "pourras" },
          { q: "Le mois prochain, je (changer) ___ de smartphone.", answer: "changerai" },
        ],
      },
      {
        num: 2, page: 58,
        instruction: "Remettez les mots dans l'ordre pour faire des phrases. (/7)",
        vi: "Sắp xếp lại các từ thành câu đúng.",
        type: "order",
        items: [
          { tokens: ["change", "un nouveau logiciel,", "Si tu", "d'ordinateur.", "veux"], answer: "Si tu veux un nouveau logiciel, change d'ordinateur." },
          { tokens: ["serez", "des robots.", "fabriquerez", "Quand vous", "serez ingénieur,", "vous"], answer: "Quand vous serez ingénieur, vous fabriquerez des robots." },
          { tokens: ["moins de temps", "lisons.", "nous", "sur notre smartphone,", "voulons", "Si nous", "passer"], answer: "Si nous voulons passer moins de temps sur notre smartphone, nous lisons." },
          { tokens: ["les maisons", "Quand nous", "pourront", "se téléporter !", "en 2050,", "serons"], answer: "Quand nous serons en 2050, les maisons pourront se téléporter !" },
          { tokens: ["je vous", "Si vous", "répondrai", "un courriel,", "m'envoyez", "très rapidement."], answer: "Si vous m'envoyez un courriel, je vous répondrai très rapidement." },
          { tokens: ["tu", "on", "cette technologie,", "comprendras", "découvrira", "son utilité.", "Quand"], answer: "Quand on découvrira cette technologie, tu comprendras son utilité." },
          { tokens: ["prendras", "une navette.", "Si tu", "dans l'espace,", "voyages", "tu."], answer: "Si tu voyages dans l'espace, tu prendras une navette." },
        ],
      },
      {
        num: 3, page: 58,
        instruction: "Transformez les phrases avec nous, quelqu'un ou les gens. (/6)",
        vi: "Chuyển câu dùng « on » sang nous / quelqu'un / les gens.",
        type: "transform",
        items: [
          { q: "Mes amis et moi, on communique beaucoup sur les réseaux sociaux.", answer: "Mes amis et moi, nous communiquons beaucoup sur les réseaux sociaux." },
          { q: "On m'a conseillé de changer d'ordinateur.", answer: "Quelqu'un m'a conseillé de changer d'ordinateur." },
          { q: "On apprendra à vivre sans téléphone.", answer: "Les gens apprendront à vivre sans téléphone." },
          { q: "Avec mon mari, on fait nos courses en ligne, c'est plus pratique !", answer: "Nous faisons nos courses en ligne, c'est plus pratique !" },
          { q: "On n'aura plus de téléphone fixe dans le futur.", answer: "Les gens n'auront plus de téléphone dans le futur." },
          { q: "On m'a appelé mais je n'ai pas pu répondre.", answer: "Quelqu'un m'a appelé mais je n'ai pas pu répondre." },
        ],
      },
      {
        num: 4, page: 58,
        instruction: "Vocabulaire — Qu'est-ce que c'est ? Écrivez le nom sous l'image. (/5)",
        vi: "Viết tên đồ vật dưới mỗi hình.",
        type: "fill",
        items: [
          { q: "Image 1", answer: "une navette" },
          { q: "Image 2", answer: "une chercheuse" },
          { q: "Image 3", answer: "un moteur" },
          { q: "Image 4", answer: "une soucoupe volante" },
          { q: "Image 5", answer: "un hologramme" },
        ],
      },
      {
        num: 5, page: 59,
        instruction: "Vocabulaire — Chassez l'intrus. (/5)",
        vi: "Tìm từ lạc loài trong mỗi nhóm.",
        type: "choice",
        items: [
          { q: "a.", options: ["le chercheur", "l'inventeur", "l'ordinateur", "l'ingénieur"], answer: "l'ordinateur" },
          { q: "b.", options: ["le robot", "l'appareil", "le moteur", "le logiciel"], answer: "le logiciel" },
          { q: "c.", options: ["automatique", "sympathique", "pratique", "futuriste"], answer: "sympathique" },
          { q: "d.", options: ["une navette", "une tablette", "un logiciel", "un hologramme"], answer: "une navette" },
          { q: "e.", options: ["marcher", "fonctionner", "courir", "tomber en panne"], answer: "courir" },
        ],
      },
      {
        num: 6, page: 59,
        instruction: "Vocabulaire — Associez les deux parties des phrases. (/5)",
        vi: "Nối đầu câu với cuối câu.",
        type: "match",
        pairs: [
          { l: "J'ai téléchargé une application",       r: "pour apprendre à cuisiner." },
          { l: "Ton téléphone sonne,",                   r: "décroche !" },
          { l: "L'ingénieur va voir son objet en 3D",    r: "quand il va l'imprimer." },
          { l: "Pourquoi tu n'as pas répondu,",          r: "quand je t'ai appelé ?" },
          { l: "Vous n'avez plus beaucoup de batterie,",  r: "votre téléphone va s'éteindre." },
        ],
      },
      {
        num: 7, page: 59,
        instruction: "Vocabulaire — Choisissez la réponse correcte. (/5)",
        vi: "Chọn đáp án đúng.",
        type: "choice",
        items: [
          { q: "Je ne peux plus écrire parce que … est en panne.", options: ["l'écran", "le clavier", "la clé USB"], answer: "le clavier" },
          { q: "Maryse commande son imprimante sur … .", options: ["un réseau", "un courriel", "un site"], answer: "un site" },
          { q: "Pour trouver les documents à envoyer, tu vas les chercher sur … .", options: ["ta clé USB", "ton imprimante", "le logiciel"], answer: "ta clé USB" },
          { q: "Marie m'a appelé pendant une heure, je viens de … .", options: ["répondre", "décrocher", "raccrocher"], answer: "raccrocher" },
          { q: "Va sur Internet pour … cette vidéo !", options: ["télécharger", "connecter", "allumer"], answer: "télécharger" },
        ],
      },
      {
        // Page 57 — Compréhension orale : « Un robot à notre service ! »
        num: 8, page: 57, audioSrc: piste(54),
        instruction: "Compréhension orale — « Un robot à notre service ! » — Vrai ou faux ?",
        vi: "Nghe bài về robot phục vụ nhà hàng rồi trả lời Đúng/Sai.",
        type: "truefalse",
        items: [
          { q: "Le robot est fabriqué en Suisse.", answer: true },
        ],
      },
      {
        num: 9, page: 57, audioSrc: piste(54),
        instruction: "Compréhension orale — cochez la bonne réponse.",
        vi: "Vẫn bài nghe trên — chọn đáp án đúng.",
        type: "choice",
        items: [
          { q: "Le document présente un robot utile :", options: ["pour faire le ménage", "pour être un animal de compagnie", "pour transporter des plats"], answer: "pour transporter des plats" },
          { q: "Quand les clients voient le robot, ils sont :", options: ["surpris", "tristes", "en colère"], answer: "surpris" },
          { q: "Avec leur nouveau collègue, les serveurs sont :", options: ["contents de leur nouveau collègue", "inquiets", "déçus"], answer: "contents de leur nouveau collègue" },
          { q: "Il coûte :", options: ["1 100 euros", "11 000 euros", "11 100 euros"], answer: "11 000 euros" },
        ],
      },
      {
        num: 10, page: 57, audioSrc: piste(54),
        instruction: "Compréhension orale — répondez à la question.",
        vi: "Vẫn bài nghe trên — trả lời câu hỏi.",
        type: "fill",
        items: [
          { q: "Combien de kilomètres fait le robot par jour ?", answer: "Le robot fait 10 kilomètres par jour." },
        ],
      },
      {
        // Page 62 — Jeux, act. 3 : reconstituer les mots à partir des étiquettes.
        num: 11, page: 62,
        instruction: "Jeux — Associez 2 étiquettes pour former des mots.",
        vi: "Ghép 2 mảnh để tạo thành từ đúng.",
        type: "match",
        pairs: [
          { l: "DÉCR + OCHER", r: "décrocher" },
          { l: "VI + SIO",     r: "visio" },
          { l: "CONT + ACTER", r: "contacter" },
          { l: "IMPR + IMANTE", r: "imprimante" },
          { l: "FUTU + RISTE", r: "futuriste" },
        ],
      },
      {
        num: 12, page: 62,
        instruction: "Jeux — À l'aide des 3 indices, devinez le mot ou l'expression.",
        vi: "Dựa vào 3 gợi ý, đoán từ hoặc cụm từ.",
        type: "fill",
        items: [
          { q: "appareil, appeler, communication", answer: "téléphone", example: true },
          { q: "texto, message, téléphone", answer: "SMS" },
          { q: "problème technique, éteindre, ne pas fonctionner", answer: "en panne" },
          { q: "image, télévision, ordinateur", answer: "écran" },
        ],
      },
    ],

    // ── DELF A2 blanc (cahier p. 60-61) ────────────────────────────
    // Le livre a bien une page « DELF A2 — Stratégies » pour cette unité
    // (Compréhension des écrits, p. 181-183 du livre), mais l'exercice
    // d'entraînement qu'elle propose n'a pas de corrigé imprimé dans la
    // source .md (tableau à remplir sans réponses) — pas de coLivre pour
    // cette unité, comme pour b2.
    delf: {
      co: [
        {
          num: 1, page: 60, audioSrc: piste(55),
          instruction: "Compréhension de l'oral — vous écoutez la radio, trois documents. (6 points)",
          vi: "Nghe đài radio (3 đoạn) rồi chọn đáp án đúng.",
          type: "choice",
          items: [
            { q: "1. Où sera Thomas Pesquet le 10 juin ?", options: ["Chez lui", "À la radio", "Dans l'espace"], answer: "À la radio" },
            { q: "2. De quoi Thomas Pesquet parlera ?", options: ["De santé", "De travail", "De nourriture"], answer: "De nourriture" },
            { q: "3. Qu'est-ce que vous pouvez réparer gratuitement ?", options: ["un ordinateur portable", "une imprimante 3D", "un vélo électrique"], answer: "un ordinateur portable" },
            { q: "4. Où devez-vous aller pour utiliser le service ?", options: ["Au café", "À la mairie", "Au marché"], answer: "Au café" },
            { q: "5. Où devez-vous mettre votre téléphone portable demain ?", options: ["Dans votre sac", "Dans votre poche", "Dans votre placard"], answer: "Dans votre placard" },
            { q: "6. Qu'est-ce que le journaliste vous propose de faire demain ?", options: ["rester à la maison à lire", "faire une promenade", "aller au cinéma"], answer: "rester à la maison à lire" },
          ],
        },
      ],
      // Compréhension des écrits — courriel de Marine (vacances en Suisse
      // chez son cousin Florent ; salon des innovations technologiques à
      // Genève le 21 octobre). Le texte du courriel n'est pas reproduit
      // dans le corrigé source, seulement les questions et réponses.
      ce: [
        {
          num: 1, page: 60,
          instruction: "Compréhension des écrits — courriel de Marine. (6 points)",
          vi: "Đọc thư của Marine (kỳ nghỉ ở Thụy Sĩ nhà anh họ Florent ; hội chợ công nghệ ở Genève ngày 21/10) rồi chọn đáp án đúng.",
          type: "choice",
          items: [
            { q: "1. Qu'a fait Marine la semaine dernière ?", options: ["Elle a visité Genève", "Elle a révisé ses examens", "Elle s'est reposée en famille"], answer: "Elle s'est reposée en famille" },
            { q: "2. Que fait le robot de Florent ?", options: ["il nettoie les fenêtres", "il passe l'aspirateur", "il tond la pelouse"], answer: "il nettoie les fenêtres" },
            { q: "3. Pour Marine, les inventions du salon sont…", options: ["inutiles", "pratiques", "incroyables"], answer: "inutiles" },
            { q: "4. Quand est-ce que vous partez ?", options: ["Le 20 octobre", "Le 21 octobre", "Le 22 octobre"], answer: "Le 20 octobre" },
            { q: "5. Qu'est-ce que vous devez faire ?", options: ["Acheter des billets", "Réserver les chambres", "Téléphoner au restaurant"], answer: "Réserver les chambres" },
            { q: "6. Comment est-ce que vous irez au salon ?", options: ["en voiture", "en train", "en bus"], answer: "en train" },
          ],
        },
      ],
      // Production — no auto-grading; the cahier's model answer is the yardstick.
      production: [
        {
          // Page 57 — production libre de la fin de l'unité (pas notée DELF,
          // mais rangée ici comme les autres exercices de production non
          // auto-corrigeables).
          skill: "Production écrite (page 57)", points: "60 mots", page: 57,
          prompt: "Vous avez découvert un objet extraordinaire, très utile dans la vie quotidienne, qui fonctionne grâce à l'intelligence artificielle. Vous écrivez à votre ami(e) pour lui décrire votre découverte. Vous lui donnez des détails sur son aspect, sa fonction et son utilité. (60 mots)",
          vi: "Viết thư kể cho bạn nghe về một vật dụng đặc biệt bạn khám phá được, hoạt động nhờ trí tuệ nhân tạo: hình dáng, chức năng, công dụng. (60 từ)",
          model: "Salut Paolo, Tu es toujours d'accord pour venir chez moi samedi ? J'ai découvert un objet très intéressant au salon des innovations à Paris. Il s'appelle Dominhome. Il est petit, rectangulaire et connecté à Internet. Grâce à son intelligence artificielle, je peux le programmer pour allumer et éteindre les lumières, augmenter ou baisser le chauffage et quand j'ai besoin d'informations, je lui pose ma question et il me répond ! Quand tu viendras chez moi, je te présenterai Dominhome et je suis sûr qu'il te plaira. À samedi ! Samuel",
        },
        {
          skill: "Production écrite", points: "12,5 points", page: 61,
          prompt: "Vous avez reçu ce message de votre ami Élie : « Salut ! Jeudi prochain, c'est le salon des Technologies. Je vais y aller avec Saskia. Nous y resterons toute la journée. Tu veux venir avec nous ? À jeudi j'espère ! Élie » Vous répondez à Élie. Vous acceptez sa proposition. Vous lui demandez des informations sur la journée (programme, horaires, prix…). Vous lui proposez une sortie à faire après le salon. (60 mots minimum)",
          vi: "Viết thư trả lời Élie: nhận lời, hỏi thêm về chương trình/giờ giấc/giá vé, đề xuất một hoạt động sau hội chợ. (tối thiểu 60 từ)",
          model: "Salut Élie ! Merci pour ton invitation. Oui, je viens avec vous, j'adore les nouvelles technologies ! J'aimerais découvrir de nouveaux appareils, est-ce qu'il y aura des inventeurs et des robots ? Combien coûte l'entrée ? Vous y allez à quelle heure ? Moi, je suis libre à partir de 11 heures. On pourrait se retrouver pour déjeuner. Il y aura un restaurant ? Après le salon, nous pouvons aller au cinéma, il y a un film documentaire sur Thomas Pesquet. À jeudi ! Meriem",
        },
        {
          skill: "Production orale", points: "3 à 4 minutes", page: 61,
          prompt: "Partie 3 de l'épreuve : exercice en interaction. Sujet : Au bureau. Vous travaillez dans une entreprise en France. Vous voulez organiser un événement pour parler des nouvelles technologies au travail. Vous allez voir la directrice de votre entreprise pour discuter avec elle de l'organisation de l'événement. (L'examinateur joue le rôle de la directrice.)",
          vi: "Đóng vai: bạn muốn tổ chức một sự kiện về công nghệ mới tại công ty, đến gặp giám đốc để bàn bạc. (giám khảo đóng vai giám đốc)",
          model: "– Bonjour madame. – Bonjour. – J'étais au salon des technologies la semaine dernière, c'était très intéressant. Il y avait des inventeurs qui ont présenté des nouveaux appareils technologiques très utiles. J'ai eu une idée. Nous pourrions organiser une réunion avec tous les employés de notre entreprise pour présenter des nouvelles technologies pratiques pour notre travail. – Oui, pourquoi pas. Mais qui présentera ces nouvelles technologies ? – Je connais le directeur du salon. Je pourrais lui demander de venir pour les présenter. – Et quelles technologies seraient utiles pour nous ? – Je pense aux imprimantes 3D, par exemple, ou à des nouveaux ordinateurs. – C'est une bonne idée. Vous avez pensé à l'organisation de cette réunion ? – Oui, bien sûr. Nous pouvons la faire vendredi matin, à 11 heures, dans la grande salle. Il y a de la place pour tout le monde. Après, à 12 h 30, nous pouvons organiser un déjeuner. Je connais aussi un restaurant qui livre des plats. C'est bon et pas cher. – D'accord. Et pour la présentation, le directeur va parler pendant une heure et demie ? – Oui mais il pourrait aussi apporter des exemples d'imprimantes et d'ordinateurs. On pourra les essayer. Et si c'est vraiment utile pour nous, nous pourrons en acheter. – Je ne sais pas si nous allons acheter de nouveaux ordinateurs mais nous pouvons organiser cette présentation. Vous pouvez vous en occuper ? – Oui, bien sûr ! Je vais téléphoner au directeur du salon et au restaurant. Je demanderai de l'aide à mes collègues pour installer la salle. – C'est parfait alors. Venez me voir mardi pour me donner les détails. – D'accord. Merci beaucoup, bonne journée madame. – Bonne journée !",
        },
      ],
    },
  },

  b7: {

    // ── Grammaire, keyed by the grammar point index in editoGrammarA2.js ──
    grammar: {

      // p0 — Les pronoms COD et COI (cahier p. 75)
      p0: [
        {
          num: 1, page: 75,
          instruction: "Entourez la bonne réponse.",
          vi: "Chọn đại từ COD/COI đúng.",
          type: "choice",
          items: [
            // Item « a » n'est pas redonné dans le corrigé imprimé (déjà
            // résolu dans le cahier) ; « l' » est déduit ici de la règle
            // d'élision devant voyelle — « ton lit » (masc. sing.) + « ai ».
            { q: "Où as-tu mis ton lit ? Je ___ ai mis sous la fenêtre.", options: ["le", "la", "l'", "les", "lui", "leur"], answer: "l'", example: true },
            { q: "Placez-vous l'oreiller sous votre tête pour bien dormir ? Non, je ___ place sous mes pieds.", options: ["le", "la", "l'", "les", "lui", "leur"], answer: "le" },
            { q: "Qu'as-tu conseillé à Vincent ? Je ___ ai conseillé de partir en voyage.", options: ["le", "la", "l'", "les", "lui", "leur"], answer: "lui" },
            { q: "Tu peux coucher les enfants, s'il te plaît ? D'accord, je vais ___ coucher tout de suite.", options: ["le", "la", "l'", "les", "lui", "leur"], answer: "les" },
            { q: "As-tu acheté ton nouveau canapé ? Oui, je ___ ai acheté hier et il est génial !", options: ["le", "la", "l'", "les", "lui", "leur"], answer: "l'" },
            { q: "Tu as expliqué à tes collègues que tu étais fatiguée ? Non, je ne ___ ai pas dit, j'ai oublié !", options: ["le", "la", "l'", "les", "lui", "leur"], answer: "leur" },
          ],
        },
        {
          num: 2, page: 75,
          instruction: "Remplacez les mots soulignés par un pronom COD ou COI.",
          vi: "Thay từ được gạch chân bằng đại từ COD hoặc COI.",
          type: "fill",
          items: [
            { q: "Jeanne ne regarde pas la télé le soir. Elle ne …… regarde pas.", answer: "la", example: true },
            { q: "Va voir le spécialiste du sommeil de ma femme ! Oui, j'irai …… voir la semaine prochaine.", answer: "le" },
            { q: "Qu'est-ce que tu offres à Mirella et Jean dimanche ? Je …… offre une plante pour le jardin.", answer: "leur" },
            { q: "Mon mari a très mal au dos. Qu'est-ce que je peux …… conseiller ?", answer: "lui" },
            { q: "Tu as pris tes oreillers pour bien dormir ? Oui, je …… ai pris.", answer: "les" },
            { q: "Elle a écrit à Paul et à Julien pour dire qu'elle partait à New York, mais à moi elle ne …… a pas écrit.", answer: "m'" },
          ],
        },
        {
          num: 3, page: 75,
          instruction: "Remettez les mots dans l'ordre pour faire des phrases.",
          vi: "Sắp xếp lại các từ thành câu đúng.",
          type: "order",
          items: [
            { tokens: ["je", "Mon café,", "bois", "le matin.", "le"], answer: ["Mon café,", "je", "le", "bois", "le matin."], example: true },
            { tokens: ["nous", "très stressés.", "Ils ont dit", "qu'ils", "étaient"], answer: ["Ils ont dit", "nous", "qu'ils", "étaient", "très stressés."] },
            { tokens: ["pour", "Ce spécialiste", "donne", "des conseils", "vous", "bien dormir."], answer: ["Ce spécialiste", "vous", "donne", "des conseils", "pour", "bien dormir."] },
            { tokens: ["l'", "Son nouveau", "fatigué.", "travail", "a beaucoup"], answer: ["Son nouveau", "travail", "l'", "a beaucoup", "fatigué."] },
            { tokens: ["Il", "a expliqué", "se sentir bien.", "comment", "leur"], answer: ["Il", "leur", "a expliqué", "comment", "se sentir bien."] },
            // Le corrigé imprimé omet « de tisane », pourtant présent dans les
            // éléments à réordonner (sic) — repris tel quel, sans « corriger »
            // la coquille du cahier ; le jeton « de tisane. » reste simplement
            // inutilisé dans le tiroir.
            { tokens: ["a demandé", "une tasse", "lui", "de tisane.", "Elle"], answer: ["Elle", "lui", "a demandé", "une tasse."] },
          ],
        },
        {
          num: 4, page: 75, audioSrc: piste(66),
          instruction: "Pronom COD ou COI ? Écoutez et cochez.",
          vi: "Nghe từng câu (a→f) và cho biết đại từ là COD hay COI.",
          type: "choice",
          items: [
            { q: "a. (exemple)", options: ["COD", "COI"], answer: "COI", example: true },
            { q: "b.", options: ["COD", "COI"], answer: "COI" },
            { q: "c.", options: ["COD", "COI"], answer: "COD" },
            { q: "d.", options: ["COD", "COI"], answer: "COI" },
            { q: "e.", options: ["COD", "COI"], answer: "COD" },
            { q: "f.", options: ["COD", "COI"], answer: "COD" },
          ],
        },
      ],

      // p1 — Le superlatif (cahier p. 77)
      p1: [
        {
          num: 1, page: 77,
          instruction: "Complétez les phrases avec le meilleur, la meilleure, les meilleures ou le mieux.",
          vi: "Điền le meilleur / la meilleure / les meilleures / le mieux.",
          type: "fill",
          bank: ["le meilleur", "la meilleure", "les meilleures", "le mieux"],
          items: [
            { q: "Ce médecin est …… médecin du village.", answer: "le meilleur", example: true },
            { q: "Ces tisanes sont …… de toutes.", answer: "les meilleures" },
            { q: "C'est la lavande qui soigne …… les insomnies.", answer: "le mieux" },
            { q: "Ce sont les enfants qui dorment toujours …… .", answer: "le mieux" },
            { q: "La …… fatigue est la fatigue sportive.", answer: "meilleure" },
            { q: "J'ai pris beaucoup d'antibiotiques, mais celui-ci est …… .", answer: "le meilleur" },
          ],
        },
        {
          num: 2, page: 77,
          instruction: "Transformez les phrases avec un superlatif.",
          vi: "Chuyển câu sang thể so sánh cực cấp (superlatif).",
          type: "transform",
          items: [
            { q: "Cet infirmier est gentil. (+)", answer: "Cet infirmier est le plus gentil.", example: true },
            { q: "Marja est stressée (–).", answer: "Marja est la moins stressée." },
            { q: "Son activité physique est régulière (+).", answer: "Son activité physique est la plus régulière." },
            { q: "Le rythme cardiaque d'Igor est lent. (+)", answer: "Le rythme cardiaque d'Igor est le plus lent." },
            { q: "Faire du sport est important (+) pour nous.", answer: "Faire du sport est le plus important pour nous." },
            { q: "Ce remède est cher (–) de tous.", answer: "Ce remède est le moins cher de tous." },
          ],
        },
        {
          num: 3, page: 77, audioSrc: piste(68),
          instruction: "Superlatif de supériorité (+) ou d'infériorité (–) ? Écoutez et cochez.",
          vi: "Nghe từng câu (a→f) và cho biết đó là superlatif hơn (+) hay kém (–).",
          type: "choice",
          items: [
            { q: "a. (exemple)", options: ["supériorité (+)", "infériorité (–)"], answer: "infériorité (–)", example: true },
            { q: "b.", options: ["supériorité (+)", "infériorité (–)"], answer: "supériorité (+)" },
            { q: "c.", options: ["supériorité (+)", "infériorité (–)"], answer: "supériorité (+)" },
            { q: "d.", options: ["supériorité (+)", "infériorité (–)"], answer: "infériorité (–)" },
            { q: "e.", options: ["supériorité (+)", "infériorité (–)"], answer: "supériorité (+)" },
            { q: "f.", options: ["supériorité (+)", "infériorité (–)"], answer: "infériorité (–)" },
          ],
        },
        {
          num: 4, page: 77,
          instruction: "Écrivez le contraire des expressions en italique.",
          vi: "Viết ngược nghĩa của cụm từ in nghiêng.",
          type: "fill",
          items: [
            { q: "J'ai fait le rêve le plus fou de ma vie.", answer: "le moins fou", example: true },
            { q: "C'est moi qui ai le sommeil le moins léger de tous.", answer: "le plus léger" },
            { q: "De toute la famille, c'est Bruno qui a le meilleur médecin.", answer: "le moins bon" },
            { q: "L'échinacée est la plante la moins bonne pour moi.", answer: "la meilleure" },
            { q: "C'est ma mère qui m'a donné les meilleurs conseils.", answer: "les moins bons" },
            { q: "Pour lui, ce sont les tisanes qui fonctionnent le mieux.", answer: "le moins bien" },
          ],
        },
      ],

      // p2 — Les pronoms interrogatifs (cahier p. 79)
      // (Note : le corrigé imprimé étiquette cette section « Page 77 » par
      // erreur — doublon avec la page du Superlatif, artefact de numérotation
      // sans ambiguïté réelle sur le contenu, qui est bien celui de la p.79.)
      p2: [
        {
          num: 1, page: 79,
          instruction: "Entourez le pronom interrogatif correct.",
          vi: "Chọn đại từ nghi vấn đúng.",
          type: "choice",
          items: [
            { q: "…… numéro d'urgence connais-tu ?", options: ["Quel", "Lequel"], answer: "Quel", example: true },
            { q: "…… massages te font du bien ?", options: ["Quels", "Quelles"], answer: "Quels" },
            { q: "Tu connais deux médecins. …… veux-tu consulter ?", options: ["Quel", "Lequel"], answer: "Lequel" },
            { q: "J'ai plein de tisanes différentes dans mon placard. Tu veux ……  ?", options: ["laquelle", "lesquelles"], answer: "laquelle" },
            { q: "…… activités allez-vous faire cet hiver ?", options: ["Quelles", "Lesquelles"], answer: "Quelles" },
            { q: "Vos enfants, ce sont …… ?", options: ["lesquels", "lesquelles"], answer: "lesquels" },
            { q: "Pouvez-vous me dire …… sport est le meilleur pour le dos ?", options: ["quel", "lequel"], answer: "quel" },
          ],
        },
        {
          num: 2, page: 79,
          instruction: "Associez les éléments pour former des phrases.",
          vi: "Nối đầu câu với cuối câu.",
          type: "match",
          pairs: [
            { l: "Tu as mal à quelle",                              r: "jambe ?" },
            { l: "Tu as deux oreillers",                             r: "lequel veux-tu ?" },
            { l: "Tu prends quelles",                                r: "tasses pour boire le thé ?" },
            { l: "Il t'a donné quel",                                r: "numéro pour l'appeler ?" },
            { l: "Lequel des deux est",                               r: "le cousin de Théo ?" },
            { l: "Il y a plusieurs infirmières aujourd'hui :",       r: "laquelle voulez-vous voir ?" },
            { l: "Ce magasin vend de très bonnes tisanes.",          r: "Lesquelles voulez-vous acheter ?" },
          ],
        },
        {
          num: 3, page: 79,
          instruction: "Complétez les phrases avec lequel, laquelle, lesquelles, lesquels.",
          vi: "Điền lequel / laquelle / lesquelles / lesquels.",
          type: "fill",
          bank: ["lequel", "laquelle", "lesquelles", "lesquels"],
          items: [
            { q: "J'ai deux lits. Dans …… des deux veux-tu dormir ?", answer: "lequel", example: true },
            { q: "Elle a trois chambres, mais je ne sais pas …… est la sienne.", answer: "laquelle" },
            { q: "Il a le nom de plusieurs médecins, mais il voudrait savoir …… est le meilleur.", answer: "lequel" },
            { q: "Vous prenez plusieurs remèdes. Pourriez-vous me dire …… est pour le soir ?", answer: "lequel" },
            { q: "Parmi les actions suivantes, …… sont les plus utiles ?", answer: "lesquelles" },
            { q: "Il y a plusieurs cycles de sommeil. …… durent 30 minutes ?", answer: "lesquels" },
            { q: "Parmi vos enfants, …… fait des allergies au printemps ?", answer: "lequel" },
          ],
        },
        {
          num: 4, page: 79, audioSrc: piste(70),
          instruction: "Écoutez et cochez.",
          vi: "Nghe và chọn Laquelle / Lequel / Lesquels-Lesquelles.",
          type: "choice",
          items: [
            { q: "a. (exemple)", options: ["Laquelle", "Lequel", "Lesquels/Lesquelles"], answer: "Laquelle", example: true },
            { q: "b.", options: ["Laquelle", "Lequel", "Lesquels/Lesquelles"], answer: "Lequel" },
            { q: "c.", options: ["Laquelle", "Lequel", "Lesquels/Lesquelles"], answer: "Lesquels/Lesquelles" },
            { q: "d.", options: ["Laquelle", "Lequel", "Lesquels/Lesquelles"], answer: "Laquelle" },
            { q: "e.", options: ["Laquelle", "Lequel", "Lesquels/Lesquelles"], answer: "Lequel" },
            { q: "f.", options: ["Laquelle", "Lequel", "Lesquels/Lesquelles"], answer: "Lesquels/Lesquelles" },
          ],
        },
      ],
    },

    // ── Phonie-graphie (cahier p. 80) — wired into the Phono step ─────
    // Seule la Discrimination (act. 1) a une réponse imprimée vérifiable
    // (l'ordre 1-2/2-1 des deux variantes entendues). Articulation (act. 2,
    // dialogues à répéter) et Interprétation (act. 3, questions à réponse
    // libre à l'oral) ne sont pas reprises, faute de réponse unique à
    // vérifier — même choix que pour b1/b2/b5.
    phono: [
      {
        num: 1, page: 80, audioSrc: piste(71),
        instruction: "Discrimination — écoutez et dites dans quel ordre vous entendez les phrases.",
        vi: "Nghe và cho biết thứ tự phát âm của 2 câu (1-2 hoặc 2-1).",
        type: "choice",
        items: [
          { q: "a. 1. la plus efficace — 2. le plus efficace", options: ["1-2", "2-1"], answer: "1-2" },
          { q: "b. 1. les plus importants — 2. les plus importantes", options: ["1-2", "2-1"], answer: "2-1" },
          { q: "c. 1. le plus célèbre — 2. la plus célèbre", options: ["1-2", "2-1"], answer: "1-2" },
          { q: "d. 1. les plus compétents — 2. les plus compétentes", options: ["1-2", "2-1"], answer: "1-2" },
          { q: "e. 1. le plus économique — 2. la plus économique", options: ["1-2", "2-1"], answer: "2-1" },
          { q: "f. 1. les plus sérieux — 2. les plus sérieuses", options: ["1-2", "2-1"], answer: "2-1" },
          { q: "g. 1. la plus urgente — 2. le plus urgent", options: ["1-2", "2-1"], answer: "1-2" },
        ],
      },
    ],

    // ── Vocabulaire, keyed to match the Parcours vocab steps ──────────
    // c1_vocab (cahier p. 76) couvre les groupes b7g1-b7g3 du livre (corps,
    // douleur/bien-être, sommeil) ; c2_vocab (cahier p. 78) couvre b7g4-b7g5
    // (maux/soins, urgences) — voir parcoursDataA2.js.
    vocab: {
      c1_vocab: [
        {
          num: 1, page: 76,
          instruction: "Barrez l'intrus.",
          vi: "Tìm từ lạc loài trong mỗi nhóm.",
          type: "choice",
          items: [
            { q: "a.", options: ["le bras", "le ventre", "l'épaule"], answer: "le ventre" },
            { q: "b.", options: ["le cerveau", "la tête", "le corps"], answer: "le corps" },
            { q: "c.", options: ["le cou", "la cuisse", "le genou"], answer: "le cou" },
            { q: "d.", options: ["le pied", "la tête", "la jambe"], answer: "la tête" },
            { q: "e.", options: ["la cuisse", "le dos", "la colonne vertébrale"], answer: "la cuisse" },
            { q: "f.", options: ["le genou", "le bras", "la cheville"], answer: "le bras" },
          ],
        },
        {
          // Nuage de mots : tête, repos, rêve, sieste, bras, malade, manger,
          // jambe, assis, bâillement, allongé, s'endormir — le cahier
          // demande d'entourer seulement les mots liés au sommeil.
          num: 2, page: 76,
          instruction: "Entourez les mots du sommeil.",
          vi: "Từ nào thuộc chủ đề giấc ngủ?",
          type: "truefalse",
          items: [
            { q: "tête", answer: false },
            { q: "repos", answer: true },
            { q: "rêve", answer: true },
            { q: "sieste", answer: true },
            { q: "bras", answer: false },
            { q: "malade", answer: false },
            { q: "manger", answer: false },
            { q: "jambe", answer: false },
            { q: "assis", answer: false },
            { q: "bâillement", answer: true },
            { q: "allongé", answer: true },
            { q: "s'endormir", answer: true },
          ],
        },
        {
          num: 3, page: 76, audioSrc: piste(67),
          instruction: "Écoutez et indiquez la bonne situation (image 1 à 5).",
          vi: "Nghe và cho biết mỗi đoạn ứng với hình nào (chữ cái tình huống).",
          type: "fill",
          items: [
            { q: "Image 1", answer: "c" },
            { q: "Image 2 (exemple)", answer: "a", example: true },
            { q: "Image 3", answer: "d" },
            { q: "Image 4", answer: "e" },
            { q: "Image 5", answer: "b" },
          ],
        },
        {
          num: 4, page: 76,
          instruction: "Associez.",
          vi: "Nối cụm từ với nghĩa tương đương.",
          type: "match",
          pairs: [
            { l: "sentir une douleur", r: "avoir mal" },
            { l: "être en forme",      r: "se sentir bien" },
            { l: "être malade",        r: "souffrir" },
            { l: "récupérer",          r: "se remettre" },
            { l: "être apaisé",        r: "se sentir léger" },
            { l: "être relaxé",        r: "être reposé" },
          ],
        },
      ],

      c2_vocab: [
        {
          num: 1, page: 78,
          instruction: "Classez les maux et les remèdes de la liste.",
          vi: "Phân loại: đây là một chứng bệnh (mal) hay một phương thuốc (remède)?",
          type: "choice",
          items: [
            { q: "antibiotique", options: ["un mal", "un remède"], answer: "un remède", example: true },
            { q: "antiseptique", options: ["un mal", "un remède"], answer: "un remède" },
            { q: "asthme", options: ["un mal", "un remède"], answer: "un mal" },
            { q: "gouttes", options: ["un mal", "un remède"], answer: "un remède" },
            { q: "indigestion", options: ["un mal", "un remède"], answer: "un mal" },
            { q: "infection", options: ["un mal", "un remède"], answer: "un mal" },
            { q: "migraine", options: ["un mal", "un remède"], answer: "un mal" },
            { q: "sirop", options: ["un mal", "un remède"], answer: "un remède" },
            { q: "tisane", options: ["un mal", "un remède"], answer: "un remède" },
          ],
        },
        {
          num: 2, page: 78,
          instruction: "Mettez les lettres dans l'ordre pour retrouver les mots.",
          vi: "Sắp xếp lại các chữ cái để tìm ra từ đúng.",
          type: "fill",
          items: [
            { q: "I E A U L A N C R M B", answer: "ambulancier", example: true },
            { q: "C A C I D T E N", answer: "accident" },
            { q: "P C I E R E O L I", answer: "policière" },
            { q: "P P I E R O M", answer: "pompier" },
            { q: "C E G U R E N", answer: "urgence" },
            { q: "S S E B E L", answer: "blessé" },
          ],
        },
        {
          num: 3, page: 78,
          instruction: "Complétez le texte avec les mots suivants : bien – fatigue – patraque – tonus – traitement – vitamines.",
          vi: "Điền từ vào chỗ trống trong đoạn văn.",
          type: "fill",
          bank: ["bien", "fatigue", "patraque", "tonus", "traitement", "vitamines"],
          items: [
            { q: "Éloïse est …… .", answer: "patraque", example: true },
            { q: "Pour lui donner du …… le médecin lui a recommandé des vitamines en gouttes.", answer: "tonus" },
            { q: "… des …… en gouttes, à prendre tous les matins.", answer: "vitamines" },
            { q: "Ce …… lui fait le plus grand bien.", answer: "traitement" },
            { q: "Ce traitement lui fait le plus grand …… .", answer: "bien" },
            { q: "… et elle ne sent plus sa …… physique.", answer: "fatigue" },
          ],
        },
        {
          num: 4, page: 78, audioSrc: piste(69),
          instruction: "Écoutez et associez les phrases aux images (image 1 à 5).",
          vi: "Nghe và nối mỗi câu với hình tương ứng.",
          type: "fill",
          items: [
            { q: "Image 1 (crise d'asthme)", answer: "e" },
            { q: "Image 2 (allergies)", answer: "c" },
            { q: "Image 3 (exemple : insomnies)", answer: "a", example: true },
            { q: "Image 4 (migraine)", answer: "b" },
            { q: "Image 5 (indigestion)", answer: "d" },
          ],
        },
      ],
    },

    // ── Bilan linguistique (cahier p. 82-83, noté /40) ──────────────
    // Wired into the "L'essentiel" step, alongside the AI-generated quiz.
    // Comme pour b1/b2/b5, la compréhension orale + production écrite de la
    // page 81 (« Rêve et cauchemars ») et les mini-jeux corrigeables de la
    // page 86 sont repris ici aussi. Le jeu 3 (« enlevez les x ») n'est pas
    // repris : le texte encodé avec les « x » n'est pas donné dans la
    // source, seulement les phrases décodées — même logique que pour les
    // jeux non reconstructibles de b1/b2/b5. Le pendu (jeu 5) est un jeu
    // oral en groupe, non auto-corrigeable.
    bilan: [
      {
        num: 1, page: 82,
        instruction: "Complétez les phrases avec un pronom COD ou COI. (/7)",
        vi: "Điền đại từ COD hoặc COI.",
        type: "fill",
        items: [
          { q: "Quand tu iras voir ton frère, tu …… apporteras ses livres.", answer: "lui" },
          { q: "Je suis allé voir le médecin et il …… conseillé du repos.", answer: "m'" },
          { q: "Ton fauteuil est vraiment super ! Où …… as-tu acheté ?", answer: "l'" },
          { q: "Mes parents dorment très mal et je …… ai offert de nouveaux oreillers.", answer: "leur" },
          { q: "Tu n'as pas bu ta tisane ? Non, je …… boirai plus tard.", answer: "la" },
          { q: "Vous êtes allés voir un spécialiste, non ? Qu'est-ce qu'il …… a expliqué ?", answer: "vous" },
          { q: "J'ai emprunté un livre sur la santé et je vais …… prêter à ma sœur.", answer: "le" },
        ],
      },
      {
        num: 2, page: 82,
        instruction: "Complétez les phrases avec le mieux, le meilleur, la meilleure, les meilleur(e)s. (/7)",
        vi: "Điền le mieux / le meilleur / la meilleure / les meilleur(e)s.",
        type: "fill",
        items: [
          { q: "…… fauteuils massants sont en vente chez Dupont-Durand.", answer: "Les meilleurs" },
          { q: "Le romarin est la plante qui agit …… contre la migraine.", answer: "le mieux" },
          { q: "Consulter votre médecin est …… solution.", answer: "la meilleure" },
          { q: "Il dit que le sirop au miel est …… traitement contre les maux de gorge.", answer: "le meilleur" },
          { q: "Mettre un oreiller sous les genoux est vraiment …… pour ne pas avoir mal au dos.", answer: "le mieux" },
          { q: "Regarder un film d'horreur le soir est …… moyen de ne pas dormir !", answer: "le meilleur" },
          { q: "Je trouve que …… plantes sont celles de ton jardin !", answer: "les meilleures" },
        ],
      },
      {
        num: 3, page: 82,
        instruction: "Mettez les mots dans l'ordre pour former des phrases. (/6)",
        vi: "Sắp xếp lại các từ thành câu đúng.",
        type: "order",
        items: [
          { tokens: ["ne sais pas", "quel", "Je", "médecin", "consulter ;", "conseilles-tu ?", "me", "lequel"], answer: ["Je", "ne sais pas", "quel", "médecin", "consulter ;", "lequel", "me", "conseilles-tu ?"] },
          { tokens: ["font", "de vos amies", "Lesquelles", "de l'hypertension ?"], answer: ["Lesquelles", "de vos amies", "font", "de l'hypertension ?"] },
          { tokens: ["sont là", "Deux infirmières", "aujourd'hui ;", "te", "voir ?", "laquelle"], answer: ["Deux infirmières", "sont là", "aujourd'hui ;", "laquelle", "te", "voir ?"] },
          { tokens: ["remèdes", "ne sais pas", "quels", "prendre ;", "Je", "les moins chers ?", "lesquels", "sont"], answer: ["Je", "ne sais pas", "quels", "remèdes", "prendre ;", "lesquels", "sont", "les moins chers ?"] },
          { tokens: ["acheter", "se demande", "quelles", "Il", "gouttes ; à ton avis", "sont", "les plus efficaces ?", "lesquelles"], answer: ["Il", "se demande", "quelles", "gouttes ; à ton avis", "lesquelles", "sont", "les plus efficaces ?"] },
          { tokens: ["parties du corps ?", "fait travailler", "quelles", "La natation"], answer: ["La natation", "fait travailler", "quelles", "parties du corps ?"] },
        ],
      },
      {
        num: 4, page: 82,
        instruction: "Vocabulaire — Remettez les actions dans l'ordre et écrivez le verbe sous chaque image. (/5)",
        vi: "Sắp xếp đúng thứ tự chu kỳ giấc ngủ và viết động từ dưới mỗi hình.",
        type: "fill",
        items: [
          { q: "1re action — image b", answer: "dormir" },
          { q: "2e action — image e", answer: "rêver" },
          { q: "3e action — image d", answer: "se réveiller" },
          { q: "4e action — image c", answer: "s'étirer" },
          { q: "5e action — image a", answer: "se lever" },
        ],
      },
      {
        num: 5, page: 83,
        instruction: "Vocabulaire — Vrai ou faux ? (/5)",
        vi: "Đúng hay Sai?",
        type: "truefalse",
        items: [
          { q: "Quand je suis en pleine forme, je me sens léger.", answer: true },
          { q: "La sérénité, c'est quand on est stressé.", answer: false },
          { q: "Quand on dort, on peut rêver.", answer: true },
          { q: "Masser veut dire se remettre.", answer: false },
          { q: "Quand on fait du sport, on peut avoir des courbatures.", answer: true },
        ],
      },
      {
        num: 6, page: 83,
        instruction: "Vocabulaire — Donnez des conseils avec les mots de la liste : traitement – gouttes – antiseptique – sirop – antibiotique. (/5)",
        vi: "Điền từ vào lời khuyên.",
        type: "fill",
        bank: ["traitement", "gouttes", "antiseptique", "sirop", "antibiotique"],
        items: [
          { q: "Je tousse. → Prends du …… .", answer: "sirop" },
          { q: "J'ai une infection. → Prenez cet …… .", answer: "antibiotique" },
          { q: "Je dors très mal. → Tiens, mets 10 …… dans un verre d'eau tous les soirs.", answer: "gouttes" },
          { q: "Je suis tombé et je me suis fait mal au genou. → Je vais vous donner un …… .", answer: "antiseptique" },
          { q: "J'ai le nez bouché, de la fièvre, mal à la gorge. → Ce …… te fera le plus grand bien !", answer: "traitement" },
        ],
      },
      {
        num: 7, page: 83,
        instruction: "Vocabulaire — Classez les mots suivants : le SAMU – une victime – les pompiers – un blessé – un malade – une ambulancière – un policier. (/5)",
        vi: "Đây là một dịch vụ cấp cứu, hay là người được cấp cứu?",
        type: "choice",
        items: [
          { q: "le SAMU", options: ["un service d'urgence", "la personne aidée"], answer: "un service d'urgence" },
          { q: "une victime", options: ["un service d'urgence", "la personne aidée"], answer: "la personne aidée" },
          { q: "les pompiers", options: ["un service d'urgence", "la personne aidée"], answer: "un service d'urgence" },
          { q: "un blessé", options: ["un service d'urgence", "la personne aidée"], answer: "la personne aidée" },
          { q: "un malade", options: ["un service d'urgence", "la personne aidée"], answer: "la personne aidée" },
          { q: "une ambulancière", options: ["un service d'urgence", "la personne aidée"], answer: "un service d'urgence" },
          { q: "un policier", options: ["un service d'urgence", "la personne aidée"], answer: "un service d'urgence" },
        ],
      },
      {
        // Page 81 — Compréhension orale : « Rêve et cauchemars : que traduisent-ils ? »
        num: 8, page: 81, audioSrc: piste(74),
        instruction: "Compréhension orale — « Rêve et cauchemars » — Vrai ou faux ?",
        vi: "Nghe bài về giấc mơ rồi trả lời Đúng/Sai.",
        type: "truefalse",
        items: [
          { q: "Rêver quand on dort n'est pas normal.", answer: false },
          { q: "Il y a plusieurs phases dans le sommeil.", answer: true },
        ],
      },
      {
        num: 9, page: 81, audioSrc: piste(74),
        instruction: "Compréhension orale — cochez la bonne réponse.",
        vi: "Vẫn bài nghe trên — chọn đáp án đúng.",
        type: "choice",
        items: [
          { q: "Rêver fait partie de :", options: ["notre sommeil", "nos émotions"], answer: "notre sommeil" },
          { q: "Le sommeil paradoxal dure :", options: ["90 minutes", "10 minutes"], answer: "90 minutes" },
          // Le corrigé imprimé étiquette cette réponse « e. » par erreur —
          // simple glissement de numérotation, l'exercice ne compte que les
          // items a, b, c.
          { q: "Rêver est l'expression des émotions :", options: ["de la soirée", "de la journée"], answer: "de la journée" },
        ],
      },
      {
        num: 10, page: 81, audioSrc: piste(74),
        instruction: "Compréhension orale — complétez les phrases.",
        vi: "Vẫn bài nghe trên — điền từ vào chỗ trống.",
        type: "fill",
        items: [
          { q: "Quand on rêve, le …… est en pleine action.", answer: "cerveau" },
          { q: "Le sommeil est une spécialité …… .", answer: "médicale" },
        ],
      },
      {
        // Page 86 — Jeux, act. 1 : reconstituer les mots à partir des étiquettes.
        num: 11, page: 86,
        instruction: "Jeux — Associez 2 étiquettes pour retrouver 5 mots.",
        vi: "Ghép 2 mảnh để tạo thành từ đúng.",
        type: "match",
        pairs: [
          { l: "MÉDE + CINE",  r: "médecine" },
          { l: "INFEC + TION", r: "infection" },
          { l: "MI + GRAINE",  r: "migraine" },
          { l: "PAT + RAQUE",  r: "patraque" },
          { l: "SYMP + TOMES", r: "symptômes" },
        ],
      },
      {
        // Page 86 — Jeux, act. 2 : grille menant au mot mystère.
        num: 12, page: 86,
        instruction: "Jeux — Complétez la grille pour trouver le mot mystère.",
        vi: "Điền vào ô chữ để tìm ra từ bí ẩn.",
        type: "fill",
        items: [
          { q: "Quand on ne peut pas dormir la nuit, on a une … .", answer: "insomnie", example: true },
          { q: "C'est une maladie qui empêche de respirer. C'est l'… .", answer: "asthme" },
          { q: "Elle arrive très vite quand il y a un accident. C'est une … .", answer: "ambulance" },
          { q: "Quand on a beaucoup de travail, on est … .", answer: "stressé" },
          { q: "Le mot mystère est :", answer: "matelas" },
        ],
      },
      {
        // Page 86 — Jeux, act. 4 : remettre le bon second mot à chaque expression.
        num: 13, page: 86,
        instruction: "Jeux — Quel désordre ! Retrouvez la bonne expression.",
        vi: "Ghép lại đúng cụm từ.",
        type: "match",
        pairs: [
          { l: "fatigue d'urgence",   r: "fatigue physique" },
          { l: "colonne cardiaque",   r: "colonne vertébrale" },
          { l: "corps physique",      r: "corps humain" },
          { l: "transport vertébrale", r: "transport d'urgence" },
          { l: "rythme humain",       r: "rythme cardiaque" },
        ],
      },
    ],

    // ── DELF A2 blanc (cahier p. 84-85) ────────────────────────────
    // Le livre a bien une page de préparation DELF pour cette unité
    // (« Santé au parcours », p. 181-183), mais c'est une compréhension des
    // écrits (routée via le step "lecture" du Parcours, editoA2Reading.js),
    // pas une écoute — donc pas de coLivre ici, même pattern que b2/b5.
    delf: {
      co: [
        {
          num: 1, page: 84, audioSrc: piste(75),
          instruction: "Compréhension de l'oral — vous écoutez 4 dialogues. Associez chacun à sa situation (6 situations proposées, seulement 4 utilisées). (7 points)",
          vi: "Nghe 4 đoạn hội thoại và chọn đúng tình huống giao tiếp cho từng đoạn (6 tình huống có sẵn, chỉ 4 đúng).",
          type: "choice",
          items: [
            { q: "Dialogue 1 (2 points) — quelle situation ?", options: ["Inviter quelqu'un", "Donner un conseil", "Demander de l'aide", "Féliciter", "S'informer sur un produit", "Exprimer un désaccord"], answer: "Féliciter" },
            { q: "Dialogue 2 (2 points) — quelle situation ?", options: ["Inviter quelqu'un", "Donner un conseil", "Demander de l'aide", "Féliciter", "S'informer sur un produit", "Exprimer un désaccord"], answer: "S'informer sur un produit" },
            { q: "Dialogue 3 (2 points) — quelle situation ?", options: ["Inviter quelqu'un", "Donner un conseil", "Demander de l'aide", "Féliciter", "S'informer sur un produit", "Exprimer un désaccord"], answer: "Exprimer un désaccord" },
            { q: "Dialogue 4 (1 point) — quelle situation ?", options: ["Inviter quelqu'un", "Donner un conseil", "Demander de l'aide", "Féliciter", "S'informer sur un produit", "Exprimer un désaccord"], answer: "Donner un conseil" },
          ],
        },
      ],
      // Compréhension des écrits — article « Santé au travail » : le Dr
      // Peccari donne des conseils contre les problèmes physiques liés au
      // travail de bureau. Le texte de l'article n'est pas reproduit dans le
      // corrigé source, seulement les questions et réponses.
      ce: [
        {
          num: 1, page: 84,
          instruction: "Compréhension des écrits — article « Santé au travail ». (7 points)",
          vi: "Đọc bài báo « Santé au travail » (Bác sĩ Peccari cho lời khuyên về các vấn đề thể chất do làm việc văn phòng) rồi chọn đáp án đúng.",
          type: "choice",
          items: [
            { q: "1. Quel conseil donne le Docteur Peccari contre le mal de dos ? (2 points)", options: ["S'étirer", "Marcher", "Se reposer"], answer: "Marcher" },
            { q: "2. Changer de position de travail est bon pour… (1 point)", options: ["les bras", "les yeux", "les jambes"], answer: "les jambes" },
            { q: "3. Le thym soigne les maladies de l'hiver. (1 point)", options: ["Vrai", "Faux"], answer: "Vrai" },
            { q: "4. Le romarin est efficace contre… (2 points)", options: ["l'anxiété", "les rhumes", "les allergies"], answer: "l'anxiété" },
            { q: "5. Quelle bonne habitude aide à mieux travailler ? (1 point)", options: ["Manger léger", "Sortir dehors", "Se coucher tôt"], answer: "Manger léger" },
          ],
        },
      ],
      // Production — no auto-grading; the cahier's model answer is the yardstick.
      production: [
        {
          // Page 81 — production libre de la fin de l'unité (pas notée DELF,
          // mais rangée ici comme les autres exercices de production non
          // auto-corrigeables — même pattern que la p.57 de b5).
          skill: "Production écrite (page 81)", points: "60 mots", page: 81,
          prompt: "Votre meilleure amie vous a envoyé un message. Vous êtes très inquiet/inquiète. Vous répondez à son message et lui posez des questions pour savoir ce qu'elle a. Vous lui donnez des conseils. (60 mots) — Message reçu : « Salut, je ne viendrai pas ce soir, je suis un peu patraque. Je t'appelle demain. Bonne soirée. Bises. » — Lina",
          vi: "Bạn thân gửi tin nhắn báo không đến được vì thấy không khỏe. Viết thư trả lời, hỏi thăm và cho lời khuyên. (60 từ)",
          model: "Salut Rémi, Merci pour ton message. Tu dis que tu es malade, mais qu'est-ce qui ne va pas ? Tu es patraque ou très fatigué ? Tu as mal où : à la gorge, au dos… ? Je te conseille de te coucher et de dormir. Tu as de la fièvre peut-être ? Alors, il est important de consulter un médecin. Est-ce que je peux t'aider ? J'attends de tes nouvelles très vite ! Bises, Flo",
        },
        {
          skill: "Production écrite", points: "12,5 points", page: 85,
          prompt: "Vous avez fait un stage santé pour être en meilleure forme. Vous écrivez à un(e) ami(e) français(e) pour lui raconter le stage (lieu, activités). Vous lui donnez aussi vos impressions. (60 mots minimum)",
          vi: "Viết thư kể cho bạn Pháp nghe về một khóa tu sức khỏe bạn đã tham gia: địa điểm, hoạt động, cảm nhận. (tối thiểu 60 từ)",
          model: "Chère Marie, Le mois dernier, j'ai fait un stage santé pendant 3 jours. C'était génial ! Nous étions 15 stagiaires. Nous avons dormi dans une grande maison, au milieu des montagnes. C'était calme et magnifique. Le matin, nous avions des cours sur le corps et les remèdes naturels. L'après-midi, nous faisions des activités physiques. Moi, j'ai fait du yoga et de la marche. Grâce à ce stage, je suis en pleine forme maintenant ! Je te conseille de le faire ! Je t'appelle bientôt ! Bisous, Lucie",
        },
        {
          skill: "Production orale", points: "3 à 4 minutes", page: 85,
          prompt: "Partie 3 de l'épreuve : monologue suivi (2 minutes environ). Sujet : Le sport. Quelle est votre activité sportive préférée ? Quand, où et avec qui la pratiquez-vous ? Pourquoi est-ce que vous aimez cette activité ? Quel sport n'aimez-vous pas ? Pourquoi ?",
          vi: "Độc thoại khoảng 2 phút về chủ đề Thể thao: môn thể thao yêu thích, khi nào/ở đâu/với ai, vì sao thích, và môn không thích vì sao.",
          model: "Je fais du karaté depuis 3 ans. J'adore ça ! Je suis inscrite au club de karaté de ma ville. Il n'y a pas de dojo, la salle spéciale pour les arts martiaux. Je vais au gymnase. Il y a une salle avec des tatamis, ce sont des grands coussins plats. J'y vais deux fois par semaine, le lundi et le mercredi soir, avec mon amie Maxine. J'ai la ceinture verte maintenant, c'est un bon niveau. J'adore le karaté parce que les gestes sont très beaux, c'est un peu comme de la danse. J'apprends aussi la discipline et le respect du professeur. Avant le karaté, je faisais du volley-ball. C'était trop difficile, le ballon arrivait fort donc j'avais toujours mal aux mains. Je n'ai pas aimé, j'ai arrêté au bout d'un an. Le karaté n'est pas aussi violent.",
        },
      ],
    },
  },

  b9: {

    // ── Grammaire, keyed by the grammar point index in editoGrammarA2.js ──
    grammar: {

      // p0 — Le conditionnel présent (1) (cahier p. 99)
      p0: [
        {
          num: 1, page: 99, audioSrc: piste(86),
          instruction: "Écoutez et cochez le temps utilisé dans chaque phrase (futur simple ou conditionnel présent).",
          vi: "Nghe từng câu (a→g) và cho biết đó là futur simple hay conditionnel présent.",
          type: "choice",
          items: [
            { q: "a. (exemple)", options: ["futur simple", "conditionnel présent"], answer: "conditionnel présent", example: true },
            { q: "b.", options: ["futur simple", "conditionnel présent"], answer: "futur simple" },
            { q: "c.", options: ["futur simple", "conditionnel présent"], answer: "futur simple" },
            { q: "d.", options: ["futur simple", "conditionnel présent"], answer: "conditionnel présent" },
            { q: "e.", options: ["futur simple", "conditionnel présent"], answer: "futur simple" },
            { q: "f.", options: ["futur simple", "conditionnel présent"], answer: "conditionnel présent" },
            { q: "g.", options: ["futur simple", "conditionnel présent"], answer: "conditionnel présent" },
          ],
        },
        {
          num: 2, page: 99,
          instruction: "Entourez le verbe conjugué au conditionnel présent.",
          vi: "Chọn động từ được chia đúng ở conditionnel présent.",
          type: "choice",
          items: [
            { q: "a.", options: ["j'emprunte", "j'emprunterais", "j'emprunterai", "j'empruntais"], answer: "j'emprunterais", example: true },
            { q: "b.", options: ["nous aurons", "nous avons", "nous avions", "nous aurions"], answer: "nous aurions" },
            { q: "c.", options: ["elles pouvaient", "elles pourront", "elles pourraient", "elles peuvent"], answer: "elles pourraient" },
            { q: "d.", options: ["tu dirais", "tu diras", "tu dis", "tu disais"], answer: "tu dirais" },
            { q: "e.", options: ["vous aimez", "vous aimiez", "vous aimeriez", "vous aimerez"], answer: "vous aimeriez" },
            { q: "f.", options: ["on offrira", "on offrait", "on offre", "on offrirait"], answer: "on offrirait" },
          ],
        },
        {
          num: 3, page: 99,
          instruction: "a. Ajoutez aux verbes les terminaisons du conditionnel présent. b. Dites si c'est une proposition, un conseil, un souhait ou une demande polie.",
          vi: "a. Chia động từ ở conditionnel présent. b. Đó là đề nghị, lời khuyên, ước muốn hay yêu cầu lịch sự?",
          type: "fill",
          bank: ["une proposition", "un conseil", "un souhait", "une demande polie"],
          items: [
            { q: "Tu devr___ acheter des produits en promotion. (verbe + type)", answer: "ais — un conseil", example: true },
            { q: "Ils voudr…… apprendre à résister. (verbe + type)", answer: "voudraient — un souhait" },
            { q: "Ça te dir…… de m'aider à choisir ? (verbe + type)", answer: "dirait — une proposition" },
            { q: "Je pourr…… essayer ces chaussures ? (verbe + type)", answer: "pourrais — une demande polie" },
            { q: "Il faudr…… changer la couleur. (verbe + type)", answer: "faudrait — un conseil" },
            { q: "Excusez-moi, vous aur…… une autre taille ? (verbe + type)", answer: "auriez — une demande polie" },
            { q: "Tu viendr…… voir les meubles avec moi ? (verbe + type)", answer: "viendrais — une proposition" },
          ],
        },
        {
          num: 4, page: 99,
          instruction: "Transformez les phrases en utilisant le conditionnel présent.",
          vi: "Chuyển câu sang conditionnel présent.",
          type: "transform",
          items: [
            { q: "Il doit revendre ces objets.", answer: "Il devrait revendre ces objets.", example: true },
            { q: "Je veux emprunter ton ordinateur.", answer: "Je voudrais emprunter ton ordinateur." },
            { q: "Pierre souhaite être riche.", answer: "Pierre souhaiterait être riche." },
            { q: "Nous pouvons acheter ces produits.", answer: "Nous pourrions acheter ces produits." },
            { q: "Ils ont besoin d'un manteau neuf.", answer: "Ils auraient besoin d'un manteau neuf." },
            { q: "Il ne faut pas aller au supermarché.", answer: "Il ne faudrait pas aller au supermarché." },
            { q: "Pouvez-vous m'expliquer ce défi ?", answer: "Pourriez-vous m'expliquer ce défi ?" },
          ],
        },
      ],

      // p1 — Le gérondif (cahier p. 101)
      p1: [
        {
          num: 1, page: 101,
          instruction: "Lisez les phrases et dites si les verbes au gérondif expriment deux actions simultanées ou la manière.",
          vi: "Gérondif trong câu diễn tả hai hành động đồng thời hay cách thức làm việc gì?",
          type: "choice",
          items: [
            { q: "Il a acheté cette machine à coudre en faisant les courses.", options: ["deux actions simultanées", "la manière"], answer: "la manière", example: true },
            { q: "J'ai vendu mon aspirateur en postant une annonce.", options: ["deux actions simultanées", "la manière"], answer: "la manière" },
            { q: "Elle décore sa maison en chantant.", options: ["deux actions simultanées", "la manière"], answer: "deux actions simultanées" },
            { q: "En surfant sur Internet, j'ai trouvé cette promotion.", options: ["deux actions simultanées", "la manière"], answer: "la manière" },
            { q: "Tu devrais donner cette table en vendant les chaises.", options: ["deux actions simultanées", "la manière"], answer: "deux actions simultanées" },
            { q: "Nous créons en imaginant la mode de demain.", options: ["deux actions simultanées", "la manière"], answer: "la manière" },
          ],
        },
        {
          num: 2, page: 101, audioSrc: piste(88),
          instruction: "Écoutez et cochez les phrases avec un verbe au gérondif.",
          vi: "Nghe từng câu (a→g) và cho biết câu đó có dùng gérondif không.",
          type: "truefalse",
          items: [
            { q: "a. (exemple)", answer: true, example: true },
            { q: "b.", answer: false },
            { q: "c.", answer: false },
            { q: "d.", answer: true },
            { q: "e.", answer: true },
            { q: "f.", answer: false },
            { q: "g.", answer: true },
          ],
        },
        {
          num: 3, page: 101,
          instruction: "Associez les éléments pour former des phrases.",
          vi: "Nối đầu câu với cuối câu.",
          type: "match",
          pairs: [
            { l: "Elle regarde la télévision",   r: "en tricotant." },
            { l: "Ils obtiennent des informations", r: "en discutant avec le vendeur." },
            { l: "Mon père bricole",             r: "en écoutant de la musique." },
            { l: "Mathieu répare la tondeuse",   r: "en changeant la pièce cassée." },
            { l: "Je gagne de l'argent",         r: "en louant mes vêtements sur Internet." },
            { l: "Il économise",                 r: "en fabriquant ses produits." },
          ],
        },
        {
          num: 4, page: 101,
          instruction: "Trouvez le gérondif des verbes suivants.",
          vi: "Viết gérondif của các động từ sau.",
          type: "fill",
          items: [
            { q: "fabriquer", answer: "en fabriquant", example: true },
            { q: "savoir", answer: "en sachant" },
            { q: "regarder", answer: "en regardant" },
            { q: "être", answer: "en étant" },
            { q: "payer", answer: "en payant" },
            { q: "avoir", answer: "en ayant" },
            { q: "travailler", answer: "en travaillant" },
          ],
        },
        {
          num: 5, page: 101,
          instruction: "Transformez les phrases en utilisant le gérondif.",
          vi: "Ghép hai câu thành một câu dùng gérondif.",
          type: "transform",
          items: [
            { q: "J'achète du tissu. Je vais à la mercerie.", answer: "J'achète du tissu en allant à la mercerie.", example: true },
            { q: "Je décore mon salon. J'installe une bibliothèque.", answer: "Je décore mon salon en installant une bibliothèque." },
            { q: "Mon oncle coupe du bois. Il utilise une scie.", answer: "Mon oncle coupe du bois en utilisant une scie." },
            { q: "J'apprends le bricolage. Je répare de vieux meubles.", answer: "J'apprends le bricolage en réparant de vieux meubles." },
            { q: "Marie crée des vêtements. Elle s'intéresse au mélange de matières.", answer: "Marie crée des vêtements en s'intéressant au mélange de matières." },
            { q: "Tu abîmes la lampe. Tu ne fais pas attention.", answer: "Tu abîmes la lampe en ne faisant pas attention." },
          ],
        },
      ],

      // p2 — Le conditionnel présent (2) (cahier p. 103)
      p2: [
        {
          num: 1, page: 103,
          instruction: "Associez. Dans un monde parfait…",
          vi: "Nối đầu câu với cuối câu — « Dans un monde parfait… ».",
          type: "match",
          pairs: [
            { l: "nous",           r: "réparerions nos objets cassés." },
            { l: "il y",           r: "aurait plus de magasins de location." },
            { l: "tu",             r: "serais mieux payé." },
            { l: "tout le monde",  r: "pourrait avoir un jardin." },
            { l: "vous",           r: "créeriez des produits recyclables." },
          ],
        },
        {
          num: 2, page: 103,
          instruction: "Conjuguez les verbes au conditionnel présent (tu, elle, nous, ils).",
          vi: "Chia động từ ở conditionnel présent với tu / elle / nous / ils.",
          type: "fill",
          items: [
            { q: "acheter — tu", answer: "achèterais", example: true },
            { q: "acheter — elle", answer: "achèterait" },
            { q: "acheter — nous", answer: "achèterions" },
            { q: "acheter — ils", answer: "achèteraient" },
            { q: "devenir — tu", answer: "deviendrais" },
            { q: "devenir — elle", answer: "deviendrait" },
            { q: "devenir — nous", answer: "deviendrions" },
            { q: "devenir — ils", answer: "deviendraient" },
            { q: "savoir — tu", answer: "saurais" },
            { q: "savoir — elle", answer: "saurait" },
            { q: "savoir — nous", answer: "saurions" },
            { q: "savoir — ils", answer: "sauraient" },
            { q: "aller — tu", answer: "irais" },
            { q: "aller — elle", answer: "irait" },
            { q: "aller — nous", answer: "irions" },
            { q: "aller — ils", answer: "iraient" },
            { q: "finir — tu", answer: "finirais" },
            { q: "finir — elle", answer: "finirait" },
            { q: "finir — nous", answer: "finirions" },
            { q: "finir — ils", answer: "finiraient" },
            { q: "vendre — tu", answer: "vendrais" },
            { q: "vendre — elle", answer: "vendrait" },
            { q: "vendre — nous", answer: "vendrions" },
            { q: "vendre — ils", answer: "vendraient" },
          ],
        },
        {
          num: 3, page: 103, audioSrc: piste(90),
          instruction: "Écoutez et cochez si la situation entendue est réelle ou imaginaire.",
          vi: "Nghe từng câu (a→f) và cho biết tình huống là thật hay tưởng tượng.",
          type: "choice",
          items: [
            { q: "a. (exemple)", options: ["situation réelle", "situation imaginaire"], answer: "situation imaginaire", example: true },
            { q: "b.", options: ["situation réelle", "situation imaginaire"], answer: "situation imaginaire" },
            { q: "c.", options: ["situation réelle", "situation imaginaire"], answer: "situation réelle" },
            { q: "d.", options: ["situation réelle", "situation imaginaire"], answer: "situation imaginaire" },
            { q: "e.", options: ["situation réelle", "situation imaginaire"], answer: "situation réelle" },
            { q: "f.", options: ["situation réelle", "situation imaginaire"], answer: "situation imaginaire" },
          ],
        },
        {
          num: 4, page: 103,
          instruction: "Conjuguez les verbes entre parenthèses au conditionnel présent.",
          vi: "Chia động từ trong ngoặc ở conditionnel présent — « Dans un monde où… ».",
          type: "fill",
          items: [
            { q: "Dans un monde où les livres n'(exister) ___ pas, on (regarder) ___ beaucoup plus la télévision. (2 từ)", answer: "existeraient regarderait", example: true },
            { q: "Dans un monde où on (parler) ___ une seule langue, on (communiquer) ___ facilement. (2 từ)", answer: "parlerait communiquerait" },
            { q: "Dans un monde où on ne (travailler) ___ pas, les gens (faire) ___ plus d'activités manuelles. (2 từ)", answer: "travaillerait feraient" },
            { q: "Dans un monde où il n'y (avoir) ___ pas Internet, ce (être) ___ difficile de trouver des informations. (2 từ)", answer: "aurait serait" },
            { q: "Dans un monde où on (vivre) ___ du troc, l'argent n'(exister) ___ pas. (2 từ)", answer: "vivrait existerait" },
            { q: "Dans un monde où les gens (savoir) ___ jardiner, on (cultiver) ___ nos fruits et légumes. (2 từ)", answer: "sauraient cultiveraient" },
          ],
        },
      ],
    },

    // ── Phonie-graphie (cahier p. 104) — wired into the Phono step ─────
    // Seules Discrimination (act. 1) et Dictée (act. 3) ont une réponse
    // vérifiable. Articulation (act. 2, dialogues à répéter) et
    // Interprétation (act. 4, lecture à voix haute) restent des exercices
    // oraux sans réponse unique — même choix que pour les autres unités.
    phono: [
      {
        num: 1, page: 104, audioSrc: piste(91),
        instruction: "Discrimination — écoutez et dites dans quel ordre vous entendez les sons [g] et [ʒ].",
        vi: "Nghe và cho biết thứ tự hai âm: [g] (như « garder ») trước hay [ʒ] (như « jeter ») trước?",
        type: "choice",
        items: [
          { q: "a. (exemple)", options: ["[g] avant [ʒ]", "[ʒ] avant [g]"], answer: "[g] avant [ʒ]", example: true },
          { q: "b.", options: ["[g] avant [ʒ]", "[ʒ] avant [g]"], answer: "[ʒ] avant [g]" },
          { q: "c.", options: ["[g] avant [ʒ]", "[ʒ] avant [g]"], answer: "[g] avant [ʒ]" },
          { q: "d.", options: ["[g] avant [ʒ]", "[ʒ] avant [g]"], answer: "[g] avant [ʒ]" },
          { q: "e.", options: ["[g] avant [ʒ]", "[ʒ] avant [g]"], answer: "[g] avant [ʒ]" },
          { q: "f.", options: ["[g] avant [ʒ]", "[ʒ] avant [g]"], answer: "[g] avant [ʒ]" },
          { q: "g.", options: ["[g] avant [ʒ]", "[ʒ] avant [g]"], answer: "[ʒ] avant [g]" },
        ],
      },
      {
        num: 3, page: 104, audioSrc: piste(93),
        instruction: "Dictée — écoutez le texte et complétez les mots.",
        vi: "Nghe và điền các từ còn thiếu (âm [g] hoặc [ʒ]).",
        type: "fill",
        items: [
          { q: "Pour économiser de l'ar___ent,", answer: "g", example: true },
          { q: "pensez au troc, à l'échan___e d'ob___ets et de services dans votre voisina___e. (3 từ, cách nhau bởi dấu cách)", answer: "g j g" },
          { q: "Pour éviter le ___aspilla___e,", answer: "g g" },
          { q: "___ardez vos appareils électroména___ers,", answer: "g g" },
          { q: "ne les ___etez pas et faites-les réparer.", answer: "j" },
          { q: "C'est plus écolo___ique !", answer: "g" },
        ],
      },
    ],

    // ── Vocabulaire, keyed to match the Parcours vocab steps ──────────
    // c1_vocab (cahier p. 100) couvre les groupes b9g1-b9g4 du livre
    // (consommer, le produit, les personnes, les catégories de produits) ;
    // c2_vocab (cahier p. 102) couvre b9g5-b9g8 (travaux manuels, matières,
    // réparation, équipement) — voir parcoursDataA2.js.
    vocab: {
      c1_vocab: [
        {
          num: 1, page: 100,
          instruction: "Remettez les lettres dans l'ordre pour trouver les catégories de produits.",
          vi: "Sắp xếp lại các chữ cái để tìm ra tên các loại sản phẩm.",
          type: "fill",
          items: [
            { q: "D P U O R T I D E T E B A E U", answer: "le produit de beauté", example: true },
            { q: "E O M N A T A T L I I N", answer: "l'alimentation" },
            { q: "B E M L U E", answer: "meubles" },
            { q: "T S M E V E T N E", answer: "vêtements" },
            { q: "G M E N E C O R L E A R T E", answer: "l'électroménager" },
            { q: "I E M U M T I D A L", answer: "multimédia" },
          ],
        },
        {
          // Liste proposée : jeter – acheter – partager – économiser – louer –
          // négocier – emprunter – vendre – dépenser. Trois intrus dans cette
          // liste (acheter, économiser, dépenser ne servent à aucune image).
          num: 2, page: 100, audioSrc: piste(87),
          instruction: "Écoutez. Pour chaque situation (image a → f), associez un verbe de la liste : jeter – acheter – partager – économiser – louer – négocier – emprunter – vendre – dépenser. Attention, il y a trois intrus.",
          vi: "Nghe và nối mỗi tình huống (hình a→f) với động từ phù hợp. Chú ý: có 3 từ gây nhiễu trong danh sách (không dùng cho hình nào).",
          type: "fill",
          bank: ["jeter", "acheter", "partager", "économiser", "louer", "négocier", "emprunter", "vendre", "dépenser"],
          items: [
            { q: "a. livre (exemple)", answer: "emprunter", example: true },
            { q: "b. pull", answer: "jeter" },
            { q: "c. télé", answer: "négocier" },
            { q: "d. tente", answer: "vendre" },
            { q: "e. gâteau", answer: "partager" },
            { q: "f. voiture", answer: "louer" },
          ],
        },
        {
          num: 3, page: 100,
          instruction: "Trouvez le féminin des noms suivants.",
          vi: "Viết giống cái của các danh từ sau.",
          type: "fill",
          items: [
            { q: "le client", answer: "la cliente", example: true },
            { q: "le vendeur", answer: "la vendeuse" },
            { q: "l'utilisateur", answer: "l'utilisatrice" },
            { q: "le consommateur", answer: "la consommatrice" },
            { q: "l'acheteur", answer: "l'acheteuse" },
          ],
        },
        {
          num: 4, page: 100,
          instruction: "Classez dans le tableau les mots suivants : prix – taille – couleur – objet – promotion – marque.",
          vi: "Phân loại từ vào bảng: prix – taille – couleur – objet – promotion – marque. (Ví dụ đã cho: « robe » → l'objet ; các dòng khác là ví dụ minh họa cho từng loại.)",
          type: "fill",
          bank: ["l'objet", "la couleur", "la taille", "la marque", "le prix", "la promotion"],
          items: [
            { q: "robe → catégorie de l'exemple", answer: "l'objet", example: true },
            { q: "beige → quelle catégorie ?", answer: "la couleur" },
            { q: "38 → quelle catégorie ?", answer: "la taille" },
            { q: "BOYA → quelle catégorie ?", answer: "la marque" },
            { q: "100 euros → quelle catégorie ?", answer: "le prix" },
            { q: "50 % → quelle catégorie ?", answer: "la promotion" },
          ],
        },
      ],

      c2_vocab: [
        {
          num: 1, page: 102,
          instruction: "Reliez les objets aux matières.",
          vi: "Nối đồ vật với chất liệu tương ứng.",
          type: "match",
          pairs: [
            { l: "des chaussures", r: "en cuir" },
            { l: "une bouteille",  r: "en plastique" },
            { l: "une veste",      r: "en laine" },
            { l: "une assiette",   r: "en carton" },
            { l: "une maison",     r: "en bois" },
            { l: "une table",      r: "en fer" },
          ],
        },
        {
          num: 2, page: 102,
          instruction: "Associez les mots suivants aux images : l'échelle – l'outil – la ponceuse – la scie – la tondeuse.",
          vi: "Nối từ với hình ảnh tương ứng.",
          type: "fill",
          bank: ["l'échelle", "l'outil", "la ponceuse", "la scie", "la tondeuse"],
          items: [
            { q: "a. clé / tournevis (exemple)", answer: "l'outil", example: true },
            { q: "b. échelle en bois", answer: "l'échelle" },
            { q: "c. scie à main", answer: "la scie" },
            { q: "d. ponceuse électrique", answer: "la ponceuse" },
            { q: "e. tondeuse à gazon", answer: "la tondeuse" },
          ],
        },
        {
          num: 3, page: 102, audioSrc: piste(89),
          instruction: "De quels travaux manuels s'agit-il ? Écoutez et associez (1. bricolage, 2. tricot, 3. mécanique auto, 4. décoration murale).",
          vi: "Nghe và cho biết mỗi đoạn (a→g) nói về công việc thủ công nào trong 4 loại cho sẵn.",
          type: "fill",
          items: [
            { q: "a. (exemple)", answer: "1", example: true },
            { q: "b.", answer: "4" },
            { q: "c.", answer: "2" },
            { q: "d.", answer: "3" },
            { q: "e.", answer: "1" },
            { q: "f.", answer: "3" },
            { q: "g.", answer: "4" },
          ],
        },
        {
          num: 4, page: 102,
          instruction: "Entourez l'élément qui convient.",
          vi: "Chọn từ phù hợp.",
          type: "choice",
          items: [
            { q: "J'ai besoin d'___ pour peindre les murs.", options: ["une échelle", "une tondeuse"], answer: "une échelle", example: true },
            { q: "Tu dois appeler un technicien pour ___ ta télévision.", options: ["réparer", "créer"], answer: "réparer" },
            { q: "Il faut ___ la pièce de la voiture.", options: ["changer", "poncer"], answer: "changer" },
            { q: "J'aimerais apprendre à ___, mais je n'ai aucun outil.", options: ["bricoler", "tricoter"], answer: "bricoler" },
            { q: "Ce canapé est ___.", options: ["abîmé", "en panne"], answer: "abîmé" },
            { q: "Regarde ___ pour comprendre comment ça fonctionne.", options: ["le tutoriel", "l'atelier"], answer: "le tutoriel" },
          ],
        },
      ],
    },

    // ── Bilan linguistique (cahier p. 106-107, noté /40) ────────────
    // Wired into the "L'essentiel" step, alongside the AI-generated quiz.
    // La compréhension orale + production écrite de la page 105
    // (« Consommer en recyclant ») est reprise ici aussi — même pattern que
    // pour les p.81/p.9 des autres unités. La production est rangée dans
    // delf.production, comme pour b7.
    bilan: [
      {
        num: 1, page: 106,
        instruction: "Transformez les phrases en utilisant le conditionnel présent. (/7)",
        vi: "Chuyển câu sang conditionnel présent.",
        type: "transform",
        items: [
          { q: "Tu veux t'inscrire à cet atelier ?", answer: "Tu voudrais t'inscrire à cet atelier ?" },
          { q: "Nous aimons jardiner.", answer: "Nous aimerions jardiner." },
          { q: "Il faut changer nos habitudes.", answer: "Il faudrait changer nos habitudes." },
          { q: "Je souhaite décorer mon appartement.", answer: "Je souhaiterais décorer mon appartement." },
          { q: "Vous pouvez me prêter ce livre ?", answer: "Vous pourriez me prêter ce livre ?" },
          { q: "Ils doivent prendre une belle photo.", answer: "Ils devraient prendre une belle photo." },
          { q: "Elle choisit le vélo en promotion.", answer: "Elle choisirait le vélo en promotion." },
        ],
      },
      {
        num: 2, page: 106,
        instruction: "Reformulez avec un gérondif. (/7)",
        vi: "Ghép hai câu thành một câu dùng gérondif.",
        type: "transform",
        items: [
          { q: "J'ai voulu cuisiner ce plat quand j'ai vu la vidéo.", answer: "J'ai voulu cuisiner ce plat en voyant la vidéo." },
          { q: "Martin a abîmé sa voiture quand il est venu prendre un café.", answer: "Martin a abîmé sa voiture en venant prendre un café." },
          { q: "Il s'est fait mal quand il a installé le meuble.", answer: "Il s'est fait mal en installant le meuble." },
          { q: "Nadège propose du covoiturage quand elle va au travail.", answer: "Nadège propose du covoiturage en allant au travail." },
          { q: "Les gens consomment plus quand ils ont de l'argent.", answer: "Les gens consomment plus en ayant de l'argent." },
          { q: "Elle s'est mise au troc quand elle a entendu ses voisins en parler.", answer: "Elle s'est mise au troc en entendant ses voisins en parler." },
          { q: "Tu achèteras ces chaussures quand tu reviendras de vacances.", answer: "Tu achèteras ces chaussures en revenant de vacances." },
        ],
      },
      {
        num: 3, page: 106,
        instruction: "Entourez la forme qui convient. (Dans un monde idéal…) (/6)",
        vi: "Chọn dạng đúng — « Dans un monde idéal… ».",
        type: "choice",
        items: [
          { q: "je ___ beaucoup d'argent.", options: ["gagnerais", "gagnerai"], answer: "gagnerais" },
          { q: "mes parents ___ de travailler.", options: ["arrêteront", "arrêteraient"], answer: "arrêteraient" },
          { q: "nous ___ une grande maison.", options: ["aurions", "aurons"], answer: "aurions" },
          { q: "j'___ un magasin de vêtements d'occasion.", options: ["ouvrirai", "ouvrirais"], answer: "ouvrirais" },
          { q: "les gens ___ troquer leurs affaires.", options: ["viendraient", "viendront"], answer: "viendraient" },
          { q: "les bouteilles en plastique n'___ plus.", options: ["existeront", "existeraient"], answer: "existeraient" },
        ],
      },
      {
        num: 4, page: 107,
        instruction: "Vocabulaire — Barrez l'intrus. (/5)",
        vi: "Tìm từ lạc loài trong mỗi nhóm.",
        type: "choice",
        items: [
          { q: "a.", options: ["acheter", "dépenser", "payer", "vendre"], answer: "vendre" },
          { q: "b.", options: ["d'occasion", "en promotion", "cher", "gratuit"], answer: "cher" },
          { q: "c.", options: ["le particulier", "la couleur", "la marque", "la taille"], answer: "le particulier" },
          { q: "d.", options: ["négocier", "jeter", "emprunter", "louer"], answer: "jeter" },
          { q: "e.", options: ["l'acheteur", "le consommateur", "le vendeur", "l'utilisateur"], answer: "le vendeur" },
        ],
      },
      {
        num: 5, page: 107,
        instruction: "Vocabulaire — Où acheter ces produits ? Trouvez à quelle catégorie ils appartiennent. (/5)",
        vi: "Sản phẩm thuộc loại nào?",
        type: "fill",
        items: [
          { q: "tablette, téléphone, ordinateur", answer: "le multimédia" },
          { q: "pyramide alimentaire", answer: "l'alimentation" },
          { q: "aspirateur", answer: "l'électroménager" },
          { q: "sac et chaussures de sport", answer: "le matériel de sport" },
          { q: "crèmes, parfums", answer: "le produit de beauté" },
        ],
      },
      {
        num: 6, page: 107,
        instruction: "Vocabulaire — Lisez la définition et trouvez la matière correspondante. (/5)",
        vi: "Đọc định nghĩa rồi tìm ra chất liệu tương ứng.",
        type: "fill",
        bank: ["le papier", "le tissu", "le verre", "le coton", "le jean"],
        items: [
          { q: "On écrit et on dessine dessus.", answer: "le papier" },
          { q: "On achète cette matière à la mercerie. On peut créer des vêtements.", answer: "le tissu" },
          { q: "On utilise souvent cette matière pour boire. Elle se casse facilement.", answer: "le verre" },
          { q: "C'est une matière douce qui vient d'une plante. On peut l'acheter avec les produits de beauté.", answer: "le coton" },
          { q: "Les pantalons et les vestes sont souvent faits avec cette matière. La couleur principale est le bleu.", answer: "le jean" },
        ],
      },
      {
        num: 7, page: 107,
        instruction: "Vocabulaire — Complétez le texte avec les mots suivants : une ponceuse – l'atelier – en bois – réparer – outils. (/5)",
        vi: "Điền từ vào đoạn văn.",
        type: "fill",
        bank: ["une ponceuse", "l'atelier", "en bois", "réparer", "outils"],
        items: [
          { q: "Tu viens avec moi à …… , j'ai un problème avec une chaise et je n'ai pas les bons …… . (2 từ)", answer: "l'atelier outils" },
          { q: "J'ai besoin d'…… .", answer: "une ponceuse" },
          { q: "Comme elle est …… , je peux facilement la …… . (2 từ)", answer: "en bois réparer" },
        ],
      },
      {
        // Page 105 — Compréhension orale : « Consommer en recyclant »
        num: 8, page: 105, audioSrc: piste(95),
        instruction: "Compréhension orale — « Consommer en recyclant ».",
        vi: "Nghe bài về Sarah, người tái chế đồ vật, rồi trả lời.",
        type: "choice",
        items: [
          { q: "1. Que propose d'écouter le document ?", options: ["Un flash info", "Une émission de radio", "Une publicité"], answer: "Une émission de radio" },
        ],
      },
      {
        num: 9, page: 105, audioSrc: piste(95),
        instruction: "Compréhension orale — complétez : Des hommes et des femmes nous expliquent comment ils ont adopté un mode de vie plus …… , bien …… pour l'environnement et plus …… . (3 từ, cách nhau bởi dấu cách)",
        vi: "Vẫn bài nghe trên — điền 3 từ vào chỗ trống.",
        type: "fill",
        items: [
          { q: "Des hommes et des femmes nous expliquent comment ils ont adopté un mode de vie plus …… , bien …… pour l'environnement et plus …… .", answer: "responsable meilleur créatif" },
        ],
      },
      {
        num: 10, page: 105, audioSrc: piste(95),
        instruction: "Compréhension orale — vrai ou faux ?",
        vi: "Vẫn bài nghe trên — đúng hay sai?",
        type: "truefalse",
        items: [
          { q: "Sarah récupère des objets qu'elle transforme.", answer: true },
          { q: "Elle achète des objets qui coûtent cher.", answer: false },
          { q: "Le bois est un matériau solide.", answer: true },
          { q: "Le bois n'est pas facile à peindre.", answer: false },
        ],
      },
      {
        num: 11, page: 105, audioSrc: piste(95),
        instruction: "Compréhension orale — après la transformation, Sarah obtient un objet (2 réponses).",
        vi: "Vẫn bài nghe trên — chọn 2 đáp án đúng.",
        type: "choice",
        items: [
          { q: "Après la transformation, Sarah obtient un objet…", options: ["nouveau", "gratuit", "original", "utile"], answer: "nouveau" },
          { q: "Après la transformation, Sarah obtient aussi un objet…", options: ["nouveau", "gratuit", "original", "utile"], answer: "original" },
        ],
      },
      {
        // Page 110 — Jeux, act. 1 : associer 2 étiquettes pour retrouver 4 expressions.
        num: 12, page: 110,
        instruction: "Jeux — Associez 2 étiquettes pour retrouver 4 expressions.",
        vi: "Ghép 2 mảnh để tạo thành cụm từ đúng.",
        type: "match",
        pairs: [
          { l: "consommation", r: "responsable" },
          { l: "travaux",      r: "manuels" },
          { l: "fait",         r: "maison" },
          { l: "objets",       r: "d'occasion" },
        ],
      },
      {
        // Page 110 — Jeux, act. 2 : code secret. Le message d'Henri est donné
        // en clair dans le corrigé ; repris ici comme un exercice à trous
        // pour que l'apprenant le retape lui-même.
        num: 13, page: 110,
        instruction: "Jeux — Code secret. Henri imagine un monde meilleur. Retrouvez son message (recopiez-le en entier).",
        vi: "Giải mã và gõ lại toàn bộ thông điệp bí mật của Henri.",
        type: "fill",
        items: [
          { q: "Message décodé d'Henri :", answer: "Dans ce monde, on n'aurait pas besoin d'argent. On ferait du troc. On profiterait de la vie. Ça vous dirait ?" },
        ],
      },
    ],

    // ── DELF A2 blanc (cahier p. 108-109) ───────────────────────────
    // Le livre n'a pas de page de préparation DELF dédiée pour cette unité
    // (ni écoute dans editoAudioA2.js, ni lecture DELF dans
    // editoA2Reading.js pour b9) — donc pas de coLivre, même pattern que
    // b2/b5/b7.
    delf: {
      co: [
        {
          num: 1, page: 108, audioSrc: piste(96),
          instruction: "Compréhension de l'oral — vous écoutez des annonces publiques. (6 points)",
          vi: "Nghe các thông báo nơi công cộng rồi chọn đáp án đúng.",
          type: "choice",
          items: [
            { q: "1. Qu'est-ce que vous pouvez recevoir au troc ?", options: ["Des jouets", "Des livres", "Des vêtements"], answer: "Des livres" },
            { q: "2. Qu'est-ce que vous pouvez acheter à petit prix ?", options: ["De l'alimentation", "De l'électroménager", "Des produits de beauté"], answer: "Des produits de beauté" },
            { q: "3. Qu'est-ce que vous pouvez faire cet après-midi ?", options: ["Réparer un appareil", "Recoudre un vêtement", "Faire des loisirs créatifs"], answer: "Faire des loisirs créatifs" },
            { q: "4. Quel service veulent les résidents ?", options: ["Jardinage", "Ménage", "Garde d'enfants"], answer: "Jardinage" },
            { q: "5. Qu'est-ce que vous pouvez louer ?", options: ["Vélo", "Kayak", "Tente"], answer: "Tente" },
            { q: "6. Pour monter votre meuble, qu'est-ce que vous devez faire ?", options: ["Regarder un tutoriel", "Lire le mode d'emploi", "Attendre un technicien"], answer: "Lire le mode d'emploi" },
          ],
        },
      ],
      // Compréhension des écrits — article « Les loisirs créatifs, l'activité
      // préférée des Français » (Magosha, 26 ans, et Claire, 38 ans).
      ce: [
        {
          num: 1, page: 108,
          instruction: "Compréhension des écrits — « Les loisirs créatifs, l'activité préférée des Français ». (7 points)",
          vi: "Đọc bài báo về trào lưu thủ công tự làm (Magosha, 26 tuổi, và Claire, 38 tuổi) rồi trả lời.",
          type: "choice",
          items: [
            { q: "1. Comment s'occupaient les femmes le dimanche ?", options: ["Elles tricotaient", "Elles discutaient", "Elles cuisinaient"], answer: "Elles tricotaient" },
            { q: "2. Magosha fait des loisirs créatifs pour…", options: ["recycler ses vieux objets", "réparer ce qui est abîmé", "dépenser moins d'argent"], answer: "dépenser moins d'argent" },
            { q: "3. Magosha sait bricoler.", options: ["Vrai", "Faux"], answer: "Vrai" },
            { q: "4. Que propose Claire ?", options: ["De créer des vêtements", "D'expliquer le bricolage", "De décorer des maisons"], answer: "D'expliquer le bricolage" },
            { q: "5. Que veulent les clients de Claire ?", options: ["Acheter du fait maison", "Travailler avec leurs mains", "Faire attention à la planète"], answer: "Travailler avec leurs mains" },
          ],
        },
      ],
      // Production — no auto-grading; the cahier's model answer is the yardstick.
      production: [
        {
          // Page 105 — production libre en fin de cycle 1 (pas notée DELF,
          // mais rangée ici comme les autres productions non auto-corrigeables
          // — même pattern que la p.81 de b7).
          skill: "Production écrite (page 105)", points: "70 mots", page: 105,
          prompt: "Vous recevez le message d'une amie. Vous lui répondez et lui donnez des conseils. — Message reçu : « Chère Camille, Je déménage la semaine prochaine et j'ai des travaux à faire. Je dois aussi acheter tout mon électroménager. Mais je n'ai pas beaucoup d'argent. Aurais-tu des conseils à me donner pour économiser ? Je te remercie. Bises, Katia »",
          vi: "Bạn nhận được tin nhắn của một người bạn sắp chuyển nhà, cần lời khuyên để tiết kiệm tiền cho việc sửa nhà và mua đồ điện gia dụng. Viết thư trả lời và cho lời khuyên. (70 từ)",
          model: "Bonjour Katia, C'est une excellente nouvelle ! Je suis contente pour toi. Alors, pour tes travaux, je te conseille de regarder des tutoriels sur internet pour apprendre à bricoler seule. Tu peux trouver des bricothèques près de chez toi pour louer les outils. Pour l'électroménager, n'achète rien de neuf, regarde sur les sites d'occasion, tu trouveras de bonnes affaires. Ne t'inquiète pas, tu peux vraiment limiter ton budget. Je t'embrasse, j'espère découvrir bientôt ton appartement ! Camille",
        },
        {
          skill: "Production écrite", points: "12,5 points", page: 109,
          prompt: "Vous avez reçu ce message de votre ami Fred : « Salut ! J'aimerais proposer mes services à l'association de mon quartier mais je ne sais pas quoi faire. Tu voudrais venir avec moi ? Qu'est-ce que nous pourrions proposer ? J'attends tes idées ! À bientôt. Fred » — Vous répondez à Fred. Vous acceptez sa proposition. Vous demandez des informations sur cette association et vous proposez des idées de services. (60 mots minimum)",
          vi: "Bạn Fred muốn đề nghị làm tình nguyện cho hội khu phố nhưng chưa biết làm gì. Viết thư trả lời: chấp nhận đề nghị, hỏi thêm thông tin về hội, và đề xuất ý tưởng dịch vụ. (tối thiểu 60 từ)",
          model: "Salut Fred ! Merci pour ta proposition, c'est une très bonne idée ! L'association de ton quartier aide les habitants en faisant quoi ? J'ai encore mes livres de cours à l'université. Je pourrais les offrir. Et toi, tu pourrais donner de vieux vêtements ou enseigner les maths aux jeunes du quartier. Moi, j'adore la technologie, je pourrais proposer un atelier de réparation, le samedi, quand je ne travaille pas. Nous pouvons rencontrer ton association demain pour discuter de nos idées ? À demain ! Évelyne",
        },
        {
          skill: "Production orale", points: "3 à 4 minutes", page: 109,
          prompt: "Partie 3 de l'épreuve : exercice en interaction (3 à 4 minutes). Sujet : Le troc. Vous êtes étudiant(e) en France. Vous voulez organiser un troc dans votre université. Vous allez voir le responsable de l'association des étudiants. Vous discutez de l'organisation du troc et des objets et services que vous pourriez échanger. L'examinateur joue le rôle du responsable de l'association des étudiants.",
          vi: "Đóng vai sinh viên đề xuất tổ chức buổi trao đổi đồ (troc) trong trường với người phụ trách hội sinh viên (giám khảo đóng vai người phụ trách).",
          model: "– Bonjour ! – Bonjour ! – Je suis étudiant(e) ici, à l'université, et je voudrais discuter avec vous d'une idée. – Ah oui ? Je vous écoute. – Je propose d'organiser un troc dans l'université parce que les étudiants n'ont pas beaucoup d'argent. – Un troc ? C'est une bonne idée mais il faut échanger des choses, ce n'est pas juste pour acheter moins cher. – Je sais. On pourrait organiser une fois par mois, dans le hall, un grand marché. Chaque étudiant apporterait un objet et pourrait en prendre un, en échange. – Pourquoi pas. Mais où est-ce qu'on mettrait ces objets ? – Il y aurait une caisse pour les vêtements, une caisse pour les livres et une caisse pour les objets de décoration, par exemple. – Et s'il reste des objets à la fin du troc, où est-ce qu'on les rangerait ? – On pourrait les donner à une association. – Vous connaissez des associations ? – Oui. Je travaille comme bénévole dans une association, je pourrai leur demander si ça les intéresse. – Et où on trouverait des caisses ? – Le supermarché à côté de l'université a toujours des grands cartons qu'ils jettent. Je vais leur demander de nous les donner. – C'est une très bonne idée. Je pense qu'il faudrait demander l'autorisation du directeur de l'université avant. – Je vais aller le voir. J'espère qu'il sera d'accord. Est-ce que l'association des étudiants pourrait m'aider à organiser le marché ? – Oui, bien sûr ! Vous me dites quand vous avez parlé au directeur ? On pourra se voir la semaine prochaine pour commencer à organiser le troc. – C'est super, merci beaucoup ! À la semaine prochaine ! – À la semaine prochaine !",
        },
      ],
    },
  },

  b12: {

    // ── Grammaire, keyed by the grammar point index in editoGrammarA2.js ──
    grammar: {

      // p0 — L'impératif et les pronoms (cahier p. 135)
      p0: [
        {
          num: 1, page: 135,
          instruction: "Les pronoms en gras remplacent des mots. Lesquels ?",
          vi: "Đại từ in đậm trong câu thay thế cho từ/cụm từ nào? Viết câu trả lời.",
          type: "fill",
          items: [
            { q: "Prends-le à la place de la voiture.", answer: "le vélo", example: true },
            { q: "N'en achetez pas !", answer: "des produits polluants" },
            { q: "Réparez-le !", answer: "le lave-vaisselle" },
            { q: "Sauve-la !", answer: "la planète" },
            { q: "Protégeons-la !", answer: "la biodiversité" },
            { q: "Ne les jette pas par terre !", answer: "les déchets" },
          ],
        },
        {
          num: 2, page: 135,
          instruction: "Remplacez les mots soulignés par un pronom. Faites les transformations nécessaires.",
          vi: "Thay từ được gạch chân bằng đại từ, viết lại cả câu ở thể mệnh lệnh.",
          type: "transform",
          items: [
            { q: "Respectez la faune !", answer: "Respectez-la !", example: true },
            { q: "Trions les déchets !", answer: "Trions-les !" },
            { q: "Protégeons l'environnement !", answer: "Protégeons-le !" },
            { q: "Ne gaspille pas l'eau !", answer: "Ne la gaspille pas !" },
            { q: "N'utilisez pas de pesticides !", answer: "N'en utilisez pas !" },
            { q: "Donnons de l'argent aux associations !", answer: "Donnons-leur de l'argent !" },
          ],
        },
        {
          num: 3, page: 135,
          instruction: "Transformez les phrases à l'impératif. Remplacez les mots soulignés par un pronom.",
          vi: "Chuyển câu sang thể mệnh lệnh và thay từ gạch chân bằng đại từ.",
          type: "transform",
          items: [
            { q: "Il faut jeter nos déchets à la poubelle.", answer: "Jetons-les à la poubelle !", example: true },
            { q: "Il est nécessaire de nous mobiliser pour l'environnement.", answer: "Mobilisons-nous pour l'environnement !" },
            { q: "Il ne faut pas prendre l'avion.", answer: "Ne le prenons pas !" },
            { q: "Il est important de penser à nos gestes quotidiens.", answer: "Pensons-y !" },
            { q: "Il est nécessaire de limiter la pollution.", answer: "Limitons-la !" },
            { q: "Il ne faut pas utiliser de produits polluants.", answer: "N'en utilisons pas !" },
          ],
        },
        {
          num: 4, page: 135, audioSrc: piste(118),
          instruction: "Écoutez et associez une recommandation à chaque personne.",
          vi: "Nghe và nối mỗi người với lời khuyên phù hợp dành cho họ.",
          type: "match",
          pairs: [
            { l: "a. Nadia",  r: "Ne la prends pas !" },
            { l: "b. Sandra", r: "Recycle-les !" },
            { l: "c. David",  r: "Ne leur donne pas à manger !" },
            { l: "d. Malik",  r: "Éteins-la avant de sortir !" },
            { l: "e. Anne",   r: "Explique-leur !" },
            { l: "f. Arnaud", r: "Fabrique-les !" },
          ],
        },
      ],

      // p1 — L'expression du but (cahier p. 137)
      p1: [
        {
          num: 1, page: 137,
          instruction: "Associez chaque action au but qui correspond.",
          vi: "Nối mỗi hành động với mục đích tương ứng.",
          type: "match",
          pairs: [
            { l: "L'hippopotame remonte à la surface…", r: "pour respirer.", example: true },
            { l: "Le caméléon change de couleur…",       r: "pour se cacher." },
            { l: "Les animaux font des cris différents…", r: "pour communiquer." },
            { l: "Cette association a besoin d'argent…",  r: "pour que ses projets continuent." },
            { l: "Le rat cherche le contact avec les humains…", r: "pour qu'ils jouent avec lui." },
            { l: "Dans certains pays, on limite la pêche…", r: "pour protéger les animaux marins." },
          ],
        },
        {
          num: 2, page: 137,
          instruction: "Soulignez l'expression du but qui convient.",
          vi: "Chọn « pour » hoặc « pour que » phù hợp.",
          type: "choice",
          items: [
            { q: "Mon chat miaule ___ je lui donne à manger.", options: ["pour", "pour que"], answer: "pour que", example: true },
            { q: "Avant l'été, on diffuse des publicités ___ les propriétaires ne laissent pas leur animal de compagnie pendant les vacances.", options: ["pour", "pour que"], answer: "pour que" },
            { q: "Les abeilles dansent ___ indiquer aux autres un lieu intéressant.", options: ["pour", "pour que"], answer: "pour" },
            { q: "Cette application a été créée ___ reconnaître les plantes.", options: ["pour", "pour que"], answer: "pour" },
            { q: "Nous faisons de longues promenades avec notre chien ___ il soit heureux.", options: ["pour", "pour qu'"], answer: "pour qu'" },
            { q: "___ ne pas menacer la biodiversité, il faut respecter toutes les espèces.", options: ["Pour", "Pour que"], answer: "Pour" },
          ],
        },
        {
          // Les 6 témoignages audio (dans l'ordre du corrigé) : 1. « Il a
          // acheté des livres pour que ses enfants puissent découvrir les
          // animaux » — 2. « Son chat miaule pour qu'elle lui donne à
          // manger » — 3. « Il organise une conférence pour informer de la
          // disparition de certains reptiles » — 4. « Il garde des animaux
          // pour passer du temps avec eux » — 5. « Il a quitté la ville
          // pour que ses chiens soient dehors » — 6. (numéro manquant dans
          // la liste imprimée). L'exemple (bulle c) est « Pour avoir des
          // œufs frais, elle a des poules ».
          // ⚠️ D'après la note du cahier source, le repérage exact bulle
          // ↔ témoignage (quel numéro va avec quelle bulle imprimée a-f)
          // n'est pas garanti à 100 % ; les chiffres ci-dessous reproduisent
          // fidèlement le corrigé imprimé (a.5 – b.3 – d.2 – e.4 – f.6,
          // c en exemple) sans certitude visuelle absolue sur la mise en
          // page.
          num: 3, page: 137, audioSrc: piste(120),
          instruction: "Écoutez et associez le témoignage de chaque personne à la phrase correcte (indiquez le numéro du témoignage, 1 à 6).",
          vi: "Nghe rồi ghi số thứ tự (1-6) của lời chứng phù hợp với mỗi bulle. (Xem ghi chú: thứ tự khớp bulle-lời chứng không chắc chắn tuyệt đối theo chính cahier gốc.)",
          type: "fill",
          items: [
            { q: "c. (exemple) « Pour avoir des œufs frais, elle a des poules »", answer: "exemple", example: true },
            { q: "a.", answer: "5" },
            { q: "b.", answer: "3" },
            { q: "d.", answer: "2" },
            { q: "e.", answer: "4" },
            { q: "f.", answer: "6" },
          ],
        },
        {
          num: 4, page: 137,
          instruction: "Entourez la bonne réponse.",
          vi: "Chọn dạng động từ đúng.",
          type: "choice",
          items: [
            { q: "Mon chien aboie pour que nous (jouons / jouions) avec lui.", options: ["jouons", "jouions"], answer: "jouions", example: true },
            { q: "Notre voisin organise une réunion pour que tous les habitants de l'immeuble (font / fassent) le tri des déchets.", options: ["font", "fassent"], answer: "fassent" },
            { q: "Il insiste pour que nous (regardons / regardions) la danse des abeilles.", options: ["regardons", "regardions"], answer: "regardions" },
            { q: "J'ai déplacé la gamelle pour que mon chat (se sent / se sente) bien.", options: ["se sent", "se sente"], answer: "se sente" },
            { q: "Le rôle des parents est essentiel pour que les enfants (savent / sachent) respecter l'environnement.", options: ["savent", "sachent"], answer: "sachent" },
            { q: "On peut fabriquer ses produits ménagers pour qu'ils ne (sont / soient) pas polluants.", options: ["sont", "soient"], answer: "soient" },
          ],
        },
      ],

      // p2 — La forme passive (cahier p. 139)
      p2: [
        {
          num: 1, page: 139, audioSrc: piste(122),
          instruction: "Écoutez et dites si les phrases sont à la forme active ou passive.",
          vi: "Nghe từng câu (a→f) và cho biết đó là thể chủ động hay bị động.",
          type: "choice",
          items: [
            { q: "a. (exemple)", options: ["forme active", "forme passive"], answer: "forme passive", example: true },
            { q: "b.", options: ["forme active", "forme passive"], answer: "forme passive" },
            { q: "c.", options: ["forme active", "forme passive"], answer: "forme active" },
            { q: "d.", options: ["forme active", "forme passive"], answer: "forme active" },
            { q: "e.", options: ["forme active", "forme passive"], answer: "forme passive" },
            { q: "f.", options: ["forme active", "forme passive"], answer: "forme active" },
          ],
        },
        {
          // Le corrigé du cahier source ne donne que la phrase finale (pas
          // le tirage au sort des mots à réordonner) — les jetons ci-dessous
          // sont donc redécoupés par blocs à partir de la réponse imprimée,
          // pas recopiés d'un ordre imprimé (qui n'existe pas dans le .md
          // source). La phrase corrigée reste identique au cahier.
          num: 2, page: 139,
          instruction: "Remettez les mots dans l'ordre pour faire des phrases.",
          vi: "Ghép các mảnh câu theo đúng thứ tự.",
          type: "order",
          items: [
            { tokens: ["par l'école.", "Des ateliers d'écologie", "sont organisés"], answer: ["Des ateliers d'écologie", "sont organisés", "par l'école."], example: true },
            { tokens: ["sont protégées.", "Dans ce parc naturel,", "toutes les espèces"], answer: ["Dans ce parc naturel,", "toutes les espèces", "sont protégées."] },
            { tokens: ["par notre association.", "Ce projet écologique", "sera financé"], answer: ["Ce projet écologique", "sera financé", "par notre association."] },
            { tokens: ["ont été plantées", "par la mairie.", "Des centaines d'arbres"], answer: ["Des centaines d'arbres", "ont été plantées", "par la mairie."] },
            { tokens: ["par ces constructions.", "La biodiversité", "est menacée"], answer: ["La biodiversité", "est menacée", "par ces constructions."] },
            { tokens: ["par le chant du coq.", "Elles sont réveillées", "tous les matins"], answer: ["Elles sont réveillées", "tous les matins", "par le chant du coq."] },
          ],
        },
        {
          num: 3, page: 139,
          instruction: "Entourez la forme correcte du participe passé.",
          vi: "Chọn dạng đúng của participe passé (hợp giống-số với chủ ngữ).",
          type: "choice",
          items: [
            { q: "Les légumes sont (cultivé / cultivés) par des professionnels.", options: ["cultivé", "cultivés"], answer: "cultivés", example: true },
            { q: "Des actions écologiques sont (financés / financées) par ces associations.", options: ["financés", "financées"], answer: "financées" },
            { q: "Les arbres doivent être (respecté / respectés).", options: ["respecté", "respectés"], answer: "respectés" },
            { q: "Le festival du film animalier sera (organisé / organisée) l'été prochain.", options: ["organisé", "organisée"], answer: "organisé" },
            { q: "Un article sur notre association a été (publié / publiés) dans une revue spécialisée.", options: ["publié", "publiés"], answer: "publié" },
            { q: "Une nouvelle espèce d'oiseau a été (découvert / découverte).", options: ["découvert", "découverte"], answer: "découverte" },
          ],
        },
        {
          num: 4, page: 139,
          instruction: "Transformez les phrases à la forme passive.",
          vi: "Chuyển câu sang thể bị động.",
          type: "transform",
          items: [
            { q: "Les associations protègent la faune et la flore.", answer: "La faune et la flore sont protégées par les associations.", example: true },
            { q: "La mairie organise une campagne de sensibilisation.", answer: "Une campagne de sensibilisation est organisée par la mairie." },
            { q: "Le changement climatique menace la planète.", answer: "La planète est menacée par le changement climatique." },
            { q: "Les bateaux polluent les océans.", answer: "Les océans sont pollués par les bateaux." },
            { q: "Les biologistes feront de nouvelles recherches.", answer: "De nouvelles recherches seront faites par les biologistes." },
          ],
        },
      ],
    },

    // ── Phonie-graphie (cahier p. 140) — wired into the Phono step ─────
    // Seule la Discrimination (act. 1) a une réponse vérifiable. Articulation
    // (act. 2, phrases à répéter) et Interprétation (act. 4, lecture à voix
    // haute) restent des exercices oraux sans réponse unique — même choix
    // que pour les autres unités. Graphies (act. 3, piste 125, « barrez les
    // e muets ») est ignorée : le corrigé source reproduit le texte intégral
    // sans aucun marquage typographique des « e » barrés — la réponse n'est
    // donc pas reconstructible depuis le .md (les « e » muets se déterminent
    // seulement à l'oral, en écoutant la piste).
    phono: [
      {
        num: 1, page: 140, audioSrc: piste(123),
        instruction: "Discrimination — écoutez et dites si vous entendez le son [ə].",
        vi: "Nghe và cho biết có nghe thấy âm [ə] (e câm) hay không.",
        type: "truefalse",
        items: [
          { q: "a. (exemple)", answer: false, example: true },
          { q: "b.", answer: false },
          { q: "c.", answer: true },
          { q: "d.", answer: false },
          { q: "e.", answer: true },
          { q: "f.", answer: false },
        ],
      },
    ],

    // ── Vocabulaire, keyed to match the Parcours vocab steps ──────────
    // c1_vocab (cahier p. 136, moitié 1) couvre b12g1-b12g2 (milieux
    // naturels, environnement) ; c1_vocab2 (p. 136, moitié 2) couvre
    // b12g3-b12g4 (agir pour l'environnement, pollution) — la page 136 du
    // cahier n'est pas elle-même scindée en deux dans le corrigé source, la
    // coupure exercice 2 / exercice 3 est un choix pratique pour coller aux
    // deux étapes vocab du Parcours (voir parcoursDataA2.js c1_vocab /
    // c1_vocab2). Même logique pour c2_vocab / c3_vocab avec la page 138
    // (b12g5-b12g6 puis b12g7-b12g8).
    vocab: {
      c1_vocab: [
        {
          num: 1, page: 136,
          instruction: "Placez les verbes suivants dans les phrases : valoriser – protéger – se mobiliser – disparaître – trier – polluer.",
          vi: "Điền động từ phù hợp vào chỗ trống.",
          type: "fill",
          bank: ["valoriser", "protéger", "se mobiliser", "disparaître", "trier", "polluer"],
          items: [
            { q: "Dans ce parc, on nous demande de …… la biodiversité.", answer: "valoriser", example: true },
            { q: "On encourage les citoyens à …… leurs déchets.", answer: "trier" },
            { q: "Pour ne pas ……, il est conseillé de prendre le vélo ou les transports en commun.", answer: "polluer" },
            { q: "Il est essentiel de …… ensemble pour sauver la planète.", answer: "se mobiliser" },
            { q: "À cause du réchauffement climatique, certaines espèces vont ……", answer: "disparaître" },
            { q: "Pour …… l'environnement, chaque action compte.", answer: "protéger" },
          ],
        },
        {
          num: 2, page: 136,
          instruction: "Associez chaque mot à leur définition.",
          vi: "Nối từ với định nghĩa tương ứng.",
          type: "match",
          pairs: [
            { l: "le lagon",        r: "un petit lac d'eau salé", example: true },
            { l: "le parc naturel", r: "un espace vert protégé" },
            { l: "l'archipel",      r: "un groupe d'îles" },
            { l: "le désert",       r: "un grand espace de sable" },
            { l: "la forêt",        r: "un ensemble d'arbres" },
            { l: "l'océan",         r: "une grande étendue d'eau salée" },
          ],
        },
      ],

      c1_vocab2: [
        {
          num: 3, page: 136,
          instruction: "Remettez les lettres dans l'ordre pour former des mots.",
          vi: "Sắp xếp lại các chữ cái để tạo thành từ đúng.",
          type: "fill",
          items: [
            { q: "Le (TCNAGHMNEE) …… climatique est une préoccupation mondiale.", answer: "changement", example: true },
            { q: "Les (SEPISITEDC) …… sont des produits chimiques utilisés en agriculture.", answer: "pesticides" },
            { q: "La diversité des espèces vivantes dans un milieu naturel est la (ÉDOIREISTBVI) ……", answer: "biodiversité" },
            { q: "La Terre est une (TÈALPNE) ……", answer: "planète" },
            { q: "Il faut éviter le (GIPAGESLAL) …… alimentaire.", answer: "gaspillage" },
            { q: "Il est essentiel de lutter contre la surexploitation des (SUCRSEORSE) ……", answer: "ressources" },
          ],
        },
        {
          num: 4, page: 136, audioSrc: piste(119),
          instruction: "Écoutez et associez les phrases aux images correspondantes (bénévoles ramassant des déchets ; jeune pousse dans des mains ; homme buvant à une gourde réutilisable ; randonneur en montagne ; forêt déboisée avec fumée).",
          vi: "Nghe và nối mỗi câu với hình ảnh tương ứng.",
          type: "fill",
          items: [
            { q: "Je fais partie d'une association de défense de l'écologie. (exemple)", answer: "image 1", example: true },
            { q: "J'adore me promener dans la nature.", answer: "image 4" },
            { q: "Je suis inquiète de voir la destruction des forêts.", answer: "image 5" },
            { q: "Je respecte les animaux et les plantes pour préserver la biodiversité.", answer: "image 2" },
            { q: "Je n'achète pas de bouteilles en plastique.", answer: "image 3" },
          ],
        },
      ],

      c2_vocab: [
        {
          num: 1, page: 138,
          instruction: "Identifiez les animaux sur les photos.",
          vi: "Gọi tên các con vật trong ảnh.",
          type: "fill",
          items: [
            { q: "a. (exemple)", answer: "un chien", example: true },
            { q: "b.", answer: "un coq" },
            { q: "c.", answer: "une libellule" },
            { q: "d.", answer: "une panthère" },
            { q: "e.", answer: "une chèvre" },
          ],
        },
        {
          num: 2, page: 138,
          instruction: "Complétez les mots pour trouver l'animal.",
          vi: "Điền chữ còn thiếu để tìm ra tên con vật.",
          type: "fill",
          items: [
            { q: "La T _ _ _ _ _ est un animal qui peut vivre sur la terre ou dans l'eau.", answer: "tortue", example: true },
            { q: "Le C _ _ L _ _ _ est un reptile qui change de couleur avec son milieu.", answer: "caméléon" },
            { q: "Le D _ _ P _ _ _ est un mammifère qui vit dans l'eau.", answer: "dauphin" },
            { q: "La C _ _ _ _ T _ est un oiseau qui vit la nuit.", answer: "chouette" },
            { q: "L'A _ _ I _ _ _ est un animal qui vole et fait du miel.", answer: "abeille" },
            { q: "Le S _ _ G _ est un mammifère qui ressemble beaucoup à l'homme.", answer: "singe" },
          ],
        },
      ],

      c3_vocab: [
        {
          num: 3, page: 138, audioSrc: piste(121),
          instruction: "Écoutez les phrases et cochez l'animal correspondant.",
          vi: "Nghe từng câu và chọn con vật được nhắc đến.",
          type: "fill",
          items: [
            { q: "a. (exemple)", answer: "l'escargot", example: true },
            { q: "b.", answer: "le tigre" },
            { q: "c.", answer: "l'aigle" },
            { q: "d.", answer: "la poule" },
            { q: "e.", answer: "l'araignée" },
            { q: "f.", answer: "le cheval" },
          ],
        },
        {
          num: 4, page: 138,
          instruction: "Vrai ou faux ?",
          vi: "Đúng hay sai?",
          type: "truefalse",
          items: [
            { q: "Le chat a plus de quatre pattes.", answer: false, example: true },
            { q: "Le coq chante tôt le matin.", answer: true },
            { q: "L'escargot est un mammifère très rapide.", answer: false },
            { q: "Le serpent est un animal à plumes.", answer: false },
            { q: "L'hippopotame est un animal de jardin.", answer: false },
            { q: "Le canard a deux pattes et des plumes.", answer: true },
          ],
        },
      ],
    },

    // ── Bilan linguistique (cahier p. 142-143, noté /40) ────────────
    // Wired into the "L'essentiel" step, alongside the AI-generated quiz.
    // La page 141 (Compréhension écrite & Production orale, « Le changement
    // climatique : infos ou infox ? ») n'a pas de piste audio — elle est
    // reprise ici (items 8-11), après le /40 linguistique, même pattern que
    // la CO p.105 ajoutée à la suite du bilan de b9. Sa Production orale
    // (jeu de rôle, réponses libres) est rangée dans delf.production. Les
    // Jeux p.146 (items 12-14) suivent, comme le précédent de b9 (p.110).
    bilan: [
      {
        num: 1, page: 142,
        instruction: "Lisez ces recommandations et transformez-les avec un impératif et un pronom. (/7) — Pour sauver la planète, nous devons : recycler nos déchets, éviter le gaspillage, limiter la pollution, planter des arbres, aider les associations, préserver la biodiversité, protéger les animaux.",
        vi: "Chuyển mỗi khuyến nghị sang thể mệnh lệnh + đại từ.",
        type: "transform",
        items: [
          { q: "recycler nos déchets", answer: "Recyclons-les !" },
          { q: "éviter le gaspillage", answer: "Évitons-le !" },
          { q: "limiter la pollution", answer: "Limitons-la !" },
          { q: "planter des arbres", answer: "Plantons-en !" },
          { q: "aider les associations", answer: "Aidons-les !" },
          { q: "préserver la biodiversité", answer: "Préservons-la !" },
          { q: "protéger les animaux", answer: "Protégeons-les !" },
        ],
      },
      {
        num: 2, page: 142,
        instruction: "Conjuguez les verbes entre parenthèses si nécessaire. (/7)",
        vi: "Chia động từ trong ngoặc nếu cần thiết.",
        type: "fill",
        items: [
          { q: "Pour que les enfants (adopter) …… des gestes écologiques, montrons-leur !", answer: "adoptent" },
          { q: "Pour (polluer) …… moins, fabriquons nos produits ménagers !", answer: "polluer" },
          { q: "Pour (protéger) …… les animaux sauvages, ne leur donnons pas à manger !", answer: "protéger" },
          { q: "Pour que les citoyens (se mobiliser) ……, expliquons-leur !", answer: "se mobilisent" },
          { q: "Pour (comprendre) …… le réchauffement climatique, regardons ce documentaire !", answer: "comprendre" },
          { q: "Pour que les villes (être) …… plus vertes, plantons des arbres !", answer: "soient" },
          { q: "Pour que nous (respecter) …… la biodiversité, il y a des règles à suivre dans ce parc naturel.", answer: "respections" },
        ],
      },
      {
        num: 3, page: 142,
        instruction: "Complétez le tableau (forme active ↔ forme passive). (/6)",
        vi: "Hoàn thành bảng: chuyển câu sang thể chủ động/bị động còn thiếu.",
        type: "transform",
        items: [
          { q: "Les associations protègent les espèces menacées. (→ forme passive)", answer: "Les espèces menacées sont protégées par les associations." },
          { q: "Le tri des déchets n'est pas fait par tous les habitants. (→ forme active)", answer: "Tous les habitants ne font pas le tri des déchets." },
          { q: "Les écoles du quartier commenceront bientôt ce projet écocitoyen. (→ forme passive)", answer: "Ce projet écocitoyen sera bientôt commencé par les écoles du quartier." },
          { q: "Les meilleures initiatives vertes seront récompensées par le jury. (→ forme active)", answer: "Le jury récompensera les meilleures initiatives vertes." },
          { q: "La mairie a organisé des conférences sur le climat. (→ forme passive)", answer: "Des conférences sur le climat ont été organisées par la mairie." },
          { q: "Les pesticides ne sont pas utilisés par ces agriculteurs. (→ forme active)", answer: "Ces agriculteurs n'utilisent pas les pesticides." },
        ],
      },
      {
        num: 4, page: 143,
        instruction: "Vocabulaire — Complétez les phrases avec les mots de la liste : danger – disparaître – ressources – archipels – protégé. (/5)",
        vi: "Điền từ vào chỗ trống.",
        type: "fill",
        bank: ["danger", "disparaître", "ressources", "archipels", "protégé"],
        items: [
          { q: "Ce parc naturel est un espace ……", answer: "protégé" },
          { q: "Il est essentiel de s'engager contre la surexploitation des ……", answer: "ressources" },
          { q: "La Nouvelle-Calédonie est un ensemble d'îles et d'……", answer: "archipels" },
          { q: "Les pesticides sont un …… pour notre santé.", answer: "danger" },
          { q: "À cause du réchauffement climatique, des espèces animales vont ……", answer: "disparaître" },
        ],
      },
      {
        num: 5, page: 143,
        instruction: "Vocabulaire — Trouvez le mot correspondant à la définition. (/5)",
        vi: "Tìm từ tương ứng với định nghĩa.",
        type: "fill",
        items: [
          { q: "C'est une matière qu'on utilise pour les bouteilles d'eau par exemple.", answer: "le plastique" },
          { q: "Un produit qui crée de la pollution est un produit ……", answer: "polluant" },
          { q: "C'est la transformation d'un déchet.", answer: "le recyclage" },
          { q: "C'est la science de l'environnement.", answer: "l'écologie" },
          { q: "Il s'agit d'un type d'animal ou de végétal.", answer: "une espèce" },
        ],
      },
      {
        num: 6, page: 143,
        instruction: "Vocabulaire — Barrez l'intrus. (/5)",
        vi: "Tìm từ lạc loài trong mỗi nhóm.",
        type: "choice",
        items: [
          { q: "a.", options: ["le mouton", "l'abeille", "la vache", "le lapin"], answer: "l'abeille" },
          { q: "b.", options: ["l'aigle", "le canard", "le rat", "la chouette"], answer: "le rat" },
          { q: "c.", options: ["le cheval", "le dauphin", "le poney", "l'âne"], answer: "le dauphin" },
          { q: "d.", options: ["le chien", "la panthère", "le chat", "le cheval"], answer: "la panthère" },
          { q: "e.", options: ["le coq", "le caméléon", "la poule", "le canard"], answer: "le caméléon" },
        ],
      },
      {
        num: 7, page: 143,
        instruction: "Vocabulaire — Associez les images aux descriptions.",
        vi: "Nối hình ảnh với mô tả tương ứng.",
        type: "match",
        pairs: [
          { l: "1. hippopotame", r: "C'est un mammifère qui vit principalement dans l'eau." },
          { l: "2. araignée",    r: "C'est un insecte qui a de nombreuses pattes." },
          { l: "3. aigle",       r: "C'est un animal à plumes qui a une excellente vue." },
          { l: "4. serpent",     r: "C'est un reptile long et mince." },
          { l: "5. lapin",       r: "C'est un animal de la ferme qui court très vite." },
        ],
      },
      {
        // Page 141 — Compréhension écrite : « Le changement climatique :
        // infos ou infox ? »
        num: 8, page: 141,
        instruction: "Compréhension écrite — « Le changement climatique : infos ou infox ? ». Vrai ou faux ?",
        vi: "Đọc bài về biến đổi khí hậu (đúng/sai hay tin đồn) rồi trả lời.",
        type: "truefalse",
        items: [
          { q: "Le progrès scientifique est la solution au changement climatique.", answer: false },
          { q: "Avec le changement climatique, les températures baissent.", answer: false },
          { q: "Le climat change seulement en France.", answer: false },
          { q: "Certaines populations doivent quitter leur pays.", answer: true },
          { q: "Tous les humains doivent se mobiliser pour le climat.", answer: true },
        ],
      },
      {
        num: 9, page: 141,
        instruction: "D'après le texte, le changement climatique a des conséquences sur… (plusieurs réponses possibles — les trois sont correctes)",
        vi: "Biến đổi khí hậu có ảnh hưởng tới nhóm nào? (cả 3 đều đúng)",
        type: "truefalse",
        items: [
          { q: "les humains", answer: true },
          { q: "les animaux", answer: true },
          { q: "les végétaux", answer: true },
        ],
      },
      {
        num: 10, page: 141,
        instruction: "Selon les scientifiques, les pays doivent :",
        vi: "Theo các nhà khoa học, các nước phải làm gì?",
        type: "fill",
        items: [
          { q: "Selon les scientifiques, les pays doivent…", answer: "polluer moins" },
        ],
      },
      {
        num: 11, page: 141,
        instruction: "VOCABULAIRE : « Changer nos modes de vie » signifie :",
        vi: "« Changer nos modes de vie » nghĩa là gì?",
        type: "fill",
        items: [
          { q: "« Changer nos modes de vie » signifie…", answer: "vivre de façon plus écologique" },
        ],
      },
      {
        // Page 146 — Jeux, act. 1 : mots croisés (6 verbes d'action pour
        // l'environnement).
        num: 12, page: 146,
        instruction: "Jeux — Trouvez 6 actions pour l'environnement (mots croisés).",
        vi: "Điền động từ đúng cho ô chữ (6 hành động vì môi trường).",
        type: "fill",
        items: [
          { q: "Verticalement 1 : …… la biodiversité", answer: "valoriser" },
          { q: "Verticalement 2 : …… le papier", answer: "recycler" },
          { q: "Verticalement 3 : …… l'environnement", answer: "préserver" },
          { q: "Horizontalement a : …… ensemble", answer: "agir" },
          { q: "Horizontalement b : …… la planète", answer: "sauver" },
          { q: "Horizontalement c : …… ses déchets", answer: "trier" },
        ],
      },
      {
        // Page 146 — Jeux, act. 2 : « décollez » les mots collés.
        num: 13, page: 146,
        instruction: "Jeux — Retrouvez les phrases (les mots sont collés).",
        vi: "Tách các từ dính liền nhau để tìm ra câu đúng.",
        type: "fill",
        items: [
          { q: "Cetteassociationfinancelaprotectiondesmilieuxnaturels.", answer: "Cette association finance la protection des milieux naturels." },
          { q: "Unsitedecojardinageaétécréeilyaquelquesannées.", answer: "Un site de co-jardinage a été créé il y a quelques années." },
          { q: "Nousdevonstousnousmobiliserpoursauverlaplanète.", answer: "Nous devons tous nous mobiliser pour sauver la planète." },
        ],
      },
      {
        // Page 146 — Jeux, act. 3 : devinette.
        num: 14, page: 146,
        instruction: "Jeux — Devinette : Je suis menacée par le réchauffement climatique. De nombreuses espèces animales et végétales m'habitent. Les citoyens se mobilisent pour me sauver. Je suis une planète. Qui suis-je ?",
        vi: "Giải câu đố: tôi bị đe dọa bởi hiện tượng nóng lên toàn cầu, nhiều loài sống trên tôi, con người đấu tranh để cứu tôi, tôi là một hành tinh. Tôi là ai?",
        type: "fill",
        items: [
          { q: "Qui suis-je ?", answer: "La Terre" },
        ],
      },
    ],

    // ── DELF A2 blanc (cahier p. 144-145) ───────────────────────────
    // Le livre n'a pas de page de préparation DELF dédiée pour cette unité
    // (ni écoute dans editoAudioA2.js, ni lecture DELF dans
    // editoA2Reading.js pour b12) — donc pas de coLivre, même pattern que
    // b2/b5/b7/b9.
    delf: {
      co: [
        {
          // Le corrigé source ne donne les énoncés complets que pour une
          // partie des questions (doc.1 → Q1 ; doc.2 → Q2-Q3 ; doc.3 →
          // Q4-Q5) ; Q6 n'a pas d'énoncé imprimé retrouvé dans le .md.
          // ⚠️ Pour Q6, le corrigé source signale lui-même une incertitude
          // OCR sur le chiffre imprimé (caractères « BA » superposés) : la
          // réponse B (panier de légumes) est déduite du contexte du
          // document 3 (jeu-concours pour un abonnement à des paniers de
          // légumes bio) mais n'a pas été vérifiée pixel par pixel.
          num: 1, page: 144, audioSrc: piste(127),
          instruction: "Compréhension de l'oral — vous écoutez la radio (3 documents). (6 points)",
          vi: "Nghe 3 tài liệu radio rồi trả lời từng câu hỏi (chọn A/B/C).",
          type: "fill",
          items: [
            { q: "1. Document 1 — Que vous propose l'équipe de la librairie ?", answer: "C" },
            { q: "2. Document 2 — Les enfants vont dessiner…", answer: "C" },
            { q: "3. Document 2 — L'atelier est…", answer: "B" },
            { q: "4. Document 3 — Cette émission porte sur…", answer: "B" },
            { q: "5. Document 3 — Vous pouvez gagner…", answer: "A" },
            { q: "6. Document 3 — (question complémentaire, énoncé non retrouvé dans le corrigé source — voir la note ⚠️ ci-dessus)", answer: "B" },
          ],
        },
      ],
      // Compréhension des écrits — courriel de Magali : « Mobilise-toi avec
      // nous ! » (Marche pour le Climat du 9 avril). Le corrigé source ne
      // donne que les lettres des réponses, pas l'énoncé complet de chaque
      // question — les items ci-dessous restent donc génériques (numérotés
      // comme dans le corrigé) ; l'apprenant doit lire le courriel dans le
      // cahier p. 144-145 pour répondre.
      ce: [
        {
          num: 1, page: 144,
          instruction: "Compréhension des écrits — courriel de Magali : « Mobilise-toi avec nous ! ». (6 points)",
          vi: "Đọc email của Magali mời tham gia Marche pour le Climat rồi trả lời 6 câu hỏi (chọn A/B/C).",
          type: "fill",
          items: [
            { q: "1.", answer: "A" },
            { q: "2.", answer: "A" },
            { q: "3.", answer: "A" },
            { q: "4.", answer: "A" },
            { q: "5.", answer: "C" },
            { q: "6.", answer: "A" },
          ],
        },
      ],
      // Production — no auto-grading; the cahier's model answer is the yardstick.
      production: [
        {
          skill: "Production écrite", points: "12,5 points", page: 145,
          prompt: "Vous avez reçu un courriel de votre ami Zahi qui vous propose de visiter le Parc animalier Planète Sauvage samedi prochain. Vous répondez à Zahi. Vous acceptez son invitation et vous posez des questions sur l'organisation. (60 mots minimum)",
          vi: "Bạn nhận được email của bạn Zahi rủ đi thăm công viên động vật Planète Sauvage thứ Bảy tới. Viết thư trả lời: chấp nhận lời mời và hỏi thêm về việc tổ chức chuyến đi. (tối thiểu 60 từ)",
          model: "Salut Zahi, Merci de proposer cette visite car j'adore les animaux ! Est-ce que je peux venir avec mon ami Titouan ? Il aime beaucoup les animaux et il est très sympa. Tu veux que je prépare une salade pour le déjeuner ? Je peux aussi préparer des sandwichs. Si tu veux, nous pouvons prendre ma voiture pour aller au parc. À samedi, Davy",
        },
        {
          skill: "Production orale", points: "3 à 4 minutes", page: 145,
          prompt: "Partie 3 de l'épreuve : exercice en interaction. Sujet : Animal de compagnie. Vous êtes en France. Vous voulez offrir un animal de compagnie à votre meilleur(e) ami(e). Vous êtes dans un magasin, vous demandez des conseils au vendeur et vous vous renseignez sur les animaux. L'examinateur joue le rôle du vendeur.",
          vi: "Đóng vai muốn tặng một con vật cưng cho bạn thân, hỏi ý kiến người bán hàng trong cửa hàng thú cưng (giám khảo đóng vai người bán hàng).",
          model: "– Bonjour madame. – Bonjour. – Je voudrais offrir un animal de compagnie à mon frère. Il a un grand jardin et il adore tous les animaux. – D'accord. Est-ce qu'il aime les chats ? – Oui, il adore les chats. – Nous avons quatre chatons en ce moment. Ils doivent encore recevoir un vaccin mais ils seront prêts dans une semaine. – Très bien. Quel est leur caractère ? – Ils sont très joueurs et ils n'aiment pas rester seuls. – Ah, c'est dommage car mon frère part souvent en vacances. Vous avez un animal plus indépendant ? – Nous avons aussi des poissons. Il y a plein d'espèces différentes. Ils peuvent rester seuls au maximum une semaine. – Très bien ! Quel est le prix de ce poisson rouge par exemple ? Il est très mignon. – Il est à 3 euros. Mais je vous conseille d'en acheter au moins deux. Il ne faut pas qu'il s'ennuie ! – Ah, d'accord. Est-ce que je peux mettre des espèces différentes dans le même bocal ? – Ce n'est pas conseillé. Le mieux est de prendre plusieurs poissons rouges. – D'accord, alors je vais en prendre dix. – Très bien. Il faut aussi leur donner un aquarium assez grand. Il est conseillé d'acheter aussi des pierres et des plantes pour mettre à l'intérieur. – Ah oui, pour que cela ressemble à leur espace naturel ! – Oui, vous avez raison. – D'accord. Alors je vais prendre un grand aquarium de 100 x 50 cm. Quel est le prix ? – Il est à 45,30 euros. – Très bien. Vous avez quoi pour décorer ? – Nous avons ce lot à 16,50 euros pour ce type d'aquarium. – Très bien, je le prends. – Avec les 10 poissons, cela fait 91,80 euros s'il vous plaît. – Je vais payer en espèces s'il vous plaît. – D'accord, merci. – Merci, au revoir. – Au revoir, bonne journée.",
        },
        {
          // Page 141 — Production orale (jeu de rôle à deux, pas notée
          // DELF) : pas de corrigé unique dans le cahier ("Réponses libres").
          skill: "Production orale — jeu de rôle (page 141)", points: "réponses libres", page: 141,
          prompt: "À deux. Choisissez la fiche A ou B. Apprenant A : Votre université/entreprise n'a pas un comportement écologique (bouteilles en plastique, gaspillage d'électricité, consommation de papier, aucun tri des déchets, etc.). Vous parlez avec le directeur/la directrice pour signaler les problèmes et protester. Apprenant B : Un(e) étudiant(e)/salarié(e) vous parle des problèmes écologiques de l'université/entreprise et proteste. Vous le/la rassurez et lui proposez des solutions.",
          vi: "Đóng vai theo cặp: người A phản ánh vấn đề môi trường của trường/công ty với ban giám đốc; người B (giám đốc) trấn an và đề xuất giải pháp. (Réponses libres — không có đáp án mẫu duy nhất trong cahier.)",
          model: "Réponses libres — le cahier ne donne pas de corrigé unique pour ce jeu de rôle.",
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
