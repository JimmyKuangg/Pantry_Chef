import React, { Component } from 'react';
import './recipe_edit.css';

export default class RecipeEditForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      ...this.props.recipe,
      search: '',
      possibleIngredients: [],
      newIngredient: {},
      quantity: 0,
      unit: '',

      newCategory: {},
      step: '',
      errors: {},
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.clickIngredient = this.clickIngredient.bind(this);
    this.addToIngredients = this.addToIngredients.bind(this);
    this.clickCategory = this.clickCategory.bind(this);
    this.addToSteps = this.addToSteps.bind(this);
    this.renderErrors = this.renderErrors.bind(this);
    this.removeCategory = this.removeCategory.bind(this);
    this.removeIngredient = this.removeIngredient.bind(this);
    this.removeStep = this.removeStep.bind(this);
  }

  possibleIngredients() {
    if (this.props.recipe) {
      let filtered = this.props.ingredients.filter(
        (ele) => !this.props.recipe.ingredients.includes(ele.ingredient)
      );
      this.setState({ possibleIngredients: filtered });
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.currentUser === true) {
      this.props.history.push('/');
    }

    this.setState({ errors: Object.values(nextProps.errors) });
  }

  // componentDidUpdate() {
  //   this.findName();
  //   this.findCateName();
  // }

  handleSubmit(e) {
    e.preventDefault();

    let newIngredients = this.state.ingredients.map((ele) => ({
      ingredient: ele.id,
      quantity: ele.quantity,
      unit: ele.unit,
    }));

    let categories = this.state.categories.map((category) => category._id);

    let recipe = {
      author: this.state.author,
      calories: this.state.calories,
      categories: categories,
      name: this.state.name,
      ingredients: newIngredients,
      id: this.state.id,
      cookTime: this.state.cookTime,
      imgUrl: this.state.imgUrl,
      steps: this.state.steps,
    };
    this.props.action(recipe);
  }

  update(field) {
    return (e) => {
      this.setState({ [field]: e.currentTarget.value });
    };
  }

  clickIngredient(ingredient) {
    this.setState({ newIngredient: ingredient });
    this.possibleIngredients();
  }

  ingredientSelect() {
    return (
      <div id="edit-search-wrapper">
        <div id="possible-ingredients">
          {this.state.possibleIngredients.map((ele) => (
            <div key={ele.id} onClick={() => this.clickIngredient(ele)}>
              {ele.name}
            </div>
          ))}
        </div>
        <input
          type="number"
          value={this.state.quantity}
          onChange={this.update('quantity')}
        />
        <input
          type="text"
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
          ingredient: this.state.newIngredient.name,
          quantity: this.state.quanity,
          unit: this.state.unit,
          id: this.state.newIngredient._id,
        },
      ],
    });
  }

  addCategory() {
    this.setState({
      categories: [...this.state.categories, this.state.newCategory],
    });
  }

  addToSteps() {
    this.setState({ steps: [...this.state.steps, this.state.step] });
  }

  clickCategory(category) {
    this.setState({ categories: [...this.state.categories, category] });
  }

  componentDidMount() {
    this.props.fetchAllCategories();
    this.possibleIngredients();
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

  removeCategory(e, name) {
    this.setState({
      categories: this.state.categories.filter((cat) => cat.name !== name),
    });
  }

  removeIngredient(e, name) {
    this.setState({
      ingredients: this.state.ingredients.filter(
        (ing) => ing.ingredient !== name
      ),
    });
  }

  removeStep(e, name) {
    this.setState({ steps: this.state.steps.filter((step) => step !== name) });
  }
  render() {
    if (!Array.isArray(this.props.categories)) {
      return null;
    }

    return (
      <div className="recipe-edit">
        <form id="recipe-edit-form">
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
                      <ul id="selected-categories">
                        {this.state.categories.map((category, i) => (
                          <li key={i} id="category-list-item">
                            {category.name}
                            <div
                              onClick={(e) =>
                                this.removeCategory(e, category.name)
                              }
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
                    <div>
                      {this.props.categories.map((category, i) => (
                        <div
                          onClick={() => this.clickCategory(category)}
                          key={i}
                        >
                          {category.name}
                        </div>
                      ))}
                    </div>
                    {/* <div className='purple-button' onClick={this.addToCategories}>Add category</div> */}
                  </div>
                </label>
              </div>
            </div>

            <div id="second-col">
              <label className="recipe-edit-ingredients">
                <div id="recipe-edit-inputs">
                  {this.ingredientSelect()}
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
                    {this.state.ingredients.map((ele, i) => (
                      <li key={i} id="selected-ingredient" key={ele.id}>
                        {ele.ingredient}
                        <button
                          onClick={(e) =>
                            this.removeIngredient(e, ele.ingredient)
                          }
                        >
                          <i className="fas fa-trash-alt" />
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

          <input
            className="purple-button"
            id="edit-recipe-button"
            type="submit"
            onClick={this.handleSubmit}
            value="Edit Recipe"
          />
          <button className="close-modal" onClick={this.props.closeModal}>
            X
          </button>
          {this.renderErrors()}
        </form>
      </div>
    );
  }
}
