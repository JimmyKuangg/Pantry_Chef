import { connect } from 'react-redux';
import { closeModal } from '../../actions/modal_actions';
import { createRecipe } from '../../actions/recipe_actions';
import { fetchAllCategories } from '../../actions/category_actions';
import RecipeCreateForm from './recipe_create';

const mSTP = state => ({
  ingredients: state.ingredients,
  categories: state.categories,
  currentUser: state.session.user
});

const mDTP = dispatch => ({
  action: recipe => dispatch(createRecipe(recipe)),
  fetchAllCategories: () => dispatch(fetchAllCategories()),
  closeModal: () => dispatch(closeModal())
});

export default connect(mSTP, mDTP)(RecipeCreateForm);