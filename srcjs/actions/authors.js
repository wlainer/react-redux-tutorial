import { loadingChanged, toggleSorting } from '../actions'
import axios from 'axios'

export function showAuthorsResult(jsonResult) {
  return {
    type: "SHOW_AUTHORS",
    authors: jsonResult
  };
}

export function showAuthorResult(author) {
  return {
    type: "SHOW_AUTHOR",
    author
  };
}

export function addAuthorResult(author) {
  return {
    type: "ADD_AUTHOR",
    author
  };
}

export function updateAuthorResult(author) {
  return {
    type: "UPDATE_AUTHOR",
    author
  };
}

export function deleteAuthorResult(id) {
  return {
    type: "DELETE_AUTHOR",
    id
  };
}

export function loadAuthors(page=1) {
  return (dispatch, getState) => {
    let url = `/api/authors/?format=json&page=${page}`;
    dispatch(loadingChanged(true));
    return axios({
      url: url,
      timeout: 20000,
      method: 'get'
    })
    .then(function(response) {
      dispatch(showAuthorsResult(response.data));
      dispatch(loadingChanged(false));
    })
  }
}

export function loadAuthor(id) {
  return (dispatch, getState) => {
    let url = `/api/authors/${id}/?format=json`;
    dispatch(loadingChanged(true));
    return axios({
      url: url,
      timeout: 20000,
      method: 'get'
    })
    .then(function(response) {
      dispatch(showAuthorResult(response.data));
      dispatch(loadingChanged(false));
    })
  }
}