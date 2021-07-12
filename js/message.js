import { isEscEvent } from './utils/util.js';

const errorMessageTemplate = document.querySelector('#error').content.querySelector('.error');
const successMessageTemplate = document.querySelector('#success').content.querySelector('.success');

const hideErrorMessage = () => {
  const errorMessage = document.querySelector('.error');
  const errorButton = errorMessage.querySelector('.error__button');
  document.removeEventListener('click', onClickErrorMessage);
  document.removeEventListener('keydown', onEscErrorMessage);
  errorButton.removeEventListener('click', onClickErrorButton);
  errorMessage.remove();
};

function onClickErrorMessage (evt) {
  evt.preventDefault();
  hideErrorMessage();
}

function onClickErrorButton (evt) {
  evt.preventDefault();
  hideErrorMessage();
  evt.stopPropagation();
}

function onEscErrorMessage (evt) {
  if (isEscEvent(evt)) {
    hideErrorMessage();
  }
}

const showErrorMessage = () => {
  const errorMessage = errorMessageTemplate.cloneNode(true);
  const errorButton = errorMessage.querySelector('.error__button');
  document.body.appendChild(errorMessage);
  document.addEventListener('click', onClickErrorMessage);
  document.addEventListener('keydown', onEscErrorMessage);
  errorButton.addEventListener('click', onClickErrorButton);
};

const hideSuccessMessage = () => {
  const successMessage = document.querySelector('.success');
  successMessage.remove();
  document.removeEventListener('click', onClickSuccessMessage);
  document.removeEventListener('keydown', onEscSuccessMessage);
};

function onClickSuccessMessage (evt) {
  evt.preventDefault();
  hideSuccessMessage();
}

function onEscSuccessMessage (evt) {
  if (isEscEvent(evt)) {
    hideSuccessMessage();
  }
}

const showSuccessMessage = () => {
  const successMessage = successMessageTemplate.cloneNode(true);
  document.body.appendChild(successMessage);
  document.addEventListener('click', onClickSuccessMessage);
  document.addEventListener('keydown', onEscSuccessMessage);
};

const hideFetchErrorMessage = () => {
  const errorMessage = document.querySelector('.error');
  document.removeEventListener('keydown', onEscFetchErrorMessage);
  document.removeEventListener('click', onClickFetchErrorMessage);
  errorMessage.remove();
};

function onEscFetchErrorMessage (evt) {
  if (isEscEvent(evt)) {
    hideFetchErrorMessage();
  }
}

function onClickFetchErrorMessage (evt) {
  evt.preventDefault();
  hideFetchErrorMessage();
}

const showFetchErrorMessage = (error) => {
  const errorFetchMessage = errorMessageTemplate.cloneNode(true);
  errorFetchMessage.querySelector('.error__button').remove();
  const errorNode = document.createElement('p');
  errorNode.style.fontSize = '25px';
  errorNode.style.color = '#ffffff';
  errorNode.textContent = error;
  errorFetchMessage.appendChild(errorNode);
  errorFetchMessage.querySelector('.error__message').textContent = 'Данные с сервера не получены.';
  document.body.appendChild(errorFetchMessage);
  document.addEventListener('click', onClickFetchErrorMessage);
  document.addEventListener('keydown', onEscFetchErrorMessage);
};

export { showSuccessMessage, showErrorMessage, showFetchErrorMessage };
