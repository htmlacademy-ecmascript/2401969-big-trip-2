//import AddPointView from '../view/add-point-view/add-point-view';
import ListView from '../view/list-view/list-view';
import SortView from '../view/sort-view/sort-view';
import NoPointView from '../view/no-points-view/no-points-view';
import { render } from '../framework/render';
//import { RenderPosition } from '../framework/render';
import { SortType, UpdateType, UserAction } from '../const';
import PointPresenter from './point-presenter';
import { sortPointByDate, sortPointByPrice, sortPointByTime } from '../utils';

export default class MainPresenter {
  #mainContainer = null;
  #pointsModel = null;
  #destinationsModel = null;
  #offersModel = null;

  #offers = [];
  #destinations = [];

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
    this.#pointsModel.addObserver(this.#handleModelEvent);
  }

  get points() {
    switch (this.#currentSortType) {
      case SortType.DAY.name:
        return [...this.#pointsModel.points].sort(sortPointByDate);
      case SortType.TIME.name:
        return [...this.#pointsModel.points].sort(sortPointByTime);
      case SortType.PRICE.name:
        return [...this.#pointsModel.points].sort(sortPointByPrice);
    }

    return this.#pointsModel.points;
  }

  init() {
    //this.#pointsList = [...this.#pointsModel.points];
    this.#destinations = [...this.#destinationsModel.destinations];
    this.#offers = [...this.#offersModel.offers];
    this.#renderMainComponents();
  }

  #renderMainComponents() {
    if (this.#pointsModel.points.length === 0) {
      this.#renderNoPoints();
      return;
    }

    this.#renderSortView();

    this.#renderPointsList();
  }

  #handlePointChange = (updatePoint) => {
    this.#pointPresenters.get(updatePoint.id).init(updatePoint);
  };

  #handleModeChange = () => {
    this.#pointPresenters.forEach((presenter) => presenter.resetView());
  };

  #handleViewAction = (actionType, updateType, update) => {
    //console.log(actionType, updateType, update);
    switch (actionType) {
      case UserAction.UPDATE_POINT:
        this.#pointsModel.updatePoint(updateType, update);
        break;
      case UserAction.ADD_POINT:
        this.#pointsModel.addPoint(updateType, update);
        break;
      case UserAction.DELETE_POINT:
        this.#pointsModel.deletePoint(updateType, update);
        break;
    }
  };

  #handleModelEvent = (updateType, data) => {
    //console.log(updateType, data);
    switch (updateType) {
      case UpdateType.POINT:
        this.#pointPresenters.get(data.id).init(data);
        break;
      case UpdateType.POINTS_LIST:
        break;
      case UpdateType.MAIN_COMPONENT:
        break;
    }
  };


  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }

    this.#currentSortType = sortType;

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

  #renderPointsList() {
    render(this.#listComponent, this.#mainContainer);

    for (let i = 0; i < this.#pointsModel.points.length; i++) {
      this.#renderPoint(this.#pointsModel.points[i]);
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
      onDataChange: this.#handleViewAction,
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
