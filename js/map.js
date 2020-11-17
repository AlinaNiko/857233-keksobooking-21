"use strict";

(function () {
  const MAX_OFFERS_AMOUNT = 5;

  const map = document.querySelector(`.map`);
  const pinsBlock = map.querySelector(`.map__pins`);

  let offers = [];

  const showPins = function (array) {
    offers = array.filter(function (object) {
      return object.offer;
    });
    const offersSize = Math.min(offers.length, MAX_OFFERS_AMOUNT);
    const fragment = document.createDocumentFragment();
    for (let i = 0; i < offersSize; i++) {
      const arrayItem = offers[i];
      const readyPin = window.pin.create(arrayItem);
      readyPin.dataset.index = i;
      fragment.appendChild(readyPin);
    }

    pinsBlock.appendChild(fragment);
  };

  const hidePins = function () {
    const pins = pinsBlock.querySelectorAll(`.map__pin:not(.map__pin--main)`);
    for (let pin of pins) {
      pin.remove();
    }
  };

  const disable = function () {
    map.classList.add(`map--faded`);
    hidePins();
  };

  const enable = function () {
    map.classList.remove(`map--faded`);
  };

  const unactivatePin = function () {
    const activePin = pinsBlock.querySelector(`.map__pin--active`);
    if (activePin) {
      activePin.classList.remove(`map__pin--active`);
    }
  };

  const activatePin = function (pin) {
    pin.classList.add(`map__pin--active`);
  };

  pinsBlock.addEventListener(`click`, function (evt) {
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
    showPins,
    unactivatePin
  };
})();
