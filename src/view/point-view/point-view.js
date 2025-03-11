import AbstractView from '../../framework/view/abstract-view.js';
import { createPointTemplate } from './point-view-template.js';

export default class PointView extends AbstractView {
  #point = null;
  #destinations = null;
  #offers = null;
  #handleEditClick = null;
  #handleFavoriteClick = null;

  constructor({ point, destinations, offers, onEditClick, onFavoriteClick }) {
    super();
    this.#point = point;
    this.#destinations = destinations;
    this.#offers = offers;
    this.#handleEditClick = onEditClick;
    this.element
      .querySelector('.event__rollup-btn')
      .addEventListener('click', this.#onEditClick);
    this.#handleFavoriteClick = onFavoriteClick;
    this.element.querySelector('.event__favorite-btn').addEventListener('click', this.#onFavoriteClick);
  }

  #onEditClick = (evt) => {
    evt.preventDefault();
    this.#handleEditClick();
  };

  #onFavoriteClick = (evt) => {
    evt.preventDefault();
    this.#handleFavoriteClick();
  };

  get template() {
    return createPointTemplate(this.#point, this.#destinations, this.#offers);
  }
}
