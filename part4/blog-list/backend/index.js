const express = require("express");
require("express-async-errors");
const cors = require("cors");
const mongoose = require("mongoose");
const Blog = require("./models/blog");
const blogRouter = require("./controllers/blogRouter");
const userRouter = require("./controllers/userRouter");

require("dotenv").config();

const mongoUrl = process.env.MONGODB_URI;

mongoose
  .connect(mongoUrl)
  .then((response) => console.log("Mongo connected"))
  .catch((error) => console.error("Mongo not connected", error));

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/blogs", blogRouter);
app.use("/api/users", userRouter);

const port = process.env.PORT || 3001;

app.listen(port, () => {
  console.log(`App running on ${port}`);
});

const errorHandler = (error, req, res, next) => {
  if (error.name === "CastError") {
    return res.status(400).json({ error: "Invalid ID format" });
  } else if (error.name === "ValidationError") {
    return res.status(400).json({
      error: "Validation failed",
      details: error,
    });
  }

  res.status(500).json({ error: "Internal server error" });
};

app.use(errorHandler);
