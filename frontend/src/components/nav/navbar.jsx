import React from 'react';
import { Link } from 'react-router-dom';
import './navbar.css';
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
    window.location.reload();
  }

  getLinks() {
    if (this.props.loggedIn) {
      return (
        <div className="navbar-right">
          <div className="navbar-item">
            <div className="navbar-pantry">
              <button
                className="navbar-button"
                onClick={
                  !this.props.sideMenuOpen
                    ? () => this.props.openSidemenu()
                    : () => this.props.closeSidemenu()
                }
              >
                MY PANTRY
              </button>
            </div>
          </div>

          <div>
            <button className="navbar-button" onClick={this.logoutUser}>
              LOGOUT
            </button>
          </div>

          <div className="navbar-item">
            <div className="navbar-github">
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://github.com/JimmyKuangg/Pantry_Chef"
              >
                <i className="fab fa-github" id="nav-github-logo" />
              </a>
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div className="navbar-right">
          <div className="navbar-item">
            <div className="navbar-pantry">{this.props.openNavSignupModal}</div>
          </div>

          <div className="navbar-item">
            <div className="navbar-login">{this.props.openLoginModal}</div>
          </div>

          <div className="navbar-item">
            <div className="navbar-signup">{this.props.openSignupModal}</div>
          </div>

          <div className="navbar-item">
            <div className="navbar-github">
              <a href="https://github.com/JimmyKuangg/Pantry_Chef">
                <i className="fab fa-github" id="nav-github-logo" />
              </a>
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
                <Link to="/recipes">ALL RECIPES</Link>
              </div>
            </div>

            <div className="navbar-item">
              <div className="navbar-about">
                <Link to="/meet-the-team">MEET THE TEAM</Link>
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
