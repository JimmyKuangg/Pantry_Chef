import React, { Component } from 'react'
import "./recipe_create.css";

export default class RecipeCreateForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      ingredients: [],
      cookTime: "",
      calories: "",
      categories: [],
      author: this.props.currentUser.id,
      steps: [],
      imgUrl: "FOOD",

      ingredient: "",
      quantity: "",
      unit: "",

      category: "",

      step: ""
    }
    
    this.inputUpdate = this.inputUpdate.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.addToIngredients = this.addToIngredients.bind(this);
    this.addToCategories = this.addToCategories.bind(this);
    this.addToSteps = this.addToSteps.bind(this);
    this.findName = this.findName.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.action(this.state);
  }

  update(field) {
    return e => this.setState({ [field]: e.target.value });
  }

  inputUpdate(field) {
    return e => this.tempIngredient[field] += e.target.value;
  }

  ingredientSelect() {
    return (
      <select className="ingredients-select-box" onChange={this.update("ingredient")}>
        <option defaultValue>Choose an ingredient</option>
        {this.props.ingredients.map(ingredient => <option id="testing" key={ingredient._id} value={ingredient._id}>{ingredient.name}</option>)}
      </select>

    )
  }

  nestedUpdate(field) {
    return e => this.setState(state => {
      state.ingredients[0][field] = e.target.value
      return state;
    })
  }

  quantityInput() {
    return (
      <div>Quantity 
        <input type="text" onChange={this.update("quantity")} />
      </div>
    )
  }

  unitInput() {
    return (
      <div>Unit 
        <input type="text" placeholder="Ex: grams" onChange={this.update("unit")} />
      </div>
    )
  }

  addToIngredients() {
    this.setState({ ingredients: [...this.state.ingredients,
      { ingredient: this.state.ingredient,
        quantity: this.state.quantity,
        unit: this.state.unit
    }]});

    this.setState({ ingredient: "", quantity: "", unit: "" })
  }

  addToCategories() {
    if (!Array.isArray(this.state.categories)) {
      this.setState({ categories: [this.state.category] });
    } else {
      this.setState({ categories: [...this.state.categories,
        this.state.category
      ]});
    }
    
    this.setState({ category: "" })
  }

  addToSteps() {
    this.setState({ steps: [...this.state.steps,
      this.state.step
    ]});

    this.setState({ step: "" })
  }

  componentDidMount() {
    this.props.fetchAllCategories();
    this.setState({ categories: this.props.categories })
  }

  findName(ingredientId) {
    for (let i = 0; i < this.props.ingredients; i++) {
      if (ingredientId === this.props.ingredients[i]._id) {
        console.log(this.props.ingredients[i].name)
        return this.props.ingredients[i].name;
      }
    }
  }

  render() {
    
    if (!Array.isArray(this.props.categories)) {
      return null;
    }

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
              <div>
                {this.ingredientSelect()}
                {this.quantityInput()}
                {this.unitInput()}
                <button onClick={this.addToIngredients}>Add ingredient</button>
                <div>
                  {this.state.ingredients.map(ingredient => <p>{this.findName(ingredient._id)}</p>)}
                </div>
              </div>
            </label>
          </div>

          <div>
            <label>Time to cook
              <input 
                type="text"
                placeholder="Ex: 10 minutes"
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

          <div>
            <label>Categories
              <select className="ingredients-select-box" onChange={this.update("category")}>
                <option defaultValue>Select a category</option>
                {this.props.categories.map(category =>
                  <option key={category._id} value={category._id} >{category.name}</option>)}
              </select>
              <button onClick={this.addToCategories}>Add category</button>
            </label>
          </div>

          <div>
            <label>Steps
              <input 
                type="text" 
                value={this.state.step}
                onChange={this.update("step")}
              />
              <button onClick={this.addToSteps}>Add step</button>
            </label>
          </div>

        <input type="submit" onSubmit={this.handleSubmit} value="Create Recipe" />
        </form>
      </div>
    )
  }
}
