import { connect } from "react-redux";
import { logout } from "../../actions/session_actions";
import { openModal } from "../../actions/modal_actions";
import { closeSidemenu, openSidemenu } from "../../actions/sidemenu_actions";

import NavBar from "./navbar";

const mapStateToProps = (state) => ({
  loggedIn: state.session.isAuthenticated,
  sideMenuOpen: state.ui.sideMenu
});

const mapDispatchToProps = dispatch => ({
  openLoginModal: (
    <button className="navbar-button" onClick={() => dispatch(openModal('login'))}>
      LOGIN
    </button>
  ),
  openSignupModal: (
    <button className="navbar-button" onClick={() => dispatch(openModal('signup'))}>
      SIGN UP
    </button>
  ),
  openNavSignupModal: (
    <button className="navbar-pantry" onClick={() => dispatch(openModal('signup'))}>
      MY PANTRY    
    </button>
  ),
  openSidemenu: () => dispatch(openSidemenu()),
  closeSidemenu: () => dispatch(closeSidemenu()),
  openRecipeCreateModal: (
    <button className="navbar-button" onClick={() => dispatch(openModal('createRecipe'))}>
      CREATE RECIPE
    </button>
  ),
  openRecipeEditModal: (
    <button className="navbar-button" onClick={() => dispatch(openModal('editRecipe'))}>
      EDIT RECIPE
    </button>
  ),
  logout: () => dispatch(logout())
})

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);
