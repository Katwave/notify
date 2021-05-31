// const notifyMe = () => {
//     if ('notification' in window) {
//         notify()
//     }
//     else if ()
// }

// Notification.requestPermission();
// const notification = new Notification("New order", {
//   icon: "./icon.png",
//   body: "Katlego Mangoale placed a new order!",
// });

Push.create("Hello world!", {
  body: "How's it hangin'?",
  icon: "/icon.png",
  // timeout: 4000,
  onClick: function () {
    window.focus();
    window.open("https://www.ordapple.com");
    this.close();
  },
});

navigator.serviceWorker.register("./sw.js");
Notification.requestPermission(function (result) {
  if (result === "granted") {
    navigator.serviceWorker.ready.then(function (registration) {
      registration.showNotification("Notification with ServiceWorker");
    });
  } else {
    document.getElementsByClassName("notif")[0].innerHTML = "not fiound";
  }
});
