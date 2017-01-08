export const listReducer = (state = {value: '', list: [], filtered: []}, action) => {
  switch (action.type) {
    case 'INIT':
      return Object.assign({}, state, {
        list: [...action.list],
        filtered: [...action.list]
      });
    case 'CHANGE':
      return Object.assign({}, state, {
        value: action.value,
        filtered: state.list.filter(model => {
          const sourceString = model.name.toUpperCase();
          const searchString = action.value.toUpperCase();
          return sourceString.search(searchString) !== -1;
        })
      });
    default:
      return state;
  }
};
