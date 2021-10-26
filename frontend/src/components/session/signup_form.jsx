import React from 'react';
import { withRouter } from 'react-router-dom';
import './session.css';

class SignupForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      username: '',
      password: '',
      password2: '',
      errors: {},
    };

    this.demoLogin = this.demoLogin.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.clearedErrors = false;
    this.openLogin = this.props.openModal.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.currentUser === true) {
      this.props.history.push('/');
    }

    this.setState({ errors: Object.values(nextProps.errors) }, () =>
      Object.values(this.state.errors).length === 0
        ? this.props.closeModal()
        : null
    );
  }

  update(field) {
    return (e) =>
      this.setState({
        [field]: e.currentTarget.value,
      });
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.signup(this.state);
    // .then(this.props.closeModal());
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
      <div className="signup-form-container">
        <form onSubmit={this.handleSubmit}>
          <div className="signup-form">
            <br />
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

            <p className="session-input-label">Username:</p>
            <input
              className="session-input-field"
              id={this.errorId('Username')}
              type="text"
              value={this.state.username}
              onChange={this.update('username')}
              placeholder="Username"
            />
            {this.errorMessage('Username')}
            <br />

            <p className="session-input-label">Password:</p>
            <input
              className="session-input-field"
              id={this.errorId('characters')}
              type="password"
              value={this.state.password}
              onChange={this.update('password')}
              placeholder="Password"
            />
            {this.errorMessage('characters')}
            <br />

            <p className="session-input-label">Confirm Password:</p>
            <input
              className="session-input-field"
              id={this.errorId('Password')}
              type="password"
              value={this.state.password2}
              onChange={this.update('password2')}
              placeholder="Confirm Password"
            />
            {this.errorMessage('Confirm')}
            {this.errorMessage('match')}

            <br />

            <div id="submit-container">
              <input className="purple-button" type="submit" value="Sign Up" />
              <input
                className="demo-signup-submit purple-button"
                type="submit"
                value={'Demo Login'}
                onClick={this.demoLogin}
              />
            </div>
            <br />
            <p>
              Already have an account?{' '}
              <div id="modal-link" onClick={this.openLogin}>
                Log In
              </div>
            </p>
          </div>
        </form>
      </div>
    );
  }
}

export default withRouter(SignupForm);
