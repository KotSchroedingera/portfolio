'use strict';

import { changeElementContent, removeNodeIfEmpty } from './util.js';

const createApartmentsHTML = apartmentsArray => {

  const apartmentsHTML = document.createDocumentFragment();
  const cardTemplate = document.querySelector('#card').content;

  apartmentsArray.forEach(apartment => {

    const offer = cardTemplate.cloneNode(true);

    changeElementContent(offer, '.popup__title', apartment.offer.title);
    changeElementContent(offer, '.popup__text--address', apartment.offer.address);
    changeElementContent(offer, '.popup__text--price', `${apartment.offer.price} <span>₽/ночь</span>`, 'html');
    changeElementContent(offer, '.popup__text--capacity', `${apartment.offer.rooms} комнаты для ${apartment.offer.guests} гостей`);
    changeElementContent(offer, '.popup__text--time', `Заезд после ${apartment.offer.checkin}, выезд до ${apartment.offer.checkout}`);
    changeElementContent(offer, '.popup__description', apartment.offer.description);
    changeElementContent(offer, '.popup__avatar', apartment.author.avatar, 'src');

    const types = {
      'flat' : 'Квартира',
      'bungalow' : 'Бунгало',
      'house' : 'Дом',
      'palace' : 'Дворец',
    }
    const typeElement = offer.querySelector('.popup__type');
    typeElement.textContent = types[apartment.offer.type];

    removeNodeIfEmpty(offer, '.popup__features', apartment.offer.features);
    if (offer.querySelector('.popup__features')) {
      const featuresList = offer.querySelector('.popup__features');
      featuresList.textContent = '';
      apartment.offer.features.forEach(feature => {
        const featuresItem = document.createElement('li');
        featuresItem.classList.add('popup__feature');
        featuresItem.classList.add(`popup__feature--${feature}`);
        featuresList.appendChild(featuresItem);
      });
    }

    removeNodeIfEmpty(offer, '.popup__photos', apartment.offer.photos);
    if (offer.querySelector('.popup__photos')) {
      const photos = offer.querySelector('.popup__photos');
      photos.innerHTML = '';
      apartment.offer.photos.forEach(photo => {
        const photoItem = document.createElement('img');
        photoItem.classList.add('popup__photo');
        photoItem.width = '45';
        photoItem.height = '40';
        photoItem.alt = 'Фотография жилья';
        photoItem.src = photo;
        photos.appendChild(photoItem);
      });
    }

    apartmentsHTML.appendChild(offer);

  });

  return apartmentsHTML;

}

export {createApartmentsHTML};
