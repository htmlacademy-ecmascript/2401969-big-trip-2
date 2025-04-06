import AbstractView from '../../framework/view/abstract-view';
import { createErrorTemplate } from './error-view-template';

export default class ErrorView extends AbstractView {
  get template() {
    return createErrorTemplate();
  }
}
