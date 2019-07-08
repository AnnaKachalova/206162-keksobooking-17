'use strict';
(function () {
  // Блокируем форму с фильтрами добавляя состояние disabled полям
  var map = document.querySelector('.map');
  var mapPin = document.querySelector('.map__pin--main');
  map.querySelector('.map__filters').style.opacity = 0;

  // Заполняем адрес текущими координатами метки
  var MAP_PIN_WIDTH = mapPin.offsetWidth;
  var MAP_PIN_HEIGHT = mapPin.offsetHeight;
  var MAP_PIN_LEFT = mapPin.offsetLeft;
  var MAP_PIN_TOP = mapPin.offsetTop;

  var setAddress = function (coord) {
    var addressY = coord.y + MAP_PIN_HEIGHT;
    var addressX = coord.x + MAP_PIN_WIDTH / 2;
    document.querySelector('#address').value = addressY + ' ,' + addressX;
  };
  var startСoordinates = {
    y: parseInt(MAP_PIN_WIDTH / 2 + MAP_PIN_LEFT, 10),
    x: parseInt(MAP_PIN_HEIGHT / 2 + MAP_PIN_TOP, 10),
  };

  // Возвращаем метку адреса в исходное положение и указываем начальный адрес
  window.setPinToStartPosition = function () {
    setAddress(startСoordinates);
    mapPin.style.top = MAP_PIN_TOP + 'px';
    mapPin.style.left = MAP_PIN_LEFT + 'px';
  };

  window.setPinToStartPosition();

  // Функция дизейбла страницы
  window.disabledPage = function () {
    // Очищаем поля формы публикации и дизейблим ее
    var formPublish = document.querySelector('.ad-form');
    formPublish.reset();
    formPublish.classList.add('ad-form--disabled');

    window.disabledAdForm();
    window.disabledFilterForm();

    // Дизейблим map
    map.classList.add('map--faded');
    // Удаляем метки
    window.controlPins.removePins();
    // Удаляем карту объявлений
    window.controlCard.removeCard();
    // Возвращаем метку адреса в исходное положение и указываем адрес
    window.setPinToStartPosition();
  };
  window.disabledPage();

  // Функция активации страницы
  var activatePage = function () {
    var filterFormFields = document.querySelectorAll('.map__filters select');
    var adForm = document.querySelector('.ad-form');
    var adFormFields = document.querySelectorAll('.ad-form fieldset');

    map.classList.remove('map--faded');
    adForm.classList.remove('ad-form--disabled');

    // активируем поля формы объявлений
    adFormFields.forEach(function (field) {
      field.disabled = 0;
    });
    // активируем поля формы фильтров
    filterFormFields.forEach(function (field) {
      field.disabled = 0;
    });
  };

  // Обработчк перетаскивания
  var onMouseDownHolder = function (evt) {
    // Проверяем что страница неактивна если это так то активируем
    var pageIsNotActived = map.classList.contains('map--faded');
    if (pageIsNotActived) {
      activatePage();
    }

    evt.preventDefault();

    var Coordinate = function (x, y) {
      this.x = x;
      this.y = y;
    };

    var startCoords = new Coordinate(evt.clientX, evt.clientY);

    var onMouseMoveHolder = function (moveEvt) {
      moveEvt.preventDefault();
      var limits = {
        top: 130 - MAP_PIN_HEIGHT,
        bottom: 630,
        left: 0,
        right: map.offsetWidth - MAP_PIN_WIDTH,
      };

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY,
      };

      startCoords = new Coordinate(moveEvt.clientX, moveEvt.clientY);

      mapPin.style.top = mapPin.offsetTop - shift.y + 'px';
      mapPin.style.left = mapPin.offsetLeft - shift.x + 'px';

      // ограничим движение вверх
      if (mapPin.offsetTop - shift.y < limits.top) {
        mapPin.style.top = limits.top + 'px';
      }
      // ограничим движение вниз
      if (mapPin.offsetTop - shift.y > limits.bottom) {
        mapPin.style.top = limits.bottom + 'px';
      }
      // ограничим движение слева
      if (mapPin.offsetLeft - shift.x < limits.left) {
        mapPin.style.left = limits.left + 'px';
      }
      // ограничим движение справа
      if (mapPin.offsetLeft - shift.x > limits.right) {
        mapPin.style.left = limits.right + 'px';
      }

      // заполняем адрес координатами
      var postСlickСoordinates = {
        y: parseInt(mapPin.style.left, 10),
        x: parseInt(mapPin.style.top, 10),
      };
      setAddress(postСlickСoordinates);
    };

    var onMouseUpHolder = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMoveHolder);
      document.removeEventListener('mouseup', onMouseUpHolder);

      // заполняем метками
      window.controlPins.removePins();
      window.backend.load(window.controlPins.successHalder, window.controlPins.showErrorMessage);

      // заполняем адрес координатами
      var postСlickСoordinates = {
        y: parseInt(mapPin.style.left, 10),
        x: parseInt(mapPin.style.top, 10),
      };
      setAddress(postСlickСoordinates);
    };
    document.addEventListener('mousemove', onMouseMoveHolder);
    document.addEventListener('mouseup', onMouseUpHolder);
  };
  mapPin.addEventListener('mousedown', onMouseDownHolder);
})();
