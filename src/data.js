export const getTask = () => ({
  description: [
    `Изучить теорию`,
    `Сделать домашку`,
    `Пройти интенсив на соточку`,
  ][Math.floor(Math.random() * 4)],
  dueDate: Date.now() + 1 + Math.floor(Math.random() * 7) * 24 * 60 * 60 * 1000,
  repeatingDays: {
    'Mo': false,
    'Tu': false,
    'We': Boolean(Math.round(Math.random())),
    'Th': false,
    'Fr': Boolean(Math.round(Math.random())),
    'Sa': false,
    'Su': false,
  },
  tags: new Set([
    `homework`,
    `theory`,
    `practice`,
    `intesive`,
    `keks`,
  ]),
  color: [
    `black`,
    `yellow`,
    `blue`,
    `green`,
    `pink`,
  ][Math.floor(Math.random() * 5)],
  isFavorite: Boolean(Math.round(Math.random())),
  isArchive: Boolean(Math.round(Math.random())),
});

export const getTasksArray = (number) => new Array(number).fill(``).map(() => getTask());
/*
 export const allTasks = (n) => ([
  getTask()
]); */

export const filters = [
  {
    title: `all`,
    count: 13,
  },
  {
    title: `overdue`,
    count: 0,
  },
  {
    title: `today`,
    count: 1,
  },
  {
    title: `favorites`,
    count: 1,
  },
  {
    title: `repeating`,
    count: 1,
  },
  {
    title: `tags`,
    count: 1,
  },
  {
    title: `archive`,
    count: 115,
  }];


// функция, в параметры которой будет передаваться фильтр.
// она будет считать количество подходящих карточек на основе renderTasks()
