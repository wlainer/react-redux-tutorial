import React from 'react'
import { render } from 'react-dom'
import { Router, Route, IndexRoute, Link } from 'react-router'

import { Provider } from 'react-redux'

import store from './store'
import { history } from './store'

import App from './components/app';
import BookPanelContainer from './container/BookPanelContainer';
import BookFormContainer from './container/BookFormContainer';
import AuthorPanel from './components/AuthorPanel';
import AuthorForm from './components/AuthorForm';

import schedule from './scheduler';



const About = () => {
  return <div>
    <h2>About</h2>
    <Link to="/">Home</Link>
  </div>
}

const NoMatch = () => {
  return <div>
    <h2>No match</h2>
    <Link to="/">Home</Link>
  </div>
}

render((
  <Provider store={store}>
    <Router history={history}>
      <Route path="/" component={App}>
        <IndexRoute component={BookPanelContainer}/>
        <Route path="/book_create/" component={BookFormContainer} />
        <Route path="/book_update/:id" component={BookFormContainer} />

        <Route path="/authors/" component={AuthorPanel} />
        <Route path="/author_create/" component={AuthorForm} />
        <Route path="/author_update/:id" component={AuthorForm} />

        <Route path="/about" component={About}/>
        <Route path="*" component={NoMatch}/>
      </Route>
    </Router>
  </Provider>
  ), document.getElementById('content')
)


// schedule();