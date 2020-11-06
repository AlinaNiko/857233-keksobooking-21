"use strict";

(function () {
  const map = document.querySelector(`.map`);
  const main = map.querySelector(`.map__pin--main`);
  const SIZE = {
    width: 62,
    height: 84
  };

  const MAP_BORDERS = {
    top: 130 - SIZE.height,
    bottom: 630 - SIZE.height,
    left: 0 - SIZE.width / 2,
    right: map.clientWidth - SIZE.width / 2
  };

  const getPosition = function (element) {
    const position = {
      top: element.offsetTop,
      left: element.offsetLeft
    };

    return position;
  };

  const centerPosition = {
    top: Math.round(getPosition(main).top),
    left: Math.round(getPosition(main).left)
  };

  const setCenter = function () {
    main.style.top = `${centerPosition.top}px`;
    main.style.left = `${centerPosition.left}px`;

    const centerCoords = {
      top: Math.round(centerPosition.top + main.clientHeight / 2),
      left: Math.round(centerPosition.left + main.clientWidth / 2),
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

    let mainTopPosition = getPosition(main).top - shift.y;
    let mainLeftPosition = getPosition(main).left - shift.x;

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
      top: Math.round(mainTopPosition + SIZE.height),
      left: Math.round(mainLeftPosition + SIZE.width / 2)
    };
    window.form.setAddress(mainPosition.left, mainPosition.top);
  };

  main.addEventListener(`mousedown`, function (evt) {
    evt.preventDefault();

    if (evt.button === 0) {
      window.mode.switchOnActive();
    }

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
      document.removeEventListener(`mousemove`, onMouseMove);
      document.removeEventListener(`mouseup`, onMouseUp);
    };

    document.addEventListener(`mousemove`, onMouseMove);
    document.addEventListener(`mouseup`, onMouseUp);
  });


  main.addEventListener(`click`, function (evt) {
    evt.preventDefault();
    window.mode.switchOnActive();
  });

  window.mainPin = {
    setCenter
  };
})();
