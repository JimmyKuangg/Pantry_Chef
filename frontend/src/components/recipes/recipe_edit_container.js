import { connect } from 'react-redux';
import { closeModal } from '../../actions/modal_actions';
import RecipeEditForm from './recipe_edit';

const mSTP = state => ({
  ingredients: Object.values(state.ingredients)
});

const mDTP = dispatch => ({
  closeModal: () => dispatch(closeModal())
});

export default connect(mSTP, mDTP)(RecipeEditForm);