function getRandomIntInclusive(min, max) { // https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Math/random
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomInteger(minValue, maxValue) {

  minValue = (minValue < 0) ? Math.abs(minValue) : minValue;
  maxValue = (maxValue < 0) ? Math.abs(maxValue) : maxValue;

  if (minValue > maxValue) {
    const swap = minValue;
    minValue = maxValue;
    maxValue = swap;
  }

  if (minValue === maxValue) {
    return Math.ceil(minValue);
  }

  return getRandomIntInclusive(minValue, maxValue);
}

function getRandomFloat(minValue, maxValue, decimal) {

  minValue = (minValue < 0) ? Math.abs(minValue) : minValue;
  maxValue = (maxValue < 0) ? Math.abs(maxValue) : maxValue;

  if (minValue > maxValue) {
    const swap = minValue;
    minValue = maxValue;
    maxValue = swap;
  }

  if (minValue === maxValue) {
    return Number(minValue.toFixed(decimal));
  }

  return Number((Math.random() * (maxValue - minValue) + minValue).toFixed(decimal));
}

const AVATAR_COUNT_MAX = 10;
const OFFERS_COUNT = 10;
const LATITUDE_MIN = 35.65;
const LATITUDE_MAX = 35.70;
const LONGITUDE_MIN = 139.70;
const LONGITUDE_MAX = 139.80;
const PRECISE_COORDS = 5;
const OFFER_PRICE_MIN = 1000;
const OFFER_PRICE_MAX = 10000;
const ROOM_COUNT_MIN = 1;
const ROOM_COUNT_MAX = 6;
const GUESTS_MIN = 0;
const GUESTS_MAX = 5;

const offerTitles = [
  'Дешевле не найдете!',
  'Красивый вид из окна',
  'Лучшее место на земле!',
  'Уютное гнездышко',
  'Выгодное предложение',
  'Сдается недорого',
  'Отдых в городских трущобах',
  'Лучшее предложение месяца!',
  'Срочно на длительный период',
  'Скромное жилище',
];

const livingTypes = [
  'palace',
  'flat',
  'house',
  'bungalow',
  'hotel',
];

const checkTimes = [
  '12:00',
  '13:00',
  '14:00',
];

const allOfferFeatures = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner',
];

const offerDescriptions = [
  'Ежедневная уборка',
  'Уютное место',
  'Принесете печеньки - сутки бесплатно!',
  'К сожалению, с собаками нельзя - у нас злой кот((',
  'Отсрочка по оплате',
  'Сдается только на сезон',
  'Камин, кальян и джакузи - за отдельную плату',
  'Дополнительная опция - иглоукалывание комарами',
  'Можно жить бесплатно, только вещи не выносить',
  'Все включено, кроме того, что выключено',
];

const allOfferPhotos = [
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg',
];

function getRandomLengthArray(sourceArray) {
  const indexArray = [];
  const indexArrayLength = getRandomInteger(1, sourceArray.length);
  for (let i = 0; i < indexArrayLength; i++) {
    let randomIndex;
    do {
      randomIndex = getRandomInteger(1, sourceArray.length);
    }
    while (indexArray.includes(randomIndex));
    indexArray.push(randomIndex);
  }
  return indexArray.map((value) => sourceArray[value-1]);
}

const generateOffers = (ind) => {

  const offerLattitude = getRandomFloat(LATITUDE_MIN, LATITUDE_MAX, PRECISE_COORDS);
  const offerLongitude = getRandomFloat(LONGITUDE_MIN, LONGITUDE_MAX, PRECISE_COORDS);

  return {
    author: {
      avatar: (ind < AVATAR_COUNT_MAX-1) ? `img/avatars/user0${(ind + 1)}.png` : `img/avatars/user${(ind + 1)}.png`,
    },
    offer: {
      title: offerTitles[getRandomInteger(0, offerTitles.length-1)],
      address: `${offerLattitude  }, ${  offerLongitude}`,
      price: getRandomInteger(OFFER_PRICE_MIN, OFFER_PRICE_MAX),
      type: livingTypes[getRandomInteger(0, livingTypes.length-1)],
      rooms: getRandomInteger(ROOM_COUNT_MIN, ROOM_COUNT_MAX),
      guests: getRandomInteger(GUESTS_MIN, GUESTS_MAX),
      checkin: checkTimes[getRandomInteger(0, checkTimes.length-1)],
      checkout: checkTimes[getRandomInteger(0, checkTimes.length-1)],
      features: getRandomLengthArray(allOfferFeatures),
      description: offerDescriptions[getRandomInteger(0, offerDescriptions.length-1)],
      photos: getRandomLengthArray(allOfferPhotos),
    },
    location: {
      lat: offerLattitude,
      lng: offerLongitude,
    },
  };
};

const offers = new Array(OFFERS_COUNT).fill(null).map((offer, index) => generateOffers(index));

offers;
