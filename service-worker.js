const CACHE_NAME = 'hima-sia-cache-v1';
const urlsToCache = [
  'index.html',
  'detail.html',
  'css/bootstrap.min.css',
  'js/bootstrap.bundle.min.js',
  'img/backweb.jpeg',
  'img/logo_hima_sia.png',
  'img/ketua.jpeg',
  'img/wakil.jpeg',
  'img/administrasi.jpeg',
  'img/akademik.jpeg',
  'img/networking.jpeg',
  'img/dpo.jpeg',
  'manifest.json',
  'img/icon-192.png',
  'img/icon-512.png'
];

// Install
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(urlsToCache);
    })
  );
});

// Activate
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

// Fetch
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response =>
      response || fetch(event.request)
    )
  );
});
