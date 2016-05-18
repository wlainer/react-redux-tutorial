import React from 'react';


export default ({bookLength, authorLength}) => <div className="panel panel-default clearfix">
    <div className="footer">
        <div className="row">
          <div className="col-sm-6">
            Books number: {bookLength}
          </div>
          <div className="col-sm-6">
            Authors number: {authorLength}
          </div>
        </div>
    </div>
</div>
