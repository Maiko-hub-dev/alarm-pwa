const CACHE_NAME = "alarm-cache-v4";
const ASSETS = [
  "./",
  "./index.html",
  "./manifest.webmanifest",
  "./alarm.mp3",

];

// インストール時に静的アセットをキャッシュ
self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS)));
});

// 古いキャッシュの掃除（重要）
self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

// キャッシュ優先
self.addEventListener('fetch', e => {
  e.respondWith(caches.match(e.request).then(r => r || fetch(e.request)));
});

