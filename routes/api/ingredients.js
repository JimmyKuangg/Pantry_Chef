const express = require("express");
const router = express.Router();
const mongoose = require('mongoose')
const passport = require('passport')

const Ingredient = require('../../models/Ingredient')
const validateIngredientInput = require('../../validation/ingredient')

router.get("/test", (req, res) => res.json({ msg: "This is the ingredients route" }));

router.get('/', (req, res) => {
    Ingredient.find()
        .then(ingredients => res.json(ingredients))
        .catch( err => res.status(404).json({ noingredientsfound: 'No ingredients found' }))
});

router.get('/:id', (req, res) => {
    Ingredient.findById(req.params.id)
        .then(ingredient => res.json(ingredient))
        .catch( err => res.status(404).json( { noingredientfound: 'No Ingredient found with that ID'} ) )
});

router.post('/', 
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
        const {errors, isValid} = validateIngredientInput(req.body);
        if (!isValid){
            return res.status(400).json(errors)
        }
        const newIngredient = new Ingredient({
            name: req.body.name,
            // recipes: req.body.recipes
        });

        newIngredient.save().then( ingredient => res.json(ingredient))
    }
);



module.exports = router;