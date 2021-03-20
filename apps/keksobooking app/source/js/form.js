'use strict'

import { setColor } from './util.js';

const INVALID_LABEL_COLOR = 'red';
const VALID_LABEL_COLOR = 'inherit';
const TITLE_MIN_LENGTH = 30;
const TITLE_MAX_LENGTH = 100;
const MAX_PRICE = 1000000;

const type = document.querySelector('#type');
const price = document.querySelector('#price');
const priceLabel = document.querySelector('.ad-form__label[for="price"]');
const pricesList = {
  'bungalow' : 0,
  'flat' : 1000,
  'house' : 5000,
  'palace' : 10000,
}
const onPriceChange = () => {
  for (let key in pricesList) {
    if (key === type.value) {
      price.placeholder = pricesList[key];
      price.min = pricesList[key];
    }
  }
  if ((+price.value < +price.min) || +price.value > MAX_PRICE) {
    setColor(priceLabel, INVALID_LABEL_COLOR);
    price.setCustomValidity(`Для типа '${type.selectedOptions[0].innerText}' цена от ${price.min} руб.`);
  } else {
    price.setCustomValidity('');
    setColor(priceLabel, VALID_LABEL_COLOR);
  }
}
if (!price.min) {
  onPriceChange();
}
type.addEventListener('change', onPriceChange);
price.addEventListener('input', onPriceChange);

const timein = document.querySelector('#timein');
const timeout = document.querySelector('#timeout');
timein.addEventListener('change', () => {
  timeout.value = timein.value;
});
timeout.addEventListener('change', () => {
  timein.value = timeout.value;
});

const title = document.querySelector('#title');
const titleLabel = document.querySelector('.ad-form__label[for="title"]');
const onTitleChange = () => {
  if (title.value.length < TITLE_MIN_LENGTH || title.value.length > TITLE_MAX_LENGTH) {
    title.setCustomValidity(`Заголовок должен быть от ${TITLE_MIN_LENGTH} до ${TITLE_MAX_LENGTH} символов; сейчас ${title.value.length}.`);
    setColor(titleLabel, INVALID_LABEL_COLOR);
  } else {
    title.setCustomValidity('');
    setColor(titleLabel, VALID_LABEL_COLOR);
  }
}
onTitleChange();
title.addEventListener('input', onTitleChange);

const rooms = document.querySelector('#room_number');
const guests = document.querySelector('#capacity');
const guestsLabel = document.querySelector('.ad-form__label[for="capacity"]');
const capacityList = {
  '1' : ['1'],
  '2' : ['1', '2'],
  '3' : ['1', '2', '3'],
  '100' : ['0'],
}
const onCapacityChange = () => {
  for (let key in capacityList) {
    if (key === rooms.value) {
      if (capacityList[key].includes(guests.value)) {
        guests.setCustomValidity('');
        setColor(guestsLabel, VALID_LABEL_COLOR);
      } else {
        guests.setCustomValidity('Слишком много гостей!');
        setColor(guestsLabel, INVALID_LABEL_COLOR);
      }
    }
  }
}
onCapacityChange();
rooms.addEventListener('change', onCapacityChange);
guests.addEventListener('change', onCapacityChange);





