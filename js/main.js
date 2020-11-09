"use strict";

(function () {
  const setChildrenDisabled = function (element, boolean) {
    const children = element.children;
    for (let child of children) {
      child.disabled = boolean;
    }
  };

  window.main = {
    setChildrenDisabled
  };
})();
