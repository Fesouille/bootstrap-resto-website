this.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open('v4').then(function(cache) {
      return cache.addAll([
        '/bootstrap-resto-website/',
        '/bootstrap-resto-website/offline.html',
        '/bootstrap-resto-website/assets/css/style.css',
        '/bootstrap-resto-website/assets/bootstrap/css/bootstrap.css',
        '/bootstrap-resto-website/assets/bootstrap/css/bootstrap.min.css',
        '/bootstrap-resto-website/assets/bootstrap/css/bootstrap-grid.min.css',
        '/bootstrap-resto-website/assets/bootstrap/css/bootstrap-reboot.min.css',
        '/bootstrap-resto-website/assets/bootstrap/jss/bootstrap.bundle.min.js',
        '/bootstrap-resto-website/assets/bootstrap/jss/bootstrap.min.js'
      ]);
    })
  );
});

this.addEventListener('fetch', function(event) {
  event.respondWith(caches.match(event.request).then(function(response) {
    // caches.match() always resolves
    // but in case of success response will have value
    if (response !== undefined) {
      return response;
    } else {
      return fetch(event.request).then(function (response) {
        // response may be used only once
        // we need to save clone to put one copy in cache
        // and serve second one
        let responseClone = response.clone();
        
        caches.open('v4').then(function (cache) {
          cache.put(event.request, responseClone);
        });
        return response;
      }).catch(function () {
        return caches.match('/bootstrap-resto-website/assets/img/falafel.jpg');
      });
    }
  }));
});