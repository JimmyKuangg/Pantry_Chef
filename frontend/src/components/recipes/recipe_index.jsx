import React, { Component } from "react";

export default class RecipeIndex extends Component {
  constructor(props){
    super(props);
    this.state = {
      recipes: this.props.recipes,
      filterCategories: []
    }
    this.categoryClickHandler = this.categoryClickHandler.bind(this);
    this.clearFilterClickHandler = this.clearFilterClickHandler.bind(this);
  }

  componentDidMount() {
    this.props.fetchRecipes()
    this.filterByIngredients()
  }

  filterByIngredients(){


    let names = this.props.ingredients.map(ingredient => ingredient.name)
    let filtered = this.props.recipes.filter( recipe => {
      return recipe.ingredients.every(ingredient => names.includes(ingredient.ingredient))
      
    })
    this.setState({recipes: filtered})
  }

  filterByCategories(){
    if (this.state.filteredCategories === []) return null;
    let filtered = this.state.recipes.filter( recipe => {
      return recipe.categories.sort() === this.state.filterCategories.sort()
    })
    this.setState({recipes: filtered})
  }

  possibleCategories(){
    let possibleCategories = []

    this.state.recipes.forEach(recipe => possibleCategories.push(...recipe.categories) )
    let hash = {}

    possibleCategories.forEach(category => {
      if (!hash[category]) hash[category] = 0
      hash[category] += 1
    })
    return Object.keys(hash)
  }

  categoryClickHandler(e, value){
    let newCats = this.state.filterCategories
    newCats.push(value)
    this.setState({filterCategories: newCats})
  }

  clearFilterClickHandler(){
    this.setState({filterCategories: []})
  }

  render() {
    if (this.props.recipes.length === 0){
      return <div>
        There are no recipes here
      </div>
    }

    return (
        <div className="index-main">
          <div>
            <h1>Categories</h1>
            <div>
              <li key='clear' onClick={this.clearFilterClickHandler}>Clear all Category Filters</li>
              {this.possibleCategories().map((category, i) => <li key={i} onClick={e => this.categoryClickHandler(e, category)}>{category}</li>)}
            </div>
          </div>
          <div className="index-recipes">
            <ul> Recipes
              { this.state.recipes.map((recipe, i) => (
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
