import { combineReducers } from "redux";
import session from "./session_api_reducer";
import errors from "./errors_reducer";
import ui from "./ui_reducer";
import recipes from "./recipe_reducer"
import pantries from "./pantry_reducer"
import categories from './category_reducer'


const RootReducer = combineReducers({
  session,
  errors,
  ui,
  recipes,
  categories,
  pantries,
});

export default RootReducer;
