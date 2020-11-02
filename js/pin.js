"use strict";

(function () {
  const template = document.querySelector(`#pin`).content.querySelector(`.map__pin`);
  const map = document.querySelector(`.map`);
  const adForm = document.querySelector(`.ad-form`);
  const pins = map.querySelector(`.map__pins`);
  const main = map.querySelector(`.map__pin--main`);
  const MAP_BORDERS = {
    top: 130 - main.clientHeight,
    bottom: 630 - main.clientHeight,
    left: 0 - main.clientWidth / 2,
    right: map.clientWidth - main.clientWidth / 2
  };

  // let mainPosition = {
  //   top: Math.round(window.main.getPosition(main, map).top + main.clientHeight),
  //   left: Math.round(window.main.getPosition(main, map).left + main.clientWidth / 2)
  // };

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

  const setPosition = function (evt, coords) {
    evt.preventDefault();
    const shift = {
      x: coords.x - evt.clientX,
      y: coords.y - evt.clientY
    };

    coords.x = evt.clientX;
    coords.y = evt.clientY;

    let mainTopPosition = window.main.getPosition(main, map).top - shift.y;
    let mainLeftPosition = window.main.getPosition(main, map).left - shift.x;

    if (mainTopPosition <= MAP_BORDERS.top) {
      mainTopPosition = MAP_BORDERS.top;
    }
    if (mainTopPosition >= MAP_BORDERS.bottom) {
      mainTopPosition = MAP_BORDERS.bottom;
    }

    if (mainLeftPosition <= MAP_BORDERS.left) {
      mainLeftPosition = MAP_BORDERS.left;
    }
    if (mainLeftPosition >= MAP_BORDERS.right) {
      mainLeftPosition = MAP_BORDERS.right;
    }
    main.style.top = `${mainTopPosition}px`;
    main.style.left = `${mainLeftPosition}px`;

    const mainPosition = {
      top: Math.round(mainTopPosition + main.clientHeight),
      left: Math.round(mainLeftPosition + main.clientWidth / 2)
    };
    adForm.querySelector(`#address`).value = `${mainPosition.left}, ${mainPosition.top}`;
  };


  main.addEventListener(`mousedown`, function (evt) {
    evt.preventDefault();

    let startCoordinates = {
      x: evt.clientX,
      y: evt.clientY
    };


    const onMouseMove = function (moveEvt) {
      setPosition(moveEvt, startCoordinates);
    };

    const onMouseUp = function (upEvt) {
      upEvt.preventDefault();
      setPosition(upEvt, startCoordinates);
      map.removeEventListener(`mousemove`, onMouseMove);
      map.removeEventListener(`mouseup`, onMouseUp);
    };

    const onMouseLeave = function (leaveEvt) {
      leaveEvt.preventDefault();
      map.removeEventListener(`mousemove`, onMouseMove);
      map.removeEventListener(`mouseup`, onMouseUp);
    };

    map.addEventListener(`mousemove`, onMouseMove);
    map.addEventListener(`mouseup`, onMouseUp);
    map.addEventListener(`mouseleave`, onMouseLeave);
  });

  window.pin = {
    // mainPosition,
    mainCenterPosition,
    create,
    show,
    onMainMouseDown,
    onMainKeyDown
  };
})();
