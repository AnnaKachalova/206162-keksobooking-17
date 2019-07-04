'use strict';

(function () {
  var ESC_KEYCODE = 27;
  window.util = {
    getRandomNum: function (min, max) {
      return Math.random() * (max - min) + min;
    },
    getRandomElement: function (arr) {
      var rand = Math.floor(Math.random() * arr.length);
      return arr[rand];
    },
    isEscEvent: function (evt, action) {
      if (evt.keyCode === ESC_KEYCODE) {
        action();
      }
    },
  };
})();
