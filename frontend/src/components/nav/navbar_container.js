import { connect } from "react-redux";
import { logout } from "../../actions/session_actions";
import { openModal } from "../../actions/modal_actions";

import NavBar from "./navbar";

const mapStateToProps = (state) => ({
  loggedIn: state.session.isAuthenticated,
});

const mapDispatchToProps = dispatch => ({
  openLoginModal: (
    <button className="open-modal" onClick={() => dispatch(openModal('login'))}>
      Login
    </button>
  ),
  openSignupModal: (
    <button className="open-modal" onClick={() => dispatch(openModal('signup'))}>
      Sign up
    </button>
  ),
  logout: () => dispatch(logout())
})

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);
