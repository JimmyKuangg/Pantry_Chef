import { connect } from "react-redux";
import RecipeShow from "./recipe_show";
import { fetchRecipe } from "../../actions/recipe_actions";


const mSTP = (state, ownProps) => {

    return {
        recipe: state.recipes[ownProps.match.params.recipeId]
        // recipe: {}
    }
};

const mDTP = dispatch => {
    return {
        fetchRecipe: (recipeId) => dispatch(fetchRecipe(recipeId))
    }
}

export default connect(mSTP, mDTP)(RecipeShow);