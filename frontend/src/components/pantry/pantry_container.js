import { connect } from 'react-redux';
import { fetchPantry, editPantry } from '../../actions/pantry_actions';
import { fetchAllIngredients } from '../../actions/ingredient_actions';
import Pantry from './pantry'
import { fetchRecipes } from '../../actions/recipe_actions';

const mSTP = (state, ownProps) => ({
  pantry: state.pantries,
  ingredients: state.ingredients,
});

const mDTP = dispatch => ({
  fetchPantry: () => dispatch(fetchPantry()),
  editPantry: pantry => dispatch(editPantry(pantry)),
  fetchAllIngredients: () => dispatch(fetchAllIngredients()),
  fetchRecipes: () => dispatch(fetchRecipes()),
});

export default connect(mSTP, mDTP)(Pantry);