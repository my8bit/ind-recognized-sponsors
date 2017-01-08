import template from '../template.jade';

export default {
  list: 'ul.companies',
  url: 'https://gist.githubusercontent.com/my8bit/17e385f08c1d9adf905cf49b1ce79484/raw/fd3473b3657598f2bc84d1582ee96d75c645bdbc/ind-data.json',
  template,
  filterId: 'filter',
  filterBy: ['name']
};
