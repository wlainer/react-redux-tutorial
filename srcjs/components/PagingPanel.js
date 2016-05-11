import React from 'react';

export default ({page=1, page_size=5, count, onNextPage, onPreviousPage, ...props}) => {
  const total_pages = Math.ceil(count / page_size);

  return <nav className="pull-right">
    <ul className="pager">
      {page==1?null:<li><a onClick={e => {
      e.preventDefault();
      onPreviousPage();
      }}>Previous</a></li>}
      &nbsp; Page {page} of {total_pages} &nbsp;
      {page==total_pages?null:<li><a onClick={e => {
      e.preventDefault();
      onNextPage();
    }}>Next</a></li>}
  </ul>
  </nav>


}
