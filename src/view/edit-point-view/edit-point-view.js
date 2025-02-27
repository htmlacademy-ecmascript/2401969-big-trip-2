import AbstractView from '../../framework/view/abstract-view.js';
import { createEditPointTemplate } from './edit-point-view-template.js';

export default class EditPointView extends AbstractView {
  #point = null;
  #destinations = null;
  #offers = null;
  #onSubmit = null;
  constructor({ point, destinations, offers, onSubmit }) {
    super();
    this.#point = point;
    this.#destinations = destinations;
    this.#offers = offers;
    this.#onSubmit = onSubmit;
    this.element.addEventListener('submit', this.#onCloseEditClick);
    this.element.addEventListener('reset', this.#onCloseEditClick);
    this.element
      .querySelector('.event__rollup-btn')
      .addEventListener('click', this.#onCloseEditClick);
  }

  #onCloseEditClick = (evt) => {
    evt.preventDefault();
    this.#onSubmit();
  };

  get template() {
    return createEditPointTemplate(
      this.#point,
      this.#destinations,
      this.#offers
    );
  }
}
