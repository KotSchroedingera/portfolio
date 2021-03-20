'use strict'

import { mainPin, mapInitialState, address, adForm, mapFilters } from './map.js';

const resetApp = () => {
  adForm.reset();
  mapFilters.reset();
  mainPin.setLatLng([mapInitialState.x, mapInitialState.y]);
  address.value = `${mapInitialState.x.toFixed(5)}, ${mapInitialState.y.toFixed(5)}`;
  const avatar = document.querySelector('.ad-form-header__preview img');
  avatar.src = 'img/muffin-grey.svg';
  const photos = document.querySelector('.ad-form__photo');
  photos.innerHTML = '';
  photos.style = '';
}

document.querySelector('.ad-form__reset').addEventListener('click', evt => {
  evt.preventDefault();
  resetApp();
});

const showMessage = (id, closeButton) => {
  const messageTemplate = document.querySelector(`#${id}`).content;
  const message = messageTemplate.cloneNode(true);
  document.querySelector('main').append(message);
  const messageShown = document.querySelector(`.${id}`);

  const removeMessage = () => {
    messageShown.remove();
    document.removeEventListener('keyup', onWindowEscapePress);
    document.removeEventListener('click', onWindowClick);
    if (closeButton) {
      document.querySelector(`.${id}__button`).removeEventListener('click', onCloseButtonClick);
    }
  }
  const onWindowEscapePress = evt => {
    if (evt.key === 'Escape') {
      removeMessage();
    }
  }
  const onWindowClick = () => {
    removeMessage();
  }
  const onCloseButtonClick = () => {
    removeMessage();
  }
  document.addEventListener('keyup', onWindowEscapePress);
  document.addEventListener('click', onWindowClick);
  if (closeButton) {
    document.querySelector(`.${id}__button`).addEventListener('click', onCloseButtonClick);
  }
}

adForm.addEventListener('submit', evt => {
  evt.preventDefault();
  fetch('https://22.javascript.pages.academy/keksobooking', {
    method: 'post',
    body: new FormData(evt.target),
  })
    .then(res => {
      if (res.ok) {
        resetApp();
        showMessage('success');
      } else {
        throw new Error;
      }
    })
    .catch(() => {
      showMessage('error', true);
    });
});