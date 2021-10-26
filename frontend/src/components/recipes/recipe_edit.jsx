import React, { Component } from 'react';
import './recipe_edit.css';

export default class RecipeEditForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      ...this.props.recipe,

      ingredient: '',
      quantity: '',
      unit: '',

      category: '',

      step: '',

      errors: {}
    }
    
    this.backToId = this.backToId.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.addToIngredients = this.addToIngredients.bind(this);
    this.addToCategories = this.addToCategories.bind(this);
    this.addToSteps = this.addToSteps.bind(this);
    this.findName = this.findName.bind(this);
    this.findCateName = this.findCateName.bind(this);
    this.props.clearRecipeErrors();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.currentUser === true) {
      this.props.history.push("/");
    }

    this.setState({ errors: Object.values(nextProps.errors)});
  }

  // componentDidUpdate() {
  //   this.findName();
  //   this.findCateName();
  // }

  handleSubmit(e) {
    e.preventDefault();
    this.props.action(this.state)
      // .then(this.props.closeModal())
      // .then(this.backToId)
      .then(this.props.closeSidemenu());
  }

  update(field) {
    return (e) => this.setState({ [field]: e.target.value });
  }

  ingredientSelect() {
    return (
      <select
        className="ingredients-select-box"
        value={this.state.ingredient}
        onChange={this.update('ingredient')}
      >
        <option defaultValue>Choose an ingredient</option>
        {this.props.ingredients.map((ingredient) => (
          <option id="testing" key={ingredient._id} value={ingredient._id}>
            {ingredient.name}
          </option>
        ))}
      </select>
    );
  }

  nestedUpdate(field) {
    return (e) =>
      this.setState((state) => {
        state.ingredients[0][field] = e.target.value;
        return state;
      });
  }

  quantityInput() {
    return (
      <div>
        <h2>Quantity</h2>
        <input
          type="number"
          value={this.state.quantity}
          onChange={this.update('quantity')}
        />
      </div>
    );
  }

  unitInput() {
    return (
      <div>
        <h2>Unit</h2>
        <input
          type="text"
          placeholder="Ex: grams"
          value={this.state.unit}
          onChange={this.update('unit')}
        />
      </div>
    );
  }

  addToIngredients() {
    this.setState({
      ingredients: [
        ...this.state.ingredients,
        {
          ingredient: this.state.ingredient,
          quantity: this.state.quantity,
          unit: this.state.unit,
        },
      ],
    });

    this.setState({ ingredient: '', quantity: '', unit: '' });
  }

  addToCategories() {
    if (!Array.isArray(this.state.categories)) {
      this.setState({ categories: [this.state.category] });
    } else {
      this.setState({
        categories: [...this.state.categories, this.state.category],
      });
    }

    this.setState({ category: '' });
  }

  addToSteps() {
    this.setState({ steps: [...this.state.steps, this.state.step] });

    this.setState({ step: '' });
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
    let newIngredients = this.state.ingredients.filter(
      (ingredient) => ingredient.ingredient !== ingredientId
    );
    this.setState({ ingredients: newIngredients });
  }

  removeCategory(e, categoryId) {
    let newCategories = this.state.categories.filter(
      (category) => category !== categoryId
    );
    this.setState({ categories: newCategories });
  }

  removeStep(e, stepId) {
    let newSteps = this.state.steps.filter((step) => step !== stepId);
    this.setState({ steps: newSteps });
  }

  backToId() {
    let newIngredients = [];
    let newCategories = [];

    let hashCheck = [];
    let hashMap = {};
    let propsIngredients = this.props.ingredients.map((ingredient) => [
      ingredient.name,
      ingredient._id,
    ]);

    for (let z = 0; z < this.props.categories.length; z++) {
      if (this.state.categories.includes(this.props.categories[z].name)) {
        newCategories.push(this.props.categories[z]._id);
      }
    }

    for (let i = 0; i < this.state.ingredients.length; i++) {
      hashMap["_id"] = this.state.ingredients[i]._id;
      hashMap["ingredient"] = this.state.ingredients[i].ingredient;
      hashMap["quantity"] = this.state.ingredients[i].quantity;
      hashMap["unit"] = this.state.ingredients[i].unit;
      hashCheck.push(hashMap);
      hashMap = {};
    }
    console.log(propsIngredients);
    for (let j = 0; j < propsIngredients.length; j++) {
      for (let k = 0; k < hashCheck.length; k++) {
        if (propsIngredients[j][0] === hashCheck[k]['ingredient']) {
          newIngredients.push({
            ingredient: propsIngredients[j][1],
            quantity: hashCheck[k]['quantity'],
            unit: hashCheck[k]['unit'],
          });
        if (propsIngredients[j][0] === hashCheck[k]["ingredient"]) {
          newIngredients.push({ _id: propsIngredients[j][1], ingredient: propsIngredients[j][0], quantity: hashCheck[k]["quantity"], unit: hashCheck[k]["unit"] });
        }
      }
    }

    this.setState({
      ingredients: [...newIngredients],
      categories: [...newCategories],
    });
  }

  backToName() {
    for (let i = 0; i < this.state.ingredients.length; i++) {
      if (this.state.ingredients[i]["_id"] === undefined) {
        for (let j = 0; j < this.props.ingredients; j++) {
          if (this.state.ingredients[i]["ingredient"] === this.props.ingredients[j][0]) {
            this.state.ingredients[i]["_id"] = this.props.ingredients[j][1];
          }
        }
      }
    }
  }

  renderErrors() {
    return (
      <ul>
        {Object.keys(this.state.errors).map((error, i) => (
          <li key={`error-${i}`}>{this.state.errors[error]}</li>
        ))}
      </ul>
    );
  }

  render() {
    if (!Array.isArray(this.props.categories)) {
      return null;
    }

    console.log(this.state)

    this.backToName();

    return (
      <div className="recipe-edit">
        <form id="recipe-edit-form" onSubmit={this.handleSubmit}>
          <div id="recipe-edit-wrapper">
            <div id="first-col">
              <header>
                <h2 className="recipe-form-title">Edit Recipe</h2>
              </header>

              <div id="recipe-form-info">
                <label>
                  Name of recipe
                  <input
                    type="text"
                    placeholder="Ex: Scrambled eggs"
                    value={this.state.name}
                    onChange={this.update('name')}
                  />
                </label>

                <label>
                  Time to cook
                  <input
                    type="text"
                    placeholder="Ex: 10 minutes"
                    value={this.state.cookTime}
                    onChange={this.update('cookTime')}
                  />
                </label>

                <label>
                  Calories
                  <input
                    type="text"
                    value={this.state.calories}
                    onChange={this.update('calories')}
                  />
                </label>
              </div>

              <div id="first-col-bottom">
                <label id="category-select">
                  <div id="recipe-edit-categories">
                    <h2>Selected Categories</h2>

                    {this.state.categories.length >= 0 ? (
                      <ul>
                        {this.state.categories.map((category, i) => (
                          <li key={i} id="category-list-item">
                            {category}
                            <div
                              onClick={(e) => this.removeCategory(e, category)}
                            >
                              <i className="fas fa-trash-alt" />
                            </div>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      ''
                    )}
                  </div>

                  <div id="category-select-wrapper">
                    <select
                      className="ingredients-select-box"
                      onChange={this.update('category')}
                    >
                      <option defaultValue>Select a category</option>
                      {this.props.categories.map(category =>
                        <option key={category._id} value={category} >{category.name}</option>)}
                    </select>
                    <div
                      className="purple-button"
                      onClick={this.addToCategories}
                    >
                      Add category
                    </div>
                  </div>
                </label>
              </div>
            </div>

            <div id="second-col">
              <label className="recipe-edit-ingredients">
                <div id="recipe-edit-inputs">
                  {this.ingredientSelect()}
                  {this.quantityInput()}
                  {this.unitInput()}
                  <div
                    className="purple-button"
                    onClick={this.addToIngredients}
                  >
                    Add ingredient
                  </div>
                </div>

                <div className="ingredients-list-wrapper">
                  <ul id="ingredients-list">
                    <h2>Current Ingredients</h2>
                    {this.state.ingredients.map((ingredient, i) => (
                      <li
                        key={i}
                        id="selected-ingredient"
                        key={ingredient.ingredient}
                      >
                        {ingredient.ingredient}
                        <button
                          onClick={(e) =>
                            this.removeIngredient(e, ingredient.ingredient)
                          }
                        >
                          {' '}
                          x
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              </label>

              <div id="recipe-edit-steps">
                <label>
                  <textarea
                    id="steps-text-area"
                    value={this.state.step}
                    onChange={this.update('step')}
                  />
                  <div className="purple-button" onClick={this.addToSteps}>
                    Add step
                  </div>
                </label>
                <div>
                  {this.state.steps.length > 0 ? (
                    <ol id="steps-list">
                      {this.state.steps.map((step) => (
                        <li id="step-list-item">
                          {step}
                          <p onClick={(e) => this.removeStep(e, step)}>
                            {' '}
                            <i className="fas fa-trash-alt" />
                          </p>
                        </li>
                      ))}
                    </ol>
                  ) : (
                    ''
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
             
        <input className='purple-button' id="edit-recipe-button" type="submit" onClick={this.backToId} onSubmit={this.handleSubmit} value="Edit Recipe" />
        <button className='close-modal' onClick={this.props.closeModal}>X</button>
        {this.renderErrors()}
        </form>
      </div>
    );
  }
}
