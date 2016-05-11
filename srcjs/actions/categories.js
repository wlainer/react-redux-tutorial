import axios from 'axios'

export function showCategoriesResult(jsonResult) {
  return {
    type: "SHOW_CATEGORIES",
    categories: jsonResult
  };
}

export function loadCategories() {
  return (dispatch, getState) => {
    let url = '/api/categories/?format=json';

    return axios({
      url: url,
      timeout: 20000,
      method: 'get'
    })
    .then(function(response) {
      dispatch(showCategoriesResult(response.data));
    })
  }
}

