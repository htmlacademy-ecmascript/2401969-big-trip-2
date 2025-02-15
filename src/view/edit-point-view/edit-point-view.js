import { createElement } from '../../render.js';
import { createEditPointTemplate } from './edit-point-view-template.js';

export default class EditPointView {
  getTemplate() {
    return createEditPointTemplate();
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
