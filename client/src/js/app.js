import Model from './model.js'; //refactor to use not file
import View from './view.js';
import Filter from './filter.js';
import config from './config.js';

const model = new Model(config.url);

const filterConfig = {
  id: config.filterId,
  model: model,
  document: document,
  filterBy: config.filterBy
};

const filter = new Filter(filterConfig);

let router = function (data) {
  var getQueryString = function ( field, url ) {
    var href = url ? url : window.location.href;
    var reg = new RegExp( '[?&]' + field + '=([^&#]*)', 'i' );
    var string = reg.exec(href);
    return string ? string[1] : null;
  };
  let filterValue = getQueryString('search');
  return filterValue ? filter.filter(filterValue, data) : false;
}

model.init(router);

const view = new View({
  selector: config.list,
  model: model,
  document: document,
  template: config.template
});

