import { createOfferPin } from './map.js';
import { showFetchErrorMessage } from './message.js';
import { showErrorMessage, showSuccessMessage } from './message.js';
// import { resetMap } from './map.js';
// import { setInitialFormData, offerForm } from './form.js';

const SERVER_URI = 'https://23.javascript.pages.academy/keksobooking';
const VISIBLE_PINS_COUNT = 10;

const getOffersData = () => {

  fetch(`${SERVER_URI}/data`)
    .then((response) => (response.ok) ? response.json() : (() => { throw new Error(`${response.status} — ${response.statusText}`); }),
    )
    .then((items) => items.filter((item) => item.offer.type ==='bungalow'))
    .then((items) => items.slice().sort((a, b) =>
      ((b.offer.features) ? b.offer.features.length : 0) - ((a.offer.features) ? a.offer.features.length : 0),
    ))
    .then((allPosts) => allPosts.slice(0, VISIBLE_PINS_COUNT))
    .then((posts) => {
      posts.forEach((element) => {
        createOfferPin(element);
      });
    },
    )
    .catch((error) => showFetchErrorMessage(error));
};


const sendOfferData = (data, onSuccess) => {

  fetch(
    `${SERVER_URI}`,
    {
      method: 'POST',
      body: data,
    },
  )
    .then((response) => {
      if (response.ok) {
        onSuccess();
        showSuccessMessage();
      } else {
        showErrorMessage();
        throw new Error(`${response.status} — ${response.statusText}`);
      }
    })
    .catch(() => showErrorMessage());

  // .then((ad) => createOfferPin);
};

export { getOffersData, sendOfferData };
