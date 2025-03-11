import dayjs from 'dayjs';
import { humanizeDate, getDuration } from '../../utils';

const createOfferTemplate = ({ title, price }) =>
  `<li class="event__offer">
    <span class="event__offer-title">${title}</span>
    &plus;&euro;&nbsp;
    <span class="event__offer-price">${price}</span>
  </li>
`;

function createPointTemplate(point, destinations, offers) {
  const { basePrice, dateFrom, dateTo, type, isFavorite } = point;
  const pointDestination = destinations.find(
    (destination) => destination.id === point.destination
  );
  const { name } = pointDestination;
  const pointOffersByType = offers.find((offer) => offer.type === point.type);
  const pointOffers = pointOffersByType.offers.filter((item) =>
    point.offers.includes(item.id)
  );
  const pointOffersTemplate = pointOffers
    .map((offer) => createOfferTemplate(offer))
    .join('');
  const dateStart = humanizeDate(dateFrom);
  const timeStart = dayjs(dateFrom).format('HH:mm');
  const timeFinish = dayjs(dateTo).format('HH:mm');
  const duration = getDuration(dateFrom, dateTo);
  const favotiteClassName = isFavorite ? 'event__favorite-btn--active' : '';

  return `<li class="trip-events__item">
              <div class="event">
                <time class="event__date" datetime="${dateFrom}">${dateStart}</time>
                <div class="event__type">
                  <img class="event__type-icon" width="42" height="42" src="img/icons/${type}.png" alt="Event type icon">
                </div>
                <h3 class="event__title">${type} ${name}</h3>
                <div class="event__schedule">
                  <p class="event__time">
                    <time class="event__start-time" datetime="${dateFrom}">${timeStart}</time>
                    &mdash;
                    <time class="event__end-time" datetime="${dateTo}">${timeFinish}</time>
                  </p>
                  <p class="event__duration">${duration}</p>
                </div>
                <p class="event__price">
                  &euro;&nbsp;<span class="event__price-value">${basePrice}</span>
                </p>
                <h4 class="visually-hidden">Offers:</h4>
                <ul class="event__selected-offers">
                  ${pointOffersTemplate}
                </ul>
                <button class="event__favorite-btn ${favotiteClassName}" type="button">
                  <span class="visually-hidden">Add to favorite</span>
                  <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
                    <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
                  </svg>
                </button>
                <button class="event__rollup-btn" type="button">
                  <span class="visually-hidden">Open event</span>
                </button>
              </div>
            </li>`;
}

export { createPointTemplate };
