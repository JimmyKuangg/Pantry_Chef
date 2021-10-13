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
    if (this.props.recipes.length === 0){
      return <div>
        There are no recipes here
      </div>
    }
    return (
        <div className="index-main">
          <div className="index-recipes">
            <ul> Recipes
              { this.props.recipes.map((recipe, i) => (
                <li key={i} className="index-recipe">
                  {recipe.name}
                </li>
              ))}
            </ul>
          </div>
        </div>

    );
  }
}
