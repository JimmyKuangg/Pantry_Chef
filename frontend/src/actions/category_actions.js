import * as CategoryAPI from '../util/category_util'
export const FETCH_CATEGORIES = "FETCH_CATEGORIES"
export const FETCH_CATEGORY = "FETCH_CATEGORY"

const getAllCategories = categories => ({
    type: FETCH_CATEGORIES,
    categories
})

const getCategory = category => ({
    type: FETCH_CATEGORY,
    category
})

export const fetchAllCategories = () => dispatch => {
    return CategoryAPI.fetchAllCategories().then( categories => dispatch( getAllCategories( categories ) ) )
}

export const fetchCategory = categoryId => dispatch => {
    return CategoryAPI.fetchCategory(categoryId).then( category => dispatch( getCategory(category ) ) )
}

export const createCategory = category => dispatch => {
    return CategoryAPI.createCategory(category).then( category => dispatch( getCategory( category ) ) )
}