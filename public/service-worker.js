const CACHE_NAME = "autocomplete-cache-v1";
const MAX_AGE = 15 * 60 * 1000; // 15분

self.addEventListener("install", (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then(() => {
      console.log("Opened cache");
    })
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  const { request } = event;
  const url = new URL(request.url);

  if (url.pathname === "/api/search/autocomplete") {
    event.respondWith(
      caches.match(request).then((cachedResponse) => {
        if (cachedResponse) {
          const age =
            new Date().getTime() -
            new Date(cachedResponse.headers.get("date")).getTime();

          if (age < MAX_AGE) {
            console.log("Cache hit");
            return cachedResponse;
          } else {
            caches.open(CACHE_NAME).then((cache) => {
              cache.delete(request);
            });
            console.log(`Cache expired: ${age}ms`);
          }
        }

        return fetch(request).then((networkResponse) => {
          return caches.open(CACHE_NAME).then((cache) => {
            cache.put(request, networkResponse.clone());
            console.log("New Fetch");
            return networkResponse;
          });
        });
      })
    );
  }
});
