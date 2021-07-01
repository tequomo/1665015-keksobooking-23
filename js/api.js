import { createOfferPin } from './map.js';
import { showFetchErrorMessage } from './message.js';
import { showErrorMessage, showSuccessMessage } from './message.js';
// import { resetMap } from './map.js';
// import { setInitialFormData, offerForm } from './form.js';

const getOffersData = () => {

  fetch('https://23.javascript.pages.academy/keksobooking/data')
    .then((response) => (response.ok) ? response.json() : (() => { throw new Error(`${response.status} — ${response.statusText}`); }),
    )
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
    'https://23.javascript.pages.academy/keksobooking',
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
