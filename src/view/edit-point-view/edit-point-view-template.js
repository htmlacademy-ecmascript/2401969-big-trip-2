import dayjs from 'dayjs';
import { capitalize } from '../../utils';
import he from 'he';

function createTypeTemplate({ type }, id) {
  const typeText = capitalize(type);
  return `<div class="event__type-item">
            <input id="event-type-${type}-${id}"
            class="event__type-input  visually-hidden" type="radio" name="event-type" value="${type}">
            <label class="event__type-label  event__type-label--${type}" for="event-type-${type}-${id}">${typeText}</label>
            </div>
          `;
}

const createNameTemplate = ({ name }) => `<option value="${name}"></option>`;

function createOffersTemplate(typeOffers, pointOffers, point) {
  if (typeOffers.length !== 0) {
    return `<section class="event__section  event__section--offers">
           <h3 class="event__section-title  event__section-title--offers">Offers</h3>
           <div class="event__available-offers">
            ${typeOffers
    .map(({ id, title, price }) => {
      const isChecked = pointOffers.includes(id)
        ? 'checked'
        : '';
      return `<div class="event__offer-selector">
                <input class="event__offer-checkbox  visually-hidden"
                id="${id}"
                data-offer-id="${id}"
                type="checkbox" name="event-offer-${id}"
                ${isChecked}
                ${point.isDisabled ? 'disabled' : ''}>
                <label class="event__offer-label" for="${id}">
                <span class="event__offer-title">${title}</span>
                &plus;&euro;&nbsp;
                <span class="event__offer-price">${price}</span>
                </label>
              </div>`;
    }).join('')}
            </div>
          </section>`;
  }
  return '';
}

function createDestinationPhotoTemplate(pictures) {
  if (pictures.length !== 0) {
    return `<div class="event__photos-container">
              <div class="event__photos-tape">
               ${pictures.map((picture) => `<img class="event__photo" src="${picture.src}" alt="${picture.description}">`)
    .join('')}
      </div>
    </div>`;
  }
  return '';
}

function createDestinationTemplate({description, pictures}) {
  if (!description && pictures.length === 0) {
    return '';
  }
  return `<section class="event__section  event__section--destination">
                    <h3 class="event__section-title  event__section-title--destination">Destination</h3>
                    ${description ? `<p class="event__destination-description">${description}</p>` : ''}
                    ${createDestinationPhotoTemplate(pictures)}
                  </section>`;
}

function createEditPointTemplate(point, destinations, offers) {
  const { id, type, basePrice, dateFrom, dateTo, isDisabled, isSaving, isDeleting } = point;
  const editPointDestination = destinations.find((destination) => destination.id === point.destination) || '';
  const { name, } = editPointDestination;
  const pointOffersByType = offers.find((offer) => offer.type === point.type);

  const typesTemplate = offers.map((offer) => createTypeTemplate(offer, id)).join('');
  const namesTemplate = destinations.map((destination) => createNameTemplate(destination)).join('');
  const offersTemplate = createOffersTemplate(
    pointOffersByType.offers,
    point.offers,
    point,
  );
  const destinationTemplate = createDestinationTemplate(editPointDestination);

  const dateStart = dayjs(dateFrom).format('DD/MM/YY HH:mm');
  const dateFinish = dayjs(dateTo).format('DD/MM/YY HH:mm');

  return `<li class="trip-events__item">
           <form class="event event--edit" action="#" method="post">
              <header class="event__header">
                <div class="event__type-wrapper">
                  <label class="event__type  event__type-btn" for="event-type-toggle-${id}">
                    <span class="visually-hidden">Choose event type</span>
                    <img class="event__type-icon" width="17" height="17" src="img/icons/${type}.png" alt="Event type icon">
                  </label>
                  <input class="event__type-toggle  visually-hidden"
                  id="event-type-toggle-${id}" type="checkbox"
                  ${isDisabled ? 'disabled' : ''}>

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
                  <input class="event__input  event__input--destination"
                  id="event-destination-${id}" type="text" name="event-destination" value="${name}"
                  list="destination-list-${id}"
                  ${isDisabled ? 'disabled' : ''}>
                  <datalist id="destination-list-${id}">
                    ${namesTemplate}
                  </datalist>
                </div>

                <div class="event__field-group  event__field-group--time">
                  <label class="visually-hidden" for="event-start-time">From</label>
                  <input class="event__input  event__input--time"
                  id="event-start-time" type="text" name="event-start-time" value="${dateStart}"
                  ${isDisabled ? 'disabled' : ''}>
                  &mdash;
                  <label class="visually-hidden" for="event-end-time">To</label>
                  <input class="event__input  event__input--time"
                  id="event-end-time" type="text" name="event-end-time" value="${dateFinish}"
                 ${isDisabled ? 'disabled' : ''}>
                </div>

                <div class="event__field-group  event__field-group--price">
                 <label class="event__label" for="event-price-${id}">
                    <span class="visually-hidden">Price</span>
                    &euro;
                  </label>
                  <input class="event__input  event__input--price"
                  id="event-price-${id}" type="number" name="event-price"
                  value="${he.encode(String(basePrice))}"
                  ${isDisabled ? 'disabled' : ''}>
                </div>

                <button class="event__save-btn  btn  btn--blue"
                type="submit" ${isDisabled ? 'disabled' : ''}>${isSaving ? 'Saving...' : 'Save'}</button>
                <button class="event__reset-btn"
                type="reset" ${isDisabled ? 'disabled' : ''}>${isDeleting ? 'Deleting...' : 'Delete'}</button>
                <button class="event__rollup-btn" type="button">
                  <span class="visually-hidden">Open event</span>
                </button>
              </header>
              <section class="event__details">
                ${offersTemplate}
                ${destinationTemplate}
              </section>
            </form>
          </li>`;
}

export { createEditPointTemplate };
