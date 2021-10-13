import React, { Component } from "react";

export default class RecipeIndex extends Component {
  constructor(props){
    super(props);
    this.state = {

    }
  }

  componentDidMount() {
    this.props.fetchRecipes();
  }

  render() {
    const { recipes } = this.props;

    if (recipes === undefined) {
      return null;
    }

    return (
      <div className="index-page">
        <div className="index-main">
          <div className="index-logo">Logo</div>
          <div className="index-search-bar">Search Bar</div>
          <div className="index-recipes">
            <ul> Recipes
              {/* {recipes.map((recipe, i) => {
                <li key={i} className="index-recipe">
                  {recipe.name}
                </li>;
              })} */}
            </ul>
          </div>
        </div>
        <div className="index-sidebar">
          <div className="index-sidebar-ingredients">
            <ul> Sidebar Ingredients
              {/* {ingredients.map((ingredient, i) => {
                <li key={i} className="index-sidebar-ingredients">
                  Ingredient
                </li>;
              })} */}
            </ul>
          </div>
          <button className="save-ingredients">
            Save Ingredients to My Pantry
          </button>
        </div>
      </div>
    );
  }
}
