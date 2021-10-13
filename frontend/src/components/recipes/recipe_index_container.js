import { connect } from "react-redux";
import RecipeIndex from "./recipe_index";
import { fetchRecipes } from "../../actions/recipe_actions";

const mSTP = (state) => {
    return {
        recipes: Object.values(state.recipes),
    }
};

const mDTP = (dispatch) => ({
  fetchRecipes: () => dispatch(fetchRecipes()),
});

export default connect(mSTP, mDTP)(RecipeIndex);
