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

    Pantry.findById(req.params.id).then(pantry => {
      if (!pantry) {
        errors.pantry = 'A pantry with that ID does not exist';
        return res.status(404).json(errors);
      } else {
        console.log(req.body)
        pantry.ingredients = req.body.ingredients 
        pantry.save()
        return res.status(200).json(pantry)
      }
    })
  }
)

module.exports = router;