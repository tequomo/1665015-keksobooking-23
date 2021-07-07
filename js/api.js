import { filterForm, showInitialOffers, onChangeFilters } from './filter.js';
import { /*drawPins*/ } from './map.js';
import { showFetchErrorMessage, showErrorMessage, showSuccessMessage} from './message.js';

const SERVER_URI = 'https://23.javascript.pages.academy/keksobooking';
const RENDERED_PINS_COUNT = 10;


const getOffersData = () => {

  fetch(`${SERVER_URI}/data`)
    .then((response) => (response.ok) ? response.json() : (() => { throw new Error(`${response.status} — ${response.statusText}`); }),
    )
    .then((items) => {
      filterForm.addEventListener('change', () => {
        onChangeFilters(items);
      });
      showInitialOffers(items);
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

export { getOffersData, sendOfferData, RENDERED_PINS_COUNT };
