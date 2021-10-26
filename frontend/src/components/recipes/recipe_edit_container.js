import { connect } from 'react-redux';
import { closeModal } from '../../actions/modal_actions';
import { clearRecipeErrors, editRecipe } from '../../actions/recipe_actions';
import { closeSidemenu } from '../../actions/sidemenu_actions';
import { fetchAllCategories } from '../../actions/category_actions';
import RecipeEditForm from './recipe_edit';

const mSTP = state => ({
  ingredients: state.ingredients,
  categories: state.categories,
  currentUser: state.session.user,
  recipe: state.ui.modalPropsReducer,
  errors: state.errors.recipe,
  state: state
  }
);

const mDTP = (dispatch) => ({
  action: (recipe) => dispatch(editRecipe(recipe)),
  fetchAllCategories: () => dispatch(fetchAllCategories()),
  closeModal: () => dispatch(closeModal()),
  closeSidemenu: () => dispatch(closeSidemenu()),
  clearRecipeErrors: () => dispatch(clearRecipeErrors())
});

export default connect(mSTP, mDTP)(RecipeEditForm);
