import { useState, useContext } from "react";
import blogService from "../services/blogs";

import { useDispatch } from "react-redux";
import { createBlogAction } from "../reducers/blogReducer";
import NotificationContext from "../context/NotificationContext";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const CreateBlogForm = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  // const dispatch = useDispatch();

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: blogService.createBlog,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["blogs"],
      });
    },
  });
  const [notification, setNotification] = useContext(NotificationContext);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const blog = {
      title,
      author,
      url,
    };

    try {
      mutation.mutate(blog);

      setNotification(blog);

      setTimeout(() => {
        setNotification(null);
      }, 5000);

      setTitle("");
      setAuthor("");
      setUrl("");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h3>Create new</h3>
      <form onSubmit={handleSubmit}>
        Title: {"  "}
        <input
          style={{
            display: "block",
          }}
          type="text"
          value={title}
          name="Title"
          onChange={(e) => setTitle(e.target.value)}
        />
        Author: {"  "}
        <input
          style={{
            display: "block",
          }}
          type="text"
          value={author}
          name="Author"
          onChange={(e) => setAuthor(e.target.value)}
        />
        URL: {"  "}
        <input
          style={{
            display: "block",
          }}
          type="text"
          value={url}
          name="Url"
          onChange={(e) => setUrl(e.target.value)}
        />
        <button
          style={{
            marginTop: "10px",
            marginBottom: "10px",
          }}
        >
          Create
        </button>
      </form>
    </div>
  );
};

export default CreateBlogForm;
