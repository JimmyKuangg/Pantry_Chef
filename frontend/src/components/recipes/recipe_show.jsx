import React, { Component } from "react";
import "./recipe_show.css"

class RecipeShow extends Component {

  componentDidUpdate(prevProps) {
    if (prevProps.match.params.recipeId !== this.props.match.params.recipeId) {
      this.props.fetchRecipe(this.props.match.params.recipeId)
    }
  }

  componentDidMount() {
    console.log(this.props.recipe)
    this.props.fetchRecipe(this.props.match.params.recipeId);
  }

  render() {
    const { recipe } = this.props;

    if ((recipe === undefined) || (recipe.steps === undefined)) {
      return null;
    }

    return (
      <div className="show-wrapper">
        <div className='nav-bar-block'></div>
        <div className="show-header">
          <div className="recipe-photo-wrapper">
            <img id="recipe-photo" src={recipe.imgUrl} alt='recipe'/>
          </div>
          <div className="recipe-info">
            <div className="recipe-name"> {recipe.name} </div>
            <div className="recipe-info-bottom">
              <div className="recipe-show-stats">
                <div className="recipe-cooktime">{recipe.cookTime}</div>
                <div className="recipe-ingredient-count">
                  {recipe.ingredients.length} ingredients
                </div>
                <div className="recipe-calories">
                  {recipe.calories} calories
                </div>
              </div>
              <div className="recipe-show-stats-2">
                <ul className="recipe-category">
                  {recipe.categories.map((category, i) => (
                    <li key={i}>{category.name}</li>
                  ))}
                </ul>
                <div className="recipe-show-social">
                  <div className="recipe-show-review-score">
                    ★★★★☆{recipe.rating}
                  </div>
                  <div className="recipe-favorite-button">
                    <button>Flava Fav</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="show-content">
          <div className="show-ingredients">
            <h1 className="directions-header">Ingredients</h1>
            <ul className="ul">
              {recipe.ingredients.map((ingredient, i) => (
                <li key={i} className="show-ingredient">
                  {ingredient.quantity} {ingredient.unit} {ingredient.ingredient}
                </li>
              ))}
            </ul>
          </div>
          <div className="show-directions">
            <h1 className="directions-header">Directions</h1>
            <ol>
              {recipe.steps.map((step, i) => (
                <li key={i} className="show-direction">
                  <input type="checkbox" />
                  {step}
                </li>
              ))}
            </ol>
          </div>
        </div>
        {/* <div className="show-reviews">
          Reviews
          {
                recipe.reviews.map( (review, i) => {
                  <li key={i} className='show-review'>
                    <div className='show-review-rating'> { review.rating } </div>
                    <div className='show-review-author'> { review.author.username } </div>
                    <div className='show-review-body'> { review.body } </div> 
                  </li>
                })
              }
        </div> */}
      </div>
    );
  }
}

export default RecipeShow;
