import React, { Component } from 'react'

class RecipeShow extends Component {

    componentDidMount(){
        this.props.fetchRecipe(this.props.match.params.recipeId)
    }
    
    render() {
        console.log(this.props)
        
        const { recipe } = this.props;
        
        if (recipe === undefined ) {
            return null
        }

        return (
          <div className="show-container">
            <div className="show-header">
              <div className="recipe-photo">
                {/* <img src={recipe.photo} /> */}
              </div>
              <div className="recipe-info">
                <div className="recipe-name"> {recipe.name} </div>
                <ul className="recipe-category">
                  {recipe.categories.map((category, i) => (
                    <li key={i}>{category.name}</li>
                  ))}
                </ul>
                <div className="recipe-info-bottom">
                  <div className="recipe-show-overview">
                    <div className="recipe-cooktime">{recipe.cookTime}</div>
                    <div className="recipe-ingredient-count">
                      {recipe.ingredients.length}
                    </div>
                  </div>
                  <div className="recipe-show-social">
                    <div className="recipe-review-score">★★★★☆</div>
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
                    {recipe.ingredients.map( (ingredient, i) => {
                        <li key={i} className='show-ingredient'> {ingredient.quantity}{ingredient.name}</li>
                    })}
                </ul>
              </div>
              <div className="show-directions">
                <ol>
                    {/* {recipe.steps.map( (step, i) => {
                        <li key={i} className='show-direction'> {i}{step} </li>
                    })} */}
                </ol>
              </div>
            </div>
            <div className="show-reviews">Review</div>
          </div>
        );
    }
}

export default RecipeShow;