import { connect } from "react-redux";
import RecipeShow from "./recipe_show";
import { fetchRecipe } from "../../actions/recipe_actions";


const mSTP = (state) => {

    return {
        recipe: state.recipes[0]
        // recipe: {}
    }
};

const mDTP = dispatch => {
    return {
        fetchRecipe: (recipeId) => dispatch(fetchRecipe(recipeId))
    }
}

export default connect(mSTP, mDTP)(RecipeShow);