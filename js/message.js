"use strict";

const mainBlock = document.querySelector(`main`);
let message;

const show = (template) => {
  message = template.cloneNode(true);
  mainBlock.insertAdjacentElement(`afterbegin`, message);
  document.addEventListener(`keydown`, onDocumentKeyDown);
  document.addEventListener(`click`, onDocumentClick);
};


const hide = () => {
  message.remove();
  document.removeEventListener(`keydown`, onDocumentKeyDown);
  document.removeEventListener(`click`, onDocumentClick);
};


const onDocumentKeyDown = (evt) => {
  evt.preventDefault();
  if (evt.key === `Escape`) {
    hide();
  }
};


const onDocumentClick = (evt) => {
  evt.preventDefault();
  hide();
};


const successTemplate = document.querySelector(`#success`).content.querySelector(`.success`);
const errorTemplate = document.querySelector(`#error`).content.querySelector(`.error`);

const showSuccess = () => {
  show(successTemplate);
};


const showError = (error) => {
  window.card.hide();
  show(errorTemplate);

  const errorButton = document.querySelector(`.error__button`);
  const errorMessage = document.querySelector(`.error__message`);

  errorButton.addEventListener(`click`, (evt) => {
    evt.preventDefault();
    hide();
  });

  errorMessage.textContent = error;
};


window.message = {
  showSuccess,
  showError
};
