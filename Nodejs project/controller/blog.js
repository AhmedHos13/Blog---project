const Blog = require("../models/blog");

const create = (post) => Blog.create(post);

const find = (query, projection) => Blog.find(query, projection);

const findOne = (query) => Blog.findById(query);

const update = (query, newdata) =>
  Blog.findByIdAndUpdate(query, newdata, { new: true, runValidators: true });

const remove = (query) => Blog.findByIdAndDelete(query);

module.exports = { find, findOne, create, update, remove };

//lasstttttttttttttttttttttttttt
