const deactivateFilters = () => {
  const mapFilterForm = document.querySelector('.map__filters');
  const mapFilterFormFieldsets = mapFilterForm.querySelectorAll('fieldset');
  const mapFilterFormInputs = mapFilterForm.querySelectorAll('select');
  mapFilterForm.classList.add('map__filters--disabled');
  mapFilterFormFieldsets.forEach((fieldsetNode) => fieldsetNode.disabled = true);
  mapFilterFormInputs.forEach((inputNode) => inputNode.disabled = true);
};

const activateFilters = () => {
  const mapFilterForm = document.querySelector('.map__filters');
  const mapFilterFormFieldsets = mapFilterForm.querySelectorAll('fieldset');
  const mapFilterFormInputs = mapFilterForm.querySelectorAll('select');
  mapFilterForm.classList.remove('map__filters--disabled');
  mapFilterFormFieldsets.forEach((fieldsetNode) => fieldsetNode.disabled = false);
  mapFilterFormInputs.forEach((inputNode) => inputNode.disabled = false);
};

export { deactivateFilters, activateFilters };
