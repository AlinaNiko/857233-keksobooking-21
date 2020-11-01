"use strict";

(function () {
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
      max: document.querySelector(`.map`).clientWidth
    },

    y: {
      min: 130,
      max: 630
    }
  };

  const generateOffers = function (quantity) {
    const offers = [];

    for (let i = 1; i <= quantity; i++) {
      const indexString = i.toString().padStart(2, `0`);
      const randomTime = window.main.getRandomArrayItem(OFFER_TIME);
      const randomFeaturesLength = window.main.getRandomInteger(0, OFFER_FEATURES.length - 1);
      const randomPhotosLength = window.main.getRandomInteger(0, OFFER_PHOTOS.length - 1);
      const randomLocationX = window.main.getRandomInteger(OFFER_LOCATION.x.min, OFFER_LOCATION.x.max);
      const randomLocationY = window.main.getRandomInteger(OFFER_LOCATION.y.min, OFFER_LOCATION.y.max);

      const object = {
        author: {
          avatar: `img/avatars/user${indexString}.png`
        },

        offer: {
          title: window.main.getRandomArrayItem(OFFER_TITLES),
          address: `${randomLocationX}` + `, ` + `${randomLocationY}`,
          price: window.main.getRandomInteger(OFFER_PRICE.min, OFFER_PRICE.max),
          type: window.main.getRandomArrayItem(OFFER_TYPES),
          rooms: window.main.getRandomInteger(OFFER_ROOMS.min, OFFER_ROOMS.max),
          guests: window.main.getRandomInteger(OFFER_GUESTS.min, OFFER_GUESTS.max),
          checkin: randomTime,
          checkout: randomTime,
          features: window.main.createRandomArray(OFFER_FEATURES, randomFeaturesLength),
          description: window.main.getRandomArrayItem(OFFER_DESCRIPTIONS),
          photos: window.main.createRandomArray(OFFER_PHOTOS, randomPhotosLength)
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

  const offers = generateOffers(OFFER_NUMBER);

  window.data = {
    offers
  };
})();
