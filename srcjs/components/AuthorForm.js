import React from 'react'

import { addAuthorResult, updateAuthorResult, loadAuthor, deleteAuthorResult } from '../actions/authors'
import { showSuccessNotification, showErrorNotification } from '../actions/notification'
import { submittingChanged } from '../actions'
import { reduxForm } from 'redux-form';
import { routeActions } from 'react-router-redux'
import Input from './Input'
import { danger } from '../util/colors'

const submit = (id, values, dispatch) => {
  let url = '//127.0.0.1:8000/api/authors/'
  let type = 'POST'

  if(id) {
    url = `//127.0.0.1:8000/api/authors/${id}/`
    type = 'PUT'
  }

  dispatch(submittingChanged(true))

  $.ajax({
    type,
    url,
    data: values,
    success: (d) => {
      dispatch(showSuccessNotification('Success!'))
      if(id) {
        dispatch(updateAuthorResult(d))
      } else {
        dispatch(addAuthorResult(d))
      }
      dispatch(submittingChanged(false))
      dispatch(routeActions.push('/authors/'));
    },
    error: (d) => {
      dispatch(submittingChanged(false))
      console.log(d);
      dispatch(showErrorNotification(`Error (${d.status} - ${d.statusText}) while saving: ${d.responseText}` ))
    }
  });
};


const del = (id, dispatch) => {
  const url = `//127.0.0.1:8000/api/authors/${id}/`
  const type='DELETE';
  dispatch(submittingChanged(true))
  $.ajax({
    type,
    url,
    success: (d) => {
      dispatch(showSuccessNotification('Success!'))
      dispatch(deleteAuthorResult(id))
      dispatch(submittingChanged(false))
      dispatch(routeActions.push('/authors/'));
    },
    error: (d) => {
      dispatch(submittingChanged(false))
      dispatch(showErrorNotification(`Error (${d.status} - ${d.statusText}) while saving: ${d.responseText}` ))
    }
  });
};

const validate = values => {
  const errors = {};
  if (!values.first_name) {
    errors.first_name = 'Required';
  }
  if (!values.last_name) {
    errors.last_name = 'Required';
  }
  return errors;
}


class AuthorForm extends React.Component {

  render() {
    const {fields: {
      first_name, last_name
    }, handleSubmit, dispatch } = this.props;
    const { id } = this.props.params;
    const { isSubmitting } = this.props.ui;

    const tsubmit = submit.bind(undefined,id);
    const dsubmit = del.bind(undefined, id, dispatch);

    return <div className="clearfix">
        <form className="form-horizontal" onSubmit={handleSubmit(tsubmit) }>
        <Input label='Last Name' field={last_name} />
        <Input label='First Name' field={first_name} />

        <button disabled={isSubmitting} className='btn btn-primary pull-right' onClick={handleSubmit(tsubmit)} style={{margin: '0 10px'}}>
          Save
        </button>
        {id?<button disabled={isSubmitting} type='button' className='btn btn-danger pull-right' onClick={dsubmit} >
          Delete
        </button>:null}

      </form>
    </div>
  }

  componentDidMount() {
    if (this.props.params.id) {
      if(!this.props.author || this.props.author.id != this.props.params.id) {
        this.props.dispatch(loadAuthor(this.props.params.id));
      }
    } else {
      // New author
    }
  }
};


const mapStateToProps = (state, props) => {
  let initial = {}
  const { author } = state.authors

  if(props.params.id && author) {
    initial = author
  }

  return {
    author:state.authors.author,
    ui: state.ui,
    initialValues:initial,
  }
};

const AuthorFormContainer = reduxForm({
  form: 'authorForm',
  fields: ['first_name', 'last_name' ],
  validate
}, mapStateToProps)(AuthorForm);


export default AuthorFormContainer;
