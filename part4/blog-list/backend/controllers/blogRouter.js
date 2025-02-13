const express = require("express");
const Blog = require("../models/blog");
const User = require("../models/user");

const router = express.Router();

// get full blog list
router.get("/", async (req, res) => {
  const blogs = await Blog.find({}).populate("user");
  return res.json(blogs);
});

// create a new entry
router.post("/", async (req, res) => {
  const blog = new Blog(req.body);
  console.log(req.body);

  const savedBlog = await blog.save();

  const user = await User.findById(req.body.user);
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
