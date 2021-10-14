import React, { Component } from "react";
import './recipe_index.css';
import { Link } from "react-router-dom";

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
      if (this.state.filterCategories.length === 0) return true;
      return recipe.categories.some(category => {
        return this.state.filterCategories.includes(category)})
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
    let newCats = []
    newCats.push(value)
    this.setState({filterCategories: newCats})
    this.filterByCategories();

  }

  clearFilterClickHandler(){
    this.setState({filterCategories: [], recipes: this.props.recipes})
    this.filterByIngredients();
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
            <div className="category-list">
              <li key='clear' id='category-item' onClick={this.clearFilterClickHandler}>Clear all Category Filters</li>
              {this.possibleCategories().map((category, i) => <li id='category-item' key={i} onClick={e => this.categoryClickHandler(e, category)}>{category}</li>)}
            </div>
          </div>
          <div className="index-recipes">
            <h2>Recipes</h2>
            <ul id='index-recipe-items'>
              { this.state.recipes.map((recipe, i) => (
                <Link to={`/recipes/${recipe.id}`}><li key={i} id="index-recipe-item">
                  <img id='recipe-picture'src={recipe.imgUrl} />
                  <h3>{recipe.name}</h3>
                  <p>by: {recipe.author}</p>
                </li></Link>
              ))}
            </ul>
          </div>
        </div>
    );
  }
}
