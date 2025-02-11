const express = require("express");
const cors = require("cors");

const mongoose = require("mongoose");

const Blog = require("./models/blog");
const blogRouter = require("./controllers/blogRouter");

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

const port = process.env.PORT || 3001;

app.listen(port, () => {
  console.log(`App running on ${port}`);
});
