import React from 'react'

import DatePicker from './DatePicker'
import Input from './Input'
import Select from './Select'

const BookForm = (props) => {

    const {fields: {
      title, category, subcategory, publish_date, author
    }, handleSubmit, dispatch } = props;
    const { id } = props.params;
    const { isSubmitting } = props.ui;
    const { categories, subcategories } = props.categories;
    const authors = props.authors.rows;

    const tsubmit = props.onSubmit.bind(undefined,id);
    const dsubmit = props.onDel.bind(undefined,id, dispatch);

    return (
    <div className="center-content">
    <form onSubmit={handleSubmit(tsubmit)} style={{'padding':'10px 25px', 'margin': '35px 0'}}>
    <div className="panel panel-primary">
      <div className="panel-heading">Inserting a book</div>
        <div className="panel-body">
          <Input label='Title' field={title} />
          <Select label='Author' field={author} options={
            authors.map(a => ({'id': a.id, 'name': `${a.first_name} ${a.last_name}`}))
          } />
          <div className="row">
            <div className="col-sm-6">
              <Select label='Category' field={category} options={categories} onChange={ event => {
                category.onChange(event);
                dispatch(loadSubCategories(event.target.value))
              }}/>
            </div>
            <div className="col-sm-6">
              <Select label='Subcategory' field={subcategory} options={subcategories} />
            </div>
          </div>
          <DatePicker className="u-full-width" label='Publish Date' field={publish_date} />
          </div>
          <div className="panel-footer clearfix">
            <button disabled={isSubmitting} className='btn btn-primary pull-right' onClick={handleSubmit(tsubmit)} style={{margin: '0 10px'}}> Save
            </button> {id?<button disabled={isSubmitting} type='button' className='btn btn-danger pull-right' onClick={dsubmit}>
              Delete
            </button>:null}
          </div>
       </div>
      </form>
     </div>
    )
  }

export default BookForm



