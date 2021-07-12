import './utils/util.js';
import './card.js';
import './state.js';
import './map.js';
import './form.js';
import './filter.js';
import './api.js';
import './message.js';
import './phototool.js';
import { getOffersData, SERVER_URI } from './api.js';
import { initMap } from './map.js';
import { showFetchErrorMessage } from './message.js';
import { activateFilters, filterForm, filterFormFieldsets, filterFormInputs, onChangeFilters, redrawFilteredOffers, showInitialOffers } from './filter.js';
import { debounce } from './utils/util.js';
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
        activateFilters(filterForm, filterFormFieldsets, filterFormInputs);
        onChangeFilters(debounce(() => redrawFilteredOffers(items), REDRAW_DELAY));
        showInitialOffers(items);
      }, showFetchErrorMessage),
  );

export { fetchedData };
