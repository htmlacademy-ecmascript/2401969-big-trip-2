//import AddPointView from '../view/add-point-view/add-point-view';
import ListView from '../view/list-view/list-view';
import SortView from '../view/sort-view/sort-view';
import NoPointView from '../view/no-points-view/no-points-view';
import { render } from '../framework/render';
//import { RenderPosition } from '../framework/render';
import { SortType } from '../const';
import PointPresenter from './point-presenter';
import { updateItem, sortPointByDate, sortPointByPrice, sortPointByTime } from '../utils';

export default class MainPresenter {
  #mainContainer = null;
  #pointsModel = null;
  #destinationsModel = null;
  #offersModel = null;

  #pointsList = [];
  #offers = [];
  #destinations = [];
  #sourcedPointsList = [];

  #listComponent = new ListView();
  #noPointComponent = new NoPointView({ messageType: 'EVERYTHING' });
  #sortViewComponent = null;

  #pointPresenters = new Map();

  #currentSortType = SortType.DAY.name;

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
    this.#sourcedPointsList = [...this.#pointsModel.points];
    this.#renderMainComponents();
  }

  #renderMainComponents() {
    if (this.#pointsList.length === 0) {
      this.#renderNoPoints();
      return;
    }

    this.#renderSortView();

    this.#renderPointsListContainer();
  }

  #handlePointChange = (updatePoint) => {
    this.#pointsList = updateItem(this.#pointsList, updatePoint);
    this.#sourcedPointsList = updateItem(this.#sourcedPointsList, updatePoint);
    this.#pointPresenters.get(updatePoint.id).init(updatePoint);
  };

  #handleModeChange = () => {
    this.#pointPresenters.forEach((presenter) => presenter.resetView());
  };

  #sortPoints(sortType) {
    switch (sortType) {
      case SortType.DAY.name:
        this.#pointsList.sort(sortPointByDate);
        break;
      case SortType.TIME.name:
        this.#pointsList.sort(sortPointByTime);
        break;
      case SortType.PRICE.name:
        this.#pointsList.sort(sortPointByPrice);
        break;
      default:
        this.#pointsList = [...this.#sourcedPointsList];
    }
    this.#currentSortType = sortType;
  }

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }

    this.#sortPoints(sortType);

    this.#clearPointsList();

    this.#renderPointsList();
  };

  #renderNoPoints() {
    render(this.#noPointComponent, this.#mainContainer);
  }

  #renderSortView() {
    this.#sortViewComponent = new SortView({
      type: this.#currentSortType,
      onSortTypeChange: this.#handleSortTypeChange,
    });

    render(this.#sortViewComponent, this.#mainContainer);
  }

  #renderPointsListContainer() {
    render(this.#listComponent, this.#mainContainer);
    //this.#renderAddPoint();
    this.#renderPointsList();
  }

  #renderPointsList() {
    for (let i = 0; i < this.#pointsList.length; i++) {
      this.#renderPoint(this.#pointsList[i]);
    }
  }

  /*#renderAddPoint() {
    const addPointComponent = new AddPointView({
      destinations: this.#destinations,
      offers: this.#offers,
    });

    render(
      addPointComponent,
      this.#listComponent.element,
      RenderPosition.AFTERBEGIN
    );
  }*/

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
    this.#pointPresenters.forEach((presenter) => presenter.destroy());
    this.#pointPresenters.clear();
  }
}
