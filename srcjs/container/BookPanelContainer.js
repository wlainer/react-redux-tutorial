import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import BookPanel from '../components/BookPanel'
import { toggleSortingAndLoadBooks } from '../actions'
import { loadBooks } from '../actions/books'

class BookPanelContainer extends React.Component {

  componentDidMount() {
    this.props.loadBooks()
  }

  render() {
    return(
      <BookPanel books={ this.props.books } />
    )
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({ loadBooks,
toggleSortingAndLoadBooks }, dispatch)

const mapStateToProps = state => ({
  books: state.books
})

export default connect(mapStateToProps, mapDispatchToProps)(BookPanelContainer)
