import React from 'react'
import { reduxForm } from 'redux-form'
import { routeActions } from 'react-router-redux'
import axios from 'axios'

import readCookie from '../util/readcookie'
import BookFormTemp from '../components/BookFormTemp'

import { submittingChanged } from '../actions'
import { addBookResult, updateBookResult, deleteBookResult, loadBook } from '../actions/books'
export const fields = ['title', 'category', 'subcategory', 'publish_date', 'author' ]

class BookFormContainer extends React.Component {

  constructor() {
    super()
  }

  handlesubmit(id, values, dispatch) {
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

  handleDel(id, dispatch) {
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

  render() {
    return (
      <BookFormTemp  props={this.props}
                     onSubmit={this.handlesubmit}
                     onDel={this.handleDel} />
    )
  }
}

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

export default reduxForm({
  form: 'bookForm',
  fields,
  validate
}, mapStateToProps)(BookFormContainer);
