const filterForm = document.querySelector('.map__filters');
const filterFormFieldsets = filterForm.querySelectorAll('fieldset');
const filterFormInputs = filterForm.querySelectorAll('select');
const filterFeaturesSet = filterForm.querySelector('.map__features');
const filterFeatures = filterForm.querySelectorAll('.map__checkbox');

const DEFAULT_PARAMETER = 'any';


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

filterFeaturesSet.addEventListener('change', () => {
  const selectedFeatures = [];
  filterFeatures.forEach((item) => {
    if (item.checked) {
      selectedFeatures.push(item.value);
    }
  });
  // console.log(selectedFeatures);
});

filterForm.addEventListener('change', (event) => {
  // const housingType = filterForm.querySelector('#housing-type');
  if (event.target.matches('select[id="housing-type"]')) {
    // console.log((event.target.value === DEFAULT_PARAMETER) ? true : event.target.value);
    return (event.target.value === DEFAULT_PARAMETER) ? true : event.target.value;
  }
});

// function inArray(array) {
//   return (x) => array.includes(x);
// }

// function inBetween(a, b) {
//   return (x) => (x >= a && x <= b);
// }

// filterFeaturesSet.addEventListener('change', (event) => {
//   if (event.target.checked) {
//     console.log('checked');
//   } else {
//     console.log('not checked');
//   }
// });

export { deactivateFilters, activateFilters, filterForm, filterFormFieldsets, filterFormInputs };
