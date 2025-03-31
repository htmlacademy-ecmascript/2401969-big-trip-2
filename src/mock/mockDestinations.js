import { getRandomInteger, getRandomArrayElement } from '../utils';
import {
  DESTINATION_VALUES,
  DESTINATION_DESCRIPTIONS,
  PHOTO_DESCRIPTIONS,
} from '../const';

const createPhotoUrl = (index) =>
  `https://loremflickr.com/248/152?random=${index}`;

const createPhoto = () => ({
  src: createPhotoUrl(getRandomInteger(1, 10)),
  description: getRandomArrayElement(PHOTO_DESCRIPTIONS),
});

const createDestinations = (array) =>
  Array.from({ length: array.length }).map((_, index) => ({
    id: getRandomInteger(1, 100),
    name: array[index],
    description: getRandomArrayElement(DESTINATION_DESCRIPTIONS),
    pictures: Array.from({ length: getRandomInteger(0, 5) }, createPhoto),
  }));

const mockDestinations = createDestinations(DESTINATION_VALUES);

export { mockDestinations };
