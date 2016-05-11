const CATEGORIES_INITIAL = {
  categories: [],
  subcategories: [],
}

export const categories = (state=CATEGORIES_INITIAL, action) => {
  switch (action.type) {
    case 'SHOW_CATEGORIES':
      return Object.assign({}, state, {
        categories: action.categories
      });
      break;
    case 'SHOW_SUBCATEGORIES':
      return Object.assign({}, state, {
        subcategories: action.subcategories
      });
      break;
  }
  return state;
}