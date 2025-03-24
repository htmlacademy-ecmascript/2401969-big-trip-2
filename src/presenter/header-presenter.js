import FiltersPresenter from './filters-presenter';

export default class HeaderPresenter {
  #filtersContainer = null;
  #pointsModel = null;
  #filterModel = null;

  constructor({ filtersContainer, pointsModel, filterModel }) {
    this.#filtersContainer = filtersContainer;
    this.#pointsModel = pointsModel;
    this.#filterModel = filterModel;
  }

  init() {
    this.#renderFiltersView();
  }

  #renderFiltersView() {
    const filtersPresenter = new FiltersPresenter({
      filtersContainer: this.#filtersContainer,
      pointsModel: this.#pointsModel,
      filterModel: this.#filterModel
    });
    filtersPresenter.init();
  }
}
