"use strict";

(function () {
  const map = document.querySelector(`.map`);

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

  window.main = {
    map,
    getRandomInteger,
    getRandomArrayItem,
    createRandomArray,
    getPosition
  };

})();
