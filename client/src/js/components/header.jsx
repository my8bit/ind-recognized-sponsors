import React from 'react';

export class Header extends React.Component {
  constructor() {
    super();
    this.keyPressTimeout = null;
  }

  componentWillMount() {
    this.model = this.props.model;
    this.filter = this.props.filter;
  }

  change(event) {
    /*
    if (this.keyPressTimeout) {
      clearTimeout(this.keyPressTimeout);
    }
    const value = event.target.value;
    this.keyPressTimeout = setTimeout(() => {
      this.model.model = this.filter.filter(value);
    }, 150);
    */
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