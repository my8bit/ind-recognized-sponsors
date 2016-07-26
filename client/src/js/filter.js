import Action from './action.js';

class Filter extends Action {
  constructor({ id, model, document, filterBy, caseSensetive }) {
    super({ id, model, document });
    this._addListener();
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
        this.filter(event);
      }, 100);
    });
  }

  filter(event) {
    const value = event.srcElement.value;
    this._model.model = this._searchBase.filter(model => {
      return this._filterBy.some(filterName => {
        const sourceString = !this._caseSensetive ?
          model[filterName].toUpperCase() : model[filterName];

        const searchString = !this._caseSensetive ? value.toUpperCase() : value;
        return !!~sourceString.search(searchString);
      });
    });
  }
}

export default Filter;
