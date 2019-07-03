'use strict';
(function () {
  // подготовка данных к карточек
  var documentFragment = document.createDocumentFragment();
  var card = document.querySelector('#card');
  var similarCardTemplate = card.content.querySelector('.map__card');
  var map = document.querySelector('.map');
  var mapFilter = map.querySelector('.map__filters-container');

  var valuesForType = {
    flat: 'Квартира',
    bungalo: 'Бунгало',
    house: 'Дом',
    palace: 'Дворец',
  };
  var valuesFeatures = {
    wifi: 'popup__feature--wifi',
    dishwasher: 'popup__feature--dishwasher',
    parking: 'popup__feature--parking',
    washer: 'popup__feature--washer',
    elevator: 'popup__feature--elevator',
    conditioner: 'popup__feature--conditioner',
  };

  window.controlCard = {
    createCard: function (data) {
      data.slice(0, 1).forEach(function (ads) {
        console.log(ads);
        var element = similarCardTemplate.cloneNode(true);

        // filling the fields
        var fillText = function (className, text) {
          element.querySelector(className).textContent = text;
        };

        element.querySelector('.popup__avatar').src = ads.author.avatar;

        fillText('.popup__title', ads.offer.title);
        fillText('.popup__text--address', ads.offer.address);
        fillText('.popup__text--price', ads.offer.price + ' ₽/ночь');
        fillText('.popup__type', valuesForType[ads.offer.type]);
        fillText('.popup__text--capacity', ads.offer.rooms + ' комнаты для ' + ads.offer.guests);

        fillText(
          '.popup__text--capacity',
          ads.offer.rooms + ' комнаты для ' + ads.offer.guests + ' гостей'
        );
        fillText('.popup__text--time', ads.offer.checkin + ', выезд до ' + ads.offer.checkout);
        fillText('.popup__description', ads.offer.description);

        //features
        var featuresBlock = element.querySelector('.popup__features');
        featuresBlock.textContent = '';

        ads.offer.features.forEach(function (feature) {
          var li = document.createElement('li');
          li.classList.add('popup__feature');
          li.classList.add(valuesFeatures[feature]);

          featuresBlock.appendChild(li);
        });

        //photos
        var photoBlock = element.querySelector('.popup__photos');
        photoBlock.textContent = '';

        ads.offer.photos.forEach(function (photoSrc) {
          var img = document.createElement('img');
          img.classList.add('.popup__photo');
          img.style.width = '40px';
          img.style.height = '40px';
          img.src = photoSrc;
          img.alt = 'Фотография жилья';

          photoBlock.appendChild(img);
        });

        documentFragment.appendChild(element);
      });

      map.insertBefore(documentFragment, mapFilter);
    },
  };
})();
