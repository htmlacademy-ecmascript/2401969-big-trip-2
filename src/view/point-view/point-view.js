import AbstractView from '../../framework/view/abstract-view.js';
import { createPointTemplate } from './point-view-template.js';

export default class PointView extends AbstractView {
  #point = null;
  #destinations = null;
  #offers = null;
  #onClick = null;
  constructor({ point, destinations, offers, onClick }) {
    super();
    this.#point = point;
    this.#destinations = destinations;
    this.#offers = offers;
    this.#onClick = onClick;
    this.element
      .querySelector('.event__rollup-btn')
      .addEventListener('click', this.#onOpenEditClick);
  }

  #onOpenEditClick = (evt) => {
    evt.preventDefault();
    this.#onClick();
  };

  get template() {
    return createPointTemplate(this.#point, this.#destinations, this.#offers);
  }
}
