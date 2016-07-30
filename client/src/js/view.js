class View {
  constructor({ selector, model, document, template }) {
    this._el = document.querySelector(selector);
    this.tempContainer = document.createElement('div');
    model.onChange(updatedModel => {
      this.renderPug(updatedModel, template);
    });
  }

  renderPug(model, template) {
    const j = model.length;
    const chunkSize = 100;
    let temparray, chunkedModel;
    let i = 0;

    this._el.innerHTML = '';
    for (; i < j; i += chunkSize) {
      chunkedModel = model.slice(i, i + chunkSize);
      this.tempContainer.innerHTML = template({ model: chunkedModel });
      this.appendChildsToEl(this._el, this.tempContainer);
    }
  }

  appendChildsToEl(root, node) {
    while (node.children.length) {
      root.appendChild(node.children[0]);
    }
  }
}

export default View;
