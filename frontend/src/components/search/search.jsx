import React, { Component } from 'react'
import RecipeIndexContainer from '../recipes/recipe_index_container';
import "./search.css";

export default class Search extends Component {
  constructor(props){
    super(props)
    this.state = {
      search: '',
      ingredientSuggestions: [],
      selectedIngredients: []
    }
    this.addIngredientsToPantry = this.addIngredientsToPantry.bind(this)
    this.suggestionClickHandler = this.suggestionClickHandler.bind(this)
    this.removeSelectedClickHandler = this.removeSelectedClickHandler.bind(this)
  }

  componentDidMount(){
    this.props.fetchAllIngredients()
    if(this.props.currentUser.id) { this.props.fetchPantry()
      .then(()=>  this.setState({selectedIngredients: this.props.pantry.ingredients.map(ingredient => ({_id: ingredient.ingredient, name: ingredient.name}))})
    )}

  }

  componentDidUpdate(prevProps){
    if(prevProps.currentUser !== this.props.currentUser){
      window.location.reload();
    }
  }


  update(e){
      let search = e.target.value;
      let suggestions = this.props.ingredients.filter(ingredient => 
      !this.state.selectedIngredients.includes(ingredient) &&
      ingredient.name.includes(search) && search !== '')

    this.setState({search: search, 
      ingredientSuggestions: suggestions
    })
  }


  suggestionClickHandler(e, value){
    e.preventDefault();
    this.setState({selectedIngredients: [...this.state.selectedIngredients, value]})
    let filtered = this.state.ingredientSuggestions.filter(ingredient => ingredient.name !== value.name)

    this.setState({ingredientSuggestions: filtered})
  }

  removeSelectedClickHandler(e, value){
    let newSelectedIngredients = this.state.selectedIngredients.filter(ingredient => ingredient.name !== value)
    this.setState({selectedIngredients: newSelectedIngredients})
  }

  addIngredientsToPantry(e){
    e.preventDefault();
    let selectIngredients = this.state.selectedIngredients.map(ingredient => ingredient._id)
    let hash = {}
    let pantryIngredients = this.props.pantry.ingredients.map(ingredient => ingredient.ingredient)
    let merged = [...selectIngredients, ...pantryIngredients]

    merged.forEach(ingredient => {
      if (!hash[ingredient]) hash[ingredient] = 0;
      hash[ingredient] += 1
    })

    merged = Object.keys(hash)
    let arrayOfObjects = merged.map(ele => ({ingredient: ele}))
    let newPantry = {
      ingredients: arrayOfObjects
    }
    this.props.editPantry(newPantry)
  }

  render() {
    return (
      <div>
        <div className="search-wrapper">

          <div className="search-input-wrapper">
            <input type="text" 
              className="search-bar" 
              value={this.state.search} 
              placeholder="Enter an ingredient..."
              onChange={e => this.update(e)}
            />
            
            <div className="search-icon"></div>
          </div>
          {
            this.state.ingredientSuggestions.length === 0 ? "" : 
              <div className='ingredient-suggestions-background' >
                <div className='ingredient-suggestions' style={{display: this.state.ingredientSuggestions === [] ? 'none' : 'block'}}>
                  <ul>
                    {this.state.ingredientSuggestions.map((suggestion, i) => (
                      this.state.selectedIngredients.includes(suggestion) ? 
                      "" :
                    <li key={i} className="suggestion-item" onClick={e => this.suggestionClickHandler(e, suggestion)}>{suggestion.name}</li>
                    ))}
                  </ul>      
                </div>
              </div>
          }
          
          <div className="selected-ingredients-wrapper">
            <div className="selected-ingredients-box">
              <ul id='selected-ingredients'>
                {this.state.selectedIngredients.map((ingredient,i) => 
                <li key={i} className="selected-ingredient-item" onClick={e => this.removeSelectedClickHandler(e, ingredient.name)}>{ingredient.name}</li>)}
              </ul>
            </div>
          </div>
            {this.props.currentUser && this.state.selectedIngredients.length > 0 ? <button id='save-to-pantry' onClick={this.addIngredientsToPantry}>Add Ingredients to Pantry</button> : ""}
          <div>
            <RecipeIndexContainer ingredients={this.state.selectedIngredients} key={this.state.selectedIngredients}/>
          </div>
        </div>
      </div>
    )
  }
}
