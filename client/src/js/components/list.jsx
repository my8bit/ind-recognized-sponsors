import React from 'react';

export class List extends React.Component {
  constructor() {
    super();
    this.state = {list:[]};
  }

  componentWillMount() {
    const {model, router} = this.props;
    model.onChange(model => {
      if (!router.isRecent()) {
        model = filter.filter(router.getSearchQuery());
      }
      this.setState({list: model})
    });
  }
  render() {
    const commentNodes = this.state.list.map(function(item, idx) {
      const href = 'https://www.google.com.ua/search?q=' + item.name;
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