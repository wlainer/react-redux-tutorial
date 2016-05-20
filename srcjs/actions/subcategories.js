import axios from 'axios'

export const SHOW_SUBCATEGORIES = 'SHOW_SUBCATEGORIES'

export function showSubCategoriesResult(jsonResult) {
  return {
    type: SHOW_SUBCATEGORIES,
    subcategories: jsonResult
  };
}

export function loadSubCategories(category) {
  return (dispatch, getState) => {

    if(!category) {
      dispatch(showSubCategoriesResult([]));
      return
    }
    let url = `/api/subcategories/?format=json&category=${category}`;

    return axios({
      url: url,
      timeout: 20000,
      method: 'get'
    })
    .then(function(response) {
      dispatch(showSubCategoriesResult(response.data));
    })
  }
}