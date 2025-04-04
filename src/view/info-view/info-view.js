import AbstractView from '../../framework/view/abstract-view';
import { createInfoTemplate } from './info-view-template';

export default class InfoView extends AbstractView {
  #points = null;
  #destinations = null;
  #offers = null;

  constructor({ points, destinations, offers }) {
    super();
    this.#points = points;
    this.#destinations = destinations;
    this.#offers = offers;
  }

  get template() {
    return createInfoTemplate(this.#points, this.#destinations, this.#offers);
  }
}

