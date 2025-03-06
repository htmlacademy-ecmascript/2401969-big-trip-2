function createSortItemTemplate(type, isChecked) {
  const { name, isActive } = type;
  const inactiveClassName = isActive ? '' : 'disabled';
  return `<div class="trip-sort__item  trip-sort__item--${name}">
              <input id="sort-${name}"
               class="trip-sort__input  visually-hidden"
                type="radio"
                 name="trip-sort"
                  value="sort-day" ${inactiveClassName}
                   ${isChecked ? 'checked' : ''}>
              <label class="trip-sort__btn" for="sort-${name}">${name}</label>
            </div>`;
}

function createSortTemplate(types) {
  const sortTemplate = types
    .map((type, index) => createSortItemTemplate(type, index === 0))
    .join('');
  return `<form class="trip-events__trip-sort  trip-sort" action="#" method="get">
            ${sortTemplate}
          </form>`;
}

export { createSortTemplate };
