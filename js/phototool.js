import { offerForm } from './form.js';

const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
const IMG_WIDTH = 40;
const IMG_HEIGHT = 44;
const DEFAULT_AVATAR = 'img/muffin-grey.svg';

const avatarChooser = offerForm.querySelector('.ad-form__field input[type="file"]');
const avatarThumb = offerForm.querySelector('.ad-form-header__preview img');
const housingPhotoChooser = offerForm.querySelector('.ad-form__upload input[type="file"]');
const housingPhotoThumb = offerForm.querySelector('.ad-form__photo');


const showThumbnail = (photoSource, photoDestination) => {
  const file = photoSource.files[0];
  const fileName = file.name.toLowerCase();
  const fileTypeMatches = FILE_TYPES.some((ext) => ext === fileName.split('.').pop());
  if (fileTypeMatches) {
    const reader = new FileReader();
    reader.addEventListener('load', () => {
      photoDestination.src = reader.result;
    });
    reader.readAsDataURL(file);
  }
};

const createImgNode = (parentNode) => {
  parentNode.style.display = 'flex';
  parentNode.style.justifyContent = 'center';
  parentNode.style.alignItems = 'center';
  const imgNode = document.createElement('img');
  imgNode.width = IMG_WIDTH;
  imgNode.height = IMG_HEIGHT;
  imgNode.alt = 'Фотография жилья';
  if (parentNode.hasChildNodes()) {
    parentNode.innerHTML = '';
  }
  parentNode.appendChild(imgNode);
};

const onLoadAvatar = () => {
  showThumbnail(avatarChooser, avatarThumb);
};

const onLoadHousingPhoto = () => {
  createImgNode(housingPhotoThumb);
  showThumbnail(housingPhotoChooser, housingPhotoThumb.children[0]);
};

const resetAvatar = () => {
  avatarThumb.src = DEFAULT_AVATAR;
};

const resetHousingPhoto = () => {
  if (housingPhotoThumb.hasChildNodes()) {
    housingPhotoThumb.innerHTML = '';
  }
};

const resetFormPhoto = () => {
  resetAvatar();
  resetHousingPhoto();
};

avatarChooser.addEventListener('change', onLoadAvatar);
housingPhotoChooser.addEventListener('change', onLoadHousingPhoto);

export { resetFormPhoto };
