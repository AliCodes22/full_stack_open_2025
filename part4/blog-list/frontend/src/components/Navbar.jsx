import { useContext } from "react";
import { Link } from "react-router-dom";
import UserContext from "../context/UserContext";

const Navbar = ({ setIsLoggedIn }) => {
  const navStyle = {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    backgroundColor: "gray",
    marginBottom: "10px",
  };

  const handleLogout = () => {
    window.localStorage.clear();
    setUser(null);
    setIsLoggedIn(false);
  };

  const [user, setUser] = useContext(UserContext);
  console.log(user);

  return (
    <div style={navStyle}>
      <Link to="/">Blogs</Link>
      <Link to="/users">Users</Link>
      <p>{user.username} logged in</p>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Navbar;
