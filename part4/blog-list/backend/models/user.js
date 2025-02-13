const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    minlength: 3,
    required: true,
  },
  name: String,
  passwordHash: String,
});

const User = mongoose.model("User", userSchema);

module.exports = User;
