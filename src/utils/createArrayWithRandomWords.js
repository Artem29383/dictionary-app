function randomInteger(min, max) {
  return Math.round(min - 0.5 + Math.random() * (max - min + 1));
}

export function createArrayWithRandomWords(array, maxWords) {
  const newArray = [];
  let count = 0;
  const max = array.length - 1;
  if (maxWords > max) {
    // eslint-disable-next-line no-param-reassign
    maxWords = max;
  }
  if (max < maxWords) {
    // eslint-disable-next-line no-param-reassign
    maxWords = max;
  }
  while (count < maxWords) {
    const rand = randomInteger(0, max);
    // eslint-disable-next-line no-empty
    if (newArray.indexOf(array[rand]) !== -1) {
    } else {
      newArray.push(array[rand]);
      count += 1;
    }
  }
  return newArray;
}
