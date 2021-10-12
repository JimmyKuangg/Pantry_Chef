const express = require("express");
const router = express.Router();
const mongoose = require('mongoose')
const passport = require('passport')

const Pantry = require('../../models/Pantry')
const validatePantryInput = require('../../validation/pantry')

router.get("/test", (req, res) => res.json({ msg: "This is the pantry route" }));

router.get('/', (req, res) => {
    Pantry.find()
        .populate('ingredients.ingredient', "name")
        .populate('user', "username")
        .then(pantries => {
          let newPantries = []
          pantries.forEach(pantry => {
              newPantries.push({
                user: pantry.user.username,
                ingredients: (!pantry.ingredients) ? [] : 
                  pantry.ingredients.map(ele => ({
                    ingredient: ele.ingredient.name,
                    quantity: ele.quantity,
                    unit: ele.unit
                }))
              })
            }
          )
          
          return res.json(newPantries)
        })
        .catch( err => res.status(404).json({ nopantriesfound: 'No pantries found' }))
});

router.get('/:id', (req, res) => {
    Pantry.findById(req.params.id)
        .populate('ingredients.ingredient', "name")
        .populate('user', "username")
        .then(pantry => {
            let newPantry = {
              user: pantry.user.username,
              ingredients: pantry.ingredients.map(ele => ({
                ingredient: ele.ingredient.name,
                quantity: ele.quantity,
                unit: ele.unit
              }))
            }
          return res.json(newPantry)
          })
        .catch( err => res.status(404).json( { nopantryfound: 'No Pantry found with that ID'} ) )
});

router.post('/', 
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
      const { errors, isValid } = validatePantryInput(req.body);

      if (!isValid) {
        return res.status(400).json(errors);
      }
      
      Pantry.findOne({ user: req.body.user }).then(user => {
        if (user) {
          errors.user = "Pantry already exists for this user";
          return res.status(400).json(errors);
        } else {
          const newPantry = new Pantry({
            user: req.body.user,
            ingredients: req.body.ingredients
          });
          newPantry.save().then( pantry => res.json(pantry))
        }
      })
    }
);

router.patch('/update/:id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {

    Pantry.findById(req.params.id).then(pantry => {
      if (!pantry) {
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