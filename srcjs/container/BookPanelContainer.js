import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import BookPanel from '../components/BookPanel'
import { toggleSortingAndLoadBooks, changePage} from '../actions'
import { loadBooks } from '../actions/books'

class BookPanelContainer extends React.Component {

  constructor() {
    super()
    console.log('this', this)
  }

  componentDidMount() {
    this.handleChangePage = this.props.changePage
    this.handleLoadBooks = this.props.loadBooks
    this.handleLoadBooks()
  }

  render() {
    return(
      <BookPanel books={ this.props.books }
                 onChangePage={ this.handleChangePage }
                 onLoadBooks={ this.handleLoadBooks } />
    )
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({ loadBooks,
toggleSortingAndLoadBooks, changePage }, dispatch)

const mapStateToProps = state => ({
  books: state.books
})

export default connect(mapStateToProps, mapDispatchToProps)(BookPanelContainer)
