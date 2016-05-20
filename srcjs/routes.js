import React from 'react';
import { Route, IndexRoute, Link } from 'react-router';
import App from './components/app';
import BookPanelContainer from './containers/BookPanelContainer';
import BookFormContainer from './containers/BookFormContainer';
import AuthorPanel from './components/AuthorPanel';
import AuthorForm from './components/AuthorForm';

export default () => {

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

  return (
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
  );
};
