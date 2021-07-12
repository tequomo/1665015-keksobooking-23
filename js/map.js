import { activateAdForm, adFormFieldsets, offerForm } from './form.js';
import { generateCard } from './card.js';

const offerAddress = offerForm.querySelector('#address');

const TOKIO_CENTER_COORDS = {
  lat: 35.6895000,
  lng: 139.6917100,
};

const PIN_ICON_PARAM = {
  main:   {
    iconUrl: 'img/main-pin.svg',
    iconSize: [52, 52],
    iconAnchor: [26, 52],
    shadowUrl: 'leaflet/images/marker-shadow.png',
    shadowSize: [52, 52],
    shadowAnchor: [15, 52],
  },
  offer: {
    iconUrl: 'img/pin.svg',
    iconSize: [40, 40],
    iconAnchor: [20, 40],
    shadowUrl: 'leaflet/images/marker-shadow.png',
    shadowSize: [41, 41],
    shadowAnchor: [11, 40],
  },
};

const MAP_API_PARAM = {
  url: 'https://maptiles.p.rapidapi.com/en/map/v1/{z}/{x}/{y}.png',
  maxZoom: 19,
  attribution: '&copy; <a href="https://openstreetmap.org/copyright" target="_blank">OpenStreetMap</a> contributors',
};

const parseAddress = (coords) => `${(coords.lat).toFixed(5)}, ${(coords.lng).toFixed(5)}`;

const bookingMap = L.map('map-canvas');

const initMap = async () => {
  bookingMap.on('load', () => {
    activateAdForm(offerForm, adFormFieldsets);
    offerAddress.value = parseAddress(TOKIO_CENTER_COORDS);
  })
    .setView({
      lat: TOKIO_CENTER_COORDS.lat,
      lng: TOKIO_CENTER_COORDS.lng,
    }, 12);
};

L.tileLayer.mapTilesAPI(
  MAP_API_PARAM.url,
  {
    maxZoom: MAP_API_PARAM.maxZoom,
    attribution: MAP_API_PARAM.attribution,
  },
).addTo(bookingMap);
L.control.scale().addTo(bookingMap);

const mainPinIcon = L.icon({
  iconUrl: PIN_ICON_PARAM.main.iconUrl,
  iconSize: PIN_ICON_PARAM.main.iconSize,
  iconAnchor: PIN_ICON_PARAM.main.iconAnchor,
  shadowUrl: PIN_ICON_PARAM.main.shadowUrl,
  shadowSize: PIN_ICON_PARAM.main.shadowSize,
  shadowAnchor: PIN_ICON_PARAM.main.shadowAnchor,
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

const markersCluster = L.markerClusterGroup().addTo(bookingMap);

const createOfferPin = (offer) => {

  const offerPinIcon = L.icon({
    iconUrl: PIN_ICON_PARAM.offer.iconUrl,
    iconSize: PIN_ICON_PARAM.offer.iconSize,
    iconAnchor: PIN_ICON_PARAM.offer.iconAnchor,
    shadowUrl: PIN_ICON_PARAM.offer.shadowUrl,
    shadowSize: PIN_ICON_PARAM.offer.shadowSize,
    shadowAnchor: PIN_ICON_PARAM.offer.shadowAnchor,
  });

  const offerPin = L.marker(
    {
      lat: offer.location.lat,
      lng: offer.location.lng,
    },
    {
      icon: offerPinIcon,
    },
  );

  offerPin.bindPopup(generateCard(offer),
    {
      keepInView: true,
    },
  );

  markersCluster.addLayer(offerPin);
};

const drawPins = (dataset) => {
  dataset.forEach((data) => createOfferPin(data));
};

const resetMap = () => {
  mainPin.setLatLng(
    {
      lat: TOKIO_CENTER_COORDS.lat,
      lng: TOKIO_CENTER_COORDS.lng,
    },
  );
  bookingMap.setView(
    {
      lat: TOKIO_CENTER_COORDS.lat,
      lng: TOKIO_CENTER_COORDS.lng,
    }, 12);
  offerAddress.value = parseAddress(TOKIO_CENTER_COORDS);
};

const removeOfferPins = () => {
  markersCluster.clearLayers();
};

export { createOfferPin, drawPins, resetMap, removeOfferPins, initMap };
