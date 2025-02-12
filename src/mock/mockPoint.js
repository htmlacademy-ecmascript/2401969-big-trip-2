import {
  getRandomInteger,
  getRandomArrayElement,
  getRandomBoolean,
} from '../utils';
import { mockDestinations } from './mockDestinations';
import { mockOffersByType } from './mockOffers';

const createPoint = () => {
  const destinationElement = getRandomArrayElement(mockDestinations);
  const offersElement = getRandomArrayElement(mockOffersByType);
  const { offers } = offersElement;
  const aviableOffers = offers.map((item) => item.id);
  const checkedOffers = aviableOffers.slice(
    0,
    getRandomInteger(1, offers.length)
  );

  return {
    id: getRandomInteger(1, 100),
    basePrice: getRandomInteger(100, 1000),
    dateFrom: '2024-02-02T21:42:04.116Z',
    dateTo: '2024-03-02T21:42:04.116Z',
    favorite: getRandomBoolean(),
    destination: destinationElement.id,
    type: offersElement.type,
    offers: checkedOffers,
  };
};

export { createPoint };
