import { createOwnOfferPin } from './map.js';
import { showErrorMessage, showSuccessMessage} from './message.js';

const SERVER_URI = 'https://23.javascript.pages.academy/keksobooking';
const RENDERED_PINS_COUNT = 10;

const getOffersData = (getUrl, onSuccess, onFail) => {
  fetch(`${getUrl  }/data`)
    .then((response) => (response.ok) ? response.json() : (() => { throw new Error(`${response.status} — ${response.statusText}`); }),
    )
    .then((items) => onSuccess(items))
    .catch((error) => onFail(error));
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
        createOwnOfferPin(response.json());
      } else {
        showErrorMessage();
        throw new Error(`${response.status} — ${response.statusText}`);
      }
    })
    .catch(() => showErrorMessage());
};

export { getOffersData, sendOfferData, RENDERED_PINS_COUNT, SERVER_URI };
