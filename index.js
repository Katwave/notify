navigator.serviceWorker.register("./sw.js");
Notification.requestPermission(function (result) {
  if (result === "granted") {
    navigator.serviceWorker.ready.then(function (registration) {
      // registration.showNotification("Notification with ServiceWorker");
      Push.create("Subscription!", {
        body: "You have subscribed!",
        icon: "/icon.png",
        // timeout: 4000,
        onClick: function () {
          // window.focus();
          window.open("https://www.ordapple.com");
          // this.close();
        },
      });
    });
  } else if (result === "denied") {
  } else {
    Notification.requestPermission().then((res) => {
      Push.create("Subscription!", {
        body: "Thank you for subscribing!",
        icon: "/icon.png",
        // timeout: 4000,

        link: "https://www.ordapple.com",
      });
    });
  }
});
