import { closeSidemenu } from "../../actions/sidemenu_actions";
import Pantry from "../pantry/pantry_container";

function SideMenu(props) {
  if (!props.sidemenu){
    return null;
  }

  return(
    <div id="sidemenu">
      <Pantry />
    </div>
  )
}

const mSTP = state => {
  return {
    sidemenu: state.ui.sidemenu
  };
};

const mDTP = dispatch => {
  return {
    closeSidemenu: () => dispatch(closeSidemenu())
  };
};

export default connect(mSTP, mDTP)(SideMenu);
