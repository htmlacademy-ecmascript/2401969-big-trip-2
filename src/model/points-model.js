import { createPoint } from '../mock/mockPoint';

const POINS_QTY = 5;

export default class PointsModel {
  points = Array.from({ length: POINS_QTY }, createPoint);

  getPoints() {
    return this.points;
  }
}
