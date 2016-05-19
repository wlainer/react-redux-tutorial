import React from 'react';

export default ({page=1, page_size=5, count, onNextPage, onPreviousPage, ...props}) => {
  const total_pages = Math.ceil(count / page_size);

  return (
    <nav style={{'textAlign': 'center'}}>
      <ul style={{'marginTop': '0px'}} className="pagination">
        <li className={ page === 1? "disabled": "" }>
          <a aria-label="Previous"
          onClick={e => {
            e.preventDefault();
            onPreviousPage();
          }}><span aria-hidden="true">&laquo;</span>
          </a>
        </li>
      <li><a href="#">&nbsp; Page {page} of {total_pages} &nbsp;</a></li>
        <li>
          <a aria-label="Next" className={ page === page_size? "disabled": "" }
              onClick={e => {
              e.preventDefault();
              onNextPage();
            }}><span aria-hidden="true">&raquo;</span>
          </a>
        </li>
      </ul>
    </nav>
    )


}
