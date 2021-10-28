import { connect } from "react-redux";
import RecipeShow from "./recipe_show";
import { fetchRecipe } from "../../actions/recipe_actions";


const mSTP = (state,ownProps) => {
    return {
        recipe: state.recipes.filter(ele => ele.id === ownProps.match.params.recipeId)[0]
    }
};

const mDTP = dispatch => {
    return {
        fetchRecipe: (recipeId) => dispatch(fetchRecipe(recipeId))
    }
}

export default connect(mSTP, mDTP)(RecipeShow);