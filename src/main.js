//import FilterView from './view/filter-view/filter-view';
//import { render } from './framework/render';
import HeaderPresenter from './presenter/header-presenter';
import MainPresenter from './presenter/main-presenter';
import PointsModel from './model/points-model';
import DestinationsModel from './model/destinations-model';
import OffersModel from './model/offers-model';
import FilterModel from './model/filters-model';

const headerElement = document.querySelector('.trip-main');
const filtersElement = headerElement.querySelector('.trip-controls__filters');
const mainElement = document.querySelector('.page-main');
const containerElement = mainElement.querySelector('.trip-events');
const pointsModel = new PointsModel();
const destinationsModel = new DestinationsModel();
const offersModel = new OffersModel();
const filterModel = new FilterModel();
const mainPresenter = new MainPresenter({
  mainContainer: containerElement,
  pointsModel,
  destinationsModel,
  offersModel,
  filterModel,
});
const headerPresenter = new HeaderPresenter({
  headerContainer: headerElement,
  filtersContainer: filtersElement,
  pointsModel,
  filterModel,
  mainPresenter,
});


//render(new FilterView(), filtersElement);
headerPresenter.init();
mainPresenter.init();
