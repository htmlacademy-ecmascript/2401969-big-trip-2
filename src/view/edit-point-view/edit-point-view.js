import AbstractStatefulView from '../../framework/view/abstract-stateful-view.js';
import { createEditPointTemplate } from './edit-point-view-template.js';

export default class EditPointView extends AbstractStatefulView {
  //#point = null;
  #destinations = null;
  #offers = null;
  #handleSubmit = null;
  #handleEditClose = null;

  constructor({ point, destinations, offers, onSubmit, onEditClose }) {
    super();
    //this.#point = point;
    this._setState(EditPointView.parsePointToState(point));
    this.#destinations = destinations;
    this.#offers = offers;
    this.#handleSubmit = onSubmit;
    this.#handleEditClose = onEditClose;
    this._restoreHandlers();
  }

  get template() {
    return createEditPointTemplate(
      this._state,
      this.#destinations,
      this.#offers
    );
  }

  _restoreHandlers() {
    this.element.addEventListener('submit', this.#onSubmitClick);
    //this.element.addEventListener('reset', this.#onCloseEditClick);
    this.element
      .querySelector('.event__rollup-btn')
      .addEventListener('click', this.#onCloseEditClick);
    this.element.querySelector('.event__type-group').addEventListener('change', this.#onTypeChangeClick);
    this.element.querySelector('.event__input--destination').addEventListener('change', this.#onDestynationChangeClick);
  }

  #onSubmitClick = (evt) => {
    evt.preventDefault();
    this.#handleSubmit(EditPointView.parseStateToPoint(this._state));
  };

  #onCloseEditClick = (evt) => {
    evt.preventDefault();
    this.#handleEditClose();
  };

  #onTypeChangeClick = (evt) => {
    if (evt.target.closest('input')) {
      this.updateElement({
        type: evt.target.value
      });
    }
  };

  #onDestynationChangeClick = (evt) => {
    const selectedDestination = this.#destinations.find((destination) => destination.name === evt.target.value);

    if (!selectedDestination) {
      return;
    }

    this.updateElement({
      destination: selectedDestination.id
    });

  };

  reset(point) {
    this.updateElement(EditPointView.parsePointToState(point));
  }

  static parsePointToState(point) {
    return {...point};
  }

  static parseStateToPoint(state) {
    const point = {...state};
    return point;
  }
}
