'use strict';

(function () {
  var filterForm = document.querySelector('.map__filters');

  // Изменение типа жилья
  var typeOfHousingField = filterForm.querySelector('#housing-type');

  var onTypeOfHousingChange = function () {
    window.controlPins.updatePins();
  };
  typeOfHousingField.addEventListener('change', onTypeOfHousingChange);
})();
