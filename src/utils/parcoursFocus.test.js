import { beforeEach, describe, expect, it } from "vitest";
import { setParcoursFocus, takeParcoursFocus } from "./parcoursFocus.js";

beforeEach(() => localStorage.clear());

describe("parcours focus", () => {
  it("carries subIds and the step id through", () => {
    setParcoursFocus(["u8g1", "u8g2"], "v1_vocab");
    expect(takeParcoursFocus()).toEqual({ ids: ["u8g1", "u8g2"], step: "v1_vocab" });
  });

  it("is read once and then cleared", () => {
    setParcoursFocus(["a"], "v1_vocab");
    expect(takeParcoursFocus()).not.toBeNull();
    expect(takeParcoursFocus()).toBeNull();
  });

  it("returns null when no focus was set", () => {
    expect(takeParcoursFocus()).toBeNull();
  });

  // Unité 0 is the one A1 unit still on the flat STEP_GROUPS: its cards own
  // whole skills, so they pass no subIds. Nothing used to be stored in that
  // case, so the vocab panel never learned which step opened it and u0's
  // cahier exercises could not render at all.
  it("keeps the step id even when a step owns its whole skill", () => {
    setParcoursFocus(undefined, "vocab");
    expect(takeParcoursFocus()).toEqual({ ids: null, step: "vocab" });
  });

  // Every panel reads ids as `focusIds ? filter(...) : showEverything`, so an
  // empty array would narrow the view to nothing rather than leaving it whole.
  it("never hands back an empty ids array", () => {
    setParcoursFocus([], "vocab");
    expect(takeParcoursFocus().ids).toBeNull();
  });

  it("clears the focus when there is neither subIds nor a step", () => {
    setParcoursFocus(["a"], "v1_vocab");
    setParcoursFocus(undefined, null);
    expect(takeParcoursFocus()).toBeNull();
  });

  it("still reads the older bare-array form", () => {
    localStorage.setItem("parcours_sub_ids", JSON.stringify(["b2-a", "b2-b"]));
    expect(takeParcoursFocus()).toEqual({ ids: ["b2-a", "b2-b"], step: null });
  });

  it("survives corrupt storage", () => {
    localStorage.setItem("parcours_sub_ids", "{not json");
    expect(takeParcoursFocus()).toBeNull();
    expect(localStorage.getItem("parcours_sub_ids")).toBeNull();  // and cleans up
  });
});
