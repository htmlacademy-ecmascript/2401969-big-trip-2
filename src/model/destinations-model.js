import { mockDestinations } from '../mock/mockDestinations';

export default class DestinationsModel {
  #destinations = mockDestinations;

  get destinations() {
    return this.#destinations;
  }

  get newDestination() {
    return {
      id: null,
      name: '',
      description: '',
      pictures: []
    };
  }
}
