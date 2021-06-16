const cardTemplateSource = document.querySelector('#card').content;
const cardTemplate = cardTemplateSource.querySelector('.popup');
const mapCanvas = document.querySelector('#map-canvas');
const cardsBlock = document.createDocumentFragment();

const generateCard = function () {
  const newCard = cardTemplate.cloneNode(true);
  mapCanvas.appendChild(newCard);
};

cardsBlock;

export { generateCard };
