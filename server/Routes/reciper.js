const express = require("express");
const RecipeModel = require("../models/recipe");
const UserModel = require("../models/user");
const router = express.Router();

router.post("/createdrecipe", (req, res) => {
  RecipeModel.create({
    name: req.body.name,
    description: req.body.description,
    ingredients: req.body.ingredients,
    imgurl: req.body.imgurl,
    userId: req.body.userId,
  })
    .then((result) => {
      return res.json(result);
    })
    .catch((err) => {
      console.error(err);
      return res.json({
        error: "An error occurred while creating the recipe.",
      });
    });
});
router.get("/recipes", (req, res) => {
  RecipeModel.find()
    .then((recipes) => res.json(recipes))
    .catch((err) => res.status(500).json({ error: "An error occurred." }));
});

router.get("/savedrecipe/:id", (req, res) => {
  const id = req.params.id;
  RecipeModel.findById({ _id: id })
    .then((result) => {
      return res.json(result.savedRecipes);
    })
    .catch((err) => res.json(err));
});
router.put("/", async (req, res) => {
  const recipe = await RecipeModel.findById({ _id: req.body.recipeId });
  const user = await UserModel.findById({ _id: req.body.userId });

  try {
    user.savedRecipes.push(recipe);
    await user.save();
    return res.json({ savedRecipes: user.savedRecipes });
  } catch (err) {
    return res.json(err);
  }
});
router.get('/user-recipes/:id' , async(req,res)=>{
  const id= await req.params.id;
  try {
    const user= await UserModel.findBy({_id :id})
  const recipes = await RecipeModel.find({
    _id: {$in: user.savedRecipes}
  })
  req.status(201).json(recipes)
  } catch (error) {
    res.status(500).json(error)
  }
})
module.exports = router;
