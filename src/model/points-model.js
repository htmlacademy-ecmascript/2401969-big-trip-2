import { createPoint } from '../mock/mockPoint';

const POINS_QTY = 5;

export default class PointsModel {
  #points = Array.from({ length: POINS_QTY }, createPoint);

  get points() {
    return this.#points;
  }
}
