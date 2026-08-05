import { beforeEach, describe, expect, it, vi } from "vitest";

// parcours.js pushes to the cloud after every save. Stub it out: these tests
// are about the progress store, and a real schedulePush would leave a 5s timer
// (and a network call) hanging off every assertion.
vi.mock("./cloudSync.js", () => ({ schedulePush: vi.fn() }));

import {
  getParcoursProgress,
  getSubDone,
  markSubDone,
  unmarkSubDone,
  markStepDone,
  unmarkStepDone,
  resetUnit,
  getStepStat,
  getUnitStepProgress,
  computeUnitStatuses,
  computeOverallProgress,
} from "./parcours.js";
import { getStepSubIds } from "./parcoursSteps.js";

const KEY = "parcours_progress";

// Real ids, but expectations are derived from getStepSubIds rather than
// hardcoded, so editing course content can't make these fail spuriously.
const UNIT = "u1";
const STEP = "vocab";
const subIds = () => getStepSubIds(UNIT, STEP);

const writeRaw = (obj) => localStorage.setItem(KEY, JSON.stringify(obj));

beforeEach(() => localStorage.clear());

describe("getParcoursProgress", () => {
  it("returns an empty object when nothing is stored", () => {
    expect(getParcoursProgress()).toEqual({});
  });

  it("survives corrupt JSON rather than throwing", () => {
    localStorage.setItem(KEY, "{not json");
    expect(getParcoursProgress()).toEqual({});
  });
});

describe("sub-lesson marking", () => {
  it("marks and unmarks a single sub-lesson", () => {
    const [first] = subIds();
    markSubDone(UNIT, STEP, first);
    expect(getSubDone(UNIT, STEP)).toEqual({ [first]: true });

    unmarkSubDone(UNIT, STEP, first);
    expect(getSubDone(UNIT, STEP)).toEqual({});
  });

  it("drops the step entirely once its last sub-lesson is cleared", () => {
    const [first] = subIds();
    markSubDone(UNIT, STEP, first);
    unmarkSubDone(UNIT, STEP, first);
    expect(getParcoursProgress()[UNIT]?.[STEP]).toBeUndefined();
  });

  it("keeps sub-lessons of different steps independent", () => {
    const [v] = getStepSubIds(UNIT, "vocab");
    const [g] = getStepSubIds(UNIT, "grammar");
    markSubDone(UNIT, "vocab", v);
    expect(getSubDone(UNIT, "grammar")).toEqual({});
    markSubDone(UNIT, "grammar", g);
    expect(getSubDone(UNIT, "vocab")).toEqual({ [v]: true });
  });

  it("unmarking something never marked is a no-op", () => {
    expect(() => unmarkSubDone(UNIT, STEP, "nope")).not.toThrow();
    expect(getParcoursProgress()).toEqual({});
  });
});

// The store used to record a step as the boolean `true` meaning "whole step
// done". Anyone who used the app before sub-lessons existed still has that
// shape in localStorage, so reading it must keep working.
describe("legacy boolean migration", () => {
  it("expands a legacy `true` into every sub-lesson of the step", () => {
    writeRaw({ [UNIT]: { [STEP]: true } });
    const done = getSubDone(UNIT, STEP);
    expect(Object.keys(done).sort()).toEqual([...subIds()].sort());
    expect(Object.values(done).every(Boolean)).toBe(true);
  });

  it("reports a legacy-complete step as 100%", () => {
    writeRaw({ [UNIT]: { [STEP]: true } });
    const stat = getStepStat(UNIT, STEP);
    expect(stat.complete).toBe(true);
    expect(stat.pct).toBe(100);
    expect(stat.done).toBe(stat.total);
  });

  it("normalises the legacy shape on the next write instead of losing it", () => {
    writeRaw({ [UNIT]: { [STEP]: true } });
    const [first] = subIds();
    // Marking one more sub-lesson must not discard the rest.
    markSubDone(UNIT, STEP, first);
    const stored = getParcoursProgress()[UNIT][STEP];
    expect(typeof stored).toBe("object");
    expect(Object.keys(stored).sort()).toEqual([...subIds()].sort());
  });
});

