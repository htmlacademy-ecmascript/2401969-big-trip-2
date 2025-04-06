const FilterType = {
  EVERYTHING: 'everything',
  FUTURE: 'future',
  PRESENT: 'present',
  PAST: 'past',
};

const FilterMessage = {
  EVERYTHING: 'Click New Event to create your first point',
  PAST: 'There are no past events now',
  PRESENT: 'There are no present events now',
  FUTURE: 'There are no future events now',
};

const SortType = {
  DAY: { name: 'day', isActive: true,},
  EVENT: { name: 'event', isActive: false},
  TIME: { name: 'time', isActive: true },
  PRICE: { name: 'price', isActive: true },
  OFFERS: { name: 'offers', isActive: false },
};

const UserAction = {
  UPDATE_POINT: 'UPDATE_POINT',
  ADD_POINT: 'ADD_POINT',
  DELETE_POINT: 'DELETE_POINT',
};

const UpdateType = {
  POINT: 'POINT',
  POINTS_LIST: 'POINTS_LIST',
  MAIN_COMPONENT: 'MAIN_COMPONENT',
  INIT: 'INIT',
};

const TimeLimit = {
  LOWER_LIMIT: 350,
  UPPER_LIMIT: 1000,
};

const Mode = {
  VIEW: 'VIEW',
  EDIT: 'EDIT',
};

export {
  FilterType,
  FilterMessage,
  SortType,
  UserAction,
  UpdateType,
  TimeLimit,
  Mode
};
