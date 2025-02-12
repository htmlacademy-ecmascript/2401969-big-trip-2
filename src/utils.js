import dayjs from 'dayjs';

const DATE_FORMAT = 'DD/MM/YYYY';

const humanizeTaskDueDate = (dueDate) =>
  dueDate ? dayjs(dueDate).format(DATE_FORMAT) : '';

const getRandomInteger = (min, max) =>
  Math.floor(Math.random() * (max - min + 1) + min);

const getRandomArrayElement = (elements) =>
  elements[Math.floor(Math.random() * elements.length)];

const getRandomBoolean = () => Math.random() < 0.5;

export {
  getRandomInteger,
  getRandomArrayElement,
  getRandomBoolean,
  humanizeTaskDueDate,
};
