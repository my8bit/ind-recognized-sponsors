import Model  from './model.js';
import View   from './view.js';
import Filter from './filter.js';
import config from './config.js';

const model = new Model(config.url);

const filterConfig = {
  model,
  filterBy: config.filterBy
};

const filter = new Filter(filterConfig);

model.init();

const view = new View({
  selector: config.list,
  model,
  document,
  filter: {
    filter,
    id: config.filterId
  },
  template: config.template
});

