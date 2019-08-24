import Board from '../components/board.js';
import TaskList from '../components/task-list.js';
import {render} from '../utils.js';
import {Position} from '../utils.js';
import {Key} from '../utils.js';
import Task from '../components/task.js';
import TaskEdit from '../components/task-edit.js';
import Sort from '../components/sort.js';
import LoadMoreButton from '../components/load-more-button.js';
export default class BoardController {
  constructor(container, tasks) {
    this._container = container;
    this._tasks = tasks;
    this._board = new Board();
    this._sort = new Sort();
    this._taskList = new TaskList();
    this._loadMoreButton = new LoadMoreButton();
  }
  init() {
    render(this._container, this._board.getElement(), Position.BEFOREEND);
    render(this._board.getElement(), this._sort.getElement(), Position.AFTERBEGIN);
    render(this._board.getElement(), this._taskList.getElement(), Position.BEFOREEND);

    this._tasks.forEach((taskMock) => this._renderTask(taskMock));
    this._sort.getElement().addEventListener(`click`, (evt) => this._onSortLinkClick(evt));

    render(this._board.getElement(), this._loadMoreButton.getElement(), Position.BEFOREEND);

    const onLoadMoreButtonClick = () => {
      this._tasks.forEach((taskMock) => this._renderTask(taskMock));
    };
    const loadMoreButtonElement = document.querySelector(`.load-more`);
    loadMoreButtonElement.addEventListener(`click`, onLoadMoreButtonClick);
  }
  _renderTask(task) {
    const taskComponent = new Task(task);
    const taskEditComponent = new TaskEdit(task);

    const onEscKeyDown = (evt) => {
      if (evt.key === Key.ESCAPE || evt.key === Key.ESCAPE_IE) {
        this._taskList.getElement().replaceChild(taskComponent.getElement(), taskEditComponent.getElement());
        document.removeEventListener(`keydown`, onEscKeyDown);
      }
    };

    taskComponent.getElement().querySelector(`.card__btn--edit`).addEventListener(`click`, () => {
      this._taskList.getElement().replaceChild(taskEditComponent.getElement(), taskComponent.getElement());
      document.addEventListener(`keydown`, onEscKeyDown);
    });

    taskEditComponent.getElement().querySelector(`textarea`).addEventListener(`focus`, () => {
      document.removeEventListener(`keydown`, onEscKeyDown);
    });

    taskEditComponent.getElement().querySelector(`textarea`).addEventListener(`blur`, () => {
      document.addEventListener(`keydown`, onEscKeyDown);
    });

    taskEditComponent.getElement().querySelector(`.card__save`).addEventListener(`click`, () => {
      this._taskList.getElement().replaceChild(taskComponent.getElement(), taskEditComponent.getElement());
      document.removeEventListener(`keydown`, onEscKeyDown);
    });
    render(this._taskList.getElement(), taskComponent.getElement(), Position.BEFOREEND);


  }
  _onSortLinkClick(evt) {
    evt.preventDefault();

    if (evt.target.tagName !== `A`) {
      return;
    }
    this._taskList.getElement().innerHTML = ``;
    switch (evt.target.dataset.sortType) {
      case `date-up`:
        const sortedByDateUpTasks = this._tasks.slice().sort((a, b) => a.dueDate - b.dueDate);
        sortedByDateUpTasks.forEach((taskMock) => this._renderTask(taskMock));
        break;
      case `date-down`:
        const sortedByDateDownTasks = this._tasks.slice().sort((a, b) => b.dueDate - a.dueDate);
        sortedByDateDownTasks.forEach((taskMock) => this._renderTask(taskMock));
        break;
      case `default`:
        this._tasks.forEach((taskMock) => this._renderTask(taskMock));
        break;
    }
  }

}
