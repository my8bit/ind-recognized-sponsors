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
      if (timeout) {
        clearTimeout(timeout);
      }
      timeout = setTimeout(() => {
        if (this.value === event.srcElement.value) { return; }
        this.value = event.srcElement.value;
        this.filter(this.value);
      }, 150);
    });
  }

  filter(value) {
    this._model.model = this._searchBase.filter(model => {
      return this._filterBy.some(filterName => {
        const sourceString = !this._caseSensetive ?
          model[filterName].toUpperCase() : model[filterName];

        const searchString = !this._caseSensetive ? value.toUpperCase() : value;
        return sourceString.search(searchString) !== -1;
      });
    });
  }
}

export default Filter;
