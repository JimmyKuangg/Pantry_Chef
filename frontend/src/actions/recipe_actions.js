import * as RecipeUtil from '../util/recipe_util';

export const RECEIVE_RECIPES = "RECEIVE_RECIPES";
export const RECEIVE_RECIPE = "RECEIVE_RECIPE";
export const REMOVE_RECIPE = "REMOVE_RECIPE";

export const receiveRecipes = recipes => ({
  type: RECEIVE_RECIPES,
  recipes
});

export const receiveRecipe = recipe => ({
  type: RECEIVE_RECIPE,
  recipe
});

export const removeRecipe = recipeId => ({
  type: REMOVE_RECIPE,
  recipeId
});

export const fetchRecipes = () => dispatch => (
  RecipeUtil.fetchAllRecipes()
    .then(recipes => dispatch(receiveRecipes(recipes)))
    .catch(err => console.log(err))
);

export const fetchRecipe = recipeId => dispatch => (
  RecipeUtil.fetchRecipe(recipeId)
    .then(recipeId => dispatch(receiveRecipe(recipeId)))
    .catch(err => console.log(err))
);

export const createRecipe = recipe => dispatch => (
  RecipeUtil.createRecipe(recipe)
    .then(recipe => dispatch(receiveRecipe(recipe)))
    .catch(err => console.log(err))
);

export const editRecipe = recipe => dispatch => (
  RecipeUtil.editRecipe(recipe)
    .then(recipe => dispatch(receiveRecipe(recipe)))
    .catch(err => console.log(err))
);

export const deleteRecipe = recipeId => dispatch => (
  RecipeUtil.deleteRecipe(recipeId)
    .then(() => dispatch(removeRecipe(recipeId)))
    .catch(err => console.log(err))
);