import { remove, render,RenderPosition } from '../framework/render';
import AddPointView from '../view/add-point-view/add-point-view';
import { UserAction, UpdateType } from '../const';
import { isEscKey, getRandomInteger } from '../utils';


export default class AddPointPresenter {
  #pointsListContainer = null;
  #handleDataChange = null;
  #handleDestroy = null;

  #point = null;
  #destinations = [];
  #offers = [];

  #addPointComponent = null;

  constructor({pointsListContainer, point, destinations, offers, onDataChange, onDestroy}) {
    this.#pointsListContainer = pointsListContainer;
    this.#point = point;
    this.#destinations = destinations;
    this.#offers = offers;
    this.#handleDataChange = onDataChange;
    this.#handleDestroy = onDestroy;
  }

  init() {
    if(this.#addPointComponent !== null) {
      return;
    }

    this.#renderAddPoint();
  }

  #renderAddPoint() {
    this.#addPointComponent = new AddPointView({
      point: this.#point,
      destinations: this.#destinations,
      offers: this.#offers,
      onSubmit: this.#handleFormSubmit,
      onCancelClick: this.#handleCancelClick,
    });

    render(
      this.#addPointComponent,
      this.#pointsListContainer,
      RenderPosition.AFTERBEGIN
    );

    document.addEventListener('keydown', this.#onDocumentEscKeydown);
  }

  destroy() {
    if (this.#addPointComponent === null) {
      return;
    }

    //this.#handleDestroy();

    remove(this.#addPointComponent);
    this.#addPointComponent = null;
    document.removeEventListener('keydown', this.#onDocumentEscKeydown);
  }

  #handleFormSubmit = (point) => {
    if (!point.destination) {
      this.destroy();
      return;
    }

    this.#handleDataChange(
      UserAction.ADD_POINT,
      UpdateType.POINTS_LIST,
      {id: getRandomInteger(1, 100), ...point}
    );
    this.destroy();
  };

  #handleCancelClick = () => {
    this.destroy();
  };

  #onDocumentEscKeydown = (evt) => {
    if (isEscKey(evt)) {
      evt.preventDefault();
      this.destroy();
    }
  };
}
