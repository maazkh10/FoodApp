import Recipe from "../models/recipe.js";
import multer from "multer";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_key,
  api_secret: process.env.API_SECRET,
});
export const createRecipe = async (req, res) => {
  try {
    // console.log(req.files);
    const images = [];
    for (const file of req.files) {
      const b64 = file.buffer.toString("base64");
      let dataURI = "data:" + file.mimetype + ";base64," + b64;
      const result = await cloudinary.uploader.upload(dataURI);
      images.push(result.secure_url);
    }

    const { name, instructions } = req.body;
    const recipe = new Recipe({
      name,
      instructions,
      images,
    });

    await recipe.save();
    res.status(201).json(recipe);
  } catch (error) {
    console.error("Error creating recipe:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
export const allRecipes = async (req, res) => {
  try {
    const recipes = await Recipe.find();
    res.status(200).json({ recipes });
  } catch (error) {
    console.error("Error getting recipes", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Apply multer middleware directly to the route handler
