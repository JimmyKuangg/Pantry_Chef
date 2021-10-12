import React from "react";
import Modal from '../modal/modal';
import { Link } from "react-router-dom";


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
          {/* <Link to={"/"}>All </Link>
          <Link to={"/profile"}>Profile</Link>
          <Link to={"/"}>Write a </Link> */}
          <button onClick={this.logoutUser}>Logout</button>
        </div>
      );
    } else {
      return (
        <div>
          <Link to={"/signup"}>Signup</Link>
          <Link to={"/login"}>Login</Link>
        </div>
      );
    }
  }

  render() {
    return (
      <div className="navbar-container">

        <div className="navbar-content">

          <div className="navbar-right">
            <div className="navbar-logo"></div>

            <div className="navbar-about"></div>

            <div className="navbar-github"></div>
          </div>

          <div className="navbar-left">
            {this.props.openLoginModal}
            {this.props.openSignupModal}
          </div>

        </div>
      </div>
    );
  }
}

export default NavBar;
