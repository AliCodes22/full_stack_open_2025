import { useState } from "react";
import loginService from "../services/login";

const LoginForm = ({ setIsLoggedIn, setUser }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

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
      setErrorMessage("Wrong credentials");
      setTimeout(() => {
        setErrorMessage(null);
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
        <button type="Submit">Login</button>
      </form>
    </div>
  );
};

export default LoginForm;
