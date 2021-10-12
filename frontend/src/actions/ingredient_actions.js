import * as IngrecientAPI from '../util/ingredient_util'
export const FETCH_ALL_INGREDIENTS = "FETCH_ALL_INGREDIENTS"
export const FETCH_INGREDIENT = "FETCH_INGREDIENT"

const getAllIngredients = ingredients => ({
    type: FETCH_ALL_INGREDIENTS,
    ingredients
})

const getIngredient = ingredient => ({
    type: FETCH_INGREDIENT,
    ingredient
})

export const fetchAllIngredients = () => dispatch => {
    return IngredientAPI.fetchAllIngredients().then( ingredients => dispatch( getAllIngredients( ingredients ) ) )
}

export const fetchIngredient = ingredientId => dispatch => {
    return IngredientAPI.fetchIngredient(ingredientId).then( ingredient => dispatch( getIngredient(ingredient ) ) )
}

export const createIngredient = ingredient => dispatch => {
    return IngredientAPI.createIngredient(ingredient).then( ingredient => dispatch( getIngredient( ingredient ) ) )
}