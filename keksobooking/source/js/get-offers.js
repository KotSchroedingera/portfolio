'use strict'

import { adForm, blockForm, mapFilters, pinIcon, map } from './map.js';
import { createApartmentsHTML } from './create-offers.js';
import { debounce } from './util.js'

const OFFERS_AMOUNT = 10;
const FILTER_ANY_ID = 'any';

if (!adForm.classList.contains('ad-form--disabled')) {
  let markersLayer;
  const addMarkers = json => {
    let i = 0;
    const markers = [];
    const apartmentsHTML = createApartmentsHTML(json.slice(0, OFFERS_AMOUNT));
    json.slice(0, OFFERS_AMOUNT).forEach(apartment => {
      const marker = L.marker([apartment.location.lat, apartment.location.lng], {
        icon: pinIcon,
      }).bindPopup(apartmentsHTML.querySelectorAll('.popup')[i]);
      markers.push(marker);
      i++;
    });
    markersLayer = L.layerGroup(markers).addTo(map);
  }
  fetch('https://22.javascript.pages.academy/keksobooking/data')
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      blockForm(mapFilters);
      throw new Error(`Ошибка ${res.status}: не удалось загрузить объявления. Однако, можно попробовать отправить своё.`);
    })
    .then(json => {
      addMarkers(json);
      const type = mapFilters.querySelector('[name=housing-type]');
      const price = mapFilters.querySelector('[name=housing-price]');
      const prices = {
        'middle' : {
          'min' : 10000,
          'max' : 49999,
        },
        'low' : {
          'min': 0,
          'max': 9999,
        },
        'high' : {
          'min' : 50000,
          'max' : Infinity,
        },
      };
      const rooms = mapFilters.querySelector('[name=housing-rooms]');
      const guests = mapFilters.querySelector('[name=housing-guests]');
      const features = [
        'wifi',
        'dishwasher',
        'elevator',
        'parking',
        'conditioner',
        'washer',
      ];
      const applyFilters = () => {
        markersLayer.remove();
        const isFilterActive = filterName => {
          return (filterName.value !== FILTER_ANY_ID);
        };
        const filterOffers = elem => {
          if (isFilterActive(type)) {
            if (elem.offer.type !== type.value) {
              return false;
            }
          }
          if (isFilterActive(price)) {
            switch (price.value) {
              case 'low':
                if (elem.offer.price > prices.low.max) {
                  return false;
                }
                break;
              case 'middle':
                if ((elem.offer.price < prices.middle.min) || (elem.offer.price > prices.middle.max)) {
                  return false;
                }
                break;
              case 'high':
                if (elem.offer.price < prices.high.min) {
                  return false;
                }
                break;
            }
          }
          if (isFilterActive(rooms)) {
            if (elem.offer.rooms.toString() !== rooms.value) {
              return false;
            }
          }
          if (isFilterActive(guests)) {
            if (elem.offer.guests.toString() !== guests.value) {
              return false;
            }
          }
          for (let filterValue of features) {
            if (document.querySelector(`#filter-${filterValue}`).checked) {
              if (!elem.offer.features.includes(filterValue)) {
                return false;
              }
            }
          }
          return true;
        }
        addMarkers(json.filter(filterOffers));
      }
      mapFilters.addEventListener('change', debounce(applyFilters, 500));
    })
    .catch(err => {
      const errorHTML = `<div style="
      position: fixed;
      z-index: 100;
      background-color: red;
      left: 0;
      width: 100vw;
      text-align: center;
      padding: 15px 0;
      " id="message-error-load-offers">${err.message}</div>`
      document.querySelector('main').insertAdjacentHTML('beforebegin', errorHTML);
      setTimeout(() => {
        document.querySelector('#message-error-load-offers').remove();
      }, 5000);
    })
}