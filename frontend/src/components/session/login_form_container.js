import { connect } from "react-redux";
import { login } from "../../actions/session_actions";
import { closeModal } from "../../actions/modal_actions";
import LoginForm from "./login_form";

const mapStateToProps = (state) => {
  return {
    errors: state.errors.session,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    login: (user) => dispatch(login(user)),
    demoLogin: () => dispatch(login({ email: "demouser@io.com", password: "ilovevern" })),
    closeModal: () => dispatch(closeModal())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
