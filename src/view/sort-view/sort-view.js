import AbstractView from '../../framework/view/abstract-view.js';
import { createSortTemplate } from './sort-view-template.js';

export default class SortView extends AbstractView {
  #types = null;
  constructor({ types }) {
    super();
    this.#types = types;
  }

  get template() {
    return createSortTemplate(this.#types);
  }
}
