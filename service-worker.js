// service-worker.js

const CACHE_NAME = 'bennys-os-cache-v1';
// Lista de ficheiros essenciais para guardar em cache.
const urlsToCache = [
  '/',
  '/index.html',
  // Pode adicionar aqui ficheiros CSS ou outros scripts se os tiver separado.
];

// Evento de instalação: guarda os ficheiros em cache.
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Cache aberta');
        return cache.addAll(urlsToCache);
      })
  );
});

// Evento de fetch: serve os ficheiros a partir da cache se estiver offline.
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Se encontrarmos o ficheiro na cache, retornamo-lo.
        if (response) {
          return response;
        }
        // Caso contrário, tentamos obtê-lo da rede.
        return fetch(event.request);
      }
    )
  );
});
