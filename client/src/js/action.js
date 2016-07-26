class Action {
  constructor({document, id, model}) {
    this._searchBase = [];
    this._model = model;
    this.el = document.getElementById(id);
    this._model.onChangeOnce(model => {
      this._searchBase = model.slice(0);
    });
  }
}

export default Action;
