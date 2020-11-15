"use strict";

(function () {
  const adForm = document.querySelector(`.ad-form`);
  const file = adForm.querySelectorAll(`[type="file"]`);
  const title = adForm.querySelector(`#title`);
  const address = adForm.querySelector(`#address`);
  const price = adForm.querySelector(`#price`);
  const type = adForm.querySelector(`#type`);
  const timeIn = adForm.querySelector(`#timein`);
  const timeOut = adForm.querySelector(`#timeout`);
  const roomNumber = adForm.querySelector(`#room_number`);
  const capacity = adForm.querySelector(`#capacity`);

  adForm.action = `https://21.javascript.pages.academy/keksobooking`;
  for (let fileField of file) {
    fileField.accept = `image/png, image/jpeg`;
  }

  address.setAttribute(`readonly`, ``);

  title.setAttribute(`required`, ``);
  title.setAttribute(`minlength`, `30`);
  title.setAttribute(`maxlength`, `100`);

  title.addEventListener(`input`, function () {
    const titleValueLength = title.value.length;
    if (titleValueLength < title.getAttribute(`minlength`)) {
      title.setCustomValidity(`Минимальная длина заголовка ${title.getAttribute(`minlength`)} симв. Осталось ввести еще ${title.getAttribute(`minlength`) - titleValueLength} симв.`);
    } else {
      title.setCustomValidity(``);
    }
    title.reportValidity();
  });

  price.setAttribute(`required`, ``);
  price.setAttribute(`max`, `1000000`);

  const setPriceValue = function () {
    let value;
    if (type.value === `bungalow`) {
      value = 0;
    } else if (type.value === `flat`) {
      value = 1000;
    } else if (type.value === `house`) {
      value = 5000;
    } else {
      value = 10000;
    }
    price.min = value;
    price.placeholder = value;
  };

  const setPriceValidation = function () {
    let message = ``;
    if (price.validity.valueMissing) {
      message = `Укажите цену`;
    } else if (price.validity.rangeOverflow) {
      message = `Максимальная цена за ночь ${price.getAttribute(`max`)} руб.`;
    } else if (price.validity.rangeUnderflow) {
      message = `Минимальная цена за ночь ${price.getAttribute(`min`)} руб.`;
    } else {
      message = ``;
    }
    price.setCustomValidity(message);
    price.reportValidity();
  };

  setPriceValue();

  type.addEventListener(`change`, function () {
    setPriceValue();
    setPriceValidation();
  });

  price.addEventListener(`input`, function () {
    setPriceValidation();
  });

  timeIn.addEventListener(`change`, function () {
    timeOut.value = timeIn.value;
  });

  timeOut.addEventListener(`change`, function () {
    timeIn.value = timeOut.value;
  });

  const getErrorMessage = function (roomsField, guestsField) {
    const rooms = Number(roomsField.value);
    const guests = Number(guestsField.value);

    if (rooms === 100 && guests !== 0 || rooms !== 100 && guests === 0) {
      return `Сто комнат - не для гостей`;
    } else if (rooms < guests) {
      return `Количество гостей не может превышать количество комнат`;
    } else {
      return ``;
    }
  };

  roomNumber.addEventListener(`change`, function () {
    roomNumber.setCustomValidity(``);
    capacity.setCustomValidity(``);
    const errorMessage = getErrorMessage(roomNumber, capacity);
    roomNumber.setCustomValidity(errorMessage);
    roomNumber.reportValidity();
  });

  capacity.setCustomValidity(getErrorMessage(roomNumber, capacity));

  capacity.addEventListener(`change`, function () {
    roomNumber.setCustomValidity(``);
    capacity.setCustomValidity(``);
    const errorMessage = getErrorMessage(roomNumber, capacity);
    capacity.setCustomValidity(errorMessage);
    capacity.reportValidity();
  });

  const resetButton = adForm.querySelector(`.ad-form__reset`);
  resetButton.addEventListener(`click`, function (evt) {
    evt.preventDefault();
    adForm.reset();
    window.mode.switchOffActive();
  });

  const enable = function () {
    adForm.classList.remove(`ad-form--disabled`);
    window.main.setChildrenDisabled(adForm, false);
  };

  const disable = function () {
    adForm.reset();
    adForm.classList.add(`ad-form--disabled`);
    window.main.setChildrenDisabled(adForm, true);
    const mainPinCenter = window.mainPin.getCenterPosition();
    setAddress(mainPinCenter.x, mainPinCenter.y);
  };

  const setAddress = function (x, y) {
    address.value = `${Math.round(x)}, ${Math.round(y)}`;
  };

  adForm.addEventListener(`submit`, function (evt) {
    evt.preventDefault();
    window.server.upload(new FormData(adForm), onSuccess, onError);
  });

  const onSuccess = function () {
    window.mode.switchOffActive();
    window.message.showSuccess();
  };

  const onError = function (error) {
    window.message.showError(error);
  };

  window.form = {
    enable,
    disable,
    setAddress
  };
})();
