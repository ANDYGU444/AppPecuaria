// Service worker de Pecuaria: guarda la app en el teléfono para que abra sin internet.
// Cambia VERSION cada vez que subas una nueva versión de index.html.
const VERSION = 'pecuaria-v2';
const APP = ['./', './index.html', './manifest.webmanifest', './icon-192.png', './icon-512.png',
  './icon-maskable-192.png', './icon-maskable-512.png', './apple-touch-icon.png', './favicon.ico', './favicon-32.png'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(VERSION).then(c => c.addAll(APP)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', e => {
  e.waitUntil(caches.keys()
    .then(ks => Promise.all(ks.filter(k => k !== VERSION).map(k => caches.delete(k))))
    .then(() => self.clients.claim()));
});

self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);

  // La API de GitHub nunca se guarda aquí: la app maneja su propia copia offline.
  if (url.hostname === 'api.github.com') return;

  // Fuentes de Google: primero la copia guardada.
  if (url.hostname === 'fonts.googleapis.com' || url.hostname === 'fonts.gstatic.com') {
    e.respondWith(caches.open(VERSION).then(async c => {
      const hit = await c.match(req);
      if (hit) return hit;
      try { const r = await fetch(req); c.put(req, r.clone()); return r; }
      catch (err) { return new Response('', { status: 504 }); }
    }));
    return;
  }

  // Archivos de la app: primero internet (para recibir actualizaciones), si no hay, la copia guardada.
  if (url.origin === self.location.origin) {
    e.respondWith((async () => {
      const c = await caches.open(VERSION);
      try {
        const r = await fetch(req);
        if (r.ok) c.put(req, r.clone());
        return r;
      } catch (err) {
        return (await c.match(req, { ignoreSearch: true })) ||
               (req.mode === 'navigate' ? await c.match('./index.html') : undefined) ||
               new Response('Sin conexión', { status: 503 });
      }
    })());
  }
});
