"use strict";

(function () {
  const setChildrenDisabled = function (element, boolean) {
    const children = element.children;
    for (let child of children) {
      child.disabled = boolean;
    }
  };

  const switchOffActive = function () {
    window.main.map.classList.add(`map--faded`);
    window.form.adForm.classList.add(`ad-form--disabled`);
    setChildrenDisabled(window.form.adForm, true);
    setChildrenDisabled(window.map.mapFilters, true);

    window.form.adFormAddress.value = `${window.map.mainPinCenterPosition.left}, ${window.map.mainPinCenterPosition.top}`;
  };

  const switchOnActive = function () {
    window.main.map.classList.remove(`map--faded`);
    window.form.adForm.classList.remove(`ad-form--disabled`);
    setChildrenDisabled(window.form.adForm, false);
    setChildrenDisabled(window.map.mapFilters, false);

    window.form.adFormAddress.value = `${window.map.mainPinPosition.left}, ${window.map.mainPinPosition.top}`;
  };

  window.addEventListener(`load`, function () {
    switchOffActive();
  });

  window.map.mainPin.addEventListener(`mousedown`, function (evt) {
    if (evt.button === 0) {
      switchOnActive();
      window.map.renderPinButton(window.data.offers);
    }
  });

  window.map.mainPin.addEventListener(`keydown`, function (evt) {
    if (evt.key === `Enter`) {
      switchOnActive();
      window.map.renderPinButton(window.data.offers);
    }
  });

  const resetButton = window.form.adForm.querySelector(`.ad-form__reset`);

  resetButton.addEventListener(`click`, function (evt) {
    evt.preventDefault();
    window.form.adForm.reset();
    const mapPins = window.main.map.querySelectorAll(`.map__pin:not(.map__pin--main)`);
    for (let pin of mapPins) {
      pin.remove();
    }
    switchOffActive();
  });
})();
