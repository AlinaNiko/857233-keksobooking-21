"use strict";

(function () {
  const form = document.querySelector(`.map__filters`);
  const type = form.querySelector(`#housing-type`);
  const price = form.querySelector(`#housing-price`);
  const rooms = form.querySelector(`#housing-rooms`);
  const guests = form.querySelector(`#housing-guests`);
  const featuresField = form.querySelector(`#housing-features`);

  const checkType = function (item) {
    return (type.value === `any`) ? true : item.offer.type === type.value;
  };

  const getPriceName = function (item) {
    if (item.offer.price >= 10000 && item.offer.price <= 50000) {
      return `middle`;
    } else if (item.offer.price < 10000) {
      return `low`;
    } else if (item.offer.price > 50000) {
      return `high`;
    } else {
      return `any`;
    }
  };

  const checkPrice = function (item) {
    return (price.value === `any`) ? true : getPriceName(item) === price.value;
  };

  const checkRooms = function (item) {
    return (rooms.value === `any`) ? true : String(item.offer.rooms) === rooms.value;
  };

  const checkGuests = function (item) {
    return (guests.value === `any`) ? true : String(item.offer.guests) === guests.value;
  };


  const checkFeature = function (item) {
    const features = featuresField.querySelectorAll(`input:checked`);
    if (features.length === 0) {
      return true;
    }
    for (let feature of features) {
      if (!item.offer.features.includes(feature.value)) {
        return false;
      }
    }
    return true;
  };

  const apply = function (offers) {
    return offers.filter(function (item) {
      return checkType(item) && checkPrice(item) && checkRooms(item) && checkGuests(item) && checkFeature(item);
    });
  };

  const updateOffers = function () {
    const filteredOffers = apply(window.mode.getLoadedOffers());
    window.card.close();
    window.map.hidePins();
    window.map.showPins(filteredOffers);
  };

  form.addEventListener(`change`, function () {
    window.debounce(updateOffers);
  });
})();

