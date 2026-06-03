const CACHE = "vivi-v2";
const OFFLINE = ["/", "/logo.svg"];

self.addEventListener("install", e =>
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(OFFLINE)).then(() => self.skipWaiting()))
);

self.addEventListener("activate", e =>
  e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim()))
);

self.addEventListener("fetch", e => {
  const url = new URL(e.request.url);
  // Never touch non-GET or API calls
  if (e.request.method !== "GET" || url.pathname.startsWith("/api/")) return;

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
