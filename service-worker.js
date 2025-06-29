const CACHE_NAME = 'hima-sia-cache-v1';
//Nama versi cache. Jika ada perubahan file, ubah versi ini agar cache lama dibersihkan.
const urlsToCache = [ //Berisi file mana saja yang akan dicache
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
// Event 'install' akan dijalankan saat pertama kali service worker dipasang
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache)) 
     // Buka cache dengan nama yang telah ditentukan kemudian menyimpan semua file di urlsToCache ke dalam cache
  );
});

// Activate event
// Event 'activate' dijalankan setelah install, digunakan untuk membersihkan cache lama
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>  // Ambil semua nama cache yang ada
      Promise.all(keys.map(key => {
        if (key !== CACHE_NAME) {  // Jika nama cache bukan versi terbaru
          return caches.delete(key); // Hapus cache lama
        }
      }))
    )
  );
});

// Fetch event
// Event 'fetch' mengintersep semua request jaringan
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response =>  // Cek apakah request sudah ada di cache, jika ada dicache ambil dari cache, jika tidak ambil dari internet
      response || fetch(event.request) 
    )
  );
});
