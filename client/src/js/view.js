class View {
  constructor({ selector, model, document, template }) {
    this._el = document.querySelector(selector);
    this.tempContainer = document.createElement('div');
    model.onChange(updatedModel => {
      this.renderPug(updatedModel, template);
    });
  }

  renderPug(model, template) {
    //console.time('start rendering');
    const j = model.length;
    const chunkSize = 100;
    let temparray, chunkedModel;
    let i = 0;

    while (this._el.firstChild) {
      this._el.removeChild(this._el.firstChild);
    }

    setTimeout(() => {
      for (; i < j; i += chunkSize) {
        chunkedModel = model.slice(i, i + chunkSize);
        this.tempContainer.innerHTML = template({ model: chunkedModel });
        this.appendChildsToEl(this._el, this.tempContainer);
      }
      //console.timeEnd('start rendering');
    }, 0);
  }

  appendChildsToEl(root, node) {
    while (node.firstChild) {
      root.appendChild(node.firstChild);
    }
  }
}

export default View;
