import { activateAdForm, adFormFieldsets, offerForm } from './form.js';
import { generateCard } from './card.js';

const DefaultCoords = {
  LAT: 35.6895000,
  LNG: 139.6917100,
};

const PinIconParam = {
  MAIN:   {
    ICON_URL: 'img/main-pin.svg',
    ICON_SIZE: [52, 52],
    ICON_ANCHOR: [26, 52],
    SHADOW_URL: 'leaflet/images/marker-shadow.png',
    SHADOW_SIZE: [52, 52],
    SHADOW_ANCHOR: [15, 52],
  },
  OFFER: {
    ICON_URL: 'img/pin.svg',
    ICON_SIZE: [40, 40],
    ICON_ANCHOR: [20, 40],
    SHADOW_URL: 'leaflet/images/marker-shadow.png',
    SHADOW_SIZE: [41, 41],
    SHADOW_ANCHOR: [11, 40],
  },
};

const MapApiParam = {
  URL: 'https://maptiles.p.rapidapi.com/en/map/v1/{z}/{x}/{y}.png',
  MAX_ZOOM: 19,
  ATTRIBUTION: '&copy; <a href="https://openstreetmap.org/copyright" target="_blank">OpenStreetMap</a> contributors',
  ZOOM: 12,
};

const offerAddress = offerForm.querySelector('#address');


const parseAddress = (coords) => `${(coords.lat || coords.LAT).toFixed(5)}, ${(coords.lng || coords.LNG).toFixed(5)}`;

const bookingMap = L.map('map-canvas');

const initMap = async () => {
  bookingMap.on('load', () => {
    activateAdForm(offerForm, adFormFieldsets);
    offerAddress.value = parseAddress(DefaultCoords);
  })
    .setView({
      lat: DefaultCoords.LAT,
      lng: DefaultCoords.LNG,
    }, MapApiParam.ZOOM);
};

L.tileLayer.mapTilesAPI(
  MapApiParam.URL,
  {
    maxZoom: MapApiParam.MAX_ZOOM,
    attribution: MapApiParam.ATTRIBUTION,
  },
).addTo(bookingMap);
L.control.scale().addTo(bookingMap);

const mainPinIcon = L.icon({
  iconUrl: PinIconParam.MAIN.ICON_URL,
  iconSize: PinIconParam.MAIN.ICON_SIZE,
  iconAnchor: PinIconParam.MAIN.ICON_ANCHOR,
  shadowUrl: PinIconParam.MAIN.SHADOW_URL,
  shadowSize: PinIconParam.MAIN.SHADOW_SIZE,
  shadowAnchor: PinIconParam.MAIN.SHADOW_ANCHOR,
});

const mainPin = L.marker(
  {
    lat: DefaultCoords.LAT,
    lng: DefaultCoords.LNG,
  },
  {
    draggable: true,
    icon: mainPinIcon,
  },
).addTo(bookingMap);

mainPin.on('moveend', (evt) => {
  offerAddress.value = parseAddress(evt.target.getLatLng());
  // console.log(evt.target.getLatLng());
});

const markersCluster = L.markerClusterGroup().addTo(bookingMap);

const createOfferPin = (offer) => {

  const offerPinIcon = L.icon({
    iconUrl: PinIconParam.OFFER.ICON_URL,
    iconSize: PinIconParam.OFFER.ICON_SIZE,
    iconAnchor: PinIconParam.OFFER.ICON_ANCHOR,
    shadowUrl: PinIconParam.OFFER.SHADOW_URL,
    shadowSize: PinIconParam.OFFER.SHADOW_SIZE,
    shadowAnchor: PinIconParam.OFFER.SHADOW_ANCHOR,
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
      lat: DefaultCoords.LAT,
      lng: DefaultCoords.LNG,
    },
  );
  bookingMap.setView(
    {
      lat: DefaultCoords.LAT,
      lng: DefaultCoords.LNG,
    }, MapApiParam.ZOOM);
  offerAddress.value = parseAddress(DefaultCoords);
};

const removeOfferPins = () => {
  markersCluster.clearLayers();
};

export { createOfferPin, drawPins, resetMap, removeOfferPins, initMap };
