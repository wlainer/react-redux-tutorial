import React from 'react'

import { reduxForm } from 'redux-form';
import { routeActions } from 'react-router-redux'
import { addBookResult, updateBookResult, deleteBookResult, loadBook } from '../actions/books'

import { showSuccessNotification, showErrorNotification } from '../actions/notification'
import { loadCategories, loadSubCategories } from '../actions/categories'
import { submittingChanged } from '../actions'
import { danger } from '../util/colors'

import readCookie from '../util/readcookie'
import DatePicker from './DatePicker'
import Input from './Input'
import Select from './Select'
import axios from 'axios'

const submit = (id, values, dispatch) => {
  let url = '/api/books/'
  let type = 'POST'
  let csrftoken = readCookie('csrftoken')

  if(id) {
    url = `/api/books/${id}/`
    type = 'PUT'
  }

  dispatch(submittingChanged(true))

  return axios({
    url: url,
    timeout: 20000,
    method: type,
    data: values,
    headers: {'X-CSRFToken': csrftoken}
  })
    .then(function(response) {
      dispatch(submittingChanged(false))
      dispatch(showSuccessNotification('Success!'))
      if(id) {
        dispatch(updateBookResult(response.data))
      } else {
        dispatch(addBookResult(response.data))
      }
      dispatch(routeActions.push('/'));
    })
    .catch(function(response){
      dispatch(showErrorNotification(`Error (${response.status} - ${response.statusText}) while saving: ${response.responseText}` ))
    })
};

const del = (id, dispatch) => {
  const url = `/api/books/${id}/`
  const type='DELETE';
  const csrftoken = readCookie('csrftoken')

  return axios({
    url: url,
    timeout: 20000,
    method: type,
    headers: {'X-CSRFToken': csrftoken}
  })
    .then(function(response) {
      dispatch(showSuccessNotification('Success!'))
      dispatch(deleteBookResult(id))
      dispatch(routeActions.push('/'));
    })
    .catch(function(response){
      dispatch(submittingChanged(false))
      console.log(response);
      dispatch(showErrorNotification(`Error (${response.status} - ${response.statusText}) while saving: ${response.responseText}` ))
    })
};

const validate = values => {
  const errors = {};
  if (!values.title) {
    errors.title = 'Required';
  }
  if(values.publish_date) {
    const re = /^\d{4}-\d{2}-\d{2}$/;
    if(!re.exec(values.publish_date)) {
      errors.publish_date = 'Invalid';
    }
  }
  return errors;
}


class BookForm extends React.Component {

  render() {
    const {fields: {
      title, category, subcategory, publish_date, author
    }, handleSubmit, dispatch } = this.props;
    const { id } = this.props.params;
    const { isSubmitting } = this.props.ui;
    const { categories, subcategories } = this.props.categories;
    const authors = this.props.authors.rows;

    const tsubmit = submit.bind(undefined,id);
    const dsubmit = del.bind(undefined,id, dispatch);

    return <div className="clearfix">
        <ol className="breadcrumb" style={{'background-color': '#ffffff'}}>
          <li><a href="#">Books</a></li>
          <li><a className="active">Inserting</a></li>
        </ol>
        <form className="form-horizontal" onSubmit={handleSubmit(tsubmit)}>
          <Input label='Title' field={title} />
          <Select label='Category' field={category} options={categories} onChange={ event => {
            category.onChange(event);
            dispatch(loadSubCategories(event.target.value))
          }}/>
          <Select label='Subcategory' field={subcategory} options={subcategories} />
          <DatePicker className="u-full-width" label='Publish Date' field={publish_date} />
          <Select label='Author' field={author} options={
            authors.map(a => ({'id': a.id, 'name': `${a.first_name} ${a.last_name}`}))
          } />
          <button disabled={isSubmitting} className='btn btn-primary pull-right' onClick={handleSubmit(tsubmit)} style={{margin: '0 10px'}}> Save
          </button> {id?<button disabled={isSubmitting} type='button' className='btn btn-danger pull-right' onClick={dsubmit}>
            Delete
          </button>:null}
        </form>
      </div>
  }

  componentDidMount() {
    if(this.props.categories.categories.length==0) {
      this.props.dispatch(loadCategories());
    }

    if (this.props.params.id) {
      if(!this.props.book || this.props.book.id != this.props.params.id) {
        this.props.dispatch(loadBook(this.props.params.id));
      }
    } else {
      // New book
    }
  }
};


const mapStateToProps = (state, props) => {
  let initial = {}
  const { book } = state.books

  if(props.params.id && book) {
    initial = book
  }

  return {
    book: state.books.book,
    categories: state.categories,
    authors: state.authors,
    ui: state.ui,
    initialValues: initial,
  }
};

export default reduxForm({
  form: 'bookForm',
  fields: ['title', 'category', 'subcategory', 'publish_date', 'author' ],
  validate
}, mapStateToProps)(BookForm);



