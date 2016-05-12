import React from 'react'
import { Link } from 'react-router'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { loadingChanged } from '../actions'
import { loadBooks } from '../actions/books'
import { loadAuthors } from '../actions/authors'
import NotificationContainer from './notification';
import LoadingContainer from './loading';
import StatPanel from './StatPanel'
import Sidebar from './Sidebar'

class App extends React.Component {

  render() {

    return (
      <div>
        <Sidebar />
        <div className="center-container">
          {this.props.children}
        </div>
        <StatPanel bookLength={this.props.books.count} authorLength={this.props.authors.rows.length} />
      </div>
    )



    // const { isLoading } = this.props.ui;
    // return <div>


    //   <NotificationContainer />
    //   <LoadingContainer isLoading={isLoading} />

    //   <br />

    //   <StatPanel bookLength={this.props.books.count} authorLength={this.props.authors.rows.length} />

    // </div>
  }

  componentDidMount() {
    let { loadBooks, loadAuthors } = this.props;

    if(this.props.books.rows.length==0) {
      loadBooks();
    }
    if(this.props.authors.rows.length==0) {
      loadAuthors();
    }
  }
}

const mapStateToProps = state => ({
  books:state.books,
  authors:state.authors,
  ui:state.ui,
})


const mapDispatchToProps = dispatch => bindActionCreators({
  loadBooks, loadAuthors
}, dispatch)


export default connect(mapStateToProps, mapDispatchToProps)(App);
