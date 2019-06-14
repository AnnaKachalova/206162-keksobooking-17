'use strict';
// prepare data
var similarAdsNearBy = [];
var map = document.querySelector('.map');
var MAP_WIDTH = map.offsetWidth;
var headerNames = [
  'Жилой комплекс',
  'Таунхаус',
  'Малогабаритная квартира',
  'Студия',
  'Дачный дом с земельным участком',
];
var types = ['palace', 'flat', 'house', 'bungalo'];

var getRandom = function (min, max) {
  return Math.random() * (max - min) + min;
};
var getRandomElement = function (arr) {
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
var documentFragment = document.createDocumentFragment();
var PIN = document.querySelector('#pin');

var fillTemplate = function (arrayObjects, template, area, fragment) {
  for (var j = 1; j <= arrayObjects.length; j++) {
    var currentPin = arrayObjects[j - 1];
    var element = template.cloneNode(true);

    var widthPin = PIN.offsetWidth;
    var heightPin = PIN.offsetHeight;
    var xPin = currentPin.location.x - widthPin / 2;
    var yPin = currentPin.location.y - heightPin;

    element.style = 'left:' + xPin + 'px; top:' + yPin + 'px';

    element.querySelector('img').src = currentPin.author.avatar;
    element.querySelector('img').alt = getRandomElement(headerNames);

    fragment.appendChild(element);
  }
  area.appendChild(fragment);
};

var similarAdTemplate = PIN.content.querySelector('.map__pin');
var areaForPoints = document.querySelector('.map__pins');

areaForPoints.textContent = '';
fillTemplate(similarAdsNearBy, similarAdTemplate, areaForPoints, documentFragment);
