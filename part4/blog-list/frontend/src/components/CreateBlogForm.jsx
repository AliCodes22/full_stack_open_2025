import { useState } from "react";
import blogService from "../services/blogs";
import {
  clearNotification,
  newBlogNotification,
} from "../reducers/notificationReducer";
import { useDispatch } from "react-redux";

const CreateBlogForm = ({ setBlogs }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const blog = {
      title,
      author,
      url,
    };

    try {
      const newBlog = await blogService.createBlog(blog);

      setBlogs((prev) => [...prev, newBlog]);
      dispatch(newBlogNotification(newBlog));

      setTimeout(() => {
        dispatch(clearNotification());
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
