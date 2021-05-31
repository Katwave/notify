//  Formatting the date (Today's date)
let todayDate = new Date();
const day = String(todayDate.getDate()).padStart(2, "0");
const mon = String(todayDate.getMonth()).padStart(2, "0"); // January is 0!
const year = todayDate.getFullYear();
todayDate = `${day}/${mon}/${year}`;

let randomId = Math.floor(Math.random(1000000000) * 1000000000);

// Subscribe btn
const btn = document.getElementById("subscribe");

btn.addEventListener("click", (e) => {
  e.preventDefault();

  // Notification prompt
  Notification.requestPermission(function (result) {
    if (result === "granted") {
      navigator.serviceWorker.ready.then(function (registration) {
        // registration.showNotification("Notification with ServiceWorker");
        var options = {
          body: "This notification was generated from a push!",
          icon: "/icon.png",
          vibrate: [100, 50, 100],
          badge: "/icon.png",
          data: {
            dateOfArrival: todayDate,
            primaryKey: randomId,
            url: "https://www.ordapple.com",
          },
          // actions: [
          //   {
          //     action: "explore",
          //     title: "Explore this new world",
          //     icon: "/icon.png",
          //   },
          //   { action: "close", title: "Close", icon: "/icon.png" },
          // ],
        };

        // Send notification
        registration.showNotification("Subscription!", options);
      });
    } else if (result === "denied") {
    } else if (result != "denied" && result != "granted") {
      // Notif prompt
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
              // actions: [
              //   {
              //     action: "explore",
              //     title: "Explore this new world",
              //     icon: "/icon.png",
              //   },
              //   { action: "close", title: "Close", icon: "/icon.png" },
              // ],
            };
            // Send notification
            registration.showNotification("Subscription!", options);
          });
        }
      });
    }
  });
});

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
