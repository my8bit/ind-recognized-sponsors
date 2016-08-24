import {router} from './router.js';

class View {
  constructor({ selector, model, document, template, filter }) {
    this._el = document.querySelector(selector);
    this.tempContainer = document.createElement('div');
    this.model = model;
    this.model.onChange(model => {
      if (router.isRecent()) {
        this.renderPug(model, template);
      } else {
        this.model.model = filter.filter.filter(router.getSearchQuery());
      }
    });
    this.initFilter(filter);
  }

  renderPug(model, template) {
    const j = model.length;
    const chunkSize = 100;
    let chunkedModel;
    let i = 0;

    while (this._el.firstChild) {
      this._el.removeChild(this._el.firstChild);
    }

    for (; i < j; i += chunkSize) {
      chunkedModel = model.slice(i, i + chunkSize);
      this.tempContainer.innerHTML = template({ model: chunkedModel });
      this.appendChildsToEl(this._el, this.tempContainer);
    }
  }

  appendChildsToEl(root, node) {
    while (node.firstChild) {
      root.appendChild(node.firstChild);
    }
  }

  initFilter(filter) {
    let timeout = null;
    const model = this.model; //TODO fix this
    const el = document.getElementById(filter.id);
    el.addEventListener('keyup', event => {
      if (timeout) {
        clearTimeout(timeout);
      }
      timeout = setTimeout(() => {
        model.model = filter.filter.filter(event.srcElement.value);
      }, 150);
    });
  }
}

export default View;
