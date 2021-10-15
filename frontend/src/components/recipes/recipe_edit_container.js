import { connect } from 'react-redux';
import { closeModal } from '../../actions/modal_actions';
import { editRecipe } from '../../actions/recipe_actions';
import { closeSidemenu } from '../../actions/sidemenu_actions';
import { fetchAllCategories } from '../../actions/category_actions';
import RecipeEditForm from './recipe_edit';

const mSTP = (state, ownProps) => {
  ingredients: state.ingredients,
  categories: state.categories,
  currentUser: state.session.user,
  recipe: state.ui.modalPropsReducer,
  }
};

const mDTP = dispatch => ({
  action: recipe => dispatch(editRecipe(recipe)),
  fetchAllCategories: () => dispatch(fetchAllCategories()),
  closeModal: () => dispatch(closeModal()),
  closeSidemenu: () => dispatch(closeSidemenu()),
});

export default connect(mSTP, mDTP)(RecipeEditForm);