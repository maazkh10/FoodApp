import express from "express";
import { allRecipes, createRecipe } from "../controllers/recipes.js";
import multer from "multer";
import { createComment, getCommentsForRecipe } from "../controllers/comment.js";
const storage = multer.memoryStorage();

const upload = multer({ storage: storage });

const route = express.Router();

route.post("/create-recipe", upload.array("images", 5), createRecipe);
route.post("/get-recipes", allRecipes);
route.post("/create-comment", createComment);
route.post("/comment/:recipeId", getCommentsForRecipe);

export default route;
