"use strict";

(function () {
  const mainBlock = document.querySelector(`main`);

  let message;

  const show = function (template) {
    message = template.cloneNode(true);
    mainBlock.insertAdjacentElement(`afterbegin`, message);
    document.addEventListener(`keydown`, onDocumentKeyDown);
    document.addEventListener(`click`, onDocumentClick);
  };

  const hide = function () {
    message.remove();
    document.removeEventListener(`keydown`, onDocumentKeyDown);
    document.removeEventListener(`click`, onDocumentClick);
  };

  const onDocumentKeyDown = function (evt) {
    evt.preventDefault();
    if (evt.key === `Escape`) {
      hide();
    }
  };

  const onDocumentClick = function (evt) {
    evt.preventDefault();
    hide();
  };

  window.message = {
    show,
    hide
  };
})();
