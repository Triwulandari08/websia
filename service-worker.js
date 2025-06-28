const CACHE_NAME = 'hima-sia-cache-v1';
const urlsToCache = [
  '/websia/index.html',
  '/websia/detail.html',
  '/websia/css/bootstrap.min.css',
  '/websia/js/bootstrap.bundle.min.js',
  '/websia/manifest.json',
  '/websia/img/backweb.jpeg',
  '/websia/img/logo_hima_sia.png',
  '/websia/img/ketua.jpeg',
  '/websia/img/wakil.jpeg',
  '/websia/img/administrasi.jpeg',
  '/websia/img/akademik.jpeg',
  '/websia/img/networking.jpeg',
  '/websia/img/dpo.jpeg',
  '/websia/img/icon-192.png',
  '/websia/img/icon-512.png'
];

// Install event
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache))
  );
});

// Activate event
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.map(key => {
        if (key !== CACHE_NAME) {
          return caches.delete(key);
        }
      }))
    )
  );
});

// Fetch event
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response =>
      response || fetch(event.request)
    )
  );
});
