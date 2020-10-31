"use strict";

(function () {
  const map = document.querySelector(`.map`);
  const filters = map.querySelector(`.map__filters`);
  const pins = map.querySelector(`.map__pins`);

  pins.addEventListener(`click`, function (evt) {
    const eventTarget = evt.target.closest(`.map__pin:not(.map__pin--main)`);
    if (!eventTarget) {
      return;
    }

    window.card.close();

    const eventTargetIndex = eventTarget.dataset.index;
    window.card.open(window.data.offers[eventTargetIndex]);
  });

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
