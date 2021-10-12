import axios from "axios";

export const fetchAllIngredients = () => {
    return axios.get('/api/ingredients')
}

export const fetchIngredient = (ingredientId) => {
    return axios.get(`/api/categories/${ingredientId}`)
}

export const createIngredient = (ingredient) => {
    return axios.post('/api/ingredient', ingredient)
}