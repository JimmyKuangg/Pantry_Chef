const express = require("express");
const router = express.Router();
const mongoose = require('mongoose')
const passport = require('passport')

const Ingredient = require('../../models/Ingredient')
const validateIngredientInput = require('../../validation/ingredient')

router.get('/', (req, res) => {
    Ingredient.find()
        .then(ingredients => res.json(ingredients))
        .catch( err => res.status(404).json({ noingredientsfound: 'No ingredients found' }))
});

router.post('/', 
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
        const {errors, isValid} = validateIngredientInput(req.body);
        if (!isValid){
            return res.status(400).json(errors)
        }

        Ingredient.findOne({ name: req.body.name.toLowerCase() }).then(name => {
            if (name) {
              errors.name = "Ingredient with this name already exists";
              return res.status(400).json(errors);
            } else {
                const newIngredient = new Ingredient({
                    name: req.body.name,
                });
        
                newIngredient.save().then( ingredient => res.json(ingredient))
            }

        })
    }
);



module.exports = router;