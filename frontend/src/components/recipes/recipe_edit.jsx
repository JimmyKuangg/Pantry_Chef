import React, { Component } from 'react'
import "./recipe_create.css";

export default class RecipeEditForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      ...this.props.recipe, 

      ingredient: "",
      quantity: "",
      unit: "",

      category: "",

      step: ""
    }
    
    this.backToId = this.backToId.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.addToIngredients = this.addToIngredients.bind(this);
    this.addToCategories = this.addToCategories.bind(this);
    this.addToSteps = this.addToSteps.bind(this);
    this.findName = this.findName.bind(this);
    this.findCateName = this.findCateName.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.action(this.state)
      .then(this.props.closeModal())
      .then(this.props.closeSidemenu());
  }

  update(field) {
    return e => this.setState({ [field]: e.target.value });
  }

  ingredientSelect() {
    return (
      <select className="ingredients-select-box" value={this.state.ingredient} onChange={this.update("ingredient")}>
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
        <input type="text" value={this.state.quantity} onChange={this.update("quantity")} />
      </div>
    )
  }

  unitInput() {
    return (
      <div>Unit 
        <input type="text" placeholder="Ex: grams" value={this.state.unit} onChange={this.update("unit")} />
      </div>
    )
  }

  addToIngredients() {
    this.setState({ ingredients: [...this.state.ingredients,
      { ingredient: this.state.ingredient,
        quantity: this.state.quantity,
        unit: this.state.unit}]
    });

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
    // this.setState({ categories: this.props.categories })
  }

  findName(ingredientId) {
    for (let i = 0; i < this.props.ingredients.length; i++) {
      if (ingredientId === this.props.ingredients[i]._id) {
        return this.props.ingredients[i].name;
      }
    }
  }

  findCateName(categoryId) {
    for (let i = 0; i < this.props.categories.length; i++) {
      if (categoryId === this.props.categories[i]._id) {
        return this.props.categories[i].name;
      }
    }
  }

  removeIngredient(e, ingredientId) {
    let newIngredients = this.state.ingredients.filter(ingredient => ingredient.ingredient !== ingredientId);
    this.setState({ ingredients: newIngredients });
  }
  
  removeCategory(e, categoryId) {
    let newCategories = this.state.categories.filter(category => category !== categoryId);
    this.setState({ categories: newCategories });
  }

  removeStep(e, stepId) {
    let newSteps = this.state.steps.filter(step => step !== stepId);
    this.setState({ steps: newSteps });
  }

  backToId() {
    let newIngredients = [];
    let newCategories = [];

    let hashCheck = [];
    let hashMap = {};
    let propsIngredients = this.props.ingredients.map(ingredient => [ingredient.name, ingredient._id]);
    
    for (let z = 0; z < this.props.categories.length; z++) {
      if (this.state.categories.includes(this.props.categories[z].name)) {
        newCategories.push(this.props.categories[z]._id);
      }
    }

    for (let i = 0; i < this.state.ingredients.length; i++) {
      hashMap["ingredient"] = this.state.ingredients[i].ingredient;
      hashMap["quantity"] = this.state.ingredients[i].quantity;
      hashMap["unit"] = this.state.ingredients[i].unit;
      hashCheck.push(hashMap);
      hashMap = {};
    }

    for (let j = 0; j < propsIngredients.length; j++) {
      for (let k = 0; k < hashCheck.length; k++) {
        if (propsIngredients[j][0] === hashCheck[k]["ingredient"]) {
          newIngredients.push({ ingredient: propsIngredients[j][1], quantity: hashCheck[k]["quantity"], unit: hashCheck[k]["unit"] });
        }
      }
    }

    this.setState({ ingredients: [...newIngredients], categories: [...newCategories] });
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
                <div onClick={this.addToIngredients}>Add ingredient</div>
                
                <ul>
                  {this.state.ingredients.map(ingredient => 
                  <li key={ingredient.ingredient}>
                    {ingredient.ingredient}
                    <button onClick={e => this.removeIngredient(e, ingredient.ingredient)}> x</button>
                  </li>)}
                </ul>
                
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
              <div onClick={this.addToCategories}>Add category</div>
              
              
                {this.state.categories.length > 0 ? 
                  <ul>
                    {this.state.categories.map(category => 
                    <li>{category}
                      <button onClick={e => this.removeCategory(e, category)}> x</button>
                    </li>)} 
                  </ul> : ""
                }
              

            </label>
          </div>

          <div>
            <label>Steps
              <input 
                type="text" 
                value={this.state.step}
                onChange={this.update("step")}
              />
              <div onClick={this.addToSteps}>Add step</div>
            </label>
            <div>
              
                {this.state.steps.length > 0 ?
                  <ol>
                    {this.state.steps.map(step => <li>{step}<p onClick={e => this.removeStep(e, step)}> x</p></li>)}
                  </ol> : ""
                }
              
            </div>
          </div>

        <input type="submit" onClick={this.backToId} onSubmit={this.handleSubmit} value="Edit Recipe" />
        </form>
      </div>
    )
  }
}
