import React from "react";
import Modal from '../modal/modal';
import Search from '../search/search_container';
import RecipeIndex from '../recipes/recipe_index_container';

class MainPage extends React.Component {
  render() {
    return (
      <div>
        <h1>Pantry Chef</h1>
        <Modal />
        <Search />
        <RecipeIndex />
      </div>
    );
  }
}

export default MainPage;
