import AbstractView from '../../framework/view/abstract-view.js';
import { createNoPointViewTemplate } from './no-points-view-template.js';

export default class NoPointView extends AbstractView {
  #messageType = null;
  constructor({ messageType }) {
    super();
    this.#messageType = messageType;
  }

  get template() {
    return createNoPointViewTemplate(this.#messageType);
  }
}
