import { combineReducers } from "redux";
import modal from "./modal_reducer";
import sideMenu from "./sidemenu_reducer"
import modalPropsReducer from "./modal_props_reducer";

export default combineReducers({
  modal,
  sideMenu,
  modalPropsReducer
});