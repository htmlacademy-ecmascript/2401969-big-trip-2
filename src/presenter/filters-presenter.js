import { render, replace, remove } from '../framework/render';
import FiltersView from '../view/filters-view/filters-view';
import { filter } from '../utils';
import { FilterType, UpdateType } from '../const';


export default class FiltersPresenter {
  #filtersContainer = null;
  #pointsModel = null;
  #filterModel = null;

  #filtersViewComponent = null;

  constructor({ filtersContainer, pointsModel, filterModel }) {
    this.#filtersContainer = filtersContainer;
    this.#pointsModel = pointsModel;
    this.#filterModel = filterModel;

    this.#pointsModel.addObserver(this.#handleModelEvent);
    this.#filterModel.addObserver(this.#handleModelEvent);
  }

  get filters() {
    const points = this.#pointsModel.points;

    return Object.values(FilterType).map((type) => ({
      type,
      qty: filter[type](points).length
    }));
  }

  init() {
    const filters = this.filters;
    const prevFilterViewComponent = this.#filtersViewComponent;

    this.#filtersViewComponent = new FiltersView({
      filters,
      currentFilterType: this.#filterModel.filter,
      onFilterTypeChange: this.#handleFilterTypeChange
    });

    if (prevFilterViewComponent === null) {
      render(this.#filtersViewComponent, this.#filtersContainer);
      return;
    }

    replace(this.#filtersViewComponent, prevFilterViewComponent);
    remove(prevFilterViewComponent);
  }

  #handleModelEvent = () => {
    this.init();
  };

  #handleFilterTypeChange = (filterType) => {
    if (this.#filterModel.filter === filterType) {
      return;
    }

    this.#filterModel.setFilter(UpdateType.MAIN_COMPONENT, filterType);
  };
}
