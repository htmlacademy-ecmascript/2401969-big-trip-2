import dayjs from 'dayjs';
import durationPlugin from 'dayjs/plugin/duration';
dayjs.extend(durationPlugin);
import isBetween from 'dayjs/plugin/isBetween';
dayjs.extend(isBetween);
import { FilterType } from './const';

const DATE_FORMAT = 'MMM D';

const humanizeDate = (dueDate) =>
  dueDate ? dayjs(dueDate).format(DATE_FORMAT) : '';

const formatWithLeadingZero = (value) => String(value).padStart(2, '0');

function getDuration(dateFrom, dateTo) {
  const date1 = dayjs(dateTo);
  const date2 = dayjs(dateFrom);

  const days = date1.diff(date2, 'day');
  const hours = date1.diff(date2.add(days, 'day'), 'hour');
  const minutes = date1.diff(date2.add(days, 'day').add(hours, 'hour'), 'minute');

  const formattedDays = days ? `${formatWithLeadingZero(days)}D` : '';
  const formattedHours = hours || days ? `${formatWithLeadingZero(hours)}H` : '00H';
  const formattedMinutes = minutes || hours || days ? `${formatWithLeadingZero(minutes)}M` : '00M';

  return `${formattedDays} ${formattedHours} ${formattedMinutes}`.trim();
}

const capitalize = (string) => string[0].toUpperCase() + string.slice(1);

const getRandomInteger = (min, max) =>
  Math.floor(Math.random() * (max - min + 1) + min);

const getRandomArrayElement = (elements) =>
  elements[Math.floor(Math.random() * elements.length)];

const getRandomBoolean = () => Math.random() < 0.5;

const isEscKey = (evt) => evt.key === 'Escape';

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

function isDatesEqual(dateA, dateB) {
  return (dateA === null && dateB === null) || dayjs(dateA).isSame(dateB, 'D');
}

const filter = {
  [FilterType.EVERYTHING]: (points) => points,
  [FilterType.FUTURE]: (points) =>
    points.filter((point) => isDatesPlanned(point.dateFrom)),
  [FilterType.PRESENT]: (points) =>
    points.filter((point) => isDatesCurrent(point.dateFrom, point.dateTo)),
  [FilterType.PAST]: (points) =>
    points.filter((point) => isDatesPassed(point.dateTo)),
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
  const weight = getWeightForNullDate(pointA.dateFrom, pointB.dateFrom);

  return weight ?? dayjs(pointA.dateFrom).diff(dayjs(pointB.dateFrom));
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
  isDatesEqual,
  calculatesTravelTime,
  filter,
  sortPointByDate,
  sortPointByPrice,
  sortPointByTime,
};
