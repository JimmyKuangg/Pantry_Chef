import React, { Component } from "react";

export default class RecipeIndex extends Component {
  constructor(props){
    super(props);
    this.state = {
      exactRecipes: [],
      closeRecipes: [],
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
    let exactFiltered = this.props.recipes.filter( recipe => {
      return recipe.ingredients.every(ingredient => names.includes(ingredient.ingredient))
      
    })

    let closeFiltered = this.props.recipes.filter( recipe => {
      let length = recipe.ingredients.length;
      let ingredients = []
      recipe.ingredients.forEach(ingredient => {if (names.includes(ingredient)) ingredients.push(ingredient)})
      return ingredients.length > length * 0.8;
    })

    this.setState({exactRecipes: exactFiltered})
    this.setState({closeRecipes: closeFiltered})
  }

  filterByCategories(){
    if (this.state.filteredCategories === []) return null;
    let exactFiltered = this.state.exactRecipes.filter( recipe => {
      return recipe.categories.sort() === this.state.filterCategories.sort()
    })
    let closeFiltered = this.state.closeRecipes.filter( recipe => {
      return recipe.categories.sort() === this.state.filterCategories.sort()
    })
    this.setState({recipes: exactFiltered})
    this.setState({recipes: closeFiltered})

  }

  possibleCategories(){
    let possibleCategories = []

    this.state.exactRecipes.forEach(recipe => possibleCategories.push(...recipe.categories) )
    this.state.closeRecipes.forEach(recipe => possibleCategories.push(...recipe.categories) )
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
              { this.state.exactRecipes.map((recipe, i) => (
                <li key={i} className="index-recipe" id="exact-match">
                  <h3>{recipe.name}</h3>
                  <p>{recipe.author}</p>
                  <p>Exact Match</p>
                </li>
              ))}
              { this.state.closeRecipes.map((recipe, i) => (
                <li key={i} className="index-recipe" id="close-match">
                  <h3>{recipe.name}</h3>
                  <p>{recipe.author}</p>
                  <p>Close Match</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
    );
  }
}
