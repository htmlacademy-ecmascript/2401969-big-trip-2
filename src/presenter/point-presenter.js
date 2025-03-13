import { remove, render, replace } from '../framework/render';
import { isEscKey } from '../utils';
import PointView from '../view/point-view/point-view';
import EditPointView from '../view/edit-point-view/edit-point-view';

const Mode = {
  VIEW: 'VIEW',
  EDIT: 'EDIT',
};

export default class PointPresenter {
  #pointListContainer = null;
  #handleDataChange = null;
  #handleModeChange = null;

  #destinations = [];
  #offers = [];

  #pointComponent = null;
  #editPointComponent = null;

  #point = null;
  #mode = Mode.VIEW;

  constructor({pointsListContainer, destinations, offers, onDataChange, onModeChange}) {
    this.#pointListContainer = pointsListContainer;
    this.#destinations = destinations;
    this.#offers = offers;
    this.#handleDataChange = onDataChange;
    this.#handleModeChange = onModeChange;
  }

  init(point) {
    this.#point = point;

    this.#renderPoint();
  }

  #renderPoint() {
    const prevPointComponent = this.#pointComponent;
    const prevEditPointComponent = this.#editPointComponent;

    this.#pointComponent = new PointView({
      point: this.#point,
      destinations: this.#destinations,
      offers: this.#offers,
      onEditClick: this.#handleEditClick,
      onFavoriteClick: this.#handleFavoriteClick,
    });

    this.#editPointComponent = new EditPointView({
      point: this.#point,
      destinations: this.#destinations,
      offers: this.#offers,
      onSubmit: this.#handleFormSubmit,
    });

    if(prevPointComponent === null || prevEditPointComponent === null) {
      render(this.#pointComponent, this.#pointListContainer);
      return;
    }

    if(this.#mode === Mode.VIEW) {
      replace(this.#pointComponent, prevPointComponent);
    }

    if(this.#mode === Mode.EDIT) {
      replace(this.#editPointComponent, prevEditPointComponent);
    }

    remove(prevPointComponent);
    remove(prevEditPointComponent);
  }

  destroy() {
    remove(this.#pointComponent);
    remove(this.#editPointComponent);
  }

  resetView() {
    if (this.#mode !== Mode.VIEW) {
      this.#replaceToView();
    }
  }

  #onDocumentEscKeydown = (evt) => {
    if (isEscKey(evt)) {
      evt.preventDefault();
      this.#replaceToView();
      document.removeEventListener('keydown', this.#onDocumentEscKeydown);
    }
  };

  #replaceToEdit() {
    replace(this.#editPointComponent, this.#pointComponent);
    document.addEventListener('keydown', this.#onDocumentEscKeydown);
    this.#handleModeChange();
    this.#mode = Mode.EDIT;
  }

  #replaceToView() {
    replace(this.#pointComponent, this.#editPointComponent);
    document.removeEventListener('keydown', this.#onDocumentEscKeydown);
    this.#mode = Mode.VIEW;
  }

  #handleEditClick = () => {
    this.#replaceToEdit();
  };

  #handleFavoriteClick = () => {
    this.#handleDataChange({...this.#point, isFavorite: !this.#point.isFavorite});
  };

  #handleFormSubmit = (point) => {
    this.#handleDataChange(point);
    this.#replaceToView();
  };
}
