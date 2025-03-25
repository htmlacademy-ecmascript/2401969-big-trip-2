import AbstractView from '../../framework/view/abstract-view.js';
import { createNoPointViewTemplate } from './no-points-view-template.js';

export default class NoPointView extends AbstractView {
  #filterType = null;

  constructor({ filterType }) {
    super();
    this.#filterType = filterType;
  }

  get template() {
    return createNoPointViewTemplate(this.#filterType);
  }
}
