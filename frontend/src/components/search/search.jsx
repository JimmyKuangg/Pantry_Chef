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
    this.suggestionClickHandler = this.suggestionClickHandler.bind(this)
    this.removeSelectedClickHandler = this.removeSelectedClickHandler.bind(this)
  }

  componentDidMount(){
    this.props.fetchAllIngredients()
  }  

  update(e){
      let search = e.target.value;
      let suggestions = this.props.ingredients.filter(ingredient => 
      !this.state.selectedIngredients.includes(ingredient) &&
      ingredient.name.includes(search) && search != '')

    this.setState({search: search, 
      ingredientSuggestions: suggestions
    })
  }


  suggestionClickHandler(e, value){
    e.preventDefault();
    let newSelectedIngredients = this.state.selectedIngredients;
    newSelectedIngredients.push(value)
    this.setState({selectedIngredients: newSelectedIngredients})
  }

  removeSelectedClickHandler(e, value){
    let newSelectedIngredients = this.state.selectedIngredients.filter(ingredient => ingredient.name !== value)
    this.setState({selectedIngredients: newSelectedIngredients})
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
              <div className='ingredient-suggestions-background'>
                <div className='ingredient-suggestions'>
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
          <div>
            <RecipeIndexContainer ingredients={this.state.selectedIngredients} key={this.state.selectedIngredients}/>
          </div>
        </div>
      </div>
    )
  }
}
