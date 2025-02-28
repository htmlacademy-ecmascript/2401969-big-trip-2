import AbstractView from '../../framework/view/abstract-view.js';
import { createListTemplate } from './list-view-template.js';

export default class ListView extends AbstractView {
  get template() {
    return createListTemplate();
  }
}
