"use strict";

(function () {
  const pinTemplate = document.querySelector(`#pin`).content;
  const pinButton = pinTemplate.querySelector(`.map__pin`);
  const pinContainer = document.querySelector(`.map__pins`);

  const createPinButton = function (object) {
    const pin = pinButton.cloneNode(true);
    const pinImage = pin.querySelector(`img`);
    pin.style.left = `${object.location.x}px`;
    pin.style.top = `${object.location.y}px`;
    pin.style.transform = `translate(-50%, -100%)`;
    pinImage.src = object.author.avatar;
    pinImage.alt = object.offer.title;

    return pin;
  };

  window.pin = {
    pinContainer,
    createPinButton
  };
})();
