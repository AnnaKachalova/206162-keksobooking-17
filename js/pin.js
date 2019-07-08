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

        // img
        var img = element.querySelector('img');
        img.src = ads.author.avatar;
        img.alt = ads.offer.title;

        documentFragment.appendChild(element);

        // Событие открытия объявления
        element.addEventListener('click', function () {
          window.controlCard.createCard(ads);
        });
      });
      areaForPoints.appendChild(documentFragment);
      document.querySelector('.map__filters').style.opacity = 1;
    },
    updatePins: function () {
      var similarAdsSorted = [];
      similarAdsSorted = similarAds;

      // Устраняем дребезг
      if (lastTimeout) {
        window.clearTimeout(lastTimeout);
      }
      lastTimeout = window.setTimeout(function () {
        // Удаляем все пины
        window.controlPins.removePins();

        var getValue = function (selector) {
          return document.querySelector(selector).value;
        };
        var typeOfHousing = getValue('#housing-type');
        var priceField = getValue('#housing-price');
        var roomsField = getValue('#housing-rooms');
        var guestsField = getValue('#housing-guests');

        // Проверяем что есть поле offer
        similarAdsSorted = similarAds.filter(function (ads) {
          return ads.offer;
        });
        // Фильтруем по типу
        if (typeOfHousing !== 'any') {
          similarAdsSorted = similarAds.filter(function (ads) {
            return ads.offer.type === typeOfHousing;
          });
        }
        // Фильтруем по цене
        var priceGradation = {
          any: [0],
          low: [0, 10000],
          middle: [10000, 50000],
          high: [50000],
        };
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
        
        // Фильтруем чекбоксы
        var featuresField = document.querySelector('#housing-features');
        var featuresFields = featuresField.children;

        for (var f = 0; f < featuresFields.length; f++) {
          var checkBox = featuresFields[f];

          if (checkBox.checked) {
            similarAdsSorted = similarAdsSorted.filter(function (ads) {
              return ads.offer.features.indexOf(checkBox.value) !== -1;
            }); 
          }
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
