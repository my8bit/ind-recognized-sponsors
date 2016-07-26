import Action from './action.js';

class Sort extends Action {
  constructor({ id, model, document }) {
    super({ id, model, document });
    this.el.addEventListener('click', this.sort.bind(this));
    this._order = true;
  }

  sort(e) {
    e.preventDefault();
    let results = this._searchBase.sort((a,b) => {
      return new Date(a.publishedDate) - new Date(b.publishedDate);
    });
    if (!this._order) { results = results.reverse(); }
    this._order = !this._order;
    this._model.model = results;
  }
}

export default Sort;
