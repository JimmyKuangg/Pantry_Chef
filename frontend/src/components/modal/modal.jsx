import React from 'react';
import { closeModal } from '../../actions/modal_actions';
import { connect } from 'react-redux';
import "./modal.css";
import LoginFormContainer from '../session/login_form_container';
import SignupFormContainer from '../session/signup_form_container';
import CreateRecipeContainer from "../recipes/recipe_create_container";
import EditRecipeContainer from "../recipes/recipe_edit_container";

function Modal(props) {
  if (!props.modal) {
    return null;
  }
  let component;

  switch (props.modal) {
    case 'login':
      component = <LoginFormContainer />;
      break;
    case 'signup':
      component = <SignupFormContainer />;
      break;
    case 'createRecipe':
      component = <CreateRecipeContainer />;
      break;
    case 'editRecipe':
      component = <EditRecipeContainer />;
      break;
    default:
      return null;
  }

  return (
    <div className="modal-background" onClick={props.closeModal}>
      <div className="modal-child" onClick={e => e.stopPropagation()}>
        { component }
      </div>
    </div>
  );
}

const mSTP = state => {
  return {
    modal: state.ui.modal
  };
};

const mDTP = dispatch => {
  return {
    closeModal: () => dispatch(closeModal())
  };
};

export default connect(mSTP, mDTP)(Modal);
