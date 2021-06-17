const deactivateForms = function () {
  const adForm = document.querySelector('.ad-form');
  const adFormFieldsets = adForm.querySelectorAll('fieldset');
  adForm.classList.add('ad-form--disabled');
  adFormFieldsets.forEach((fieldsetNode) => fieldsetNode.disabled = true);

  const mapFilterForm = document.querySelector('.map__filters');
  const mapFilterFormFieldsets = mapFilterForm.querySelectorAll('fieldset');
  const mapFilterFormInputs = mapFilterForm.querySelectorAll('select');
  mapFilterForm.classList.add('map__filters--disabled');
  mapFilterFormFieldsets.forEach((fieldsetNode) => fieldsetNode.disabled = true);
  mapFilterFormInputs.forEach((inputNode) => inputNode.disabled = true);
};

deactivateForms();

const activateForms = function () {
  const adForm = document.querySelector('.ad-form');
  const adFormFieldsets = adForm.querySelectorAll('fieldset');
  adForm.classList.remove('ad-form--disabled');
  adFormFieldsets.forEach((fieldsetNode) => fieldsetNode.disabled = false);

  const mapFilterForm = document.querySelector('.map__filters');
  const mapFilterFormFieldsets = mapFilterForm.querySelectorAll('fieldset');
  const mapFilterFormInputs = mapFilterForm.querySelectorAll('select');
  mapFilterForm.classList.remove('map__filters--disabled');
  mapFilterFormFieldsets.forEach((fieldsetNode) => fieldsetNode.disabled = false);
  mapFilterFormInputs.forEach((inputNode) => inputNode.disabled = false);
};

activateForms();
