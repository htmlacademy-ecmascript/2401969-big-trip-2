import AddPointView from '../view/add-point-view/add-point-view';
import ListView from '../view/list-view/list-view';
import SortView from '../view/sort-view/sort-view';
import NoPointView from '../view/no-points-view/no-points-view';
import { render } from '../framework/render';
import { RenderPosition } from '../framework/render';
import { SortTypes } from '../const';
import PointPresenter from './point-presenter';
import { updateItem } from '../utils';

export default class MainPresenter {
  #mainContainer = null;
  #pointsModel = null;
  #destinationsModel = null;
  #offersModel = null;

  #pointsList = [];
  #offers = [];
  #destinations = [];

  #listComponent = new ListView();
  #noPointComponent = new NoPointView({ messageType: 'EVERYTHING' });

  #pointPresenters = new Map();

  constructor({ mainContainer, pointsModel, destinationsModel, offersModel }) {
    this.#mainContainer = mainContainer;
    this.#pointsModel = pointsModel;
    this.#destinationsModel = destinationsModel;
    this.#offersModel = offersModel;
  }

  init() {
    this.#pointsList = [...this.#pointsModel.points];
    this.#destinations = [...this.#destinationsModel.destinations];
    this.#offers = [...this.#offersModel.offers];
    this.#renderMainComponents();
  }

  #renderMainComponents() {
    if (this.#pointsList.length === 0) {
      this.#renderNoPoints();
      return;
    }

    this.#renderSortView();

    this.#renderPointsList();

    this.#renderAddPoint();

    for (let i = 0; i < this.#pointsList.length; i++) {
      this.#renderPoint(this.#pointsList[i]);
    }
  }

  #handlePointChange = (updatePoint) => {
    this.#pointsList = updateItem(this.#pointsList, updatePoint);
    this.#pointPresenters.get(updatePoint.id).init(updatePoint);
  };

  #handleModeChange = () => {
    this.#pointPresenters.forEach((presenter) => presenter.resetView());
  };

  #renderNoPoints() {
    render(this.#noPointComponent, this.#mainContainer);
  }

  #renderSortView() {
    const types = SortTypes;
    const SortViewComponent = new SortView({ types });

    render(SortViewComponent, this.#mainContainer);
  }

  #renderPointsList() {
    render(this.#listComponent, this.#mainContainer);
  }

  #renderAddPoint() {
    const addPointComponent = new AddPointView({
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
    const pointPresenter = new PointPresenter({
      pointsListContainer: this.#listComponent.element,
      offers: this.#offers,
      destinations: this.#destinations,
      onDataChange: this.#handlePointChange,
      onModeChange: this.#handleModeChange,
    });
    pointPresenter.init(point);
    this.#pointPresenters.set(point.id, pointPresenter);
  }

  #clearPointsList() {
    this.#pointPresenters.forEach((presenter) => presenter.destrоy());
    this.#pointPresenters.clear();
  }
}
