"use strict";
function isFunction(obj) {
  return obj && {}.toString.call(obj) === "[object Function]";
}
function runFunctionString(funcStr) {
  if (funcStr.trim().length > 0) {
    var func = new Function(funcStr);
    if (isFunction(func)) {
      func();
    }
  }
}
self.addEventListener("fetch", (e) => {});
self.addEventListener("message", function (event) {
  self.client = event.source;
});
self.onnotificationclose = function (event) {
  runFunctionString(event.notification.data.onClose);
  self.client.postMessage(
    JSON.stringify({ id: event.notification.data.id, action: "close" })
  );
};
self.onnotificationclick = function (event) {
  var link, origin, href;
  if (
    typeof event.notification.data.link !== "undefined" &&
    event.notification.data.link !== null
  ) {
    origin = event.notification.data.origin;
    link = event.notification.data.link;
    href = origin.substring(0, origin.indexOf("/", 8)) + "/";
    if (link[0] === "/") {
      link = link.length > 1 ? link.substring(1, link.length) : "";
    }
    event.notification.close();
    event.waitUntil(
      clients
        .matchAll({ type: "window" })
        .then(function (clientList) {
          var client, full_url;
          for (var i = 0; i < clientList.length; i++) {
            client = clientList[i];
            full_url = href + link;
            if (
              full_url[full_url.length - 1] !== "/" &&
              client.url[client.url.length - 1] === "/"
            ) {
              full_url += "/";
            }
            if (client.url === full_url && "focus" in client) {
              return client.focus();
            }
          }
          if (clients.openWindow) {
            return clients.openWindow("/" + link);
          }
        })
        .catch(function (error) {
          throw new Error("A ServiceWorker error occurred: " + error.message);
        })
    );
  }
  runFunctionString(event.notification.data.onClick);
};
