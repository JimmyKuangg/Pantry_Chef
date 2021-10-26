import React from 'react';
import { withRouter } from 'react-router-dom';
import './session.css';

class LoginForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      errors: {},
    };

    this.demoLogin = this.demoLogin.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    // this.renderErrors = this.renderErrors.bind(this);
    this.openSignUp = this.props.openModal.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.currentUser === true) {
      this.props.history.push('/');
    }

    this.setState({ errors: Object.values(nextProps.errors) });
  }

  update(field) {
    return (e) =>
      this.setState({
        [field]: e.currentTarget.value,
      });
  }

  handleSubmit(e) {
    e.preventDefault();

    let user = {
      email: this.state.email,
      password: this.state.password,
    };

    this.props.login(user).then(() => this.props.closeModal());
  }

  demoLogin(e) {
    e.preventDefault();
    this.props.demoLogin();
    // this.props.closeModal();
  }

  // renderErrors() {
  //   return (
  //     <ul>
  //       {Object.keys(this.state.errors).map((error, i) => (
  //         <li key={`error-${i}`}>{this.state.errors[error]}</li>
  //       ))}
  //     </ul>
  //   );
  // }

  errorId(field) {
    for (let i = 0; i < this.state.errors.length; i++) {
      if (this.state.errors[i].includes(`${field}`)) {
        return 'error-field';
      }
    }
    return null;
  }

  errorMessage(field) {
    for (let i = 0; i < this.state.errors.length; i++) {
      if (this.state.errors[i].includes(`${field}`)) {
        return <p id="error-message">{this.state.errors[i]}</p>;
      }
    }
    return null;
  }

  render() {
    return (
      <div className="modal" id="login-modal">
        <form onSubmit={this.handleSubmit}>
          <div className="login-modal-content">
            <p className="session-input-label">Email:</p>
            <input
              className="session-input-field"
              id={this.errorId('Email')}
              type="email"
              value={this.state.email}
              onChange={this.update('email')}
              placeholder="Email"
            />
            {this.errorMessage('Email')}
            <br />

            <p className="session-input-label">Password:</p>
            <input
              className="session-input-field"
              id={this.errorId('Password')}
              type="password"
              value={this.state.password}
              onChange={this.update('password')}
              placeholder="Password"
            />
            {this.errorMessage('Password')}

            <br />
            <div id="submit-container">
              <input
                className="purple-button"
                type="submit"
                value="Log In"
                id="login"
              />
              <input
                className="demo-signup-submit purple-button"
                type="submit"
                value={'Demo Login'}
                onClick={this.demoLogin}
              />
            </div>
            <br />

            <p>
              New to pantry chef?{' '}
              <div id="modal-link" onClick={this.openSignUp}>
                Sign Up
              </div>
            </p>

            {/* {this.renderErrors()} */}
          </div>
        </form>
      </div>
    );
  }
}

export default withRouter(LoginForm);
