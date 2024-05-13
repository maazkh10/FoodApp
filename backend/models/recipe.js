// models/Recipe.js

import mongoose from "mongoose";
const recipeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  instructions: {
    type: String,
    required: true,
  },
  images: [String], // Array of image URLs
});

const Recipe = mongoose.model("Recipe", recipeSchema);

export default Recipe;
