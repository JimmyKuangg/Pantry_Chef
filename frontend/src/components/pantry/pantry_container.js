import { connect } from 'react-redux';
import { fetchPantry, editPantry } from '../../actions/pantry_actions';
import Pantry from './pantry'

const mSTP = (state, ownProps) => ({
  pantry: state.pantries
});

const mDTP = dispatch => ({
  fetchPantry: () => dispatch(fetchPantry()),
  editPantry: pantry => dispatch(editPantry(pantry))
});

export default connect(mSTP, mDTP)(Pantry);