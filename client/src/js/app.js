import Model from './model.js'; //refactor to use not file
import View from './view.js';
import Filter from './filter.js';
import config from './config.js';

const model = new Model(config.url);
model.init();
const view = new View({
  selector: config.list,
  model: model,
  document: document,
  template: config.template
});
const filterConfig = {
  id: config.filterId,
  model: model,
  document: document,
  filterBy: config.filterBy
};

const filter = new Filter(filterConfig);
