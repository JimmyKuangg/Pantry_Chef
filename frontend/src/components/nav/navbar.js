import React from "react";
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
      <div>
        <h1>Pantry Chef</h1>
        {this.getLinks()}
      </div>
    );
  }
}

export default NavBar;
