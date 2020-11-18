"use strict";

const MAX_OFFERS_AMOUNT = 5;
const map = document.querySelector(`.map`);
const pinsBlock = map.querySelector(`.map__pins`);

let offers = [];

const showPins = (array) => {
  offers = array.filter((object) => object.offer);

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


const hidePins = () => {
  const pins = pinsBlock.querySelectorAll(`.map__pin:not(.map__pin--main)`);

  pins.forEach((pin) => {
    pin.remove();
  });
};


const disable = () => {
  map.classList.add(`map--faded`);
  hidePins();
};


const enable = () => {
  map.classList.remove(`map--faded`);
};


const unactivatePin = () => {
  const activePin = pinsBlock.querySelector(`.map__pin--active`);

  if (activePin) {
    activePin.classList.remove(`map__pin--active`);
  }
};


const activatePin = (pin) => {
  pin.classList.add(`map__pin--active`);
};


pinsBlock.addEventListener(`click`, (evt) => {
  unactivatePin();
  const eventTarget = evt.target.closest(`.map__pin:not(.map__pin--main)`);

  if (!eventTarget) {
    return;
  }

  window.card.hide();
  activatePin(eventTarget);

  const eventTargetIndex = eventTarget.dataset.index;
  window.card.show(offers[eventTargetIndex]);
});


window.map = {
  disable,
  enable,
  hidePins,
  showPins,
  unactivatePin
};
