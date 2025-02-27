import AddPointView from '../view/add-point-view/add-point-view';
import EditPointView from '../view/edit-point-view/edit-point-view';
import ListView from '../view/list-view/list-view';
import PointView from '../view/point-view/point-view';
import SortView from '../view/sort-view/sort-view';
import { render, replace } from '../framework/render';
import { RenderPosition } from '../framework/render';
import { isEscKey } from '../utils';

export default class ListPresenter {
  #listContainer = null;
  #pointsModel = null;
  #destinationsModel = null;
  #offersModel = null;

  #pointsList = [];
  #offers = [];
  #destinations = [];

  #sortComponent = new SortView();
  #listComponent = new ListView();
  #addPointComponent = new AddPointView();

  constructor({ listContainer, pointsModel, destinationsModel, offersModel }) {
    this.#listContainer = listContainer;
    this.#pointsModel = pointsModel;
    this.#destinationsModel = destinationsModel;
    this.#offersModel = offersModel;
  }

  init() {
    this.#pointsList = [...this.#pointsModel.points];
    this.#destinations = [...this.#destinationsModel.destinations];
    this.#offers = [...this.#offersModel.offers];
    this.#renderPointsList();
  }

  #renderPointsList() {
    render(this.#sortComponent, this.#listContainer);
    render(this.#listComponent, this.#listContainer);
    render(
      this.#addPointComponent,
      this.#listComponent.element,
      RenderPosition.AFTERBEGIN
    );

    for (let i = 0; i < this.#pointsList.length; i++) {
      this.renderPoint(this.#pointsList[i]);
    }
  }

  renderPoint(point) {
    const onDocumentEscKeydown = (evt) => {
      if (isEscKey(evt)) {
        evt.preventDefault();
        replaceToPoint();
        document.removeEventListener('keydown', onDocumentEscKeydown);
      }
    };

    const pointViewComponent = new PointView({
      point,
      destinations: this.#destinations,
      offers: this.#offers,
      onClick: () => {
        replaceToForm();
        document.addEventListener('keydown', onDocumentEscKeydown);
      },
    });

    const editViewComponent = new EditPointView({
      point,
      destinations: this.#destinations,
      offers: this.#offers,
      onSubmit: () => {
        replaceToPoint();
        document.removeEventListener('keydown', onDocumentEscKeydown);
      },
    });

    function replaceToForm() {
      replace(editViewComponent, pointViewComponent);
    }

    function replaceToPoint() {
      replace(pointViewComponent, editViewComponent);
    }

    render(pointViewComponent, this.#listComponent.element);
  }
}
