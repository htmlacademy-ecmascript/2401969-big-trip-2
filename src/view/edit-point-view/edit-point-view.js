import AbstractStatefulView from '../../framework/view/abstract-stateful-view.js';
import { createEditPointTemplate } from './edit-point-view-template.js';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { convertToISO } from '../../utils.js';

export default class EditPointView extends AbstractStatefulView {
  #destinations = null;
  #offers = null;
  #handleSubmit = null;
  #handleEditClose = null;
  #handleDeliteClick = null;

  #datepickerStart = null;
  #datepickerFinish = null;

  constructor({ point, destinations, offers, onSubmit, onEditClose, onDeliteClick }) {
    super();
    this.#destinations = destinations;
    this.#offers = offers;
    this.#handleSubmit = onSubmit;
    this.#handleEditClose = onEditClose;
    this.#handleDeliteClick = onDeliteClick;

    this._setState(EditPointView.parsePointToState(point));
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
    this.element
      .querySelector('.event__rollup-btn')
      .addEventListener('click', this.#onCloseEditClick);
    this.element.querySelector('.event__reset-btn').addEventListener('click', this.#onDeliteClick);
    this.element.querySelector('.event__type-group').addEventListener('change', this.#onTypeChangeClick);
    this.element.querySelector('.event__input--destination').addEventListener('change', this.#onDestynationChangeClick);
    if (this.element.querySelector('.event__available-offers')) {
      this.element.querySelector('.event__available-offers')
        .addEventListener('change', this.#onOfferChange);
    }
    this.element.querySelector('.event__input--price').addEventListener('change', this.#onPriceChange);
    this.#setDatespicker();
  }

  #onSubmitClick = (evt) => {
    evt.preventDefault();
    this.#handleSubmit(EditPointView.parseStateToPoint(this._state));
  };

  #onCloseEditClick = (evt) => {
    evt.preventDefault();
    this.#handleEditClose();
  };

  #onDeliteClick = (evt) => {
    evt.preventDefault();
    this.#handleDeliteClick(EditPointView.parseStateToPoint(this._state));
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

  #onOfferChange = (evt) => {
    const currentOffer = evt.target.dataset.offerId;

    if (evt.target.checked) {
      this._setState({
        offers: [...this._state.offers, currentOffer]
      });
    } else {
      this._setState({
        offers: this._state.offers.filter((offer) => offer !== currentOffer)
      });
    }
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

  #setDatespicker() {
    const [dateStartElement, dateFinishElement] = this.element.querySelectorAll('.event__input--time');
    const commonConfig = {
      enableTime: true,
      dateFormat: 'd/m/y H:i',
      'time_24hr': true,
      locale: {firstDayOfWeek: 1},
    };

    this.#datepickerStart = flatpickr(
      dateStartElement,
      {
        ...commonConfig,
        defaultDate: this._state.dateFrom,
        onClose: this.#onDateStartChange,
      }
    );

    this.#datepickerFinish = flatpickr(
      dateFinishElement,
      {
        ...commonConfig,
        defaultDate: this._state.dateTo,
        onClose: this.#onDateFinishChange,
        minDate: this._state.dateFrom,
      }
    );
  }

  #onDateStartChange = ([userDate]) => {
    const isoDate = convertToISO(userDate);
    this._setState({ dateFrom: isoDate });
    this.#datepickerFinish.set('minDate', isoDate);
  };

  #onDateFinishChange = ([userDate]) => {
    const isoDate = convertToISO(userDate);
    this._setState({ dateTo: isoDate });
    this.#datepickerStart.set('maxDate', isoDate);
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

  static parsePointToState(point) {
    return {...point,
      isDisabled: false,
      isSaving: false,
      isDeleting: false,
    };
  }

  static parseStateToPoint(state) {
    const point = {...state};

    delete point.isDisabled;
    delete point.isSaving;
    delete point.isDeleting;

    return point;
  }
}

