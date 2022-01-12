const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const userSchema = new mongoose.Schema({
  username: {
    type: "string",
    minlength: 6,
    required: true,
    unique: true,
  },
  email: {
    type: "string",
    required: true,
    unique: true,
  },
  firstName: {
    type: "string",
    minlength: 3,
    maxlength: 16,
    // required: true,
  },
  lastName: {
    type: "string",
    minlength: 3,
    maxlength: 16,
    // required: true
  },
  dob: {
    type: "string",
  },
  password: {
    type: "string",
    required: true,
  },
});
userSchema.pre("save", function () {
  console.log(this);
  const hash = bcrypt.hashSync(this.password, 10);
  this.password = hash;
});
// comparePassword()
const User = mongoose.model("User", userSchema);
module.exports = User;
