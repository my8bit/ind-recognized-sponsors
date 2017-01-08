import config from '../config.js';

export const initAction = () => dispatch => {
  const cachedList = localStorage.getItem('list');
  if (cachedList) {
    dispatch({
      type: 'INIT',
      list: JSON.parse(cachedList)
    });
  } else {
    fetch(config.url)
      .then(response => {
        return response.json();
      })
      .then(data => {
        localStorage.setItem('list', JSON.stringify(data));
        dispatch({
          type: 'INIT',
          list: data
        });
      })
      .catch(err => {
        console.error('Error during fetching list of sponsors', err);
        dispatch({
          type: 'INIT_FAILED'
        });
      });
  }
};

export const changeAction = value => dispatch => {
  dispatch({
    type: 'CHANGE',
    value
  });
};
