import { syncHistory, routeReducer } from 'react-router-redux'

import { ui } from './reducers/ui'
import { authors } from './reducers/authors'
import { books } from './reducers/books'
import { notification } from './reducers/notification'
import { categories } from './reducers/categories'

import thunk from 'redux-thunk';
import { applyMiddleware, createStore, combineReducers  } from 'redux'
import { reducer as formReducer } from 'redux-form';
import createHistory from 'history/lib/createHashHistory'
import createLogger from 'redux-logger';

// Opt-out of persistent state, not recommended.
// http://rackt.org/history/stable/HashHistoryCaveats.html
export const history = createHistory({
  queryKey: false
});

const reducer = combineReducers(Object.assign({}, {
    books,
    notification,
    ui,
    categories,
    authors,
  }, {
    routing: routeReducer
  }, {
    form: formReducer
  })
)

const reduxRouterMiddleware = syncHistory(history)
const logger = createLogger()

const logStateMiddleware = ({dispatch, getState}) => next => action => {
  console.log(action.type, getState())
  next(action)
}

const store = createStore(reducer, applyMiddleware(
  thunk, reduxRouterMiddleware, logger
));

export default store
