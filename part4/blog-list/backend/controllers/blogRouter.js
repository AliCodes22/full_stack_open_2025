const express = require("express");
const Blog = require("../models/blog");
const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userExtractor = require("../middleware/userExtractor");

const router = express.Router();

// get full blog list
router.get("/", async (req, res) => {
  const blogs = await Blog.find({}).populate("user");
  const sortedBlogs = blogs.sort((a, b) => b.likes - a.likes);

  return res.status(200).json(sortedBlogs);
});

// create a new entry
router.post("/", userExtractor, async (req, res) => {
  const blog = new Blog({
    ...req.body,
    user: req.user._id,
  });

  const user = req.user;
  const savedBlog = await blog.save();

  req.user.blogs.push(savedBlog._id);
  await user.save();

  res.status(201).json(savedBlog);
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { likes } = req.body;
  const blog = await Blog.findById(id);

  console.log(blog);

  if (!blog) {
    return res.status(404).json({ message: "blog not found" });
  }

  blog.likes = likes;

  const updatedBlog = await blog.save();

  res.status(200).json(updatedBlog);
});

// delete blog entry
router.delete("/:id", userExtractor, async (req, res) => {
  const { id } = req.params;
  // verify user

  // find user from db
  const user = req.user;

  // get the blog post
  const blog = await Blog.findById(id);

  if (!blog) {
    return res.status(404).json({
      message: "blog not found",
    });
  }

  if (blog.user._id.toString() === req.user._id.toString()) {
    await Blog.findByIdAndDelete(id);

    const updatedUserBlogs = (req.user.blogs = req.user.blogs.filter(
      (blogId) => blogId.toString() !== id
    ));
    await req.user.save();

    const updatedBlogs = await Blog.find({}).populate("user");

    return res.status(200).json(updatedBlogs);
  } else {
    return res.status(403).json({
      message: "Unauthorized",
    });
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;

  const blog = await Blog.findById(id);

  if (!blog) {
    return res.status(400).json({
      message: "not found",
    });
  }

  return res.status(200).json(blog);
});

router.post("/:id/comments", async (req, res) => {
  const { comment } = req.body;
  console.log(req.body);

  if (!comment) {
    return res.status(400).json({
      message: "please leave a comment",
    });
  }
  const { id } = req.params;

  const blog = await Blog.findById(id);

  if (!blog) {
    return res.status(404).json({
      message: "blog not found",
    });
  }

  const updatedComments = [...blog.comments, comment];

  blog.comments = updatedComments;

  await blog.save();

  return res.status(200).json(updatedComments);
});

module.exports = router;
