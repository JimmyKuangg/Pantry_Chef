import { connect } from "react-redux";
import { signup, login } from "../../actions/session_actions";
import { closeModal, openModal } from "../../actions/modal_actions";
import SignupForm from "./signup_form";

const mapStateToProps = (state) => {
  return {
    signedIn: state.session.isSignedIn,
    errors: state.errors.session,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    signup: (user) => dispatch(signup(user)),
    demoLogin: () => dispatch(login({ email: "demouser@io.com", password: "ilovevern" })),
    closeModal: () => dispatch(closeModal()),
    openModal: () => dispatch(openModal('login'))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignupForm);
