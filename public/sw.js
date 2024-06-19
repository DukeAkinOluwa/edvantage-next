const CACHE_NAME = 'EdvantageV1';
const STATIC_ASSETS = [
    '/',
    // Add other static files that are essential for your app to work offline
];

self.addEventListener('install', event => {
    console.log('Service Worker: Installed');
    event.waitUntil(
        caches.open(CACHE_NAME).then(cache => {
        console.log('Service Worker: Caching Static Assets');
        return cache.addAll(STATIC_ASSETS);
        })
    );
});

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
    if (event.request.url.includes('/Images/')) {
        // Cache dynamic images
        event.respondWith(
        caches.match(event.request).then(response => {
            if (response) {
            return response;
            }
            return fetch(event.request).then(networkResponse => {
            return caches.open(CACHE_NAME).then(cache => {
                cache.put(event.request, networkResponse.clone());
                return networkResponse;
            });
            });
        }).catch(() => caches.match('/offline.html'))
        );
    } else {
        // Cache other necessary files
        event.respondWith(
        caches.match(event.request).then(response => {
            if (response) {
            return response;
            }
            return fetch(event.request).catch(() => caches.match('/offline.html'));
        })
        );
    }
    console.log(event.request.url);
});

  
self.addEventListener('waiting', event => {

});