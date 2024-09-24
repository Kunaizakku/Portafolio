// Nombre del caché
const CACHE_NAME = 'cache-v1';
const urlsToCache = [
  '/',
  '/css/estilo.css',
  '/css/font-awesome.min.css',
  '/css/mdb.min.css',
  '/css/normalize.css',
  '/js/main.js',
  '/js/mixitup.js',
  '/js/mdb.js',
  '/index.html',
  '/manga.html',
  '/memes.html',
  '/portafoliojorge.html',
  '/viatico.html'
];

// Instalación del Service Worker
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Archivos cacheados con éxito');
        return cache.addAll(urlsToCache);
      })
  );
});

// Activación del Service Worker
self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// Interceptación de solicitudes
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        if (response) {
          return response; // Retorna el archivo desde el caché
        }
        return fetch(event.request).catch(() => caches.match('/index.html'));
      })
  );
});
