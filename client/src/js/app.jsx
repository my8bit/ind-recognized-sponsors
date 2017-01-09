import 'whatwg-fetch';
import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';

import config from './config.js';
import {store} from './store/store';
import {Header} from './components/header.jsx';
import {List} from './components/list.jsx';

class App extends React.Component {
  render () {
    return (
      <Provider store={store}>
        <main>
          <Header/>
          <List/>
        </main>
      </Provider>
    );
  }
};

ReactDOM.render(<App/>, document.getElementById('app'));
