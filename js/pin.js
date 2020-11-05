"use strict";

(function () {
  const template = document.querySelector(`#pin`).content.querySelector(`.map__pin`);
  const map = document.querySelector(`.map`);
  const container = map.querySelector(`.map__pins`);
  const main = map.querySelector(`.map__pin--main`);
  const MAIN_SIZE = {
    width: 62,
    height: 84
  };

  const MAP_BORDERS = {
    top: 130 - MAIN_SIZE.height,
    bottom: 630 - MAIN_SIZE.height,
    left: 0 - MAIN_SIZE.width / 2,
    right: map.clientWidth - MAIN_SIZE.width / 2
  };

  const mainCenterPosition = {
    top: Math.round(window.main.getPosition(main).top),
    left: Math.round(window.main.getPosition(main).left)
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

    container.appendChild(fragment);
  };

  const hide = function () {
    const pins = container.querySelectorAll(`.map__pin:not(.map__pin--main)`);
    for (let pin of pins) {
      pin.remove();
    }
  };

  const setMainCenter = function () {
    main.style.top = `${mainCenterPosition.top}px`;
    main.style.left = `${mainCenterPosition.left}px`;

    const centerCoords = {
      top: Math.round(mainCenterPosition.top + main.clientHeight / 2),
      left: Math.round(mainCenterPosition.left + main.clientWidth / 2),
    };
    window.form.setAddress(centerCoords.left, centerCoords.top);
  };

  const setPosition = function (evt, coords) {
    evt.preventDefault();
    const shift = {
      x: coords.x - evt.clientX,
      y: coords.y - evt.clientY
    };

    coords.x = evt.clientX;
    coords.y = evt.clientY;

    let mainTopPosition = window.main.getPosition(main).top - shift.y;
    let mainLeftPosition = window.main.getPosition(main).left - shift.x;

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
      top: Math.round(mainTopPosition + MAIN_SIZE.height),
      left: Math.round(mainLeftPosition + MAIN_SIZE.width / 2)
    };
    window.form.setAddress(mainPosition.left, mainPosition.top);
  };

  const onMainMouseDown = function (switchOn, setAddress) {
    main.addEventListener(`mousedown`, function (evt) {
      evt.preventDefault();
      const pins = container.querySelectorAll(`.map__pin:not(.map__pin--main)`);

      if (evt.button === 0 && pins.length === 0) {
        switchOn();
        // window.load(onSuccess, onError);
        show(offers);
        // show(window.data.offers);
      }

      let startCoordinates = {
        x: evt.clientX,
        y: evt.clientY
      };

      const onMouseMove = function (moveEvt) {
        setPosition(moveEvt, startCoordinates, setAddress);
      };

      const onMouseUp = function (upEvt) {
        upEvt.preventDefault();
        setPosition(upEvt, startCoordinates, setAddress);
        document.removeEventListener(`mousemove`, onMouseMove);
        document.removeEventListener(`mouseup`, onMouseUp);
      };

      document.addEventListener(`mousemove`, onMouseMove);
      document.addEventListener(`mouseup`, onMouseUp);
    });
  };

  const onMainKeyDown = function (switchOn) {
    main.addEventListener(`keydown`, function (evt) {
      if (evt.key === `Enter`) {
        switchOn();
        // window.load(onSuccess, onError);
        show(offers);
        // show(window.data.offers);
      }
    });
  };

  container.addEventListener(`click`, function (evt) {
    const eventTarget = evt.target.closest(`.map__pin:not(.map__pin--main)`);
    if (!eventTarget) {
      return;
    }
    window.card.close();
    const eventTargetIndex = eventTarget.dataset.index;
    // window.card.open(window.data.offers[eventTargetIndex]);
    window.card.open(offers[eventTargetIndex]);
  });


  let offers = [];
  const onSuccess = function (response) {
    // show(response);
    offers = response;
  };

  const onError = function (error) {
    const nodeError = document.createElement(`div`);
    nodeError.style.position = `fixed`;
    nodeError.style.top = 0;
    nodeError.style.left = 0;
    nodeError.style.width = `100%`;
    nodeError.style.padding = `15px`;
    nodeError.style.fontWeight = 700;
    nodeError.style.fontSize = `18px`;
    nodeError.style.textAlign = `center`;
    nodeError.style.color = `#ffffff`;
    nodeError.style.backgroundColor = `#ff5635`;
    nodeError.style.boxShadow = `0 0 20px 0 #ff6547`;
    nodeError.style.zIndex = 2;

    nodeError.textContent = error;
    document.body.insertAdjacentElement(`afterbegin`, nodeError);
  };

  window.load(onSuccess, onError);

  window.pin = {
    hide,
    setMainCenter,
    onMainMouseDown,
    onMainKeyDown
  };
})();
