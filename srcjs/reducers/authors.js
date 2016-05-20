import { SHOW_AUTHORS, SHOW_AUTHOR, ADD_AUTHOR, UPDATE_AUTHOR, DELETE_AUTHOR }
  from '../actions/authors'

const AUTHORS_INITIAL = {
  rows: [],
  author: {},
}
export default function(state=AUTHORS_INITIAL, action) {
  let idx = 0;
  switch (action.type) {
    case SHOW_AUTHORS:
      return Object.assign({}, state, {
        rows: action.authors
      });
      break;
    case SHOW_AUTHOR:
      return Object.assign({}, state, {
        author: action.author
      });
      break;
    case ADD_AUTHOR:
      return Object.assign({}, state, {
        author: action.author,
        rows: [
          ...state.rows,
          action.author,
        ]
      });
    case UPDATE_AUTHOR:
      idx = state.rows.findIndex( r => r.id === action.author.id)
      if(idx==-1) {
        return Object.assign({}, state, {
          author: action.author
        });
      } else {
        return Object.assign({}, state, {
          author: action.author,
          rows: [
            ...state.rows.slice(0, idx),
            action.author,
            ...state.rows.slice(idx+1),
          ]
        });
      }
      break;
    case DELETE_AUTHOR:
      idx = state.rows.findIndex( r => r.id == action.id)
      if(idx==-1) {
        return Object.assign({}, state, {
          author: undefined
        });
      } else {
        return Object.assign({}, state, {
          author: undefined,
          rows: [
            ...state.rows.slice(0, idx),
            ...state.rows.slice(idx+1),
          ]
        });
      }
      break;
  }
  return state;
}