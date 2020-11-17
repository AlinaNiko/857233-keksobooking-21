"use strict";

let isActive = false;
const switchOffActive = function () {
  window.card.hide();
  window.mainPin.setCenterPosition();
  window.form.disable();
  window.map.disable();
  window.filter.disable();
  isActive = false;
};
const switchOnActive = function () {
  if (!isActive) {
    window.form.enable();
    window.map.enable();
    window.server.load(onSuccess, onError);
    isActive = true;
  }
};
window.addEventListener(`load`, function () {
  switchOffActive();
});
let loadedOffers = [];
const onSuccess = function (response) {
  loadedOffers = response;
  window.map.showPins(loadedOffers);
  window.filter.enable();
};
const onError = function (error) {
  const nodeError = document.createElement(`div`);
  nodeError.style.position = `fixed`;
  nodeError.style.top = 0;
  nodeError.style.left = 0;
  nodeError.style.width = `100%`;
  nodeError.style.padding = `15px`;
  nodeError.style.fontWeight = 700;
  nodeError.style.fontSize = `18px`;
  nodeError.style.textAlign = `center`;
  nodeError.style.color = `#ffffff`;
  nodeError.style.backgroundColor = `#ff5635`;
  nodeError.style.boxShadow = `0 0 20px 0 #ff6547`;
  nodeError.style.zIndex = 2;
  nodeError.textContent = error;
  document.body.insertAdjacentElement(`afterbegin`, nodeError);
};
const getLoadedOffers = function () {
  return loadedOffers;
};
window.mode = {
  switchOnActive,
  switchOffActive,
  onSuccess,
  onError,
  getLoadedOffers
};
