import { sendOfferData } from './api.js';
import { apartments } from './card.js';
import { setInitialState } from './state.js';

const MIN_TITLE_LENGTH = 30;
const MAX_TITLE_LENGTH = 100;

const minPriceHousing = {
  'Бунгало': 0,
  'Квартира': 1000,
  'Отель': 3000,
  'Дом': 5000,
  'Дворец': 10000,
};

const roomsForGuests = {
  1: [1],
  2: [1, 2],
  3: [1, 2, 3],
  100: [0],
};

const ErrorBorder = {
  WIDTH: '2px',
  COLOR: '#FF0000',
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
const adFormResetButton = offerForm.querySelector('.ad-form__reset');
const requiredInputs = offerForm.querySelectorAll('input:required');


const deactivateAdForm = (form, nodes) => {
  form.classList.add('ad-form--disabled');
  nodes.forEach((node) => node.disabled = true);
};

const activateAdForm = (form, nodes) => {
  form.classList.remove('ad-form--disabled');
  nodes.forEach((node) => node.disabled = false);
};

const setBorderColor = (checkNode) => {
  if (checkNode.validity.valid) {
    if (checkNode.hasAttribute('style'))
    {
      checkNode.removeAttribute('style');
    }
  }
  else {
    checkNode.style.borderWidth = ErrorBorder.WIDTH;
    checkNode.style.borderColor = ErrorBorder.COLOR;
  }
};

const colorizeInput = (event) => {
  const watchedNode = event.currentTarget;
  setBorderColor(watchedNode);
};

const verifyTitle = (event) => {
  const formTitle = event.currentTarget;
  let alertString = '';
  colorizeInput(event);
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
  livingPrice.placeholder = minPriceHousing[apartments[livingType.value]];
  livingPrice.min = minPriceHousing[apartments[livingType.value]];
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

const setGuestCapacity = (selectedRooms) => {
  const rooms = (selectedRooms) ? selectedRooms : event.currentTarget.value;
  const guestsAvailableIndex = [];
  roomsForGuests[rooms].forEach((value) => {
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

const synchronizeCheckTime = (event, synchronizedNode) => {
  synchronizedNode.value = event.currentTarget.value;
};

const onInputTitle = () => verifyTitle(event);
const onSelectInTime = () => synchronizeCheckTime(event, checkOutTime);
const onSelectOutTime = () => synchronizeCheckTime(event, checkInTime);
const onSelectHousing = () => setCostValues();
const onSelectRoomsNumber = () => setGuestCapacity();
const onInputLivingPrice = () => colorizeInput(event);

const setInitialFormData = () => {
  setCostValues();
  setGuestCapacity(roomNumber.value);
};

adTitle.addEventListener('input', onInputTitle);
checkInTime.addEventListener('change', onSelectInTime);
checkOutTime.addEventListener('change', onSelectOutTime);
livingType.addEventListener('change', onSelectHousing);
roomNumber.addEventListener('change', onSelectRoomsNumber);
livingPrice.addEventListener('input', onInputLivingPrice);

offerForm.addEventListener('change', () => {
  requiredInputs.forEach((node) => {
    setBorderColor(node);
  });
});


offerForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const offerFormData = new FormData(event.target);
  sendOfferData(offerFormData, setInitialState);
});

adFormResetButton.addEventListener('click', (event) => {
  event.preventDefault();
  setInitialState();
});

document.addEventListener('DOMContentLoaded', () => {
  setInitialFormData();
}, { once: true });

export { deactivateAdForm, activateAdForm, setInitialFormData, offerForm, adFormFieldsets };
