import AbstractView from '../../framework/view/abstract-view.js';
import { createAddPointTemplate } from './add-point-view-template.js';

export default class AddPointView extends AbstractView {
  get template() {
    return createAddPointTemplate();
  }
}
