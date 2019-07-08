'use strict';
(function () {
  var mapFilterForm = document.querySelectorAll('.map__filters select');
  var mapAdForm = document.querySelectorAll('.ad-form fieldset');

  // Функции дизейбла форм
  window.disabledFilterForm = function () {
    mapFilterForm.forEach(function (field) {
      field.disabled = 1;
    });
  };
  window.disabledAdForm = function () {
    mapAdForm.forEach(function (field) {
      field.disabled = 1;
    });
  };

  // ------ Работа с полями формамы-------

  // Поля 'Тип жилья' и 'Цена за ночь'
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
  onChangeSelect();
  fieldHousingType.addEventListener('change', onChangeSelect);

  // Поля 'Время заезда' и 'Время выезда'
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

  // Поля 'Количество комнат' и 'Количество мест'
  var fieldQtyRooms = notice.querySelector('#room_number');
  var fieldQtyPlace = notice.querySelector('#capacity');
  var fieldsQtyPlace = Array.from(fieldQtyPlace.options);

  var valuesForQtyRooms = {
    1: [1],
    2: [2, 1],
    3: [3, 2, 1],
    100: [0],
  };

  // изменение их видимости полей у fieldQtyPlace
  var changeVisibilityOptQtyRooms = function (array) {
    var visibleOpt = [];
    fieldsQtyPlace.forEach(function (field) {
      var valueQtyPlace = Number(field.value);
      var isFits = array.includes(valueQtyPlace);

      if (isFits) {
        field.style.display = 'block';
        visibleOpt.push(field);
      } else {
        field.style.display = 'none';
      }
    });
    visibleOpt[0].selected = true;
  };
  changeVisibilityOptQtyRooms(valuesForQtyRooms[1]);

  // для события change у fieldQtyRooms
  var onChangeQtyRooms = function (evt) {
    var val = evt.target.value;
    var arrayОfСorrect = valuesForQtyRooms[val];
    changeVisibilityOptQtyRooms(arrayОfСorrect);
  };

  fieldQtyRooms.addEventListener('change', onChangeQtyRooms);

  // ------ Отправка формы -------
  var form = notice.querySelector('.ad-form');

  // Сообщение об успешной отправке формы
  var success = document.querySelector('#success');
  var successTemplate = success.content.querySelector('.success');

  var successAdSend = function () {
    var element = successTemplate.cloneNode(true);
    document.querySelector('main').appendChild(element);

    // События для скрытия сообщения
    var hideSuccessAd = function () {
      element.parentNode.removeChild(element);
      element.removeEventListener('click', onElementClick);
      document.removeEventListener('keydown', onDocumentKeydown);
    };
    var onElementClick = function () {
      hideSuccessAd();
    };
    var onDocumentKeydown = function (evt) {
      window.util.isEscEvent(evt, hideSuccessAd);
    };
    element.addEventListener('click', onElementClick);
    document.addEventListener('keydown', onDocumentKeydown);
  };

  // Сообщение об ошибке отправки формы
  var error = document.querySelector('#error');
  var errorTemplate = error.content.querySelector('.error');

  var errorAdSend = function () {
    var element = errorTemplate.cloneNode(true);
    var closeButton = element.querySelector('.error__button');
    document.querySelector('main').appendChild(element);

    // События для скрытия сообщения
    var hideErrorAd = function () {
      element.parentNode.removeChild(element);
      element.removeEventListener('click', onElementClick);
      document.removeEventListener('keydown', onDocumentKeydown);
      closeButton.removeEventListener('click', onСloseButtonClick);
    };
    var onElementClick = function () {
      hideErrorAd();
    };
    var onСloseButtonClick = function () {
      hideErrorAd();
    };
    var onDocumentKeydown = function (evt) {
      window.util.isEscEvent(evt, hideErrorAd);
    };
    element.addEventListener('click', onElementClick);
    document.addEventListener('keydown', onDocumentKeydown);
    closeButton.addEventListener('click', onСloseButtonClick);
  };

  form.addEventListener('submit', function (evt) {
    window.backend.save(new FormData(form), successAdSend, errorAdSend);
    evt.preventDefault();
    window.disabledPage();
  });
  // ------ Сброс формы ------
  var resetFormButton = notice.querySelector('.ad-form__reset');

  var onClickResetFormButton = function () {
    window.disabledPage();
    resetFormButton.removeEventListener('click', onClickResetFormButton);
  };
  resetFormButton.addEventListener('click', onClickResetFormButton);
})();
