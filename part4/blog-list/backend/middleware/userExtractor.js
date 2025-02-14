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

  if (!decodedToken.id) {
    return res.status(401).json({
      message: "invalid token",
    });
  }

  const user = await User.findById(decodedToken._id.toString());

  if (!user) {
    return res.status(404).json({
      message: "user does not exist",
    });
  }

  req.user = user;

  next();
};

module.exports = userExtractor;
