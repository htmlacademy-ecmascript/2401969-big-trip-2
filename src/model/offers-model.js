import { mockOffersByType } from '../mock/mockOffers';

export default class OffersModel {
  offers = mockOffersByType;

  getOffers() {
    return this.offers;
  }

  getOffersOfType(type) {
    return this.getOffers().find((offer) => offer.type === type);
  }

  getOffersById(itemsId) {
    return this.getOffersOfType.offers.filter((item) =>
      itemsId.includes(item.id)
    );
  }
}
