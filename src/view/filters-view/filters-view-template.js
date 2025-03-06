function createFilterItemTemplate(filter, isChecked) {
  const { type, qty } = filter;

  return ` <div class="trip-filters__filter">
        <input id="filter-${type}"
          class="trip-filters__filter-input  visually-hidden"
          type="radio"
          name="trip-filter"
          value="${type}"
          ${isChecked ? 'checked' : ''}
          ${qty === 0 ? 'disabled' : ''}>
        <label class="trip-filters__filter-label" for="filter-${type}">${type}</label>
      </div>`;
}

function createFiltersTemplate(filterItems) {
  const filtersTemplate = filterItems
    .map((filter, index) => createFilterItemTemplate(filter, index === 0))
    .join('');
  return `<form class="trip-filters" action="#" method="get">
               ${filtersTemplate}
                <button class="visually-hidden" type="submit">Accept filter</button>
              </form>`;
}

export { createFiltersTemplate };
