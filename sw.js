/**
 * sw.js (最終確定版：永続化統治)
 * 物理パスの不整合を排除し、厳選された資産のみを永続化する。
 */

const CACHE_NAME = 'logos-v1.2.0'; // パス修正に伴うバージョンアップ

// 資産リスト：app/main.js へのパスを修正
const ASSETS = [
  './',
  './index.html',
  './style.css',
  './app/main.js', // [重要] ルートから app/ 階層へ修正
  './manifest.json',
  // core層：憲法、数理、基盤
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
  // app/ai層：UI、ハンドラ、知性
  './app/fusionui.js',
  './app/handler.js',
  './app/offline.js',
  './ai/generator.js',
  './ai/fetch.js'
];

// インストール：全資産の永続的キャッシュ
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('[SW] ロゴス資産の同期を開始。');
      // Promise.allSettled を使用し、一つでも見つからないファイルがあっても
      // 全体が停止しないように保険をかける
      return Promise.allSettled(
        ASSETS.map(asset => 
          cache.add(asset).catch(err => console.warn(`[SW] Skip non-existent asset: ${asset}`, err))
        )
      );
    })
  );
  self.skipWaiting();
});

// アクティベート：古いバージョンのキャッシュをパージ
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))
      );
    })
  );
  console.log('[SW] 旧い記憶のパージ完了。最新のロゴスが支配しています。');
  return self.clients.claim();
});

// フェッチ：ネットワーク優先、失敗時にキャッシュを返却（開発時の反映速度を重視）
self.addEventListener('fetch', (event) => {
  event.respondWith(
    fetch(event.request).catch(() => caches.match(event.request))
  );
});
