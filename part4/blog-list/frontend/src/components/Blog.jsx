import { useState, useEffect } from "react";
import blogService from "../services/blogs";
import Togglable from "./Togglable";

const Blog = ({ blog, setBlogs }) => {
  const [areDetailsVisible, setAreDetailsVisible] = useState(false);
  const [likes, setLikes] = useState(blog.likes);

  const handleLikes = async () => {
    const updatedBlog = {
      ...blog,
      likes: blog.likes + 1,
    };

    const response = await blogService.addLikes(updatedBlog);
    setLikes(response.likes);
    setBlogs(await blogService.getAll());
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "space-between",
        gap: "20px",
        paddingBottom: "20px",
        border: "5px solid black",
      }}
    >
      <div
        style={{
          marginBottom: "10px",
        }}
      >
        {blog.title} {blog.author}
        <button onClick={() => setAreDetailsVisible(!areDetailsVisible)}>
          {!areDetailsVisible ? "Show" : "Hide"}
        </button>
        {areDetailsVisible && (
          <div>
            <p>{blog.url}</p>
            <p>
              Likes: {blog.likes}{" "}
              <button type="submit" onClick={handleLikes}>
                Like
              </button>
            </p>
            <p>{blog.author}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Blog;
