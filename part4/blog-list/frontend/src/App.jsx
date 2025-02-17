import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import LoginForm from "./components/LoginForm";
import CreateBlogForm from "./components/CreateBlogForm";
import Notification from "./components/Notification";
import ErrorMessage from "./components/ErrorMessage";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [notification, setNotification] = useState(null);
  const [error, setError] = useState(null);

  //check if user's logged in
  useEffect(() => {
    const loggedInUser = JSON.parse(window.localStorage.getItem("user"));

    if (loggedInUser) {
      setIsLoggedIn(true);
      setUser(loggedInUser);
    }
  }, []);

  useEffect(() => {
    const fetchBlogs = async () => {
      if (user) {
        const blogs = await blogService.getAll();
        setBlogs(blogs);
      }
    };
    fetchBlogs();
  }, [user]);

  return isLoggedIn ? (
    <div>
      <h2>blogs</h2>
      <Notification message={notification} />
      {user && <h3>{user.username} logged in</h3>}
      <button
        onClick={() => {
          window.localStorage.clear();
          setUser(null);
          setIsLoggedIn(false);
        }}
      >
        Log out
      </button>
      <CreateBlogForm setBlogs={setBlogs} setNotification={setNotification} />
      {blogs.map((blog) => (
        <Blog key={blog._id} blog={blog} setBlogs={setBlogs} />
      ))}
    </div>
  ) : (
    <>
      <ErrorMessage error={error} />
      <LoginForm
        setIsLoggedIn={setIsLoggedIn}
        setUser={setUser}
        setError={setError}
      />
    </>
  );
};

export default App;
