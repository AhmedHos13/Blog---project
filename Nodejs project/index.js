const express = require("express");
const mongoose = require("mongoose");
const app = express();
var cors = require('cors');
const userRouter = require("./routes/users");
const blogRouter = require("./routes/blogs");
const commentRouter = require("./routes/comments");

mongoose.connect("mongodb://localhost:27017/crud");

app.use(express.json());
app.use(cors());


app.use("/users", userRouter);
app.use("/blogs", blogRouter);
app.use("/comments", commentRouter);

app.use((err, req, res, next) => {
  res.status(500).json(err);
});
const { port = 3000 } = process.env;
app.listen(port, () => {
  console.log(`server listened successfuly on port ${port}`);
});
