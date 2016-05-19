import React from 'react'
import { Link } from 'react-router'
import Table from './Table'
import PagingPanel from './PagingPanel'

const BookPanel = (props) => {
  const { rows, count, page, sorting, search } = props.books;
  const cols = [
    {
      key: 'id',
      label: <em className="fa fa-cog"></em>,
      format: x=> [
        <Link className="btn btn-primary btn-sm" to={`/book_update/${x.id}/`} style={{'marginRight': '5px'}}><em className="fa fa-pencil"></em></Link>,
        <Link className="btn btn-danger btn-sm" to={`/book_update/${x.id}/`}><em className="fa fa-trash"></em></Link>
      ]
    },
    {key: 'title', label: 'Title'},
    {key: 'category_name', label: 'Category'},
    {key: 'publish_date', label: 'Publish date'},
    {key: 'author_name', label: 'Author'},
  ]

  return (
   <div className="center-content">
     <div className="center-content__header clearfix" style={{'display': 'table', 'width': '100%'}}>
     <span style={{'display': 'table-cell', 'verticalAlign': 'middle'}}>
        <h4>Book List</h4>
      </span>
       <Link className='btn btn-sm btn-primary pull-right' to="/book_create/">
        Create New
       </Link>
     </div>
     <div className="email-content__message">
        <div style={{'overflow': 'auto', 'height': '280px'}}>
          <Table sorting={sorting} cols={cols} rows={rows} />
        </div>
     </div>
        <PagingPanel count={count} page={page} onNextPage={() => {
            props.onChangePage(page+1);
            props.onLoadBooks()
          }} onPreviousPage={ () => {
            props.onChangePage(page-1);
            props.onLoadBooks()
          }} />
   </div>
  )
}

export default BookPanel
