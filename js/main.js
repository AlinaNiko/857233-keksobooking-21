"use strict";

const setChildrenDisabled = (element, boolean) => {
  const children = element.children;

  Array.from(children).forEach((child) => {
    child.disabled = boolean;
  });
};


window.main = {
  setChildrenDisabled
};
