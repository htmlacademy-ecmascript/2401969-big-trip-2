import { FilterType } from '../../const';

const FilterMessage = {
  [FilterType.EVERYTHING]: 'Click New Event to create your first point',
  [FilterType.PAST]: 'There are no past events now',
  [FilterType.PRESENT]: 'There are no present events now',
  [FilterType.FUTURE]: 'There are no future events now',
};

function createNoPointViewTemplate(filterType) {
  return `<p class="trip-events__msg">${FilterMessage[filterType]}</p>`;
}

export { createNoPointViewTemplate };
