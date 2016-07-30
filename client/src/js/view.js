class View {
  constructor({ selector, model, document, template }) {
    this._el = document.querySelector(selector);
    model.onChange(updatedModel => {
      this.renderPug(updatedModel, template);
    });
    /*
    this.spinner = document.createElement('div');
    this.spinner.className = 'loading-spinner';
    this._el.parentNode.appendChild(this.spinner);
    */
  }

  renderPug(model, template) {
    /*
    var style = this._el.style.display;
    this._el.style.display = 'none';

    this.spinner.style.display = 'block';

    if (this.timer) {
      clearTimeout(this.timer);
    }
    this.timer = setTimeout(() => {
    */
    this._el.innerHTML = template({ model });
    /*
      this._el.style.display = style;
      this.spinner.style.display = 'none';
    }, 4);
    */
  }
}

export default View;
