const filterForm = document.querySelector('.map__filters');
const filterFormFieldsets = filterForm.querySelectorAll('fieldset');
const filterFormInputs = filterForm.querySelectorAll('select');


const deactivateFilters = (form, nodes, inputs) => {
  form.classList.add('map__filters--disabled');
  nodes.forEach((node) => node.disabled = true);
  inputs.forEach((node) => node.disabled = true);
};

const activateFilters = (form, nodes, inputs) => {
  form.classList.remove('map__filters--disabled');
  nodes.forEach((node) => node.disabled = false);
  inputs.forEach((node) => node.disabled = false);
};

export { deactivateFilters, activateFilters, filterForm, filterFormFieldsets, filterFormInputs };
