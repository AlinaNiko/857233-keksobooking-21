"use strict";

(function () {
  const template = document.querySelector(`#pin`).content.querySelector(`.map__pin`);
  const map = document.querySelector(`.map`);
  const pins = map.querySelector(`.map__pins`);
  const main = map.querySelector(`.map__pin--main`);

  const mainPosition = {
    top: Math.round(window.main.getPosition(main, map).top + main.clientHeight),
    left: Math.round(window.main.getPosition(main, map).left + main.clientWidth / 2)
  };

  const mainCenterPosition = {
    top: Math.round(window.main.getPosition(main, map).top + main.clientHeight / 2),
    left: Math.round(window.main.getPosition(main, map).left + main.clientWidth / 2)
  };

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

  const show = function (array) {
    const fragment = document.createDocumentFragment();
    for (let i = 0; i < array.length; i++) {
      const arrayItem = array[i];
      const readyPin = create(arrayItem);
      readyPin.setAttribute(`data-index`, i);
      fragment.appendChild(readyPin);
    }

    pins.appendChild(fragment);
  };

  const onMainMouseDown = function (switchOn) {
    main.addEventListener(`mousedown`, function (evt) {
      if (evt.button === 0) {
        switchOn();
        show(window.data.offers);
      }
    });
  };

  const onMainKeyDown = function (switchOn) {
    main.addEventListener(`keydown`, function (evt) {
      if (evt.key === `Enter`) {
        switchOn();
        window.pin.show(window.data.offers);
      }
    });
  };

  window.pin = {
    mainPosition,
    mainCenterPosition,
    create,
    show,
    onMainMouseDown,
    onMainKeyDown
  };
})();
