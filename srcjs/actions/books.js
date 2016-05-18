import { loadingChanged, toggleSorting, changeSearch } from '../actions'
import { formatUrl } from '../util/formatters'
import { history } from  '../store'
import axios from 'axios'

export function showBooksResult(jsonResult) {
  return {
    type: "SHOW_BOOKS",
    books: jsonResult
  };
}

export function showBookResult(jsonResult) {
  return {
    type: "SHOW_BOOK",
    book: jsonResult
  };
}


export function addBookResult(book) {
  return {
    type: "ADD_BOOK",
    book
  };
}

export function updateBookResult(book) {
  return {
    type: "UPDATE_BOOK",
    book
  };
}

export function deleteBookResult(id) {
  return {
    type: "DELETE_BOOK",
    id
  };
}

export function toggleSortingAndLoadBooks(sorting) {
  return (dispatch, getState) => {
    dispatch(toggleSorting(sorting))
    history.push( {
      search: formatUrl(getState().books)
    } )
    dispatch(loadBooks())
  }
}

export function loadBooks(page=1) {
  return (dispatch, getState) => {
    let state = getState();
    let { page, sorting, search } = state.books
    let url = `/api/books/?format=json&page=${page}`;
    if(sorting) {
      url+=`&ordering=${sorting}`
    }
    if(search) {
      url+=`&search=${search}`
    }
    // dispatch(loadingChanged(true));
    return axios({
      url: url,
      timeout: 20000,
      method: 'get'
    })
    .then(function(response) {
      dispatch(showBooksResult(response.data));
      // dispatch(loadingChanged(false));
    })
  }
}

export function loadBook(id) {
  return (dispatch, getState) => {
    let url = `/api/books/${id}/?format=json`;
    dispatch(loadingChanged(true));

    return axios({
      url: url,
      timeout: 20000,
      method: 'get'
    })
    .then(function(response) {
      dispatch(showBookResult(response.data));
      dispatch(loadingChanged(false));
      dispatch(loadSubCategories(data.category));
    })
  }
}

export function changeSearchAndLoadBooks(search) {
  return (dispatch, getState) => {
    dispatch(changeSearch(search))
    history.push( {
      search: formatUrl(getState().books)
    } )
    dispatch(loadBooks())
  }
}

