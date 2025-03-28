function createFilterItemTemplate(filter, currentFilterType) {
  const { type, qty } = filter;

  return ` <div class="trip-filters__filter">
        <input id="filter-${type}"
          class="trip-filters__filter-input  visually-hidden"
          type="radio"
          name="trip-filter"
          value="${type}"
          ${type === currentFilterType ? 'checked' : ''}
          ${qty === 0 ? 'disabled' : ''}>
        <label class="trip-filters__filter-label" for="filter-${type}">${type}</label>
      </div>`;
}

function createFiltersTemplate(filterItems, currentFilterType) {
  const filtersTemplate = filterItems
    .map((filter) => createFilterItemTemplate(filter, currentFilterType))
    .join('');

  return `<form class="trip-filters" action="#" method="get">
               ${filtersTemplate}
                <button class="visually-hidden" type="submit">Accept filter</button>
              </form>`;
}

export { createFiltersTemplate };
