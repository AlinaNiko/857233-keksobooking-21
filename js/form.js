"use strict";

(function () {
  const adForm = document.querySelector(`.ad-form`);
  const fileFields = adForm.querySelectorAll(`[type="file"]`);
  const titleField = adForm.querySelector(`#title`);
  const address = adForm.querySelector(`#address`);
  const priceField = adForm.querySelector(`#price`);
  const typeField = adForm.querySelector(`#type`);
  const timeInField = adForm.querySelector(`#timein`);
  const timeOutField = adForm.querySelector(`#timeout`);
  const roomNumberField = adForm.querySelector(`#room_number`);
  const capacityField = adForm.querySelector(`#capacity`);

  adForm.action = `https://21.javascript.pages.academy/keksobooking`;
  for (let fileField of fileFields) {
    fileField.accept = `image/png, image/jpeg`;
  }

  address.setAttribute(`readonly`, ``);

  titleField.setAttribute(`required`, ``);
  titleField.setAttribute(`minlength`, `30`);
  titleField.setAttribute(`maxlength`, `100`);

  titleField.addEventListener(`input`, function () {
    const titleFieldValueLength = titleField.value.length;
    if (titleFieldValueLength < titleField.getAttribute(`minlength`)) {
      titleField.setCustomValidity(`Минимальная длина заголовка ${titleField.getAttribute(`minlength`)} симв. Осталось ввести еще ${titleField.getAttribute(`minlength`) - titleFieldValueLength} симв.`);
    } else {
      titleField.setCustomValidity(``);
    }
    titleField.reportValidity();
  });

  priceField.setAttribute(`required`, ``);
  priceField.setAttribute(`max`, `1000000`);

  const setPriceValue = function () {
    let value;
    if (typeField.value === `bungalow`) {
      value = 0;
    } else if (typeField.value === `flat`) {
      value = 1000;
    } else if (typeField.value === `house`) {
      value = 5000;
    } else {
      value = 10000;
    }
    priceField.min = value;
    priceField.placeholder = value;
  };

  const setPriceValidation = function () {
    let message = ``;
    if (priceField.validity.valueMissing) {
      message = `Укажите цену`;
    } else if (priceField.validity.rangeOverflow) {
      message = `Максимальная цена за ночь ${priceField.getAttribute(`max`)} руб.`;
    } else if (priceField.validity.rangeUnderflow) {
      message = `Минимальная цена за ночь ${priceField.getAttribute(`min`)} руб.`;
    } else {
      message = ``;
    }
    priceField.setCustomValidity(message);
    priceField.reportValidity();
  };

  setPriceValue();

  typeField.addEventListener(`change`, function () {
    setPriceValue();
    setPriceValidation();
  });

  priceField.addEventListener(`input`, function () {
    setPriceValidation();
  });

  timeInField.addEventListener(`change`, function () {
    timeOutField.value = timeInField.value;
  });

  timeOutField.addEventListener(`change`, function () {
    timeInField.value = timeOutField.value;
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

  roomNumberField.addEventListener(`change`, function () {
    roomNumberField.setCustomValidity(``);
    capacityField.setCustomValidity(``);
    const errorMessage = getErrorMessage(roomNumberField, capacityField);
    roomNumberField.setCustomValidity(errorMessage);
    roomNumberField.reportValidity();
  });

  capacityField.setCustomValidity(getErrorMessage(roomNumberField, capacityField));

  capacityField.addEventListener(`change`, function () {
    roomNumberField.setCustomValidity(``);
    capacityField.setCustomValidity(``);
    const errorMessage = getErrorMessage(roomNumberField, capacityField);
    capacityField.setCustomValidity(errorMessage);
    capacityField.reportValidity();
  });

  const resetButton = adForm.querySelector(`.ad-form__reset`);
  const reset = function (switchOff) {
    resetButton.addEventListener(`click`, function (evt) {
      evt.preventDefault();
      adForm.reset();
      const pins = document.querySelectorAll(`.map__pin:not(.map__pin--main)`);
      for (let pin of pins) {
        pin.remove();
      }
      window.card.close();
      switchOff();
    });
  };

  const enable = function () {
    adForm.classList.remove(`ad-form--disabled`);
    window.main.setChildrenDisabled(adForm, false);
    // address.value = `${window.pin.mainPosition.left}, ${window.pin.mainPosition.top}`;
  };

  const disable = function () {
    adForm.classList.add(`ad-form--disabled`);
    window.main.setChildrenDisabled(adForm, true);
    address.value = `${window.pin.mainCenterPosition.left}, ${window.pin.mainCenterPosition.top}`;
  };


  window.form = {
    enable,
    disable,
    reset
  };
})();
