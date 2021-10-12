import {
    FETCH_CATEGORIES,
    FETCH_CATEGORY,
  } from "../actions/category_actions";
  
  
  const categories = (state = {}, action) => {
    Object.freeze(state);
    let newState = Object.assign({}, state)
    switch (action.type) {
      case FETCH_CATEGORIES:
        return action.categories
      case FETCH_CATEGORY:
        newState[action.category.id] = action.category
        return newState
      default:
        return state;
    }
  };
  
  export default categories;
  