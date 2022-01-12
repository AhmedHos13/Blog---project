const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  
  const token = req.header("token");
  if (!token) return res.status(401).send("Access denied, No token provided!");
  try {
    const decoded = jwt.verify(token, "asasdasljvklashofhpsajarjowa21wfr12");
    console.log(decoded);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(400).send("Invalid token!");
  }
};
