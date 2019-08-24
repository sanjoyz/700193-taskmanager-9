export const Key = {
  ESCAPE_IE: `Escape`,
  ESCAPE: `Esc`,
};

export const Position = {
  AFTERBEGIN: `afterbegin`,
  BEFOREEND: `beforeend`
};

export const createElement = (template) => {
  const newDivElement = document.createElement(`div`);
  newDivElement.innerHTML = template;
  return newDivElement.firstChild;
};

export const render = (container, element, position) => {
  switch (position) {
    case Position.AFTERBEGIN:
      container.prepend(element);
      break;
    case Position.BEFOREEND:
      container.append(element);
      break;
  }
};

export const deleteElement = (element) => {
  if (element) {
    element.remove();
    // element.removeElement();
  }
};
