const mongoose = require("mongoose");
const postSchema = new mongoose.Schema(
  {
    title: String,
    content: String,
    views:{
      type:Number,
      default:0
    },
    author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
}
  },
  { timestamps: true }
);
const Post = mongoose.model("Post", postSchema);
module.exports = Post;