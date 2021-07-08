import { RENDERED_PINS_COUNT } from './api.js';
import { drawPins, removeOfferPins, resetMap } from './map.js';
import { /*inArray*/ } from './util.js';

const filterForm = document.querySelector('.map__filters');
const filterFormFieldsets = filterForm.querySelectorAll('fieldset');
const filterFormInputs = filterForm.querySelectorAll('select');
// const filterFeaturesSet = filterForm.querySelector('.map__features');
const housingType = filterForm.querySelector('#housing-type');
const housingPrice = filterForm.querySelector('#housing-price');
const housingRooms = filterForm.querySelector('#housing-rooms');
const housingGuests = filterForm.querySelector('#housing-guests');
const filterFeatures = filterForm.querySelectorAll('.map__checkbox');


const DEFAULT_PARAMETER = 'any';

const HOUSING_PRICE_RANGE = {
  low: {
    min: 0,
    max: 10000,
  },
  middle: {
    min: 10000,
    max: 50000,
  },
  high: {
    min: 50000,
    max: Infinity,
  },
};


const deactivateFilters = (form, nodes, inputs) => {
  form.classList.add('map__filters--disabled');
  nodes.forEach((node) => node.disabled = true);
  inputs.forEach((node) => node.disabled = true);
};

const activateFilters = (form, nodes, inputs) => {
  form.classList.remove('map__filters--disabled');
  nodes.forEach((node) => node.disabled = false);
  inputs.forEach((node) => node.disabled = false);
};

const getSelectedHousingType = (ad) => (housingType.value === DEFAULT_PARAMETER) ? true : ad.offer.type === housingType.value;
const getSelectedHousingPrice = (ad) => (housingPrice.value === DEFAULT_PARAMETER) ? true : (ad.offer.price >= HOUSING_PRICE_RANGE[housingPrice.value].min && ad.offer.price < HOUSING_PRICE_RANGE[housingPrice.value].max);
const getSelectedHousingRooms = (ad) => (housingRooms.value === DEFAULT_PARAMETER) ? true : ad.offer.rooms === Number(housingRooms.value);
const getSelectedHousingGuests = (ad) => (housingGuests.value === DEFAULT_PARAMETER) ? true : ad.offer.guests === Number(housingGuests.value);


const getSelectedFeatures = (ad) => {
  const selectedFeatures = [];
  filterFeatures.forEach((item) => {
    if (item.checked) {
      selectedFeatures.push(item.value);
    }
    selectedFeatures.every((feature) => (ad.offer.features) ? console.log(ad.offer.features.includes(feature)) : false);
  });
  // console.log((ad.offer.features) ? ad.offer.features : false);
  // return ad.offer.features.includes(selectedFeatures);
};

// filterForm.addEventListener('change', (event) => {
//   if (event.target.matches('select[id="housing-type"]')) {
//     console.log((event.target.value === DEFAULT_PARAMETER) ? true : event.target.value);
//     return (event.target.value === DEFAULT_PARAMETER) ? true : event.target.value;
//   }
//   if (event.target.matches('select[id="housing-price"]')) {
//     console.log((event.target.value === DEFAULT_PARAMETER) ? true : HOUSING_PRICE_RANGE[event.target.value]);
//   }
//   if (event.target.matches('select[id="housing-rooms"]')) {
//     console.log((event.target.value === DEFAULT_PARAMETER) ? true : event.target.value);
//   }
//   if (event.target.matches('select[id="housing-guests"]')) {
//     console.log((event.target.value === DEFAULT_PARAMETER) ? true : event.target.value);
//   }
//   if (event.target.matches('input[type="checkbox"]')) {
//     const selectedFeatures = [];
//     filterFeatures.forEach((item) => {
//       if (item.checked) {
//         selectedFeatures.push(item.value);
//       }
//     });
//     console.log(selectedFeatures);
//   }
// });

const getSimilarOffers = (offers) => offers.filter((offer) => getSelectedHousingType(offer) && getSelectedHousingPrice(offer) && getSelectedHousingRooms(offer) && getSelectedHousingGuests(offer) && getSelectedFeatures(offer));

// filterForm.addEventListener('change', (event) => {
// console.log(HOUSING_PRICE_RANGE[event.target.value].max);
// console.log(typeof(getSelectedHousingType()));
// const filterNode = event.currentTarget.elements;
// console.log((filterNode['housing-type'].value === DEFAULT_PARAMETER) ? true : filterNode['housing-type'].value);
// console.log((filterNode['housing-price'].value === DEFAULT_PARAMETER) ? true : HOUSING_PRICE_RANGE[filterNode['housing-price'].value]);
// console.log((filterNode['housing-rooms'].value === DEFAULT_PARAMETER) ? true : filterNode['housing-rooms'].value);
// console.log((filterNode['housing-guests'].value === DEFAULT_PARAMETER) ? true : filterNode['housing-guests'].value);

// if (event.target.matches('select[id="housing-type"]')) {
//   // console.log((event.target.value === DEFAULT_PARAMETER) ? true : event.target.value);
//   // return (event.target.value === DEFAULT_PARAMETER) ? true : event.target.value;
// }
// if (event.target.matches('select[id="housing-price"]')) {
//   console.log((event.target.value === DEFAULT_PARAMETER) ? true : HOUSING_PRICE_RANGE[event.target.value]);
// }
// if (event.target.matches('select[id="housing-rooms"]')) {
//   console.log((event.target.value === DEFAULT_PARAMETER) ? true : event.target.value);
// }
// if (event.target.matches('select[id="housing-guests"]')) {
//   console.log((event.target.value === DEFAULT_PARAMETER) ? true : event.target.value);
// }


// if (event.target.matches('input[type="checkbox"]')) {
//   const selectedFeatures = [];
//   filterFeatures.forEach((item) => {
//     if (item.checked) {
//       selectedFeatures.push(item.value);
//     }
//   });
//   console.log(selectedFeatures);
//   return inArray(selectedFeatures);
// }
// });

const getBetterOffers = (offers) => offers.slice().sort((a, b) =>
  ((b.offer.features) ? b.offer.features.length : 0) - ((a.offer.features) ? a.offer.features.length : 0),
);

const showInitialOffers = (items) => {
  const allPosts = getBetterOffers(items);
  const posts = allPosts.slice(0, RENDERED_PINS_COUNT);
  drawPins(posts);
};

const onChangeFilters = (data) => {
  removeOfferPins();
  resetMap();
  const similarOffers = getBetterOffers(getSimilarOffers(data));
  // console.log(similarOffers);
  drawPins(similarOffers.slice(0, RENDERED_PINS_COUNT));
};

// filterFeaturesSet.addEventListener('change', (event) => {
//   if (event.target.checked) {
//     console.log('checked');
//   } else {
//     console.log('not checked');
//   }
// });

export { deactivateFilters, activateFilters, getSimilarOffers, showInitialOffers, filterForm, filterFormFieldsets, filterFormInputs, onChangeFilters, getSelectedHousingType };
