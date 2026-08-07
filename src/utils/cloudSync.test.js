import { describe, expect, it } from "vitest";

import { SYNC_KEYS, BACKUP_KEYS } from "./cloudSync.js";
import { PROGRESS_KEY } from "./parcours.js";

// cloudSync is the only backup a learner has. Everything the app can rebuild
// on its own (course content, generated exercises) is disposable; the record
// of what they have worked through is not.
describe("SYNC_KEYS", () => {
  // Regression: the Parcours completion history was absent from this list
  // while `parcours_last_unit` — just which unit was open last — was present.
  // parcours.js calls schedulePush() after every save, so the app pushed
  // faithfully on each completed lesson and uploaded everything except the
  // thing that had changed. Wiping site data restored SRS, XP, streak and
  // badges, and brought the parcours back empty.
  it("includes the Parcours progress key", () => {
    expect(SYNC_KEYS).toContain(PROGRESS_KEY);
  });

  it("covers the per-level 'last unit' keys for both A1 and A2", () => {
    expect(SYNC_KEYS).toContain("parcours_last_unit");
    expect(SYNC_KEYS).toContain("parcours_last_unit_a2");
  });

  it("still carries the other irreplaceable stores", () => {
    for (const key of ["srs_data", "xp_data", "streak_data", "badges_earned",
                       "vocab_sets", "study_history"]) {
      expect(SYNC_KEYS).toContain(key);
    }
  });

  it("has no duplicates", () => {
    expect(new Set(SYNC_KEYS).size).toBe(SYNC_KEYS.length);
  });

  it("never syncs device-local preferences", () => {
    // These are per-device on purpose; applyData also refuses to overwrite
    // them, but they should not be uploaded in the first place.
    for (const key of ["dark_mode", "sync_token", "user_name"]) {
      expect(SYNC_KEYS).not.toContain(key);
    }
  });
});

// The manual export in ProfilPanel used to keep a second, hand-maintained copy
// of this list. The two drifted, and both had dropped the Parcours history —
// so the downloaded backup file was missing it too, exactly like the cloud one.
describe("BACKUP_KEYS", () => {
  it("covers everything the cloud syncs", () => {
    for (const key of SYNC_KEYS) expect(BACKUP_KEYS).toContain(key);
  });

  it("includes the Parcours progress key", () => {
    expect(BACKUP_KEYS).toContain(PROGRESS_KEY);
  });

  it("adds user_name, which sync deliberately leaves device-local", () => {
    expect(BACKUP_KEYS).toContain("user_name");
    expect(SYNC_KEYS).not.toContain("user_name");
  });

  it("never carries the sync token itself", () => {
    // Exporting it would put a credential in a file the learner may share.
    expect(BACKUP_KEYS).not.toContain("sync_token");
  });

  it("has no duplicates", () => {
    expect(new Set(BACKUP_KEYS).size).toBe(BACKUP_KEYS.length);
  });
});
