const User = require("../models/user");
const tokenExtractor = require("./tokenExtractor");
const jwt = require("jsonwebtoken");

const userExtractor = async (req, res, next) => {
  if (!req.token) {
    return res.status(401).json({
      message: "token missing or invalid",
    });
  }
  const decodedToken = jwt.verify(req.token, process.env.SECRET);
  console.log(decodedToken);

  if (!decodedToken.id) {
    return res.status(401).json({
      message: "invalid token",
    });
  }

  const user = await User.findById(decodedToken.id.toString());

  if (!user) {
    return res.status(404).json({
      message: "user does not exist",
    });
  }

  req.user = user;

  next();
};

module.exports = userExtractor;
