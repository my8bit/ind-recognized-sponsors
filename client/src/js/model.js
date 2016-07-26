import 'whatwg-fetch';

class Model {
  constructor(url) {
    this._url = url;
    this._model = [];
    this._callbacks = [];
    this._callbacksOnce = [];
  }

  get model() {
    return this._model;
  }

  set model(model) {
    this._model = model;
    this._callbacks.forEach(callback => callback(model));
    this._callbacksOnce.forEach(callback => callback(model));
    this._callbacksOnce = [];
  }

  init() {
    return fetch(this._url)
      .then(response => { return response.json(); })
      .then(data => { this.model = data; });
  }

  onChange(callback) {
    if (typeof (callback) !== 'function') { return; }
    this._callbacks.push(callback);
  }

  onChangeOnce(callback) {
    if (typeof (callback) !== 'function') { return; }
    this._callbacksOnce.push(callback);
  }
}

export default Model;
