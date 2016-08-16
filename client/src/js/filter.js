class Filter {
  constructor({ model, filterBy, caseSensetive }) {
    this.value = '';
    this._filterBy = filterBy;
    this._caseSensetive = caseSensetive;
    model.onChangeOnce(model => this.initialModel = model.slice(0));
  }

  filter(value) {
    if (this.value === value) {
      return;
    } else {
      this.value = value;
    }
    return this.initialModel.filter(model => {
      return this._filterBy.some(filterName => {
        const sourceString = !this._caseSensetive ?
          model[filterName].toUpperCase() : model[filterName];
        const searchString = !this._caseSensetive ?
          value.toUpperCase() : value;
        return sourceString.search(searchString) !== -1;
      });
    });
  }

}

export default Filter;
