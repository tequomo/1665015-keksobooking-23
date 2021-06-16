import { getRandomInteger, getRandomFloat, getRandomLengthArray } from './util.js';

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

const OFFER_TITLES = [
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

const LIVING_TYPES = [
  'palace',
  'flat',
  'house',
  'bungalow',
  'hotel',
];

const CHECK_TIMES = [
  '12:00',
  '13:00',
  '14:00',
];

const ALL_OFFER_FEATURES = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner',
];

const OFFER_DESCRIPTIONS = [
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

const ALL_OFFER_PHOTOS = [
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg',
];

const generateOffer = (currentIndex) => {

  const offerLattitude = getRandomFloat(LATITUDE_MIN, LATITUDE_MAX, PRECISE_COORDS);
  const offerLongitude = getRandomFloat(LONGITUDE_MIN, LONGITUDE_MAX, PRECISE_COORDS);

  return {
    author: {
      avatar: (currentIndex < AVATAR_COUNT_MAX - 1) ? `img/avatars/user0${(currentIndex + 1)}.png` : `img/avatars/user${(currentIndex + 1)}.png`,
    },
    offer: {
      title: OFFER_TITLES[getRandomInteger(0, OFFER_TITLES.length - 1)],
      address: `${offerLattitude}, ${offerLongitude}`,
      price: getRandomInteger(OFFER_PRICE_MIN, OFFER_PRICE_MAX),
      type: LIVING_TYPES[getRandomInteger(0, LIVING_TYPES.length - 1)],
      rooms: getRandomInteger(ROOM_COUNT_MIN, ROOM_COUNT_MAX),
      guests: getRandomInteger(GUESTS_MIN, GUESTS_MAX),
      checkin: CHECK_TIMES[getRandomInteger(0, CHECK_TIMES.length - 1)],
      checkout: CHECK_TIMES[getRandomInteger(0, CHECK_TIMES.length - 1)],
      features: getRandomLengthArray(ALL_OFFER_FEATURES),
      description: OFFER_DESCRIPTIONS[getRandomInteger(0, OFFER_DESCRIPTIONS.length - 1)],
      photos: getRandomLengthArray(ALL_OFFER_PHOTOS),
    },
    location: {
      lat: offerLattitude,
      lng: offerLongitude,
    },
  };
};

const getOffersArray = (amount) => new Array(amount).fill(null).map((_, index) => generateOffer(index));

export { OFFERS_COUNT, getOffersArray, generateOffer };