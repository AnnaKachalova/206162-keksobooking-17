'use strict';

(function () {
  var filterForm = document.querySelector('.map__filters');

  // Изменение типа жилья
  var typeOfHousingField = filterForm.querySelector('#housing-type');

  var onTypeOfHousingChange = function () {
    window.controlPins.updatePins();
  };
  typeOfHousingField.addEventListener('change', onTypeOfHousingChange);

  // Изменение цены за ночь
  var priceField = filterForm.querySelector('#housing-price');
  var onPriceChange = function () {
    window.controlPins.updatePins();
  };
  priceField.addEventListener('change', onPriceChange);

  // Изменение кол-ва комнат
  var roomsField = filterForm.querySelector('#housing-rooms');
  var onRoomsChange = function () {
    window.controlPins.updatePins();
  };
  roomsField.addEventListener('change', onRoomsChange);

  // Изменение кол-ва гостей
  var guestsField = filterForm.querySelector('#housing-guests');
  var onGuestsChange = function () {
    window.controlPins.updatePins();
  };
  guestsField.addEventListener('change', onGuestsChange);
})();
