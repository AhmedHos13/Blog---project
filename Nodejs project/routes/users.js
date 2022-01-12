const express = require("express");
const router = express.Router();
const { find, create, login, update, remove } = require("../controller/user");
var cors = require("cors");
//find data :

router.get("/", async (req, res, next) => {
  find()
    .then((data) => res.json(data))
    .catch((e) => next(e));
});

// register :

router.post("/register", (req, res, next) => {
  create(req.body)
    .then((data) => res.json(data))
    .catch((err) => next(console.log(err)));
});

//login :

router.post("/login", async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const Token = await login({ email, password });
    res.json(Token);
  } catch (err) {
    res.status(404).send(err.message);
  }
});

//edit :

router.patch("/:id", (req, res, next) => {
  update(req.params.id, req.body)
    .then((data) => res.json(data))
    .catch((err) => next(err));
});

// delete :
router.delete("/:id", (req, res, next) => {
  remove(req.params.id)
    .then((data) => res.json(data))
    .catch((err) => next(err));
});

module.exports = router;
