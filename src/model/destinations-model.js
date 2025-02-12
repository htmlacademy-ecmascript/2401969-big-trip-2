import { mockDestinations } from '../mock/mockDestinations';

export default class DestinationModel {
  destinations = mockDestinations;

  getDestination() {
    return this.destinations;
  }

  getDestinationsById(id) {
    return this.getDestinations().find((item) => item.id === id);
  }
}
