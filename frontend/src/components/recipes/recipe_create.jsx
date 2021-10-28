import React, { Component } from 'react';
import './recipe_create.css';
import shortid from 'shortid';

export default class RecipeCreateForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      ingredients: [],
      cookTime: '',
      calories: '',
      categories: [],
      author: this.props.currentUser.id,
      steps: [],
      imgUrl: 'https://i.imgur.com/9h7v94l.png',

      ingredient: '',
      quantity: '',
      unit: '',

      category: '',

      step: '',

      errors: {},
    };

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
      this.props.history.push('/');
    }

    this.setState({ errors: Object.values(nextProps.errors) });

    // this.setState({ errors: Object.values(nextProps.errors) }, () =>
    //   Object.values(this.state.errors).length === 0
    //     ? this.props.closeModal()
    //     : null
    // );
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props
      .action(this.state)
      .then(() =>
        Object.values(this.state.errors).length === 0 ? this.success() : null
      );
  }

  success() {
    this.props.closeModal();
    this.props.closeSidemenu();
  }

  update(field) {
    return (e) => this.setState({ [field]: e.target.value });
  }

  ingredientSelect() {
    return (
      <select
        id={this.errorId('Ingredients')}
        className="ingredients-select-box"
        value={this.state.ingredient}
        onChange={this.update('ingredient')}
      >
        <option defaultValue>Choose an ingredient</option>
        {this.props.ingredients.map((ingredient) => (
          <option id="testing" key={shortid.generate()} value={ingredient._id}>
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
      <div className="small-space-between">
        <h3>Quantity</h3>
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
      <div className="small-space-between">
        <h3>Unit</h3>
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
    if (!this.state.ingredient || !this.state.quantity || !this.state.unit) {
      return null;
    }
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
    if (!this.state.category) {
      return null;
    }

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
    if (!this.state.step) {
      return null;
    }
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

  // renderErrors() {
  //   for (const error of Object.keys(this.state.errors)) {
  //     if (error)
  //   }
  //   return (
  //     <ul>
  //       {Object.keys(this.state.errors)((error, i) => {
  //         if (error.includes('exists')) {
  //           return;
  //         }
  //       })}
  //     </ul>
  //   );
  // }

  errorId(field) {
    for (let i = 0; i < this.state.errors.length; i++) {
      if (this.state.errors[i].includes(`${field}`.toLowerCase())) {
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
      <div className="recipe-form">
        <h2 className="recipe-form-title">Create Recipe</h2>
        <form id="recipe-create" onSubmit={this.handleSubmit}>
          <div id="first-row">
            <div id="recipe-small-inputs">
              <div className="space-between">
                <h3>Name of recipe</h3>
                <input
                  id={this.errorId('Name')}
                  type="text"
                  placeholder="Ex: Scrambled eggs"
                  value={this.state.name}
                  onChange={this.update('name')}
                />
                {this.errorMessage('name')}
              </div>
              {this.errorMessage('Name')}
              <div className="space-between">
                <h3>Time to cook</h3>
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
                <h3>Calories</h3>
                <input
                  id={this.errorId('Calories')}
                  type="text"
                  value={this.state.calories}
                  onChange={this.update('calories')}
                />
              </div>
              {this.errorMessage('Calories')}
            </div>

            <div id="ingredient-input">
              <h2>Ingredients</h2>
              <div id="ingredient-section-wrapper">
                <div id="ingredient-section">
                  <div id="ingredient-inputs">
                    {this.ingredientSelect()}
                    {this.quantityInput()}
                    {this.unitInput()}
                    {this.errorMessage('Ingredients')}
                    <div
                      className="purple-button"
                      onClick={this.addToIngredients}
                    >
                      Add ingredient
                    </div>
                  </div>

                  <div className="ingredients-list-wrapper">
                    <h4>Current Ingredients</h4>
                    <ul id="ingredients-list">
                      {this.state.ingredients.length === 0 ? (
                        <p>Add some ingredients!</p>
                      ) : (
                        ''
                      )}
                      {this.state.ingredients.map((ingredient) => (
                        <li id="selected-ingredient" key={shortid.generate()}>
                          {this.findName(ingredient.ingredient)}
                          <i
                            className="fas fa-trash-alt"
                            onClick={(e) =>
                              this.removeIngredient(e, ingredient.ingredient)
                            }
                          />
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div id="second-row">
            <div id="categories-input">
              <h4>Categories</h4>
              <div id="selected-categories-wrapper">
                <div id="selected-wrapper">
                  <h4>Selected Categories</h4>
                  <div id="selected-categories">
                    <ul id="selected-categories-list">
                      {this.state.categories.length > 0 ? (
                        this.state.categories.map((categoryId, i) => (
                          <li key={shortid.generate()} id="category-list-item">
                            {this.findCateName(categoryId)}
                            <i
                              className="fas fa-trash-alt"
                              onClick={(e) =>
                                this.removeCategory(e, categoryId)
                              }
                            />
                          </li>
                        ))
                      ) : (
                        <li>Add some Categories!</li>
                      )}
                    </ul>
                  </div>
                </div>
                <div id="categories-inputs">
                  <select
                    id={this.errorId('Categories')}
                    className="ingredients-select-box"
                    onChange={this.update('category')}
                    value={this.state.category}
                  >
                    <option defaultValue>Select a category</option>
                    {this.props.categories.map((category) => (
                      <option key={shortid.generate()} value={category._id}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                  <div className="purple-button" onClick={this.addToCategories}>
                    Add category
                  </div>
                  {this.errorMessage('Categories')}
                </div>
              </div>
            </div>

            <div id="steps-content">
              <div id="steps-title">Steps</div>
              <div id="steps-input-and-steps">
                <div id="steps-input">
                  <textarea
                    id={this.errorId('Steps')}
                    value={this.state.step}
                    onChange={this.update('step')}
                  />
                  {this.errorMessage('Steps')}
                  <div className="purple-button" onClick={this.addToSteps}>
                    Add step
                  </div>
                </div>
                <div id="current-steps">
                  <h4>Current Steps</h4>
                  {this.state.steps.length > 0 ? (
                    <ol id="steps-list">
                      {this.state.steps.map((step, i) => (
                        <li key={shortid.generate()} id="step-list-item">
                          {step}
                          <i
                            className="fas fa-trash-alt"
                            onClick={(e) => this.removeStep(e, step)}
                          />
                        </li>
                      ))}
                    </ol>
                  ) : (
                    <p>Add some steps!</p>
                  )}
                </div>
              </div>
            </div>
          </div>
          <input
            type="submit"
            id="create-recipe-button"
            className="purple-button"
            onSubmit={this.handleSubmit}
            value="Create Recipe"
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
