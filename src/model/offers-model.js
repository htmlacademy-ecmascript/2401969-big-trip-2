import { mockOffersByType } from '../mock/mockOffers';

export default class OffersModel {
  offers = mockOffersByType;

  getOffers() {
    return this.offers;
  }
}
