import { deactivateAdForm, offerForm, adFormFieldsets, setInitialFormData } from './form.js';
import { deactivateFilters, filterForm, filterFormFieldsets, filterFormInputs, redrawFilteredOffers } from './filter.js';
import { resetFormPhoto } from './phototool.js';
import { fetchedData } from './main.js';

const disableInteractivity = () => {
  deactivateAdForm(offerForm, adFormFieldsets);
  deactivateFilters(filterForm, filterFormFieldsets, filterFormInputs);
};

const setInitialState = () => {
  offerForm.reset();
  filterForm.reset();
  resetFormPhoto();
  redrawFilteredOffers(fetchedData);
  setInitialFormData();
};

export { disableInteractivity, setInitialState };
