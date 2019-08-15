import {getMenuTemplate} from './components/site-menu.js';
import {getSearchTemplate} from './components/site-search.js';
import {getFilterTemplate} from './components/site-filter.js';
import {getBoardTemplate} from './components/board.js';
import {getTaskTemplate} from './components/task.js';
import {getTaskEditTemplate} from './components/task-edit.js';
import {getSortingTemplate} from './components/sort.js';
import {getLoadMoreButtonTemplate} from './components/load-more-button.js';
// import {getTask} from './data.js';
import {getTasksArray} from './data.js';

import {filters} from './data.js';

const MAX_TASK_NUMBER = 16;
const TASKS_TO_SHOW = 7;

const renderComponent = (container, template, place = `beforeend`) => {
  container.insertAdjacentHTML(place, template);
};

const renderTasks = (tasks) => {
  const boardTaskElement = document.querySelector(`.board__tasks`);
  tasks.forEach((task) => {
    if (document.querySelectorAll(`.card`).length === MAX_TASK_NUMBER) {
      boardElement.querySelector(`.load-more`).classList.add(`visually-hidden`);
      return;
    }
    renderComponent(boardTaskElement, getTaskTemplate(task));
  });
};

const siteMainElement = document.querySelector(`.main`);
const siteHeadrElement = siteMainElement.querySelector(`.main__control`);

renderComponent(siteHeadrElement, getMenuTemplate());
renderComponent(siteMainElement, getSearchTemplate());
renderComponent(siteMainElement, getFilterTemplate(filters));
renderComponent(siteMainElement, getBoardTemplate());

const boardElement = siteMainElement.querySelector(`.board`);
const taskListElement = siteMainElement.querySelector(`.board__tasks`);

renderComponent(boardElement, getSortingTemplate(), `afterbegin`);

renderComponent(taskListElement, getTaskEditTemplate(), `beforeend`);

renderComponent(boardElement, getLoadMoreButtonTemplate(), `beforeend`);

renderTasks(getTasksArray(TASKS_TO_SHOW));

const onLoadMoreButtonClick = () => {
  renderTasks(getTasksArray(TASKS_TO_SHOW));
};
const loadMoreButtonElement = document.querySelector(`.load-more`);
loadMoreButtonElement.addEventListener(`click`, onLoadMoreButtonClick);
