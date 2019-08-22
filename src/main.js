import {getMenuTemplate} from './components/site-menu.js';
import {getSearchTemplate} from './components/site-search.js';
import {getFilterTemplate} from './components/site-filter.js';
import {getBoardTemplate} from './components/board.js';
import {getSortingTemplate} from './components/sort.js';
import {getLoadMoreButtonTemplate} from './components/load-more-button.js';
import {getTask} from './data.js';
import {filters} from './data.js';
import Task from './components/task.js';
import TaskEdit from './components/task-edit.js';
import {render} from './components/utils.js';
import {Position} from './components/utils.js';
import {createElement} from './components/utils.js';

const MAX_TASK_NUMBER = 15;
const TASKS_TO_SHOW = 3;

const siteMainElement = document.querySelector(`.main`);
const siteHeadrElement = siteMainElement.querySelector(`.main__control`);

render(siteHeadrElement, createElement(getMenuTemplate()), `beforeend`);
render(siteMainElement, createElement(getSearchTemplate()), `beforeend`);
render(siteMainElement, createElement(getFilterTemplate(filters)), `beforeend`);
render(siteMainElement, createElement(getBoardTemplate()), `beforeend`);
const boardElement = siteMainElement.querySelector(`.board`);
render(boardElement, createElement(getSortingTemplate()), `afterbegin`);
render(boardElement, createElement(getLoadMoreButtonTemplate()), `beforeend`);

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

taskMocks.forEach((taskMock) => renderTask(taskMock));

const onLoadMoreButtonClick = () => {
  taskMocks.forEach((taskMock) => renderTask(taskMock));
};
const loadMoreButtonElement = document.querySelector(`.load-more`);
loadMoreButtonElement.addEventListener(`click`, onLoadMoreButtonClick);
