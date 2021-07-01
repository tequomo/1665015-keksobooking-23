import { getOffersArray, OFFERS_COUNT } from './data.js';

const APARTMENTS = {
  'flat': 'Квартира',
  'bungalow': 'Бунгало',
  'house': 'Дом',
  'palace': 'Дворец',
  'hotel': 'Отель',
};

const cardTemplate = document.querySelector('#card').content.querySelector('.popup');
// const mapCanvas = document.querySelector('#map-canvas');

const generateCapacityText = (rooms, guests) => {
  let capacityString = '';
  switch (rooms) {
    case 1:
      capacityString += `${rooms} комната`;
      break;
    case 2:
    case 3:
    case 4:
      capacityString += `${rooms} комнаты`;
      break;
    default:
      capacityString += `${rooms} комнат`;
      break;
  }
  switch (guests) {
    case 0:
      capacityString += ' без гостей';
      break;
    case 1:
      capacityString += ` для ${guests} гостя`;
      break;
    default:
      capacityString += ` для ${guests} гостей`;
  }
  return capacityString;
};

const createFeaturesList = (features) => {
  const featuresList = document.createDocumentFragment();
  const featureItemTemplate = document.createElement('li');
  featureItemTemplate.classList.add('popup__feature');
  features.forEach((feature) => {
    const featureItem = featureItemTemplate.cloneNode(true);
    featureItem.classList.add(`popup__feature--${feature}`);
    featuresList.appendChild(featureItem);
  });
  return featuresList;
};

const createPhotoCollection = (containerNode, linkCollection) => {
  const photoCollection = document.createDocumentFragment();
  linkCollection.forEach((link) => {
    const collectionItem = containerNode.cloneNode(true);
    collectionItem.src = link;
    photoCollection.appendChild(collectionItem);
  });
  return photoCollection;
};

const generateCard = (advert) => {
  const newCard = cardTemplate.cloneNode(true);
  newCard.querySelector('.popup__title').textContent = advert.offer.title;
  newCard.querySelector('.popup__text--address').textContent = advert.offer.address;
  newCard.querySelector('.popup__text--price').innerHTML = `${advert.offer.price}<span> ₽/ночь</span>`;
  newCard.querySelector('.popup__type').textContent = APARTMENTS[advert.offer.type];
  newCard.querySelector('.popup__text--capacity').textContent = generateCapacityText(advert.offer.rooms, advert.offer.guests);
  newCard.querySelector('.popup__text--time').textContent = `Заезд после ${advert.offer.checkin}, выезд до ${advert.offer.checkout}`;
  (advert.offer.features) ? (newCard.querySelector('.popup__features').innerHTML = '', newCard.querySelector('.popup__features').appendChild(createFeaturesList(advert.offer.features))) : newCard.querySelector('.popup__features').classList.add('hidden');
  (advert.offer.description) ? newCard.querySelector('.popup__description').textContent = advert.offer.description : newCard.querySelector('.popup__description').classList.add('hidden');
  // const offerPhotoNode = newCard.querySelector('.popup__photos');
  // const offerPhotos = createPhotoCollection(offerPhotoNode.children[0], advert.offer.photos);
  // (advert.offer.photos.length !== 0) ? (offerPhotoNode.innerHTML = '', offerPhotoNode.appendChild(offerPhotos)) : offerPhotoNode.classList.add('hidden');
  const offerPhotoNode = newCard.querySelector('.popup__photos');
  let offerPhotos = {};
  (advert.offer.photos) ? (offerPhotos = createPhotoCollection(offerPhotoNode.children[0], advert.offer.photos), offerPhotoNode.innerHTML = '', offerPhotoNode.appendChild(offerPhotos)) : offerPhotoNode.classList.add('hidden');
  newCard.querySelector('.popup__avatar').src = advert.author.avatar;
  return newCard;
  // mapCanvas.appendChild(newCard);
};

const offers = getOffersArray(OFFERS_COUNT);

// offers.forEach(generateCard);

export { generateCard, offers, APARTMENTS };
