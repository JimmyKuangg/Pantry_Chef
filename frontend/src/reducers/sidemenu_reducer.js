import { OPEN_SIDEMENU, CLOSE_SIDEMENU } from "../actions/sidemenu_actions";

export default function sideMenuReducer(state = null, action) {
  switch (action.type) {
    case OPEN_SIDEMENU:
      return true;
    case CLOSE_SIDEMENU:
      return false;
    default:
      return state;
  }
} 