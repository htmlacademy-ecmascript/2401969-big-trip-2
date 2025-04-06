import { remove, render, replace } from '../framework/render';
import { isEscKey, isDatesEqual } from '../utils';
import PointView from '../view/point-view/point-view';
import EditPointView from '../view/edit-point-view/edit-point-view';
import { UpdateType, UserAction, Mode} from '../const';

export default class PointPresenter {
  #pointsListContainer = null;
  #handleDataChange = null;
  #handleModeChange = null;

  #destinations = [];
  #offers = [];

  #pointComponent = null;
  #editPointComponent = null;

  #point = null;
  #mode = Mode.VIEW;

  constructor({pointsListContainer, destinations, offers, onDataChange, onModeChange}) {
    this.#pointsListContainer = pointsListContainer;
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
      onEditClose: this.#handleEditClose,
      onDeliteClick: this.#handleDeliteClick,
    });

    if(prevPointComponent === null || prevEditPointComponent === null) {
      render(this.#pointComponent, this.#pointsListContainer);
      return;
    }

    if(this.#mode === Mode.VIEW) {
      replace(this.#pointComponent, prevPointComponent);
    }

    if(this.#mode === Mode.EDIT) {
      replace(this.#pointComponent, prevEditPointComponent);
      this.#mode = Mode.VIEW;
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
      this.#editPointComponent.reset(this.#point);
      this.#replaceToView();
    }
  }

  setSaving() {
    if (this.#mode === Mode.EDIT) {
      this.#editPointComponent.updateElement({
        isDisabled: true,
        isSaving: true,
      });
    }
  }

  setDeleting() {
    if (this.#mode === Mode.EDIT) {
      this.#editPointComponent.updateElement({
        isDisabled: true,
        isDeleting: true,
      });
    }
  }

  setAborting() {
    if (this.#mode === Mode.VIEW) {
      this.#pointComponent.shake();
      return;
    }

    if (!this.#editPointComponent) {
      return;
    }

    const resetFormState = () => {
      if (!this.#editPointComponent) {
        return;
      }
      this.#editPointComponent.updateElement({
        isDisabled: false,
        isSaving: false,
        isDeleting: false,
      });
    };

    this.#editPointComponent.shake(resetFormState);
  }

  #onDocumentEscKeydown = (evt) => {
    if (isEscKey(evt)) {
      evt.preventDefault();
      this.#editPointComponent.reset(this.#point);
      this.#handleEditClose();
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
    this.#handleDataChange(
      UserAction.UPDATE_POINT,
      UpdateType.POINT,
      {...this.#point, isFavorite: !this.#point.isFavorite}
    );
  };

  #handleFormSubmit = (update) => {
    const isMinorUpdate =
      this.#point.basePrice !== update.basePrice ||
      !isDatesEqual(this.#point.dateFrom, update.dateFrom) ||
      !isDatesEqual(this.#point.dateTo, update.dateTo);
    this.#handleDataChange(
      UserAction.UPDATE_POINT,
      isMinorUpdate ? UpdateType.POINTS_LIST : UpdateType.POINT,
      update,);
  };

  #handleEditClose = () => {
    this.#editPointComponent.reset(this.#point);
    this.#replaceToView();
  };

  #handleDeliteClick = (point) => {
    this.#handleDataChange(
      UserAction.DELETE_POINT,
      UpdateType.POINTS_LIST,
      point,
    );
  };
}
