import FilterView from './view/filter-view';
import { render } from './render';

const headerElement = document.querySelector('.page-header');
const filtersElement = headerElement.querySelector('.trip-controls__filters');

render(new FilterView(), filtersElement);
