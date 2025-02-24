import { createElement } from '../../render.js';
import { createEditPointTemplate } from './edit-point-view-template.js';

export default class EditPointView {
  constructor({ point, destinations, offers }) {
    this.point = point;
    this.destinations = destinations;
    this.offers = offers;
  }

  getTemplate() {
    return createEditPointTemplate(this.point, this.destinations, this.offers);
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
