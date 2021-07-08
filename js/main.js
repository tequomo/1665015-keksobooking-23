import './util.js';
import './data.js';
import './card.js';
import './map.js';
import './form.js';
import './state.js';
import './filter.js';
import './api.js';
import './message.js';
import { getOffersData, SERVER_URI } from './api.js';
import { initMap } from './map.js';
import { showFetchErrorMessage } from './message.js';
import { activateFilters, filterForm, filterFormFieldsets, filterFormInputs, filterChangeHandler, onChangeFilters, showInitialOffers } from './filter.js';
import { debounce } from './utils/debounce.js';
import { disableInteractivity } from './state.js';

const REDRAW_DELAY = 500;
let fetchedData = [];

disableInteractivity();

initMap()
  .then(
    getOffersData(
      SERVER_URI,
      (items) => {
        fetchedData = items;
        filterChangeHandler(debounce(() => onChangeFilters(items), REDRAW_DELAY));
        showInitialOffers(items);
      }, showFetchErrorMessage),
  )
  .then(activateFilters(filterForm, filterFormFieldsets, filterFormInputs));

export {fetchedData};
