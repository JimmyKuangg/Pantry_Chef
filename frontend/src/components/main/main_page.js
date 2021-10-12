import React from "react";
import Modal from '../modal/modal';
import Search from '../search/search_container';
import RecipeIndex from '../recipes/recipe_index_container';
import logo from './logo.png';
import "./main.css";
import "../../index.css"

class MainPage extends React.Component {
  render() {
    return (
      <div>
        <div className="main-content">

          <Modal />

          <div className="main-head">
            <img className="home-logo" src={logo} alt="Pantry Chef logo" />
            <Search />
          </div>

          <div className="main-tail">
           <RecipeIndex />
          </div>

        </div>
      </div>
    );
  }
}

export default MainPage;
