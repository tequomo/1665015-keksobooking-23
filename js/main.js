function getRandomIntInclusive(min, max) { // https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Math/random
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomInteger(minValue, maxValue) {

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
}

getRandomInteger(8, 15);

function getRandomFloat(minValue, maxValue, decimal) {

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
}

getRandomFloat(11.349761, 32.540984, 4);
