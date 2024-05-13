import Comment from "../models/comment.js";

const createComment = async (req, res) => {
  try {
    const { text, author, recipeId } = req.body;
    const comment = new Comment({
      text,
      author,
      recipe: recipeId,
    });
    await comment.save();
    res.status(201).json(comment);
  } catch (error) {
    console.error("Error creating comment:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const getCommentsForRecipe = async (req, res) => {
  try {
    const { recipeId } = req.params;
    console.log("🚀 ~ getCommentsForRecipe ~ req.params:", req.params)
    const comments = await Comment.find({ recipe: recipeId });
    res.status(200).json(comments);
  } catch (error) {
    console.error("Error getting comments:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export { createComment, getCommentsForRecipe };
