import dayjs from 'dayjs';
import { capitalize } from '../../utils';

const createNameTemplate = ({ name }) => `<option value="${name}"></option>`;

const createDestinationPhotoTemplate = (photos) =>
  photos
    .map(
      (photo) =>
        `<img class="event__photo" src="${photo.src}" alt="${photo.description}">`
    )
    .join('');

function createTypeTemplate({ type }, id) {
  const typeText = capitalize(type);
  return `<div class="event__type-item">
                          <input id="event-type-${type}-${id}" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${type}">
                          <label class="event__type-label  event__type-label--${type}" for="event-type-${type}-${id}">${typeText}</label>
                        </div>
                        `;
}

function createOffersTemplate(typeOffers, pointOffers) {
  return typeOffers
    .map((offer) => {
      const checked = pointOffers.includes(offer.id) ? 'checked' : '';
      return `<div class="event__offer-selector">
                        <input class="event__offer-checkbox  visually-hidden" id="${offer.id}" type="checkbox" name="event-offer-luggage" ${checked}>
                        <label class="event__offer-label" for="${offer.id}">
                          <span class="event__offer-title">${offer.title}</span>
                          &plus;&euro;&nbsp;
                          <span class="event__offer-price">${offer.price}</span>
                        </label>
                      </div>`;
    })
    .join('');
}

function createEditPointTemplate(point, destinations, offers) {
  const { id, type, basePrice, dateFrom, dateTo } = point;
  const editPointDestination = destinations.find(
    (destination) => destination.id === point.destination
  );
  const { name, description, photos } = editPointDestination;
  const namesTemplate = destinations.map((destination) =>
    createNameTemplate(destination)
  );
  const photoTemplate = createDestinationPhotoTemplate(photos);
  const pointOffersByType = offers.find((offer) => offer.type === point.type);
  const typesTemplate = offers
    .map((offer) => createTypeTemplate(offer, id))
    .join('');
  const offersTemplate = createOffersTemplate(
    pointOffersByType.offers,
    point.offers
  );
  const dateStart = dayjs(dateFrom).format('DD/MM/YY HH:mm');
  const dateFinish = dayjs(dateTo).format('DD/MM/YY HH:mm');

  return `<form class="event event--edit" action="#" method="post">
                <header class="event__header">
                  <div class="event__type-wrapper">
                    <label class="event__type  event__type-btn" for="event-type-toggle-${id}">
                      <span class="visually-hidden">Choose event type</span>
                      <img class="event__type-icon" width="${id}7" height="${id}7" src="img/icons/${type}.png" alt="Event type icon">
                    </label>
                    <input class="event__type-toggle  visually-hidden" id="event-type-toggle-${id}" type="checkbox">

                    <div class="event__type-list">
                      <fieldset class="event__type-group">
                        <legend class="visually-hidden">Event type</legend>
                        ${typesTemplate}
                      </fieldset>
                    </div>
                      </fieldset>
                    </div>
                  </div>

                  <div class="event__field-group  event__field-group--destination">
                    <label class="event__label  event__type-output" for="event-destination-${id}">
                      ${type}
                    </label>
                    <input class="event__input  event__input--destination" id="event-destination-${id}" type="text" name="event-destination" value="${name}" list="destination-list-${id}">
                    <datalist id="destination-list-${id}">
                      ${namesTemplate}
                    </datalist>
                  </div>

                  <div class="event__field-group  event__field-group--time">
                    <label class="visually-hidden" for="event-start-time-${id}">From</label>
                    <input class="event__input  event__input--time" id="event-start-time-${id}" type="text" name="event-start-time" value="${dateStart}">
                    &mdash;
                    <label class="visually-hidden" for="event-end-time-${id}">To</label>
                    <input class="event__input  event__input--time" id="event-end-time-${id}" type="text" name="event-end-time" value="${dateFinish}">
                  </div>

                  <div class="event__field-group  event__field-group--price">
                    <label class="event__label" for="event-price-${id}">
                      <span class="visually-hidden">Price</span>
                      &euro;
                    </label>
                    <input class="event__input  event__input--price" id="event-price-${id}" type="text" name="event-price" value="${basePrice}">
                  </div>

                  <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
                  <button class="event__reset-btn" type="reset">Cancel</button>
                </header>
                <section class="event__details">
                  <section class="event__section  event__section--offers">
                    <h3 class="event__section-title  event__section-title--offers">Offers</h3>

                    <div class="event__available-offers">
                    ${offersTemplate}
                    </div>
                  </section>

                  <section class="event__section  event__section--destination">
                    <h3 class="event__section-title  event__section-title--destination">Destination</h3>
                    <p class="event__destination-description">${description}</p>
                    <div class="event__photos-container">
                      <div class="event__photos-tape">
                        ${photoTemplate}
                      </div>
                    </div>
                  </section>
                </section>
              </form>`;
}

export { createEditPointTemplate };
