const CACHE = "hanychov-hunt-v3";
const ASSETS = ["./", "./index.html", "./manifest.json"];

self.addEventListener("install", (e) => {
  // Okamžitě přejdi na novou verzi bez čekání na zavření starých tabů
  self.skipWaiting();
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(ASSETS)));
});

self.addEventListener("activate", (e) => {
  // Převezmi kontrolu nad všemi stránkami okamžitě
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.map(k => k !== CACHE ? caches.delete(k) : null)))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (e) => {
  const url = new URL(e.request.url);

  // HTML soubory — vždy network-first (aby se vždy načetla nová verze)
  if (e.request.mode === "navigate" || url.pathname.endsWith(".html")) {
    e.respondWith(
      fetch(e.request)
        .then(res => {
          const clone = res.clone();
          caches.open(CACHE).then(c => c.put(e.request, clone));
          return res;
        })
        .catch(() => caches.match(e.request))
    );
    return;
  }

  // Ostatní assety — cache-first
  e.respondWith(
    caches.match(e.request).then((r) => r || fetch(e.request))
  );
});
