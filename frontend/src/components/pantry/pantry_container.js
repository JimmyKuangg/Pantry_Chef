import { connect } from 'react-redux';
import { fetchPantry, editPantry } from '../../actions/pantry_actions';
import { fetchAllIngredients } from '../../actions/ingredient_actions';
import Pantry from './pantry';
import { deleteRecipe, fetchRecipes } from '../../actions/recipe_actions';
import { openModal } from '../../actions/modal_actions';

const mSTP = (state, ownProps) => ({
  pantry: state.pantries,
  ingredients: state.ingredients,
  recipes: state.recipes,
  currentUser: state.session.user,
});

const mDTP = (dispatch) => ({
  fetchPantry: () => dispatch(fetchPantry()),
  editPantry: (pantry) => dispatch(editPantry(pantry)),
  fetchAllIngredients: () => dispatch(fetchAllIngredients()),
  fetchRecipes: () => dispatch(fetchRecipes()),
  openModal: (modal, props) => dispatch(openModal(modal, props)),
  deleteRecipe: (recipeId) => dispatch(deleteRecipe(recipeId)),
});

export default connect(mSTP, mDTP)(Pantry);
