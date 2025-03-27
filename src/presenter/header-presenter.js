import FiltersPresenter from './filters-presenter';
import AddPointButtonView from '../view/add-point-button-view/add-point-button-view';
//import MainPresenter from './main-presenter';
import { render } from '../framework/render';

export default class HeaderPresenter {
  #headerContainer = null;
  #filtersContainer = null;
  #pointsModel = null;
  #filterModel = null;
  #mainPresenter = null;

  addPointButtonComponent = null;

  constructor({ headerContainer, filtersContainer, pointsModel, filterModel, mainPresenter }) {
    this.#headerContainer = headerContainer;
    this.#filtersContainer = filtersContainer;
    this.#pointsModel = pointsModel;
    this.#filterModel = filterModel;
    this.#mainPresenter = mainPresenter;
  }

  init() {
    this.#renderFiltersView();
    this.#renderAddPointButton();
  }

  handleAddPointButtonClick = () => {
    this.#mainPresenter.renderAddPoint();
    this.addPointButtonComponent.element.disabled = true;
  };

  handleAddPointClose = () => {
    this.addPointButtonComponent.element.disabled = false;
  };

  #renderFiltersView() {
    const filtersPresenter = new FiltersPresenter({
      filtersContainer: this.#filtersContainer,
      pointsModel: this.#pointsModel,
      filterModel: this.#filterModel
    });
    filtersPresenter.init();
  }

  #renderAddPointButton() {
    this.addPointButtonComponent = new AddPointButtonView({
      onClick: this.#handleAddPointButtonClick
    });
    render(this.addPointButtonComponent, this.#headerContainer);
  }
}
