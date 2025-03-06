import AddPointView from '../view/add-point-view/add-point-view';
import EditPointView from '../view/edit-point-view/edit-point-view';
import ListView from '../view/list-view/list-view';
import PointView from '../view/point-view/point-view';
import SortView from '../view/sort-view/sort-view';
import NoPointView from '../view/no-points-view/no-points-view';
import { render, replace } from '../framework/render';
import { RenderPosition } from '../framework/render';
import { isEscKey } from '../utils';
import { SortTypes } from '../const';

export default class ListPresenter {
  #listContainer = null;
  #pointsModel = null;
  #destinationsModel = null;
  #offersModel = null;

  #pointsList = [];
  #offers = [];
  #destinations = [];

  #listComponent = new ListView();
  #noPointComponent = new NoPointView({ messageType: 'EVERYTHING' });

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
    if (this.#pointsList.length === 0) {
      this.#renderNoPoints();
      return;
    }

    this.#renderSortView();
    render(this.#listComponent, this.#listContainer);
    this.#renderAddPoint(this.#pointsList[0]);

    for (let i = 0; i < this.#pointsList.length; i++) {
      this.#renderPoint(this.#pointsList[i]);
    }
  }

  #renderNoPoints() {
    render(this.#noPointComponent, this.#listContainer);
  }

  #renderSortView() {
    const types = SortTypes;
    const SortViewComponent = new SortView({ types });

    render(SortViewComponent, this.#listContainer);
  }

  #renderAddPoint(point) {
    const addPointComponent = new AddPointView({
      point,
      destinations: this.#destinations,
      offers: this.#offers,
    });

    render(
      addPointComponent,
      this.#listComponent.element,
      RenderPosition.AFTERBEGIN
    );
  }

  #renderPoint(point) {
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
