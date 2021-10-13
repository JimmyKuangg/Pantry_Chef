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
    // this.updateSuggestions = this.updateSuggestions.bind(this)
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
      ingredient.name.includes(search))

    this.setState({search: search, 
      ingredientSuggestions: suggestions
    })
  }

  // updateSuggestions(){
  //   let suggestions = this.props.ingredients.filter(ingredient => 
  //     !this.state.selectedIngredients.includes(ingredient) &&
  //     ingredient.name.includes(this.state.search))
  //   this.setState({ingredientSuggestions: suggestions})
  // }

  suggestionClickHandler(e, value){
    e.preventDefault();
    let newSelectedIngredients = this.state.selectedIngredients;
    newSelectedIngredients.push(value)
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
              value={this.state.search} 
              placeholder="Enter an ingredient..."
              onChange={e => this.update(e)}
            />
            
            <div className="search-icon"></div>
          </div>
          <div className='ingredient-suggestions'>
            <ul>
              {this.state.ingredientSuggestions.map((suggestion, i) => (
                this.state.selectedIngredients.includes(suggestion) ? 
                "" :
              <li key={i} onClick={e => this.suggestionClickHandler(e, suggestion)}>{suggestion.name}</li>
              ))}
            </ul>      
          </div>
          <div className="selected-ingredients">
            Ingredients
            <ul>
              {this.state.selectedIngredients.map((ingredient,i) => <li key={i} onClick={this.removeSelectedClickHandler}>{ingredient.name}</li>)}
            </ul>
          </div>
          <div>
            {/* <Link to=''>Search Pantry Recipes</Link> */}
          </div>
        </div>
      </div>
    )
  }
}
