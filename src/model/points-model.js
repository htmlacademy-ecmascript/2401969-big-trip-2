import { createPoint } from '../mock/mockPoint';
import Observable from '../framework/observable.js';

const POINS_QTY = 10;

export default class PointsModel extends Observable {
  #points = Array.from({ length: POINS_QTY }, createPoint);

  get points() {
    return this.#points;
  }

  updatePoint(updateType, update) {
    //Ищем точку по уникальному id
    const index = this.#points.findIndex((point) => point.id === update.id);

    //Если не находим - выбрасываем ошибку
    if (index === -1) {
      throw new Error('Can\'t update unexisting point');
    }

    //Начинаем выплнять обновление
    this.#points = [
      ...this.#points.slice(0, index),
      update,
      ...this.#points.slice(index + 1),
    ];

    this._notify(updateType, update);
  }

  addPoint(updateType, update) {
    this.#points = [
      update,
      ...this.#points,
    ];

    this._notify(updateType, update);
  }

  deletePoint(updateType, update) {
    const index = this.#points.findIndex((point) => point.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t delete unexisting point');
    }

    this.#points = [
      ...this.#points.slice(0, index),
      ...this.#points.slice(index + 1),
    ];

    this._notify(updateType);
  }
}
