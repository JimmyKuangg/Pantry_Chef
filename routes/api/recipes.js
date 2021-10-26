const express = require("express");
const router = express.Router();
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');
const passport = require('passport');

const Recipe = require('../../models/Recipe');
const validateRecipeInput = require('../../validation/recipe.js');

router.get('/', (req, res) => {
  Recipe.find()
    .populate('ingredients.ingredient')
    .populate('categories')
    .populate('author', '-_id, username')
    .then(recipes => {
      let recipesIndex = [];
      for(let i = 0; i < recipes.length; i++) {
        let recipeCard = {
          id: recipes[i]._id,
          name: recipes[i].name,
          ingredients: recipes[i].ingredients.map(ele => {
            return{
            ingredient: ele.ingredient.name,
            quantity: ele.quantity,
            unit: ele.unit,
            id: ele.ingredient.id
          }}),
          cookTime: recipes[i].cookTime,
          calories: recipes[i].calories,
          categories:recipes[i].categories,
          steps: recipes[i].steps,
          author: recipes[i].author.username,
          imgUrl: recipes[i].imgUrl
        }

        recipesIndex.push(recipeCard);
      }

      res.json(recipesIndex);
    })
})

router.get('/:recipeId', (req, res) => {
  Recipe.findById(req.params.recipeId)
    .populate('ingredients.ingredient')
    .populate('categories')
    .populate('author', '-_id, username')
    .then(recipe => {
      let recipeShow = {
        id: recipe._id,
        name: recipe.name,
        ingredients: recipe.ingredients.map(ele => ({
          ingredient: ele.ingredient.name,
          quantity: ele.quantity,
          unit: ele.unit,
          id: ele.ingredient.id
        })),
        cookTime: recipe.cookTime,
        calories: recipe.calories,
        categories: recipe.categories,
        steps: recipe.steps,
        author: recipe.author.username,
        imgUrl: recipe.imgUrl
      }

      return res.json(recipeShow);
    })
})

router.post('/create', 
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
  
  const { errors, isValid } = validateRecipeInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  Recipe.findOne({ name: req.body.name }).then(recipe => {
    if (recipe) {
      errors.recipe = 'A recipe with that name already exists';
      return res.status(400).json(errors);
    } else {
      const newRecipe = new Recipe({
        name: req.body.name,
        ingredients: req.body.ingredients,
        cookTime: req.body.cookTime,
        calories: req.body.calories,
        description: req.body.description,
        categories: req.body.categories,
        steps: req.body.steps,
        author: req.body.author,
        date: req.body.date,
        imgUrl: req.body.imgUrl
      })

      newRecipe.save().then(recipe => res.json(recipe))
    }
  })
})

router.patch('/update/:id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    
    const { errors, isValid } = validateRecipeInput(req.body);

    if (!isValid) {
      return res.status(400).json(errors);
    }

    Recipe.findById(req.params.id).then(recipe => {
      if (!recipe) {
        errors.recipe = 'A recipe with that ID does not exist';
        return res.status(404).json(errors);
      } else {
        recipe.ingredients = req.body.ingredients,
        recipe.cookTime = req.body.cookTime,
        recipe.calories = req.body.calories,
        recipe.description = req.body.description,
        recipe.steps = req.body.steps,
        recipe.categories = req.body.categories,
        recipe.imgUrl = req.body.imgUrl

        recipe.save().then(recipe => res.json(recipe));
      }
    })
  }
)

router.delete('/delete/:id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Recipe.findById(req.params.id).then(recipe => {
      if (recipe.author != req.user.id) {
        return res.status(400).json({ cannotdelete: 'You can only delete your own recipes'});
      } else {
        Recipe.deleteOne({ _id: req.params.id }).then( () => {
          return res.status(200).json({ success: "Recipe deleted"});
        })
      }
    })
  }
)
module.exports = router;
