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

// Onclick event
self.addEventListener("notificationclick", function (event) {
  let url = "https://www.ordapple.com";
  console.log(event);
  event.notification.close(); // Android needs explicit close.
  event.waitUntil(
    clients.matchAll({ type: "window" }).then((windowClients) => {
      // Check if there is already a window/tab open with the target URL
      for (var i = 0; i < windowClients.length; i++) {
        var client = windowClients[i];
        // If so, just focus it.
        if (client.url === url && "focus" in client) {
          return client.focus();
        }
      }
      // If not, then open the target URL in a new window/tab.
      if (clients.openWindow) {
        return clients.openWindow(url);
      }
    })
  );
});
