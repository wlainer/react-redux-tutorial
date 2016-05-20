import thunk from 'redux-thunk';
import { applyMiddleware, createStore, compose } from 'redux'
import { syncHistory } from 'react-router-redux'
import promiseMiddleware from 'redux-promise';
import createHistory from 'history/lib/createHashHistory'
import reducer from '../reducers'
import config from '../config'

// Opt-out of persistent state, not recommended.
// http://rackt.org/history/stable/HashHistoryCaveats.html
export const history = createHistory({
  queryKey: false
});

const reduxRouterMiddleware = syncHistory(history)
const middlewares = [
  applyMiddleware(
    thunk,
    reduxRouterMiddleware,
    promiseMiddleware
  )
];

if (!config.isProduction) {
  const DevTools = require('../utils/DevTools').default;
  middlewares.push(DevTools.instrument());
}

export default function configureStore(initialState) {
  const store = createStore(
    reducer,
    initialState,
    compose(...middlewares)
  );

  // if (!config.isProduction && module.hot) {
  //   // Enable Webpack hot module replacement for reducers
  //   module.hot.accept('./modules/reducer', () => {
  //     const nextReducer = require('./modules/reducer');
  //     store.replaceReducer(nextReducer);
  //   });
  // }

  return store;
}