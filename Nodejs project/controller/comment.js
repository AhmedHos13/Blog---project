const Comment = require("../models/comment");

const create = (post) => Comment.create(post);

const find = (query) => Comment.find(query);

const findOne = (query) => Comment.findById(query);

const update = (query, newdata) =>
  Comment.findByIdAndUpdate(query, newdata, { new: true, runValidators: true });

const remove = (query) => Comment.findByIdAndDelete(query);

module.exports = { find, findOne, create, update, remove };
