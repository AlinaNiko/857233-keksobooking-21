const path = require("path");

module.exports = {
  entry: [
    "./js/main.js",
    "./js/message.js",
    "./js/server.js",
    "./js/main-pin.js",
    "./js/pin.js",
    "./js/card.js",
    "./js/form.js",
    "./js/map.js",
    "./js/mode.js",
    "./js/debounce.js",
    "./js/filter.js"
  ],
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname),
    iife: true
  },
  devtool: false
};
