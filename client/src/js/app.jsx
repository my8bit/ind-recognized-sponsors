import Model  from './model.js';
import Filter from './filter.js';
import config from './config.js';

import React from 'react';
import ReactDOM from 'react-dom';

import {router} from './router.js';
import {Header} from './components/header.jsx';
import {List} from './components/list.jsx';

const model = new Model(config.url);

const filter = new Filter({
  model,
  filterBy: config.filterBy
});

model.init();

class App extends React.Component {
  render () {
    return (
      <main> 
        <Header model={model} filter={filter}/>
        <List model={model} router={router}/>
      </main>
    );
  }
};

ReactDOM.render(<App/>, document.getElementById('app'));
