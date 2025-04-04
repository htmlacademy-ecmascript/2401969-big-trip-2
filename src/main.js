//import FilterView from './view/filter-view/filter-view';
import { render, remove } from './framework/render';
import HeaderPresenter from './presenter/header-presenter';
import MainPresenter from './presenter/main-presenter';
import PointsModel from './model/points-model';
import DestinationsModel from './model/destinations-model';
import OffersModel from './model/offers-model';
import FilterModel from './model/filters-model';
import PointsApiService from './points-api-service';
import LoadingView from './view/loading-view/loading-view';

const END_POINT = 'https://23.objects.htmlacademy.pro/big-trip';
const AUTHORIZATION = 'Basic a3b7c9d1e2';

const headerElement = document.querySelector('.trip-main');
const filtersElement = headerElement.querySelector('.trip-controls__filters');
const mainElement = document.querySelector('.page-main');
const containerElement = mainElement.querySelector('.trip-events');

const pointsApiService = new PointsApiService(END_POINT, AUTHORIZATION);

const pointsModel = new PointsModel({ pointsApiService });
const destinationsModel = new DestinationsModel({ pointsApiService });
const offersModel = new OffersModel({ pointsApiService });
const filterModel = new FilterModel();
const mainPresenter = new MainPresenter({
  headerContainer: headerElement,
  mainContainer: containerElement,
  pointsModel,
  destinationsModel,
  offersModel,
  filterModel,
});
const headerPresenter = new HeaderPresenter({
  mainPresenter,
  headerContainer: headerElement,
  filtersContainer: filtersElement,
  pointsModel,
  destinationsModel,
  offersModel,
  filterModel,
});

const loadingComponent = new LoadingView();
render(loadingComponent, containerElement);

Promise.all([
  offersModel.init(),
  destinationsModel.init(),
  pointsModel.init()
]).then(() => {
  //console.log('Все данные загружены');
  remove(loadingComponent);
  mainPresenter.init();
  headerPresenter.init();
}).catch(() => {
  //console.error('Ошибка загрузки данных:', error);
});


