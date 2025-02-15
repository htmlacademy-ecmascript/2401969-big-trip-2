import { mockDestinations } from '../mock/mockDestinations';

export default class DestinationsModel {
  destinations = mockDestinations;

  getDestinations() {
    return this.destinations;
  }

  getDestinationById(id) {
    return this.getDestinations().find((item) => item.id === id);
  }
}
