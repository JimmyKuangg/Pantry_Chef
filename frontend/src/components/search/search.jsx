import React, { Component } from 'react'
import "./search.css";

export default class Search extends Component {
  constructor(props){
    super(props)
    this.state = {
      search: '',
      ingredientSuggestions: [],
      selectedIngredients: []
    }
    this.updateSuggestions = this.updateSuggestions.bind(this)
    this.suggestionClickHandler = this.suggestionClickHandler.bind(this)
    this.removeSelectedClickHandler = this.removeSelectedClickHandler.bind(this)
  }

  componentDidMount(){
    this.props.fetchAllIngredients()
  }  

  update(){
    return e => this.setState({search: e.currentTarget.value})
  }

  updateSuggestions(){
    let suggestions = this.props.ingredients.filter(ingredient => 
      !this.state.selectedIngredients.includes(ingredient) &&
      ingredient.name.includes(this.state.search))
    this.setState({ingredientSuggestions: suggestions})
  }

  suggestionClickHandler(e){
    let newSelectedIngredients = this.state.selectedIngredients;
    newSelectedIngredients.push(e.currentTarget.value)
    this.setState({selectedIngredients: newSelectedIngredients})
  }

  removeSelectedClickHandler(e){
    let newSelectedIngredients = this.state.selectedIngredients.filter(ingredient => ingredient !== e.currentTarget.value)
    this.setState({selectedIngredients: newSelectedIngredients})
  }


  render() {

  

    return (
      <div>
        <div className="search-wrapper">

          <div className="search-input-wrapper">
            <input type="text" 
              className="search-bar" 
              value={this.state.serach} 
              placeholder="Enter an ingredient..."
              onChange={this.update()}
            />
            
            <div className="search-icon"></div>
          </div>
          <div className='ingredient-suggestions'>
            <ul>
              {this.state.ingredientSuggestions.map((suggestion, i) => <li key={i} onClick={this.suggestionClickHandler}>{suggestion}</li>)}
            </ul>      
          </div>
          <div className="selected-ingredients">
            Ingredients
            <ul>
              {this.state.selectedIngredients.map((ingredient,i) => <li key={i} onClick={this.removeSelectedClickHandler}>{ingredient}</li>)}
            </ul>
          </div>
    
        </div>
      </div>
    )
  }
}
