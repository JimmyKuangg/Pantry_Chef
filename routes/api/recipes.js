const express = require("express");
const router = express.Router();
const Recipe = require('../../models/Recipe');
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');
const passport = require('passport');
const validateRecipeInput = require('../../validation/recipe.js');

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
        authorId: req.body.authorId,
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
        console.log('hello'); 
      }
    })
  }
)

module.exports = router;