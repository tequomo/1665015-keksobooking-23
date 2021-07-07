import './util.js';
import './data.js';
import './card.js';
import './map.js';
import './form.js';
import './state.js';
import './filter.js';
import './api.js';
import './message.js';
import { /*getOffersData*/ } from './api.js';
import { /*drawPins*/ } from './map.js';
import { /*showFetchErrorMessage*/ } from './message.js';

// const VISIBLE_PINS_COUNT = 10;


// getOffersData()
//   .then((items) => items.slice().sort((a, b) =>
//     ((b.offer.features) ? b.offer.features.length : 0) - ((a.offer.features) ? a.offer.features.length : 0),
//   ))
//   .then((allPosts) => allPosts.slice(0, VISIBLE_PINS_COUNT))
//   .then((posts) => drawPins(posts))
//   .catch((error) => showFetchErrorMessage(error));
