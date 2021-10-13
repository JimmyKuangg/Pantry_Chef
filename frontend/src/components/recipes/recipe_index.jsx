import React, { Component } from "react";

export default class RecipeIndex extends Component {
  componentDidMount() {
    this.props.fetchRecipes();
    console.log(this.props.state)
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
          <div className='index-recipes'>
            <ul>
              {
                recipes.map( (recipe, i) => {
                  <li key={i} className='index-recipe-card'>
                    {recipe.name}
                  </li>
                })
              }
            </ul>
          </div>
        </div>
        <div className="index-sidebar">
          <div className="index-sidebar-ingredients">
            <ul>
              <li>Ingredient</li>
              <li>Ingredient</li>
              <li>Ingredient</li>
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
