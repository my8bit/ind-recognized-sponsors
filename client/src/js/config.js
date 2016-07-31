import template from '../template.jade';

export default {
  list: 'ul.companies',
  url: 'data/recognized-sponsors-data.json',
  template,
  filterId: 'filter',
  filterBy: ['name']
};
