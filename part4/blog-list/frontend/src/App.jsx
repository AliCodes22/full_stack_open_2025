import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import LoginForm from "./components/LoginForm";
import CreateBlogForm from "./components/CreateBlogForm";
import Notification from "./components/Notification";
import ErrorMessage from "./components/ErrorMessage";
import Togglable from "./components/Togglable";
import { useDispatch, useSelector } from "react-redux";
import { initializeBlogs } from "./reducers/blogReducer";
import { setUser } from "./reducers/userReducer";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [error, setError] = useState(null);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [isDetailVisible, setIsDetailVisible] = useState(false);
  const dispatch = useDispatch();

  const notification = useSelector((state) => state.notification);
  const blogs = useSelector((state) => state.blogs);
  const user = useSelector((state) => state.user);
  console.log(user);

  //check if user's logged in
  useEffect(() => {
    const loggedInUser = JSON.parse(window.localStorage.getItem("user"));

    if (loggedInUser) {
      setIsLoggedIn(true);
      dispatch(setUser(loggedInUser));
    }
  }, []);

  useEffect(() => {
    const fetchBlogs = async () => {
      if (user) {
        dispatch(initializeBlogs());
      }
    };
    fetchBlogs();
  }, [user]);

  return isLoggedIn ? (
    <div>
      <h2>blogs</h2>
      <Notification message={notification.message} />
      {user && (
        <div>
          <div
            style={{
              display: "flex",
              gap: "5px",
            }}
          >
            <h3>{user.username} logged in</h3>
            <button
              onClick={() => {
                window.localStorage.clear();
                setUser(null);
                setIsLoggedIn(false);
              }}
              style={{
                border: "2px solid red",
                width: "100px",
                height: "50px",
              }}
            >
              Log out
            </button>
          </div>
          <Togglable
            buttonLabel="Create blog"
            setIsFormVisible={setIsFormVisible}
            hideOrCancel={"Cancel"}
          >
            <CreateBlogForm />
          </Togglable>
        </div>
      )}

      {/* <CreateBlogForm setBlogs={setBlogs} setNotification={setNotification} /> */}

      {!isFormVisible &&
        blogs.map((blog) => <Blog key={blog._id} blog={blog} />)}
    </div>
  ) : (
    <>
      <ErrorMessage error={error} />
      <LoginForm setIsLoggedIn={setIsLoggedIn} setError={setError} />
    </>
  );
};

export default App;
