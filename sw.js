const CACHE_NAME = 'travel-hq-v11';
const APP_SHELL = ['./travel-hq.html', './manifest.webmanifest'];
const OPTIONAL_ASSETS = [
  'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.min.css',
  'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.min.js'
];

self.addEventListener('install', event => {
  event.waitUntil(caches.open(CACHE_NAME).then(cache =>
    cache.addAll(APP_SHELL).then(() => Promise.all(OPTIONAL_ASSETS.map(asset => cache.add(asset).catch(() => null))))
  ));
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key)))));
  self.clients.claim();
});

self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return;
  const url = new URL(event.request.url);
  if (url.hostname.endsWith('supabase.co')) return;
  event.respondWith(fetch(event.request).then(response => {
    const copy = response.clone();
    caches.open(CACHE_NAME).then(cache => cache.put(event.request, copy));
    return response;
  }).catch(() => caches.match(event.request).then(cached => {
    if (cached) return cached;
    if (event.request.mode === 'navigate') return caches.match('./travel-hq.html');
    return Response.error();
  })));
});
