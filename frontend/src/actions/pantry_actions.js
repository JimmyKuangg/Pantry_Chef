import * as PantryUtil from '../util/pantry_util';

export const RECEIVE_PANTRY = "RECEIVE_PANTRY";

export const receivePantry = pantry => ({
  type: RECEIVE_PANTRY,
  pantry
});

export const fetchPantry = pantryId => (
  PantryUtil.fetchPantry(pantryId)
    .then(recipeId => dispatch(receivePantry(recipeId)))
    .catch(err => console.log(err))
);

export const createPantry = pantry => (
  PantryUtil.createPantry(pantry)
    .then(pantry => dispatch(receivePantry(pantry)))
    .catch(err => console.log(err))
);

export const editPantry = pantry => (
  PantryUtil.editPantry(pantry)
    .then(pantry => dispatch(receivePantry(pantry)))
    .catch(err => console.log(err))
);