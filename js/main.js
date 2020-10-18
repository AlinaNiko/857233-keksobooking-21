"use strict";

const map = document.querySelector(`.map`);

const OFFER_NUMBER = 8;
const OFFER_TITLES = [
  `Большая уютная квартира`,
  `Маленькая неуютная квартира`,
  `Огромный прекрасный дворец`,
  `Маленький ужасный дворец`,
  `Красивый гостевой домик`,
  `Некрасивый негостеприимный домик`,
  `Уютное бунгало далеко от моря`,
  `Неутюное бунгало по колено в воде`
];

const OFFER_PRICE = {
  min: 100,
  max: 100000
};

const OFFER_ROOMS = {
  min: 1,
  max: 100
};

const OFFER_GUESTS = {
  min: 0,
  max: 100
};

const OFFER_TYPES = [
  `palace`,
  `flat`,
  `house`,
  `bungalow`
];

const OFFER_TIME = [
  `12:00`,
  `13:00`,
  `14:00`
];

const OFFER_FEATURES = [
  `wifi`,
  `dishwasher`,
  `parking`,
  `washer`,
  `elevator`,
  `conditioner`
];

const OFFER_DESCRIPTIONS = [
  `Соответствует насущным потребностям!`,
  `Социально-ориентированный национальный проект`,
  `Яркий пример современных тенденций`,
  `Странный замок, длинный, длинный непомерно`,
  `Дом старый и незатейливый, хозяйство несложное`,
  `Крошечная клетушка, шагов в шесть длиной`,
  `Квартира сухая, теплая; в доме смирно: обокрали всего один раз!`,
  `Пыль везде – ну, мерзость!`
];

const OFFER_PHOTOS = [
  `http://o0.github.io/assets/images/tokyo/hotel1.jpg`,
  `http://o0.github.io/assets/images/tokyo/hotel2.jpg`,
  `http://o0.github.io/assets/images/tokyo/hotel3.jpg`
];

const OFFER_LOCATION = {
  x: {
    min: 0,
    max: map.clientWidth
  },

  y: {
    min: 130,
    max: 630
  }
};

const getRandomInteger = function (min, max) {
  const randomNumber = min + Math.random() * (max + 1 - min);
  return Math.floor(randomNumber);
};

const getRandomArrayItem = function (array) {
  const randomItem = array[getRandomInteger(0, array.length - 1)];
  return randomItem;
};

const removeRandomElement = function (array) {
  const index = getRandomInteger(0, array.length - 1);
  const removed = array.splice(index, 1);
  return removed[0];
};

const createRandomArray = function (array, length) {
  const arrayCopy = [...array];
  const result = [];
  for (let i = 0; i < length; i++) {
    const randomElement = removeRandomElement(arrayCopy);
    result.push(randomElement);
  }
  return result;
};


const generateOffers = function (quantity) {
  const offers = [];

  for (let i = 1; i <= quantity; i++) {
    const indexString = i.toString().padStart(2, `0`);
    const randomTime = getRandomArrayItem(OFFER_TIME);
    const randomFeaturesLength = getRandomInteger(0, OFFER_FEATURES.length - 1);
    const randomPhotosLength = getRandomInteger(0, OFFER_PHOTOS.length - 1);
    const randomLocationX = getRandomInteger(OFFER_LOCATION.x.min, OFFER_LOCATION.x.max);
    const randomLocationY = getRandomInteger(OFFER_LOCATION.y.min, OFFER_LOCATION.y.max);

    const object = {
      author: {
        avatar: `img/avatars/user${indexString}.png`
      },

      offer: {
        title: getRandomArrayItem(OFFER_TITLES),
        address: `${randomLocationX}` + `, ` + `${randomLocationY}`,
        price: getRandomInteger(OFFER_PRICE.min, OFFER_PRICE.max),
        type: getRandomArrayItem(OFFER_TYPES),
        rooms: getRandomInteger(OFFER_ROOMS.min, OFFER_ROOMS.max),
        guests: getRandomInteger(OFFER_GUESTS.min, OFFER_GUESTS.max),
        checkin: randomTime,
        checkout: randomTime,
        features: createRandomArray(OFFER_FEATURES, randomFeaturesLength),
        description: getRandomArrayItem(OFFER_DESCRIPTIONS),
        photos: createRandomArray(OFFER_PHOTOS, randomPhotosLength)
      },

      location: {
        x: randomLocationX,
        y: randomLocationY
      }
    };

    offers.push(object);
  }

  return offers;
};


const pinTemplate = document.querySelector(`#pin`).content;
const pinButton = pinTemplate.querySelector(`.map__pin`);
const pinContainer = document.querySelector(`.map__pins`);

const createPinButton = function (object) {
  const pin = pinButton.cloneNode(true);
  const pinImage = pin.querySelector(`img`);
  pin.style.left = `${object.location.x}px`;
  pin.style.top = `${object.location.y}px`;
  pin.style.transform = `translate(-50%, -100%)`;
  pinImage.src = object.author.avatar;
  pinImage.alt = object.offer.title;

  return pin;
};

