import React, { Component } from 'react'

class RecipeShow extends Component {
    render() {
        return (
            <div className="show-container">
                <div className="show-header">
                    <div className="recipe-picture">
                        {/* <img src='' /> */}
                    </div>
                    <div className="recipe-info">
                        <div className="recipe-name">
                            Recipe Name
                        </div>
                        <div className="recipe-category">
                            Category
                        </div>
                        <div className='recipe-info-bottom'> 
                            <div className='recipe-show-overview'>
                                Cooktime - # of Ingredients
                            </div>
                            <div className='recipe-show-social'>
                                Review Score - Favorite Button
                            </div>
                        </div>
                    </div>
                </div>
                <div className="show-content">
                    <div className="show-ingredients">
                        <ol>
                            <li>ingredient</li>
                            <li>ingredient</li>
                            <li>ingredient</li>
                            <li>ingredient</li>
                            <li>ingredient</li>
                            <li>ingredient</li>
                        </ol>
                    </div>
                    <div className="show-directions">
                        <ol>
                            <li>direction</li>
                            <li>direction</li>
                            <li>direction</li>
                            <li>direction</li>
                            <li>direction</li>
                            <li>direction</li>
                            <li>direction</li>
                        </ol>
                    </div>
                </div>
                <div className="show-reviews">
                    Review
                </div>
            </div>
        )
    }
}

export default RecipeShow;