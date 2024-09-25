// Nombre del caché
const CACHE_NAME = 'my-site-cache-v1';
const urlsToCache = [
  '/',

  '../css/estilo.css',
  '../css/font-awesome.min.css',
  '../css/font-awesome.css',
  '../css/mdb.min.css',
  '../css/normalize.css',

  '../fonts/fontawesome-webfont.eot',
  '../fonts/fontawesome-webfont.woff',
  '../fonts/fontawesome-webfont.woff2',
  '../fonts/fontawesome-webfont.ttf',
  '../fonts/fontawesome-webfont.svg',
  '../fonts/fontAwesome.otf',

  '../img/habilidades/Desarrollo_web.jpg',
  '../img/habilidades/Diseño.jpg',
  '../img/habilidades/marketing.jpg',
  '../img/habilidades/multiplataforma.jpg',
  '../img/habilidades/seguridad.jpg',
  '../img/habilidades/soporte.jpg',

  '../img/Portafolio/jorge.png',
  '../img/Portafolio/manga.png',
  '../img/Portafolio/meme.png',
  '../img/Portafolio/Viaticos.png',

  '../trabajos/jorge/1.png',
  '../trabajos/jorge/2.png',
  '../trabajos/jorge/3.png',
  '../trabajos/jorge/4.png',
  '../trabajos/jorge/5.png',
  '../trabajos/jorge/6.png',
  '../trabajos/jorge/7.png',
  '../trabajos/jorge/8.png',
  '../trabajos/jorge/9.png',

  '../trabajos/manga/1.png',
  '../trabajos/manga/2.png',
  '../trabajos/manga/3.png',
  '../trabajos/manga/4.png',
  '../trabajos/manga/5.png',
  '../trabajos/manga/6.png',
  '../trabajos/manga/7.png',
  '../trabajos/manga/8.png',
  '../trabajos/manga/9.png',
  '../trabajos/manga/10.png',
  '../trabajos/manga/11.png',
  '../trabajos/manga/12.png',
  '../trabajos/manga/13.png',
  '../trabajos/manga/14.png',
  '../trabajos/manga/15.png',
  '../trabajos/manga/16.png',

  '../trabajos/meme/1.png',
  '../trabajos/meme/2.png',
  '../trabajos/meme/3.png',
  '../trabajos/meme/4.png',
  '../trabajos/meme/5.png',
  '../trabajos/meme/6.png',
  '../trabajos/meme/7.png',
  '../trabajos/meme/8.png',
  '../trabajos/meme/9.png',
  '../trabajos/meme/10.png',

  '../trabajos/viaticos/1.png',
  '../trabajos/viaticos/2.png',
  '../trabajos/viaticos/3.png',
  '../trabajos/viaticos/4.png',
  '../trabajos/viaticos/5.png',
  '../trabajos/viaticos/6.png',
  '../trabajos/viaticos/7.png',
  '../trabajos/viaticos/8.png',
  '../trabajos/viaticos/9.png',
  '../trabajos/viaticos/10.png',
  '../trabajos/viaticos/11.png',

  '../img/foto.png',
  '../img/foto2.png',
  '../img/foto3.png',

  '../js/main.js',
  '../js/mixitup.js',
  '../js/mdb.js',
  '../js/service_worked.js',

  '../manifest/icono.png',
  '../manifest/icono2.png',
  '../manifest/icono3.png',
  '../manifest/icono4.png',
  '../manifest/manifest.json',

  '../index.html',
  '../manga.html',
  '../memes.html',
  '../portafoliojorge.html',
  '../viatico.html'
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
        return fetch(event.request).catch(() => caches.match('/offline.html'));
      })
  );
});
