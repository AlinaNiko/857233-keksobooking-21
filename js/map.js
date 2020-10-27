"use strict";

(function () {
  const mapFilters = window.main.map.querySelector(`.map__filters`);
  const mainPin = window.main.map.querySelector(`.map__pin--main`);

  const mainPinCenterPosition = {
    top: Math.round(window.main.getPosition(mainPin, window.main.map).top + mainPin.clientHeight / 2),
    left: Math.round(window.main.getPosition(mainPin, window.main.map).left + mainPin.clientWidth / 2)
  };

  const mainPinPosition = {
    top: Math.round(window.main.getPosition(mainPin, window.main.map).top + mainPin.clientHeight),
    left: Math.round(window.main.getPosition(mainPin, window.main.map).left + mainPin.clientWidth / 2)
  };


  const renderPinButton = function (array) {
    const fragment = document.createDocumentFragment();

    for (let i = 0; i < array.length; i++) {
      const arrayItem = array[i];
      const readyPin = window.pin.createPinButton(arrayItem);
      readyPin.setAttribute(`data-index`, i);
      fragment.appendChild(readyPin);
    }

    window.pin.pinContainer.appendChild(fragment);
  };


  const renderPinCard = function (object) {
    const readyPinCard = window.card.createPinCard(object);
    window.main.map.insertBefore(readyPinCard, window.card.pinCardNeighbor);
    document.addEventListener(`keydown`, window.card.onDocumentKeydown);
  };

  window.pin.pinContainer.addEventListener(`click`, function (evt) {
    const eventTarget = evt.target.closest(`.map__pin:not(.map__pin--main)`);
    if (!eventTarget) {
      return;
    }

    window.card.closePinCard();

    const eventTargetIndex = eventTarget.dataset.index;
    renderPinCard(window.data.offers[eventTargetIndex]);
  });

  window.map = {
    mapFilters,
    mainPin,
    mainPinCenterPosition,
    mainPinPosition,
    renderPinButton
  };
})();
