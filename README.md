# Pantry Chef

Pantry Chef is an app designed to give users recipe suggestions based on what they currently have in their respective pantries. Users can then save ingredients to t heir pantries to keep track of what they have, and to have an easier time searching for recipes next time. Users can also create and edit recipes.

[Live](https://pantry-chef-mern.herokuapp.com/)

# Running the code

Download the code and run npm install on the root folder and the frontend folder. After that, run npm dev and use the app.

# Technologies Used

This app using MongoDB, Express, React, and Node.js.

# Technical Implementation

### Data parsing

When data gets sent to the frontend, it comes presented as just MongoDB ID's, so the data needs to be populated so it can show what it's referencing. When data is sent to the backend, it goes as strings, when we need reference ID's. Due to this, we had to find efficient ways to send the data up to the frontend and back to the backend effectively. 

This is an example of how things were sent to the frontend

```javascript
router.get('/', (req, res) => {
  Recipe.find()
    .populate('ingredients.ingredient', '-_id, name')
    .populate('categories', '-_id, name')
    .populate('author', '-_id, username')
    .then(recipes => {
      let recipesIndex = [];

      for(let i = 0; i < recipes.length; i++) {
        let recipeCard = {
          id: recipes[i]._id,
          name: recipes[i].name,
          ingredients: recipes[i].ingredients.map(ele => ({
            ingredient: ele.ingredient.name,
            quantity: ele.quantity,
            unit: ele.unit
          })),
          cookTime: recipes[i].cookTime,
          calories: recipes[i].calories,
          categories: Object.values(recipes[i].categories).map(obj => (obj.name)),
          steps: recipes[i].steps,
          author: recipes[i].author.username,
          imgUrl: recipes[i].imgUrl
        }

        recipesIndex.push(recipeCard);
      }

      res.json(recipesIndex);
    })
})
```
And how they had to be parsed to be sent to the backend -

```javascript
addToIngredients() {
    this.setState({ ingredients: [...this.state.ingredients,
      { ingredient: this.state.ingredient,
        quantity: this.state.quantity,
        unit: this.state.unit}]
    });

    this.setState({ ingredient: "", quantity: "", unit: "" })
  }
```

This helper method in our recipe create component allowed us to translate the data back into a shape that our backend accepted after through its validations.

# Future ToDo's

+ Implemenet a Favorite system
+ Add a way for users to leave reviews
