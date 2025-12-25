/**
 * sw.js (MSGAI-LOGOS 最終永続化版)
 * ロゴスの理をローカルストレージに刻み、オフライン下での主権を保証する。
 */

const CACHE_NAME = 'logos-v1.0.1'; // バージョンアップにより旧キャッシュをパージ

// キャッシュすべき全モジュールの網羅
const ASSETS = [
  './',
  './index.html',
  './style.css',
  './main.js',
  './manifest.json',
  // core層
  './core/LogosCore.js',
  './core/arithmos.js',
  './core/foundation.js',
  './core/LogosEngine.js',
  './core/currency.js',
  './core/external_finance_logos.js',
  './core/knowledge.js',
  './core/runtime_logos.js',
  './core/os_logos.js',
  './core/power_logos.js',
  './core/silence.js',
  './core/ios_logos.js',
  './core/message_channel_logos.js',
  './core/revision_logos.js',
  './core/storage_logos.js',
  './core/cache_logos.js',
  './core/module_logos.js',
  './core/dialogue.js',
  './core/external.js',
  './core/foundation_logos.js',
  './core/language_logos.js',
  './core/service_logos.js',
  // app層
  './app/fusionui.js',
  './app/handler.js',
  './app/offline.js',
  // ai層
  './ai/generator.js',
  './ai/fetch.js'
];

// インストール: 全ロゴス資産の永続化
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('[SW] 資産の永続的キャッシュを開始。');
      return cache.addAll(ASSETS);
    })
  );
  self.skipWaiting();
});

// アクティベート: 旧バージョンの作為（古いキャッシュ）をパージ
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))
      );
    })
  );
  console.log('[SW] 旧い作為のパージ完了。最新のロゴスが支配しています。');
  return self.clients.claim();
});

// フェッチ: キャッシュを優先しつつ、ロゴスの連続性を保つ
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
