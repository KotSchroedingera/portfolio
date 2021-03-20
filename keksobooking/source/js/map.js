'use strict'

const adForm = document.querySelector('.ad-form');
const mapFilters = document.querySelector('.map__filters');

const blockForm = form => {
  for (let i = 0; i < form.elements.length; i++ ) {
    form.elements[i].disabled = true;
  }
}

const activateForm = form => {
  for (let i = 0; i < form.elements.length; i++ ) {
    form.elements[i].disabled = false;
  }
}

const deactivateApp = () => {
  adForm.classList.add('ad-form--disabled');
  blockForm(adForm);
  blockForm(mapFilters);
}

const activateApp = () => {
  adForm.classList.remove('ad-form--disabled');
  activateForm(adForm);
  activateForm(mapFilters);
}

deactivateApp();

const mapInitialState = {
  x: 35.685143,
  y: 139.751796,
  zoom: 8,
}

const map = L.map('map-canvas')
  .setView([mapInitialState.x, mapInitialState.y], mapInitialState.zoom);

L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoiYXdzY2gyMzkzIiwiYSI6ImNrbGZnMTF0eDE5d3Eydm1qM3lmNTRzZzgifQ.CLgiFt0lmF2JdYWfMDflZw', {
  attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
  id: 'mapbox/streets-v11',
  tileSize: 512,
  zoomOffset: -1,
}).on('loading', activateApp)
  .on('tileerror', deactivateApp)
  .addTo(map);

const mainPinIcon = L.icon({
  iconUrl: 'img/main-pin.svg',
  iconSize: 40,
  iconAnchor: [20, 40],
});

const pinIcon = L.icon({
  iconUrl: 'img/pin.svg',
  iconSize: 40,
  iconAnchor: [20, 40],
});

const address = document.querySelector('#address');

const mainPin = L.marker([mapInitialState.x, mapInitialState.y], {
  icon: mainPinIcon,
  draggable: true,
}).on('add', evt => {
  address.readOnly = true;
  address.value = `${evt.sourceTarget._latlng.lat.toFixed(5)}, ${evt.sourceTarget._latlng.lng.toFixed(5)}`;
}).on('drag', evt => {
  address.value = `${evt.latlng.lat.toFixed(5)}, ${evt.latlng.lng.toFixed(5)}`;
}).addTo(map);

export {
  adForm,
  mapFilters,
  blockForm,
  pinIcon,
  map,
  mapInitialState,
  address,
  mainPinIcon,
  mainPin
}