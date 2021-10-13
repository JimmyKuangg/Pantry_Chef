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
    if(this.props.ingredients === undefined || this.props.ingredients.length === 0 ){
      this.setState({recipes: this.props.recipes});
      return
    }

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
                  <img id='recipe-picture'src='https://i2.wp.com/www.awilsonsocialwork.net/wp-content/uploads/2017/01/placeholder.jpg?fit=1200%2C1200&ssl=1'/>
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
