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

  // «Количество комнат», «Количество мест»
  var fieldQtyRooms = notice.querySelector('#room_number');
  var fieldQtyPlace = notice.querySelector('#capacity');
  var fieldsQtyPlace = fieldQtyPlace.children;

  var valuesForQtyRooms = {
    1: [1],
    2: [2, 1],
    3: [3, 2, 1],
    100: [0],
  };

  var onChangeQtyRooms = function (evt) {
    var value = evt.target.value;
    var arrayОfСorrect = valuesForQtyRooms[value];

    for (var f = 0; f < fieldsQtyPlace.length; f++) {
      var currentField = fieldsQtyPlace[f];
      var valueQtyPlace = Number(currentField.value);
      var isFits = arrayОfСorrect.includes(valueQtyPlace);

      currentField.style.display = isFits ? 'block' : 'none';
      currentField.selected = isFits ? true : false;
    }
  };
  fieldQtyRooms.addEventListener('change', onChangeQtyRooms);
})();
