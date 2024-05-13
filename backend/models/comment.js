import mongoose from "mongoose";

const { Schema } = mongoose;

const commentSchema = new Schema({
  text: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  recipe: {
    type: Schema.Types.ObjectId,
    ref: "Recipe",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Comment = mongoose.model("Comment", commentSchema);

export default Comment;
