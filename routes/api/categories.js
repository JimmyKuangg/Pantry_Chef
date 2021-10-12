<<<<<<< HEAD
const express = require("express");
const router = express.Router();
const mongoose = require('mongoose')
const passport = require('passport')

const  Category = require('../../models/Category')
const validateCategoryInput = require('../../validation/category')

router.get("/test", (req, res) => res.json({ msg: "This is the categories route" }));

router.get('/', (req, res) => {
    Category.find()
        .then(categories => res.json(categories))
        .catch( err => res.status(404).json({ nocategoriesfound: 'No categories found' }))
});

router.get('/:id', (req, res) => {
    Category.findById(req.params.id)
        .then(category => res.json(category))
        .catch( err => res.status(404).json( { nocategoryfound: 'No Category found with that ID'} ) )
});

router.post('/', 
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
        const {errors, isValid} = validateCategoryInput(req.body);
        if (!isValid){
            return res.status(400).json(errors)
        }

        const newCategory = new Category({
            name: req.body.name
        });

        newCategory.save().then( category => res.json(category))
    }
);



=======
const express = require("express");
const router = express.Router();
const mongoose = require('mongoose')
const passport = require('passport')

const  Category = require('../../models/Category')
const validateCategoryInput = require('../../validation/category')

router.get("/test", (req, res) => res.json({ msg: "This is the categories route" }));

router.get('/', (req, res) => {
    Category.find()
        .then(categories => res.json(categories))
        .catch( err => res.status(404).json({ nocategoriesfound: 'No categories found' }))
});

router.get('/:id', (req, res) => {
    Category.findById(req.params.id)
        .then(category => res.json(category))
        .catch( err => res.status(404).json( { nocategoryfound: 'No Category found with that ID'} ) )
});

router.post('/', 
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
        const {errors, isValid} = validateCategoryInput(req.body);
        if (!isValid){
            return res.status(400).json(errors)
        }

        Category.findOne({ name: req.body.name }).then(name => {
            if (name) {
              errors.name = "Category with this name already exists";
              return res.status(400).json(errors);
            } else {
                const newCategory = new Category({
                    name: req.body.name
                });
        
                newCategory.save().then( category => res.json(category))
            }

        })
    }
);



>>>>>>> Backend-Setup
module.exports = router;