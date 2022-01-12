const mongoose = require("mongoose");
const blogSchema = new mongoose.Schema({
  title: {
    type: "string",
    minlength: 3,
    required: true,
  },
  content: {
    type: "string",
    minlength: 20,
    required: true,
  },
  author: {
    type: mongoose.SchemaTypes.ObjectID,
    ref: "User",
  }
},{ timestamps: true });

const Blog = mongoose.model("Blog", blogSchema);
module.exports = Blog;
