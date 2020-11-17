"use strict";

(function () {
  const PriceRange = {
    LOWER_LIMIT: 10000,
    UPPER_LIMIT: 50000
  };

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
    if (item.offer.price >= PriceRange.LOWER_LIMIT && item.offer.price <= PriceRange.UPPER_LIMIT) {
      return `middle`;
    } else if (item.offer.price < PriceRange.LOWER_LIMIT) {
      return `low`;
    } else if (item.offer.price > PriceRange.UPPER_LIMIT) {
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

  form.addEventListener(`change`, window.debounce(updateOffers));

  const disable = function () {
    form.reset();
    window.main.setChildrenDisabled(form, true);
  };
  const enable = function () {
    window.main.setChildrenDisabled(form, false);
  };

  window.filter = {
    disable,
    enable
  };
})();

