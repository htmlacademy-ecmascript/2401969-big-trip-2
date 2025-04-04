import FiltersPresenter from './filters-presenter';
//import MainPresenter from './main-presenter';


export default class HeaderPresenter {
  #headerContainer = null;
  #filtersContainer = null;
  #pointsModel = null;
  #filterModel = null;
  #mainPresenter = null;

  addPointButtonComponent = null;

  constructor({ headerContainer, filtersContainer, pointsModel, filterModel, }) {
    this.#headerContainer = headerContainer;
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
