import { enableInteractivity } from './state.js';
import { offerForm } from './form.js';
import { offers, generateCard } from './card.js';

const TOKIO_CENTER_COORDS = {
  lat: 35.6895000,
  lng: 139.6917100,
};

const offerAddress = offerForm.querySelector('#address');

const parseAddress = (coords) => `${(coords.lat).toFixed(5)}, ${(coords.lng).toFixed(5)}`;

const bookingMap = L.map('map-canvas')
  .on('load', () => {
    enableInteractivity();
    offerAddress.value = parseAddress(TOKIO_CENTER_COORDS);
  })
  .setView({
    lat: TOKIO_CENTER_COORDS.lat,
    lng: TOKIO_CENTER_COORDS.lng,
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
    lat: TOKIO_CENTER_COORDS.lat,
    lng: TOKIO_CENTER_COORDS.lng,
  },
  {
    draggable: true,
    icon: mainPinIcon,
  },
).addTo(bookingMap);

mainPin.on('moveend', (evt) => {
  offerAddress.value = parseAddress(evt.target.getLatLng());
});

const createOfferPin = (offer) => {

  const offerPinIcon = L.icon({
    iconUrl: '../img/pin.svg',
    iconSize: [40, 40],
    iconAnchor: [20, 40],
  });

  const offerPin = L.marker(
    {
      lat: offer.location.lat,
      lng: offer.location.lng,
    },
    {
      icon: offerPinIcon,
    },
  ).addTo(bookingMap);

  offerPin.bindPopup(generateCard(offer),
    {
      keepInView: true,
    },
  );
};

offers.forEach((element) => {
  createOfferPin(element);
});
