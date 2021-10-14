import React, { Component } from 'react'

export default class Pantry extends Component {
  constructor(props){
    super(props);

    this.state = this.props.pantry.ingredients;
  }

  componentDidMount(){
    this.props.fetchPantry();
    this.setState({ingredients: this.props.pantry.ingredients});
  }
  
  render() {
    if (!this.props.pantry.ingredients) {
      return null;
    }

    return (
      <div>
        My Pantry
        <ul>
          {this.props.pantry.ingredients.map((ingredient, i) => (
            <li key={i}>{ingredient.quantity} {ingredient.unit} {ingredient.ingredient}</li>
          ))}
        </ul>
        {console.log(this.state)}
        <button onClick={() => console.log(this.state)}>Click me!</button>
      </div>
    )
  }
}
