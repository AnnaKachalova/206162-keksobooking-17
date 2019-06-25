'use strict';

(function () {
  window.util = {
    getRandomNum: function (min, max) {
      return Math.random() * (max - min) + min;
    },
    getRandomElement: function (arr) {
      var rand = Math.floor(Math.random() * arr.length);
      return arr[rand];
    },
  };
})();
