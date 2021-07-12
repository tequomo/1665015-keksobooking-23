import './util.js';
import './data.js';
import './card.js';
import './map.js';
import './form.js';
import './state.js';
import './filter.js';
import './api.js';
import './message.js';
import './phototool.js';
import { getOffersData, SERVER_URI } from './api.js';
import { initMap } from './map.js';
import { showFetchErrorMessage } from './message.js';
import { activateFilters, filterForm, filterFormFieldsets, filterFormInputs, filterChangeHandler, onChangeFilters, showInitialOffers } from './filter.js';
import { debounce } from './utils/debounce.js';
import { disableInteractivity } from './state.js';
import { offerForm, setInitialFormData } from './form.js';
import { resetFormPhoto } from './phototool.js';

const REDRAW_DELAY = 500;
let fetchedData = [];

disableInteractivity();

const setInitialState = () => {
  offerForm.reset();
  filterForm.reset();
  resetFormPhoto();
  onChangeFilters(fetchedData);
  setInitialFormData();
};

initMap()
  .then(
    getOffersData(
      SERVER_URI,
      (items) => {
        fetchedData = items;
        activateFilters(filterForm, filterFormFieldsets, filterFormInputs);
        filterChangeHandler(debounce(() => onChangeFilters(items), REDRAW_DELAY));
        showInitialOffers(items);
      }, showFetchErrorMessage),
  );

export { setInitialState};
