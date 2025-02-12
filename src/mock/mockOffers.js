import { getRandomInteger, getRandomArrayElement } from '../utils';
import { EVENT_TYPE_VALUES, EVENT_TYPE_OFFERS } from '../const';

const createOffer = () => ({
  id: getRandomInteger(1, 100),
  title: getRandomArrayElement(EVENT_TYPE_OFFERS),
  price: getRandomInteger(10, 100),
  //isActive: getRandomBoolean,
});

const createOffers = (array) =>
  Array.from({ length: array.length }).map((_, index) => ({
    type: array[index],
    offers: Array.from({ length: getRandomInteger(0, 5) }, createOffer),
  }));

const mockOffersByType = createOffers(EVENT_TYPE_VALUES);

export { mockOffersByType };
