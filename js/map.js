"use strict";

(function () {
  const map = document.querySelector(`.map`);
  const filters = map.querySelector(`.map__filters`);
  const pinContainer = map.querySelector(`.map__pins`);

  const showPins = function (array) {
    const fragment = document.createDocumentFragment();
    for (let i = 0; i < array.length; i++) {
      const arrayItem = array[i];
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

  // pinContainer.addEventListener(`click`, function (evt) {
  //   const eventTarget = evt.target.closest(`.map__pin:not(.map__pin--main)`);
  //   if (!eventTarget) {
  //     return;
  //   }
  //   window.card.close();
  //   const eventTargetIndex = eventTarget.dataset.index;
  //   window.card.open(window.data.offers[eventTargetIndex]); // как использовать вернувшийся с сервера массив для открытия нужной карточки?
  // });

  window.map = {
    disable,
    enable,
    hidePins,
    showPins
  };
})();
