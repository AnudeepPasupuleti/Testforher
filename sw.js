const CACHE_NAME = 'v3-cache'; // Changing this number forces an update

self.addEventListener('install', (event) => {
    // Force the waiting service worker to become the active one
    self.skipWaiting();
});

self.addEventListener('activate', (event) => {
    // Take control of the page immediately
    event.waitUntil(clients.claim());
});

self.addEventListener('fetch', (event) => {
    // Serve from network, but you can add caching later
    event.respondWith(fetch(event.request));
});
