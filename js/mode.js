"use strict";

(function () {
  const switchOffActive = function () {
    window.pin.setMainCenter();
    window.map.disable();
    window.form.disable();
  };

  const switchOnActive = function () {
    window.map.enable();
    window.form.enable();
  };

  window.addEventListener(`load`, function () {
    switchOffActive();
  });

  window.pin.onMainMouseDown(switchOnActive);
  window.pin.onMainKeyDown(switchOnActive);

  window.form.reset(switchOffActive);
})();
