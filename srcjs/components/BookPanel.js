import React from 'react'
import { connect } from 'react-redux'
import Table from './Table'
import { changePage, changeSearch } from '../actions'
import { loadBooks, toggleSortingAndLoadBooks, changeSearchAndLoadBooks } from '../actions/books'
import PagingPanel from './PagingPanel'
import BookSearchPanel from './BookSearchPanel'
import { Link } from 'react-router'
import { bindActionCreators } from 'redux'

const getCols = sort_method => [
  {
    key: 'id',
    label: 'ID',
    format: x=><Link to={`/book_update/${x.id}/`}>{x.id}</Link>,
    sorting: sort_method('id')
  },
  {key: 'title', label: 'Title', sorting: sort_method('title')},
  {key: 'category_name', label: 'Category', sorting: sort_method('subcategory__name')},
  {key: 'publish_date', label: 'Publish date', sorting: sort_method('publish_date')},
  {key: 'author_name', label: 'Author', sorting: sort_method('author__last_name')},
]

const BookPanel = (props) => {
  const { rows, count, page, sorting, search } = props.books;
  const { loadBooks, changePage, toggleSortingAndLoadBooks, changeSearchAndLoadBooks  } = props;

  const onSearchChanged = query => changeSearchAndLoadBooks(query)
  const sort_method = key => () => toggleSortingAndLoadBooks(key)
  const cols = getCols(sort_method)

  return <div>
    <div className="panel panel-default panel-table">
      <div className="panel-heading">
        <div className="row">
          <div className="col col-xs-4">
            <h3 className="panel-title">Book List</h3>
          </div>
          <div className="col col-xs-6 text-right">
            <BookSearchPanel search={search} onSearchChanged={onSearchChanged} />
          </div>
          <div className="col col-xs-2 text-right">
            <Link className='btn btn-sm btn-primary btn-create' to="/book_create/">Create New</Link>
          </div>
        </div>
      </div>
    <div className="panel-body" >
      <Table sorting={sorting} cols={cols} rows={rows} />
    </div>
    <div className="panel-footer">
      <div className="row text-right">
        <PagingPanel count={count} page={page} onNextPage={() => {
            changePage(page+1);
            loadBooks()
          }} onPreviousPage={ () => {
            changePage(page-1);
            loadBooks()
          }} />
      </div>
    </div>
  </div>
</div>
}


const mapStateToProps = state => ({
  books:state.books,
})

const mapDispatchToProps = dispatch => bindActionCreators({
  loadBooks, changePage, toggleSortingAndLoadBooks, changeSearchAndLoadBooks
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(BookPanel);
