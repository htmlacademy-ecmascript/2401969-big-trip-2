import AbstractView from '../../framework/view/abstract-view.js';
import { createFiltersTemplate } from './filters-view-template.js';

export default class FiltersView extends AbstractView {
  #filters = null;
  constructor({ filters }) {
    super();
    this.#filters = filters;
  }

  get template() {
    return createFiltersTemplate(this.#filters);
  }
}
