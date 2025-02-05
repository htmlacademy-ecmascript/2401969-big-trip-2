import AddPointView from '../view/add-point-view';
import EditPointView from '../view/edit-point-view';
import ListView from '../view/list-view';
import PointView from '../view/point-view';
import SortView from '../view/sort-view';
import { render } from '../render';
import { RenderPosition } from '../render';

export default class ListPresenter {
  sortComponent = new SortView();
  listComponent = new ListView();

  constructor({ listContainer }) {
    this.listContainer = listContainer;
  }

  init() {
    render(this.sortComponent, this.listContainer);
    render(this.listComponent, this.listContainer);
    render(new AddPointView(), this.listComponent.getElement());
    render(
      new EditPointView(),
      this.listComponent.getElement(),
      RenderPosition.AFTERBEGIN
    );
    for (let i = 0; i < 3; i++) {
      render(new PointView(), this.listComponent.getElement());
    }
  }
}
