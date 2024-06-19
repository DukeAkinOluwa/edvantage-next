const CACHE_NAME = 'EdvantageV1';

self.addEventListener('install', event => {
  console.log('Service Worker: Installed');
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return fetch('/manifest.json')
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then(assets => {
          if (!Array.isArray(assets.files)) {
            throw new TypeError('Assets files property is not an array');
          }
          const urlsToCache = new Set([
            '/',
            ...assets.files,
          ]);
          console.log('Service Worker: Caching Static Assets');
          return cache.addAll([...urlsToCache]);
        })
        .catch(error => {
          console.error('Error fetching assets manifest:', error);
        });
    })
  );
});

// self.addEventListener('install', event => {
//     console.log('Service Worker: Installed');
//     event.waitUntil(
//         caches.open(CACHE_NAME)
//             .then(cache => self.addAllRequestsToCache(cache))
//             .catch(error => console.error('Error caching files:', error))
//     );
// });

self.addEventListener('activate', event => {
  console.log('Service Worker: Activated');
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cache => {
          if (cache !== CACHE_NAME) {
            console.log('Service Worker: Clearing Old Cache');
            return caches.delete(cache);
          }
        })
      );
    })
  );
});

self.addEventListener('fetch', event => {
    const url = event.request.url;
    // Check for existing caching conditions
    if (url === '/' ||  // Added check for root page
        (url.startsWith('/Images/') || url.startsWith('/_next/static/')) ||
        url.startsWith('https://fonts.googleapis.com/') ||
        url === '/manifest.json') {
      // Existing caching logic...
    } else {
      // Cache navigation requests
        event.respondWith(
            caches.match(event.request).then(response => {
            if (response) {
                return response;
            }
            return fetch(event.request).then(networkResponse => {
                return caches.open(CACHE_NAME).then(cache => {
                console.log(event.request, networkResponse.clone());
                cache.put(event.request, networkResponse.clone());
                return networkResponse;
                });
            });
            }).catch(() => caches.match('/offline.html'))
        );
    }
    console.log(event.request.url);
});


self.addEventListener('waiting', event => {
  // Handle waiting event if necessary
});

// async function addAllRequestsToCache(cache) {
//     const requests = await caches.keys();
//     const urlsToCache = [];
//     for (const request of requests) {
//         if (request !== CACHE_NAME) { // Avoid caching the service worker itself
//             const cacheEntries = await caches.open(request);
//             const entries = await cacheEntries.keys();
//             urlsToCache.push(...entries);
//         }
//     }
//     console.log(urlsToCache)
//     return cache.addAll(urlsToCache);
// }