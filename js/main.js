"use strict";

(function () {
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

  const getPosition = function (element) {
    const position = {
      top: element.offsetTop,
      left: element.offsetLeft
    };

    return position;
  };

  const setChildrenDisabled = function (element, boolean) {
    const children = element.children;
    for (let child of children) {
      child.disabled = boolean;
    }
  };

  window.main = {
    getRandomInteger,
    getRandomArrayItem,
    createRandomArray,
    getPosition,
    setChildrenDisabled
  };
})();
