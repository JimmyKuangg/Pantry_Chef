import React from "react";
import { Link } from "react-router-dom";
import "./navbar.css";
import navlogo from './navlogo.png';

class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.logoutUser = this.logoutUser.bind(this);
    this.getLinks = this.getLinks.bind(this);
  }

  logoutUser(e) {
    e.preventDefault();
    this.props.logout();
  }

  getLinks() {
    if (this.props.loggedIn) {
      return (
        <div>
          <button onClick={this.logoutUser}>Logout</button>
        </div>
      );
    } else {
      return (
        <div className="navbar-right">

          <div className="navbar-item">
            <div className="navbar-login">
              {this.props.openLoginModal}
            </div>
          </div>

          <div className="navbar-item">
            <div className="navbar-signup">
              {this.props.openSignupModal}
            </div>
          </div>

        </div>
      );
    }
  }

  render() {
    return (
      <div className="navbar-container">

        <div className="navbar-content">
        
          <div className="navbar-left">

            <div className="navbar-logo-box">
              <a href="/">
                <img className="pc-logo" src={navlogo} alt="Pantry Chef logo" />
              </a>
            </div>

            <div className="navbar-item">
              <div className="navbar-about">
                About
              </div>
            </div>

            <div className="navbar-item">
              <div className="navbar-about">
                Meet the Team
              </div>
            </div>

            <div className="navbar-item">
              <div className="navbar-github">
                <a href="https://github.com/JimmyKuangg/Pantry_Chef">
                  {/* <img className="nav-github-logo" src={github} alt="GitHub repo" /> */}
                  <i className="fab fa-github" id="nav-github-logo" />
                </a>
              </div>
            </div>

          </div>

          {this.getLinks()}

        </div>
      </div>
    );
  }
}

export default NavBar;
