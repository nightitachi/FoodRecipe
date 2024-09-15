const mongoose = require('mongoose');

const RecipeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  ingredients: { type: String },
  imgurl: { type: String },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
});

const RecipeModel = mongoose.model('Recipe', RecipeSchema);
module.exports = RecipeModel;
