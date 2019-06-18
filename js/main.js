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

// Блокируем форму с фильтрами добавляя состояние disabled полям
var mapFilterForm = document.querySelector('.map__filters');
var mapFiltersFields = mapFilterForm.children;
var mapPin = document.querySelector('.map__pin--main');

for (var i = 0; i < mapFiltersFields.length; i++) {
  mapFiltersFields[i].disabled = 1;
}

// Заполняем адрес текущими координатами метки
var MAP_PIN_WIDTH = mapPin.offsetWidth;
var MAP_PIN_HEIGHT = mapPin.offsetHeight;
var MAP_PIN_LEFT = mapPin.offsetLeft;
var MAP_PIN_TOP = mapPin.offsetTop;

var setAddress = function (coordinates) {
  document.querySelector('#address').value = coordinates;
};
var startСoordinates =
  Math.round(MAP_PIN_WIDTH / 2 + MAP_PIN_LEFT) +
  ', ' +
  Math.round(MAP_PIN_HEIGHT / 2 + MAP_PIN_TOP);

setAddress(startСoordinates);

// Активация страницы
var onClickMapPin = function (evt) {
  var adForm = document.querySelector('.ad-form');
  var adFormFields = adForm.children;

  document.querySelector('.map').classList.remove('map--faded');
  adForm.classList.remove('ad-form--disabled');

  // активируем поля формы объявлений
  for (var i = 0; i < adFormFields.length; i++) {
    adFormFields[i].disabled = 0;
  }
  // активируем поля формы фильтров
  for (var i = 0; i < mapFiltersFields.length; i++) {
    mapFiltersFields[i].disabled = 0;
  }
  // заполняем метками
  removePins();
  fillTemplate(similarAdsNearBy, similarAdTemplate, areaForPoints, documentFragment);

  // заполняем адрес координатами
  var postСlickСoordinates = Math.round(evt.clientX) + ', ' + Math.round(evt.clientY);

  setAddress(postСlickСoordinates);
};
mapPin.addEventListener('click', onClickMapPin);

// подготовка данных к выводу других меток (похожих)
var documentFragment = document.createDocumentFragment();
var pin = document.querySelector('#pin');
var similarAdTemplate = pin.content.querySelector('.map__pin');
var areaForPoints = document.querySelector('.map__pins');

var fillTemplate = function (arrayObjects, template, area, fragment) {
  for (var j = 1; j <= arrayObjects.length; j++) {
    var currentPin = arrayObjects[j - 1];
    var element = template.cloneNode(true);

    var widthPin = pin.offsetWidth;
    var heightPin = pin.offsetHeight;
    var xPin = currentPin.location.x - widthPin / 2;
    var yPin = currentPin.location.y - heightPin;

    element.style = 'left:' + xPin + 'px; top:' + yPin + 'px';

    element.querySelector('img').src = currentPin.author.avatar;
    element.querySelector('img').alt = getRandomElement(headerNames);

    fragment.appendChild(element);
  }
  area.appendChild(fragment);
};
var removePins = function () {
  var pins = document.querySelectorAll('.map__pin:not(.map__pin--main)');

  for (var i = 0; i < pins.length; i++) {
    pins[i].parentNode.removeChild(pins[i]);
  }
};
