import { APARTMENTS } from './card.js';

const MIN_TITLE_LENGTH = 30;
const MAX_TITLE_LENGTH = 100;

const MIN_PRICE = {
  'Бунгало': 0,
  'Квартира': 1000,
  'Отель': 3000,
  'Дом': 5000,
  'Дворец': 10000,
};

const ROOMS_FOR_GUESTS = {
  1: [1],
  2: [1, 2],
  3: [1, 2, 3],
  100: [0],
};

const offerForm = document.querySelector('.ad-form');
const livingType = offerForm.querySelector('#type');
const livingPrice = offerForm.querySelector('#price');
const adTitle = offerForm.querySelector('#title');
const roomNumber = offerForm.querySelector('#room_number');
const guestsCapacity = offerForm.querySelector('#capacity');
const checkInTime = offerForm.querySelector('#timein');
const checkOutTime = offerForm.querySelector('#timeout');
const adFormFieldsets = offerForm.querySelectorAll('fieldset');

const deactivateAdForm = (form, nodes) => {
  form.classList.add('ad-form--disabled');
  nodes.forEach((node) => node.disabled = true);
};

const activateAdForm = (form, nodes) => {
  form.classList.remove('ad-form--disabled');
  nodes.forEach((node) => node.disabled = false);
};

const verifyTitleHandler = () => {
  const formTitle = event.currentTarget;
  let alertString = '';
  if (formTitle.value.length < MIN_TITLE_LENGTH) {
    alertString = `Заголовок объявления должен содержать не менее ${MIN_TITLE_LENGTH} символов. Еще осталось ${MIN_TITLE_LENGTH - formTitle.value.length}.`;
  }
  else if (MIN_TITLE_LENGTH <= formTitle.value.length <= MAX_TITLE_LENGTH) {
    alertString = '';
  }
  formTitle.setCustomValidity(alertString);
  formTitle.reportValidity();
};

const setCostValues = () => {
  livingPrice.placeholder = MIN_PRICE[APARTMENTS[livingType.value]];
  livingPrice.min = MIN_PRICE[APARTMENTS[livingType.value]];
};

const getValuesFromSelect = (parentNode, id) => {
  const selectValuesCollection = parentNode.querySelector(`#${id}`).options;
  const valuesArray = [];
  for (let i = 0; i < selectValuesCollection.length; i++) {
    valuesArray.push(selectValuesCollection[i].value);
  }
  return valuesArray;
};

const guests = getValuesFromSelect(offerForm, 'capacity').map((value) => Number(value));

const setGuestCapacity = (rooms) => {
  const guestsAvailableIndex = [];
  ROOMS_FOR_GUESTS[rooms].forEach((value) => {
    guestsAvailableIndex.push(guests[value]);
  });

  const guestsInitialIndex = guests.map((index) => guests.indexOf(index));
  const guestsDisabledIndex = guestsInitialIndex.filter((value) => !guestsAvailableIndex.includes(value));

  guestsDisabledIndex.forEach((value) => {
    guestsCapacity.options[value].disabled = true;
  });
  guestsAvailableIndex.forEach((value) => {
    guestsCapacity.options[value].disabled = false;
  });
  guestsCapacity.options[Math.min(...guestsAvailableIndex)].selected = true;
};

const synchronizeCheckTime = (synchronizedNode) => {
  synchronizedNode.value = event.currentTarget.value;
};

adTitle.addEventListener('input', verifyTitleHandler);

livingType.addEventListener('change', setCostValues);

checkInTime.addEventListener('change', () => synchronizeCheckTime(checkOutTime));
checkOutTime.addEventListener('change', () => synchronizeCheckTime(checkInTime));

roomNumber.addEventListener('change', () => setGuestCapacity(roomNumber.value));

document.addEventListener('DOMContentLoaded', () => {
  livingPrice.placeholder = MIN_PRICE[APARTMENTS[livingType.value]];
  livingPrice.min = MIN_PRICE[APARTMENTS[livingType.value]];
  setGuestCapacity(roomNumber.value);
}, { once: true });

export { deactivateAdForm, activateAdForm, offerForm, adFormFieldsets };
