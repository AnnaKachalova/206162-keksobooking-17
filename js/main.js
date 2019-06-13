'use strict';
// prepare data
var similarAdsNearBy = [];

var map = document.querySelector('.map');
var MAP_WIDTH = map.offsetWidth;
var MAR_HEIGHT = map.offsetHeight;
var types = ['palace', 'flat', 'house', 'bungalo'];

var getRandom = function(min, max) {
  return Math.random() * (max - min) + min;
};
var getRandomElement = function(arr) {
  var rand = Math.floor(Math.random() * arr.length);
  return arr[rand];
};

for (var i = 1; i <= 8; i++) {
  var similarAd = {
    author: {
      avatar: 'img/avatars/user0' + i + '.png',
    },
    offer: {
      type: getRandomElement(types),
    },

    location: {
      x: getRandom(0, MAP_WIDTH),
      y: getRandom(130, 630),
    },
  };
  similarAdsNearBy.push(similarAd);
}

document.querySelector('.map').classList.remove('map--faded');

// render similar pins
var fillTemplate = function(arrayObjects, template, wrapper) {
  for (var j = 1; j <= arrayObjects.length; j++) {
    var currentPin = arrayObjects[j - 1];
    var element = template.cloneNode(true);

    element.style = 'left:' + currentPin.location.x + 'px; top:' + currentPin.location.y + 'px';

    element.querySelector('img').src = currentPin.author.avatar;
    element.querySelector('img').alt = '{{заголовок объявления}}';

    wrapper.appendChild(element);
  }
};

var similarAdTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
var mapPoinst = document.querySelector('.map__pins');
fillTemplate(similarAdsNearBy, similarAdTemplate, mapPoinst);
