import { beforeEach, describe, expect, it } from "vitest";
import {
  LEVELS,
  awardXP,
  getXPData,
  getLevel,
  getNextLevel,
  getBadges,
  awardBadge,
  checkBadges,
  increment,
  getCount,
} from "./xp.js";

beforeEach(() => {
  localStorage.clear();
});

describe("awardXP", () => {
  it("accumulates XP across calls", () => {
    expect(awardXP(10)).toBe(10);
    expect(awardXP(25)).toBe(35);
    expect(getXPData().total).toBe(35);
  });
});

describe("getLevel", () => {
  it("returns the highest level whose threshold is met", () => {
    expect(getLevel(0).label).toBe("Débutant");
    expect(getLevel(49).label).toBe("Débutant");
    expect(getLevel(50).label).toBe("Apprenti");
    expect(getLevel(200).label).toBe("Intermédiaire");
    expect(getLevel(5000).label).toBe("Expert");
  });
});

describe("getNextLevel", () => {
  it("returns the next level above the current XP", () => {
    expect(getNextLevel(0).label).toBe("Apprenti");
    expect(getNextLevel(60).label).toBe("Intermédiaire");
  });

  it("returns null once max level is reached", () => {
    expect(getNextLevel(LEVELS[LEVELS.length - 1].min)).toBeNull();
  });
});

describe("awardBadge", () => {
  it("returns true the first time and false on repeat", () => {
    expect(awardBadge("words_10")).toBe(true);
    expect(awardBadge("words_10")).toBe(false);
    expect(getBadges().has("words_10")).toBe(true);
  });
});

describe("checkBadges", () => {
  it("awards every newly-qualified badge once", () => {
    const earned = checkBadges({ srsTotal: 50, mastered: 5, streak: 7, defiPerfect: true });
    expect(earned).toEqual(
      expect.arrayContaining(["first_lesson", "words_10", "words_50", "master_5", "streak_3", "streak_7", "defi_perfect"])
    );
    // 100-word badge not yet earned at 50 words
    expect(earned).not.toContain("words_100");
  });

  it("does not re-award badges already earned", () => {
    checkBadges({ srsTotal: 10 });
    const second = checkBadges({ srsTotal: 10 });
    expect(second).toEqual([]);
  });
});

describe("increment / getCount", () => {
  it("increments and reads a counter key", () => {
    expect(increment("defi_count")).toBe(1);
    expect(increment("defi_count")).toBe(2);
    expect(getCount("defi_count")).toBe(2);
    expect(getCount("never_set")).toBe(0);
  });
});
