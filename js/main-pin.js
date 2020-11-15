"use strict";

(function () {
  const ActiveSize = {
    WIDTH: 62,
    HEIGHT: 84
  };

  const Borders = {
    TOP: 130,
    RIGHT: 1200,
    BOTTOM: 630,
    LEFT: 0
  };

  const Center = {
    TOP: 375,
    LEFT: 570
  };

  const map = document.querySelector(`.map`);
  const main = map.querySelector(`.map__pin--main`);

  const setPosition = function (x, y) {
    main.style.left = `${x - ActiveSize.WIDTH / 2}px`;
    main.style.top = `${y - ActiveSize.HEIGHT}px`;
  };

  const getPosition = function () {
    return {
      x: main.offsetLeft + ActiveSize.WIDTH / 2,
      y: main.offsetTop + ActiveSize.HEIGHT
    };
  };

  const setCenterPosition = function () {
    main.style.left = `${Center.LEFT}px`;
    main.style.top = `${Center.TOP}px`;
  };

  const getCenterPosition = function () {
    return {
      x: Center.LEFT + main.offsetWidth / 2,
      y: Center.TOP + main.offsetHeight / 2
    };
  };

  main.addEventListener(`mousedown`, function (evt) {
    evt.preventDefault();

    if (evt.button === 0) {
      window.mode.switchOnActive();
    }

    const startX = evt.clientX;
    const startY = evt.clientY;

    const startPosition = getPosition();

    let dragged = false;

    const onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      const shiftX = moveEvt.clientX - startX;
      const shiftY = moveEvt.clientY - startY;

      let nextPositionX = startPosition.x + shiftX;
      let nextPositionY = startPosition.y + shiftY;

      nextPositionX = (nextPositionX < Borders.LEFT) ? Borders.LEFT : nextPositionX;
      nextPositionX = (nextPositionX > Borders.RIGHT) ? Borders.RIGHT : nextPositionX;

      nextPositionY = (nextPositionY < Borders.TOP) ? Borders.TOP : nextPositionY;
      nextPositionY = (nextPositionY > Borders.BOTTOM) ? Borders.BOTTOM : nextPositionY;

      setPosition(nextPositionX, nextPositionY);
      window.form.setAddress(nextPositionX, nextPositionY);

      dragged = true;
    };

    const onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      if (!dragged) {
        setPosition(startPosition.x, startPosition.y);
        window.form.setAddress(startPosition.x, startPosition.y);
      }

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
    setCenterPosition,
    getCenterPosition
  };
})();
