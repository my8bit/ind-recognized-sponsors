class View {
  constructor({selector, model, events, document}) { //TODO fix this for destructuring
    this._dom = document;
    this._el = this._dom.querySelector(selector);
    this._parentEl = this._el.parentElement;
    const template = this.getTemplateForAttribute(this._el, 'repeat');
    this.events = events;

    if (!template) {
      console.warn('Please specify template.'); //TODO correct
      return;
    }
    this._model = model;

    this._model.onChange(model => {
      this.render(model, template, 'repeat');
    });
  }

  render(model, templ, type) {
    const container = this.makeInnerTemplate(model, templ, type);
    this._parentEl.innerHTML = '';
    this._parentEl.appendChild(container);
  }

  makeInnerTemplate(model, templ, type) {
    const container = this._dom.createDocumentFragment();
    let match;
    const templateRegex = /({{)(.*)(}})/g;
    model.forEach(modelItem => {
      let replaced = templ;
      while ((match = templateRegex.exec(templ)) !== null) {
        const inner = match[2].trim();
        const outer = match[0];
        let content;
        const pipe = inner.split('|');
        content = pipe.length > 1 ?
          this.transform(pipe[0].trim(), pipe[1].trim(), modelItem) :
          modelItem[inner];

        replaced = replaced.replace(outer, content);
      }
      let nextEl = this._el.cloneNode();
      nextEl.innerHTML = replaced;
      container.appendChild(nextEl);
    });

    return container;
  }

  transform(inner, type, modelItem) {
    let content;
    switch (type) {
      case 'link':
        content = decodeURIComponent(modelItem[inner]);
        break;
    }
    return content;
  }

  getTemplateForAttribute(el, attr) {
    const repeat = el.attributes[attr];
    if (!repeat) { return; }
    const templId = el.getAttribute(attr);
    return document.getElementById(templId).innerHTML;
  }

}

export default View;
