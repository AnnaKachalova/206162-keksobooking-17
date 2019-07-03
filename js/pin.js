'use strict';
(function () {
  // подготовка данных к выводу других меток (похожих)
  var documentFragment = document.createDocumentFragment();
  var pin = document.querySelector('#pin');
  var similarAdTemplate = pin.content.querySelector('.map__pin');
  var areaForPoints = document.querySelector('.map__pins');
  var firstUpdate = true;
  var similarAds = [];

  window.controlPins = {
    successHalder: function (data) {
      similarAds = data;
      window.controlPins.updatePins();
    },
    createPins: function (array) {
      array.slice(0, 5).forEach(function (ads, j) {
        console.log(ads.offer.type);

        var element = similarAdTemplate.cloneNode(true);
        var widthPin = pin.offsetWidth;
        var heightPin = pin.offsetHeight;
        var xPin = ads.location.x - widthPin / 2;
        var yPin = ads.location.y - heightPin;

        element.style = 'left:' + xPin + 'px; top:' + yPin + 'px';

        element.querySelector('img').src = ads.author.avatar;
        element.querySelector('img').alt = ads.offer.title;

        documentFragment.appendChild(element);
      });
      areaForPoints.appendChild(documentFragment);
    },
    updatePins: function () {
      var similarAdsSorted = [];

      // Фильтруем только со второго обновления
      if (firstUpdate) {
        firstUpdate = false;
        similarAdsSorted = similarAds;
      } else {
        // Удаляем все пины
        this.removePins();

        var typeOfHousing = document.querySelector('#housing-type').value;

        if (typeOfHousing !== 'any') {
          similarAdsSorted = similarAds.filter(function (ads) {
            return ads.offer.type === typeOfHousing;
          });
        } else {
          similarAdsSorted = similarAds;
        }
      }
      this.createPins(similarAdsSorted);
    },
    showErrorMessage: function (message) {
      var errorWrapper = document.createElement('div');
      errorWrapper.classList.add('error_wrapper');

      errorWrapper.textContent = message;
      document.querySelector('body').appendChild(errorWrapper);
    },
    removePins: function () {
      var pins = document.querySelectorAll('.map__pin:not(.map__pin--main)');

      pins.forEach(function (pin) {
        pin.parentNode.removeChild(pin);
      });
    },
  };
})();
