import { FilterMessage } from '../../const';

function createNoPointViewTemplate(messageType) {
  return `<p class="trip-events__msg">${FilterMessage[messageType]}</p>`;
}

export { createNoPointViewTemplate };
