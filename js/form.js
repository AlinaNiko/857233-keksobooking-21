"use strict";

const Price = {
  MIN_FOR_BUNGALOW: 0,
  MIN_FOR_FLAT: 1000,
  MIN_FOR_HOUSE: 5000,
  MIN_FOR_PALACE: 10000
};

const adForm = document.querySelector(`.ad-form`);
const title = adForm.querySelector(`#title`);
const address = adForm.querySelector(`#address`);
const price = adForm.querySelector(`#price`);
const type = adForm.querySelector(`#type`);
const timeIn = adForm.querySelector(`#timein`);
const timeOut = adForm.querySelector(`#timeout`);
const roomNumber = adForm.querySelector(`#room_number`);
const capacity = adForm.querySelector(`#capacity`);

title.addEventListener(`input`, function () {
  const titleValueLength = title.value.length;

  if (titleValueLength < title.getAttribute(`minlength`)) {
    title.setCustomValidity(`Минимальная длина заголовка ${title.getAttribute(`minlength`)} симв. Осталось ввести еще ${title.getAttribute(`minlength`) - titleValueLength} симв.`);
  } else {
    title.setCustomValidity(``);
  }
  title.reportValidity();
});


const setPriceValue = function () {
  let value;

  if (type.value === `bungalow`) {
    value = Price.MIN_FOR_BUNGALOW;
  } else if (type.value === `flat`) {
    value = Price.MIN_FOR_FLAT;
  } else if (type.value === `house`) {
    value = Price.MIN_FOR_HOUSE;
  } else {
    value = Price.MIN_FOR_PALACE;
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
  window.images.reset();
  window.message.showSuccess();
  capacity.setCustomValidity(getErrorMessage(roomNumber, capacity));
};


const onError = function (error) {
  window.message.showError(error);
};


window.form = {
  enable,
  disable,
  setAddress
};
