import { connect } from "react-redux";
import RecipeShow from "./recipe_show";
import { fetchRecipe } from "../../util/recipe_util";


const mSTP = (state, ownProps) => {
    return {
        recipe: state.recipes[ownProps.match.params.recipeId]
    }
};

const mDTP = dispatch => {
    return {
        fetchRecipe: (recipeId) => dispatch(fetchRecipe(recipeId))
    }
}

export default connect(mSTP, mDTP)(RecipeShow);