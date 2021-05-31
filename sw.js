self.addEventListener("fetch", (e) => {
  console.log("Fetching:", e.request.url);

  e.respondWith(
    caches.open("mysite-dynamic").then(function (cache) {
      return cache
        .match(e.request)
        .then(function (response) {
          return (
            response ||
            fetch(e.request).then(function (response) {
              cache.put(e.request, response.clone());
              return response;
            })
          );
        })
        .catch(() => {
          // If both fail, show a generic fallback:
          return caches.match("/offline.html");
        });
    })
  );
});
self.addEventListener("install", function (event) {
  // Perform some task
  console.log("Service worker installing...");

  event.waitUntil(
    caches.open("v1-cache").then(function (cache) {
      return cache.addAll([
        "/index.html",
        "/icon.png",
        "/index.js",
        "/offline.html",
      ]);
    })
  );
  // caches.open('example-cache').then(function(cache) {
  //   cache.matchAll('/').then(function(response) {
  //     response.forEach(function(element, index, array) {
  //       cache.delete(element);
  //     });
  //   });
  // })

  // fetch(url).then(function (response) {
  //   return cache.put(url, response);
  // })

  self.skipWaiting();
});
self.addEventListener("activate", function (event) {
  // Perform some task
  console.log("Service worker activating...");
});
