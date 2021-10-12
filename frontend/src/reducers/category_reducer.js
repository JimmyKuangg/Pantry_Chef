import {
    FETCH_CATEGORIES,
    FETCH_CATEGORY,
  } from "../actions/category_actions";
  
  
  const categories = (state = {}, action) => {
    Object.freeze(state);
    let newState = {}
    switch (action.type) {
      case FETCH_CATEGORIES:
        return action.categories.data
      case FETCH_CATEGORY:
        newState[action.category.data.id] = action.category.data
        return newState
      default:
        return state;
    }
  };
  
  export default categories;
  