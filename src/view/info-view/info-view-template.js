import { getCurrentDate, getTotalBasePrice, getTotalOffersPrice, getDestination } from '../../utils';

function getDate(points) {
  return points === 1
    ? `${getCurrentDate(points.dateFrom)} - ${getCurrentDate(points.dateTo)}`
    : `${getCurrentDate(points[0].dateFrom)} - ${getCurrentDate(points[points.length - 1].dateTo)}`;
}

function getPrice(points, offers) {
  return points.reduce((sum, point) => sum + getTotalOffersPrice(point, offers), getTotalBasePrice(points));
}

function getDestinationMarkup(destinations, points) {
  const names = points.map((point) => getDestination(point.destination, destinations)?.name);
  return names.length <= 3 ? names.join(' — ') : `${names[0]} — ... —  ${names[names.length - 1]}`;
}

function createInfoTemplate(points, destinations, offers) {
  return `
    <section class="trip-main__trip-info trip-info">
      <div class="trip-info__main">
        <h1 class="trip-info__title">${getDestinationMarkup(destinations, points)}</h1>
        <p class="trip-info__dates">${getDate(points)}</p>
      </div>
      <p class="trip-info__cost">
        Total: &euro;&nbsp;<span class="trip-info__cost-value">${getPrice(points, offers)}</span>
      </p>
    </section>
  `;
}

export { createInfoTemplate };
