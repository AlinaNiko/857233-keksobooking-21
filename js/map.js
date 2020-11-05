"use strict";

(function () {
  const map = document.querySelector(`.map`);
  const filters = map.querySelector(`.map__filters`);

  const disable = function () {
    map.classList.add(`map--faded`);
    window.main.setChildrenDisabled(filters, true);
  };

  const enable = function () {
    map.classList.remove(`map--faded`);
    window.main.setChildrenDisabled(filters, false);
  };

  window.map = {
    disable,
    enable
  };
})();
