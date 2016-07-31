import Action from './action.js';

class Filter extends Action {
  constructor({ id, model, document, filterBy, caseSensetive }) {
    super({ id, model, document });
    this._addListener();
    this.value = '';
    this._filterBy = filterBy;
    this._caseSensetive = caseSensetive;
  }

  _addListener() {
    let timeout = null;
    this.el.addEventListener('keyup', event => {
      console.timeEnd('key');
      console.time('key');
      if (timeout) {
        clearTimeout(timeout);
      }
      timeout = setTimeout(() => {
        this.filter(event);
      }, 150);
    });
  }

  filter(event) {
    if (this.value === event.srcElement.value) { return; }
    this.value = event.srcElement.value;
    this._model.model = this._searchBase.filter(model => {
      return this._filterBy.some(filterName => {
        const sourceString = !this._caseSensetive ?
          model[filterName].toUpperCase() : model[filterName];

        const searchString = !this._caseSensetive ? this.value.toUpperCase() : this.value;
        return sourceString.search(searchString) !== -1;
      });
    });
  }
}

export default Filter;
