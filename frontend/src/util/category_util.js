import axios from "axios";

export const fetchAllCategories = () => {
    return axios.get('/api/categories')
}

export const fetchCategory = (categoryId) => {
    return axios.get(`/api/categories/${categoryId}`)
}

export const createCategory = (category) => {
    return axios.post('/api/category', category)
}