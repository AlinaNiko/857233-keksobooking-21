"use strict";

(function () {
  const template = document.querySelector(`#pin`).content.querySelector(`.map__pin`);

  const create = function (object) {
    const pin = template.cloneNode(true);
    const pinImage = pin.querySelector(`img`);
    pin.style.left = `${object.location.x}px`;
    pin.style.top = `${object.location.y}px`;
    pin.style.transform = `translate(-50%, -100%)`;
    pinImage.src = object.author.avatar;
    pinImage.alt = object.offer.title;

    return pin;
  };

  window.pin = {
    create
  };
})();
