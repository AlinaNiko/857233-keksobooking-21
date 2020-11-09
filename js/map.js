"use strict";

(function () {
  const map = document.querySelector(`.map`);
  const filters = map.querySelector(`.map__filters`);
  const pinContainer = map.querySelector(`.map__pins`);

  let offers = [];

  const showPins = function (array) {
    offers = array.filter(function (object) {
      return object.offer;
    });
    const fragment = document.createDocumentFragment();
    for (let i = 0; i < offers.length; i++) {
      const arrayItem = offers[i];
      const readyPin = window.pin.create(arrayItem);
      readyPin.setAttribute(`data-index`, i);
      fragment.appendChild(readyPin);
    }

    pinContainer.appendChild(fragment);
  };

  const hidePins = function () {
    const pins = pinContainer.querySelectorAll(`.map__pin:not(.map__pin--main)`);
    for (let pin of pins) {
      pin.remove();
    }
  };

  const disable = function () {
    map.classList.add(`map--faded`);
    window.main.setChildrenDisabled(filters, true);
    hidePins();
  };

  const enable = function () {
    map.classList.remove(`map--faded`);
    window.main.setChildrenDisabled(filters, false);
  };

  const unactivatePin = function () {
    const pins = pinContainer.querySelectorAll(`.map__pin:not(.map__pin--main)`);
    for (let pin of pins) {
      pin.classList.remove(`map__pin--active`);
    }
  };

  const activatePin = function (pin) {
    pin.classList.add(`map__pin--active`);
  };

  pinContainer.addEventListener(`click`, function (evt) {
    unactivatePin();
    const eventTarget = evt.target.closest(`.map__pin:not(.map__pin--main)`);
    if (!eventTarget) {
      return;
    }
    window.card.close();
    activatePin(eventTarget);
    const eventTargetIndex = eventTarget.dataset.index;
    window.card.open(offers[eventTargetIndex]);
  });

  window.map = {
    disable,
    enable,
    hidePins,
    showPins
  };
})();
