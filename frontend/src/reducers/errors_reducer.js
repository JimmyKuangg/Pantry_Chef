import { combineReducers } from "redux";

import SessionErrorsReducer from "./session_errors_reducer";
import RecipesErrorsReducer from "./recipe_errors_reducer";

export default combineReducers({
  session: SessionErrorsReducer,
  recipe: RecipesErrorsReducer
});