const renderPinButton = function (array) {
  const fragment = document.createDocumentFragment();

  for (let i = 0; i < array.length; i++) {
    const arrayItem = array[i];
    const readyPin = createPinButton(arrayItem);
    fragment.appendChild(readyPin);
  }

  pinContainer.appendChild(fragment);
};

const offers = generateOffers(OFFER_NUMBER);


// const pinCardTemplate = document.querySelector(`#card`).content;
// const pinCard = pinCardTemplate.querySelector(`.map__card`);
// const pinCardNeighbor = map.querySelector(`.map__filters-container`);

// const offerType = function (objectType) {
//   if (objectType === `palace`) {
//     return `Дворец`;
//   } else if (objectType === `flat`) {
//     return `Квартира`;
//   } else if (objectType === `house`) {
//     return `Дом`;
//   } else {
//     return `Бунгало`;
//   }
// };

// const getPluralRoomNoun = function (number) {
//   const remainderOfTen = number % 10;
//   const remainderOfHundred = number % 100;
//   if (remainderOfTen === 1 && remainderOfHundred !== 11) {
//     return `${number} комната`;
//   } else if (remainderOfTen >= 2 && remainderOfTen <= 4 && (remainderOfHundred < 10 || remainderOfHundred >= 20)) {
//     return `${number} комнаты`;
//   } else {
//     return `${number} комнат`;
//   }
// };

// const getPluralGuestNoun = function (number) {
//   const remainderOfTen = number % 10;
//   const remainderOfHundred = number % 100;
//   if (remainderOfTen === 1 && remainderOfHundred !== 11) {
//     return `${number} гостя`;
//   } else {
//     return `${number} гостей`;
//   }
// };

// const createPinCard = function (object) {
//   const card = pinCard.cloneNode(true);
//   const cardFeatures = card.querySelector(`.popup__features`);
//   const cardPhotos = card.querySelector(`.popup__photos`);
//   card.querySelector(`.popup__title`).textContent = object.offer.title;
//   card.querySelector(`.popup__text--address`).textContent = object.offer.address;
//   card.querySelector(`.popup__text--price`).textContent = `${object.offer.price}₽/ночь`;
//   card.querySelector(`.popup__type`).textContent = offerType(object.offer.type);
//   card.querySelector(`.popup__text--capacity`).textContent = `${getPluralRoomNoun(object.offer.rooms)} для ${getPluralGuestNoun(object.offer.guests)}`;
//   card.querySelector(`.popup__text--time`).textContent = `Заезд после ${object.offer.checkin}, выезд до ${object.offer.checkout}`;

//   if (object.offer.features.length > 0) {
//     let newFeatureItems = ``;
//     for (let i = 0; i < object.offer.features.length; i++) {
//       const feature = object.offer.features[i];
//       newFeatureItems += `<li class="popup__feature popup__feature--${feature}"></li>`;
//     }
//     cardFeatures.innerHTML = newFeatureItems;
//   } else {
//     cardFeatures.classList.add(`hidden`);
//   }

//   card.querySelector(`.popup__description`).textContent = object.offer.description;

//   if (object.offer.photos.length > 0) {
//     let newPhotoItems = ``;
//     for (let i = 0; i < object.offer.photos.length; i++) {
//       const photoSrc = object.offer.photos[i];
//       newPhotoItems += `<img src="${photoSrc}" class="popup__photo" width="45" height="40" alt="Фотография жилья">`;
//     }
//     cardPhotos.innerHTML = newPhotoItems;
//   } else {
//     card.querySelector(`.popup__photos`).classList.add(`hidden`);
//   }

//   card.querySelector(`.popup__avatar`).src = object.author.avatar;

//   return card;
// };

// const renderPinCard = function (object) {
//   const readyPinCard = createPinCard(object);
//   map.insertBefore(readyPinCard, pinCardNeighbor);
// };

// renderPinCard(offers[0]);


const adForm = document.querySelector(`.ad-form`);
const adFormChildren = adForm.children;
const mapFilters = map.querySelector(`.map__filters`);
const mapFiltersChildren = mapFilters.children;
const mainPin = map.querySelector(`.map__pin--main`);
const adFormAddress = adForm.querySelector(`#address`);

adForm.setAttribute(`action`, `https://21.javascript.pages.academy/keksobooking`);

const getPosition = function (element, relativeParent) {
  const coordinates = element.getBoundingClientRect();
  const relativeCoordinates = relativeParent.getBoundingClientRect();
  const top = coordinates.top - relativeCoordinates.top;
  const left = coordinates.left - relativeCoordinates.left;
  const position = {
    top,
    left
  };

  return position;
};

const mainPinCenterPosition = {
  top: Math.round(getPosition(mainPin, map).top + mainPin.clientHeight / 2),
  left: Math.round(getPosition(mainPin, map).left + mainPin.clientWidth / 2)
};

const mainPinPosition = {
  top: Math.round(getPosition(mainPin, map).top + mainPin.clientHeight),
  left: Math.round(getPosition(mainPin, map).left + mainPin.clientWidth / 2)
};

