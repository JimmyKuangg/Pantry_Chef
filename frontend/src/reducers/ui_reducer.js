import { combineReducers } from "redux";
import modal from "./modal_reducer";
import sideMenu from "./sidemenu_reducer"

export default combineReducers({
  modal,
  sideMenu
});