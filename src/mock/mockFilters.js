import { filters } from '../utils';

function createFilters(points) {
  return Object.entries(filters).map(([filterType, filterPoints]) => ({
    type: filterType,
    qty: filterPoints(points).length,
  }));
}

export { createFilters };
