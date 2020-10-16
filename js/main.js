"use strict";

const offerMap = document.querySelector(`.map`);

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
    max: offerMap.clientWidth
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


offerMap.classList.remove(`map--faded`);
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
renderPinButton(offers);


const pinCardTemplate = document.querySelector(`#card`).content;
const pinCard = pinCardTemplate.querySelector(`.map__card`);
const map = document.querySelector(`.map`);
const pinCardNeighbor = map.querySelector(`.map__filters-container`);

const offerType = function (objectType) {
  if (objectType === `palace`) {
    return `Дворец`;
  } else if (objectType === `flat`) {
    return `Квартира`;
  } else if (objectType === `house`) {
    return `Дом`;
  } else {
    return `Бунгало`;
  }
};


const getPluralRoomNoun = function (number) {
  const remainderOfTen = number % 10;
  const remainderOfHundred = number % 100;
  if (remainderOfTen === 1 && remainderOfHundred !== 11) {
    return `${number} комната`;
  } else if (remainderOfTen >= 2 && remainderOfTen <= 4 && (remainderOfHundred < 10 || remainderOfHundred >= 20)) {
    return `${number} комнаты`;
  } else {
    return `${number} комнат`;
  }
};

const getPluralGuestNoun = function (number) {
  const remainderOfTen = number % 10;
  const remainderOfHundred = number % 100;
  if (remainderOfTen === 1 && remainderOfHundred !== 11) {
    return `${number} гостя`;
  } else {
    return `${number} гостей`;
  }
};

const createPinCard = function (object) {
  const card = pinCard.cloneNode(true);
  const cardFeatures = card.querySelector(`.popup__features`);
  const cardPhotos = card.querySelector(`.popup__photos`);
  card.querySelector(`.popup__title`).textContent = object.offer.title;
  card.querySelector(`.popup__text--address`).textContent = object.offer.address;
  card.querySelector(`.popup__text--price`).textContent = `${object.offer.price}₽/ночь`;
  card.querySelector(`.popup__type`).textContent = offerType(object.offer.type);
  card.querySelector(`.popup__text--capacity`).textContent = `${getPluralRoomNoun(object.offer.rooms)} для ${getPluralGuestNoun(object.offer.guests)}`;
  card.querySelector(`.popup__text--time`).textContent = `Заезд после ${object.offer.checkin}, выезд до ${object.offer.checkout}`;

  if (object.offer.features.length > 0) {
    let newFeatureItems = ``;
    for (let i = 0; i < object.offer.features.length; i++) {
      const feature = object.offer.features[i];
      newFeatureItems += `<li class="popup__feature popup__feature--${feature}"></li>`;
    }
    cardFeatures.innerHTML = newFeatureItems;
  } else {
    cardFeatures.classList.add(`hidden`);
  }

  card.querySelector(`.popup__description`).textContent = object.offer.description;

  if (object.offer.photos.length > 0) {
    let newPhotoItems = ``;
    for (let i = 0; i < object.offer.photos.length; i++) {
      const photoSrc = object.offer.photos[i];
      newPhotoItems += `<img src="${photoSrc}" class="popup__photo" width="45" height="40" alt="Фотография жилья">`;
    }
    cardPhotos.innerHTML = newPhotoItems;
  } else {
    card.querySelector(`.popup__photos`).classList.add(`hidden`);
  }

  card.querySelector(`.popup__avatar`).src = object.author.avatar;

  return card;
};

const renderPinCard = function (object) {
  const readyPinCard = createPinCard(object);
  map.insertBefore(readyPinCard, pinCardNeighbor);
};

renderPinCard(offers[0]);
