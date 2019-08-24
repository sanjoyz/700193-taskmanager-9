import {getMenuTemplate} from './components/site-menu.js';
import {getSearchTemplate} from './components/site-search.js';
import {getFilterTemplate} from './components/site-filter.js';
import {getBoardTemplate} from './components/board.js';
import {getSortingTemplate} from './components/sort.js';
import {getLoadMoreButtonTemplate} from './components/load-more-button.js';
import {noTasksTemplate} from './components/no-task.js';
import {getTask} from './data.js';
import {filters} from './data.js';
import Task from './components/task.js';
import TaskEdit from './components/task-edit.js';
import {render} from './components/utils.js';
import {Position} from './components/utils.js';
import {createElement} from './components/utils.js';

const MAX_TASK_NUMBER = 15;
const TASKS_TO_SHOW = 0;

const siteMainElement = document.querySelector(`.main`);
const siteHeadrElement = siteMainElement.querySelector(`.main__control`);
const menuElement = createElement(getMenuTemplate());
render(siteHeadrElement, menuElement, `beforeend`);
const searchElement = createElement(getSearchTemplate());
render(siteMainElement, searchElement, `beforeend`);
const filterElement = createElement(getFilterTemplate(filters));
render(siteMainElement, filterElement, `beforeend`);
const boardElement = createElement(getBoardTemplate());
render(siteMainElement, boardElement, `beforeend`);
const boardElementSelector = siteMainElement.querySelector(`.board`);
const sortingElement = createElement(getSortingTemplate());
render(boardElementSelector, sortingElement, `afterbegin`);
const loadMoreButtonElement = createElement(getLoadMoreButtonTemplate());
render(boardElementSelector, loadMoreButtonElement, `beforeend`);

const renderTask = (taskMock) => {

  const task = new Task(taskMock);
  const taskEdit = new TaskEdit(taskMock);
  if (document.querySelectorAll(`.card`).length > MAX_TASK_NUMBER) {
    boardElement.querySelector(`.load-more`).classList.add(`visually-hidden`);
    return;
  }
  const onEscKeyDown = (evt) => {
    if (evt.key === `Escape` || evt.key === `Esc`) {
      tasksContainer.replaceChild(task.getElement(), taskEdit.getElement());
      document.removeEventListener(`keydown`, onEscKeyDown);
    }
  };

  task.getElement().querySelector(`.card__btn--edit`).addEventListener(`click`, () => {
    tasksContainer.replaceChild(taskEdit.getElement(), task.getElement());
    document.addEventListener(`keydown`, onEscKeyDown);
  });

  taskEdit.getElement().querySelector(`textarea`).addEventListener(`focus`, () => {
    document.removeEventListener(`keydown`, onEscKeyDown);
  });

  taskEdit.getElement().querySelector(`textarea`).addEventListener(`blur`, () => {
    document.addEventListener(`keydown`, onEscKeyDown);
  });

  taskEdit.getElement().querySelector(`.card__save`).addEventListener(`click`, () => {
    tasksContainer.replaceChild(task.getElement(), taskEdit.getElement());
    document.removeEventListener(`keydown`, onEscKeyDown);
  });
  render(tasksContainer, task.getElement(), Position.BEFOREEND);

};

const taskMocks = new Array(TASKS_TO_SHOW).fill(``).map(getTask);
const tasksContainer = document.querySelector(`.board__tasks`);
if (taskMocks.length > 0) {
  taskMocks.forEach((taskMock) => renderTask(taskMock));
} else {
  render(tasksContainer, createElement(noTasksTemplate()), `beforeend`);
}

const onLoadMoreButtonClick = () => {
  taskMocks.forEach((taskMock) => renderTask(taskMock));
};
const loadMoreButtonElementSelector = document.querySelector(`.load-more`);
loadMoreButtonElementSelector.addEventListener(`click`, onLoadMoreButtonClick);
