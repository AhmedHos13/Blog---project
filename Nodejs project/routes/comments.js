const express = require("express");
const router = express.Router();
const {
  find,
  findOne,
  create,
  edit,
  remove,
} = require("../controller/comment");
const auth = require("../middleware/auth");


router.get("/", async (req, res, next) => {
  find()
    .populate("author")
    .then((data) => res.json(data))
    .catch((err) => next(err));
});

router.get("/:id", async (req, res, next) => {
  findOne(req.params.id)
    .populate("author", { username: 1 })
    .then((data) => res.json(data))
    .catch((e) => next(e));
});

router.post("/", auth, async (req, res, next) => {
  const userId = req.user._id;
  console.log(userId);
  const blog = req.body;
  blog.author = userId;
  create(blog)
    .then((data) => res.json(data))
    .catch((err) => next(err));
});
router.patch("/:id", (req, res, next) => {
  update(req.params.id, req.body)
    .populate("author", { username: 1 })
    .then((data) => res.json(data))
    .catch((err) => next(err));
});
router.delete("/:id", (req, res, next) => {
  remove(req.params.id)
    .populate("author", { username: 1 })
    .then((data) => res.json(data))
    .catch((err) => next(err));
});

module.exports = router;
