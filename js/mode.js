"use strict";

(function () {
  const switchOffActive = function () {
    window.card.close();
    window.mainPin.setCenter();
    window.form.disable();
    window.map.disable();
  };

  const switchOnActive = function () {
    window.form.enable();
    window.map.enable();
    const pins = document.querySelectorAll(`.map__pin:not(.map__pin--main)`);
    if (pins.length === 0) {
      window.load(onSuccess, onError);
    }
  };

  window.addEventListener(`load`, function () {
    switchOffActive();
  });


  // начало фрагмента из модуля map
  const map = document.querySelector(`.map`);
  const pinContainer = map.querySelector(`.map__pins`);

  pinContainer.addEventListener(`click`, function (evt) {
    const eventTarget = evt.target.closest(`.map__pin:not(.map__pin--main)`);
    if (!eventTarget) {
      return;
    }
    window.card.close();
    const eventTargetIndex = eventTarget.dataset.index;
    window.card.open(loadedOffers[eventTargetIndex]);// как использовать вернувшийся с сервера массив для открытия нужной карточки, если он используется в модуле map?
  });
  // конец фрагмента из модуля map


  let loadedOffers = [];
  const onSuccess = function (response) {
    loadedOffers = response;
    window.map.showPins(loadedOffers);
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

  window.mode = {
    switchOnActive,
    switchOffActive,
    onSuccess,
    onError
  };
})();
