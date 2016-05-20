import { SHOW_BOOKS, SHOW_BOOK, ADD_BOOK, UPDATE_BOOK, DELETE_BOOK }
  from '../actions/books'

const BOOKS_INITIAL = {
  rows: [],
  count: 0,
  page: 1,
  sorting: getParameterByName('sorting'),
  search: getParameterByName('search'),
  book: {},
}

export default function(state=BOOKS_INITIAL, action) {
  let idx = 0;
  switch (action.type) {
    case SHOW_BOOKS:
      return Object.assign({}, state, {
        rows: action.books.results,
        count: action.books.count,
      });
      break;
    case SHOW_BOOK:
      return Object.assign({}, state, {
        book: action.book
      });
      break;
    case 'CHANGE_PAGE':
      return Object.assign({}, state, {
        page: action.page
      });
      break;
    case 'TOGGLE_SORTING':
      return Object.assign({}, state, {
        sorting: (state.sorting==action.sorting)?('-'+action.sorting):action.sorting
      });
      break;
    case 'CHANGE_SEARCH':
      return Object.assign({}, state, {
        search: action.search
      });
      break;
    case ADD_BOOK:
      return Object.assign({}, state, {
        book: action.book,
        count: state.count+1,
        rows: [
          ...state.rows,
          action.book,
        ]
      });
    case UPDATE_BOOK:
      idx = state.rows.findIndex( r => r.id === action.book.id)
      if(idx==-1) {
        return Object.assign({}, state, {
          book: action.book
        });
      } else {
        return Object.assign({}, state, {
          book: action.book,
          rows: [
            ...state.rows.slice(0, idx),
            action.book,
            ...state.rows.slice(idx+1),
          ]
        });
      }
      break;
    case DELETE_BOOK:
      idx = state.rows.findIndex( r => r.id == action.id)
      if(idx==-1) {
        return Object.assign({}, state, {
          book: undefined
        });
      } else {
        return Object.assign({}, state, {
          book: undefined,
          count: state.count-1,
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

//http://stackoverflow.com/a/5158301/119071
function getParameterByName(name) {
  var match = RegExp('[?&]' + name + '=([^&]*)').exec(window.location.hash);
  return match && decodeURIComponent(match[1].replace(/\+/g, ' '));
}


