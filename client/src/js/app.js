import Model  from './model.js';
//import View   from './view.js';
import Filter from './filter.js';
import config from './config.js';
import React from 'react';
import {render} from 'react-dom';
import {router} from './router.js';
//TODO https://github.com/halhenke/jade-react-loader

const model = new Model(config.url);

const filterConfig = {
  model,
  filterBy: config.filterBy
};

const filter = new Filter(filterConfig);

model.init();

class Header extends React.Component {
  constructor() {
    super();
    this.keyPressTimeout = null;
  }

  change(event) {
    if (this.keyPressTimeout) {
      clearTimeout(this.keyPressTimeout);
    }
    const value = event.target.value;
    this.keyPressTimeout = setTimeout(() => {
      model.model = filter.filter(value);
    }, 150);
  }

  render() {
    return (
      <header>
        <div className='header-container'>
            <h1>Recognized sponsors</h1>
            <label htmlFor='filter'>Search for companies</label>
            <input id='filter' onChange={this.change.bind(this)} type='text' className='search' placeholder='Start typing name of the company...' autoFocus/>
        </div>
      </header>
    );
  }
};

class List extends React.Component {
  constructor() {
    super();
    this.state = {list:[]};
    model.onChange(model => {
      if (!router.isRecent()) {
        model = filter.filter(router.getSearchQuery());
      }
      this.setState({list: model})
    });
  }

  render() {
    let href;
    const commentNodes = this.state.list.map(function(item, idx) {
      href = 'https://www.google.com.ua/search?q=' + item.name;
      return (
        <li key={idx} className='title'>
          <a target='_blank' href={href}>{item.name}</a>
        </li>
      );
    });
    return (
      <div className='container'>
        <ul className='companies'>
          {commentNodes}
        </ul>
      </div>
    );
  }
};

class App extends React.Component {
  render () {
    return (
      <div> 
        <Header />
        <List />
      </div>
    );
  }
};

render(<App/>, document.getElementById('app'));
