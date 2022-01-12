const express = require("express");
const router = express.Router();
const { find, findOne, create, update, remove } = require("../controller/blog");
const Blog = require("../models/blog");
const auth = require("../middleware/auth");

router.get("/", async (req, res, next) => {
  let { page, size } = req.query;
  if (!page) {
    page = 1;
  }
  if (!size) {
    size = 100000;
  }
  const limit = parseInt(size);
  const skip = parseInt(page - 1) * size;
  find({}, {})
    .limit(limit)
    .skip(skip)
    .populate("author", { firstName: 1, lastName: 1, email: 1 })
    .then((data) => res.json({ page, size, data }))
    .catch((err) => next(err));
});

router.get("/:id", auth, async (req, res, next) => {
  findOne(req.params.id)
    .populate("author", { username: 1 })
    .then((data) => res.json(data))
    .catch((e) => next(e));
});

router.post("/", auth, async (req, res, next) => {
  const blog = req.body;
  blog.author = req.user._id;
  create(blog)
    .then((data) => res.json(data))
    .catch((err) => next(err));
});
router.patch("/:id", auth, (req, res, next) => {
  update(req.params.id, req.body)
    .populate("author", { username: 1 })
    .then((data) => res.json(data))
    .catch((err) => next(err));
});
router.delete("/:id", auth, (req, res, next) => {
  remove(req.params.id)
    .populate("author", { username: 1 })
    .then((data) => res.json(data))
    .catch((err) => next(err));
});

module.exports = router;
