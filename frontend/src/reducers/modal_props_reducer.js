import { OPEN_MODAL, CLOSE_MODAL } from '../actions/modal_actions';

export default function modalPropsReducer(state = null, action) {
  switch (action.type) {
    case OPEN_MODAL:
        if (action.potatoes) return action.potatoes;
        return null;
    case CLOSE_MODAL:
      return null;
    default:
      return state;
  }
}