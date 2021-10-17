import React, { Component } from 'react'
import './pantry.css'
export default class Pantry extends Component {
  constructor(props){
    super(props);

    this.state = {
      ingredients: this.props.pantry.ingredients,
      user: this.props.pantry.user,
      showSelect: false,
      notInPantry: [],
      selectedIngredient: '',
      usersRecipes: [],
      tab: 'pantry'
    }
    this.removePantryItem = this.removePantryItem.bind(this);
    this.updatePantry = this.updatePantry.bind(this);
    this.addToPantry = this.addToPantry.bind(this);
    this.updateCurrentPantry = this.updateCurrentPantry.bind(this);
    this.updateField = this.updateField.bind(this);
    this.findName = this.findName.bind(this);

    this.filterUsersRecipes = this.filterUsersRecipes.bind(this);
    this.tabClickHandler = this.tabClickHandler.bind(this);
  }

  componentDidMount(){
    this.props.fetchPantry();
    this.props.fetchAllIngredients();
    this.props.fetchRecipes();
  }
  
  componentDidUpdate(prevProps) {
    if (prevProps !== this.props) {
      this.setState(this.props.pantry);
      this.filterUsersRecipes();
    }
  }

  addToPantry() {
    let inPantry = [];
    for(let i = 0; i < this.state.ingredients.length; i++){
      inPantry.push(this.state.ingredients[i].ingredient);
    }
   
    this.setState({notInPantry: this.props.ingredients.filter(ingredient => (
      !inPantry.includes(ingredient._id)
    ))})

    this.setState({showSelect: true});
  }

  filterUsersRecipes() {
    this.setState({usersRecipes: this.props.recipes.filter(recipe => (
      recipe.author === this.props.currentUser
    ))})

  }

  findName(ingredientId) {
    for(let i = 0; i < this.props.ingredients.length; i++){
      if (ingredientId === this.props.ingredients[i]._id) return this.props.ingredients[i].name
    }
  }

  removePantryItem(e, itemId) {
    this.setState({ingredients: this.state.ingredients.filter(
      ingredient => (ingredient.ingredient !== itemId)
      )})
  }
  
  updatePantry() {
    this.props.editPantry({ingredients: this.state.ingredients});
  }

  updateField(field) {
    return e => {
      this.setState({ [field]: e.target.value })
    }
  }
  
  updateCurrentPantry() {
    let newPantryIngredients = this.state.ingredients

    newPantryIngredients.push({
      ingredient: this.state.selectedIngredient,
      // quantity: this.state.selectedQuantity,
      // unit: this.state.selectedUnit
    });

    this.setState({ingredients: newPantryIngredients})
    this.setState({showSelect: false});
  }

  tabClickHandler(field){
    this.setState({tab: field})
  }

  sideMenuContent(){
    let content;
    if (this.state.tab === 'pantry') {
      content = (
        <div id='side-menu-content'>
          <h1 id='side-menu-title'>My Pantry</h1>
          <ul id='side-menu-list'>
            {this.state.ingredients ? this.state.ingredients.map((ingredient, i) => (
              <li className='side-menu-items' key={i}>
                <p id='side-menu-name'>{this.findName(ingredient.ingredient)}</p>
                <i class="fas fa-trash-alt" id='delete-ingredient' onClick={e => this.removePantryItem(e, ingredient.ingredient)}/>
              </li>
            )) : ''}
          </ul>
          { this.state.showSelect ? 
          <form onSubmit={this.updateCurrentPantry}>
            <select className="ingredients-select-box" onChange={this.updateField('selectedIngredient')} >
              <option selected disabled hidden>Please select an ingredient</option>
              {this.state.notInPantry.map((ingredient, i) => <option key={i} value={ingredient._id}>{ingredient.name}</option>)}
            </select> 
            {/* <input type="text" placeholder="QUANTITY" onChange={this.updateField('selectedQuantity')}/>
            <input type="text" placeholder="UNIT" onChange={this.updateField('selectedUnit')}/> */}
            <button type="submit">Add to your current pantry</button>
          </form>
          : ''}
          <button className='purple-button' onClick={() => this.addToPantry()}>Add items to pantry</button>
          <button className='purple-button' onClick={() => this.updatePantry()}>Save pantry</button>
        </div>
      )
      } else {
        content = (
          <div id='side-menu-content'>
            <h1 id='side-menu-title'>My Recipes</h1>
            <ul id='side-menu-list'>
              {this.state.usersRecipes ? this.state.usersRecipes.map((recipe, i) => (
                <li className='side-menu-items' key={i}>
                  <p className='side-menu-name'>{recipe.name}</p>
                  <i id='edit-recipe' className="fas fa-edit" onClick={() => this.props.openModal('editRecipe', recipe)}/>
                </li>
              ))
              : ''}
            </ul>
          </div>
        )
      }
    return content;
  }

  render() {
    if (!this.props.pantry.ingredients) {
      return null;
    }

    return (
      <div id='side-menu-show'>
        <div id='selector'>
          <div onClick={() => this.tabClickHandler('pantry')} 
            className="tab" 
            id={this.state.tab === 'pantry' ? 'tab-selected' : ""}>My Pantry</div>
          <div onClick={() => this.tabClickHandler('recipes')} 
            className='tab'
            id={this.state.tab === 'recipes' ? 'tab-selected' : ""}>My Recipes</div>
        </div>
        {this.sideMenuContent()}

      </div>
    )
  }
}
