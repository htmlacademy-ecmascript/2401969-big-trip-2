import FiltersPresenter from './filters-presenter';
import InfoView from '../view/info-view/info-view';
import { render, remove, RenderPosition } from '../framework/render';


export default class HeaderPresenter {
  #headerContainer = null;
  #filtersContainer = null;
  #pointsModel = null;
  #destinationsModel = null;
  #offersModel = null;
  #filterModel = null;

  #offers = [];
  #destinations = [];

  #infoViewComponent = null;

  constructor({ headerContainer, filtersContainer, pointsModel, destinationsModel, offersModel, filterModel, }) {
    this.#headerContainer = headerContainer;
    this.#filtersContainer = filtersContainer;
    this.#pointsModel = pointsModel;
    this.#destinationsModel = destinationsModel;
    this.#offersModel = offersModel;
    this.#filterModel = filterModel;

    this.#pointsModel.addObserver(this.#handleModelEvent);
  }

  get points() {
    return this.#pointsModel.points;
  }

  init() {
    this.#destinations = this.#destinationsModel.destinations;
    this.#offers = this.#offersModel.offers;

    this.#renderInfoView();
    this.#renderFiltersView();
  }

  #renderInfoView() {
    if (this.#infoViewComponent) {
      remove(this.#infoViewComponent);
    }

    this.#infoViewComponent = new InfoView({
      points: this.points,
      destinations: this.#destinations,
      offers: this.#offers,
    });
    render(this.#infoViewComponent, this.#headerContainer, RenderPosition.AFTERBEGIN);
  }

  #renderFiltersView() {
    const filtersPresenter = new FiltersPresenter({
      filtersContainer: this.#filtersContainer,
      pointsModel: this.#pointsModel,
      filterModel: this.#filterModel
    });
    filtersPresenter.init();
  }

  #handleModelEvent = () => {
    this.#renderInfoView();
  };
}
