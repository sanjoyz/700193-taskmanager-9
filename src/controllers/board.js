import Board from '../components/board.js';
import TaskList from '../components/task-list.js';
import {render} from '../utils.js';
import {deleteElement} from '../utils.js';
import {Position} from '../utils.js';
import TaskController from '../controllers/task.js';
import Sort from '../components/sort.js';
import LoadMoreButton from '../components/load-more-button.js';
export default class BoardController {
  constructor(container, tasks) {
    this._container = container;
    this._tasks = tasks;
    this._board = new Board();
    this._sort = new Sort();
    this._taskList = new TaskList();
    this._subscriptions = [];
    this._onChangeView = this._onChangeView.bind(this);
    this._onDataChange = this._onDataChange.bind(this);
    this._loadMoreButton = new LoadMoreButton();
  }
  init() {
    render(this._container, this._board.getElement(), Position.BEFOREEND);
    render(this._board.getElement(), this._sort.getElement(), Position.AFTERBEGIN);
    render(this._board.getElement(), this._taskList.getElement(), Position.BEFOREEND);

    this._tasks.forEach((taskMock) => this._renderTask(taskMock));
    this._sort.getElement().addEventListener(`click`, (evt) => this._onSortLinkClick(evt));
    //
    render(this._board.getElement(), this._loadMoreButton.getElement(), Position.BEFOREEND);

    const onLoadMoreButtonClick = () => {
      this._tasks.forEach((taskMock) => this._renderTask(taskMock));
    };
    this._loadMoreButton.getElement().addEventListener(`click`, onLoadMoreButtonClick);
  }
  _renderBoard(tasks) {
    deleteElement(this._taskList.getElement());
    deleteElement(this._sort.getElement());
    this._sort.removeElement();
    this._taskList.removeElement();
    render(this._board.getElement(), this._taskList.getElement(), Position.AFTERBEGIN);
    render(this._board.getElement(), this._sort.getElement(), Position.AFTERBEGIN);
    tasks.forEach((taskMock) => this._renderTask(taskMock));
  }
  _renderTask(task) {
    const taskController = new TaskController(this._taskList, task, this._onDataChange, this._onChangeView);
    this._subscriptions.push(taskController.setDefaultView.bind(taskController));
  }
  _onDataChange(newData, oldData) {
    this._tasks[this._tasks.findIndex((it) => it === oldData)] = newData;
    this._renderBoard(this._tasks.filter((item) => !item.isArchive));
  }
  _onChangeView() {
    this._subscriptions.forEach((it) => it());
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
