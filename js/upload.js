"use strict";

(function () {
  const URL = `https://21.javascript.pages.academy/keksobooking`;

  window.upload = function (data, onSuccess, onError) {
    const xhr = new XMLHttpRequest();
    xhr.responseType = `json`;

    xhr.addEventListener(`load`, function () {
      if (xhr.status === 200) {
        onSuccess(xhr.response);
      } else {
        onError();
      }
    });

    xhr.open(`POST`, URL);
    xhr.send(data);
  };
})();
