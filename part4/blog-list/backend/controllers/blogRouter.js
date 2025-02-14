const express = require("express");
const Blog = require("../models/blog");
const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const router = express.Router();

// get full blog list
router.get("/", async (req, res) => {
  const blogs = await Blog.find({}).populate("user");
  return res.json(blogs);
});

// create a new entry
router.post("/", async (req, res) => {
  const blog = new Blog(req.body);

  const decodedToken = jwt.verify(req.token, process.env);

  if (!decodedToken.id) {
    return res.status(401).json({
      error: "Invalid token",
    });
  }

  const user = await User.findById(decodedToken.id);
  const savedBlog = await blog.save();

  user.blogs = [...user.blogs, savedBlog];
  await user.save();

  res.status(201).json(savedBlog);
});

// delete blog list entry
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  const blog = await Blog.findById(id);

  if (!blog) {
    return res.status(404).json({ message: "Blog not found" });
  }

  await Blog.findByIdAndDelete(id);
  res.status(201).end();
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { likes } = req.body;
  const blog = await Blog.findById(id);

  if (!blog) {
    return res.status(404).json({ message: "blog not found" });
  }

  blog.likes = likes;

  const updatedBlog = await blog.save();

  res.status(200).json(updatedBlog);
});

module.exports = router;
