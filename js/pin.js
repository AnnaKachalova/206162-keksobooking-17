'use strict';
(function () {
  // подготовка данных к выводу других меток (похожих)
  var documentFragment = document.createDocumentFragment();
  var pin = document.querySelector('#pin');
  var similarAdTemplate = pin.content.querySelector('.map__pin');
  var areaForPoints = document.querySelector('.map__pins');

  window.controlPins = {
    createPins: function (similarAds) {
      for (var j = 1; j <= 10; j++) {
        var currentPin = similarAds[j - 1];
        var element = similarAdTemplate.cloneNode(true);

        var widthPin = pin.offsetWidth;
        var heightPin = pin.offsetHeight;
        var xPin = currentPin.location.x - widthPin / 2;
        var yPin = currentPin.location.y - heightPin;

        element.style = 'left:' + xPin + 'px; top:' + yPin + 'px';

        element.querySelector('img').src = currentPin.author.avatar;
        element.querySelector('img').alt = currentPin.offer.title;

        documentFragment.appendChild(element);
      }
      areaForPoints.appendChild(documentFragment);
    },
    showErrorMessage: function (message) {
      var errorWrapper = document.createElement('div');
      errorWrapper.classList.add('error_wrapper');

      errorWrapper.textContent = message;
      document.querySelector('body').appendChild(errorWrapper);
    },
    removePins: function () {
      var pins = document.querySelectorAll('.map__pin:not(.map__pin--main)');

      for (var k = 0; k < pins.length; k++) {
        pins[k].parentNode.removeChild(pins[k]);
      }
    },
  };
})();
