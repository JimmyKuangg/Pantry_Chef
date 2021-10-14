import React, { Component } from 'react'

export default class Pantry extends Component {
  constructor(props){
    super(props);

    this.state = this.props.pantry;
    this.removePantryItem = this.removePantryItem.bind(this);
    this.updatePantry = this.updatePantry.bind(this);
    this.addToPantry = this.addToPantry.bind(this);
  }

  componentDidMount(){
    this.props.fetchPantry();
    this.props.fetchAllIngredients();
  }
  
  componentDidUpdate(prevProps) {
    if (prevProps !== this.props) {
      this.setState(this.props.pantry);
    }
  }

  addToPantry() {
    
  }

  removePantryItem(e, itemId) {
    this.setState({ingredients: this.state.ingredients.filter(
      ingredient => (ingredient.id !== itemId)
    )})
  }
  
  updatePantry() {
    this.props.editPantry(this.state);
  }

  render() {
    if (!this.props.pantry.ingredients) {
      return null;
    }

    return (
      <div>
        My Pantry
        <ul>
          {this.state.ingredients ? this.state.ingredients.map((ingredient, i) => (
            <li key={i}>
              {ingredient.quantity} {ingredient.unit} {ingredient.ingredient}
              <button onClick={e => this.removePantryItem(e, ingredient.id)}>X</button>
            </li>
          )) : ''}
        </ul>
        <button onClick={() => this.updatePantry()}>Save your pantry</button>
      </div>
    )
  }
}
