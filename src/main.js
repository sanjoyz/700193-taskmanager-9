import {getMenuTemplate} from './components/site-menu.js';
import {getSearchTemplate} from './components/site-search.js';
import {getFilterTemplate} from './components/site-filter.js';
import {getBoardTemplate} from './components/board.js';
import {getTaskTemplate} from './components/task.js';
import {getTaskEditTemplate} from './components/task-edit.js';
import {getSortingTemplate} from './components/sort.js';
import {getLoadMoreButtonTemplate} from './components/load-more-button.js';

const renderComponent = (container, template, place = `beforeend`) => {
  container.insertAdjacentHTML(place, template);
};

const siteMainElement = document.querySelector(`.main`);
const siteHeadrElement = siteMainElement.querySelector(`.main__control`);

renderComponent(siteHeadrElement, getMenuTemplate());
renderComponent(siteMainElement, getSearchTemplate());
renderComponent(siteMainElement, getFilterTemplate());
renderComponent(siteMainElement, getBoardTemplate());

const boardElement = siteMainElement.querySelector(`.board`);
const taskListElement = siteMainElement.querySelector(`.board__tasks`);

renderComponent(boardElement, getSortingTemplate(), `afterbegin`);

renderComponent(taskListElement, getTaskEditTemplate(), `beforeend`);

renderComponent(boardElement, getLoadMoreButtonTemplate(), `beforeend`);

for (let i = 0; i < 3; i++) {
  renderComponent(taskListElement, getTaskTemplate(), `beforeend`);
}
