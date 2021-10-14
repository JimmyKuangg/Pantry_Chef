import {
    FETCH_ALL_INGREDIENTS,
    FETCH_INGREDIENT,
  } from "../actions/ingredient_actions";
import {
  RECEIVE_PANTRY
} from "../actions/pantry_actions";
  
  const ingredients = (state = {}, action) => {
    Object.freeze(state);
    switch (action.type) {
      case FETCH_ALL_INGREDIENTS:
        return action.ingredients.data;
      case FETCH_INGREDIENT:
        let newState = {}
        newState[action.ingredient.data.id] = action.ingredient.data
        return newState;
      case RECEIVE_PANTRY:
        
      default:
        return state;
    }
  };
  
  export default ingredients;
  