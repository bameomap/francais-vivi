import { beforeEach, describe, expect, it } from "vitest";
import {
  addWordToSRS,
  addWordsToSRS,
  getSRSData,
  getDueCards,
  getAllCards,
  updateSRSCard,
  updateSRSCardRating,
  ratingIntervalLabel,
  getMasteredSet,
  getWeakWords,
  removeFromSRS,
  resetSRS,
} from "./srs.js";

beforeEach(() => {
  localStorage.clear();
});

describe("addWordToSRS", () => {
  it("adds a new card with default SM-2 state", () => {
    expect(addWordToSRS("bonjour", "xin chào")).toBe(true);
    const card = getSRSData()["bonjour"];
    expect(card).toMatchObject({
      fr: "bonjour",
      vi: "xin chào",
      interval: 0,
      easeFactor: 2.5,
      repetitions: 0,
      lastReviewed: null,
    });
    // New card is due immediately
    expect(card.dueDate).toBeLessThanOrEqual(Date.now());
  });

  it("does not add a duplicate", () => {
    addWordToSRS("merci", "cảm ơn");
    expect(addWordToSRS("merci", "khác")).toBe(false);
    expect(getSRSData()["merci"].vi).toBe("cảm ơn");
  });
});

describe("addWordsToSRS", () => {
  it("returns the count of newly added words, skipping existing", () => {
    addWordToSRS("un", "một");
    const added = addWordsToSRS([{ fr: "un", vi: "một" }, { fr: "deux", vi: "hai" }, { fr: "trois", vi: "ba" }]);
    expect(added).toBe(2);
    expect(getAllCards()).toHaveLength(3);
  });
});

describe("updateSRSCard (binary correct/incorrect)", () => {
  it("advances interval on correct answers", () => {
    addWordToSRS("chat", "con mèo");
    updateSRSCard("chat", true);
    expect(getSRSData()["chat"]).toMatchObject({ repetitions: 1, interval: 1 });
    updateSRSCard("chat", true);
    expect(getSRSData()["chat"]).toMatchObject({ repetitions: 2, interval: 3 });
  });

  it("resets repetitions and drops ease on incorrect", () => {
    addWordToSRS("chien", "con chó");
    updateSRSCard("chien", true);
    updateSRSCard("chien", true);
    updateSRSCard("chien", false);
    const card = getSRSData()["chien"];
    expect(card.repetitions).toBe(0);
    expect(card.interval).toBe(1);
    expect(card.easeFactor).toBeLessThan(2.5);
  });

  it("never lets ease factor fall below 1.3", () => {
    addWordToSRS("mot", "từ");
    for (let i = 0; i < 20; i++) updateSRSCard("mot", false);
    expect(getSRSData()["mot"].easeFactor).toBeGreaterThanOrEqual(1.3);
  });

  it("is a no-op for an unknown word", () => {
    expect(() => updateSRSCard("inexistant", true)).not.toThrow();
    expect(getSRSData()["inexistant"]).toBeUndefined();
  });
});

describe("updateSRSCardRating (4-button)", () => {
  it("rating 0 (Lại) makes the card due in ~10 minutes and resets repetitions", () => {
    addWordToSRS("eau", "nước");
    updateSRSCardRating("eau", 2); // build up some reps first
    updateSRSCardRating("eau", 0);
    const card = getSRSData()["eau"];
    expect(card.repetitions).toBe(0);
    const minutesUntilDue = (card.dueDate - Date.now()) / 60000;
    expect(minutesUntilDue).toBeGreaterThan(8);
    expect(minutesUntilDue).toBeLessThan(12);
  });

  it("rating 3 (Dễ) raises ease and jumps the interval", () => {
    addWordToSRS("feu", "lửa");
    updateSRSCardRating("feu", 3);
    const card = getSRSData()["feu"];
    expect(card.interval).toBe(3);
    expect(card.easeFactor).toBeGreaterThan(2.5);
  });

  it("caps ease factor at 3.0", () => {
    addWordToSRS("vin", "rượu");
    for (let i = 0; i < 20; i++) updateSRSCardRating("vin", 3);
    expect(getSRSData()["vin"].easeFactor).toBeLessThanOrEqual(3.0);
  });
});

describe("ratingIntervalLabel", () => {
  it("labels the Again button as 10 minutes", () => {
    expect(ratingIntervalLabel({ interval: 5 }, 0)).toBe("10 phút");
  });

  it("formats long intervals in weeks", () => {
    const label = ratingIntervalLabel({ interval: 10, easeFactor: 2.5, repetitions: 5 }, 2);
    expect(label).toMatch(/tuần/);
  });
});

describe("getDueCards", () => {
  it("returns only cards whose dueDate has passed", () => {
    addWordToSRS("a", "");
    addWordToSRS("b", "");
    updateSRSCardRating("b", 3); // pushes b's dueDate into the future
    const due = getDueCards().map((c) => c.fr);
    expect(due).toContain("a");
    expect(due).not.toContain("b");
  });
});

describe("getMasteredSet", () => {
  it("includes only cards with repetitions >= 2 and interval >= 3", () => {
    addWordToSRS("pain", "bánh mì");
    updateSRSCard("pain", true); // rep1 interval1
    updateSRSCard("pain", true); // rep2 interval3 → mastered
    addWordToSRS("lait", "sữa");
    updateSRSCard("lait", true); // rep1 interval1 → not mastered
    const mastered = getMasteredSet();
    expect(mastered.has("pain")).toBe(true);
    expect(mastered.has("lait")).toBe(false);
  });
});

describe("getWeakWords", () => {
  it("surfaces struggling/new cards and respects the limit", () => {
    addWordsToSRS([{ fr: "x", vi: "" }, { fr: "y", vi: "" }, { fr: "z", vi: "" }]);
    const weak = getWeakWords(2);
    expect(weak).toHaveLength(2);
    expect(weak[0]).toHaveProperty("fr");
  });
});

describe("removeFromSRS / resetSRS", () => {
  it("removes a single card", () => {
    addWordToSRS("ici", "đây");
    removeFromSRS("ici");
    expect(getSRSData()["ici"]).toBeUndefined();
  });

  it("clears the whole deck", () => {
    addWordsToSRS([{ fr: "a", vi: "" }, { fr: "b", vi: "" }]);
    resetSRS();
    expect(getAllCards()).toHaveLength(0);
  });
});
