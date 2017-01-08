import React, {Component} from 'react';
import {connect} from 'react-redux';
import {changeAction} from '../actions/actions';

class HeaderCmp extends Component {
  constructor() {
    super();
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    const {dispatch} = this.props;
    const value = event.target.value;

    dispatch(changeAction(value));
  }

  render() {
    return (
      <header>
        <div className='header-container'>
          <h1>Recognized sponsors</h1>
          <label htmlFor='filter'>Search for companies</label>
          <input id='filter'
            onChange={this.handleChange}
            type='text'
            className='search'
            placeholder='Start typing name of the company...'
            autoFocus
            />
        </div>
      </header>
    );
  }
};

HeaderCmp.propTypes = {
  dispatch: React.PropTypes.func.isRequired
};

const mapStateToProps = store => {
  const {value} = store.listReducer;
  return {value};
};

export const Header = connect(mapStateToProps)(HeaderCmp);
