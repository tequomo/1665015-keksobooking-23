import { activateAdForm, deactivateAdForm, offerForm, adFormFieldsets } from './form.js';
import { activateFilters, deactivateFilters, filterForm, filterFormFieldsets, filterFormInputs } from './filter.js';
import { getOffersData } from './api.js';

const disableInteractivity = () => {
  deactivateAdForm(offerForm, adFormFieldsets);
  deactivateFilters(filterForm, filterFormFieldsets, filterFormInputs);
};

const enableInteractivity = () => {
  activateAdForm(offerForm, adFormFieldsets);
  activateFilters(filterForm, filterFormFieldsets, filterFormInputs);
  getOffersData();
};

disableInteractivity();
// enableInteractivity();

export {enableInteractivity, disableInteractivity};
