//import FilterView from './view/filter-view/filter-view';
//import { render } from './framework/render';
import HeaderPresenter from './presenter/header-presenter';
import ListPresenter from './presenter/list-presenter';
import PointsModel from './model/points-model';
import DestinationsModel from './model/destinations-model';
import OffersModel from './model/offers-model';

const headerElement = document.querySelector('.page-header');
const filtersElement = headerElement.querySelector('.trip-controls__filters');
const mainElement = document.querySelector('.page-main');
const containerElement = mainElement.querySelector('.trip-events');
const pointsModel = new PointsModel();
const destinationsModel = new DestinationsModel();
const offersModel = new OffersModel();
const headerPresenter = new HeaderPresenter({
  filtersContainer: filtersElement,
  pointsModel,
});
const listPresenter = new ListPresenter({
  listContainer: containerElement,
  pointsModel,
  destinationsModel,
  offersModel,
});

//render(new FilterView(), filtersElement);
headerPresenter.init();
listPresenter.init();
