var cacheName = 'microzz.com';
// 在安装过程中缓存我们已知的资源
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(cacheName)
      .then(function(cache) {
        return cache.addAll([
          'https://icdn.microzz.com/microzz/css/style.css',
          'https://icdn.microzz.com/microzz/css/atom-one-dark.1.css',
          'https://icdn.microzz.com/microzz/img/avatar.jpg',
          'https://icdn.microzz.com/microzz/js/waves.min.js',
          'https://icdn.microzz.com/microzz/js/main.min.js',
          'https://icdn.microzz.com/microzz/js/busuanzi.pure.mini.js',
          'https://icdn.microzz.com/microzz/css/fonts/fontawesome/fontawesome-webfont.woff2'
        ])
      })
  );
});
// 缓存任何获取的新资源
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request, { ignoreSearch: true })
    .then(function (response) {
      if (response) {
        return response;
      }
      var requestToCache = event.request.clone();
      return fetch(requestToCache).then(
        function (response) {
          if (!response || response.status !== 200) {
            return response;
          }
          var responseToCache = response.clone();
          caches.open(cacheName)
            .then(function (cache) {
              cache.put(requestToCache, responseToCache);
            });
          return response;
        });
    })
  );
});