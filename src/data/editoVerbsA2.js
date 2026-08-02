/**
 * editoVerbsA2.js — Verb drill sets for Édito A2, 2e édition (2022).
 *
 * Same shape as EDITO_A1_VERB_UNITS (editoVerbs.js) so EditoVerbsPanel renders
 * either set through its `units` prop.
 *
 * Why a unit needs this at all: the grammar page can explain the passé composé
 * in one screen, but three things in it can only be memorised —
 *   • whether a verb takes avoir or être,
 *   • the quá khứ phân từ of irregular verbs (né, vécu, devenu, écrit…),
 *   • the agreement that follows être (elle est venue, ils se sont rencontrés).
 * The verb list below therefore mixes both auxiliaries and the pronominals on
 * purpose: choosing the auxiliary *is* the exercise, so a drill that separated
 * them would remove the difficulty it is meant to train.
 *
 * `tenses` carries Présent as well, so the panel's "Chuyển thì" exercise has a
 * source tense to convert from — présent → passé composé is the single most
 * useful transformation at this level.
 */

export const EDITO_A2_VERB_UNITS = [
  {
    unitId: "b1", unitNum: "1",
    title: "Nouvelles vies",
    color: "#7C3AED", bg: "#EDE9FE",
    cefr: "A2",   // đọc trong EditoVerbsPanel để AI ra đề đúng trình độ
    tenses: [
      { id: "present", label: "Présent",
        note: "Ôn lại thì hiện tại — nền để so sánh với passé composé" },
      { id: "passe_compose", label: "Passé composé",
        note: "avoir/être + quá khứ phân từ · nhớ hợp giống-số khi dùng être" },
    ],
    verbs: [
      // — đi với être (chuyển động / thay đổi trạng thái) —
      { infinitive: "naître",       meaning: "sinh ra" },
      { infinitive: "devenir",      meaning: "trở thành" },
      { infinitive: "venir",        meaning: "đến" },
      { infinitive: "revenir",      meaning: "quay lại" },
      { infinitive: "partir",       meaning: "rời đi" },
      { infinitive: "rentrer",      meaning: "về" },
      { infinitive: "arriver",      meaning: "đến nơi" },
      { infinitive: "tomber",       meaning: "ngã, rơi" },
      { infinitive: "rester",       meaning: "ở lại" },
      // — động từ phản thân, cũng đi với être —
      { infinitive: "s'installer",  meaning: "định cư" },
      { infinitive: "se marier",    meaning: "kết hôn" },
      { infinitive: "se séparer",   meaning: "chia tay" },
      { infinitive: "se rencontrer", meaning: "gặp nhau" },
      // — đi với avoir, quá khứ phân từ bất quy tắc —
      { infinitive: "vivre",        meaning: "sống" },
      { infinitive: "faire",        meaning: "làm" },
      { infinitive: "écrire",       meaning: "viết" },
      { infinitive: "obtenir",      meaning: "đạt được" },
      { infinitive: "voir",         meaning: "thấy" },
      { infinitive: "avoir",        meaning: "có" },
      { infinitive: "être",         meaning: "thì, là" },
      // — đi với avoir, có quy tắc —
      { infinitive: "grandir",      meaning: "lớn lên" },
      { infinitive: "rencontrer",   meaning: "gặp ai đó" },
      { infinitive: "déménager",    meaning: "chuyển nhà" },
      { infinitive: "travailler",   meaning: "làm việc" },
      { infinitive: "visiter",      meaning: "tham quan" },
    ],
  },
];
