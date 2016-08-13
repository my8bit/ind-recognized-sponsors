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
        this.filterEvent(event);
      }, 150);
    });
  }

  filter(value, model) {
    return model.filter(model => {
      return this._filterBy.some(filterName => {
        const sourceString = !this._caseSensetive ?
          model[filterName].toUpperCase() : model[filterName];

        const searchString = !this._caseSensetive ? value.toUpperCase() : value;
        return sourceString.search(searchString) !== -1;
      });
    });
  }
  
  filterEvent(event) {
    if (this.value === event.srcElement.value) { return; }
    this.value = event.srcElement.value;
    this._model.model = this.filter(this.value, this._searchBase);
  }
}

export default Filter;
