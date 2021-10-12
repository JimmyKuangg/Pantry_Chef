import axios from "axios";

export const fetchAllRecipes = () => {
  return axios.get('/api/recipes')
}

export const fetchRecipe = (recipeId) => {
  return axios.get(`/api/recipes/${recipeId}`);
};

export const createRecipe = (recipe) => {
  return axios.post("/api/recipes/create", recipe);
};

export const editRecipe = (recipe) => {
    return axios.post(`/api/recipes/update/${recipe.id}`, recipe)
}

export const deleteRecipe = (recipeId) => {
    return axios.post(`/api/recipes/delete/${recipeId}`)
}