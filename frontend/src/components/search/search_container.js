import { connect } from 'react-redux';
import SearchBar from './search';
import { fetchRecipes } from '../../actions/recipe_actions';
import { fetchAllIngredients } from '../../actions/ingredient_actions';
import { editPantry, fetchPantry } from '../../actions/pantry_actions';

const mSTP = state => ({
    ingredients: Object.values(state.ingredients),
    recipes: state.recipes,
    pantry: state.pantries
});

const mDTP = dispatch => ({
    fetchRecipes: () => dispatch( fetchRecipes () ),
    fetchAllIngredients: () => dispatch( fetchAllIngredients() ),
    fetchPantry: () => dispatch( fetchPantry() ),
    editPantry: pantry => dispatch(editPantry(pantry))
});

export default connect(mSTP, mDTP)(SearchBar);