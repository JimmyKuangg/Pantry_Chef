import { CLEAR_RECIPE_ERRORS, RECEIVE_RECIPE_ERRORS } from "../actions/recipe_actions"

const RecipesErrorsReducer = (state = [], action) => {
  Object.freeze(state);

  switch (action.type) {
    case RECEIVE_RECIPE_ERRORS:
      return action.errors;
    case CLEAR_RECIPE_ERRORS:
      return [];
    default:
      return state;
  }
};

export default RecipesErrorsReducer;