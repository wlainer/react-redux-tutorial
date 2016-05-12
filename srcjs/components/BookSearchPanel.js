import React from 'react';
import ReactDOM from 'react-dom';

export default class SearchPanel extends React.Component {
  constructor() {
    super()
    this.onSearchChange = this.onSearchChange.bind(this)
    this.onClearSearch = this.onClearSearch.bind(this)
    this.state = {}
  }

  render() {
    return (
      <div className="input-group">
        <input placeholder="Find..." ref='search' name='search' type='text' className="form-control" defaultValue={this.props.search} value={this.state.search} onChange={this.onSearchChange } />
        <span className="input-group-btn">
          <button className="btn btn-default" type="button" onClick={this.onClearSearch}>x</button>
        </span>
      </div>
    )
  }

  onSearchChange() {
    let query = ReactDOM.findDOMNode(this.refs.search).value;
    if (this.promise) {
      clearInterval(this.promise)
    }
    this.setState({
      search: query
    });
    this.promise = setTimeout(() => this.props.onSearchChanged(query), 400);
  }

  onClearSearch() {
    this.setState({
      search: ''
    });
    this.props.onSearchChanged(undefined)
  }
}



