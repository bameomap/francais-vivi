const CACHE = "vivi-v3";
const OFFLINE = ["/", "/logo.svg"];

// Course audio lives in its own cache, deliberately *not* versioned with the
// app shell: a piste's contents never change, so a deploy has no reason to
// make the learner re-download hundreds of MB over mobile data.
const AUDIO_CACHE = "vivi-audio-v1";
// Roughly one full level's livre + cahier audio. Bounded so a learner who
// works through every level doesn't grow the cache without limit.
const AUDIO_MAX_ENTRIES = 300;

// cache.keys() returns entries in insertion order, so dropping from the front
// evicts what was added longest ago.
async function trimAudioCache(cache) {
  const keys = await cache.keys();
  const excess = keys.length - AUDIO_MAX_ENTRIES;
  if (excess > 0) await Promise.all(keys.slice(0, excess).map(k => cache.delete(k)));
}

self.addEventListener("install", e =>
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(OFFLINE)).then(() => self.skipWaiting()))
);

self.addEventListener("activate", e =>
  e.waitUntil(
    caches.keys()
      .then(ks => Promise.all(
        ks.filter(k => k !== CACHE && k !== AUDIO_CACHE).map(k => caches.delete(k))
      ))
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

  // Audio: cache-first in its own cache. Replaying a piste is the single most
  // repeated action in the app, and the files are served cross-origin from
  // GitHub Pages — without this, every replay is a fresh download.
  //
  // Range requests are passed straight through: the player uses them to seek,
  // and answering one from cache would return a 200 where the browser expects
  // a 206, which breaks scrubbing (notably in Safari).
  if (url.pathname.endsWith(".mp3") && !e.request.headers.get("range")) {
    e.respondWith(
      caches.open(AUDIO_CACHE).then(cache =>
        // ignoreVary: a piste is identified entirely by its URL, so a stored
        // `Vary` (Vite preview sends `Vary: Origin`, and CDNs add their own)
        // must not decide whether we get a cache hit offline.
        cache.match(e.request, { ignoreVary: true }).then(cached =>
          cached || fetch(e.request).then(res => {
            // `res.ok` is the CORS case; an opaque response (status 0) is what
            // a no-cors cross-origin fetch yields and is still cacheable.
            if (res.ok || res.type === "opaque") {
              const clone = res.clone();
              cache.put(e.request, clone).then(() => trimAudioCache(cache));
            }
            return res;
          })
        )
      )
    );
    return;
  }

  // Cache-first for hashed static assets (immutable → safe to serve from cache).
  // ignoreVary for the same reason as audio above: the content hash in the
  // filename already identifies the response, so a `Vary` header from whoever
  // served it must not turn an offline hit into a miss.
  e.respondWith(
    caches.match(e.request, { ignoreVary: true }).then(cached => cached || fetch(e.request).then(res => {
      if (res.ok && url.pathname.match(/\.(js|css|svg|png|woff2?)$/)) {
        const clone = res.clone();
        caches.open(CACHE).then(c => c.put(e.request, clone));
      }
      return res;
    }))
  );
});
