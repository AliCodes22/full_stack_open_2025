import { useContext, useState } from "react";
import loginService from "../services/login";
import { useSelector, useDispatch } from "react-redux";
import { setUser } from "../reducers/userReducer";
import UserContext from "../context/UserContext";

const LoginForm = ({ setIsLoggedIn, setError }) => {
  const [password, setPassword] = useState("");
  const [user, setUser] = useContext(UserContext);
  const [username, setUsername] = useState("");

  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const user = await loginService.login({
        username,
        password,
      });
      window.localStorage.setItem("user", JSON.stringify(user));

      setUsername("");
      setPassword("");
      setIsLoggedIn(true);
      setUser(user);
    } catch (error) {
      setError("Wrong credentials");
      setTimeout(() => {
        setError(null);
      }, 5000);
    }
  };

  return (
    <div>
      <h1>Log in to application</h1>

      <form onSubmit={handleSubmit}>
        <div>
          Username:{"  "}
          <input
            type="text"
            name="Username"
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          Password: {"     "}
          <input
            type="password"
            name="Password"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginForm;
