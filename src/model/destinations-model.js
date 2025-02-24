import { mockDestinations } from '../mock/mockDestinations';

export default class DestinationsModel {
  destinations = mockDestinations;

  getDestinations() {
    return this.destinations;
  }
}
