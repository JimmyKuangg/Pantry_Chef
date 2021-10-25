import { connect } from 'react-redux';
import { closeSidemenu } from "../../actions/sidemenu_actions";
import './sidemenu.css';
import Pantry from "../pantry/pantry_container";

function SideMenu(props) {
  if (!props.sidemenu){
    return null;
  }

  return(
    <div className="sidemenu">
      <p className="close-sidemenu" onClick={props.closeSidemenu}><i className="fas fa-times"/></p>
      <Pantry />
    </div>
  )
}

const mSTP = state => {
  return {
    sidemenu: state.ui.sideMenu
  };
};

const mDTP = dispatch => {
  return {
    closeSidemenu: () => dispatch(closeSidemenu())
  };
};

export default connect(mSTP, mDTP)(SideMenu);
