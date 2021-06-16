import './util.js';
import { getOffersArray, OFFERS_COUNT } from './data.js';
import { generateCard } from './card.js';

const offers = getOffersArray(OFFERS_COUNT);

offers;

generateCard();
