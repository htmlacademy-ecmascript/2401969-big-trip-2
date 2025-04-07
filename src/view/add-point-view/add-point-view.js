import AbstractStatefulView from '../../framework/view/abstract-stateful-view.js';
import { createAddPointTemplate } from './add-point-view-template.js';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

export default class AddPointView extends AbstractStatefulView {
  #destinations = null;
  #offers = null;
  #handleSubmit = null;
  #handleCancelClick = null;

  #datepickerStart = null;
  #datepickerFinish = null;

  constructor({ point, destinations, offers, onSubmit, onCancelClick }) {
    super();
    this.#destinations = destinations;
    this.#offers = offers;
    this.#handleSubmit = onSubmit;
    this.#handleCancelClick = onCancelClick;

    this._setState(AddPointView.parsePointToState(point));
    this._restoreHandlers();
  }

  get template() {
    return createAddPointTemplate(
      this._state,
      this.#destinations,
      this.#offers
    );
  }

  _restoreHandlers() {
    this.element.addEventListener('submit', this.#onSubmitClick);
    this.element.querySelector('.event__reset-btn').addEventListener('click', this.#onCancelClick);
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
    this.#handleSubmit(AddPointView.parseStateToPoint(this._state));
  };

  #onCancelClick = (evt) => {
    evt.preventDefault();
    this.#handleCancelClick();
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

  static parsePointToState(point) {
    return {...point,
      isDisabled: false,
      isSaving: false,
      isDeleting: false,
      dateFrom: '',
      dateTo: '',
      offers: point.offers ?? []
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

