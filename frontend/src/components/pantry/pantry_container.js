import { connect } from 'react-redux';
import Pantry from './pantry'

const mSTP = (state, ownProps) => ({
  pantries: state.pantries
});

const mDTP = dispatch => ({
  
});

export default connect(mSTP, mDTP)(Pantry);