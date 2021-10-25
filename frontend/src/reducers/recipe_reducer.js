import { RECEIVE_RECIPES, RECEIVE_RECIPE, REMOVE_RECIPE } from "../actions/recipe_actions"

const recipes = (state = [], action) => {
  Object.freeze(state);
  let newState = [];
  switch (action.type) {
    case RECEIVE_RECIPES:
      return action.recipes.data;
    case RECEIVE_RECIPE:
        newState.push(action.recipe.data)
        return newState 
    case REMOVE_RECIPE:
      newState = [...state];
      for (let i = 0; i < newState.length; i++){
        if (newState[i].id === action.recipeId) {
          delete newState[i];
        }
      }
      return newState;
    default:
      return state;
  }
};

export default recipes;