"use strict";

(function () {
  const DEBOUNCE_INTERVAL = 500;

  window.debounce = function (callback) {
    let lastTimeout = null;

    return function (...parameters) {
      if (lastTimeout) {
        window.clearTimeout(lastTimeout);
      }
      lastTimeout = window.setTimeout(function () {
        callback(...parameters);
      }, DEBOUNCE_INTERVAL);
    };
  };
})();
