import AbstractStatefulView from '../../framework/view/abstract-stateful-view.js';
import { createEditPointTemplate } from './edit-point-view-template.js';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

export default class EditPointView extends AbstractStatefulView {
  //#point = null;
  #destinations = null;
  #offers = null;
  #handleSubmit = null;
  #handleEditClose = null;

  #datepickerStart = null;
  #datepickerFinish = null;

  constructor({ point, destinations, offers, onSubmit, onEditClose }) {
    super();
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
    //this.element.querySelector('.event__offer-label').addEventListener('click', this.#onOfferClick);
    this.element.querySelector('.event__input--price').addEventListener('change', this.#onPriceChange);
    this.#setDatespicker();
  }

  /*#onOfferClick = () => {
    console.log('Meow');
    const checkedOffer = evt.target.id;
    const pointOffers = this._state.offers;
    console.log(checkedOffer);
    console.log(this._state);
    console.log(pointOffers);
    if (pointOffers.includes(checkedOffer)) {
      console.log('Wow');
    }
  };*/

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

  #onPriceChange = (evt) => {
    evt.preventDefault();
    this._setState({
      basePrice: evt.target.value
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

  #setDatespicker() {
    this.#datepickerStart = flatpickr(
      this.element.querySelector('#event-start-time'), {
        enableTime: true,
        dateFormat: 'd/m/y H:i',
        defaultDate: this._state.dateFrom,
        onChange: this.#onDateStartChange,
      }
    );
    this.#datepickerFinish = flatpickr(
      this.element.querySelector('#event-end-time'), {
        enableTime: true,
        dateFormat: 'd/m/y H:i',
        defaultDate: this._state.dateTo,
        minDate: this._state.dateFrom,
        onChange: this.#onDateFinishChange,
      }
    );
  }

  #onDateStartChange = ([userDate]) => {
    this.updateElement({
      dateFrom: userDate,
    });
    this.#datepickerFinish.set('minDate', userDate);
  };

  #onDateFinishChange = ([userDate]) => {
    this.updateElement({
      dateTo: userDate,
    });
  };

  removeElement() {
    super.removeElement();

    if(this.#datepickerStart) {
      this.#datepickerStart.destroy();
      this.#datepickerStart = null;
    }

    if(this.#datepickerFinish) {
      this.#datepickerFinish.destroy();
      this.#datepickerFinish = null;
    }
  }
}

