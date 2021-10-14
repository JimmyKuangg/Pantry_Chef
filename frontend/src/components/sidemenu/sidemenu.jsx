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
      <button className="close-sidemenu" onClick={props.closeSidemenu}>X</button>
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
