import { mockOffersByType } from '../mock/mockOffers';

export default class OffersModel {
  offers = mockOffersByType;

  getOffers() {
    return this.offers;
  }

  getOffersOfType(type) {
    return this.getOffers().find((offer) => offer.type === type);
  }

  getOffersById(type, itemsId) {
    const offersOfType = this.getOffersOfType(type);
    return offersOfType.offers.filter((item) => itemsId.includes(item.id));
  }
}
