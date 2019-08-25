import AbstractComponent from '../components/abstract-component.js';
export default class LoadMoreButton extends AbstractComponent {
  getTemplate() {
    return `<button class="load-more" type="button">load more</button>`.trim();
  }
}
