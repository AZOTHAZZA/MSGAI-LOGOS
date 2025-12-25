/**
 * sw.js (最終確定版：永続化統治)
 * 厳選されたロゴス資産のみをキャッシュし、不整合によるタイムアウトを排除する。
 */

const CACHE_NAME = 'logos-v1.1.0';

// 確実に存在する主要ファイルに限定（不確実なファイルは動的にキャッシュする方針）
const ASSETS = [
  './',
  './index.html',
  './style.css',
  './main.js',
  './manifest.json',
  // core層（これまでの対話で確定した主要ファイル）
  './core/LogosCore.js',
  './core/arithmos.js',
  './core/foundation.js',
  './core/LogosEngine.js',
  './core/currency.js',
  './core/external_finance_logos.js',
  './core/storage.js',
  './core/cache_logos.js',
  './core/module.js',
  './core/dialogue.js',
  './core/external.js',
  './core/client_logos.js',
  './core/comms_logos.js',
  // app/ai層
  './app/fusionui.js',
  './app/handler.js',
  './app/offline.js',
  './ai/generator.js',
  './ai/fetch.js'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      // cache.addAll は一つでも失敗すると全体が失敗するため、
      // 確実に存在するファイルだけを登録するか、個別に add する
      return Promise.allSettled(
        ASSETS.map(asset => cache.add(asset).catch(err => console.warn(`[SW] Skip asset: ${asset}`, err)))
      );
    })
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))
      );
    })
  );
  return self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  // ネットワーク優先、失敗したらキャッシュを返す「Network First」へ変更
  // 開発中のデプロイ反映を速めるため。
  event.respondWith(
    fetch(event.request).catch(() => caches.match(event.request))
  );
});
