import { remove, render,RenderPosition } from '../framework/render';
import AddPointView from '../view/add-point-view/add-point-view';
import { UserAction, UpdateType } from '../const';
import { isEscKey, } from '../utils';


export default class AddPointPresenter {
  #pointsListContainer = null;
  #handleDataChange = null;
  #handleAddPointClose = null;

  #point = null;
  #destinations = [];
  #offers = [];

  #addPointComponent = null;

  constructor({pointsListContainer, point, destinations, offers, onDataChange, onAddPointClose}) {
    this.#pointsListContainer = pointsListContainer;
    this.#point = point;
    this.#destinations = destinations;
    this.#offers = offers;
    this.#handleDataChange = onDataChange;
    this.#handleAddPointClose = onAddPointClose;
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

    remove(this.#addPointComponent);
    this.#addPointComponent = null;
    document.removeEventListener('keydown', this.#onDocumentEscKeydown);
  }

  #handleFormSubmit = (point) => {
    this.#handleDataChange(
      UserAction.ADD_POINT,
      UpdateType.POINTS_LIST,
      point,
    );
  };

  setSaving() {
    this.#addPointComponent.updateElement({
      isDisabled: true,
      isSaving: true,
    });
  }

  setAborting() {
    if (!this.#addPointComponent) {
      return;
    }

    const resetFormState = () => {
      if (!this.#addPointComponent) {
        return;
      }
      this.#addPointComponent.updateElement({
        isDisabled: false,
        isSaving: false,
      });
    };

    this.#addPointComponent.shake(resetFormState);
  }

  #handleCancelClick = () => {
    this.destroy();
    this.#handleAddPointClose();
  };

  #onDocumentEscKeydown = (evt) => {
    if (isEscKey(evt)) {
      evt.preventDefault();
      this.destroy();
      this.#handleAddPointClose();
    }
  };
}
