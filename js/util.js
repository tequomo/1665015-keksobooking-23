const getRandomIntInclusive = (min, max) => { // https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Math/random
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const getRandomInteger = (minValue, maxValue) => {

  minValue = (minValue < 0) ? Math.abs(minValue) : minValue;
  maxValue = (maxValue < 0) ? Math.abs(maxValue) : maxValue;

  if (minValue > maxValue) {
    const swap = minValue;
    minValue = maxValue;
    maxValue = swap;
  }

  if (minValue === maxValue) {
    return Math.ceil(minValue);
  }

  return getRandomIntInclusive(minValue, maxValue);
};

const getRandomFloat = (minValue, maxValue, decimal) => {

  minValue = (minValue < 0) ? Math.abs(minValue) : minValue;
  maxValue = (maxValue < 0) ? Math.abs(maxValue) : maxValue;

  if (minValue > maxValue) {
    const swap = minValue;
    minValue = maxValue;
    maxValue = swap;
  }

  if (minValue === maxValue) {
    return Number(minValue.toFixed(decimal));
  }

  return Number((Math.random() * (maxValue - minValue) + minValue).toFixed(decimal));
};

const shuffleArray = (array) => {
  for (let currentIndex = array.length - 1; currentIndex > 0; currentIndex--) {
    const randomIndex = Math.floor(Math.random() * (currentIndex + 1));
    [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
  }
};

const getRandomLengthArray = (sourceArray) => {
  shuffleArray(sourceArray);
  return sourceArray.slice(0, getRandomInteger(1, sourceArray.length));
};

const isEscEvent = (evt) => evt.key === 'Escape' || evt.key === 'Esc';

const inBetween = (a, b) => (value) => (value >= a && value < b);

export { getRandomInteger, getRandomFloat, getRandomLengthArray, isEscEvent, inBetween };
