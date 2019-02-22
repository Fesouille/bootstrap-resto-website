this.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open('v2').then(function(cache) {
      return cache.addAll([
        '/bootstrap-resto-website/',
        '/bootstrap-resto-website/offline/acceuil_offline.html',
        '/bootstrap-resto-website/offline/carte_offline.html',
        '/bootstrap-resto-website/offline/gallerie_offline.html',
        '/bootstrap-resto-website/offline/restaurants_offline.html',
        '/bootstrap-resto-website/offline/contact_offline.html',
        '/bootstrap-resto-website/offline/offline_style.css',
        '/bootstrap-resto-website/assets/img/pizza-falafel_logo.png',
        '/bootstrap-resto-website/assets/img/pizza-falafel_logo.ico',
        
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
        
        caches.open('v2').then(function (cache) {
          cache.put(event.request, responseClone);
        });
        return response;
      }).catch(function () {
        return caches.match('/bootstrap-resto-website/assets/img/pizza-falafel_logo.png');
      });
    }
  }));
});