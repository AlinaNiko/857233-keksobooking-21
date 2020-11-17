"use strict";

const offerType = {
  palace: `Дворец`,
  flat: `Квартира`,
  house: `Дом`,
  bungalow: `Бунгало`
};

const map = document.querySelector(`.map`);
const template = document.querySelector(`#card`).content.querySelector(`.map__card`);
const photoTemplate = template.querySelector(`.popup__photo`);
const featureTemplate = template.querySelector(`.popup__feature`);
const filtersContainer = map.querySelector(`.map__filters-container`);

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


const hideBlock = function (element) {
  element.classList.add(`hidden`);
};


const setTextContentOrHide = function (element, value) {
  element.textContent = value;

  if (!value) {
    hideBlock(element);
  }
};


const create = function (object) {
  const card = template.cloneNode(true);

  setTextContentOrHide(card.querySelector(`.popup__title`), object.offer.title);
  setTextContentOrHide(card.querySelector(`.popup__text--address`), object.offer.address);

  const priceValue = (object.offer.price) ? `${object.offer.price}₽/ночь` : ``;
  setTextContentOrHide(card.querySelector(`.popup__text--price`), priceValue);

  const typeValue = (object.offer.type) ? offerType[object.offer.type] : ``;
  setTextContentOrHide(card.querySelector(`.popup__type`), typeValue);

  const capacityValue = (object.offer.rooms && object.offer.guests) ? `${getPluralRoomNoun(object.offer.rooms)} для ${getPluralGuestNoun(object.offer.guests)}` : ``;
  setTextContentOrHide(card.querySelector(`.popup__text--capacity`), capacityValue);

  const timeValue = (object.offer.checkin && object.offer.checkout) ? `Заезд после ${object.offer.checkin}, выезд до ${object.offer.checkout}` : ``;
  setTextContentOrHide(card.querySelector(`.popup__text--time`), timeValue);

  const featuresBlock = card.querySelector(`.popup__features`);
  if (Array.isArray(object.offer.features) && object.offer.features.length > 0) {
    featuresBlock.innerHTML = ``;
    const fragment = document.createDocumentFragment();

    for (const offerFeature of object.offer.features) {
      const feature = featureTemplate.cloneNode(true);
      feature.className = `popup__feature popup__feature--${offerFeature}`;
      fragment.appendChild(feature);
    }

    featuresBlock.appendChild(fragment);
  } else {
    hideBlock(featuresBlock);
  }

  setTextContentOrHide(card.querySelector(`.popup__description`), object.offer.description);

  const photosBlock = card.querySelector(`.popup__photos`);
  if (Array.isArray(object.offer.photos) && object.offer.photos.length > 0) {
    photosBlock.innerHTML = ``;
    const fragment = document.createDocumentFragment();

    for (const offerPhoto of object.offer.photos) {
      const photo = photoTemplate.cloneNode(true);
      photo.src = offerPhoto;
      fragment.appendChild(photo);
    }

    photosBlock.appendChild(fragment);
  } else {
    hideBlock(photosBlock);
  }

  const avatar = card.querySelector(`.popup__avatar`);
  avatar.src = object.author.avatar;
  if (!object.author.avatar) {
    hideBlock(avatar);
  }

  const closeButton = card.querySelector(`.popup__close`);
  closeButton.addEventListener(`click`, function () {
    hide();
  });

  return card;
};


const show = function (object) {
  map.insertBefore(create(object), filtersContainer);
  document.addEventListener(`keydown`, onDocumentKeydown);
};


const hide = function () {
  const card = map.querySelector(`.map__card`);

  if (card) {
    card.remove();
    document.removeEventListener(`keydown`, onDocumentKeydown);
    window.map.unactivatePin();
  }
};


const onDocumentKeydown = function (evt) {
  if (evt.key === `Escape`) {
    hide();
  }
};


window.card = {
  show,
  hide
};
