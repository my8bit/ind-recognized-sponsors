import React from 'react';
import {connect} from 'react-redux';
import {initAction} from '../actions/actions';
import LazyRender from 'react-lazy-render';
// import createFragment from 'react-addons-create-fragment'; // ES6

class ListCmp extends React.Component {
  componentWillMount() {
    const {dispatch} = this.props;
    dispatch(initAction());
  }

  render() {
    const {filtered} = this.props;
    const commentNodes = filtered.map(function(item, idx) {
      const href = 'https://www.google.com.ua/search?q=' + item.name;
      return (
        <li key={idx} className='title'>
          <a target='_blank' href={href}>{item.name}</a>
        </li>
      );
    });
/*
    return (
      <div className='container'>
        <ul className='companies'>
          {commentNodes}
        </ul>
      </div>
    );
*/
    return (
      <div className='container' ref={div => { if (div) {this.h = this.h ? this.h : div.offsetHeight;}}}>
        {commentNodes.length ? <LazyRender className='companies' maxHeight={this.h || 300}>{commentNodes}</LazyRender> : ''}
      </div>
    );
  }
};

ListCmp.propTypes = {
  dispatch: React.PropTypes.func.isRequired,
  value: React.PropTypes.string.isRequired,
  filtered: React.PropTypes.array.isRequired
};

const mapStateToProps = store => {
  const {value, filtered} = store.listReducer;
  return {value, filtered};
};

export const List = connect(mapStateToProps)(ListCmp);
