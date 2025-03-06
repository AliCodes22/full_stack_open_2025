import { useNavigate } from "react-router-dom";

const Login = ({ onLogin }) => {
  const navigate = useNavigate();

  const onSubmit = (e) => {
    e.preventDefault();
    onLogin("Ali");
    navigate("/");
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={onSubmit}>
        <div>
          Username: <input />
        </div>
        <div>
          Password: <input type="password" />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
