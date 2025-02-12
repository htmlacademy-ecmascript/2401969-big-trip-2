import { createElement } from '../../render.js';
import { createPointTemplate } from './point-view-template.js';

export default class PointView {
  constructor({ point }) {
    this.point = point;
  }

  getTemplate() {
    return createPointTemplate(this.point);
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
