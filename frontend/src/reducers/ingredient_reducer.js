import {
    FETCH_CATEGORIES,
    FETCH_CATEGORY,
  } from "../actions/category_actions";
  
  
  const categories = (state = {}, action) => {
    Object.freeze(state);
    switch (action.type) {
      case FETCH_ALL_INGREDIENTS:
        return action.ingredients.data
      case FETCH_INGREDIENT:
        let newState = {}
        newState[action.ingredient.data.id] = action.ingredient.data
        return newState
      default:
        return state;
    }
  };
  
  export default categories;
  