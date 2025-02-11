const express = require("express");
const Blog = require("../models/blog");

const router = express.Router();

router.get("/", async (req, res) => {
  const blogs = await Blog.find({});

  return res.json(blogs);
});

router.post("/", (req, res) => {
  const blog = new Blog(req.body);
  console.log(req.body);

  blog.save().then((result) => {
    res.status(201).json(result);
  });
});

module.exports = router;
