import AbstractView from '../../framework/view/abstract-view.js';
import { createSortTemplate } from './sort-view-template.js';

export default class SortView extends AbstractView {
  #type = null;
  #handleSortTypeChange = null;

  constructor({ type, onSortTypeChange, }) {
    super();
    this.#type = type;
    this.#handleSortTypeChange = onSortTypeChange;

    this.element.addEventListener('click', this.#onSortTypeChange);
  }

  get template() {
    return createSortTemplate(this.#type);
  }

  #onSortTypeChange = (evt) => {
    if (evt.target.tagName !== 'LABEL') {
      return;
    }

    evt.preventDefault();
    this.#handleSortTypeChange(evt.target.dataset.sortType);
  };
}
