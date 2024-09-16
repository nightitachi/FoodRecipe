const express = require('express');
const RecipeModel = require('../models/recipe');

const router = express.Router();

router.post('/createdrecipe', (req, res) => {
  RecipeModel.create({
    name: req.body.name,
    description: req.body.description,
    ingredients: req.body.ingredients,
    imgurl: req.body.imgurl,
    userId: req.body.userId
  })
  .then(result => {
    return res.status(201).json(result);
  })
  .catch(err => {
    console.error(err);
    return res.status(500).json({ error: 'An error occurred while creating the recipe.' });
  });
});
router.get('/recipes' , (req,res)=>{
  RecipeModel.find()
  .then(recipes=> {return res.json(recipes)})
  .catch(err=> res.json(err))
})
module.exports = router;
