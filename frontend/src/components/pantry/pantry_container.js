import { connect } from 'react-redux';
import Pantry from './pantry'

const mSTP = state => ({
  pantries: state.pantries
});

const mDTP = dispatch => ({
  
});

export default connect(mSTP, mDTP)(Pantry);