describe("step-level marking", () => {
  it("markStepDone with no subIds completes the whole step", () => {
    markStepDone(UNIT, STEP);
    expect(getStepStat(UNIT, STEP).complete).toBe(true);
  });

  it("markStepDone with subIds completes only that slice", () => {
    const ids = subIds();
    if (ids.length < 2) return;                 // needs a splittable step
    const slice = ids.slice(0, 1);
    markStepDone(UNIT, STEP, slice);

    expect(getStepStat(UNIT, STEP, slice).complete).toBe(true);   // the card
    expect(getStepStat(UNIT, STEP).complete).toBe(false);         // the skill
  });

  it("unmarkStepDone with subIds leaves the other slice intact", () => {
    const ids = subIds();
    if (ids.length < 2) return;
    const a = ids.slice(0, 1);
    const b = ids.slice(1);
    markStepDone(UNIT, STEP);
    unmarkStepDone(UNIT, STEP, a);

    expect(getStepStat(UNIT, STEP, a).done).toBe(0);
    expect(getStepStat(UNIT, STEP, b).complete).toBe(true);
  });

  it("unmarkStepDone with no subIds clears the step", () => {
    markStepDone(UNIT, STEP);
    unmarkStepDone(UNIT, STEP);
    expect(getStepStat(UNIT, STEP).done).toBe(0);
  });
});

describe("getStepStat", () => {
  it("reports zero for an untouched step", () => {
    const stat = getStepStat(UNIT, STEP);
    expect(stat.done).toBe(0);
    expect(stat.pct).toBe(0);
    expect(stat.complete).toBe(false);
  });

  it("is never complete when the step has no sub-lessons at all", () => {
    // total 0 must not read as 0/0 = complete.
    const stat = getStepStat(UNIT, "no_such_step", []);
    expect(stat.total).toBe(0);
    expect(stat.complete).toBe(false);
    expect(stat.pct).toBe(0);
  });

  it("rounds the percentage", () => {
    const ids = subIds();
    if (ids.length < 3) return;
    markSubDone(UNIT, STEP, ids[0]);
    const stat = getStepStat(UNIT, STEP);
    expect(stat.pct).toBe(Math.round((1 / ids.length) * 100));
  });
});

describe("resetUnit", () => {
  it("clears one unit and leaves the others alone", () => {
    const [a] = getStepSubIds("u1", "vocab");
    const [b] = getStepSubIds("u2", "vocab");
    markSubDone("u1", "vocab", a);
    markSubDone("u2", "vocab", b);

    resetUnit("u1");

    expect(getParcoursProgress().u1).toBeUndefined();
    expect(getSubDone("u2", "vocab")).toEqual({ [b]: true });
  });

  it("is a no-op for a unit with no progress", () => {
    expect(() => resetUnit("u9")).not.toThrow();
  });
});

const ALL_STEPS = ["vocab", "phono", "verbes", "grammar", "lecture",
                   "ecouter", "ecrire", "parler", "quiz"];

describe("unit and overall rollups", () => {
  // getUnitStepProgress returns the raw per-step map for a unit, not a tally.
  it("getUnitStepProgress exposes the stored per-step map", () => {
    expect(getUnitStepProgress(UNIT)).toEqual({});
    const [first] = subIds();
    markSubDone(UNIT, STEP, first);
    expect(getUnitStepProgress(UNIT)).toEqual({ [STEP]: { [first]: true } });
  });

  it("a fresh install is 'next' everywhere and 0% overall", () => {
    expect(computeUnitStatuses()[UNIT].status).toBe("next");
    expect(computeOverallProgress()).toMatchObject({ done: 0, pct: 0 });
    expect(computeOverallProgress().total).toBeGreaterThan(0);
  });

  it("partial work moves a unit to 'current'", () => {
    markSubDone(UNIT, STEP, subIds()[0]);
    const s = computeUnitStatuses()[UNIT];
    expect(s.status).toBe("current");
    expect(s.pct).toBeGreaterThan(0);
    expect(s.pct).toBeLessThan(100);
  });

  it("completing every step marks the unit done at 100%", () => {
    ALL_STEPS.forEach(step => markStepDone(UNIT, step));
    expect(computeUnitStatuses()[UNIT]).toEqual({ status: "done", pct: 100 });
  });

  it("overall progress rises when a unit is completed", () => {
    const before = computeOverallProgress();
    ALL_STEPS.forEach(step => markStepDone(UNIT, step));
    const after = computeOverallProgress();
    expect(after.done).toBeGreaterThan(before.done);
    expect(after.total).toBe(before.total);      // denominator is content, not progress
    expect(after.pct).toBeGreaterThan(before.pct);
  });
});
