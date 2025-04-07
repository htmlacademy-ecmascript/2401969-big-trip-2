import AbstractView from '../../framework/view/abstract-view.js';
import { createFiltersTemplate } from './filters-view-template.js';

export default class FiltersView extends AbstractView {
  #filters = null;
  #currentFilter = null;
  #handleFilterTypeChange = null;

  constructor({ filters, currentFilterType, onFilterTypeChange }) {
    super();
    this.#filters = filters;
    this.#currentFilter = currentFilterType;
    this.#handleFilterTypeChange = onFilterTypeChange;

    this.element.addEventListener('change', this.#onFilterTypeChange);
  }

  get template() {
    return createFiltersTemplate(this.#filters, this.#currentFilter);
  }

  #onFilterTypeChange = (evt) => {
    evt.preventDefault();
    this.#handleFilterTypeChange(evt.target.value);
  };
}
