import {
  getRandomInteger,
  getRandomArrayElement,
  getRandomBoolean,
} from '../utils';
import { DATES_FROM, DATES_TO } from '../const';
import { mockDestinations } from './mockDestinations';
import { mockOffersByType } from './mockOffers';

const createPoint = () => {
  const destinationElement = getRandomArrayElement(mockDestinations);
  const offersElement = getRandomArrayElement(mockOffersByType);
  const { offers, type } = offersElement;
  const aviableOffers = offers.map((item) => item.id);
  const selectedOffers = aviableOffers.slice(
    0,
    getRandomInteger(1, offers.length)
  );

  return {
    id: getRandomInteger(1, 100),
    basePrice: getRandomInteger(100, 1000),
    dateFrom: getRandomArrayElement(DATES_FROM),
    dateTo: getRandomArrayElement(DATES_TO),
    isFavorite: getRandomBoolean(),
    destination: destinationElement.id,
    type,
    offers: selectedOffers,
  };
};

export { createPoint };
