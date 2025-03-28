import AbstractView from '../../framework/view/abstract-view';
import { createAddPointButtonTemplate } from './add-point-button-view-template';

export default class AddPointButtonView extends AbstractView {
  #handleClick = null;

  constructor({onClick}) {
    super();
    this.#handleClick = onClick;
    this.element.addEventListener('click', this.#onAddPointClick);
  }

  get template () {
    return createAddPointButtonTemplate();
  }

  #onAddPointClick = (evt) => {
    evt.preventDefault();
    this.#handleClick();
  };
}
