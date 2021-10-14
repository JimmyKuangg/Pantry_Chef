import { listenerCount } from 'process';
import React, { Component } from 'react'
import "./recipe_create.css";

export default class RecipeCreateForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      ingredients: [{
        ingredient: "",
        quantity: "",
        unit: ""
      }],
      cookTime: "",
      calories: "",
      categories: [],
      author: this.props.currentUser.id,
      steps: [],
      imgUrl: "https://imgur.com/a/GZYbnvX"
    }

    this.handleSubmit = this.handleSubmit.bind(this);
    this.addToIngredients = this.addToIngredients.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.action(this.state);
  }

  update(field) {
    return e => this.setState({ [field]: e.currentTarget.value });
  }

  ingredientsCheck() {
    
  }

  addToIngredients(ingredient) {
    this.setState({ ingredients: [...this.state.ingredients, ingredient] })
  }

  render() {
    console.log(this.state.ingredients);
    return (
      <div>
        <form onSubmit={this.handleSubmit}>

          <header>
            <h2>Create Recipe</h2>
          </header>

          <div>
            <label>Name of recipe
              <input 
                type="text" 
                placeholder="Ex: Scrambled eggs"
                value={this.state.name}
                onChange={this.update("name")}
              />
            </label>
          </div>

          <div>
            <label>Ingredients
              <div className="ingredients-select-box">
                {this.props.ingredients.map(ingredient =>
                    <div onClick={ingredient => this.addToIngredients(ingredient)} value={ingredient}>
                      {ingredient.name}
                    </div>)}
              </div>
            </label>
          </div>

          <div>
            <label>Time to cook
              <input 
                type="text"
                value={this.state.cookTime}
                onChange={this.update("cookTime")}
              />
            </label>
          </div>

          <div>
            <label>Calories
              <input 
                type="text" 
                value={this.state.calories}
                onChange={this.update("calories")}
              />
            </label>
          </div>

        </form>
      </div>
    )
  }
}
