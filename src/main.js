import BoardController from './controllers/board.js';
import {getMenuTemplate} from './components/site-menu.js';
import {getSearchTemplate} from './components/site-search.js';
import {getFilterTemplate} from './components/site-filter.js';
import {getTask} from './data.js';
import {filters} from './data.js';
import {render} from './utils.js';
import {createElement} from './utils.js';

const TASKS_TO_SHOW = 3;

const siteMainElement = document.querySelector(`.main`);
const siteHeadrElement = siteMainElement.querySelector(`.main__control`);
const menuElement = createElement(getMenuTemplate());
render(siteHeadrElement, menuElement, `beforeend`);
const searchElement = createElement(getSearchTemplate());
render(siteMainElement, searchElement, `beforeend`);
const filterElement = createElement(getFilterTemplate(filters));
render(siteMainElement, filterElement, `beforeend`);

const taskMocks = new Array(TASKS_TO_SHOW).fill(``).map(getTask);

const tasksContainer = document.querySelector(`.main`);
const boardController = new BoardController(tasksContainer, taskMocks);
boardController.init();
