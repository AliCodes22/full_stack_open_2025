const User = require("../models/user");
const userRouter = require("express").Router();
const bcrypt = require("bcrypt");

userRouter.post("/", async (req, res) => {
  const { username, password, name } = req.body;

  if (!username || !password) {
    return res.status(400).json({
      message: "Username or password missing",
    });
  }

  if (username.length < 3 || password.length < 3) {
    return res.status(400).json({
      message: "Username or password must be at least 3 characters long",
    });
  }

  const userExists = await User.findOne({ username });

  if (userExists) {
    return res.status(400).json({
      message: "username already exists",
    });
  }

  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);

  const newUser = new User({
    username,
    name,
    passwordHash: hashedPassword,
  });

  await newUser.save();

  res.status(201).json(newUser);
});

module.exports = userRouter;
