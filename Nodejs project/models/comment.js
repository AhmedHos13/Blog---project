const mongoose = require("mongoose");
const commentsSchema = new mongoose.Schema({
  text: {
    type: "string",
    required: true,
  },
  author: {
    type: mongoose.SchemaTypes.ObjectID,
    ref: "User",
  },
});
const Comment = mongoose.model("Comment", commentsSchema);
module.exports = Comment;
