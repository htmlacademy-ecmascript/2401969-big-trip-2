import FilterView from './view/filter-view';
import { render } from './render';
import ListPresenter from './presenter/list-presenter';

const headerElement = document.querySelector('.page-header');
const filtersElement = headerElement.querySelector('.trip-controls__filters');
const mainElement = document.querySelector('.page-main');
const containerElement = mainElement.querySelector('.trip-events');
const listPresenter = new ListPresenter({ listContainer: containerElement });

render(new FilterView(), filtersElement);
listPresenter.init();
