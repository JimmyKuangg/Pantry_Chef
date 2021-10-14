import {
  RECEIVE_PANTRY
} from '../actions/pantry_actions';

const pantry = (oldState = {}, action) => {
  Object.freeze(oldState);
  let newState = Object.assign({}, oldState);

  switch (action.type) {
    case RECEIVE_PANTRY:
      return action.pantry.data;
    default:
      return oldState;
  }
};

export default pantry;