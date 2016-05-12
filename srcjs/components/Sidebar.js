import React from 'react';
import { Link } from 'react-router'

export default class Sidebar extends React.Component {
  render() {
    return (
      <div id="sidebar">
        <div className="sidebar__compose">
          <a href="#" className="btn compose">
            Library <span className="fa fa-pencil"></span>
          </a>
        </div>
        <ul className="sidebar__menus">
          <li><Link to="/authors/">
            <span className="fa fa-user"></span> Authors
          </Link></li>
          <li><Link to="/">
            <span className="fa fa-book"></span> Books

          </Link></li>
        </ul>
      </div>
    );
  }
}