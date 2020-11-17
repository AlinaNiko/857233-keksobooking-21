"use strict";

const FILE_TYPES = [`jpg`, `jpeg`, `png`];

const avatarInput = document.querySelector(`.ad-form__field input[type=file]`);
const avatarPreview = document.querySelector(`.ad-form-header__preview img`);

const photoInput = document.querySelector(`.ad-form__upload input[type=file]`);
const photoPreview = document.querySelector(`.ad-form__photo`);

const makePreview = function (input, func, output) {
  input.addEventListener(`change`, function () {
    const file = input.files[0];
    const fileName = file.name.toLowerCase();

    const matches = FILE_TYPES.some(function (item) {
      return fileName.endsWith(item);
    });

    if (matches) {
      const reader = new FileReader();

      reader.addEventListener(`load`, function () {
        func(output, reader);
      });

      reader.readAsDataURL(file);
    }
  });
};


const setSrc = function (output, reader) {
  output.src = reader.result;
};


const setBackground = function (output, reader) {
  output.style.background = `url(${reader.result}) center / cover no-repeat`;
};


makePreview(avatarInput, setSrc, avatarPreview);
makePreview(photoInput, setBackground, photoPreview);


const reset = function () {
  avatarPreview.src = `img/muffin-grey.svg`;
  photoPreview.style.background = `#e4e4de`;
};


window.images = {
  reset
};
