'use strict';
(function () {
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
})();
