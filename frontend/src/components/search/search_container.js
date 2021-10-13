import { connect } from 'react-redux';
import SearchBar from './search';
import { fetchRecipes } from '../../actions/recipe_actions';
import { fetchAllIngredients } from '../../actions/ingredient_actions';

const mSTP = state => ({
    ingredients: Object.values(state.ingredients),
    recipes: state.recipes
});

const mDTP = dispatch => ({
    fetchRecipes: () => dispatch( fetchRecipes () ),
    fetchAllIngredients: () => dispatch( fetchAllIngredients() )
});

export default connect(mSTP, mDTP)(SearchBar);