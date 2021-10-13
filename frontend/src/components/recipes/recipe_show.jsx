import React, { Component } from "react";
import "./recipe_show.css"

class RecipeShow extends Component {
  componentDidMount() {
    this.props.fetchRecipe(this.props.match.params.recipeId);
  }

  render() {
    const { recipe } = this.props;

    if (recipe === undefined) {
      return null;
    }
    console.log('recipe', recipe);
    return (
      <div className="show-wrapper">
        <div className="show-header">
          <div className="recipe-photo">{/* <img src={recipe.photo} /> */}Photo</div>
          <div className="recipe-info">
            <div className="recipe-name"> {recipe.name} </div>
            <ul className="recipe-category">
              {
                  recipe.categories.map( (category, i) => (
                    <li key={i}>{category}</li>
                  ))
              }
            </ul>
            <div className="recipe-info-bottom">
              <div className="recipe-show-overview">
                <div className="recipe-cooktime">{recipe.cookTime}</div>
                <div className="recipe-ingredient-count">{recipe.ingredients.length}</div>
              </div>
              <div className="recipe-show-social">
                <div className="recipe-show-review-score">★★★★☆</div>
                <div className="recipe-favorite-button">
                  <button>Flava Fav</button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="show-content">
          <div className="show-ingredients">
            <ul>
              {
                recipe.ingredients.map( (ingredient, i) => (
                          <li key={i} className='show-ingredient'> {ingredient.quantity} {ingredient.ingredient}</li>
                ))
              }
            </ul>
          </div>
          <div className="show-directions">
            <ol>
              {
                recipe.steps[0].split('.').slice(0, -1).map( (step, i) => (
                          <li key={i+1} className='show-direction'> {i+1}. {step} </li>
                ))
              }
            </ol>
          </div>
        </div>
        <div className="show-reviews">
          Reviews
          {/* {
                recipe.reviews.map( (review, i) => {
                  <li key={i} className='show-review'>
                    <div className='show-review-rating'> { review.rating } </div>
                    <div className='show-review-author'> { review.author.username } </div>
                    <div className='show-review-body'> { review.body } </div> 
                  </li>
                })
              } */}
        </div>
      </div>
    );
  }
}

export default RecipeShow;
