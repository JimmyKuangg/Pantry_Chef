import React, { Component } from "react";
import './recipe_index.css'
import { Link } from "react-router-dom";

export default class RecipeIndex extends Component {
  constructor(props){
    super(props);
    this.state = {
      recipes: this.props.recipes,
      exactRecipes: [],
      closeRecipes: [],
      filterCategories: []
    }
    this.categoryClickHandler = this.categoryClickHandler.bind(this);
    this.clearFilterClickHandler = this.clearFilterClickHandler.bind(this);
  }

  componentDidMount() {
    this.props.fetchRecipes()
    if (this.props.ingredients) this.filterByIngredients()
  }

  filterByIngredients(){


    let names = this.props.ingredients.map(ingredient => ingredient.name)
    let exactFiltered = this.props.recipes.filter( recipe => {
      return recipe.ingredients.every(ingredient => names.includes(ingredient.ingredient))
      
    })

    let closeFiltered = this.props.recipes.filter( recipe => {
      let length = recipe.ingredients.length;
      let ingredients = []
      recipe.ingredients.forEach(ingredient => {if (names.includes(ingredient.ingredient)) ingredients.push(ingredient)})
      return ingredients.length !== length && ingredients.length >= length * 0.8;
    })

    this.setState({exactRecipes: exactFiltered})
    this.setState({closeRecipes: closeFiltered})
  }

  filterByCategories(){
    console.log(this.state.filterCategories)
    if (this.props.ingredients){
      if (this.state.filteredCategories === []) return null;
      let exactFiltered = this.state.exactRecipes.filter( recipe => {
        if (this.state.filterCategories.length  === 0) return true
        return recipe.categories.some(cat => this.state.filterCategories.includes(cat))
      })
      let closeFiltered = this.state.closeRecipes.filter( recipe => {
        if (this.state.filterCategories.length  === 0) return true
        return recipe.categories.some(cat => this.state.filterCategories.includes(cat))
      })
      this.setState({exactRecipes: exactFiltered})
      this.setState({closeRecipes: closeFiltered})
    } else {
      let filtered = this.props.recipes.filter( recipe => {
        if (this.state.filterCategories.length  === 0) return true
        return recipe.categories.some(cat => this.state.filterCategories.includes(cat))
      })

      this.setState({recipes: filtered})
    }

  }

  possibleCategories(){
    let possibleCategories = []
    let hash = {}
    if (this.props.ingredients){
      this.state.exactRecipes.forEach(recipe => possibleCategories.push(...recipe.categories) )
      this.state.closeRecipes.forEach(recipe => possibleCategories.push(...recipe.categories) )
  
      
    } else {
      this.props.recipes.forEach(recipe => possibleCategories.push(...recipe.categories) )
    }
    possibleCategories.forEach(category => {
      if (!hash[category]) hash[category] = 0
      hash[category] += 1
    })
    return Object.keys(hash)
  }

  categoryClickHandler(e, value){
    if (!this.state.filterCategories.includes(value) ){
      let newCats = this.state.filterCategories
      newCats.push(value)
      this.setState({filterCategories: newCats})
      this.filterByCategories();
    }
  }

  clearFilterClickHandler(){
    if(this.props.ingredients) this.filterByIngredients();
    this.setState({filterCategories: []}, () => this.filterByCategories())
  }

  render() {
    if (this.props.recipes.length === 0){
      return <div>
        There are no recipes here
      </div>
    }
    return (
        <div className="index-main">
          <div className='category-wrapper'>
            <h1>Categories</h1>
            <div className='category-list'>
              <li key='clear' id='category-item' onClick={this.clearFilterClickHandler}>Clear all Category Filters</li>
              {this.possibleCategories().map((category, i) => 
              <li key={i} 
                id='category-item' 
                onClick={e => this.categoryClickHandler(e, category)}>
                  {category}
              </li>)}
            </div>
          </div>
          <div className="index-recipes">
            <h3>Recipes</h3>
            <ul id='index-recipe-items'> 

              { !this.props.ingredients ? 
                  this.state.recipes.map((recipe, i) => (
                    <Link to={`/recipes/${recipe.id}`} id='recipe-links'><li key={i} className="index-recipe-item" id="exact-match">
                      <div id='recipe-picture' alt-text={recipe.name} style={{ backgroundImage:`url(${recipe.imgUrl})`}}></div>
                      <h3>{recipe.name}</h3>
                      <p>{recipe.author}</p>
                    </li></Link>
                  )) : ""}


              { this.state.exactRecipes.map((recipe, i) => (
                <Link to={`/recipes/${recipe.id}`} id='recipe-links'><li key={i} className="index-recipe-item" id="exact-match">
                  <div id='recipe-picture' alt-text={recipe.name} style={{ backgroundImage:`url(${recipe.imgUrl})`}}>      <p id='match-label'>Exact Match</p></div>
                  <h3>{recipe.name}</h3>
                  <p>{recipe.author}</p>
                </li></Link>
              ))}


              { this.state.closeRecipes.map((recipe, i) => (
                <Link to={`/recipes/${recipe.id}`} id='recipe-links'><li key={i} className="index-recipe-item" id="close-match">
                  <div id='recipe-picture' style={{ backgroundImage:`url(${recipe.imgUrl})`}}>      <p id='match-label'>Close Match</p>
                  </div>
                  <h3>{recipe.name}</h3>
                  <p>{recipe.author}</p>
                </li></Link>
              ))}
            </ul>
          </div>
        </div>
    );
  }
}
