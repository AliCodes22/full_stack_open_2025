import { useState, useEffect, useContext } from "react";
import blogService from "../services/blogs";
import Togglable from "./Togglable";
import { useDispatch } from "react-redux";
import { addLikeAction, deleteBlogAction } from "../reducers/blogReducer";
import { useQueryClient, useMutation } from "@tanstack/react-query";

const Blog = ({ blog }) => {
  const [areDetailsVisible, setAreDetailsVisible] = useState(false);
  // const dispatch = useDispatch();

  const queryClient = useQueryClient();
  const likeMutation = useMutation({
    mutationFn: blogService.addLikes,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["blogs"],
      });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: blogService.deleteBlog,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["blogs"],
      });
    },
  });

  const user = JSON.parse(window.localStorage.getItem("user"));

  const handleLikes = async () => {
    const updatedBlog = {
      ...blog,
      likes: blog.likes + 1,
    };

    likeMutation.mutate(updatedBlog);
  };

  const handleDelete = async () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      deleteMutation.mutate(blog._id);
    }
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
            {user.username === blog?.user?.username && (
              <button
                style={{
                  backgroundColor: "lightblue",
                }}
                onClick={handleDelete}
              >
                Remove
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Blog;
