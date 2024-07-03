const CACHE_NAME = 'EdvantageV1';

self.addEventListener('install', event => {
    console.log('Service Worker: Installed');
    event.waitUntil(
        caches.open(CACHE_NAME)
        .then(cache => {
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
        .then(() => self.skipWaiting())
    );
    event.waitUntil(
        caches.delete(CACHE_NAME)
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
    // const url = event.request.url;
    // if (event.request.method === 'GET') {
    //     if (url === '/' ||
    //         url.startsWith('/Images/') || url.startsWith('/_next/static/') ||
    //         url.startsWith('https://fonts.googleapis.com/') ||
    //         url === '/manifest.json') {
    //     } else {
    //         event.respondWith(
    //         caches.match(event.request).then(response => {
    //             if (response) {
    //             return response;
    //             }
    //             return fetch(event.request).then(networkResponse => {
    //             return caches.open(CACHE_NAME).then(cache => {
    //                 // console.log(event.request, networkResponse.clone());
    //                 cache.put(event.request, networkResponse.clone());
    //                 return networkResponse;
    //             });
    //             });
    //         }).catch(() => caches.match('/offline.html'))
    //         );
    //     }
    // }
    // console.log(event.request.url);
});

self.addEventListener('push', event => {
    let data;
    if (event.data) {
        data = event.data.json();
    }

    const title = data?.title || 'Default Title';
    const options = {
        body: data?.body || 'Default body',
        icon: data?.icon || '/Images/Logo.jpg',
        badge: data?.badge || '/Images/Logo.jpg'
    };

    event.waitUntil(self.registration.showNotification(title, options));
});

self.addEventListener('notificationclick', event => {
    event.notification.close();
    event.waitUntil(
        clients.openWindow('/')
    );
});