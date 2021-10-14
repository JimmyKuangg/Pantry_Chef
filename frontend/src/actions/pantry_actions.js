import * as PantryUtil from '../util/pantry_util';

export const RECEIVE_PANTRY = "RECEIVE_PANTRY";

export const receivePantry = pantry => ({
  type: RECEIVE_PANTRY,
  pantry
});

export const fetchPantry = () => dispatch => (
  PantryUtil.fetchPantry()
    .then(pantry => dispatch(receivePantry(pantry)))
    .catch(err => console.log(err))
);

export const createPantry = pantry => dispatch => (
  PantryUtil.createPantry(pantry)
    .then(pantry => dispatch(receivePantry(pantry)))
    .catch(err => console.log(err))
);

export const editPantry = pantry => dispatch => (
  PantryUtil.editPantry(pantry)
    .then(pantry => dispatch(receivePantry(pantry)))
    .catch(err => console.log(err))
);