const switchOffActive = function () {
  map.classList.add(`map--faded`);
  adForm.classList.add(`ad-form--disabled`);
  for (let child of adFormChildren) {
    child.setAttribute(`disabled`, ``);
  }
  for (let child of mapFiltersChildren) {
    child.setAttribute(`disabled`, ``);
  }

  adFormAddress.value = `${mainPinCenterPosition.left}, ${mainPinCenterPosition.top}`;
};

const switchOnActive = function () {
  map.classList.remove(`map--faded`);
  adForm.classList.remove(`ad-form--disabled`);
  for (let child of adFormChildren) {
    child.removeAttribute(`disabled`);
  }
  for (let child of mapFiltersChildren) {
    child.removeAttribute(`disabled`);
  }

  adFormAddress.value = `${mainPinPosition.left}, ${mainPinPosition.top}`;
};

window.addEventListener(`load`, function () {
  switchOffActive();
});

mainPin.addEventListener(`mousedown`, function (evt) {
  if (evt.button === 0) {
    switchOnActive();
    renderPinButton(offers);
  }
});

mainPin.addEventListener(`keydown`, function (evt) {
  if (evt.key === `Enter`) {
    switchOnActive();
    renderPinButton(offers);
  }
});


const fileFields = adForm.querySelectorAll(`[type="file"]`);
const titleField = adForm.querySelector(`#title`);
const priceField = adForm.querySelector(`#price`);
const typeField = adForm.querySelector(`#type`);
const timeInField = adForm.querySelector(`#timein`);
const timeOutField = adForm.querySelector(`#timeout`);
const roomNumberField = adForm.querySelector(`#room_number`);
const capacityField = adForm.querySelector(`#capacity`);

for (let fileField of fileFields) {
  fileField.setAttribute(`accept`, `image/png, image/jpeg`);
}

adFormAddress.setAttribute(`readonly`, ``);

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
  if (typeField.value === `bungalow`) {
    priceField.setAttribute(`min`, `0`);
    priceField.setAttribute(`placeholder`, `0`);
  } else if (typeField.value === `flat`) {
    priceField.setAttribute(`min`, `1000`);
    priceField.setAttribute(`placeholder`, `1000`);
  } else if (typeField.value === `house`) {
    priceField.setAttribute(`min`, `5000`);
    priceField.setAttribute(`placeholder`, `5000`);
  } else {
    priceField.setAttribute(`min`, `10000`);
    priceField.setAttribute(`placeholder`, `10000`);
  }
};

const setPriceValidation = function () {
  if (priceField.validity.valueMissing) {
    priceField.setCustomValidity(`Укажите цену`);
  } else if (priceField.validity.rangeOverflow) {
    priceField.setCustomValidity(`Максимальная цена за ночь ${priceField.getAttribute(`max`)} руб.`);
  } else if (typeField.value === `bungalow` && priceField.validity.rangeUnderflow) {
    priceField.setCustomValidity(`Минимальная цена за Бунгало ${priceField.getAttribute(`min`)} руб.`);
  } else if (typeField.value === `flat` && priceField.validity.rangeUnderflow) {
    priceField.setCustomValidity(`Минимальная цена за Квартиру ${priceField.getAttribute(`min`)} руб.`);
  } else if (typeField.value === `house` && priceField.validity.rangeUnderflow) {
    priceField.setCustomValidity(`Минимальная цена за Дом ${priceField.getAttribute(`min`)} руб.`);
  } else if (typeField.value === `palace` && priceField.validity.rangeUnderflow) {
    priceField.setCustomValidity(`Минимальная цена за Дворец ${priceField.getAttribute(`min`)} руб.`);
  } else {
    priceField.setCustomValidity(``);
  }
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


const setTimeInAndTimeOut = function (select, anotherSelect) {
  if (Number(select.value) !== Number(anotherSelect.value)) {
    anotherSelect.value = select.value;
  }
};

timeInField.addEventListener(`change`, function () {
  setTimeInAndTimeOut(timeInField, timeOutField);
});

timeOutField.addEventListener(`change`, function () {
  setTimeInAndTimeOut(timeOutField, timeInField);
});


if (capacityField.value !== roomNumberField.value) {
  const options = capacityField.options;
  for (let option of options) {
    option.removeAttribute(`selected`);
    if (option.value === roomNumberField.value) {
      option.setAttribute(`selected`, ``);
    }
  }
}

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

capacityField.addEventListener(`change`, function () {
  roomNumberField.setCustomValidity(``);
  capacityField.setCustomValidity(``);
  const errorMessage = getErrorMessage(roomNumberField, capacityField);
  capacityField.setCustomValidity(errorMessage);
  capacityField.reportValidity();
});

const resetButton = adForm.querySelector(`.ad-form__reset`);
resetButton.addEventListener(`click`, function (evt) {
  evt.preventDefault();
  adForm.reset();
  const mapPins = map.querySelectorAll(`.map__pin`);
  for (let pin of mapPins) {
    if (!pin.classList.contains(`map__pin--main`)) {
      pin.remove();
    }
  }
  switchOffActive();
});
