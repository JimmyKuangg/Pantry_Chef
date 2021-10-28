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
    this.removeCategory = this.removeCategory.bind(this);
    this.removeIngredient = this.removeIngredient.bind(this);
    this.removeStep = this.removeStep.bind(this);
    this.props.clearRecipeErrors();
  }

  possibleIngredients() {
    if (this.props.recipe) {
      let filtered = this.props.ingredients.filter(
        (ele) => !this.props.recipe.ingredients.includes(ele.ingredient)
      );
      this.setState({ possibleIngredients: filtered });
    }
  }

  // componentDidUpdate() {
  //   this.findName();
  //   this.findCateName();
  // }

  componentWillReceiveProps(nextProps) {
    if (nextProps.currentUser === true) {
      this.props.history.push('/');
    }

    this.setState({ errors: Object.values(nextProps.errors) });
  }

  handleSubmit(e) {
    e.preventDefault();

    let newIngredients = this.state.ingredients.map((ele) => ({
      ingredient: ele.id,
      quantity: ele.quantity,
      unit: ele.unit,
    }));

    let recipe = {
      author: this.state.author,
      calories: this.state.calories,
      categories: this.state.categories,
      name: this.state.name,
      ingredients: newIngredients,
      id: this.state.id,
      cookTime: this.state.cookTime,
      imgUrl: this.state.imgUrl,
      steps: this.state.steps,
    };
    this.props
      .action(recipe)
      .then(() =>
        Object.values(this.state.errors).length === 0
          ? this.success()
          : null
      );
  }

  success() {
    this.props.closeModal();
    this.props.closeSidemenu();
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
        />{' '}
        Quantity
        <input
          type="text"
          value={this.state.unit}
          onChange={this.update('unit')}
        />{' '}
        Unit
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



  errorId(field) {
    for (let i = 0; i < this.state.errors.length; i++) {
      if (this.state.errors[i].includes(`${field}`)) {
        return 'error-field';
      }
    }
    return null;
  }

  errorMessage(field) {
    for (let i = 0; i < this.state.errors.length; i++) {
      if (this.state.errors[i].includes(`${field}`)) {
        return <p id="error-message">{this.state.errors[i]}</p>;
      }
    }
    return null;
  }

  render() {
    if (!Array.isArray(this.props.categories)) {
      return null;
    }
    return (
      <div className="recipe-edit">
        <form id="recipe-edit-form">
          <header>
            <p className="recipe-form-title">Edit Recipe</p>
          </header>

          <div id="recipe-edit-wrapper">
            <div id="first-col">
              <div id="recipe-form-info">
                <div className="space-between">
                  <h2>Name of recipe</h2>
                  <input
                    id={this.errorId('Name')}
                    type="text"
                    placeholder="Ex: Scrambled eggs"
                    value={this.state.name}
                    onChange={this.update('name')}
                  />
                </div>
                  {this.errorMessage('Name')}

                <div className="space-between">
                  <h2>Time to cook</h2>
                  <input
                    id={this.errorId('Cook')}
                    type="text"
                    placeholder="Ex: 10 minutes"
                    value={this.state.cookTime}
                    onChange={this.update('cookTime')}
                  />
                </div>
                  {this.errorMessage('Cook')}

                <div className="space-between">
                  <h2>Calories</h2>
                  <input
                    id={this.errorId('Calories')}
                    type="text"
                    value={this.state.calories}
                    onChange={this.update('calories')}
                  />
                </div>
                  {this.errorMessage('Calories')}
              </div>

              <div id="first-col-bottom">
                <div id="category-title">Categories</div>
                <div id="category-content">
                  <label id="category-select">
                    <div id="recipe-edit-categories">
                      <h2>Selected Categories</h2>

                      {this.state.categories.length >= 0 ? (
                        <ul
                          id={this.errorId('Categories')}
                        >
                          {this.state.categories.map((category, i) => (
                            <li key={category.id} id="category-list-item">
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
                      {this.errorMessage('Categories')}
                    </div>

                    <div id="category-select-wrapper">
                      <div>
                        {this.props.categories.map((category, i) => (
                          <div
                            onClick={() => this.clickCategory(category)}
                            key={category.name}
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
            </div>

            <div id="second-col">
              <div id="recipe-ingredients-title">Ingredients</div>
              <label className="recipe-edit-ingredients">
                <div id={this.errorId('Ingredients')}>
                  {this.ingredientSelect()}
                  <div
                    className="purple-button"
                    onClick={this.addToIngredients}
                  >
                    Add ingredient
                  </div>
                </div>
                {this.errorMessage('Ingredients')}

                <div className="ingredients-list-wrapper">
                  <ul id="ingredients-list">
                    <h2>Current Ingredients</h2>
                    {this.state.ingredients.map((ele, i) => (
                      <li id="selected-ingredient" key={ele.ingredient}>
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

              <div id="recipe-steps-title">Steps</div>
              <div id="recipe-edit-steps">
                <label id="recipe-edit-textarea">
                  <textarea
                    id={this.errorId('Steps')}
                    value={this.state.step}
                    onChange={this.update('step')}
                  />
                  {this.errorMessage('Steps')}
                  <div className="purple-button" onClick={this.addToSteps}>
                    Add step
                  </div>
                </label>
                <div id="recipe-edit-steps-wrapper">
                  {this.state.steps.length > 0 ? (
                    <ol id="steps-list">
                      {this.state.steps.map((step, i) => (
                        <li id="step-list-item" key={step}>
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
          {/* {this.renderErrors()} */}
        </form>
      </div>
    );
  }
}
