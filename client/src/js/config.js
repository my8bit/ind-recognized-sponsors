import template from '../template.jade';

export default {
  list: 'ul.companies',
  url: 'https://gist.githubusercontent.com/my8bit/17e385f08c1d9adf905cf49b1ce79484/raw/d7d083f0d44f93a6b10587a024f365355021324d/ind-data.json',
  template,
  filterId: 'filter',
  filterBy: ['name']
};
