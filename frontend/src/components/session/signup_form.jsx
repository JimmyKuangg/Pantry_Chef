import React from "react";
import { withRouter } from "react-router-dom";
import './session.css'

class SignupForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      username: "",
      password: "",
      password2: "",
      errors: {},
    };

    this.demoLogin = this.demoLogin.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.clearedErrors = false;
    this.openLogin = this.props.openModal.bind(this);
  }



  update(field) {
    return (e) =>
      this.setState({
        [field]: e.currentTarget.value,
      });
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.signup(this.state)
      .then(this.props.closeModal());
  }

  demoLogin(e) {
    e.preventDefault();
    this.props.demoLogin();
    this.props.closeModal();
  }

  renderErrors() {
    return (
      <ul>
        {Object.keys(this.state.errors).map((error, i) => (
          <li key={`error-${i}`}>{this.state.errors[error]}</li>
        ))}
      </ul>
    );
  }

  render() {
    return (
      <div className="signup-form-container">
        <form onSubmit={this.handleSubmit}>
          <div className="signup-form">
            <br />
            <p className='session-input-label'>Email:</p>
            <input className='session-input-field'
              type="email"
              value={this.state.email}
              onChange={this.update("email")}
              placeholder="Email"
            />
            <br />
            <p className='session-input-label'>Username:</p>
            <input className='session-input-field'
              type="text"
              value={this.state.username}
              onChange={this.update("username")}
              placeholder="Username"
            />
            <br />
            <p className='session-input-label'>Password:</p>
            <input className='session-input-field'
              type="password"
              value={this.state.password}
              onChange={this.update("password")}
              placeholder="Password"
            />
            <br />
            <p className='session-input-label'>Confirm Password:</p>
            <input className='session-input-field'
              type="password"
              value={this.state.password2}
              onChange={this.update("password2")}
              placeholder="Confirm Password"
            />
            <br />

            <div id='submit-container'>
              <input className='purple-button' type="submit" value="Submit" />
              {this.renderErrors()}
              <input className="demo-signup-submit purple-button" type="submit" value={"Demo Login"} onClick={this.demoLogin} />
            </div>
            <br/>
            <p>Already have an account? <div id='modal-link' onClick={this.openLogin}>Log In</div></p>
          </div>
        </form>
      </div>
    );
  }
}

export default withRouter(SignupForm);
