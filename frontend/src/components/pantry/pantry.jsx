import React, { Component } from 'react'

export default class Pantry extends Component {
  constructor(props){
    super(props);

    this.state = {
      ingredients: this.props.pantry.ingredients,
      user: this.props.pantry.user,
      showSelect: false,
      notInPantry: [],
      // selectedIngredientId: '',
      selectedIngredient: '',
      selectedQuantity: '',
      selectedUnit: '',
    }
    this.removePantryItem = this.removePantryItem.bind(this);
    this.updatePantry = this.updatePantry.bind(this);
    this.addToPantry = this.addToPantry.bind(this);
    this.updateCurrentPantry = this.updateCurrentPantry.bind(this);
    this.updateField = this.updateField.bind(this);
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
    let inPantry = [];
    for(let i = 0; i < this.state.ingredients.length; i++){
      inPantry.push(this.state.ingredients[i].ingredient);
    }
    
    this.setState({notInPantry: this.props.ingredients.filter(ingredient => (
      !inPantry.includes(ingredient.name)
    ))})

    this.setState({showSelect: true});
  }

  removePantryItem(e, itemId) {
    this.setState({ingredients: this.state.ingredients.filter(
      ingredient => (ingredient.id !== itemId)
    )})
  }
  
  updatePantry() {
    this.props.editPantry({ingredients: this.state.ingredients});
  }

  updateField(field) {
    return e => {
      console.log(this.state);
      this.setState({ [field]: e.target.value })
    }
  }

  updateCurrentPantry() {
    let newPantryIngredients = this.state.ingredients
    newPantryIngredients.push({
      ingredient: this.state.selectedIngredient,
      quantity: this.state.selectedQuantity,
      unit: this.state.selectedUnit
    });

    this.setState({ingredients: newPantryIngredients})
  }

  render() {
    if (!this.props.pantry.ingredients) {
      return null;
    }
    console.log(this.state.ingredients);
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
        { this.state.showSelect ? 
        <form onSubmit={this.updateCurrentPantry}>
          <select className="ingredients-select-box" onChange={this.updateField('selectedIngredient') }>
            <option value="none" selected disabled hidden/>
            {this.state.notInPantry.map((ingredient, i) => <option key={i} value={ingredient._id}>{ingredient.name}</option>)}
          </select> 
          <input type="text" placeholder="QUANTITY" onChange={this.updateField('selectedQuantity')}/>
          <input type="text" placeholder="UNIT" onChange={this.updateField('selectedUnit')}/>
          <button type="submit">Add to your current pantry</button>
        </form>
        : ''}
        <button onClick={() => this.addToPantry()}>Add items to your pantry</button>
        <button onClick={() => this.updatePantry()}>Save your pantry</button>
      </div>
    )
  }
}
