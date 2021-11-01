import { connect } from 'react-redux';
import { closeModal } from '../../actions/modal_actions';
import { clearRecipeErrors, createRecipe } from '../../actions/recipe_actions';
import { closeSidemenu } from '../../actions/sidemenu_actions';
import { fetchAllCategories } from '../../actions/category_actions';
import RecipeCreateForm from './recipe_create';
import { withRouter } from 'react-router';

const mSTP = state => ({
  ingredients: state.ingredients,
  categories: state.categories,
  currentUser: state.session.user,
  errors: state.errors.recipe
});

const mDTP = dispatch => ({
  action: recipe => dispatch(createRecipe(recipe)),
  fetchAllCategories: () => dispatch(fetchAllCategories()),
  closeModal: () => dispatch(closeModal()),
  closeSidemenu: () => dispatch(closeSidemenu()),
  clearRecipeErrors: () => dispatch(clearRecipeErrors())
});

export default withRouter(connect(mSTP, mDTP)(RecipeCreateForm));