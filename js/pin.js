'use strict';
(function () {
  // подготовка данных к выводу других меток (похожих)
  var documentFragment = document.createDocumentFragment();
  var pin = document.querySelector('#pin');
  var similarAdTemplate = pin.content.querySelector('.map__pin');
  var areaForPoints = document.querySelector('.map__pins');
  var similarAds = [];
  var error = document.querySelector('#error');
  var errorTemplate = error.content.querySelector('.error');
  var lastTimeout;

  window.controlPins = {
    successHalder: function (data) {
      similarAds = data;

      window.controlPins.updatePins();
    },
    createPins: function (array) {
      array.slice(0, 5).forEach(function (ads) {
        var element = similarAdTemplate.cloneNode(true);
        var widthPin = pin.offsetWidth;
        var heightPin = pin.offsetHeight;
        var xPin = ads.location.x - widthPin / 2;
        var yPin = ads.location.y - heightPin;

        element.style = 'left:' + xPin + 'px; top:' + yPin + 'px';

        element.querySelector('img').src = ads.author.avatar;
        element.querySelector('img').alt = ads.offer.title;

        documentFragment.appendChild(element);

        // События работы с объявлением
        // открытие
        element.addEventListener('click', function () {
          window.controlCard.createCard(ads);
        });
      });
      areaForPoints.appendChild(documentFragment);
    },
    updatePins: function () {
      var similarAdsSorted = [];
      var priceGradation = {
        any: [0],
        low: [0, 10000],
        middle: [10000, 50000],
        high: [50000],
      };
      similarAdsSorted = similarAds;

      // Устраняем дребезг
      if (lastTimeout) {
        window.clearTimeout(lastTimeout);
      }
      lastTimeout = window.setTimeout(function () {
        // Удаляем все пины
        window.controlPins.removePins();

        var typeOfHousing = document.querySelector('#housing-type').value;
        var priceField = document.querySelector('#housing-price').value;
        var roomsField = document.querySelector('#housing-rooms').value;
        var guestsField = document.querySelector('#housing-guests').value;

        // Фильтруем по типу
        if (typeOfHousing !== 'any') {
          similarAdsSorted = similarAds.filter(function (ads) {
            return ads.offer.type === typeOfHousing;
          });
        }
        // Фильтруем по цене
        if (priceField !== 'any') {
          similarAdsSorted = similarAdsSorted.filter(function (ads) {
            // проверяем что есть верхний предел
            var range = priceGradation[priceField];
            var minPrice = range[0];

            if (range[1]) {
              var maxPrice = range[1];
              return minPrice < ads.offer.price < maxPrice;
            } else {
              return minPrice < ads.offer.price;
            }
          });
        }
        // Фильтруем по кол-ву комнат
        if (roomsField !== 'any') {
          similarAdsSorted = similarAdsSorted.filter(function (ads) {
            return ads.offer.rooms === Number(roomsField);
          });
        }
        // Фильтруем по кол-ву гостей
        if (guestsField !== 'any') {
          similarAdsSorted = similarAdsSorted.filter(function (ads) {
            return ads.offer.guests === Number(guestsField);
          });
        }
        window.controlPins.createPins(similarAdsSorted);
      }, 500);
    },
    showErrorMessage: function (message) {
      var element = errorTemplate.cloneNode(true);
      element.querySelector('.error__message').textContent = message;
      var resetButton = element.querySelector('.error__button');
      document.querySelector('main').appendChild(element);

      // События для скрытия сообщения
      var hideErrorMessage = function () {
        element.parentNode.removeChild(element);
        element.removeEventListener('click', onElementClick);
        document.removeEventListener('keydown', onDocumentKeydown);
        resetButton.removeEventListener('click', onResetButtonClick);
        window.disabledPage();
      };

      var onElementClick = function () {
        hideErrorMessage();
      };
      var onResetButtonClick = function () {
        hideErrorMessage();
      };
      var onDocumentKeydown = function (evt) {
        window.util.isEscEvent(evt, hideErrorMessage);
      };
      element.addEventListener('click', onElementClick);
      document.addEventListener('keydown', onDocumentKeydown);
      resetButton.addEventListener('click', onResetButtonClick);
    },
    removePins: function () {
      var pins = document.querySelectorAll('.map__pin:not(.map__pin--main)');

      pins.forEach(function (currentPin) {
        currentPin.parentNode.removeChild(currentPin);
      });
    },
  };
})();
