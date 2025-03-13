import dayjs from 'dayjs';
import durationPlugin from 'dayjs/plugin/duration';
dayjs.extend(durationPlugin);
import isBetween from 'dayjs/plugin/isBetween';
dayjs.extend(isBetween);
import { FilterType } from './const';

const DATE_FORMAT = 'MMM D';

const humanizeDate = (dueDate) =>
  dueDate ? dayjs(dueDate).format(DATE_FORMAT) : '';

const getDuration = (start, end) => {
  const duration = dayjs.duration(dayjs(end).diff(dayjs(start)));
  if (duration.days()) {
    return duration.format('DD[d] HH[h] mm[m]');
  }
  if (duration.hours()) {
    return duration.format('HH[h] mm[m]');
  }

  return duration.format('mm[m]');
};

const capitalize = (string) => string[0].toUpperCase() + string.slice(1);

const getRandomInteger = (min, max) =>
  Math.floor(Math.random() * (max - min + 1) + min);

const getRandomArrayElement = (elements) =>
  elements[Math.floor(Math.random() * elements.length)];

const getRandomBoolean = () => Math.random() < 0.5;

const isEscKey = (evt) => evt.key === 'Escape';

function updateItem(items, update) {
  return items.map((item) => item.id === update.id ? update : item);
}

function isDatesPassed(dueDate) {
  const now = dayjs();
  return dayjs(dueDate).isBefore(now, 'day');
}

function isDatesPlanned(dueDate) {
  const now = dayjs();
  return dayjs(dueDate).isAfter(now, 'day');
}

function isDatesCurrent(startDate, endDate) {
  const now = dayjs();
  return now.isBetween(dayjs(startDate), dayjs(endDate), 'day', '[]');
}

const filters = {
  [FilterType.EVERYTHING]: (points) => points,
  [FilterType.FUTURE]: (points) =>
    points.filter((point) => isDatesPlanned(point.dateTo)),
  [FilterType.PRESENT]: (points) =>
    points.filter((point) => isDatesCurrent(point.dateFrom, point.dateTo)),
  [FilterType.PAST]: (points) =>
    points.filter((point) => isDatesPassed(point.dateFrom)),
};

function getWeightForNullDate(dateA, dateB) {
  if (dateA === null && dateB === null) {
    return 0;
  }

  if (dateA === null) {
    return 1;
  }

  if (dateB === null) {
    return -1;
  }

  return null;
}

function calculatesTravelTime(dateFrom, dateTo) {
  const date1 = dayjs(dateTo);
  return date1.diff(dateFrom, 'minute');
}

function sortPointByDate(pointA, pointB) {
  const weight = getWeightForNullDate(pointA.dateTo, pointB.dateTo);

  return weight ?? dayjs(pointB.dateTo).diff(dayjs(pointA.dateTo));
}

function sortPointByPrice(pointA, pointB) {
  return pointB.basePrice - pointA.basePrice;
}

function sortPointByTime(pointA, pointB) {
  const durationA = calculatesTravelTime(pointA.dateFrom, pointA.dateTo);
  const durationB = calculatesTravelTime(pointB.dateFrom, pointB.dateTo);
  return durationB - durationA;
}

export {
  isEscKey,
  capitalize,
  getRandomInteger,
  getRandomArrayElement,
  getRandomBoolean,
  humanizeDate,
  getDuration,
  calculatesTravelTime,
  filters,
  updateItem,
  sortPointByDate,
  sortPointByPrice,
  sortPointByTime,
};
