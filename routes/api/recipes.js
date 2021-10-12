const express = require("express");
const router = express.Router();
const Recipe = require('../../models/Recipe');
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');
const passport = require('passport');
const validateRecipeInput = require('../../validation/recipe.js');

router.get('/:recipeId', (req, res) => {
  Recipe.findById(req.params.recipeId)
    .populate('ingredients', '-_id, name')
    .populate('categories', '-_id, name')
    .populate('author', '-_id, username')
    .then(recipe => {
      let recipeShow = {
        name: recipe.name,
        ingredients: [...recipe.ingredients],
        cookTime: recipe.cookTime,
        calories: recipe.calories,
        categories: [...recipe.categories],
        author: recipe.author.username
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
        author: req.body.author,
        date: req.body.date
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
        recipe.categories = req.body.categories

        recipe.save().then(recipe => res.json(recipe));
      }
    })
  }
)

module.exports = router;