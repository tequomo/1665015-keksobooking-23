import { enableInteractivity } from './state.js';
import { offerForm } from './form.js';

const offerAddress = offerForm.querySelector('#address');

const parseAddress = (coords) => `${ (coords.lat).toFixed(5) }, ${ (coords.lng).toFixed(5) }`;

const bookingMap = L.map('map-canvas')
  .on('load', () => {
    enableInteractivity();
  })
  .setView({
    lat: 35.6895000,
    lng: 139.6917100,
  }, 10);

L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(bookingMap);

const mainPinIcon = L.icon({
  iconUrl: '../img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
});

const mainPin = L.marker(
  {
    lat: 35.6895000,
    lng: 139.6917100,
  },
  {
    draggable: true,
    icon: mainPinIcon,
  },
).addTo(bookingMap);

mainPin.on('moveend', (evt) => {
  offerAddress.value = parseAddress(evt.target.getLatLng());
});
