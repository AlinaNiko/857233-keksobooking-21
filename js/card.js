"use strict";

(function () {
  const map = document.querySelector(`.map`);
  const template = document.querySelector(`#card`).content.querySelector(`.map__card`);
  const filtersContainer = map.querySelector(`.map__filters-container`);
  const offerType = {
    palace: `Дворец`,
    flat: `Квартира`,
    house: `Дом`,
    bungalow: `Бунгало`
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
    const features = featuresBlock.querySelectorAll(`.popup__feature`);
    if (Array.isArray(object.offer.features) && object.offer.features.length > 0) {
      for (let feature of features) {
        feature.remove();
      }
      const fragment = document.createDocumentFragment();
      for (let i = 0; i < object.offer.features.length; i++) {
        const newFeatureItem = document.createElement(`li`);
        const feature = object.offer.features[i];
        newFeatureItem.classList.add(`popup__feature`, `popup__feature--${feature}`);
        fragment.appendChild(newFeatureItem);
      }
      featuresBlock.appendChild(fragment);
    } else {
      hideBlock(featuresBlock);
    }

    setTextContentOrHide(card.querySelector(`.popup__description`), object.offer.description);

    const photosBlock = card.querySelector(`.popup__photos`);
    const photo = photosBlock.querySelector(`.popup__photo`);
    if (Array.isArray(object.offer.photos) && object.offer.photos.length > 0) {
      photo.remove();
      const fragment = document.createDocumentFragment();
      for (let i = 0; i < object.offer.photos.length; i++) {
        const photoTemplate = photo.cloneNode(true);
        const photoSrc = object.offer.photos[i];
        photoTemplate.src = photoSrc;
        fragment.appendChild(photoTemplate);
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
      close();
    });

    return card;
  };

  const open = function (object) {
    map.insertBefore(create(object), filtersContainer);
    document.addEventListener(`keydown`, onDocumentKeydown);
  };

  const close = function () {
    const card = map.querySelector(`.map__card`);
    if (card) {
      card.remove();
      document.removeEventListener(`keydown`, onDocumentKeydown);
      window.map.unactivatePin();
    }
  };

  const onDocumentKeydown = function (evt) {
    if (evt.key === `Escape`) {
      close();
    }
  };

  window.card = {
    open,
    close
  };
})();
