const express = require("express");
const router = express.Router();
const mongoose = require('mongoose')
const passport = require('passport')

const Pantry = require('../../models/Pantry')

router.get("/test", (req, res) => res.json({ msg: "This is the pantry route" }));

router.get('/', (req, res) => {
    Pantry.find()
        .then(pantries => res.json(pantries))
        .catch( err => res.status(404).json({ nopantriesfound: 'No pantries found' }))
});

router.get('/:id', (req, res) => {
    Pantry.findById(req.params.id)
        .then(pantry => res.json(pantry))
        .catch( err => res.status(404).json( { nopantryfound: 'No Pantry found with that ID'} ) )
});

router.post('/', 
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
        const {errors, isValid} = validateIngredientInput(req.body);
        if (!isValid){
            return res.status(400).json(errors)
        }

        const newPantry = new Pantry({
            user: req.body.user,
            ingredients: req.body.ingredients
        });

        newPantry.save().then( pantry => res.json(pantry))
    }
);

router.patch('/update/:id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    
    const { errors, isValid } = validatePantryInput(req.body);

    if (!isValid) {
      return res.status(400).json(errors);
    }

    Pantry.findById(req.params.id).then(pantry => {
      if (!recipe) {
        errors.pantry = 'A pantry with that ID does not exist';
        return res.status(404).json(errors);
      } else {
        pantry.ingredients = req.body.ingredients 
        pantry.save()
        return res.status(200).json(pantry)
      }
    })
  }
)

module.exports = router;