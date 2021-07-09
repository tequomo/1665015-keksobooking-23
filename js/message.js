import { isEscEvent } from './util.js';

const errorMessageTemplate = document.querySelector('#error').content.querySelector('.error');
const successMessageTemplate = document.querySelector('#success').content.querySelector('.success');

const hideErrorMessage = () => {
  const errorMessage = document.querySelector('.error');
  document.removeEventListener('click', onClickErrorMessage);
  document.removeEventListener('keydown', onEscErrorMessage);
  const errorButton = document.querySelector('.error__button');
  errorButton.removeEventListener('click', onClickErrorButton);
  errorMessage.remove();
};

const onClickErrorMessage = (evt) => {
  evt.preventDefault();
  hideErrorMessage();
};

const onClickErrorButton = (evt) => {
  evt.preventDefault();
  hideErrorMessage();
  evt.stopPropagation();
};

const onEscErrorMessage = (evt) => {
  if (isEscEvent(evt)) {
    hideErrorMessage();
  }
};

const showErrorMessage = () => {
  const errorMessage = errorMessageTemplate.cloneNode(true);
  document.body.insertAdjacentElement('beforeend', errorMessage);
  document.addEventListener('click', onClickErrorMessage);
  document.addEventListener('keydown', onEscErrorMessage);
  const errorButton = errorMessage.querySelector('.error__button');
  errorButton.addEventListener('click', onClickErrorButton);
};

const hideSuccessMessage = () => {
  const successMessage = document.querySelector('.success');
  document.removeEventListener('click', onClickSuccessMessage);
  document.removeEventListener('keydown', onEscSuccessMessage);
  successMessage.remove();
};

const onClickSuccessMessage = (evt) => {
  evt.preventDefault();
  hideSuccessMessage();
};

const onEscSuccessMessage = (evt) => {
  if (isEscEvent(evt)) {
    hideSuccessMessage();
  }
};

const showSuccessMessage = () => {
  const successMessage = successMessageTemplate.cloneNode(true);
  document.body.insertAdjacentElement('beforeend', successMessage);
  document.addEventListener('click', onClickSuccessMessage);
  document.addEventListener('keydown', onEscSuccessMessage);
};
const onClickFetchErrorMessage = (evt) => {
  evt.preventDefault();
  hideFetchErrorMessage();
};

const onEscFetchErrorMessage = (evt) => {
  if (isEscEvent(evt)) {
    hideFetchErrorMessage();
  }
};

const showFetchErrorMessage = (error) => {
  const errorFetchMessage = errorMessageTemplate.cloneNode(true);
  errorFetchMessage.querySelector('.error__button').remove();
  const errorNode = document.createElement('p');
  errorNode.style.fontSize = '25px';
  errorNode.style.color = '#ffffff';
  errorNode.textContent = error;
  errorFetchMessage.insertAdjacentElement('beforeend', errorNode);
  errorFetchMessage.querySelector('.error__message').textContent = 'Данные с сервера не получены.';
  document.body.insertAdjacentElement('beforeend', errorFetchMessage);
  document.addEventListener('click', onClickFetchErrorMessage);
  document.addEventListener('keydown', onEscFetchErrorMessage);
};

const hideFetchErrorMessage = () => {
  const errorMessage = document.querySelector('.error');
  document.removeEventListener('click', onClickFetchErrorMessage);
  document.removeEventListener('keydown', onEscFetchErrorMessage);
  errorMessage.remove();
};

export { showSuccessMessage, showErrorMessage, showFetchErrorMessage };
