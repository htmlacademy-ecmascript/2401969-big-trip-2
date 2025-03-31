//import { mockDestinations } from '../mock/mockDestinations';
import Observable from '../framework/observable.js';

export default class DestinationsModel extends Observable{
  #pointsApiService = null;
  #destinations = [];

  constructor({pointsApiService}) {
    super();
    this.#pointsApiService = pointsApiService;
  }

  async init() {
    try {
      this.#destinations = await this.#pointsApiService.destinations;
    } catch(err) {
      this.#destinations = [];
    }
  }

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
