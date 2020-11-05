"use strict";

(function () {
  const map = document.querySelector(`.map`);
  const template = document.querySelector(`#card`).content.querySelector(`.map__card`);
  const filtersContainer = map.querySelector(`.map__filters-container`);

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

  const create = function (object) {
    const card = template.cloneNode(true);
    const features = card.querySelector(`.popup__features`);
    const photos = card.querySelector(`.popup__photos`);
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
      features.innerHTML = newFeatureItems;
    } else {
      features.classList.add(`hidden`);
    }

    card.querySelector(`.popup__description`).textContent = object.offer.description;

    if (object.offer.photos.length > 0) {
      let newPhotoItems = ``;
      for (let i = 0; i < object.offer.photos.length; i++) {
        const photoSrc = object.offer.photos[i];
        newPhotoItems += `<img src="${photoSrc}" class="popup__photo" width="45" height="40" alt="Фотография жилья">`;
      }
      photos.innerHTML = newPhotoItems;
    } else {
      card.querySelector(`.popup__photos`).classList.add(`hidden`);
    }

    card.querySelector(`.popup__avatar`).src = object.author.avatar;

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
