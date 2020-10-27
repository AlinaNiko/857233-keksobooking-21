"use strict";

(function () {

  const pinCardTemplate = document.querySelector(`#card`).content;
  const pinCard = pinCardTemplate.querySelector(`.map__card`);
  const pinCardNeighbor = window.main.map.querySelector(`.map__filters-container`);

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

    const popupCloseButton = card.querySelector(`.popup__close`);
    popupCloseButton.addEventListener(`click`, function () {
      closePinCard();
    });

    return card;
  };

  const onDocumentKeydown = function (evt) {
    if (evt.key === `Escape`) {
      closePinCard();
    }
  };

  const closePinCard = function () {
    const card = document.querySelector(`.map__card`);
    if (card) {
      card.remove();
      document.removeEventListener(`keydown`, onDocumentKeydown);
    }
  };

  window.card = {
    pinCardNeighbor,
    onDocumentKeydown,
    createPinCard,
    closePinCard
  };
})();
