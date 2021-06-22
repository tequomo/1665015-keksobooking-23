import './util.js';
import './data.js';
import { generateCard, offers } from './card.js';
import './form.js';
import './filter.js';
import { activateAdForm, deactivateAdForm } from './form.js';
import { activateFilters, deactivateFilters } from './filter.js';

generateCard(offers[4]);

const disableInteractivity = () => {
  deactivateAdForm();
  deactivateFilters();
};

const enableInteractivity = () => {
  activateAdForm();
  activateFilters();
};

disableInteractivity();
enableInteractivity();
