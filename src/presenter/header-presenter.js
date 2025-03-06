import FiltersView from '../view/filters-view/filters-view';
import { createFilters } from '../mock/mockFilters';
import { render } from '../framework/render';

export default class HeaderPresenter {
  #filtersContainer = null;
  #pointsModel = null;

  #points = [];

  #filtersComponent = null;

  constructor({ filtersContainer, pointsModel }) {
    this.#filtersContainer = filtersContainer;
    this.#pointsModel = pointsModel;

    const filters = createFilters(this.#pointsModel.points);

    this.#filtersComponent = new FiltersView({ filters });
  }

  init() {
    this.#points = [...this.#pointsModel.points];
    render(this.#filtersComponent, this.#filtersContainer);
  }
}
