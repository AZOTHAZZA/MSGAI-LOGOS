// sw.js - Service Worker for MSGAI-LOGOS
const CACHE_NAME = 'logos-v1';
const ASSETS = [
  './',
  './index.html',
  './style.css',
  './main.js',
  './core/LogosCore.js',
  './core/LogosEngine.js',
  './core/Mint.js',
  './manifest.json'
];

self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
  );
});

self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((res) => res || fetch(e.request))
  );
});
