const express = require("express");
const router = express.Router();
const Recipe = require('../../models/Recipe');
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');
const passport = require('passport');
const validateRecipeInput = require('../../validation/recipe.js');

router.get("/test", (req, res) => res.json({ msg: "Hello! This is the recipes route"}));

router.post('/create', (req, res) => {
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

module.exports = router;