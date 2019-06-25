'use strict';

(function () {
  // Подготовка данных
  window.similarAdsNearBy = [];
  var map = document.querySelector('.map');
  var MAP_WIDTH = map.offsetWidth;

  var types = ['palace', 'flat', 'house', 'bungalo'];

  for (var i = 1; i <= 8; i++) {
    var similarAd = {
      author: {
        avatar: 'img/avatars/user0' + i + '.png',
      },
      offer: {
        type: window.util.getRandomElement(types),
      },

      location: {
        x: window.util.getRandomNum(0, MAP_WIDTH),
        y: window.util.getRandomNum(130, 630),
      },
    };
    similarAdsNearBy.push(similarAd);
  }
})();
