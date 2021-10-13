import { RECEIVE_RECIPES, RECEIVE_RECIPE, REMOVE_RECIPE } from "../actions/recipe_actions"

const recipes = (state = [], action) => {
  Object.freeze(state);
  // let newState = Object.assign(, state)
  switch (action.type) {
    case RECEIVE_RECIPES:
      return action.recipes.data;
    // case RECEIVE_RECIPE:
    //     let newState = {};
    //     newState[action.recipe.data.id] = action.recipe.data
    //     return newState 
    // case REMOVE_RECIPE:
    //     delete newState[action.recipeId]
    //     return newState
    default:
      return state;
  }
};

export default recipes;