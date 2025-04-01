const DateRange = {
  min: 1,
  max: 31,
};

const DESTINATION_VALUES = [
  'Amsterdam',
  'Geneva',
  'Chamonix',
  'Moscow',
  'Magadan',
];

const DESTINATION_DESCRIPTIONS = [
  'Это крупный город с богатой историей и культурой, в котором находятся знаменитые достопримечательности, такие как исторические здания и памятники.',
  'Город известен своей архитектурой в определенном стиле, расположен на берегах реки и славится музеями, дворцами и разводными мостами.',
  'Один из старейших городов, расположенный на слиянии двух рек. Город известен своими историческими сооружениями и ежегодной ярмаркой.',
  'Крупный промышленный и культурный центр, известный своей архитектурой, музеями и историческими событиями.',
  'Третий по численности населения город, расположенный в отдаленном регионе. Является важным транспортным узлом и научным центром, а также известен своими культурными учреждениями.',
];

const PHOTO_DESCRIPTIONS = [
  'Это величественное историческое здание, построенное в уникальном архитектурном стиле, которое является символом города и привлекает множество туристов.',
  'Живописный парк с красивыми садами, фонтанами и аллеями, где можно прогуляться и отдохнуть от городской суеты.',
  'Музей, в котором собрана обширная коллекция произведений искусства различных эпох и стилей, отражающих богатую культуру региона.',
  'Древняя крепость с мощными стенами и башнями, хранящая в себе многовековую историю и предлагающая захватывающие экскурсии для посетителей.',
  'Современный архитектурный комплекс с инновационным дизайном, включающий в себя выставочные залы, концертные площадки и другие культурные объекты.',
  'Величественный собор, построенный в готическом стиле, с высокими шпилями и витражными окнами, являющийся духовным центром города.',
  'Живописное озеро с чистой водой и живописными берегами, окруженное лесами и горами, предлагающее возможности для отдыха и рекреации.',
  'Археологический памятник, хранящий следы древних цивилизаций и открывающий окно в прошлое для любознательных посетителей.',
  'Современный научно-технический музей, демонстрирующий последние достижения в области науки и техники и вдохновляющий на инновации.',
  'Исторический район города с узкими улочками, старинными зданиями и атмосферой ушедших эпох, привлекающий туристов своей аутентичностью.',
];

const EVENT_TYPE_VALUES = [
  'taxi',
  'bus',
  'train',
  'ship',
  'drive',
  'flight',
  'check-in',
  'sightseeing',
  'restaurant',
];

const EVENT_TYPE_OFFERS = [
  'City tour',
  'Bike rental',
  'Sea fishing',
  'Hiking',
  'Wine tasting',
  'Boat tours',
  'Yacht rental',
  'Hot air balloon',
  'River rafting',
  'Museum visit',
  'Surfing lessons',
  'Horse riding',
  'Park visit',
  'Island tour',
  'Car rental',
  'Theater visit',
  'Cooking class',
  'Train ride',
  'Farm visit',
  'Water park',
];

const DATES_FROM = [
  '2025-01-10T20:41:04.116Z',
  '2025-01-15T20:41:04.116Z',
  '2025-01-20T20:41:04.116Z',
  '2025-02-10T20:41:04.116Z',
  '2025-02-15T20:41:04.116Z',
  '2025-02-20T20:41:04.116Z',
  '2025-03-10T20:41:04.116Z',
  '2025-03-15T20:41:04.116Z',
  '2025-03-20T20:41:04.116Z',
];

const DATES_TO = [
  '2025-03-10T20:41:04.116Z',
  '2025-03-15T20:41:04.116Z',
  '2025-03-20T20:41:04.116Z',
  '2025-04-10T20:41:04.116Z',
  '2025-04-15T20:41:04.116Z',
  '2025-04-20T20:41:04.116Z',
  '2025-05-10T20:41:04.116Z',
  '2025-05-15T20:41:04.116Z',
  '2025-05-20T20:41:04.116Z',
];

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

export {
  DateRange,
  DESTINATION_VALUES,
  DESTINATION_DESCRIPTIONS,
  PHOTO_DESCRIPTIONS,
  EVENT_TYPE_VALUES,
  EVENT_TYPE_OFFERS,
  DATES_FROM,
  DATES_TO,
  FilterType,
  FilterMessage,
  SortType,
  UserAction,
  UpdateType,
};
