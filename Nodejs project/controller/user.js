const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const create = (user) => User.create(user);

const find = (query, projection) => User.find(query, projection);

const update = (query, newdata) =>
  User.findByIdAndUpdate(query, newdata, { new: true, runValidators: true });

const remove = (query) => User.findByIdAndDelete(query);

const login = async ({ email, password }) => {
  const user = await User.findOne({ email });
  if (!user) {
    
    return console.log('error');
  }

  const isValid = bcrypt.compareSync(password, user.password);
  if (!isValid) {
    throw new Error("UN-AUTHANTICATED");
  }
  const Token = jwt.sign(
    {
      email,
      _id: user.id,
      maxAge: "10d",
    },
    "asasdasljvklashofhpsajarjowa21wfr12"
  );
  console.log(user.password);
  return Token;
};

module.exports = { find, create, update, remove, login };
