import { createElement } from '../../render.js';
import { createAddPointTemplate } from './add-point-view-template.js';

export default class AddPointView {
  getTemplate() {
    return createAddPointTemplate();
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }
    return this.element;
  }

  removeElement() {
    this.element = null;
  }
}
