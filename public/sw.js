const CACHE = "vivi-v3";
const OFFLINE = ["/", "/logo.svg"];

self.addEventListener("install", e =>
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(OFFLINE)).then(() => self.skipWaiting()))
);

self.addEventListener("activate", e =>
  e.waitUntil(
    caches.keys()
      .then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
      .then(() => {
        // Notify all open tabs that a new version is ready
        self.clients.matchAll({ type: "window" }).then(clients =>
          clients.forEach(c => c.postMessage({ type: "SW_UPDATED" }))
        );
      })
  )
);

self.addEventListener("fetch", e => {
  const url = new URL(e.request.url);
  // Never touch non-GET or API calls
  if (e.request.method !== "GET" || url.pathname.startsWith("/api/")) return;

  // In dev, never cache Vite's module graph (source files are non-hashed and
  // change constantly). Let these always hit the network. No effect in prod,
  // where these paths don't exist and assets are content-hashed.
  if (
    url.pathname.startsWith("/src/") ||
    url.pathname.startsWith("/@") ||
    url.pathname.startsWith("/node_modules/") ||
    url.search.includes("import") ||
    url.search.includes("t=")
  ) return;

  const isHTML =
    e.request.mode === "navigate" ||
    url.pathname === "/" ||
    url.pathname.endsWith(".html");

  if (isHTML) {
    // Network-first for the app shell so new deploys are picked up immediately,
    // falling back to the cached shell when offline.
    e.respondWith(
      fetch(e.request)
        .then(res => {
          const clone = res.clone();
          caches.open(CACHE).then(c => c.put("/", clone));
          return res;
        })
        .catch(() => caches.match(e.request).then(c => c || caches.match("/")))
    );
    return;
  }

  // Cache-first for hashed static assets (immutable → safe to serve from cache).
  e.respondWith(
    caches.match(e.request).then(cached => cached || fetch(e.request).then(res => {
      if (res.ok && url.pathname.match(/\.(js|css|svg|png|woff2?)$/)) {
        const clone = res.clone();
        caches.open(CACHE).then(c => c.put(e.request, clone));
      }
      return res;
    }))
  );
});
