import { SortType } from '../../const';

function createSortingItemViewTemplate(type) {
  return Object.values(SortType).map(({name, isActive,}) =>
    `<div class="trip-sort__item  trip-sort__item--${name}">
        <input id="sort-${name}" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-${name}" ${name === type && isActive ? 'checked' : ''} ${isActive ? '' : 'disabled'}>
        <label class="trip-sort__btn" for="sort-${name}" data-sort-type="${name}">${name}</label>
    </div>`).join('');
}

function createSortTemplate (type) {
  return(
    `<form class="trip-events__trip-sort  trip-sort" action="#" method="get">
      ${createSortingItemViewTemplate(type)}
    </form>`
  );
}

export { createSortTemplate };

