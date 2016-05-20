import { combineReducers } from 'redux';
import { routeReducer } from 'react-router-redux'
import { reducer as formReducer } from 'redux-form'

import authors from './authors';
import books from './books';
import categories from './categories';
import notification from './notification';
import ui from './ui';

const rootReducer = combineReducers({
  books,
  notification,
  ui,
  categories,
  authors,
  routing: routeReducer,
  form: formReducer
});

export default rootReducer;
