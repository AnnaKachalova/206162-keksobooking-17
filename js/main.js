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

for (i = 0; i < mapFiltersFields.length; i++) {
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
  for (var j = 0; j < adFormFields.length; j++) {
    adFormFields[j].disabled = 0;
  }
  // активируем поля формы фильтров
  for (j = 0; j < mapFiltersFields.length; j++) {
    mapFiltersFields[j].disabled = 0;
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

  for (var k = 0; k < pins.length; k++) {
    pins[k].parentNode.removeChild(pins[k]);
  }
};

// Работа с формами
// Поле «Тип жилья» влияет на минимальное значение поля «Цена за ночь»
var notice = document.querySelector('.notice');
var fieldHousingType = notice.querySelector('#type');
var minValuesForPrice = [0, 1000, 5000, 10000];

var onChangeSelect = function () {
  var index = fieldHousingType.selectedIndex;
  var price = notice.querySelector('#price');
  var minValue = minValuesForPrice[index];

  price.min = parseInt(minValue, 10);
  price.placeholder = minValue;
};
fieldHousingType.addEventListener('change', onChangeSelect);

// Поля «Время заезда», «Время выезда»
var fieldTimein = notice.querySelector('#timein');
var fieldTimeOut = notice.querySelector('#timeout');

var onChangeTime = function (evt) {
  var changedField = evt.target;
  var isTimeIn = changedField.id === 'timein';
  var timeNeedToChange = isTimeIn ? fieldTimeOut : fieldTimein;
  timeNeedToChange.value = changedField.value;
};

fieldTimein.addEventListener('change', onChangeTime);
fieldTimeOut.addEventListener('change', onChangeTime);
