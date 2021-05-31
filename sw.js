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
