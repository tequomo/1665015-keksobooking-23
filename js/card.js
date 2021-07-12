const APARTMENTS = {
  'flat': 'Квартира',
  'bungalow': 'Бунгало',
  'house': 'Дом',
  'palace': 'Дворец',
  'hotel': 'Отель',
};

const cardTemplate = document.querySelector('#card').content.querySelector('.popup');

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

const createPhotoCollection = (linkCollection, containerNode) => {
  const photoCollection = document.createDocumentFragment();
  linkCollection.forEach((link) => {
    const collectionItem = containerNode.cloneNode(true);
    collectionItem.src = link;
    photoCollection.appendChild(collectionItem);
  });
  return photoCollection;
};

const fillDataNode = (data, node, contentFunc) => {
  if (data) {
    const filledNode = contentFunc(data, node.children[0]);
    node.innerHTML = '';
    node.appendChild(filledNode);
  }
  else {
    node.innerHTML = '';
    node.classList.add('hidden');
  }
};

const fillTextNode = (text, node) => {
  if (text) {
    node.textContent = text;
  }
  else {
    node.textContent = '';
    node.classList.add('hidden');
  }
};

const generateCard = (advert) => {
  const newCard = cardTemplate.cloneNode(true);
  newCard.querySelector('.popup__title').textContent = advert.offer.title;
  newCard.querySelector('.popup__text--address').textContent = advert.offer.address;
  newCard.querySelector('.popup__text--price').innerHTML = `${advert.offer.price}<span> ₽/ночь</span>`;
  newCard.querySelector('.popup__type').textContent = APARTMENTS[advert.offer.type];
  newCard.querySelector('.popup__text--capacity').textContent = generateCapacityText(advert.offer.rooms, advert.offer.guests);
  newCard.querySelector('.popup__text--time').textContent = `Заезд после ${advert.offer.checkin}, выезд до ${advert.offer.checkout}`;
  fillDataNode(advert.offer.features, newCard.querySelector('.popup__features'), createFeaturesList);
  fillTextNode(advert.offer.description, newCard.querySelector('.popup__description'));
  fillDataNode(advert.offer.photos, newCard.querySelector('.popup__photos'), createPhotoCollection);
  newCard.querySelector('.popup__avatar').src = advert.author.avatar;
  return newCard;
};

export { generateCard, APARTMENTS };
