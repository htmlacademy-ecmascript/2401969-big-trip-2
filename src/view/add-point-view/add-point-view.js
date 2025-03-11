import AbstractView from '../../framework/view/abstract-view.js';
import { createAddPointTemplate } from './111.js';

const BLANK_POINT = {
  basePrice: 0,
  dateFrom: '',
  dateTo: '',
  destination: {},
  type: 'flight',
  offers: [],
};

export default class AddPointView extends AbstractView {
  #point = null;
  #destinations = null;
  #offers = null;
  constructor({ point = BLANK_POINT,destinations, offers }) {
    super();
    this.#point = point;
    this.#destinations = destinations;
    this.#offers = offers;
  }

  get template() {
    return createAddPointTemplate(
      this.#point,
      this.#destinations,
      this.#offers,
    );
  }
}

