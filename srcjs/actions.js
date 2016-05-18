import { history } from  './store'

export function loadingChanged(isLoading) {
  return {
    type: "IS_LOADING",
    isLoading
  }
}

export function submittingChanged(isSubmitting) {
  return {
    type: "IS_SUBMITTING",
    isSubmitting
  }
}

export function toggleSorting(sorting) {
  return {
    type: "TOGGLE_SORTING",
    sorting
  }
}

export function changePage(page) {
  return {
    type: "CHANGE_PAGE",
    page
  }
}

export function changeSearch(search) {
  return {
    type: 'CHANGE_SEARCH',
    search
  }
}
