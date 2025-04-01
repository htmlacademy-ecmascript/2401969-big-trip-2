import AbstractView from '../../framework/view/abstract-view';
import { createLoadPointsTemplate } from './loading-view-template';

export default class LoadingView extends AbstractView {
  get template() {
    return createLoadPointsTemplate();
  }
}
