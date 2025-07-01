const CACHE_NAME = 'spa-pwa-cache-v1';
const ARCHIVOS_A_CACHEAR = [
  'index.html',
  'manifest.json',
  'service-worker.js',
  'icon.png'
];

// Instalar y cachear
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(ARCHIVOS_A_CACHEAR))
  );
});

// Activar y limpiar caches viejos si es necesario
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))
      )
    )
  );
});

// Interceptar peticiones y servir desde cache si está disponible
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((respuesta) => respuesta || fetch(event.request))
  );
});
