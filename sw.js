const CACHE = "hh-cache-v3";
const ASSETS = [
  "./",
  "./index.html",
  "./manifest.json",
  "./icon-192.png",
  "./icon-512.png",
];

self.addEventListener("install", (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE).then((cache) => cache.addAll(ASSETS))
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys.map(k => (k !== CACHE ? caches.delete(k) : null)));
    await self.clients.claim();
  })());
});

self.addEventListener("fetch", (event) => {
  const req = event.request;
  const url = new URL(req.url);

  // jen stejné origin soubory (volitelné, ale čisté)
  // if (url.origin !== self.location.origin) return;

  // Network-first for HTML
  if (req.mode === "navigate" || (req.headers.get("accept") || "").includes("text/html")) {
    event.respondWith((async () => {
      try {
        const res = await fetch(req);
        const copy = res.clone();
        const cache = await caches.open(CACHE);
        if (res.ok && res.type === "basic") await cache.put(req, copy);
        return res;
      } catch {
        const cached = await caches.match(req);
        return cached || caches.match("./index.html");
      }
    })());
    return;
  }

  // Cache-first for other assets
  event.respondWith((async () => {
    const cached = await caches.match(req);
    if (cached) return cached;

    const res = await fetch(req);
    const copy = res.clone();
    const cache = await caches.open(CACHE);
    if (res.ok && res.type === "basic") await cache.put(req, copy);
    return res;
  })());
});
