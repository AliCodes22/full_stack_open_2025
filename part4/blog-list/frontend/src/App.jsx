import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import LoginForm from "./components/LoginForm";
import CreateBlogForm from "./components/CreateBlogForm";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

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
      <CreateBlogForm />
      {blogs.map((blog) => (
        <Blog key={blog._id} blog={blog} />
      ))}
    </div>
  ) : (
    <LoginForm setIsLoggedIn={setIsLoggedIn} setUser={setUser} />
  );
};

export default App;
