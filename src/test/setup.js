// Node 25+ ships an experimental global `localStorage` that is an incomplete
// stub (no `clear`, no real persistence) and shadows jsdom's implementation.
// Install a clean, spec-compliant in-memory Storage so the app's bare
// `localStorage` references behave deterministically in tests.
import { beforeEach } from "vitest";

function createStorage() {
  let store = new Map();
  return {
    getItem: (k) => (store.has(k) ? store.get(k) : null),
    setItem: (k, v) => void store.set(String(k), String(v)),
    removeItem: (k) => void store.delete(k),
    clear: () => void store.clear(),
    key: (i) => [...store.keys()][i] ?? null,
    get length() {
      return store.size;
    },
  };
}

Object.defineProperty(globalThis, "localStorage", {
  value: createStorage(),
  writable: true,
  configurable: true,
});

// Fresh storage before every test, regardless of which file.
beforeEach(() => {
  globalThis.localStorage.clear();
});
