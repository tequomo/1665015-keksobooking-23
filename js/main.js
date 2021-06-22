import './util.js';
import './data.js';
import { generateCard, offers } from './card.js';
import './form.js';
import './filter.js';
import { activateAdForm, deactivateAdForm, offerForm, adFormFieldsets } from './form.js';
import { activateFilters, deactivateFilters, filterForm, filterFormFieldsets, filterFormInputs } from './filter.js';

generateCard(offers[4]);

const disableInteractivity = () => {
  deactivateAdForm(offerForm, adFormFieldsets);
  deactivateFilters(filterForm, filterFormFieldsets, filterFormInputs);
};

const enableInteractivity = () => {
  activateAdForm(offerForm, adFormFieldsets);
  activateFilters(filterForm, filterFormFieldsets, filterFormInputs);
};

disableInteractivity();
enableInteractivity();
