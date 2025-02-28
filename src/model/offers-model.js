import { mockOffersByType } from '../mock/mockOffers';

export default class OffersModel {
  #offers = mockOffersByType;

  get offers() {
    return this.#offers;
  }
}
