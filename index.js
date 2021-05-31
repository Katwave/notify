// Register service worker
if ("serviceWorker" in navigator) {
  navigator.serviceWorker
    .register("/sw.js")
    .then(function (registration) {
      console.log("Registration successful, scope is:", registration.scope);
    })
    .catch(function (error) {
      console.log("Service worker registration failed, error:", error);
    });
}

Notification.requestPermission(function (result) {
  if (result === "granted") {
    navigator.serviceWorker.ready.then(function (registration) {
      // registration.showNotification("Notification with ServiceWorker");
      var options = {
        body: "This notification was generated from a push!",
        icon: "/icon.png",
        vibrate: [100, 50, 100],
        data: {
          dateOfArrival: Date.now(),
          primaryKey: "2",
        },
        onclick: () => {
          window.open("ordapple.com");
        },
        actions: [
          {
            action: "explore",
            title: "Explore this new world",
            icon: "/icon.png",
          },
          { action: "close", title: "Close", icon: "/icon.png" },
        ],
      };
      console.log("registration: ", registration);
      console.log("resuls: ", res);
      registration.showNotification("Subscription!", options);
    });
  } else if (result === "denied") {
  } else if (result != "denied" && result != "granted") {
    Notification.requestPermission().then((res) => {
      if (result === "granted") {
        navigator.serviceWorker.ready.then(function (registration) {
          // registration.showNotification("Notification with ServiceWorker");
          var options = {
            body: "Thank you for subscribing!",
            icon: "/icon.png",
            vibrate: [100, 50, 100],
            data: {
              dateOfArrival: Date.now(),
              primaryKey: "2",
            },
            onclick: () => {
              window.open("ordapple.com");
            },
            actions: [
              {
                action: "explore",
                title: "Explore this new world",
                icon: "/icon.png",
              },
              { action: "close", title: "Close", icon: "/icon.png" },
            ],
          };
          console.log("registration: ", registration);
          console.log("resuls: ", res);
          registration.showNotification("Subscription!", options);
        });
      }
    });
  }
});
